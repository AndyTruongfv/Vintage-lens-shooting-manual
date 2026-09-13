import { Camera, Aperture, Focus, Zap, Crosshair, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import type { CameraInfo } from '../types';

interface TacticalBodyBannerProps {
  camera: CameraInfo;
  onSelectRecipe?: (recipeId: string) => void;
}

const iconMap = {
  Camera: Camera,
  Aperture: Aperture,
  Focus: Focus,
};

export function TacticalBodyBanner({ camera }: TacticalBodyBannerProps) {
  const Icon = iconMap[camera.icon as keyof typeof iconMap] ?? Camera;

  return (
    <section
      aria-label={`Tactical Profile ${camera.label}`}
      className="animate-slide-up overflow-hidden rounded-2xl border border-accent/25 bg-gradient-to-br from-surface via-paper-card to-surface/80 shadow-md backdrop-blur-md transition-all duration-300"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-paper-border bg-surface/80 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent shadow-sm ring-1 ring-accent/30">
            <Icon size={22} className="stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-mono text-sm font-extrabold tracking-tight text-ink">{camera.label}</h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-accent ring-1 ring-accent/30">
                <CheckCircle2 size={10} />
                Active Body
              </span>
            </div>
            <p className="mt-0.5 text-xs font-semibold italic text-ink-muted">{camera.subtitle}</p>
          </div>
        </div>

        <div className="hidden shrink-0 text-right sm:block">
          <p className="font-mono text-[11px] font-bold text-ink">{camera.sensor}</p>
          <span className="rounded bg-surface-border px-1.5 py-0.5 font-mono text-[9px] font-medium text-ink-subtle">
            Nikon F/Z · {camera.releaseYear}
          </span>
        </div>
      </div>

      {/* Body specifications */}
      <div className="grid grid-cols-1 gap-2.5 p-4 sm:grid-cols-2">
        {/* Thế mạnh */}
        <div className="flex gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 transition-colors hover:bg-amber-500/10">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400">
            <Zap size={15} />
          </div>
          <div className="min-w-0">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              Thế mạnh cốt lõi (Combat Strengths)
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-ink">{camera.strengths}</p>
          </div>
        </div>

        {/* Ngữ cảnh tối ưu */}
        <div className="flex gap-2.5 rounded-xl border border-teal-500/20 bg-teal-500/5 p-3 transition-colors hover:bg-teal-500/10">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-500/20 text-teal-700 dark:text-teal-400">
            <Crosshair size={15} />
          </div>
          <div className="min-w-0">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400">
              Ngữ cảnh tối ưu (Optimal Shooting)
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-ink">{camera.optimalUse}</p>
          </div>
        </div>

        {/* Lens khuyên dùng */}
        <div className="flex gap-2.5 rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 transition-colors hover:bg-rose-500/10">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-500/20 text-rose-700 dark:text-rose-400">
            <Target size={15} />
          </div>
          <div className="min-w-0">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400">
              Lens khuyên dùng (Optics Match)
            </h3>
            <p className="mt-1 text-xs font-medium leading-relaxed text-ink">{camera.recommendedLenses}</p>
          </div>
        </div>

        {/* Recipes khuyên dùng */}
        <div className="flex gap-2.5 rounded-xl border border-accent/25 bg-accent/5 p-3 transition-colors hover:bg-accent/10">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent">
            <Sparkles size={15} />
          </div>
          <div className="min-w-0">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-accent">
              Công thức khuyên dùng (Recommended Recipes)
            </h3>
            <p className="mt-1 text-xs font-semibold leading-relaxed text-ink">{camera.recommendedProfiles}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

