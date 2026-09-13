import type { GenreInspiration } from '../types';

export const genreInspirations: GenreInspiration[] = [
  {
    id: 'street-minimalist',
    title: 'Street & Minimalist',
    genreTag: 'Phố xá & Hình học Tối giản',
    headline: 'Ánh sáng xiên kịch tính, bóng đổ hình học & Màu phim qua màn kính mờ',
    vibeDescription:
      'Nghệ thuật quan sát đường phố đỉnh cao: Khai thác sự tương phản gắt gao giữa ánh sáng và bóng tối để kiến tạo không gian hình học, hoặc thu giữ chất màu hoài niệm qua những tấm kính đọng nước mưa.',
    masters: [
      {
        name: 'Fan Ho (Hà Phiên)',
        period: '1931 – 2016 · Hong Kong',
        signatureStyle: 'Shadows & Geometry (Bóng đổ & Hình học tương phản cực hạn)',
        description:
          'Bậc thầy "Đại thi hào ánh sáng Hong Kong". Ông biến những con hẻm chật chội và bậc thang ẩm ướt thành những kiệt tác hình học trừu tượng với các vệt nắng xé toạc bóng tối sâu thẳm.',
        websiteUrl: 'https://fanho-forgetmenot.com',
        websiteLabel: 'fanho-forgetmenot.com',
        keyTechnique:
          'Chờ đợi thời khắc ánh sáng xiên gắt gao, khép khẩu sâu, dìm vùng tối Shadows (-1.5 → -2.0) để tạo hình bóng người đơn độc (silhouettes).',
      },
      {
        name: 'Saul Leiter',
        period: '1923 – 2013 · New York',
        signatureStyle: 'Through-the-Glass Film Color (Màu phim qua ô kính sương mờ)',
        description:
          'Nhà tiên phong màu sắc đường phố New York. Ông chụp xuyên qua ô cửa kính quán cafe đọng hơi nước, giọt mưa hoặc gương xe hơi, tạo nên dải màu pastel mềm mại và bố cục phân mảnh đầy chất thơ.',
        websiteUrl: 'https://www.saulleiterfoundation.org',
        websiteLabel: 'saulleiterfoundation.org',
        keyTechnique:
          'Khai thác bóng phản chiếu, độ tương phản dịu nhẹ (Contrast -2.0, Clarity -1.0) và tông màu ấm cổ điển hoặc xanh ngọc trầm.',
      },
    ],
    recommendedBodies: ['D800E', 'Z5'],
    recommendedLenses: [
      'Carl Zeiss Flektogon 35mm f/2.4 MC 1Q',
      'Tokina AT-X PRO 28-70mm f/2.8 (Angénieux)',
    ],
    recommendedRecipeIds: ['C-8', 'C-13', 'C-4', 'C-10'],
  },
  {
    id: 'cinematic-wedding',
    title: 'Cinematic Wedding',
    genreTag: 'Cưới Điện ảnh & Không gian Cảm xúc',
    headline: 'Ánh sáng tự nhiên dịu êm Bắc Âu & Bố cục điện ảnh đột phá',
    vibeDescription:
      'Vượt qua lối chụp ảnh cưới tạo dáng công nghiệp: Tôn vinh không gian hoang sơ hùng vĩ, ánh sáng mờ sương tự nhiên và những khoảnh khắc gắn kết chân thành ngập tràn chất điện ảnh.',
    masters: [
      {
        name: 'Nordica Photography',
        period: 'Cole & Jakob · Thụy Điển & Canada',
        signatureStyle: 'Nordic Ambient (Ánh sáng Bắc Âu & Không gian tự nhiên hùng vĩ)',
        description:
          'Cặp đôi nhiếp ảnh gia định hình phong cách chụp cưới Bắc Âu: Đưa cặp đôi vào giữa thiên nhiên bao la, bầu trời nhiều mây và ánh sáng khuếch tán dịu nhẹ, tạo nên chiều sâu tự sự sâu lắng.',
        websiteUrl: 'https://nordicaphotography.com',
        websiteLabel: 'nordicaphotography.com',
        keyTechnique:
          'Tận dụng ngày nhiều mây hoặc sương mù; sử dụng công thức tông lạnh dịu (Fuji Pro 400H) với bóng đổ xanh ngọc và chuyển tiếp highlight mượt như nhung.',
      },
      {
        name: 'Fer Juaristi',
        period: 'Monterrey, Mexico',
        signatureStyle: 'Artistic Contrast & Cinematic Angles (Đột phá góc máy & Tương phản cảm xúc)',
        description:
          'Nghệ sĩ phóng sự cưới hàng đầu thế giới với tư duy thị giác độc bản: Khai thác góc máy táo bạo, ngược sáng viền tóc (rim-light) và sự hòa quyện giữa tương phản đậm chất thời trang và cảm xúc thật.',
        websiteUrl: 'https://ferjuaristi.com',
        websiteLabel: 'ferjuaristi.com',
        keyTechnique:
          'Tận dụng khẩu độ lớn f/1.2 - f/2.0 để tách phông êm dịu; chuyển đổi linh hoạt giữa B&W tương phản cao và tông ấm Portra nồng nàn.',
      },
    ],
    recommendedBodies: ['Z5', 'D750'],
    recommendedLenses: [
      'Nikkor 105mm f/2.5 AI-S',
      'Tokina 28-70mm f/2.8 Angénieux',
      'Nikon AF 135mm f/2.0 DC',
    ],
    recommendedRecipeIds: ['C-3', 'C-2', 'C-1', 'C-12'],
  },
  {
    id: 'family-candid-events',
    title: 'Family & Candid Events',
    genreTag: 'Phóng sự Đời thường & Tuổi thơ Tự do',
    headline: 'Bắt trọn khoảnh khắc hóm hỉnh đời thường & Tuổi thơ hoang dã tự nhiên',
    vibeDescription:
      'Ghi lại nhịp sống gia đình chân thật, không gò bó: Những nụ cười bất chợt, sự vụng về đáng yêu và nguồn năng lượng sống bất tận của trẻ thơ giữa thiên nhiên trong trẻo.',
    masters: [
      {
        name: 'Elliott Erwitt',
        period: '1928 – 2023 · Magnum Photos',
        signatureStyle: 'Witty Humanism & Candid Timing (Hài hước nhân văn & Bắt đúng thời khắc vàng)',
        description:
          'Huyền thoại của Magnum Photos với biệt tài nhìn thấy sự hài hước và ấm áp ở những góc nhìn bình dị nhất. Những bức ảnh đen trắng của ông không bao giờ cần sắp đặt mà luôn tràn đầy tiếng cười.',
        websiteUrl: 'https://www.elliotterwitt.com',
        websiteLabel: 'elliotterwitt.com',
        keyTechnique:
          'Hạ góc máy ngang tầm mắt trẻ em hoặc vật nuôi; phản xạ bấm máy cực nhanh (Run-and-gun) với dải tương phản phim mềm Ilford HP5 hoặc Tri-X.',
      },
      {
        name: 'Alain Laboile',
        period: 'Bordeaux, Pháp',
        signatureStyle: 'La Famille (Tuổi thơ hoang dã & Năng lượng sống bất tận)',
        description:
          'Nhà điêu khắc kiêm nhiếp ảnh gia tự học nổi tiếng với bộ ảnh ghi lại cuộc sống không tivi, tự do chơi đùa dưới nước và bùn đất của 6 người con. Ảnh của ông như một bản tình ca về sự tự do nguyên bản.',
        websiteUrl: 'https://www.laboile.com',
        websiteLabel: 'laboile.com',
        keyTechnique:
          'Chụp ngược sáng trực diện để ánh mặt trời xuyên qua giọt nước bắn tung tóe; tốc độ màn trập cao bắt dính hành động với ống kính tiêu cự 35mm/50mm.',
      },
    ],
    recommendedBodies: ['D750', 'Z5'],
    recommendedLenses: [
      'Tokina AT-X PRO 28-70mm f/2.8 Pro I',
      'Nikkor-S.C Auto 55mm f/1.2',
      'Carl Zeiss Flektogon 35mm f/2.4',
    ],
    recommendedRecipeIds: ['C-11', 'C-1', 'C-8', 'C-2'],
  },
  {
    id: 'pet-portraiture',
    title: 'Pet Portraiture',
    genreTag: 'Chân dung Thú cưng Nghệ thuật',
    headline: 'Biểu cảm độc bản cận cảnh & Sắc màu bùng nổ năng lượng thuần khiết',
    vibeDescription:
      'Tôn vinh thế giới cảm xúc phong phú của người bạn bốn chân: Từ những cái nghiêng đầu ngộ nghĩnh, chi tiết sợi lông vi mô sắc nét đến những pha tung mình bắt bóng tràn ngập sắc màu rực rỡ.',
    masters: [
      {
        name: 'Elke Vogelsang',
        period: 'Hildesheim, Đức · Wieselblitz',
        signatureStyle: 'Quirky Character & Micro-Detail (Biểu cảm độc đáo & Chi tiết đặc tả cận cảnh)',
        description:
          'Nhiếp ảnh gia thú cưng hàng đầu châu Âu: Nổi tiếng với góc chụp cận mặt hài hước, bắt trọn từng sợi râu, ánh mắt long lanh và khoảnh khắc lè lưỡi dí dỏm của những chú chó cứu hộ.',
        websiteUrl: 'https://elkevogelsang.com',
        websiteLabel: 'elkevogelsang.com',
        keyTechnique:
          'Sử dụng ống kính macro/tiêu cự ngắn có cự ly lấy nét cực gần (như Flektogon 35mm @ 19cm hoặc Bokina 90mm) để nhấn mạnh biểu cảm mũi to tròn vui nhộn.',
      },
      {
        name: 'Kaylee Greer',
        period: 'Boston, Mỹ · Dog Breath Photography',
        signatureStyle: 'High-Energy Vibrant Pop (Sắc màu bùng nổ & Góc thấp tràn ngập hạnh phúc)',
        description:
          'Ngôi sao nhiếp ảnh động vật với phong cách rực rỡ, tràn đầy sức sống. Ảnh của cô biến mỗi chú cún thành một siêu anh hùng vui nhộn trên nền trời xanh ngắt và hoàng hôn rực lửa.',
        websiteUrl: 'https://dogbreathphoto.com',
        websiteLabel: 'dogbreathphoto.com',
        keyTechnique:
          'Nằm sát mặt đất (bụng chạm đất), màn hình lật nghiêng, phối màu bão hòa Kodachrome rực rỡ và bắt dính chuyển động tốc độ cao.',
      },
    ],
    recommendedBodies: ['D800E', 'D750'],
    recommendedLenses: [
      'Tokina 90mm f/2.5 "Bokina" (+ Macro Tube 1:1)',
      'Carl Zeiss Flektogon 35mm f/2.4 (Focus 19cm)',
      'Tamron SP 180mm f/2.5 LD Anniversary',
    ],
    recommendedRecipeIds: ['C-5', 'C-4', 'C-10', 'C-1'],
  },
];
