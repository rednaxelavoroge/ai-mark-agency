import type { Locale } from "@/lib/site";

export interface AimePlatform {
  type: "instagram" | "facebook" | "threads" | "tiktok";
  name: string;
  status: "ready" | "soon";
  badge: string | null;
}

export interface AimeStep {
  num: string;
  title: string;
  desc: string;
}

export interface AimeFaq {
  q: string;
  a: string;
}

export interface AimePlan {
  id: string;
  name: string;
  price: string;
  period: string;
  note?: string;
  setupPrice?: string;
  setupLabel?: string;
  desc: string;
  featured?: boolean;
  channels: string[];
  features: string[];
}

export interface AimeContent {
  seoTitle: string;
  seoDescription: string;
  badge: string;
  titleA: string;
  titleB: string;
  tagline: string;
  subtitle: string;
  ctaConsult: string;
  ctaPricing: string;
  heroMeta: string[];
  platforms: AimePlatform[];
  compareTitle: string;
  compareSub: string;
  compareColumns: {
    id: string;
    name: string;
    tag: string;
    desc: string;
    featured?: boolean;
  }[];
  tracksTitle: string;
  tracksSub: string;
  tracks: {
    id: string;
    badge: string;
    name: string;
    pricePrimary: string;
    priceSecondary: string;
    summary: string;
    benefits: string[];
  }[];
  howTitle: string;
  howSub: string;
  steps: AimeStep[];
  metaTitle: string;
  metaSub: string;
  metaCards: { title: string; desc: string }[];
  trustTitle: string;
  trustSub: string;
  trustLevels: { lvl: string; title: string; desc: string }[];
  hardFloorTitle: string;
  hardFloorDesc: string;
  pricingTitle: string;
  pricingSub: string;
  plansDirect: AimePlan[];
  planAgency: AimePlan;
  faqTitle: string;
  faqSub: string;
  faqs: AimeFaq[];
}

export const aimeRu: AimeContent = {
  seoTitle: "AI Marketing Employee | AI-маркетолог 24/7 для Instagram, Facebook, Reels · AI MARK",
  seoDescription:
    "Автономный цифровой AI-маркетолог для бизнеса и агентств: SMM 24/7 в Instagram, Facebook, Threads и Reels. Анализ ниши, генерация контента, согласование в Telegram и постинг через Meta Graph API.",
  badge: "Собственный AI-продукт · AI MARK",
  titleA: "AI Marketing",
  titleB: "Employee",
  tagline: "AI-маркетолог вместо SMM-менеджера · Не шедулер вроде Buffer",
  subtitle:
    "Продуктовый цифровой AI-сотрудник: исследует нишу, конкурентов и аудиторию, составляет контент-планы, пишет посты, готовит визуалы, запрашивает аппрув в Telegram и автоматически публикует в ваши каналы Meta (Instagram, Facebook, Threads) — постоянно обучаясь на результатах.",
  ctaConsult: "Запросить подключение",
  ctaPricing: "Смотреть тарифы",
  heroMeta: [
    "Автономный пайплайн SMM",
    "Согласование через Telegram",
    "Meta Graph API (IG · FB · Threads)",
    "Тарифы для бизнеса и агентств",
  ],
  platforms: [
    { type: "instagram", name: "Instagram", status: "ready", badge: null },
    { type: "facebook", name: "Facebook", status: "ready", badge: null },
    { type: "threads", name: "Threads", status: "ready", badge: null },
    { type: "tiktok", name: "TikTok", status: "soon", badge: "В плане / аудит API" },
  ],
  compareTitle: "Не шедулер — полноценный сотрудник",
  compareSub:
    "AIME берёт на себя всю цепочку: стратегия → контент-план → посты и визуалы → согласование в Telegram → публикация в Instagram, Facebook и Threads.",
  compareColumns: [
    {
      id: "smm",
      name: "SMM-менеджер",
      tag: "Ручной найм",
      desc: "Дорого и нестабильно: поиск, онбординг, выгорание, человеческий фактор и срывы дедлайнов. Вы управляете процессом, а не результатом.",
    },
    {
      id: "scheduler",
      name: "AI-шедулер",
      tag: "Инструмент",
      desc: "Buffer / Hootsuite и аналоги: просто очередь постов. Стратегию, тексты, визуалы и расписание вы всё равно собираете вручную.",
    },
    {
      id: "aime",
      name: "AIME (AI MARK)",
      tag: "Цифровой сотрудник",
      featured: true,
      desc: "Полный цикл: исследование рынка → контент-план → визуалы и Reels → апрув в Telegram → автопостинг по API → анализ охватов.",
    },
  ],
  tracksTitle: "Два направления использования",
  tracksSub:
    "Для бизнеса — без платы за подключение. Для маркетинговых агентств — единая панель и отдельные контуры под клиентов.",
  tracks: [
    {
      id: "direct",
      badge: "Прямой бизнес · Без setup",
      name: "Бизнес и бренды",
      pricePrimary: "Лайт $199 · Про $349 /мес",
      priceSecondary: "Без платы за подключение",
      summary:
        "Стратегия, контент-план, посты, визуалы и согласование в Telegram. В тарифе Про — три сети, Reels, 30 публикаций и самообучение на метриках.",
      benefits: [
        "Лайт $199/мес: лента Instagram, базовый план, до 12 постов/мес",
        "Про $349/мес: IG + FB + Threads, раскадровки Reels, до 30 постов, глубокая аналитика",
        "Генерация текстов и визуалов в фирменном стиле",
        "Согласование публикаций в Telegram в один клик",
        "Подключение до 5 рабочих дней",
      ],
    },
    {
      id: "agency",
      badge: "Маркетинговые агентства",
      name: "Агентская инфраструктура",
      pricePrimary: "Setup $799 разово",
      priceSecondary: "далее $199 / клиент / мес",
      summary:
        "Отдельный AI-сотрудник на каждого клиента, панель у оператора агентства, изолированные Telegram-чаты согласования. Агентство сохраняет клиентов и повышает маржу.",
      benefits: [
        "Разовый сетап инфраструктуры $799",
        "Масштабирование: $199/мес за каждого активного клиента",
        "Изолированные чаты согласования под каждого клиента",
        "Публикация в Instagram, Facebook и Threads",
        "Возможность предлагать клиентам SMM 24/7 без раздувания штата",
      ],
    },
  ],
  howTitle: "Полный цикл SMM. Замкнутый автономный процесс.",
  howSub:
    "От конкурентного анализа и трендов до публикации в Meta Graph API и дообучения на реальных охватах.",
  steps: [
    {
      num: "01",
      title: "Анализ ниши, конкурентов и аудитории",
      desc: "Изучает боли и запросы ЦА, отслеживает форматы конкурентов, находит трендовые триггеры и фиксирует тон бренда (Tone of Voice).",
    },
    {
      num: "02",
      title: "Стратегия и календарный план",
      desc: "Формирует регулярные сетки публикаций: экспертные посты, карусели, сценарии для Reels и вовлекающие механики.",
    },
    {
      num: "03",
      title: "Копирайтинг и генерация визуалов",
      desc: "Пишет структурированные тексты с хештегами, собирает слайды каруселей, раскадровки под видео и визуальные макеты.",
    },
    {
      num: "04",
      title: "Согласование в Telegram в 1 клик",
      desc: "Присылает готовый макет в закрытый рабочий чат с кнопками «Одобрить», «Внести правки» или «Переделать».",
    },
    {
      num: "05",
      title: "Автоматический постинг по Meta Graph API",
      desc: "После подтверждения человеком самостоятельно выкладывает контент в Instagram, Facebook Page и Threads точно по графику.",
    },
    {
      num: "06",
      title: "Анализ метрик и цикл самообучения",
      desc: "Считывает охваты, сохранения и комментарии — усиливая в следующих циклах именно те темы, которые дают максимальную конверсию.",
    },
  ],
  metaTitle: "Официальное подключение Meta Graph API",
  metaSub:
    "Строгое соответствие политикам Meta. Без передачи логинов и паролей, без серых эмуляций.",
  metaCards: [
    {
      title: "Официальный Meta Graph API",
      desc: "Публикация осуществляется через официальные протоколы Meta для бизнес-аккаунтов Instagram, Facebook Pages и Threads.",
    },
    {
      title: "Чек-лист и онбординг",
      desc: "Если Meta Business Suite ещё не связан с аккаунтами — мы предоставляем детальный чек-лист и помогаем настроить всё за 1 звонок.",
    },
    {
      title: "100% изоляция доступов",
      desc: "Клиент сохраняет полное единоличное владение своими страницами и правами доступа. Сторонние портфолио не аккумулируют ваши доступы.",
    },
    {
      title: "Планы по TikTok",
      desc: "Интеграция с TikTok Content Posting API запланирована к подключению сразу после завершения официального вендорного аудита.",
    },
  ],
  trustTitle: "Модель контроля: Автономия с защитой Hard-Floor",
  trustSub:
    "Первые циклы калибруются человеком. Рутинные посты подтверждаются в 1 клик. Финансовые и юридические обязательства защищены строгим барьером.",
  trustLevels: [
    {
      lvl: "Уровень 0",
      title: "Ручная калибровка (первые 1–2 цикла)",
      desc: "Каждый пост детально проверяется человеком для калибровки стилистики, формулировок и фактуры бренда.",
    },
    {
      lvl: "Уровень 1",
      title: "Быстрое подтверждение в Telegram",
      desc: "Типовой контент подтверждается нажатием одной кнопки в Telegram-боте. Нестандартные темы требуют расширенного ревью.",
    },
    {
      lvl: "Уровень 2",
      title: "Автопостинг по утверждённым рубрикам",
      desc: "Регулярные согласованные рубрики выходят по расписанию; у оператора остаётся право оперативного вето до момента публикации.",
    },
  ],
  hardFloorTitle: "Железное правило Hard-Floor",
  hardFloorDesc:
    "Цены, финансовые обещания, юридические условия и скидки защищены жёстким барьером безопасности. AIME никогда не опубликует финансовые или юридические заявления без прямого письменного подтверждения человеком.",
  pricingTitle: "Тарифные планы AIME",
  pricingSub: "Прозрачные условия подписки. Без скрытых платежей.",
  plansDirect: [
    {
      id: "lite",
      name: "Лайт",
      price: "$199",
      period: "/ месяц",
      note: "Без платы за подключение",
      desc: "Для малого бизнеса: стабильное ведение Instagram без найма SMM-специалиста в штат.",
      channels: ["Instagram"],
      features: [
        "Публикация в Instagram",
        "Базовый контент-план на месяц",
        "Генерация текстов и визуалов",
        "Согласование постов в Telegram",
        "До 12 публикаций в месяц",
        "Без Reels и Facebook/Threads",
      ],
    },
    {
      id: "pro",
      name: "Про",
      price: "$349",
      period: "/ месяц",
      featured: true,
      note: "Без платы за подключение · Рекомендуем",
      desc: "Три сети Meta, сценарии Reels, регулярная публикация и самообучение алгоритмов на цифрах.",
      channels: ["Instagram", "Facebook", "Threads"],
      features: [
        "Instagram + Facebook + Threads",
        "Раскадровки и сценарии для Reels",
        "Генерация постов и визуалов",
        "Согласование постов в Telegram",
        "До 30 публикаций в месяц",
        "Глубокая аналитика охватов и самообучение",
      ],
    },
  ],
  planAgency: {
    id: "agency",
    name: "Агентство",
    price: "$199",
    period: "/ клиент / месяц",
    setupPrice: "$799",
    setupLabel: "разово",
    note: "Сетап $799 один раз, далее $199/мес за активного клиента",
    desc: "Для маркетинговых агентств: изолированный AI-сотрудник на каждого клиента и общая панель у оператора.",
    channels: ["Instagram", "Facebook", "Threads"],
    features: [
      "Разовый сетап контура $799",
      "Далее $199/мес за каждого клиента",
      "Изолированные чаты согласования под каждого клиента",
      "Панель оператора агентства",
      "Публикация в Instagram, Facebook, Threads",
      "Поддержка масштабирования без раздувания штата",
    ],
  },
  faqTitle: "Часто задаваемые вопросы об AIME",
  faqSub: "Ответы на главные вопросы о подключении, безопасности и процессах.",
  faqs: [
    {
      q: "Чем AIME отличается от обычного SMM-менеджера?",
      a: "AIME — это цифровой сотрудник с выделенной инфраструктурой: он не выгорает, не срывает дедлайны, работает 24/7 и следует строгому регламенту. Вы тратите не более 2 минут в день на согласование готовых макетов в Telegram.",
    },
    {
      q: "Это не просто планировщик постов вроде Buffer или Hootsuite?",
      a: "Нет. Шедулер — это пустая очередь, в которую вы сами вручную пишете тексты и загружаете картинки. AIME сам анализирует рынок, формирует контент-план, генерирует посты, визуалы, сценарии Reels и публикует их после вашего одобрения.",
    },
    {
      q: "Нужна ли плата за подключение?",
      a: "Для прямого бизнеса платы за подключение нет — вы оплачиваете только ежемесячную подписку ($199 или $349). Для агентств разовый сетап агентского контура составляет $799, далее $199/мес за клиента.",
    },
    {
      q: "Как устроено согласование через Telegram?",
      a: "Сотрудник присылает готовый пост (текст, хештеги, визуал карусели или сценарий Reels) в закрытый Telegram-чат вашей команды с интерактивными кнопками «Одобрить», «Внести правки» или «Переделать». Пост выходит только после подтверждения.",
    },
    {
      q: "Кому принадлежат страницы и аккаунты Meta?",
      a: "Исключительно вам. Все доступы настраиваются через официальный Meta Graph API в вашем собственном Business Suite. Никаких передач личных паролей.",
    },
    {
      q: "Поддерживается ли TikTok прямо сейчас?",
      a: "На текущий момент ядро работает с экосистемой Meta (Instagram, Facebook, Threads). Публикация в TikTok запланирована и будет добавлена сразу после прохождения официального аудита TikTok Content Posting API.",
    },
    {
      q: "Сколько времени занимает подключение?",
      a: "Продукт полностью готов к эксплуатации: подключение занимает до 5 рабочих дней после вводного звонка и согласования доступов Meta.",
    },
  ],
};

export const aimeEn: AimeContent = {
  seoTitle: "AI Marketing Employee | 24/7 Autonomous SMM for Instagram, Facebook, Reels · AI MARK",
  seoDescription:
    "Autonomous AI marketing employee for businesses and agencies: 24/7 SMM across Instagram, Facebook, Threads, and Reels. Competitor analysis, creative production, Telegram approval, and Meta Graph API posting.",
  badge: "Proprietary AI Platform · AI MARK",
  titleA: "AI Marketing",
  titleB: "Employee",
  tagline: "AI Marketer replacing manual SMM · Not an empty scheduler like Buffer",
  subtitle:
    "Proprietary digital employee: analyzes your market, rivals, and audience, formulates content strategies, writes copy, crafts visuals and Reels storyboards, requests Telegram approval, and publishes via Meta Graph API — continuously self-optimizing on performance.",
  ctaConsult: "Deploy Marketing Employee",
  ctaPricing: "View Pricing Plans",
  heroMeta: [
    "Autonomous SMM Pipeline",
    "1-Click Telegram Approval",
    "Meta Graph API (IG · FB · Threads)",
    "Direct Business & Agency Tiers",
  ],
  platforms: [
    { type: "instagram", name: "Instagram", status: "ready", badge: null },
    { type: "facebook", name: "Facebook", status: "ready", badge: null },
    { type: "threads", name: "Threads", status: "ready", badge: null },
    { type: "tiktok", name: "TikTok", status: "soon", badge: "Roadmap / API Audit" },
  ],
  compareTitle: "Not an empty scheduler — an autonomous employee",
  compareSub:
    "AIME executes the full lifecycle: Research → Strategy → Content & Visuals → Telegram Review → Meta Graph Publishing.",
  compareColumns: [
    {
      id: "smm",
      name: "Human SMM Manager",
      tag: "Manual Hire",
      desc: "Costly, inconsistent, subject to burnout, delays, and misaligned expectations. You manage human friction rather than results.",
    },
    {
      id: "scheduler",
      name: "AI Post Scheduler",
      tag: "Passive Tool",
      desc: "Buffer, Hootsuite, and similar apps: merely an empty queue. You still have to conceptualize, write, design, and schedule posts manually.",
    },
    {
      id: "aime",
      name: "AIME (AI MARK)",
      tag: "Digital Employee",
      featured: true,
      desc: "Autonomous workflow: competitor intelligence → editorial calendar → visuals and Reels scripts → Telegram approval → API posting → analytics.",
    },
  ],
  tracksTitle: "Two Deployment Tracks",
  tracksSub:
    "For direct businesses — zero setup fees. For digital and marketing agencies — centralized operator dashboard and isolated client instances.",
  tracks: [
    {
      id: "direct",
      badge: "Direct Business · Zero Setup Fee",
      name: "Brands & Companies",
      pricePrimary: "Lite $199 · Pro $349 /mo",
      priceSecondary: "Zero setup fee",
      summary:
        "Full marketing pipeline with Telegram review. Pro plan includes 3 Meta networks, Reels scripts, 30 posts per month, and conversion analytics.",
      benefits: [
        "Lite $199/mo: Instagram feed, foundational calendar, up to 12 posts/mo",
        "Pro $349/mo: IG + Facebook + Threads, Reels storyboards, 30 posts, deep telemetry",
        "Copywriting and on-brand visual synthesis included",
        "1-click Telegram approval workflow",
        "Deployment within 5 business days",
      ],
    },
    {
      id: "agency",
      badge: "Agency Infrastructure",
      name: "Marketing Agencies",
      pricePrimary: "Setup $799 once",
      priceSecondary: "then $199 / client / mo",
      summary:
        "Dedicated AI employee per client, centralized operator dashboard, and isolated Telegram approval channels. Grow client retention and margins.",
      benefits: [
        "One-time infrastructure setup fee of $799",
        "Predictable scale: $199/mo per active client account",
        "Isolated Telegram review channels per brand",
        "Publishing to Instagram, Facebook, and Threads",
        "Expand capacity to 24/7 SMM without bloating headcount",
      ],
    },
  ],
  howTitle: "Closed-Loop SMM Lifecycle",
  howSub:
    "From niche intelligence and trends to Meta Graph API publication and self-learning optimization.",
  steps: [
    {
      num: "01",
      title: "Competitor & Audience Intelligence",
      desc: "Identifies audience pain points, tracks competitor hooks, surfaces viral triggers, and locks in brand tone of voice.",
    },
    {
      num: "02",
      title: "Strategy & Editorial Calendar",
      desc: "Creates structured weekly and monthly publishing grids: educational carousels, authority pieces, Reels concepts, and engagement stories.",
    },
    {
      num: "03",
      title: "Copywriting & Visual Production",
      desc: "Authors copy with relevant hashtags, designs multi-slide carousels, and prepares production-ready video scripts for Reels.",
    },
    {
      num: "04",
      title: "1-Click Telegram Approval",
      desc: "Dispatches the draft to your private Telegram channel with intuitive 'Approve', 'Edit', or 'Regenerate' buttons.",
    },
    {
      num: "05",
      title: "Official Meta Graph API Publishing",
      desc: "Upon human sign-off, automatically publishes media to Instagram, Facebook Page, and Threads on scheduled cadence.",
    },
    {
      num: "06",
      title: "Analytics & Self-Learning Cycle",
      desc: "Evaluates reach, saves, comments, and clicks — feeding insights back into future cycles to continuously increase conversions.",
    },
  ],
  metaTitle: "Official Meta Graph API Integration",
  metaSub:
    "Strict adherence to Meta guidelines. No password handoffs, no unauthorized web scraping or account risks.",
  metaCards: [
    {
      title: "Official Meta Graph Protocol",
      desc: "Content is published exclusively via official Meta Graph APIs for verified Instagram professional profiles, Facebook Pages, and Threads.",
    },
    {
      title: "Onboarding Checklist & Guidance",
      desc: "If Meta Business Suite or accounts need linking, we provide a step-by-step checklist and guide you through setup in one call.",
    },
    {
      title: "100% Client Account Sovereignty",
      desc: "Clients retain absolute ownership and security credentials over their assets. Third parties never pool or commandeer your tokens.",
    },
    {
      title: "TikTok Roadmap",
      desc: "Direct TikTok Content Posting API integration is scheduled for rollout immediately following vendor compliance audit completion.",
    },
  ],
  trustTitle: "Trust Architecture: Autonomy with Hard-Floor Guardrails",
  trustSub:
    "Early cycles calibrated by human review. Standard posts verified with 1 click. Commercial and legal boundaries strictly enforced.",
  trustLevels: [
    {
      lvl: "Level 0",
      title: "Mandatory Manual Calibration (Cycles 1–2)",
      desc: "Initial cycles reviewed in detail by human supervisors to calibrate voice, factual consistency, and visual brand identity.",
    },
    {
      lvl: "Level 1",
      title: "High-Confidence 1-Click Telegram Review",
      desc: "Standard content with high alignment scores approved in seconds via Telegram. Complex themes flagged for review.",
    },
    {
      lvl: "Level 2",
      title: "Conditional Scheduled Posting",
      desc: "Established, recurring themes post automatically by schedule; human operators maintain instant veto capability.",
    },
  ],
  hardFloorTitle: "The Hard-Floor Principle",
  hardFloorDesc:
    "Pricing, financial commitments, legal terms, and discount structures are protected by a strict Hard-Floor barrier. AIME will NEVER publish commercial or legal assertions without explicit human sign-off.",
  pricingTitle: "AIME Pricing Plans",
  pricingSub: "Transparent, predictable pricing with no hidden charges.",
  plansDirect: [
    {
      id: "lite",
      name: "Lite",
      price: "$199",
      period: "/ month",
      note: "No setup fee",
      desc: "For small businesses wanting steady, high-quality Instagram presence without hiring an internal SMM team.",
      channels: ["Instagram"],
      features: [
        "Instagram publishing",
        "Monthly editorial calendar",
        "Copywriting & visual generation",
        "Telegram 1-click approvals",
        "Up to 12 posts per month",
        "No Reels, no Facebook/Threads",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "$349",
      period: "/ month",
      featured: true,
      note: "No setup fee · Recommended",
      desc: "Three Meta platforms, Reels storyboards, comprehensive calendar, and continuous analytics self-learning.",
      channels: ["Instagram", "Facebook", "Threads"],
      features: [
        "Instagram + Facebook + Threads",
        "Reels storyboards and video scripts",
        "Copywriting & visual generation",
        "Telegram 1-click approvals",
        "Up to 30 posts per month",
        "Deep analytics & conversion learning",
      ],
    },
  ],
  planAgency: {
    id: "agency",
    name: "Agency",
    price: "$199",
    period: "/ client / month",
    setupPrice: "$799",
    setupLabel: "one-time",
    note: "Setup $799 once, then $199/mo per active client",
    desc: "For marketing agencies: dedicated AI employee per client and a centralized operator command center.",
    channels: ["Instagram", "Facebook", "Threads"],
    features: [
      "One-time setup fee $799",
      "Scale at $199/mo per client account",
      "Isolated Telegram channels per client",
      "Centralized agency operator dashboard",
      "Instagram, Facebook, Threads publishing",
      "Scale agency revenue with high gross margins",
    ],
  },
  faqTitle: "Frequently Asked Questions",
  faqSub: "Everything you need to know about deployment, security, and operations.",
  faqs: [
    {
      q: "How does AIME differ from a traditional SMM manager?",
      a: "AIME is a dedicated digital employee: no burnout, no missed deadlines, 24/7 reliability, and strict adherence to process. You only spend ~2 minutes daily approving ready drafts in Telegram.",
    },
    {
      q: "Is this just a scheduler like Buffer or Hootsuite?",
      a: "No. Schedulers are empty queues that require you to write, design, and upload everything. AIME does the market research, editorial planning, copywriting, visual creation, Reels scripting, and publishes upon approval.",
    },
    {
      q: "Is there an onboarding setup fee?",
      a: "For direct businesses, there is zero setup fee — you only pay the monthly subscription ($199 or $349). For agencies, a one-time infrastructure setup fee of $799 applies, followed by $199/mo per client.",
    },
    {
      q: "How does Telegram approval work?",
      a: "AIME sends complete post drafts (copy, hashtags, carousel slides, or Reels scripts) to your private team Telegram chat with interactive 'Approve', 'Edit', or 'Regenerate' buttons. Content goes live only after human approval.",
    },
    {
      q: "Who owns the Meta accounts and content?",
      a: "You retain 100% ownership. Everything connects via official Meta Graph APIs inside your own Business Suite. No personal passwords are ever shared.",
    },
    {
      q: "Is TikTok supported today?",
      a: "Currently, AIME focuses on the Meta ecosystem (Instagram, Facebook, Threads). Direct TikTok posting is on the roadmap and will launch following vendor compliance audit completion.",
    },
    {
      q: "How long does onboarding take?",
      a: "The platform is fully live in production: onboarding takes up to 5 business days after an initial discovery call and API permissions setup.",
    },
  ],
};

export function getAimeCopy(locale: Locale): AimeContent {
  return locale === "ru" ? aimeRu : aimeEn;
}
