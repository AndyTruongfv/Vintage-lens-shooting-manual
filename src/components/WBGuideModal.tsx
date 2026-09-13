import { useState } from 'react';
import {
  X,
  Target,
  Compass,
  Zap,
  Layers,
  Sliders,
  Camera,
  CheckCircle2,
  ChevronRight,
  Info,
  Sparkles,
} from 'lucide-react';

interface WBGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WBGuideModal({ isOpen, onClose }: WBGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'matrix' | 'solution1' | 'solution2' | 'solution3'>('matrix');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-3 sm:p-4 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Cẩm nang cân bằng trắng White Balance"
    >
      <div
        className="animate-scale-in max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-paper-border bg-paper p-5 sm:p-6 shadow-2xl safe-bottom text-ink"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-paper-border pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/30">
              <Target size={24} className="stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-accent/15 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent ring-1 ring-accent/30">
                  Tactical Field Manual
                </span>
                <span className="rounded-md bg-surface px-2 py-0.5 font-mono text-[10px] font-medium text-ink-muted border border-paper-border">
                  Nikon D750 & D800E
                </span>
              </div>
              <h2 className="font-mono text-base sm:text-lg font-black text-ink mt-0.5">
                Cẩm Nang Cân Bằng Trắng (White Balance)
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-paper-border bg-surface p-2 text-ink-muted transition-colors hover:bg-surface-hover hover:text-ink"
            aria-label="Đóng bảng hướng dẫn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-1.5 rounded-2xl border border-paper-border bg-surface/70 p-1 font-mono text-xs font-bold">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-1 text-center transition-all ${
              activeTab === 'matrix'
                ? 'bg-accent text-paper shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-surface-hover'
            }`}
          >
            <Compass size={13} />
            <span>Lưới 2D</span>
          </button>
          <button
            onClick={() => setActiveTab('solution1')}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-1 text-center transition-all ${
              activeTab === 'solution1'
                ? 'bg-accent text-paper shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-surface-hover'
            }`}
          >
            <Zap size={13} />
            <span>1. Nhanh 1s</span>
          </button>
          <button
            onClick={() => setActiveTab('solution2')}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-1 text-center transition-all ${
              activeTab === 'solution2'
                ? 'bg-accent text-paper shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-surface-hover'
            }`}
          >
            <Sliders size={13} />
            <span>2. Preset PRE</span>
          </button>
          <button
            onClick={() => setActiveTab('solution3')}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-1 text-center transition-all ${
              activeTab === 'solution3'
                ? 'bg-accent text-paper shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-surface-hover'
            }`}
          >
            <Layers size={13} />
            <span>3. U1/U2 & Bank</span>
          </button>
        </div>

        {/* Content Container */}
        <div className="mt-4 space-y-4 text-xs sm:text-sm">
          {/* TAB 1: 2D MATRIX */}
          {activeTab === 'matrix' && (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-2xl border border-paper-border bg-paper-card p-4">
                <h3 className="font-mono text-xs font-black uppercase tracking-wider text-accent flex items-center gap-1.5">
                  <Compass size={15} />
                  1. Nguyên lý Lưới Màu Tọa Độ 2D (Nikon White Balance Fine-Tuning)
                </h3>
                <p className="mt-2 text-ink-subtle leading-relaxed">
                  Mỗi công thức màu film trong cẩm nang đạt độ hoàn mỹ cao nhất khi kết hợp giữa <strong>Picture Control (.NCP)</strong> và <strong>bù trừ tọa độ màu trên lưới 2D</strong>.
                </p>

                {/* Visual 2D Grid Representation */}
                <div className="mt-3.5 relative rounded-2xl border border-paper-border bg-surface/90 p-4 text-center overflow-hidden">
                  <div className="grid grid-cols-3 gap-2 items-center text-[11px] font-mono">
                    <div></div>
                    <div className="rounded-lg bg-emerald-500/15 border border-emerald-500/30 p-1.5 font-bold text-emerald-700 dark:text-emerald-300">
                      ▲ Green (G) +0.5 ~ +3.0<br />
                      <span className="text-[10px] font-normal opacity-80">(Xanh lục / Tươi mát lá cây)</span>
                    </div>
                    <div></div>

                    <div className="rounded-lg bg-blue-500/15 border border-blue-500/30 p-1.5 font-bold text-blue-700 dark:text-blue-300">
                      ◀ Blue (B) +0.5 ~ +3.0<br />
                      <span className="text-[10px] font-normal opacity-80">(Tone Lạnh / Trong vắt Bắc Âu)</span>
                    </div>
                    <div className="rounded-xl bg-accent/20 border border-accent/40 p-2 font-black text-accent">
                      TÂM (0, 0)<br />
                      <span className="text-[9px] font-medium text-ink-subtle">Gốc WB</span>
                    </div>
                    <div className="rounded-lg bg-amber-500/15 border border-amber-500/30 p-1.5 font-bold text-amber-700 dark:text-amber-300">
                      ▶ Amber (A) +0.5 ~ +3.5<br />
                      <span className="text-[10px] font-normal opacity-80">(Tone Ấm / Mật ong / Thorium)</span>
                    </div>

                    <div></div>
                    <div className="rounded-lg bg-pink-500/15 border border-pink-500/30 p-1.5 font-bold text-pink-700 dark:text-pink-300">
                      ▼ Magenta (M) +0.5 ~ +2.0<br />
                      <span className="text-[10px] font-normal opacity-80">(Hồng tím / Da trắng hồng)</span>
                    </div>
                    <div></div>
                  </div>
                </div>

                {/* Steps to open */}
                <div className="mt-4 rounded-xl border border-accent/25 bg-accent/5 p-3">
                  <div className="font-mono text-xs font-bold text-accent mb-1 flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    Cách mở lưới 2D trên Nikon D750 & D800E:
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-ink text-xs pl-1">
                    <li>Bấm nút <strong>MENU</strong> ➔ Vào thẻ <strong>Shooting Menu (Biểu tượng Máy ảnh)</strong>.</li>
                    <li>Chọn dòng <strong>White Balance</strong>.</li>
                    <li>Di chuyển vệt sáng đến chế độ mong muốn (ví dụ: <em>Daylight</em> hoặc <em>Direct Sunlight</em>).</li>
                    <li><strong>BẤM PHÍM MŨI TÊN PHẢI (▶)</strong> trên cụm phím điều hướng (Multi-selector) để vào lưới tọa độ 2D.</li>
                    <li>Dùng 4 phím mũi diện để di chuyển chấm tọa độ đến giá trị Amber (A) / Blue (B) và Magenta (M) / Green (G) ➔ Bấm <strong>OK</strong> để lưu.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SOLUTION 1 */}
          {activeTab === 'solution1' && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-4">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                  <Zap size={16} />
                  <h3 className="font-mono text-xs font-black uppercase tracking-wider">
                    Giải Pháp 1: Quy Ước Chế Độ Có Sẵn (Nhanh Nhất — 1 Giây Không Cần Vào Menu)
                  </h3>
                </div>
                <p className="mt-2 text-xs text-ink leading-relaxed">
                  Gán sẵn các thông số bù trừ WB đặc trưng của từng dòng lens vào các chế độ WB gốc. Khi thay lens ngoài thực địa, chỉ cần <strong>giữ nút vật lý WB + xoay bánh xe lệnh sau</strong> là đổi màu xong trong 1 giây!
                </p>

                <div className="mt-3 space-y-2">
                  <div className="rounded-xl border border-paper-border bg-paper p-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="font-mono text-xs font-bold text-ink flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                        Chế độ [Daylight / Ánh sáng ban ngày]:
                      </div>
                      <p className="text-[11px] text-ink-subtle mt-0.5">
                        Dành riêng cho <strong>Tokina 28-70 Angénieux</strong> (C-16) & <strong>Minolta Rokkor</strong> (C-1)
                      </p>
                    </div>
                    <span className="rounded-lg bg-amber-500/15 px-2 py-1 font-mono text-xs font-black text-amber-800 dark:text-amber-300 border border-amber-500/30 shrink-0">
                      A +2.5, M +0.5
                    </span>
                  </div>

                  <div className="rounded-xl border border-paper-border bg-paper p-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="font-mono text-xs font-bold text-ink flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                        Chế độ [Direct Sunlight / Nắng trực tiếp]:
                      </div>
                      <p className="text-[11px] text-ink-subtle mt-0.5">
                        Dành riêng cho <strong>Carl Zeiss Jena 135 & 35 MC Đỏ 1Q</strong> (C-17)
                      </p>
                    </div>
                    <span className="rounded-lg bg-blue-500/15 px-2 py-1 font-mono text-xs font-black text-blue-800 dark:text-blue-300 border border-blue-500/30 shrink-0">
                      B +0.5, M +0.5
                    </span>
                  </div>

                  <div className="rounded-xl border border-paper-border bg-paper p-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="font-mono text-xs font-bold text-ink flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-orange-600"></span>
                        Chế độ [Shade / Bóng râm]:
                      </div>
                      <p className="text-[11px] text-ink-subtle mt-0.5">
                        Dành riêng cho <strong>S-M-C Takumar 50 & 55 Thorium Sunset</strong> (C-14)
                      </p>
                    </div>
                    <span className="rounded-lg bg-orange-500/15 px-2 py-1 font-mono text-xs font-black text-orange-800 dark:text-orange-300 border border-orange-500/30 shrink-0">
                      A +3.5, M +1.0
                    </span>
                  </div>

                  <div className="rounded-xl border border-paper-border bg-paper p-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="font-mono text-xs font-bold text-ink flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-cyan-500"></span>
                        Chế độ [Cloudy / Nhiều mây]:
                      </div>
                      <p className="text-[11px] text-ink-subtle mt-0.5">
                        Dành riêng cho <strong>Fuji 55mm f/1.8 EBC & Pastel Bắc Âu</strong> (C-3 / C-15)
                      </p>
                    </div>
                    <span className="rounded-lg bg-cyan-500/15 px-2 py-1 font-mono text-xs font-black text-cyan-800 dark:text-cyan-300 border border-cyan-500/30 shrink-0">
                      B +1.0, M +1.5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SOLUTION 2 */}
          {activeTab === 'solution2' && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-2xl border border-blue-500/25 bg-blue-500/5 p-4">
                <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                  <Sliders size={16} />
                  <h3 className="font-mono text-xs font-black uppercase tracking-wider">
                    Giải Pháp 2: Ô Nhớ Đo Trắng Cố Định (PRE d-1 đến d-6)
                  </h3>
                </div>
                <p className="mt-2 text-xs text-ink leading-relaxed">
                  Cả Nikon D750 và D800E đều hỗ trợ 6 ô nhớ đo trắng độc lập <code>d-1</code>, <code>d-2</code>, <code>d-3</code>, <code>d-4</code>, <code>d-5</code>, <code>d-6</code>. Không bao giờ bị mất thông số khi đổi các chế độ WB khác.
                </p>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl border border-paper-border bg-paper p-3">
                    <span className="font-mono font-bold text-accent">Slot d-1:</span>
                    <div className="font-bold mt-0.5">Angénieux Cine Film</div>
                    <p className="text-[11px] text-ink-subtle">Daylight 5200K | A+2.5, M+0.5</p>
                  </div>
                  <div className="rounded-xl border border-paper-border bg-paper p-3">
                    <span className="font-mono font-bold text-accent">Slot d-2:</span>
                    <div className="font-bold mt-0.5">Zeiss Jena 3D Pop</div>
                    <p className="text-[11px] text-ink-subtle">Sunlight 5200K | B+0.5, M+0.5</p>
                  </div>
                  <div className="rounded-xl border border-paper-border bg-paper p-3">
                    <span className="font-mono font-bold text-accent">Slot d-3:</span>
                    <div className="font-bold mt-0.5">Takumar Golden Amber</div>
                    <p className="text-[11px] text-ink-subtle">Sunlight 5200K | A+3.5, M+0.75</p>
                  </div>
                  <div className="rounded-xl border border-paper-border bg-paper p-3">
                    <span className="font-mono font-bold text-accent">Slot d-4:</span>
                    <div className="font-bold mt-0.5">Kodak Portra 400</div>
                    <p className="text-[11px] text-ink-subtle">Daylight 5500K | A+1.5, M+1.0</p>
                  </div>
                </div>

                <div className="mt-3 rounded-xl border border-paper-border bg-surface p-2.5 text-[11px] text-ink-subtle">
                  💡 <strong>Thao tác chuyển nhanh:</strong> Giữ nút <code>WB</code> ➔ Xoay bánh xe sau đến <code>PRE</code> ➔ Xoay tiếp bánh xe phụ phía trước (Sub-command dial) để chuyển ngay giữa d-1, d-2, d-3...
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SOLUTION 3 */}
          {activeTab === 'solution3' && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-2xl border border-purple-500/25 bg-purple-500/5 p-4">
                <div className="flex items-center gap-2 text-purple-800 dark:text-purple-300">
                  <Layers size={16} />
                  <h3 className="font-mono text-xs font-black uppercase tracking-wider">
                    Giải Pháp 3: Khóa Cứng U1/U2 (D750) & Shooting Menu Bank A/B/C/D (D800E)
                  </h3>
                </div>
                <p className="mt-2 text-xs text-ink leading-relaxed">
                  Đây là cảnh giới cao nhất của tác chiến thực địa: Lưu đồng thời cả <strong>Picture Control + Lưới WB + Tốc độ an toàn</strong> vào 1 cấu hình duy nhất.
                </p>

                {/* Nikon D750 Box */}
                <div className="mt-3 rounded-xl border border-paper-border bg-paper p-3.5 space-y-2">
                  <div className="font-mono text-xs font-black text-ink flex items-center gap-1.5">
                    <Camera size={14} className="text-accent" />
                    Trên Nikon D750: Lưu vào vòng xoay chế độ U1 & U2
                  </div>
                  <ul className="text-xs text-ink space-y-1 list-disc list-inside">
                    <li><strong>U1 (Chân dung Cine Angénieux)</strong>: Profile Neutral + WB A+2.5, M+0.5 + Tốc độ min 1/125s.</li>
                    <li><strong>U2 (Zeiss & Macro 3D)</strong>: Profile Standard + WB B+0.5, M+0.5 + ISO tự động.</li>
                  </ul>
                  <p className="text-[11px] text-ink-subtle italic">
                    Cách lưu: Chỉnh máy như ý ➔ Menu Cài đặt (Setup Menu) ➔ Save user settings ➔ Save to U1 / U2.
                  </p>
                </div>

                {/* Nikon D800E Box */}
                <div className="rounded-xl border border-paper-border bg-paper p-3.5 space-y-2">
                  <div className="font-mono text-xs font-black text-ink flex items-center gap-1.5">
                    <Camera size={14} className="text-accent" />
                    Trên Nikon D800E: Đặt tên Shooting Menu Bank A / B / C / D
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="rounded-lg bg-surface p-2 border border-paper-border">
                      <span className="font-bold text-accent">Bank A:</span> ANGENIEUX
                    </div>
                    <div className="rounded-lg bg-surface p-2 border border-paper-border">
                      <span className="font-bold text-accent">Bank B:</span> ZEISS-3D
                    </div>
                    <div className="rounded-lg bg-surface p-2 border border-paper-border">
                      <span className="font-bold text-accent">Bank C:</span> TAKUMAR
                    </div>
                    <div className="rounded-lg bg-surface p-2 border border-paper-border">
                      <span className="font-bold text-accent">Bank D:</span> PORTRA
                    </div>
                  </div>
                  <p className="text-[11px] text-ink-subtle">
                    ⚡ <strong>Thao tác tức thì:</strong> Giữ nút <code>SHOOT</code> trên cụm 4 phím tròn nắp gù D800E + xoay bánh xe lệnh sau để đổi Bank tức thì trong lúc ngắm chụp!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 border-t border-paper-border pt-3.5 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-ink-subtle">
            <Info size={13} className="text-accent shrink-0" />
            <span>Thông số WB bù trừ luôn áp dụng hiệu quả nhất với file JPEG và màn hình Live View/EVF.</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl bg-accent px-4 py-2 font-mono text-xs font-bold text-paper transition-all hover:bg-accent/90 active:scale-95 shadow-sm"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
}
