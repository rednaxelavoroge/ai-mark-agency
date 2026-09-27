import type { Locale } from "../lib/site";

export type DigitalProductionBuild = {
  title: string;
  forWhom: string;
  bullets: [string, string, string];
  mock: "saas" | "portal" | "ecommerce" | "ai";
};

export type DigitalProductionScenario = {
  title: string;
  body: string;
};

export type DigitalProductionCopy = {
  seoTitle: string;
  seoDescription: string;
  hero: {
    label: string;
    title: string;
    body: string;
    badge: string;
    cta: string;
  };
  contrast: {
    eyebrow: string;
    title: string;
    catalogTitle: string;
    catalogBody: string;
    productionTitle: string;
    productionBody: string;
    catalogLink: string;
  };
  builds: {
    eyebrow: string;
    title: string;
    lead: string;
    items: DigitalProductionBuild[];
  };
  process: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: string[];
    note: string;
  };
  scenarios: {
    eyebrow: string;
    title: string;
    lead: string;
    items: DigitalProductionScenario[];
  };
  embed: {
    eyebrow: string;
    title: string;
    lead: string;
    aime: string;
    assistant: string;
    showroom: string;
    orCustom: string;
  };
  bottom: {
    primary: string;
    secondary: string;
  };
};

const en: DigitalProductionCopy = {
  seoTitle: "Digital Production & AI Engineering · AI MARK",
  seoDescription:
    "Custom websites, cabinets, apps, integrations, automation and AI systems built for a specific business — not the three ready AI MARK products.",
  hero: {
    label: "PROJECT / B2B SERVICE",
    title: "Digital Production & AI Engineering",
    body: "Websites, cabinets, apps, integrations, automation and custom AI systems for business.",
    badge: "Custom",
    cta: "Discuss the task",
  },
  contrast: {
    eyebrow: "Two different things",
    title: "Not the product catalog.",
    catalogTitle: "Ready products",
    catalogBody:
      "AIME, AI Business Assistant and SHOWROOM AI / AI Sales Agent — published SKUs you buy and run.",
    productionTitle: "Digital Production",
    productionBody:
      "A build for your process: from a landing to a platform, cabinet or custom AI system. Scoped after we see the task.",
    catalogLink: "Need a ready product → catalog",
  },
  builds: {
    eyebrow: "What we build",
    title: "Six shapes the work usually takes.",
    lead: "Each engagement is scoped individually. There is no published package price on this page.",
    items: [
      {
        title: "Landings & sales sites",
        forWhom: "When an offer or a campaign needs a page that states the deal — not a generic brochure.",
        bullets: [
          "Landing under a specific offer or ads",
          "Multi-page sales site with forms and tracking",
          "Copy and structure from the brief, not a template farm",
        ],
        mock: "ecommerce",
      },
      {
        title: "Corporate sites & client cabinets",
        forWhom: "Companies that need a public site and a place clients actually work.",
        bullets: [
          "Corporate or product site",
          "Client cabinet with roles and documents",
          "The public face and the working surface as one system",
        ],
        mock: "portal",
      },
      {
        title: "Financial & credit platforms",
        forWhom: "Credit, finance and application workflows that cannot live on a landing.",
        bullets: [
          "Application and review flows",
          "Cabinets for clients, partners or operators",
          "Calculations and document packs — after we see the operating rules",
        ],
        mock: "saas",
      },
      {
        title: "Trading platforms & marketplaces",
        forWhom: "Catalogs, orders and two-sided trade that a sales page cannot hold.",
        bullets: [
          "Catalog, search and product cards",
          "Order flow and statuses",
          "Buyer and seller cabinets",
        ],
        mock: "ecommerce",
      },
      {
        title: "Operational consoles / B2B services",
        forWhom: "Internal or partner-facing operations — not a marketing site.",
        bullets: [
          "Dashboards and working queues",
          "Multi-workspace / tenant surfaces",
          "Status, billing and health as an operating picture",
        ],
        mock: "saas",
      },
      {
        title: "Custom AI: chats, agents, integrations, automation",
        forWhom: "When a ready SKU does not fit the process — or should sit inside a larger build.",
        bullets: [
          "Chats grounded in your knowledge",
          "Agents inside an existing workflow",
          "Integrations and automation around the work people already do",
        ],
        mock: "ai",
      },
    ],
  },
  process: {
    eyebrow: "How we work",
    title: "Brief to support. Join at the step you actually need.",
    lead: "Scope and timeline after a short call — not a published week-count.",
    steps: [
      "Brief",
      "Prototype / UX",
      "Build",
      "Integrations",
      "Launch",
      "Support",
    ],
    note: "We agree what is in, what is out, and a calendar after we understand the task. We do not publish a launch date on this page.",
  },
  scenarios: {
    eyebrow: "When this is your path",
    title: "Four situations where a ready SKU is the wrong door.",
    lead: "If AIME, AI Business Assistant or SHOWROOM AI already cover the job, start in the catalog.",
    items: [
      {
        title: "Landing for an offer or ads",
        body: "You have a specific offer and need a page (or a small sales site) built for that offer — not a product install.",
      },
      {
        title: "Finance or credit platform",
        body: "Applications, cabinets, calculations and documents have to follow your rules. That is a platform, not a chatbot SKU.",
      },
      {
        title: "Marketplace or cabinet",
        body: "Buyers, sellers or clients need a working surface: catalog, orders, roles, files. A landing cannot hold it.",
      },
      {
        title: "Custom AI inside your process",
        body: "The three ready products do not match the workflow. We build the AI piece into your process — or embed BA / SHOWROOM AI / AIME where they do fit.",
      },
    ],
  },
  embed: {
    eyebrow: "AI MARK products",
    title: "The three SKUs can sit inside a custom build — or stay out.",
    lead: "Digital Production is not a bundle of AIME, AI Business Assistant and SHOWROOM AI. They can be embedded when the job matches. They can also be absent.",
    aime: "AIME — marketing cycle up to your approval",
    assistant: "AI Business Assistant — answers and qualification",
    showroom: "SHOWROOM AI / AI Sales Agent — selection, calc, commercial proposal",
    orCustom: "Or a pure custom system with none of the three.",
  },
  bottom: {
    primary: "Describe the task",
    secondary: "Browse ready products",
  },
};

const ru: DigitalProductionCopy = {
  seoTitle: "Цифровое производство и AI-инженерия · AI MARK",
  seoDescription:
    "Сайты, кабинеты, приложения, интеграции, автоматизация и custom AI-системы под конкретный бизнес — не три готовых продукта AI MARK.",
  hero: {
    label: "PROJECT / B2B-СЕРВИС",
    title: "Digital Production & AI Engineering",
    body: "Сайты, кабинеты, приложения, интеграции, автоматизация и custom AI-системы для бизнеса.",
    badge: "ИНДИВИДУАЛЬНО",
    cta: "Обсудить задачу",
  },
  contrast: {
    eyebrow: "Это разные вещи",
    title: "Это не каталог готовых продуктов.",
    catalogTitle: "Готовые продукты",
    catalogBody:
      "AIME, AI Business Assistant и SHOWROOM AI — AI-продавец: опубликованные SKU, которые можно купить и запустить.",
    productionTitle: "Цифровое производство",
    productionBody:
      "Сборка под ваш процесс: от лендинга до платформы, кабинета или custom AI-системы. Скоуп — после того, как увидим задачу.",
    catalogLink: "Нужен готовый продукт → каталог",
  },
  builds: {
    eyebrow: "Что собираем",
    title: "Шесть форм, в которых эта работа обычно живёт.",
    lead: "Каждый проект скоупится отдельно. На этой странице нет опубликованной пакетной цены.",
    items: [
      {
        title: "Лендинги и продающие сайты",
        forWhom: "Когда офферу или рекламе нужна страница, которая говорит сделку — а не шаблонная визитка.",
        bullets: [
          "Лендинг под конкретный оффер или рекламу",
          "Многостраничный продающий сайт с формами и метками",
          "Структура и тексты из брифа, не «ферма шаблонов»",
        ],
        mock: "ecommerce",
      },
      {
        title: "Корпоративные сайты и клиентские кабинеты",
        forWhom: "Компаниям, которым нужен публичный сайт и место, где клиент реально работает.",
        bullets: [
          "Корпоративный или продуктовый сайт",
          "Клиентский кабинет с ролями и документами",
          "Публичная витрина и рабочая поверхность как одна система",
        ],
        mock: "portal",
      },
      {
        title: "Финансовые и кредитные платформы",
        forWhom: "Кредит, финансы и заявки, которые не живут на лендинге.",
        bullets: [
          "Потоки заявки и рассмотрения",
          "Кабинеты клиента, партнёра или оператора",
          "Расчёты и пакеты документов — после того, как увидим правила",
        ],
        mock: "saas",
      },
      {
        title: "Торговые платформы и маркетплейсы",
        forWhom: "Каталоги, заказы и двусторонняя торговля, которые продающая страница не держит.",
        bullets: [
          "Каталог, поиск и карточки",
          "Заказ и статусы",
          "Кабинеты покупателя и продавца",
        ],
        mock: "ecommerce",
      },
      {
        title: "Операционные консоли / B2B-сервисы",
        forWhom: "Внутренняя или партнёрская операционка — не маркетинговый сайт.",
        bullets: [
          "Дашборды и рабочие очереди",
          "Мультиворкспейс / tenant-поверхности",
          "Статус, биллинг и health как рабочая картина",
        ],
        mock: "saas",
      },
      {
        title: "Custom AI: чаты, агенты, интеграции, автоматизация",
        forWhom: "Когда готовый SKU не садится в процесс — или должен стоять внутри большей сборки.",
        bullets: [
          "Чаты по вашей базе знаний",
          "Агенты внутри существующего workflow",
          "Интеграции и автоматизация вокруг работы, которую люди уже делают",
        ],
        mock: "ai",
      },
    ],
  },
  process: {
    eyebrow: "Как работаем",
    title: "От брифа до сопровождения. Можно войти на нужном шаге.",
    lead: "Скоуп и сроки — после короткого созвона, не как опубликованное число недель.",
    steps: [
      "Бриф",
      "Прототип / UX",
      "Сборка",
      "Интеграции",
      "Запуск",
      "Сопровождение",
    ],
    note: "Состав, границы и календарь согласуем, когда поймём задачу. Дату запуска на этой странице не публикуем.",
  },
  scenarios: {
    eyebrow: "Когда это ваш путь",
    title: "Четыре ситуации, в которых готовый SKU — не та дверь.",
    lead: "Если задачу закрывают AIME, AI Business Assistant или SHOWROOM AI, начните с каталога.",
    items: [
      {
        title: "Лендинг под оффер или рекламу",
        body: "Есть конкретный оффер, нужна страница (или небольшой продающий сайт) под него — не установка продукта.",
      },
      {
        title: "Финансовая или кредитная платформа",
        body: "Заявки, кабинеты, расчёты и документы должны идти по вашим правилам. Это платформа, не чат-SKU.",
      },
      {
        title: "Маркетплейс или кабинет",
        body: "Покупателям, продавцам или клиентам нужна рабочая поверхность: каталог, заказы, роли, файлы. Лендинг это не держит.",
      },
      {
        title: "Custom AI внутри вашего процесса",
        body: "Три готовых продукта не совпадают с workflow. Собираем AI-часть в ваш процесс — или встраиваем BA / SHOWROOM AI / AIME там, где они садятся.",
      },
    ],
  },
  embed: {
    eyebrow: "Продукты AI MARK",
    title: "Три SKU можно встроить в кастомную сборку — или обойтись без них.",
    lead: "Цифровое производство — не пакет из AIME, AI Business Assistant и SHOWROOM AI. Их встраиваем, если задача совпадает. Их может не быть совсем.",
    aime: "AIME — маркетинговый цикл до вашего апрува",
    assistant: "AI Business Assistant — ответы и квалификация",
    showroom: "SHOWROOM AI — AI-продавец: подбор, расчёт, коммерческое предложение",
    orCustom: "Или чистая custom-система без трёх продуктов.",
  },
  bottom: {
    primary: "Описать задачу",
    secondary: "Смотреть готовые продукты",
  },
};

export function getDigitalProductionCopy(locale: Locale): DigitalProductionCopy {
  return locale === "ru" ? ru : en;
}
