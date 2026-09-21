"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
      name: isRu ? "Идея & Капитал" : "Idea & Capital",
      sub: isRu ? "Рыночный анализ и скоринг" : "Market Research & Scoring",
      badge: isRu ? "Входной контур" : "Input Contour",
      status: isRu ? "Валидировано" : "Validated",
      metrics: [
        { label: isRu ? "Оценка ниши" : "Market TAM", val: "$4.2B" },
        { label: isRu ? "Риски / Баги" : "Risk Score", val: "Low (0.12)" },
        { label: isRu ? "Моделирование" : "Unit Economics", val: "Positive" },
      ],
      description: isRu
        ? "Исследуем рынок, конкурентов и аудиторию. Если идеи нет — находим рыночные окна под ваш капитал."
        : "Deep market, competitor, and audience intelligence. If no idea exists, we uncover high-margin windows for your capital.",
      uiSnippet: {
        title: isRu ? "Инвестиционный скоринг возможностей" : "Opportunity Assessment Matrix",
        tag: isRu ? "Синтез данных" : "Data Synthesis",
        lines: [
          isRu ? "✓ Выделено 3 перспективных сегмента B2B" : "✓ 3 B2B segments identified",
          isRu ? "✓ Прямой конкурентный анализ: 14 игроков" : "✓ Direct competitor audit: 14 companies",
          isRu ? "✓ Сходимость юнит-экономики: LTV/CAC > 3.8" : "✓ Unit economics: LTV/CAC > 3.8",
        ],
      },
    },
    {
      id: "product",
      num: "02",
      name: isRu ? "Цифровой продукт" : "Digital Product",
      sub: isRu ? "Архитектура, веб & сервисы" : "Architecture & Platforms",
      badge: isRu ? "Production" : "Production",
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
        title: isRu ? "Digital Infrastructure Blueprint" : "Digital Infrastructure Blueprint",
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
      sub: isRu ? "AIME, Sales AI & Showroom" : "AIME, Sales AI & Showroom",
      badge: isRu ? "Собственные AI-модели" : "Proprietary AI Core",
      status: isRu ? "Активно 24/7" : "Active 24/7",
      metrics: [
        { label: isRu ? "Задержка ответа" : "Latency", val: "< 1.2s" },
        { label: isRu ? "Каналы" : "Channels", val: "5 Integrated" },
        { label: isRu ? "Предохранитель" : "HITL Guard", val: "Hard-Floor" },
      ],
      description: isRu
        ? "Встраиваем собственные AI-продукты: автономный SMM (AIME), мультиканальный инбокс продаж и расчётный движок Showroom AI."
        : "Deploying proprietary AI products: autonomous SMM (AIME), omnichannel sales AI assistant, and Showroom AI specification engine.",
      uiSnippet: {
        title: isRu ? "AI Mark Autonomous Mesh" : "AI Mark Autonomous Mesh",
        tag: isRu ? "Собственный SaaS" : "Proprietary SaaS",
        lines: [
          isRu ? "✓ AIME: Автономный контент Meta + апрув в Telegram" : "✓ AIME: Autonomous Meta posting + TG approval",
          isRu ? "✓ AI Business Assistant: WhatsApp, TG, Webchat" : "✓ AI Business Assistant: 5-channel 24/7 inbox",
          isRu ? "✓ Showroom AI: Точный расчёт спецификаций и КП" : "✓ Showroom AI: Exact quote & PDF generator",
        ],
      },
    },
    {
      id: "growth",
      num: "04",
      name: isRu ? "Маркетинг, Продажи & Рост" : "Marketing, Sales & Growth",
      sub: isRu ? "Выручка, клиенты & сеть" : "Revenue, Clients & Network",
      badge: isRu ? "Масштабирование" : "Scaling Loop",
      status: isRu ? "Рост" : "Scaling",
      metrics: [
        { label: isRu ? "Скорость закрытия" : "Lead-to-Quote", val: "4.8x faster" },
        { label: isRu ? "Конверсия лидов" : "Qualification", val: "94%" },
        { label: isRu ? "Партнёрская сеть" : "Scale Model", val: "Global" },
      ],
      description: isRu
        ? "Система начинает привлекать клиентов, квалифицировать обращения, формировать предложения и генерировать прибыль."
        : "The operating company begins generating qualified demand, closing transactions, and scaling across international markets.",
      uiSnippet: {
        title: isRu ? "Commercial Operations Dashboard" : "Commercial Operations Dashboard",
        tag: isRu ? "В реальном времени" : "Real-time Telemetry",
        lines: [
          isRu ? "✓ Лиды квалифицируются и синхронизируются с CRM" : "✓ Leads qualified & synced to CRM instant",
          isRu ? "✓ Контент-маркетинг обучается на конверсиях" : "✓ Marketing loop optimizes on conversion data",
          isRu ? "✓ Подключение региональных и отраслевых партнёров" : "✓ Regional and industry partner distribution",
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

  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-ink-3/40 via-ink to-ink pb-16 pt-12 sm:pb-24 sm:pt-20">
      {/* Background radial ambient */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(45,56,27,0.08),transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-[450px] w-[450px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(181,141,74,0.06),transparent_70%)]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Left Column: Strategic Hero Copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-mark/20 bg-mark/5 px-3 py-1 text-[11px] font-mono tracking-widest text-mark uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-mark animate-pulse" />
              {t.hero.eyebrow}
            </div>

            <h1 className="mt-5 font-display text-4xl leading-[1.08] font-medium tracking-tight text-paper sm:text-5xl lg:text-6xl">
              {isRu ? (
                <>
                  От идеи до <span className="text-mark font-semibold">работающего бизнеса.</span>
                </>
              ) : (
                <>
                  From Idea to a <span className="text-mark font-semibold">Working Business.</span>
                </>
              )}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
              {t.hero.lead}
            </p>

            <div className="mt-4 flex items-center gap-3 rounded-lg border border-line bg-ink-2/60 px-4 py-3 text-sm text-paper/90">
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
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={navHref(locale, "#contact")}
                className="inline-flex items-center justify-center rounded-full bg-mark px-6 py-3 text-sm font-semibold text-mark-ink shadow-md transition-all hover:bg-mark-light hover:shadow-lg active:scale-95"
              >
                {t.hero.primaryCta} →
              </Link>
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

            <p className="mt-6 text-xs text-muted">
              {t.hero.soft}
            </p>
          </div>

          {/* Right Column: Interactive Transformation Engine */}
          <div
            className="rounded-2xl border border-line bg-ink-2 p-5 shadow-lg lg:p-6"
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

            {/* Active Stage Detail */}
            <div className="mt-5 rounded-xl border border-line bg-ink-3/40 p-4">
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
                {isRu ? "Сквозной процесс: 100% сопряжение" : "Loop status: 100% interconnected"}
              </span>
              <Link href={navHref(locale, "#pipeline")} className="text-mark font-medium hover:underline">
                {isRu ? "Смотреть пайплайн →" : "View Pipeline →"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
