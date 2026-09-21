export interface AibaChannel {
  type: "whatsapp" | "telegram" | "webchat" | "instagram" | "messenger";
  name: string;
  note: string;
}

export interface AibaStep {
  num: string;
  title: string;
  desc: string;
}

export interface AibaPanelTab {
  key: "dashboard" | "inbox" | "knowledge" | "playground";
  label: string;
  caption: string;
}

export interface AibaPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  badge?: string;
  note: string;
  features: string[];
}

export interface AibaContent {
  seoTitle: string;
  seoDescription: string;
  badge: string;
  titleA: string;
  titleB: string;
  subtitle: string;
  heroMeta: string[];
  ctaConsult: string;
  ctaPricing: string;
  heroScene: {
    headerTitle: string;
    headerSub: string;
    tag: string;
    customerMeta: string;
    customer: string;
    engineNote: string;
    aiLabel: string;
    aiReply: string;
    operatorMeta: string;
    operatorReply: string;
    handoffNote: string;
  };
  channelsTitle: string;
  channelsSub: string;
  channels: AibaChannel[];
  channelsNote: string;
  autoTitle: string;
  autoSub: string;
  autoList: string[];
  panelTitle: string;
  panelSub: string;
  panelLead: string;
  panelTabs: AibaPanelTab[];
  howTitle: string;
  howSub: string;
  steps: AibaStep[];
  handoffTitle: string;
  handoffSub: string;
  handoffAi: { title: string; items: string[] };
  handoffHuman: { title: string; items: string[] };
  crmTitle: string;
  crmSub: string;
  crmCards: { tag: string; title: string; desc: string; items: string[] }[];
  pricingTitle: string;
  pricingSub: string;
  plans: AibaPlan[];
  setupTitle: string;
  setupPrice: string;
  setupDesc: string;
  setupFeatures: string[];
  faqTitle: string;
  faqSub: string;
  faqs: { q: string; a: string }[];
}

export const aibaRu: AibaContent = {
  seoTitle: "AI Business Assistant | Мультиканальный AI-ассистент продаж 24/7 · AI Mark",
  seoDescription:
    "Один AI-ассистент для WhatsApp, Telegram, Instagram Direct, Messenger и сайта: единый инбокс, база знаний, квалификация лидов, передача диалога человеку и синхронизация с CRM.",
  badge: "Собственный AI-продукт · AI Mark",
  titleA: "AI Business",
  titleB: "Assistant",
  subtitle:
    "Один ассистент отвечает вашим клиентам в каждом мессенджере, которым они уже пользуются, — с вашим каталогом, вашими ценами и вашими правилами. Команда следит за одним инбоксом, забирает любой диалог себе в один клик, а каждая переписка попадает в вашу CRM.",
  heroMeta: ["5 каналов в одном инбоксе", "Панель клиента", "Интеграция с CRM", "Entry от $149 / месяц"],
  ctaConsult: "Подключить ассистента",
  ctaPricing: "Тарифы подписки",
  heroScene: {
    headerTitle: "Общий инбокс",
    headerSub: "Один тред на клиента, все каналы сразу",
    tag: "Активен • AI 24/7",
    customerMeta: "Клиент → WhatsApp",
    customer: "«Здравствуйте! Интересует конфигурация продукта и сколько времени займёт доставка?»",
    engineNote: "AI-движок: база знаний + прайс-лист + регламенты",
    aiLabel: "AI Business Assistant",
    aiReply:
      "«Добрый день! Доступны стандартная и расширенная комплектации от $1,200. Срок сборки и доставки составляет 5–7 рабочих дней. Прислать подробную спецификацию?»",
    operatorMeta: "Менеджер → подключился · 11:42",
    operatorReply: "«Здравствуйте! Подключаюсь к диалогу. Давайте согласуем точный перечень параметров.»",
    handoffNote:
      "Ассистент отвечает на типовые вопросы 24/7 и моментально уступает место менеджеру по ключевому слову или клику в инбоксе.",
  },
  channelsTitle: "Каждый канал, в который пишут ваши клиенты",
  channelsSub:
    "Подключите один канал или все пять. Ассистент, общий инбокс и ваша CRM видят единый диалог, откуда бы он ни пришёл.",
  channels: [
    {
      type: "whatsapp",
      name: "WhatsApp Cloud API",
      note: "Официальный Meta Cloud API на вашем бизнес-номере без наценки за сообщения.",
    },
    {
      type: "telegram",
      name: "Telegram Bot",
      note: "Ваш собственный бот без верификаций и модераций. Мгновенный старт.",
    },
    {
      type: "webchat",
      name: "Виджет чата на сайте",
      note: "Один скрипт на любой платформе: Next.js, WordPress, Tilda, Shopify.",
    },
    {
      type: "instagram",
      name: "Instagram Direct",
      note: "Личные сообщения в бизнес-аккаунт обрабатываются из единого инбокса.",
    },
    {
      type: "messenger",
      name: "Facebook Messenger",
      note: "Диалоги со страницы Facebook на основе той же базы знаний.",
    },
  ],
  channelsNote:
    "Для WhatsApp, Instagram и Messenger требуется подтверждённый Meta Business аккаунт — мы даём готовый чек-лист и помогаем настроить всё на онбординге.",
  autoTitle: "Что мы автоматизируем",
  autoSub:
    "Ваша команда занимается диалогами, которые закрывают сделки. Всё, что до этого, берёт на себя ассистент.",
  autoList: [
    "Консультации по товарам, услугам и ценам",
    "Поиск по каталогу и характеристикам",
    "Проверка наличия и условий доставки",
    "Мгновенный ответ ночью и в выходные (< 30 сек)",
    "Квалификация лида по бюджету и срокам",
    "Сбор контактных данных и требований",
    "Запись на встречу, звонок или аудит",
    "Распознавание постоянных клиентов",
    "Информирование о статусе заказа и условиях",
    "График работы, локации и реквизиты",
    "База знаний FAQ на нескольких языках",
    "Передача диалога человеку в 1 клик",
    "Синхронизация контактов и лидов в CRM",
  ],
  panelTitle: "Панель управления, созданная для команды",
  panelSub:
    "Не абстрактный чёрный ящик, а прозрачная панель управления: инбокс, база знаний, аналитика диалогов и песочница.",
  panelLead:
    "Каждый чат из WhatsApp, Telegram, Instagram, Messenger и веб-виджета стекается в единый инбокс. Менеджер перехватывает диалог в один клик, а обучить ассистента можно, просто загрузив прайс-лист или регламенты.",
  panelTabs: [
    {
      key: "dashboard",
      label: "Дашборд",
      caption: "Сводка за неделю: общее число диалогов, доля ответов AI, среднее время первого ответа и аналитика лимитов.",
    },
    {
      key: "inbox",
      label: "Инбокс",
      caption: "Все каналы в едином интерфейсе. Перехват переписки менеджером в один клик с мгновенной блокировкой бота.",
    },
    {
      key: "knowledge",
      label: "База знаний",
      caption: "Загружайте прайс-листы, каталоги и регламенты. Ассистент цитирует их клиентам точно и без выдумок.",
    },
    {
      key: "playground",
      label: "Песочница",
      caption: "Тестируйте новые промпты, формулировки и сценарии в изолированной среде до запуска на клиентах.",
    },
  ],
  howTitle: "Как устроен путь клиента",
  howSub: "От первого сообщения до квалифицированной сделки в CRM — меньше чем за минуту.",
  steps: [
    { num: "01", title: "Клиент пишет в удобном мессенджере", desc: "WhatsApp, Telegram, Instagram Direct, Messenger или чат на сайте." },
    { num: "02", title: "AI распознаёт язык и контекст", desc: "Узнаёт повторного клиента, подгружает историю переписки и определяет интент." },
    { num: "03", title: "Отвечает строго по вашей базе знаний", desc: "Ничего не додумывает: только проверенные цены, остатки и регламенты компании." },
    { num: "04", title: "Квалифицирует потребность", desc: "Уточняет бюджет, сроки, город и параметры сделки в естественном диалоге." },
    { num: "05", title: "Синхронизирует данные с CRM", desc: "Создаёт контакт, прикрепляет лог переписки и открывает сделку в Bitrix24 / Kommo." },
    { num: "06", title: "Передаёт диалог человеку", desc: "При сложном вопросе или готовности к оплате переводит тред на свободного менеджера." },
    { num: "07", title: "Возвращается в работу автоматически", desc: "После завершения диалога оператором снова берёт ночные и дежурные обращения." },
  ],
  handoffTitle: "Ассистент знает, когда уступить место человеку",
  handoffSub:
    "Автоматизация не должна заменять живые продажи — она должна убирать рутину и вовремя подключать сильных переговорщиков.",
  handoffAi: {
    title: "AI берёт на себя рутину",
    items: [
      "Мгновенный первый ответ 24/7",
      "Навигация по каталогу и ценам",
      "График работы, контакты, адреса",
      "Первичный сбор требований и лид-данных",
    ],
  },
  handoffHuman: {
    title: "Человек закрывает сделки",
    items: [
      "Индивидуальные скидки и условия договоров",
      "Сложные коммерческие переговоры",
      "Нестандартные кейсы и рекламации",
      "Долгосрочные клиентские отношения",
    ],
  },
  crmTitle: "Интеграция с вашей существующей CRM",
  crmSub:
    "Мы не заставляем вас менять CRM-систему. Мы передаём лиды, историю и контакты в ту среду, в которой вы уже работаете.",
  crmCards: [
    {
      tag: "Bitrix24",
      title: "Коннектор Open Lines",
      desc: "Диалоги поступают в Bitrix Открытые Линии. Менеджер отвечает прямо из Bitrix, а клиент получает сообщение в WhatsApp.",
      items: ["Open Lines", "Контакты & Лиды", "Ответы из CRM", "Сверка дублей"],
    },
    {
      tag: "Kommo / amoCRM",
      title: "Сделки и автоворонки",
      desc: "Каждый диалог создаёт контакт, прикрепляет переписку примечанием и двигает сделку по этапам воронки продаж.",
      items: ["Карточки лидов", "Заметки с историей", "Триггеры воронки", "Настройка полей"],
    },
    {
      tag: "API & Webhooks",
      title: "Открытая интеграция",
      desc: "Подписанные исходящие Webhooks и REST API для подключения ERP, систем бронирования и внутренних баз данных.",
      items: ["REST API", "Подписанные вебхуки", "ERP-системы", "Кастомные хуки"],
    },
  ],
  pricingTitle: "Тарифные планы ассистента",
  pricingSub: "Фиксированная подписка за всё рабочее пространство. Без скрытых доплат за операторов.",
  plans: [
    {
      id: "entry",
      name: "Entry",
      price: "$149",
      period: "/ месяц",
      note: "1 канал, ответ 24/7",
      features: [
        "1 канал на выбор (WhatsApp, TG или Вебчат)",
        "До 1 000 диалогов в месяц",
        "База знаний и регламенты",
        "Общий инбокс с ручным перехватом",
        "Песочница для тестирования",
      ],
    },
    {
      id: "standard",
      name: "Standard",
      price: "$249",
      period: "/ месяц",
      badge: "Рекомендуем",
      note: "Все 5 каналов + интеграция с CRM",
      features: [
        "Все 5 каналов (WhatsApp, TG, IG, Messenger, Веб)",
        "До 5 000 диалогов в месяц",
        "Интеграция с Bitrix24, Kommo, amoCRM",
        "Webhooks и REST API",
        "Роли команды (админ, оператор)",
        "Приоритетная поддержка",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "По запросу",
      period: "",
      note: "Высокая нагрузка и кастомные интеграции",
      features: [
        "Неограниченное число диалогов",
        "Индивидуальные интеграции с ERP/БД",
        "Выделенный тенант и собственный API-ключ",
        "Гарантированный SLA по времени ответа",
        "Персональный инженер внедрения",
      ],
    },
  ],
  setupTitle: "Настройка и онбординг под ключ",
  setupPrice: "~$300 разово (опционально)",
  setupDesc:
    "Опциональная настройка под ключ: подключаем каналы, импортируем каталог и прайс-лист, калибруем базу знаний и CRM. Обычно запуск занимает 3–5 рабочих дней.",
  setupFeatures: [
    "Подключение WhatsApp Cloud API, Telegram и виджета сайта",
    "Загрузка и структурирование базы знаний компании",
    "Калибровка тональности и стоп-листов",
    "Интеграция с CRM и тестовая прогонка сценариев",
    "Чек-лист и сверка сценариев перед запуском",
  ],
  faqTitle: "Вопросы о подключении ассистента",
  faqSub: "Популярные вопросы по тарифам, каналам и безопасности данных.",
  faqs: [
    {
      q: "Нужен ли официальный WhatsApp Business аккаунт?",
      a: "Да, для WhatsApp мы используем официальный Meta Cloud API на вашем номере. Это гарантирует отсутствие блокировок, высокую скорость доставки и отсутствие сторонних BSP-наценок. Мы помогаем пройти верификацию на онбординге.",
    },
    {
      q: "Как менеджер понимает, что нужно подключиться к переписке?",
      a: "В общем инбоксе появляется уведомление, а если подключена CRM — в сделку приходит алерт. Менеджер нажимает кнопку «Перехватить диалог», ассистент моментально замолкает, и клиент продолжает общение с живым человеком.",
    },
    {
      q: "Может ли AI придумать несуществующую цену или товар?",
      a: "Нет. Ассистент работает на базе строгого RAG-поиска: если информации нет в загруженном каталоге или FAQ, он честно говорит об этом и предлагает позвать менеджера, вместо того чтобы выдумывать факты.",
    },
    {
      q: "Сколько операторов можно подключить к панели?",
      a: "В тарифах Standard и Enterprise число операторов в панели инбокса не ограничено. Вы платите за рабочее пространство и объём диалогов, а не за каждого сотрудника отдела продаж.",
    },
    {
      q: "Как быстро можно запустить ассистента?",
      a: "Telegram и чат на сайте можно запустить в течение 1 дня. Подключение WhatsApp и интеграция с CRM при готовой базе знаний обычно занимает 3–5 рабочих дней.",
    },
  ],
};

export const aibaEn: AibaContent = {
  seoTitle: "AI Business Assistant | 24/7 Omnichannel Sales AI Assistant · AI Mark",
  seoDescription:
    "Unified AI sales assistant for WhatsApp, Telegram, Instagram Direct, Messenger, and Website: single inbox, knowledge retrieval, lead qualification, human handoff, and CRM sync.",
  badge: "Proprietary AI Platform · AI Mark",
  titleA: "AI Business",
  titleB: "Assistant",
  subtitle:
    "One AI assistant answers your customers across every messenger they already use — grounded in your catalog, your pricing, and your business rules. Your sales team tracks one unified inbox, intercepts chats in one click, and logs every conversation into your CRM.",
  heroMeta: ["5 channels in 1 inbox", "Customer workspace panel", "Direct CRM sync", "Entry from $149 / month"],
  ctaConsult: "Deploy Sales Assistant",
  ctaPricing: "View Subscription Plans",
  heroScene: {
    headerTitle: "Unified Shared Inbox",
    headerSub: "One thread per customer across all channels",
    tag: "Active • AI 24/7",
    customerMeta: "Customer → WhatsApp",
    customer: "«Hello! I'm interested in the commercial specs and delivery timeline for this model.»",
    engineNote: "AI Core: Knowledge base + Catalog + Business rules",
    aiLabel: "AI Business Assistant",
    aiReply:
      "«Hello! Standard and configured options start at $1,200. Lead time is 5–7 business days. Would you like me to send the complete specification sheet?»",
    operatorMeta: "Nino (Manager) → Intercepted · 11:42",
    operatorReply: "«Hi! Nino here, joining the conversation. Let's confirm your exact sizing requirements.»",
    handoffNote:
      "AI handles repetitive questions 24/7 and instantly steps aside when a manager intervenes or high-value intent is detected.",
  },
  channelsTitle: "Every Channel Your Customers Already Use",
  channelsSub:
    "Connect one channel or all five. The assistant, shared inbox, and your CRM access one synchronized conversation thread regardless of origin.",
  channels: [
    {
      type: "whatsapp",
      name: "WhatsApp Cloud API",
      note: "Official Meta Cloud API on your own business number without third-party markup.",
    },
    {
      type: "telegram",
      name: "Telegram Bot",
      note: "Your branded bot without moderation delays. Instant deployment.",
    },
    {
      type: "webchat",
      name: "Website Chat Widget",
      note: "One lightweight script compatible with Next.js, WordPress, Tilda, Shopify.",
    },
    {
      type: "instagram",
      name: "Instagram Direct",
      note: "Direct DMs to your business profile handled from the exact same inbox.",
    },
    {
      type: "messenger",
      name: "Facebook Messenger",
      note: "Facebook page conversations synchronized on identical knowledge data.",
    },
  ],
  channelsNote:
    "WhatsApp, Instagram, and Messenger require a verified Meta Business account — we provide a step-by-step checklist and guide you through onboarding.",
  autoTitle: "What We Automate",
  autoSub:
    "Your team focuses on conversations that close deals. Everything preceding that is handled automatically by the assistant.",
  autoList: [
    "Product catalog, specifications, and pricing inquiries",
    "Instant sub-second semantic catalog search",
    "Inventory availability and delivery terms verification",
    "Night and weekend first responses (< 30 sec)",
    "Lead qualification by budget, scope, and timeframe",
    "Contact information and requirements collection",
    "Appointment and showroom booking scheduling",
    "Returning customer recognition and context retention",
    "Order status and warranty policy guidance",
    "Operating hours, office locations, and billing details",
    "Multilingual FAQ knowledge base",
    "1-click seamless human operator handoff",
    "Real-time CRM lead and deal synchronization",
  ],
  panelTitle: "A Command Panel Designed for Teams",
  panelSub:
    "Not an opaque black box: a transparent operational workspace featuring inbox, knowledge base, analytics, and prompt playground.",
  panelLead:
    "Every incoming inquiry from WhatsApp, Telegram, Instagram, Messenger, and webchat streams into one shared queue. Managers intercept conversations with one click, while knowledge bases can be updated simply by uploading documents or pricing sheets.",
  panelTabs: [
    {
      key: "dashboard",
      label: "Dashboard",
      caption: "Weekly operations: total threads, autonomous resolution rate, average response speed, and usage quotas.",
    },
    {
      key: "inbox",
      label: "Shared Inbox",
      caption: "All channels in a single queue. Human operators intercept chats with one click, silencing the bot instantly.",
    },
    {
      key: "knowledge",
      label: "Knowledge Base",
      caption: "Upload price lists, FAQs, and policies. The assistant cites them accurately without hallucinations.",
    },
    {
      key: "playground",
      label: "Playground",
      caption: "Test new prompts, rules, and scenarios in an isolated environment before exposing them to live customers.",
    },
  ],
  howTitle: "End-to-End Customer Flow",
  howSub: "From first incoming message to a qualified deal inside your CRM in under a minute.",
  steps: [
    { num: "01", title: "Customer writes in preferred channel", desc: "WhatsApp, Telegram, Instagram Direct, Messenger, or webchat." },
    { num: "02", title: "AI identifies intent and language", desc: "Recognizes returning clients, restores previous context, and classifies intent." },
    { num: "03", title: "Replies strictly using your knowledge", desc: "Grounded in verified catalog data, prices, and company policies." },
    { num: "04", title: "Qualifies commercial scope", desc: "Naturally inquires about project requirements, budget, timeline, and location." },
    { num: "05", title: "Syncs context to your CRM", desc: "Creates contacts, records conversation transcripts, and opens deals in Bitrix24 / Kommo." },
    { num: "06", title: "Hands off to a human manager", desc: "On complex inquiries or negotiation stages, smoothly hands the thread over to sales." },
    { num: "07", title: "Re-engages automatically", desc: "Resumes standby duty after operator inactivity to catch subsequent inquiries." },
  ],
  handoffTitle: "The Assistant Knows When to Step Aside",
  handoffSub:
    "Automation should never disrupt closing deals — it should eliminate friction and connect qualified leads with top sales closers.",
  handoffAi: {
    title: "AI Handles Repetitive Routine",
    items: [
      "Instant 24/7 first response in < 30 seconds",
      "Catalog navigation and pricing questions",
      "Office directions, hours, and policies",
      "Initial requirements gathering and data capture",
    ],
  },
  handoffHuman: {
    title: "Human Team Closes High Value",
    items: [
      "Custom discounts and commercial agreements",
      "High-stakes negotiations and contract terms",
      "Non-standard edge cases and client feedback",
      "Long-term client relationships and upselling",
    ],
  },
  crmTitle: "Integrates Directly With Your CRM",
  crmSub:
    "We do not ask you to migrate to a new system. We pipe contacts, leads, and transcripts straight into your existing setup.",
  crmCards: [
    {
      tag: "Bitrix24",
      title: "Open Lines Connector",
      desc: "Conversations stream into Bitrix Open Lines. Reps reply inside Bitrix, and customers receive answers in WhatsApp.",
      items: ["Open Lines", "Contacts & Deals", "In-CRM replies", "Duplicate matching"],
    },
    {
      tag: "Kommo / amoCRM",
      title: "Deals & Automated Pipelines",
      desc: "Every conversation creates or updates contacts, adds transcripts as notes, and moves deals through pipeline stages.",
      items: ["Lead profiles", "Transcript notes", "Pipeline triggers", "Custom field mapping"],
    },
    {
      tag: "API & Webhooks",
      title: "Open REST Architecture",
      desc: "Signed outgoing webhooks and clean REST API endpoints for ERP systems, custom databases, and booking engines.",
      items: ["REST API", "Signed Webhooks", "ERP Connectors", "Custom payload hooks"],
    },
  ],
  pricingTitle: "Assistant Subscription Plans",
  pricingSub: "Fixed monthly pricing per workspace. No per-seat penalties for adding team members.",
  plans: [
    {
      id: "entry",
      name: "Entry",
      price: "$149",
      period: "/ month",
      note: "1 channel, 24/7 responsiveness",
      features: [
        "1 channel of choice (WhatsApp, TG, or Webchat)",
        "Up to 1,000 conversations / month",
        "Knowledge base and business rules",
        "Shared inbox with manual interception",
        "Playground for prompt testing",
      ],
    },
    {
      id: "standard",
      name: "Standard",
      price: "$249",
      period: "/ month",
      badge: "Recommended",
      note: "All 5 channels + direct CRM integration",
      features: [
        "All 5 channels (WhatsApp, TG, IG, Messenger, Web)",
        "Up to 5,000 conversations / month",
        "Bitrix24, Kommo, amoCRM, HubSpot sync",
        "Webhooks and REST API connectors",
        "Team roles and activity audit log",
        "Priority support via WhatsApp & Telegram",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "",
      note: "High volume and custom infrastructure",
      features: [
        "Unlimited channels and conversations",
        "Custom ERP and internal database connectors",
        "Dedicated tenant and custom AI model provider key",
        "Guaranteed uptime and response SLA",
        "Dedicated deployment engineer",
      ],
    },
  ],
  setupTitle: "Turnkey Setup & Onboarding",
  setupPrice: "~$300 once (optional)",
  setupDesc:
    "Optional done-for-you onboarding: we connect channels, import your catalogue and price sheets, calibrate knowledge prompts, and test CRM pipelines. Live within 3–5 business days.",
  setupFeatures: [
    "Meta Business / WhatsApp Cloud API, Telegram, and website widget configuration",
    "Knowledge base extraction from product catalogs and FAQ documents",
    "Tone and guardrail calibration across supported languages",
    "End-to-end CRM integration with verified test handoffs",
    "Launch checklist and go-live review",
  ],
  faqTitle: "Frequently Asked Questions",
  faqSub: "Common questions regarding channels, setup, and enterprise privacy.",
  faqs: [
    {
      q: "Do I need an official WhatsApp Business account?",
      a: "Yes. We connect via official Meta Cloud API on your designated business number. This guarantees 100% account safety, zero anti-bot bans, and no third-party per-message surcharge. We guide you through verification.",
    },
    {
      q: "How does a manager know when to intervene?",
      a: "Notifications pop up in the shared inbox and inside your connected CRM. Clicking 'Intercept' immediately silences the AI and gives the human operator complete control over the dialogue.",
    },
    {
      q: "Can the AI hallucinate prices or fake inventory?",
      a: "No. The system uses strict RAG (Retrieval-Augmented Generation). If a requested item or price isn't explicitly documented in your verified knowledge base, the AI clearly acknowledges this and offers to call a representative.",
    },
    {
      q: "How many agents can access the workspace?",
      a: "On Standard and Enterprise tiers, team seat count is unlimited. You pay for the workspace and conversation volume, not a per-head penalty.",
    },
    {
      q: "How quickly can we launch?",
      a: "Telegram and website chat can launch within 24 hours. Full WhatsApp Cloud API integration and CRM handoff verification typically take 3–5 business days.",
    },
  ],
};

export function getAibaCopy(locale: "ru" | "en"): AibaContent {
  return locale === "ru" ? aibaRu : aibaEn;
}
