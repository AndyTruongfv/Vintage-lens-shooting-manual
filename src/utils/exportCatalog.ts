import { lensesVault } from '../data/lenses';
import { recipes } from '../data/recipes';
import { cameras } from '../data/cameras';
import type { Language } from '../types';

export function generateVaultMarkdown(lang: Language = 'vi'): string {
  const vnLenses = lensesVault.filter((l) => l.base === 'Vietnam');
  const fiLenses = lensesVault.filter((l) => l.base === 'Finland');
  const isEn = lang === 'en';

  const lines: string[] = isEn
    ? [
        `# VINTAGE GLASS FIELD COMPANION — THE VAULT CATALOG (2026)`,
        `*Cross-National Optical Heritage & Field Picture Control Manual*`,
        `*Published: ${new Date().toLocaleDateString('en-US')} | Total: ${lensesVault.length} Legendary Lenses*`,
        ``,
        `---`,
        ``,
        `## 🇻🇳 PART 1: VIETNAM BASE (${vnLenses.length} LENSES)`,
        `*Signature: Ultra-fast apertures, honey warm skin tones, Asian skin portraiture and micro-contrast.*`,
        ``,
      ]
    : [
        `# VINTAGE GLASS FIELD COMPANION — THE VAULT CATALOG (2026)`,
        `*Di sản Quang học Đa quốc gia & Cẩm nang Màu Film Thực chiến*`,
        `*Ngày xuất bản: ${new Date().toLocaleDateString('vi-VN')} | Tổng số: ${lensesVault.length} ống kính huyền thoại*`,
        ``,
        `---`,
        ``,
        `## 🇻🇳 PHẦN 1: CĂN CỨ VIỆT NAM (${vnLenses.length} ỐNG KÍNH)`,
        `*Đặc trưng: Các dòng lens khẩu lớn, tone ấm mật ong, chân dung da người Châu Á và macro vi mô.*`,
        ``,
      ];

  // Vietnam lenses
  vnLenses.forEach((lens, index) => {
    const recipeNames = lens.recommendedRecipeIds
      .map((id) => {
        const r = recipes.find((item) => item.id === id);
        return r ? `[${id}] ${r.name}` : id;
      })
      .join(', ');

    const nickname = isEn ? lens.nicknameEn || lens.nickname : lens.nickname;
    const mount = isEn ? lens.mountEn || lens.mount : lens.mount;
    const features = isEn ? (lens.specialFeaturesEn || lens.specialFeatures)?.join(' · ') : lens.specialFeatures?.join(' · ');
    const history = isEn ? lens.historyEn || lens.history : lens.history;
    const strengths = isEn ? lens.strengthsEn || lens.strengths : lens.strengths;
    const milestones = isEn ? lens.goldenMilestonesEn || lens.goldenMilestones : lens.goldenMilestones;

    if (isEn) {
      lines.push(
        `### ${index + 1}. ${lens.name}`,
        `- **Nickname**: *${nickname}*`,
        `- **Mount**: \`${mount}\` | **Focal & Aperture**: \`${lens.focalLength} ${lens.maxAperture}\` | **Filter**: \`${lens.filterThread || 'N/A'}\``,
        `- **Key Highlights**: ${features || 'Genuine'}`,
        `- **History & Pedigree**: ${history}`,
        `- **Optical Strengths**: ${strengths}`,
        `- **Golden Milestones**: ${milestones}`,
        `- **Optimal Bodies**: ${lens.recommendedBodies.map((b) => `Nikon ${b}`).join(', ')}`,
        `- **Recommended Recipes**: ${recipeNames}`,
        ``
      );
    } else {
      lines.push(
        `### ${index + 1}. ${lens.name}`,
        `- **Tên thân mật**: *${nickname}*`,
        `- **Ngàm**: \`${mount}\` | **Tiêu cự & Khẩu độ**: \`${lens.focalLength} ${lens.maxAperture}\` | **Filter**: \`${lens.filterThread || 'N/A'}\``,
        `- **Đặc tính nổi bật**: ${features || 'Chính hãng'}`,
        `- **Lịch sử & Nguồn gốc**: ${history}`,
        `- **Thế mạnh quang học**: ${strengths}`,
        `- **Khoảnh khắc vàng (Golden Milestones)**: ${milestones}`,
        `- **Thân máy tối ưu**: ${lens.recommendedBodies.map((b) => `Nikon ${b}`).join(', ')}`,
        `- **Công thức màu khuyên dùng**: ${recipeNames}`,
        ``
      );
    }

    if (lens.dcFieldGuide) {
      lines.push(
        `> #### ⚡ DEFOCUS IMAGE CONTROL (DC) FIELD GUIDE:`,
        `> **1. DC Ring Operating Principle:**`,
        ...lens.dcFieldGuide.dcRingPrinciple.map((p) => `> - ${p}`),
        `>`,
        `> **2. 🎯 3 Golden Field Rules:**`,
        ...lens.dcFieldGuide.goldenRules.map(
          (r) => `> - **Step ${r.step} (${r.title})**: ${r.description}`
        ),
        `>`,
        `> **3. ✨ ${lens.dcFieldGuide.cinemaGlowTip}**`,
        ``
      );
    }
  });

  lines.push(
    `---`,
    ``,
    isEn
      ? `## 🇫🇮 PART 2: FINLAND BASE (${fiLenses.length} LENSES)\n*Signature: Low dispersion, high micro-contrast, tuned for Arctic soft light, pure snowscapes and dramatic landscapes.*`
      : `## 🇫🇮 PHẦN 2: CĂN CỨ PHẦN LAN (${fiLenses.length} ỐNG KÍNH)\n*Đặc trưng: Các dòng lens tán xạ thấp, vi tương phản cao, tối ưu ánh sáng lạnh Bắc Âu, tuyết trắng và phong cảnh hùng vĩ.*`,
    ``
  );

  // Finland lenses
  fiLenses.forEach((lens, index) => {
    const recipeNames = lens.recommendedRecipeIds
      .map((id) => {
        const r = recipes.find((item) => item.id === id);
        return r ? `[${id}] ${r.name}` : id;
      })
      .join(', ');

    const nickname = isEn ? lens.nicknameEn || lens.nickname : lens.nickname;
    const mount = isEn ? lens.mountEn || lens.mount : lens.mount;
    const features = isEn ? (lens.specialFeaturesEn || lens.specialFeatures)?.join(' · ') : lens.specialFeatures?.join(' · ');
    const history = isEn ? lens.historyEn || lens.history : lens.history;
    const strengths = isEn ? lens.strengthsEn || lens.strengths : lens.strengths;
    const milestones = isEn ? lens.goldenMilestonesEn || lens.goldenMilestones : lens.goldenMilestones;

    if (isEn) {
      lines.push(
        `### ${index + 1}. ${lens.name}`,
        `- **Nickname**: *${nickname}*`,
        `- **Mount**: \`${mount}\` | **Focal & Aperture**: \`${lens.focalLength} ${lens.maxAperture}\` | **Filter**: \`${lens.filterThread || 'N/A'}\``,
        `- **Key Highlights**: ${features || 'Genuine'}`,
        `- **History & Pedigree**: ${history}`,
        `- **Optical Strengths**: ${strengths}`,
        `- **Golden Milestones**: ${milestones}`,
        `- **Optimal Bodies**: ${lens.recommendedBodies.map((b) => `Nikon ${b}`).join(', ')}`,
        `- **Recommended Recipes**: ${recipeNames}`,
        ``
      );
    } else {
      lines.push(
        `### ${index + 1}. ${lens.name}`,
        `- **Tên thân mật**: *${nickname}*`,
        `- **Ngàm**: \`${mount}\` | **Tiêu cự & Khẩu độ**: \`${lens.focalLength} ${lens.maxAperture}\` | **Filter**: \`${lens.filterThread || 'N/A'}\``,
        `- **Đặc tính nổi bật**: ${features || 'Chính hãng'}`,
        `- **Lịch sử & Nguồn gốc**: ${history}`,
        `- **Thế mạnh quang học**: ${strengths}`,
        `- **Khoảnh khắc vàng (Golden Milestones)**: ${milestones}`,
        `- **Thân máy tối ưu**: ${lens.recommendedBodies.map((b) => `Nikon ${b}`).join(', ')}`,
        `- **Công thức màu khuyên dùng**: ${recipeNames}`,
        ``
      );
    }
  });

  // Maintenance & Tips
  lines.push(
    `---`,
    ``,
    isEn ? `## 🛠️ PART 3: VINTAGE LENS MAINTENANCE & M42 THREAD ANTI-SEIZE GUIDE` : `## 🛠️ PHẦN 3: CẨM NANG BẢO DƯỠNG LENS CỔ & CHỐNG KẸT REN M42`,
    ``,
    isEn
      ? `### 1. Proper Lubrication for M42 Threads & Adapters\n- **Standard Procedure**: Rub **dry paraffin wax** or **fine graphite powder** lightly across thread grooves. Dry application prevents binding without sticky oil residues.\n- ⚠️ **CRITICAL WARNING**: NEVER apply standard automotive grease, household silicone, or WD-40 onto mount threads! Body heat and sunlight vaporize oil droplets, creating permanent optical haze and sensor-damaging residue.`
      : `### 1. Quy tắc bôi trơn ren M42 & Ngàm chuyển\n- **Phương pháp chuẩn**: Chỉ sử dụng **sáp nến khô (paraffin wax)** hoặc **bột than chì mịn (graphite powder)** chà nhẹ lên các đường ren. Cơ chế khô giúp ren xoay êm nhẹ mà không bị dính cặn.\n- ⚠️ **CẢNH BÁO TỐI QUAN TRỌNG**: Tuyệt đối **KHÔNG** dùng mỡ bò xe máy, dầu nhớt máy may, mỡ silicone gia dụng hoặc xịt WD-40 vào ren ngàm/lens! Nhiệt độ cơ thể và ánh nắng ngoài trời sẽ làm dầu mỡ bốc hơi, ngưng tụ thành màng sương mù (haze/fungus) gây mù vĩnh viễn thấu kính và đọng màng dầu hủy hoại cảm biến máy ảnh.`,
    ``,
    isEn
      ? `### 2. Dedicated Japanese Optical Helicoid Grease\n- Always service manual focus helicoids with specialized optical grease:\n  - **Kanto Chemical (Kanto Kasei #30 / Floil Grease - Made in Japan)**\n- **Superior Qualities**: Thermal stability (-20°C to +80°C), zero evaporation, and silky-smooth focus damping.`
      : `### 2. Mỡ Helicoid quang học chuyên dụng chuẩn Nhật Bản\n- Khi bảo dưỡng cơ cấu lấy nét xoay tay (Helicoid), luôn sử dụng dòng mỡ gốc tổng hợp quang học chuyên dụng:\n  - **Kanto Chemical (Kanto Kasei #30 / Floil Grease - Made in Japan)**\n- **Ưu điểm vượt trội**: Độ nhớt quang học lý tưởng, kháng nhiệt độ cao (-20°C đến +80°C), không bay hơi, giữ cho vòng xoay lấy nét luôn đầm mượt như nhung.`,
    ``,
    `---`,
    ``,
    isEn ? `## 📷 PART 4: TACTICAL BODY DISPATCHER MATRIX` : `## 📷 PHẦN 4: MA TRẬN THÂN MÁY TÁC CHIẾN (BODY DISPATCHER)`,
    ``
  );

  cameras.forEach((cam) => {
    const subtitle = isEn ? cam.subtitleEn || cam.subtitle : cam.subtitle;
    const strengths = isEn ? cam.strengthsEn || cam.strengths : cam.strengths;
    const optimalUse = isEn ? cam.optimalUseEn || cam.optimalUse : cam.optimalUse;
    const tips = isEn ? cam.tipsEn || cam.tips : cam.tips;

    lines.push(
      `### Nikon ${cam.body} — ${subtitle}`,
      `- **Sensor**: ${cam.sensor} (${cam.releaseYear})`,
      `- **Core Strengths**: ${strengths}`,
      `- **Optimal Scenario**: ${optimalUse}`,
      `- **Recommended Lenses**: ${cam.recommendedLenses}`,
      `- **Recommended Recipes**: ${cam.recommendedProfiles}`,
      `- **Field Notes**:`,
      ...tips.map((tip) => `  - ${tip}`),
      ``
    );
  });

  lines.push(
    `---`,
    `*Generated automatically by Vintage Glass Field Companion PWA.*`
  );

  return lines.join('\n');
}

export function downloadVaultCatalog(lang: Language = 'vi'): void {
  const content = generateVaultMarkdown(lang);
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Vintage_Glass_Vault_Catalog_2026_${lang.toUpperCase()}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
