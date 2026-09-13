import { ExternalLink, Sparkles, Camera, Aperture, Target, Compass, BookOpen } from 'lucide-react';
import type { GenreInspiration, CameraBody } from '../types';
import { genreInspirations } from '../data/masters';
import { recipes } from '../data/recipes';

interface MastersViewProps {
  onSelectRecipe: (recipeId: string) => void;
  onSelectBody?: (body: CameraBody) => void;
}

export function MastersView({ onSelectRecipe, onSelectBody }: MastersViewProps) {
  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Intro Header */}
      <section className="rounded-3xl border border-accent/25 bg-gradient-to-br from-accent/10 via-paper-card to-surface/80 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 text-accent">
          <Compass size={20} className="stroke-[2.2]" />
          <span className="font-mono text-xs font-extrabold uppercase tracking-wider">
            Inspiration & Masters Guide
          </span>
        </div>
        <h2 className="mt-2 text-lg sm:text-xl font-extrabold tracking-tight text-ink">
          Bậc Thầy Nhiếp Ảnh & Xu Hướng Thị Giác
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-ink-muted">
          Khám phá tư duy thị giác và ngôn ngữ ánh sáng của các bậc thầy huyền thoại thế giới. Mỗi thể loại được ánh xạ trực tiếp sang thân máy Nikon, ống kính vintage tối ưu và công thức màu Picture Control thực chiến.
        </p>
      </section>

      {/* Genre Cards Grid */}
      <div className="space-y-6">
        {genreInspirations.map((genre: GenreInspiration) => (
          <article
            key={genre.id}
            className="overflow-hidden rounded-3xl border border-paper-border bg-paper-card shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent/40"
            aria-label={genre.title}
          >
            {/* Genre Header */}
            <div className="border-b border-paper-border bg-surface/70 px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-xl bg-ink px-3 py-1 font-mono text-xs font-extrabold text-paper shadow-xs">
                    {genre.title}
                  </span>
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-accent">
                    {genre.genreTag}
                  </span>
                </div>
              </div>

              <h3 className="mt-2.5 text-base sm:text-lg font-bold text-ink">
                {genre.headline}
              </h3>
              <p className="mt-1 text-xs sm:text-sm leading-relaxed text-ink-muted">
                {genre.vibeDescription}
              </p>
            </div>

            {/* Masters Showcase */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-1.5 text-ink-subtle">
                <BookOpen size={14} className="text-accent" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  Bậc thầy đại diện & Phong cách cốt lõi
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
                {genre.masters.map((master) => (
                  <div
                    key={master.name}
                    className="flex flex-col justify-between rounded-2xl border border-surface-border bg-surface/50 p-4 transition-colors hover:bg-surface-hover hover:border-accent/30"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h5 className="font-bold text-sm text-ink">{master.name}</h5>
                          <p className="font-mono text-[10px] text-ink-subtle">{master.period}</p>
                        </div>
                        <a
                          href={master.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-accent/30 bg-accent/10 px-2 py-1 font-mono text-[10px] font-bold text-accent transition-all hover:bg-accent hover:text-paper"
                          title={`Xem portfolio chính thức của ${master.name}`}
                          aria-label={`Official website of ${master.name}`}
                        >
                          <span>Portfolio</span>
                          <ExternalLink size={10} />
                        </a>
                      </div>

                      {/* Signature style badge */}
                      <div className="mt-2.5 rounded-lg border border-paper-border/60 bg-paper-card p-2">
                        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-accent">
                          Signature Style
                        </span>
                        <p className="mt-0.5 text-xs font-semibold text-ink leading-snug">
                          {master.signatureStyle}
                        </p>
                      </div>

                      <p className="mt-2.5 text-xs leading-relaxed text-ink-muted">
                        {master.description}
                      </p>
                    </div>

                    {/* Key Technique */}
                    <div className="mt-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-2.5">
                      <p className="text-[11px] leading-relaxed text-ink">
                        <strong className="font-bold text-amber-800 dark:text-amber-300">Kỹ thuật vàng: </strong>
                        {master.keyTechnique}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tactical Gear & Recipe Mapping Section */}
              <div className="mt-4 rounded-2xl border border-accent/20 bg-gradient-to-br from-surface via-paper-card to-surface p-4 shadow-xs">
                <div className="flex items-center gap-1.5 mb-3">
                  <Target size={14} className="text-accent" />
                  <h4 className="font-mono text-xs font-extrabold uppercase tracking-wider text-ink">
                    Thiết lập thực chiến (Gear & Recipe Mapping)
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {/* Body Suggestion */}
                  <div className="rounded-xl border border-surface-border bg-surface/60 p-3">
                    <div className="flex items-center gap-1 text-ink-subtle mb-1.5">
                      <Camera size={12} className="text-accent" />
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider">
                        Body tối ưu
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {genre.recommendedBodies.map((body) => (
                        <button
                          key={body}
                          onClick={() => onSelectBody && onSelectBody(body)}
                          className="rounded-lg border border-accent/30 bg-accent/10 px-2 py-1 font-mono text-[11px] font-bold text-accent transition-all hover:bg-accent hover:text-paper"
                          title={`Lọc theo thân máy Nikon ${body}`}
                        >
                          Nikon {body}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lenses Suggestion */}
                  <div className="rounded-xl border border-surface-border bg-surface/60 p-3 sm:col-span-2">
                    <div className="flex items-center gap-1 text-ink-subtle mb-1.5">
                      <Aperture size={12} className="text-rose-600 dark:text-rose-400" />
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider">
                        Ống kính khuyên dùng
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-ink leading-relaxed">
                      {genre.recommendedLenses.join(' · ')}
                    </p>
                  </div>
                </div>

                {/* Recipe Mapping pills */}
                <div className="mt-3 pt-3 border-t border-paper-border/60">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles size={12} className="text-accent" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-subtle">
                      Công thức màu Picture Control gợi ý (Click để xem chi tiết):
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {genre.recommendedRecipeIds.map((recipeId) => {
                      const matchedRecipe = recipes.find((r) => r.id === recipeId);
                      if (!matchedRecipe) return null;
                      return (
                        <button
                          key={recipeId}
                          onClick={() => onSelectRecipe(recipeId)}
                          className="group flex items-center gap-1.5 rounded-xl border border-paper-border bg-paper-card px-3 py-1.5 transition-all duration-200 hover:border-accent hover:bg-accent/10 hover:shadow-xs active:scale-95 text-left"
                          title={`Xem công thức [${recipeId}] ${matchedRecipe.name}`}
                        >
                          <span className="rounded-md bg-ink px-1.5 py-0.5 font-mono text-[9px] font-extrabold text-paper group-hover:bg-accent">
                            {recipeId}
                          </span>
                          <span className="font-mono text-xs font-bold text-ink group-hover:text-accent">
                            {matchedRecipe.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
