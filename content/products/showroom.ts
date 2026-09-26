import type { Locale } from "@/lib/site";

export interface ShowroomIndustry {
  id: "furniture" | "automotive" | "retail" | "real-estate" | "services" | "construction";
  name: string;
  title: string;
  desc: string;
  tags: string[];
  metrics: { label: string; val: string }[];
}

export interface ShowroomCapability {
  num: string;
  title: string;
  desc: string;
}

export interface ShowroomStep {
  num: string;
  label: string;
  desc: string;
}

export interface ShowroomContent {
  seoTitle: string;
  seoDescription: string;
  badge: string;
  title: string;
  tagline: string;
  subtitle: string;
  ctaConsult: string;
  ctaExplore: string;
  heroMeta: string[];
  heroSpec: {
    title: string;
    status: string;
    rows: { n: string; label: string; tag: string }[];
  };
  industriesTitle: string;
  industriesSub: string;
  industries: ShowroomIndustry[];
  archFlowTitle: string;
  archFlow: { step: string; name: string; desc: string }[];
  capabilitiesTitle: string;
  capabilitiesSub: string;
  capabilities: ShowroomCapability[];
  workflowTitle: string;
  workflowSub: string;
  workflowSteps: ShowroomStep[];
  deterministicTitle: string;
  deterministicDesc: string;
  multitenantTitle: string;
  multitenantLead: string;
  multitenantExamples: { title: string; text: string }[];
  pricingTitle: string;
  pricingSub: string;
  pricingDesc: string;
  pricingPoints: string[];
  pricingTiers: {
    name: string;
    price: string;
    period: string;
    desc: string;
    features: string[];
    /**
     * The published payable SKU this tier maps to in `lib/crypto/catalog.ts`.
     *
     * Present only for tiers with a published monthly list price. The
     * Enterprise tier is custom, so it keeps its contact call-to-action.
     */
    skuId?: string;
  }[];
  faqTitle: string;
  faqSub: string;
  faqs: { q: string; a: string }[];
}

export const showroomRu: ShowroomContent = {
  seoTitle: "SHOWROOM AI — AI-продавец | Диалоги, подбор, расчёт и коммерческие предложения · AI MARK",
  seoDescription:
    "AI-продавец, который общается с клиентами, понимает их потребность, работает с каталогом и бизнес-правилами, рассчитывает предложение и готовит коммерческое предложение для отдела продаж. Мебель, авто, строительство, недвижимость, ритейл и B2B.",
  badge: "Собственный AI-продукт · AI MARK",
  title: "SHOWROOM AI",
  tagline: "AI-продавец",
  subtitle:
    "AI-продавец, который общается с клиентами, понимает их потребность, работает с каталогом и бизнес-правилами, рассчитывает предложение и готовит коммерческое предложение для отдела продаж. Закрывает значительную часть продажного workflow и передаёт подготовленную сделку команде.",
  ctaConsult: "Запросить конфигурацию",
  ctaExplore: "Как проходит сделка",
  heroMeta: [
    "Мультиотраслевая адаптация",
    "Детерминированный расчёт",
    "Автоматическая генерация PDF",
    "Multi-Tenant архитектура",
  ],
  heroSpec: {
    title: "SHOWROOM AI Core / Статус среды",
    status: "Пример",
    rows: [
      { n: "01", label: "Multi-Tenant контекст каталога", tag: "Изолирован" },
      { n: "02", label: "Движок формул и бизнес-правил", tag: "Детерминирован" },
      { n: "03", label: "Отраслевой конфигуратор параметров", tag: "Активен" },
      { n: "04", label: "Валидация спецификации и цены", tag: "По правилам" },
      { n: "05", label: "Генератор PDF коммерческих предложений", tag: "Документ" },
      { n: "06", label: "Handoff в CRM и менеджеру", tag: "Синхронизирован" },
    ],
  },
  industriesTitle: "Единое ядро. Конфигурация под любую отрасль.",
  industriesSub:
    "SHOWROOM AI не привязан к одной нише. Архитектура разделяет общее AI-ядро и отраслевой слой правил, каталогов и формул расчёта.",
  industries: [
    {
      id: "furniture",
      name: "Мебель & Интерьер",
      title: "Фабрики мебели, шоурумы и заказные производства",
      desc: "Учитывает размеры под заказ, категории обивочных тканей, модульные конфигурации, повышающие коэффициенты и формирует детальную спецификацию изделия.",
      tags: ["Кастомные габариты", "Категории тканей", "Формулы наценок", "Спецификация для фабрики"],
      metrics: [
        { label: "Расчёт", val: "По вашим формулам" },
        { label: "Результат", val: "Спецификация" },
      ],
    },
    {
      id: "automotive",
      name: "Автомобильный бизнес",
      title: "Автосалоны, дилерские центры и импортёры техники",
      desc: "Ориентируется в комплектациях, пакетах опций, актуальных остатках на складах, программах трейд-ин, лизинге и формирует персональное предложение на автомобиль.",
      tags: ["Комплектации & пакеты", "Складской учёт", "Трейд-ин скоринг", "Лизинговый расчёт"],
      metrics: [
        { label: "Комплектация", val: "Из каталога" },
        { label: "Предложение", val: "Для менеджера" },
      ],
    },
    {
      id: "construction",
      name: "Строительство & Материалы",
      title: "Строительные компании, подрядчики и оптовые базы",
      desc: "Считывает площади, технологические требования и чертежи, подбирает номенклатуру материалов по каталогу и рассчитывает сметную стоимость объекта.",
      tags: ["Сметный расчёт", "Строительные нормы", "Объёмы и площади", "Ведомость материалов"],
      metrics: [
        { label: "Объёмы", val: "Из запроса" },
        { label: "Результат", val: "Смета по правилам" },
      ],
    },
    {
      id: "real-estate",
      name: "Недвижимость & Девелопмент",
      title: "Застройщики, агентства недвижимости и управляющие компании",
      desc: "Находит квартиры и коммерческие помещения по планировкам, метражу и этажности, рассчитывает график рассрочки или ипотеки и генерирует презентационный буклет.",
      tags: ["База планировок", "Графики рассрочки", "Бронирование визита", "Презентационные PDF"],
      metrics: [
        { label: "Подбор", val: "По параметрам" },
        { label: "Результат", val: "График и буклет" },
      ],
    },
    {
      id: "retail",
      name: "Ритейл & Дистрибуция",
      title: "Оптовые поставщики, B2B-дистрибьюторы и маркетплейсы",
      desc: "Работает с крупным каталогом, учитывает оптовые градации цен, скидки от объёма партии и правила остатков.",
      tags: ["Большие каталоги SKU", "Оптовые скидки", "Минимальные партии", "Резервирование"],
      metrics: [
        { label: "Каталог", val: "Правила и партии" },
        { label: "Результат", val: "Счёт по правилам" },
      ],
    },
    {
      id: "services",
      name: "Услуги & B2B-сервисы",
      title: "Консалтинг, инжиниринг, аудит и проектные компании",
      desc: "Структурирует пакеты услуг, оценивает трудозатраты специалистов по часовым ставкам, собирает поэтапный график проекта и выдаёт структурированное КП.",
      tags: ["Оценка трудозатрат", "Этапы проекта", "Тарифная сетка", "Договорной бриф"],
      metrics: [
        { label: "Скоуп", val: "Этапы и ставки" },
        { label: "Результат", val: "Коммерческое предложение" },
      ],
    },
  ],
  archFlowTitle: "Сквозной процесс обработки запроса",
  archFlow: [
    { step: "01", name: "SHOWROOM AI Core", desc: "Ведёт диалог и принимает запрос клиента на естественном языке" },
    { step: "02", name: "Business Knowledge", desc: "Извлекает каталог, ограничения и формулы цен" },
    { step: "03", name: "Industry Rules", desc: "Применяет специфические отраслевые параметры" },
    { step: "04", name: "Exact Calculation", desc: "Детерминированный математический расчёт без галлюцинаций" },
    { step: "05", name: "PDF Generator", desc: "Выпуск готового коммерческого предложения и счёта" },
  ],
  capabilitiesTitle: "Ключевые возможности платформы",
  capabilitiesSub: "Меньше ручной обработки первого обращения. Менеджер подключается на сложной и финальной коммуникации.",
  capabilities: [
    {
      num: "01",
      title: "Детерминированные формулы без галлюцинаций",
      desc: "LLM используется исключительно для извлечения параметров и диалога; все расчёты производятся строгим математическим кодом.",
    },
    {
      num: "02",
      title: "Сложные параметрические конфигурации",
      desc: "Поддержка сотен зависимых параметров: габариты, материалы, категории, опциональные пакеты и коэффициенты сложности.",
    },
    {
      num: "03",
      title: "Автоматический выпуск брендированных PDF",
      desc: "В один клик генерирует стильный PDF-документ с логотипом компании, спецификацией, ценами, визуализациями и реквизитами.",
    },
    {
      num: "04",
      title: "Синхронизация со складскими остатками",
      desc: "Подключение к 1С, МойСклад или внутренней ERP для проверки доступности и актуальных цен в режиме реального времени.",
    },
    {
      num: "05",
      title: "Омниканальный приём запросов",
      desc: "Клиент может запросить расчёт через форму на сайте, в чате WhatsApp или Telegram — результат придёт в тот же канал.",
    },
    {
      num: "06",
      title: "Передача тёплого лида менеджеру",
      desc: "Менеджер отдела продаж получает не просто контакт, а готовую выверенную спецификацию и сумму сделки в CRM.",
    },
  ],
  workflowTitle: "Пошаговый цикл работы SHOWROOM AI",
  workflowSub: "От входящего сообщения до коммерческого предложения, которое забирает менеджер.",
  workflowSteps: [
    { num: "01", label: "Запрос клиента", desc: "Клиент описывает потребность своими словами или присылает параметры." },
    { num: "02", label: "Сверка с каталогом", desc: "AI находит подходящие позиции в вашей номенклатуре и базе артикулов." },
    { num: "03", label: "Бизнес-правила", desc: "Проверяются ограничения: минимальные партии, допустимые размеры, зависимости опций." },
    { num: "04", label: "Точный расчёт", desc: "Математический модуль применяет формулы стоимости, наценок и налогов." },
    { num: "05", label: "Спецификация", desc: "Формируется прозрачная таблица параметров, материалов и стоимости." },
    { num: "06", label: "PDF-документ", desc: "Система автоматически формирует готовый к отправке PDF-оффер." },
  ],
  deterministicTitle: "Детерминированный расчётный шлюз",
  deterministicDesc:
    "Обычный чат может выдумать цену. В SHOWROOM AI расчёт отделён от текста: AI ведёт диалог, а калькулятор считает по формулам, которые вы задали. Это не гарантия, что в правилах нет ошибки — это отказ считать цену «из воздуха».",
  multitenantTitle: "Изолированная архитектура Multi-Tenant",
  multitenantLead:
    "Данные каждого предприятия, каталоги и коммерческие тайны изолированы на уровне выделенных тенантов.",
  multitenantExamples: [
    {
      title: "Изоляция каталогов и формул",
      text: "Ваши коэффициенты наценок, закрытые прайс-листы поставщиков и алгоритмы расчёта защищены шифрованием и недоступны извне.",
    },
    {
      title: "Индивидуальные шаблоны КП",
      text: "Каждый бизнес настраивает свой фирменный стиль: шрифты, структуру документа, реквизиты, юридические сноски и подписи.",
    },
    {
      title: "Интеграция с корпоративным контуром",
      text: "Подключение к внутренним базам данных и закрытым CRM через защищённые API-ключи и выделенные шлюзы.",
    },
  ],
  pricingTitle: "Тарифные планы SHOWROOM AI",
  pricingSub: "Прозрачная стоимость аренды AI-движка для вашего бизнеса.",
  pricingDesc:
    "Self-serve — $0 за запуск платформы; опциональный DFY-сетап каталога и формул — около $300 разово. Далее фиксированная MRR по квоте расчётов. В каждый тариф входит движок и генератор PDF.",
  pricingPoints: [
    "Self-serve $0 или DFY-сетап ~$300 (по желанию)",
    "Фиксированная ежемесячная подписка $199 / $299",
    "Неограниченное число менеджеров в системе",
    "Генерация брендированных PDF включена",
    "Подключение к веб-сайту и мессенджерам",
  ],
  pricingTiers: [
    {
      name: "Standard",
      price: "$199",
      period: "/ месяц",
      desc: "Для малого бизнеса и шоурумов: до 1 000 позиций в каталоге, стандартные формулы расчёта. Self-serve $0; DFY-сетап ~$300 при необходимости.",
      skuId: "showroom-standard",
      features: [
        "До 1 000 SKU в каталоге",
        "До 500 расчётов КП в месяц",
        "Брендированный PDF-шаблон",
        "Подключение виджета на сайте",
        "Экспорт спецификаций",
      ],
    },
    {
      name: "Business",
      price: "$299",
      period: "/ месяц",
      desc: "Для фабрик и дилеров: сложные параметрические зависимости, неограниченный каталог и CRM-синхронизация.",
      skuId: "showroom-business",
      features: [
        "Неограниченный объём каталога",
        "До 3 000 расчётов КП в месяц",
        "Индивидуальные формулы любой сложности",
        "Интеграция с Bitrix24 / 1C / Kommo",
        "Интеграция с WhatsApp и Telegram",
        "Приоритетная инженерная поддержка",
      ],
    },
    {
      name: "Enterprise",
      price: "По запросу",
      period: "",
      desc: "Для крупных холдингов: выделенная инфраструктура, кастомные ERP-коннекторы и SLA.",
      features: [
        "Выделенный кластер вычислений",
        "Неограниченное число расчётов",
        "Глубокая интеграция с корпоративной ERP",
        "Индивидуальный SLA по доступности",
        "Выделенный архитектор внедрения",
      ],
    },
  ],
  faqTitle: "Вопросы о SHOWROOM AI — AI-продавец",
  faqSub: "Всё о внедрении расчётного движка в коммерческие процессы компании.",
  faqs: [
    {
      q: "Это подходит только для мебельного бизнеса?",
      a: "Нет. SHOWROOM AI — AI-продавец для любых конфигурируемых товаров и услуг: автодилеров, строительства, ритейла, B2B-поставок, недвижимости и услуг. Вся отраслевая специфика настраивается через структуру каталога и формулы.",
    },
    {
      q: "Может ли система ошибиться в цене?",
      a: "Нет. В SHOWROOM AI реализован детерминированный шлюз: AI ведёт диалог и извлекает параметры, а расчёт суммы выполняется математическим модулем по строго заданным формулам компании.",
    },
    {
      q: "Как клиенты получают готовое коммерческое предложение?",
      a: "Система автоматически формирует брендированный PDF-файл с реквизитами, таблицей параметров и ценами. Клиент может скачать его на сайте или получить прямо в чат WhatsApp/Telegram.",
    },
    {
      q: "Как загрузить наш каталог и формулы расчёта?",
      a: "Каталог можно импортировать через Excel, CSV, Google Таблицы или напрямую по API из 1С / МойСклад. Мы помогаем настроить и протестировать формулы на онбординге.",
    },
  ],
};

export const showroomEn: ShowroomContent = {
  seoTitle: "SHOWROOM AI / AI Sales Agent | Customer conversations, quoting & commercial proposals · AI MARK",
  seoDescription:
    "An AI salesperson that talks to customers, understands their needs, works with your product catalog and business rules, calculates the right offer and prepares a commercial proposal for your sales team. Automotive, construction, real estate, furniture, retail, and B2B.",
  badge: "Proprietary AI Platform · AI MARK",
  title: "SHOWROOM AI",
  tagline: "AI Sales Agent",
  subtitle:
    "An AI salesperson that talks to customers, understands their needs, works with your product catalog and business rules, calculates the right offer and prepares a commercial proposal for your sales team. Handles a major part of the sales workflow and prepares the opportunity for your human sales team.",
  ctaConsult: "Request Configuration",
  ctaExplore: "How a deal moves",
  heroMeta: [
    "Cross-Industry Adaptation",
    "Deterministic Pricing Math",
    "Automated PDF Proposal Engine",
    "Multi-Tenant Isolation",
  ],
  heroSpec: {
    title: "SHOWROOM AI Core / Runtime Status",
    status: "Example",
    rows: [
      { n: "01", label: "Multi-Tenant Catalog Context", tag: "Isolated" },
      { n: "02", label: "Formulas & Business Rules Engine", tag: "Deterministic" },
      { n: "03", label: "Industry Configuration Layer", tag: "Active" },
      { n: "04", label: "Specification & Pricing Gate", tag: "By rules" },
      { n: "05", label: "Automated PDF Document Generator", tag: "Document" },
      { n: "06", label: "CRM & Sales Manager Handoff", tag: "Connected" },
    ],
  },
  industriesTitle: "One Unified Core. Configured for Any Industry.",
  industriesSub:
    "SHOWROOM AI is not tethered to a single vertical. The architecture cleanly separates the core AI reasoning engine from industry-specific data schemas, pricing formulas, and document templates.",
  industries: [
    {
      id: "furniture",
      name: "Furniture & Interior",
      title: "Furniture Factories, Showrooms & Custom Millwork",
      desc: "Processes custom dimensions, fabric categories, modular layout configurations, and generates comprehensive factory-ready production specifications.",
      tags: ["Custom Dimensions", "Fabric Tiers", "Markup Logic", "Factory Specs"],
      metrics: [
        { label: "Calculation", val: "By your formulas" },
        { label: "Output", val: "Specification" },
      ],
    },
    {
      id: "automotive",
      name: "Automotive & Dealerships",
      title: "Automotive Dealerships, Importers & Fleet Distributors",
      desc: "Understands vehicle trims, optional packages, current inventory availability, trade-in valuations, and structures bespoke commercial offers.",
      tags: ["Trim Packages", "Stock Availability", "Trade-in Scoring", "Lease Math"],
      metrics: [
        { label: "Configuration", val: "From the catalog" },
        { label: "Output", val: "For the manager" },
      ],
    },
    {
      id: "construction",
      name: "Construction & Materials",
      title: "General Contractors, Builders & Wholesale Materials",
      desc: "Parses architectural requirements, square footage, and project scopes to recommend catalogue items and calculate comprehensive bill of materials.",
      tags: ["Estimate Math", "Building Codes", "Dimensional Scope", "Bill of Materials"],
      metrics: [
        { label: "Quantities", val: "From the request" },
        { label: "Output", val: "Rule-based estimate" },
      ],
    },
    {
      id: "real-estate",
      name: "Real Estate & Developers",
      title: "Residential Developers, Commercial Agencies & Asset Managers",
      desc: "Navigates property floor plans, square footage, installment schedules, or mortgage scenarios and outputs presentation booklets instantly.",
      tags: ["Floor Plan Sync", "Payment Schedules", "Viewing Scheduling", "Presentation PDFs"],
      metrics: [
        { label: "Match", val: "By parameters" },
        { label: "Output", val: "Schedule and booklet" },
      ],
    },
    {
      id: "retail",
      name: "Retail & Wholesale",
      title: "B2B Distributors, Wholesale Suppliers & High-SKU Catalogs",
      desc: "Works with a large catalog, applying volume discounts, minimum quantities, and the stock rules you define.",
      tags: ["High-SKU Catalogs", "Volume Discounts", "Minimum Quantities", "Stock Hold"],
      metrics: [
        { label: "Catalog", val: "Rules and quantities" },
        { label: "Output", val: "Invoice by rules" },
      ],
    },
    {
      id: "services",
      name: "Professional & B2B Services",
      title: "Consultancies, Engineering Firms, Auditing & Project Services",
      desc: "Structures complex service packages, estimates labor hours by rate cards, maps deliverables, and drafts formal proposals automatically.",
      tags: ["Scope Estimation", "Project Milestones", "Rate Card Logic", "Contract Briefs"],
      metrics: [
        { label: "Scope", val: "Stages and rates" },
        { label: "Output", val: "Commercial proposal" },
      ],
    },
  ],
  archFlowTitle: "End-to-End Processing Architecture",
  archFlow: [
    { step: "01", name: "SHOWROOM AI Core", desc: "Talks to the customer and receives inquiry in free-form language" },
    { step: "02", name: "Business Knowledge", desc: "Retrieves catalog records, constraints, and pricing rules" },
    { step: "03", name: "Industry Rules", desc: "Applies vertical-specific parameter logic" },
    { step: "04", name: "Exact Calculation", desc: "Deterministic mathematical computation without hallucination" },
    { step: "05", name: "PDF Generator", desc: "Issues verified commercial proposal & invoice" },
  ],
  capabilitiesTitle: "Core Platform Capabilities",
  capabilitiesSub: "Less manual handling of the first inquiry. The manager joins for complex or final communication.",
  capabilities: [
    {
      num: "01",
      title: "Deterministic Calculation Engine",
      desc: "LLMs extract parameters and hold natural dialogue; all pricing calculations are executed by verified algorithmic code.",
    },
    {
      num: "02",
      title: "Complex Parametric Dependencies",
      desc: "Supports hundreds of interrelated fields: sizing, materials, tiers, optional packages, and labor coefficients.",
    },
    {
      num: "03",
      title: "Automated PDF Document Output",
      desc: "Generates polished, branded PDF proposals containing company branding, line items, pricing, visuals, and terms in one click.",
    },
    {
      num: "04",
      title: "Real-Time Inventory Synchronization",
      desc: "Integrates with ERPs, 1C, or proprietary databases to verify live stock availability and current rate cards.",
    },
    {
      num: "05",
      title: "Omnichannel Inquiry Intake",
      desc: "Customers initiate requests via website configurators, WhatsApp, or Telegram, receiving formatted output directly.",
    },
    {
      num: "06",
      title: "High-Intent Sales Handoff",
      desc: "Sales reps receive complete, mathematically verified specifications and deal valuations inside their CRM.",
    },
  ],
  workflowTitle: "Step-by-Step Processing Cycle",
  workflowSub: "From the incoming conversation to a commercial proposal the manager can take over.",
  workflowSteps: [
    { num: "01", label: "Inquiry Ingestion", desc: "Customer conveys requirements via natural language or parameters." },
    { num: "02", label: "Catalog Matching", desc: "AI maps requirements to verified catalog items and SKU databases." },
    { num: "03", label: "Business Constraints", desc: "System evaluates business rules: MOQs, dimensional limits, dependencies." },
    { num: "04", label: "Deterministic Math", desc: "Algorithmic engine applies exact rate cards, formulas, and taxes." },
    { num: "05", label: "Structured Spec", desc: "Assembles clean itemized specification of materials, scope, and price." },
    { num: "06", label: "PDF Document", desc: "Issues downloadable and sendable branded proposal document." },
  ],
  deterministicTitle: "Deterministic Verification Gate",
  deterministicDesc:
    "An ordinary chat can invent a price. In SHOWROOM AI the calculation is separate from the dialogue: the AI talks, and the calculator follows the formulas you set. That is not a promise that the rules themselves are flawless. It means the price is not made up in the conversation.",
  multitenantTitle: "Isolated Multi-Tenant Security",
  multitenantLead:
    "Every client organization's catalog data, pricing logic, and commercial formulas remain completely isolated.",
  multitenantExamples: [
    {
      title: "Encrypted Catalogs & Formulas",
      text: "Your margins, proprietary supplier rates, and calculation logic are strictly encrypted and invisible across tenants.",
    },
    {
      title: "Custom Proposal Brand Templates",
      text: "Every business defines its own document identity: corporate fonts, color palette, legal disclosures, and digital signatures.",
    },
    {
      title: "Corporate Network Connectors",
      text: "Connect to private enterprise databases and internal CRM systems via authenticated API keys and dedicated gateways.",
    },
  ],
  pricingTitle: "SHOWROOM AI Pricing Plans",
  pricingSub: "Predictable software licensing for commercial calculation automation.",
  pricingDesc:
    "Self-serve launch at $0; optional done-for-you catalog and formula setup is ~$300 once. Then fixed MRR by calculation quota. All plans include the engine and PDF generation.",
  pricingPoints: [
    "Self-serve $0 or optional ~$300 DFY setup",
    "Fixed monthly MRR at $199 / $299",
    "Unlimited sales rep seats in the workspace",
    "Automated branded PDF output included",
    "Connects to website and messaging channels",
  ],
  pricingTiers: [
    {
      name: "Standard",
      price: "$199",
      period: "/ month",
      desc: "For small businesses & showrooms: up to 1,000 SKUs, standard calculation formulas. Self-serve $0; optional ~$300 DFY setup.",
      skuId: "showroom-standard",
      features: [
        "Up to 1,000 catalog SKUs",
        "Up to 500 proposal calculations / month",
        "Branded PDF proposal template",
        "Website calculator widget",
        "Specification CSV/PDF export",
      ],
    },
    {
      name: "Business",
      price: "$299",
      period: "/ month",
      desc: "For manufacturers, dealerships & distributors: advanced formulas, unlimited catalogue, and CRM sync.",
      skuId: "showroom-business",
      features: [
        "Unlimited catalog SKUs",
        "Up to 3,000 proposal calculations / month",
        "Custom multi-parameter pricing logic",
        "Bitrix24, Kommo, ERP integration",
        "WhatsApp and Telegram connectors",
        "Priority engineering support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "For large industrial holdings: dedicated cluster, custom ERP adapters, and strict uptime SLAs.",
      features: [
        "Dedicated compute infrastructure",
        "Unlimited monthly calculations",
        "Custom integration with SAP / 1C / Oracle",
        "Custom availability & performance SLA",
        "Dedicated deployment architect",
      ],
    },
  ],
  faqTitle: "Frequently Asked Questions",
  faqSub: "Everything you need to know about implementing SHOWROOM AI as your AI Sales Agent.",
  faqs: [
    {
      q: "Is SHOWROOM AI exclusively for furniture companies?",
      a: "No. SHOWROOM AI is an AI Sales Agent for any configurable business: automotive dealerships, construction contractors, building materials, real estate developers, equipment distributors, and B2B services. Industry specificity is configured via data schemas and formulas.",
    },
    {
      q: "Can the system hallucinate prices?",
      a: "No. SHOWROOM AI utilizes a deterministic calculation gate: the AI talks to customers and extracts parameters, while calculation of subtotals and totals is performed by verified mathematical code based on your exact formulas.",
    },
    {
      q: "How do customers receive the finalized quote?",
      a: "The platform generates a polished, branded PDF document containing all parameters, line items, and pricing. Customers download it directly on your website or receive it instantly in WhatsApp/Telegram.",
    },
    {
      q: "How do we import our catalog and rate cards?",
      a: "Catalogs can be imported via Excel, CSV, Google Sheets, or synchronized via API from 1C / ERPs. Our onboarding team assists in configuring and testing your exact formula logic.",
    },
  ],
};

export function getShowroomCopy(locale: Locale): ShowroomContent {
  return locale === "ru" ? showroomRu : showroomEn;
}
