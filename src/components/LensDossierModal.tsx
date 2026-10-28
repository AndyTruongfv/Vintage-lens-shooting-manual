import { useEffect } from 'react';
import {
  X,
  Sparkles,
  Camera,
  Aperture,
  Award,
  BookOpen,
  Tag,
  ArrowRight,
  Crosshair,
  DollarSign,
  Edit3,
  ShieldCheck,
  Image as ImageIcon,
  Video,
} from 'lucide-react';
import type { LensVaultItem, CameraBody, LensPurchaseInfo, Language } from '../types';
import { recipes } from '../data/recipes';
import { cameras } from '../data/cameras';
import { useLanguage } from '../context/LanguageContext';

interface LensDossierModalProps {
  lens: LensVaultItem | null;
  purchaseInfo?: LensPurchaseInfo;
  onOpenPurchaseModal?: (lens: LensVaultItem) => void;
  isOpen: boolean;
  onClose: () => void;
  onSelectRecipe: (recipeId: string) => void;
  onSelectBody?: (body: CameraBody) => void;
}

export function LensDossierModal({
  lens,
  purchaseInfo,
  onOpenPurchaseModal,
  isOpen,
  onClose,
  onSelectRecipe,
  onSelectBody,
}: LensDossierModalProps) {
  const { lang, strings, getLocalizedLens } = useLanguage();

  // Lock body scroll when modal is open and handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !lens) return null;

  const isVN = lens.base === 'Vietnam';
  const isEn = lang === 'en';
  const loc = getLocalizedLens(lens);

  const getBodyRationale = (body: CameraBody, item: LensVaultItem, currentLang: Language): string => {
    const isManual =
      item.mount.includes('M42') ||
      item.mount.includes('MD') ||
      item.mount.includes('AI') ||
      item.mount.includes('Adaptall') ||
      item.mount.includes('MF') ||
      item.mount.includes('Non-AI');
    const isMacro =
      item.name.toLowerCase().includes('macro') ||
      item.strengths.toLowerCase().includes('macro') ||
      item.nickname.toLowerCase().includes('macro');
    const isAF =
      item.mount.includes('Screw-drive') ||
      item.mount.includes('AF') ||
      item.name.includes('AF') ||
      item.name.includes('DC-Nikkor');

    if (currentLang === 'en') {
      if (body === 'Z5') {
        if (isMacro) {
          return '5-Axis IBIS keeps macro frames rock-steady + 100% EVF magnification and Focus Peaking nail focus on individual ice crystals or pollen filaments.';
        }
        if (isManual) {
          return 'Ultimate mirrorless synergy: 5-axis IBIS eliminates camera shake + Focus Peaking & electronic EVF zoom make manual focusing razor sharp.';
        }
        return 'Leverages crisp EVF, silent electronic shutter eliminating vibration, and limitless adapter adaptability via FTZ / M42-Z / MD-Z.';
      }

      if (body === 'D800E') {
        if (
          item.strengths.toLowerCase().includes('vi mô') ||
          item.strengths.toLowerCase().includes('vi tương phản') ||
          item.strengths.toLowerCase().includes('dao cạo') ||
          item.strengths.toLowerCase().includes('nét')
        ) {
          return '36.3MP sensor without OLPF extracts maximum micro-contrast and micro-detail resolve from this optical design.';
        }
        return 'Ultra-wide dynamic range of 36.3MP beautifully resolves subtle gradations and tonal transitions of vintage glass.';
      }

      if (body === 'D750') {
        if (isAF) {
          return 'High-torque internal screw-drive AF motor with 51-point AF system locking focus down to -3 EV in dim candlelight.';
        }
        return 'Balanced 24MP sensor rendering natural, flattering skin tones with exceptional high ISO grain control for candid moments.';
      }

      return 'Harmonious optical balance matching vintage glass characteristics with Nikon full-frame sensor.';
    }

    // Vietnamese rationale
    if (body === 'Z5') {
      if (isMacro) {
        return 'Chống rung IBIS 5 trục giữ khung hình siêu ổn định ở cự ly cận cảnh + Zoom 100% EVF và Focus Peaking lấy nét chuẩn xác từng sợi nhụy/tinh thể băng.';
      }
      if (isManual) {
        return 'Tối ưu tuyệt đối cho ngàm chuyển: Chống rung cảm biến 5 trục IBIS bù trừ rung tay + Hỗ trợ Focus Peaking & Zoom EVF lấy nét tay siêu chuẩn.';
      }
      return 'Tận dụng kính ngắm EVF sắc nét, màn trập điện tử triệt tiêu rung chấn và khả năng thích ứng linh hoạt qua ngàm chuyển FTZ.';
    }

    if (body === 'D800E') {
      if (
        item.strengths.toLowerCase().includes('vi mô') ||
        item.strengths.toLowerCase().includes('vi tương phản') ||
        item.strengths.toLowerCase().includes('dao cạo') ||
        item.strengths.toLowerCase().includes('nét')
      ) {
        return 'Cảm biến 36.3MP không bộ lọc OLPF khai thác tối đa độ phân giải vi mô và vi tương phản (micro-contrast) cực đại của thấu kính.';
      }
      return 'Dải tương phản động (Dynamic Range) cực rộng 36.3MP giúp bóc tách từng lớp sáng tối tinh tế của quang học cổ điển.';
    }

    if (body === 'D750') {
      if (isAF) {
        return 'Mô tơ trục vít thân máy đầm chắc xoay mượt mà + Hệ thống 51 điểm AF bắt nét cực nhạy trong điều kiện ánh sáng yếu -3EV.';
      }
      return 'Cảm biến 24MP cân bằng tuyệt hảo màu da người, khả năng khử nhiễu ISO cao xuất sắc cho các buổi chụp sự kiện và phóng sự đời thường.';
    }

    return 'Sự kết hợp quang học chuẩn xác giữa đặc tính ống kính và cảm biến Full-frame Nikon.';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-lens-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal / Drawer Content Box */}
      <div className="relative z-10 flex max-h-[90vh] sm:max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] sm:rounded-3xl border border-accent/25 bg-paper-card shadow-2xl transition-all">
        {/* Mobile Pull Indicator */}
        <div className="flex sm:hidden justify-center pt-3 pb-1">
          <div className="h-1.5 w-12 rounded-full bg-paper-border/80" />
        </div>

        {/* Header */}
        <div className="relative border-b border-paper-border bg-surface/90 px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 pr-6">
              {/* Tactical Badges row */}
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] font-bold">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 ${
                    isVN
                      ? 'bg-red-500/15 text-red-700 dark:text-red-300 border border-red-500/30'
                      : 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30'
                  }`}
                >
                  <span>{isVN ? '🇻🇳' : '🇫🇮'}</span>
                  <span>{isVN ? strings.vnBaseTag : strings.fiBaseTag}</span>
                </span>

                <span className="rounded-md border border-paper-border bg-paper-card px-2 py-0.5 text-ink">
                  {loc.mount}
                </span>

                <span className="rounded-md bg-accent/15 px-2 py-0.5 text-accent font-extrabold">
                  {lens.focalLength} · {lens.maxAperture}
                </span>

                {lens.filterThread && (
                  <span className="rounded-md bg-surface px-2 py-0.5 text-ink-subtle">
                    {strings.filterSizePrefix}{lens.filterThread}
                  </span>
                )}

                {loc.category && (
                  <span className="rounded-md border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-purple-700 dark:text-purple-300">
                    {loc.category}
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <h3
                id="dossier-lens-title"
                className="text-lg sm:text-xl font-extrabold text-ink tracking-tight leading-snug"
              >
                {lens.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold italic text-accent flex items-center gap-1.5">
                <Crosshair size={13} className="shrink-0" />
                <span>"{loc.nickname}"</span>
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-paper-border bg-paper-card p-2 text-ink-muted transition-colors hover:border-accent hover:bg-accent/10 hover:text-ink active:scale-95"
              aria-label={strings.closeDossier}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6 space-y-5">
          {/* Special Features tags */}
          {loc.specialFeatures && loc.specialFeatures.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {loc.specialFeatures.map((feat) => (
                <span
                  key={feat}
                  className="inline-flex items-center gap-1 rounded-lg border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 font-mono text-[11px] font-bold text-amber-800 dark:text-amber-300"
                >
                  <Tag size={11} />
                  {feat}
                </span>
              ))}
            </div>
          )}

          {/* Section 1: Di sản & Lịch sử hình thành */}
          <div className="rounded-2xl border border-paper-border bg-surface/50 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-ink mb-2">
              <BookOpen size={16} className="text-accent" />
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                {strings.heritageTitle}
              </h4>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-ink-muted">
              {loc.history}
            </p>
          </div>

          {/* Section 2: Thế mạnh quang học vượt trội */}
          <div className="rounded-2xl border border-teal-500/25 bg-teal-500/5 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 mb-2">
              <Aperture size={16} />
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                {strings.opticalTitle}
              </h4>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-ink">
              {loc.strengths}
            </p>
          </div>

          {/* SPECIAL MASTERCLASS: Defocus Control (DC) Field Guide */}
          {lens.dcFieldGuide && (
            <div className="rounded-2xl border-2 border-amber-500/50 bg-gradient-to-br from-amber-500/15 via-paper-card to-amber-500/5 p-4 sm:p-5 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                <Sparkles size={18} className="text-amber-500 fill-amber-500 shrink-0" />
                <h4 className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wide text-ink">
                  {lens.dcFieldGuide.title}
                </h4>
              </div>

              {/* DC Ring Nature */}
              <div className="rounded-xl border border-paper-border/80 bg-surface/70 p-3 space-y-1.5 text-xs">
                <p className="font-mono text-[11px] font-bold text-ink flex items-center gap-1">
                  <span>⚙️ {isEn ? 'DC Ring Operating Principle:' : 'Bản chất vận hành vòng DC:'}</span>
                </p>
                <ul className="space-y-1 text-ink-muted pl-1">
                  {lens.dcFieldGuide.dcRingPrinciple.map((principle, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                      <span className="text-accent font-bold">•</span>
                      <span>{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3 Golden Steps */}
              <div className="space-y-2">
                <p className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                  🎯 {isEn ? '3 Precise Field Operations Steps:' : '3 Bước tác chiến thực địa chuẩn xác:'}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {lens.dcFieldGuide.goldenRules.map((rule) => (
                    <div
                      key={rule.step}
                      className={`rounded-xl p-3 text-xs space-y-1 ${
                        rule.isCrucial
                          ? 'border-2 border-red-500/50 bg-red-500/10 text-red-950 dark:text-red-200 shadow-xs'
                          : 'border border-paper-border bg-paper-card text-ink'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-extrabold ${
                            rule.isCrucial
                              ? 'bg-red-600 text-white'
                              : 'bg-accent text-paper'
                          }`}
                        >
                          {rule.step}
                        </span>
                        <span className="font-bold text-ink">
                          {rule.title}
                        </span>
                        {rule.isCrucial && (
                          <span className="rounded bg-red-600 px-1.5 py-0.5 font-mono text-[9px] font-extrabold uppercase text-white">
                            {isEn ? 'CRUCIAL NOTE' : 'Lưu ý sống còn'}
                          </span>
                        )}
                      </div>
                      <p className="leading-relaxed pl-7 text-ink-muted">
                        {rule.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cinema Glow Tip */}
              <div className="rounded-xl border border-accent/30 bg-accent/10 p-3 text-xs leading-relaxed text-ink space-y-1">
                <p className="font-mono text-[11px] font-bold text-accent flex items-center gap-1">
                  <Sparkles size={13} />
                  <span>{isEn ? 'Hollywood Dreamy Glow Tip:' : 'Mẹo điện ảnh (Hollywood Dreamy Glow):'}</span>
                </p>
                <p className="text-ink-muted leading-relaxed">
                  {lens.dcFieldGuide.cinemaGlowTip}
                </p>
              </div>
            </div>
          )}

          {/* Section 3: Khoảnh khắc vàng thực chiến */}
          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 mb-2">
              <Award size={16} />
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                {strings.goldenMilestonesTitle}
              </h4>
            </div>
            <p className="text-xs sm:text-sm font-semibold leading-relaxed text-ink">
              {loc.goldenMilestones}
            </p>
          </div>

          {/* Section 4: Khuyến nghị ghép Thân máy */}
          <div className="rounded-2xl border border-accent/20 bg-accent/5 p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-accent">
              <Camera size={16} />
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                {strings.bodyMatchTitle}
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {lens.recommendedBodies.map((body) => {
                const camInfo = cameras.find((c) => c.body === body);
                const rationale = getBodyRationale(body, lens, lang);

                return (
                  <div
                    key={body}
                    className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 rounded-xl border border-paper-border bg-paper-card p-3 shadow-xs hover:border-accent/40 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-lg bg-accent px-2 py-0.5 font-mono text-xs font-extrabold text-paper">
                          Nikon {body}
                        </span>
                        <span className="text-[11px] font-semibold text-ink-subtle">
                          {camInfo ? `${isEn ? camInfo.subtitleEn || camInfo.subtitle : camInfo.subtitle} (${camInfo.sensor})` : ''}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-ink-muted">
                        {rationale}
                      </p>
                    </div>

                    {onSelectBody && (
                      <button
                        onClick={() => {
                          onSelectBody(body);
                          onClose();
                        }}
                        className="self-start sm:self-center shrink-0 rounded-lg border border-accent/20 bg-accent/10 px-2.5 py-1 font-mono text-[10px] font-bold text-accent hover:bg-accent hover:text-paper transition-all"
                      >
                        {strings.chooseBodyBtn}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 5: Hồ sơ Mua sắm & Sở hữu (Purchase Info) */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                <DollarSign size={16} />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                  {strings.purchaseSectionTitle}
                </h4>
              </div>

              {onOpenPurchaseModal && (
                <button
                  type="button"
                  onClick={() => onOpenPurchaseModal(lens)}
                  className="inline-flex items-center gap-1 rounded-xl border border-amber-500/30 bg-amber-500/15 px-2.5 py-1 font-mono text-[11px] font-bold text-amber-900 dark:text-amber-300 hover:bg-amber-500/25 transition-all active:scale-95"
                >
                  <Edit3 size={11} />
                  <span>
                    {purchaseInfo?.price || purchaseInfo?.seller
                      ? strings.editPurchaseBtn
                      : strings.addPurchaseBtn}
                  </span>
                </button>
              )}
            </div>

            {(() => {
              const effectivePrice = purchaseInfo?.price || lens.acquisition?.price;
              const effectiveSeller = purchaseInfo?.seller || lens.acquisition?.seller;
              const effectiveDate = purchaseInfo?.purchase_date || lens.acquisition?.purchaseDate;
              const hasAcquisitionData = Boolean(
                effectivePrice || effectiveSeller || effectiveDate || purchaseInfo?.notes || loc.condition
              );

              return hasAcquisitionData ? (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="rounded-xl border border-paper-border bg-paper-card p-2.5 space-y-0.5">
                      <span className="font-mono text-[10px] text-ink-subtle uppercase font-semibold">
                        {strings.pricePaidLabel}
                      </span>
                      <p className="font-bold text-ink text-sm">
                        {effectivePrice || strings.notRecorded}
                      </p>
                    </div>
                    <div className="rounded-xl border border-paper-border bg-paper-card p-2.5 space-y-0.5">
                      <span className="font-mono text-[10px] text-ink-subtle uppercase font-semibold">
                        {strings.sellerLabel}
                      </span>
                      <p className="font-bold text-ink truncate">
                        {effectiveSeller || strings.notRecorded}
                      </p>
                    </div>
                    <div className="rounded-xl border border-paper-border bg-paper-card p-2.5 space-y-0.5">
                      <span className="font-mono text-[10px] text-ink-subtle uppercase font-semibold">
                        {strings.dateLabel}
                      </span>
                      <p className="font-bold text-ink">
                        {effectiveDate || strings.notRecorded}
                      </p>
                    </div>
                  </div>

                  {loc.condition && (
                    <div className="rounded-xl border border-paper-border bg-paper-card p-3 space-y-1 text-xs">
                      <span className="font-mono text-[10px] text-ink-subtle uppercase font-semibold flex items-center gap-1">
                        <ShieldCheck size={12} className="text-emerald-500" />
                        <span>{strings.conditionTitle}</span>
                      </span>
                      <p className="text-ink leading-relaxed">
                        {loc.condition}
                      </p>
                    </div>
                  )}

                  {purchaseInfo?.notes && (
                    <div className="rounded-xl border border-paper-border bg-paper-card p-3 space-y-1 text-xs">
                      <span className="font-mono text-[10px] text-ink-subtle uppercase font-semibold">
                        {strings.notesLabel}
                      </span>
                      <p className="text-ink leading-relaxed whitespace-pre-wrap">
                        {purchaseInfo.notes}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between rounded-xl border border-dashed border-paper-border bg-surface/50 p-3 text-xs text-ink-muted">
                  <span>{strings.unrecordedPurchase}</span>
                  {onOpenPurchaseModal && (
                    <button
                      type="button"
                      onClick={() => onOpenPurchaseModal(lens)}
                      className="font-mono text-[11px] font-bold text-accent hover:underline"
                    >
                      {strings.enterNowBtn}
                    </button>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Section 6: Thư viện ảnh & Video Review (Media Gallery) */}
          {lens.media && ((lens.media.images && lens.media.images.length > 0) || lens.media.videoReview) && (
            <div className="rounded-2xl border border-paper-border bg-surface/50 p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2 text-ink">
                <ImageIcon size={16} className="text-accent" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                  {strings.mediaTitle}
                </h4>
              </div>

              {lens.media.images && lens.media.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {lens.media.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-video rounded-xl overflow-hidden border border-paper-border bg-black/5 flex items-center justify-center group"
                    >
                      <img
                        src={img}
                        alt={`${lens.name} specimen ${i + 1}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-white font-mono text-[9px]">
                        Specimen #{i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {lens.media.videoReview && (
                <a
                  href={lens.media.videoReview}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 font-mono text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-all active:scale-95 shadow-xs"
                >
                  <Video size={14} />
                  <span>{strings.watchVideo}</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Sticky Footer: Recipe Quick Links & Close Button */}
        <div className="border-t border-paper-border bg-surface/95 px-5 py-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Recipe Jump Section */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 font-mono text-xs font-bold text-accent">
              <Sparkles size={14} />
              <span>{strings.applyRecipePrefix}</span>
            </span>

            <div className="flex flex-wrap gap-1.5">
              {lens.recommendedRecipeIds.map((recipeId) => {
                const r = recipes.find((item) => item.id === recipeId);
                return (
                  <button
                    key={recipeId}
                    onClick={() => {
                      onClose();
                      onSelectRecipe(recipeId);
                    }}
                    className="group inline-flex items-center gap-1.5 rounded-xl border border-accent/30 bg-accent text-paper px-3 py-1.5 font-mono text-xs font-bold transition-all hover:bg-accent/90 hover:scale-105 active:scale-95 shadow-xs"
                    title={`Open recipe [${recipeId}] ${r?.name || ''}`}
                  >
                    <span className="font-extrabold">{recipeId}</span>
                    {r && (
                      <span className="text-[11px] opacity-90">
                        {r.name}
                      </span>
                    )}
                    <ArrowRight size={13} className="opacity-80 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl border border-paper-border bg-paper-card px-4 py-2 font-mono text-xs font-bold text-ink-muted hover:border-accent hover:text-ink transition-colors text-center"
          >
            {strings.closeDossier}
          </button>
        </div>
      </div>
    </div>
  );
}
