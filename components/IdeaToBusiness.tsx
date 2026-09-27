"use client";

import { useState, useRef, type CSSProperties } from "react";
import type { Locale } from "@/lib/site";
import { ContactCta } from "@/components/ContactCta";

/**
 * Interactive Business Creation Contour:
 * Replaces the heavy 350vh scroll lock with an elegant horizontal stage
 * explorer inspired by auswandernhilft.de/laenderhub.
 * All stages, copy, artifacts, and scenarios are 100% preserved.
 */

type Stage = {
  kicker: string;
  title: string;
  body: string;
  artifact: string;
};

const COPY: Record<string, { eyebrow: string; title: string; lead: string; stages: Stage[] }> = {
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

const ARTIFACT_CAPTION: Record<string, Record<string, string>> = {
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

const RADIUS = 35;
const CENTER = { x: 50, y: 50 };

function nodePos(i: number, total: number) {
  const angle = (-90 + i * (360 / total)) * (Math.PI / 180);
  return {
    x: CENTER.x + RADIUS * Math.cos(angle),
    y: CENTER.y + RADIUS * Math.sin(angle),
  };
}

function Artifact({ kind, locale }: { kind: string; locale: Locale }) {
  const isRu = locale === "ru";
  const base =
    "stage-enter flex h-full w-full items-center justify-center rounded-xl border border-line/70 bg-ink-2 p-3 shadow-inner";

  if (kind === "seed") {
    return (
      <div className={base}>
        <div className="flex items-center gap-2">
          <span className="relative grid h-3 w-3 place-items-center rounded-full bg-warm text-warm pulse-ring" />
          <span className="font-mono text-[10px] opacity-80">{isRu ? "идея · капитал" : "idea · capital"}</span>
        </div>
      </div>
    );
  }
  if (kind === "bars") {
    return (
      <div className={base}>
        <div className="w-full max-w-[130px]">
          <div className="flex h-10 items-end gap-1.5">
            {[42, 58, 50, 74, 66, 88, 80].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-[3px] bg-gradient-to-t from-mark/55 to-mark"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <p className="mt-2 text-center font-mono text-[8px] uppercase tracking-wider opacity-75">
            {isRu ? "спрос · конкуренты" : "demand · rivals"}
          </p>
        </div>
      </div>
    );
  }
  if (kind === "grid") {
    return (
      <div className={base}>
        <div className="grid w-full max-w-[130px] grid-cols-2 gap-1">
          {(isRu ? ["Сегменты", "Монетизация", "Каналы", "CAC/LTV"] : ["Segments", "Pricing", "Channels", "CAC/LTV"]).map((t) => (
            <span
              key={t}
              className="rounded border border-line/70 px-1.5 py-1 text-center font-mono text-[8px] text-paper/85 truncate"
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
          <p className="font-display text-lg font-semibold text-paper">AI MARK</p>
          <p className="mt-1 font-mono text-[8px] tracking-widest uppercase opacity-80">
            {isRu ? "айдентика" : "identity"}
          </p>
        </div>
      </div>
    );
  }
  if (kind === "product") {
    return (
      <div className={base}>
        <div className="w-full max-w-[130px] space-y-1">
          <div className="flex items-center justify-between border-b border-line pb-1 font-mono text-[8px] opacity-75">
            <span>app.workspace</span>
            <span className="text-mark">v2.4</span>
          </div>
          <div className="h-1.5 w-full rounded bg-mark/30" />
          <div className="h-1.5 w-4/5 rounded bg-line" />
        </div>
      </div>
    );
  }
  if (kind === "ai") {
    return (
      <div className={base}>
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-mark animate-pulse" />
            <span className="h-2 w-2 rounded-full bg-warm animate-pulse" />
            <span className="h-2 w-2 rounded-full bg-mark-light animate-pulse" />
          </div>
          <span className="font-mono text-[9px] text-paper font-semibold">AI Agents Loop</span>
        </div>
      </div>
    );
  }
  if (kind === "funnel") {
    return (
      <div className={base}>
        <div className="w-full max-w-[130px] space-y-1">
          <div className="flex justify-between font-mono text-[8px] text-muted">
            <span>Inquiry</span>
            <span>Deal</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-warm/40 to-mark" />
        </div>
      </div>
    );
  }
  return (
    <div className={base}>
      <div className="text-center font-mono text-[9px] text-mark font-semibold">
        <span>+ Scale & Network</span>
      </div>
    </div>
  );
}

export function IdeaToBusiness({ locale }: { locale: Locale }) {
  const isRu = locale === "ru";
  const data = COPY[locale] ?? COPY.ru;
  const stages = data.stages;
  const [active, setActive] = useState<number>(0);
  const total = stages.length;
  const current = stages[active];

  const stripRef = useRef<HTMLDivElement>(null);

  const scrollStrip = (direction: "left" | "right") => {
    if (stripRef.current) {
      const offset = direction === "left" ? -220 : 220;
      stripRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const nextStage = () => setActive((prev) => (prev + 1) % total);
  const prevStage = () => setActive((prev) => (prev === 0 ? total - 1 : prev - 1));

  return (
    <section id="contour" className="relative scroll-mt-24 border-b border-line bg-ink py-16 sm:py-24">
      {/* Background radial accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl"
        style={{
          background: `radial-gradient(circle, color-mix(in srgb, ${accent(active)} 20%, transparent), transparent 70%)`,
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl" data-reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase font-semibold">
            {data.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-paper">
            {data.title}
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed">
            {data.lead}
          </p>
        </div>

        {/* Horizontal Stage Strip (inspired by AuswandernHilft flag strip) */}
        <div className="mt-10">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="font-mono text-[10px] text-warm uppercase tracking-wider">
              {isRu ? "Выберите этап контура (01–08):" : "Select Contour Stage (01–08):"}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollStrip("left")}
                aria-label="Scroll stages left"
                className="grid h-7 w-7 place-items-center rounded-full border border-line bg-ink-2 text-xs text-paper hover:bg-ink-3"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => scrollStrip("right")}
                aria-label="Scroll stages right"
                className="grid h-7 w-7 place-items-center rounded-full border border-line bg-ink-2 text-xs text-paper hover:bg-ink-3"
              >
                ›
              </button>
            </div>
          </div>

          <div
            ref={stripRef}
            className="flex items-center gap-2 overflow-x-auto pb-2 scroll-smooth no-scrollbar"
          >
            {stages.map((stg, i) => (
              <button
                key={stg.title}
                type="button"
                onClick={() => setActive(i)}
                className={`group flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium transition-all ${
                  active === i
                    ? "bg-mark text-mark-ink shadow-md font-semibold"
                    : "border border-line bg-ink-2 text-muted hover:border-paper/40 hover:text-paper"
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">{stg.kicker}</span>
                <span className="whitespace-nowrap">{stg.title}</span>
                {active === i ? <span className="h-1.5 w-1.5 rounded-full bg-mark-ink" /> : null}
              </button>
            ))}
          </div>
        </div>

        {/* Stage Interactive Viewport Card */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-ink-2 p-6 sm:p-8 shadow-xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Left Detail Side */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-xs font-semibold px-2 py-0.5 rounded"
                    style={{ backgroundColor: `color-mix(in srgb, ${accent(active)} 20%, transparent)`, color: accent(active) }}
                  >
                    STAGE {String(active + 1).padStart(2, "0")} / 08 · {current.kicker}
                  </span>
                  <span className="font-mono text-[10px] text-muted uppercase">
                    {isRu ? "Единый контур" : "Integrated Contour"}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-paper leading-tight">
                  {current.title}
                </h3>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted">
                  {current.body}
                </p>

                {/* Plain language artifact interpretation */}
                <div className="mt-5 rounded-xl border border-line/80 bg-ink-3/40 p-4">
                  <p className="font-mono text-[10px] uppercase text-warm font-semibold">
                    {isRu ? "Результат этапа:" : "Stage Deliverable:"}
                  </p>
                  <p className="mt-1 text-xs text-paper/90 font-medium leading-relaxed">
                    {ARTIFACT_CAPTION[locale]?.[current.artifact] ?? current.body}
                  </p>
                </div>
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center gap-3 pt-4 border-t border-line">
                <button
                  type="button"
                  onClick={prevStage}
                  className="rounded-full border border-line bg-ink-3/50 px-4 py-2 text-xs font-medium text-paper hover:bg-ink-3 transition-colors"
                >
                  ← {isRu ? "Предыдущий шаг" : "Previous"}
                </button>
                <button
                  type="button"
                  onClick={nextStage}
                  className="rounded-full bg-mark px-5 py-2 text-xs font-semibold text-mark-ink hover:bg-mark-light transition-all shadow"
                >
                  {isRu ? "Следующий шаг" : "Next step"} →
                </button>
                <ContactCta className="ml-auto text-xs font-mono text-mark hover:underline">
                  {isRu ? "Обсудить проект →" : "Discuss scope →"}
                </ContactCta>
              </div>
            </div>

            {/* Right Visual Side: Constrained, Safe-Margin Diagram with Artifact */}
            <div className="relative mx-auto flex h-[280px] w-full max-w-[320px] sm:h-[320px] sm:max-w-[360px] items-center justify-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
                <circle
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="none"
                  stroke="var(--line-strong)"
                  strokeWidth="0.5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="none"
                  stroke={accent(active)}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * RADIUS}
                  strokeDashoffset={2 * Math.PI * RADIUS * (1 - (active + 1) / total)}
                  transform="rotate(-90 50 50)"
                  style={{ transition: "stroke-dashoffset 600ms cubic-bezier(0.16,1,0.3,1), stroke 600ms ease" }}
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
                      strokeWidth={on ? 0.7 : 0.3}
                      style={{ transition: "stroke 400ms ease" }}
                    />
                  );
                })}
              </svg>

              {/* Center Artifact Window */}
              <div
                className="relative z-10 h-28 w-28 sm:h-32 sm:w-32"
                style={{ color: accent(active) }}
              >
                <Artifact kind={current.artifact} locale={locale} />
              </div>

              {/* Safe Satellite Nodes: positioned strictly inside the stage */}
              {stages.map((s, i) => {
                const p = nodePos(i, total);
                const on = i <= active;
                return (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Jump to stage ${i + 1}: ${s.title}`}
                    className={`absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-[10px] font-mono transition-all duration-300 ${
                      on
                        ? "text-mark-ink font-bold shadow-md scale-110"
                        : "border-line bg-ink-2 text-muted hover:border-paper/40 hover:text-paper"
                    }`}
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      ...(on
                        ? {
                            backgroundColor: accent(i),
                            borderColor: accent(i),
                            boxShadow: `0 0 0 3px color-mix(in srgb, ${accent(i)} 25%, transparent)`,
                          }
                        : {}),
                    }}
                  >
                    {i === 0 ? "◦" : i}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Compact Grid of all 8 Stages — Always clean and readable without infinite vertical scroll */}
        <div className="mt-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-warm mb-4">
            {isRu ? "Сквозной обзор всех 8 этапов:" : "Full 8-Stage Overview:"}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setActive(i)}
                className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 ${
                  active === i
                    ? "border-mark/70 bg-ink-3/70 shadow-sm"
                    : "border-line bg-ink-2/80 hover:border-line-strong hover:bg-ink-2"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold text-warm">{s.kicker}</span>
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: active === i ? accent(i) : "var(--line-strong)" }}
                    />
                  </div>
                  <h4 className="mt-2 font-display text-sm font-semibold text-paper leading-snug">
                    {s.title}
                  </h4>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-line/40 flex items-center justify-between text-[10px] font-mono text-muted">
                  <span>STEP 0{i + 1}</span>
                  <span className={active === i ? "text-mark font-bold" : "text-muted"}>
                    {active === i ? "● Активен" : "→"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
