import { useState, useMemo, useCallback, useEffect } from 'react';
import { Aperture, BookOpen, Camera, Film, Compass, Sliders, Layers, DownloadCloud, Smartphone, Target, X } from 'lucide-react';
import type { Category, CameraBody, NavTab } from './types';
import { recipes } from './data/recipes';
import { cameras } from './data/cameras';
import { lensesVault } from './data/lenses';
import { SearchBar } from './components/SearchBar';
import { FilterPills } from './components/FilterPills';
import { BodySelector } from './components/BodySelector';
import { RecipeCard } from './components/RecipeCard';
import { CheatsheetDrawer } from './components/CheatsheetDrawer';
import { CameraTipsModal } from './components/CameraTipsModal';
import { ThemeToggle, type Theme } from './components/ThemeToggle';
import { LanguageToggle } from './components/LanguageToggle';
import { TacticalBodyBanner } from './components/TacticalBodyBanner';
import { MastersView } from './components/MastersView';
import { VaultView } from './components/VaultView';
import { InstallGuideModal } from './components/InstallGuideModal';
import { WBGuideModal } from './components/WBGuideModal';
import { usePWAInstall } from './hooks/usePWAInstall';
import { useLensPurchases } from './hooks/useLensPurchases';
import { useLanguage } from './context/LanguageContext';

function App() {
  const { lang, strings, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<NavTab>('recipes');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [bodyFilter, setBodyFilter] = useState<CameraBody | null>(null);
  const [highlightedRecipeId, setHighlightedRecipeId] = useState<string | null>(null);
  const [cheatsheetOpen, setCheatsheetOpen] = useState(false);
  const [wbGuideOpen, setWbGuideOpen] = useState(false);
  const [wbBannerDismissed, setWbBannerDismissed] = useState(false);
  const [tipsBody, setTipsBody] = useState<CameraBody | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [installGuideOpen, setInstallGuideOpen] = useState(false);

  const pwa = usePWAInstall();
  const {
    purchases,
    savePurchase,
    deletePurchase,
    refreshPurchases,
    isCloudConnected,
  } = useLensPurchases();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#121214' : theme === 'sepia' ? '#F4E9D8' : '#FAF7F2');
    }
  }, [theme]);

  const filteredRecipes = useMemo(() => {
    const query = search.toLowerCase().trim();
    const matched = recipes.filter((r) => {
      const matchesCategory = filter === 'All' || r.category === filter;
      if (!matchesCategory) return false;
      if (!query) return true;
      const haystack = [
        r.name,
        r.tag,
        r.lensMatch,
        r.scenario,
        r.scenarioEn || '',
        r.baseProfile,
        r.id,
        r.category,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });

    if (bodyFilter) {
      matched.sort((a, b) => {
        const aMatch = a.recommendedBodies?.includes(bodyFilter) ? 0 : 1;
        const bMatch = b.recommendedBodies?.includes(bodyFilter) ? 0 : 1;
        return aMatch - bMatch;
      });
    }

    return matched;
  }, [search, filter, bodyFilter]);

  const handleBodySelect = useCallback((body: CameraBody | null) => {
    setBodyFilter(body);
    setWbBannerDismissed(false); // Reset dismissal when switching body
  }, []);

  const handleSelectRecipeFromOtherTab = useCallback((recipeId: string) => {
    setActiveTab('recipes');
    setFilter('All');
    setSearch('');
    setHighlightedRecipeId(recipeId);

    // Smooth scroll to target recipe element
    setTimeout(() => {
      const el = document.getElementById(`recipe-${recipeId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  }, []);

  const handleSelectBodyFromOtherTab = useCallback((body: CameraBody) => {
    setActiveTab('recipes');
    setBodyFilter(body);
    setWbBannerDismissed(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const activeCamera = bodyFilter
    ? cameras.find((c) => c.body === bodyFilter) ?? null
    : null;

  return (
    <div className="paper-texture min-h-screen bg-paper text-ink transition-colors duration-300">
      {/* Header bar */}
      <header className="relative w-full border-b border-header-border bg-header/95 backdrop-blur-xl shadow-xs safe-top">
        <div className="relative w-full max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-accent/15 text-accent shadow-xs ring-1 ring-accent/30 shrink-0">
              <Aperture size={16} className="stroke-[2.2]" />
            </div>
            <div>
              <h1 className="font-mono text-xs sm:text-sm font-extrabold leading-tight tracking-tight text-ink">
                {strings.appTitle}
              </h1>
              <p className="font-mono text-[9px] font-semibold text-accent leading-none hidden sm:block">
                {strings.appSubtitle}
              </p>
            </div>
          </div>

          {/* Quick Header Actions: Language Switcher, Theme Toggle, Install PWA, WB Guide, Manual */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Elegant EN | VI Language Switcher */}
            <LanguageToggle />

            {/* Theme Toggle */}
            <ThemeToggle theme={theme} onChange={setTheme} />

            {/* Install PWA Button */}
            <button
              onClick={async () => {
                if (pwa.isInstallable) {
                  const installed = await pwa.triggerNativePrompt();
                  if (!installed) setInstallGuideOpen(true);
                } else {
                  setInstallGuideOpen(true);
                }
              }}
              className={`flex items-center gap-1 rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-1 font-mono text-[11px] sm:text-xs font-bold transition-all duration-200 active:scale-95 shadow-xs ${
                pwa.isInstallable
                  ? 'border border-emerald-500/40 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500/30 animate-pulse'
                  : 'border border-paper-border bg-paper-card text-ink hover:border-accent/40 hover:bg-surface-hover'
              }`}
              title={strings.pwaInstallTooltip}
              aria-label={strings.pwaInstall}
            >
              <DownloadCloud size={13} className={pwa.isInstallable ? 'text-emerald-600 dark:text-emerald-400' : 'text-accent'} />
              <span className="hidden sm:inline">{pwa.isInstalled ? strings.pwaInstalled : strings.pwaInstall}</span>
            </button>

            {/* Quick WB Guide Button */}
            <button
              onClick={() => setWbGuideOpen(true)}
              className="flex items-center gap-1 rounded-lg sm:rounded-xl border border-amber-500/30 bg-amber-500/10 px-2 sm:px-2.5 py-1 font-mono text-[11px] sm:text-xs font-bold text-amber-900 dark:text-amber-300 shadow-xs transition-all duration-200 hover:border-amber-500/50 hover:bg-amber-500/20 active:scale-95"
              aria-label={strings.wbGuideBtn}
              title={strings.wbGuideTooltip}
            >
              <Target size={13} className="text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">{strings.wbGuideBtn}</span>
              <span className="sm:hidden font-mono text-[10px]">{strings.wbGuideBtnMobile}</span>
            </button>

            {/* Cheatsheet Button */}
            <button
              onClick={() => setCheatsheetOpen(true)}
              className="flex items-center gap-1 rounded-lg sm:rounded-xl border border-paper-border bg-paper-card px-2 sm:px-2.5 py-1 font-mono text-[11px] sm:text-xs font-bold text-ink shadow-xs transition-all duration-200 hover:border-accent/40 hover:bg-surface-hover active:scale-95"
              aria-label={strings.cheatsheetBtn}
              title={strings.cheatsheetTooltip}
            >
              <BookOpen size={13} className="text-accent" />
              <span className="hidden sm:inline">{strings.cheatsheetBtn}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative w-full max-w-4xl mx-auto px-4 py-2 sm:py-3 space-y-2.5 sm:space-y-3.5">
        {/* Quick Offline PWA banner if not installed */}
        {!pwa.isInstalled && (
          <div className="flex items-center justify-between gap-2 rounded-xl border border-accent/25 bg-accent/10 px-3 py-1.5 text-xs shadow-xs">
            <div className="flex items-center gap-1.5 text-ink min-w-0">
              <Smartphone size={14} className="text-accent shrink-0" />
              <span className="font-semibold text-[11px] sm:text-xs leading-tight truncate">
                {strings.pwaBannerText}
              </span>
            </div>
            <button
              onClick={async () => {
                if (pwa.isInstallable) {
                  const installed = await pwa.triggerNativePrompt();
                  if (!installed) setInstallGuideOpen(true);
                } else {
                  setInstallGuideOpen(true);
                }
              }}
              className="shrink-0 rounded-lg bg-accent px-2 py-0.5 font-mono text-[10px] sm:text-[11px] font-bold text-paper hover:bg-accent/90 active:scale-95 transition-all shadow-xs"
            >
              {pwa.isInstallable ? strings.pwaBannerInstall : strings.pwaBannerGuide}
            </button>
          </div>
        )}

        {/* 3-Tab Navigation Switcher */}
        <nav className="grid grid-cols-3 gap-1 rounded-xl sm:rounded-2xl border border-paper-border bg-surface/80 p-1 shadow-inner" aria-label="Main Navigation">
          <button
            onClick={() => {
              setActiveTab('recipes');
              setHighlightedRecipeId(null);
            }}
            className={`flex items-center justify-center gap-1 rounded-lg sm:rounded-xl py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs font-bold transition-all duration-200 active:scale-98 ${
              activeTab === 'recipes'
                ? 'bg-accent text-paper shadow-sm ring-1 ring-accent/30'
                : 'text-ink-muted hover:text-ink hover:bg-surface-hover'
            }`}
            aria-current={activeTab === 'recipes' ? 'page' : undefined}
          >
            <Sliders size={12} className="shrink-0" />
            <span>{strings.navRecipes} ({recipes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('vault')}
            className={`flex items-center justify-center gap-1 rounded-lg sm:rounded-xl py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs font-bold transition-all duration-200 active:scale-98 ${
              activeTab === 'vault'
                ? 'bg-accent text-paper shadow-sm ring-1 ring-accent/30'
                : 'text-ink-muted hover:text-ink hover:bg-surface-hover'
            }`}
            aria-current={activeTab === 'vault' ? 'page' : undefined}
          >
            <Layers size={12} className="shrink-0" />
            <span>{strings.navVault} ({lensesVault.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('masters')}
            className={`flex items-center justify-center gap-1 rounded-lg sm:rounded-xl py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs font-bold transition-all duration-200 active:scale-98 ${
              activeTab === 'masters'
                ? 'bg-accent text-paper shadow-sm ring-1 ring-accent/30'
                : 'text-ink-muted hover:text-ink hover:bg-surface-hover'
            }`}
            aria-current={activeTab === 'masters' ? 'page' : undefined}
          >
            <Compass size={12} className="shrink-0" />
            <span>{strings.navMasters}</span>
          </button>
        </nav>

        {activeTab === 'vault' ? (
          /* The Vault Tab */
          <VaultView
            onSelectRecipe={handleSelectRecipeFromOtherTab}
            onSelectBody={handleSelectBodyFromOtherTab}
            purchases={purchases}
            onSavePurchase={savePurchase}
            onDeletePurchase={deletePurchase}
            onRefreshPurchases={refreshPurchases}
            isCloudConnected={isCloudConnected}
          />
        ) : activeTab === 'masters' ? (
          /* Masters & Trends Tab */
          <MastersView
            onSelectRecipe={handleSelectRecipeFromOtherTab}
            onSelectBody={handleSelectBodyFromOtherTab}
          />
        ) : (
          /* Field Recipes Tab */
          <div className="space-y-2.5 sm:space-y-3">
            {/* Search bar */}
            <div>
              <SearchBar value={search} onChange={setSearch} />
            </div>

            {/* Filter pills */}
            <div>
              <FilterPills active={filter} onChange={setFilter} />
            </div>

            {/* Body Selector (Tactical Body Dispatcher) */}
            <div>
              <BodySelector active={bodyFilter} onChange={handleBodySelect} />
            </div>

            {/* Compact Collapsible WB Bar — Only shown when D750 or D800E is selected */}
            {(bodyFilter === 'D750' || bodyFilter === 'D800E') && !wbBannerDismissed && (
              <div className="flex items-center justify-between gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs shadow-xs animate-fade-in">
                <button
                  onClick={() => setWbGuideOpen(true)}
                  className="flex items-center gap-2 text-left text-ink hover:text-accent flex-1 min-w-0 font-mono text-[11px] sm:text-xs font-bold"
                >
                  <Target size={14} className="text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="truncate">
                    {t('wbAlertBanner', { body: bodyFilter })}
                  </span>
                </button>
                <button
                  onClick={() => setWbBannerDismissed(true)}
                  className="rounded-lg p-1 text-ink-muted hover:text-ink hover:bg-surface-hover shrink-0"
                  title="Close alert"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Tactical Body Banner */}
            {activeCamera && (
              <div>
                <TacticalBodyBanner camera={activeCamera} />
              </div>
            )}

            {/* Counter bar */}
            <div className="flex items-center justify-between px-1 pt-1">
              <p className="font-mono text-xs font-semibold text-ink-subtle">
                {strings.counterShowing} <span className="font-bold text-ink">{filteredRecipes.length}</span> / {recipes.length} {strings.counterOfRecipes}
                {bodyFilter && (
                  <span className="ml-1.5 rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-bold text-accent">
                    {t('counterPriority', { body: bodyFilter })}
                  </span>
                )}
              </p>
              {bodyFilter && (
                <button
                  onClick={() => setTipsBody(bodyFilter)}
                  className="rounded-lg bg-surface px-2 py-0.5 font-mono text-[10px] font-bold text-ink-muted hover:text-ink border border-paper-border"
                >
                  {t('counterTipsBtn', { body: bodyFilter })}
                </button>
              )}
            </div>

            {/* Recipe cards list */}
            {filteredRecipes.length > 0 ? (
              <div className="space-y-4">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    recommendedBody={bodyFilter && recipe.recommendedBodies?.includes(bodyFilter) ? bodyFilter : null}
                    isInitiallyExpanded={highlightedRecipeId === recipe.id}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="rounded-2xl bg-surface p-4 text-ink-subtle">
                  <Camera size={36} />
                </div>
                <h3 className="mt-3 text-sm font-bold text-ink">{strings.noRecipesFound}</h3>
                <p className="mt-1 text-xs text-ink-subtle">{strings.noRecipesFoundSub}</p>
                <button
                  onClick={() => {
                    setSearch('');
                    setFilter('All');
                    setBodyFilter(null);
                  }}
                  className="mt-4 rounded-xl border border-paper-border bg-paper-card px-4 py-2 font-mono text-xs font-bold text-ink transition-colors hover:bg-surface-hover"
                >
                  {strings.resetFilters}
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Cheatsheet drawer */}
      <CheatsheetDrawer open={cheatsheetOpen} onClose={() => setCheatsheetOpen(false)} />

      {/* Camera tips modal */}
      <CameraTipsModal body={tipsBody} onClose={() => setTipsBody(null)} />

      {/* PWA Install Guide Modal */}
      <InstallGuideModal
        isOpen={installGuideOpen}
        onClose={() => setInstallGuideOpen(false)}
        isInstallable={pwa.isInstallable}
        isInstalled={pwa.isInstalled}
        isIOS={pwa.isIOS}
        isAndroid={pwa.isAndroid}
        isDesktop={pwa.isDesktop}
        onTriggerNativePrompt={pwa.triggerNativePrompt}
      />

      {/* White Balance Tactical Guide Modal */}
      <WBGuideModal isOpen={wbGuideOpen} onClose={() => setWbGuideOpen(false)} />
    </div>
  );
}

export default App;
