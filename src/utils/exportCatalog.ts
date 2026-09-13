import { lensesVault } from '../data/lenses';
import { recipes } from '../data/recipes';
import { cameras } from '../data/cameras';

export function generateVaultMarkdown(): string {
  const vnLenses = lensesVault.filter((l) => l.base === 'Vietnam');
  const fiLenses = lensesVault.filter((l) => l.base === 'Finland');

  const lines: string[] = [
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

    lines.push(
      `### ${index + 1}. ${lens.name}`,
      `- **Tên thân mật**: *${lens.nickname}*`,
      `- **Ngàm**: \`${lens.mount}\` | **Tiêu cự & Khẩu độ**: \`${lens.focalLength} ${lens.maxAperture}\` | **Filter**: \`${lens.filterThread || 'N/A'}\``,
      `- **Đặc tính nổi bật**: ${lens.specialFeatures?.join(' · ') || 'Chính hãng'}`,
      `- **Lịch sử & Nguồn gốc**: ${lens.history}`,
      `- **Thế mạnh quang học**: ${lens.strengths}`,
      `- **Khoảnh khắc vàng (Golden Milestones)**: ${lens.goldenMilestones}`,
      `- **Thân máy tối ưu**: ${lens.recommendedBodies.map((b) => `Nikon ${b}`).join(', ')}`,
      `- **Công thức màu khuyên dùng**: ${recipeNames}`,
      ``
    );

    if (lens.dcFieldGuide) {
      lines.push(
        `> #### ⚡ CẨM NANG VẬN HÀNH VÒNG DEFOCUS CONTROL (DC):`,
        `> **1. Bản chất vòng DC:**`,
        ...lens.dcFieldGuide.dcRingPrinciple.map((p) => `> - ${p}`),
        `>`,
        `> **2. 🎯 Quy tắc vàng 3 bước tác chiến thực địa:**`,
        ...lens.dcFieldGuide.goldenRules.map(
          (r) => `> - **Bước ${r.step} (${r.title})**: ${r.description}`
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
    `## 🇫🇮 PHẦN 2: CĂN CỨ PHẦN LAN (${fiLenses.length} ỐNG KÍNH)`,
    `*Đặc trưng: Các dòng lens tán xạ thấp, vi tương phản cao, tối ưu ánh sáng lạnh Bắc Âu, tuyết trắng và phong cảnh hùng vĩ.*`,
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

    lines.push(
      `### ${index + 1}. ${lens.name}`,
      `- **Tên thân mật**: *${lens.nickname}*`,
      `- **Ngàm**: \`${lens.mount}\` | **Tiêu cự & Khẩu độ**: \`${lens.focalLength} ${lens.maxAperture}\` | **Filter**: \`${lens.filterThread || 'N/A'}\``,
      `- **Đặc tính nổi bật**: ${lens.specialFeatures?.join(' · ') || 'Chính hãng'}`,
      `- **Lịch sử & Nguồn gốc**: ${lens.history}`,
      `- **Thế mạnh quang học**: ${lens.strengths}`,
      `- **Khoảnh khắc vàng (Golden Milestones)**: ${lens.goldenMilestones}`,
      `- **Thân máy tối ưu**: ${lens.recommendedBodies.map((b) => `Nikon ${b}`).join(', ')}`,
      `- **Công thức màu khuyên dùng**: ${recipeNames}`,
      ``
    );
  });

  // Maintenance & Tips
  lines.push(
    `---`,
    ``,
    `## 🛠️ PHẦN 3: CẨM NANG BẢO DƯỠNG LENS CỔ & CHỐNG KẸT REN M42`,
    ``,
    `### 1. Quy tắc bôi trơn ren M42 & Ngàm chuyển`,
    `- **Phương pháp chuẩn**: Chỉ sử dụng **sáp nến khô (paraffin wax)** hoặc **bột than chì mịn (graphite powder)** chà nhẹ lên các đường ren. Cơ chế khô giúp ren xoay êm nhẹ mà không bị dính cặn.`,
    `- ⚠️ **CẢNH BÁO TỐI QUAN TRỌNG**: Tuyệt đối **KHÔNG** dùng mỡ bò xe máy, dầu nhớt máy may, mỡ silicone gia dụng hoặc xịt WD-40 vào ren ngàm/lens! Nhiệt độ cơ thể và ánh nắng ngoài trời sẽ làm dầu mỡ bốc hơi, ngưng tụ thành màng sương mù (haze/fungus) gây mù vĩnh viễn thấu kính và đọng màng dầu hủy hoại cảm biến máy ảnh.`,
    ``,
    `### 2. Mỡ Helicoid quang học chuyên dụng chuẩn Nhật Bản`,
    `- Khi bảo dưỡng cơ cấu lấy nét xoay tay (Helicoid), luôn sử dụng dòng mỡ gốc tổng hợp quang học chuyên dụng:`,
    `  - **Kanto Chemical (Kanto Kasei #30 / Floil Grease - Made in Japan)**`,
    `- **Ưu điểm vượt trội**: Độ nhớt quang học lý tưởng, kháng nhiệt độ cao (-20°C đến +80°C), không bay hơi, giữ cho vòng xoay lấy nét luôn đầm mượt như nhung.`,
    ``,
    `---`,
    ``,
    `## 📷 PHẦN 4: MA TRẬN THÂN MÁY TÁC CHIẾN (BODY DISPATCHER)`,
    ``
  );

  cameras.forEach((cam) => {
    lines.push(
      `### Nikon ${cam.body} — ${cam.subtitle}`,
      `- **Cảm biến**: ${cam.sensor} (${cam.releaseYear})`,
      `- **Thế mạnh cốt lõi**: ${cam.strengths}`,
      `- **Ngữ cảnh tối ưu**: ${cam.optimalUse}`,
      `- **Lens khuyên dùng**: ${cam.recommendedLenses}`,
      `- **Công thức khuyên dùng**: ${cam.recommendedProfiles}`,
      `- **Kinh nghiệm thực địa**:`,
      ...cam.tips.map((tip) => `  - ${tip}`),
      ``
    );
  });

  // White Balance Tactical Guide Section
  lines.push(
    `---`,
    ``,
    `## 🎯 PHẦN 5: CẨM NANG CÂN BẰNG TRẮNG (WHITE BALANCE TACTICAL GUIDE) CHO NIKON D750 & D800E`,
    ``,
    `### 1. Nguyên lý Lưới Màu Tọa Độ 2D (2D Color Matrix Principle)`,
    `- **Trục hoành (Horizontal)**: Amber (\`A\` - Hổ phách/Tone Ấm) ⟷ Blue (\`B\` - Xanh lam/Tone Lạnh).`,
    `- **Trục tung (Vertical)**: Green (\`G\` - Xanh lục) ⟷ Magenta (\`M\` - Hồng tím/Tôn da người).`,
    `- **Thao tác mở trên Body Nikon**: \`MENU\` ➔ \`Shooting Menu (Menu chụp)\` ➔ \`White Balance\` ➔ Chọn chế độ WB (Daylight, Direct Sunlight, Shade...) ➔ **BẤM PHÍM MŨI TÊN PHẢI (▶)** trên cụm phím điều hướng để vào lưới tọa độ 2D.`,
    ``,
    `### 2. ⚡ 3 Giải Pháp Ghi Nhớ & Chuyển Đổi WB Thực Chiến`,
    ``,
    `#### ⚡ GIẢI PHÁP 1: QUY ƯỚC CHẾ ĐỘ CÓ SẴN (NHANH NHẤT — 1 GIÂY)`,
    `*Gán sẵn thông số bù trừ WB đặc trưng của từng lens vào các chế độ WB gốc của máy:*`,
    `- **Chế độ [Daylight]**: Gán cho **Tokina 28-70 Angénieux** (C-16) & **Minolta Rokkor** (C-1) ➔ \`Amber +2.5, Magenta +0.5\`.`,
    `- **Chế độ [Direct Sunlight]**: Gán cho **Carl Zeiss Jena 135 & 35 MC Đỏ** (C-17) ➔ \`Blue +0.5, Magenta +0.5\`.`,
    `- **Chế độ [Shade]**: Gán cho **S-M-C Takumar 50 & 55 Thorium Sunset** (C-14) ➔ \`Amber +3.5, Magenta +1.0\`.`,
    `- **Chế độ [Cloudy]**: Gán cho **Fuji 55mm f/1.8 EBC & Pastel Bắc Âu** (C-3/C-15) ➔ \`Blue +1.0, Magenta +1.5\`.`,
    `- 💡 **Thao tác siêu tốc**: Giữ nút vật lý \`WB\` bên hông máy + xoay bánh xe lệnh sau (Main Command Dial) để đổi chế độ tức thì trong 1 giây mà không cần vào Menu!`,
    ``,
    `#### ⚡ GIẢI PHÁP 2: Ô NHỚ ĐO TRẮNG PRESET CỐ ĐỊNH (PRE d-1 ĐẾN d-6)`,
    `*Sử dụng 6 ô nhớ đo trắng độc lập không bao giờ bị ghi đè:*`,
    `- **Slot d-1**: Angénieux French Cinema (\`Daylight 5200K | A+2.5, M+0.5\`)`,
    `- **Slot d-2**: Zeiss Jena Velvet 3D (\`Sunlight 5200K | B+0.5, M+0.5\`)`,
    `- **Slot d-3**: Takumar Golden Amber (\`Sunlight 5200K | A+3.5, M+0.75\`)`,
    `- **Slot d-4**: Kodak Portra 400 (\`Daylight 5500K | A+1.5, M+1.0\`)`,
    `- 💡 **Thao tác chuyển**: Giữ nút \`WB\` + xoay bánh xe sau về \`PRE\` ➔ Xoay tiếp bánh xe phụ phía trước (Sub-command dial) để chọn nhanh từ d-1 đến d-6.`,
    ``,
    `#### ⚡ GIẢI PHÁP 3: KHÓA CỨNG U1/U2 (D750) & SHOOTING MENU BANK A/B/C/D (D800E)`,
    `*Lưu trọn gói Picture Control (.NCP) + Lưới bù trừ WB + ISO an toàn vào 1 cấu hình duy nhất:*`,
    `- **Trên Nikon D750**:`,
    `  - \`U1 (Chân dung Cine Angénieux)\`: Profile Neutral + WB Daylight (A+2.5, M+0.5) + Tốc độ an toàn tối thiểu 1/125s.`,
    `  - \`U2 (Zeiss & Macro 3D)\`: Profile Standard + WB Sunlight (B+0.5, M+0.5) + ISO Auto.`,
    `  - *Cách lưu*: Menu Cài đặt (\`Setup Menu\`) ➔ \`Save user settings\` ➔ \`Save to U1 / U2\`.`,
    `- **Trên Nikon D800E**:`,
    `  - \`Shooting Menu Bank A\`: Đặt tên \`ANGENIEUX\` (Neutral + WB Daylight A+2.5, M+0.5).`,
    `  - \`Shooting Menu Bank B\`: Đặt tên \`ZEISS-3D\` (Standard + WB Sunlight B+0.5, M+0.5).`,
    `  - \`Shooting Menu Bank C\`: Đặt tên \`TAKUMAR\` (Neutral + WB Shade A+3.5, M+1.0).`,
    `  - \`Shooting Menu Bank D\`: Đặt tên \`PORTRA\` (Portrait + WB Daylight A+1.5, M+1.0).`,
    `  - ⚡ *Thao tác đổi tức thì*: Giữ nút \`SHOOT\` trên cụm 4 phím tròn nắp gù D800E + xoay bánh xe lệnh sau để đổi Bank tức thì trong lúc ngắm chụp!`,
    ``,
    `---`,
    `*Tài liệu tự động tạo bởi Vintage Glass Field Companion PWA.*`
  );

  return lines.join('\n');
}

export function downloadVaultCatalog(): void {
  const content = generateVaultMarkdown();
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Vintage_Glass_Vault_Catalog_2026.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
