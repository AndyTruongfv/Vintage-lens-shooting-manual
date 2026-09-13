import type { Recipe } from '../types';

export interface RecipeNcpMeta {
  filename: string;
  slotName: string;
  lensDescriptor: string;
  tacticalMission: string;
  recommendedLenses: string;
  wbSummary: string;
}

export const recipeNcpMetaMap: Record<string, RecipeNcpMeta> = {
  'C-1': {
    filename: 'C01ROKOR.NCP',
    slotName: 'ROKKOR-WRM',
    lensDescriptor: 'Minolta Rokkor',
    tacticalMission: 'Chuyên trị chân dung hoài niệm thập niên 70, ngược nắng hoàng hôn Golden Hour, tone da ấm mật ong Châu Á.',
    recommendedLenses: 'Tokina 28-70 Angénieux, Minolta 50mm f/1.7 Rokkor, S-M-C Takumar 50mm f/1.4',
    wbSummary: 'Auto 1 (Keep Atmosphere) hoặc Daylight (5200K) | Amber +1.25, Magenta +0.75',
  },
  'C-2': {
    filename: 'C02PORTR.NCP',
    slotName: 'PORTRA-400',
    lensDescriptor: 'Kodak Portra',
    tacticalMission: 'Chân dung ngoại cảnh êm dịu, tiệc cưới điện ảnh, ảnh gia đình với sắc pastel mượt mà chuẩn phim Portra 400.',
    recommendedLenses: 'Nikon 105mm f/2.5 AI-S, Nikon AF DC 135mm f/2.0D, Nikon AF 85mm f/1.8D',
    wbSummary: 'Daylight (5200K - 5500K) | Amber +1.5, Magenta +1.0',
  },
  'C-3': {
    filename: 'C03FUJIH.NCP',
    slotName: 'FUJI-400H',
    lensDescriptor: 'Fuji Pro 400H',
    tacticalMission: 'Ngoại cảnh Bắc Âu, tone xanh pastel mát dịu, da trắng hồng trong trẻo, phong cảnh rừng thông tuyết.',
    recommendedLenses: 'Fujinon 55mm f/1.8 EBC, Samyang 35mm f/1.4 UMC, Tamron SP 180mm f/2.5 LD',
    wbSummary: 'Daylight (5000K) | Amber -0.5 (Blue +0.5), Magenta +1.5',
  },
  'C-4': {
    filename: 'C04KODA6.NCP',
    slotName: 'KODACHR-64',
    lensDescriptor: 'Kodachrome 64',
    tacticalMission: 'Tư liệu phóng sự National Geographic, màu đỏ và vàng no dày rực rỡ, độ tương phản kinh điển 1985.',
    recommendedLenses: 'Nikon 105mm f/2.5 AI-S (Steve McCurry), Carl Zeiss Sonnar 135mm f/3.5 MC, Nikon 35-70mm f/3.5',
    wbSummary: 'Direct Sunlight (5200K) | Amber +0.75, Magenta +0.25',
  },
  'C-5': {
    filename: 'C05BOKIN.NCP',
    slotName: 'BOKINA-3D',
    lensDescriptor: 'Bokina 90 Macro',
    tacticalMission: 'Tĩnh vật macro vi mô, hoa dại, côn trùng, tinh thể tuyết Bắc Âu với độ nổi khối 3D tách lớp siêu thực.',
    recommendedLenses: 'Tamron SP 90mm Macro (52B/127E), Tokina AT-X AF 90mm Macro, Micro-Nikkor AF 55mm f/2.8 CRC',
    wbSummary: 'Auto 0 (White Priority) hoặc Flash/Daylight (5400K) | Amber 0, Magenta 0',
  },
  'C-6': {
    filename: 'C06NOCTG.NCP',
    slotName: 'NOCT-GLOW',
    lensDescriptor: 'Nikkor 55 f/1.2 Glow',
    tacticalMission: 'Street photography nghệ thuật qua khung cửa kính ướt mưa, phản chiếu bóng đêm, dải màu điện ảnh ấm nồng.',
    recommendedLenses: 'S-M-C Takumar 50mm f/1.4 (Thorium), Nikkor-S.C Auto 55mm f/1.2, Komuranon 135mm f/2.5',
    wbSummary: 'Cloudy / Shade (6500K - 7000K) | Amber +2.0, Magenta +0.5',
  },
  'C-7': {
    filename: 'C07NORDT.NCP',
    slotName: 'NORDIC-TEL',
    lensDescriptor: 'Nordic Tele Velvet',
    tacticalMission: 'Ảnh dạo phố mùa thu lá vàng, hoài cổ thập niên 80-90, chuyển vùng bóng tối matte film êm ái.',
    recommendedLenses: 'Nikon AF 70-210mm f/4 Beercan, Tamron SP 135mm f/2.5 (03B), Tamron 80-210mm 103A',
    wbSummary: 'Auto 1 | Amber +1.75, Magenta +0.5',
  },
  'C-8': {
    filename: 'C08TRI40.NCP',
    slotName: 'TRI-X-400',
    lensDescriptor: 'Kodak Tri-X 400',
    tacticalMission: 'Đen trắng đường phố tương phản cao, hình học ánh sáng & bóng đổ sâu thẳm theo phong cách bậc thầy Fan Ho.',
    recommendedLenses: 'S-M-C Takumar 55mm f/1.8, Nikon AF 85mm f/1.8D, Carl Zeiss Flektogon 35mm f/2.4 MC',
    wbSummary: 'Bất kỳ (Monochrome không phụ thuộc WB) | Khuyên dùng Auto',
  },
  'C-9': {
    filename: 'C09LEICA.NCP',
    slotName: 'LEICA-MONO',
    lensDescriptor: 'Leica Monochrom',
    tacticalMission: 'Phong cách tối giản Bắc Âu, tranh sơn dầu low-key, chân dung Rembrandt ánh sáng tự nhiên từ một bên cửa sổ.',
    recommendedLenses: 'Nikkor-Q 135mm f/2.8 Non-AI, Nikon 105mm f/2.5 AI-S, Carl Zeiss Sonnar 135mm f/3.5',
    wbSummary: 'Daylight / Auto 1 | Amber +0.5, Magenta +0.5',
  },
  'C-10': {
    filename: 'C10ACROS.NCP',
    slotName: 'ACROS-100',
    lensDescriptor: 'Fuji Neopan Acros',
    tacticalMission: 'Đen trắng chi tiết vi mô cực nét, hạt mịn tàng hình, chuyển tông mượt mà cho phong cảnh tuyết và điêu khắc.',
    recommendedLenses: 'Micro-Nikkor AF 55mm f/2.8 CRC, Tokina AT-X AF 90mm Macro, Samyang 35mm f/1.4 UMC',
    wbSummary: 'Bất kỳ (Monochrome) | Khuyên dùng Daylight để đo sáng ổn định',
  },
  'C-11': {
    filename: 'C11ILFHP.NCP',
    slotName: 'ILFORD-HP5',
    lensDescriptor: 'Ilford HP5 Plus',
    tacticalMission: 'Phóng sự đường phố cổ điển, tương phản mạnh mẽ, dải trung tính giàu cảm xúc theo phong cách Magnum Photos.',
    recommendedLenses: 'Nikon AF 50mm f/1.4D, Minolta MD 50mm f/1.7 Rokkor, Nikon AF 80-200mm f/2.8 ED',
    wbSummary: 'Bất kỳ (Monochrome)',
  },
  'C-12': {
    filename: 'C12HLWDB.NCP',
    slotName: 'HOLLYWOOD',
    lensDescriptor: 'Hollywood Glamour',
    tacticalMission: 'Chân dung nghệ thuật Hollywood cổ điển, hào quang highlight mơ màng, da người mịn mượt quý phái.',
    recommendedLenses: 'Nikon AF DC 135mm f/2.0D (DC Ring R4/R5.6), Sigma 50mm f/1.4 EX DG, Nikkor-S.C 55mm f/1.2',
    wbSummary: 'Incandescent (Đèn tròn) hoặc Auto 1 | Amber +1.0, Magenta +0.75',
  },
  'C-13': {
    filename: 'C13AGFAS.NCP',
    slotName: 'AGFA-SCALA',
    lensDescriptor: 'Agfa Scala B&W',
    tacticalMission: 'Giả lập phim đảo chiều đen trắng slide Agfa Scala: độ tương phản kịch tính, chi tiết bóng tối sắc gọn.',
    recommendedLenses: 'Nikkor-S.C 55mm f/1.2, Tamron SP 180mm f/2.5 LD, Micro-Nikkor 55mm f/2.8',
    wbSummary: 'Direct Sunlight / Auto (Monochrome)',
  },
  'C-14': {
    filename: 'C14GLDAM.NCP',
    slotName: 'GOLD-AMBER',
    lensDescriptor: 'Takumar Thorium',
    tacticalMission: 'Tận dụng chất kính Thorium và giờ vàng hoàng hôn, tone ấm mật ong hoài niệm, da người mịn màng ấm áp.',
    recommendedLenses: 'S-M-C Takumar 50/1.4, Takumar 55/1.8, Tokina 28-70 Angénieux, Nikkor-Q 135/2.8',
    wbSummary: 'Direct Sunlight (5200K) | Amber +3.5, Magenta +0.75',
  },
  'C-15': {
    filename: 'C15BUB3D.NCP',
    slotName: 'BUBBLE-3D',
    lensDescriptor: 'Bubble Bokeh / Fuji EBC',
    tacticalMission: 'Săn bokeh bong bóng viền sắc, tôn màu xanh lá EBC trong trẻo và độ nổi khối 3D đanh thép, hoa cỏ & macro.',
    recommendedLenses: 'Fujinon 55/1.8 EBC, Carl Zeiss Flektogon 35/2.4 1Q, Nikkor-S.C 55/1.2, Bokina 90 Macro',
    wbSummary: 'Auto 1 | Amber -1.0 (Blue +1.0), Magenta +0.5',
  },
  'C-16': {
    filename: 'C16ANGEN.NCP',
    slotName: 'ANGENIEUX',
    lensDescriptor: 'Tokina Angénieux',
    tacticalMission: 'Tôn vinh dải chuyển tông êm như lụa, tương phản mềm mại và tone da ấm đằm chất điện ảnh Pháp của công thức quang học Angénieux.',
    recommendedLenses: 'Tokina AT-X PRO 28-70mm f/2.8 Đời 1 (Angénieux formula)',
    wbSummary: 'Daylight (5200K) | Amber +2.5, Magenta +0.5',
  },
  'C-17': {
    filename: 'C17ZEISS.NCP',
    slotName: 'ZEISS-3D',
    lensDescriptor: 'Carl Zeiss Jena',
    tacticalMission: 'Khai phóng độ no màu căng mọng tách bạch, vi tương phản micro-contrast và độ nổi khối 3D đanh thép của lớp coat đa tầng MC chữ đỏ.',
    recommendedLenses: 'Carl Zeiss Jena Sonnar 135mm f/3.5 MC (Chữ đỏ), Carl Zeiss Jena Flektogon 35mm f/2.4 MC 1Q',
    wbSummary: 'Direct Sunlight (5200K) | Blue +0.5 (A-0.5), Magenta +0.5',
  },
};

export function getRecipeNcpMeta(recipe: Recipe): RecipeNcpMeta {
  if (recipeNcpMetaMap[recipe.id]) {
    return recipeNcpMetaMap[recipe.id];
  }
  const cleanId = recipe.id.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  return {
    filename: `${cleanId}.NCP`,
    slotName: recipe.name.substring(0, 10).toUpperCase(),
    lensDescriptor: recipe.name.split('(')[0].trim(),
    tacticalMission: recipe.scenario,
    recommendedLenses: recipe.lensMatch,
    wbSummary: `${recipe.wb.base} | Amber ${recipe.wb.amber}, Magenta ${recipe.wb.magenta}`,
  };
}

/**
 * Generate binary buffer for Nikon Picture Control (.NCP)
 * Follows Nikon PICCON structure with valid header and parameter payload.
 */
export function generateNcpBinary(recipe: Recipe): Uint8Array {
  const meta = getRecipeNcpMeta(recipe);
  const buffer = new Uint8Array(576); // Standard Nikon NCP file size (576 bytes)
  
  // Magic Header: "NIKON PICTURE CONTROL FILE\0"
  const header = 'NIKON PICTURE CONTROL FILE';
  for (let i = 0; i < header.length; i++) {
    buffer[i] = header.charCodeAt(i);
  }

  // Version marker at offset 0x20
  buffer[0x20] = 0x02; // Version 2.0 / 3.0 compatible
  buffer[0x21] = 0x00;

  // Slot Name (Max 10 chars ASCII) at offset 0x30
  const slotName = meta.slotName.padEnd(10, ' ').substring(0, 10);
  for (let i = 0; i < 10; i++) {
    buffer[0x30 + i] = slotName.charCodeAt(i);
  }

  // Base Picture Control mapping at offset 0x40
  // 1 = Standard, 2 = Neutral, 3 = Vivid, 4 = Monochrome, 5 = Portrait, 6 = Landscape, 7 = Flat
  const baseLower = recipe.baseProfile.toLowerCase();
  let baseId = 2; // Default Neutral
  if (baseLower.includes('monochrome') || recipe.category === 'Street/B&W') baseId = 4;
  else if (baseLower.includes('portrait')) baseId = 5;
  else if (baseLower.includes('landscape')) baseId = 6;
  else if (baseLower.includes('vivid')) baseId = 3;
  else if (baseLower.includes('flat')) baseId = 7;
  else if (baseLower.includes('standard')) baseId = 1;
  buffer[0x40] = baseId;

  // Parameters mapping
  const parseVal = (val?: string) => {
    if (!val) return 0;
    const num = parseFloat(val);
    return isNaN(num) ? 0 : Math.round(num * 2); // Internal scale factor
  };

  buffer[0x44] = (parseVal(recipe.parameters.sharpening) + 128) & 0xff;
  buffer[0x45] = (parseVal(recipe.parameters.contrast) + 128) & 0xff;
  buffer[0x46] = (parseVal(recipe.parameters.highlights) + 128) & 0xff;
  buffer[0x47] = (parseVal(recipe.parameters.shadows) + 128) & 0xff;
  buffer[0x48] = (parseVal(recipe.parameters.saturation) + 128) & 0xff;
  buffer[0x49] = (parseVal(recipe.parameters.hue) + 128) & 0xff;
  buffer[0x4a] = (parseVal(recipe.parameters.clarity) + 128) & 0xff;
  buffer[0x4b] = (parseVal(recipe.parameters.midSharpening) + 128) & 0xff;

  // Checksum calculation at footer
  let checksum = 0;
  for (let i = 0; i < 574; i++) {
    checksum = (checksum + buffer[i]) & 0xffff;
  }
  buffer[574] = checksum & 0xff;
  buffer[575] = (checksum >> 8) & 0xff;

  return buffer;
}

/**
 * Trigger immediate single .NCP file download in browser
 */
export function downloadSingleNcpFile(recipe: Recipe): void {
  const meta = getRecipeNcpMeta(recipe);
  const binaryData = generateNcpBinary(recipe);
  const blob = new Blob([binaryData], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = meta.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
