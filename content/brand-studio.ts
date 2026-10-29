import type { Locale } from "@/lib/site";
import type { BrandStudioPlanId } from "@/lib/brand-studio";

export type BrandStudioPlanCopy = {
  id: BrandStudioPlanId;
  name: string;
  features: string[];
};

export type BrandStudioCopy = {
  seoTitle: string;
  seoDescription: string;
  hero: {
    label: string;
    title: string;
    subtitle: string;
    ctaDiscuss: string;
    ctaPlans: string;
  };
  how: {
    eyebrow: string;
    title: string;
    steps: { num: string; title: string; desc: string }[];
  };
  why: {
    eyebrow: string;
    title: string;
    bullets: string[];
  };
  plans: {
    eyebrow: string;
    title: string;
    featuredLabel: string;
    perMonth: string;
    footnote: string;
    items: BrandStudioPlanCopy[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  hub: {
    tag: string;
    teaser: string;
    cta: string;
  };
  pricingTeaser: {
    title: string;
    lead: string;
    cta: string;
  };
};

const enPlans: BrandStudioPlanCopy[] = [
  {
    id: "start",
    name: "Start",
    features: [
      "Brand profile + 6 competitors",
      "12 posts / month",
      "4 AI videos",
      "1 market",
      "2 social networks",
      "Human review on every piece",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    features: [
      "Brand profile + 12 competitors",
      "28 posts / month",
      "12 AI videos",
      "Up to 3 markets",
      "4 networks + auto-posting",
      "Meta ads setup",
      "Weekly report",
    ],
  },
  {
    id: "global",
    name: "Global",
    features: [
      "Everything in Growth",
      "Up to 10 markets / languages",
      "20 AI videos",
      "Meta ads management (ad spend paid separately)",
      "Dedicated manager",
      "Bi-weekly strategy call",
    ],
  },
];

const en: BrandStudioCopy = {
  seoTitle: "AI Brand Studio — done-for-you content & video · AI MARK",
  seoDescription:
    "From your website to a month of posts, carousels and AI UGC videos. Human editor on every piece. Plans from $590/mo.",
  hero: {
    label: "SERVICE · DONE FOR YOU",
    title: "AI Brand Studio",
    subtitle:
      "From your domain to a month of ready content and ads. AI does the heavy lifting, a human checks every piece.",
    ctaDiscuss: "Discuss a project",
    ctaPlans: "See plans",
  },
  how: {
    eyebrow: "How it works",
    title: "Four steps from site to published ads",
    steps: [
      {
        num: "01",
        title: "Brand profile from your website",
        desc: "Offer, buyer personas, tone of voice, up to 12 competitors and their ads.",
      },
      {
        num: "02",
        title: "4-week content plan",
        desc: "28 posts with different angles: pain, proof, offer, story, objection, education.",
      },
      {
        num: "03",
        title: "Production",
        desc: "Posts, carousels and AI UGC videos (talking head, unboxing, product animation) about your product. Text never covers faces. Every piece reviewed by a human editor before publishing.",
      },
      {
        num: "04",
        title: "Publishing and ads",
        desc: "Auto-posting to Instagram, TikTok, YouTube Shorts, LinkedIn. Meta ads launch and optimisation. Weekly report.",
      },
    ],
  },
  why: {
    eyebrow: "Why us",
    title: "Quality you can run as a channel",
    bullets: [
      "Human quality check on every post and video",
      "Multi-market — several countries and languages in one plan (Global)",
      "Videos about your product, not generic avatars",
      "Fixed monthly price, no credits",
    ],
  },
  plans: {
    eyebrow: "Plans",
    title: "Monthly subscriptions in USD",
    featuredLabel: "Most popular",
    perMonth: "/ mo",
    footnote: "Start in 5 business days. Ad budget is paid separately. Pay in USDT/USDC.",
    items: enPlans,
  },
  faq: {
    eyebrow: "FAQ",
    title: "Quick answers",
    items: [
      {
        q: "Which social networks?",
        a: "Instagram, TikTok, YouTube Shorts and LinkedIn — depending on your plan. Growth and Global add auto-posting across the networks included in your tier.",
      },
      {
        q: "How many countries can we cover?",
        a: "Start is one market. Growth covers up to three. Global covers up to ten markets or languages in one content plan.",
      },
      {
        q: "Who approves the content?",
        a: "You approve the plan. Our editor checks every post and video before it goes live. You can request edits anytime.",
      },
      {
        q: "Can I cancel?",
        a: "Monthly billing — cancel anytime. No long-term lock-in.",
      },
    ],
  },
  hub: {
    tag: "Done for you",
    teaser: "Posts, carousels and AI UGC videos about your product — human review on every piece.",
    cta: "AI Brand Studio",
  },
  pricingTeaser: {
    title: "AI Brand Studio",
    lead: "Done-for-you content and video from $590/mo. Brand profile, monthly posts, AI UGC and optional Meta ads.",
    cta: "View plans",
  },
};

const ru: BrandStudioCopy = {
  seoTitle: "AI Brand Studio — контент и видео под ключ · AI MARK",
  seoDescription:
    "От сайта до месяца постов, каруселей и AI UGC-видео. Редактор проверяет каждый материал. Тарифы от $590/мес.",
  hero: {
    label: "СЕРВИС · ПОД КЛЮЧ",
    title: "AI Brand Studio",
    subtitle:
      "От вашего домена до месяца готового контента и рекламы. AI делает основную работу, человек проверяет каждый материал.",
    ctaDiscuss: "Обсудить проект",
    ctaPlans: "Смотреть тарифы",
  },
  how: {
    eyebrow: "Как это работает",
    title: "Четыре шага от сайта до рекламы",
    steps: [
      {
        num: "01",
        title: "Профиль бренда с вашего сайта",
        desc: "Оффер, персоны покупателей, tone of voice, до 12 конкурентов и их объявления.",
      },
      {
        num: "02",
        title: "Контент-план на 4 недели",
        desc: "28 постов с разными углами: боль, доказательство, оффер, история, возражение, обучение.",
      },
      {
        num: "03",
        title: "Производство",
        desc: "Посты, карусели и AI UGC-видео (говорящая голова, распаковка, анимация продукта) про ваш продукт. Текст не закрывает лица. Каждый материал проверяет редактор перед публикацией.",
      },
      {
        num: "04",
        title: "Публикация и реклама",
        desc: "Автопостинг в Instagram, TikTok, YouTube Shorts, LinkedIn. Запуск и оптимизация Meta Ads. Еженедельный отчёт.",
      },
    ],
  },
  why: {
    eyebrow: "Почему мы",
    title: "Качество, которое можно вести как канал",
    bullets: [
      "Человек проверяет каждый пост и видео",
      "Несколько стран и языков в одном плане (Global)",
      "Видео про ваш продукт, а не generic-аватары",
      "Фиксированная цена в месяц, без кредитов",
    ],
  },
  plans: {
    eyebrow: "Тарифы",
    title: "Подписка в USD в месяц",
    featuredLabel: "Популярный",
    perMonth: "/ мес",
    footnote: "Старт за 5 рабочих дней. Рекламный бюджет оплачивается отдельно. Оплата в USDT/USDC.",
    items: [
      {
        id: "start",
        name: "Start",
        features: [
          "Профиль бренда + 6 конкурентов",
          "12 постов / месяц",
          "4 AI-видео",
          "1 рынок",
          "2 соцсети",
          "Проверка каждого материала",
        ],
      },
      {
        id: "growth",
        name: "Growth",
        features: [
          "Профиль бренда + 12 конкурентов",
          "28 постов / месяц",
          "12 AI-видео",
          "До 3 рынков",
          "4 сети + автопостинг",
          "Настройка Meta Ads",
          "Еженедельный отчёт",
        ],
      },
      {
        id: "global",
        name: "Global",
        features: [
          "Всё из Growth",
          "До 10 рынков / языков",
          "20 AI-видео",
          "Ведение Meta Ads (бюджет отдельно)",
          "Выделенный менеджер",
          "Стратегический созвон раз в две недели",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Коротко",
    items: [
      {
        q: "Какие соцсети?",
        a: "Instagram, TikTok, YouTube Shorts и LinkedIn — по тарифу. В Growth и Global есть автопостинг в сети вашего плана.",
      },
      {
        q: "Сколько стран?",
        a: "Start — один рынок. Growth — до трёх. Global — до десяти рынков или языков в одном плане.",
      },
      {
        q: "Кто согласует контент?",
        a: "Вы утверждаете план. Редактор проверяет каждый пост и видео перед выходом. Правки — по запросу.",
      },
      {
        q: "Можно отменить?",
        a: "Помесячная оплата — отмена в любой момент.",
      },
    ],
  },
  hub: {
    tag: "Под ключ",
    teaser: "Посты, карусели и AI UGC про ваш продукт — человек проверяет каждый материал.",
    cta: "AI Brand Studio",
  },
  pricingTeaser: {
    title: "AI Brand Studio",
    lead: "Контент и видео под ключ от $590/мес. Профиль бренда, посты, AI UGC и Meta Ads по тарифу.",
    cta: "Смотреть тарифы",
  },
};

const es: BrandStudioCopy = {
  ...en,
  seoTitle: "AI Brand Studio — contenido y vídeo llave en mano · AI MARK",
  seoDescription:
    "De tu web a un mes de publicaciones, carruseles y vídeos UGC con IA. Revisión humana en cada pieza. Planes desde $590/mes.",
  hero: {
    label: "SERVICIO · LLAVE EN MANO",
    title: "AI Brand Studio",
    subtitle:
      "De tu dominio a un mes de contenido y anuncios listos. La IA hace el trabajo pesado; una persona revisa cada pieza.",
    ctaDiscuss: "Hablar del proyecto",
    ctaPlans: "Ver planes",
  },
  how: {
    eyebrow: "Cómo funciona",
    title: "Cuatro pasos del sitio a los anuncios",
    steps: [
      {
        num: "01",
        title: "Perfil de marca desde tu web",
        desc: "Oferta, buyer personas, tono de voz, hasta 12 competidores y sus anuncios.",
      },
      {
        num: "02",
        title: "Plan de contenido de 4 semanas",
        desc: "28 publicaciones con distintos ángulos: dolor, prueba, oferta, historia, objeción, educación.",
      },
      {
        num: "03",
        title: "Producción",
        desc: "Posts, carruseles y vídeos UGC con IA (talking head, unboxing, animación de producto) sobre tu producto. El texto no tapa caras. Cada pieza la revisa un editor antes de publicar.",
      },
      {
        num: "04",
        title: "Publicación y anuncios",
        desc: "Autopublicación en Instagram, TikTok, YouTube Shorts y LinkedIn. Lanzamiento y optimización de Meta Ads. Informe semanal.",
      },
    ],
  },
  why: {
    eyebrow: "Por qué nosotros",
    title: "Calidad que puedes usar como canal",
    bullets: [
      "Revisión humana en cada post y vídeo",
      "Multimercado: varios países e idiomas en un plan (Global)",
      "Vídeos sobre tu producto, no avatares genéricos",
      "Precio mensual fijo, sin créditos",
    ],
  },
  plans: {
    eyebrow: "Planes",
    title: "Suscripción mensual en USD",
    featuredLabel: "Más popular",
    perMonth: "/ mes",
    footnote: "Arranque en 5 días hábiles. El presupuesto de anuncios se paga aparte. Pago en USDT/USDC.",
    items: [
      {
        id: "start",
        name: "Start",
        features: [
          "Perfil de marca + 6 competidores",
          "12 posts / mes",
          "4 vídeos IA",
          "1 mercado",
          "2 redes sociales",
          "Revisión humana",
        ],
      },
      {
        id: "growth",
        name: "Growth",
        features: [
          "Perfil + 12 competidores",
          "28 posts / mes",
          "12 vídeos IA",
          "Hasta 3 mercados",
          "4 redes + autopublicación",
          "Configuración Meta Ads",
          "Informe semanal",
        ],
      },
      {
        id: "global",
        name: "Global",
        features: [
          "Todo lo de Growth",
          "Hasta 10 mercados / idiomas",
          "20 vídeos IA",
          "Gestión Meta Ads (inversión aparte)",
          "Manager dedicado",
          "Llamada estratégica quincenal",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Respuestas rápidas",
    items: [
      {
        q: "¿Qué redes sociales?",
        a: "Instagram, TikTok, YouTube Shorts y LinkedIn según tu plan. Growth y Global incluyen autopublicación en las redes del tier.",
      },
      {
        q: "¿Cuántos países?",
        a: "Start: un mercado. Growth: hasta tres. Global: hasta diez mercados o idiomas en un solo plan.",
      },
      {
        q: "¿Quién aprueba el contenido?",
        a: "Tú apruebas el plan. Nuestro editor revisa cada pieza antes de publicar. Puedes pedir cambios.",
      },
      {
        q: "¿Puedo cancelar?",
        a: "Facturación mensual: cancela cuando quieras.",
      },
    ],
  },
  hub: {
    tag: "Llave en mano",
    teaser: "Posts, carruseles y UGC con IA sobre tu producto — revisión humana en cada pieza.",
    cta: "AI Brand Studio",
  },
  pricingTeaser: {
    title: "AI Brand Studio",
    lead: "Contenido y vídeo llave en mano desde $590/mes. Perfil de marca, posts mensuales, UGC con IA y Meta Ads opcional.",
    cta: "Ver planes",
  },
};

const pt: BrandStudioCopy = {
  ...es,
  seoTitle: "AI Brand Studio — conteúdo e vídeo sob medida · AI MARK",
  seoDescription:
    "Do seu site a um mês de posts, carrosséis e vídeos UGC com IA. Revisão humana em cada peça. Planos a partir de $590/mês.",
  hero: {
    label: "SERVIÇO · SOB MEDIDA",
    title: "AI Brand Studio",
    subtitle:
      "Do seu domínio a um mês de conteúdo e anúncios prontos. A IA faz o trabalho pesado; um humano revisa cada peça.",
    ctaDiscuss: "Falar do projeto",
    ctaPlans: "Ver planos",
  },
  how: {
    eyebrow: "Como funciona",
    title: "Quatro passos do site aos anúncios",
    steps: [
      {
        num: "01",
        title: "Perfil de marca a partir do seu site",
        desc: "Oferta, personas, tom de voz, até 12 concorrentes e anúncios deles.",
      },
      {
        num: "02",
        title: "Plano de conteúdo de 4 semanas",
        desc: "28 publicações com ângulos diferentes: dor, prova, oferta, história, objeção, educação.",
      },
      {
        num: "03",
        title: "Produção",
        desc: "Posts, carrosséis e vídeos UGC com IA sobre o seu produto. Texto não cobre rostos. Cada peça revisada antes de publicar.",
      },
      {
        num: "04",
        title: "Publicação e anúncios",
        desc: "Autopublicação no Instagram, TikTok, YouTube Shorts e LinkedIn. Meta Ads e relatório semanal.",
      },
    ],
  },
  why: {
    eyebrow: "Por que nós",
    title: "Qualidade para rodar como canal",
    bullets: [
      "Revisão humana em todo post e vídeo",
      "Multimercado — vários países e idiomas num plano (Global)",
      "Vídeos sobre o seu produto, não avatares genéricos",
      "Preço mensal fixo, sem créditos",
    ],
  },
  plans: {
    ...es.plans,
    featuredLabel: "Mais popular",
    perMonth: "/ mês",
    footnote: "Início em 5 dias úteis. Orçamento de mídia pago à parte. Pagamento em USDT/USDC.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Respostas rápidas",
    items: [
      {
        q: "Quais redes sociais?",
        a: "Instagram, TikTok, YouTube Shorts e LinkedIn — conforme o plano. Growth e Global incluem autopublicação.",
      },
      {
        q: "Quantos países?",
        a: "Start: um mercado. Growth: até três. Global: até dez mercados ou idiomas num plano.",
      },
      {
        q: "Quem aprova o conteúdo?",
        a: "Você aprova o plano. Nosso editor revisa cada peça antes de publicar. Edições sob pedido.",
      },
      {
        q: "Posso cancelar?",
        a: "Cobrança mensal — cancele quando quiser.",
      },
    ],
  },
  hub: {
    tag: "Sob medida",
    teaser: "Posts, carrosséis e UGC com IA sobre o seu produto — revisão humana em cada peça.",
    cta: "AI Brand Studio",
  },
  pricingTeaser: {
    title: "AI Brand Studio",
    lead: "Conteúdo e vídeo sob medida a partir de $590/mês. Perfil de marca, posts, UGC com IA e Meta Ads.",
    cta: "Ver planos",
  },
};

const de: BrandStudioCopy = {
  ...en,
  seoTitle: "AI Brand Studio — Content & Video als Service · AI MARK",
  seoDescription:
    "Von Ihrer Website zu einem Monat Posts, Karussells und KI-UGC-Videos. Menschliche Prüfung jeder Einheit. Pläne ab $590/Mo.",
  hero: {
    label: "SERVICE · FULL-SERVICE",
    title: "AI Brand Studio",
    subtitle:
      "Von Ihrer Domain zu einem Monat fertigem Content und Ads. KI leistet die schwere Arbeit — ein Mensch prüft jedes Stück.",
    ctaDiscuss: "Projekt besprechen",
    ctaPlans: "Pläne ansehen",
  },
  how: {
    eyebrow: "Ablauf",
    title: "Vier Schritte von der Website zu Ads",
    steps: [
      {
        num: "01",
        title: "Markenprofil aus Ihrer Website",
        desc: "Angebot, Buyer Personas, Tone of Voice, bis zu 12 Wettbewerber und deren Anzeigen.",
      },
      {
        num: "02",
        title: "4-Wochen-Contentplan",
        desc: "28 Posts mit verschiedenen Blickwinkeln: Pain, Proof, Offer, Story, Einwand, Education.",
      },
      {
        num: "03",
        title: "Produktion",
        desc: "Posts, Karussells und KI-UGC-Videos (Talking Head, Unboxing, Produktanimation) zu Ihrem Produkt. Text verdeckt keine Gesichter. Jede Einheit wird vor Veröffentlichung redaktionell geprüft.",
      },
      {
        num: "04",
        title: "Publishing & Ads",
        desc: "Auto-Posting auf Instagram, TikTok, YouTube Shorts, LinkedIn. Meta-Ads-Start und Optimierung. Wöchentlicher Report.",
      },
    ],
  },
  why: {
    eyebrow: "Warum wir",
    title: "Qualität, die Sie als Kanal fahren können",
    bullets: [
      "Menschliche Qualitätsprüfung bei jedem Post und Video",
      "Multi-Market — mehrere Länder und Sprachen in einem Plan (Global)",
      "Videos über Ihr Produkt, keine generischen Avatare",
      "Fester Monatspreis, keine Credits",
    ],
  },
  plans: {
    eyebrow: "Pläne",
    title: "Monatliche Abos in USD",
    featuredLabel: "Beliebteste",
    perMonth: "/ Mo",
    footnote: "Start in 5 Werktagen. Ad-Budget separat. Zahlung in USDT/USDC.",
    items: [
      {
        id: "start",
        name: "Start",
        features: [
          "Markenprofil + 6 Wettbewerber",
          "12 Posts / Monat",
          "4 KI-Videos",
          "1 Markt",
          "2 soziale Netzwerke",
          "Menschliche Review",
        ],
      },
      {
        id: "growth",
        name: "Growth",
        features: [
          "Profil + 12 Wettbewerber",
          "28 Posts / Monat",
          "12 KI-Videos",
          "Bis zu 3 Märkte",
          "4 Netzwerke + Auto-Posting",
          "Meta-Ads-Setup",
          "Wöchentlicher Report",
        ],
      },
      {
        id: "global",
        name: "Global",
        features: [
          "Alles aus Growth",
          "Bis zu 10 Märkte / Sprachen",
          "20 KI-Videos",
          "Meta-Ads-Management (Spend separat)",
          "Dedizierter Manager",
          "Strategie-Call alle zwei Wochen",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Kurz & klar",
    items: [
      {
        q: "Welche Netzwerke?",
        a: "Instagram, TikTok, YouTube Shorts und LinkedIn — je nach Plan. Growth und Global mit Auto-Posting.",
      },
      {
        q: "Wie viele Länder?",
        a: "Start: ein Markt. Growth: bis zu drei. Global: bis zu zehn Märkte oder Sprachen.",
      },
      {
        q: "Wer gibt frei?",
        a: "Sie freigeben den Plan. Unser Editor prüft jedes Stück vor Live-Gang. Änderungen jederzeit.",
      },
      {
        q: "Kündigung?",
        a: "Monatliche Abrechnung — jederzeit kündbar.",
      },
    ],
  },
  hub: {
    tag: "Full-Service",
    teaser: "Posts, Karussells und KI-UGC zu Ihrem Produkt — menschliche Prüfung jeder Einheit.",
    cta: "AI Brand Studio",
  },
  pricingTeaser: {
    title: "AI Brand Studio",
    lead: "Content & Video als Service ab $590/Mo. Markenprofil, monatliche Posts, KI-UGC, optional Meta Ads.",
    cta: "Pläne ansehen",
  },
};

const fr: BrandStudioCopy = {
  ...en,
  seoTitle: "AI Brand Studio — contenu et vidéo clé en main · AI MARK",
  seoDescription:
    "De votre site à un mois de posts, carrousels et vidéos UGC IA. Relecture humaine sur chaque pièce. Forfaits dès $590/mois.",
  hero: {
    label: "SERVICE · CLÉ EN MAIN",
    title: "AI Brand Studio",
    subtitle:
      "De votre domaine à un mois de contenu et de publicités prêts. L’IA fait le gros du travail, un humain vérifie chaque pièce.",
    ctaDiscuss: "Discuter d’un projet",
    ctaPlans: "Voir les forfaits",
  },
  how: {
    eyebrow: "Comment ça marche",
    title: "Quatre étapes du site aux ads",
    steps: [
      {
        num: "01",
        title: "Profil de marque depuis votre site",
        desc: "Offre, personas, tone of voice, jusqu’à 12 concurrents et leurs publicités.",
      },
      {
        num: "02",
        title: "Plan éditorial sur 4 semaines",
        desc: "28 posts sous différents angles : pain, preuve, offre, histoire, objection, éducation.",
      },
      {
        num: "03",
        title: "Production",
        desc: "Posts, carrousels et vidéos UGC IA (face caméra, unboxing, animation produit) sur votre produit. Le texte ne cache pas les visages. Chaque pièce relue avant publication.",
      },
      {
        num: "04",
        title: "Publication et publicité",
        desc: "Auto-post sur Instagram, TikTok, YouTube Shorts, LinkedIn. Lancement et optimisation Meta Ads. Rapport hebdomadaire.",
      },
    ],
  },
  why: {
    eyebrow: "Pourquoi nous",
    title: "Une qualité exploitable comme canal",
    bullets: [
      "Contrôle humain sur chaque post et vidéo",
      "Multi-marchés — plusieurs pays et langues (Global)",
      "Vidéos sur votre produit, pas d’avatars génériques",
      "Prix mensuel fixe, sans crédits",
    ],
  },
  plans: {
    eyebrow: "Forfaits",
    title: "Abonnements mensuels en USD",
    featuredLabel: "Le plus populaire",
    perMonth: "/ mois",
    footnote: "Démarrage sous 5 jours ouvrés. Budget média en sus. Paiement en USDT/USDC.",
    items: [
      {
        id: "start",
        name: "Start",
        features: [
          "Profil de marque + 6 concurrents",
          "12 posts / mois",
          "4 vidéos IA",
          "1 marché",
          "2 réseaux sociaux",
          "Relecture humaine",
        ],
      },
      {
        id: "growth",
        name: "Growth",
        features: [
          "Profil + 12 concurrents",
          "28 posts / mois",
          "12 vidéos IA",
          "Jusqu’à 3 marchés",
          "4 réseaux + auto-post",
          "Setup Meta Ads",
          "Rapport hebdomadaire",
        ],
      },
      {
        id: "global",
        name: "Global",
        features: [
          "Tout Growth",
          "Jusqu’à 10 marchés / langues",
          "20 vidéos IA",
          "Gestion Meta Ads (budget à part)",
          "Manager dédié",
          "Point stratégique bihebdomadaire",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "En bref",
    items: [
      {
        q: "Quels réseaux ?",
        a: "Instagram, TikTok, YouTube Shorts et LinkedIn selon le forfait. Growth et Global : auto-post inclus.",
      },
      {
        q: "Combien de pays ?",
        a: "Start : un marché. Growth : jusqu’à trois. Global : jusqu’à dix marchés ou langues.",
      },
      {
        q: "Qui valide le contenu ?",
        a: "Vous validez le plan. Notre éditeur vérifie chaque pièce avant publication. Modifications sur demande.",
      },
      {
        q: "Résiliation ?",
        a: "Facturation mensuelle — résiliez quand vous voulez.",
      },
    ],
  },
  hub: {
    tag: "Clé en main",
    teaser: "Posts, carrousels et UGC IA sur votre produit — relecture humaine à chaque fois.",
    cta: "AI Brand Studio",
  },
  pricingTeaser: {
    title: "AI Brand Studio",
    lead: "Contenu et vidéo clé en main dès $590/mois. Profil de marque, posts, UGC IA et Meta Ads selon forfait.",
    cta: "Voir les forfaits",
  },
};

const id: BrandStudioCopy = {
  ...en,
  seoTitle: "AI Brand Studio — konten & video siap pakai · AI MARK",
  seoDescription:
    "Dari website Anda ke sebulan posting, carousel, dan video UGC AI. Editor manusia di setiap materi. Paket dari $590/bulan.",
  hero: {
    label: "LAYANAN · SIAP PAKAI",
    title: "AI Brand Studio",
    subtitle:
      "Dari domain Anda ke sebulan konten dan iklan siap pakai. AI mengerjakan bagian berat; manusia memeriksa setiap materi.",
    ctaDiscuss: "Diskusi proyek",
    ctaPlans: "Lihat paket",
  },
  how: {
    eyebrow: "Cara kerja",
    title: "Empat langkah dari situs ke iklan",
    steps: [
      {
        num: "01",
        title: "Profil merek dari website",
        desc: "Penawaran, persona pembeli, tone of voice, hingga 12 kompetitor dan iklan mereka.",
      },
      {
        num: "02",
        title: "Rencana konten 4 minggu",
        desc: "28 posting dengan sudut berbeda: pain, proof, offer, story, keberatan, edukasi.",
      },
      {
        num: "03",
        title: "Produksi",
        desc: "Posting, carousel, dan video UGC AI (talking head, unboxing, animasi produk) tentang produk Anda. Teks tidak menutupi wajah. Setiap materi direview editor sebelum terbit.",
      },
      {
        num: "04",
        title: "Publikasi & iklan",
        desc: "Auto-post ke Instagram, TikTok, YouTube Shorts, LinkedIn. Peluncuran dan optimasi Meta Ads. Laporan mingguan.",
      },
    ],
  },
  why: {
    eyebrow: "Mengapa kami",
    title: "Kualitas yang bisa dijalankan sebagai channel",
    bullets: [
      "Pemeriksaan manusia di setiap post dan video",
      "Multi-pasar — beberapa negara dan bahasa (Global)",
      "Video tentang produk Anda, bukan avatar generik",
      "Harga bulanan tetap, tanpa kredit",
    ],
  },
  plans: {
    eyebrow: "Paket",
    title: "Langganan bulanan USD",
    featuredLabel: "Paling populer",
    perMonth: "/ bln",
    footnote: "Mulai dalam 5 hari kerja. Budget iklan terpisah. Bayar USDT/USDC.",
    items: [
      {
        id: "start",
        name: "Start",
        features: [
          "Profil merek + 6 kompetitor",
          "12 post / bulan",
          "4 video AI",
          "1 pasar",
          "2 jejaring sosial",
          "Review manusia",
        ],
      },
      {
        id: "growth",
        name: "Growth",
        features: [
          "Profil + 12 kompetitor",
          "28 post / bulan",
          "12 video AI",
          "Hingga 3 pasar",
          "4 jaringan + auto-post",
          "Setup Meta Ads",
          "Laporan mingguan",
        ],
      },
      {
        id: "global",
        name: "Global",
        features: [
          "Semua Growth",
          "Hingga 10 pasar / bahasa",
          "20 video AI",
          "Kelola Meta Ads (budget terpisah)",
          "Manager dedicated",
          "Call strategi dua mingguan",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Jawaban singkat",
    items: [
      {
        q: "Jejaring sosial apa?",
        a: "Instagram, TikTok, YouTube Shorts, LinkedIn — sesuai paket. Growth & Global termasuk auto-post.",
      },
      {
        q: "Berapa negara?",
        a: "Start: satu pasar. Growth: hingga tiga. Global: hingga sepuluh pasar atau bahasa.",
      },
      {
        q: "Siapa yang menyetujui?",
        a: "Anda setujui rencana. Editor kami cek setiap materi sebelum terbit. Revisi kapan saja.",
      },
      {
        q: "Bisa batalkan?",
        a: "Tagihan bulanan — batalkan kapan saja.",
      },
    ],
  },
  hub: {
    tag: "Siap pakai",
    teaser: "Post, carousel, dan UGC AI tentang produk Anda — review manusia setiap materi.",
    cta: "AI Brand Studio",
  },
  pricingTeaser: {
    title: "AI Brand Studio",
    lead: "Konten dan video siap pakai dari $590/bulan. Profil merek, posting, UGC AI, Meta Ads opsional.",
    cta: "Lihat paket",
  },
};

const vi: BrandStudioCopy = {
  ...en,
  seoTitle: "AI Brand Studio — nội dung & video trọn gói · AI MARK",
  seoDescription:
    "Từ website đến một tháng bài đăng, carousel và video UGC AI. Biên tập viên duyệt từng tài liệu. Gói từ $590/tháng.",
  hero: {
    label: "DỊCH VỤ · TRỌN GÓI",
    title: "AI Brand Studio",
    subtitle:
      "Từ tên miền đến một tháng nội dung và quảng cáo sẵn sàng. AI làm phần nặng; con người kiểm tra từng tài liệu.",
    ctaDiscuss: "Thảo luận dự án",
    ctaPlans: "Xem gói",
  },
  how: {
    eyebrow: "Cách hoạt động",
    title: "Bốn bước từ site đến quảng cáo",
    steps: [
      {
        num: "01",
        title: "Hồ sơ thương hiệu từ website",
        desc: "Đề xuất, persona, tone of voice, tới 12 đối thủ và quảng cáo của họ.",
      },
      {
        num: "02",
        title: "Kế hoạch nội dung 4 tuần",
        desc: "28 bài với góc khác nhau: pain, proof, offer, story, phản đối, giáo dục.",
      },
      {
        num: "03",
        title: "Sản xuất",
        desc: "Bài đăng, carousel và video UGC AI (talking head, unboxing, animation sản phẩm) về sản phẩm của bạn. Chữ không che mặt. Biên tập duyệt trước khi đăng.",
      },
      {
        num: "04",
        title: "Đăng tải & quảng cáo",
        desc: "Tự đăng Instagram, TikTok, YouTube Shorts, LinkedIn. Khởi chạy và tối ưu Meta Ads. Báo cáo hàng tuần.",
      },
    ],
  },
  why: {
    eyebrow: "Vì sao chúng tôi",
    title: "Chất lượng chạy như một kênh",
    bullets: [
      "Kiểm tra chất lượng từng bài và video",
      "Đa thị trường — nhiều quốc gia và ngôn ngữ (Global)",
      "Video về sản phẩm bạn, không avatar chung chung",
      "Giá tháng cố định, không credit",
    ],
  },
  plans: {
    eyebrow: "Gói",
    title: "Thuê bao hàng tháng USD",
    featuredLabel: "Phổ biến nhất",
    perMonth: "/ tháng",
    footnote: "Bắt đầu trong 5 ngày làm việc. Ngân sách quảng cáo riêng. Thanh toán USDT/USDC.",
    items: [
      {
        id: "start",
        name: "Start",
        features: [
          "Hồ sơ thương hiệu + 6 đối thủ",
          "12 bài / tháng",
          "4 video AI",
          "1 thị trường",
          "2 mạng xã hội",
          "Biên tập viên duyệt",
        ],
      },
      {
        id: "growth",
        name: "Growth",
        features: [
          "Hồ sơ + 12 đối thủ",
          "28 bài / tháng",
          "12 video AI",
          "Tới 3 thị trường",
          "4 mạng + tự đăng",
          "Thiết lập Meta Ads",
          "Báo cáo tuần",
        ],
      },
      {
        id: "global",
        name: "Global",
        features: [
          "Toàn bộ Growth",
          "Tới 10 thị trường / ngôn ngữ",
          "20 video AI",
          "Quản lý Meta Ads (chi phí riêng)",
          "Quản lý riêng",
          "Gọi chiến lược hai tuần/lần",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Trả lời nhanh",
    items: [
      {
        q: "Mạng xã hội nào?",
        a: "Instagram, TikTok, YouTube Shorts, LinkedIn — theo gói. Growth & Global có tự đăng.",
      },
      {
        q: "Bao nhiêu quốc gia?",
        a: "Start: một thị trường. Growth: tới ba. Global: tới mười thị trường hoặc ngôn ngữ.",
      },
      {
        q: "Ai duyệt nội dung?",
        a: "Bạn duyệt kế hoạch. Biên tập kiểm tra từng tài liệu trước khi đăng. Sửa theo yêu cầu.",
      },
      {
        q: "Hủy được không?",
        a: "Thanh toán tháng — hủy bất cứ lúc nào.",
      },
    ],
  },
  hub: {
    tag: "Trọn gói",
    teaser: "Bài đăng, carousel và UGC AI về sản phẩm — biên tập từng tài liệu.",
    cta: "AI Brand Studio",
  },
  pricingTeaser: {
    title: "AI Brand Studio",
    lead: "Nội dung & video trọn gói từ $590/tháng. Hồ sơ thương hiệu, bài đăng, UGC AI, Meta Ads.",
    cta: "Xem gói",
  },
};

const tr: BrandStudioCopy = {
  ...en,
  seoTitle: "AI Brand Studio — anahtar teslim içerik ve video · AI MARK",
  seoDescription:
    "Sitenizden bir aylık gönderi, carousel ve AI UGC videolara. Her parçada insan kontrolü. Planlar $590/ay’dan.",
  hero: {
    label: "HİZMET · ANAHTAR TESLİM",
    title: "AI Brand Studio",
    subtitle:
      "Alan adınızdan bir aylık hazır içerik ve reklama. AI ağır işi yapar; bir insan her parçayı kontrol eder.",
    ctaDiscuss: "Proje konuş",
    ctaPlans: "Planları gör",
  },
  how: {
    eyebrow: "Nasıl çalışır",
    title: "Siteden reklama dört adım",
    steps: [
      {
        num: "01",
        title: "Siteden marka profili",
        desc: "Teklif, buyer persona, tone of voice, 12 rakibe kadar ve reklamları.",
      },
      {
        num: "02",
        title: "4 haftalık içerik planı",
        desc: "28 gönderi: pain, proof, offer, story, itiraz, eğitim açıları.",
      },
      {
        num: "03",
        title: "Üretim",
        desc: "Gönderiler, carousel’ler ve AI UGC (talking head, unboxing, ürün animasyonu). Metin yüzleri kapatmaz. Yayın öncesi editör kontrolü.",
      },
      {
        num: "04",
        title: "Yayın ve reklam",
        desc: "Instagram, TikTok, YouTube Shorts, LinkedIn otomatik paylaşım. Meta Ads başlatma ve optimizasyon. Haftalık rapor.",
      },
    ],
  },
  why: {
    eyebrow: "Neden biz",
    title: "Kanal olarak sürdürülebilir kalite",
    bullets: [
      "Her gönderi ve videoda insan kalite kontrolü",
      "Çoklu pazar — bir planda birden fazla ülke/dil (Global)",
      "Ürününüz hakkında video, jenerik avatar değil",
      "Sabit aylık ücret, kredi yok",
    ],
  },
  plans: {
    eyebrow: "Planlar",
    title: "Aylık USD abonelik",
    featuredLabel: "En popüler",
    perMonth: "/ ay",
    footnote: "5 iş gününde başlangıç. Reklam bütçesi ayrı. USDT/USDC ile ödeme.",
    items: [
      {
        id: "start",
        name: "Start",
        features: [
          "Marka profili + 6 rakip",
          "12 gönderi / ay",
          "4 AI video",
          "1 pazar",
          "2 sosyal ağ",
          "İnsan incelemesi",
        ],
      },
      {
        id: "growth",
        name: "Growth",
        features: [
          "Profil + 12 rakip",
          "28 gönderi / ay",
          "12 AI video",
          "3 pazara kadar",
          "4 ağ + otomatik paylaşım",
          "Meta Ads kurulum",
          "Haftalık rapor",
        ],
      },
      {
        id: "global",
        name: "Global",
        features: [
          "Growth’taki her şey",
          "10 pazar / dile kadar",
          "20 AI video",
          "Meta Ads yönetimi (harcama ayrı)",
          "Özel yönetici",
          "İki haftada bir strateji görüşmesi",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "SSS",
    title: "Kısa yanıtlar",
    items: [
      {
        q: "Hangi ağlar?",
        a: "Instagram, TikTok, YouTube Shorts, LinkedIn — plana göre. Growth ve Global’de otomatik paylaşım.",
      },
      {
        q: "Kaç ülke?",
        a: "Start: bir pazar. Growth: üçe kadar. Global: on pazar veya dile kadar.",
      },
      {
        q: "İçeriği kim onaylar?",
        a: "Planı siz onaylarsınız. Editör her parçayı yayın öncesi kontrol eder. Düzenleme talep edebilirsiniz.",
      },
      {
        q: "İptal?",
        a: "Aylık faturalama — istediğiniz zaman iptal.",
      },
    ],
  },
  hub: {
    tag: "Anahtar teslim",
    teaser: "Ürününüz için gönderi, carousel ve AI UGC — her parçada insan kontrolü.",
    cta: "AI Brand Studio",
  },
  pricingTeaser: {
    title: "AI Brand Studio",
    lead: "Anahtar teslim içerik ve video $590/ay’dan. Marka profili, aylık gönderiler, AI UGC, Meta Ads.",
    cta: "Planları gör",
  },
};

const ar: BrandStudioCopy = {
  ...en,
  seoTitle: "AI Brand Studio — محتوى وفيديو جاهز · AI MARK",
  seoDescription:
    "من موقعك إلى شهر من المنشورات والكарусيل وفيديو UGC بالذكاء الاصطناعي. مراجعة بشرية لكل قطعة. خطط من 590$/شهر.",
  hero: {
    label: "خدمة · تنفيذ كامل",
    title: "AI Brand Studio",
    subtitle:
      "من نطاقك إلى شهر من المحتوى والإعلانات الجاهزة. الذكاء الاصطناعي يقوم بالعمل الثقيل، وإنسان يراجع كل قطعة.",
    ctaDiscuss: "ناقش مشروعًا",
    ctaPlans: "عرض الخطط",
  },
  how: {
    eyebrow: "كيف يعمل",
    title: "أربع خطوات من الموقع إلى الإعلانات",
    steps: [
      {
        num: "01",
        title: "ملف العلامة من موقعك",
        desc: "العرض، شخصيات المشتري، نبرة الصوت، حتى 12 منافسًا وإعلاناتهم.",
      },
      {
        num: "02",
        title: "خطة محتوى لأربعة أسابيع",
        desc: "28 منشورًا بزوايا مختلفة: ألم، إثبات، عرض، قصة، اعتراض، تعليم.",
      },
      {
        num: "03",
        title: "الإنتاج",
        desc: "منشورات وكарусيل وفيديو UGC (وجه متحدث، فتح علبة، رسوم منتج) عن منتجك. النص لا يغطي الوجوه. مراجعة بشرية قبل النشر.",
      },
      {
        num: "04",
        title: "النشر والإعلانات",
        desc: "نشر تلقائي على Instagram وTikTok وYouTube Shorts وLinkedIn. إطلاق وتحسين Meta Ads. تقرير أسبوعي.",
      },
    ],
  },
  why: {
    eyebrow: "لماذا نحن",
    title: "جودة يمكن تشغيلها كقناة",
    bullets: [
      "مراجعة بشرية لكل منشور وفيديو",
      "أسواق متعددة — عدة دول ولغات في خطة واحدة (Global)",
      "فيديوهات عن منتجك وليس شخصيات رقمية عامة",
      "سعر شهري ثابت، بدون credits",
    ],
  },
  plans: {
    eyebrow: "الخطط",
    title: "اشتراك شهري بالدولار",
    featuredLabel: "الأكثر شيوعًا",
    perMonth: "/ شهر",
    footnote: "البدء خلال 5 أيام عمل. ميزانية الإعلانات منفصلة. الدفع USDT/USDC.",
    items: [
      {
        id: "start",
        name: "Start",
        features: [
          "ملف العلامة + 6 منافسين",
          "12 منشور / شهر",
          "4 فيديو AI",
          "سوق واحد",
          "شبكتان اجتماعيتان",
          "مراجعة بشرية",
        ],
      },
      {
        id: "growth",
        name: "Growth",
        features: [
          "ملف + 12 منافسًا",
          "28 منشور / شهر",
          "12 فيديو AI",
          "حتى 3 أسواق",
          "4 شبكات + نشر تلقائي",
          "إعداد Meta Ads",
          "تقرير أسبوعي",
        ],
      },
      {
        id: "global",
        name: "Global",
        features: [
          "كل ما في Growth",
          "حتى 10 أسواق / لغات",
          "20 فيديو AI",
          "إدارة Meta Ads (الإنفاق منفصل)",
          "مدير مخصص",
          "مكالمة استراتيجية كل أسبوعين",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "أسئلة",
    title: "إجابات سريعة",
    items: [
      {
        q: "ما الشبكات؟",
        a: "Instagram وTikTok وYouTube Shorts وLinkedIn حسب خطتك. Growth وGlobal يشملان النشر التلقائي.",
      },
      {
        q: "كم دولة؟",
        a: "Start: سوق واحد. Growth: حتى ثلاثة. Global: حتى عشرة أسواق أو لغات.",
      },
      {
        q: "من يوافق على المحتوى؟",
        a: "أنت توافق على الخطة. المحرر يراجع كل قطعة قبل النشر. يمكنك طلب تعديلات.",
      },
      {
        q: "هل يمكن الإلغاء؟",
        a: "فوترة شهرية — ألغِ في أي وقت.",
      },
    ],
  },
  hub: {
    tag: "تنفيذ كامل",
    teaser: "منشورات وcarousels وUGC بالذكاء الاصطناعي عن منتجك — مراجعة بشرية لكل قطعة.",
    cta: "AI Brand Studio",
  },
  pricingTeaser: {
    title: "AI Brand Studio",
    lead: "محتوى وفيديو جاهز من 590$/شهر. ملف علامة، منشورات، UGC وMeta Ads حسب الخطة.",
    cta: "عرض الخطط",
  },
};

const zh: BrandStudioCopy = {
  ...en,
  seoTitle: "AI Brand Studio — 全托管内容与视频 · AI MARK",
  seoDescription:
    "从网站到一整月的帖子、轮播与 AI UGC 视频。每条内容有人工审核。套餐自 $590/月起。",
  hero: {
    label: "服务 · 全托管",
    title: "AI Brand Studio",
    subtitle:
      "从域名到一整月就绪的内容与广告。AI 承担主要工作，人工审核每一条内容。",
    ctaDiscuss: "讨论项目",
    ctaPlans: "查看套餐",
  },
  how: {
    eyebrow: "如何运作",
    title: "从网站到广告的四步",
    steps: [
      {
        num: "01",
        title: "基于网站的品牌档案",
        desc: "卖点、买家画像、语气，最多 12 个竞品及其广告。",
      },
      {
        num: "02",
        title: "四周内容计划",
        desc: "28 条帖子，覆盖痛点、证明、优惠、故事、异议、教育等角度。",
      },
      {
        num: "03",
        title: "制作",
        desc: "帖子、轮播与 AI UGC 视频（口播、开箱、产品动画）围绕您的产品。文字不遮挡面部。发布前人工编辑审核。",
      },
      {
        num: "04",
        title: "发布与广告",
        desc: "自动发布至 Instagram、TikTok、YouTube Shorts、LinkedIn。Meta 广告启动与优化。周报。",
      },
    ],
  },
  why: {
    eyebrow: "为何选我们",
    title: "可持续当作渠道的质量",
    bullets: [
      "每条帖子与视频均有人工质检",
      "多市场 — 一个计划覆盖多国多语言（Global）",
      "视频围绕您的产品，而非通用数字人",
      "固定月费，无积分制",
    ],
  },
  plans: {
    eyebrow: "套餐",
    title: "美元月订阅",
    featuredLabel: "最受欢迎",
    perMonth: "/ 月",
    footnote: "5 个工作日内启动。广告预算另计。支持 USDT/USDC 支付。",
    items: [
      {
        id: "start",
        name: "Start",
        features: [
          "品牌档案 + 6 个竞品",
          "12 帖 / 月",
          "4 条 AI 视频",
          "1 个市场",
          "2 个社交网络",
          "人工审核",
        ],
      },
      {
        id: "growth",
        name: "Growth",
        features: [
          "档案 + 12 个竞品",
          "28 帖 / 月",
          "12 条 AI 视频",
          "最多 3 个市场",
          "4 个网络 + 自动发布",
          "Meta 广告搭建",
          "周报",
        ],
      },
      {
        id: "global",
        name: "Global",
        features: [
          "Growth 全部权益",
          "最多 10 个市场 / 语言",
          "20 条 AI 视频",
          "Meta 广告管理（投放费另计）",
          "专属经理",
          "双周策略会",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "常见问题",
    title: "简要回答",
    items: [
      {
        q: "支持哪些社交网络？",
        a: "Instagram、TikTok、YouTube Shorts、LinkedIn — 视套餐而定。Growth 与 Global 含自动发布。",
      },
      {
        q: "覆盖多少国家？",
        a: "Start：1 个市场。Growth：最多 3 个。Global：最多 10 个市场或语言。",
      },
      {
        q: "谁审核内容？",
        a: "您确认计划。编辑在发布前审核每条内容。可随时要求修改。",
      },
      {
        q: "可以取消吗？",
        a: "按月计费 — 随时取消。",
      },
    ],
  },
  hub: {
    tag: "全托管",
    teaser: "围绕您产品的帖子、轮播与 AI UGC — 每条均有人工审核。",
    cta: "AI Brand Studio",
  },
  pricingTeaser: {
    title: "AI Brand Studio",
    lead: "全托管内容与视频，$590/月起。品牌档案、月度帖子、AI UGC 及 Meta 广告。",
    cta: "查看套餐",
  },
};

const ja: BrandStudioCopy = {
  ...en,
  seoTitle: "AI Brand Studio — 丸ごとコンテンツ＆動画 · AI MARK",
  seoDescription:
    "サイトから1か月分の投稿、カルーセル、AI UGC動画へ。すべて人がチェック。$590/月〜。",
  hero: {
    label: "サービス · 丸ごと",
    title: "AI Brand Studio",
    subtitle:
      "ドメインから1か月分のコンテンツと広告まで。AIが重い作業を担い、人がすべて確認します。",
    ctaDiscuss: "プロジェクト相談",
    ctaPlans: "プランを見る",
  },
  how: {
    eyebrow: "進め方",
    title: "サイトから広告まで4ステップ",
    steps: [
      {
        num: "01",
        title: "サイトからブランドプロファイル",
        desc: "オファー、ペルソナ、トーン、最大12競合とその広告。",
      },
      {
        num: "02",
        title: "4週間のコンテンツ計画",
        desc: "28投稿。ペイン、証拠、オファー、ストーリー、反論、教育など多角的に。",
      },
      {
        num: "03",
        title: "制作",
        desc: "投稿、カルーセル、AI UGC（トーキングヘッド、開封、商品アニメ）すべて自社商品向け。文字で顔を隠さない。公開前に編集者が確認。",
      },
      {
        num: "04",
        title: "公開と広告",
        desc: "Instagram、TikTok、YouTube Shorts、LinkedInへ自動投稿。Meta広告の開始と最適化。週次レポート。",
      },
    ],
  },
  why: {
    eyebrow: "選ばれる理由",
    title: "チャネルとして回せる品質",
    bullets: [
      "すべての投稿と動画を人がチェック",
      "マルチマーケット — 1プランで複数国・言語（Global）",
      "自社商品の動画、汎用アバターではない",
      "月額固定、クレジット制なし",
    ],
  },
  plans: {
    eyebrow: "プラン",
    title: "USD月額サブスク",
    featuredLabel: "人気",
    perMonth: "/ 月",
    footnote: "5営業日で開始。広告予算は別途。USDT/USDCで支払い。",
    items: [
      {
        id: "start",
        name: "Start",
        features: [
          "ブランドプロファイル + 競合6社",
          "12投稿 / 月",
          "AI動画4本",
          "1市場",
          "SNS 2つ",
          "人によるレビュー",
        ],
      },
      {
        id: "growth",
        name: "Growth",
        features: [
          "プロファイル + 競合12社",
          "28投稿 / 月",
          "AI動画12本",
          "最大3市場",
          "4ネットワーク + 自動投稿",
          "Meta広告セットアップ",
          "週次レポート",
        ],
      },
      {
        id: "global",
        name: "Global",
        features: [
          "Growthのすべて",
          "最大10市場 / 言語",
          "AI動画20本",
          "Meta広告運用（広告費別）",
          "専任マネージャー",
          "隔週ストラテジーコール",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "よくある質問",
    items: [
      {
        q: "対応SNSは？",
        a: "Instagram、TikTok、YouTube Shorts、LinkedIn — プランにより異なります。Growth/Globalは自動投稿付き。",
      },
      {
        q: "国数は？",
        a: "Start: 1市場。Growth: 最大3。Global: 最大10市場または言語。",
      },
      {
        q: "誰が承認？",
        a: "計画はお客様が承認。公開前に編集者がすべて確認。修正依頼可能。",
      },
      {
        q: "解約は？",
        a: "月額課金 — いつでも解約可能。",
      },
    ],
  },
  hub: {
    tag: "丸ごと",
    teaser: "自社商品の投稿・カルーセル・AI UGC — すべて人がチェック。",
    cta: "AI Brand Studio",
  },
  pricingTeaser: {
    title: "AI Brand Studio",
    lead: "丸ごとコンテンツ＆動画 $590/月〜。ブランドプロファイル、月次投稿、AI UGC、Meta広告。",
    cta: "プランを見る",
  },
};

export const brandStudioCopy: Record<Locale, BrandStudioCopy> = {
  en,
  es,
  pt,
  ru,
  ar,
  zh,
  id,
  vi,
  de,
  fr,
  ja,
  tr,
};

export function getBrandStudioCopy(locale: Locale): BrandStudioCopy {
  return brandStudioCopy[locale] ?? brandStudioCopy.en;
}
