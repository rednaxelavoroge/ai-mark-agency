import type { Locale } from "@/lib/site";
import type { PackageId, ProductId } from "@/content/packages";

export type NavItem = { href: string; label: string };

export type Copy = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    keywords: string[];
  };
  nav: {
    items: NavItem[];
    cta: string;
    langEn: string;
    langRu: string;
    themeLight: string;
    themeDark: string;
  };
  hero: {
    eyebrow: string;
    tagline: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    notes: string[];
  };
  products: {
    eyebrow: string;
    title: string;
    lead: string;
    whoLabel: string;
    extraLabel: string;
    detailCta: string;
    installCta: string;
    hubCta: string;
    items: Record<
      ProductId,
      { value: string; who: string; extra: string; price: string }
    >;
  };
  agencyStrip: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
  channels: {
    eyebrow: string;
    title: string;
    lead: string;
    loopTitle: string;
    loop: { title: string; note: string }[];
    linesTitle: string;
    status: { live: string; service: string; later: string };
    footnote: string;
    lines: {
      status: "live" | "service" | "later";
      name: string;
      body: string;
    }[];
  };
  model: {
    eyebrow: string;
    title: string;
    lead: string;
    chain: string[];
    shift: string;
    scaleTitle: string;
    scaleBody: string;
  };
  how: {
    eyebrow: string;
    title: string;
    lead: string;
    hitl: string;
    steps: { title: string; body: string }[];
  };
  packages: {
    eyebrow: string;
    title: string;
    lead: string;
    perMonth: string;
    featured: string;
    cta: string;
    items: Record<
      PackageId,
      { name: string; summary: string; points: string[] }
    >;
    footnote: string;
  };
  stack: {
    eyebrow: string;
    title: string;
    lead: string;
    readyTitle: string;
    ready: { title: string; body: string }[];
    laterTitle: string;
    later: { title: string; body: string }[];
  };
  compare: {
    eyebrow: string;
    title: string;
    lead: string;
    usLabel: string;
    rows: { name: string; body: string }[];
  };
  fit: {
    eyebrow: string;
    title: string;
    forTitle: string;
    forItems: string[];
    notTitle: string;
    notItems: string[];
  };
  partners: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    name: string;
    email: string;
    messenger: string;
    messengerHint: string;
    company: string;
    budget: string;
    budgetOptions: { value: string; label: string }[];
    submit: string;
    sending: string;
    success: string;
    error: string;
    privacy: string;
  };
  footer: {
    blurb: string;
    privacy: string;
    rights: string;
    poweredBy: string;
  };
  privacy: {
    title: string;
    updated: string;
    paragraphs: string[];
  };
  jsonLd: {
    description: string;
  };
};

export const copy: Record<Locale, Copy> = {
  en: {
    meta: {
      title: "AI Mark Agency — marketing as a continuously running AI system",
      description:
        "AI-native marketing company. Most ops run through an AI system and specialized agents; humans own strategy, clients, and key decisions. Retainers $1,200–3,500/mo. The stack is live — not a concept deck.",
      ogTitle: "Marketing as a continuously running AI system",
      keywords: [
        "AI marketing agency",
        "AI-native marketing",
        "Meta marketing",
        "AIME",
        "human in the loop",
        "ai-mark.agency",
      ],
    },
    nav: {
      items: [
        { href: "#tools", label: "Tools" },
        { href: "#channels", label: "Channels" },
        { href: "#how", label: "How it works" },
        { href: "#packages", label: "Packages" },
        { href: "#partners", label: "Partners" },
      ],
      cta: "Start a brief",
      langEn: "EN",
      langRu: "RU",
      themeLight: "Switch to light theme",
      themeDark: "Switch to dark theme",
    },
    hero: {
      eyebrow: "AI-native marketing company",
      tagline: "Marketing as a continuously running AI system.",
      title: "Most of the ops run in the system. Humans own the decisions.",
      lead: "AI Mark Agency is not a concept deck. The AI stack already exists and is used commercially. Specialized agents handle repeatable work. People own strategy, client relations, and key calls — including every publish until you say otherwise.",
      primaryCta: "See retainers",
      secondaryCta: "See the stack",
      notes: [
        "We run the same system for end clients. We do not only sell seats to agencies.",
        "HITL: AI drafts → we check → you approve → publish. Never uncontrolled posting.",
        "Retainers $1,200–3,500 / month by scope.",
      ],
    },
    products: {
      eyebrow: "Tools we run / can install for you",
      title: "The stack we operate — and can provision on your accounts",
      lead: "Three products. We use them as the delivery OS for clients, and we can install them for you. Full detail for each lives on this site.",
      whoLabel: "Who it's for",
      extraLabel: "In the loop",
      detailCta: "Full detail",
      installCta: "Install with us",
      hubCta: "All three product pages",
      items: {
        aime: {
          value:
            "AI Marketing Employee: research → strategy → content → creatives → approval → publish → analytics → optimization.",
          who: "Brands and shops that need a weekly marketing cycle, not a monthly content dump.",
          extra: "Human approval before publish. Optional auto-publish after several good cycles.",
          price:
            "Lite ~$199/mo · Pro ~$349/mo. Agency: setup + per-client MRR. License path for self-host.",
        },
        assistant: {
          value:
            "Sales inbox + knowledge base + lead qualify + human handoff.",
          who: "Teams that need an AI sales inbox, not a chatbot funnel builder.",
          extra:
            "Channels: Messenger · Instagram Direct · WhatsApp · site chat · Telegram optional.",
          price: "Entry $149/mo · Standard $249/mo",
        },
        showroom: {
          value: "Quotes, specs, and PDF automation from your pricing rules.",
          who: "Teams selling configurable offers who need CPQ, not a generic chatbot quote.",
          extra: "Verticals: furniture · auto · real estate · retail · services.",
          price:
            "Self-serve setup $0 or ~$300 done-for-you. Then ~$199 / $299/mo by quote quota.",
        },
      },
    },
    agencyStrip: {
      eyebrow: "Parallel B2B line",
      title: "Autonomous toolkit for agencies",
      body: "Already a marketing shop and want the stack yourselves — AIME multi-client (Agency setup + per-client MRR) or a License buy-in? Those tracks are on the product pages. AI Mark Agency stays the service company.",
      cta: "Agency / License details",
    },
    channels: {
      eyebrow: "Channels & growth",
      title: "One growth loop. Extra channels are retainer lines — not new products.",
      lead: "Ads → landing → content → inbox → offer → analytics. AIME, AI Business Assistant, and Showroom sit in that loop. Other channels can be included in a retainer by scope. We do not sell a PR-Agent or a YouTube-Agent SKU.",
      loopTitle: "Full growth loop",
      loop: [
        { title: "Ads", note: "Traffic in" },
        { title: "Landing / CRO", note: "The page that must convert" },
        { title: "Content (AIME)", note: "Research → publish" },
        { title: "Inbox (BA)", note: "Qualify + handoff" },
        { title: "Offer (Showroom)", note: "Quote / spec / PDF" },
        { title: "Analytics", note: "Back into the loop" },
      ],
      linesTitle: "Channel lines — honest readiness",
      status: {
        live: "Phase 1 · live",
        service: "Service line",
        later: "Later / optional",
      },
      footnote:
        "Retainers can include these lines when the offer needs them. Soft claims only — no promised CAC, ROAS, or rankings.",
      lines: [
        {
          status: "live",
          name: "Meta / Instagram / Facebook",
          body: "Primary. Phase 1 is live. Organic path with human approval. Starter is Instagram-first; Growth is full Meta.",
        },
        {
          status: "service",
          name: "Ads / performance",
          body: "Strategy and creatives with AI support. Campaigns sit in the client’s ad account. A human launches. Media spend is yours.",
        },
        {
          status: "service",
          name: "YouTube / short video",
          body: "Scripts, covers, and subtitles with AI. Edit and voice are semi-auto. Not a one-click publisher and not a YouTube product SKU.",
        },
        {
          status: "service",
          name: "PR / articles / SEO-GEO",
          body: "Brief → draft → edit → publish, same HITL as content. A retainer line when needed — not a separate PR-Agent.",
        },
        {
          status: "service",
          name: "Email / reactivation",
          body: "Sequences for people already in the loop. Added by scope, not a default second inbox product.",
        },
        {
          status: "later",
          name: "Reputation / reviews",
          body: "Later / optional. We do not pretend review-ops is Phase 1.",
        },
      ],
    },
    model: {
      eyebrow: "How the company is built",
      title: "Internal OS. Delivery tool. Product. Platform later.",
      lead: "The same system is how we work, how we deliver, and what we can install. Not a slide about a future app.",
      chain: [
        "Working AI system",
        "Clients",
        "Proven unit economics",
        "Scale sales",
        "Deepen the platform",
      ],
      shift:
        "We do not only sell tech to agencies. We run the same system as an AI-native marketing company for end clients.",
      scaleTitle: "Why it scales without a headcount factory",
      scaleBody:
        "A classic agency grows people as it grows clients. Here repeatable work is AI: more clients → more automated workflows → ops growth stays controlled. Soft claim: one strong operator can run about 8–12 clients, depending on package and automation — not a guarantee.",
    },
    how: {
      eyebrow: "Operating loop",
      title: "How the work actually moves",
      lead: "One loop, not a content dump. Creative sits in the cycle. Analytics and optimization feed the next research pass.",
      hitl: "HITL: AI drafts → a human checks → the client approves → we publish. After several good cycles, optional auto-publish. Never uncontrolled AI posting.",
      steps: [
        {
          title: "Research",
          body: "Audience, offer, competitors, what already earns attention — before a line of copy.",
        },
        {
          title: "Strategy",
          body: "Who we talk to, what we say, which surfaces we actually use this month.",
        },
        {
          title: "Content",
          body: "Drafts from the agents, steered by the operator. Volume without generic sludge.",
        },
        {
          title: "Creative",
          body: "Creatives in the same loop — not a separate “design dump” after the calendar is already late.",
        },
        {
          title: "Approval",
          body: "Named human path. If it is not approved, it does not go live.",
        },
        {
          title: "Publish",
          body: "Shipped on the agreed channels with naming and tracking we can learn from.",
        },
        {
          title: "Analytics",
          body: "What ran, what stalled. Numbers as operating data — not invented lift.",
        },
        {
          title: "Optimization",
          body: "Cut, keep, change. The next research cycle starts from evidence.",
        },
      ],
    },
    packages: {
      eyebrow: "Service pricing",
      title: "Retainers $1,200–3,500 / month, by scope.",
      lead: "All packages keep a human in the loop. USD monthly. Paid media spend is yours and is not in the retainer.",
      perMonth: "/mo",
      featured: "Most teams start here",
      cta: "Request this package",
      items: {
        starter: {
          name: "Starter",
          summary: "Instagram plus an approval path. One brand.",
          points: [
            "One brand, Instagram as the working channel",
            "Content + creative drafts in the loop",
            "Named approval path before publish",
            "Operator-led QA on every asset",
          ],
        },
        growth: {
          name: "Growth",
          summary: "Full Meta (Instagram + Facebook), HITL, weekly research loop.",
          points: [
            "Instagram and Facebook as a paired Meta system",
            "Inbox and Showroom niches when the offer needs them",
            "Human-in-the-loop on every publish",
            "Analytics feeding the next cycle",
          ],
        },
        scale: {
          name: "Scale",
          summary: "Multi-brand or heavier volume. Still HITL — no autopilot.",
          points: [
            "More brands or a heavier content load",
            "Same approval discipline as Growth",
            "More of the loop automated — still not uncontrolled posting",
            "One accountable operator, not a black box",
          ],
        },
      },
      footnote:
        "Range is $1,200–3,500 / month by scope. One strong operator can run about 8–12 clients depending on package and automation. Media buying, if needed, is a separate scope.",
    },
    stack: {
      eyebrow: "Go-to-market — honest",
      title: "Phase 1 is Meta. Other channels earn a seat.",
      lead: "We do not sell a ten-platform OS on day one. First we run the system where it is already live, and we measure the work.",
      readyTitle: "Phase 1 — now",
      ready: [
        {
          title: "Meta / Instagram / Facebook",
          body: "Service delivery on the surfaces we actually operate. Starter is Instagram-first. Growth is full Meta.",
        },
        {
          title: "Service + inbox + Showroom niches",
          body: "Retainers plus the sales inbox and quoting where the offer needs it — not bundled theatre.",
        },
        {
          title: "What we measure",
          body: "CAC, conversion, MRR, retention, ops cost, operator load, AI share of work. Operating metrics — not promised lift.",
        },
      ],
      laterTitle: "Phase 2 — after unit economics",
      later: [
        {
          title: "Google, YouTube, SEO, more social",
          body: "Added when Phase 1 unit economics are real for that motion — not as a kickoff checklist.",
        },
        {
          title: "Partners and international",
          body: "Referral and regional partners can run alongside our own sales. New markets follow the same HITL system.",
        },
        {
          title: "A login instead of an operator",
          body: "If you want the products without the retainer, that is the toolkit line — not a silent rebrand of this site.",
        },
      ],
    },
    compare: {
      eyebrow: "Landscape",
      title: "Same job? Not the same system.",
      lead: "We use the system to deliver services. We do not only sell seat access.",
      usLabel: "AI Mark Agency",
      rows: [
        {
          name: "AI content tools",
          body: "Generate and schedule posts. A calendar helper, not an operating company.",
        },
        {
          name: "Predis-like",
          body: "Social content plus publish. Useful layer. Not research → approve → optimize as a retained service.",
        },
        {
          name: "ManyChat-like",
          body: "Chat funnels and broadcasts. Different job than a sales inbox with KB and human handoff.",
        },
        {
          name: "Classic agencies",
          body: "People plus a retainer. Headcount grows with clients. Repeatable work stays manual.",
        },
        {
          name: "AI Mark Agency",
          body: "AI system + service + continuous automation. HITL by default. The stack is how we deliver.",
        },
      ],
    },
    fit: {
      eyebrow: "Fit",
      title: "Who this is for — and who should walk away",
      forTitle: "Good fit",
      forItems: [
        "You want marketing as a running system, not a monthly dump of posts",
        "You will approve work on a cadence (or name someone who will)",
        "Meta is a sensible first surface — Instagram, then Facebook when it has a job",
        "You want an operator plus agents, not a 12-person pitch deck",
      ],
      notTitle: "Not a fit",
      notItems: [
        "Uncontrolled AI posting. We will not run that.",
        "Guaranteed ROI, guaranteed viral, or any invented percentage",
        "Ten channels from week one with no one to approve",
        "The cheapest scheduler seat, with no service attached",
      ],
    },
    partners: {
      eyebrow: "Partners",
      title: "Referral and regional partners",
      body: "Bring a client → we onboard → commission as agreed. Our own sales, digital acquisition, and partners can coexist.",
      cta: "Talk partnership",
    },
    contact: {
      eyebrow: "Brief",
      title: "Tell us the brand — or the partnership.",
      lead: "Short form. If the fit is wrong, we will say so. Telegram or WhatsApp is enough if you live in messengers.",
      name: "Name",
      email: "Email",
      messenger: "Telegram or WhatsApp",
      messengerHint: "Handle or number",
      company: "Company / brand",
      budget: "What you need",
      budgetOptions: [
        { value: "starter", label: "Starter · ~$1,200/mo" },
        { value: "growth", label: "Growth · ~$2,200/mo" },
        { value: "scale", label: "Scale · ~$3,500/mo" },
        { value: "tools", label: "Tools / install only" },
        { value: "partner", label: "Referral / regional partnership" },
        { value: "unsure", label: "Not sure yet" },
      ],
      submit: "Send brief",
      sending: "Sending…",
      success: "Received. We will reply to the email or messenger you left.",
      error: "Could not send. Email hello@ai-mark.agency or try again.",
      privacy: "By sending, you agree we may contact you about this brief. See Privacy.",
    },
    footer: {
      blurb:
        "Marketing as a continuously running AI system. AI-native marketing company — humans on strategy, clients, and key decisions.",
      privacy: "Privacy",
      rights: "AI Mark Agency. All rights reserved.",
      poweredBy: "Tech by AlexDev",
    },
    privacy: {
      title: "Privacy",
      updated: "Last updated: 21 September 2026",
      paragraphs: [
        "AI Mark Agency (ai-mark.agency) collects the information you submit through the contact form: name, email, messenger handle, company, and what you need. We use it only to reply and to decide whether we can take the work or a referral partnership.",
        "We do not sell your data. We do not run a public analytics product on this site beyond what the hosting platform needs to keep the site up. Form submissions are emailed to our operator inbox.",
        "You can ask us to delete a brief by writing to hello@ai-mark.agency. This page is a stub and will be expanded if we add more processing (newsletters, ads pixels, hiring).",
        "Hosting may be provided by Vercel. Email delivery may be provided by a transactional email vendor. Those processors see only what is required to deliver the service.",
      ],
    },
    jsonLd: {
      description:
        "AI-native marketing company. An AI system and specialized agents run most ops; humans own strategy, client relations, and key decisions. Retainers $1,200–3,500 per month.",
    },
  },
  ru: {
    meta: {
      title: "AI Mark Agency — маркетинг как постоянно работающая AI-система",
      description:
        "AI-native маркетинговая компания. Большая часть операций идёт через AI-систему и специализированных агентов; люди держат стратегию, клиентов и ключевые решения. Ретейнеры $1,200–3,500/мес. Стек уже в работе — не концепт-дек.",
      ogTitle: "Маркетинг как постоянно работающая AI-система",
      keywords: [
        "AI маркетинговое агентство",
        "AI-native маркетинг",
        "Meta маркетинг",
        "AIME",
        "human in the loop",
        "ai-mark.agency",
      ],
    },
    nav: {
      items: [
        { href: "#tools", label: "Инструменты" },
        { href: "#channels", label: "Каналы" },
        { href: "#how", label: "Как работаем" },
        { href: "#packages", label: "Пакеты" },
        { href: "#partners", label: "Партнёры" },
      ],
      cta: "Оставить бриф",
      langEn: "EN",
      langRu: "RU",
      themeLight: "Светлая тема",
      themeDark: "Тёмная тема",
    },
    hero: {
      eyebrow: "AI-native маркетинговая компания",
      tagline: "Маркетинг как постоянно работающая AI-система.",
      title: "Операционка — в системе. Решения — за людьми.",
      lead: "AI Mark Agency — не концепт-дек. AI-стек уже существует и используется коммерчески. Специализированные агенты закрывают повторяемую работу. Люди держат стратегию, отношения с клиентом и ключевые решения — включая каждую публикацию, пока вы не скажете иначе.",
      primaryCta: "Смотреть ретейнеры",
      secondaryCta: "Смотреть стек",
      notes: [
        "Ту же систему ведём для конечных клиентов. Мы не только продаём доступ агентствам.",
        "HITL: AI готовит → мы проверяем → вы апрувите → публикация. Без бесконтрольного постинга.",
        "Ретейнеры $1,200–3,500 / месяц в зависимости от скоупа.",
      ],
    },
    products: {
      eyebrow: "Инструменты, которые ведём / можем поставить вам",
      title: "Стек, который мы ведём — и можем поставить на ваши аккаунты",
      lead: "Три продукта. Это и операционная система поставки, и то, что можно установить вам. Полные страницы каждого продукта — на этом сайте.",
      whoLabel: "Кому",
      extraLabel: "В цикле",
      detailCta: "Подробности",
      installCta: "Поставить через нас",
      hubCta: "Все три страницы продуктов",
      items: {
        aime: {
          value:
            "AI Marketing Employee: исследование → стратегия → контент → креативы → апрув → публикация → аналитика → оптимизация.",
          who: "Брендам и командам с еженедельным циклом, а не с месячной свалкой постов.",
          extra:
            "Апрув человека до публикации. После нескольких удачных циклов — опциональный автопаблиш.",
          price:
            "Lite ~$199/мес · Pro ~$349/мес. Agency: setup + MRR за клиента. License — если хостите сами.",
        },
        assistant: {
          value:
            "Продажный inbox + база знаний + квалификация лида + handoff человеку.",
          who: "Командам, которым нужен AI-inbox продаж, а не конструктор чат-воронок.",
          extra:
            "Каналы: Messenger · Instagram Direct · WhatsApp · чат на сайте · Telegram опционально.",
          price: "Entry $149/мес · Standard $249/мес",
        },
        showroom: {
          value: "Котировки, спецификации и PDF по вашим правилам цены.",
          who: "Командам с конфигурируемым оффером, которым нужен CPQ, а не чат с «ценой».",
          extra: "Вертикали: мебель · авто · недвижимость · ритейл · услуги.",
          price:
            "Self-serve setup $0 или ~$300 done-for-you. Дальше ~$199 / $299/мес по квоте котировок.",
        },
      },
    },
    agencyStrip: {
      eyebrow: "Параллельная B2B-линия",
      title: "Autonomous toolkit for agencies",
      body: "Уже маркетинговое агентство и хотите стек себе — AIME multi-client (Agency setup + MRR за клиента) или License? Эти треки — на страницах продуктов. AI Mark Agency остаётся сервисной компанией.",
      cta: "Agency / License подробно",
    },
    channels: {
      eyebrow: "Каналы и рост",
      title: "Один цикл роста. Доп. каналы — линии ретейнера, не новые продукты.",
      lead: "Реклама → лендинг → контент → inbox → оффер → аналитика. В цикле сидят AIME, AI Business Assistant и Showroom. Остальные каналы можно включить в ретейнер по скоупу. Отдельных SKU «PR-Agent» или «YouTube-Agent» мы не продаём.",
      loopTitle: "Полный цикл роста",
      loop: [
        { title: "Реклама", note: "Трафик в систему" },
        { title: "Лендинг / CRO", note: "Страница, которая должна конвертить" },
        { title: "Контент (AIME)", note: "Исследование → публикация" },
        { title: "Inbox (BA)", note: "Квалификация + handoff" },
        { title: "Оффер (Showroom)", note: "Котировка / спецификация / PDF" },
        { title: "Аналитика", note: "Обратно в цикл" },
      ],
      linesTitle: "Линии каналов — честная готовность",
      status: {
        live: "Фаза 1 · live",
        service: "Линия услуги",
        later: "Позже / опционально",
      },
      footnote:
        "Эти линии можно включить в ретейнер, если офферу это нужно. Только мягкие формулировки — без обещанного CAC, ROAS или позиций.",
      lines: [
        {
          status: "live",
          name: "Meta / Instagram / Facebook",
          body: "Основной канал. Фаза 1 в работе. Органика с апрувом человека. Starter — Instagram-first; Growth — полная Meta.",
        },
        {
          status: "service",
          name: "Реклама / performance",
          body: "Стратегия и креативы с поддержкой AI. Кабинеты клиента. Запуск — человек. Медиабюджет — ваш.",
        },
        {
          status: "service",
          name: "YouTube / короткий видео",
          body: "Сценарии, обложки, субтитры с AI. Монтаж и голос — полуавтомат. Не кнопка «опубликовать» и не отдельный YouTube-продукт.",
        },
        {
          status: "service",
          name: "PR / статьи / SEO-GEO",
          body: "Бриф → черновик → редактура → публикация, тот же HITL. Линия ретейнера по задаче — не отдельный PR-Agent.",
        },
        {
          status: "service",
          name: "Email / реактивация",
          body: "Цепочки для тех, кто уже в контуре. Подключается скоупом, не вторым inbox-продуктом.",
        },
        {
          status: "later",
          name: "Репутация / отзывы",
          body: "Позже / опционально. Не делаем вид, что review-ops — это фаза 1.",
        },
      ],
    },
    model: {
      eyebrow: "Как устроена компания",
      title: "Внутренняя OS. Инструмент поставки. Продукт. Платформа — позже.",
      lead: "Одна система: так мы работаем, так поставляем услугу и то, что можем поставить вам. Это не слайд про будущее приложение.",
      chain: [
        "Рабочая AI-система",
        "Клиенты",
        "Понятная юнит-экономика",
        "Масштаб продаж",
        "Углубление платформы",
      ],
      shift:
        "Мы не только продаём технологии агентствам. Ту же систему ведём как AI-native маркетинговая компания для конечных клиентов.",
      scaleTitle: "Почему это масштабируется без фабрики голов",
      scaleBody:
        "Классическое агентство растёт людьми вместе с клиентами. Здесь повторяемая работа — AI: больше клиентов → больше автоматизированных циклов → рост ops под контролем. Мягкая оценка: один сильный оператор тянет около 8–12 клиентов — зависит от пакета и автоматизации, это не гарантия.",
    },
    how: {
      eyebrow: "Операционный цикл",
      title: "Как работа реально движется",
      lead: "Один цикл, а не свалка постов. Креатив внутри цикла. Аналитика и оптимизация кормят следующее исследование.",
      hitl: "HITL: AI готовит → человек проверяет → клиент апрувит → публикация. После нескольких удачных циклов — опциональный автопаблиш. Бесконтрольного AI-постинга нет.",
      steps: [
        {
          title: "Исследование",
          body: "Аудитория, оффер, конкуренты, что уже собирает внимание — до первой строки.",
        },
        {
          title: "Стратегия",
          body: "С кем говорим, что говорим, какие поверхности реально используем в этом месяце.",
        },
        {
          title: "Контент",
          body: "Черновики агентов под управлением оператора. Объём без серой каши.",
        },
        {
          title: "Креатив",
          body: "Креативы в том же цикле — не отдельная «свалка дизайна», когда календарь уже опаздывает.",
        },
        {
          title: "Апрув",
          body: "Именной человеческий путь. Нет апрува — нет эфира.",
        },
        {
          title: "Публикация",
          body: "В согласованные каналы, с неймингом и метками, по которым можно учиться.",
        },
        {
          title: "Аналитика",
          body: "Что вышло, что встало. Цифры как операционные данные — не выдуманный lift.",
        },
        {
          title: "Оптимизация",
          body: "Режем, оставляем, меняем. Следующее исследование начинается с фактов.",
        },
      ],
    },
    packages: {
      eyebrow: "Сервисный прайс",
      title: "Ретейнеры $1,200–3,500 / месяц, по скоупу.",
      lead: "Во всех пакетах человек в контуре. USD в месяц. Медиабюджет — ваш и в ретейнер не входит.",
      perMonth: "/мес",
      featured: "Чаще начинают отсюда",
      cta: "Запросить пакет",
      items: {
        starter: {
          name: "Starter",
          summary: "Instagram и путь апрува. Один бренд.",
          points: [
            "Один бренд, Instagram как рабочий канал",
            "Контент и креативы в одном цикле",
            "Именной путь апрува до публикации",
            "Операторский контроль каждого материала",
          ],
        },
        growth: {
          name: "Growth",
          summary: "Полная Meta (Instagram + Facebook), HITL, еженедельное исследование.",
          points: [
            "Instagram и Facebook как одна Meta-система",
            "Inbox и Showroom-ниши, если офферу это нужно",
            "Человек в контуре на каждой публикации",
            "Аналитика кормит следующий цикл",
          ],
        },
        scale: {
          name: "Scale",
          summary: "Несколько брендов или больший объём. HITL остаётся — автопилота нет.",
          points: [
            "Больше брендов или тяжелее контент-нагрузка",
            "Та же дисциплина апрува, что на Growth",
            "Больше цикла автоматизировано — без бесконтрольного постинга",
            "Один ответственный оператор, не чёрный ящик",
          ],
        },
      },
      footnote:
        "Диапазон $1,200–3,500 / месяц по скоупу. Один сильный оператор тянет около 8–12 клиентов — зависит от пакета и автоматизации. Байинг, если нужен, — отдельный скоуп.",
    },
    stack: {
      eyebrow: "Выход на рынок — честно",
      title: "Фаза 1 — Meta. Остальные каналы зарабатывают место.",
      lead: "Мы не продаём OS на десять площадок в первый день. Сначала ведём систему там, где она уже живая, и мерим работу.",
      readyTitle: "Фаза 1 — сейчас",
      ready: [
        {
          title: "Meta / Instagram / Facebook",
          body: "Поставка на поверхностях, которые реально ведём. Starter — Instagram-first. Growth — полная Meta.",
        },
        {
          title: "Сервис + inbox + ниши Showroom",
          body: "Ретейнер плюс продажный inbox и котировки, если офферу это нужно — не «для галочки».",
        },
        {
          title: "Что мерим",
          body: "CAC, конверсия, MRR, удержание, ops-себестоимость, нагрузка оператора, доля AI в работе. Операционные метрики — не обещанный lift.",
        },
      ],
      laterTitle: "Фаза 2 — после юнит-экономики",
      later: [
        {
          title: "Google, YouTube, SEO, другие соцсети",
          body: "Подключаем, когда юнит-экономика фазы 1 по этому движению реальна — не чеклистом на кикоффе.",
        },
        {
          title: "Партнёры и международка",
          body: "Реферальные и региональные партнёры могут идти рядом с собственными продажами. Новые рынки — та же HITL-система.",
        },
        {
          title: "Логин вместо оператора",
          body: "Если продукты нужны без ретейнера, это линия toolkit — не тихий ребренд этого сайта.",
        },
      ],
    },
    compare: {
      eyebrow: "Поле",
      title: "Та же задача? Не та же система.",
      lead: "Систему используем, чтобы поставлять услугу. Мы не только продаём доступ к местам.",
      usLabel: "AI Mark Agency",
      rows: [
        {
          name: "AI-инструменты контента",
          body: "Генерация и расписание постов. Помощник календаря, не операционная компания.",
        },
        {
          name: "Класс Predis",
          body: "Соцконтент плюс публикация. Полезный слой. Это не исследование → апрув → оптимизация как ретейнер.",
        },
        {
          name: "Класс ManyChat",
          body: "Чат-воронки и рассылки. Другая задача, чем продажный inbox с базой знаний и handoff.",
        },
        {
          name: "Классические агентства",
          body: "Люди плюс ретейнер. Штат растёт с клиентами. Повторяемая работа остаётся ручной.",
        },
        {
          name: "AI Mark Agency",
          body: "AI-система + услуга + непрерывная автоматизация. HITL по умолчанию. Стек — способ поставки.",
        },
      ],
    },
    fit: {
      eyebrow: "Совпадение",
      title: "Кому это нужно — и кому лучше уйти",
      forTitle: "Хороший фит",
      forItems: [
        "Нужен маркетинг как работающая система, а не месячная свалка постов",
        "Будете апрувить по ритму (или назовёте того, кто будет)",
        "Meta — разумная первая поверхность: Instagram, затем Facebook по задаче",
        "Нужен оператор плюс агенты, а не колода из двенадцати человек",
      ],
      notTitle: "Не фит",
      notItems: [
        "Бесконтрольный AI-постинг. Так мы не работаем.",
        "Гарантия ROI, виральности или любой выдуманный процент",
        "Десять каналов с первой недели без того, кто апрувит",
        "Самый дешёвый scheduler без услуги",
      ],
    },
    partners: {
      eyebrow: "Партнёры",
      title: "Реферальные и региональные партнёры",
      body: "Привели клиента → мы онбордим → комиссия по договорённости. Собственные продажи, цифра и партнёры могут жить рядом.",
      cta: "Обсудить партнёрство",
    },
    contact: {
      eyebrow: "Бриф",
      title: "Назовите бренд — или партнёрство.",
      lead: "Короткая форма. Если фит плохой — так и напишем. Telegram или WhatsApp достаточно, если вы живёте в мессенджерах.",
      name: "Имя",
      email: "Email",
      messenger: "Telegram или WhatsApp",
      messengerHint: "Ник или номер",
      company: "Компания / бренд",
      budget: "Что нужно",
      budgetOptions: [
        { value: "starter", label: "Starter · ~$1,200/мес" },
        { value: "growth", label: "Growth · ~$2,200/мес" },
        { value: "scale", label: "Scale · ~$3,500/мес" },
        { value: "tools", label: "Только инструменты / установка" },
        { value: "partner", label: "Реферальное / региональное партнёрство" },
        { value: "unsure", label: "Пока не уверен(а)" },
      ],
      submit: "Отправить бриф",
      sending: "Отправляем…",
      success: "Получили. Ответим на email или в мессенджер, который вы оставили.",
      error: "Не отправилось. Напишите hello@ai-mark.agency или попробуйте ещё раз.",
      privacy: "Отправляя, вы соглашаетесь, что мы свяжемся по этому брифу. См. Privacy.",
    },
    footer: {
      blurb:
        "Маркетинг как постоянно работающая AI-система. AI-native маркетинговая компания — люди на стратегии, клиентах и ключевых решениях.",
      privacy: "Конфиденциальность",
      rights: "AI Mark Agency. Все права защищены.",
      poweredBy: "Технологии: AlexDev",
    },
    privacy: {
      title: "Конфиденциальность",
      updated: "Обновлено: 21 сентября 2026",
      paragraphs: [
        "AI Mark Agency (ai-mark.agency) собирает данные формы: имя, email, мессенджер, компанию и запрос. Используем их только чтобы ответить и решить, берём ли работу или реферальное партнёрство.",
        "Мы не продаём данные. На сайте нет отдельного аналитического продукта сверх того, что нужно хостингу. Заявки уходят на почту оператора.",
        "Попросить удалить бриф можно на hello@ai-mark.agency. Это заглушка политики; расширим, если появится рассылка, пиксели или найм.",
        "Хостинг может быть на Vercel. Доставка писем — через транзакционного провайдера. Они видят только то, что нужно для доставки сервиса.",
      ],
    },
    jsonLd: {
      description:
        "AI-native маркетинговая компания. AI-система и специализированные агенты ведут большую часть операций; люди держат стратегию, клиентов и ключевые решения. Ретейнеры $1,200–3,500 в месяц.",
    },
  },
};

export function getCopy(locale: Locale): Copy {
  return copy[locale];
}
