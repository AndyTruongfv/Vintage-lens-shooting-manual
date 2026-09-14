import { useState, useEffect } from 'react';
import {
  X,
  Tag,
  DollarSign,
  User,
  Calendar,
  FileText,
  Save,
  CheckCircle2,
  Trash2,
  Cloud,
  CloudOff,
  Settings,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import type { LensVaultItem, LensPurchaseInfo } from '../types';
import {
  getActiveSupabaseConfig,
  saveSupabaseConfigOverride,
  isSupabaseConfigured,
} from '../lib/supabase';

interface LensPurchaseModalProps {
  lens: LensVaultItem | null;
  purchaseInfo?: LensPurchaseInfo;
  isOpen: boolean;
  onClose: () => void;
  onSave: (info: LensPurchaseInfo) => Promise<{ success: boolean; isCloud: boolean; error?: string }>;
  onDelete?: (lensId: string) => Promise<{ success: boolean }>;
  onRefresh?: () => Promise<void>;
}

export function LensPurchaseModal({
  lens,
  purchaseInfo,
  isOpen,
  onClose,
  onSave,
  onDelete,
  onRefresh,
}: LensPurchaseModalProps) {
  const [price, setPrice] = useState('');
  const [seller, setSeller] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [notes, setNotes] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Supabase quick config drawer state
  const [showConfig, setShowConfig] = useState(false);
  const [configUrl, setConfigUrl] = useState('');
  const [configAnonKey, setConfigAnonKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(isSupabaseConfigured());

  // Load current values when modal opens or lens changes
  useEffect(() => {
    if (lens && isOpen) {
      setPrice(purchaseInfo?.price || '');
      setSeller(purchaseInfo?.seller || '');
      setPurchaseDate(purchaseInfo?.purchase_date || '');
      setNotes(purchaseInfo?.notes || '');
      setStatusMessage(null);
      setSavedSuccess(false);

      const activeCfg = getActiveSupabaseConfig();
      setConfigUrl(activeCfg.url || '');
      setConfigAnonKey(activeCfg.anonKey || '');
      setIsConfigured(isSupabaseConfigured());
    }
  }, [lens, purchaseInfo, isOpen]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !lens) return null;

  const isVN = lens.base === 'Vietnam';

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const payload: LensPurchaseInfo = {
        lens_id: lens.id,
        price: price.trim(),
        seller: seller.trim(),
        purchase_date: purchaseDate.trim(),
        notes: notes.trim(),
      };

      const result = await onSave(payload);

      if (result.success) {
        setSavedSuccess(true);
        setStatusMessage({
          type: 'success',
          text: result.isCloud
            ? 'Đã đồng bộ lên Supabase Cloud thành công!'
            : 'Đã lưu offline vào bộ nhớ máy.',
        });
        setTimeout(() => {
          setSavedSuccess(false);
          onClose();
        }, 1200);
      } else {
        setStatusMessage({
          type: 'error',
          text: result.error || 'Có lỗi xảy ra khi lưu dữ liệu.',
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Lỗi không xác định khi lưu thông tin.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete || !window.confirm(`Bạn có chắc chắn muốn xóa thông tin mua hàng của lens "${lens.name}"?`)) {
      return;
    }
    setIsSaving(true);
    try {
      await onDelete(lens.id);
      setPrice('');
      setSeller('');
      setPurchaseDate('');
      setNotes('');
      setStatusMessage({ type: 'info', text: 'Đã xóa thông tin mua hàng.' });
      setTimeout(() => onClose(), 800);
    } catch {
      setStatusMessage({ type: 'error', text: 'Không thể xóa dữ liệu.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveConfig = () => {
    saveSupabaseConfigOverride({
      url: configUrl.trim(),
      anonKey: configAnonKey.trim(),
    });
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);
    setShowConfig(false);
    if (onRefresh) onRefresh();
    setStatusMessage({
      type: configured ? 'success' : 'info',
      text: configured
        ? 'Đã cập nhật cấu hình Supabase!'
        : 'Đã khôi phục cấu hình mặc định.',
    });
  };

  const setTodayDate = () => {
    const today = new Date().toISOString().split('T')[0];
    setPurchaseDate(today);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="purchase-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative z-10 flex max-h-[92vh] sm:max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-t-[2rem] sm:rounded-3xl border border-accent/30 bg-paper-card shadow-2xl transition-all">
        {/* Mobile Pull Handle */}
        <div className="flex sm:hidden justify-center pt-3 pb-1">
          <div className="h-1.5 w-12 rounded-full bg-paper-border/80" />
        </div>

        {/* Header */}
        <div className="relative border-b border-paper-border bg-surface/90 px-5 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 pr-6">
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] font-bold">
                <span className="flex items-center gap-1 rounded-md bg-accent/15 px-2 py-0.5 text-accent">
                  <Tag size={11} />
                  <span>Purchase Info</span>
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 ${
                    isVN
                      ? 'bg-red-500/15 text-red-700 dark:text-red-300'
                      : 'bg-blue-500/15 text-blue-700 dark:text-blue-300'
                  }`}
                >
                  <span>{isVN ? '🇻🇳' : '🇫🇮'}</span>
                  <span>{lens.base}</span>
                </span>
                <span className="rounded-md border border-paper-border bg-paper-card px-1.5 py-0.5 text-ink">
                  {lens.mount}
                </span>
              </div>

              <h3
                id="purchase-modal-title"
                className="text-base sm:text-lg font-extrabold text-ink tracking-tight"
              >
                {lens.name}
              </h3>
              <p className="text-xs font-semibold italic text-accent">
                "{lens.nickname}"
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="rounded-full border border-paper-border bg-paper-card p-2 text-ink-muted transition-colors hover:border-accent hover:bg-accent/10 hover:text-ink active:scale-95"
              aria-label="Đóng popup"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cloud Sync Status Bar */}
          <div className="mt-3 flex items-center justify-between rounded-xl border border-paper-border bg-surface/70 px-3 py-1.5 text-xs">
            <div className="flex items-center gap-1.5">
              {isConfigured ? (
                <>
                  <Cloud size={14} className="text-emerald-500" />
                  <span className="font-mono text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    Supabase Cloud Sync
                  </span>
                </>
              ) : (
                <>
                  <CloudOff size={14} className="text-amber-500" />
                  <span className="font-mono text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                    Lưu trữ Offline thiết bị
                  </span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowConfig(!showConfig)}
              className="flex items-center gap-1 font-mono text-[10px] font-bold text-ink-muted hover:text-accent underline transition-colors"
            >
              <Settings size={11} />
              <span>{showConfig ? 'Ẩn cấu hình' : 'Cài đặt Supabase'}</span>
            </button>
          </div>

          {/* Collapsible Supabase Settings */}
          {showConfig && (
            <div className="mt-2.5 rounded-xl border border-accent/25 bg-accent/5 p-3 text-xs space-y-2.5 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-accent">
                  ⚙️ Cấu hình Supabase API
                </span>
                <span className="text-[10px] text-ink-subtle">
                  Bảng: <code className="font-mono font-bold">lens_purchases</code>
                </span>
              </div>
              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] text-ink-muted">
                  Supabase Project URL (VITE_SUPABASE_URL):
                </label>
                <input
                  type="text"
                  value={configUrl}
                  onChange={(e) => setConfigUrl(e.target.value)}
                  placeholder="https://your-project.supabase.co"
                  className="w-full rounded-lg border border-paper-border bg-paper-card px-2.5 py-1.5 text-xs font-mono text-ink placeholder-ink-subtle focus:border-accent focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] text-ink-muted">
                  Supabase Anon Key (VITE_SUPABASE_ANON_KEY):
                </label>
                <input
                  type="password"
                  value={configAnonKey}
                  onChange={(e) => setConfigAnonKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full rounded-lg border border-paper-border bg-paper-card px-2.5 py-1.5 text-xs font-mono text-ink placeholder-ink-subtle focus:border-accent focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowConfig(false)}
                  className="rounded-lg px-2 py-1 font-mono text-[10px] text-ink-muted hover:text-ink"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={handleSaveConfig}
                  className="rounded-lg bg-accent px-3 py-1 font-mono text-[11px] font-bold text-paper hover:bg-accent/90"
                >
                  Áp dụng
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-5 py-4 sm:px-6 space-y-4">
          {/* Status notification */}
          {statusMessage && (
            <div
              className={`flex items-center gap-2 rounded-xl p-2.5 text-xs leading-snug animate-fade-in ${
                statusMessage.type === 'success'
                  ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                  : statusMessage.type === 'error'
                  ? 'border border-red-500/30 bg-red-500/10 text-red-800 dark:text-red-300'
                  : 'border border-blue-500/30 bg-blue-500/10 text-blue-800 dark:text-blue-300'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle size={16} className="shrink-0 text-red-600" />
              )}
              <span className="font-semibold">{statusMessage.text}</span>
            </div>
          )}

          {/* Field 1: Giá Mua (Price) */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 font-mono text-xs font-bold text-ink">
              <DollarSign size={14} className="text-accent" />
              <span>Giá mua (Price)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="VD: 1.800.000 đ hoặc 75 €"
                className="w-full rounded-xl border border-paper-border bg-paper-card px-3.5 py-2.5 text-sm text-ink placeholder-ink-subtle shadow-xs transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
            {/* Quick Currency Presets */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {['1.500.000 đ', '2.000.000 đ', '3.500.000 đ', '50 €', '100 €'].map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => setPrice(preset)}
                  className="rounded-md border border-paper-border bg-surface px-2 py-0.5 font-mono text-[10px] text-ink-muted hover:border-accent hover:text-accent transition-colors"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Field 2: Người bán / Nguồn mua (Seller) */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 font-mono text-xs font-bold text-ink">
              <User size={14} className="text-accent" />
              <span>Người bán / Nơi mua (Seller / Store)</span>
            </label>
            <input
              type="text"
              value={seller}
              onChange={(e) => setSeller(e.target.value)}
              placeholder="VD: Group Nikon Vintage VN / Tori.fi Finland / eBay Nhật..."
              className="w-full rounded-xl border border-paper-border bg-paper-card px-3.5 py-2.5 text-sm text-ink placeholder-ink-subtle shadow-xs transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>

          {/* Field 3: Ngày mua (Purchase Date) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 font-mono text-xs font-bold text-ink">
                <Calendar size={14} className="text-accent" />
                <span>Ngày mua (Purchase Date)</span>
              </label>
              <button
                type="button"
                onClick={setTodayDate}
                className="font-mono text-[10px] text-accent hover:underline font-semibold"
              >
                Hôm nay
              </button>
            </div>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="w-full rounded-xl border border-paper-border bg-paper-card px-3.5 py-2.5 text-sm text-ink shadow-xs transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>

          {/* Field 4: Ghi chú & Tình trạng (Notes) */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 font-mono text-xs font-bold text-ink">
              <FileText size={14} className="text-accent" />
              <span>Ghi chú tình trạng & Phụ kiện (Notes)</span>
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="VD: Kính trong không rễ tre, vòng nét êm, đã kèm cap trước sau kim loại và ngàm chuyển sang Z5..."
              className="w-full rounded-xl border border-paper-border bg-paper-card p-3 text-xs sm:text-sm text-ink placeholder-ink-subtle shadow-xs transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>

          {/* Timestamp info if exists */}
          {purchaseInfo?.updated_at && (
            <p className="font-mono text-[10px] text-ink-subtle text-right">
              Cập nhật lần cuối: {new Date(purchaseInfo.updated_at).toLocaleString('vi-VN')}
            </p>
          )}

          {/* Footer Actions */}
          <div className="pt-3 border-t border-paper-border flex items-center justify-between gap-2">
            <div>
              {purchaseInfo?.price || purchaseInfo?.seller ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1 rounded-xl px-2.5 py-2 font-mono text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                  title="Xóa thông tin mua hàng"
                >
                  <Trash2 size={14} />
                  <span>Xóa</span>
                </button>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="rounded-xl border border-paper-border bg-paper-card px-4 py-2 font-mono text-xs font-bold text-ink-muted hover:text-ink hover:bg-surface transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-accent/30 bg-accent text-paper px-5 py-2 font-mono text-xs font-bold shadow-md hover:bg-accent/90 active:scale-95 transition-all disabled:opacity-60"
              >
                {isSaving ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Đang lưu...</span>
                  </>
                ) : savedSuccess ? (
                  <>
                    <CheckCircle2 size={14} />
                    <span>Đã lưu!</span>
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    <span>Lưu thông tin</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
