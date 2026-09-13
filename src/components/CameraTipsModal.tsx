import { Camera, X, Zap, Crosshair, Target, Sparkles, Aperture, Focus } from 'lucide-react';
import type { CameraInfo } from '../types';
import { cameras } from '../data/cameras';

interface CameraTipsModalProps {
  body: CameraInfo['body'] | null;
  onClose: () => void;
}

const iconMap = {
  Camera: Camera,
  Aperture: Aperture,
  Focus: Focus,
};

export function CameraTipsModal({ body, onClose }: CameraTipsModalProps) {
  if (!body) return null;
  const cam = cameras.find((c) => c.body === body);
  if (!cam) return null;

  const Icon = iconMap[cam.icon as keyof typeof iconMap] ?? Camera;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${cam.label} tips`}
    >
      <div
        className="animate-scale-in max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-paper-border bg-paper p-5 shadow-2xl safe-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-paper-border pb-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/30">
              <Icon size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <h2 className="font-mono text-base font-extrabold text-ink">{cam.label}</h2>
              <p className="text-xs font-medium italic text-ink-subtle">{cam.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-paper-border bg-surface p-2 text-ink-muted transition-colors hover:bg-surface-hover hover:text-ink"
            aria-label="Đóng bảng hướng dẫn"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {/* Strengths */}
          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-3.5">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-amber-600 dark:text-amber-400" />
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                Thế mạnh cốt lõi
              </h3>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-ink">{cam.strengths}</p>
          </div>

          {/* Optimal Use */}
          <div className="rounded-2xl border border-teal-500/25 bg-teal-500/5 p-3.5">
            <div className="flex items-center gap-2">
              <Crosshair size={14} className="text-teal-600 dark:text-teal-400" />
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                Ngữ cảnh tối ưu
              </h3>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-ink">{cam.optimalUse}</p>
          </div>

          {/* Recommended Lenses */}
          <div className="rounded-2xl border border-rose-500/25 bg-rose-500/5 p-3.5">
            <div className="flex items-center gap-2">
              <Target size={14} className="text-rose-600 dark:text-rose-400" />
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                Lens khuyên dùng
              </h3>
            </div>
            <p className="mt-1 text-xs font-semibold leading-relaxed text-ink">{cam.recommendedLenses}</p>
          </div>

          {/* Recommended Profiles */}
          <div className="rounded-2xl border border-accent/25 bg-accent/5 p-3.5">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-accent" />
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
                Recipes khuyên dùng
              </h3>
            </div>
            <p className="mt-1 text-xs font-semibold leading-relaxed text-ink">{cam.recommendedProfiles}</p>
          </div>

          {/* Field Tips */}
          <div className="pt-1">
            <h3 className="mb-2 font-mono text-[10px] font-extrabold uppercase tracking-wider text-ink-subtle">
              Kinh nghiệm thực địa (Field Tips)
            </h3>
            <div className="space-y-2">
              {cam.tips.map((tip, i) => (
                <div key={i} className="flex gap-2.5 rounded-xl border border-surface-border bg-paper-card p-3 shadow-xs">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-accent/15 font-mono text-[10px] font-bold text-accent">
                    {i + 1}
                  </span>
                  <p className="text-xs leading-relaxed text-ink-muted">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

