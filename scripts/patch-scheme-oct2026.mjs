/**
 * One-off patch: partner scheme 2026-10-01 (first payment vs renewal).
 *   node scripts/patch-scheme-oct2026.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");

function patchFile(rel, replacers) {
  const path = join(root, rel);
  let text = readFileSync(path, "utf8");
  let changed = false;
  for (const [from, to] of replacers) {
    if (text.includes(from)) {
      text = text.split(from).join(to);
      changed = true;
    }
  }
  if (changed) writeFileSync(path, text);
  return changed;
}

const cabinetLeads = {
  ru:
    "Launch bonus до 31.12.2026 на первый платёж клиента: L1 50% … L5 3% (пул 80%). Со 2-го платежа: L1 20% + L2 5%. С 01.01.2027 первый платёж: L1 35% / L2 8% / L3 4% / L4 2% / L5 1% (пул 50%). Цифры в ledger — сохранённые значения; карточка не пересчитывает доход.",
  es:
    "Launch bonus hasta 31.12.2026 en el primer pago del cliente: L1 50% … L5 3% (pool 80%). Desde el 2.º pago: L1 20% + L2 5%. Desde 01.01.2027, primer pago: L1 35% / L2 8% / L3 4% / L4 2% / L5 1% (pool 50%). Los totales del ledger son valores guardados; esta tarjeta no recalcula sus ingresos.",
  pt:
    "Launch bonus até 31.12.2026 no primeiro pagamento do cliente: L1 50% … L5 3% (pool 80%). A partir do 2.º pagamento: L1 20% + L2 5%. A partir de 01.01.2027, primeiro pagamento: L1 35% / L2 8% / L3 4% / L4 2% / L5 1% (pool 50%). Os totais do ledger são valores guardados; este cartão não recalcula o seu rendimento.",
  de:
    "Launch bonus bis 31.12.2026 beim ersten Zahlungseingang des Kunden: L1 50 % … L5 3 % (80 %-Pool). Ab der 2. Zahlung: L1 20 % + L2 5 %. Ab 01.01.2027 erster Zahlungseingang: L1 35 % / L2 8 % / L3 4 % / L4 2 % / L5 1 % (50 %-Pool). Ledger-Werte sind gespeichert; diese Karte rechnet Ihr Einkommen nicht neu.",
  fr:
    "Launch bonus jusqu’au 31.12.2026 sur le premier paiement du client : L1 50 % … L5 3 % (pool 80 %). À partir du 2e paiement : L1 20 % + L2 5 %. Dès le 01.01.2027, premier paiement : L1 35 % / L2 8 % / L3 4 % / L4 2 % / L5 1 % (pool 50 %). Les totaux du ledger sont enregistrés ; cette carte ne recalcule pas vos gains.",
  ar:
    "Launch bonus حتى 31.12.2026 على أول دفعة للعميل: L1 50% … L5 3% (مجمّع 80%). من الدفعة الثانية: L1 20% + L2 5%. من 01.01.2027، أول دفعة: L1 35% / L2 8% / L3 4% / L4 2% / L5 1% (مجمّع 50%). أرقام ledger محفوظة؛ هذه البطاقة لا تعيد حساب دخلك.",
  zh:
    "Launch bonus 至 2026-12-31，客户首次付款：L1 50% … L5 3%（80% 池）。第 2 笔付款起：L1 20% + L2 5%。2027-01-01 起首次付款：L1 35% / L2 8% / L3 4% / L4 2% / L5 1%（50% 池）。账本总额为已存数值；本卡不重新计算您的收入。",
  ja:
    "Launch bonus（2026年12月31日まで）のクライアント初回支払い：L1 50% … L5 3%（80%プール）。2回目以降：L1 20% + L2 5%。2027年1月1日から初回支払い：L1 35% / L2 8% / L3 4% / L4 2% / L5 1%（50%プール）。ledgerの合計は保存値です。このカードは収益を再計算しません。",
  id:
    "Launch bonus hingga 31.12.2026 pada pembayaran pertama klien: L1 50% … L5 3% (pool 80%). Dari pembayaran ke-2: L1 20% + L2 5%. Dari 01.01.2027, pembayaran pertama: L1 35% / L2 8% / L3 4% / L4 2% / L5 1% (pool 50%). Total ledger adalah nilai tersimpan; kartu ini tidak menghitung ulang pendapatan Anda.",
  vi:
    "Launch bonus đến 31.12.2026 cho khoản thanh toán đầu của khách: L1 50% … L5 3% (quỹ 80%). Từ khoản thứ 2: L1 20% + L2 5%. Từ 01.01.2027, khoản đầu: L1 35% / L2 8% / L3 4% / L4 2% / L5 1% (quỹ 50%). Tổng ledger là giá trị đã lưu; thẻ này không tính lại thu nhập của bạn.",
  tr:
    "Launch bonus 31.12.2026’ya kadar müşterinin ilk ödemesinde: L1 %50 … L5 %3 (%80 havuz). 2. ödemeden itibaren: L1 %20 + L2 %5. 01.01.2027’den itibaren ilk ödeme: L1 %35 / L2 %8 / L3 %4 / L4 %2 / L5 %1 (%50 havuz). Ledger toplamları kayıtlı değerlerdir; bu kart kazancınızı yeniden hesaplamaz.",
};

const oldCabinetLead =
  /"lead": "[^"]*Launch bonus[^"]*",/g;

for (const file of readdirSync(join(root, "content/cabinet/locales"))) {
  if (!file.endsWith(".ts")) continue;
  const locale = file.replace(/\.ts$/, "");
  const lead = cabinetLeads[locale];
  if (!lead) continue;
  const rel = `content/cabinet/locales/${file}`;
  const path = join(root, rel);
  let text = readFileSync(path, "utf8");
  const next = text.replace(
    oldCabinetLead,
    `"lead": "${lead}",`,
  );
  if (next !== text) writeFileSync(path, next);
}

const globalReplacers = [
  [
    "From 01.01.2027 the standard grid applies to months 1–3: L1 35%, L2 10%, L3 5% (50% pool). Renewals stay L1 20% + L2 5%.",
    "From 01.01.2027 the standard grid applies to the client's first payment: L1 35%, L2 8%, L3 4%, L4 2%, L5 1% (50% pool on all five levels). From the 2nd payment onward, renewals stay L1 20% + L2 5%.",
  ],
  [
    "Launch bonus · until 31.12.2026 applies to each client's first three monthly payments only, not every renewal forever.",
    "Launch bonus · until 31.12.2026 applies to each client's first qualifying payment only, not renewals.",
  ],
  [
    "Same $1,000 sale from month 4 onward (renewal): L1 $200, L2 $50 — pool $250, retained $750.",
    "Same $1,000 renewal payment (from the 2nd payment onward): L1 $200, L2 $50 — pool $250, retained $750.",
  ],
  [
    "Month 4+ renewals use L1 20% + L2 5% only.",
    "From the 2nd payment onward, renewals use L1 20% + L2 5% only.",
  ],
];

patchFile("content/partner-program.ts", globalReplacers);

const cabinetLaunch = {
  ru: {
    launchActiveBody:
      "Launch bonus · до 31.12.2026: до 80% пула на первый платёж каждого клиента. Со 2-го платежа продления: L1 20% + L2 5%. Стандарт с 01.01.2027 — на публичной странице партнёров.",
    launchEndedBody:
      "Окно launch bonus закончилось 31.12.2026. Новые продажи идут по стандартной сетке (пул 50% на первый платёж; продления L1 20% + L2 5%).",
  },
};

for (const [loc, bodies] of Object.entries(cabinetLaunch)) {
  const path = join(root, `content/cabinet/locales/${loc}.ts`);
  let text = readFileSync(path, "utf8");
  text = text.replace(
    /"launchActiveBody": "[^"]*"/,
    `"launchActiveBody": "${bodies.launchActiveBody.replace(/"/g, '\\"')}"`,
  );
  text = text.replace(
    /"launchEndedBody": "[^"]*"/,
    `"launchEndedBody": "${bodies.launchEndedBody.replace(/"/g, '\\"')}"`,
  );
  writeFileSync(path, text);
}

const launchEndedReplacers = [
  ["meses 1–3", "primer pago"],
  ["nos meses 1–3", "no primeiro pagamento"],
  ["in Monaten 1–3", "beim ersten Zahlungseingang"],
  ["les mois 1–3", "le premier paiement"],
  ["للأشهر 1–3", "على أول دفعة"],
  ["第 1–3 月", "首次付款"],
  ["1–3か月目", "初回支払い"],
  ["bulan 1–3", "pembayaran pertama"],
  ["tháng 1–3", "khoản thanh toán đầu"],
  ["1–3. ay", "ilk ödeme"],
  ["на месяцы 1–3", "на первый платёж"],
];

for (const file of readdirSync(join(root, "content/cabinet/locales"))) {
  if (!file.endsWith(".ts")) continue;
  const path = join(root, `content/cabinet/locales/${file}`);
  let text = readFileSync(path, "utf8");
  for (const [from, to] of launchEndedReplacers) {
    if (text.includes(from)) text = text.split(from).join(to);
  }
  text = text.replace(/Mes 4\+/g, "2.º pago");
  text = text.replace(/Mês 4\+/g, "2.º pagamento");
  text = text.replace(/Ab Monat 4/g, "Ab der 2. Zahlung");
  text = text.replace(/mois 4/gi, "2e paiement");
  text = text.replace(/من الشهر 4/g, "من الدفعة الثانية");
  text = text.replace(/第 4 月起/g, "第 2 笔付款起");
  text = text.replace(/4か月目以降/g, "2回目以降");
  text = text.replace(/Bulan 4\+/g, "pembayaran ke-2");
  text = text.replace(/Từ tháng 4/g, "Từ khoản thứ 2");
  text = text.replace(/4\. ay/g, "2. ödeme");
  text = text.replace(/С 4-го месяца/g, "Со 2-го платежа");
  writeFileSync(path, text);
}

const partnerFaqA = {
  es: "Sí. El primer pago usa launch bonus (hasta 31.12.2026) o la cuadrícula inicial estándar desde el 01.01.2027. Desde el 2.º pago, renovaciones solo L1 20% + L2 5%.",
  pt: "Sim. O primeiro pagamento usa launch bonus (até 31.12.2026) ou a grelha inicial padrão a partir de 01.01.2027. A partir do 2.º pagamento, renovações apenas L1 20% + L2 5%.",
  de: "Ja. Die erste Zahlung nutzt Launch bonus (bis 31.12.2026) oder ab 01.01.2027 die Standard-Erstgrid. Ab der 2. Zahlung nur L1 20 % + L2 5 %.",
  fr: "Oui. Le premier paiement : launch bonus (jusqu’au 31.12.2026) ou grille initiale standard dès le 01.01.2027. À partir du 2e paiement : L1 20 % + L2 5 % seulement.",
  ar: "نعم. أول دفعة: launch bonus (حتى 31.12.2026) أو الشبكة الأولية القياسية من 01.01.2027. من الدفعة الثانية: L1 20% + L2 5% فقط.",
  zh: "可以。首次付款适用 launch bonus（至 2026-12-31）或 2027-01-01 起的标准首期网格。第 2 笔付款起续费仅 L1 20% + L2 5%。",
  ja: "はい。初回支払いは launch bonus（2026年12月31日まで）または2027年1月1日からの標準初回グリッド。2回目以降の更新は L1 20% + L2 5% のみ。",
  id: "Ya. Pembayaran pertama memakai launch bonus (hingga 31.12.2026) atau kisi awal standar dari 01.01.2027. Dari pembayaran ke-2, perpanjangan hanya L1 20% + L2 5%.",
  vi: "Có. Khoản thanh toán đầu dùng launch bonus (đến 31.12.2026) hoặc lưới chuẩn từ 01.01.2027. Từ khoản thứ 2, gia hạn chỉ L1 20% + L2 5%.",
  tr: "Evet. İlk ödeme launch bonus (31.12.2026’ya kadar) veya 01.01.2027’den standart başlangıç tablosu. 2. ödemeden itibaren yenilemeler yalnızca L1 %20 + L2 %5.",
};

for (const [loc, answer] of Object.entries(partnerFaqA)) {
  const path = join(root, `content/partners/${loc}.ts`);
  let text = readFileSync(path, "utf8");
  text = text.replace(
    /a: "[^"]*launch bonus[^"]*" \}/i,
    `a: "${answer}" }`,
  );
  text = text.replace(/ab Monat 4 \(Verlängerung\)/, "bei Verlängerung (ab 2. Zahlung)");
  text = text.replace(/desde el mes 4 \(renovación\)/i, "en renovación (desde el 2.º pago)");
  text = text.replace(/a partir do mês 4 \(renovação\)/i, "na renovação (a partir do 2.º pagamento)");
  writeFileSync(path, text);
}

patchFile("content/partner-program.ts", [
  [
    "每一笔合格付款，包括续费，都使用同一套比例：L1 50% / L2 15% / L3 7% / L4 5% / L5 3%，合格层级汇总池为 80%。第 1–3 月适用 launch bonus 或 2027-01-01 起的标准网格；第 4 月起续费仅 L1 20% + L2 5%。",
    "订阅可产生持续佣金。首次付款适用 launch bonus 或 2027-01-01 起的标准首期网格（L1 35% / L2 8% / L3 4% / L4 2% / L5 1%）。第 2 笔付款起续费仅 L1 20% + L2 5%。",
  ],
  [
    "更新を含む適格な支払いは同じ表です。L1 50% / L2 15% / L3 7% / L4 5% / L5 3%、適格レベル全体の合算プールは 80% です。1–3か月目は launch bonus または 2027年1月1日からの標準グリッド。4か月目以降の更新は L1 20% + L2 5% のみ。",
    "サブスクリプションは継続報酬になります。初回支払いは launch bonus または 2027年1月1日からの標準初回グリッド（L1 35% / L2 8% / L3 4% / L4 2% / L5 1%）。2回目以降の更新は L1 20% + L2 5% のみ。",
  ],
]);

patchFile("scripts/generate-cabinet-locales.mjs", [
  [
    "Launch bonus до 31.12.2026 (месяцы 1–3): L1 50% … L5 3%, пул 80%. С 4-го месяца: L1 20% + L2 5%. С 01.01.2027 месяцы 1–3: L1 35% / L2 10% / L3 5%.",
    "Launch bonus до 31.12.2026 (первый платёж): L1 50% … L5 3%, пул 80%. Со 2-го платежа: L1 20% + L2 5%. С 01.01.2027 первый платёж: L1 35% / L2 8% / L3 4% / L4 2% / L5 1%.",
  ],
  [
    "до 80% пула на первые 3 месяца оплат каждого клиента. С 4-го месяца",
    "до 80% пула на первый платёж каждого клиента. Со 2-го платежа",
  ],
  [
    "50% на месяцы 1–3",
    "50% на первый платёж",
  ],
]);

console.log("patch-scheme-oct2026: cabinet locales + partner-program globals");
