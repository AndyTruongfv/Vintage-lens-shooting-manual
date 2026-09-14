import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { LensPurchaseInfo } from '../types';

// Support both Vite (VITE_*) and Next.js / generic (NEXT_PUBLIC_*) env variable conventions
const envSupabaseUrl =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.NEXT_PUBLIC_SUPABASE_URL) ||
  '';

const envSupabaseAnonKey =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  '';

const LOCAL_STORAGE_KEY = 'vintage_lens_purchases_cache_v1';
const SUPABASE_CONFIG_OVERRIDE_KEY = 'vintage_lens_supabase_config_override';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export function getActiveSupabaseConfig(): SupabaseConfig {
  try {
    const override = localStorage.getItem(SUPABASE_CONFIG_OVERRIDE_KEY);
    if (override) {
      const parsed = JSON.parse(override);
      if (parsed.url && parsed.anonKey) {
        return { url: parsed.url.trim(), anonKey: parsed.anonKey.trim() };
      }
    }
  } catch {
    // ignore parse error
  }

  return {
    url: (envSupabaseUrl || '').trim(),
    anonKey: (envSupabaseAnonKey || '').trim(),
  };
}

export function saveSupabaseConfigOverride(config: SupabaseConfig | null) {
  if (!config || (!config.url && !config.anonKey)) {
    localStorage.removeItem(SUPABASE_CONFIG_OVERRIDE_KEY);
  } else {
    localStorage.setItem(SUPABASE_CONFIG_OVERRIDE_KEY, JSON.stringify(config));
  }
  // Re-initialize client
  _supabaseClient = null;
}

let _supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (_supabaseClient) return _supabaseClient;

  const config = getActiveSupabaseConfig();
  if (config.url && config.anonKey) {
    try {
      _supabaseClient = createClient(config.url, config.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
      return _supabaseClient;
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return null;
}

export function isSupabaseConfigured(): boolean {
  const config = getActiveSupabaseConfig();
  return Boolean(config.url && config.anonKey);
}

// ---------------------------------------------------------------------------
// Local Cache Fallback Operations (for instant offline response & resilience)
// ---------------------------------------------------------------------------

export function getLocalPurchasesCache(): Record<string, LensPurchaseInfo> {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Error reading purchases local cache:', err);
    return {};
  }
}

export function saveLocalPurchasesCache(data: Record<string, LensPurchaseInfo>) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('Error saving purchases local cache:', err);
  }
}

// ---------------------------------------------------------------------------
// Supabase Cloud Operations: Table 'lens_purchases'
// ---------------------------------------------------------------------------

export const SUPABASE_TABLE_NAME = 'lens_purchases';

/**
 * Fetch all lens purchases from Supabase, syncing with local cache.
 */
export async function fetchAllLensPurchases(): Promise<{
  data: Record<string, LensPurchaseInfo>;
  isCloud: boolean;
  error?: string;
}> {
  const localCache = getLocalPurchasesCache();
  const supabase = getSupabaseClient();

  if (!supabase) {
    return { data: localCache, isCloud: false };
  }

  try {
    const { data, error } = await supabase
      .from(SUPABASE_TABLE_NAME)
      .select('lens_id, price, seller, purchase_date, notes, created_at, updated_at');

    if (error) {
      console.warn('Supabase fetch error, using local cache:', error.message);
      return { data: localCache, isCloud: false, error: error.message };
    }

    const resultMap: Record<string, LensPurchaseInfo> = { ...localCache };
    if (data && Array.isArray(data)) {
      data.forEach((row: LensPurchaseInfo) => {
        if (row && row.lens_id) {
          resultMap[row.lens_id] = {
            lens_id: row.lens_id,
            price: row.price || '',
            seller: row.seller || '',
            purchase_date: row.purchase_date || '',
            notes: row.notes || '',
            created_at: row.created_at || null,
            updated_at: row.updated_at || null,
          };
        }
      });
      // Update local cache with latest cloud snapshot
      saveLocalPurchasesCache(resultMap);
    }

    return { data: resultMap, isCloud: true };
  } catch (err: any) {
    console.warn('Supabase fetch exception:', err);
    return { data: localCache, isCloud: false, error: err?.message || 'Network error' };
  }
}

/**
 * Upsert (insert/update) a lens purchase to Supabase and update local cache.
 */
export async function upsertLensPurchase(
  purchase: LensPurchaseInfo
): Promise<{ success: boolean; data?: LensPurchaseInfo; error?: string; isCloud: boolean }> {
  const updatedItem: LensPurchaseInfo = {
    ...purchase,
    updated_at: new Date().toISOString(),
  };

  // 1. Optimistically write to local storage
  const localCache = getLocalPurchasesCache();
  localCache[purchase.lens_id] = updatedItem;
  saveLocalPurchasesCache(localCache);

  // 2. If Supabase is configured, write to cloud
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      success: true,
      data: updatedItem,
      isCloud: false,
      error: 'Chưa cấu hình Supabase URL/Key. Dữ liệu đã lưu tạm offline trên thiết bị.',
    };
  }

  try {
    const payload = {
      lens_id: updatedItem.lens_id,
      price: updatedItem.price || null,
      seller: updatedItem.seller || null,
      purchase_date: updatedItem.purchase_date || null,
      notes: updatedItem.notes || null,
      updated_at: updatedItem.updated_at,
    };

    const { data, error } = await supabase
      .from(SUPABASE_TABLE_NAME)
      .upsert(payload, { onConflict: 'lens_id' })
      .select()
      .single();

    if (error) {
      console.error('Supabase upsert error:', error);
      return {
        success: false,
        data: updatedItem,
        isCloud: false,
        error: `Lỗi Supabase: ${error.message}. (Đã lưu bản sao offline)`,
      };
    }

    return { success: true, data: data as LensPurchaseInfo, isCloud: true };
  } catch (err: any) {
    console.error('Supabase upsert exception:', err);
    return {
      success: false,
      data: updatedItem,
      isCloud: false,
      error: err?.message || 'Không thể kết nối tới máy chủ Supabase.',
    };
  }
}

/**
 * Delete a lens purchase record from Supabase & local cache
 */
export async function deleteLensPurchaseRecord(
  lensId: string
): Promise<{ success: boolean; error?: string; isCloud: boolean }> {
  // Update local cache
  const localCache = getLocalPurchasesCache();
  delete localCache[lensId];
  saveLocalPurchasesCache(localCache);

  const supabase = getSupabaseClient();
  if (!supabase) {
    return { success: true, isCloud: false };
  }

  try {
    const { error } = await supabase.from(SUPABASE_TABLE_NAME).delete().eq('lens_id', lensId);
    if (error) {
      return { success: false, error: error.message, isCloud: false };
    }
    return { success: true, isCloud: true };
  } catch (err: any) {
    return { success: false, error: err?.message, isCloud: false };
  }
}
