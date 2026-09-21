"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Locale } from "@/lib/site";

/**
 * Pinned narrative scene: "An idea enters the system and becomes a working
 * business." The section is tall; the inner panel is sticky. As the visitor
 * scrolls, stages activate in sequence and the system diagram constructs
 * itself. Under reduced-motion the whole thing renders as a static grid.
 */

type Stage = {
  kicker: string;
  title: string;
  body: string;
  artifact: string;
};

const COPY: Record<Locale, { eyebrow: string; title: string; lead: string; stages: Stage[] }> = {
  ru: {
    eyebrow: "Сквозной контур",
    title: "Как идея становится работающим бизнесом.",
    lead: "Не набор подрядчиков, а один управляемый контур: рынок, модель, продукт, AI, спрос.",
    stages: [
      {
        kicker: "Вход",
        title: "Идея или капитал",
        body: "Начинаем с гипотезы, действующего бизнеса или объёма капитала — фиксируем цель.",
        artifact: "seed",
      },
      {
        kicker: "01",
        title: "Исследование рынка",
        body: "Спрос, конкуренты, барьеры входа и юнит-экономика на объективных данных.",
        artifact: "bars",
      },
      {
        kicker: "02",
        title: "Бизнес-модель",
        body: "Собираем модель: сегменты, монетизация, каналы, стоимость привлечения.",
        artifact: "grid",
      },
      {
        kicker: "03",
        title: "Бренд",
        body: "Позиционирование, айдентика и голос — система, а не логотип-заплатка.",
        artifact: "brand",
      },
      {
        kicker: "04",
        title: "Цифровой продукт",
        body: "Платформа, кабинеты, расчёты и интеграции, на которых бизнес ведёт операции.",
        artifact: "product",
      },
      {
        kicker: "05",
        title: "AI-инфраструктура",
        body: "Собственные AI-агенты встроены в операции: контент, инбокс продаж, расчёты.",
        artifact: "ai",
      },
      {
        kicker: "06",
        title: "Маркетинг и продажи",
        body: "Спрос, квалификация и сделки — на той же инфраструктуре, а не в разрозненных сервисах.",
        artifact: "funnel",
      },
      {
        kicker: "07",
        title: "Рост",
        body: "Аналитика, оптимизация и партнёрская сеть масштабируют уже работающую модель.",
        artifact: "growth",
      },
    ],
  },
  en: {
    eyebrow: "Continuous contour",
    title: "How an idea becomes a working business.",
    lead: "Not a stack of contractors — one governed contour: market, model, product, AI, demand.",
    stages: [
      {
        kicker: "Input",
        title: "Idea or capital",
        body: "We start from a hypothesis, an operating company, or a capital range — and fix the goal.",
        artifact: "seed",
      },
      {
        kicker: "01",
        title: "Market research",
        body: "Demand, competitors, barriers to entry and unit economics grounded in real data.",
        artifact: "bars",
      },
      {
        kicker: "02",
        title: "Business model",
        body: "We assemble the model: segments, monetization, channels, cost of acquisition.",
        artifact: "grid",
      },
      {
        kicker: "03",
        title: "Brand",
        body: "Positioning, identity and voice — a system, not a logo patched on afterward.",
        artifact: "brand",
      },
      {
        kicker: "04",
        title: "Digital product",
        body: "Platform, workspaces, calculations and integrations the business actually runs on.",
        artifact: "product",
      },
      {
        kicker: "05",
        title: "AI infrastructure",
        body: "Proprietary AI agents embedded into operations: content, sales inbox, quoting.",
        artifact: "ai",
      },
      {
        kicker: "06",
        title: "Marketing & sales",
        body: "Demand capture, qualification and deals on the same infra — not scattered tools.",
        artifact: "funnel",
      },
      {
        kicker: "07",
        title: "Growth",
        body: "Analytics, optimization and the partner network scale an already working model.",
        artifact: "growth",
      },
    ],
  },
};

/** Plain-language description of what each centre artifact represents. */
const ARTIFACT_CAPTION: Record<Locale, Record<string, string>> = {
  ru: {
    seed: "Вход: идея, действующий бизнес или объём капитала.",
    bars: "Аналитика рынка: спрос, конкуренты и юнит-экономика.",
    grid: "Модель: сегменты, монетизация, каналы и стоимость привлечения.",
    brand: "Айдентика: позиционирование, голос и визуальная система.",
    product: "Цифровой продукт: кабинеты, расчёты, интеграции и данные.",
    ai: "AI-агенты в операциях: контент, инбокс продаж, расчёты по каталогу.",
    funnel: "Продажи: поток обращений, квалификация и сделки.",
    growth: "Рост: метрики, оптимизация и партнёрская сеть.",
  },
  en: {
    seed: "Input: an idea, an operating company, or a capital range.",
    bars: "Market analytics: demand, competitors and unit economics.",
    grid: "Model: segments, monetization, channels and cost of acquisition.",
    brand: "Identity: positioning, voice and the visual system.",
    product: "Digital product: workspaces, calculations, integrations and data.",
    ai: "AI agents in operations: content, sales inbox, catalog quoting.",
    funnel: "Sales: inquiry flow, qualification and closed deals.",
    growth: "Growth: metrics, optimization and the partner network.",
  },
};

const ACCENTS = ["var(--mark)", "var(--warm)", "var(--mark-light)"];
const accent = (i: number) => ACCENTS[i % ACCENTS.length];

const RADIUS = 37;
const CENTER = { x: 50, y: 50 };

function nodePos(i: number, total: number) {
  const angle = (-90 + i * (360 / total)) * (Math.PI / 180);
  return {
    x: CENTER.x + RADIUS * Math.cos(angle),
    y: CENTER.y + RADIUS * Math.sin(angle),
  };
}

const ARTIFACT_LABEL: Record<Locale, Record<string, string>> = {
  ru: {
    bars: "спрос · конкуренты",
    product: "кабинеты · расчёты",
    ai: "RAG · агенты",
    funnel: "обращения → сделки",
    growth: "метрики · сеть",
  },
  en: {
    bars: "demand · competitors",
    product: "workspaces · quoting",
    ai: "RAG · agents",
    funnel: "inquiries → deals",
    growth: "metrics · network",
  },
};

function Artifact({ kind, locale }: { kind: string; locale: Locale }) {
  const label = ARTIFACT_LABEL[locale]?.[kind] ?? "";
  const base =
    "stage-enter flex h-full w-full items-center justify-center rounded-xl border border-line/70 bg-ink-2 p-3";
  if (kind === "seed") {
    return (
      <div className={base}>
        <div className="flex items-center gap-2">
          <span className="relative grid h-3 w-3 place-items-center rounded-full bg-warm text-warm pulse-ring" />
          <span className="font-mono text-[10px] opacity-75">{locale === "ru" ? "идея · гипотеза" : "idea · hypothesis"}</span>
        </div>
      </div>
    );
  }
  if (kind === "bars") {
    return (
      <div className={base}>
        <div className="w-full max-w-[150px]">
          <div className="flex h-12 items-end gap-1.5">
            {[42, 58, 50, 74, 66, 88, 80].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-[3px] bg-gradient-to-t from-mark/55 to-mark"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <p className="mt-2 text-center font-mono text-[8px] uppercase tracking-wider opacity-75">
            {label}
          </p>
        </div>
      </div>
    );
  }
  if (kind === "grid") {
    return (
      <div className={base}>
        <div className="grid w-full max-w-[140px] grid-cols-2 gap-1.5">
          {(locale === "ru" ? ["Сегменты", "Монетизация", "Каналы", "CAC / LTV"] : ["Segments", "Pricing", "Channels", "CAC / LTV"]).map((t) => (
            <span
              key={t}
              className="rounded-md border border-line/70 px-2 py-2 text-center font-mono text-[9px] text-paper/85"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }
  if (kind === "brand") {
    return (
      <div className={base}>
        <div className="text-center">
          <p className="font-display text-2xl font-semibold text-paper">AI Mark</p>
          <p className="mt-1 font-mono text-[9px] tracking-widest uppercase opacity-80">
            {locale === "ru" ? "система айдентики" : "identity system"}
          </p>
        </div>
      </div>
    );
  }
  if (kind === "product") {
    return (
      <div className={base}>
        <div className="w-full max-w-[160px]">
          <div className="mb-1.5 flex gap-1">
            <span className="h-2 w-2 rounded-full bg-warm/60" />
            <span className="h-2 w-2 rounded-full bg-mark/50" />
          </div>
          <div className="space-y-1.5">
            <span className="block h-2 w-3/4 rounded bg-mark/25" />
            <span className="block h-2 w-full rounded bg-ink-3" />
            <span className="block h-2 w-5/6 rounded bg-ink-3" />
          </div>
          <p className="mt-2 text-center font-mono text-[8px] uppercase tracking-wider opacity-75">
            {label}
          </p>
        </div>
      </div>
    );
  }
  if (kind === "ai") {
    return (
      <div className={base}>
        <div className="text-center">
          <div className="mx-auto grid w-fit grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className={`h-2.5 w-2.5 rounded-full ${i % 4 === 1 ? "bg-mark" : "bg-ink-3"}`}
              />
            ))}
          </div>
          <p className="mt-2 font-mono text-[8px] uppercase tracking-wider opacity-75">
            {label}
          </p>
        </div>
      </div>
    );
  }
  if (kind === "funnel") {
    return (
      <div className={base}>
        <div className="w-full max-w-[150px] space-y-1.5">
          {[100, 72, 46].map((w, i) => (
            <span
              key={i}
              className="block h-3 rounded bg-gradient-to-r from-mark/70 to-mark/25"
              style={{ width: `${w}%` }}
            />
          ))}
          <p className="pt-1 text-center font-mono text-[8px] uppercase tracking-wider opacity-75">
            {label}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className={base}>
      <div className="w-full max-w-[170px]">
        <svg viewBox="0 0 160 60" className="h-11 w-full">
          <path
            d="M4 52 C40 52, 44 22, 76 22 S120 8 156 6"
            fill="none"
            stroke="var(--mark)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <p className="mt-1 text-center font-mono text-[8px] uppercase tracking-wider opacity-75">
          {label}
        </p>
      </div>
    </div>
  );
}

export function IdeaToBusiness({ locale }: { locale: Locale }) {
  const copy = COPY[locale] ?? COPY.ru;
  const stages = copy.stages;
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const total = stages.length;

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) {
      const id = requestAnimationFrame(() => {
        setReduced(true);
        setActive(total - 1);
      });
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const passed = -rect.top;
      const p = scrollable > 0 ? Math.max(0, Math.min(1, passed / scrollable)) : 0;
      const idx = Math.min(total - 1, Math.floor(p * total * 0.999));
      setActive(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [total]);

  const current = stages[active];

  return (
    <>
    <section
      ref={sectionRef}
      id="idea-to-business"
      className="relative border-t border-line bg-ink-3/20"
      style={{ height: reduced ? "auto" : `${total * 62 + 100}vh` }}
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-3xl" data-reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">
              {copy.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.05] font-medium tracking-tight sm:text-4xl lg:text-5xl">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-2xl text-muted">{copy.lead}</p>
          </div>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            {/* Narrative column */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3">
                <span
                  className="font-editorial text-5xl italic transition-colors duration-500 sm:text-6xl"
                  style={{ color: accent(active) }}
                >
                  {String(active).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-line" />
                <span className="font-mono text-[11px] tracking-widest text-muted uppercase">
                  {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>

              <div key={active} className="stage-enter mt-6">
                <p className="font-mono text-xs tracking-widest text-warm uppercase">
                  {current.kicker}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-paper sm:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                  {current.body}
                </p>
              </div>

              {/* Progress rail */}
              <div className="mt-8 flex gap-1.5">
                {stages.map((s, i) => (
                  <span key={s.title} className="flex-1">
                    <span className="block h-[3px] overflow-hidden rounded-full bg-ink-3">
                      <span
                        className="block h-full rounded-full transition-transform duration-500 ease-out"
                        style={{
                          transform: `scaleX(${i <= active ? 1 : 0})`,
                          backgroundColor: accent(i),
                        }}
                      />
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* System diagram */}
            <div className="order-1 lg:order-2">
              <div className="relative mx-auto aspect-square w-full max-w-[460px]">
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="none"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r={RADIUS}
                    fill="none"
                    stroke="var(--line-strong)"
                    strokeWidth="0.3"
                  />
                  {stages.map((s, i) => {
                    const p = nodePos(i, total);
                    const on = i <= active;
                    return (
                      <line
                        key={s.title}
                        x1="50"
                        y1="50"
                        x2={p.x}
                        y2={p.y}
                        stroke={on ? accent(i) : "var(--line)"}
                        strokeWidth={on ? 0.6 : 0.3}
                        style={{ transition: "stroke 500ms ease, stroke-width 500ms ease" }}
                      />
                    );
                  })}
                </svg>

                {/* Center artifact */}
                <div className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2" style={{ color: accent(active) }}>
                  <Artifact kind={current.artifact} locale={locale} />
                </div>

                {/* Satellite nodes */}
                {stages.map((s, i) => {
                  const p = nodePos(i, total);
                  const on = i <= active;
                  return (
                    <span
                      key={s.title}
                      className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap"
                      style={{ left: `${p.x}%`, top: `${p.y}%` } as CSSProperties}
                    >
                      <span
                        className={`grid h-6 w-6 place-items-center rounded-full border text-[9px] font-mono transition-all duration-500 ${
                          on ? "text-mark-ink" : "border-line bg-ink-2 text-muted"
                        }`}
                        style={
                          on
                            ? { backgroundColor: accent(i), borderColor: accent(i) }
                            : undefined
                        }
                      >
                        {i === 0 ? "◦" : i}
                      </span>
                      <span
                        className={`font-mono text-[9px] uppercase tracking-wider transition-colors duration-500 ${
                          on
                            ? "inline font-semibold text-paper"
                            : "hidden text-muted sm:inline"
                        }`}
                      >
                        {s.title}
                      </span>
                    </span>
                  );
                })}
              </div>

              {/* What the artifact means — always spelled out */}
              <div
                key={active}
                className="stage-enter mx-auto mt-6 flex max-w-[460px] items-start gap-3 rounded-xl border border-line bg-ink-2 px-4 py-3"
              >
                <span
                  className="mt-0.5 font-mono text-[10px]"
                  style={{ color: accent(active) }}
                >
                  {String(active).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-xs font-semibold text-paper">
                    {current.title}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                    {ARTIFACT_CAPTION[locale]?.[current.artifact] ?? current.body}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Stage overview — every step described in plain language */}
    <section className="border-t border-line bg-ink-3/20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase" data-reveal>
          {locale === "ru" ? "Все этапы контура" : "Every stage of the contour"}
        </p>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((s, i) => (
            <div
              key={s.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 60}ms` } as CSSProperties}
              className="border-t border-line pt-4"
            >
              <div className="flex items-baseline gap-2">
                <span
                  className="font-editorial text-xl italic"
                  style={{ color: accent(i) }}
                >
                  {String(i).padStart(2, "0")}
                </span>
                <h3 className="font-display text-sm font-semibold leading-snug text-paper">
                  {s.title}
                </h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
