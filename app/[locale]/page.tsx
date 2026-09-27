import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/ContactCta";
import { LeadInquiry } from "@/components/LeadInquiry";
import { Section } from "@/components/Section";
import { HeroSystem } from "@/components/HeroSystem";
import { CapabilityBand } from "@/components/CapabilityBand";
import { getCopy } from "@/content/copy";
import { absoluteUrl, getSiteTagline, isLocale, navHref, site, type Locale } from "@/lib/site";
import { productPagePath } from "@/lib/products";
import { ProductUI, type ProductVariant } from "@/components/ui/ProductUI";
import { DigitalProductionHubCard } from "@/components/DigitalProductionHubCard";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = getCopy(locale);
  const url = absoluteUrl(locale);

  const tagline = getSiteTagline(locale);
  const pageTitle = `${site.name} — ${tagline}`;

  const langAlternates: Record<string, string> = {
    "x-default": site.url,
  };
  for (const loc of site.locales) {
    langAlternates[loc] = absoluteUrl(loc);
  }

  return {
    title: { absolute: pageTitle },
    description: t.meta.description,
    keywords: t.meta.keywords,
    alternates: {
      canonical: url,
      languages: langAlternates,
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: pageTitle,
      description: t.meta.description,
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: t.meta.description,
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getCopy(locale);
  const isRu = locale === "ru";

  const hubModules = isRu
    ? [
        {
          num: "01",
          tag: "Сквозной процесс",
          title: "Как идея становится бизнесом",
          desc: "8 этапов трансформации: валидация спроса, юнит-экономика, разработка продукта, внедрение AI-агентов и масштабирование.",
          badge: "Интерактивный контур",
          cta: "Открыть контур 01–08",
          href: "/how-it-works",
          accent: "var(--mark)",
        },
        {
          num: "02",
          tag: "Готовые решения",
          title: "Каталог AI-продуктов",
          desc: "SHOWROOM AI (AI-продавец по каталогам), AI Business Assistant (поддержка 24/7) и AIME (автономный AI-маркетолог).",
          badge: "3 продукта · SaaS",
          cta: "Смотреть продукты",
          href: "/products",
          accent: "var(--warm)",
        },
        {
          num: "03",
          tag: "Тарифы и условия",
          title: "Форматы работы и цены",
          desc: "Ретейнеры AI-маркетингового отдела от $1,200/мес, продуктовые подписки от $149/мес и заказной цифровой продакшн.",
          badge: "Прозрачные тарифы",
          cta: "Все тарифы и условия",
          href: "/pricing",
          accent: "var(--mark-light)",
        },
        {
          num: "04",
          tag: "Партнёрство",
          title: "Международная партнёрская сеть",
          desc: "5 уровней партнёрской сети: региональные представители, отраслевые интеграторы, агентства и прямые комиссии с оплат.",
          badge: "До 5 уровней дохода",
          cta: "Партнёрская программа",
          href: "/partners",
          accent: "var(--mark)",
        },
        {
          num: "05",
          tag: "Венчурный капитал",
          title: "Инвестиционное предложение",
          desc: "Привлечение капитала в масштабирование готовой технологической базы: диверсифицированная выручка и глобальная сеть.",
          badge: "Seed-раунд",
          cta: "Инвестиционный меморандум",
          href: "/investors",
          accent: "var(--warm)",
        },
      ]
    : [
        {
          num: "01",
          tag: "End-to-End System",
          title: "How an Idea Becomes a Business",
          desc: "8 stages of venture building: market validation, unit economics, digital production, AI automation, and distribution scale.",
          badge: "Interactive System",
          cta: "Explore the 8 Stages",
          href: "/how-it-works",
          accent: "var(--mark)",
        },
        {
          num: "02",
          tag: "Ready Software",
          title: "Proprietary AI Products",
          desc: "SHOWROOM AI (AI Sales Agent for catalogs), AI Business Assistant (24/7 webchat), and AIME (AI Marketing Employee).",
          badge: "3 Core Products",
          cta: "Explore Products",
          href: "/products",
          accent: "var(--warm)",
        },
        {
          num: "03",
          tag: "Commercial Model",
          title: "Pricing & Engagement Formats",
          desc: "Marketing department retainers from $1,200/mo, SaaS subscriptions from $149/mo, and turnkey venture production.",
          badge: "Transparent Tiers",
          cta: "View All Pricing",
          href: "/pricing",
          accent: "var(--mark-light)",
        },
        {
          num: "04",
          tag: "Distribution",
          title: "Global Partner Network",
          desc: "5 tiers of distribution: territorial representatives, vertical integrators, marketing agencies, and direct commissions.",
          badge: "Up to 5 Levels",
          cta: "Partner Program",
          href: "/partners",
          accent: "var(--mark)",
        },
        {
          num: "05",
          tag: "Venture Capital",
          title: "Investor Proposal",
          desc: "Growth capital for scaling proven commercial AI infrastructure: multi-stream revenues and international expansion.",
          badge: "Seed Round",
          cta: "Investment Proposal",
          href: "/investors",
          accent: "var(--warm)",
        },
      ];

  const featuredProducts = [
    {
      id: "showroom",
      variant: "showroom" as ProductVariant,
      name: "Showroom AI",
      tag: isRu ? "AI-продавец" : "AI Sales Agent",
      price: isRu ? "от $349/мес" : "from $349/mo",
      desc: isRu
        ? "Подбирает товары по каталогу, рассчитывает спецификации по формулам и формирует готовое КП."
        : "Matches catalog items, computes dynamic formulas, and outputs finished commercial quotes.",
      highlights: isRu
        ? [
            "Отраслевые формулы расчёта без галлюцинаций",
            "Генерация точных PDF-предложений для клиента",
            "Синхронизация с CRM и передача менеджеру",
          ]
        : [
            "Deterministic custom calculation formulas",
            "Automated verified PDF quote generator",
            "Seamless CRM sync & manager handoff",
          ],
      href: productPagePath(locale, "showroom"),
      externalUrl: "https://showroom-ai.pro",
    },
    {
      id: "assistant",
      variant: "assistant" as ProductVariant,
      name: "AI Business Assistant",
      tag: isRu ? "Инбокс и квалификация" : "Inbox & Qualification",
      price: isRu ? "от $149/мес" : "from $149/mo",
      desc: isRu
        ? "Круглосуточный AI-ассистент: отвечает по базе знаний, квалифицирует лидов и передаёт диалог человеку."
        : "24/7 conversational assistant: grounds in company knowledge, qualifies leads, and hands off to human operators.",
      highlights: isRu
        ? [
            "Единый инбокс: WhatsApp, Telegram, Direct, Web",
            "Ответы строго по базе знаний компании",
            "Мгновенный перевод на оператора в 1 клик",
          ]
        : [
            "Unified WhatsApp, Telegram, Direct & Web inbox",
            "Grounded strictly in company knowledge base",
            "Instant 1-click human operator handoff",
          ],
      href: productPagePath(locale, "assistant"),
      externalUrl: null,
    },
    {
      id: "aime",
      variant: "aime" as ProductVariant,
      name: "AI Marketing Employee",
      tag: isRu ? "Автономный маркетинг" : "Autonomous Marketing",
      price: isRu ? "от $1,200/мес" : "from $1,200/mo",
      desc: isRu
        ? "Ведёт полный маркетинговый цикл: анализ конкурентов, тексты, визуалы и посты — строго до вашего апрува."
        : "Executes the full marketing workflow: market intelligence, visual assets, and social drafts — up to your approval.",
      highlights: isRu
        ? [
            "Анализ рынка и контент-план под ваш бренд",
            "Сценарии для Reels и визуальные концепты",
            "Публикация строго после подтверждения в Telegram",
          ]
        : [
            "Market intelligence & on-brand content planning",
            "Visual drafts & high-converting Reels scripts",
            "Strict 1-click Telegram approval gate",
          ],
      href: productPagePath(locale, "aime"),
      externalUrl: null,
    },
  ];

  return (
    <>
      {/* 1. HERO SECTION */}
      <HeroSystem locale={locale} t={t} />

      {/* 2. CAPABILITY BAND: 4 competencies */}
      <CapabilityBand locale={locale} />

      {/* 3. CENTRAL HUB NAVIGATOR (5 Key Sections in Compact Cards) */}
      <Section
        id="hub"
        index="01"
        eyebrow={isRu ? "Экосистема Хаба" : "Hub Ecosystem"}
        title={isRu ? "Все направления компании в одном хабе." : "All Company Capabilities in One Hub."}
        lead={
          isRu
            ? "Выберите интересующий раздел: от сквозного контура создания бизнеса и каталога готовых AI-продуктов до тарифов и партнёрской сети."
            : "Select an area of interest: explore our end-to-end venture system, proprietary AI products, commercial retainers, or partner network."
        }
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {hubModules.map((m, i) => (
            <Link
              key={m.num}
              href={navHref(locale, m.href)}
              className={`group flex flex-col justify-between rounded-2xl border border-line bg-ink-2 p-6 transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-lg ${
                i === 0 ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-ink-2 to-ink-3/40" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-warm">
                    {m.num}
                  </span>
                  <span className="rounded-full border border-line bg-ink-3/60 px-2.5 py-0.5 font-mono text-[10px] text-muted">
                    {m.badge}
                  </span>
                </div>
                <div className="mt-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-mark">
                    {m.tag}
                  </span>
                  <h3 className="mt-1 font-display text-xl sm:text-2xl font-semibold text-paper group-hover:text-warm transition-colors">
                    {m.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted">
                    {m.desc}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-paper group-hover:text-mark transition-colors">
                  {m.cta}
                  <span className="btn-arrow transition-transform group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </span>
                <span className="h-2 w-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: m.accent }} />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* 4. COMPACT PRODUCTS SHOWCASE (3 Direct Cards in 1 Row) */}
      <Section
        id="products"
        index="02"
        eyebrow={t.tech.eyebrow}
        title={t.tech.title}
        lead={t.tech.lead}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProducts.map((p) => (
            <article
              key={p.id}
              className="catalog-card peek-host group flex flex-col justify-between rounded-2xl border border-line bg-ink-2 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-xl"
            >
              <div>
                {/* Top Bar: Category Pill & Price */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-mark/25 bg-mark/10 px-3 py-1 font-mono text-[10px] font-semibold text-mark uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-mark animate-pulse" />
                    {p.tag}
                  </span>
                  <span className="font-mono text-xs font-semibold text-paper">
                    {p.price}
                  </span>
                </div>

                {/* Animated Interactive Mockup (ProductUI) */}
                <div className="mt-4 overflow-hidden rounded-xl border border-line bg-ink-3/40 shadow-sm transition-colors group-hover:border-line-strong">
                  <ProductUI variant={p.variant} ratio="aspect-[16/10]" peek={true} />
                </div>

                {/* Title & Description */}
                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-semibold text-paper group-hover:text-warm transition-colors">
                      {p.name}
                    </h3>
                    <span className="font-mono text-[10px] text-muted uppercase">
                      {p.id.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {p.desc}
                  </p>
                </div>

                {/* Feature Highlights */}
                <ul className="mt-4 space-y-2 border-t border-line/60 pt-3">
                  {p.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] font-mono text-paper/85">
                      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-mark/15 text-[10px] font-bold text-mark">
                        ✓
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 border-t border-line/60 pt-4 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={p.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-warm hover:text-paper transition-colors"
                >
                  {isRu ? "Подробнее о продукте" : "Product details"}
                  <span className="catalog-cta-arrow" aria-hidden>→</span>
                </Link>
                {p.externalUrl ? (
                  <a
                    href={p.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-line bg-ink-3/40 px-3 py-1 font-mono text-[10px] text-muted hover:border-paper/40 hover:text-paper transition-colors"
                  >
                    showroom-ai.pro ↗
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href={navHref(locale, "/products")}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-2 px-6 py-2.5 text-xs font-semibold text-paper hover:bg-ink-3 hover:border-line-strong transition-all shadow-sm"
          >
            {isRu ? "Открыть полный каталог AI-продуктов" : "Open Full AI Products Catalog"} →
          </Link>
        </div>

        <div className="mt-12" data-reveal>
          <p className="font-mono text-[11px] font-semibold tracking-[0.22em] text-mark uppercase">
            {isRu ? "Отдельный сервис" : "A separate service"}
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold text-paper sm:text-2xl">
            {isRu
              ? "Цифровое производство — не четвёртый SKU."
              : "Digital Production is not a fourth SKU."}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {isRu
              ? "Три карточки выше — готовые продукты. Ниже — кастомная сборка с нуля: сайты, платформы, кабинеты и AI-системы под задачу."
              : "The three cards above are ready products. Below is a custom build from scratch: sites, platforms, cabinets and AI systems for a specific task."}
          </p>
          <div className="mt-6 max-w-3xl">
            <DigitalProductionHubCard locale={locale} />
          </div>
        </div>
      </Section>

      {/* 5. DIRECT CONTACT / INQUIRY */}
      <Section
        id="contact"
        index="03"
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        lead={t.contact.lead}
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <ContactCta className="inline-flex items-center rounded-full bg-mark px-6 py-3 text-sm font-semibold text-mark-ink shadow hover:bg-mark-light transition-all">
              {isRu ? "Открыть чат с ассистентом" : "Open chat with assistant"} →
            </ContactCta>
          </div>
          <aside className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-8 text-sm text-muted space-y-4">
            <div>
              <p className="font-display text-xl font-semibold text-paper">
                AI MARK
              </p>
              <p className="mt-1 text-xs font-mono text-mark uppercase">
                AI-Native Venture &amp; Marketing Company
              </p>
              <p className="mt-2 text-xs font-mono">
                {site.email}
              </p>
            </div>
            <p className="text-xs leading-relaxed text-muted">
              {isRu
                ? "Короткий разбор задачи: применимость AI, идея, подбор готового продукта или запуск партнёрской сети."
                : "A short initial consultation: AI fit, product selection, or launching a partner distribution channel."}
            </p>
          </aside>
        </div>
        <div id="inquiry" className="mt-12 scroll-mt-24">
          <LeadInquiry contact={t.contact} locale={locale} framed={false} compact />
        </div>
      </Section>
    </>
  );
}
