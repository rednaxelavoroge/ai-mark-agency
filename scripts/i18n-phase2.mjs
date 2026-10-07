/**
 * Phase 2 i18n patches: artifact fields, section locales, public-chrome overlays.
 * Run: node scripts/i18n-phase2.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const ARTIFACT = {
  en: { grid: ["Segments", "Pricing", "Channels", "CAC / LTV"], sub: "identity system" },
  ru: { grid: ["Сегменты", "Монетизация", "Каналы", "CAC / LTV"], sub: "система айдентики" },
  de: { grid: ["Segmente", "Monetarisierung", "Kanäle", "CAC / LTV"], sub: "Identitätssystem" },
  es: { grid: ["Segmentos", "Monetización", "Canales", "CAC / LTV"], sub: "sistema de identidad" },
  pt: { grid: ["Segmentos", "Monetização", "Canais", "CAC / LTV"], sub: "sistema de identidade" },
  fr: { grid: ["Segments", "Monétisation", "Canaux", "CAC / LTV"], sub: "système d'identité" },
  ar: { grid: ["الشرائح", "تحقيق الدخل", "القنوات", "CAC / LTV"], sub: "نظام الهوية" },
  zh: { grid: ["细分", " monetization", "渠道", "CAC / LTV"], sub: "识别系统" },
  id: { grid: ["Segmen", "Monetisasi", "Saluran", "CAC / LTV"], sub: "sistem identitas" },
  vi: { grid: ["Phân khúc", "Monet hóa", "Kênh", "CAC / LTV"], sub: "hệ thống nhận diện" },
  ja: { grid: ["セグメント", "マネタイズ", "チャネル", "CAC / LTV"], sub: "アイデンティティ体系" },
  tr: { grid: ["Segmentler", "Monetizasyon", "Kanallar", "CAC / LTV"], sub: "kimlik sistemi" },
};

function patchArtifactFields(filePath) {
  let text = readFileSync(filePath, "utf8");
  for (const [loc, { grid, sub }] of Object.entries(ARTIFACT)) {
    const needle = `"${loc}": {`;
    let idx = 0;
    while ((idx = text.indexOf(needle, idx)) >= 0) {
      const blockStart = idx;
      let depth = 0;
      let i = text.indexOf("{", blockStart);
      for (; i < text.length; i++) {
        if (text[i] === "{") depth++;
        else if (text[i] === "}") {
          depth--;
          if (depth === 0) break;
        }
      }
      const block = text.slice(blockStart, i + 1);
      if (block.includes("artifactGrid")) {
        idx = i + 1;
        continue;
      }
      const microRe = /("artifactMicro":\s*\{[^}]+\},)/;
      const m = block.match(microRe);
      if (!m) {
        idx = i + 1;
        continue;
      }
      const insert = `${m[1]}\n    "artifactGrid": ${JSON.stringify(grid)},\n    "artifactBrandSubtitle": ${JSON.stringify(sub)},`;
      const newBlock = block.replace(microRe, insert);
      text = text.slice(0, blockStart) + newBlock + text.slice(i + 1);
      idx = blockStart + newBlock.length;
    }
  }
  writeFileSync(filePath, text);
  console.log("Patched artifact fields in", path.basename(filePath));
}

function patchLocaleBlock(filePath, localeKey, newObj) {
  const text = readFileSync(filePath, "utf8");
  const marker = `"${localeKey}": {`;
  const start = text.indexOf(marker);
  if (start < 0) throw new Error(`Locale ${localeKey} not found in ${filePath}`);
  let depth = 0;
  let i = start + marker.length - 1;
  for (; i < text.length; i++) {
    const ch = text[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  const before = text.slice(0, start);
  const after = text.slice(i);
  const injected = `"${localeKey}": ${JSON.stringify(newObj, null, 2)}`;
  writeFileSync(filePath, before + injected + after);
  console.log(`Patched ${localeKey} in ${path.basename(filePath)}`);
}

function mergeIntoLocaleBlock(filePath, localeKey, partial) {
  const text = readFileSync(filePath, "utf8");
  const marker = `"${localeKey}": {`;
  const start = text.indexOf(marker);
  if (start < 0) throw new Error(`Locale ${localeKey} not found`);
  let depth = 0;
  let i = start + marker.length - 1;
  for (; i < text.length; i++) {
    const ch = text[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) break;
    }
  }
  const blockStr = text.slice(start, i + 1);
  const jsonLike = blockStr.replace(/^"\w+":\s*/, "");
  const obj = Function(`"use strict"; return (${jsonLike});`)();
  const merged = deepMerge(obj, partial);
  patchLocaleBlock(filePath, localeKey, merged);
}

function deepMerge(a, b) {
  if (b === null || typeof b !== "object" || Array.isArray(b)) return b;
  const out = { ...a };
  for (const k of Object.keys(b)) {
    out[k] =
      b[k] && typeof b[k] === "object" && !Array.isArray(b[k]) && a[k] && typeof a[k] === "object"
        ? deepMerge(a[k], b[k])
        : b[k];
  }
  return out;
}

function insertBeforeLocaleClose(filePath, localeKey, jsonSnippet) {
  const text = readFileSync(filePath, "utf8");
  const marker = `"${localeKey}": {`;
  const start = text.indexOf(marker);
  if (start < 0) throw new Error(`Locale ${localeKey} not found`);
  let depth = 0;
  let i = start + marker.length - 1;
  for (; i < text.length; i++) {
    const ch = text[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) break;
    }
  }
  const beforeClose = text.lastIndexOf("}", i);
  const insert = `,\n${jsonSnippet.trim().replace(/^\s*,/, "")}`;
  if (text.slice(start, i).includes('"homePage"')) {
    console.log(`Skip homePage insert for ${localeKey} (exists)`);
    return;
  }
  const newText = text.slice(0, beforeClose) + insert + text.slice(beforeClose);
  writeFileSync(filePath, newText);
  console.log(`Inserted extensions for ${localeKey} in ${path.basename(filePath)}`);
}

const homePageEn = {
  hubModules: [
    {
      num: "01",
      tag: "End-to-End System",
      title: "How an Idea Becomes a Business",
      desc: "8 stages of venture building: market validation, unit economics, digital production, AI automation, and distribution scale.",
      badge: "Interactive System",
      cta: "Explore the 8 Stages",
      href: "/how-it-works",
      accent: "var(--mark)",
    },
    {
      num: "02",
      tag: "Ready Software",
      title: "Proprietary AI Products",
      desc: "SHOWROOM AI (AI Sales Agent for catalogs), AI Business Assistant (24/7 webchat), and AIME (AI Marketing Employee).",
      badge: "3 Core Products",
      cta: "Explore Products",
      href: "/products",
      accent: "var(--warm)",
    },
    {
      num: "03",
      tag: "Commercial Model",
      title: "Pricing & Engagement Formats",
      desc: "Marketing department retainers from $1,200/mo, SaaS subscriptions from $89/mo, and turnkey venture production.",
      badge: "Transparent Tiers",
      cta: "View All Pricing",
      href: "/pricing",
      accent: "var(--mark-light)",
    },
    {
      num: "04",
      tag: "Distribution",
      title: "Global Partner Network",
      desc: "5 tiers of distribution: territorial representatives, vertical integrators, marketing agencies, and direct commissions.",
      badge: "Up to 5 Levels",
      cta: "Partner Program",
      href: "/partners",
      accent: "var(--mark)",
    },
    {
      num: "05",
      tag: "Venture Capital",
      title: "Investor Proposal",
      desc: "Growth capital for scaling proven commercial AI infrastructure: multi-stream revenues and international expansion.",
      badge: "Seed Round",
      cta: "Investment Proposal",
      href: "/investors",
      accent: "var(--warm)",
    },
  ],
  featuredProducts: [
    {
      id: "showroom",
      tag: "AI Sales Agent",
      price: "from $349/mo",
      desc: "Matches catalog items, computes dynamic formulas, and outputs finished commercial quotes.",
      highlights: [
        "Deterministic custom calculation formulas",
        "Automated verified PDF quote generator",
        "Seamless CRM sync & manager handoff",
      ],
    },
    {
      id: "assistant",
      tag: "Inbox & Qualification",
      price: "from $149/mo",
      desc: "24/7 conversational assistant: grounds in company knowledge, qualifies leads, and hands off to human operators.",
      highlights: [
        "Unified WhatsApp, Telegram, Direct & Web inbox",
        "Grounded strictly in company knowledge base",
        "Instant 1-click human operator handoff",
      ],
    },
    {
      id: "aime",
      tag: "Autonomous Marketing",
      price: "from $1,200/mo",
      desc: "Executes the full marketing workflow: market intelligence, visual assets, and social drafts — up to your approval.",
      highlights: [
        "Market intelligence & on-brand content planning",
        "Visual drafts & high-converting Reels scripts",
        "Strict 1-click Telegram approval gate",
      ],
    },
  ],
};

const homePageRu = {
  hubModules: [
    {
      num: "01",
      tag: "Сквозной процесс",
      title: "Как идея становится бизнесом",
      desc: "8 этапов трансформации: валидация спроса, юнит-экономика, разработка продукта, внедрение AI-агентов и масштабирование.",
      badge: "Интерактивный контур",
      cta: "Открыть контур 01–08",
      href: "/how-it-works",
      accent: "var(--mark)",
    },
    {
      num: "02",
      tag: "Готовые решения",
      title: "Каталог AI-продуктов",
      desc: "SHOWROOM AI (AI-продавец по каталогам), AI Business Assistant (поддержка 24/7) и AIME (автономный AI-маркетолог).",
      badge: "3 продукта · SaaS",
      cta: "Смотреть продукты",
      href: "/products",
      accent: "var(--warm)",
    },
    {
      num: "03",
      tag: "Тарифы и условия",
      title: "Форматы работы и цены",
      desc: "Ретейнеры AI-маркетингового отдела от $1,200/мес, продуктовые подписки от $89/мес и заказной цифровой продакшн.",
      badge: "Прозрачные тарифы",
      cta: "Все тарифы и условия",
      href: "/pricing",
      accent: "var(--mark-light)",
    },
    {
      num: "04",
      tag: "Партнёрство",
      title: "Международная партнёрская сеть",
      desc: "5 уровней партнёрской сети: региональные представители, отраслевые интеграторы, агентства и прямые комиссии с оплат.",
      badge: "До 5 уровней дохода",
      cta: "Партнёрская программа",
      href: "/partners",
      accent: "var(--mark)",
    },
    {
      num: "05",
      tag: "Венчурный капитал",
      title: "Инвестиционное предложение",
      desc: "Привлечение капитала в масштабирование готовой технологической базы: диверсифицированная выручка и глобальная сеть.",
      badge: "Seed-раунд",
      cta: "Инвестиционный меморандум",
      href: "/investors",
      accent: "var(--warm)",
    },
  ],
  featuredProducts: [
    {
      id: "showroom",
      tag: "AI-продавец",
      price: "от $349/мес",
      desc: "Подбирает товары по каталогу, рассчитывает спецификации по формулам и формирует готовое КП.",
      highlights: [
        "Отраслевые формулы расчёта без галлюцинаций",
        "Генерация точных PDF-предложений для клиента",
        "Синхронизация с CRM и передача менеджеру",
      ],
    },
    {
      id: "assistant",
      tag: "Инбокс и квалификация",
      price: "от $149/мес",
      desc: "Круглосуточный AI-ассистент: отвечает по базе знаний, квалифицирует лидов и передаёт диалог человеку.",
      highlights: [
        "Единый инбокс: WhatsApp, Telegram, Direct, Web",
        "Ответы строго по базе знаний компании",
        "Мгновенный перевод на оператора в 1 клик",
      ],
    },
    {
      id: "aime",
      tag: "Автономный маркетинг",
      price: "от $1,200/мес",
      desc: "Ведёт полный маркетинговый цикл: анализ конкурентов, тексты, визуалы и посты — строго до вашего апрува.",
      highlights: [
        "Анализ рынка и контент-план под ваш бренд",
        "Сценарии для Reels и визуальные концепты",
        "Публикация строго после подтверждения в Telegram",
      ],
    },
  ],
};

const contactLauncherEn = {
  open: "Contact us",
  close: "Close",
  title: "How can we help?",
  aiLabel: "Chat with our AI assistant",
  aiHint: "Answers instantly, day or night",
  messengerHint: "Chat with us",
  emailLabel: "Email",
  emailHint: "hello@ai-mark.agency",
  greeting:
    "Hi! I'm AI MARK's AI Business Assistant. Tell us what you need — marketing, sales, or a product.",
  placeholder: "Type a message…",
};

const contactLauncherRu = {
  open: "Связаться",
  close: "Закрыть",
  title: "Чем можем помочь?",
  aiLabel: "Чат с AI-ассистентом",
  aiHint: "Отвечает мгновенно, круглосуточно",
  messengerHint: "Написать в чат",
  emailLabel: "Email",
  emailHint: "hello@ai-mark.agency",
  greeting:
    "Здравствуйте! Я AI Business Assistant AI MARK. Расскажите, что нужно — маркетинг, продажи или продукт.",
  placeholder: "Напишите сообщение…",
};

const productPageEn = {
  allFeatures: "All features",
  payUsdt: "Pay USDT / USDC",
  architectureHelpTitle: "Need guidance choosing product architecture?",
  architectureHelpLead:
    "Tell us your niche, channels, and catalog complexity — we will map the right product stack.",
  leaveContacts: "Leave your contacts",
  tryAssistant: "Try the assistant",
  automationPanel: "Automation and panel",
  crmIntegrations: "CRM and integrations",
  productionReady: "Production ready",
  proprietaryProduct: "Proprietary Product",
  coreCapabilities: "Core capabilities:",
  activeIntegrations: "Active integrations:",
  exploreProduct: "Explore full product",
  install: "Install",
  catalogLink: "All products in catalog",
  showcaseLead:
    "The assistant answers and qualifies. Showroom AI sells and prepares the deal. Three proprietary AI products.",
};

const pricingFootnoteEn =
  "USD. Product prices are published on dedicated product pages. Retainers: Starter $1,200 / Growth $2,200 / Scale $3,500 per month by scope. ROI, CAC, and ROAS are never guaranteed.";

const pricingFootnoteRu =
  "USD. Продуктовые цены — в опубликованных коридорах на страницах продуктов. Ретейнеры отдела: Starter $1,200 / Growth $2,200 / Scale $3,500 в месяц по скоупу. ROI, CAC и ROAS не гарантируем.";

const chromeExtensionKeys = [
  "homePage",
  "contactLauncher",
  "productPage",
  "capabilityBand",
  "aiProductsShowcase",
  "investorsSection",
  "investorsPage",
];

function buildChromeExtension(locale) {
  const home =
    locale === "ru" ? homePageRu : locale === "de" ? homePageEn : homePageEn; // fallback en, merge overlays below
  const contact =
    locale === "ru"
      ? contactLauncherRu
      : locale === "de"
        ? {
            ...contactLauncherEn,
            open: "Kontakt",
            close: "Schließen",
            title: "Wobei können wir helfen?",
            aiLabel: "Chat mit unserem KI-Assistenten",
            aiHint: "Antwortet sofort, Tag und Nacht",
            messengerHint: "Chat starten",
            greeting:
              "Hallo! Ich bin der AI Business Assistant von AI MARK. Marketing, Vertrieb oder Produkt — wobei brauchen Sie Hilfe?",
            placeholder: "Nachricht eingeben…",
          }
        : contactLauncherEn;

  return {
    homePage: locale === "ru" ? homePageRu : locale === "de" ? mergeHomeDe() : homePageEn,
    contactLauncher: contact,
    productPage: productPageEn,
    pricingPage: {
      commercialFootnote:
        locale === "ru"
          ? pricingFootnoteRu
          : locale === "de"
            ? "USD. Produktpreise stehen auf den Produktseiten. Retainer: Starter $1,200 / Growth $2,200 / Scale $3,500 pro Monat je Scope. ROI, CAC und ROAS werden nicht garantiert."
            : pricingFootnoteEn,
    },
    investorsPage: {
      sectionsCountLabel: locale === "ru" ? "разделов" : "sections",
    },
    capabilityBand: {
      ariaLabel: locale === "ru" ? "Из чего состоит AI MARK" : "What AI MARK includes",
      eyebrow: locale === "ru" ? "Одна система" : "One system",
      footnote:
        locale === "ru"
          ? "Инвесторы — это участие в компании AI MARK. Это отдельное направление и не совпадает с партнёрской сетью или заказом на создание бизнеса."
          : "Investors means participation in AI MARK as a company. It is separate from the partner network and from ordering a business to be built.",
      groups:
        locale === "ru"
          ? [
              {
                label: "AI-инфраструктура",
                items: ["AI-маркетинг", "AI-продажи", "Клиентский сервис", "Автоматизация", "Цифровая разработка"],
              },
              {
                label: "Создание бизнеса",
                items: ["Исследование", "Бизнес-модель", "Цифровой продукт", "Запуск", "Рост"],
              },
              {
                label: "Дополнительные направления",
                items: ["Финансовые и Web3-решения", "Партнёрская сеть", "Инвесторам"],
              },
            ]
          : [
              {
                label: "AI infrastructure",
                items: ["AI Marketing", "AI Sales", "Customer Service", "Automation", "Digital Production"],
              },
              {
                label: "Business creation",
                items: ["Research", "Business Model", "Digital Product", "Launch", "Growth"],
              },
              {
                label: "Additional directions",
                items: ["Financial / Web3 Solutions", "Partner Network", "Investors"],
              },
            ],
    },
    aiProductsShowcase: { ...productPageEn, products: homePageEn.featuredProducts },
    investorsSection: {
      valueDriver: locale === "ru" ? "Устойчивость" : "Value Driver",
      seedTitle: locale === "ru" ? "Seed-раунд & Коммерческое масштабирование" : "Seed Round & Commercial Scaling",
      seedLead:
        locale === "ru"
          ? "Компания открыта к инвестициям на этапе масштабирования готовой технологической базы. Структура сделки и условия обсуждаются индивидуально."
          : "The company is open to growth capital during its commercial scaling phase. Deal structure and terms are discussed individually.",
      fullProposal: locale === "ru" ? "Полное инвестиционное предложение" : "Full investment proposal",
    },
  };
}

function mergeHomeDe() {
  return {
    ...homePageEn,
    hubModules: homePageEn.hubModules.map((m, i) => {
      const de = [
        {
          tag: "Durchgängiges System",
          title: "Wie aus einer Idee ein Business wird",
          desc: "8 Phasen: Marktvalidierung, Unit Economics, digitale Produktion, KI-Automatisierung und Skalierung.",
          badge: "Interaktiver Kontur",
          cta: "8 Phasen entdecken",
        },
        {
          tag: "Fertige Software",
          title: "Eigene KI-Produkte",
          desc: "SHOWROOM AI, AI Business Assistant und AIME — drei kommerzielle Produkte.",
          badge: "3 Kernprodukte",
          cta: "Produkte ansehen",
        },
        {
          tag: "Kommerzielles Modell",
          title: "Preise & Formate",
          desc: "Marketing-Retainer ab $1.200/Mo, SaaS ab $149/Mo und Venture-Produktion.",
          badge: "Transparente Stufen",
          cta: "Alle Preise",
        },
        {
          tag: "Distribution",
          title: "Globales Partnernetz",
          desc: "5 Ebenen: Regionalvertreter, Branchenintegratoren, Agenturen und Direktprovisionen.",
          badge: "Bis zu 5 Ebenen",
          cta: "Partnerprogramm",
        },
        {
          tag: "Venture Capital",
          title: "Investorenangebot",
          desc: "Wachstumskapital für bewährte KI-Infrastruktur und internationale Expansion.",
          badge: "Seed-Runde",
          cta: "Investment Proposal",
        },
      ][i];
      return { ...m, ...de };
    }),
  };
}

// Fix zh typo
ARTIFACT.zh.grid = ["细分", "变现", "渠道", "CAC / LTV"];

patchArtifactFields(path.join(root, "content/sections/idea-to-business.ts"));

const chromePath = path.join(root, "content/sections/public-chrome.ts");
for (const loc of ["en", "ru", "de", "es", "pt", "fr", "ar", "zh", "id", "vi", "ja", "tr"]) {
  try {
    mergeIntoLocaleBlock(chromePath, loc, buildChromeExtension(loc));
  } catch (e) {
    console.error(loc, e.message);
  }
}

console.log("Done phase2 patch");
