import { ExternalLink, Camera, Aperture, Target, Compass, BookOpen } from 'lucide-react';
import type { GenreInspiration, CameraBody } from '../types';
import { genreInspirations } from '../data/masters';
import { recipes } from '../data/recipes';
import { useLanguage } from '../context/LanguageContext';

interface MastersViewProps {
  onSelectRecipe: (recipeId: string) => void;
  onSelectBody?: (body: CameraBody) => void;
}

export function MastersView({ onSelectRecipe, onSelectBody }: MastersViewProps) {
  const { strings, getLocalizedGenre, getLocalizedMaster } = useLanguage();

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Intro Header */}
      <section className="rounded-3xl border border-accent/25 bg-gradient-to-br from-accent/10 via-paper-card to-surface/80 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 text-accent">
          <Compass size={20} className="stroke-[2.2]" />
          <span className="font-mono text-xs font-extrabold uppercase tracking-wider">
            {strings.mastersHeaderTag}
          </span>
        </div>
        <h2 className="mt-2 text-lg sm:text-xl font-extrabold tracking-tight text-ink">
          {strings.mastersTitle}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-ink-muted">
          {strings.mastersSubtitle}
        </p>
      </section>

      {/* Genre Cards Grid */}
      <div className="space-y-6">
        {genreInspirations.map((genre: GenreInspiration) => {
          const locGenre = getLocalizedGenre(genre);

          return (
            <article
              key={genre.id}
              className="overflow-hidden rounded-3xl border border-paper-border bg-paper-card shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent/40"
              aria-label={locGenre.title}
            >
              {/* Genre Header */}
              <div className="border-b border-paper-border bg-surface/70 px-5 py-4 sm:px-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-xl bg-ink px-3 py-1 font-mono text-xs font-extrabold text-paper shadow-xs">
                      {locGenre.title}
                    </span>
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-accent">
                      {locGenre.genreTag}
                    </span>
                  </div>
                </div>

                <h3 className="mt-2.5 text-base sm:text-lg font-bold text-ink">
                  {locGenre.headline}
                </h3>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-ink-muted">
                  {locGenre.vibeDescription}
                </p>
              </div>

              {/* Masters Showcase */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-1.5 text-ink-subtle">
                  <BookOpen size={14} className="text-accent" />
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                    {strings.mastersPioneering}
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
                  {genre.masters.map((master) => {
                    const locMaster = getLocalizedMaster(master);

                    return (
                      <div
                        key={master.name}
                        className="flex flex-col justify-between rounded-2xl border border-surface-border bg-surface/50 p-4 transition-colors hover:bg-surface-hover hover:border-accent/30"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h5 className="font-bold text-sm text-ink">{master.name}</h5>
                              <p className="font-mono text-[10px] text-ink-subtle">{locMaster.period}</p>
                            </div>
                            <a
                              href={master.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-lg border border-accent/30 bg-accent/10 px-2 py-1 font-mono text-[10px] font-bold text-accent transition-all hover:bg-accent hover:text-paper"
                              title={`View official portfolio of ${master.name}`}
                              aria-label={`Official website of ${master.name}`}
                            >
                              <span>{strings.portfolioBtn}</span>
                              <ExternalLink size={10} />
                            </a>
                          </div>

                          {/* Signature style badge */}
                          <div className="mt-2.5 rounded-lg border border-paper-border/60 bg-paper-card p-2">
                            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-accent">
                              {strings.signatureStyleLabel}
                            </span>
                            <p className="mt-0.5 text-xs font-semibold text-ink leading-snug">
                              {locMaster.signatureStyle}
                            </p>
                          </div>

                          {/* Description */}
                          <p className="mt-2.5 text-xs text-ink-muted leading-relaxed">
                            {locMaster.description}
                          </p>
                        </div>

                        {/* Key technique */}
                        <div className="mt-3 rounded-lg border border-accent/20 bg-accent/5 p-2.5">
                          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-accent">
                            ⚡ {strings.mastersKeyTechnique}
                          </span>
                          <p className="mt-1 text-xs text-ink leading-relaxed font-medium">
                            {locMaster.keyTechnique}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Tactical Gear & Recipes Synergy */}
                <div className="mt-2 rounded-2xl border border-paper-border bg-surface/60 p-4 space-y-3">
                  <div className="flex items-center gap-1.5 text-ink-subtle">
                    <Target size={14} className="text-accent" />
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                      {strings.mastersSynergies}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {/* Recommended Bodies */}
                    <div className="space-y-1.5">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-subtle flex items-center gap-1">
                        <Camera size={12} className="text-accent" />
                        <span>Optimal Bodies</span>
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {genre.recommendedBodies.map((body) => (
                          <button
                            key={body}
                            onClick={() => onSelectBody?.(body)}
                            className="rounded-lg border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-xs font-bold text-accent transition-all hover:bg-accent hover:text-paper"
                            title={`Lọc theo thân máy ${body}`}
                          >
                            {body}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Lenses */}
                    <div className="space-y-1.5">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-subtle flex items-center gap-1">
                        <Aperture size={12} className="text-accent" />
                        <span>{strings.mastersLenses}</span>
                      </span>
                      <ul className="space-y-1">
                        {genre.recommendedLenses.map((lens) => (
                          <li
                            key={lens}
                            className="font-mono text-[11px] font-semibold text-ink truncate"
                            title={lens}
                          >
                            • {lens}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommended Recipes */}
                    <div className="space-y-1.5">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-subtle flex items-center gap-1">
                        <Compass size={12} className="text-accent" />
                        <span>{strings.mastersRecipes}</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {genre.recommendedRecipeIds.map((recipeId) => {
                          const r = recipes.find((item) => item.id === recipeId);
                          return (
                            <button
                              key={recipeId}
                              onClick={() => onSelectRecipe(recipeId)}
                              className="group inline-flex items-center gap-1 rounded-lg border border-paper-border bg-paper-card px-2 py-1 font-mono text-[11px] font-bold text-ink transition-all hover:border-accent hover:bg-accent hover:text-paper active:scale-95"
                              title={`Xem chi tiết [${recipeId}] ${r?.name || ''}`}
                            >
                              <span className="text-accent group-hover:text-paper font-extrabold">
                                {recipeId}
                              </span>
                              {r && (
                                <span className="text-[10px] text-ink-muted group-hover:text-paper truncate max-w-[80px]">
                                  {r.name.split(' ')[0]}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
