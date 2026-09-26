import { listPublicMessengers } from "@/lib/contact";
import { PAYABLE_SKUS, PAY_PAGE_PATH, PAY_SKU_PARAM } from "@/lib/crypto/catalog";
import { buildSalesKit, cabinetLocale, type SalesKit } from "@/lib/partner/catalog";
import {
  PARTNER_BRAND_ASSETS,
  PARTNER_DEMO_CHANNELS,
  PARTNER_PRODUCT_LIMITS,
  partnerHubLocale,
  type PartnerProductId,
} from "@/lib/partner/facts";
import { referralUrl, referralUrlTo } from "@/lib/partner/format";
import { localePath, site, type Locale } from "@/lib/site";

export type HubLabels = {
  title: string;
  lead: string;
  startTitle: string;
  startLead: string;
  steps: { title: string; body: string }[];
  demosTitle: string;
  demosLead: string;
  openPage: string;
  openPay: string;
  liveChat: string;
  panelDemo: string;
  noSandbox: string;
  noDeck: string;
  materialsTitle: string;
  materialsLead: string;
  materialsMissing: string;
  download: string;
  knowledgeTitle: string;
  knowledgeLead: string;
  who: string;
  offer: string;
  price: string;
  limits: string;
  supportTitle: string;
  supportLead: string;
  includeId: string;
  noTickets: string;
  trackingTitle: string;
  trackingLead: string;
  tracking: { title: string; body: string }[];
};

const LABELS: Record<"en" | "ru", HubLabels> = {
  en: {
    title: "Partner Hub",
    lead: "This page is the place to get demos, product facts, brand files, and support. It only lists what already exists on ai-mark.agency.",
    startTitle: "How to start",
    startLead:
      "Your Partner ID and referral link are issued with the account. There is no separate training product and no Partner Agreement published on this site yet.",
    steps: [
      {
        title: "Copy your referral link",
        body: "It is on Dashboard and Profile. The public form is /go/<your-code>.",
      },
      {
        title: "Send a product page, not a guess",
        body: "Use the product links on this page. Each one already carries your code.",
      },
      {
        title: "A visitor is attributed for 30 days",
        body: "The site stores a signed cookie. A later /go link from another partner replaces it.",
      },
      {
        title: "A lead is the contact form",
        body: "Customers → lists people who submitted the site form while your cookie was valid. The public AI chat widget is not written into that list.",
      },
      {
        title: "A sale is a paid invoice",
        body: "Self-serve SKUs go through /pay. An operator confirms the transfer, then the ledger posts commission.",
      },
      {
        title: "Payouts are recorded by AI MARK",
        body: "Save a USDC destination on Profile. This screen does not send tokens. A partner cannot request a payout from the cabinet.",
      },
    ],
    demosTitle: "Demos and presentations",
    demosLead:
      "There is no partner-only sandbox and no downloadable slide deck. The presentation is the live product page, with your referral link.",
    openPage: "Open product page with your link",
    openPay: "Open checkout with your link",
    liveChat: "Live AI Business Assistant widget on the public site (same widget visitors already see).",
    panelDemo: "Interactive panel demo on the Assistant product page (example workspace, not a client result).",
    noSandbox: "No logged-in AIME or Showroom.pro demo tenant is issued to partners.",
    noDeck: "No PDF or PPT presentation file is in this repository.",
    materialsTitle: "Marketing materials",
    materialsLead:
      "These are the approved brand files and link-preview images the site already uses. There are no campaign banners, social templates, or localised ads in production.",
    materialsMissing:
      "Do not invent creatives. If a customer needs a banner, that is a production request to AI MARK, not a file on this page.",
    download: "Download",
    knowledgeTitle: "Product knowledge",
    knowledgeLead:
      "Positioning, who it is for, list price, and limits — copied from the public product pages. Commission is not calculated here.",
    who: "Who it's for",
    offer: "What it is",
    price: "List price",
    limits: "Limits (published)",
    supportTitle: "Support",
    supportLead:
      "There is no partner ticket queue. Use the same public channels as the rest of the site, and include your Partner ID.",
    includeId: "Include your Partner ID, the referral link you sent, and whether the issue is a click, a lead, a sale, or a payout.",
    noTickets: "Partner Agreement terms are confirmed with AI MARK before you sell. They are not published on this site.",
    trackingTitle: "What is tracked",
    trackingLead: "Only these paths write a partner-attributed row. Anything else is not a tracked lead.",
    tracking: [
      {
        title: "Referral click",
        body: "/go/<code> records a click when the code exists. An unknown code still redirects and records nothing.",
      },
      {
        title: "Contact lead",
        body: "The public contact form writes a leads row. Chat, Telegram, WhatsApp, and email are not that row.",
      },
      {
        title: "Partner signup",
        body: "A new partner account opened through your link records you as sponsor. You cannot set a sponsor yourself.",
      },
      {
        title: "Paid sale",
        body: "/pay stores the referral code on the invoice. Commission appears after an operator confirms payment.",
      },
    ],
  },
  ru: {
    title: "Partner Hub",
    lead: "Здесь демо, факты о продуктах, файлы бренда и поддержка. В списке только то, что уже есть на ai-mark.agency.",
    startTitle: "Как начать",
    startLead:
      "Partner ID и referral-ссылка выдаются вместе с аккаунтом. Отдельного учебного курса нет. Partner Agreement на сайте ещё не опубликован.",
    steps: [
      {
        title: "Скопируйте referral-ссылку",
        body: "Она на Dashboard и в Profile. Публичный адрес: /go/<ваш-код>.",
      },
      {
        title: "Отправляйте страницу продукта",
        body: "Ссылки на этой странице уже содержат ваш код.",
      },
      {
        title: "Посетитель атрибутируется 30 дней",
        body: "Сайт ставит подписанную cookie. Новая ссылка другого партнёра её заменяет.",
      },
      {
        title: "Лид — это форма на сайте",
        body: "Customers показывает тех, кто отправил форму, пока действовала ваша cookie. Публичный AI-чат в этот список не пишется.",
      },
      {
        title: "Продажа — оплаченный инвойс",
        body: "Self-serve SKU идут через /pay. Оператор подтверждает перевод, затем ledger пишет комиссию.",
      },
      {
        title: "Выплату записывает AI MARK",
        body: "Сохраните USDC-адрес в Profile. Экран не отправляет токены. Запросить выплату из кабинета нельзя.",
      },
    ],
    demosTitle: "Демо и презентации",
    demosLead:
      "Отдельного партнёрского sandbox и скачиваемой презентации нет. Презентация — живая страница продукта с вашей referral-ссылкой.",
    openPage: "Открыть страницу продукта по вашей ссылке",
    openPay: "Открыть оплату по вашей ссылке",
    liveChat: "Живой виджет AI Business Assistant на публичном сайте (тот же, что видит посетитель).",
    panelDemo: "Интерактивное демо панели на странице Assistant (пример рабочей области, не результат клиента).",
    noSandbox: "Партнёру не выдаётся отдельный демо-тенант AIME или Showroom.pro.",
    noDeck: "В репозитории нет файла презентации PDF или PPT.",
    materialsTitle: "Рекламные материалы",
    materialsLead:
      "Это утверждённые файлы бренда и превью ссылок, которые уже использует сайт. Кампанийных баннеров, шаблонов для соцсетей и локализованной рекламы в production нет.",
    materialsMissing:
      "Не выдумывайте креативы. Баннер для клиента — запрос в AI MARK, а не файл на этой странице.",
    download: "Скачать",
    knowledgeTitle: "База знаний по продуктам",
    knowledgeLead:
      "Позиционирование, аудитория, цена прайса и ограничения — с публичных страниц продуктов. Комиссия здесь не считается.",
    who: "Кому подходит",
    offer: "Что это",
    price: "Цена прайса",
    limits: "Ограничения (опубликованные)",
    supportTitle: "Поддержка",
    supportLead:
      "Отдельной партнёрской очереди тикетов нет. Те же публичные каналы, что на сайте. Указывайте Partner ID.",
    includeId:
      "Укажите Partner ID, какую ссылку отправили и это клик, лид, продажа или выплата.",
    noTickets:
      "Условия Partner Agreement подтверждаются с AI MARK до продаж. На сайте они не опубликованы.",
    trackingTitle: "Что отслеживается",
    trackingLead: "Партнёрская запись появляется только на этих путях. Остальное — не tracked lead.",
    tracking: [
      {
        title: "Клик",
        body: "/go/<code> пишет клик, если код существует. Неизвестный код всё равно редиректит и ничего не записывает.",
      },
      {
        title: "Лид с формы",
        body: "Публичная форма пишет строку в leads. Чат, Telegram, WhatsApp и email в эту таблицу не пишутся.",
      },
      {
        title: "Регистрация партнёра",
        body: "Новый партнёрский аккаунт по вашей ссылке записывает вас как sponsor. Назначить sponsor самому нельзя.",
      },
      {
        title: "Оплаченная продажа",
        body: "/pay сохраняет referral-код на инвойсе. Комиссия появляется после подтверждения оплаты оператором.",
      },
    ],
  },
};

export type PartnerDemo = {
  id: PartnerProductId;
  name: string;
  pageReferral: string;
  payReferrals: { skuId: string; name: string; href: string }[];
  liveChat: boolean;
  panelDemo: boolean;
};

export type PartnerKnowledge = {
  id: PartnerProductId;
  name: string;
  who: string;
  offer: string;
  price: string;
  extra: string;
  limits: string[];
  message: string;
  pageReferral: string;
};

export type PartnerHub = {
  labels: HubLabels;
  kit: SalesKit;
  demos: PartnerDemo[];
  knowledge: PartnerKnowledge[];
  assets: typeof PARTNER_BRAND_ASSETS;
  support: { email: string; messengers: ReturnType<typeof listPublicMessengers> };
  referralHome: string;
};

export function buildPartnerHub(locale: Locale, referralCode: string): PartnerHub {
  const kit = buildSalesKit(locale, referralCode);
  const lang = partnerHubLocale(locale);
  const labels = LABELS[lang];
  const payPath = localePath(locale, PAY_PAGE_PATH);

  const demos: PartnerDemo[] = kit.products.map((product) => {
    const id = product.id as PartnerProductId;
    const channel = PARTNER_DEMO_CHANNELS[id];
    return {
      id,
      name: product.name,
      pageReferral: product.referral,
      payReferrals: PAYABLE_SKUS.filter((sku) => sku.productRef === id).map((sku) => ({
        skuId: sku.id,
        name: sku.name,
        href: referralUrlTo(referralCode, `${payPath}?${PAY_SKU_PARAM}=${sku.id}`),
      })),
      liveChat: channel.liveChat,
      panelDemo: channel.panelDemo,
    };
  });

  const knowledge: PartnerKnowledge[] = kit.products.map((product) => {
    const id = product.id as PartnerProductId;
    return {
      id,
      name: product.name,
      who: product.who,
      offer: product.offer,
      price: product.price,
      extra: product.extra,
      limits: PARTNER_PRODUCT_LIMITS[id][lang],
      message: product.message,
      pageReferral: product.referral,
    };
  });

  return {
    labels,
    kit,
    demos,
    knowledge,
    assets: PARTNER_BRAND_ASSETS,
    support: { email: site.email, messengers: listPublicMessengers() },
    referralHome: referralUrl(referralCode),
  };
}

export function hubLabels(locale: Locale): HubLabels {
  return LABELS[partnerHubLocale(cabinetLocale(locale))];
}
