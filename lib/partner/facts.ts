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

/**
 * Limits taken from the public product pages. Not sales objections invented
 * for the partner programme.
 */
export const PARTNER_PRODUCT_LIMITS: Record<
  PartnerProductId,
  { en: string[]; ru: string[] }
> = {
  aime: {
    en: [
      "Not a post scheduler. AIME runs a marketing cycle up to human approval.",
      "Content goes live only after human approval in Telegram, unless a later approved auto-publish path is in use.",
      "TikTok posting is not available today. Current publish path is Instagram, Facebook, and Threads.",
      "AIME will not publish pricing, financial commitments, legal terms, or discounts without explicit human sign-off.",
    ],
    ru: [
      "Не планировщик постов. AIME ведёт маркетинговый цикл до апрува человека.",
      "Публикация только после апрува в Telegram, пока не включён согласованный автопаблиш.",
      "Публикация в TikTok сегодня недоступна. Сейчас Instagram, Facebook и Threads.",
      "AIME не публикует цены, финансовые обещания, юридические условия и скидки без явного апрува человека.",
    ],
  },
  assistant: {
    en: [
      "The assistant answers and qualifies. It does not calculate a commercial proposal — that is SHOWROOM AI.",
      "It answers from the customer's knowledge base. If a price or item is not documented, it says so instead of inventing one.",
      "WhatsApp, Instagram, and Messenger need a verified Meta Business account.",
    ],
    ru: [
      "Ассистент отвечает и квалифицирует. Коммерческое предложение считает SHOWROOM AI.",
      "Отвечает по базе знаний клиента. Если цены или позиции нет в базе, он это говорит и не выдумывает.",
      "WhatsApp, Instagram и Messenger требуют верифицированный Meta Business аккаунт.",
    ],
  },
  showroom: {
    en: [
      "Not a support chatbot. SHOWROOM AI is for selection, pricing rules, and a commercial proposal.",
      "The price is not made up in the conversation. Calculation follows the formulas the customer set.",
      "That is not a promise that the customer's own rules are flawless.",
    ],
    ru: [
      "Не чат поддержки. SHOWROOM AI — подбор, правила цены и коммерческое предложение.",
      "Цена не считается «из воздуха». Расчёт идёт по формулам, которые задал клиент.",
      "Это не обещание, что в правилах клиента нет ошибки.",
    ],
  },
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
