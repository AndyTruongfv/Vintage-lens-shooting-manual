import { useState, useEffect } from 'react';
import {
  X,
  Download,
  Check,
  Sliders,
  Camera,
  Layers,
  Sparkles,
  FolderOpen,
  Info,
  FileCode,
  HardDrive,
} from 'lucide-react';
import type { Recipe } from '../types';
import { getRecipeNcpMeta, downloadSingleNcpFile } from '../utils/ncpExport';

interface NcpExportModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

export function NcpExportModal({ recipe, isOpen, onClose }: NcpExportModalProps) {
  const [downloaded, setDownloaded] = useState(false);

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

  if (!isOpen || !recipe) return null;

  const meta = getRecipeNcpMeta(recipe);

  const handleDownload = () => {
    downloadSingleNcpFile(recipe);
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
      onClose();
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ncp-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 flex max-h-[92vh] sm:max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-t-[2rem] sm:rounded-3xl border border-accent/30 bg-paper-card shadow-2xl transition-all">
        {/* Mobile Pull Handle */}
        <div className="flex sm:hidden justify-center pt-3 pb-1">
          <div className="h-1.5 w-12 rounded-full bg-paper-border/80" />
        </div>

        {/* Header */}
        <div className="relative border-b border-paper-border bg-surface/90 px-5 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-accent">
                <FileCode size={18} className="stroke-[2.2]" />
                <span className="font-mono text-xs font-extrabold uppercase tracking-wider">
                  Nikon Custom Picture Control (.NCP)
                </span>
              </div>

              <h3
                id="ncp-modal-title"
                className="mt-1 text-base sm:text-lg font-extrabold text-ink tracking-tight flex items-center gap-2"
              >
                <span>[{recipe.id}] {recipe.name}</span>
              </h3>

              <div className="mt-1 flex items-center gap-2 font-mono text-xs">
                <span className="rounded-md border border-accent/30 bg-accent/15 px-2 py-0.5 font-bold text-accent">
                  Tập tin: {meta.filename}
                </span>
                <span className="text-ink-subtle">
                  Base: {recipe.baseProfile}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-full border border-paper-border bg-paper-card p-2 text-ink-muted transition-colors hover:border-accent hover:bg-accent/10 hover:text-ink active:scale-95"
              aria-label="Đóng"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 space-y-4">
          {/* Card 1: Slot Name on Camera */}
          <div className="rounded-2xl border border-paper-border bg-surface/60 p-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-subtle flex items-center gap-1.5">
                <Camera size={13} className="text-accent" />
                <span>Tên hiển thị trên Body (Slot Name):</span>
              </span>
              <span className="font-mono text-xs font-extrabold rounded-lg bg-accent px-2.5 py-0.5 text-paper tracking-wider shadow-xs">
                {meta.slotName}
              </span>
            </div>
            <p className="text-[11px] text-ink-muted">
              (Tối đa 10 ký tự, hiển thị trong danh mục <em>Manage Picture Control</em> của Nikon).
            </p>
          </div>

          {/* Card 2: Tactical Mission */}
          <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-teal-800 dark:text-teal-300 font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Mục đích thực chiến:</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-ink">
              {meta.tacticalMission}
            </p>
          </div>

          {/* Card 3: Recommended Lenses */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
              <Layers size={14} />
              <span>Ống kính tối ưu trong Vault:</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold leading-relaxed text-ink">
              {meta.recommendedLenses}
            </p>
          </div>

          {/* Card 4: WB Reminder Alert */}
          <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4 space-y-2">
            <div className="flex items-center gap-2 text-orange-900 dark:text-orange-200">
              <Info size={16} className="text-orange-600 shrink-0" />
              <h4 className="font-mono text-xs font-extrabold uppercase tracking-wide">
                Nhắc nhở cân bằng trắng (White Balance):
              </h4>
            </div>

            <div className="rounded-xl border border-orange-500/20 bg-paper-card p-2.5 font-mono text-xs text-ink space-y-1">
              <p className="font-bold text-accent">
                {meta.wbSummary}
              </p>
              <p className="text-[11px] leading-relaxed text-ink-muted">
                {recipe.wb.note}
              </p>
            </div>

            <p className="text-[11px] leading-relaxed text-orange-950/80 dark:text-orange-200/80 italic">
              ⚠️ <strong>Lưu ý:</strong> File <code>.NCP</code> chỉ chứa thông số hạt màu, tương phản và độ nét. Thông số White Balance KHÔNG lưu trong file mà người chụp cần chỉnh trực tiếp trên máy ảnh.
            </p>
          </div>

          {/* Card 5: SD Card Path Guide */}
          <div className="rounded-2xl border border-paper-border bg-surface/50 p-3.5 flex items-start gap-2.5 text-xs text-ink-muted">
            <FolderOpen size={16} className="text-accent shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-mono text-[11px] font-bold text-ink">
                Đường dẫn sao chép vào thẻ nhớ:
              </p>
              <p className="font-mono text-[11px] text-accent font-semibold break-all">
                [Thẻ SD] ➔ NIKON ➔ CUSTOMPC ➔ {meta.filename}
              </p>
              <p className="text-[10px] text-ink-subtle">
                Sau khi chép, vào Menu máy: <em>Shooting Menu ➔ Manage Picture Control ➔ Load/Save</em> để nạp profile.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-paper-border bg-surface/95 px-5 py-3.5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
          <button
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl border border-paper-border bg-paper-card px-4 py-2 font-mono text-xs font-bold text-ink-muted hover:border-accent hover:text-ink transition-colors text-center order-2 sm:order-1"
          >
            Đóng
          </button>

          <button
            onClick={handleDownload}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl px-4 sm:px-5 py-3 font-mono text-xs sm:text-sm font-extrabold transition-all shadow-md active:scale-95 order-1 sm:order-2 text-center ${
              downloaded
                ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                : 'bg-accent text-paper hover:bg-accent/90 shadow-lg'
            }`}
          >
            {downloaded ? <Check size={16} className="stroke-[3] shrink-0" /> : <Download size={16} className="shrink-0" />}
            <span className="leading-snug">
              {downloaded
                ? `Đã lưu ${meta.filename}!`
                : `💾 Tải NCP cho ${meta.lensDescriptor} (${meta.filename})`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
