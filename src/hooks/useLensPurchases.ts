import { useState, useEffect, useCallback } from 'react';
import type { LensPurchaseInfo } from '../types';
import {
  fetchAllLensPurchases,
  upsertLensPurchase,
  deleteLensPurchaseRecord,
  isSupabaseConfigured,
  getLocalPurchasesCache,
  getActiveSupabaseConfig,
} from '../lib/supabase';

export function useLensPurchases() {
  const [purchases, setPurchases] = useState<Record<string, LensPurchaseInfo>>(() =>
    getLocalPurchasesCache()
  );
  const [loading, setLoading] = useState(false);
  const [isCloudConnected, setIsCloudConnected] = useState(() => isSupabaseConfigured());
  const [lastSyncError, setLastSyncError] = useState<string | null>(null);

  const refreshPurchases = useCallback(async () => {
    setLoading(true);
    setLastSyncError(null);
    try {
      const res = await fetchAllLensPurchases();
      setPurchases(res.data);
      setIsCloudConnected(res.isCloud);
      if (res.error) {
        setLastSyncError(res.error);
      }
    } catch (err: any) {
      setLastSyncError(err?.message || 'Không thể đồng bộ dữ liệu');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshPurchases();
  }, [refreshPurchases]);

  const savePurchase = useCallback(
    async (info: LensPurchaseInfo) => {
      // Optimistic update state
      setPurchases((prev) => ({
        ...prev,
        [info.lens_id]: {
          ...info,
          updated_at: new Date().toISOString(),
        },
      }));

      const res = await upsertLensPurchase(info);
      if (res.data) {
        setPurchases((prev) => ({
          ...prev,
          [info.lens_id]: res.data!,
        }));
      }
      setIsCloudConnected(res.isCloud);
      if (res.error && !res.success) {
        setLastSyncError(res.error);
      } else {
        setLastSyncError(null);
      }
      return res;
    },
    []
  );

  const deletePurchase = useCallback(async (lensId: string) => {
    setPurchases((prev) => {
      const copy = { ...prev };
      delete copy[lensId];
      return copy;
    });

    const res = await deleteLensPurchaseRecord(lensId);
    if (res.error) {
      setLastSyncError(res.error);
    }
    return res;
  }, []);

  const config = getActiveSupabaseConfig();
  const isConfigured = Boolean(config.url && config.anonKey);

  return {
    purchases,
    loading,
    isConfigured,
    isCloudConnected,
    lastSyncError,
    refreshPurchases,
    savePurchase,
    deletePurchase,
  };
}
