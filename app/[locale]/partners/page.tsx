import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadInquiry } from "@/components/LeadInquiry";
import { LocaleProgram } from "@/components/partners/LocaleProgram";
import { PartnerNetworkHeroVisual } from "@/components/PartnerNetworkHeroVisual";
import { getCopy } from "@/content/copy";
import { PARTNER_SIGNUP_HREF } from "@/lib/auth/redirects";
import { ProductUI, type ProductVariant } from "@/components/ui/ProductUI";
import { PRODUCT_PATHS, productsHubPath } from "@/lib/products";
import { partnerProgramTerms } from "@/content/partner-program";
import { absoluteUrl, isLocale, localePath, site, type Locale } from "@/lib/site";
import { socialImages } from "@/lib/social";

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
  levels: { n: string; title: string; body: string }[];
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
    note: "Free to join · No inventory · No mandatory purchases · Global market",
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
      { name: "Showroom AI", type: "RECURRING / AI PRODUCT", body: "A configurable engine for catalogues, pricing rules, specifications and commercial proposals across industries.", revenue: "Subscription opportunity", variant: "showroom", href: PRODUCT_PATHS.showroom },
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
      { n: "03", title: "Introduce AI MARK", body: "Use a referral link, demo, presentation or direct introduction." },
      { n: "04", title: "Close the sale", body: "The customer becomes an AI MARK customer through the tracked partner channel." },
      { n: "05", title: "AI MARK delivers", body: "Setup, implementation and service execution stay on the AI MARK side." },
      { n: "06", title: "Build your market", body: "Repeat, grow your customer base and develop an eligible partner network." },
    ],
    networkEyebrow: "Partner network",
    networkTitle: "Personal sales first. Network sales next.",
    networkLead: "The network is built around paid customer sales, not registrations. Five levels share the amount the customer actually paid.",
    levels: [
      { n: "L1", title: "Direct sale", body: "The customer you personally introduce. Base rate 15%." },
      { n: "L2", title: "First network", body: "Paid customer sales from your first-level partners. Base rate 5%." },
      { n: "L3", title: "Extended network", body: "Paid sales one level deeper. Base rate 3%." },
      { n: "L4", title: "Market depth", body: "The network beyond direct relationships. Base rate 2%." },
      { n: "L5", title: "Maximum depth", body: "The deepest level of the standard schedule. Base rate 1%." },
    ],
    commissionLabel: "Commission",
    commissionNote: "Base 15 / 5 / 3 / 2 / 1 on the amount collected. A $1,000 paid sale pays the direct partner $150.",
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
    kitTitle: "Everything you need to sell — without building the sales machine from scratch.",
    kitLead: "Spend time on customers and relationships, not on recreating product presentations, tracking and sales infrastructure.",
    kit: [
      "Personal referral link and Partner ID",
      "Product demos and presentations",
      "Ready-made marketing creatives",
      "Lead and attribution tracking",
      "Commission and payout tracking",
      "Product knowledge and sales resources",
      "Partner Dashboard",
      "AI MARK onboarding and support",
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
      { q: "Can subscriptions create recurring commissions?", a: "Each qualifying payment follows the rule in force on the day it is paid. Payments in the first 90 days after the partner joins use the 1.5× launch rates. Later payments use the base rates. The launch boost is not lifetime." },
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
    note: "Бесплатный вход · Без склада · Без обязательных закупок · Международный рынок",
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
      { name: "Showroom AI", type: "RECURRING / AI-ПРОДУКТ", body: "Расчётный движок для каталогов, правил цен, спецификаций и коммерческих предложений в разных отраслях.", revenue: "Подписочная модель", variant: "showroom", href: PRODUCT_PATHS.showroom },
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
      { n: "03", title: "Представляете AI MARK", body: "Используете referral-ссылку, демо, презентацию или прямое знакомство." },
      { n: "04", title: "Закрываете продажу", body: "Клиент становится клиентом AI MARK через отслеживаемый канал партнёра." },
      { n: "05", title: "AI MARK выполняет", body: "Подключение, внедрение и исполнение согласованного продукта остаются на стороне AI MARK." },
      { n: "06", title: "Развиваете рынок", body: "Повторяете процесс, увеличиваете клиентскую базу и строите квалифицированную партнёрскую сеть." },
    ],
    networkEyebrow: "Партнёрская сеть",
    networkTitle: "Сначала личные продажи. Затем продажи сети.",
    networkLead: "Сеть строится вокруг оплаченных клиентских продаж, а не регистрации людей. Пять уровней делят сумму, которую клиент фактически заплатил.",
    levels: [
      { n: "L1", title: "Прямая продажа", body: "Клиент, которого вы привели лично. Базовая ставка 15%." },
      { n: "L2", title: "Первый уровень сети", body: "Оплаченные продажи партнёров первого уровня. Базовая ставка 5%." },
      { n: "L3", title: "Расширенная сеть", body: "Оплаченные продажи ещё на уровень глубже. Базовая ставка 3%." },
      { n: "L4", title: "Глубина рынка", body: "Сеть за пределами прямых связей. Базовая ставка 2%." },
      { n: "L5", title: "Максимальная глубина", body: "Самый глубокий уровень стандартной сетки. Базовая ставка 1%." },
    ],
    commissionLabel: "Комиссия",
    commissionNote: "База 15 / 5 / 3 / 2 / 1 от полученной суммы. Оплаченная продажа на $1000 даёт прямому партнёру $150.",
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
    kitTitle: "Всё необходимое для продаж — без строительства sales-машины с нуля.",
    kitLead: "Партнёр тратит время на клиентов и отношения, а не на создание презентаций, трекинга и sales-инфраструктуры с нуля.",
    kit: [
      "Персональная referral-ссылка и Partner ID",
      "Демо и презентации продуктов",
      "Готовые рекламные материалы",
      "Трекинг лидов и атрибуции",
      "Трекинг комиссий и выплат",
      "База знаний по продуктам",
      "Partner Dashboard",
      "Поддержка и онбординг AI MARK",
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
      { q: "Могут ли подписки давать повторяющуюся комиссию?", a: "Каждый квалифицированный платёж считается по правилу дня оплаты. Платежи в первые 90 дней после подключения идут по launch-ставкам 1,5×. Более поздние — по базовым. Launch не пожизненный." },
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
            <p className="font-mono text-[11px] font-semibold tracking-[0.22em] text-mark uppercase">{t.eyebrow}</p>
            <h1 className="mt-4 max-w-2xl font-editorial text-4xl leading-[1.02] tracking-tight text-paper sm:text-5xl lg:text-6xl">{t.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{t.lead}</p>
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
          <div data-reveal style={reveal(120)}><PartnerNetworkHeroVisual locale={locale} /></div>
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
              <article key={product.name} data-reveal style={reveal(i * 90)} className="catalog-card peek-host group overflow-hidden rounded-2xl border border-line bg-ink-2 transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-xl">
                <div className="p-4 sm:p-5"><div className="overflow-hidden rounded-xl border border-line bg-ink-3/30"><ProductUI variant={product.variant} ratio="aspect-[16/8.8]" peek /></div></div>
                <div className="border-t border-line p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-warm uppercase">{product.type}</span><span className="h-1.5 w-1.5 rounded-full bg-mark" /></div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-paper">{product.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{product.body}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-4">
                    <span className="font-mono text-[10px] font-semibold tracking-wider text-mark uppercase">{publishedPrices[i] || product.revenue}</span>
                    {product.href ? <Link href={localePath(locale, product.href)} className="rounded-full bg-mark px-4 py-2 text-xs font-semibold text-mark-ink transition hover:bg-mark-light">{t.productCta} →</Link> : <Link href={productsHubPath(locale)} className="rounded-full bg-mark px-4 py-2 text-xs font-semibold text-mark-ink transition hover:bg-mark-light">{t.productionCta} →</Link>}
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
          <div data-reveal><p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.networkEyebrow}</p><h2 className="mt-3 max-w-3xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">{t.networkTitle}</h2><p className="mt-4 max-w-3xl text-muted">{t.networkLead}</p></div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-ink-2">
            <div className="grid md:grid-cols-5">
              {t.levels.map((level, i) => <div key={level.n} className="border-b border-line p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 sm:p-6" data-reveal style={reveal(i * 70)}><span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-warm">{level.n}</span><h3 className="mt-3 font-display text-sm font-semibold text-paper">{level.title}</h3><p className="mt-2 text-[11px] leading-relaxed text-muted">{level.body}</p></div>)}
            </div>
            <div className="border-t border-line bg-ink-3/30 px-6 py-5">
              <p className="font-mono text-[10px] tracking-wider text-muted uppercase">{t.commissionLabel}</p>
              <p className="mt-2 text-xs leading-relaxed text-paper/80">{terms.note}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">{terms.launch}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">{terms.example}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">{terms.lock}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">{terms.payout}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">{terms.country}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink-2/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div data-reveal><p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.statusEyebrow}</p><h2 className="mt-3 max-w-3xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">{t.statusTitle}</h2><p className="mt-4 max-w-3xl text-muted">{t.statusLead}</p></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {t.statuses.map((status, i) => <article key={status.title} data-reveal style={reveal(i * 90)} className="flex min-h-[250px] flex-col rounded-2xl border border-line bg-ink-2 p-6 transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-md"><span className="inline-flex self-start rounded-full border border-line bg-ink-3 px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.14em] text-warm">{status.tag}</span><h3 className="mt-5 font-display text-lg font-semibold text-paper">{status.title}</h3><p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{status.body}</p><div className="mt-5 border-t border-line pt-4 font-mono text-[10px] text-mark">{t.statusNote}</div></article>)}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div data-reveal><p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.kitEyebrow}</p><h2 className="mt-3 font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">{t.kitTitle}</h2><p className="mt-4 text-muted">{t.kitLead}</p></div>
          <div className="grid gap-3 sm:grid-cols-2" data-reveal style={reveal(120)}>{t.kit.map((item, i) => <div key={item} className="flex items-start gap-3 rounded-xl border border-line bg-ink-2 p-4"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mark text-[10px] font-bold text-mark-ink">{i + 1}</span><span className="text-xs leading-relaxed text-paper/90">{item}</span></div>)}</div>
        </div>
      </section>

      <section className="border-b border-line bg-ink-2/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div data-reveal><p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.globalEyebrow}</p><h2 className="mt-3 max-w-4xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl lg:text-5xl">{t.globalTitle}</h2><p className="mt-4 max-w-3xl text-muted">{t.globalLead}</p></div>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-line bg-ink-2" data-reveal><div aria-hidden className="grid-field absolute inset-0 opacity-60" /><div className="relative flex min-h-[360px] items-center justify-center p-8"><div className="relative h-64 w-full max-w-xl"><div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-mark/50 bg-ink/90 px-5 py-4 text-center shadow-xl backdrop-blur"><span className="font-mono text-[9px] tracking-[0.18em] text-warm">AI MARK</span><span className="mt-1 block font-display text-sm font-semibold text-paper">Global Partner Core</span><span className="mt-1 block text-[9px] text-muted">Countries · Verticals · Sales Channels</span></div>{["9% 30%","23% 68%","43% 18%","54% 51%","72% 27%","82% 67%","92% 43%"].map((p, i) => <span key={i} className="absolute h-2.5 w-2.5 rounded-full bg-mark shadow-[0_0_0_5px_rgba(198,214,139,0.08)]" style={{ left: p.split(" ")[0], top: p.split(" ")[1] }} />)}</div></div></div>
            <div className="space-y-3" data-reveal style={reveal(120)}>{t.global.map((item, i) => <div key={item} className="flex items-start gap-3 rounded-xl border border-line bg-ink-2 p-4"><span className="mt-0.5 font-mono text-[10px] font-semibold text-warm">0{i + 1}</span><span className="text-xs leading-relaxed text-paper/90">{item}</span></div>)}</div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div data-reveal><p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.faqEyebrow}</p><h2 className="mt-3 max-w-3xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">{t.faqTitle}</h2></div>
          <div className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-ink-2">{t.faq.map((item) => <details key={item.q} className="group px-5 py-5 sm:px-7"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-display text-sm font-semibold text-paper"><span>{item.q}</span><span className="font-mono text-lg text-mark transition group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-3 text-xs leading-relaxed text-muted">{item.a}</p></details>)}</div>
        </div>
      </section>

      <LeadInquiry contact={published.contact} />

      <section className="border-b border-line"><div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28" data-reveal><p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.ctaEyebrow}</p><h2 className="mt-3 font-editorial text-4xl leading-tight tracking-tight text-paper sm:text-5xl lg:text-6xl">{t.ctaTitle}</h2><p className="mx-auto mt-5 max-w-2xl text-muted">{t.ctaLead}</p><p className="mx-auto mt-3 max-w-xl text-xs text-muted">{terms.join}</p><Link href={PARTNER_SIGNUP_HREF} className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-mark px-6 py-3 text-sm font-semibold text-mark-ink shadow transition-all hover:bg-mark-light">{t.ctaButton}<span className="btn-arrow" aria-hidden>→</span></Link></div></section>
    </article>
  );
}
