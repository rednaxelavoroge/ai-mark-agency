/**
 * Partner Hub facts that do not invent commercial claims.
 *
 * This module is imported by unit tests through a relative path, so it stays
 * free of other application imports (those use `@/` aliases Node cannot
 * resolve). Copy is either a published public-site sentence or a statement
 * about what this repository actually ships.
 */

export type PartnerProductId = "aime" | "assistant" | "showroom";

/** Approved PNG lockup and link-preview art that actually exist under /public. */
export const PARTNER_BRAND_ASSET_NAMES = {
  "lockup": {
    "en": "AI MARK lockup (PNG)",
    "ru": "Логотип AI MARK (PNG)",
    "es": "Logotipo AI MARK (PNG)",
    "pt": "Logótipo AI MARK (PNG)",
    "de": "AI MARK-Lockup (PNG)",
    "fr": "Lockup AI MARK (PNG)",
    "ja": "AI MARK ロゴ (PNG)",
    "tr": "AI MARK logosu (PNG)",
    "ar": "شعار AI MARK (PNG)",
    "zh": "AI MARK 标识 (PNG)",
    "id": "Logo AI MARK (PNG)",
    "vi": "Logo AI MARK (PNG)"
  },
  "compact": {
    "en": "Compact lockup (PNG)",
    "ru": "Компактный логотип (PNG)",
    "es": "Logotipo compacto (PNG)",
    "pt": "Logótipo compacto (PNG)",
    "de": "Kompaktes Lockup (PNG)",
    "fr": "Lockup compact (PNG)",
    "ja": "コンパクトロゴ (PNG)",
    "tr": "Kompakt logo (PNG)",
    "ar": "شعار مدمج (PNG)",
    "zh": "紧凑标识 (PNG)",
    "id": "Logo ringkas (PNG)",
    "vi": "Logo gọn (PNG)"
  },
  "mark": {
    "en": "AM mark (PNG)",
    "ru": "Знак AM (PNG)",
    "es": "Marca AM (PNG)",
    "pt": "Marca AM (PNG)",
    "de": "AM-Zeichen (PNG)",
    "fr": "Signe AM (PNG)",
    "ja": "AMマーク (PNG)",
    "tr": "AM işareti (PNG)",
    "ar": "رمز AM (PNG)",
    "zh": "AM 标记 (PNG)",
    "id": "Tanda AM (PNG)",
    "vi": "Dấu AM (PNG)"
  },
  "og-en": {
    "en": "Link preview (EN, 1200×630)",
    "ru": "Превью ссылки (EN, 1200×630)",
    "es": "Vista previa del enlace (EN, 1200×630)",
    "pt": "Pré-visualização do link (EN, 1200×630)",
    "de": "Link-Vorschau (EN, 1200×630)",
    "fr": "Aperçu de lien (EN, 1200×630)",
    "ja": "リンクプレビュー (EN, 1200×630)",
    "tr": "Link önizlemesi (EN, 1200×630)",
    "ar": "معاينة الرابط (EN, 1200×630)",
    "zh": "链接预览 (EN, 1200×630)",
    "id": "Pratinjau tautan (EN, 1200×630)",
    "vi": "Xem trước liên kết (EN, 1200×630)"
  },
  "og-ru": {
    "en": "Link preview (RU, 1200×630)",
    "ru": "Превью ссылки (RU, 1200×630)",
    "es": "Vista previa del enlace (RU, 1200×630)",
    "pt": "Pré-visualização do link (RU, 1200×630)",
    "de": "Link-Vorschau (RU, 1200×630)",
    "fr": "Aperçu de lien (RU, 1200×630)",
    "ja": "リンクプレビュー (RU, 1200×630)",
    "tr": "Link önizlemesi (RU, 1200×630)",
    "ar": "معاينة الرابط (RU, 1200×630)",
    "zh": "链接预览 (RU, 1200×630)",
    "id": "Pratinjau tautan (RU, 1200×630)",
    "vi": "Xem trước liên kết (RU, 1200×630)"
  }
} as const;

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
  const key = locale as keyof typeof names;
  if (key in names) return names[key];
  return names.en;
}

/**
 * Limits taken from the public product pages. Not sales objections invented
 * for the partner programme.
 */
export type PartnerProductLimitsByLocale = Record<
  (typeof PARTNER_BRAND_ASSET_NAMES)["lockup"] extends Record<infer L, string> ? L : never,
  string[]
>;

export const PARTNER_PRODUCT_LIMITS: Record<PartnerProductId, PartnerProductLimitsByLocale> =
  {
  "aime": {
    "en": [
      "Not a post scheduler. AIME runs a marketing cycle up to human approval.",
      "Content goes live only after human approval in Telegram, unless a later approved auto-publish path is in use.",
      "AIME publishes to Instagram, Facebook, Threads, and Telegram approval.",
      "AIME will not publish pricing, financial commitments, legal terms, or discounts without explicit human sign-off."
    ],
    "es": [
      "Not a post scheduler. AIME runs a marketing cycle up to human approval.",
      "Content goes live only after human approval in Telegram, unless a later approved auto-publish path is in use.",
      "AIME publishes to Instagram, Facebook, Threads, and Telegram approval.",
      "AIME will not publish pricing, financial commitments, legal terms, or discounts without explicit human sign-off."
    ],
    "pt": [
      "Not a post scheduler. AIME runs a marketing cycle up to human approval.",
      "Content goes live only after human approval in Telegram, unless a later approved auto-publish path is in use.",
      "AIME publishes to Instagram, Facebook, Threads, and Telegram approval.",
      "AIME will not publish pricing, financial commitments, legal terms, or discounts without explicit human sign-off."
    ],
    "ru": [
      "Не планировщик постов. AIME ведёт маркетинговый цикл до апрува человека.",
      "Публикация только после апрува в Telegram, пока не включён согласованный автопаблиш.",
      "AIME публикует в Instagram, Facebook, Threads и через апрув в Telegram.",
      "AIME не публикует цены, финансовые обещания, юридические условия и скидки без явного апрува человека."
    ],
    "ar": [
      "Not a post scheduler. AIME runs a marketing cycle up to human approval.",
      "Content goes live only after human approval in Telegram, unless a later approved auto-publish path is in use.",
      "AIME publishes to Instagram, Facebook, Threads, and Telegram approval.",
      "AIME will not publish pricing, financial commitments, legal terms, or discounts without explicit human sign-off."
    ],
    "zh": [
      "Not a post scheduler. AIME runs a marketing cycle up to human approval.",
      "Content goes live only after human approval in Telegram, unless a later approved auto-publish path is in use.",
      "AIME publishes to Instagram, Facebook, Threads, and Telegram approval.",
      "AIME will not publish pricing, financial commitments, legal terms, or discounts without explicit human sign-off."
    ],
    "id": [
      "Not a post scheduler. AIME runs a marketing cycle up to human approval.",
      "Content goes live only after human approval in Telegram, unless a later approved auto-publish path is in use.",
      "AIME publishes to Instagram, Facebook, Threads, and Telegram approval.",
      "AIME will not publish pricing, financial commitments, legal terms, or discounts without explicit human sign-off."
    ],
    "vi": [
      "Not a post scheduler. AIME runs a marketing cycle up to human approval.",
      "Content goes live only after human approval in Telegram, unless a later approved auto-publish path is in use.",
      "AIME publishes to Instagram, Facebook, Threads, and Telegram approval.",
      "AIME will not publish pricing, financial commitments, legal terms, or discounts without explicit human sign-off."
    ],
    "de": [
      "Not a post scheduler. AIME runs a marketing cycle up to human approval.",
      "Content goes live only after human approval in Telegram, unless a later approved auto-publish path is in use.",
      "AIME publishes to Instagram, Facebook, Threads, and Telegram approval.",
      "AIME will not publish pricing, financial commitments, legal terms, or discounts without explicit human sign-off."
    ],
    "fr": [
      "Not a post scheduler. AIME runs a marketing cycle up to human approval.",
      "Content goes live only after human approval in Telegram, unless a later approved auto-publish path is in use.",
      "AIME publishes to Instagram, Facebook, Threads, and Telegram approval.",
      "AIME will not publish pricing, financial commitments, legal terms, or discounts without explicit human sign-off."
    ],
    "ja": [
      "Not a post scheduler. AIME runs a marketing cycle up to human approval.",
      "Content goes live only after human approval in Telegram, unless a later approved auto-publish path is in use.",
      "AIME publishes to Instagram, Facebook, Threads, and Telegram approval.",
      "AIME will not publish pricing, financial commitments, legal terms, or discounts without explicit human sign-off."
    ],
    "tr": [
      "Not a post scheduler. AIME runs a marketing cycle up to human approval.",
      "Content goes live only after human approval in Telegram, unless a later approved auto-publish path is in use.",
      "AIME publishes to Instagram, Facebook, Threads, and Telegram approval.",
      "AIME will not publish pricing, financial commitments, legal terms, or discounts without explicit human sign-off."
    ]
  },
  "assistant": {
    "en": [
      "The assistant answers and qualifies. It does not calculate a commercial proposal — that is SHOWROOM AI.",
      "It answers from the customer's knowledge base. If a price or item is not documented, it says so instead of inventing one.",
      "WhatsApp, Instagram, and Messenger need a verified Meta Business account."
    ],
    "es": [
      "The assistant answers and qualifies. It does not calculate a commercial proposal — that is SHOWROOM AI.",
      "It answers from the customer's knowledge base. If a price or item is not documented, it says so instead of inventing one.",
      "WhatsApp, Instagram, and Messenger need a verified Meta Business account."
    ],
    "pt": [
      "The assistant answers and qualifies. It does not calculate a commercial proposal — that is SHOWROOM AI.",
      "It answers from the customer's knowledge base. If a price or item is not documented, it says so instead of inventing one.",
      "WhatsApp, Instagram, and Messenger need a verified Meta Business account."
    ],
    "ru": [
      "Ассистент отвечает и квалифицирует. Коммерческое предложение считает SHOWROOM AI.",
      "Отвечает по базе знаний клиента. Если цены или позиции нет в базе, он это говорит и не выдумывает.",
      "WhatsApp, Instagram и Messenger требуют верифицированный Meta Business аккаунт."
    ],
    "ar": [
      "The assistant answers and qualifies. It does not calculate a commercial proposal — that is SHOWROOM AI.",
      "It answers from the customer's knowledge base. If a price or item is not documented, it says so instead of inventing one.",
      "WhatsApp, Instagram, and Messenger need a verified Meta Business account."
    ],
    "zh": [
      "The assistant answers and qualifies. It does not calculate a commercial proposal — that is SHOWROOM AI.",
      "It answers from the customer's knowledge base. If a price or item is not documented, it says so instead of inventing one.",
      "WhatsApp, Instagram, and Messenger need a verified Meta Business account."
    ],
    "id": [
      "The assistant answers and qualifies. It does not calculate a commercial proposal — that is SHOWROOM AI.",
      "It answers from the customer's knowledge base. If a price or item is not documented, it says so instead of inventing one.",
      "WhatsApp, Instagram, and Messenger need a verified Meta Business account."
    ],
    "vi": [
      "The assistant answers and qualifies. It does not calculate a commercial proposal — that is SHOWROOM AI.",
      "It answers from the customer's knowledge base. If a price or item is not documented, it says so instead of inventing one.",
      "WhatsApp, Instagram, and Messenger need a verified Meta Business account."
    ],
    "de": [
      "The assistant answers and qualifies. It does not calculate a commercial proposal — that is SHOWROOM AI.",
      "It answers from the customer's knowledge base. If a price or item is not documented, it says so instead of inventing one.",
      "WhatsApp, Instagram, and Messenger need a verified Meta Business account."
    ],
    "fr": [
      "The assistant answers and qualifies. It does not calculate a commercial proposal — that is SHOWROOM AI.",
      "It answers from the customer's knowledge base. If a price or item is not documented, it says so instead of inventing one.",
      "WhatsApp, Instagram, and Messenger need a verified Meta Business account."
    ],
    "ja": [
      "The assistant answers and qualifies. It does not calculate a commercial proposal — that is SHOWROOM AI.",
      "It answers from the customer's knowledge base. If a price or item is not documented, it says so instead of inventing one.",
      "WhatsApp, Instagram, and Messenger need a verified Meta Business account."
    ],
    "tr": [
      "The assistant answers and qualifies. It does not calculate a commercial proposal — that is SHOWROOM AI.",
      "It answers from the customer's knowledge base. If a price or item is not documented, it says so instead of inventing one.",
      "WhatsApp, Instagram, and Messenger need a verified Meta Business account."
    ]
  },
  "showroom": {
    "en": [
      "Not a support chatbot. SHOWROOM AI is for selection, pricing rules, and a commercial proposal.",
      "The price is not made up in the conversation. Calculation follows the formulas the customer set.",
      "That is not a promise that the customer's own rules are flawless."
    ],
    "es": [
      "Not a support chatbot. SHOWROOM AI is for selection, pricing rules, and a commercial proposal.",
      "The price is not made up in the conversation. Calculation follows the formulas the customer set.",
      "That is not a promise that the customer's own rules are flawless."
    ],
    "pt": [
      "Not a support chatbot. SHOWROOM AI is for selection, pricing rules, and a commercial proposal.",
      "The price is not made up in the conversation. Calculation follows the formulas the customer set.",
      "That is not a promise that the customer's own rules are flawless."
    ],
    "ru": [
      "Не чат поддержки. SHOWROOM AI — подбор, правила цены и коммерческое предложение.",
      "Цена не считается «из воздуха». Расчёт идёт по формулам, которые задал клиент.",
      "Это не обещание, что в правилах клиента нет ошибки."
    ],
    "ar": [
      "Not a support chatbot. SHOWROOM AI is for selection, pricing rules, and a commercial proposal.",
      "The price is not made up in the conversation. Calculation follows the formulas the customer set.",
      "That is not a promise that the customer's own rules are flawless."
    ],
    "zh": [
      "Not a support chatbot. SHOWROOM AI is for selection, pricing rules, and a commercial proposal.",
      "The price is not made up in the conversation. Calculation follows the formulas the customer set.",
      "That is not a promise that the customer's own rules are flawless."
    ],
    "id": [
      "Not a support chatbot. SHOWROOM AI is for selection, pricing rules, and a commercial proposal.",
      "The price is not made up in the conversation. Calculation follows the formulas the customer set.",
      "That is not a promise that the customer's own rules are flawless."
    ],
    "vi": [
      "Not a support chatbot. SHOWROOM AI is for selection, pricing rules, and a commercial proposal.",
      "The price is not made up in the conversation. Calculation follows the formulas the customer set.",
      "That is not a promise that the customer's own rules are flawless."
    ],
    "de": [
      "Not a support chatbot. SHOWROOM AI is for selection, pricing rules, and a commercial proposal.",
      "The price is not made up in the conversation. Calculation follows the formulas the customer set.",
      "That is not a promise that the customer's own rules are flawless."
    ],
    "fr": [
      "Not a support chatbot. SHOWROOM AI is for selection, pricing rules, and a commercial proposal.",
      "The price is not made up in the conversation. Calculation follows the formulas the customer set.",
      "That is not a promise that the customer's own rules are flawless."
    ],
    "ja": [
      "Not a support chatbot. SHOWROOM AI is for selection, pricing rules, and a commercial proposal.",
      "The price is not made up in the conversation. Calculation follows the formulas the customer set.",
      "That is not a promise that the customer's own rules are flawless."
    ],
    "tr": [
      "Not a support chatbot. SHOWROOM AI is for selection, pricing rules, and a commercial proposal.",
      "The price is not made up in the conversation. Calculation follows the formulas the customer set.",
      "That is not a promise that the customer's own rules are flawless."
    ]
  }
};

/** What a partner can actually show a customer today. */
export const PARTNER_DEMO_CHANNELS: Record<
  PartnerProductId,
  { page: `/${string}`; liveChat: boolean; panelDemo: boolean }
> = {
  aime: { page: "/ai-marketing-employee", liveChat: false, panelDemo: false },
  assistant: {
    page: "/ai-business-assistant",
    liveChat: true,
    panelDemo: true,
  },
  showroom: { page: "/showroom-ai", liveChat: false, panelDemo: false },
};

export function partnerHubLocale(locale: string): "en" | "ru" {
  return locale === "ru" ? "ru" : "en";
}
