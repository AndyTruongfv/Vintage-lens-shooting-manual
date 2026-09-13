import { useState, useEffect } from 'react';
import {
  X,
  Smartphone,
  Laptop,
  Share2,
  MoreVertical,
  PlusSquare,
  DownloadCloud,
  CheckCircle2,
  Zap,
  WifiOff,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isDesktop: boolean;
  onTriggerNativePrompt: () => Promise<boolean>;
}

type TabType = 'ios' | 'android' | 'desktop';

export function InstallGuideModal({
  isOpen,
  onClose,
  isInstallable,
  isInstalled,
  isIOS,
  isAndroid,
  isDesktop,
  onTriggerNativePrompt,
}: InstallGuideModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('ios');

  // Auto select appropriate tab when opened
  useEffect(() => {
    if (isIOS) setActiveTab('ios');
    else if (isAndroid) setActiveTab('android');
    else setActiveTab('desktop');
  }, [isIOS, isAndroid, isDesktop, isOpen]);

  // Lock body scroll
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

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await onTriggerNativePrompt();
    if (success) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-guide-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal / Sheet Container */}
      <div className="relative z-10 flex max-h-[92vh] sm:max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-t-[2rem] sm:rounded-3xl border border-accent/30 bg-paper-card shadow-2xl transition-all">
        {/* Mobile Pull handle */}
        <div className="flex sm:hidden justify-center pt-3 pb-1">
          <div className="h-1.5 w-12 rounded-full bg-paper-border/80" />
        </div>

        {/* Header */}
        <div className="relative border-b border-paper-border bg-surface/90 px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-accent">
                <DownloadCloud size={18} className="stroke-[2.2]" />
                <span className="font-mono text-xs font-extrabold uppercase tracking-wider">
                  PWA Quick-Launch & Offline
                </span>
              </div>
              <h3
                id="install-guide-title"
                className="mt-1 text-lg sm:text-xl font-extrabold text-ink tracking-tight"
              >
                Cài App về Màn Hình Chính
              </h3>
              <p className="text-xs text-ink-muted">
                Thêm ứng dụng để sử dụng toàn màn hình & chạy ngoại tuyến 100% không cần mạng
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-full border border-paper-border bg-paper-card p-2 text-ink-muted transition-colors hover:border-accent hover:bg-accent/10 hover:text-ink active:scale-95"
              aria-label="Đóng hướng dẫn"
            >
              <X size={18} />
            </button>
          </div>

          {/* Device Tabs */}
          <div className="mt-4 grid grid-cols-3 gap-1 rounded-2xl border border-paper-border bg-paper-card p-1">
            <button
              onClick={() => setActiveTab('ios')}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2 font-mono text-xs font-bold transition-all ${
                activeTab === 'ios'
                  ? 'bg-accent text-paper shadow-sm ring-1 ring-accent/30'
                  : 'text-ink-muted hover:text-ink hover:bg-surface'
              }`}
            >
              <Smartphone size={14} />
              <span>iPhone / iPad</span>
            </button>

            <button
              onClick={() => setActiveTab('android')}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2 font-mono text-xs font-bold transition-all ${
                activeTab === 'android'
                  ? 'bg-accent text-paper shadow-sm ring-1 ring-accent/30'
                  : 'text-ink-muted hover:text-ink hover:bg-surface'
              }`}
            >
              <Smartphone size={14} />
              <span>Android</span>
            </button>

            <button
              onClick={() => setActiveTab('desktop')}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2 font-mono text-xs font-bold transition-all ${
                activeTab === 'desktop'
                  ? 'bg-accent text-paper shadow-sm ring-1 ring-accent/30'
                  : 'text-ink-muted hover:text-ink hover:bg-surface'
              }`}
            >
              <Laptop size={14} />
              <span>Máy tính PC/Mac</span>
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6 space-y-4">
          {/* Native Install Button (if browser supports prompt) */}
          {isInstallable && (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                  <Zap size={18} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-emerald-900 dark:text-emerald-200">
                    Trình duyệt hỗ trợ Cài đặt 1-Chạm!
                  </h4>
                  <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80">
                    Bấm nút bên cạnh để thêm app vào màn hình ngay lập tức.
                  </p>
                </div>
              </div>

              <button
                onClick={handleInstallClick}
                className="shrink-0 rounded-xl bg-emerald-600 px-4 py-2 font-mono text-xs font-extrabold text-white shadow-sm hover:bg-emerald-700 active:scale-95 transition-all text-center"
              >
                📲 Cài Đặt Ngay
              </button>
            </div>
          )}

          {/* Already installed banner */}
          {isInstalled && (
            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-3.5 flex items-center gap-2.5">
              <CheckCircle2 size={18} className="text-blue-600 shrink-0" />
              <p className="text-xs font-semibold text-blue-900 dark:text-blue-200">
                Ứng dụng đang chạy ở chế độ Standalone (Đã cài đặt PWA)!
              </p>
            </div>
          )}

          {/* Tab 1: iOS Safari Guide */}
          {activeTab === 'ios' && (
            <div className="space-y-3">
              <div className="rounded-2xl border border-paper-border bg-surface/60 p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-paper font-mono text-xs font-extrabold">
                    1
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-ink">
                      Mở trang web bằng trình duyệt <span className="text-accent">Safari</span>
                    </p>
                    <p className="text-[11px] text-ink-muted">
                      (Lưu ý: Không dùng trình duyệt nhúng trong Zalo, Messenger hoặc Facebook)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-paper font-mono text-xs font-extrabold">
                    2
                  </span>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-bold text-ink flex items-center gap-1.5">
                      <span>Bấm vào biểu tượng</span>
                      <span className="inline-flex items-center gap-1 rounded-md border border-paper-border bg-paper-card px-1.5 py-0.5 text-accent font-mono text-xs font-bold">
                        <Share2 size={12} /> Chia sẻ (Share)
                      </span>
                    </p>
                    <p className="text-[11px] text-ink-muted">
                      Nằm ở thanh công cụ dưới đáy màn hình iPhone (hoặc góc trên phải của iPad).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-paper font-mono text-xs font-extrabold">
                    3
                  </span>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-bold text-ink flex items-center gap-1.5">
                      <span>Cuộn xuống và chọn</span>
                      <span className="inline-flex items-center gap-1 rounded-md border border-paper-border bg-paper-card px-1.5 py-0.5 text-accent font-mono text-xs font-bold">
                        <PlusSquare size={12} /> Thêm vào MH chính
                      </span>
                    </p>
                    <p className="text-[11px] text-ink-muted">
                      (Tùy chọn tiếng Anh: <em>"Add to Home Screen"</em>)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-paper font-mono text-xs font-extrabold">
                    4
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-ink">
                      Đổi tên thành <strong>"Vintage Glass"</strong> và bấm <strong>Thêm (Add)</strong>
                    </p>
                    <p className="text-[11px] text-ink-muted">
                      Icon ứng dụng sẽ xuất hiện trên màn hình chính và mở toàn màn hình độc lập không còn thanh URL.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Android Guide */}
          {activeTab === 'android' && (
            <div className="space-y-3">
              <div className="rounded-2xl border border-paper-border bg-surface/60 p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-paper font-mono text-xs font-extrabold">
                    1
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-ink">
                      Mở website bằng <span className="text-accent">Google Chrome</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-paper font-mono text-xs font-extrabold">
                    2
                  </span>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-bold text-ink flex items-center gap-1.5">
                      <span>Bấm vào biểu tượng menu</span>
                      <span className="inline-flex items-center gap-0.5 rounded-md border border-paper-border bg-paper-card px-1.5 py-0.5 text-accent font-mono text-xs font-bold">
                        <MoreVertical size={12} /> 3 chấm dọc
                      </span>
                    </p>
                    <p className="text-[11px] text-ink-muted">
                      Nằm ở góc trên cùng bên phải màn hình Chrome.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-paper font-mono text-xs font-extrabold">
                    3
                  </span>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-bold text-ink flex items-center gap-1.5">
                      <span>Chọn</span>
                      <span className="inline-flex items-center gap-1 rounded-md border border-paper-border bg-paper-card px-1.5 py-0.5 text-accent font-mono text-xs font-bold">
                        <DownloadCloud size={12} /> Cài đặt ứng dụng
                      </span>
                      <span>hoặc</span>
                      <span className="inline-flex items-center gap-1 rounded-md border border-paper-border bg-paper-card px-1.5 py-0.5 text-accent font-mono text-xs font-bold">
                        Thêm vào màn hình chính
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-paper font-mono text-xs font-extrabold">
                    4
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-ink">
                      Bấm <strong>Cài đặt (Install)</strong> để hoàn tất
                    </p>
                    <p className="text-[11px] text-ink-muted">
                      App sẽ có icon riêng trong danh sách ứng dụng của điện thoại.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Desktop Guide */}
          {activeTab === 'desktop' && (
            <div className="space-y-3">
              <div className="rounded-2xl border border-paper-border bg-surface/60 p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-paper font-mono text-xs font-extrabold">
                    1
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-ink">
                      Mở website trên <span className="text-accent">Google Chrome</span> hoặc <span className="text-accent">Microsoft Edge</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-paper font-mono text-xs font-extrabold">
                    2
                  </span>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-bold text-ink">
                      Nhìn lên góc phải của thanh địa chỉ (URL Bar), nhấp vào biểu tượng <strong>Cài đặt (Install App ⤓)</strong>
                    </p>
                    <p className="text-[11px] text-ink-muted">
                      Biểu tượng hình máy tính có mũi tên xuống hoặc dấu cộng tròn bên cạnh ngôi sao bookmark.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-paper font-mono text-xs font-extrabold">
                    3
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-ink">
                      Bấm <strong>"Cài đặt" (Install)</strong> trong cửa sổ xác nhận
                    </p>
                    <p className="text-[11px] text-ink-muted">
                      Ứng dụng sẽ mở trong một cửa sổ phần mềm độc lập, tự động tạo lối tắt trên Desktop và thanh Taskbar/Dock.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Offline Capabilities Highlight */}
          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4 flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-800 dark:text-amber-300">
              <WifiOff size={16} />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
                Sẵn sàng hoạt động ngoại tuyến (100% Offline)
              </h4>
              <p className="text-[11px] leading-relaxed text-ink-muted">
                Sau khi thêm vào màn hình chính, toàn bộ 13 Picture Control Recipe, 28 ống kính và thông số kỹ thuật đều được lưu trữ trực tiếp trên thiết bị của bạn. Bạn có thể tra cứu thoải mái khi đi rừng, leo núi hoặc ở vùng không có sóng 4G/Wi-Fi.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-paper-border bg-surface/95 px-5 py-3.5 sm:px-6 flex items-center justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl border border-paper-border bg-paper-card px-5 py-2 font-mono text-xs font-bold text-ink transition-colors hover:border-accent hover:bg-surface-hover"
          >
            Đã hiểu, đóng hướng dẫn
          </button>
        </div>
      </div>
    </div>
  );
}
