import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroSystem } from "@/components/HeroSystem";
import { HomeRest } from "@/components/home/HomeRest";
import { getCopy } from "@/content/copy";
import { absoluteUrl, getSiteTagline, isLocale, site, type Locale } from "@/lib/site";
import { productPagePath } from "@/lib/products";
import type { ProductVariant } from "@/components/ui/ProductUI";

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
      <HeroSystem locale={locale} t={t} />
      <HomeRest
        locale={locale}
        t={t}
        hubModules={hubModules}
        featuredProducts={featuredProducts}
      />
    </>
  );
}
