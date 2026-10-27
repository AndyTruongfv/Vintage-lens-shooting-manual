import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { Language, LensVaultItem, GenreInspiration, MasterArtist, CameraInfo } from '../types';

export interface Translations {
  // Navigation & Header
  appTitle: string;
  appSubtitle: string;
  pwaInstall: string;
  pwaInstalled: string;
  pwaInstallTooltip: string;
  wbGuideBtn: string;
  wbGuideBtnMobile: string;
  wbGuideTooltip: string;
  cheatsheetBtn: string;
  cheatsheetTooltip: string;
  pwaBannerText: string;
  pwaBannerInstall: string;
  pwaBannerGuide: string;
  langToggleTitle: string;

  // Tabs
  navRecipes: string;
  navVault: string;
  navMasters: string;

  // Recipes Tab
  searchPlaceholderRecipes: string;
  filterAll: string;
  filterPortraits: string;
  filterCinema: string;
  filterLandscape: string;
  filterStreet: string;
  bodyHub: string;
  bodyAll: string;
  wbAlertBanner: string;
  counterShowing: string;
  counterOfRecipes: string;
  counterPriority: string;
  counterTipsBtn: string;
  noRecipesFound: string;
  noRecipesFoundSub: string;
  resetFilters: string;

  // Recipe Card
  downloadNcpBtn: string;
  copyBtn: string;
  copiedBtn: string;
  baseProfileLabel: string;
  opticsMatchLabel: string;
  scenarioLabel: string;
  ncpParamsLabel: string;
  scaleRange: string;
  collapseDetails: string;
  viewDetails: string;
  recommendedForBody: string;
  wbFineTuneHeading: string;
  wbBaseTempPreset: string;
  wbAmberBlueAxis: string;
  wbGreenMagentaAxis: string;

  // The Vault Tab
  vaultHeaderTag: string;
  vaultTitle: string;
  vaultSubtitle: string;
  exportCatalogBtn: string;
  exportCatalogSuccess: string;
  locAll: string;
  locVn: string;
  locFi: string;
  toggleMatrixCollapse: string;
  toggleMatrixExpand: string;
  matrixTitle: string;
  matrixClear: string;
  searchPlaceholderVault: string;
  vaultShowing: string;
  vaultLenses: string;
  focalFilterPrefix: string;
  purchaseCountText: string;
  cloudSyncActive: string;
  cloudSyncOffline: string;
  openDossierAria: string;
  vnBaseTag: string;
  fiBaseTag: string;
  purchaseBtnLabel: string;
  dossierBtnLabel: string;
  historyHeading: string;
  strengthsHeading: string;
  goldenMilestonesHeading: string;
  optimalBodyLabel: string;
  viewRecipeLabel: string;
  noLensesFound: string;
  noLensesFoundSub: string;
  resetVaultFilter: string;

  // Focal Groups
  focalGroupAll: string;
  focalGroupAllTagline: string;
  focalGroupWide: string;
  focalGroupWideShort: string;
  focalGroupWideTagline: string;
  focalGroup35: string;
  focalGroup35Short: string;
  focalGroup35Tagline: string;
  focalGroup50: string;
  focalGroup50Short: string;
  focalGroup50Tagline: string;
  focalGroupPortrait: string;
  focalGroupPortraitShort: string;
  focalGroupPortraitTagline: string;
  focalGroupTele: string;
  focalGroupTeleShort: string;
  focalGroupTeleTagline: string;

  // Lens Dossier Modal
  closeDossier: string;
  heritageTitle: string;
  opticalTitle: string;
  goldenMilestonesTitle: string;
  bodyMatchTitle: string;
  chooseBodyBtn: string;
  purchaseSectionTitle: string;
  editPurchaseBtn: string;
  addPurchaseBtn: string;
  pricePaidLabel: string;
  sellerLabel: string;
  dateLabel: string;
  notesLabel: string;
  unrecordedPurchase: string;
  enterNowBtn: string;
  applyRecipePrefix: string;
  notRecorded: string;
  filterSizePrefix: string;

  // Masters View
  mastersHeaderTag: string;
  mastersTitle: string;
  mastersSubtitle: string;
  mastersPioneering: string;
  mastersKeyTechnique: string;
  mastersSynergies: string;
  mastersLenses: string;
  mastersRecipes: string;
  signatureStyleLabel: string;
  portfolioBtn: string;

  // Tactical Body Banner
  activeBodyTag: string;
  combatStrengthsTitle: string;
  optimalTacticalUseTitle: string;
  recommendedArsenalTitle: string;
  optimalFilmRecipesTitle: string;
}

export const translations: Record<Language, Translations> = {
  vi: {
    // Navigation & Header
    appTitle: 'Vintage Glass',
    appSubtitle: 'Di sản Quang học Đa quốc gia & Màu Film',
    pwaInstall: 'Cài App',
    pwaInstalled: 'Đã cài PWA',
    pwaInstallTooltip: 'Cài app về Màn hình chính (PWA Offline)',
    wbGuideBtn: 'Chỉnh WB',
    wbGuideBtnMobile: 'WB',
    wbGuideTooltip: 'Cẩm nang cân bằng trắng White Balance cho Nikon D750 & D800E',
    cheatsheetBtn: 'Cẩm nang',
    cheatsheetTooltip: 'Mở cẩm nang & bảo dưỡng',
    pwaBannerText: 'Cài về màn hình chính để dùng Offline 100%',
    pwaBannerInstall: 'Cài ngay ➔',
    pwaBannerGuide: 'Cách cài ➔',
    langToggleTitle: 'Chuyển đổi ngôn ngữ Tiếng Anh / Tiếng Việt',

    // Tabs
    navRecipes: 'Recipes',
    navVault: 'The Vault',
    navMasters: 'Masters',

    // Recipes Tab
    searchPlaceholderRecipes: 'Tìm theo tên recipe (C-1, Portra), lens (Bokina, Tokina), ánh sáng...',
    filterAll: 'Tất cả',
    filterPortraits: 'Chân dung',
    filterCinema: 'Điện ảnh / Phim',
    filterLandscape: 'Macro & Tĩnh vật',
    filterStreet: 'Street / B&W',
    bodyHub: 'Body Hub',
    bodyAll: 'Tất cả',
    wbAlertBanner: '🎯 Mẹo chỉnh WB cho {body}: Lưới 2D & 3 Bước ➔',
    counterShowing: 'Hiển thị',
    counterOfRecipes: 'công thức',
    counterPriority: '★ Ưu tiên Nikon {body}',
    counterTipsBtn: 'Mẹo {body} ➔',
    noRecipesFound: 'Không tìm thấy công thức màu phù hợp',
    noRecipesFoundSub: 'Thử xóa từ khóa tìm kiếm hoặc chọn danh mục Tất cả.',
    resetFilters: 'Đặt lại tất cả bộ lọc',

    // Recipe Card
    downloadNcpBtn: 'Tải .NCP',
    copyBtn: 'Copy',
    copiedBtn: 'Đã chép!',
    baseProfileLabel: 'Base Profile:',
    opticsMatchLabel: 'Optics Match (Ống kính khuyên dùng)',
    scenarioLabel: 'Bối cảnh & Ánh sáng tối ưu',
    ncpParamsLabel: 'Thông số Picture Control (NCP Parameters)',
    scaleRange: 'Thang đo -5.0 → +5.0',
    collapseDetails: 'Thu gọn chi tiết',
    viewDetails: 'Xem chi tiết thông số & White Balance',
    recommendedForBody: '★ Đề xuất cho Nikon {body}',
    wbFineTuneHeading: 'White Balance Fine-Tune',
    wbBaseTempPreset: 'Base Temperature Preset',
    wbAmberBlueAxis: 'Trục Amber - Blue',
    wbGreenMagentaAxis: 'Trục Green - Magenta',

    // The Vault Tab
    vaultHeaderTag: 'The Optical Vault & Arsenal',
    vaultTitle: 'Bộ Sưu Tập {count} Ống Kính Vintage Huyền Thoại',
    vaultSubtitle: 'Kho vũ khí quang học được phân bổ tại 2 căn cứ chiến lược: Việt Nam ({vn} lens) và Phần Lan ({fi} lens).',
    exportCatalogBtn: 'Xuất Catalog (.md)',
    exportCatalogSuccess: 'Đã tải xuống .md!',
    locAll: 'Tất cả vị trí ({count})',
    locVn: 'Việt Nam Base ({count})',
    locFi: 'Phần Lan Base ({count})',
    toggleMatrixCollapse: 'Thu gọn bảng tiêu cự',
    toggleMatrixExpand: 'Xem bảng tổng kết tiêu cự',
    matrixTitle: 'Bảng Tổng Kết Phân Bổ Tiêu Cự (Nhấn để lọc nhanh):',
    matrixClear: 'Xóa lọc tiêu cự (Xem tất cả)',
    searchPlaceholderVault: 'Tìm theo tên lens (Takumar, Rokkor, Tessar), ngàm (M42, MD, F-mount)...',
    vaultShowing: 'Hiển thị',
    vaultLenses: 'ống kính',
    focalFilterPrefix: 'Tiêu cự:',
    purchaseCountText: 'Đã lưu giá: {saved}/{total} lens',
    cloudSyncActive: 'Cloud Sync',
    cloudSyncOffline: 'Offline Mode',
    openDossierAria: 'Mở hồ sơ tác chiến cho {name}',
    vnBaseTag: 'Việt Nam Base',
    fiBaseTag: 'Phần Lan Base',
    purchaseBtnLabel: 'Mua hàng',
    dossierBtnLabel: 'Hồ sơ Dossier ➔',
    historyHeading: 'Lịch sử & Nguồn gốc:',
    strengthsHeading: 'Thế mạnh quang học vượt trội',
    goldenMilestonesHeading: 'Khoảnh khắc vàng (Golden Milestones)',
    optimalBodyLabel: 'Body tối ưu:',
    viewRecipeLabel: 'Xem công thức:',
    noLensesFound: 'Không tìm thấy ống kính phù hợp',
    noLensesFoundSub: 'Thử xóa từ khóa tìm kiếm hoặc chọn danh mục Tất cả.',
    resetVaultFilter: 'Đặt lại bộ lọc',

    // Focal Groups
    focalGroupAll: 'Tất cả tiêu cự',
    focalGroupAllTagline: 'Toàn bộ kho {count} ống kính',
    focalGroupWide: 'Góc siêu rộng & Rộng (< 35mm)',
    focalGroupWideShort: 'Góc rộng (<35mm)',
    focalGroupWideTagline: '18-35mm, 24mm, 28-70mm, 24-120mm',
    focalGroup35: 'Tiêu cự 35mm Kinh điển',
    focalGroup35Short: '35mm',
    focalGroup35Tagline: 'Flektogon 35/2.4, Samyang 35/1.4, 35-70mm...',
    focalGroup50: 'Tiêu chuẩn 50mm - 58mm',
    focalGroup50Short: '50mm - 58mm',
    focalGroup50Tagline: 'Rokkor 58/1.2, Helios 58/2, Industar 50/2.8, Takumar...',
    focalGroupPortrait: 'Chân dung & Macro (85mm - 105mm)',
    focalGroupPortraitShort: '85mm - 105mm',
    focalGroupPortraitTagline: 'Rokkor 85/1.7, AF 85/1.8D, Tamron 90 Macro x2, Tokina 90, Nikkor 105/2.5...',
    focalGroupTele: 'Telephoto Tầm xa (≥ 135mm)',
    focalGroupTeleShort: 'Tele (≥135mm)',
    focalGroupTeleTagline: 'DC 135mm, Sonnar 135, Nikkor-Q 135, Tamron 180, Zoom 80-200...',

    // Lens Dossier Modal
    closeDossier: 'Đóng hồ sơ',
    heritageTitle: 'Di sản & Lịch sử hình thành (Heritage & Story)',
    opticalTitle: 'Thế mạnh quang học vượt trội (Optical Signature)',
    goldenMilestonesTitle: 'Khoảnh khắc vàng thực chiến (Golden Milestones)',
    bodyMatchTitle: 'Khuyến nghị ghép Thân máy (Recommended Body Matching)',
    chooseBodyBtn: 'Chọn Body',
    purchaseSectionTitle: 'Hồ sơ Mua sắm & Sở hữu (Purchase Info)',
    editPurchaseBtn: 'Chỉnh sửa [P]',
    addPurchaseBtn: 'Thêm thông tin [P]',
    pricePaidLabel: 'Giá mua',
    sellerLabel: 'Người bán / Nơi mua',
    dateLabel: 'Ngày mua',
    notesLabel: 'Ghi chú tình trạng & Phụ kiện',
    unrecordedPurchase: 'Chưa lưu giá và nguồn mua cho ống kính này.',
    enterNowBtn: '+ Nhập ngay',
    applyRecipePrefix: 'Áp dụng Recipe:',
    notRecorded: 'Chưa ghi',
    filterSizePrefix: 'Filter ⌀',

    // Masters View
    mastersHeaderTag: 'Inspiration & Masters Guide',
    mastersTitle: 'Bậc Thầy Nhiếp Ảnh & Xu Hướng Thị Giác',
    mastersSubtitle: 'Khám phá tư duy thị giác và ngôn ngữ ánh sáng của các bậc thầy huyền thoại thế giới. Mỗi thể loại được ánh xạ trực tiếp sang thân máy Nikon, ống kính vintage tối ưu và công thức màu Picture Control thực chiến.',
    mastersPioneering: 'Bậc thầy đại diện & Phong cách cốt lõi',
    mastersKeyTechnique: 'Kỹ thuật thực địa cốt lõi',
    mastersSynergies: 'Thân máy & Hệ thống trang bị đề xuất',
    mastersLenses: 'Ống kính vintage đề xuất:',
    mastersRecipes: 'Công thức màu đề xuất:',
    signatureStyleLabel: 'Signature Style',
    portfolioBtn: 'Portfolio',

    // Tactical Body Banner
    activeBodyTag: 'Active Body',
    combatStrengthsTitle: 'Thế mạnh cốt lõi (Combat Strengths)',
    optimalTacticalUseTitle: 'Tác chiến tối ưu (Optimal Tactical Use)',
    recommendedArsenalTitle: 'Kho vũ khí đề xuất (Recommended Arsenal)',
    optimalFilmRecipesTitle: 'Công thức màu tối ưu (Film Recipes)',
  },
  en: {
    // Navigation & Header
    appTitle: 'Vintage Glass',
    appSubtitle: 'Cross-National Optical Heritage & Film Recipes',
    pwaInstall: 'Install',
    pwaInstalled: 'Installed',
    pwaInstallTooltip: 'Install app to Home Screen (Offline PWA)',
    wbGuideBtn: 'WB Guide',
    wbGuideBtnMobile: 'WB',
    wbGuideTooltip: 'White Balance Tactical Guide for Nikon D750 & D800E',
    cheatsheetBtn: 'Manual',
    cheatsheetTooltip: 'Open field manual & lens maintenance',
    pwaBannerText: 'Install to Home Screen for 100% Offline usage',
    pwaBannerInstall: 'Install Now ➔',
    pwaBannerGuide: 'Guide ➔',
    langToggleTitle: 'Toggle Language between English and Vietnamese',

    // Tabs
    navRecipes: 'Recipes',
    navVault: 'The Vault',
    navMasters: 'Masters',

    // Recipes Tab
    searchPlaceholderRecipes: 'Search by recipe name (C-1, Portra), lens (Bokina, Tokina), light...',
    filterAll: 'All',
    filterPortraits: 'Portraits',
    filterCinema: 'Cinema / Film',
    filterLandscape: 'Macro & Still Life',
    filterStreet: 'Street / B&W',
    bodyHub: 'Body Hub',
    bodyAll: 'All',
    wbAlertBanner: '🎯 WB tips for {body}: 2D Grid & 3 Steps ➔',
    counterShowing: 'Showing',
    counterOfRecipes: 'recipes',
    counterPriority: '★ Priority Nikon {body}',
    counterTipsBtn: 'Tips {body} ➔',
    noRecipesFound: 'No matching color recipes found',
    noRecipesFoundSub: 'Try clearing search keywords or selecting All categories.',
    resetFilters: 'Reset all filters',

    // Recipe Card
    downloadNcpBtn: 'Download .NCP',
    copyBtn: 'Copy',
    copiedBtn: 'Copied!',
    baseProfileLabel: 'Base Profile:',
    opticsMatchLabel: 'Optics Match (Recommended Lenses)',
    scenarioLabel: 'Optimal Lighting & Scenario',
    ncpParamsLabel: 'Picture Control Parameters (NCP)',
    scaleRange: 'Scale -5.0 → +5.0',
    collapseDetails: 'Collapse details',
    viewDetails: 'View Parameters & White Balance',
    recommendedForBody: '★ Recommended for Nikon {body}',
    wbFineTuneHeading: 'White Balance Fine-Tune',
    wbBaseTempPreset: 'Base Temperature Preset',
    wbAmberBlueAxis: 'Amber - Blue Axis',
    wbGreenMagentaAxis: 'Green - Magenta Axis',

    // The Vault Tab
    vaultHeaderTag: 'The Optical Vault & Arsenal',
    vaultTitle: 'Legendary Collection of {count} Vintage Lenses',
    vaultSubtitle: 'Multinational optical arsenal stationed at 2 strategic bases: Vietnam ({vn} lenses) and Finland ({fi} lenses).',
    exportCatalogBtn: 'Export Catalog (.md)',
    exportCatalogSuccess: 'Downloaded .md!',
    locAll: 'All Locations ({count})',
    locVn: 'Vietnam Base ({count})',
    locFi: 'Finland Base ({count})',
    toggleMatrixCollapse: 'Collapse Focal Matrix',
    toggleMatrixExpand: 'View Focal Matrix Summary',
    matrixTitle: 'Focal Distribution Matrix (Click to filter):',
    matrixClear: 'Clear focal filter (View all)',
    searchPlaceholderVault: 'Search lens name (Takumar, Rokkor, Tessar), mount (M42, MD, F-mount)...',
    vaultShowing: 'Showing',
    vaultLenses: 'lenses',
    focalFilterPrefix: 'Focal:',
    purchaseCountText: 'Logged prices: {saved}/{total} lenses',
    cloudSyncActive: 'Cloud Sync',
    cloudSyncOffline: 'Offline Mode',
    openDossierAria: 'Open field dossier for {name}',
    vnBaseTag: 'Vietnam Base',
    fiBaseTag: 'Finland Base',
    purchaseBtnLabel: 'Purchase',
    dossierBtnLabel: 'View Dossier ➔',
    historyHeading: 'History & Provenance:',
    strengthsHeading: 'Optical Signature & Strengths',
    goldenMilestonesHeading: 'Golden Milestones',
    optimalBodyLabel: 'Optimal Body:',
    viewRecipeLabel: 'View Recipes:',
    noLensesFound: 'No matching lenses found',
    noLensesFoundSub: 'Try clearing search keywords or selecting All categories.',
    resetVaultFilter: 'Reset filters',

    // Focal Groups
    focalGroupAll: 'All Focal Lengths',
    focalGroupAllTagline: 'Complete vault of {count} lenses',
    focalGroupWide: 'Ultrawide & Wide (< 35mm)',
    focalGroupWideShort: 'Wide (<35mm)',
    focalGroupWideTagline: '18-35mm, 24mm, 28-70mm, 24-120mm',
    focalGroup35: 'Classic 35mm Focal Length',
    focalGroup35Short: '35mm',
    focalGroup35Tagline: 'Flektogon 35/2.4, Samyang 35/1.4, 35-70mm...',
    focalGroup50: 'Standard 50mm - 58mm',
    focalGroup50Short: '50mm - 58mm',
    focalGroup50Tagline: 'Rokkor 58/1.2, Helios 58/2, Industar 50/2.8, Takumar...',
    focalGroupPortrait: 'Portrait & Macro (85mm - 105mm)',
    focalGroupPortraitShort: '85mm - 105mm',
    focalGroupPortraitTagline: 'Rokkor 85/1.7, AF 85/1.8D, Tamron 90 Macro x2, Tokina 90, Nikkor 105/2.5...',
    focalGroupTele: 'Telephoto Range (≥ 135mm)',
    focalGroupTeleShort: 'Tele (≥135mm)',
    focalGroupTeleTagline: 'DC 135mm, Sonnar 135, Nikkor-Q 135, Tamron 180, Zoom 80-200...',

    // Lens Dossier Modal
    closeDossier: 'Close Dossier',
    heritageTitle: 'Heritage & Historical Provenance',
    opticalTitle: 'Optical Signature & Outstanding Strengths',
    goldenMilestonesTitle: 'Golden Field Milestones',
    bodyMatchTitle: 'Recommended Camera Body Synergies',
    chooseBodyBtn: 'Select Body',
    purchaseSectionTitle: 'Purchase & Ownership Record',
    editPurchaseBtn: 'Edit [P]',
    addPurchaseBtn: 'Add Info [P]',
    pricePaidLabel: 'Price Paid',
    sellerLabel: 'Seller / Source',
    dateLabel: 'Purchase Date',
    notesLabel: 'Condition Notes & Accessories',
    unrecordedPurchase: 'No purchase record saved for this lens.',
    enterNowBtn: '+ Log now',
    applyRecipePrefix: 'Apply Recipe:',
    notRecorded: 'Not recorded',
    filterSizePrefix: 'Filter ⌀',

    // Masters View
    mastersHeaderTag: 'Inspiration & Masters Guide',
    mastersTitle: 'Photography Masters & Visual Trends',
    mastersSubtitle: 'Explore the visual language and lighting mastery of world-renowned icons. Each genre maps directly to Nikon bodies, vintage glass pairings, and field-tested Picture Control recipes.',
    mastersPioneering: 'Pioneering Masters & Core Style',
    mastersKeyTechnique: 'Core Field Technique',
    mastersSynergies: 'Optimal Bodies & Equipment Synergies',
    mastersLenses: 'Recommended Vintage Lenses:',
    mastersRecipes: 'Recommended Color Recipes:',
    signatureStyleLabel: 'Signature Style',
    portfolioBtn: 'Portfolio',

    // Tactical Body Banner
    activeBodyTag: 'Active Body',
    combatStrengthsTitle: 'Combat Strengths',
    optimalTacticalUseTitle: 'Optimal Tactical Use',
    recommendedArsenalTitle: 'Recommended Arsenal',
    optimalFilmRecipesTitle: 'Film Recipes',
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: keyof Translations, params?: Record<string, string | number>) => string;
  strings: Translations;
  getLocalizedLens: (lens: LensVaultItem) => {
    nickname: string;
    mount: string;
    history: string;
    strengths: string;
    goldenMilestones: string;
    specialFeatures?: string[];
  };
  getLocalizedGenre: (genre: GenreInspiration) => {
    title: string;
    genreTag: string;
    headline: string;
    vibeDescription: string;
  };
  getLocalizedMaster: (master: MasterArtist) => {
    period: string;
    signatureStyle: string;
    description: string;
    keyTechnique: string;
  };
  getLocalizedCamera: (camera: CameraInfo) => {
    subtitle: string;
    strengths: string;
    optimalUse: string;
    tips: string[];
  };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('vintage_glass_lang');
      if (saved === 'en' || saved === 'vi') return saved;
      // Default to VI
      return 'vi';
    } catch {
      return 'vi';
    }
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('vintage_glass_lang', newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'vi' ? 'en' : 'vi');
  }, [lang, setLang]);

  useEffect(() => {
    try {
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  }, [lang]);

  const strings = useMemo(() => translations[lang], [lang]);

  const t = useCallback(
    (key: keyof Translations, params?: Record<string, string | number>): string => {
      let str = strings[key] || translations.vi[key] || String(key);
      if (params) {
        Object.entries(params).forEach(([paramKey, paramVal]) => {
          str = str.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
        });
      }
      return str;
    },
    [strings]
  );

  const getLocalizedLens = useCallback(
    (lens: LensVaultItem) => {
      if (lang === 'en') {
        return {
          nickname: lens.nicknameEn || lens.nickname,
          mount: lens.mountEn || lens.mount,
          history: lens.historyEn || lens.history,
          strengths: lens.strengthsEn || lens.strengths,
          goldenMilestones: lens.goldenMilestonesEn || lens.goldenMilestones,
          specialFeatures: lens.specialFeaturesEn || lens.specialFeatures,
        };
      }
      return {
        nickname: lens.nickname,
        mount: lens.mount,
        history: lens.history,
        strengths: lens.strengths,
        goldenMilestones: lens.goldenMilestones,
        specialFeatures: lens.specialFeatures,
      };
    },
    [lang]
  );

  const getLocalizedGenre = useCallback(
    (genre: GenreInspiration) => {
      if (lang === 'en') {
        return {
          title: genre.titleEn || genre.title,
          genreTag: genre.genreTagEn || genre.genreTag,
          headline: genre.headlineEn || genre.headline,
          vibeDescription: genre.vibeDescriptionEn || genre.vibeDescription,
        };
      }
      return {
        title: genre.title,
        genreTag: genre.genreTag,
        headline: genre.headline,
        vibeDescription: genre.vibeDescription,
      };
    },
    [lang]
  );

  const getLocalizedMaster = useCallback(
    (master: MasterArtist) => {
      if (lang === 'en') {
        return {
          period: master.periodEn || master.period,
          signatureStyle: master.signatureStyleEn || master.signatureStyle,
          description: master.descriptionEn || master.description,
          keyTechnique: master.keyTechniqueEn || master.keyTechnique,
        };
      }
      return {
        period: master.period,
        signatureStyle: master.signatureStyle,
        description: master.description,
        keyTechnique: master.keyTechnique,
      };
    },
    [lang]
  );

  const getLocalizedCamera = useCallback(
    (camera: CameraInfo) => {
      if (lang === 'en') {
        return {
          subtitle: camera.subtitleEn || camera.subtitle,
          strengths: camera.strengthsEn || camera.strengths,
          optimalUse: camera.optimalUseEn || camera.optimalUse,
          tips: camera.tipsEn || camera.tips,
        };
      }
      return {
        subtitle: camera.subtitle,
        strengths: camera.strengths,
        optimalUse: camera.optimalUse,
        tips: camera.tips,
      };
    },
    [lang]
  );

  const contextValue = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      t,
      strings,
      getLocalizedLens,
      getLocalizedGenre,
      getLocalizedMaster,
      getLocalizedCamera,
    }),
    [lang, setLang, toggleLang, t, strings, getLocalizedLens, getLocalizedGenre, getLocalizedMaster, getLocalizedCamera]
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
