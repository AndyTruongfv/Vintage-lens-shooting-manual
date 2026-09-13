import { useState, useEffect } from 'react';
import { Copy, Check, Camera, Sun, Aperture, ChevronDown, ChevronUp, Film, Star, Sparkles, Download } from 'lucide-react';
import type { Recipe, CameraBody } from '../types';
import { ParameterGrid } from './ParameterGrid';
import { WBCard } from './WBCard';
import { NcpExportModal } from './NcpExportModal';

interface RecipeCardProps {
  recipe: Recipe;
  recommendedBody?: CameraBody | null;
  isInitiallyExpanded?: boolean;
}

function buildCopyText(recipe: Recipe): string {

  const p = recipe.parameters;
  const lines = [
    `═════════════════════════════════════`,
    `NIKON NCP: [${recipe.id}] ${recipe.name}`,
    `Thể loại: ${recipe.category} | ${recipe.tag}`,
    `Base Profile: ${recipe.baseProfile}`,
    `Lens khuyên dùng: ${recipe.lensMatch}`,
    `Bối cảnh: ${recipe.scenario}`,
    `─────────────────────────────────────`,
    `[THÔNG SỐ PICTURE CONTROL]`,
    `• Quick Sharp / Sharpening: ${p.sharpening}`,
    `• Mid-Range Sharpening: ${p.midSharpening}`,
    `• Clarity: ${p.clarity}`,
    `• Contrast: ${p.contrast}`,
    `• Highlights: ${p.highlights}`,
    `• Shadows: ${p.shadows}`,
  ];
  if (p.saturation !== undefined) lines.push(`• Saturation: ${p.saturation}`);
  if (p.hue !== undefined) lines.push(`• Hue: ${p.hue}`);
  if (p.filterEffect !== undefined) lines.push(`• Filter Effect: ${p.filterEffect}`);
  if (p.toning !== undefined) lines.push(`• Toning: ${p.toning}`);
  lines.push(
    `─────────────────────────────────────`,
    `[WHITE BALANCE FINE-TUNE]`,
    `• Base WB: ${recipe.wb.base}`,
    `• Trục Amber-Blue (A-B): ${recipe.wb.amber}`,
    `• Trục Green-Magenta (G-M): ${recipe.wb.magenta}`,
    `• Ghi chú: ${recipe.wb.note}`,
    `═════════════════════════════════════`
  );
  return lines.join('\n');
}

function getCategoryStyle(category: Recipe['category']): { badge: string; dot: string } {
  switch (category) {
    case 'Portraits':
      return {
        badge: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20',
        dot: 'bg-amber-500',
      };
    case 'Cinema/Film':
      return {
        badge: 'bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-500/20',
        dot: 'bg-teal-500',
      };
    case 'Landscape/Macro':
      return {
        badge: 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20',
        dot: 'bg-emerald-500',
      };
    case 'Street/B&W':
      return {
        badge: 'bg-zinc-500/15 text-zinc-800 dark:text-zinc-200 border border-zinc-500/25',
        dot: 'bg-zinc-800 dark:bg-zinc-200',
      };
  }
}

function isBWRecipe(recipe: Recipe): boolean {
  return recipe.baseProfile === 'Monochrome' || recipe.category === 'Street/B&W';
}

export function RecipeCard({ recipe, recommendedBody, isInitiallyExpanded = false }: RecipeCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(isInitiallyExpanded);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const catStyle = getCategoryStyle(recipe.category);
  const isBW = isBWRecipe(recipe);

  // Sync expanded if isInitiallyExpanded changes
  useEffect(() => {
    if (isInitiallyExpanded) {
      setExpanded(true);
    }
  }, [isInitiallyExpanded]);

  const handleCopy = async () => {
    const text = buildCopyText(recipe);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        textarea.style.top = '-999999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback copy
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <>
      <article
        id={`recipe-${recipe.id}`}
        className={`animate-fade-in overflow-hidden rounded-2xl border transition-all duration-300 ${
          isInitiallyExpanded
            ? 'border-accent ring-2 ring-accent/40 shadow-lg'
            : recommendedBody
              ? 'border-accent/40 bg-paper-card shadow-md ring-1 ring-accent/20'
              : 'border-paper-border bg-paper-card shadow-xs hover:border-accent/30 hover:shadow-md'
        }`}
        aria-label={`${recipe.id} ${recipe.name}`}
      >
        {/* Header */}
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded-lg bg-ink px-2 py-0.5 font-mono text-[11px] font-extrabold text-paper shadow-xs">
                  {recipe.id}
                </span>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${catStyle.badge}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${catStyle.dot}`} />
                  {recipe.category}
                </span>
                {isBW && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-zinc-900 px-2.5 py-0.5 text-[10px] font-bold text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900">
                    <Film size={10} />
                    B&W Film
                  </span>
                )}
                {recommendedBody && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-accent ring-1 ring-accent/30 animate-pulse">
                    <Star size={10} className="fill-accent" />
                    ★ Đề xuất cho Nikon {recommendedBody}
                  </span>
                )}
              </div>

              <h3 className="mt-2 text-base font-extrabold leading-snug tracking-tight text-ink">
                {recipe.name}
              </h3>
              <p className="mt-0.5 text-xs font-semibold text-ink-subtle">{recipe.tag}</p>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-1.5 self-start shrink-0">
              {/* Single NCP Download Button */}
              <button
                onClick={() => setExportModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl border border-accent/30 bg-accent text-paper px-3 py-2 font-mono text-xs font-bold transition-all duration-200 hover:bg-accent/90 active:scale-95 shadow-xs"
                aria-label={`Tải file .NCP cho công thức ${recipe.name}`}
                title="Tải riêng file Picture Control (.NCP) này cho máy ảnh"
              >
                <Download size={14} />
                <span>Tải .NCP</span>
              </button>

              {/* Copy Recipe Button */}
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 font-mono text-xs font-bold transition-all duration-200 active:scale-95 shadow-xs ${
                  copied
                    ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                    : 'border border-accent/25 bg-accent/10 text-accent hover:bg-accent hover:text-paper'
                }`}
                aria-label={copied ? 'Đã sao chép' : 'Sao chép nhanh công thức'}
                title="Sao chép nhanh toàn bộ thông số vào Clipboard"
              >
                {copied ? <Check size={14} className="stroke-[3]" /> : <Copy size={14} />}
                <span>{copied ? 'Đã chép!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Base Profile info row */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-1 text-ink-subtle">
              <Camera size={13} />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Base Profile:</span>
            </div>
            <span className="rounded-md border border-paper-border bg-surface px-2 py-0.5 font-mono text-xs font-bold text-ink">
              {recipe.baseProfile}
            </span>
          </div>
        </div>

        {/* Expandable section */}
        <div className={`transition-all duration-300 ${expanded ? 'max-h-[2200px]' : 'max-h-0'} overflow-hidden`}>
          <div className="space-y-3 px-4 pb-4">
            {/* Optics Match */}
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3">
              <div className="flex items-center gap-2">
                <Aperture size={14} className="text-rose-600 dark:text-rose-400" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wide text-rose-800 dark:text-rose-400">
                  Optics Match (Ống kính khuyên dùng)
                </h4>
              </div>
              <p className="mt-1.5 text-xs font-semibold leading-relaxed text-ink">{recipe.lensMatch}</p>
            </div>

            {/* Lighting / Vibe */}
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
              <div className="flex items-center gap-2">
                <Sun size={14} className="text-amber-600 dark:text-amber-400" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-amber-400">
                  Bối cảnh & Ánh sáng tối ưu
                </h4>
              </div>
              <p className="mt-1.5 text-xs font-medium leading-relaxed text-ink">{recipe.scenario}</p>
            </div>

            {/* Parameters */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wide text-ink-muted">
                  Thông số Picture Control (NCP Parameters)
                </h4>
                <span className="font-mono text-[10px] text-ink-subtle">Thang đo -5.0 → +5.0</span>
              </div>
              <ParameterGrid params={recipe.parameters} />
            </div>

            {/* White Balance */}
            <WBCard wb={recipe.wb} />
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-center gap-1.5 border-t border-paper-border bg-surface/50 py-2.5 font-mono text-xs font-bold text-ink-muted transition-colors hover:bg-surface-hover hover:text-ink"
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <span>Thu gọn chi tiết</span> <ChevronUp size={14} />
            </>
          ) : (
            <>
              <span>Xem chi tiết thông số & White Balance</span> <ChevronDown size={14} />
            </>
          )}
        </button>
      </article>

      {/* Single NCP Export Confirmation Modal */}
      <NcpExportModal
        recipe={recipe}
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />
    </>
  );
}

