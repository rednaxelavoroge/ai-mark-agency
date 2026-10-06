import type { Locale } from "@/lib/site";
import type { ShowroomPlanId, ShowroomRoleId } from "@/lib/showroom-ai";

/**
 * Showroom AI brand copy — RU + EN, everything else falls back to EN.
 *
 * This is the same fallback the product-page bundles use
 * (`content/products/{showroom,aime,assistant}.ts`): the two full-copy locales
 * sit here and `getShowroomAiCopy()` returns EN for every other locale, so a
 * new brand block never needs 12 hand-written translations.
 *
 * Amounts are deliberately absent: plan cards render the list and USDT/USDC
 * prices from `lib/showroom-ai.ts`, which reads the published catalog. The
 * setup fee and trial length come from constants there for the same reason —
 * `heroSetupNote` carries a `{fee}` placeholder that the component fills from
 * `SHOWROOM_AI_SETUP_FEE_USD`.
 */

export interface ShowroomAiRoleCopy {
  id: ShowroomRoleId;
  name: string;
  title: string;
  desc: string;
  /**
   * The full capability set of the role. For the Marketer this is the owner's
   * complete list (research → strategy → content → design → approval →
   * publishing → analytics), not a summary.
   */
  capabilities: string[];
  /** One line naming the trades the role is configured for. Seller only. */
  industries?: string;
  /** One-line "several specialists in one" claim. Marketer only. */
  combo?: string;
  cta: string;
}

export interface ShowroomAiPlanCopy {
  id: ShowroomPlanId;
  name: string;
  rolesLabel: string;
  desc: string;
  features: string[];
}

export interface ShowroomAiCopy {
  brand: string;
  /** Developer credit shown next to the product brand. */
  developerCredit: string;
  /** Footer of every Showroom page. */
  poweredBy: string;
  kicker: string;
  /** Main message: «не просто ответит, а продаст». */
  mantra: string;
  mantraLead: string;
  /* First screen: the Seller role */
  heroKicker: string;
  /** Contains `{days}`, replaced with the trial length constant. */
  heroTrialNote: string;
  /** Contains `{fee}`, replaced with the published setup fee. */
  heroSetupNote: string;
  /* Linkage block: two large cards, one small */
  linkageTitle: string;
  linkageSub: string;
  /* Roles inside the brand */
  roles: ShowroomAiRoleCopy[];
  /* Bundles */
  plansTitle: string;
  plansSub: string;
  plans: ShowroomAiPlanCopy[];
  featuredLabel: string;
  /** Chip on the Marketer card in the linkage block. */
  pairBadge: string;
  /** Emphasis chip on the bundles that pair the Seller with the Marketer. */
  pairPlanBadge: string;
  perMonth: string;
  cryptoLabel: string;
  payCta: string;
  includedTitle: string;
  includedPoints: string[];
  /* Roles bought on their own */
  separateTitle: string;
  separateSub: string;
  separate: { id: string; label: string; sub: string }[];
  /* Setup, trial, positioning */
  setupTitle: string;
  setupSub: string;
  setupFreeLabel: string;
  setupFreeBody: string;
  setupPaidLabel: string;
  setupPaidBody: string;
  trialTitle: string;
  trialBody: string;
  /* No site yet — the developer builds one */
  websiteCtaLabel: string;
  websiteCtaHint: string;
  positioningTitle: string;
  positioningBody: string;
  positioningPoints: string[];
  /* Live demo chat on the site */
  demoCta: string;
  demoHint: string;
  demoInitialMessage: string;
  /* Role pages */
  roleBannerLabel: string;
  /* Home product card: `cardPricePrefix` + catalog amount + `perMonth`, so the
     card cannot publish a number the checkout does not charge. */
  cardPricePrefix: string;
}

const showroomAiEn: ShowroomAiCopy = {
  brand: "Showroom AI",
  developerCredit: "by AI MARK",
  poweredBy: "Powered by AI MARK",
  kicker: "One product. Three roles.",
  mantra: "It doesn't just answer — it sells.",
  mantraLead:
    "Answers and sells around the clock: understands the need, matches the solution, prices it by your catalogue and rules, and moves the deal to an order or a booking.",
  heroKicker: "Showroom AI · Seller",
  heroTrialNote: "{days} days free",
  heroSetupNote: "setup {fee} (optional)",
  linkageTitle: "The pair: the marketer brings the customers — the seller sells",
  linkageSub:
    "Two roles running one loop. The Marketer fills the funnel with research, content and publishing; the Seller turns the conversations that arrive into orders. The Business Assistant joins as a third role, so routine questions never sit unanswered.",
  roles: [
    {
      id: "seller",
      name: "Seller",
      title: "AI Sales Agent",
      desc: "Answers and sells: qualifies the request, matches the offer, prices it by your catalogue and rules, and hands your team a prepared deal.",
      capabilities: [
        "Replies and sells 24/7, not just an answering bot",
        "Up to 3 channels: site chat, Telegram, plus WhatsApp / Instagram on your own Meta Business",
        "Deterministic pricing from your catalogue — no invented numbers",
        "Manager handoff with the whole conversation",
      ],
      industries:
        "Real estate, furniture and interiors, automotive, construction, retail, services, salons and other trades — the rules are configured per business.",
      cta: "Seller role page",
    },
    {
      id: "marketer",
      name: "Marketer",
      title: "AI Marketing Employee",
      desc: "Runs the marketing cycle end to end and publishes only after your approval in Telegram.",
      capabilities: [
        "Research of the niche, the business and the competitors",
        "Target audience analysis",
        "Strategy and targeting ideas",
        "Content plan",
        "Post texts",
        "Reels and Stories",
        "Graphic design",
        "Approval with you in Telegram: approved — auto-published to Instagram; rejected — it takes your comment and makes a new version",
        "Analysis of how the posts performed, feeding the next strategy",
      ],
      combo: "Marketer, SMM specialist, designer and analyst in one.",
      cta: "Marketer role page",
    },
    {
      id: "assistant",
      name: "Business Assistant",
      title: "AI Business Assistant",
      desc: "Answers routine questions from your knowledge base, qualifies inbound conversations, and passes a warm thread to a human.",
      capabilities: [
        "Grounded in your knowledge base",
        "One inbox across messengers and site chat",
        "Qualification and human handoff",
      ],
      cta: "Assistant role page",
    },
  ],
  plansTitle: "Showroom AI plans",
  plansSub:
    "Monthly subscription in USD. Roles are sold on their own as well — the Business bundle costs less than the Seller and Marketer Lite roles bought apart.",
  plans: [
    {
      id: "start",
      name: "Start",
      rolesLabel: "Seller 24/7",
      desc: "The Seller role on its own, on up to three channels.",
      features: [
        "Seller 24/7 — answers and sells",
        "Site chat and Telegram, plus WhatsApp / Instagram on your own Meta Business",
        "Onboarding checklist for the Meta Business connection",
        "Deterministic pricing from your catalogue and rules",
      ],
    },
    {
      id: "business",
      name: "Business",
      rolesLabel: "Seller + Marketer (Lite)",
      desc: "The Seller role plus the Marketer role in its Lite scope.",
      features: [
        "Everything in Start",
        "Marketer Lite: strategy, posts, visual drafts",
        "Approval in Telegram before publishing",
        "Cheaper than the two roles bought separately",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      rolesLabel: "Seller + Marketer (Pro)",
      desc: "The Seller role plus Marketer Pro: Instagram, Facebook and Threads, Reels and analytics.",
      features: [
        "Everything in Business",
        "Marketer Pro: IG + FB + Threads, Reels, analytics",
        "Full publishing cycle",
        "Cheaper than the two roles bought separately",
      ],
    },
  ],
  featuredLabel: "Most teams start here",
  pairBadge: "Seller + Marketer",
  pairPlanBadge: "Seller and Marketer together",
  perMonth: "/mo",
  cryptoLabel: "USDT / USDC",
  payCta: "Pay with USDT / USDC",
  includedTitle: "Every plan includes",
  includedPoints: [
    "Live chat widget on your site and a Telegram channel",
    "WhatsApp / Instagram through your own Meta Business, with our onboarding checklist",
    "Deterministic pricing from your catalogue and business rules",
    "Human handoff with the full conversation",
    "Launch inside 24 hours",
  ],
  separateTitle: "Or one role on its own",
  separateSub: "Each role is sold separately. Prices are unchanged for the Marketer and Assistant roles.",
  separate: [
    { id: "seller", label: "Seller", sub: "The Seller role alone — up to 3 channels." },
    { id: "marketer-lite", label: "Marketer Lite", sub: "Strategy, posts, approval in Telegram." },
    { id: "marketer-pro", label: "Marketer Pro", sub: "IG + FB + Threads, Reels, analytics." },
    { id: "assistant-entry", label: "Business Assistant — Entry", sub: "Answers and qualification." },
    { id: "assistant-standard", label: "Business Assistant — Standard", sub: "Higher volume, more channels." },
  ],
  setupTitle: "Setup",
  setupSub: "Setup is optional either way — the subscription does not depend on it.",
  setupFreeLabel: "Self-setup",
  setupFreeBody: "Free of charge: we hand you the checklist and the documentation.",
  setupPaidLabel: "Done-for-you",
  setupPaidBody: "Once, before launch: catalogue, rules, channels and a test run.",
  trialTitle: "Free trial",
  trialBody: "No card up front. We launch you inside 24 hours and you decide after the trial.",
  websiteCtaLabel: "No website? We'll build one",
  websiteCtaHint: "A site, a landing page or a store — turnkey, by the same team.",
  positioningTitle: "Why Showroom AI",
  positioningBody:
    "Agencies and integrators typically charge around $2,000 for implementation alone, and the marketing is not part of it. Showroom AI includes the marketing cycle with publishing, and our seller sells — it does not stop at answering.",
  positioningPoints: [
    "Implementation starts far below an integrator's price",
    "Marketing with publishing is part of the bundle",
    "The Seller role sells, it does not only answer",
    "Free trial without a card, launched inside 24 hours",
  ],
  demoCta: "Open the demo chat",
  demoHint: "Live chat on this site — talk to Showroom AI right now.",
  demoInitialMessage:
    "Hi! Show me how Showroom AI sells: ask me about my business and show what a sale looks like.",
  roleBannerLabel: "Part of Showroom AI",
  cardPricePrefix: "from ",
};

const showroomAiRu: ShowroomAiCopy = {
  brand: "Showroom AI",
  developerCredit: "by AI MARK",
  poweredBy: "Powered by AI MARK",
  kicker: "Один продукт. Три роли.",
  mantra: "Не просто ответит, а продаст.",
  mantraLead:
    "Отвечает и продаёт круглосуточно: понимает задачу, подбирает решение, считает по вашему каталогу и правилам и доводит дело до заказа или записи.",
  heroKicker: "Showroom AI · Продавец",
  heroTrialNote: "{days} дней бесплатно",
  heroSetupNote: "сетап {fee} (по желанию)",
  linkageTitle: "Связка: маркетолог приводит клиентов — продавец продаёт",
  linkageSub:
    "Две роли работают как один цикл. Маркетолог наполняет воронку: исследование, контент, публикации. Продавец превращает пришедшие диалоги в заказы. Бизнес-ассистент подключается третьей ролью — типовые вопросы не остаются без ответа.",
  roles: [
    {
      id: "seller",
      name: "Продавец",
      title: "AI-продавец",
      desc: "Отвечает и продаёт: квалифицирует задачу, подбирает решение, считает по вашему каталогу и правилам и передаёт команде подготовленную сделку.",
      capabilities: [
        "Отвечает и продаёт 24/7, а не просто бот-автоответчик",
        "До 3 каналов: чат на сайте, Telegram, плюс WhatsApp / Instagram через ваш собственный Meta Business",
        "Детерминированный расчёт по каталогу — без выдуманных цифр",
        "Передача менеджеру вместе со всем диалогом",
      ],
      industries:
        "Недвижимость, мебель и интерьер, авто, стройка, ритейл, услуги, салоны и другие отрасли — правила настраиваются под ваш бизнес.",
      cta: "Страница роли Продавца",
    },
    {
      id: "marketer",
      name: "Маркетолог",
      title: "AI-маркетолог",
      desc: "Ведёт маркетинговый цикл целиком и публикует только после вашего подтверждения в Telegram.",
      capabilities: [
        "Исследование ниши, бизнеса и конкурентов",
        "Анализ целевой аудитории",
        "Стратегия и идеи по таргетингу",
        "Контент-план",
        "Тексты постов",
        "Reels и Stories",
        "Графический дизайн",
        "Согласование с вами в Telegram: одобрено — автопубликация в Instagram, отклонено — забирает комментарий и делает новую версию",
        "Анализ результатов постов и улучшение следующей стратегии",
      ],
      combo: "Маркетолог, SMM, дизайнер и аналитик в одном.",
      cta: "Страница роли Маркетолога",
    },
    {
      id: "assistant",
      name: "Бизнес-ассистент",
      title: "AI-бизнес-ассистент",
      desc: "Отвечает на типовые вопросы по вашей базе знаний, квалифицирует обращения и передаёт тёплый диалог человеку.",
      capabilities: [
        "Опирается на вашу базу знаний",
        "Единый инбокс: мессенджеры и чат на сайте",
        "Квалификация и передача человеку",
      ],
      cta: "Страница роли Бизнес-ассистента",
    },
  ],
  plansTitle: "Тарифы Showroom AI",
  plansSub:
    "Подписка в USD, ежемесячно. Роли продаются и по отдельности — набор Business дешевле, чем Seller и Marketer Lite по отдельности.",
  plans: [
    {
      id: "start",
      name: "Start",
      rolesLabel: "Продавец 24/7",
      desc: "Роль Продавца отдельно, до трёх каналов.",
      features: [
        "Продавец 24/7 — отвечает и продаёт",
        "Чат на сайте и Telegram, плюс WhatsApp / Instagram через ваш собственный Meta Business",
        "Чек-лист онбординга для подключения Meta Business",
        "Детерминированный расчёт по вашему каталогу и правилам",
      ],
    },
    {
      id: "business",
      name: "Business",
      rolesLabel: "Продавец + Маркетолог (Lite)",
      desc: "Роль Продавца плюс роль Маркетолога в объёме Lite.",
      features: [
        "Всё из Start",
        "Маркетолог Lite: стратегия, посты, визуальные черновики",
        "Подтверждение в Telegram до публикации",
        "Дешевле, чем обе роли по отдельности",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      rolesLabel: "Продавец + Маркетолог (Pro)",
      desc: "Роль Продавца плюс Маркетолог Pro: Instagram, Facebook и Threads, Reels и аналитика.",
      features: [
        "Всё из Business",
        "Маркетолог Pro: IG + FB + Threads, Reels, аналитика",
        "Полный цикл публикаций",
        "Дешевле, чем обе роли по отдельности",
      ],
    },
  ],
  featuredLabel: "Чаще всего начинают здесь",
  pairBadge: "Продавец + Маркетолог",
  pairPlanBadge: "Продавец и Маркетолог вместе",
  perMonth: "/мес",
  cryptoLabel: "USDT / USDC",
  payCta: "Оплатить в USDT / USDC",
  includedTitle: "Входит в каждый тариф",
  includedPoints: [
    "Виджет чата на сайте и канал в Telegram",
    "WhatsApp / Instagram через ваш собственный Meta Business — с нашим чек-листом онбординга",
    "Детерминированный расчёт по каталогу и бизнес-правилам",
    "Передача менеджеру вместе с диалогом",
    "Запуск в течение 24 часов",
  ],
  separateTitle: "Или одна роль отдельно",
  separateSub: "Каждую роль можно купить отдельно. Цены Маркетолога и Бизнес-ассистента не меняются.",
  separate: [
    { id: "seller", label: "Продавец", sub: "Только роль Продавца — до 3 каналов." },
    { id: "marketer-lite", label: "Маркетолог Lite", sub: "Стратегия, посты, подтверждение в Telegram." },
    { id: "marketer-pro", label: "Маркетолог Pro", sub: "IG + FB + Threads, Reels, аналитика." },
    { id: "assistant-entry", label: "Бизнес-ассистент — Entry", sub: "Ответы и квалификация." },
    { id: "assistant-standard", label: "Бизнес-ассистент — Standard", sub: "Больше объёма и каналов." },
  ],
  setupTitle: "Запуск",
  setupSub: "Сетап опционален в любом случае — подписка от него не зависит.",
  setupFreeLabel: "Self-setup",
  setupFreeBody: "Бесплатно: отдаём чек-лист и документацию, подключаете сами.",
  setupPaidLabel: "Done-for-you",
  setupPaidBody: "Разово, до запуска: каталог, правила, каналы и тестовый прогон.",
  trialTitle: "Бесплатный триал",
  trialBody: "Без карты. Запускаем в течение 24 часов, решение — после триала.",
  websiteCtaLabel: "Нет сайта? Сделаем под ключ",
  websiteCtaHint: "Сайт, лендинг или магазин — под ключ, у той же команды.",
  positioningTitle: "Почему Showroom AI",
  positioningBody:
    "У агентств и интеграторов только внедрение обычно стоит около $2 000, и маркетинг в это не входит. В Showroom AI маркетинговый цикл с публикациями уже внутри, а продавец продаёт — а не останавливается на ответе.",
  positioningPoints: [
    "Внедрение кратно дешевле, чем у интегратора",
    "Маркетинг с публикациями входит в бандл",
    "Роль Продавца продаёт, а не только отвечает",
    "Бесплатный триал без карты и запуск в течение суток",
  ],
  demoCta: "Открыть демо-чат",
  demoHint: "Живой чат на этом сайте — поговорите с Showroom AI прямо сейчас.",
  demoInitialMessage:
    "Привет! Покажи, как продаёт Showroom AI: спроси про мой бизнес и покажи, как выглядит продажа.",
  roleBannerLabel: "Часть Showroom AI",
  cardPricePrefix: "от ",
};

export const showroomAiCopy: Record<"en" | "ru", ShowroomAiCopy> = {
  en: showroomAiEn,
  ru: showroomAiRu,
};

export function getShowroomAiCopy(locale: Locale): ShowroomAiCopy {
  return locale === "ru" ? showroomAiRu : showroomAiEn;
}
