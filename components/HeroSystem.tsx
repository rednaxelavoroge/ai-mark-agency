"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/ContactCta";
import { navHref, type Locale } from "@/lib/site";
import type { Copy } from "@/content/copy";

function HeroCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || !ref.current) return;
    const node = ref.current;
    let raf = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      raf = 0;
      const host = node.parentElement;
      if (!host) return;
      const rect = host.getBoundingClientRect();
      node.style.transform = `translate(${x - rect.left}px, ${y - rect.top}px)`;
    };
    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="hero-cursor am-anim" aria-hidden />;
}

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
      sub: isRu ? "AIME, Sales AI & Showroom AI" : "AIME, Sales AI & Showroom AI",
      badge: isRu ? "Собственные AI-продукты" : "Proprietary AI Core",
      status: isRu ? "Пример" : "Example",
      metrics: [
        { label: isRu ? "Маркетинг" : "Marketing", val: "AIME" },
        { label: isRu ? "Ответы" : "Replies", val: isRu ? "Ассистент" : "Assistant" },
        { label: isRu ? "Сделка" : "Deal", val: "Showroom AI" },
      ],
      description: isRu
        ? "Три продукта в одном контуре: AIME ведёт маркетинговый цикл до вашего апрува, AI Business Assistant отвечает и квалифицирует, Showroom AI подбирает, считает и готовит коммерческое предложение."
        : "Three products in one system: AIME runs the marketing cycle up to your approval, AI Business Assistant answers and qualifies, and Showroom AI matches, calculates, and prepares a commercial proposal.",
      uiSnippet: {
        title: isRu ? "Три продукта, три задачи" : "Three products, three jobs",
        tag: isRu ? "Пример" : "Example",
        lines: [
          isRu ? "✓ AIME: исследование → контент → апрув → публикация" : "✓ AIME: research → content → approval → publish",
          isRu ? "✓ Ассистент: ответ → квалификация → человек" : "✓ Assistant: reply → qualification → human",
          isRu ? "✓ Showroom AI: подбор → расчёт → КП → менеджер" : "✓ Showroom AI: match → calculate → proposal → manager",
        ],
      },
    },
    {
      id: "growth",
      num: "04",
      name: isRu ? "Маркетинг, Продажи & Рост" : "Marketing, Sales & Growth",
      sub: isRu ? "Выручка, клиенты & сеть" : "Revenue, Clients & Network",
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

  const title = t.hero.title;
  const accentAt = title.lastIndexOf(" ");
  const titleLead = accentAt > 0 ? title.slice(0, accentAt) : title;
  const titleAccent = accentAt > 0 ? title.slice(accentAt + 1) : "";

  return (
    <section className="am-hero" data-motion>
      <HeroCursor />
      <div className="am-wrap">
        <div className="am-hero-grid">
          <div className="relative z-[2] py-4">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#d5e0d4]">
              {t.hero.eyebrow}
            </p>
            <h1 className="am-display" data-reveal>
              {titleLead}{titleAccent ? " " : ""}
              {titleAccent ? <em>{titleAccent}</em> : null}
            </h1>
            <p className="lede">{t.hero.lead}</p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#e7eee4]">{t.hero.extra}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ContactCta className="inline-flex min-h-[48px] items-center rounded-full bg-[var(--lime)] px-5 text-sm font-semibold text-[#14291f]">
                {t.hero.primaryCta} →
              </ContactCta>
              <Link
                href={navHref(locale, "/how-it-works")}
                className="inline-flex min-h-[48px] items-center rounded-full border border-white/40 bg-white/10 px-5 text-sm font-semibold text-white"
              >
                {t.hero.secondaryCta}
              </Link>
              <Link
                href={navHref(locale, "/partners")}
                className="inline-flex min-h-[48px] items-center rounded-full border border-white/30 px-5 text-sm font-semibold text-white"
              >
                {t.hero.partnerCta}
              </Link>
              <Link
                href={navHref(locale, "/investors")}
                className="inline-flex min-h-[48px] items-center rounded-full border border-white/30 px-5 text-sm font-semibold text-white"
              >
                {t.hero.investorCta}
              </Link>
            </div>
            <p className="mt-6 max-w-xl text-[13px] leading-relaxed text-[#c5d0c4]">{t.hero.soft}</p>
          </div>

          <div className="hero-art-wrap">
            <div className="hero-art">
              <Image
                src="/brand/ai-mark-hero.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 1080px) 100vw, 640px"
                className="hero-art-img am-anim hero-breathe"
              />
            </div>
            <div className="hero-ring am-anim" aria-hidden />
            <div className="absolute bottom-4 left-4 right-4 z-[3] rounded-2xl border border-white/30 bg-[#193428]/90 p-3 text-[13px] text-[#e7eee4] backdrop-blur-md">
              <p className="font-semibold text-[var(--lime)]">{current.num} · {current.name}</p>
              <p className="mt-1 leading-snug">{current.description}</p>
            </div>
          </div>
        </div>

        <div
          className="relative z-[1] mb-8 mt-2 rounded-[24px] border border-white/20 bg-[#fffefa] p-4 text-[#17261f]"
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
                  <span className="font-display text-[10px] sm:text-[11px] font-medium leading-snug w-full line-clamp-2">
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
                  <div key={idx} className="rounded-md bg-ink-2 p-1.5 sm:p-2 text-center border border-line/60 min-w-0">
                    <p className="font-mono text-[10px] text-muted truncate">{m.label}</p>
                    <p className="font-display text-[11px] sm:text-xs font-semibold text-paper mt-0.5 leading-snug break-words">
                      {m.val}
                    </p>
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
              <Link href={navHref(locale, "#idea-to-business")} className="text-mark font-medium hover:underline">
                {isRu ? "Смотреть контур →" : "View Contour →"}
              </Link>
            </div>
          </div>
        </div>

      {/* Transformation ribbon: idea → working business */}
      <div className="relative overflow-hidden border-t border-white/15 py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#10241c] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#10241c] to-transparent" />
        <div className="flex overflow-hidden">
          <div className="marquee-track flex shrink-0 items-center gap-6 pr-6">
            {[...ribbon, ...ribbon].map((step, i) => (
              <span key={i} className="flex shrink-0 items-center gap-6">
                <span className="font-mono text-[13px] tracking-widest text-[#d5e0d4] uppercase">
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
