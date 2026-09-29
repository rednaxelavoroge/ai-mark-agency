import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadInquiry } from "@/components/LeadInquiry";
import { LocaleProgram } from "@/components/partners/LocaleProgram";
import { PartnerNetworkHeroVisual } from "@/components/PartnerNetworkHeroVisual";
import { LevelRings } from "@/components/visuals/ProductScenes";
import { getCopy } from "@/content/copy";
import { PARTNER_SIGNUP_HREF } from "@/lib/auth/redirects";
import { type ProductVariant } from "@/components/ui/ProductUI";
import { PRODUCT_PATHS } from "@/lib/products";
import { digitalProductionPath } from "@/lib/digital-production";
import { partnerProgramTerms } from "@/content/partner-program";
import { absoluteUrl, isLocale, localePath, site, type Locale } from "@/lib/site";
import { socialImages } from "@/lib/social";
import { BackButton } from "@/components/BackButton";

type Props = { params: Promise<{ locale: string }> };

type ProductCard = {
  name: string;
  type: string;
  body: string;
  revenue: string;
  variant: ProductVariant;
  href?: string;
};

type PageCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  note: string;
  primary: string;
  secondary: string;
  marketEyebrow: string;
  marketTitle: string;
  marketLead: string;
  market: { title: string; body: string }[];
  marketCore: string;
  productEyebrow: string;
  productTitle: string;
  productLead: string;
  products: ProductCard[];
  productCta: string;
  productionCta: string;
  howEyebrow: string;
  modelTitle: string;
  modelLead: string;
  steps: { n: string; title: string; body: string }[];
  networkEyebrow: string;
  networkTitle: string;
  networkLead: string;
  poolHeadline: string;
  poolLead: string;
  exampleTitle: string;
  exampleRows: { label: string; value: string; accent?: boolean }[];
  exampleFoot: string;
  levels: { n: string; title: string; body: string; rate: string }[];
  commissionLabel: string;
  commissionNote: string;
  statusEyebrow: string;
  statusTitle: string;
  statusLead: string;
  statuses: { tag: string; title: string; body: string }[];
  statusNote: string;
  kitEyebrow: string;
  kitTitle: string;
  kitLead: string;
  kit: string[];
  globalEyebrow: string;
  globalTitle: string;
  globalLead: string;
  global: string[];
  faqEyebrow: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaLead: string;
  ctaButton: string;
};

const pageCopy: Partial<Record<Locale, PageCopy>> = {
  en: {
    metaTitle: "AI MARK Partner Network — Build Your Market",
    metaDescription: "Sell AI products and digital solutions with AI MARK. Build customer relationships, develop new markets and grow through a structured partner network.",
    eyebrow: "AI MARK Partner Network",
    title: "Build the AI market in your country.",
    lead: "Sell real AI products and digital solutions to businesses in your market. AI MARK provides the technology, product delivery and partner infrastructure. You build the relationships and the sales.",
    note: "50% for a direct sale · Up to 80% total partner rewards across the network · Free to join",
    primary: "Become a Partner",
    secondary: "See how it works",
    marketEyebrow: "The market",
    marketTitle: "One portfolio. A broad cross-industry market.",
    marketLead: "The opportunity is not tied to one niche. Businesses everywhere need to operate, attract customers, communicate, maintain a digital presence and improve how work gets done.",
    market: [
      { title: "Operate", body: "Routine communication, knowledge work, coordination and customer requests create constant operational demand." },
      { title: "Market", body: "Every business needs visibility, content, campaigns, customer conversations and a repeatable growth process." },
      { title: "Build", body: "Growing companies need websites, portals, applications, integrations and custom digital systems." },
      { title: "Automate", body: "As processes become more complex, demand grows for AI, automation and systems that reduce manual overhead." },
    ],
    marketCore: "Your market is not one product. It is every business you can reach.",
    productEyebrow: "Product portfolio",
    productTitle: "Four ways to create value for a customer.",
    productLead: "A partner can match the customer's business problem to the right AI MARK solution instead of selling one product to one niche.",
    products: [
      { name: "AI Marketing Employee", type: "RECURRING / AI PRODUCT", body: "AI-native marketing: research, strategy, content, creative production, approval, publishing and optimization.", revenue: "Subscription opportunity", variant: "aime", href: PRODUCT_PATHS.aime },
      { name: "AI Business Assistant", type: "RECURRING / AI PRODUCT", body: "A sales and support inbox that works from a business knowledge base, qualifies requests and hands off to people when needed.", revenue: "Subscription opportunity", variant: "assistant", href: PRODUCT_PATHS.assistant },
      { name: "SHOWROOM AI / AI Sales Agent", type: "RECURRING / AI PRODUCT", body: "AI Sales Agent for customer conversations, catalog selection, pricing rules, specifications and commercial proposals across industries.", revenue: "Subscription opportunity", variant: "showroom", href: PRODUCT_PATHS.showroom },
      { name: "Digital Production & AI Engineering", type: "PROJECT / B2B SERVICE", body: "Websites, portals, applications, integrations, automation and custom AI systems for businesses that need a larger digital build.", revenue: "Project opportunity", variant: "saas" },
    ],
    productCta: "Explore product",
    productionCta: "Digital Production",
    howEyebrow: "How it works",
    modelTitle: "You sell. AI MARK delivers.",
    modelLead: "The partner is the market interface. AI MARK stays responsible for the agreed product, technology and delivery layer.",
    steps: [
      { n: "01", title: "Find a business", body: "Use your network, local market knowledge or existing customer base." },
      { n: "02", title: "Match the problem", body: "Choose the product or service that fits the business need." },
      { n: "03", title: "Introduce AI MARK", body: "Use your referral link, a live product page, or a direct introduction. There is no partner sandbox and no slide deck." },
      { n: "04", title: "Close the sale", body: "The customer becomes an AI MARK customer through the tracked partner channel." },
      { n: "05", title: "AI MARK delivers", body: "Setup, implementation and service execution stay on the AI MARK side." },
      { n: "06", title: "Build your market", body: "Repeat, grow your customer base and develop an eligible partner network." },
    ],
    networkEyebrow: "Partner network",
    networkTitle: "Personal sales first. Network sales next.",
    networkLead: "The network is built around paid customer sales, not registrations. Five levels share the amount the customer actually paid. 80% is the aggregate partner pool across qualified levels — not a single-partner payout.",
    poolHeadline: "50% for a direct sale. Up to 80% total partner rewards across the network.",
    poolLead: "L1 is 50% of the commissionable amount. The remaining levels share 30%. Together that is an 80% network pool. AI Mark retained share is 20%.",
    exampleTitle: "On a $1,000 commissionable sale with a full network",
    exampleRows: [
      { label: "L1 direct partner", value: "$500", accent: true },
      { label: "L2", value: "$150" },
      { label: "L3", value: "$70" },
      { label: "L4", value: "$50" },
      { label: "L5", value: "$30" },
      { label: "Partner pool (aggregate)", value: "$800" },
      { label: "AI Mark retained share", value: "$200" },
    ],
    exampleFoot: "The direct partner receives $500, not $800. 80% is the total across L1–L5 when every level is qualified.",
    levels: [
      { n: "L1", title: "Direct sale", body: "The customer you personally introduce.", rate: "50%" },
      { n: "L2", title: "First network", body: "Paid customer sales from your first-level partners.", rate: "15%" },
      { n: "L3", title: "Extended network", body: "Paid sales one level deeper.", rate: "7%" },
      { n: "L4", title: "Market depth", body: "The network beyond direct relationships.", rate: "5%" },
      { n: "L5", title: "Maximum depth", body: "The deepest level of the standard schedule.", rate: "3%" },
    ],
    commissionLabel: "Commission",
    commissionNote: "L1 50% / L2 15% / L3 7% / L4 5% / L5 3% on the amount collected. Total network pool 80%.",
    statusEyebrow: "Partner status",
    statusTitle: "Four ways to grow with AI MARK.",
    statusLead: "Status reflects commercial activity and relationship depth. It is a business status, not a paid rank.",
    statuses: [
      { tag: "START", title: "Partner", body: "Sell AI MARK products, use your referral link, access sales resources and build your first customers." },
      { tag: "ACTIVE SALES", title: "Growth Partner", body: "A consistently active seller with a growing customer portfolio and developing partner network." },
      { tag: "MARKET", title: "Regional Partner", body: "Develop a country or region through local relationships, sales activity and coordinated market growth." },
      { tag: "ENTERPRISE", title: "Strategic Partner", body: "Agencies, distributors and larger B2B channels. Country Partner and Strategic Partner are a separate agreement, outside the affiliate schedule." },
    ],
    statusNote: "Status by performance",
    kitEyebrow: "Partner infrastructure",
    kitTitle: "What a partner can use today.",
    kitLead: "Referral links, the Partner Dashboard, live product pages, brand files already on this site, and the public support channels. There is no partner sandbox, no PDF or PPT deck, no campaign creatives, no partner payout request, no automatic commission lock, no reversal screen, no ticket queue, and no training course. Chat, Telegram, WhatsApp, and email are not tracked leads.",
    kit: [
      "Personal referral link and Partner ID",
      "Partner Dashboard with your own sales, commissions, and recorded payouts",
      "Live product pages shared through your referral link",
      "Brand files the site already publishes",
      "Lead attribution on the contact form, partner signup, and /pay",
      "Product facts from the public pages, inside Partner Hub",
      "Public support: Telegram, WhatsApp, Messenger, and email",
    ],
    globalEyebrow: "Global expansion",
    globalTitle: "Choose the market. AI MARK provides the technology.",
    globalLead: "The same core portfolio can be introduced by different partners in different countries and industries. The market is defined by your reach and specialization.",
    global: ["Country and regional business networks", "Industry-specific sales partners", "Agencies and consultants", "Independent B2B sales professionals", "Local AI and digital transformation advisors"],
    faqEyebrow: "Questions",
    faqTitle: "Straight answers before you join.",
    faq: [
      { q: "Do I have to buy a package to become a partner?", a: "The Partner Program is designed around selling AI MARK products and services, not purchasing a position in the network. Final onboarding rules are defined in the Partner Agreement." },
      { q: "Do I need to deliver the product myself?", a: "No. The partner focuses on relationships and sales opportunities. AI MARK remains responsible for the agreed product and delivery layer." },
      { q: "Can I build a team?", a: "Yes. The standard model supports a multi-level partner network linked to eligible customer sales, with a maximum depth of five levels." },
      { q: "Can subscriptions create recurring commissions?", a: "Each qualifying payment follows the rule in force on the day it is paid. The 90-day launch window is a status flag only and does not multiply rates. Recurring payments use the same L1 50% / L2 15% / L3 7% / L4 5% / L5 3% schedule, with an 80% aggregate pool across qualified levels." },
      { q: "Can I become a Regional Partner?", a: "Yes. Regional status is intended for partners who demonstrate sustained commercial activity and can systematically develop a local market." },
    ],
    ctaEyebrow: "Start",
    ctaTitle: "Your market. Our AI infrastructure.",
    ctaLead: "Join as a partner, choose the market you understand and start with the businesses you can actually reach.",
    ctaButton: "Become an AI MARK Partner",
  },
  ru: {
    metaTitle: "Партнёрская сеть AI MARK — Развивайте свой рынок",
    metaDescription: "Продавайте AI-продукты и цифровые решения AI MARK. Развивайте клиентскую базу и новые рынки через структурированную партнёрскую сеть.",
    eyebrow: "Партнёрская сеть AI MARK",
    title: "Создавайте рынок AI в своей стране.",
    lead: "Продавайте реальные AI-продукты и цифровые решения бизнесу в своём регионе. AI MARK даёт технологию, продукты, поставку и партнёрскую инфраструктуру. Вы строите отношения и продажи.",
    note: "До 80% партнёрского вознаграждения · L1 50% за прямую продажу · Бесплатный вход",
    primary: "Стать партнёром",
    secondary: "Как это работает",
    marketEyebrow: "Рынок",
    marketTitle: "Один портфель. Широкий межотраслевой рынок.",
    marketLead: "Возможность не привязана к одной нише. Любому бизнесу нужно работать, привлекать клиентов, общаться, поддерживать цифровое присутствие и улучшать процессы.",
    market: [
      { title: "Операции", body: "Коммуникации, работа со знаниями, координация и запросы клиентов создают постоянную операционную нагрузку." },
      { title: "Маркетинг", body: "Каждому бизнесу нужны видимость, контент, кампании, коммуникация с клиентами и воспроизводимый процесс роста." },
      { title: "Цифровая среда", body: "Растущим компаниям нужны сайты, кабинеты, приложения, интеграции и собственные цифровые системы." },
      { title: "Автоматизация", body: "По мере усложнения процессов растёт спрос на AI, автоматизацию и системы, уменьшающие ручную работу." },
    ],
    marketCore: "Ваш рынок — не один продукт. Ваш рынок — это бизнесы, до которых вы можете дойти.",
    productEyebrow: "Портфель продуктов",
    productTitle: "Четыре направления создания ценности для клиента.",
    productLead: "Партнёр сопоставляет бизнес-задачу клиента с подходящим решением AI MARK, а не продаёт один продукт одной нише.",
    products: [
      { name: "AI Marketing Employee", type: "RECURRING / AI-ПРОДУКТ", body: "AI-native маркетинг: исследование, стратегия, контент, креативы, апрув, публикация и оптимизация.", revenue: "Подписочная модель", variant: "aime", href: PRODUCT_PATHS.aime },
      { name: "AI Business Assistant", type: "RECURRING / AI-ПРОДУКТ", body: "Продажный и клиентский inbox с базой знаний, квалификацией запросов и handoff человеку.", revenue: "Подписочная модель", variant: "assistant", href: PRODUCT_PATHS.assistant },
      { name: "SHOWROOM AI — AI-продавец", type: "RECURRING / AI-ПРОДУКТ", body: "AI-продавец для диалогов с клиентами, подбора по каталогу, правил цен, спецификаций и коммерческих предложений в разных отраслях.", revenue: "Подписочная модель", variant: "showroom", href: PRODUCT_PATHS.showroom },
      { name: "Digital Production & AI Engineering", type: "PROJECT / B2B-СЕРВИС", body: "Сайты, кабинеты, приложения, интеграции, автоматизация и custom AI-системы для бизнеса.", revenue: "Проектная модель", variant: "saas" },
    ],
    productCta: "О продукте",
    productionCta: "Цифровое производство",
    howEyebrow: "Как это работает",
    modelTitle: "Вы продаёте. AI MARK поставляет.",
    modelLead: "Партнёр работает на стороне рынка. AI MARK отвечает за согласованный продукт, технологию и исполнение.",
    steps: [
      { n: "01", title: "Находите бизнес", body: "Используете свои связи, знание локального рынка или существующую клиентскую базу." },
      { n: "02", title: "Находите задачу", body: "Подбираете продукт или сервис AI MARK под потребность компании." },
      { n: "03", title: "Представляете AI MARK", body: "Используете referral-ссылку, живую страницу продукта или прямое знакомство. Отдельного sandbox и слайд-дека нет." },
      { n: "04", title: "Закрываете продажу", body: "Клиент становится клиентом AI MARK через отслеживаемый канал партнёра." },
      { n: "05", title: "AI MARK выполняет", body: "Подключение, внедрение и исполнение согласованного продукта остаются на стороне AI MARK." },
      { n: "06", title: "Развиваете рынок", body: "Повторяете процесс, увеличиваете клиентскую базу и строите квалифицированную партнёрскую сеть." },
    ],
    networkEyebrow: "Партнёрская сеть",
    networkTitle: "Сначала личные продажи. Затем продажи сети.",
    networkLead: "Сеть строится вокруг оплаченных клиентских продаж, а не регистрации людей. Пять уровней делят сумму, которую клиент фактически заплатил. 80% — это совокупный партнёрский пул по квалифицированным уровням, а не выплата одному партнёру.",
    poolHeadline: "До 80% партнёрского вознаграждения. L1 50% за прямую продажу.",
    poolLead: "L1 — 50% комиссионной базы. Остальные уровни делят 30%. Вместе это пул сети 80%. Доля AI Mark — 20%.",
    exampleTitle: "Комиссионная продажа на $1000 при полной сети",
    exampleRows: [
      { label: "L1 прямой партнёр", value: "$500", accent: true },
      { label: "L2", value: "$150" },
      { label: "L3", value: "$70" },
      { label: "L4", value: "$50" },
      { label: "L5", value: "$30" },
      { label: "Партнёрский пул (совокупно)", value: "$800" },
      { label: "Доля AI Mark", value: "$200" },
    ],
    exampleFoot: "Прямой партнёр получает $500, не $800. 80% — это итог L1–L5, когда каждый уровень квалифицирован.",
    levels: [
      { n: "L1", title: "Прямая продажа", body: "Клиент, которого вы привели лично.", rate: "50%" },
      { n: "L2", title: "Первый уровень сети", body: "Оплаченные продажи партнёров первого уровня.", rate: "15%" },
      { n: "L3", title: "Расширенная сеть", body: "Оплаченные продажи ещё на уровень глубже.", rate: "7%" },
      { n: "L4", title: "Глубина рынка", body: "Сеть за пределами прямых связей.", rate: "5%" },
      { n: "L5", title: "Максимальная глубина", body: "Самый глубокий уровень стандартной сетки.", rate: "3%" },
    ],
    commissionLabel: "Комиссия",
    commissionNote: "L1 50% / L2 15% / L3 7% / L4 5% / L5 3% от полученной суммы. Совокупный пул сети 80%.",
    statusEyebrow: "Статус партнёра",
    statusTitle: "Четыре способа расти вместе с AI MARK.",
    statusLead: "Статус определяется коммерческой активностью и форматом отношений с компанией. Это бизнес-статус, а не платный ранг.",
    statuses: [
      { tag: "START", title: "Partner", body: "Продавайте продукты AI MARK, используйте referral-ссылку, материалы и начинайте строить клиентскую базу." },
      { tag: "ACTIVE SALES", title: "Growth Partner", body: "Активный продавец с растущим портфелем клиентов и развивающейся партнёрской сетью." },
      { tag: "MARKET", title: "Regional Partner", body: "Развивайте страну или регион через локальные связи, продажи и координацию рыночного роста." },
      { tag: "ENTERPRISE", title: "Strategic Partner", body: "Агентства, дистрибьюторы и крупные B2B-каналы. Country Partner и Strategic Partner — отдельное соглашение, вне партнёрской сетки." },
    ],
    statusNote: "Статус по результату",
    kitEyebrow: "Партнёрская инфраструктура",
    kitTitle: "Что партнёру доступно сейчас.",
    kitLead: "Referral-ссылка, Partner Dashboard, живые страницы продуктов, файлы бренда с сайта и публичные каналы поддержки. Нет партнёрского sandbox, PDF или PPT, кампанийных креативов, запроса выплаты из кабинета, автоматической блокировки комиссии, экрана reversal, тикетов и учебного курса. Чат, Telegram, WhatsApp и email не являются tracked lead.",
    kit: [
      "Персональная referral-ссылка и Partner ID",
      "Partner Dashboard: свои продажи, комиссии и записанные выплаты",
      "Живые страницы продуктов по вашей referral-ссылке",
      "Файлы бренда, которые уже опубликованы на сайте",
      "Атрибуция лида через форму, регистрацию и /pay",
      "Факты о продуктах с публичных страниц — в Partner Hub",
      "Публичная поддержка: Telegram, WhatsApp, Messenger и email",
    ],
    globalEyebrow: "Глобальное расширение",
    globalTitle: "Вы выбираете рынок. AI MARK даёт технологию.",
    globalLead: "Один и тот же портфель можно продвигать разными партнёрами в разных странах и отраслях. Ваш рынок определяется охватом и специализацией.",
    global: ["Страновые и региональные бизнес-сети", "Отраслевые sales-партнёры", "Агентства и консультанты", "Независимые B2B-продавцы", "Локальные AI и digital transformation консультанты"],
    faqEyebrow: "Вопросы",
    faqTitle: "Прямые ответы до подключения.",
    faq: [
      { q: "Нужно ли покупать пакет для статуса партнёра?", a: "Программа строится вокруг продаж продуктов и услуг AI MARK, а не покупки позиции в сети. Финальные правила подключения фиксируются в Partner Agreement." },
      { q: "Нужно ли самому выполнять работу?", a: "Нет. Партнёр в основном строит отношения и продажи. AI MARK отвечает за согласованный продукт и исполнение." },
      { q: "Можно ли строить команду?", a: "Да. Стандартная модель поддерживает многоуровневую партнёрскую сеть, связанную с продажами клиентам, с максимальной глубиной пять уровней." },
      { q: "Могут ли подписки давать повторяющуюся комиссию?", a: "Каждый квалифицированный платёж считается по правилу дня оплаты. Окно launch 90 дней — только статусный флаг и не умножает ставки. Повторяющиеся платежи идут по той же сетке L1 50% / L2 15% / L3 7% / L4 5% / L5 3%, с совокупным пулом 80% по квалифицированным уровням." },
      { q: "Можно ли стать Regional Partner?", a: "Да. Такой статус предназначен для партнёров, которые демонстрируют устойчивую коммерческую активность и способны системно развивать локальный рынок." },
    ],
    ctaEyebrow: "Старт",
    ctaTitle: "Ваш рынок. Наша AI-инфраструктура.",
    ctaLead: "Подключайтесь как партнёр, выбирайте понятный вам рынок и начинайте с тех компаний, до которых вы реально можете дойти.",
    ctaButton: "Стать партнёром AI MARK",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = pageCopy[locale];
  const copy = getCopy(locale);
  const metaTitle = t?.metaTitle ?? copy.partners.title;
  const metaDescription = t?.metaDescription ?? copy.partners.lead;

  const langAlternates: Record<string, string> = {};
  for (const loc of site.locales) {
    langAlternates[loc] = absoluteUrl(loc, "/partners");
  }

  return {
    title: { absolute: metaTitle },
    description: metaDescription,
    alternates: {
      canonical: absoluteUrl(locale, "/partners"),
      languages: langAlternates,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      siteName: site.name,
      url: absoluteUrl(locale, "/partners"),
      type: "article",
      // Spread the locale link-preview artwork: a nested `openGraph` object
      // replaces the one inherited from the `[locale]` segment.
      images: socialImages(locale),
    },
  };
}

const reveal = (ms: number): CSSProperties => ({ "--reveal-delay": ms + "ms" } as CSSProperties);

export default async function PartnersPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dedicated = pageCopy[locale];
  if (!dedicated) {
    return <LocaleProgram locale={locale} />;
  }
  const t = dedicated;
  const terms = partnerProgramTerms[locale];
  const published = getCopy(locale);
  const publishedPrices = [
    published.products.items.aime.price,
    published.products.items.assistant.price,
    published.products.items.showroom.price,
    published.commercial.tiers[3]?.price ?? "",
  ];

  return (
    <article>
      <section className="relative overflow-hidden border-b border-line">
        <div className="ambient-drift pointer-events-none absolute -right-20 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(198,214,139,0.12),transparent_68%)]" />
        <div className="ambient-drift-slow pointer-events-none absolute -bottom-40 left-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(217,191,140,0.09),transparent_68%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-24">
          <div data-reveal>
            <BackButton locale={locale} className="mb-6" />
            <p className="font-mono text-[11px] font-semibold tracking-[0.22em] text-mark uppercase">{t.eyebrow}</p>
            <h1 className="mt-4 max-w-2xl font-editorial text-4xl leading-[1.02] tracking-tight text-paper sm:text-5xl lg:text-6xl">{t.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{t.lead}</p>
            <p className="mt-4 max-w-xl font-display text-lg font-semibold leading-snug text-paper sm:text-xl">{t.poolHeadline}</p>
            <ol className="mt-5 flex flex-wrap items-center gap-2">
              {(locale === "ru"
                ? ["Личная продажа", "Продажи команды", "До 5 уровней", "До 80%"]
                : ["Personal sale", "Team sales", "Up to 5 levels", "Up to 80%"]
              ).map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  {i > 0 ? <span className="font-mono text-xs text-warm">→</span> : null}
                  <span className="rounded-full border border-line bg-ink-2 px-3 py-1.5 text-sm text-paper">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={PARTNER_SIGNUP_HREF} className="inline-flex items-center gap-1.5 rounded-full bg-mark px-5 py-3 text-sm font-semibold text-mark-ink shadow transition-all hover:bg-mark-light">
                {t.primary}
                <span className="btn-arrow" aria-hidden>→</span>
              </Link>
              <a href="#how-it-works" className="inline-flex rounded-full border border-line bg-ink-2 px-5 py-3 text-sm font-semibold text-paper transition hover:border-line-strong">{t.secondary}</a>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {t.note.split(" · ").map((item) => <span key={item} className="font-mono text-[10px] tracking-wide text-muted">{item}</span>)}
            </div>
          </div>
          <div data-reveal style={reveal(120)} className="space-y-4">
            <PartnerNetworkHeroVisual locale={locale} />
            <div data-motion className="rounded-[24px] border border-line bg-ink-2 p-4">
              <LevelRings />
            </div>
          </div>
        </div>
      </section>

      <section id="market" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div data-reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.marketEyebrow}</p>
            <h2 className="mt-3 max-w-4xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl lg:text-5xl">{t.marketTitle}</h2>
            <p className="mt-4 max-w-3xl text-muted">{t.marketLead}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.market.map((item, i) => (
              <article key={item.title} data-reveal style={reveal(i * 80)} className="rounded-2xl border border-line bg-ink-2 p-6 transition hover:-translate-y-1 hover:border-line-strong hover:shadow-md">
                <div className="flex items-center justify-between"><span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-warm">0{i + 1}</span><span className="h-1.5 w-1.5 rounded-full bg-mark" /></div>
                <h3 className="mt-5 font-display text-base font-semibold text-paper">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-mark/30 bg-mark/5 p-6 sm:p-8">
            <p className="font-editorial text-2xl leading-snug text-paper sm:text-3xl">{t.marketCore}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div data-reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.productEyebrow}</p>
            <h2 className="mt-3 max-w-4xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">{t.productTitle}</h2>
            <p className="mt-4 max-w-3xl text-muted">{t.productLead}</p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {t.products.map((product, i) => (
              <article key={product.name} data-reveal style={reveal(i * 90)} className="overflow-hidden rounded-2xl border border-line bg-ink-2 p-6 sm:p-7">
                <div>
                  <div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-warm uppercase">{product.type}</span><span className="h-1.5 w-1.5 rounded-full bg-mark" /></div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-paper">{product.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{product.body}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-4">
                    <span className="font-mono text-[10px] font-semibold tracking-wider text-mark uppercase">{publishedPrices[i] || product.revenue}</span>
                    {product.href ? <Link href={localePath(locale, product.href)} className="rounded-full bg-mark px-4 py-2 text-xs font-semibold text-mark-ink transition hover:bg-mark-light">{t.productCta} →</Link> : <Link href={digitalProductionPath(locale)} className="rounded-full bg-mark px-4 py-2 text-xs font-semibold text-mark-ink transition hover:bg-mark-light">{t.productionCta} →</Link>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 border-b border-line bg-ink-2/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div data-reveal><p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.howEyebrow}</p><h2 className="mt-3 max-w-3xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl lg:text-5xl">{t.modelTitle}</h2><p className="mt-4 max-w-2xl text-muted">{t.modelLead}</p></div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {t.steps.map((step) => <article key={step.n} className="bg-ink p-6 sm:p-7" data-reveal><span className="font-mono text-xs font-semibold text-warm">{step.n}</span><h3 className="mt-3 font-display text-base font-semibold text-paper">{step.title}</h3><p className="mt-2 text-xs leading-relaxed text-muted">{step.body}</p></article>)}
          </div>
        </div>
      </section>

      <section id="network" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div data-reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.networkEyebrow}</p>
            <h2 className="mt-3 max-w-3xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">{t.networkTitle}</h2>
            <p className="mt-4 max-w-3xl text-muted">{t.networkLead}</p>
            <p className="mt-4 max-w-3xl font-display text-lg font-semibold text-paper">{t.poolHeadline}</p>
            <p className="mt-2 max-w-3xl text-sm text-muted">{t.poolLead}</p>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-ink-2">
            <div className="grid md:grid-cols-5">
              {t.levels.map((level, i) => (
                <div
                  key={level.n}
                  className={`border-b border-line p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 sm:p-6 ${i === 0 ? "bg-mark/10 md:border-r-mark/40" : ""}`}
                  data-reveal
                  style={reveal(i * 70)}
                >
                  <span className={`font-mono text-[11px] font-semibold tracking-[0.18em] ${i === 0 ? "text-mark" : "text-warm"}`}>{level.n}</span>
                  <p className={`mt-3 font-editorial ${i === 0 ? "text-4xl text-mark" : "text-2xl text-paper"}`}>{level.rate}</p>
                  <h3 className="mt-3 font-display text-sm font-semibold text-paper">{level.title}</h3>
                  <p className="mt-2 text-[11px] leading-relaxed text-muted">{level.body}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-line bg-ink-3/30 px-6 py-5">
              <p className="font-mono text-[10px] tracking-wider text-muted uppercase">{t.commissionLabel}</p>
              <p className="mt-2 text-xs leading-relaxed text-paper/80">{t.commissionNote}</p>
              <p className="mt-4 font-display text-sm font-semibold text-paper">{t.exampleTitle}</p>
              <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                {t.exampleRows.map((row) => (
                  <div key={row.label} className={`flex items-baseline justify-between gap-3 rounded-lg border px-3 py-2 ${row.accent ? "border-mark/40 bg-mark/10" : "border-line bg-ink-2"}`}>
                    <dt className="text-[11px] text-muted">{row.label}</dt>
                    <dd className={`font-mono text-sm ${row.accent ? "text-mark" : "text-paper"}`}>{row.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs leading-relaxed text-paper/80">{t.exampleFoot}</p>
              <details className="mt-3">
                <summary className="cursor-pointer list-none text-sm font-semibold text-mark">
                  {locale === "ru" ? "Условия сети" : "Network terms"}
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-muted">{terms.note}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{terms.launch}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{terms.example}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{terms.lock}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{terms.payout}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{terms.country}</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink-2/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div data-reveal><p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.statusEyebrow}</p><h2 className="mt-3 max-w-3xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">{t.statusTitle}</h2><p className="mt-4 max-w-3xl text-muted">{t.statusLead}</p></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {t.statuses.map((status, i) => <article key={status.title} data-reveal style={reveal(i * 90)} className="flex flex-col rounded-2xl border border-line bg-ink-2 p-5"><span className="inline-flex self-start rounded-full border border-line bg-ink-3 px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.14em] text-warm">{status.tag}</span><h3 className="mt-5 font-display text-lg font-semibold text-paper">{status.title}</h3><p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{status.body}</p><div className="mt-5 border-t border-line pt-4 font-mono text-[10px] text-mark">{t.statusNote}</div></article>)}
          </div>
        </div>
      </section>

      <details className="border-b border-line">
        <summary className="mx-auto max-w-6xl cursor-pointer list-none px-4 py-4 text-sm font-semibold sm:px-6">
          {locale === "ru" ? "Инфраструктура и рынки" : "Infrastructure and markets"}
        </summary>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div data-reveal><p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.kitEyebrow}</p><h2 className="mt-3 font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">{t.kitTitle}</h2><p className="mt-4 text-muted">{t.kitLead}</p></div>
          <div className="grid gap-3 sm:grid-cols-2" data-reveal style={reveal(120)}>{t.kit.map((item, i) => <div key={item} className="flex items-start gap-3 rounded-xl border border-line bg-ink-2 p-4"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mark text-[10px] font-bold text-mark-ink">{i + 1}</span><span className="text-xs leading-relaxed text-paper/90">{item}</span></div>)}</div>
        </div>
      </section>

      <section className="border-b border-line bg-ink-2/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div data-reveal><p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.globalEyebrow}</p><h2 className="mt-3 max-w-4xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl lg:text-5xl">{t.globalTitle}</h2><p className="mt-4 max-w-3xl text-muted">{t.globalLead}</p></div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2" data-reveal style={reveal(120)}>{t.global.map((item, i) => <div key={item} className="flex items-start gap-3 rounded-xl border border-line bg-ink-2 p-4"><span className="mt-0.5 font-mono text-[10px] font-semibold text-warm">0{i + 1}</span><span className="text-xs leading-relaxed text-paper/90">{item}</span></div>)}</div>
        </div>
      </section>

      </details>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div data-reveal><p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.faqEyebrow}</p><h2 className="mt-3 max-w-3xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">{t.faqTitle}</h2></div>
          <div className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-ink-2">{t.faq.map((item) => <details key={item.q} className="group px-5 py-5 sm:px-7"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-display text-sm font-semibold text-paper"><span>{item.q}</span><span className="font-mono text-lg text-mark transition group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-3 text-xs leading-relaxed text-muted">{item.a}</p></details>)}</div>
        </div>
      </section>

      <details className="border-b border-line">
        <summary className="mx-auto max-w-6xl cursor-pointer list-none px-4 py-4 text-sm font-semibold sm:px-6">
          {locale === "ru" ? "Оставить контакты" : "Leave your contacts"}
        </summary>
        <LeadInquiry contact={published.contact} locale={locale} />
      </details>

      <section className="border-b border-line"><div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28" data-reveal><p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.ctaEyebrow}</p><h2 className="mt-3 font-editorial text-4xl leading-tight tracking-tight text-paper sm:text-5xl lg:text-6xl">{t.ctaTitle}</h2><p className="mx-auto mt-5 max-w-2xl text-muted">{t.ctaLead}</p><p className="mx-auto mt-3 max-w-xl text-xs text-muted">{terms.join}</p><Link href={PARTNER_SIGNUP_HREF} className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-mark px-6 py-3 text-sm font-semibold text-mark-ink shadow transition-all hover:bg-mark-light">{t.ctaButton}<span className="btn-arrow" aria-hidden>→</span></Link></div></section>
    </article>
  );
}
