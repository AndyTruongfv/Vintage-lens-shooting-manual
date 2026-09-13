import { useEffect } from 'react';
import { X, BookOpen, Wrench, AlertTriangle, ShieldCheck, Sparkles, HelpCircle, Flame, Camera } from 'lucide-react';

interface CheatsheetDrawerProps {
  open: boolean;
  onClose: () => void;
}

const concepts: { term: string; explanation: string; tag?: string }[] = [
  {
    term: 'Clarity (Độ trong trẻo / Vi tương phản)',
    explanation:
      'Giá trị âm (-1.0 đến -1.5) làm mềm tương phản vùng mid-tone, tạo chuyển vùng mượt mà mơ màng như phim nhựa vintage. Giá trị dương (+1.0) tăng độ gai góc, vi độ nét cho ảnh tài liệu đường phố.',
    tag: 'Tonal Curve',
  },
  {
    term: 'Mid-Range Sharpening (Độ nét dải trung)',
    explanation:
      'Kiểm soát độ nét vân bề mặt (texture) ở tần số trung bình. Giúp sợi vải, tóc, chi tiết da nổi khối tách bạch mà không bị viền trắng răng cưa nhân tạo của sharpness thông thường.',
    tag: 'Sharpening',
  },
  {
    term: 'White Balance Fine-Tune Matrix (A-B & G-M)',
    explanation:
      'Trục A-B (Amber - Blue): Amber tạo sắc ấm mật ong, Blue tạo sắc xanh lạnh điện ảnh. Trục G-M (Green - Magenta): Magenta bù sắc hồng hào cho da người Châu Á, Green tạo cảm giác vintage cổ điển.',
    tag: 'Color Shift',
  },
  {
    term: 'Highlight & Shadow Rolloff (Cứu sáng/Vùng tối)',
    explanation:
      'Highlights âm (-1.0 → -2.0) kéo êm vùng trời sáng và ánh nắng gắt. Shadows dương (+0.5 → +1.5) mở sáng chi tiết bóng râm, mô phỏng dải dynamic range phóng khoáng của phim âm bản (negative film).',
    tag: 'Dynamic Range',
  },
  {
    term: 'Filter Effect trong chế độ B&W',
    explanation:
      '• Yellow (Y): Dìm nhẹ mây trời, làm sáng da.\n• Orange (O): Tăng tương phản mạnh, làm mịn vết thâm da Châu Á và nổi bật viền tóc.\n• Red (R): Dìm nền trời xanh thành đen thăm thẳm, tương phản kịch tính tột bậc.\n• Green (G): Tôn sáng lá cây và làm dịu tông màu môi/da.',
    tag: 'B&W Optics',
  },
  {
    term: 'Picture Control Base Selection',
    explanation:
      '• Neutral / Flat: Dải dynamic range phẳng rộng nhất, nền tảng hoàn hảo để giả lập chất film.\n• Standard: Màu sắc và tương phản cân bằng, rực rỡ.\n• Portrait: Tối ưu sắc tố da người, chuyển tiếp mềm mại.\n• Monochrome: Chế độ đen trắng thuần chất hỗ trợ bộ lọc quang học nội bộ.',
    tag: 'Base Engine',
  },
];

export function CheatsheetDrawer({ open, onClose }: CheatsheetDrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 max-h-[88vh] overflow-y-auto rounded-t-3xl border-t border-paper-border bg-paper shadow-2xl transition-transform duration-300 ease-out safe-bottom ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Cẩm nang bảo dưỡng và bảng thông số Picture Control"
      >
        {/* Handle bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-paper-border bg-paper/95 px-4 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-accent/15 p-1.5 text-accent">
              <BookOpen size={18} />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-ink">Field Cheatsheet & Maintenance</h2>
              <p className="text-[10px] font-semibold text-ink-subtle">Cẩm nang thực địa & Kỹ thuật bảo dưỡng</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-paper-border bg-surface p-2 text-ink-muted transition-colors hover:bg-surface-hover hover:text-ink"
            aria-label="Đóng cẩm nang"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4 px-4 pb-8 pt-4">
          {/* SECTION 1: CẨM NANG BẢO DƯỠNG LENS CỔ & M42 (CRITICAL) */}
          <section className="overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-paper-card to-amber-500/5 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <Wrench size={18} />
              <h3 className="font-mono text-xs font-extrabold uppercase tracking-wider">
                Cẩm nang bảo dưỡng nhanh & Quy tắc thực địa
              </h3>
            </div>

            <div className="mt-3 space-y-3">
              {/* Cảnh báo M42 */}
              <div className="rounded-xl border border-red-500/25 bg-red-500/10 p-3">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" />
                  <div>
                    <h4 className="text-xs font-bold text-red-800 dark:text-red-300">
                      Quy tắc ren M42: Chống kẹt ren & Cháy ren ngàm
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-ink">
                      Chỉ sử dụng <strong>sáp nến khô (paraffin wax)</strong> hoặc <strong>bột than chì (graphite powder)</strong> để bôi trơn nhẹ nhàng ren xoay M42.
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed font-semibold text-red-700 dark:text-red-400">
                      ⚠️ TUYỆT ĐỐI KHÔNG dùng mỡ bò xe máy, dầu nhớt WD-40 hoặc mỡ silicone gia dụng! Nhiệt độ cơ thể và ánh nắng ngoài trời sẽ làm dầu mỡ bốc hơi, ngưng tụ tạo thành sương mù (haze/fungus) gây mù vĩnh viễn thấu kính và bám màng dầu lên cảm biến máy ảnh.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mỡ chuyên dụng Nhật Bản */}
              <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck size={18} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      Mỡ Helicoid chuyên dụng chuẩn Nhật Bản
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-ink">
                      Khi bảo dưỡng cơ cấu lấy nét xoay tay (Helicoid), luôn sử dụng mỡ gốc tổng hợp quang học chuyên dụng:
                    </p>
                    <div className="mt-2 rounded-lg border border-emerald-500/20 bg-paper-card p-2 font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      ✨ Kanto Chemical (Kanto Kasei #30 / Floil Grease)
                    </div>
                    <p className="mt-1 text-[11px] text-ink-subtle">
                      Đặc tính: Độ nhớt lý tưởng, kháng nhiệt độ cao (-20°C đến +80°C), không bay hơi, tạo cảm giác xoay nét êm đầm mượt như nhung.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: KINH NGHIỆM THỰC CHIẾN THEO THÂN MÁY */}
          <section className="rounded-2xl border border-paper-border bg-paper-card p-4 shadow-xs">
            <div className="flex items-center gap-2 text-ink">
              <Camera size={18} className="text-accent" />
              <h3 className="font-mono text-xs font-extrabold uppercase tracking-wider">
                Kỹ thuật thực địa theo Thân máy (Field Experience)
              </h3>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              <div className="rounded-xl border border-surface-border bg-surface/60 p-3">
                <span className="font-mono text-xs font-extrabold text-accent">Nikon Z5</span>
                <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                  Bật <strong>Focus Peaking màu Đỏ</strong> mức 2 + gán nút <strong>Fn1</strong> phóng to 100% để lấy nét tay siêu nhanh. Chống rung IBIS cho phép chụp tay 1/15s không rung lắc.
                </p>
              </div>

              <div className="rounded-xl border border-surface-border bg-surface/60 p-3">
                <span className="font-mono text-xs font-extrabold text-accent">Nikon D800E</span>
                <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                  Cảm biến 36MP không có lọc AA (No OLPF) ghi lại chi tiết cực gắt. Luôn dùng <strong>Live View Zoom</strong> để xác nhận điểm nét vi mô; tránh tăng Clarity quá +1.0.
                </p>
              </div>

              <div className="rounded-xl border border-surface-border bg-surface/60 p-3">
                <span className="font-mono text-xs font-extrabold text-accent">Nikon D750</span>
                <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                  Mô tơ <strong>Screw-drive AF</strong> hỗ trợ hoàn hảo lens AF-D. Để <strong>Auto WB 1</strong> (Keep Atmosphere) để da người luôn ửng hồng tự nhiên dưới đèn vàng.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3: BẢNG TRA CỨU THÔNG SỐ PICTURE CONTROL */}
          <section className="space-y-2.5">
            <div className="flex items-center gap-2 px-1">
              <Sparkles size={16} className="text-accent" />
              <h3 className="font-mono text-xs font-extrabold uppercase tracking-wider text-ink">
                Ý nghĩa thông số Picture Control (NCP Glossary)
              </h3>
            </div>

            <div className="space-y-2">
              {concepts.map((concept) => (
                <div key={concept.term} className="rounded-xl border border-surface-border bg-paper-card p-3 shadow-xs">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-mono text-xs font-bold text-ink">{concept.term}</h4>
                    {concept.tag && (
                      <span className="rounded bg-surface px-1.5 py-0.5 font-mono text-[9px] font-semibold text-ink-subtle">
                        {concept.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-muted whitespace-pre-line">{concept.explanation}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

