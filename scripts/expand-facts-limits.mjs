/**
 * Expands PARTNER_PRODUCT_LIMITS and brand asset names to all locales.
 */
import { writeFileSync, readFileSync } from "node:fs";

const LOCALES = ["en", "es", "pt", "ru", "ar", "zh", "id", "vi", "de", "fr", "ja", "tr"];

const LIMITS_EN = {
  aime: [
    "Not a post scheduler. AIME runs a marketing cycle up to human approval.",
    "Content goes live only after human approval in Telegram, unless a later approved auto-publish path is in use.",
    "AIME publishes to Instagram, Facebook, Threads, and Telegram approval.",
    "AIME will not publish pricing, financial commitments, legal terms, or discounts without explicit human sign-off.",
  ],
  assistant: [
    "The assistant answers and qualifies. It does not calculate a commercial proposal — that is SHOWROOM AI.",
    "It answers from the customer's knowledge base. If a price or item is not documented, it says so instead of inventing one.",
    "WhatsApp, Instagram, and Messenger need a verified Meta Business account.",
  ],
  showroom: [
    "Not a support chatbot. SHOWROOM AI is for selection, pricing rules, and a commercial proposal.",
    "The price is not made up in the conversation. Calculation follows the formulas the customer set.",
    "That is not a promise that the customer's own rules are flawless.",
  ],
};

const LIMITS_RU = {
  aime: [
    "Не планировщик постов. AIME ведёт маркетинговый цикл до апрува человека.",
    "Публикация только после апрува в Telegram, пока не включён согласованный автопаблиш.",
    "AIME публикует в Instagram, Facebook, Threads и через апрув в Telegram.",
    "AIME не публикует цены, финансовые обещания, юридические условия и скидки без явного апрува человека.",
  ],
  assistant: [
    "Ассистент отвечает и квалифицирует. Коммерческое предложение считает SHOWROOM AI.",
    "Отвечает по базе знаний клиента. Если цены или позиции нет в базе, он это говорит и не выдумывает.",
    "WhatsApp, Instagram и Messenger требуют верифицированный Meta Business аккаунт.",
  ],
  showroom: [
    "Не чат поддержки. SHOWROOM AI — подбор, правила цены и коммерческое предложение.",
    "Цена не считается «из воздуха». Расчёт идёт по формулам, которые задал клиент.",
    "Это не обещание, что в правилах клиента нет ошибки.",
  ],
};

const ASSET_NAMES = {
  lockup: {
    en: "AI MARK lockup (PNG)",
    ru: "Логотип AI MARK (PNG)",
    es: "Logotipo AI MARK (PNG)",
    pt: "Logótipo AI MARK (PNG)",
    de: "AI MARK-Lockup (PNG)",
    fr: "Lockup AI MARK (PNG)",
    ja: "AI MARK ロゴ (PNG)",
    tr: "AI MARK logosu (PNG)",
    ar: "شعار AI MARK (PNG)",
    zh: "AI MARK 标识 (PNG)",
    id: "Logo AI MARK (PNG)",
    vi: "Logo AI MARK (PNG)",
  },
  compact: {
    en: "Compact lockup (PNG)",
    ru: "Компактный логотип (PNG)",
    es: "Logotipo compacto (PNG)",
    pt: "Logótipo compacto (PNG)",
    de: "Kompaktes Lockup (PNG)",
    fr: "Lockup compact (PNG)",
    ja: "コンパクトロゴ (PNG)",
    tr: "Kompakt logo (PNG)",
    ar: "شعار مدمج (PNG)",
    zh: "紧凑标识 (PNG)",
    id: "Logo ringkas (PNG)",
    vi: "Logo gọn (PNG)",
  },
  mark: {
    en: "AM mark (PNG)",
    ru: "Знак AM (PNG)",
    es: "Marca AM (PNG)",
    pt: "Marca AM (PNG)",
    de: "AM-Zeichen (PNG)",
    fr: "Signe AM (PNG)",
    ja: "AMマーク (PNG)",
    tr: "AM işareti (PNG)",
    ar: "رمز AM (PNG)",
    zh: "AM 标记 (PNG)",
    id: "Tanda AM (PNG)",
    vi: "Dấu AM (PNG)",
  },
  "og-en": {
    en: "Link preview (EN, 1200×630)",
    ru: "Превью ссылки (EN, 1200×630)",
    es: "Vista previa del enlace (EN, 1200×630)",
    pt: "Pré-visualização do link (EN, 1200×630)",
    de: "Link-Vorschau (EN, 1200×630)",
    fr: "Aperçu de lien (EN, 1200×630)",
    ja: "リンクプレビュー (EN, 1200×630)",
    tr: "Link önizlemesi (EN, 1200×630)",
    ar: "معاينة الرابط (EN, 1200×630)",
    zh: "链接预览 (EN, 1200×630)",
    id: "Pratinjau tautan (EN, 1200×630)",
    vi: "Xem trước liên kết (EN, 1200×630)",
  },
  "og-ru": {
    en: "Link preview (RU, 1200×630)",
    ru: "Превью ссылки (RU, 1200×630)",
    es: "Vista previa del enlace (RU, 1200×630)",
    pt: "Pré-visualização do link (RU, 1200×630)",
    de: "Link-Vorschau (RU, 1200×630)",
    fr: "Aperçu de lien (RU, 1200×630)",
    ja: "リンクプレビュー (RU, 1200×630)",
    tr: "Link önizlemesi (RU, 1200×630)",
    ar: "معاينة الرابط (RU, 1200×630)",
    zh: "链接预览 (RU, 1200×630)",
    id: "Pratinjau tautan (RU, 1200×630)",
    vi: "Xem trước liên kết (RU, 1200×630)",
  },
};

const limitsOut = {};
for (const product of Object.keys(LIMITS_EN)) {
  limitsOut[product] = {};
  for (const loc of LOCALES) {
    if (loc === "en") limitsOut[product][loc] = LIMITS_EN[product];
    else if (loc === "ru") limitsOut[product][loc] = LIMITS_RU[product];
    else limitsOut[product][loc] = LIMITS_EN[product];
  }
}

const factsPath = new URL("../lib/partner/facts.ts", import.meta.url);
let facts = readFileSync(factsPath, "utf8");

const assetsBlock = `/** Approved PNG lockup and link-preview art that actually exist under /public. */
export const PARTNER_BRAND_ASSETS = [
  {
    id: "lockup",
    href: "/brand/ai-mark-logo.png",
    kind: "brand",
    nameEn: "AI MARK lockup (PNG)",
    nameRu: "Логотип AI MARK (PNG)",
  },
  {
    id: "compact",
    href: "/brand/ai-mark-logo-compact.png",
    kind: "brand",
    nameEn: "Compact lockup (PNG)",
    nameRu: "Компактный логотип (PNG)",
  },
  {
    id: "mark",
    href: "/brand/ai-mark-mark.png",
    kind: "brand",
    nameEn: "AM mark (PNG)",
    nameRu: "Знак AM (PNG)",
  },
  {
    id: "og-en",
    href: "/og/ai-mark-preview-en.jpg",
    kind: "preview",
    nameEn: "Link preview (EN, 1200×630)",
    nameRu: "Превью ссылки (EN, 1200×630)",
  },
  {
    id: "og-ru",
    href: "/og/ai-mark-preview-ru.jpg",
    kind: "preview",
    nameEn: "Link preview (RU, 1200×630)",
    nameRu: "Превью ссылки (RU, 1200×630)",
  },
] as const;`;

const newAssets = `/** Approved PNG lockup and link-preview art that actually exist under /public. */
export const PARTNER_BRAND_ASSET_NAMES = ${JSON.stringify(ASSET_NAMES, null, 2)} as const;

export const PARTNER_BRAND_ASSETS = [
  {
    id: "lockup",
    href: "/brand/ai-mark-logo.png",
    kind: "brand",
    nameEn: "AI MARK lockup (PNG)",
    nameRu: "Логотип AI MARK (PNG)",
  },
  {
    id: "compact",
    href: "/brand/ai-mark-logo-compact.png",
    kind: "brand",
    nameEn: "Compact lockup (PNG)",
    nameRu: "Компактный логотип (PNG)",
  },
  {
    id: "mark",
    href: "/brand/ai-mark-mark.png",
    kind: "brand",
    nameEn: "AM mark (PNG)",
    nameRu: "Знак AM (PNG)",
  },
  {
    id: "og-en",
    href: "/og/ai-mark-preview-en.jpg",
    kind: "preview",
    nameEn: "Link preview (EN, 1200×630)",
    nameRu: "Превью ссылки (EN, 1200×630)",
  },
  {
    id: "og-ru",
    href: "/og/ai-mark-preview-ru.jpg",
    kind: "preview",
    nameEn: "Link preview (RU, 1200×630)",
    nameRu: "Превью ссылки (RU, 1200×630)",
  },
] as const;

export type PartnerBrandAssetId = (typeof PARTNER_BRAND_ASSETS)[number]["id"];

/** Localized download label for a published brand asset. */
export function partnerBrandAssetName(locale: string, id: PartnerBrandAssetId): string {
  const names = PARTNER_BRAND_ASSET_NAMES[id];
  if (!names) return id;
  if (locale in names) return names[locale];
  return names.en;
}`;

facts = facts.replace(assetsBlock, newAssets);

facts = facts.replace(
  /export const PARTNER_PRODUCT_LIMITS: Record<[\s\S]*?\n};/,
  `export type PartnerProductLimitsByLocale = Record<
  (typeof PARTNER_BRAND_ASSET_NAMES)["lockup"] extends Record<infer L, string> ? L : never,
  string[]
>;

export const PARTNER_PRODUCT_LIMITS: Record<PartnerProductId, PartnerProductLimitsByLocale> =
  ${JSON.stringify(limitsOut, null, 2)};`,
);

writeFileSync(factsPath, facts);
console.log("Updated lib/partner/facts.ts");
