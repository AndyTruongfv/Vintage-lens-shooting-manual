import { useState, useMemo, useCallback, useEffect } from 'react';
import { Aperture, BookOpen, Camera, Film, Compass, Sliders, Layers, DownloadCloud, Smartphone, Target, ChevronRight } from 'lucide-react';
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
import { TacticalBodyBanner } from './components/TacticalBodyBanner';
import { MastersView } from './components/MastersView';
import { VaultView } from './components/VaultView';
import { InstallGuideModal } from './components/InstallGuideModal';
import { WBGuideModal } from './components/WBGuideModal';
import { usePWAInstall } from './hooks/usePWAInstall';

function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('recipes');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [bodyFilter, setBodyFilter] = useState<CameraBody | null>(null);
  const [highlightedRecipeId, setHighlightedRecipeId] = useState<string | null>(null);
  const [cheatsheetOpen, setCheatsheetOpen] = useState(false);
  const [wbGuideOpen, setWbGuideOpen] = useState(false);
  const [tipsBody, setTipsBody] = useState<CameraBody | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [installGuideOpen, setInstallGuideOpen] = useState(false);

  const pwa = usePWAInstall();

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const activeCamera = bodyFilter
    ? cameras.find((c) => c.body === bodyFilter) ?? null
    : null;

  return (
    <div className="paper-texture min-h-screen bg-paper text-ink transition-colors duration-300">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 safe-top border-b border-header-border bg-header/90 backdrop-blur-xl shadow-xs">
        <div className="mx-auto max-w-2xl px-4 pt-3 pb-3">
          {/* Title row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent shadow-xs ring-1 ring-accent/30">
                <Aperture size={20} className="stroke-[2.2]" />
              </div>
              <div>
                <h1 className="font-mono text-sm sm:text-base font-extrabold leading-tight tracking-tight text-ink">
                  Vintage Glass Field Companion
                </h1>
                <p className="font-mono text-[10px] font-semibold text-accent">
                  Di sản Quang học Đa quốc gia & Cẩm nang Màu Film
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
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
                className={`flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 font-mono text-xs font-bold transition-all duration-200 active:scale-95 shadow-xs ${
                  pwa.isInstallable
                    ? 'border border-emerald-500/40 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500/30 animate-pulse'
                    : 'border border-paper-border bg-paper-card text-ink hover:border-accent/40 hover:bg-surface-hover'
                }`}
                title="Cài app về Màn hình chính (PWA Offline)"
                aria-label="Cài đặt ứng dụng PWA"
              >
                <DownloadCloud size={14} className={pwa.isInstallable ? 'text-emerald-600 dark:text-emerald-400' : 'text-accent'} />
                <span className="hidden sm:inline">{pwa.isInstalled ? 'Đã cài PWA' : 'Cài App'}</span>
              </button>

              <button
                onClick={() => setWbGuideOpen(true)}
                className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-2.5 sm:px-3 py-1.5 font-mono text-xs font-bold text-amber-900 dark:text-amber-300 shadow-xs transition-all duration-200 hover:border-amber-500/50 hover:bg-amber-500/20 active:scale-95"
                aria-label="Mở cẩm nang cân bằng trắng WB"
                title="Cẩm nang cân bằng trắng White Balance cho Nikon D750 & D800E"
              >
                <Target size={14} className="text-amber-600 dark:text-amber-400" />
                <span className="hidden sm:inline">Chỉnh WB</span>
              </button>

              <button
                onClick={() => setCheatsheetOpen(true)}
                className="flex items-center gap-1.5 rounded-xl border border-paper-border bg-paper-card px-2.5 sm:px-3 py-1.5 font-mono text-xs font-bold text-ink shadow-xs transition-all duration-200 hover:border-accent/40 hover:bg-surface-hover active:scale-95"
                aria-label="Mở cẩm nang & bảo dưỡng"
              >
                <BookOpen size={14} className="text-accent" />
                <span className="hidden sm:inline">Cẩm nang</span>
              </button>
            </div>
          </div>

          {/* 3-Tab Navigation Switcher */}
          <nav className="mt-3 grid grid-cols-3 gap-1 rounded-2xl border border-paper-border bg-surface/70 p-1 shadow-inner" aria-label="Main Navigation">
            <button
              onClick={() => {
                setActiveTab('recipes');
                setHighlightedRecipeId(null);
              }}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2 font-mono text-[11px] sm:text-xs font-bold transition-all duration-200 active:scale-98 ${
                activeTab === 'recipes'
                  ? 'bg-accent text-paper shadow-sm ring-1 ring-accent/30'
                  : 'text-ink-muted hover:text-ink hover:bg-surface-hover'
              }`}
              aria-current={activeTab === 'recipes' ? 'page' : undefined}
            >
              <Sliders size={13} />
              <span>Recipes ({recipes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('vault')}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2 font-mono text-[11px] sm:text-xs font-bold transition-all duration-200 active:scale-98 ${
                activeTab === 'vault'
                  ? 'bg-accent text-paper shadow-sm ring-1 ring-accent/30'
                  : 'text-ink-muted hover:text-ink hover:bg-surface-hover'
              }`}
              aria-current={activeTab === 'vault' ? 'page' : undefined}
            >
              <Layers size={13} />
              <span>The Vault ({lensesVault.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('masters')}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2 font-mono text-[11px] sm:text-xs font-bold transition-all duration-200 active:scale-98 ${
                activeTab === 'masters'
                  ? 'bg-accent text-paper shadow-sm ring-1 ring-accent/30'
                  : 'text-ink-muted hover:text-ink hover:bg-surface-hover'
              }`}
              aria-current={activeTab === 'masters' ? 'page' : undefined}
            >
              <Compass size={13} />
              <span>Masters</span>
            </button>
          </nav>

          {/* Controls visible only in Field Recipes Tab */}
          {activeTab === 'recipes' && (
            <>
              {/* Search bar */}
              <div className="mt-2.5">
                <SearchBar value={search} onChange={setSearch} />
              </div>

              {/* Filter pills */}
              <div className="mt-2.5">
                <FilterPills active={filter} onChange={setFilter} />
              </div>

              {/* White Balance Tactical Guide Quick Trigger Banner */}
              <div className="mt-2.5">
                <button
                  onClick={() => setWbGuideOpen(true)}
                  className="w-full flex items-center justify-between gap-2 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-surface p-2.5 sm:p-3 text-left transition-all duration-200 hover:border-amber-500/60 hover:bg-amber-500/20 active:scale-98 shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/40">
                      <Target size={17} className="stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="font-mono text-xs font-black text-ink flex items-center gap-1.5 flex-wrap">
                        <span>🎯 Hướng dẫn chỉnh WB (D750 / D800E)</span>
                        <span className="rounded bg-amber-500/20 px-1.5 py-0.5 font-mono text-[9px] font-bold text-amber-800 dark:text-amber-300">
                          Lưới 2D & 3 Giải Pháp
                        </span>
                      </div>
                      <p className="text-[11px] text-ink-subtle">
                        Quy ước đổi màu 1s · Ô nhớ Preset PRE d-1~d-6 · Khóa cứng U1/U2 & Bank A/B/C/D
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-ink-muted shrink-0" />
                </button>
              </div>

              {/* Body Selector (Tactical Body Dispatcher) */}
              <div className="mt-2">
                <BodySelector active={bodyFilter} onChange={handleBodySelect} />
              </div>
            </>
          )}
        </div>
      </header>

      {/* Quick Offline PWA banner if not installed */}
      {!pwa.isInstalled && (
        <div className="mx-auto max-w-2xl px-4 pt-3">
          <div className="flex items-center justify-between gap-2 rounded-2xl border border-accent/25 bg-accent/10 px-3.5 py-2 text-xs shadow-xs">
            <div className="flex items-center gap-2 text-ink">
              <Smartphone size={15} className="text-accent shrink-0" />
              <span className="font-semibold text-[11px] sm:text-xs leading-tight">
                Cài về màn hình chính để dùng <strong>Offline 100%</strong>
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
              className="shrink-0 rounded-xl bg-accent px-2.5 py-1 font-mono text-[10px] sm:text-xs font-bold text-paper hover:bg-accent/90 active:scale-95 transition-all shadow-xs"
            >
              {pwa.isInstallable ? 'Cài ngay ➔' : 'Xem cách cài ➔'}
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 py-4">
        {activeTab === 'vault' ? (
          /* The Vault Tab (28 lenses in 2 bases) */
          <VaultView
            onSelectRecipe={handleSelectRecipeFromOtherTab}
            onSelectBody={handleSelectBodyFromOtherTab}
          />
        ) : activeTab === 'masters' ? (
          /* Masters & Trends Tab */
          <MastersView
            onSelectRecipe={handleSelectRecipeFromOtherTab}
            onSelectBody={handleSelectBodyFromOtherTab}
          />
        ) : (
          /* Field Recipes Tab */
          <>
            {/* Tactical Body Banner */}
            {activeCamera && (
              <div className="mb-4">
                <TacticalBodyBanner camera={activeCamera} />
              </div>
            )}

            {/* Counter bar */}
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="font-mono text-xs font-semibold text-ink-subtle">
                Hiển thị <span className="font-bold text-ink">{filteredRecipes.length}</span> / 13 công thức
                {bodyFilter && (
                  <span className="ml-1.5 rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-bold text-accent">
                    ★ Ưu tiên Nikon {bodyFilter}
                  </span>
                )}
              </p>
            </div>

            {/* Recipe Cards List */}
            {filteredRecipes.length > 0 ? (
              <div className="space-y-3.5 pb-12">
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
                <h3 className="mt-3 text-sm font-bold text-ink">Không tìm thấy công thức màu phù hợp</h3>
                <p className="mt-1 text-xs text-ink-subtle">Thử xóa từ khóa tìm kiếm hoặc chọn danh mục Tất cả.</p>
                <button
                  onClick={() => {
                    setSearch('');
                    setFilter('All');
                    setBodyFilter(null);
                  }}
                  className="mt-4 rounded-xl border border-paper-border bg-paper-card px-4 py-2 font-mono text-xs font-bold text-ink transition-colors hover:bg-surface-hover"
                >
                  Đặt lại tất cả bộ lọc
                </button>
              </div>
            )}
          </>
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



