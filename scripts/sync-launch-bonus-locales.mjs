/**
 * Sync launch-bonus cabinet + partners renewal copy (12 locales).
 * node scripts/sync-launch-bonus-locales.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");

const cabinetDashboard = {
  ru: {
    launchActiveTitle: "Launch bonus активен",
    launchEndedTitle: "Launch bonus завершён",
    launchActiveBody:
      "Launch bonus · до 31.12.2026: до 80% пула на первые 3 месяца оплат каждого клиента. С 4-го месяца продления: L1 20% + L2 5%. Стандарт с 01.01.2027 — на публичной странице партнёров.",
    launchEndedBody:
      "Окно launch bonus закончилось 31.12.2026. Новые продажи идут по стандартной сетке (пул 50% на месяцы 1–3; продления L1 20% + L2 5%).",
    commissionLead:
      "Launch bonus до 31.12.2026 на месяцы 1–3 клиента: L1 50% … L5 3% (пул 80%). С 4-го месяца: L1 20% + L2 5%. С 01.01.2027 месяцы 1–3: L1 35% / L2 10% / L3 5% (пул 50%). Цифры в ledger — сохранённые значения; карточка не пересчитывает доход.",
  },
  es: {
    launchActiveTitle: "Launch bonus activo",
    launchEndedTitle: "Launch bonus finalizado",
    launchActiveBody:
      "Launch bonus · hasta el 31.12.2026: hasta 80% de pool en los primeros 3 pagos mensuales de cada cliente. Desde el mes 4, renovaciones L1 20% + L2 5%. La cuadrícula estándar desde el 01.01.2027 está en la página pública de partners.",
    launchEndedBody:
      "El launch bonus terminó el 31.12.2026. Las ventas nuevas usan la cuadrícula estándar (pool 50% en meses 1–3; renovaciones L1 20% + L2 5%).",
    commissionLead:
      "Launch bonus hasta 31.12.2026 en meses 1–3 del cliente: L1 50% … L5 3% (pool 80%). Mes 4+: L1 20% + L2 5%. Desde 01.01.2027, meses 1–3: L1 35% / L2 10% / L3 5% (pool 50%). Los totales del ledger son valores guardados; esta tarjeta no recalcula sus ingresos.",
  },
  pt: {
    launchActiveTitle: "Launch bonus ativo",
    launchEndedTitle: "Launch bonus encerrado",
    launchActiveBody:
      "Launch bonus · até 31.12.2026: até 80% de pool nos primeiros 3 pagamentos mensais de cada cliente. A partir do mês 4, renovações L1 20% + L2 5%. A grelha padrão a partir de 01.01.2027 está na página pública de parceiros.",
    launchEndedBody:
      "O launch bonus terminou em 31.12.2026. Novas vendas usam a grelha padrão (pool 50% nos meses 1–3; renovações L1 20% + L2 5%).",
    commissionLead:
      "Launch bonus até 31.12.2026 nos meses 1–3 do cliente: L1 50% … L5 3% (pool 80%). Mês 4+: L1 20% + L2 5%. A partir de 01.01.2027, meses 1–3: L1 35% / L2 10% / L3 5% (pool 50%). Os totais do ledger são valores guardados; este cartão não recalcula o seu rendimento.",
  },
  de: {
    launchActiveTitle: "Launch bonus aktiv",
    launchEndedTitle: "Launch bonus beendet",
    launchActiveBody:
      "Launch bonus · bis 31.12.2026: bis zu 80 % Pool in den ersten 3 Monatszahlungen jedes Kunden. Ab Monat 4: Verlängerungen L1 20 % + L2 5 %. Standard ab 01.01.2027 auf der öffentlichen Partnerseite.",
    launchEndedBody:
      "Das Launch-bonus-Fenster endete am 31.12.2026. Neue Verkäufe nutzen den Standard (50 %-Pool in Monaten 1–3; Verlängerungen L1 20 % + L2 5 %).",
    commissionLead:
      "Launch bonus bis 31.12.2026 in Kundenmonaten 1–3: L1 50 % … L5 3 % (80 %-Pool). Ab Monat 4: L1 20 % + L2 5 %. Ab 01.01.2027 Monate 1–3: L1 35 % / L2 10 % / L3 5 % (50 %-Pool). Ledger-Werte sind gespeichert; diese Karte rechnet Ihr Einkommen nicht neu.",
  },
  fr: {
    launchActiveTitle: "Launch bonus actif",
    launchEndedTitle: "Launch bonus terminé",
    launchActiveBody:
      "Launch bonus · jusqu’au 31.12.2026 : jusqu’à 80 % de pool sur les 3 premiers paiements mensuels de chaque client. À partir du mois 4, renouvellements L1 20 % + L2 5 %. Grille standard dès le 01.01.2027 sur la page partenaires publique.",
    launchEndedBody:
      "Le launch bonus s’est terminé le 31.12.2026. Les nouvelles ventes suivent la grille standard (pool 50 % sur les mois 1–3 ; renouvellements L1 20 % + L2 5 %).",
    commissionLead:
      "Launch bonus jusqu’au 31.12.2026 sur les mois 1–3 du client : L1 50 % … L5 3 % (pool 80 %). Mois 4+ : L1 20 % + L2 5 %. Dès le 01.01.2027, mois 1–3 : L1 35 % / L2 10 % / L3 5 % (pool 50 %). Les totaux du ledger sont enregistrés ; cette carte ne recalcule pas vos gains.",
  },
  ar: {
    launchActiveTitle: "Launch bonus نشط",
    launchEndedTitle: "انتهى Launch bonus",
    launchActiveBody:
      "Launch bonus · حتى 31.12.2026: حتى 80% مجمّع على أول 3 دفعات شهرية لكل عميل. من الشهر 4، التجديدات L1 20% + L2 5%. الشبكة القياسية من 01.01.2027 على صفحة الشركاء العامة.",
    launchEndedBody:
      "انتهى Launch bonus في 31.12.2026. المبيعات الجديدة تستخدم الجدول القياسي (مجمّع 50% للأشهر 1–3؛ التجديدات L1 20% + L2 5%).",
    commissionLead:
      "Launch bonus حتى 31.12.2026 لأشهر العميل 1–3: L1 50% … L5 3% (مجمّع 80%). من الشهر 4: L1 20% + L2 5%. من 01.01.2027، الأشهر 1–3: L1 35% / L2 10% / L3 5% (مجمّع 50%). أرقام ledger محفوظة؛ هذه البطاقة لا تعيد حساب دخلك.",
  },
  zh: {
    launchActiveTitle: "Launch bonus 进行中",
    launchEndedTitle: "Launch bonus 已结束",
    launchActiveBody:
      "Launch bonus · 至 2026-12-31：每位客户前 3 个月付款最高 80% 奖金池。第 4 月起续费 L1 20% + L2 5%。2027-01-01 起的标准网格见公开合作伙伴页面。",
    launchEndedBody:
      "Launch bonus 已于 2026-12-31 结束。新销售采用标准网格（第 1–3 月 50% 池；续费 L1 20% + L2 5%）。",
    commissionLead:
      "Launch bonus 至 2026-12-31，客户第 1–3 月：L1 50% … L5 3%（80% 池）。第 4 月起：L1 20% + L2 5%。2027-01-01 起第 1–3 月：L1 35% / L2 10% / L3 5%（50% 池）。账本总额为已存数值；本卡不重新计算您的收入。",
  },
  ja: {
    launchActiveTitle: "Launch bonus 適用中",
    launchEndedTitle: "Launch bonus 終了",
    launchActiveBody:
      "Launch bonus · 2026年12月31日まで：各クライアントの最初の3か月の支払いで最大80%プール。4か月目以降の更新は L1 20% + L2 5%。2027年1月1日からの標準グリッドは公開パートナーページに記載。",
    launchEndedBody:
      "Launch bonus は 2026年12月31日に終了しました。新規売上は標準スケジュール（1–3か月目50%プール、更新 L1 20% + L2 5%）です。",
    commissionLead:
      "Launch bonus（2026年12月31日まで）のクライアント1–3か月目：L1 50% … L5 3%（80%プール）。4か月目以降：L1 20% + L2 5%。2027年1月1日から1–3か月目：L1 35% / L2 10% / L3 5%（50%プール）。ledgerの合計は保存値です。このカードは収益を再計算しません。",
  },
  id: {
    launchActiveTitle: "Launch bonus aktif",
    launchEndedTitle: "Launch bonus berakhir",
    launchActiveBody:
      "Launch bonus · hingga 31.12.2026: hingga 80% pool pada 3 pembayaran bulanan pertama setiap klien. Dari bulan ke-4, perpanjangan L1 20% + L2 5%. Kisi standar dari 01.01.2027 ada di halaman mitra publik.",
    launchEndedBody:
      "Launch bonus berakhir 31.12.2026. Penjualan baru memakai jadwal standar (pool 50% pada bulan 1–3; perpanjangan L1 20% + L2 5%).",
    commissionLead:
      "Launch bonus hingga 31.12.2026 pada bulan 1–3 klien: L1 50% … L5 3% (pool 80%). Bulan 4+: L1 20% + L2 5%. Dari 01.01.2027, bulan 1–3: L1 35% / L2 10% / L3 5% (pool 50%). Total ledger adalah nilai tersimpan; kartu ini tidak menghitung ulang pendapatan Anda.",
  },
  vi: {
    launchActiveTitle: "Launch bonus đang áp dụng",
    launchEndedTitle: "Launch bonus đã kết thúc",
    launchActiveBody:
      "Launch bonus · đến 31.12.2026: tối đa 80% quỹ cho 3 khoản thanh toán hàng tháng đầu của mỗi khách. Từ tháng 4, gia hạn L1 20% + L2 5%. Lưới chuẩn từ 01.01.2027 trên trang đối tác công khai.",
    launchEndedBody:
      "Launch bonus kết thúc 31.12.2026. Doanh số mới dùng lịch chuẩn (quỹ 50% tháng 1–3; gia hạn L1 20% + L2 5%).",
    commissionLead:
      "Launch bonus đến 31.12.2026 cho tháng 1–3 của khách: L1 50% … L5 3% (quỹ 80%). Từ tháng 4: L1 20% + L2 5%. Từ 01.01.2027, tháng 1–3: L1 35% / L2 10% / L3 5% (quỹ 50%). Tổng ledger là giá trị đã lưu; thẻ này không tính lại thu nhập của bạn.",
  },
  tr: {
    launchActiveTitle: "Launch bonus aktif",
    launchEndedTitle: "Launch bonus sona erdi",
    launchActiveBody:
      "Launch bonus · 31.12.2026’ya kadar: her müşterinin ilk 3 aylık ödemesinde en fazla %80 havuz. 4. aydan itibaren yenilemeler L1 %20 + L2 %5. 01.01.2027 itibarıyla standart tablo kamu ortak sayfasında.",
    launchEndedBody:
      "Launch bonus 31.12.2026’da bitti. Yeni satışlar standart takvimi kullanır (1–3. ay %50 havuz; yenilemeler L1 %20 + L2 %5).",
    commissionLead:
      "Launch bonus 31.12.2026’ya kadar müşteri ay 1–3: L1 %50 … L5 %3 (%80 havuz). 4. ay+: L1 %20 + L2 %5. 01.01.2027’den ay 1–3: L1 %35 / L2 %10 / L3 %5 (%50 havuz). Ledger toplamları kayıtlı değerlerdir; bu kart gelirinizi yeniden hesaplamaz.",
  },
};

const partnersRenewal = {
  es: {
    renewalExampleTitle: "La misma venta de $1.000 desde el mes 4 (renovación)",
    renewalExampleRows: [
      { label: "Partner directo L1", value: "$200", accent: true },
      { label: "L2", value: "$50" },
      { label: "Pool de partners (agregado)", value: "$250" },
      { label: "Parte retenida de AI Mark", value: "$750" },
    ],
    renewalExampleFoot: "Las renovaciones no repiten la cuadrícula launch bonus de cinco niveles.",
    faqRenewal:
      "Sí. Los meses 1–3 usan launch bonus (hasta 31.12.2026) o la cuadrícula inicial estándar desde el 01.01.2027. Desde el mes 4, renovaciones solo L1 20% + L2 5%.",
  },
  pt: {
    renewalExampleTitle: "A mesma venda de $1.000 a partir do mês 4 (renovação)",
    renewalExampleRows: [
      { label: "Parceiro direto L1", value: "$200", accent: true },
      { label: "L2", value: "$50" },
      { label: "Pool de parceiros (agregado)", value: "$250" },
      { label: "Parte retida da AI Mark", value: "$750" },
    ],
    renewalExampleFoot: "Renovações não repetem a grelha launch bonus de cinco níveis.",
    faqRenewal:
      "Sim. Meses 1–3 usam launch bonus (até 31.12.2026) ou a grelha inicial padrão a partir de 01.01.2027. A partir do mês 4, renovações apenas L1 20% + L2 5%.",
  },
  de: {
    renewalExampleTitle: "Derselbe Verkauf über $1.000 ab Monat 4 (Verlängerung)",
    renewalExampleRows: [
      { label: "L1 Direktpartner", value: "$200", accent: true },
      { label: "L2", value: "$50" },
      { label: "Partner-Pool (aggregiert)", value: "$250" },
      { label: "Einbehaltener Anteil AI Mark", value: "$750" },
    ],
    renewalExampleFoot: "Verlängerungen wiederholen nicht die volle fünfstufige Launch-bonus-Gitter.",
    faqRenewal:
      "Ja. Monate 1–3 nutzen Launch bonus (bis 31.12.2026) oder ab 01.01.2027 die Standard-Anfangsgrid. Ab Monat 4 nur L1 20 % + L2 5 %.",
  },
  fr: {
    renewalExampleTitle: "Même vente à 1 000 $ à partir du mois 4 (renouvellement)",
    renewalExampleRows: [
      { label: "Partenaire direct L1", value: "$200", accent: true },
      { label: "L2", value: "$50" },
      { label: "Pool partenaires (agrégé)", value: "$250" },
      { label: "Part retenue AI Mark", value: "$750" },
    ],
    renewalExampleFoot: "Les renouvellements ne répètent pas la grille launch bonus à cinq niveaux.",
    faqRenewal:
      "Oui. Mois 1–3 : launch bonus (jusqu’au 31.12.2026) ou grille initiale standard dès le 01.01.2027. À partir du mois 4 : L1 20 % + L2 5 % seulement.",
  },
  ar: {
    renewalExampleTitle: "نفس عملية بقيمة 1000 دولار من الشهر 4 فصاعدًا (تجديد)",
    renewalExampleRows: [
      { label: "شريك مباشر L1", value: "$200", accent: true },
      { label: "L2", value: "$50" },
      { label: "مجمّع الشركاء (تراكمي)", value: "$250" },
      { label: "حصة AI Mark المحتجزة", value: "$750" },
    ],
    renewalExampleFoot: "التجديدات لا تكرر شبكة launch bonus الكاملة ذات الخمس مستويات.",
    faqRenewal:
      "نعم. الأشهر 1–3 تستخدم launch bonus (حتى 31.12.2026) أو الشبكة الأولية القياسية من 01.01.2027. من الشهر 4: L1 20% + L2 5% فقط.",
  },
  zh: {
    renewalExampleTitle: "第 4 月起同样的 $1,000 销售（续费）",
    renewalExampleRows: [
      { label: "L1 直推合作伙伴", value: "$200", accent: true },
      { label: "L2", value: "$50" },
      { label: "合作伙伴奖金池（合计）", value: "$250" },
      { label: "AI Mark 留存份额", value: "$750" },
    ],
    renewalExampleFoot: "续费不再适用完整的五级 launch bonus 网格。",
    faqRenewal:
      "可以。第 1–3 月适用 launch bonus（至 2026-12-31）或 2027-01-01 起的标准首期网格。第 4 月起续费仅 L1 20% + L2 5%。",
  },
  ja: {
    renewalExampleTitle: "4か月目以降の同じ $1,000 売上（更新）",
    renewalExampleRows: [
      { label: "L1 直紹介パートナー", value: "$200", accent: true },
      { label: "L2", value: "$50" },
      { label: "パートナープール（合計）", value: "$250" },
      { label: "AI Mark 留保分", value: "$750" },
    ],
    renewalExampleFoot: "更新では5段階の launch bonus グリッドは適用されません。",
    faqRenewal:
      "はい。1–3か月目は launch bonus（2026年12月31日まで）または2027年1月1日からの標準初回グリッド。4か月目以降の更新は L1 20% + L2 5% のみ。",
  },
  id: {
    renewalExampleTitle: "Penjualan $1.000 yang sama dari bulan ke-4 (perpanjangan)",
    renewalExampleRows: [
      { label: "Mitra langsung L1", value: "$200", accent: true },
      { label: "L2", value: "$50" },
      { label: "Pool mitra (agregat)", value: "$250" },
      { label: "Bagian AI Mark yang ditahan", value: "$750" },
    ],
    renewalExampleFoot: "Perpanjangan tidak mengulang kisi launch bonus lima tingkat penuh.",
    faqRenewal:
      "Ya. Bulan 1–3 memakai launch bonus (hingga 31.12.2026) atau kisi awal standar dari 01.01.2027. Dari bulan ke-4, perpanjangan hanya L1 20% + L2 5%.",
  },
  vi: {
    renewalExampleTitle: "Cùng giao dịch $1.000 từ tháng thứ 4 (gia hạn)",
    renewalExampleRows: [
      { label: "Đối tác trực tiếp L1", value: "$200", accent: true },
      { label: "L2", value: "$50" },
      { label: "Quỹ đối tác (tổng hợp)", value: "$250" },
      { label: "Phần AI Mark giữ lại", value: "$750" },
    ],
    renewalExampleFoot: "Gia hạn không lặp lại lưới launch bonus đủ năm cấp.",
    faqRenewal:
      "Có. Tháng 1–3 dùng launch bonus (đến 31.12.2026) hoặc lưới chuẩn từ 01.01.2027. Từ tháng 4, gia hạn chỉ L1 20% + L2 5%.",
  },
  tr: {
    renewalExampleTitle: "4. aydan itibaren aynı 1.000 $ satış (yenileme)",
    renewalExampleRows: [
      { label: "L1 doğrudan ortak", value: "$200", accent: true },
      { label: "L2", value: "$50" },
      { label: "Ortak havuzu (toplam)", value: "$250" },
      { label: "AI Mark tutulan payı", value: "$750" },
    ],
    renewalExampleFoot: "Yenilemeler beş kademeli launch bonus tablosunu tekrarlamaz.",
    faqRenewal:
      "Evet. Ay 1–3 launch bonus (31.12.2026’ya kadar) veya 01.01.2027’den standart başlangıç tablosu. 4. aydan itibaren yenilemeler yalnızca L1 %20 + L2 %5.",
  },
};

function patchCabinetLocale(loc) {
  const t = cabinetDashboard[loc];
  if (!t) return;
  const path = join(root, `content/cabinet/locales/${loc}.ts`);
  let text = readFileSync(path, "utf8");
  text = text.replace(
    /"launchActiveTitle": "[^"]*"/,
    `"launchActiveTitle": "${t.launchActiveTitle}"`,
  );
  text = text.replace(
    /"launchEndedTitle": "[^"]*"/,
    `"launchEndedTitle": "${t.launchEndedTitle}"`,
  );
  text = text.replace(
    /"launchActiveBody": "[^"]*"/,
    `"launchActiveBody": "${t.launchActiveBody.replace(/"/g, '\\"')}"`,
  );
  text = text.replace(
    /"launchEndedBody": "[^"]*"/,
    `"launchEndedBody": "${t.launchEndedBody.replace(/"/g, '\\"')}"`,
  );
  text = text.replace(
    /"lead": "[^"]*80%[^"]*"\s*,\s*\n\s*"levels":/,
    `"lead": "${t.commissionLead.replace(/"/g, '\\"')}",\n    "levels":`,
  );
  writeFileSync(path, text);
  console.log("cabinet", loc);
}

function formatRows(rows) {
  return rows
    .map(
      (r) =>
        `    { label: "${r.label}", value: "${r.value}"${r.accent ? ", accent: true" : ""} },`,
    )
    .join("\n");
}

function patchPartnersLocale(loc) {
  const t = partnersRenewal[loc];
  if (!t) return;
  const path = join(root, `content/partners/${loc}.ts`);
  let text = readFileSync(path, "utf8");
  const block = `  renewalExampleTitle: "${t.renewalExampleTitle}",
  renewalExampleRows: [
${formatRows(t.renewalExampleRows)}
  ],
  renewalExampleFoot: "${t.renewalExampleFoot}",`;
  text = text.replace(
    /  renewalExampleTitle:[\s\S]*?renewalExampleFoot: "[^"]*",/,
    block,
  );
  // FAQ subscription - match last faq item before ctaEyebrow
  text = text.replace(
    /\{ q: "[^"]*subscription[^"]*"|{ q: "[^"]*подписк[^"]*"|{ q: "[^"]*suscripción[^"]*"|{ q: "[^"]*Abonnement[^"]*"|{ q: "[^"]*اشتراك[^"]*"|{ q: "[^"]*订阅[^"]*"|{ q: "[^"]*langganan[^"]*"|{ q: "[^"]*thuê bao[^"]*"|{ q: "[^"]*Abonelik[^"]*"/gi,
    (m) => m,
  );
  const faqPatterns = [
    /a: "[^"]*90[^"]*" \}/,
    /a: "Ja\.[^"]*90[^"]*" \}/,
    /a: "Sí\.[^"]*90[^"]*" \}/,
    /a: "Sim\.[^"]*90[^"]*" \}/,
    /a: "Oui\.[^"]*90[^"]*" \}/,
    /a: "نعم\.[^"]*90[^"]*" \}/,
    /a: "可以\.[^"]*90[^"]*" \}/,
    /a: "はい\.[^"]*90[^"]*" \}/,
    /a: "Ya\.[^"]*90[^"]*" \}/,
    /a: "Có\.[^"]*90[^"]*" \}/,
    /a: "Evet\.[^"]*90[^"]*" \}/,
  ];
  for (const p of faqPatterns) {
    if (p.test(text)) {
      text = text.replace(p, `a: "${t.faqRenewal}" }`);
      break;
    }
  }
  writeFileSync(path, text);
  console.log("partners", loc);
}

for (const loc of Object.keys(cabinetDashboard)) patchCabinetLocale(loc);
for (const loc of Object.keys(partnersRenewal)) patchPartnersLocale(loc);

// partner-program ja/zh recurring
const ppPath = join(root, "content/partner-program.ts");
let pp = readFileSync(ppPath, "utf8");
pp = pp.replace(
  /前 90 天不改变这些比例。/,
  "第 1–3 月适用 launch bonus 或 2027-01-01 起的标准网格；第 4 月起续费仅 L1 20% + L2 5%。",
);
pp = pp.replace(
  /最初の 90 日は率を変えません。/,
  "1–3か月目は launch bonus または 2027年1月1日からの標準グリッド。4か月目以降の更新は L1 20% + L2 5% のみ。",
);
writeFileSync(ppPath, pp);

// generate-cabinet-locales source
const genPath = join(root, "scripts/generate-cabinet-locales.mjs");
let gen = readFileSync(genPath, "utf8");
gen = gen.replace(
  /launchActiveTitle: "Статус launch-периода",[\s\S]*?launchEndedBody:[\s\S]*?pул сети 80%\.`/,
  `launchActiveTitle: "Launch bonus активен",
      launchEndedTitle: "Launch bonus завершён",
      launchActiveBody:
        "Launch bonus · до 31.12.2026: до 80% пула на первые 3 месяца оплат каждого клиента. С 4-го месяца: L1 20% + L2 5%.",
      launchEndedBody:
        "Launch bonus завершился 31.12.2026. Новые продажи — стандартная сетка (50% на месяцы 1–3; продления L1 20% + L2 5%)."`,
);
writeFileSync(genPath, gen);

console.log("done");
