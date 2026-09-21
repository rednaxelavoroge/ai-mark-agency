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
    menu: string;
    close: string;
    langEn: string;
    langRu: string;
    themeLight: string;
    themeDark: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    extra: string;
    soft: string;
    primaryCta: string;
    secondaryCta: string;
    investorCta: string;
  };
  pillars: {
    eyebrow: string;
    title: string;
    items: { n: string; title: string; body: string }[];
  };
  creation: {
    eyebrow: string;
    title: string;
    lead: string;
    withoutIdea: string;
    steps: { title: string; body: string }[];
  };
  pipeline: {
    eyebrow: string;
    title: string;
    steps: string[];
  };
  tech: {
    eyebrow: string;
    title: string;
    lead: string;
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
    hubTitle: string;
    hubLead: string;
    items: Record<
      ProductId,
      { value: string; who: string; extra: string; price: string }
    >;
  };
  production: {
    eyebrow: string;
    title: string;
    lead: string;
    note: string;
    items: string[];
  };
  cycle: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: string[];
  };
  how: {
    eyebrow: string;
    title: string;
    lead: string;
    hitl: string;
    steps: { title: string; body: string }[];
  };
  commercial: {
    eyebrow: string;
    title: string;
    lead: string;
    skuNote: string;
    perMonth: string;
    featured: string;
    retainerCta: string;
    custom: string;
    tiers: {
      name: string;
      price: string;
      body: string;
    }[];
    footnote: string;
  };
  packages: {
    items: Record<
      PackageId,
      { name: string; summary: string; points: string[] }
    >;
  };
  partners: {
    eyebrow: string;
    title: string;
    lead: string;
    model: string;
    earn: string;
    cta: string;
    types: { title: string; body: string }[];
    can: string[];
  };
  why: {
    eyebrow: string;
    title: string;
    lead: string;
    oldLabel: string;
    newLabel: string;
    old: string[];
    next: string[];
    close: string;
  };
  investors: {
    eyebrow: string;
    title: string;
    lead: string;
    usesTitle: string;
    uses: string[];
    not: string;
    scale: string;
    cta: string;
  };
  network: {
    eyebrow: string;
    title: string;
    result: string;
    nodes: string[];
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
    scenario: string;
    scenarioOptions: { value: string; label: string; hint: string }[];
    submit: string;
    sending: string;
    success: string;
    error: string;
    privacy: string;
  };
  productPages: Record<
    ProductId,
    {
      eyebrow: string;
      title: string;
      lead: string;
      metaphor: string;
      sections: { title: string; body: string }[];
      flow: string[];
    }
  >;
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
      title: "AI Mark — From Idea to Business",
      description:
        "AI-native venture and marketing company. We research the market, form a model, build the digital product, then run marketing, sales, and growth on our own AI infrastructure. No profit guarantees.",
      ogTitle: "AI Mark — From Idea to Business",
      keywords: [
        "AI-native company",
        "business creation",
        "AI marketing",
        "digital production",
        "AIME",
        "Showroom AI",
        "ai-mark.agency",
      ],
    },
    nav: {
      items: [
        { href: "/", label: "Home" },
        { href: "#what-we-do", label: "What we do" },
        { href: "#business-creation", label: "Business Creation" },
        { href: "/products", label: "AI Products" },
        { href: "#how", label: "How it works" },
        { href: "#partners", label: "Partners" },
        { href: "/investors", label: "Investors" },
        { href: "#contact", label: "Contact" },
      ],
      cta: "Discuss a project",
      menu: "Menu",
      close: "Close",
      langEn: "EN",
      langRu: "RU",
      themeLight: "Switch to light theme",
      themeDark: "Switch to dark theme",
    },
    hero: {
      eyebrow: "AI-Native Venture & Marketing Company",
      title: "From idea to a working business.",
      lead: "We research the market, form the model, build the digital product, then run marketing and sales — and scale the operation with AI.",
      extra: "We create and scale digital businesses using our own AI infrastructure.",
      soft: "We can help you move from an idea or a research brief to something built, launched, and operated. We do not guarantee profit.",
      primaryCta: "Discuss a project",
      secondaryCta: "How it works",
      investorCta: "For investors",
    },
    pillars: {
      eyebrow: "What we can do",
      title: "Five parts of the same loop.",
      items: [
        {
          n: "01",
          title: "Business creation",
          body: "From an idea, an existing company, or capital — we form a model the market can actually hold.",
        },
        {
          n: "02",
          title: "Digital Production",
          body: "Sites, apps, platforms, cabinets, integrations, and AI systems that the business runs on.",
        },
        {
          n: "03",
          title: "AI Marketing",
          body: "Strategy, content, creatives, ads, and analytics as a continuous cycle — not a monthly dump.",
        },
        {
          n: "04",
          title: "AI Sales",
          body: "Business Assistant inbox: qualify, answer from a knowledge base, hand off to a human.",
        },
        {
          n: "05",
          title: "Growth",
          body: "Analytics, optimization, automation, and scale on the same infrastructure.",
        },
      ],
    },
    creation: {
      eyebrow: "Business Creation",
      title: "Don't know which business to build? Start with the market.",
      lead: "Come with an idea, an existing business, capital, or without a concrete idea. We start from demand, not from a slogan.",
      withoutIdea:
        "If you do not have an idea yet, we can propose several concepts from the market, your capital, interests, and resources. That is a structured shortlist — not a guaranteed profitable business.",
      steps: [
        { title: "Market research", body: "Demand, competitors, constraints, and where a real offer can sit." },
        { title: "Opportunities", body: "A short list of spaces worth building in — with reasons, not slogans." },
        { title: "Several concepts", body: "More than one model, so you choose with comparison, not with hope." },
        { title: "Choose the model", body: "Offer, economics sketch, and what must be true for it to operate." },
        { title: "Build the product", body: "The site, platform, or AI system the business actually runs on." },
        { title: "Launch", body: "Go live with tracking, offers, and a path for the first conversations." },
        { title: "Marketing & sales", body: "Content, ads, inbox, and quotes on the same loop." },
        { title: "Scale", body: "Optimize what already runs. Automate the repeatable parts. Keep humans on decisions." },
      ],
    },
    pipeline: {
      eyebrow: "The path",
      title: "One sequence. Join at any step.",
      steps: [
        "Idea / capital",
        "Market research",
        "Business model",
        "Brand",
        "Product / platform",
        "AI infrastructure",
        "Marketing",
        "Sales",
        "Growth",
      ],
    },
    tech: {
      eyebrow: "Tech base",
      title: "Core AI infrastructure already built and used commercially.",
      lead: "We do not pitch a stack we plan to assemble later. Three products sit in the loop today — as the operating system for delivery, and as SKUs you can run.",
    },
    products: {
      eyebrow: "AI Products",
      title: "Three systems we operate — and can provision for you.",
      lead: "Product subscriptions are not the same as a retained marketing department. Detail for each lives on this domain.",
      whoLabel: "Who it's for",
      extraLabel: "In the loop",
      detailCta: "Full detail",
      installCta: "Talk installation",
      hubCta: "All product pages",
      hubTitle: "AI products",
      hubLead:
        "AIME, AI Business Assistant, and Showroom AI. We run them for clients and can install them on your accounts. Features below match what the products actually do.",
      items: {
        aime: {
          value:
            "AI marketing system: research → strategy → content → creatives → approval → publish → analytics → optimize. Not a scheduler.",
          who: "Brands that need a weekly marketing cycle, not a monthly pile of posts.",
          extra: "Human approval before publish. Optional auto-publish after several clean cycles.",
          price: "Lite ~$199/mo · Pro ~$349/mo. Agency: setup + per-client MRR. License path for self-host.",
        },
        assistant: {
          value:
            "Sales AI inbox — WhatsApp, Instagram Direct, Messenger, website chat, Telegram. Knowledge base, replies, qualify, human handoff.",
          who: "Teams that need a sales inbox, not a chatbot funnel builder.",
          extra: "A person takes over when the conversation needs a human.",
          price: "Entry $149/mo · Standard $249/mo",
        },
        showroom: {
          value:
            "Industry-neutral CPQ: complex commercial requests, specs, calculations, and quotes by your business rules.",
          who: "Teams selling configurable offers who need a spec and a quote, not a generic chatbot price.",
          extra:
            "Verticals include construction, real estate, auto, furniture, retail, manufacturing, services, and similar configurable trades.",
          price:
            "Self-serve setup $0 or ~$300 done-for-you. Then ~$199 / $299/mo by quote quota.",
        },
      },
    },
    production: {
      eyebrow: "Digital Production",
      title: "We build the digital infrastructure of the business.",
      lead: "Production is how Business Creation becomes real. We are not a web studio looking for unrelated brochure sites.",
      note: "Part of the same company that will market and sell what we build — when you want that loop.",
      items: [
        "Sites and landings",
        "Web apps and platforms",
        "Shops and client cabinets",
        "Internal systems",
        "Integrations",
        "AI features and automation",
      ],
    },
    cycle: {
      eyebrow: "Full cycle",
      title: "We can join at any stage, or walk the whole path together.",
      lead: "Research is not a slide. Build is not a handoff to a stranger. Marketing is not a separate agency story.",
      steps: [
        "Research",
        "Concept",
        "Build",
        "Marketing",
        "Sales",
        "Analytics",
        "Optimization",
        "Scale",
      ],
    },
    how: {
      eyebrow: "How it works",
      title: "AI-native operations. Humans on strategy and key decisions.",
      lead: "Work moves inside the AI system. People set direction, check the output, and own the call that goes live.",
      hitl: "AI prepares → a human checks → the client approves → we publish or act. After several clean cycles, auto-publish can be optional. We do not run uncontrolled automation.",
      steps: [
        {
          title: "Prepare",
          body: "Agents draft research, copy, creatives, replies, or specs against the brief and the knowledge you give us.",
        },
        {
          title: "Check",
          body: "An operator reads the work before it reaches you. Volume does not skip review.",
        },
        {
          title: "Approve",
          body: "You (or a named owner) sign off. If it is not approved, it does not go live.",
        },
        {
          title: "Act",
          body: "Publish, send, quote, or hand off — with a trail we can learn from.",
        },
      ],
    },
    commercial: {
      eyebrow: "Commercial model",
      title: "Several ways to work together. Retainers are one of them.",
      lead: "Pick a product SKU, a service sprint, a retained department, or a custom build. The prices below are bands, not a promise of outcome.",
      skuNote:
        "AI product subscriptions (roughly $149–349+/mo) are not the same thing as an AI Marketing Department retainer ($1,500–3,500+/mo).",
      perMonth: "/mo",
      featured: "Most teams start here",
      retainerCta: "Request this department",
      custom: "Custom",
      tiers: [
        {
          name: "AI Products",
          price: "$149–349+",
          body: "AIME, Business Assistant, Showroom AI as product SKUs — install and operate on your side, or with us.",
        },
        {
          name: "AI Marketing Services",
          price: "from $500+",
          body: "Scoped marketing work without a full retained department. Defined by brief, not by a fake package name.",
        },
        {
          name: "AI Marketing Department",
          price: "$1,500–3,500+",
          body: "Ongoing HITL marketing as a department: Starter, Growth, Scale. Media spend is yours and sits outside the retainer.",
        },
        {
          name: "Digital Production",
          price: "Custom",
          body: "Sites, apps, platforms, cabinets, integrations. Scoped after we see the operating need.",
        },
        {
          name: "Business Creation",
          price: "Custom",
          body: "Research through model, build, launch, and the commercial loop. Individual scope.",
        },
        {
          name: "Enterprise",
          price: "Custom",
          body: "Multi-brand, multi-market, or heavier production and department work under one agreement.",
        },
      ],
      footnote:
        "USD. Product list prices stay in the published bands on each product page. Department retainers are Starter $1,200 / Growth $2,200 / Scale $3,500 per month by scope. We do not guarantee ROI, CAC, or ROAS.",
    },
    packages: {
      items: {
        starter: {
          name: "Starter",
          summary: "Instagram plus an approval path. One brand.",
          points: [
            "One brand, Instagram as the working channel",
            "Content and creative drafts in the loop",
            "Named approval path before publish",
            "Operator-led QA on every asset",
          ],
        },
        growth: {
          name: "Growth",
          summary: "Full Meta (Instagram + Facebook), HITL, weekly research loop.",
          points: [
            "Instagram and Facebook as a paired Meta system",
            "Inbox and Showroom when the offer needs them",
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
    },
    partners: {
      eyebrow: "Partners",
      title: "An international partner network is how we scale presence.",
      lead: "We do not need a full office in every region to work a market. Partners bring clients, represent the solutions, and grow a territory.",
      model:
        "International presence without building our own infrastructure in every country. Commission is agreed case by case — we do not quote a promised income.",
      earn: "A partner can:",
      cta: "Talk partnership",
      types: [
        {
          title: "Regional",
          body: "Represent the company in a geography. Local relationships, same operating system.",
        },
        {
          title: "Industry",
          body: "Bring a vertical you already understand — construction, auto, retail, and similar.",
        },
        {
          title: "Referral",
          body: "Introduce a client. We onboard. Commission as agreed.",
        },
        {
          title: "Agency",
          body: "Run the products for your book of clients, or resell delivery with our stack.",
        },
      ],
      can: [
        "Bring clients",
        "Represent the solutions",
        "Grow a market",
        "Earn commission on agreed terms",
      ],
    },
    why: {
      eyebrow: "Why now",
      title: "Companies are moving from isolated AI tools to AI-native operations.",
      lead: "The shift is operational, not theatrical. Manual-heavy work hits a ceiling on speed, cost, and scale. There is a window for teams that already run on AI infrastructure.",
      oldLabel: "Familiar",
      newLabel: "AI-native",
      old: ["People", "Processes", "Manual work", "Many vendors"],
      next: ["AI infrastructure", "Agents", "Automation", "Human decisions"],
      close:
        "That does not mean every company that still works by hand will disappear. It does mean the builders who already have the loop can move faster.",
    },
    investors: {
      eyebrow: "Investors",
      title: "Capital would fund growth — not a stack we still have to invent.",
      lead: "The AI infrastructure is already in commercial use. Early financing, if we take it, is for scaling what exists: clients, sales, international marketing, partners, automation, digital production, and expansion.",
      usesTitle: "Where capital goes",
      uses: [
        "Clients and sales",
        "International marketing",
        "Partner network",
        "AI infrastructure and automation",
        "Digital production capacity",
        "Geographic expansion",
      ],
      not: "We are not raising to build the technology from scratch. We do not publish a required cheque size, a valuation, or an investor return.",
      scale:
        "Open to early financing at commercial scale-up. Size and structure are individual. Later, larger rounds can follow if clients, revenue, and presence support them — not as a promise.",
      cta: "Discuss investment participation",
    },
    network: {
      eyebrow: "Compounding",
      title: "How the pieces reinforce each other.",
      result: "A global AI-native company",
      nodes: [
        "AI products",
        "Direct sales",
        "Partner network",
        "Business creation",
        "International expansion",
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Tell us which door you are walking through.",
      lead: "One form. Pick the scenario that fits. If the fit is wrong, we will say so. Telegram or WhatsApp is enough if you live in messengers.",
      name: "Name",
      email: "Email",
      messenger: "Telegram or WhatsApp",
      messengerHint: "Handle or number",
      company: "Company / project",
      scenario: "I am here because",
      scenarioOptions: [
        { value: "idea", label: "I have an idea", hint: "Concept, not yet a company — or barely one." },
        { value: "business", label: "I have a business", hint: "Something already operates. You want the loop." },
        { value: "capital", label: "I have capital", hint: "You want to build from the market, not from a leftover idea." },
        { value: "marketing", label: "I need AI marketing", hint: "Department, services, or product install." },
        { value: "partner", label: "I want to partner", hint: "Regional, industry, referral, or agency." },
        { value: "investment", label: "I'm considering investment", hint: "Conversation about participation — not a pitch deck promise." },
      ],
      submit: "Send",
      sending: "Sending…",
      success: "Received. We will reply to the email or messenger you left.",
      error: "Could not send. Email hello@ai-mark.agency or try again.",
      privacy: "By sending, you agree we may contact you about this request. See Privacy.",
    },
    productPages: {
      aime: {
        eyebrow: "AIME",
        title: "AI Marketing Employee",
        lead: "A marketing system, not a calendar. Research through optimization stays in one loop, with a human on publish.",
        metaphor: "Marketing agents that draft the cycle. People still own the decision to go live.",
        sections: [
          {
            title: "What it does",
            body: "Research, strategy, content, creatives, approval, publish, analytics, optimize. That sequence is the product.",
          },
          {
            title: "HITL",
            body: "Nothing publishes until a named person approves — unless you later opt into auto-publish after several clean cycles.",
          },
          {
            title: "How we sell it",
            body: "As a product SKU, and as the operating system inside an AI Marketing Department retainer. Those are different commercial formats.",
          },
        ],
        flow: [
          "Research",
          "Strategy",
          "Content",
          "Creatives",
          "Approval",
          "Publish",
          "Analytics",
          "Optimize",
        ],
      },
      assistant: {
        eyebrow: "BA",
        title: "AI Business Assistant",
        lead: "A sales inbox that answers, qualifies, and hands off. Not a funnel-builder with a chatbot skin.",
        metaphor: "One inbox across the channels your buyers already use.",
        sections: [
          {
            title: "Channels",
            body: "WhatsApp, Instagram Direct, Messenger, website chat, Telegram.",
          },
          {
            title: "What it holds",
            body: "Knowledge base, replies, lead qualification, and a path to a human when the conversation needs one.",
          },
          {
            title: "Where it sits",
            body: "In the sales step of the company loop — after marketing, before a quote or a call.",
          },
        ],
        flow: ["Inbound", "Knowledge base", "Reply", "Qualify", "Human handoff"],
      },
      showroom: {
        eyebrow: "CPQ",
        title: "Showroom AI",
        lead: "Complex commercial requests become a calculation, a spec, and a quote — according to your rules. Not furniture-only, not a chatbot that invents a price.",
        metaphor: "Catalog + rules + the client’s parameters → calc → spec → commercial proposal / PDF.",
        sections: [
          {
            title: "Industry-neutral",
            body: "Built for configurable offers. Verticals include construction, real estate, auto, furniture, retail, manufacturing, services, and similar trades.",
          },
          {
            title: "What you get",
            body: "Specs, calculations, and quotes that follow the business rules you define — not a generic estimate.",
          },
          {
            title: "Where it sits",
            body: "After a qualified conversation. The inbox can collect intent; Showroom turns intent into a document.",
          },
        ],
        flow: ["Catalog", "Business rules", "Client parameters", "Calculation", "Spec", "Quote / PDF"],
      },
    },
    footer: {
      blurb:
        "AI-native venture and marketing company. From idea to a working business — on our own AI infrastructure.",
      privacy: "Privacy",
      rights: "AI Mark. All rights reserved.",
      poweredBy: "",
    },
    privacy: {
      title: "Privacy",
      updated: "Last updated: 21 September 2026",
      paragraphs: [
        "AI Mark Agency (ai-mark.agency) collects the information you submit through the contact form: name, email, messenger handle, company or project, and the scenario you selected. We use it only to reply and to decide whether we can take the work, a partnership, or an investment conversation.",
        "We do not sell your data. We do not run a public analytics product on this site beyond what the hosting platform needs to keep the site up. Form submissions are emailed to our operator inbox.",
        "You can ask us to delete a request by writing to hello@ai-mark.agency. This page is a stub and will be expanded if we add more processing (newsletters, ads pixels, hiring).",
        "Hosting may be provided by Vercel. Email delivery may be provided by a transactional email vendor. Those processors see only what is required to deliver the service.",
      ],
    },
    jsonLd: {
      description:
        "AI-native venture and marketing company. From idea to a working business: research, model, digital product, marketing, sales, and growth on existing AI infrastructure.",
    },
  },
  ru: {
    meta: {
      title: "AI Mark — От идеи до работающего бизнеса",
      description:
        "AI-native венчурная и маркетинговая компания. Исследуем рынок, собираем модель, строим цифровой продукт, затем ведём маркетинг, продажи и рост на собственной AI-инфраструктуре. Прибыль не обещаем.",
      ogTitle: "AI Mark — От идеи до работающего бизнеса",
      keywords: [
        "AI-native компания",
        "создание бизнеса",
        "AI маркетинг",
        "цифровое производство",
        "AIME",
        "Showroom AI",
        "ai-mark.agency",
      ],
    },
    nav: {
      items: [
        { href: "/", label: "Главная" },
        { href: "#what-we-do", label: "Что делаем" },
        { href: "#business-creation", label: "Создание бизнеса" },
        { href: "/products", label: "AI-продукты" },
        { href: "#how", label: "Как устроено" },
        { href: "#partners", label: "Партнёры" },
        { href: "/investors", label: "Инвесторам" },
        { href: "#contact", label: "Контакт" },
      ],
      cta: "Обсудить проект",
      menu: "Меню",
      close: "Закрыть",
      langEn: "EN",
      langRu: "RU",
      themeLight: "Светлая тема",
      themeDark: "Тёмная тема",
    },
    hero: {
      eyebrow: "AI-NATIVE VENTURE & MARKETING COMPANY",
      title: "От идеи до работающего бизнеса.",
      lead: "Исследуем рынок, собираем модель, строим цифровой продукт, запускаем маркетинг и продажи — и масштабируем операционку с AI.",
      extra: "Создаём и масштабируем цифровые бизнесы на собственной AI-инфраструктуре.",
      soft: "Можем провести от идеи или исследования до сборки, запуска и операционной работы. Прибыль не гарантируем.",
      primaryCta: "Обсудить проект",
      secondaryCta: "Как устроено",
      investorCta: "Инвесторам",
    },
    pillars: {
      eyebrow: "Что умеем",
      title: "Пять частей одного контура.",
      items: [
        {
          n: "01",
          title: "Создание бизнеса",
          body: "Идея, действующая компания или капитал — собираем модель, которую рынок в состоянии держать.",
        },
        {
          n: "02",
          title: "Digital Production",
          body: "Сайты, приложения, платформы, кабинеты, интеграции и AI-системы, на которых бизнес живёт.",
        },
        {
          n: "03",
          title: "AI-маркетинг",
          body: "Стратегия, контент, креативы, реклама и аналитика как непрерывный цикл — не месячная свалка постов.",
        },
        {
          n: "04",
          title: "AI-продажи",
          body: "Inbox Business Assistant: квалификация, ответы из базы знаний, передача человеку.",
        },
        {
          n: "05",
          title: "Рост",
          body: "Аналитика, оптимизация, автоматизация и масштаб на той же инфраструктуре.",
        },
      ],
    },
    creation: {
      eyebrow: "Создание бизнеса",
      title: "Не знаете, какой бизнес собирать? Начните с рынка.",
      lead: "Приходите с идеей, с действующим бизнесом, с капиталом — или без конкретной идеи. Начинаем со спроса, не со слогана.",
      withoutIdea:
        "Если идеи ещё нет, можем предложить несколько концепций из рынка, капитала, интересов и ресурсов. Это короткий список для выбора — не «гарантированно прибыльный бизнес».",
      steps: [
        { title: "Исследование рынка", body: "Спрос, конкуренты, ограничения и место, где оффер может стоять." },
        { title: "Возможности", body: "Короткий список ниш, в которых есть смысл строить — с причинами, не с лозунгами." },
        { title: "Несколько концепций", body: "Больше одной модели, чтобы выбирать сравнением, а не надеждой." },
        { title: "Выбор модели", body: "Оффер, набросок экономики и условия, без которых это не работает." },
        { title: "Сборка продукта", body: "Сайт, платформа или AI-система, на которой бизнес реально живёт." },
        { title: "Запуск", body: "Выход в эфир с метками, оффером и путём для первых разговоров." },
        { title: "Маркетинг и продажи", body: "Контент, реклама, inbox и котировки в одном цикле." },
        { title: "Масштаб", body: "Усиливаем то, что уже едет. Автоматизируем повторяемое. Решения оставляем людям." },
      ],
    },
    pipeline: {
      eyebrow: "Путь",
      title: "Одна последовательность. Можно войти на любом шаге.",
      steps: [
        "Идея / капитал",
        "Исследование рынка",
        "Бизнес-модель",
        "Бренд",
        "Продукт / платформа",
        "AI-инфраструктура",
        "Маркетинг",
        "Продажи",
        "Рост",
      ],
    },
    tech: {
      eyebrow: "Технологическая база",
      title: "Ядро AI-инфраструктуры уже собрано и используется коммерчески.",
      lead: "Мы не продаём стек, который «когда-нибудь соберём». Три продукта уже стоят в контуре — и как операционная система поставки, и как SKU, которые можно поставить вам.",
    },
    products: {
      eyebrow: "AI-продукты",
      title: "Три системы, которые ведём — и можем поставить вам.",
      lead: "Продуктовая подписка — это не ретейнер маркетингового отдела. Полные страницы каждого продукта — на этом домене.",
      whoLabel: "Кому",
      extraLabel: "В цикле",
      detailCta: "Подробности",
      installCta: "Обсудить установку",
      hubCta: "Все страницы продуктов",
      hubTitle: "AI-продукты",
      hubLead:
        "AIME, AI Business Assistant и Showroom AI. Ведём их для клиентов и можем поставить на ваши аккаунты. Ниже — только то, что продукты реально делают.",
      items: {
        aime: {
          value:
            "AI-маркетинговая система: исследование → стратегия → контент → креативы → апрув → публикация → аналитика → оптимизация. Не планировщик постов.",
          who: "Брендам с еженедельным циклом, а не с месячной пачкой материалов.",
          extra: "Апрув человека до публикации. После нескольких чистых циклов — опциональный автопаблиш.",
          price: "Lite ~$199/мес · Pro ~$349/мес. Agency: setup + MRR за клиента. License — если хостите сами.",
        },
        assistant: {
          value:
            "Продажный AI-inbox — WhatsApp, Instagram Direct, Messenger, чат на сайте, Telegram. База знаний, ответы, квалификация, передача человеку.",
          who: "Командам, которым нужен inbox продаж, а не конструктор чат-воронок.",
          extra: "Человек подхватывает диалог, когда без него нельзя.",
          price: "Entry $149/мес · Standard $249/мес",
        },
        showroom: {
          value:
            "Отрасле-нейтральный CPQ: сложные коммерческие запросы, спецификации, расчёты и котировки по правилам бизнеса.",
          who: "Командам с конфигурируемым оффером, которым нужны спецификация и КП, а не «цена из чата».",
          extra:
            "Вертикали: строительство, недвижимость, авто, мебель, ритейл, производство, услуги и соседние конфигурируемые ниши.",
          price:
            "Self-serve setup $0 или ~$300 done-for-you. Дальше ~$199 / $299/мес по квоте котировок.",
        },
      },
    },
    production: {
      eyebrow: "Digital Production",
      title: "Строим цифровую инфраструктуру бизнеса.",
      lead: "Продакшн — это то, чем создание бизнеса становится на деле. Мы не веб-студия в поисках чужих визиток.",
      note: "Та же компания, которая при необходимости будет продвигать и продавать то, что собрала.",
      items: [
        "Сайты и лендинги",
        "Веб-приложения и платформы",
        "Магазины и клиентские кабинеты",
        "Внутренние системы",
        "Интеграции",
        "AI-функции и автоматизация",
      ],
    },
    cycle: {
      eyebrow: "Полный цикл",
      title: "Можем войти на любом этапе — или пройти путь целиком.",
      lead: "Исследование — не слайд. Сборка — не передача незнакомцу. Маркетинг — не отдельная агентская история.",
      steps: [
        "Исследование",
        "Концепция",
        "Сборка",
        "Маркетинг",
        "Продажи",
        "Аналитика",
        "Оптимизация",
        "Масштаб",
      ],
    },
    how: {
      eyebrow: "Как устроено",
      title: "AI-native операционка. Стратегия и ключевые решения — за людьми.",
      lead: "Работа идёт внутри AI-системы. Люди задают направление, проверяют результат и принимают решение, которое выходит в эфир.",
      hitl: "AI готовит → человек проверяет → клиент апрувит → публикация или действие. После нескольких чистых циклов автопаблиш может быть опцией. Бесконтрольной автоматизации нет.",
      steps: [
        {
          title: "Подготовка",
          body: "Агенты собирают исследование, тексты, креативы, ответы или спецификации по брифу и базе, которую вы даёте.",
        },
        {
          title: "Проверка",
          body: "Оператор читает работу до вас. Объём не отменяет ревью.",
        },
        {
          title: "Апрув",
          body: "Вы (или названный владелец) подписываете. Нет апрува — нет эфира.",
        },
        {
          title: "Действие",
          body: "Публикация, отправка, котировка или handoff — с следом, по которому можно учиться.",
        },
      ],
    },
    commercial: {
      eyebrow: "Коммерческая модель",
      title: "Несколько форматов работы. Ретейнер — один из них.",
      lead: "Продуктовый SKU, сервисный спринт, штатный отдел или кастомная сборка. Ниже — ценовые коридоры, не обещание результата.",
      skuNote:
        "Подписка на AI-продукты (примерно $149–349+/мес) — это не ретейнер AI-маркетингового отдела ($1,500–3,500+/мес).",
      perMonth: "/мес",
      featured: "Чаще начинают отсюда",
      retainerCta: "Запросить отдел",
      custom: "Индивидуально",
      tiers: [
        {
          name: "AI-продукты",
          price: "$149–349+",
          body: "AIME, Business Assistant, Showroom AI как продуктовые SKU — у себя или с нашей поставкой.",
        },
        {
          name: "AI-маркетинговые услуги",
          price: "от $500+",
          body: "Маркетинг по скоупу без полного штатного отдела. Определяется брифом, не выдуманным пакетом.",
        },
        {
          name: "AI-маркетинговый отдел",
          price: "$1,500–3,500+",
          body: "Постоянный HITL-маркетинг как отдел: Starter, Growth, Scale. Медиабюджет — ваш, в ретейнер не входит.",
        },
        {
          name: "Digital Production",
          price: "Индивидуально",
          body: "Сайты, приложения, платформы, кабинеты, интеграции. Скоуп — после понимания операционной задачи.",
        },
        {
          name: "Создание бизнеса",
          price: "Индивидуально",
          body: "От исследования до модели, сборки, запуска и коммерческого контура. Индивидуальный скоуп.",
        },
        {
          name: "Enterprise",
          price: "Индивидуально",
          body: "Несколько брендов, рынков или тяжёлый продакшн и отдел в одном договоре.",
        },
      ],
      footnote:
        "USD. Продуктовые цены — в опубликованных коридорах на страницах продуктов. Ретейнеры отдела: Starter $1,200 / Growth $2,200 / Scale $3,500 в месяц по скоупу. ROI, CAC и ROAS не гарантируем.",
    },
    packages: {
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
            "Inbox и Showroom, если офферу это нужно",
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
    },
    partners: {
      eyebrow: "Партнёры",
      title: "Международная партнёрская сеть — способ масштабировать присутствие.",
      lead: "Не нужен полный офис в каждом регионе, чтобы работать рынок. Партнёры приводят клиентов, представляют решения и развивают территорию.",
      model:
        "Международное присутствие без собственной инфраструктуры в каждой стране. Комиссия — всегда по договорённости; обещанный доход мы не называем.",
      earn: "Партнёр может:",
      cta: "Обсудить партнёрство",
      types: [
        {
          title: "Региональный",
          body: "Представлять компанию в географии. Локальные связи, та же операционная система.",
        },
        {
          title: "Отраслевой",
          body: "Привести вертикаль, которую уже понимаете — строительство, авто, ритейл и соседние.",
        },
        {
          title: "Реферальный",
          body: "Привели клиента. Мы онбордим. Комиссия по договорённости.",
        },
        {
          title: "Агентский",
          body: "Вести продукты для своей базы клиентов или перепродавать поставку на нашем стеке.",
        },
      ],
      can: [
        "Приводить клиентов",
        "Представлять решения",
        "Растить рынок",
        "Получать комиссию на согласованных условиях",
      ],
    },
    why: {
      eyebrow: "Почему сейчас",
      title: "Компании уходят от разрозненных AI-инструментов к AI-native операционке.",
      lead: "Сдвиг операционный, не театральный. Ручная тяжёлая работа упирается в скорость, себестоимость и масштаб. Есть окно для тех, у кого инфраструктура уже в контуре.",
      oldLabel: "Привычное",
      newLabel: "AI-native",
      old: ["Люди", "Процессы", "Ручная работа", "Много подрядчиков"],
      next: ["AI-инфраструктура", "Агенты", "Автоматизация", "Решения людей"],
      close:
        "Это не значит, что компании с ручными процессами исчезнут. Это значит, что те, у кого контур уже собран, могут двигаться быстрее.",
    },
    investors: {
      eyebrow: "Инвесторам",
      title: "Капитал — в рост, а не в стек, который ещё предстоит придумать.",
      lead: "AI-инфраструктура уже в коммерческом использовании. Раннее финансирование, если берём, — на масштабирование существующего: клиенты, продажи, международный маркетинг, партнёры, автоматизация, продакшн и экспансия.",
      usesTitle: "Куда идут деньги",
      uses: [
        "Клиенты и продажи",
        "Международный маркетинг",
        "Партнёрская сеть",
        "AI-инфраструктура и автоматизация",
        "Мощность Digital Production",
        "Географическая экспансия",
      ],
      not: "Мы не привлекаем деньги, чтобы собрать технологию с нуля. Не публикуем обязательный чек, оценку компании и доход инвестора.",
      scale:
        "Открыты к раннему финансированию на этапе коммерческого масштабирования. Размер и структура — индивидуально. Более крупные раунды позже возможны, если их поддержат клиенты, выручка и присутствие — это не обещание.",
      cta: "Обсудить участие в инвестициях",
    },
    network: {
      eyebrow: "Связка",
      title: "Как части усиливают друг друга.",
      result: "Глобальная AI-native компания",
      nodes: [
        "AI-продукты",
        "Прямые продажи",
        "Партнёрская сеть",
        "Создание бизнеса",
        "Международная экспансия",
      ],
    },
    contact: {
      eyebrow: "Контакт",
      title: "Напишите, с какой стороны вы заходите.",
      lead: "Одна форма. Выберите сценарий. Если фит плохой — так и скажем. Telegram или WhatsApp достаточно, если вы живёте в мессенджерах.",
      name: "Имя",
      email: "Email",
      messenger: "Telegram или WhatsApp",
      messengerHint: "Ник или номер",
      company: "Компания / проект",
      scenario: "Я здесь потому что",
      scenarioOptions: [
        { value: "idea", label: "У меня есть идея", hint: "Концепция, компании ещё нет — или почти нет." },
        { value: "business", label: "У меня есть бизнес", hint: "Уже работает. Нужен контур." },
        { value: "capital", label: "У меня есть капитал", hint: "Хотите собирать от рынка, а не от случайной идеи." },
        { value: "marketing", label: "Нужен AI-маркетинг", hint: "Отдел, услуги или установка продукта." },
        { value: "partner", label: "Хочу партнёрство", hint: "Регион, отрасль, реферал или агентство." },
        { value: "investment", label: "Рассматриваю инвестиции", hint: "Разговор об участии — не обещание из колоды." },
      ],
      submit: "Отправить",
      sending: "Отправляем…",
      success: "Получили. Ответим на email или в мессенджер, который вы оставили.",
      error: "Не отправилось. Напишите hello@ai-mark.agency или попробуйте ещё раз.",
      privacy: "Отправляя, вы соглашаетесь, что мы свяжемся по этому запросу. См. Privacy.",
    },
    productPages: {
      aime: {
        eyebrow: "AIME",
        title: "AI Marketing Employee",
        lead: "Маркетинговая система, не календарь. От исследования до оптимизации — один цикл, публикация с человеком.",
        metaphor: "Маркетинговые агенты готовят цикл. Решение выйти в эфир остаётся за людьми.",
        sections: [
          {
            title: "Что делает",
            body: "Исследование, стратегия, контент, креативы, апрув, публикация, аналитика, оптимизация. Эта последовательность и есть продукт.",
          },
          {
            title: "HITL",
            body: "В эфир не уходит ничего без апрува названного человека — пока вы сами не включите автопаблиш после нескольких чистых циклов.",
          },
          {
            title: "Как продаём",
            body: "Как продуктовый SKU и как операционная система внутри ретейнера AI-маркетингового отдела. Это разные коммерческие форматы.",
          },
        ],
        flow: [
          "Исследование",
          "Стратегия",
          "Контент",
          "Креативы",
          "Апрув",
          "Публикация",
          "Аналитика",
          "Оптимизация",
        ],
      },
      assistant: {
        eyebrow: "BA",
        title: "AI Business Assistant",
        lead: "Продажный inbox: отвечает, квалифицирует, передаёт человеку. Не конструктор воронок в шкуре чат-бота.",
        metaphor: "Один inbox на каналах, где покупатели уже пишут.",
        sections: [
          {
            title: "Каналы",
            body: "WhatsApp, Instagram Direct, Messenger, чат на сайте, Telegram.",
          },
          {
            title: "Что внутри",
            body: "База знаний, ответы, квалификация лида и путь к человеку, когда без него нельзя.",
          },
          {
            title: "Где стоит",
            body: "На шаге продаж в контуре компании — после маркетинга, до котировки или звонка.",
          },
        ],
        flow: ["Вход", "База знаний", "Ответ", "Квалификация", "Handoff человеку"],
      },
      showroom: {
        eyebrow: "CPQ",
        title: "Showroom AI",
        lead: "Сложный коммерческий запрос становится расчётом, спецификацией и котировкой — по вашим правилам. Не «только мебель» и не чат, который выдумывает цену.",
        metaphor: "Каталог + правила + параметры клиента → расчёт → спецификация → КП / PDF.",
        sections: [
          {
            title: "Отрасле-нейтральный",
            body: "Для конфигурируемых офферов. Вертикали: строительство, недвижимость, авто, мебель, ритейл, производство, услуги и соседние ниши.",
          },
          {
            title: "Что получаете",
            body: "Спецификации, расчёты и котировки по правилам бизнеса, которые вы задаёте — не «оценка из воздуха».",
          },
          {
            title: "Где стоит",
            body: "После квалифицированного разговора. Inbox собирает намерение; Showroom превращает его в документ.",
          },
        ],
        flow: ["Каталог", "Правила", "Параметры клиента", "Расчёт", "Спецификация", "КП / PDF"],
      },
    },
    footer: {
      blurb:
        "AI-native венчурная и маркетинговая компания. От идеи до работающего бизнеса — на собственной AI-инфраструктуре.",
      privacy: "Конфиденциальность",
      rights: "AI Mark. Все права защищены.",
      poweredBy: "",
    },
    privacy: {
      title: "Конфиденциальность",
      updated: "Обновлено: 21 сентября 2026",
      paragraphs: [
        "AI Mark Agency (ai-mark.agency) собирает данные формы: имя, email, мессенджер, компанию или проект и выбранный сценарий. Используем их только чтобы ответить и решить, берём ли работу, партнёрство или инвестиционный разговор.",
        "Мы не продаём данные. На сайте нет отдельного аналитического продукта сверх того, что нужно хостингу. Заявки уходят на почту оператора.",
        "Попросить удалить запрос можно на hello@ai-mark.agency. Это заглушка политики; расширим, если появится рассылка, пиксели или найм.",
        "Хостинг может быть на Vercel. Доставка писем — через транзакционного провайдера. Они видят только то, что нужно для доставки сервиса.",
      ],
    },
    jsonLd: {
      description:
        "AI-native венчурная и маркетинговая компания. От идеи до работающего бизнеса: исследование, модель, цифровой продукт, маркетинг, продажи и рост на существующей AI-инфраструктуре.",
    },
  },
};

export function getCopy(locale: Locale): Copy {
  return copy[locale];
}
