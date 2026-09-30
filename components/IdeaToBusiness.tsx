"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Locale } from "@/lib/site";
import { getIdeaToBusinessCopy, type IdeaToBusinessCopy } from "@/content/sections";

/**
 * Pinned narrative scene: "An idea enters the system and becomes a working
 * business." The section is tall; the inner panel is sticky. As the visitor
 * scrolls, stages activate in sequence and the system diagram constructs
 * itself. Under reduced-motion the whole thing renders as a static grid.
 */

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

const ARTIFACT_LABEL_FALLBACK: Record<string, string> = {
  bars: "demand · competitors",
  product: "workspaces · quoting",
  ai: "RAG · agents",
  funnel: "inquiries → deals",
  growth: "metrics · network",
};

function Artifact({
  kind,
  sectionCopy,
}: {
  kind: string;
  sectionCopy: IdeaToBusinessCopy;
}) {
  const label =
    sectionCopy.artifactLabel[kind as keyof typeof sectionCopy.artifactLabel] ??
    ARTIFACT_LABEL_FALLBACK[kind] ??
    "";
  const base =
    "stage-enter flex h-full w-full items-center justify-center rounded-xl border border-line/70 bg-ink-2 p-3";
  if (kind === "seed") {
    return (
      <div className={base}>
        <div className="flex items-center gap-2">
          <span className="relative grid h-3 w-3 place-items-center rounded-full bg-warm text-warm pulse-ring" />
          <span className="font-mono text-[10px] opacity-75">{sectionCopy.artifactMicro.seed}</span>
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
          {sectionCopy.artifactGrid.map((t) => (
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
          <p className="font-display text-2xl font-semibold text-paper">AI MARK</p>
          <p className="mt-1 font-mono text-[9px] tracking-widest uppercase opacity-80">
            {sectionCopy.artifactBrandSubtitle}
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
  const copy = getIdeaToBusinessCopy(locale);
  const stages = copy.stages;
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const total = stages.length;

  useEffect(() => {
    /* Reduced motion: no pin and no stage sequence — the static panel plus the
       stage overview below carry the story. Set directly (not on a frame) so
       the tall pinned track never appears for these visitors. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      /* Deferred to a microtask (not a frame) so it lands before paint without
         being a synchronous setState inside the effect body. */
      queueMicrotask(() => {
        setReduced(true);
        setActive(total - 1);
      });
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      /* The panel is pinned for exactly its own height, so the pin distance is
         measured from the panel — not from window.innerHeight. */
      const panelH = panelRef.current?.getBoundingClientRect().height || window.innerHeight;
      const scrollable = rect.height - panelH;
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

  const jumpToStage = (i: number) => {
    setActive(i);
    const el = sectionRef.current;
    if (!el || reduced) return;
    const panelH = panelRef.current?.getBoundingClientRect().height || window.innerHeight;
    const rect = el.getBoundingClientRect();
    const scrollable = rect.height - panelH;
    if (scrollable <= 0) return;
    const targetScrollY = window.scrollY + rect.top + (i / Math.max(1, total - 1)) * scrollable;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  const current = stages[active];
  const slotClass = "itb-slot relative w-full flex items-center justify-center py-2 sm:py-4";

  return (
    <>
    <section
      ref={sectionRef}
      id="idea-to-business"
      className={`relative border-t border-line bg-ink-3/20 ${reduced ? "itb-static" : "itb-track"}`}
      style={{ "--itb-stages": total } as CSSProperties}
    >
      <div
        ref={panelRef}
        className={`flex items-center ${
          reduced ? "relative" : "itb-panel sticky top-0"
        }`}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col px-4 pt-20 pb-16 sm:px-6 sm:pb-20 lg:h-full lg:pb-[72px]">
          <div className="shrink-0" data-reveal>
            <p className="font-mono text-[11px] tracking-[0.2em] text-mark uppercase sm:text-xs">
              {copy.eyebrow}
            </p>
            <h1 className="mt-2 font-display text-2xl leading-[1.05] font-medium tracking-tight sm:text-3xl lg:mt-3 lg:text-4xl xl:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-3 hidden max-w-2xl text-muted [@media(min-height:680px)]:block lg:text-base">
              {copy.lead}
            </p>
          </div>

          <div className="mt-4 grid content-start gap-6 sm:mt-6 lg:min-h-0 lg:flex-1 lg:content-stretch lg:grid-cols-[1fr_1.05fr] lg:gap-12">
            {/* Narrative column */}
            <div data-itb-copy className="order-2 flex min-h-0 flex-col justify-center lg:order-1">
              <div className="flex items-center gap-3">
                <span
                  className="font-editorial text-3xl italic transition-colors duration-500 [@media(max-height:600px)]:text-2xl sm:text-4xl lg:text-5xl xl:text-6xl"
                  style={{ color: accent(active) }}
                >
                  {String(active).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-line" />
                <span className="font-mono text-[10px] tracking-widest text-muted uppercase lg:text-[11px]">
                  {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>

              <div key={active} className="stage-enter mt-3 lg:mt-6">
                <p className="font-mono text-[11px] tracking-widest text-warm uppercase lg:text-xs">
                  {current.kicker}
                </p>
                <h3 className="mt-1.5 font-display text-lg font-semibold text-paper sm:text-xl lg:mt-2 lg:text-2xl xl:text-3xl">
                  {current.title}
                </h3>
                <div className="hidden [@media(min-height:620px)]:block">
                  <p className="mt-2 line-clamp-2 max-w-md text-xs leading-relaxed text-muted lg:mt-3 lg:line-clamp-none lg:text-sm">
                    {current.body}
                  </p>
                </div>
              </div>

              {/* Progress rail */}
              <div className="mt-4 flex gap-1.5 pr-16 [@media(max-height:560px)]:hidden min-[761px]:pr-0 lg:mt-8">
                {stages.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => jumpToStage(i)}
                    className="flex-1 cursor-pointer py-1 group"
                    aria-label={`Jump to stage ${i}: ${s.title}`}
                  >
                    <span className="block h-[3px] overflow-hidden rounded-full bg-ink-3 group-hover:bg-line-strong transition-colors">
                      <span
                        className="block h-full rounded-full transition-transform duration-500 ease-out"
                        style={{
                          transform: `scaleX(${i <= active ? 1 : 0})`,
                          backgroundColor: accent(i),
                        }}
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* System diagram */}
            <div className="order-1 flex min-h-0 flex-col lg:order-2">
              <div className={slotClass}>
                <div data-itb-dial className="itb-dial relative mx-auto">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 opacity-60 blur-2xl transition-all duration-700"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, color-mix(in srgb, ${accent(active)} 26%, transparent), transparent 68%)`,
                  }}
                />
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="amRing" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="var(--mark)" />
                      <stop offset="50%" stopColor="var(--warm)" />
                      <stop offset="100%" stopColor="var(--mark-light)" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r={RADIUS}
                    fill="none"
                    stroke="var(--line-strong)"
                    strokeWidth="0.3"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={RADIUS}
                    fill="none"
                    stroke="url(#amRing)"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * RADIUS}
                    strokeDashoffset={2 * Math.PI * RADIUS * (1 - (active + 1) / total)}
                    transform="rotate(-90 50 50)"
                    style={{ transition: "stroke-dashoffset 700ms cubic-bezier(0.16,1,0.3,1)" }}
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
                <div className="absolute left-1/2 top-1/2 h-[34%] w-[34%] min-h-[86px] min-w-[86px] -translate-x-1/2 -translate-y-1/2" style={{ color: accent(active) }}>
                  <Artifact kind={current.artifact} sectionCopy={copy} />
                </div>

                {/* Satellite nodes — clean glowing badges around the dial ring, zero label collision */}
                {stages.map((s, i) => {
                  const p = nodePos(i, total);
                  const on = i <= active;
                  const isCurrent = i === active;
                  return (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => jumpToStage(i)}
                      className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center cursor-pointer group transition-all"
                      style={{ left: `${p.x}%`, top: `${p.y}%` } as CSSProperties}
                      aria-label={`Stage ${i}: ${s.title}`}
                      title={`${String(i).padStart(2, "0")} — ${s.title}`}
                    >
                      <span
                        className={`grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full border text-[10px] sm:text-xs font-mono font-medium transition-all duration-300 ${
                          on
                            ? "text-mark-ink font-semibold"
                            : "border-line bg-ink-2 text-muted group-hover:border-paper/40 group-hover:text-paper"
                        }`}
                        style={
                          on
                            ? {
                                backgroundColor: accent(i),
                                borderColor: accent(i),
                                boxShadow: isCurrent
                                  ? `0 0 0 5px color-mix(in srgb, ${accent(i)} 24%, transparent), 0 0 14px ${accent(i)}`
                                  : `0 0 0 2px color-mix(in srgb, ${accent(i)} 20%, transparent)`,
                                transform: isCurrent ? "scale(1.15)" : "scale(1)",
                              }
                            : undefined
                        }
                      >
                        {String(i).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
                </div>
              </div>

              {/* What the artifact means — always spelled out */}
              <div
                key={`card-${active}`}
                data-itb-card
                className="itb-caption stage-enter relative z-10 mx-auto mt-4 hidden w-full max-w-[460px] shrink-0 items-start gap-2.5 rounded-xl border border-line bg-ink-2 px-3 py-2 lg:mt-4 lg:flex lg:gap-3 lg:px-4 lg:py-2.5"
              >
                <span
                  className="mt-0.5 font-mono text-[10px]"
                  style={{ color: accent(active) }}
                >
                  {String(active).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-[11px] font-semibold text-paper lg:text-xs">
                    {current.title}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[10px] leading-relaxed text-muted lg:text-[11px]">
                    {copy.artifactCaption[current.artifact as keyof typeof copy.artifactCaption] ??
                      current.body}
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
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase" data-reveal>
          {copy.stagesOverviewTitle}
        </p>
        <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
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
