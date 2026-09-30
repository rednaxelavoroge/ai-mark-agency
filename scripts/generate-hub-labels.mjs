/**
 * Generates lib/partner/hub-labels.ts from English/Russian sources + locale patches.
 */
import { writeFileSync } from "node:fs";

const EN = {
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
  demosLead: "The presentation is the live product page, already carrying your referral link.",
  openPage: "Open product page with your link",
  openPay: "Open checkout with your link",
  liveChat:
    "Live AI Business Assistant widget on the public site (same widget visitors already see).",
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
  includeId:
    "Include your Partner ID, the referral link you sent, and whether the issue is a click, a lead, a sale, or a payout.",
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
};

const RU = {
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
  liveChat:
    "Живой виджет AI Business Assistant на публичном сайте (тот же, что видит посетитель).",
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
    { title: "Клик", body: "Открытие вашей referral-ссылки записывает визит." },
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
};

function deepMerge(base, patch) {
  if (!patch) return structuredClone(base);
  const out = structuredClone(base);
  for (const key of Object.keys(patch)) {
    const pv = patch[key];
    if (Array.isArray(pv)) {
      out[key] = pv;
    } else if (pv && typeof pv === "object") {
      out[key] = deepMerge(out[key] ?? {}, pv);
    } else {
      out[key] = pv;
    }
  }
  return out;
}

const LOCALES = ["en", "es", "pt", "ru", "ar", "zh", "id", "vi", "de", "fr", "ja", "tr"];

const PATCHES = {
  es: {
    lead: "Demos, datos de producto, archivos de marca y soporte para partners.",
    startTitle: "Cómo empezar",
    download: "Descargar",
    who: "Para quién es",
    offer: "Qué es",
    price: "Precio de lista",
    limits: "Límites (publicados)",
    supportTitle: "Soporte",
    trackingTitle: "Qué se registra",
  },
  pt: {
    lead: "Demos, factos de produto, ficheiros de marca e suporte para partners.",
    startTitle: "Como começar",
    download: "Transferir",
    who: "Para quem é",
    offer: "O que é",
    price: "Preço de tabela",
    limits: "Limites (publicados)",
  },
  de: {
    lead: "Demos, Produktfakten, Markendateien und Support für Partner.",
    startTitle: "So starten Sie",
    download: "Herunterladen",
    who: "Für wen",
    offer: "Was es ist",
    price: "Listenpreis",
    limits: "Limits (veröffentlicht)",
  },
  fr: {
    lead: "Démos, faits produits, fichiers de marque et support pour les partners.",
    startTitle: "Par où commencer",
    download: "Télécharger",
    who: "Pour qui",
    offer: "Ce que c'est",
    price: "Prix catalogue",
    limits: "Limites (publiées)",
  },
  ja: {
    lead: "パートナー向けデモ、製品情報、ブランドファイル、サポート。",
    startTitle: "始め方",
    download: "ダウンロード",
    who: "対象",
    offer: "概要",
    price: "定価",
    limits: "制限（公開）",
  },
  tr: {
    lead: "Partnerler için demolar, ürün bilgileri, marka dosyaları ve destek.",
    startTitle: "Nasıl başlanır",
    download: "İndir",
    who: "Kime uygun",
    offer: "Ne olduğu",
    price: "Liste fiyatı",
    limits: "Limitler (yayınlanan)",
  },
  ar: {
    lead: "عروض توضيحية وحقائق المنتج وملفات العلامة ودعم للشركاء.",
    startTitle: "كيف تبدأ",
    download: "تنزيل",
    who: "لمن يناسب",
    offer: "ما هو",
    price: "سعر القائمة",
    limits: "الحدود (منشورة)",
  },
  zh: {
    lead: "为合作伙伴提供演示、产品事实、品牌文件与支持。",
    startTitle: "如何开始",
    download: "下载",
    who: "适用对象",
    offer: "是什么",
    price: "标价",
    limits: "限制（已发布）",
  },
  id: {
    lead: "Demo, fakta produk, aset merek, dan dukungan untuk partner.",
    startTitle: "Cara memulai",
    download: "Unduh",
    who: "Untuk siapa",
    offer: "Apa itu",
    price: "Harga daftar",
    limits: "Batas (dipublikasikan)",
  },
  vi: {
    lead: "Demo, thông tin sản phẩm, tài sản thương hiệu và hỗ trợ cho partner.",
    startTitle: "Bắt đầu thế nào",
    download: "Tải xuống",
    who: "Dành cho ai",
    offer: "Là gì",
    price: "Giá niêm yết",
    limits: "Giới hạn (đã công bố)",
  },
};

const labels = {};
for (const loc of LOCALES) {
  if (loc === "en") labels[loc] = EN;
  else if (loc === "ru") labels[loc] = RU;
  else labels[loc] = deepMerge(EN, PATCHES[loc] ?? {});
}

writeFileSync(
  new URL("../lib/partner/hub-labels.ts", import.meta.url),
  `import type { Locale } from "@/lib/site";

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

export const HUB_LABELS: Record<Locale, HubLabels> = ${JSON.stringify(labels, null, 2)} as Record<Locale, HubLabels>;
`,
);

console.log("Wrote lib/partner/hub-labels.ts");
