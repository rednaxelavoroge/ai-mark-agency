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
    lead: "Demos, product facts, brand files, and support for partners.",
    startTitle: "How to start",
    startLead:
      "Your Partner ID and referral link are ready with the account. Programme rules are confirmed with you during onboarding, before you sell.",
    steps: [
      {
        title: "Copy your referral link",
        body: "It is on Dashboard and Profile. Share that link with the customer.",
      },
      {
        title: "Send a product page, not a guess",
        body: "Use the product links on this page. Each one already carries your code.",
      },
      {
        title: "A visitor is attributed for 30 days",
        body: "A visitor who opens your link stays attributed to you for 30 days.",
      },
      {
        title: "A lead is the contact form",
        body: "Customers lists people who sent the site form while your link was active.",
      },
      {
        title: "A sale is a paid invoice",
        body: "The customer pays on the product checkout. Commission is recorded after that payment is confirmed.",
      },
      {
        title: "Payouts are recorded by AI MARK",
        body: "Save a USDC address on Profile. AI MARK records the payout and sends it there.",
      },
    ],
    demosTitle: "Demos and presentations",
    demosLead:
      "The presentation is the live product page, already carrying your referral link.",
    openPage: "Open product page with your link",
    openPay: "Open checkout with your link",
    liveChat: "Live AI Business Assistant widget on the public site (same widget visitors already see).",
    panelDemo: "Interactive panel demo on the Assistant product page.",
    noSandbox: "Open the live product page with your referral link.",
    noDeck: "Share the live product page as the presentation.",
    materialsTitle: "Marketing materials",
    materialsLead: "Approved brand files and link-preview images, ready to download.",
    materialsMissing: "These are the brand files published for partners.",
    download: "Download",
    knowledgeTitle: "Product knowledge",
    knowledgeLead: "Positioning, audience, and list price from the public product pages.",
    who: "Who it's for",
    offer: "What it is",
    price: "List price",
    limits: "Limits (published)",
    supportTitle: "Support",
    supportLead: "Write to us on the same channels as the rest of the site, and include your Partner ID.",
    includeId: "Include your Partner ID, the referral link you sent, and whether the issue is a click, a lead, a sale, or a payout.",
    noTickets: "Programme rules are confirmed with you during onboarding, before you sell.",
    trackingTitle: "What is tracked",
    trackingLead: "These are the moments that stay attached to your referral link.",
    tracking: [
      {
        title: "Referral click",
        body: "Opening your referral link records the visit.",
      },
      {
        title: "Contact lead",
        body: "A person who sends the contact form while your link is active appears in Customers.",
      },
      {
        title: "Partner signup",
        body: "A new partner who joins through your link is recorded in your network.",
      },
      {
        title: "Paid sale",
        body: "A paid checkout keeps your referral code. Commission appears after the payment is confirmed.",
      },
    ],
  },
  ru: {
    title: "Partner Hub",
    lead: "Демо, факты о продуктах, файлы бренда и поддержка для партнёров.",
    startTitle: "Как начать",
    startLead:
      "Partner ID и referral-ссылка готовы вместе с аккаунтом. Правила программы подтверждаем с вами на подключении, до первых продаж.",
    steps: [
      {
        title: "Скопируйте referral-ссылку",
        body: "Она на главной кабинета и в профиле. Эту ссылку и отправляйте клиенту.",
      },
      {
        title: "Отправляйте страницу продукта",
        body: "Ссылки на этой странице уже содержат ваш код.",
      },
      {
        title: "Посетитель атрибутируется 30 дней",
        body: "Посетитель, открывший вашу ссылку, остаётся за вами 30 дней.",
      },
      {
        title: "Лид — это форма на сайте",
        body: "В разделе клиентов — те, кто отправил форму на сайте, пока действовала ваша ссылка.",
      },
      {
        title: "Продажа — оплаченный инвойс",
        body: "Клиент оплачивает продукт на странице оплаты. Комиссия записывается после подтверждения платежа.",
      },
      {
        title: "Выплату записывает AI MARK",
        body: "Сохраните USDC-адрес в профиле. AI MARK записывает выплату и отправляет её туда.",
      },
    ],
    demosTitle: "Демо и презентации",
    demosLead: "Презентация — живая страница продукта, уже с вашей referral-ссылкой.",
    openPage: "Открыть страницу продукта по вашей ссылке",
    openPay: "Открыть оплату по вашей ссылке",
    liveChat: "Живой виджет AI Business Assistant на публичном сайте (тот же, что видит посетитель).",
    panelDemo: "Интерактивное демо панели на странице ассистента.",
    noSandbox: "Откройте живую страницу продукта по своей ссылке.",
    noDeck: "Живая страница продукта и есть презентация.",
    materialsTitle: "Рекламные материалы",
    materialsLead: "Утверждённые файлы бренда и превью ссылок — их можно скачать.",
    materialsMissing: "Это файлы бренда, опубликованные для партнёров.",
    download: "Скачать",
    knowledgeTitle: "База знаний по продуктам",
    knowledgeLead: "Позиционирование, аудитория и цена с публичных страниц продуктов.",
    who: "Кому подходит",
    offer: "Что это",
    price: "Цена прайса",
    limits: "Ограничения (опубликованные)",
    supportTitle: "Поддержка",
    supportLead: "Пишите в те же каналы, что и на сайте, и укажите Partner ID.",
    includeId:
      "Укажите Partner ID, какую ссылку отправили и это клик, лид, продажа или выплата.",
    noTickets: "Правила программы подтверждаем с вами на подключении, до первых продаж.",
    trackingTitle: "Что отслеживается",
    trackingLead: "Вот моменты, которые остаются за вашей referral-ссылкой.",
    tracking: [
      {
        title: "Клик",
        body: "Открытие вашей referral-ссылки записывает визит.",
      },
      {
        title: "Лид с формы",
        body: "Человек, отправивший форму на сайте, пока действует ваша ссылка, появляется в клиентах.",
      },
      {
        title: "Регистрация партнёра",
        body: "Новый партнёр, пришедший по вашей ссылке, записывается в вашу сеть.",
      },
      {
        title: "Оплаченная продажа",
        body: "Оплаченный счёт сохраняет ваш referral-код. Комиссия появляется после подтверждения оплаты.",
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
