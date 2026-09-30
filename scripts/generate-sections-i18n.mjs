/**
 * Generates public section i18n bundles.
 *   node --experimental-strip-types scripts/generate-sections-i18n.mjs
 */
import { writeFileSync } from "node:fs";

const LOCALES = ["en", "es", "pt", "ru", "ar", "zh", "id", "vi", "de", "fr", "ja", "tr"];

const ideaEn = {
  eyebrow: "Continuous contour",
  title: "How an idea becomes a working business.",
  lead: "Not a stack of contractors — one governed contour: market, model, product, AI, demand.",
  stagesOverviewTitle: "Every stage of the contour",
  artifactMicro: { seed: "idea · hypothesis" },
  stages: [
    {
      kicker: "Input",
      title: "Idea or capital",
      body: "We start from a hypothesis, an operating company, or a capital range — and fix the goal.",
      artifact: "seed",
    },
    {
      kicker: "01",
      title: "Market research",
      body: "Demand, competitors, barriers to entry and unit economics grounded in real data.",
      artifact: "bars",
    },
    {
      kicker: "02",
      title: "Business model",
      body: "We assemble the model: segments, monetization, channels, cost of acquisition.",
      artifact: "grid",
    },
    {
      kicker: "03",
      title: "Brand",
      body: "Positioning, identity and voice — a system, not a logo patched on afterward.",
      artifact: "brand",
    },
    {
      kicker: "04",
      title: "Digital product",
      body: "Platform, workspaces, calculations and integrations the business actually runs on.",
      artifact: "product",
    },
    {
      kicker: "05",
      title: "AI infrastructure",
      body: "Proprietary AI agents embedded into operations: content, sales inbox, quoting.",
      artifact: "ai",
    },
    {
      kicker: "06",
      title: "Marketing & sales",
      body: "Demand capture, qualification and deals on the same infra — not scattered tools.",
      artifact: "funnel",
    },
    {
      kicker: "07",
      title: "Growth",
      body: "Analytics, optimization and the partner network scale an already working model.",
      artifact: "growth",
    },
  ],
  artifactCaption: {
    seed: "Input: an idea, an operating company, or a capital range.",
    bars: "Market analytics: demand, competitors and unit economics.",
    grid: "Model: segments, monetization, channels and cost of acquisition.",
    brand: "Identity: positioning, voice and the visual system.",
    product: "Digital product: workspaces, calculations, integrations and data.",
    ai: "AI agents in operations: content, sales inbox, catalog quoting.",
    funnel: "Sales: inquiry flow, qualification and closed deals.",
    growth: "Growth: metrics, optimization and the partner network.",
  },
  artifactLabel: {
    bars: "demand · competitors",
    product: "workspaces · quoting",
    ai: "RAG · agents",
    funnel: "inquiries → deals",
    growth: "metrics · network",
  },
};

const ideaRu = {
  eyebrow: "Сквозной контур",
  title: "Как идея становится работающим бизнесом.",
  lead: "Не набор подрядчиков, а один управляемый контур: рынок, модель, продукт, AI, спрос.",
  stagesOverviewTitle: "Все этапы контура",
  artifactMicro: { seed: "идея · гипотеза" },
  stages: [
    {
      kicker: "Вход",
      title: "Идея или капитал",
      body: "Начинаем с гипотезы, действующего бизнеса или объёма капитала — фиксируем цель.",
      artifact: "seed",
    },
    {
      kicker: "01",
      title: "Исследование рынка",
      body: "Спрос, конкуренты, барьеры входа и юнит-экономика на объективных данных.",
      artifact: "bars",
    },
    {
      kicker: "02",
      title: "Бизнес-модель",
      body: "Собираем модель: сегменты, монетизация, каналы, стоимость привлечения.",
      artifact: "grid",
    },
    {
      kicker: "03",
      title: "Бренд",
      body: "Позиционирование, айдентика и голос — система, а не логотип-заплатка.",
      artifact: "brand",
    },
    {
      kicker: "04",
      title: "Цифровой продукт",
      body: "Платформа, кабинеты, расчёты и интеграции, на которых бизнес ведёт операции.",
      artifact: "product",
    },
    {
      kicker: "05",
      title: "AI-инфраструктура",
      body: "Собственные AI-агенты встроены в операции: контент, инбокс продаж, расчёты.",
      artifact: "ai",
    },
    {
      kicker: "06",
      title: "Маркетинг и продажи",
      body: "Спрос, квалификация и сделки — на той же инфраструктуре, а не в разрозненных сервисах.",
      artifact: "funnel",
    },
    {
      kicker: "07",
      title: "Рост",
      body: "Аналитика, оптимизация и партнёрская сеть масштабируют уже работающую модель.",
      artifact: "growth",
    },
  ],
  artifactCaption: {
    seed: "Вход: идея, действующий бизнес или объём капитала.",
    bars: "Аналитика рынка: спрос, конкуренты и юнит-экономика.",
    grid: "Модель: сегменты, монетизация, каналы и стоимость привлечения.",
    brand: "Айдентика: позиционирование, голос и визуальная система.",
    product: "Цифровой продукт: кабинеты, расчёты, интеграции и данные.",
    ai: "AI-агенты в операциях: контент, инбокс продаж, расчёты по каталогу.",
    funnel: "Продажи: поток обращений, квалификация и сделки.",
    growth: "Рост: метрики, оптимизация и партнёрская сеть.",
  },
  artifactLabel: {
    bars: "спрос · конкуренты",
    product: "кабинеты · расчёты",
    ai: "RAG · агенты",
    funnel: "обращения → сделки",
    growth: "метрики · сеть",
  },
};

const operatingEn = {
  stages: [
    { n: "01", t: "Research & Data", d: "AI continuously monitors competitors and intent" },
    { n: "02", t: "Strategy & Model", d: "Human leadership sets targets and boundaries" },
    { n: "03", t: "Production Drafts", d: "AI synthesizes code, assets, copy, and quotes" },
    { n: "04", t: "Human Approval", d: "1-click review via Telegram or unified inbox" },
    { n: "05", t: "Execution", d: "Automated distribution via Meta & API pipelines" },
    { n: "06", t: "Optimization", d: "Closed-loop refinement based on conversions" },
  ],
  aiColumn: {
    kicker: "AI Core (Speed & Repetitive Ops)",
    title: "Continuous Throughput & Speed",
    lead: "Repetitive tasks, market monitoring, content drafts, and immediate inquiry handling run without human delay.",
    items: [
      "Continuous competitor and trend intelligence",
      "Automated content, visual drafts & Reels storyboards",
      "First reply in messengers and on the site, then a handoff to a person",
      "Pre-qualification of inbound commercial inquiries",
      "Deterministic quote and spec calculations by formulas",
      "Automated analytics reporting & cohort analysis",
    ],
  },
  humanColumn: {
    kicker: "Human Control (Strategy & Trust)",
    title: "Business Judgment & Hard-Floor Guard",
    lead: "A person approves binding commitments and prices before they go live.",
    items: [
      "Strategic business decisions, model structuring and positioning",
      "Final approval of marketing posts & quotes in Telegram",
      "Negotiation of enterprise contracts & custom milestones",
      "Supervision of brand voice, guidelines, and ethics",
      "Approval of legally binding commercial commitments",
      "Capital allocation and partner network governance",
    ],
  },
};

const operatingRu = {
  stages: [
    { n: "01", t: "Исследование и данные", d: "AI непрерывно анализирует рынок и аудиторию" },
    { n: "02", t: "Стратегия и модель", d: "Человек определяет цели и экономические рамки" },
    { n: "03", t: "Черновики производства", d: "AI формирует код, тексты, визуалы и расчёты" },
    { n: "04", t: "Согласование человеком", d: "Апрув в 1 клик через Telegram или рабочий инбокс" },
    { n: "05", t: "Исполнение", d: "Автоматическая публикация и доставка клиентам" },
    { n: "06", t: "Оптимизация", d: "Самообучение алгоритмов на конверсиях" },
  ],
  aiColumn: {
    kicker: "AI берёт на себя (скорость и рутина)",
    title: "Скорость, объём и автоматизация 24/7",
    lead: "Рутинные операции, сбор данных, черновики контента и моментальные ответы не требуют ручного труда.",
    items: [
      "Непрерывный мониторинг конкурентов и трендов",
      "Генерация контента, визуалов и сценариев Reels",
      "Первый ответ в мессенджерах и на сайте, затем передача человеку",
      "Первичная квалификация входящих обращений",
      "Расчёт сложных спецификаций по каталогам и формулам",
      "Формирование регулярных аналитических отчётов",
    ],
  },
  humanColumn: {
    kicker: "Человек контролирует (стратегия и доверие)",
    title: "Контроль качества и юридический барьер",
    lead: "Обязательства и цены публикуются после согласования человеком.",
    items: [
      "Утверждение ключевых бизнес-стратегий и позиционирования",
      "Финальный аппрув коммерческих предложений и постов в Telegram",
      "Ведение переговоров по крупным контрактам и спецпроектам",
      "Контроль соблюдения бренд-гайдов и тональности",
      "Принятие юридических и финансовых обязательств",
      "Управление структурой капитала и партнёрской сетью",
    ],
  },
};

const publicChromeEn = {
  footer: {
    ventureTagline: "Venture and Marketing",
    taglineUpper: "AI-Native Venture & Marketing Company",
    blurb:
      "From Idea to Business. Researching markets, building digital products, deploying proprietary AI infrastructure, and scaling marketing and sales operations.",
    capabilities: "Capabilities",
    businessCreation: "Business Creation",
    digitalProduction: "Digital Production",
    endToEndPipeline: "End-to-End Pipeline",
    aiOperatingModel: "AI Operating Model",
    commercialModel: "Commercial Model",
    aiProducts: "AI Products",
    showroomAi: "Showroom AI — AI Sales Agent",
    allProducts: "All Products →",
    venture: "Venture",
    partnerNetwork: "Partner Network",
    investors: "Investors",
    whyNow: "Why Now",
    discussProject: "Discuss a Project",
    payCrypto: "Pay USDT / USDC",
    rights: "All rights reserved.",
    taglineShort: "From Idea to Business",
  },
  manifesto: {
    eyebrow: "How we think",
    statementA: "We don't promise profit.",
    statementB: "We reduce the cost of being wrong.",
    principles: [
      {
        n: "01",
        t: "AI prepares — humans decide",
        d: "Routine and drafts run on algorithms; strategy and the final call stay with people.",
      },
      {
        n: "02",
        t: "One infrastructure",
        d: "Venture creation, product, marketing and sales run as a single contour — not ten contractors.",
      },
      {
        n: "03",
        t: "Speed without losing control",
        d: "Faster where it is safe. Human approval where commitments and money are involved.",
      },
      {
        n: "04",
        t: "Decisions from data",
        d: "Demand, unit economics and competitors — before the budget, not after.",
      },
    ],
  },
  heroExtra: {
    lede: "AI MARK brings market research, digital products, AI infrastructure and marketing into one operating path — from a first hypothesis to launch and growth.",
    primaryCta: "Find your starting point",
    secondaryCta: "See how it works",
    footnote: "One connected system — not a bundle of disconnected vendors.",
    pillarsLabel: "The work moves across",
    pillars: ["Market & model", "Digital product", "AI & growth"],
    captionKicker: "THE OPERATING LOOP",
    caption: "Research, build, approve, launch — then keep learning.",
    heroAlt: "Emerald glass forms linked by lines of light",
  },
  backButton: { defaultLabel: "Back to Home" },
  consultationModal: {
    submitError:
      "Failed to send. Please check your info or contact hello@ai-mark.agency",
    successTitle: "Request Received Successfully",
    successBody:
      "Thank you! Our engineering team will reach out within 15–30 minutes to coordinate deployment for {productName}.",
    close: "Close",
    requestTitle: "Deployment Request",
    requestLead: "Fill out the brief form below to schedule a direct product walkthrough.",
    nameLabel: "Your Name *",
    namePlaceholder: "Alex",
    companyLabel: "Company / Brand *",
    companyPlaceholder: "Company or project name",
    messengerPlaceholder: "@username or phone",
    goalsLabel: "Goals, scope or comments",
    goalsPlaceholder: "Briefly specify your niche, current inquiry or content volume...",
    privacyNote: "Strict NDA · Zero spam",
    sending: "Sending...",
    submit: "Submit Request",
    closeAria: "Close",
  },
  digitalProductionHubCard: { cta: "Digital Production" },
  digitalProductionShowcase: {
    digitalCore: "Digital Core",
    engineeringStandards: "Engineering Standards:",
    requestEstimate: "Request Scope Estimate →",
    categories: [
      {
        id: "saas",
        name: "SaaS & Web Applications",
        badge: "High Scale",
        headline: "Complex Web Platforms, Workspaces & Multi-Tenant SaaS Engines",
        desc: "Engineering production software with role-based access, automated billing, end-to-end telemetry, and fault-tolerant cloud backends.",
        specs: [
          "Next.js / TypeScript / Tailwind",
          "Multi-tenant data isolation",
          "Real-time synchronization",
          "Integrated AI agent layer",
        ],
      },
      {
        id: "portals",
        name: "Portals & Operations",
        badge: "Enterprise",
        headline: "Customer Portals, Operational Dashboards & ERP Integrations",
        desc: "Interfaces designed for order orchestration, catalogue management, quoting logic, and automated client communication.",
        specs: [
          "Secure API Gateway",
          "Connectors to 1C, Bitrix24, Kommo",
          "Automated PDF specification engine",
          "Conversion funnel telemetry",
        ],
      },
      {
        id: "ecommerce",
        name: "E-Commerce & Marketplaces",
        badge: "Transactional",
        headline: "Transactional Digital Showrooms, Catalogs & Order Systems",
        desc: "Ultra-fast product and service catalogues featuring sub-second search, configuration calculators, and multi-currency checkout.",
        specs: [
          "High-SKU performant catalogues",
          "Real-time parameter configurators",
          "Payment processing & installment gateways",
          "Strict Core Web Vitals optimization",
        ],
      },
      {
        id: "ai-engines",
        name: "AI Engines & Automation",
        badge: "Proprietary",
        headline: "Custom AI Agent Pipelines & Autonomous Business Workflows",
        desc: "Integrating LLMs, RAG knowledge retrieval, autonomous messaging agents, and algorithmic quotation generators.",
        specs: [
          "RAG on corporate documentation",
          "WhatsApp Cloud API & Telegram bots",
          "Hard-Floor safety guardrails",
          "Zero client data leakage",
        ],
      },
    ],
  },
  businessCreationVisual: {
    startingLabel: "Your starting scenario:",
    tabWithIdea: "💡 Have an Idea / Business",
    tabCapital: "💼 Have Capital, Need an Idea",
    chainKicker: "AI MARK Value Chain",
    chainLine:
      "Idea / Capital → Research → Model → Brand → Product → AI → Marketing → Sales → Growth",
    chainNote:
      "Clients do not need to assemble ten separate contractors. AI MARK delivers a unified, tightly integrated operating system.",
    discussCta: "Discuss Concept",
    responsibleNotice:
      "Responsible venture approach: we stress-test models against empirical data. We do not guarantee returns, but we systematically mitigate early-stage execution risk.",
    withIdeaPoints: [
      {
        title: "Market & Opportunity Audit",
        desc: "Assessing genuine demand, barrier to entry, regulatory requirements, and niche growth.",
      },
      {
        title: "Competitor Intelligence",
        desc: "Analyzing strengths, weaknesses, traffic acquisition strategies, and pricing of rivals.",
      },
      {
        title: "Unit Economics Modeling",
        desc: "Calculating CAC, LTV, expected margins, and break-even milestones before scaling budgets.",
      },
      {
        title: "Value Proposition & Brand",
        desc: "Refining core offer, differentiation angles, and structuring the product portfolio.",
      },
    ],
    capitalPoints: [
      {
        title: "Market Window Sourcing",
        desc: "Screening fragmented and inefficient market niches matched to your capital volume.",
      },
      {
        title: "3–4 Curated Business Concepts",
        desc: "Formulating vetted concepts complete with investment scope and timeline horizons.",
      },
      {
        title: "Model Architecture Selection",
        desc: "Choosing optimal structure: B2B SaaS, specialized e-commerce, high-ticket services, or agency.",
      },
      {
        title: "Turnkey Venture Build",
        desc: "Assuming full responsibility for digital production, branding, AI workflows, and launch.",
      },
    ],
  },
  partnerNetworkVisual: {
    commissionKicker: "How commission works",
    commissionTitle: "5-level partner distribution with commission on client revenue",
    commissionLink: "All rates and terms →",
    mechanic: ["Personal sale", "Team sales", "Up to 5 levels", "Commission"],
    programTitle: "The AI MARK Partner Program",
    programLead:
      "Sell AI MARK products and digital solutions, and earn commission on qualified customer sales. Build your own partner network and develop your market together with AI MARK.",
    programCta: "More about partner program",
    partnerTypes: [
      {
        id: "regional",
        title: "Regional Partners",
        tag: "Territory",
        desc: "Expanding AI MARK presence in specific geographic jurisdictions, onboarding local enterprises and managing regional accounts.",
        roles: ["Local business development", "Territory agreements", "Customer success"],
      },
      {
        id: "industry",
        title: "Industry Partners",
        tag: "Verticals",
        desc: "Domain specialists (automotive, construction, retail, real estate) embedding SHOWROOM AI / AI Sales Agent and sales tools into their industry networks.",
        roles: ["Domain-specific catalogs", "Vertical deployment", "Specialized ERP flows"],
      },
      {
        id: "agency",
        title: "Agency Partners",
        tag: "Infrastructure",
        desc: "Digital and marketing agencies licensing AIME and AI Business Assistant to scale client deliverables without headcount expansion.",
        roles: ["Multi-client licensing", "Turnkey operations", "High gross margins"],
      },
      {
        id: "referral",
        title: "Referral & Strategic Introducers",
        tag: "Network",
        desc: "Enterprise consultants, software advisors, and venture scouts connecting qualified corporate opportunities to AI MARK.",
        roles: ["Executive introductions", "Success-based commission", "Joint initiatives"],
      },
    ],
    networkNodes: [
      { label: "Client Enterprise", sub: "Opportunity initiation", type: "input" },
      { label: "Partner Node", sub: "Territory / Domain interface", type: "node" },
      { label: "AI MARK Platform", sub: "Products, AI core, production", type: "core" },
      { label: "Operating Growth", sub: "Scaled revenue & ops", type: "output" },
    ],
  },
  homeRest: {
    pipelineBandTitle: "From one starting point to a joined-up business",
    pipelineSteps: ["Research", "Product", "AI infrastructure", "Marketing & sales"],
    startEyebrow: "Choose the work in front of you",
    startTitle: "One team. Three ways in.",
    startLead:
      "Start with the immediate need: a ready AI product, focused delivery by a team, or the path from an idea to a working business.",
    entries: [
      {
        href: "/products",
        kicker: "01 / AI products",
        title: "Put a ready AI tool to work.",
        body: "AI Marketing Employee, AI Business Assistant and SHOWROOM AI each handle a different part of the work.",
      },
      {
        href: "/digital-production",
        kicker: "02 / Services & production",
        title: "Bring in a team for a defined job.",
        body: "Marketing support or a custom digital build, shaped around the task rather than a packaged SKU.",
      },
      {
        href: "/how-it-works",
        kicker: "03 / Business creation",
        title: "Test the idea before building.",
        body: "Research demand, form a business model, create the product and develop a route to market.",
      },
    ],
    productsEyebrow: "01 / Ready AI products",
    productsTitle: "Different tools for different jobs.",
    productsLead:
      "Product access is a subscription. It is separate from a marketing-team retainer or a custom production project.",
    detailsLink: "Details",
    teamEyebrow: "02 / Team, production and technology",
    teamTitle: "A team engagement is not a subscription.",
    teamLead:
      "Choose ongoing marketing support, a scoped digital project, or a combination. AI products connect when needed.",
    retainerTag: "Retainer / ongoing work",
    retainerTitle: "AI marketing and growth",
    retainerBody:
      "Team work on strategy, marketing, sales and automation. Scope follows the task.",
    projectTag: "Project / custom build",
    projectTitle: "Digital production and AI engineering",
    projectBody: "Sites, apps, cabinets, integrations, automation and custom AI for a defined brief.",
    projectLink: "About digital production",
    stagesEyebrow: "03 / Business creation",
    stagesTitle: "Test the market before building the system.",
    stagesLead:
      "Start from an idea, an operating business, or capital. Research and economics come before any claim about scale.",
    stageCards: [
      ["Idea or capital", "Name the starting point and the question to test."],
      ["Market research", "Study demand, competitors and constraints."],
      ["Business model", "Define the customer, offer and monetization."],
      ["Brand", "Set positioning and the brand voice."],
      ["Digital product", "Build the operating base of the business."],
      ["AI infrastructure", "Put AI into the work that repeats."],
      ["Marketing and sales", "Take the offer to customers."],
      ["Growth", "Develop the model that is already working."],
    ],
    whyTitle: "Test demand and economics before promising a result.",
    whyLead: "The public process does not promise profit or a guaranteed result.",
    allStagesLink: "All stages",
    pillarCards: [
      ["Research first", "Start from the market, the customer and the economics, not from a pre-chosen solution."],
      ["AI helps people", "Automate useful work and keep decisions and approvals with people."],
      ["The fitting format", "A subscription, a team service and a custom build stay different models."],
    ],
    contactEyebrow: "Next step",
    contactTitle: "Tell us where you are starting.",
    contactLead:
      "An idea, a live business, marketing, or a digital product — start from the job that needs doing.",
  },
  pricingPage: {
    retainersHeading: "Marketing Department Retainers",
    retainersSub: "Recurring monthly scope",
    retainersNote:
      "Ongoing human-in-the-loop marketing: AI generates drafts, senior human signs off. Ad spend billed separately.",
    popular: "Popular",
    perMonth: "/mo",
    customScope: "Custom scope — discuss",
    otherFormats: "Other Collaboration Formats",
    formatLabel: "Format",
    discussProject: "Discuss project →",
    aiProducts: "AI Products",
    aiMarketingServices: "AI Marketing Services",
    fromPrice: "from $500+",
    byScope: "by scope",
    digitalProductionLink: "Digital Production →",
    customProposalTitle: "Need a custom proposal or hybrid scope?",
    openChat: "Open chat",
  },
  partnersPage: {
    heroSteps: ["Personal sale", "Team sales", "Up to 5 levels", "Up to 80%"],
    networkSketch: "Network sketch",
    networkTerms: "Network terms",
    globalExpansion: "Global expansion",
    leaveContacts: "Leave your contacts",
  },
  payPage: {
    metadataTitle: "Payment instruction",
    title: "Send to an AI MARK address",
    lead: "Send the exact amount to this address. Funds go to the owner wallet, not a merchant balance.",
    product: "Product",
    listPrice: "List price",
    assetNetwork: "Asset / network",
    status: "Status",
    amountUnique: "Amount to send (unique)",
    treasuryAddress: "Treasury address",
    memo: "Memo / note (if your wallet supports it)",
    footnote:
      "The unique cents identify this payment. The memo matches this link. Do not send from another network. Cards are not accepted here.",
    anotherProduct: "Another product",
  },
};

const publicChromeRu = {
  footer: {
    blurb:
      "От идеи до работающего бизнеса. Исследуем рынки, строим цифровые продукты, разворачиваем AI-инфраструктуру, запускаем маркетинг и продажи.",
    capabilities: "Контуры",
    businessCreation: "Создание бизнеса",
    digitalProduction: "Цифровое производство",
    endToEndPipeline: "Сквозной процесс",
    aiOperatingModel: "Операционная AI-модель",
    commercialModel: "Коммерческая модель",
    aiProducts: "AI-продукты",
    showroomAi: "Showroom AI — AI-продавец",
    allProducts: "Все продукты →",
    venture: "Компания",
    partnerNetwork: "Партнёрская сеть",
    investors: "Инвесторам",
    whyNow: "Почему сейчас",
    discussProject: "Обсудить проект",
    payCrypto: "Оплата USDT / USDC",
    rights: "Все права защищены.",
    taglineShort: "От идеи до работающего бизнеса",
  },
  manifesto: {
    eyebrow: "Как мы думаем",
    statementA: "Мы не обещаем прибыль.",
    statementB: "Мы снижаем стоимость ошибки.",
    principles: [
      {
        n: "01",
        t: "AI готовит — человек решает",
        d: "Рутина и черновики на алгоритмах, стратегия и финальное решение — за человеком.",
      },
      {
        n: "02",
        t: "Одна инфраструктура",
        d: "Создание бизнеса, продукт, маркетинг и продажи работают как единый контур, а не десять подрядчиков.",
      },
      {
        n: "03",
        t: "Скорость без потери контроля",
        d: "Быстрее там, где это безопасно. Ручной апрув там, где есть обязательства и деньги.",
      },
      {
        n: "04",
        t: "Решения от данных",
        d: "Спрос, юнит-экономика и конкуренты — до бюджета, а не после.",
      },
    ],
  },
  heroExtra: {
    lede: "AI MARK объединяет исследование рынка, цифровые продукты, AI-инфраструктуру и маркетинг — от первой гипотезы до запуска и роста.",
    primaryCta: "Выбрать точку входа",
    secondaryCta: "Как устроен процесс",
    footnote: "Единая система работы вместо набора разрозненных подрядчиков.",
    pillarsLabel: "В единой системе",
    pillars: ["Рынок и модель", "Цифровой продукт", "AI и рост"],
    captionKicker: "РАБОЧИЙ КОНТУР",
    caption: "Исследовать, создать, согласовать, запустить — и продолжать учиться.",
    heroAlt: "Изумрудные стеклянные формы, соединённые световыми линиями",
  },
  backButton: { defaultLabel: "Вернуться на главную" },
  consultationModal: {
    submitError:
      "Ошибка отправки. Пожалуйста, проверьте данные или напишите на hello@ai-mark.agency",
    successTitle: "Заявка успешно отправлена",
    successBody:
      "Спасибо! Наша команда свяжется с вами в течение 15–30 минут для согласования подключения {productName}.",
    close: "Закрыть",
    requestTitle: "Запрос на подключение",
    requestLead: "Заполните короткую форму для расчёта конфигурации и демонстрации.",
    nameLabel: "Ваше имя *",
    namePlaceholder: "Алексей",
    companyLabel: "Компания / Бренд *",
    companyPlaceholder: "ООО или Название проекта",
    goalsLabel: "Задачи, объём или комментарий",
    goalsPlaceholder: "Опишите специфику ниши, текущий объём обращений или контента...",
    privacyNote: "Конфиденциально · Без спама",
    sending: "Отправка...",
    submit: "Отправить заявку",
  },
  digitalProductionHubCard: { cta: "Цифровое производство" },
  homeRest: {
    pipelineBandTitle: "От первой точки — к целостному бизнесу",
    pipelineSteps: ["Исследование", "Продукт", "AI-инфраструктура", "Маркетинг и продажи"],
    startEyebrow: "Выберите текущую задачу",
    startTitle: "Одна команда. Три точки входа.",
    startLead:
      "Начните с того, что нужно сейчас: готовый AI-продукт, работа команды над конкретной задачей или путь от идеи до работающего бизнеса.",
    entries: [
      {
        href: "/products",
        kicker: "01 / AI-продукты",
        title: "Подключить готовый AI-инструмент.",
        body: "AI Marketing Employee, AI Business Assistant и SHOWROOM AI решают разные задачи.",
      },
      {
        href: "/digital-production",
        kicker: "02 / Услуги и производство",
        title: "Привлечь команду под задачу.",
        body: "Маркетинговое сопровождение или заказная цифровая разработка — под конкретный объём работ.",
      },
      {
        href: "/how-it-works",
        kicker: "03 / Создание бизнеса",
        title: "Проверить идею до разработки.",
        body: "Исследовать спрос, сформировать бизнес-модель, создать продукт и продумать выход к клиентам.",
      },
    ],
    productsEyebrow: "01 / Готовые AI-продукты",
    productsTitle: "Разные инструменты для разных задач.",
    productsLead:
      "Подписка даёт доступ к продукту и отличается от ретейнера маркетинговой команды и заказного цифрового проекта.",
    detailsLink: "Подробнее",
    teamEyebrow: "02 / Команда, разработка и технологии",
    teamTitle: "Работа команды — не то же самое, что подписка.",
    teamLead:
      "Выберите регулярную поддержку маркетинга, цифровой проект в согласованном объёме или сочетание форматов.",
    retainerTag: "Ретейнер / регулярная работа",
    retainerTitle: "AI-маркетинг и развитие",
    retainerBody:
      "Работа команды по стратегии, маркетингу, продажам и автоматизации. Объём согласуется с задачей.",
    projectTag: "Проект / заказная разработка",
    projectTitle: "Digital production и AI engineering",
    projectBody:
      "Сайты, приложения, кабинеты, интеграции, автоматизация и custom AI — под конкретное задание.",
    projectLink: "О цифровом производстве",
    stagesEyebrow: "03 / Создание бизнеса",
    stagesTitle: "Сначала проверить рынок. Потом строить систему.",
    stagesLead:
      "Можно начать с идеи, действующего бизнеса или капитала. Исследование и экономика предшествуют предположениям о масштабировании.",
    stageCards: [
      ["Идея или капитал", "Определяем исходную точку и вопрос для проверки."],
      ["Исследование рынка", "Изучаем спрос, конкурентов и ограничения."],
      ["Бизнес-модель", "Определяем клиента, предложение и монетизацию."],
      ["Бренд", "Формируем позиционирование и голос бренда."],
      ["Цифровой продукт", "Создаём операционную основу бизнеса."],
      ["AI-инфраструктура", "Встраиваем AI в полезные процессы."],
      ["Маркетинг и продажи", "Выводим предложение к клиентам."],
      ["Рост", "Развиваем работающую модель."],
    ],
    whyTitle: "Проверяйте спрос и экономику до обещаний о результате.",
    whyLead: "В публичном описании процесса не обещается гарантированная прибыль или результат.",
    allStagesLink: "Все этапы",
    pillarCards: [
      ["Сначала исследование", "Начните с рынка, клиента и экономики, а не с заранее выбранного решения."],
      ["AI помогает людям", "Автоматизируйте полезную работу, сохраняя решения и согласования за людьми."],
      ["Подходящий формат", "Подписка, сервис команды и заказная разработка остаются разными моделями."],
    ],
    contactEyebrow: "Следующий шаг",
    contactTitle: "Расскажите, с чего вы начинаете.",
    contactLead:
      "Идея, действующий бизнес, маркетинг или цифровой продукт — начните с задачи, которую нужно решить.",
  },
  pricingPage: {
    retainersHeading: "Пакеты отдела маркетинга",
    retainersSub: "Оплата за выбранный план",
    retainersNote:
      "Постоянный HITL-маркетинг: AI генерирует, человек утверждает. Медиабюджет оплачивается отдельно.",
    popular: "Чаще начинают отсюда",
    perMonth: "/мес",
    customScope: "Другой скоуп — обсудить",
    otherFormats: "Другие форматы сотрудничества",
    formatLabel: "Формат",
    discussProject: "Обсудить проект →",
    aiProducts: "AI-продукты",
    aiMarketingServices: "AI-маркетинговые услуги",
    fromPrice: "от $500+",
    byScope: "по скоупу",
    digitalProductionLink: "Цифровое производство →",
    customProposalTitle: "Нужен индивидуальный расчёт или комбинированный скоуп?",
    openChat: "Открыть чат",
  },
  partnersPage: {
    heroSteps: ["Личная продажа", "Продажи команды", "До 5 уровней", "До 80%"],
    networkSketch: "Схема сети",
    networkTerms: "Условия сети",
    globalExpansion: "Глобальное расширение",
    leaveContacts: "Оставить контакты",
  },
  payPage: {
    metadataTitle: "Инструкция оплаты",
    title: "Перевод на адрес AI MARK",
    lead: "Отправьте точную сумму на этот адрес. Деньги идут сразу на кошелёк владельца, не на баланс мерчанта.",
    product: "Продукт",
    listPrice: "Прайсовая сумма",
    assetNetwork: "Стейбл / сеть",
    status: "Статус",
    amountUnique: "Сумма к отправке (уникальная)",
    treasuryAddress: "Адрес казны",
    memo: "Memo / примечание (если кошелёк умеет)",
    footnote:
      "Уникальные центы в сумме нужны, чтобы отличить этот платёж. Memo совпадает со ссылкой. Не отправляйте с другой сети. Оплата картой здесь не принимается.",
    anotherProduct: "Другой продукт",
  },
};

function deepMerge(base, patch) {
  if (!patch) return structuredClone(base);
  if (Array.isArray(patch)) return patch.slice();
  if (typeof patch !== "object") return patch;
  const out = structuredClone(base);
  for (const key of Object.keys(patch)) {
    const pv = patch[key];
    const bv = out[key];
    if (
      pv &&
      typeof pv === "object" &&
      !Array.isArray(pv) &&
      bv &&
      typeof bv === "object" &&
      !Array.isArray(bv)
    ) {
      out[key] = deepMerge(bv, pv);
    } else {
      out[key] = pv;
    }
  }
  return out;
}

const ideaByLocale = {};
const operatingByLocale = {};
const chromeByLocale = {};

for (const loc of LOCALES) {
  ideaByLocale[loc] =
    loc === "en" ? ideaEn : loc === "ru" ? ideaRu : deepMerge(ideaEn, loc === "es" ? { eyebrow: "Contorno continuo", title: "Cómo una idea se convierte en un negocio en marcha.", stagesOverviewTitle: "Cada etapa del contorno" } : {});
  operatingByLocale[loc] =
    loc === "en" ? operatingEn : loc === "ru" ? operatingRu : deepMerge(operatingEn, {});
  chromeByLocale[loc] =
    loc === "en"
      ? publicChromeEn
      : loc === "ru"
        ? deepMerge(publicChromeEn, publicChromeRu)
        : deepMerge(publicChromeEn, loc === "es" ? { footer: { capabilities: "Capacidades", businessCreation: "Creación de negocio" } } : {});
}

writeFileSync(
  new URL("../content/sections/idea-to-business.ts", import.meta.url),
  `import type { Locale } from "@/lib/site";

export type IdeaStageCopy = {
  kicker: string;
  title: string;
  body: string;
  artifact: string;
};

export type IdeaToBusinessCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  stagesOverviewTitle: string;
  stages: IdeaStageCopy[];
  artifactCaption: Record<string, string>;
  artifactLabel: Record<string, string>;
  artifactMicro: { seed: string };
};

export const ideaToBusinessCopy: Record<Locale, IdeaToBusinessCopy> = ${JSON.stringify(ideaByLocale, null, 2)} as Record<Locale, IdeaToBusinessCopy>;

export function getIdeaToBusinessCopy(locale: Locale): IdeaToBusinessCopy {
  return ideaToBusinessCopy[locale] ?? ideaToBusinessCopy.en;
}
`,
);

writeFileSync(
  new URL("../content/sections/operating-model.ts", import.meta.url),
  `import type { Locale } from "@/lib/site";

export type OperatingModelCopy = {
  stages: { n: string; t: string; d: string }[];
  aiColumn: { kicker: string; title: string; lead: string; items: string[] };
  humanColumn: { kicker: string; title: string; lead: string; items: string[] };
};

export const operatingModelCopy: Record<Locale, OperatingModelCopy> = ${JSON.stringify(operatingByLocale, null, 2)} as Record<Locale, OperatingModelCopy>;

export function getOperatingModelCopy(locale: Locale): OperatingModelCopy {
  return operatingModelCopy[locale] ?? operatingModelCopy.en;
}
`,
);

writeFileSync(
  new URL("../content/sections/public-chrome.ts", import.meta.url),
  `import type { Locale } from "@/lib/site";

export type PublicChromeCopy = typeof publicChromeCopy.en;

export const publicChromeCopy = ${JSON.stringify(chromeByLocale, null, 2)} as Record<Locale, PublicChromeCopy> & { en: PublicChromeCopy };

export function getPublicChromeCopy(locale: Locale): PublicChromeCopy {
  return publicChromeCopy[locale] ?? publicChromeCopy.en;
}
`,
);

writeFileSync(
  new URL("../content/sections/index.ts", import.meta.url),
  `export {
  getIdeaToBusinessCopy,
  ideaToBusinessCopy,
  type IdeaToBusinessCopy,
  type IdeaStageCopy,
} from "./idea-to-business";
export {
  getOperatingModelCopy,
  operatingModelCopy,
  type OperatingModelCopy,
} from "./operating-model";
export {
  getPublicChromeCopy,
  publicChromeCopy,
  type PublicChromeCopy,
} from "./public-chrome";
`,
);

console.log("Wrote section i18n bundles for", LOCALES.length, "locales");
