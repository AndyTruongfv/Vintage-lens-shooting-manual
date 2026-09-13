import type { LensVaultItem } from '../types';

export const lensesVault: LensVaultItem[] = [
  // =========================================================================
  // BASE VIỆT NAM (17 ỐNG KÍNH)
  // =========================================================================
  {
    id: 'vn-takumar-50-14',
    name: 'S-M-C Takumar 50mm f/1.4',
    nickname: 'Thorium Radioactive Warmth',
    base: 'Vietnam',
    mount: 'M42',
    focalLength: '50mm',
    maxAperture: 'f/1.4',
    filterThread: '49mm',
    specialFeatures: ['Thorium Glass', 'Super-Multi-Coated', 'Vòng nét bơ mịn'],
    history:
      'Huyền thoại quang học của Asahi Pentax (1971-1979). Sử dụng thấu kính chứa phóng xạ Thorium oxide làm tăng chi số khúc xạ cực cao, tạo nên chất ảnh ấm vàng tự nhiên theo thời gian.',
    strengths:
      'Độ nét tâm xuất sắc ngay từ f/1.4, bokeh mắt mèo xoáy nhẹ đầy mê hoặc, sắc ấm mật ong (warm amber glow) tôn da người Châu Á cực kỳ rực rỡ.',
    goldenMilestones:
      'Chân dung hoàng hôn (Golden Hour), chụp ngược sáng dịu, ảnh hoài niệm thập niên 70.',
    recommendedBodies: ['Z5', 'D750'],
    recommendedRecipeIds: ['C-1', 'C-2', 'C-6', 'C-14'],
  },
  {
    id: 'vn-takumar-55-18',
    name: 'S-M-C Takumar 55mm f/1.8',
    nickname: 'Street Sharp Razor',
    base: 'Vietnam',
    mount: 'M42',
    focalLength: '55mm',
    maxAperture: 'f/1.8',
    filterThread: '49mm',
    specialFeatures: ['Lớp phủ SMC 7 lớp', 'Kích thước siêu nhỏ gọn', 'Độ tương phản cao'],
    history:
      'Một trong những ống kính tiêu chuẩn có lớp tráng phủ SMC 7 lớp đầu tiên trên thế giới. Độ chính xác cơ khí đỉnh cao của Pentax.',
    strengths:
      'Vi tương phản cực sắc, độ nét đều từ tâm ra rìa, khả năng chống lóa flare vượt trội hơn hẳn các lens cùng thời.',
    goldenMilestones:
      'Nhiếp ảnh đường phố đen trắng, tài liệu phóng sự, dạo phố đêm Sài Gòn / Hà Nội.',
    recommendedBodies: ['D800E', 'Z5'],
    recommendedRecipeIds: ['C-8', 'C-10', 'C-4', 'C-14'],
  },
  {
    id: 'vn-nikkor-sc-50-14',
    name: 'Nikkor-S.C Auto 50mm f/1.4',
    nickname: 'Vintage Nikkor Workhorse',
    base: 'Vietnam',
    mount: 'F-mount (Non-AI/AI\'d)',
    focalLength: '50mm',
    maxAperture: 'f/1.4',
    filterThread: '52mm',
    specialFeatures: ['Multicoated C-coating', 'Thân kim loại nguyên khối', '7 thấu kính'],
    history:
      'Phiên bản nâng cấp tráng phủ đa lớp (NIC - Nikon Integrated Coating) ra mắt năm 1972, khắc phục hoàn toàn hiện tượng lóa sáng của đời trước.',
    strengths:
      'Màu sắc đậm đà trung thực chuẩn mực Nikon cổ, bokeh tròn đầy đặn, nét căng từ f/2.0.',
    goldenMilestones:
      'Chân dung đời thường gia đình, chụp cafe trong nhà thiếu sáng, ảnh phóng sự tư liệu.',
    recommendedBodies: ['D750', 'Z5'],
    recommendedRecipeIds: ['C-2', 'C-1', 'C-11'],
  },
  {
    id: 'vn-nikkor-sc-55-12',
    name: 'Nikkor-S.C Auto 55mm f/1.2',
    nickname: 'Nocturnal Spherical Glow',
    base: 'Vietnam',
    mount: 'F-mount (Non-AI/AI\'d)',
    focalLength: '55mm',
    maxAperture: 'f/1.2',
    filterThread: '52mm',
    specialFeatures: ['Khẩu siêu lớn f/1.2', 'Hào quang cầu sai (Aberration Glow)', 'Kính khổng lồ'],
    history:
      'Ống kính khẩu độ siêu lớn f/1.2 huyền thoại của Nikon dành cho phóng viên chiến trường và chụp đêm trong điều kiện ánh sáng cực yếu trước thời đại ISO kỹ thuật số.',
    strengths:
      'Tại f/1.2 tạo hiệu ứng hào quang mờ ảo (dreamy glow) huyền ảo đầy chất thơ; khép về f/2.0 - f/2.8 nét đứt tay.',
    goldenMilestones:
      'Chân dung đêm ánh nến/đèn đường, cảnh quán bar ấm cúng, ảnh ý niệm nghệ thuật.',
    recommendedBodies: ['Z5', 'D800E'],
    recommendedRecipeIds: ['C-6', 'C-13', 'C-12', 'C-14', 'C-15', 'C-18'],
  },
  {
    id: 'vn-tamron-90-25-52b',
    name: 'Tamron SP 90mm f/2.5 Macro (Model 52B)',
    nickname: 'Original Portrait Macro King',
    base: 'Vietnam',
    mount: 'Adaptall-2 (to Nikon F / Z)',
    focalLength: '90mm',
    maxAperture: 'f/2.5',
    filterThread: '49mm',
    specialFeatures: ['Adaptall-2 linh hoạt', 'Macro 1:2 nguyên bản', 'Kính SP cao cấp'],
    history:
      'Ra mắt năm 1979, Model 52B mở ra kỷ nguyên mới biến lens macro thành ống kính chân dung kinh điển thế giới nhờ độ mềm mượt xóa phông hiếm có.',
    strengths:
      'Chuyển tiếp vùng nét sang mờ êm dịu vô song, độ phân giải vi mô cực cao, tông da người ấm áp tự nhiên.',
    goldenMilestones:
      'Chân dung bán thân cận cảnh, hoa cỏ nghệ thuật, chụp sản phẩm tinh xảo.',
    recommendedBodies: ['D800E', 'D750'],
    recommendedRecipeIds: ['C-5', 'C-2', 'C-9', 'C-15'],
  },
  {
    id: 'vn-tamron-90-28-127e',
    name: 'Tamron SP 90mm f/2.8 Macro (Model 127E)',
    nickname: 'Bokina 1:1 True Flat Field',
    base: 'Vietnam',
    mount: 'Adaptall-2 (to Nikon F / Z)',
    focalLength: '90mm',
    maxAperture: 'f/2.8',
    filterThread: '55mm',
    specialFeatures: ['Macro thực 1:1 không cần tube', 'Hệ thống thấu kính nổi (Floating)', 'SP Series'],
    history:
      'Phiên bản nâng cấp đỉnh cao (1996) đạt độ phóng đại thực 1:1 mà không cần tube nối, kế thừa toàn bộ chất bokeh huyền thoại.',
    strengths:
      'Mặt phẳng nét phẳng tuyệt đối (flat field), độ sắc nét vi mô tách bạch từng phấn hoa hay vân mắt côn trùng.',
    goldenMilestones:
      'Macro 1:1 cực đại hoa lá/côn trùng, chi tiết trang sức, chân dung đặc tả cao cấp.',
    recommendedBodies: ['D800E', 'Z5'],
    recommendedRecipeIds: ['C-5', 'C-10', 'C-4', 'C-15'],
  },
  {
    id: 'vn-nikon-135-20-dc',
    name: 'Nikon AF DC-Nikkor 135mm f/2.0D',
    nickname: 'King of Bokeh / The Lord of the Aisles',
    base: 'Vietnam',
    mount: 'F-mount (Screw-drive AF)',
    focalLength: '135mm',
    maxAperture: 'f/2.0',
    filterThread: '72mm',
    specialFeatures: [
      'Vòng Defocus Image Control (DC)',
      'Khẩu độ lớn f/2.0 Chân dung',
      'Tùy biến Bokeh Trước/Sau (F/R)',
      'Hiệu ứng Hollywood Dreamy Glow',
    ],
    history:
      'Kiệt tác cơ quang học độc nhất vô nhị trong lịch sử Nikon. Vòng DC (Defocus Control) cho phép can thiệp trực tiếp vào quang sai cầu (spherical aberration). Vị trí 0 cho độ nét đanh thép; vặn R (Rear) làm phông nền tan chảy như bơ tuyết; vặn F (Front) làm tiền cảnh dịu êm vào chủ thể.',
    strengths:
      'Độ nổi khối 3D đanh thép, bokeh tan chảy mịn màng không viền sắc; khả năng kiểm soát quang sai cầu độc bản tạo chiều sâu điện ảnh kinh điển.',
    goldenMilestones:
      'Chân dung tiệc cưới cự ly vàng 5-8m, thời trang thảm đỏ, chân dung cô dâu Dreamy Glow, chân dung đen trắng Hollywood kiêu sa.',
    recommendedBodies: ['D750', 'D800E', 'Z5'],
    recommendedRecipeIds: ['C-2', 'C-12'],
    dcFieldGuide: {
      title: 'Quy tắc vàng vận hành vòng DC (Defocus Control Masterclass)',
      dcRingPrinciple: [
        'Vị trí 0: Ống fix 135mm f/2.0 siêu nét, tương phản chuẩn mực, độ nổi khối 3D đanh thép.',
        'Vặn R (Rear): Tối ưu xóa phông hậu cảnh mịn màng như bơ tuyết, bokeh tròn dịu.',
        'Vặn F (Front): Làm tan chảy tiền cảnh (nhánh lá, khung cửa, rèm) mượt mà vào chủ thể.',
      ],
      goldenRules: [
        {
          step: 1,
          title: 'Khóa vòng khẩu',
          description: 'Khóa vòng khẩu trên thân lens ở f/16, điều chỉnh khẩu độ chụp trên thân máy (f/2, f/2.8, f/4...).',
        },
        {
          step: 2,
          title: 'Đồng số DC với Khẩu độ',
          description: 'Khẩu chụp bao nhiêu thì xoay vòng DC bấy nhiêu (Khẩu f/2 ➔ xoay DC R2; Khẩu f/2.8 ➔ xoay DC R2.8).',
        },
        {
          step: 3,
          title: 'VẶN DC TRƯỚC ➔ LẤY NÉT SAU CÙNG',
          description: 'Vặn vòng DC sẽ làm dịch chuyển mặt phẳng nét (Focus Shift). Bắt buộc phải vặn DC xong mới bấm lấy nét (AF/MF). Nếu lấy nét trước rồi mới vặn DC, ảnh sẽ bị out nét 100%!',
          isCrucial: true,
        },
      ],
      cinemaGlowTip:
        'Mẹo điện ảnh (Dreamy Glow): Đặt số DC lớn hơn khẩu chụp (ví dụ khẩu f/2 vặn DC lên R4 hoặc R5.6) để tạo hiệu ứng hào quang tỏa sáng mơ màng (spherical aberration glow), làn da phụ nữ và cô dâu sẽ mịn màng, ảo diệu như phim Hollywood thập niên 50.',
    },
  },
  {
    id: 'vn-nikon-35-70-35-ais',
    name: 'Nikon 35-70mm f/3.5 AI-S',
    nickname: 'Constant Aperture Studio Zoom',
    base: 'Vietnam',
    mount: 'F-mount (AI-S)',
    focalLength: '35-70mm',
    maxAperture: 'f/3.5',
    filterThread: '62mm',
    specialFeatures: ['Khẩu cố định f/3.5', 'Chế độ Macro switch @ 70mm', 'Thân kim loại nặng'],
    history:
      'Ống kính zoom tiêu chuẩn chuyên nghiệp của Nikon đầu thập niên 80, được các studio và tạp chí thời bấy giờ tin cậy nhờ chất lượng quang học ngang ngửa ống fix.',
    strengths:
      'Độ tương phản cao, hình ảnh chắc nịch, chuyển vùng sắc nét ổn định toàn dải tiêu cự.',
    goldenMilestones:
      'Chụp sự kiện gia đình, dạo phố đa dụng, tĩnh vật và món ăn góc chụp cận cảnh.',
    recommendedBodies: ['D750', 'Z5'],
    recommendedRecipeIds: ['C-1', 'C-4', 'C-11'],
  },
  {
    id: 'vn-tokina-28-70-pro1-duo',
    name: 'Tokina AT-X PRO 28-70mm f/2.8 Đời 1 (Angénieux Twin #1 & #2)',
    nickname: 'Bản Angénieux Cặp đôi song sinh',
    base: 'Vietnam',
    mount: 'F-mount (Screw-drive AF)',
    focalLength: '28-70mm',
    maxAperture: 'f/2.8',
    filterThread: '77mm',
    specialFeatures: ['Công thức quang học Angénieux Pháp', 'Vỏ nhám sần Pro Heavy-duty', 'Cặp đôi sao lưu 2 Body'],
    history:
      'Sở hữu công thức quang học mua bản quyền từ huyền thoại điện ảnh Angénieux 28-70mm f/2.6 của Pháp. Thấu kính thủy tinh đúc trứ danh tạo nên chất màu điện ảnh vô đối. Cặp đôi gồm 2 Unit sao lưu chiến lược để tác chiến song song 2 body (D750 & Z5).',
    strengths:
      'Tông màu ấm mật ong nồng nàn, chuyển vùng highlight êm dịu không gắt, flare dạng vòng cung điện ảnh ấm áp, độ bền cơ học nồi đồng cối đá.',
    goldenMilestones:
      'Quay phim/chụp ảnh cưới phong cách điện ảnh, chân dung hoàng hôn, phóng sự tiệc tác chiến đa góc máy.',
    recommendedBodies: ['Z5', 'D750'],
    recommendedRecipeIds: ['C-1', 'C-16', 'C-3', 'C-2', 'C-11', 'C-14'],
  },
  {
    id: 'vn-tamron-180-25-ld',
    name: 'Tamron SP 180mm f/2.5 LD (IF) 35th Anniversary (Model 63B)',
    nickname: 'Nordic Velvet Tele Master',
    base: 'Vietnam',
    mount: 'Adaptall-2 (to Nikon F / Z)',
    focalLength: '180mm',
    maxAperture: 'f/2.5',
    filterThread: '77mm',
    specialFeatures: ['Thấu kính tán xạ thấp LD', 'Lấy nét trong (IF)', 'Kỷ niệm 35 năm Tamron'],
    history:
      'Tuyệt phẩm quang học sản xuất giới hạn kỷ niệm 35 năm thành lập Tamron (1985). Được đánh giá là một trong những ống tele 180mm sắc nét nhất từng được chế tạo.',
    strengths:
      'Hoàn toàn không có viền tím (CA-free) nhờ thấu kính LD, độ tách bạch không gian 3D kinh ngạc, bokeh nhung mịn như tranh vẽ.',
    goldenMilestones:
      'Chân dung nén phối cảnh tầm xa, cô lập chủ thể giữa thiên nhiên, phong cảnh đồi núi.',
    recommendedBodies: ['D800E', 'Z5', 'D750'],
    recommendedRecipeIds: ['C-7', 'C-13', 'C-9'],
  },
  {
    id: 'vn-nikon-80-200-28-pushpull',
    name: 'Nikon AF 80-200mm f/2.8 ED (Đời 2 Push-Pull)',
    nickname: 'Classic Tele Workhorse',
    base: 'Vietnam',
    mount: 'F-mount (Screw-drive AF)',
    focalLength: '80-200mm',
    maxAperture: 'f/2.8',
    filterThread: '77mm',
    specialFeatures: ['Cơ chế đẩy kéo Push-Pull nhanh', 'Kính ED cao cấp', 'AF trục vít tốc độ cao'],
    history:
      'Ống kính tele zoom huyền thoại của phóng viên thể thao và sự kiện thập niên 90. Thân máy kim loại đúc nguyên khối siêu bền.',
    strengths:
      'Độ nét và độ tương phản cực kỳ ấn tượng ngay tại f/2.8, màu sắc trong trẻo, bắt trọn chuyển động từ xa.',
    goldenMilestones:
      'Sự kiện thể thao, tiệc cưới ngoài trời, chân dung sân khấu và biểu diễn.',
    recommendedBodies: ['D750', 'D800E'],
    recommendedRecipeIds: ['C-2', 'C-4', 'C-11'],
  },
  {
    id: 'vn-fujinon-55-18-ebc',
    name: 'Fujinon 55mm f/1.8 EBC',
    nickname: '11-Layer Coating Wizard',
    base: 'Vietnam',
    mount: 'M42',
    focalLength: '55mm',
    maxAperture: 'f/1.8',
    filterThread: '49mm',
    specialFeatures: ['Lớp phủ điện tử EBC 11 lớp', 'Màu xanh lục ngọc Fuji đặc trưng', 'Ngàm M42'],
    history:
      'Trang bị công nghệ tráng phủ chùm tia điện tử (Electron Beam Coating - EBC) 11 lớp tối tân nhất của Fujifilm giúp triệt tiêu phản xạ và tối ưu độ trong suốt.',
    strengths:
      'Tái tạo sắc xanh lá cây (Fuji greens) và sắc trời trong trẻo tuyệt mỹ, độ tương phản trong veo không đục màu.',
    goldenMilestones:
      'Phong cảnh thiên nhiên, chụp rừng cây trong nắng sớm, chân dung màu film pastel.',
    recommendedBodies: ['Z5', 'D800E'],
    recommendedRecipeIds: ['C-3', 'C-10', 'C-1', 'C-15'],
  },
  {
    id: 'vn-czj-sonnar-135-35-mc',
    name: 'Carl Zeiss Jena Sonnar 135mm f/3.5 MC (Chữ đỏ)',
    nickname: 'German Red Letter Sharpness',
    base: 'Vietnam',
    mount: 'M42',
    focalLength: '135mm',
    maxAperture: 'f/3.5',
    filterThread: '49mm',
    specialFeatures: ['Chữ đỏ Đông Đức 1Q', 'Tráng phủ đa lớp MC', 'Cơ cấu lấy nét dài mượt mà'],
    history:
      'Được thiết kế và chế tạo bởi Carl Zeiss Jena (Đông Đức). Cấu trúc quang học Sonnar trứ danh nổi tiếng về vi tương phản và độ nét micro.',
    strengths:
      'Độ sắc nét đến từng sợi tóc ngay tại khẩu mở lớn f/3.5, độ tương phản đậm chất Đức cổ điển, chuyển khối 3D mạnh mẽ.',
    goldenMilestones:
      'Chân dung nghệ thuật đặc tả, kiến trúc chi tiết, ảnh đen trắng fine-art.',
    recommendedBodies: ['D800E', 'D750'],
    recommendedRecipeIds: ['C-17', 'C-10', 'C-9', 'C-13'],
  },
  {
    id: 'vn-czj-flektogon-35-24-mc-1q',
    name: 'Carl Zeiss Jena Flektogon 35mm f/2.4 MC (Chữ đỏ Fullbox 1Q)',
    nickname: 'The Legendary 19cm Close-Focus 1Q',
    base: 'Vietnam',
    mount: 'M42',
    focalLength: '35mm',
    maxAperture: 'f/2.4',
    filterThread: '49mm',
    specialFeatures: ['Lấy nét siêu gần 19cm', 'Chứng chỉ chất lượng cao nhất 1Q', 'MC Red Letter'],
    history:
      'Ống kính 35mm được tôn sùng nhất của hệ M42. Khoảng cách lấy nét tối thiểu chỉ 19cm biến nó thành một ống kính nửa góc rộng, nửa macro cực kỳ độc đáo.',
    strengths:
      'Hiệu ứng phối cảnh phóng đại góc gần ngoạn mục, màu sắc rực rỡ đậm đà kiểu Zeiss, độ nét cực cao toàn dải.',
    goldenMilestones:
      'Street life cận cảnh, hoa lá macro góc rộng, nội thất cổ kính và ẩm thực.',
    recommendedBodies: ['D800E', 'Z5'],
    recommendedRecipeIds: ['C-17', 'C-4', 'C-5', 'C-8', 'C-15'],
  },
  {
    id: 'vn-nikon-nikkor-q-135-28',
    name: 'Nikon Nikkor-Q Auto 135mm f/2.8 (Non-AI)',
    nickname: 'Heavy Metal Classic Tele',
    base: 'Vietnam',
    mount: 'F-mount (Non-AI)',
    focalLength: '135mm',
    maxAperture: 'f/2.8',
    filterThread: '52mm',
    specialFeatures: ['4 thấu kính Sonnar formula', 'Lon nhôm nguyên khối', 'Hood liền thân'],
    history:
      'Thiết kế kinh điển ra đời từ thập niên 60 với ký hiệu chữ "Q" (Quattuor - 4 thấu kính). Thân kim loại mạ chrome và khía kim cương cổ điển.',
    strengths:
      'Chất màu trầm ấm đậm đà phong cách cổ điển, tương phản dịu êm, chụp chân dung rất nịnh da.',
    goldenMilestones:
      'Chân dung vintage hoài cổ, bắt khoảnh khắc tầm trung, ảnh tĩnh vật.',
    recommendedBodies: ['Z5', 'D750'],
    recommendedRecipeIds: ['C-1', 'C-12', 'C-9', 'C-14'],
  },
  {
    id: 'vn-komuranon-135-25',
    name: 'Komuranon 135mm f/2.5 (Sankyo Kohki)',
    nickname: 'Japanese Rare Fast Tele',
    base: 'Vietnam',
    mount: 'T-mount / M42 (Uni-mount)',
    focalLength: '135mm',
    maxAperture: 'f/2.5',
    filterThread: '58mm',
    specialFeatures: ['Khẩu độ lớn f/2.5 hiếm có', 'Sankyo Kohki Japan', 'Hệ thống ngàm Uni đa năng'],
    history:
      'Sản phẩm của hãng quang học độc lập lừng danh Sankyo Kohki Nhật Bản, nổi tiếng với các thiết kế khẩu lớn độc đáo và cơ khí cơ bắp.',
    strengths:
      'Khẩu f/2.5 xóa phông cực tốt, bokeh bong bóng nhẹ ở khẩu lớn, cho chất ảnh lạ mắt giàu tính nghệ thuật.',
    goldenMilestones:
      'Chân dung ngược sáng mơ màng, nghệ thuật trừu tượng, chụp chân dung đêm.',
    recommendedBodies: ['Z5', 'D750'],
    recommendedRecipeIds: ['C-6', 'C-1', 'C-8'],
  },

  // =========================================================================
  // BASE PHẦN LAN (11 ỐNG KÍNH)
  // =========================================================================
  {
    id: 'fi-minolta-md-50-17-rokkor',
    name: 'Minolta MD 50mm f/1.7 Rokkor (Chữ đỏ)',
    nickname: 'Warm Tonal Honey Master',
    base: 'Finland',
    mount: 'MD (qua ngàm chuyển MD-Z/MD-NEX)',
    focalLength: '50mm',
    maxAperture: 'f/1.7',
    filterThread: '49mm',
    specialFeatures: ['Chữ đỏ Rokkor', 'Lớp tráng phủ Achromatic Coating', 'Trọng lượng siêu nhẹ'],
    history:
      'Dòng lens Rokkor danh tiếng của Minolta với lớp phủ độc quyền hai lớp Achromatic, nguồn cảm hứng trực tiếp cho công thức màu C-1 trong cẩm nang.',
    strengths:
      'Tông da ấm mật ong tuyệt hảo, vùng chuyển nét mịn màng không gắt, kích thước nhỏ gọn lý tưởng mang đi du hành Bắc Âu.',
    goldenMilestones:
      'Chân dung ánh sáng tự nhiên Bắc Âu, ảnh dạo phố mùa thu lá vàng, chân dung cafe sưởi ấm.',
    recommendedBodies: ['Z5'],
    recommendedRecipeIds: ['C-1', 'C-3', 'C-11'],
  },
  {
    id: 'fi-samyang-35-14-umc',
    name: 'Samyang 35mm f/1.4 AS UMC MF',
    nickname: 'Modern Low-Light Giant',
    base: 'Finland',
    mount: 'F-mount (AE Chip)',
    focalLength: '35mm',
    maxAperture: 'f/1.4',
    filterThread: '77mm',
    specialFeatures: ['Thấu kính phi cầu Aspherical', 'Lớp phủ UMC hiện đại', 'Khẩu cực lớn f/1.4'],
    history:
      'Kẻ hủy diệt phân khúc 35mm f/1.4 với hiệu năng quang học hiện đại vượt trội, được chế tác tối ưu cho cảm biến kỹ thuật số độ phân giải cao.',
    strengths:
      'Độ nét khủng khiếp ngay tại f/1.4 từ tâm ra rìa, không cầu sai, vi độ nét cực căng cho phong cảnh và đêm tuyết.',
    goldenMilestones:
      'Chụp đêm tuyết mùa đông Bắc Âu, chụp bầu trời sao cực quang (Aurora), chân dung môi trường điện ảnh.',
    recommendedBodies: ['D800E', 'Z5'],
    recommendedRecipeIds: ['C-3', 'C-4', 'C-6'],
  },
  {
    id: 'fi-sigma-50-14-ex-dg',
    name: 'Sigma 50mm f/1.4 EX DG HSM (Filter 77mm)',
    nickname: 'Fat Boy Cinema Prime',
    base: 'Finland',
    mount: 'F-mount (HSM AF)',
    focalLength: '50mm',
    maxAperture: 'f/1.4',
    filterThread: '77mm',
    specialFeatures: ['Kính phi tiêu chuẩn Filter 77mm', 'Mô tơ siêu âm HSM', 'Bokeh cực mịn'],
    history:
      'Phiên bản "Fat 50" huyền thoại đời trước dòng Art, thiết kế thấu kính to dị thường (Filter 77mm) để hạn chế tối đa hiện tượng tối góc vignette.',
    strengths:
      'Bokeh mượt mà như kem bơ, chuyển tông rất điện ảnh, màu sắc dày dặn ấm áp.',
    goldenMilestones:
      'Chân dung tiệc cưới ngoài trời, chân dung điện ảnh ban ngày, ảnh đường phố Bắc Âu.',
    recommendedBodies: ['D750', 'D800E'],
    recommendedRecipeIds: ['C-2', 'C-1', 'C-12'],
  },
  {
    id: 'fi-nikon-af-50-14d',
    name: 'Nikon AF Nikkor 50mm f/1.4D',
    nickname: 'Classic D-Type Standard',
    base: 'Finland',
    mount: 'F-mount (Screw-drive AF)',
    focalLength: '50mm',
    maxAperture: 'f/1.4',
    filterThread: '52mm',
    specialFeatures: ['Truyền dữ liệu khoảng cách D-type', 'Nhỏ gọn bỏ túi', 'AF nhanh trên D750'],
    history:
      'Ống kính 50mm tiêu chuẩn của mọi nhiếp ảnh gia Nikon thời kỳ phim chuyển sang số (1993-2008), sản xuất tại Nhật Bản.',
    strengths:
      'Tương phản mạnh mẽ, độ sắc nét cao từ f/2.0, màu sắc trong trẻo tự nhiên, AF bắt dính khoảnh khắc nhanh.',
    goldenMilestones:
      'Chụp sự kiện gia đình nhanh (Run-and-gun), chân dung du lịch, đường phố đời thường.',
    recommendedBodies: ['D750', 'Z5'],
    recommendedRecipeIds: ['C-2', 'C-11', 'C-4'],
  },
  {
    id: 'fi-nikon-micro-55-28-af',
    name: 'Nikon Micro-Nikkor AF 55mm f/2.8',
    nickname: 'CRC Micro-Contrast Scalpel',
    base: 'Finland',
    mount: 'F-mount (Screw-drive AF)',
    focalLength: '55mm',
    maxAperture: 'f/2.8',
    filterThread: '52mm',
    specialFeatures: ['Hệ thống hiệu chỉnh cự ly gần CRC', 'Độ phẳng trường nét hoàn hảo', 'Macro 1:2'],
    history:
      'Một trong những ống kính nét nhất mà Nikon từng tạo ra. Hệ thống CRC (Close-Range Correction) duy trì độ phân giải cực đại từ vô cực đến cự ly macro cận sát.',
    strengths:
      'Độ nét như dao cạo phẫu thuật, micro-contrast tối đa, chi tiết vi mô cực kỳ tách bạch trên cảm biến 36MP D800E.',
    goldenMilestones:
      'Tĩnh vật chi tiết, tài liệu khoa học, kiến trúc điêu khắc, phong cảnh vân tuyết.',
    recommendedBodies: ['D800E', 'Z5'],
    recommendedRecipeIds: ['C-5', 'C-10', 'C-13'],
  },
  {
    id: 'fi-nikon-af-85-18d',
    name: 'Nikon AF Nikkor 85mm f/1.8D',
    nickname: 'The Street & Portrait Razor',
    base: 'Finland',
    mount: 'F-mount (Screw-drive AF)',
    focalLength: '85mm',
    maxAperture: 'f/1.8',
    filterThread: '62mm',
    specialFeatures: ['Thân kim loại bọc nhôm nhám', 'Lấy nét trong RF', 'AF trục vít đầm chắc'],
    history:
      'Ống chân dung bán thân huyền thoại của Nikon, nổi danh với độ sắc nét bén ngót và kích thước gọn gàng hơn nhiều so với bản f/1.4D.',
    strengths:
      'Nét căng ngay tại f/1.8, bắt nét nhanh nhạy trong điều kiện thiếu sáng trên body D750.',
    goldenMilestones:
      'Chân dung đường phố bán thân, sự kiện tiệc trong nhà, ảnh chân dung biểu cảm.',
    recommendedBodies: ['D750', 'D800E'],
    recommendedRecipeIds: ['C-2', 'C-11', 'C-8'],
  },
  {
    id: 'fi-nikon-105-25-ais',
    name: 'Nikon Nikkor 105mm f/2.5 AI-S',
    nickname: 'Afghan Girl Legendary Optics',
    base: 'Finland',
    mount: 'F-mount (AI-S)',
    focalLength: '105mm',
    maxAperture: 'f/2.5',
    filterThread: '52mm',
    specialFeatures: ['Huyền thoại Steve McCurry (National Geographic)', 'Xenotar optical formula', 'Hood liền'],
    history:
      'Ống kính bất tử trong lịch sử nhiếp ảnh thế giới, được Steve McCurry sử dụng để chụp bức ảnh chân dung "Cô gái Afghan" nổi tiếng nhất thế giới trên trang bìa National Geographic 1985.',
    strengths:
      'Tái tạo màu mắt và sắc thái da người hoàn hảo không đối thủ, tương phản dịu êm, độ nét vượt thời gian.',
    goldenMilestones:
      'Chân dung đặc tả ánh mắt, chân dung nhân vật tài liệu, ảnh phong cảnh nén chiều sâu.',
    recommendedBodies: ['D800E', 'Z5', 'D750'],
    recommendedRecipeIds: ['C-2', 'C-4', 'C-9', 'C-12'],
  },
  {
    id: 'fi-tamron-135-25-03b',
    name: 'Tamron SP 135mm f/2.5 (Model 03B)',
    nickname: 'Compact Tele Portrait Gem',
    base: 'Finland',
    mount: 'Adaptall-2 (to Nikon F / Z)',
    focalLength: '135mm',
    maxAperture: 'f/2.5',
    filterThread: '58mm',
    specialFeatures: ['Dòng SP chuyên nghiệp', 'Hood kéo tích hợp', 'Kích thước siêu ngắn gọn'],
    history:
      'Thuộc dòng SP (Super Performance) danh giá của Tamron (1979-1984), thiết kế ngắn hơn đáng kể so với các ống 135mm cùng thời.',
    strengths:
      'Độ nét tâm rất tốt ngay f/2.5, khử quang sai vượt trội, chuyển phông êm ái.',
    goldenMilestones:
      'Chân dung ngoại cảnh mùa tuyết, chân dung trẻ em tự nhiên, dạo phố tầm xa.',
    recommendedBodies: ['Z5', 'D750'],
    recommendedRecipeIds: ['C-1', 'C-3', 'C-7'],
  },
  {
    id: 'fi-nikon-24-120-f4g-vr',
    name: 'Nikon AF-S NIKKOR 24-120mm f/4G ED VR',
    nickname: 'Nordic Expedition All-in-One',
    base: 'Finland',
    mount: 'F-mount (AF-S G VR)',
    focalLength: '24-120mm',
    maxAperture: 'f/4.0',
    filterThread: '77mm',
    specialFeatures: ['Lớp phủ Nano Crystal Coat', 'Chống rung VR thế hệ 2', 'Dải tiêu cự đa năng 5x'],
    history:
      'Ống kính zoom du hành việt dã cao cấp của Nikon trang bị lớp phủ Nano chống lóa và chống rung quang học VR mạnh mẽ.',
    strengths:
      'Đa năng tuyệt đối từ góc rộng 24mm đến tele 120mm, khẩu cố định f/4, màu sắc trong trẻo tương phản cao.',
    goldenMilestones:
      'Chuyến thám hiểm Bắc Cực, trekking rừng thông tuyết Phần Lan, ảnh phong cảnh đa biến.',
    recommendedBodies: ['D750', 'D800E', 'Z5'],
    recommendedRecipeIds: ['C-3', 'C-4', 'C-10'],
  },
  {
    id: 'fi-nikon-70-210-f4-auto',
    name: 'Nikon AF Nikkor 70-210mm f/4 Auto',
    nickname: 'Beercan Constant F4',
    base: 'Finland',
    mount: 'F-mount (Screw-drive AF)',
    focalLength: '70-210mm',
    maxAperture: 'f/4.0',
    filterThread: '62mm',
    specialFeatures: ['Khẩu cố định f/4 toàn dải', 'Vỏ kim loại Beercan cổ điển', 'Chỉ sản xuất 1986-1987'],
    history:
      'Ống tele zoom AF khẩu cố định f/4 hiếm có của Nikon chỉ sản xuất trong vòng hơn 1 năm, được người chơi sưu tầm săn đón vì độ nét và chất màu đậm đà.',
    strengths:
      'Độ nét đều khắp dải zoom tại f/4, bokeh tròn êm, màu sắc no dày cổ điển.',
    goldenMilestones:
      'Chân dung nén phối cảnh mùa thu, phong cảnh rừng Bắc Âu, sự kiện ngoài trời.',
    recommendedBodies: ['D750', 'D800E'],
    recommendedRecipeIds: ['C-7', 'C-2', 'C-11'],
  },
  {
    id: 'fi-tamron-80-210-103a',
    name: 'Tamron 80-210mm f/3.8-4.0 Macro (Model 103A)',
    nickname: 'Vintage Adaptall Tele Zoom',
    base: 'Finland',
    mount: 'Adaptall-2 (to Nikon F / Z)',
    focalLength: '80-210mm',
    maxAperture: 'f/3.8-4.0',
    filterThread: '58mm',
    specialFeatures: ['Chế độ cận cảnh Macro 1:2.8', 'Ngàm Adaptall-2 hoán đổi', 'Vòng xoay êm nhẹ'],
    history:
      'Ống zoom tele phổ biến của Tamron (1981-1986), cơ chế đẩy kéo chắc chắn và chức năng macro tiện dụng.',
    strengths:
      'Màu sắc ấm áp, độ tương phản vừa phải êm dịu, chụp hoa cỏ cận cảnh rất hữu dụng.',
    goldenMilestones:
      'Chụp dạo vườn bách thảo mùa hè Phần Lan, hoa tuyết mùa đông, chân dung tự nhiên.',
    recommendedBodies: ['Z5', 'D750'],
    recommendedRecipeIds: ['C-1', 'C-5', 'C-3'],
  },
  {
    id: 'fi-tokina-af-90-28-macro',
    name: 'Tokina AT-X AF 90mm f/2.8 Macro (Fullbox kèm Tube 1:1 & Bao da Zin)',
    nickname: 'Chiến thần Macro Tuyết Bắc Âu / Tokina AF 90 Macro',
    base: 'Finland',
    mount: 'Nikon F-mount (qua FTZ trên Z5)',
    focalLength: '90mm',
    maxAperture: 'f/2.8',
    filterThread: '55mm',
    specialFeatures: ['Bản kế thừa Bokina huyền thoại', 'Fullbox Tube Extender 1:1 & Bao da Zin', 'Trường nét phẳng Flat-Field'],
    history:
      'Bản kế thừa tự động hóa (AF) huyền thoại dòng AT-X Pro đầu thập niên 90 từ tiền bối Bokina, hoàn thiện chuẩn sưu tầm Fullbox kèm Macro Extender 1:1 và bao da gin xách tay từ Nhật Bản.',
    strengths:
      'Độ nét vi mô cực đỉnh, trường nét phẳng tuyệt đối, bokeh mịn mượt như nhung không viền sắc; phóng đại 1:1 siêu chi tiết khi gắn tube zin.',
    goldenMilestones:
      'Tinh thể băng tuyết mùa đông Bắc Âu, côn trùng & hoa dại mùa hè Phần Lan, chân dung đặc tả chiều sâu con ngươi và ánh mắt.',
    recommendedBodies: ['Z5', 'D800E', 'D750'],
    recommendedRecipeIds: ['C-5', 'C-10', 'C-15'],
  },
];
