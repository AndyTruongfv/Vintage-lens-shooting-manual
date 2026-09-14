import type { CameraInfo } from '../types';

export const cameras: CameraInfo[] = [
  {
    body: 'Z5',
    label: 'Nikon Z5',
    subtitle: 'The Mirrorless Cine & Nordic Dreamer',
    sensor: '24.3MP Full-Frame CMOS (5-axis IBIS)',
    releaseYear: '2020',
    icon: 'Camera',
    strengths:
      'Cảm biến chống rung 5 trục (IBIS), Focus Peaking hỗ trợ kính xoay tay (MF), kính ngắm điện tử EVF xem trước màu sắc/WB trực tiếp (WYSIWYG).',
    optimalUse:
      'Quay/chụp điện ảnh, chân dung ánh sáng tự nhiên/thiếu sáng, chụp phong cảnh Bắc Âu & mùa đông tuyết trắng.',
    recommendedLenses:
      'Cặp đôi Tokina 28-70mm f/2.8 Angénieux (qua FTZ), Nikkor-S.C 55mm f/1.2, M42 Carl Zeiss Flektogon 35mm f/2.4 MC',
    recommendedProfiles:
      'C-1 (Minolta Rokkor Warm), C-20 (Autumn Bokina Glow), C-19 (Starry Bubble Dream), C-18 (Dreamy Hawkeye), C-16 (Angénieux Cinema)',
    recommendedRecipeIds: ['C-1', 'C-20', 'C-19', 'C-18', 'C-16', 'C-3', 'C-6', 'C-14', 'C-15'],
    tips: [
      'Chống rung IBIS 5 trục: Cho phép chụp tay với lens cổ ở tốc độ màn trập chậm hơn 2-3 stops mà không bị nhòe.',
      'Focus Peaking + Phóng đại điểm nét (Fn1): Hỗ trợ lấy nét tay (MF) chuẩn xác từng sợi tóc ở khẩu độ lớn f/1.2 - f/1.4.',
      'Kính ngắm EVF WYSIWYG: Xem trước màu sắc Picture Control và cân bằng trắng White Balance theo thời gian thực.',
      'Màn trập điện tử yên lặng (Silent Shutter): Chụp kín đáo, không gây tiếng động trên đường phố hoặc sự kiện trang nghiêm.',
    ],
  },
  {
    body: 'D800E',
    label: 'Nikon D800E',
    subtitle: 'The 36MP Micro-Contrast Master',
    sensor: '36.3MP Full-Frame CMOS (No OLPF)',
    releaseYear: '2012',
    icon: 'Aperture',
    strengths:
      'Cảm biến 36MP không có bộ lọc khử răng cưa (No OLPF), tái hiện chi tiết vi mô (micro-contrast) cực đại, dải dynamic range khổng lồ.',
    optimalUse:
      'Chân dung đặc tả cao cấp (Fine-art), cận cảnh macro 1:1, ảnh kiến trúc và phong cảnh chi tiết cao.',
    recommendedLenses:
      'Tokina 90mm f/2.5 "Bokina" (+ Macro Tube 1:1), Carl Zeiss Flektogon 35mm f/2.4 MC 1Q, Tamron SP 180mm f/2.5 LD Anniversary',
    recommendedProfiles:
      'C-20 (Autumn Bokina Glow), C-19 (Starry Bubble Dream), C-17 (Zeiss Jena 3D), C-5 (Bokina Macro 3D), C-15 (Bubble Prism)',
    recommendedRecipeIds: ['C-20', 'C-19', 'C-17', 'C-5', 'C-10', 'C-4', 'C-13', 'C-14', 'C-15'],
    tips: [
      'Không có bộ lọc AA (No OLPF): Chi tiết vi mô siêu nét, hạn chế kéo Clarity trên +1.0 để tránh ảnh bị gắt.',
      'Độ phân giải 36MP cực nhạy nét: Luôn dùng Live View zoom 100% để lấy nét tay vi mô đạt độ nét căng tuyệt đối.',
      'Dynamic Range khủng: Dễ dàng cứu sáng vùng tối (shadow recovery) cực kỳ ấn tượng mà không vỡ hạt.',
      'Ngàm F nguyên bản: Đo sáng Stop-Down metering hoạt động mượt mà ở chế độ A (Aperture Priority) và M (Manual).',
    ],
  },
  {
    body: 'D750',
    label: 'Nikon D750',
    subtitle: 'The Fast Run-and-Gun & Event Workhorse',
    sensor: '24.3MP Full-Frame CMOS',
    releaseYear: '2014',
    icon: 'Focus',
    strengths:
      'Lấy nét AF trục vít thân máy (Screw-drive) chuẩn xác trong bóng tối (-3 EV), khử nhiễu ISO cao xuất sắc, màu da tự động rất êm.',
    optimalUse:
      'Chụp phóng sự sự kiện, tiệc cưới, dạo phố nhanh (Run-and-gun), chân dung gia đình/bạn bè khi về Việt Nam.',
    recommendedLenses:
      'Tokina 28-70mm f/2.8 Pro I (AF ngàm F trực tiếp), Nikon AF 135mm f/2.0 DC, Nikkor 105mm f/2.5 AI-S',
    recommendedProfiles:
      'C-2 (Kodak Portra 400), C-20 (Autumn Bokina Glow), C-16 (Angénieux Cinema), C-14 (Takumar Golden Amber)',
    recommendedRecipeIds: ['C-2', 'C-20', 'C-16', 'C-11', 'C-1', 'C-14'],
    tips: [
      'Mô tơ lấy nét trục vít (Screw-drive AF): Hỗ trợ toàn bộ ống kính AF-D huyền thoại như 135mm f/2.0 DC, 85mm f/1.4D, Tokina 28-70mm.',
      'Màn hình lật đa góc: Cực kỳ hữu dụng khi chụp macro góc thấp hoặc chụp chân dung ngang hông (waist-level).',
      'Khử nhiễu ISO cao ấn tượng: Tự tin chụp đêm ISO 6400+ để giả lập hạt film Tri-X / HP5 trực tiếp từ camera.',
      'Báng cầm sâu, thân máy nhẹ: Cầm nắm công thái học cực tốt, lý tưởng cho các buổi chụp cơ động cả ngày ngoài trời.',
    ],
  },
];

