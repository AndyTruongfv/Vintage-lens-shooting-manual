import { useState, useMemo } from 'react';
import {
  Download,
  Search,
  Sparkles,
  Camera,
  Aperture,
  Compass,
  Tag,
  Check,
  Award,
  Eye,
  ChevronRight,
  DollarSign,
  Cloud,
  CloudOff,
} from 'lucide-react';
import type { LensVaultItem, LensLocation, CameraBody, LensPurchaseInfo } from '../types';
import { lensesVault } from '../data/lenses';
import { recipes } from '../data/recipes';
import { downloadVaultCatalog } from '../utils/exportCatalog';
import { LensDossierModal } from './LensDossierModal';
import { LensPurchaseModal } from './LensPurchaseModal';
import { useLanguage } from '../context/LanguageContext';

interface VaultViewProps {
  onSelectRecipe: (recipeId: string) => void;
  onSelectBody?: (body: CameraBody) => void;
  purchases?: Record<string, LensPurchaseInfo>;
  onSavePurchase?: (info: LensPurchaseInfo) => Promise<{ success: boolean; isCloud: boolean; error?: string }>;
  onDeletePurchase?: (lensId: string) => Promise<{ success: boolean }>;
  onRefreshPurchases?: () => Promise<void>;
  isCloudConnected?: boolean;
}

export type FocalRangeKey = 'all' | 'wide' | '35mm' | '50_55mm' | 'portrait_macro' | 'telephoto';

interface FocalGroupMeta {
  id: FocalRangeKey;
  labelKey: string;
  badgeKey: string;
  shortLabelKey: string;
  taglineKey: string;
  icon: string;
  matcher: (focal: string) => boolean;
}

export const FOCAL_GROUPS: FocalGroupMeta[] = [
  {
    id: 'all',
    labelKey: 'focalGroupAll',
    badgeKey: 'focalGroupAll',
    shortLabelKey: 'filterAll',
    taglineKey: 'focalGroupAllTagline',
    icon: '🌐',
    matcher: () => true,
  },
  {
    id: 'wide',
    labelKey: 'focalGroupWide',
    badgeKey: '< 35mm',
    shortLabelKey: 'focalGroupWideShort',
    taglineKey: 'focalGroupWideTagline',
    icon: '🏔️',
    matcher: (focal: string) =>
      focal.includes('18-35') || focal.includes('24mm') || focal.includes('28-70') || focal.includes('24-120'),
  },
  {
    id: '35mm',
    labelKey: 'focalGroup35',
    badgeKey: '35mm',
    shortLabelKey: 'focalGroup35Short',
    taglineKey: 'focalGroup35Tagline',
    icon: '🚶',
    matcher: (focal: string) =>
      focal.includes('35mm') || focal.includes('18-35') || focal.includes('35-70') || focal.includes('28-70') || focal.includes('24-120'),
  },
  {
    id: '50_55mm',
    labelKey: 'focalGroup50',
    badgeKey: '50 - 58mm',
    shortLabelKey: 'focalGroup50Short',
    taglineKey: 'focalGroup50Tagline',
    icon: '🎯',
    matcher: (focal: string) =>
      focal.includes('50mm') ||
      focal.includes('55mm') ||
      focal.includes('58mm') ||
      focal.includes('35-70') ||
      focal.includes('28-70') ||
      focal.includes('24-120'),
  },
  {
    id: 'portrait_macro',
    labelKey: 'focalGroupPortrait',
    badgeKey: '85 - 105mm',
    shortLabelKey: 'focalGroupPortraitShort',
    taglineKey: 'focalGroupPortraitTagline',
    icon: '🌸',
    matcher: (focal: string) =>
      focal.includes('85mm') ||
      focal.includes('90mm') ||
      focal.includes('105mm') ||
      focal.includes('24-120') ||
      focal.includes('70-210') ||
      focal.includes('80-200') ||
      focal.includes('80-210'),
  },
  {
    id: 'telephoto',
    labelKey: 'focalGroupTele',
    badgeKey: '≥ 135mm',
    shortLabelKey: 'focalGroupTeleShort',
    taglineKey: 'focalGroupTeleTagline',
    icon: '🔭',
    matcher: (focal: string) =>
      focal.includes('135mm') ||
      focal.includes('180mm') ||
      focal.includes('70-210') ||
      focal.includes('80-200') ||
      focal.includes('80-210'),
  },
];

export function VaultView({
  onSelectRecipe,
  onSelectBody,
  purchases = {},
  onSavePurchase,
  onDeletePurchase,
  onRefreshPurchases,
  isCloudConnected = false,
}: VaultViewProps) {
  const { lang, strings, t, getLocalizedLens } = useLanguage();
  const [baseFilter, setBaseFilter] = useState<'All' | LensLocation>('All');
  const [focalFilter, setFocalFilter] = useState<FocalRangeKey>('all');
  const [showMatrix, setShowMatrix] = useState(true);
  const [search, setSearch] = useState('');
  const [downloaded, setDownloaded] = useState(false);
  const [selectedLensForDossier, setSelectedLensForDossier] = useState<LensVaultItem | null>(null);
  const [selectedLensForPurchase, setSelectedLensForPurchase] = useState<LensVaultItem | null>(null);

  const vnCount = useMemo(() => lensesVault.filter((l) => l.base === 'Vietnam').length, []);
  const fiCount = useMemo(() => lensesVault.filter((l) => l.base === 'Finland').length, []);
  const purchaseCount = useMemo(() => Object.keys(purchases).length, [purchases]);

  // Dynamic focal distribution metrics with localized labels
  const focalStats = useMemo(() => {
    return FOCAL_GROUPS.map((grp) => {
      const vn = lensesVault.filter((l) => l.base === 'Vietnam' && grp.matcher(l.focalLength)).length;
      const fi = lensesVault.filter((l) => l.base === 'Finland' && grp.matcher(l.focalLength)).length;
      const total = lensesVault.filter((l) => grp.matcher(l.focalLength)).length;
      const shortLabel = (strings[grp.shortLabelKey as keyof typeof strings] as string) || grp.shortLabelKey;
      return {
        ...grp,
        shortLabel,
        vn,
        fi,
        total,
      };
    });
  }, [strings]);

  const filteredLenses = useMemo(() => {
    const query = search.toLowerCase().trim();
    const activeFocalGroup = FOCAL_GROUPS.find((g) => g.id === focalFilter);

    return lensesVault.filter((lens) => {
      // 1. Base filter
      const matchBase = baseFilter === 'All' || lens.base === baseFilter;
      if (!matchBase) return false;

      // 2. Focal group filter
      if (activeFocalGroup && activeFocalGroup.id !== 'all') {
        if (!activeFocalGroup.matcher(lens.focalLength)) return false;
      }

      // 3. Search query (matches both VI and EN fields)
      if (!query) return true;

      const haystack = [
        lens.name,
        lens.nickname,
        lens.nicknameEn || '',
        lens.mount,
        lens.mountEn || '',
        lens.focalLength,
        lens.maxAperture,
        lens.history,
        lens.historyEn || '',
        lens.strengths,
        lens.strengthsEn || '',
        lens.goldenMilestones,
        lens.goldenMilestonesEn || '',
        ...(lens.specialFeatures || []),
        ...(lens.specialFeaturesEn || []),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [baseFilter, focalFilter, search]);

  const handleExport = () => {
    downloadVaultCatalog(lang);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const activeFocalMeta = FOCAL_GROUPS.find((g) => g.id === focalFilter);
  const activeFocalLabel = activeFocalMeta
    ? (strings[activeFocalMeta.shortLabelKey as keyof typeof strings] as string) || activeFocalMeta.shortLabelKey
    : '';

  return (
    <div className="space-y-5 pb-16 animate-fade-in">
      {/* Intro & Export Banner */}
      <section className="rounded-3xl border border-accent/25 bg-gradient-to-br from-accent/10 via-paper-card to-surface/80 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-accent">
              <Compass size={20} className="stroke-[2.2]" />
              <span className="font-mono text-xs font-extrabold uppercase tracking-wider">
                {strings.vaultHeaderTag}
              </span>
            </div>
            <h2 className="mt-2 text-lg sm:text-xl font-extrabold tracking-tight text-ink">
              {t('vaultTitle', { count: lensesVault.length })}
            </h2>
            <p className="mt-1 text-xs sm:text-sm leading-relaxed text-ink-muted">
              {t('vaultSubtitle', { vn: vnCount, fi: fiCount })}
            </p>
          </div>

          <button
            onClick={handleExport}
            className={`flex shrink-0 items-center justify-center gap-2 rounded-2xl px-4 py-3 font-mono text-xs font-bold transition-all duration-200 shadow-sm active:scale-95 ${
              downloaded
                ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                : 'border border-accent/30 bg-accent text-paper hover:bg-accent/90'
            }`}
            title="Download Markdown catalog & maintenance guide"
            aria-label={strings.exportCatalogBtn}
          >
            {downloaded ? <Check size={16} className="stroke-[3]" /> : <Download size={16} />}
            <span>{downloaded ? strings.exportCatalogSuccess : strings.exportCatalogBtn}</span>
          </button>
        </div>

        {/* Quick Location Pills Filter */}
        <div className="mt-5 flex flex-wrap items-center gap-2 pt-4 border-t border-paper-border/60">
          <button
            onClick={() => setBaseFilter('All')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 font-mono text-xs font-bold transition-all duration-200 active:scale-95 ${
              baseFilter === 'All'
                ? 'bg-accent text-paper shadow-sm ring-1 ring-accent/30'
                : 'border border-paper-border bg-paper-card text-ink-muted hover:border-accent/40 hover:text-ink'
            }`}
          >
            <span>{t('locAll', { count: lensesVault.length })}</span>
          </button>

          <button
            onClick={() => setBaseFilter('Vietnam')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 font-mono text-xs font-bold transition-all duration-200 active:scale-95 ${
              baseFilter === 'Vietnam'
                ? 'bg-red-600 text-white shadow-sm ring-1 ring-red-400'
                : 'border border-paper-border bg-paper-card text-ink-muted hover:border-red-400 hover:text-ink'
            }`}
          >
            <span className="text-sm">🇻🇳</span>
            <span>{t('locVn', { count: vnCount })}</span>
          </button>

          <button
            onClick={() => setBaseFilter('Finland')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 font-mono text-xs font-bold transition-all duration-200 active:scale-95 ${
              baseFilter === 'Finland'
                ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                : 'border border-paper-border bg-paper-card text-ink-muted hover:border-blue-400 hover:text-ink'
            }`}
          >
            <span className="text-sm">🇫🇮</span>
            <span>{t('locFi', { count: fiCount })}</span>
          </button>

          <button
            onClick={() => setShowMatrix((prev) => !prev)}
            className="ml-auto flex items-center gap-1 text-[11px] font-mono font-bold text-accent hover:underline px-2 py-1 rounded-lg hover:bg-accent/10 transition-colors"
          >
            <span>{showMatrix ? strings.toggleMatrixCollapse : strings.toggleMatrixExpand}</span>
          </button>
        </div>

        {/* Interactive Focal Matrix Summary Cards */}
        {showMatrix && (
          <div className="mt-4 rounded-2xl border border-paper-border/80 bg-surface/90 p-3 sm:p-4 transition-all">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-1.5 text-ink font-bold text-xs">
                <span>📊</span>
                <span>{strings.matrixTitle}</span>
              </div>
              {focalFilter !== 'all' && (
                <button
                  onClick={() => setFocalFilter('all')}
                  className="text-[10px] font-mono font-bold text-accent hover:underline"
                >
                  {strings.matrixClear}
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {focalStats.map((item) => {
                const isSelected = focalFilter === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setFocalFilter(item.id)}
                    className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all duration-200 active:scale-95 ${
                      isSelected
                        ? 'border-accent bg-accent text-paper shadow-sm ring-2 ring-accent/30'
                        : 'border-paper-border bg-paper-card hover:border-accent/50 hover:bg-paper-card/80 text-ink'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm">{item.icon}</span>
                      <span
                        className={`font-mono text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-accent/15 text-accent'
                        }`}
                      >
                        {item.total} {strings.vaultLenses}
                      </span>
                    </div>
                    <div className="mt-1 font-bold text-xs truncate w-full">{item.shortLabel}</div>
                    <div
                      className={`mt-1 flex items-center gap-1 font-mono text-[10px] ${
                        isSelected ? 'text-white/80' : 'text-ink-subtle'
                      }`}
                    >
                      <span>🇻🇳 {item.vn}</span>
                      <span>•</span>
                      <span>🇫🇮 {item.fi}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Search Bar in Vault */}
        <div className="mt-3 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-subtle" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={strings.searchPlaceholderVault}
            className="w-full rounded-2xl border border-paper-border bg-paper-card py-2.5 pl-10 pr-4 text-xs sm:text-sm text-ink placeholder-ink-subtle shadow-xs transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </section>

      {/* Result counter & Purchase Stats */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-mono text-xs font-semibold text-ink-subtle">
            {strings.vaultShowing}{' '}
            <span className="font-bold text-ink">{filteredLenses.length}</span> / {lensesVault.length} {strings.vaultLenses}
          </p>
          {baseFilter !== 'All' && (
            <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-bold text-accent">
              {baseFilter === 'Vietnam' ? `🇻🇳 ${strings.vnBaseTag}` : `🇫🇮 ${strings.fiBaseTag}`}
            </span>
          )}
          {focalFilter !== 'all' && (
            <span className="flex items-center gap-1 rounded bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:text-amber-300">
              <span>{strings.focalFilterPrefix} {activeFocalLabel}</span>
              <button
                onClick={() => setFocalFilter('all')}
                className="hover:text-red-500 ml-0.5 text-xs font-black"
                title="Bỏ lọc tiêu cự"
              >
                ×
              </button>
            </span>
          )}
        </div>

        {/* Purchase Info count & Cloud badge */}
        <div className="flex items-center gap-2">
          {purchaseCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-800 dark:text-amber-300">
              <Tag size={10} />
              <span>{t('purchaseCountText', { saved: purchaseCount, total: lensesVault.length })}</span>
            </span>
          )}
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
              isCloudConnected
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                : 'bg-paper-card text-ink-subtle border border-paper-border'
            }`}
            title={isCloudConnected ? 'Supabase Cloud Sync active' : 'Offline Storage Mode'}
          >
            {isCloudConnected ? <Cloud size={11} className="text-emerald-500" /> : <CloudOff size={11} />}
            <span>{isCloudConnected ? strings.cloudSyncActive : strings.cloudSyncOffline}</span>
          </span>
        </div>
      </div>

      {/* Lens Cards Grid */}
      {filteredLenses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredLenses.map((lens: LensVaultItem, index: number) => {
            const isVN = lens.base === 'Vietnam';
            const purchase = purchases[lens.id];
            const hasPurchaseData = Boolean(purchase && (purchase.price || purchase.seller || purchase.notes));
            const loc = getLocalizedLens(lens);

            return (
              <article
                key={lens.id}
                onClick={() => setSelectedLensForDossier(lens)}
                className="group cursor-pointer overflow-hidden rounded-3xl border border-paper-border bg-paper-card shadow-sm transition-all duration-300 hover:border-accent/60 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.995]"
                aria-label={t('openDossierAria', { name: lens.name })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedLensForDossier(lens);
                  }
                }}
              >
                {/* Header */}
                <div className="border-b border-paper-border bg-surface/70 p-4 sm:px-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-xs font-extrabold text-ink-subtle">
                        #{index + 1}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                          isVN
                            ? 'bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20'
                            : 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20'
                        }`}
                      >
                        <span>{isVN ? '🇻🇳' : '🇫🇮'}</span>
                        <span>{isVN ? strings.vnBaseTag : strings.fiBaseTag}</span>
                      </span>

                      <span className="rounded-md border border-paper-border bg-paper-card px-2 py-0.5 font-mono text-[10px] font-bold text-ink">
                        {loc.mount}
                      </span>

                      {lens.filterThread && (
                        <span className="rounded-md bg-surface px-2 py-0.5 font-mono text-[10px] font-semibold text-ink-subtle">
                          {strings.filterSizePrefix}{lens.filterThread}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-extrabold text-accent">
                        {lens.focalLength} · {lens.maxAperture}
                      </span>

                      {/* [P] Purchase Info Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLensForPurchase(lens);
                        }}
                        className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 font-mono text-[11px] font-bold transition-all duration-200 active:scale-95 shadow-xs ${
                          hasPurchaseData
                            ? 'border border-amber-500/40 bg-amber-500/15 text-amber-900 dark:text-amber-300 ring-1 ring-amber-500/30 hover:bg-amber-500/25'
                            : 'border border-paper-border bg-paper-card text-ink-muted hover:border-accent/40 hover:text-accent hover:bg-accent/10'
                        }`}
                        title={
                          hasPurchaseData
                            ? `Price: ${purchase?.price || 'N/A'} - Seller: ${purchase?.seller || 'N/A'}`
                            : `Add purchase info for ${lens.name}`
                        }
                        aria-label={`Purchase info ${lens.name}`}
                      >
                        <span className="font-extrabold text-amber-600 dark:text-amber-400">[P]</span>
                        {purchase?.price ? (
                          <span className="text-[10px] font-extrabold truncate max-w-[85px]">
                            {purchase.price}
                          </span>
                        ) : (
                          <span className="text-[10px] hidden sm:inline">{strings.purchaseBtnLabel}</span>
                        )}
                      </button>

                      {/* Dossier Button */}
                      <span className="hidden sm:inline-flex items-center gap-1 rounded-xl border border-accent/25 bg-accent/10 px-2.5 py-1 font-mono text-[10px] font-extrabold text-accent group-hover:bg-accent group-hover:text-paper transition-all">
                        <Eye size={12} />
                        <span>{strings.dossierBtnLabel}</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-ink tracking-tight group-hover:text-accent transition-colors">
                        {lens.name}
                      </h3>
                      <p className="mt-0.5 text-xs font-semibold italic text-accent">
                        "{loc.nickname}"
                      </p>
                    </div>
                    <span className="sm:hidden inline-flex items-center gap-1 rounded-lg bg-accent/10 p-1.5 text-accent group-hover:bg-accent group-hover:text-paper transition-all">
                      <ChevronRight size={14} />
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-5 space-y-3.5">
                  {/* Special Features tags & Purchase snapshot */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {loc.specialFeatures &&
                      loc.specialFeatures.map((feat) => (
                        <span
                          key={feat}
                          className="inline-flex items-center gap-1 rounded-lg border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-800 dark:text-amber-300"
                        >
                          <Tag size={10} />
                          {feat}
                        </span>
                      ))}

                    {/* Quick Purchase Info Tag if present */}
                    {hasPurchaseData && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLensForPurchase(lens);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                        title="Click to view/edit purchase details"
                      >
                        <DollarSign size={10} />
                        <span>
                          {purchase?.price ? `${strings.pricePaidLabel}: ${purchase.price}` : strings.purchaseBtnLabel}
                          {purchase?.seller ? ` · ${purchase.seller}` : ''}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* History */}
                  <p className="text-xs leading-relaxed text-ink-muted line-clamp-3 sm:line-clamp-none">
                    <strong className="font-bold text-ink">{strings.historyHeading} </strong>
                    {loc.history}
                  </p>

                  {/* Optical Strengths */}
                  <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-3">
                    <div className="flex items-center gap-1.5 text-teal-800 dark:text-teal-300 mb-1">
                      <Aperture size={13} />
                      <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider">
                        {strings.strengthsHeading}
                      </h4>
                    </div>
                    <p className="text-xs leading-relaxed text-ink">{loc.strengths}</p>
                  </div>

                  {/* Golden Milestones */}
                  <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3">
                    <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 mb-1">
                      <Award size={13} />
                      <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider">
                        {strings.goldenMilestonesHeading}
                      </h4>
                    </div>
                    <p className="text-xs font-semibold leading-relaxed text-ink">
                      {loc.goldenMilestones}
                    </p>
                  </div>

                  {/* Footer: Body & Recipe Mapping */}
                  <div className="pt-2 border-t border-paper-border/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    {/* Recommended Bodies */}
                    <div className="flex items-center gap-1.5">
                      <Camera size={13} className="text-accent shrink-0" />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-subtle">
                        {strings.optimalBodyLabel}
                      </span>
                      <div className="flex gap-1">
                        {lens.recommendedBodies.map((body) => (
                          <button
                            key={body}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectBody) onSelectBody(body);
                            }}
                            className="rounded-md border border-accent/20 bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-accent hover:bg-accent hover:text-paper transition-all"
                            title={`Filter by Nikon ${body}`}
                          >
                            {body}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Recipes clickable pills */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Sparkles size={13} className="text-accent shrink-0" />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-subtle">
                        {strings.viewRecipeLabel}
                      </span>
                      {lens.recommendedRecipeIds.map((recipeId) => {
                        const r = recipes.find((item) => item.id === recipeId);
                        return (
                          <button
                            key={recipeId}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectRecipe(recipeId);
                            }}
                            className="group/pill inline-flex items-center gap-1 rounded-lg border border-paper-border bg-surface px-2 py-1 font-mono text-[11px] font-bold text-ink transition-all hover:border-accent hover:bg-accent hover:text-paper active:scale-95"
                            title={`View recipe [${recipeId}] ${r?.name || ''}`}
                          >
                            <span className="text-accent group-hover/pill:text-paper font-extrabold">
                              {recipeId}
                            </span>
                            {r && (
                              <span className="text-[10px] text-ink-muted group-hover/pill:text-paper">
                                {r.name.split(' ')[0]}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Aperture size={36} className="text-ink-subtle" />
          <h3 className="mt-3 text-sm font-bold text-ink">{strings.noLensesFound}</h3>
          <p className="mt-1 text-xs text-ink-subtle">{strings.noLensesFoundSub}</p>
          <button
            onClick={() => {
              setSearch('');
              setBaseFilter('All');
              setFocalFilter('all');
            }}
            className="mt-3 rounded-xl border border-paper-border bg-paper-card px-4 py-2 font-mono text-xs font-bold text-ink transition-colors hover:bg-surface-hover"
          >
            {strings.resetVaultFilter}
          </button>
        </div>
      )}

      {/* Tactical Dossier Modal */}
      <LensDossierModal
        lens={selectedLensForDossier}
        purchaseInfo={selectedLensForDossier ? purchases[selectedLensForDossier.id] : undefined}
        onOpenPurchaseModal={(lens) => setSelectedLensForPurchase(lens)}
        isOpen={!!selectedLensForDossier}
        onClose={() => setSelectedLensForDossier(null)}
        onSelectRecipe={onSelectRecipe}
        onSelectBody={onSelectBody}
      />

      {/* [P] Lens Purchase Info Modal */}
      <LensPurchaseModal
        lens={selectedLensForPurchase}
        purchaseInfo={selectedLensForPurchase ? purchases[selectedLensForPurchase.id] : undefined}
        isOpen={!!selectedLensForPurchase}
        onClose={() => setSelectedLensForPurchase(null)}
        onSave={async (info) => {
          if (onSavePurchase) {
            return await onSavePurchase(info);
          }
          return { success: true, isCloud: false };
        }}
        onDelete={onDeletePurchase}
        onRefresh={onRefreshPurchases}
      />
    </div>
  );
}
