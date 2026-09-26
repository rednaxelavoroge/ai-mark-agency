"use client";

import { useState, useEffect, type CSSProperties } from "react";
import Link from "next/link";
import { ContactCta } from "@/components/ContactCta";
import { navHref, type Locale } from "@/lib/site";
import type { Copy } from "@/content/copy";

interface HeroProps {
  locale: Locale;
  t: Copy;
}

export function HeroSystem({ locale, t }: HeroProps) {
  const isRu = locale === "ru";
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const stages = [
    {
      id: "idea",
      num: "01",
      name: isRu ? "Идея и капитал" : "Idea & Capital",
      sub: isRu ? "Рыночный анализ и скоринг" : "Market Research & Scoring",
      badge: isRu ? "Входной контур" : "Input Contour",
      status: isRu ? "Пример" : "Example",
      metrics: [
        { label: isRu ? "Рынок" : "Market", val: isRu ? "Спрос и конкуренты" : "Demand & rivals" },
        { label: isRu ? "Аудитория" : "Audience", val: isRu ? "Кто покупает" : "Who buys" },
        { label: isRu ? "Модель" : "Model", val: isRu ? "Набросок экономики" : "Economics sketch" },
      ],
      description: isRu
        ? "Исследуем рынок, конкурентов и аудиторию. Если идеи нет — ищем окна под ваш капитал. Цифры на панели — схема возможностей, не результат клиента."
        : "We study the market, competitors, and audience. If there is no idea yet, we look for openings that fit your capital. The panel is a capability sketch, not a client result.",
      uiSnippet: {
        title: isRu ? "Что проверяет исследование" : "What research checks",
        tag: isRu ? "Пример" : "Example",
        lines: [
          isRu ? "✓ Спрос, конкуренты и ограничения ниши" : "✓ Demand, competitors, and constraints",
          isRu ? "✓ Несколько направлений для сравнения" : "✓ Several directions compared",
          isRu ? "✓ Набросок экономики для обсуждения" : "✓ An economics sketch for discussion",
        ],
      },
    },
    {
      id: "product",
      num: "02",
      name: isRu ? "Цифровой продукт" : "Digital Product",
      sub: isRu ? "Архитектура, веб & сервисы" : "Architecture & Platforms",
      badge: isRu ? "Сборка" : "Production",
      status: isRu ? "Сборка" : "Building",
      metrics: [
        { label: isRu ? "Архитектура" : "Stack", val: "Next.js / Cloud" },
        { label: isRu ? "Интерфейсы" : "Design", val: "Light Premium" },
        { label: isRu ? "Готовность" : "Deployment", val: "Turnkey" },
      ],
      description: isRu
        ? "Сайты, SaaS, кабинеты клиентов, каталоги и платформы, на которых бизнес физически ведёт операции."
        : "Web applications, customer portals, marketplaces, SaaS engines, and interfaces running operational workflows.",
      uiSnippet: {
        title: isRu ? "Чертёж цифровой инфраструктуры" : "Digital Infrastructure Blueprint",
        tag: isRu ? "Готово к запуску" : "Production Ready",
        lines: [
          isRu ? "✓ Высокоскоростной веб-интерфейс (App Router)" : "✓ High-speed web architecture (App Router)",
          isRu ? "✓ Клиентские кабинеты и защищённый биллинг" : "✓ User workspaces & secure billing",
          isRu ? "✓ Интеграция с внутренними базами данных" : "✓ Real-time internal database connectors",
        ],
      },
    },
    {
      id: "ai",
      num: "03",
      name: isRu ? "AI-инфраструктура" : "AI Infrastructure",
      sub: isRu ? "AIME, Sales AI & SHOWROOM AI" : "AIME, Sales AI & SHOWROOM AI",
      badge: isRu ? "Собственные AI-продукты" : "Proprietary AI Core",
      status: isRu ? "Пример" : "Example",
      metrics: [
        { label: isRu ? "Маркетинг" : "Marketing", val: "AIME" },
        { label: isRu ? "Ответы" : "Replies", val: isRu ? "Ассистент" : "Assistant" },
        { label: isRu ? "Сделка" : "Deal", val: "Showroom" },
      ],
      description: isRu
        ? "Три продукта в одном контуре: AIME ведёт маркетинговый цикл до вашего апрува, AI Business Assistant отвечает и квалифицирует, SHOWROOM AI подбирает, считает и готовит коммерческое предложение."
        : "Three products in one system: AIME runs the marketing cycle up to your approval, AI Business Assistant answers and qualifies, and SHOWROOM AI matches, calculates, and prepares a commercial proposal.",
      uiSnippet: {
        title: isRu ? "Три продукта, три задачи" : "Three products, three jobs",
        tag: isRu ? "Пример" : "Example",
        lines: [
          isRu ? "✓ AIME: исследование → контент → апрув → публикация" : "✓ AIME: research → content → approval → publish",
          isRu ? "✓ Ассистент: ответ → квалификация → человек" : "✓ Assistant: reply → qualification → human",
          isRu ? "✓ SHOWROOM AI: подбор → расчёт → КП → менеджер" : "✓ SHOWROOM AI: match → calculate → proposal → manager",
        ],
      },
    },
    {
      id: "growth",
      num: "04",
      name: isRu ? "Маркетинг, продажи и рост" : "Marketing, Sales & Growth",
      sub: isRu ? "Выручка, клиенты и сеть" : "Revenue, Clients & Network",
      badge: isRu ? "Масштабирование" : "Scaling Loop",
      status: isRu ? "Пример" : "Example",
      metrics: [
        { label: isRu ? "Спрос" : "Demand", val: isRu ? "Маркетинг" : "Marketing" },
        { label: isRu ? "Сделка" : "Deal", val: isRu ? "Продажи" : "Sales" },
        { label: isRu ? "Сеть" : "Network", val: isRu ? "Партнёры" : "Partners" },
      ],
      description: isRu
        ? "Дальше система ведёт спрос, квалификацию и коммерческие предложения. Партнёрская сеть расширяет присутствие. Это схема контура, не отчёт о выручке."
        : "The system then runs demand, qualification, and commercial proposals. The partner network extends presence. This is a map of the loop, not a revenue report.",
      uiSnippet: {
        title: isRu ? "Что происходит после запуска" : "What happens after launch",
        tag: isRu ? "Пример" : "Example",
        lines: [
          isRu ? "✓ Обращения квалифицируются и попадают в CRM" : "✓ Inquiries are qualified and sent to CRM",
          isRu ? "✓ Маркетинг возвращается к тому, что сработало" : "✓ Marketing returns to what already worked",
          isRu ? "✓ Партнёры продают в своих рынках" : "✓ Partners sell in their own markets",
        ],
      },
    },
  ];

  // Auto-advance stage every 6 seconds unless user manually interacts
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, stages.length]);

  const current = stages[activeStage];

  const ribbon = isRu
    ? [
        "Идея",
        "Исследование рынка",
        "Бизнес-модель",
        "Бренд",
        "Продукт",
        "AI-инфраструктура",
        "Маркетинг",
        "Продажи",
        "Рост",
      ]
    : [
        "Idea",
        "Market Research",
        "Business Model",
        "Brand",
        "Product",
        "AI Infrastructure",
        "Marketing",
        "Sales",
        "Growth",
      ];

  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-ink-3/40 via-ink to-ink pb-16 pt-12 sm:pb-24 sm:pt-20">
      {/* Background: ambient depth field */}
      <div aria-hidden className="grid-field pointer-events-none absolute inset-0 opacity-60" />
      <div className="ambient-drift pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(45,56,27,0.10),transparent_70%)]" />
      <div className="ambient-drift-slow pointer-events-none absolute -bottom-20 left-10 h-[450px] w-[450px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(181,141,74,0.09),transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-[300px] w-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(45,56,27,0.05),transparent_70%)] ambient-drift" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Left Column: Strategic Hero Copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-mark/20 bg-mark/5 px-3 py-1 text-[11px] font-mono tracking-widest text-mark uppercase" data-reveal>
              <span className="relative h-1.5 w-1.5 rounded-full bg-mark text-mark pulse-ring" />
              {t.hero.eyebrow}
            </div>

            <h1 className="mt-5 font-display text-4xl leading-[1.08] font-medium tracking-tight text-paper sm:text-5xl lg:text-6xl break-words" data-reveal style={{ "--reveal-delay": "80ms" } as CSSProperties}>
              {t.hero.title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl" data-reveal style={{ "--reveal-delay": "160ms" } as CSSProperties}>
              {t.hero.lead}
            </p>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/90" data-reveal style={{ "--reveal-delay": "200ms" } as CSSProperties}>
              {isRu
                ? "AI MARK объединяет AI-маркетинг, AI-продажи, клиентский сервис, автоматизацию, цифровую разработку, финансовые и Web3-решения, создание бизнеса и партнёрскую сеть в одной AI-native инфраструктуре."
                : "AI MARK brings together AI marketing, AI sales, customer service, automation, digital production, financial and Web3 solutions, business creation, and a partner network in one AI-native infrastructure."}
            </p>

            <div className="mt-4 flex flex-col gap-2 rounded-lg border border-line bg-ink-2/60 px-4 py-3 text-sm text-paper/90 sm:flex-row sm:items-center sm:gap-3" data-reveal style={{ "--reveal-delay": "240ms" } as CSSProperties}>
              <span className="text-warm font-mono text-xs font-semibold uppercase tracking-wider">
                {isRu ? "Концепция" : "Concept"}:
              </span>
              <span>
                {isRu
                  ? "Не шаблонное агентство — а цифровая компания полного цикла с собственной AI-инфраструктурой."
                  : "Not a marketing agency template — an AI-native operating company with proprietary products."}
              </span>
            </div>

            {/* CTA row */}
            <div className="mt-8 flex flex-wrap items-center gap-3" data-reveal style={{ "--reveal-delay": "320ms" } as CSSProperties}>
              <ContactCta className="inline-flex items-center justify-center rounded-full bg-mark px-6 py-3 text-sm font-semibold text-mark-ink shadow-md transition-all hover:bg-mark-light hover:shadow-lg active:scale-95">
                {t.hero.primaryCta} →
              </ContactCta>
              <Link
                href={navHref(locale, "#how")}
                className="inline-flex items-center justify-center rounded-full border border-line bg-ink-2 px-5 py-3 text-sm font-medium text-paper transition-all hover:border-paper/40 hover:bg-ink-3 active:scale-95"
              >
                {t.hero.secondaryCta}
              </Link>
              <Link
                href={navHref(locale, "#investors")}
                className="inline-flex items-center justify-center rounded-full border border-warm/30 bg-warm-soft px-5 py-3 text-sm font-medium text-paper transition-all hover:border-warm/60 active:scale-95"
              >
                {t.hero.investorCta}
              </Link>
            </div>

            <p className="mt-6 text-xs text-muted" data-reveal style={{ "--reveal-delay": "400ms" } as CSSProperties}>
              {t.hero.soft}
            </p>
          </div>

          {/* Right Column: Interactive Transformation Engine */}
          <div
            className="shimmer float-slow rounded-2xl border border-line bg-ink-2 p-5 shadow-lg lg:p-6"
            data-reveal
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-mark" />
                <span className="font-mono text-xs font-semibold tracking-wider text-paper uppercase">
                  {isRu ? "Трансформация бизнеса" : "Business Engine"}
                </span>
              </div>
              <span className="rounded-full border border-mark/20 bg-mark/5 px-2.5 py-0.5 font-mono text-[10px] text-mark font-medium">
                {current.badge}
              </span>
            </div>

            {/* Stage Progress Selector */}
            <div className="mt-4 grid grid-cols-4 gap-1.5">
              {stages.map((stg, i) => (
                <button
                  key={stg.id}
                  onClick={() => {
                    setActiveStage(i);
                    setIsAutoPlaying(false);
                  }}
                  className={`flex flex-col items-start rounded-lg p-2 text-left transition-all ${
                    activeStage === i
                      ? "bg-mark text-mark-ink shadow-sm"
                      : "bg-ink-3/60 text-muted hover:bg-ink-3 hover:text-paper"
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-80">{stg.num}</span>
                  <span className="font-display text-[11px] font-medium leading-tight truncate w-full">
                    {stg.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Auto-cycle progress */}
            <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-ink-3/60">
              <span
                key={activeStage}
                className="cycle-fill block h-full rounded-full bg-gradient-to-r from-mark to-warm"
              />
            </div>

            {/* Active Stage Detail */}
            <div key={activeStage} className="stage-enter mt-5 rounded-xl border border-line bg-ink-3/40 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-warm uppercase tracking-widest">
                    {`${current.num} // ${current.sub}`}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-paper mt-0.5">
                    {current.name}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 rounded-md bg-ink-2 px-2 py-1 font-mono text-[11px] text-paper border border-line">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {current.status}
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-muted">
                {current.description}
              </p>

              {/* Metrics Strip */}
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line/60 pt-3">
                {current.metrics.map((m, idx) => (
                  <div key={idx} className="rounded-md bg-ink-2 p-2 text-center border border-line/60">
                    <p className="font-mono text-[10px] text-muted">{m.label}</p>
                    <p className="font-display text-xs font-semibold text-paper mt-0.5">{m.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live UI snippet simulation */}
            <div className="mt-4 rounded-xl border border-line bg-ink-2 p-4">
              <div className="flex items-center justify-between text-xs text-muted mb-2">
                <span className="font-mono text-[11px] text-paper font-medium">
                  {current.uiSnippet.title}
                </span>
                <span className="text-[10px] font-mono text-warm">
                  {current.uiSnippet.tag}
                </span>
              </div>
              <ul className="space-y-1.5">
                {current.uiSnippet.lines.map((line, lIdx) => (
                  <li
                    key={lIdx}
                    className="flex items-center gap-2 rounded bg-ink-3/40 px-2.5 py-1.5 font-mono text-[11px] text-paper/85"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom connected transformation indicator */}
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11px] text-muted">
              <span className="font-mono">
                {isRu ? "Пример контура, не отчёт" : "Example of the loop, not a report"}
              </span>
              <Link href={navHref(locale, "#pipeline")} className="text-mark font-medium hover:underline">
                {isRu ? "Смотреть пайплайн →" : "View Pipeline →"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Transformation ribbon: idea → working business */}
      <div className="relative mt-14 border-y border-line bg-ink-2/40 py-4 sm:mt-20">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
        <div className="marquee-host flex overflow-hidden">
          <div className="marquee-track flex shrink-0 items-center gap-6 pr-6">
            {[...ribbon, ...ribbon].map((step, i) => (
              <span key={i} className="flex shrink-0 items-center gap-6">
                <span className="font-mono text-[11px] tracking-widest text-muted uppercase">
                  {step}
                </span>
                <span aria-hidden className="text-warm">
                  →
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
