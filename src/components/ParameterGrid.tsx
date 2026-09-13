import type { RecipeParameters } from '../types';
import { Sparkles, Contrast, Sun, Moon, Droplet, Palette, SlidersHorizontal, Eye } from 'lucide-react';

interface ParameterGridProps {
  params: RecipeParameters;
}

function getValueClass(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) return 'text-ink-muted';
  if (num > 0) return 'text-amber-600 dark:text-amber-400 font-bold';
  if (num < 0) return 'text-blue-600 dark:text-blue-400 font-bold';
  return 'text-ink-muted';
}

function getBarWidth(value: string): number {
  const num = parseFloat(value);
  if (isNaN(num)) return 0;
  const clamped = Math.max(-5, Math.min(5, num));
  return Math.abs(clamped) / 5;
}

function getBarSide(value: string): 'positive' | 'negative' | 'neutral' {
  const num = parseFloat(value);
  if (isNaN(num)) return 'neutral';
  if (num > 0) return 'positive';
  if (num < 0) return 'negative';
  return 'neutral';
}

function ParamBar({ value }: { value: string }) {
  const width = getBarWidth(value);
  const side = getBarSide(value);
  const barColor =
    side === 'positive'
      ? 'bg-amber-500'
      : side === 'negative'
        ? 'bg-blue-500'
        : 'bg-zinc-400';

  return (
    <div className="relative h-1.5 w-full rounded-full bg-surface-border/60">
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-ink-subtle/30" />
      <div
        className={`absolute top-0 h-full rounded-full ${barColor} transition-all duration-500`}
        style={{
          width: `${width * 50}%`,
          left: side === 'negative' ? `${50 - width * 50}%` : '50%',
        }}
      />
    </div>
  );
}

function ParamCell({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-surface-border bg-surface/60 p-2.5 transition-colors hover:bg-surface-hover">
      <div className="flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-1.5 text-ink-subtle">
          {icon}
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider">{label}</span>
        </div>
        <span className={`font-mono text-xs ${getValueClass(value)}`}>{value}</span>
      </div>
      <div className="mt-2">
        <ParamBar value={value} />
      </div>
    </div>
  );
}

function getFilterBadgeStyle(filter: string) {
  const lower = filter.toLowerCase();
  if (lower.includes('red') || lower.includes('đỏ')) {
    return {
      bg: 'bg-red-500/15 border-red-500/30 text-red-700 dark:text-red-300',
      dot: 'bg-red-500 ring-2 ring-red-300 dark:ring-red-900',
      iconText: '🔴 Lọc Đỏ (Red - R)',
    };
  }
  if (lower.includes('orange') || lower.includes('cam')) {
    return {
      bg: 'bg-orange-500/15 border-orange-500/30 text-orange-700 dark:text-orange-300',
      dot: 'bg-orange-500 ring-2 ring-orange-300 dark:ring-orange-900',
      iconText: '🟠 Lọc Cam (Orange - O)',
    };
  }
  if (lower.includes('yellow') || lower.includes('vàng')) {
    return {
      bg: 'bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300',
      dot: 'bg-amber-500 ring-2 ring-amber-300 dark:ring-amber-900',
      iconText: '🟡 Lọc Vàng (Yellow - Y)',
    };
  }
  if (lower.includes('green') || lower.includes('xanh lá')) {
    return {
      bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300',
      dot: 'bg-emerald-500 ring-2 ring-emerald-300 dark:ring-emerald-900',
      iconText: '🟢 Lọc Xanh Lá (Green - G)',
    };
  }
  return {
    bg: 'bg-zinc-500/10 border-zinc-500/20 text-zinc-700 dark:text-zinc-300',
    dot: 'bg-zinc-400 ring-2 ring-zinc-200 dark:ring-zinc-800',
    iconText: '⚪ Không lọc (None)',
  };
}

function getToningBadgeStyle(toning: string) {
  const lower = toning.toLowerCase();
  if (lower.includes('sepia') || lower.includes('ấm')) {
    return {
      bg: 'bg-amber-900/15 border-amber-900/30 text-amber-900 dark:text-amber-200',
      dot: 'bg-amber-800 ring-2 ring-amber-400 dark:ring-amber-950',
      label: '🟤 Sepia (Tông ấm)',
    };
  }
  if (lower.includes('cyanotype') || lower.includes('thép') || lower.includes('xanh')) {
    return {
      bg: 'bg-sky-600/15 border-sky-600/30 text-sky-800 dark:text-sky-200',
      dot: 'bg-sky-600 ring-2 ring-sky-300 dark:ring-sky-950',
      label: '🔵 Cyanotype (Tông xanh thép)',
    };
  }
  return {
    bg: 'bg-zinc-500/10 border-zinc-500/20 text-zinc-700 dark:text-zinc-300',
    dot: 'bg-zinc-500 ring-2 ring-zinc-300 dark:ring-zinc-800',
    label: '⚪ Neutral (Đơn sắc chuẩn)',
  };
}

export function ParameterGrid({ params }: ParameterGridProps) {
  const hasFilter = params.filterEffect !== undefined;
  const hasToning = params.toning !== undefined;
  const filterStyle = hasFilter ? getFilterBadgeStyle(params.filterEffect!) : null;
  const toningStyle = hasToning ? getToningBadgeStyle(params.toning!) : null;

  return (
    <div className="space-y-2.5">
      {/* Parameters grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <ParamCell icon={<Sparkles size={12} />} label="Sharp" value={params.sharpening} />
        <ParamCell icon={<Sparkles size={12} />} label="Mid Sharp" value={params.midSharpening} />
        <ParamCell icon={<Contrast size={12} />} label="Clarity" value={params.clarity} />
        <ParamCell icon={<Contrast size={12} />} label="Contrast" value={params.contrast} />
        <ParamCell icon={<Sun size={12} />} label="Highlights" value={params.highlights} />
        <ParamCell icon={<Moon size={12} />} label="Shadows" value={params.shadows} />
        {params.saturation !== undefined && (
          <ParamCell icon={<Droplet size={12} />} label="Saturation" value={params.saturation} />
        )}
        {params.hue !== undefined && (
          <ParamCell icon={<Palette size={12} />} label="Hue" value={params.hue} />
        )}
      </div>

      {/* Filter & Toning dedicated visual section for B&W */}
      {(hasFilter || hasToning) && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 pt-1">
          {hasFilter && filterStyle && (
            <div className={`flex items-center gap-2.5 rounded-xl border p-2.5 ${filterStyle.bg}`}>
              <div className={`h-3 w-3 rounded-full shrink-0 ${filterStyle.dot}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <SlidersHorizontal size={11} className="opacity-70" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider opacity-80">
                    Filter Effect
                  </span>
                </div>
                <p className="mt-0.5 font-mono text-xs font-bold leading-tight truncate">
                  {params.filterEffect}
                </p>
              </div>
            </div>
          )}

          {hasToning && toningStyle && (
            <div className={`flex items-center gap-2.5 rounded-xl border p-2.5 ${toningStyle.bg}`}>
              <div className={`h-3 w-3 rounded-full shrink-0 ${toningStyle.dot}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <Eye size={11} className="opacity-70" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider opacity-80">
                    Toning Effect
                  </span>
                </div>
                <p className="mt-0.5 font-mono text-xs font-bold leading-tight truncate">
                  {params.toning}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

