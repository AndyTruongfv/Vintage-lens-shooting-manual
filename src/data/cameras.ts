import type { CameraInfo } from '../types';

export const cameras: CameraInfo[] = [
  {
    body: 'Z5',
    label: 'Nikon Z5',
    subtitle: 'The Mirrorless Cine & Nordic Dreamer',
    subtitleEn: 'The Mirrorless Cine & Nordic Dreamer',
    sensor: '24.3MP Full-Frame CMOS (5-axis IBIS)',
    releaseYear: '2020',
    icon: 'Camera',
    strengths:
      'Cảm biến chống rung 5 trục (IBIS), Focus Peaking hỗ trợ kính xoay tay (MF), kính ngắm điện tử EVF xem trước màu sắc/WB trực tiếp (WYSIWYG).',
    strengthsEn:
      'In-Body 5-Axis Image Stabilization (IBIS), precise Focus Peaking for manual focus vintage glass, and WYSIWYG electronic viewfinder for live color/WB preview.',
    optimalUse:
      'Quay/chụp điện ảnh, chân dung ánh sáng tự nhiên/thiếu sáng, chụp phong cảnh Bắc Âu & mùa đông tuyết trắng.',
    optimalUseEn:
      'Cinematic stills & video, natural/low-light portraiture, Nordic winter landscapes, and snowscapes.',
    recommendedLenses:
      'Minolta MC Rokkor-PG 58mm f/1.2, aus JENA Tessar 50mm f/2.8 Zebra, Tokina 28-70mm f/2.8 Angénieux, Nikkor-S.C 55mm f/1.2, M42 Flektogon 35mm f/2.4',
    recommendedProfiles:
      'C-18 (Dreamy Hawkeye), C-1 (Minolta Rokkor Warm), C-20 (Autumn Bokina Glow), C-15 (Bubble Prism), C-16 (Angénieux Cinema)',
    recommendedRecipeIds: ['C-18', 'C-1', 'C-20', 'C-19', 'C-16', 'C-3', 'C-6', 'C-14', 'C-15'],
    tips: [
      'Chống rung IBIS 5 trục: Cho phép chụp tay với lens cổ ở tốc độ màn trập chậm hơn 2-3 stops mà không bị nhòe.',
      'Focus Peaking + Phóng đại điểm nét (Fn1): Hỗ trợ lấy nét tay (MF) chuẩn xác từng sợi tóc ở khẩu độ lớn f/1.2 - f/1.4.',
      'Kính ngắm EVF WYSIWYG: Xem trước màu sắc Picture Control và cân bằng trắng White Balance theo thời gian thực.',
      'Màn trập điện tử yên lặng (Silent Shutter): Chụp kín đáo, không gây tiếng động trên đường phố hoặc sự kiện trang nghiêm.',
    ],
    tipsEn: [
      '5-Axis IBIS: Enables handheld shooting with unassisted vintage glass at 2–3 shutter stops slower without camera shake blur.',
      'Focus Peaking + 100% Zoom (Fn1): Effortlessly nails manual focus on eyelashes even wide open at f/1.2 or f/1.4.',
      'WYSIWYG EVF: Live, real-time exposure, Picture Control tone curve, and White Balance fine-tune preview.',
      'Silent Electronic Shutter: Perfect for discrete street documentation and quiet ceremonies.',
    ],
  },
  {
    body: 'D800E',
    label: 'Nikon D800E',
    subtitle: 'The 36MP Micro-Contrast Master',
    subtitleEn: 'The 36MP Micro-Contrast Master',
    sensor: '36.3MP Full-Frame CMOS (No OLPF)',
    releaseYear: '2012',
    icon: 'Aperture',
    strengths:
      'Cảm biến 36MP không có bộ lọc khử răng cưa (No OLPF), tái hiện chi tiết vi mô (micro-contrast) cực đại, dải dynamic range khổng lồ.',
    strengthsEn:
      '36.3MP sensor stripped of the optical low-pass filter (No OLPF), unlocking maximum micro-contrast and immense dynamic range.',
    optimalUse:
      'Chân dung đặc tả cao cấp (Fine-art), cận cảnh macro 1:1, ảnh kiến trúc và phong cảnh chi tiết cao.',
    optimalUseEn:
      'Fine-art portraiture, 1:1 macro close-ups, architectural details, and high-resolution landscape tapestries.',
    recommendedLenses:
      'Tokina 90mm f/2.5 "Bokina", Carl Zeiss Flektogon 35mm f/2.4 MC 1Q, aus JENA Tessar 50mm f/2.8 Zebra, Tamron SP 180mm f/2.5 LD',
    recommendedProfiles:
      'C-20 (Autumn Bokina Glow), C-17 (Zeiss Jena 3D), C-5 (Bokina Macro 3D), C-15 (Bubble Prism), C-10 (Acros 100)',
    recommendedRecipeIds: ['C-20', 'C-19', 'C-17', 'C-5', 'C-10', 'C-4', 'C-13', 'C-14', 'C-15'],
    tips: [
      'Không có bộ lọc AA (No OLPF): Chi tiết vi mô siêu nét, hạn chế kéo Clarity trên +1.0 để tránh ảnh bị gắt.',
      'Độ phân giải 36MP cực nhạy nét: Luôn dùng Live View zoom 100% để lấy nét tay vi mô đạt độ nét căng tuyệt đối.',
      'Dynamic Range khủng: Dễ dàng cứu sáng vùng tối (shadow recovery) cực kỳ ấn tượng mà không vỡ hạt.',
      'Ngàm F nguyên bản: Đo sáng Stop-Down metering hoạt động mượt mà ở chế độ A (Aperture Priority) và M (Manual).',
    ],
    tipsEn: [
      'No AA Filter (No OLPF): Razor-sharp micro-contrast; keep Clarity below +1.0 to preserve natural textures.',
      'Sensory 36MP Resolution: Always use 100% Live View zoom on tripod or steady stance for surgical manual focus.',
      'Massive Dynamic Range: Outstanding clean shadow recovery without banding or destructive chroma noise.',
      'Native F-Mount: Seamless stop-down light metering in Aperture Priority (A) and Manual (M) modes.',
    ],
  },
  {
    body: 'D750',
    label: 'Nikon D750',
    subtitle: 'The Fast Run-and-Gun & Event Workhorse',
    subtitleEn: 'The Fast Run-and-Gun & Event Workhorse',
    sensor: '24.3MP Full-Frame CMOS',
    releaseYear: '2014',
    icon: 'Focus',
    strengths:
      'Lấy nét AF trục vít thân máy (Screw-drive) chuẩn xác trong bóng tối (-3 EV), khử nhiễu ISO cao xuất sắc, màu da tự động rất êm.',
    strengthsEn:
      'Robust in-body screw-drive AF motor sensitive down to -3 EV, exceptional high-ISO noise control, and flattering out-of-camera skin tones.',
    optimalUse:
      'Chụp phóng sự sự kiện, tiệc cưới, dạo phố nhanh (Run-and-gun), chân dung gia đình/bạn bè khi về Việt Nam.',
    optimalUseEn:
      'Fast event reportage, weddings, rapid run-and-gun street candid, and family gatherings.',
    recommendedLenses:
      'Tokina 28-70mm f/2.8 Pro I, Nikon AF 135mm f/2.0 DC, Nikkor 105mm f/2.5 AI-S, Nikon AF 85mm f/1.8D',
    recommendedProfiles:
      'C-2 (Kodak Portra 400), C-20 (Autumn Bokina Glow), C-16 (Angénieux Cinema), C-11 (Ilford HP5), C-1 (Minolta Rokkor Warm)',
    recommendedRecipeIds: ['C-2', 'C-20', 'C-16', 'C-11', 'C-1', 'C-14'],
    tips: [
      'Mô tơ lấy nét trục vít (Screw-drive AF): Hỗ trợ toàn bộ ống kính AF-D huyền thoại như 135mm f/2.0 DC, 85mm f/1.4D, Tokina 28-70mm.',
      'Màn hình lật đa góc: Cực kỳ hữu dụng khi chụp macro góc thấp hoặc chụp chân dung ngang hông (waist-level).',
      'Khử nhiễu ISO cao ấn tượng: Tự tin chụp đêm ISO 6400+ để giả lập hạt film Tri-X / HP5 trực tiếp từ camera.',
      'Báng cầm sâu, thân máy nhẹ: Cầm nắm công thái học cực tốt, lý tưởng cho các buổi chụp cơ động cả ngày ngoài trời.',
    ],
    tipsEn: [
      'Built-in Screw-Drive AF: Full autofocus compatibility with classic AF-D masterpieces like 135mm f/2.0 DC, 85mm f/1.8D, and Tokina 28-70.',
      'Tilting Vari-Angle LCD: Invaluable for waist-level street candid or ground-level macro angles.',
      'Superb High ISO Performance: Fearlessly shoot ISO 6400+ to emulate authentic film grain from Tri-X and HP5 straight out of camera.',
      'Deep Ergonomic Grip: Featherweight Monocoque chassis providing all-day comfort during continuous field sessions.',
    ],
  },
];
