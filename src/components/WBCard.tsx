import { Thermometer, Compass } from 'lucide-react';
import type { WhiteBalance } from '../types';

interface WBCardProps {
  wb: WhiteBalance;
}

function parseWBValue(raw: string): number {
  const match = raw.match(/-?\d+\.?\d*/);
  return match ? parseFloat(match[0]) : 0;
}

function WBGrid({ amber, magenta }: { amber: number; magenta: number }) {
  // Nikon WB fine-tune range typically from -6 to +6 (or -9 to +9)
  const maxRange = 4;
  // X axis: Amber (positive, right) to Blue (negative, left)
  // Let's standardise: Center is 50%, Right is Amber (+), Left is Blue (-)
  const xPct = Math.max(5, Math.min(95, 50 + (amber / maxRange) * 45));
  // Y axis: Magenta (positive, top) to Green (negative, bottom)
  const yPct = Math.max(5, Math.min(95, 50 - (magenta / maxRange) * 45));

  return (
    <div className="relative aspect-square w-full max-w-[130px] select-none rounded-xl border border-paper-border bg-paper-card p-1 shadow-inner">
      {/* 4 Quadrants with distinct color gradients */}
      <div className="grid h-full w-full grid-cols-2 grid-rows-2 overflow-hidden rounded-lg">
        {/* Top-Left: Blue + Magenta (Violet cool) */}
        <div className="bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 border-r border-b border-paper-border/40" />
        {/* Top-Right: Amber + Magenta (Warm peach) */}
        <div className="bg-gradient-to-bl from-amber-500/15 to-rose-500/15 border-b border-paper-border/40" />
        {/* Bottom-Left: Blue + Green (Cyan / Mint) */}
        <div className="bg-gradient-to-tr from-sky-500/15 to-teal-500/15 border-r border-paper-border/40" />
        {/* Bottom-Right: Amber + Green (Olive warm) */}
        <div className="bg-gradient-to-tl from-emerald-500/10 to-amber-500/10" />
      </div>

      {/* Axis crosshairs */}
      <div className="absolute left-1/2 top-1 bottom-1 w-px -translate-x-1/2 bg-ink-subtle/30" />
      <div className="absolute top-1/2 left-1 right-1 h-px -translate-y-1/2 bg-ink-subtle/30" />

      {/* Axis Labels */}
      <span className="absolute top-1 left-1/2 -translate-x-1/2 font-mono text-[9px] font-extrabold text-fuchsia-600 dark:text-fuchsia-400">
        M
      </span>
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400">
        G
      </span>
      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 font-mono text-[9px] font-extrabold text-blue-600 dark:text-blue-400">
        B
      </span>
      <span className="absolute right-1.5 top-1/2 -translate-y-1/2 font-mono text-[9px] font-extrabold text-amber-600 dark:text-amber-400">
        A
      </span>

      {/* Active Position Indicator / Laser Point */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
        style={{ left: `${xPct}%`, top: `${yPct}%` }}
      >
        <div className="relative flex items-center justify-center">
          <div className="h-4 w-4 rounded-full bg-accent/30 animate-ping opacity-75" />
          <div className="absolute h-3 w-3 rounded-full bg-accent ring-2 ring-white dark:ring-zinc-900 shadow-md" />
        </div>
      </div>
    </div>
  );
}

export function WBCard({ wb }: WBCardProps) {
  const amberVal = parseWBValue(wb.amber);
  const magentaVal = parseWBValue(wb.magenta);

  const isAmber = amberVal >= 0;
  const isMagenta = magentaVal >= 0;

  return (
    <div className="rounded-2xl border border-surface-border bg-surface/60 p-3.5 shadow-xs">
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Thermometer size={14} className="text-accent" />
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
            White Balance Fine-Tune
          </h4>
        </div>
        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-ink-subtle">
          <Compass size={11} />
          Nikon Matrix
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* 2D Nikon-style Coordinate Matrix */}
        <div className="flex justify-center sm:justify-start">
          <WBGrid amber={amberVal} magenta={magentaVal} />
        </div>

        {/* Readouts & Presets */}
        <div className="flex flex-1 flex-col justify-between gap-2.5">
          <div className="rounded-xl border border-surface-border bg-paper-card p-2.5">
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-ink-subtle">
              Base Temperature Preset
            </span>
            <p className="mt-0.5 font-mono text-xs font-bold text-ink">{wb.base}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Amber - Blue Axis */}
            <div
              className={`rounded-xl border p-2 text-center transition-colors ${
                isAmber
                  ? 'border-amber-500/30 bg-amber-500/10'
                  : 'border-blue-500/30 bg-blue-500/10'
              }`}
            >
              <span className={`font-mono text-[9px] font-bold uppercase tracking-wider ${isAmber ? 'text-amber-700 dark:text-amber-400' : 'text-blue-700 dark:text-blue-400'}`}>
                Trục Amber - Blue
              </span>
              <p
                className={`font-mono text-sm font-extrabold ${
                  isAmber ? 'text-amber-700 dark:text-amber-400' : 'text-blue-700 dark:text-blue-400'
                }`}
              >
                {wb.amber}
              </p>
            </div>

            {/* Green - Magenta Axis */}
            <div
              className={`rounded-xl border p-2 text-center transition-colors ${
                isMagenta
                  ? 'border-fuchsia-500/30 bg-fuchsia-500/10'
                  : 'border-emerald-500/30 bg-emerald-500/10'
              }`}
            >
              <span className={`font-mono text-[9px] font-bold uppercase tracking-wider ${isMagenta ? 'text-fuchsia-700 dark:text-fuchsia-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
                Trục Green - Magenta
              </span>
              <p
                className={`font-mono text-sm font-extrabold ${
                  isMagenta ? 'text-fuchsia-700 dark:text-fuchsia-400' : 'text-emerald-700 dark:text-emerald-400'
                }`}
              >
                {wb.magenta}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Field Note */}
      <div className="mt-2.5 rounded-xl border border-paper-border/60 bg-surface/80 p-2.5">
        <p className="text-xs leading-relaxed text-ink-muted">
          <strong className="font-semibold text-ink">Ghi chú thực địa: </strong>
          {wb.note}
        </p>
      </div>
    </div>
  );
}

