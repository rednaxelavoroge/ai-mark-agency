import type { CSSProperties, ReactNode } from "react";
import { LiveNumber, LiveType } from "./Live";

/**
 * AI MARK proprietary product-UI mockups.
 *
 * These are rendered entirely in HTML/CSS — no borrowed screenshots — so the
 * visuals stay on-brand and free of any third-party branding. They are plain
 * server components; motion comes from the global reveal engine in
 * `components/Motion.tsx` plus the `.ui-*` / `.flow-*` primitives in globals.css.
 */

export type ProductVariant =
  | "aime"
  | "assistant"
  | "showroom"
  | "saas"
  | "portal"
  | "ecommerce"
  | "ai";

const chromeDots = (
  <span className="flex items-center gap-1.5">
    <span className="h-2.5 w-2.5 rounded-full bg-[#e0857a]/70" />
    <span className="h-2.5 w-2.5 rounded-full bg-[#d9b06a]/70" />
    <span className="h-2.5 w-2.5 rounded-full bg-[#8fae7c]/70" />
  </span>
);

export function UIFrame({
  children,
  url = "app.ai-mark.agency",
  className = "",
  ratio = "aspect-[16/10]",
  peek = false,
}: {
  children: ReactNode;
  url?: string;
  className?: string;
  ratio?: string;
  /**
   * Catalog mode: several mocks are taller than the frame, so instead of a
   * hard crop we fade the lower edge and let the surface scroll up on hover.
   * The host element drives it — add `peek-host` to the surrounding card.
   */
  peek?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-lg ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line bg-ink-3/60 px-4 py-2.5">
        {chromeDots}
        <span className="ml-1 hidden truncate rounded-md border border-line bg-ink-2 px-2.5 py-1 font-mono text-[10px] text-muted sm:block">
          {url}
        </span>
        <span className="ml-auto font-mono text-[10px] tracking-wide text-muted uppercase">
          Example
        </span>
      </div>
      <div className={`relative isolate overflow-hidden ${ratio}`}>
        <div
          aria-hidden
          className="scanline pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-transparent via-mark/10 to-transparent"
        />
        {peek ? (
          <div className="peek-frame absolute inset-0">
            <div className="peek-body h-full">{children}</div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

function Bar({
  h,
  delay,
  className = "",
}: {
  h: number;
  delay: number;
  className?: string;
}) {
  return (
    <span
      className={`ui-bar block w-full max-w-[16px] rounded-t-[3px] bg-gradient-to-t from-mark/60 to-mark ${className}`}
      style={{ height: `${h}%`, "--h": h / 100, "--bar-delay": `${delay}ms` } as CSSProperties}
    />
  );
}

function Dot({ tone = "mark" }: { tone?: "mark" | "warm" | "emerald" }) {
  const map = {
    mark: "bg-mark",
    warm: "bg-warm",
    emerald: "bg-emerald-500",
  } as const;
  return <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${map[tone]}`} />;
}

function Line({ label, value, tone = "mark" }: { label: string; value: ReactNode; tone?: "mark" | "warm" | "emerald" }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-line/70 bg-ink-2 px-2.5 py-1">
      <span className="flex items-center gap-1.5 font-mono text-[9px] text-muted">
        <Dot tone={tone} />
        {label}
      </span>
      <span className="font-mono text-[9px] font-semibold text-paper">{value}</span>
    </div>
  );
}

function Chip({
  children,
  active = false,
  className = "",
}: {
  children: ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`rounded-full px-2 py-[3px] font-mono text-[8px] whitespace-nowrap ${
        active
          ? "bg-mark font-semibold text-mark-ink shadow-sm"
          : "border border-line/70 text-muted"
      } ${className}`}
    >
      {children}
    </span>
  );
}

/** Tiny status chip used in tables — smaller than `Line`, denser than a chip. */
function Pill({
  children,
  tone = "mark",
}: {
  children: ReactNode;
  tone?: "mark" | "warm" | "emerald";
}) {
  const map = {
    mark: "border-mark/25 bg-mark/5 text-mark",
    warm: "border-warm/30 bg-warm/10 text-warm",
    emerald: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700",
  } as const;
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border px-1.5 py-[1px] font-mono text-[7px] font-semibold whitespace-nowrap ${map[tone]}`}
    >
      {children}
    </span>
  );
}

/** Micro sparkline. Draws itself when an ancestor reveal fires. */
function Spark({ points, className = "" }: { points: number[]; className?: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const d = points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"}${((i / (points.length - 1)) * 100).toFixed(1)} ${(
          26 -
          ((p - min) / span) * 22
        ).toFixed(1)}`,
    )
    .join(" ");
  return (
    <svg
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      className={className}
      fill="none"
      aria-hidden
    >
      <path
        className="flow-line"
        style={{ "--len": 220, "--reveal-delay": "260ms" } as CSSProperties}
        d={d}
        stroke="var(--mark)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ AIME */

function AimeMock() {
  const channels = ["Instagram", "Facebook", "Threads", "Telegram"];
  return (
    <div className="grid h-full grid-cols-[34%_66%] bg-ink-3/30 text-paper">
      <div className="flex flex-col gap-3 border-r border-line/70 p-3">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-mark text-[9px] font-bold text-mark-ink">
            AM
          </span>
          <div className="leading-tight">
            <p className="font-display text-[10px] font-semibold">AI Marketing Employee</p>
            <p className="font-mono text-[8px] text-muted">research → publish loop</p>
          </div>
        </div>
        <div className="space-y-1">
          {["Research", "Content plan", "Drafts", "Approval", "Published", "Analytics"].map(
            (s, i) => (
              <div
                key={s}
                className={`flex items-center justify-between rounded-md px-2 py-1.5 font-mono text-[9px] ${
                  i === 3 ? "bg-mark/10 text-mark" : "text-muted"
                }`}
              >
                <span>{s}</span>
                {i === 3 ? <Dot tone="warm" /> : null}
              </div>
            ),
          )}
        </div>
        <div className="mt-auto space-y-1">
          {channels.map((c, i) => (
            <div key={c} className="flex items-center gap-1.5 font-mono text-[8px] text-muted">
              <Dot tone={i === 3 ? "warm" : "emerald"} />
              {c}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2.5 p-3">
        <div className="flex items-center justify-between">
          <span className="font-display text-[11px] font-semibold">Content calendar · Meta</span>
          <span className="rounded-full border border-mark/20 bg-mark/5 px-2 py-0.5 font-mono text-[8px] text-mark">
            awaiting approval
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className={`h-3.5 rounded-[3px] ${
                i === 5
                  ? "bg-warm/60"
                  : i % 3 === 0
                    ? "bg-mark/35"
                    : "bg-ink-2 border border-line/60"
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-[1.4fr_1fr] gap-2">
          <div className="rounded-lg border border-line/70 bg-ink-2 p-2">
            <p className="mb-1.5 font-mono text-[8px] text-muted">ENGAGEMENT · 30d</p>
            <div className="flex h-14 items-end justify-between gap-1">
              {[38, 52, 44, 68, 60, 82, 74, 91].map((h, i) => (
                <Bar key={i} h={h} delay={i * 70} />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <Line label="Drafts" value="In review" />
            <Line
              label="Approval"
              value="Before publish"
              tone="warm"
            />
            <Line
              label="Next step"
              value="Analytics"
              tone="emerald"
            />
          </div>
        </div>

        <div className="rounded-lg border border-line/70 bg-ink-2 p-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[8px] text-muted">TELEGRAM APPROVAL</span>
            <span className="font-mono text-[8px] text-warm">human-in-the-loop</span>
          </div>
          <p className="mt-1 text-[10px] leading-snug text-paper/85">
            <LiveType text="Reels · «Kaçan für den Sommer» — Skript bereit." />
            <span className="caret ml-1 inline-block h-3 w-[2px] translate-y-0.5 bg-mark align-middle" />
          </p>
          <div className="mt-1.5 flex gap-1.5">
            <span className="rounded-full bg-mark px-2.5 py-0.5 font-mono text-[8px] font-semibold text-mark-ink">
              APPROVE
            </span>
            <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[8px] text-muted">
              EDIT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- ASSISTANT */

function AssistantMock() {
  const threads = [
    { c: "WhatsApp", t: "Konfiguration & Lieferzeit?", a: 2 },
    { c: "Instagram Direct", t: "Preis für die Serie?", a: 0 },
    { c: "Telegram", t: "Rechnung für Bestellung #1042", a: 1 },
    { c: "Webchat", t: "Größe der Standardoption?", a: 0 },
  ];
  return (
    <div className="grid h-full grid-cols-[40%_60%] bg-ink-3/30 text-paper">
      <div className="flex flex-col border-r border-line/70">
        <div className="flex items-center justify-between border-b border-line/70 p-3">
          <span className="font-display text-[11px] font-semibold">Unified inbox</span>
          <span className="flex items-center gap-1 font-mono text-[8px] text-mark">
            <Dot tone="emerald" /> AI 24/7
          </span>
        </div>
        <div className="space-y-1 p-2">
          {threads.map((th, i) => (
            <div
              key={th.c}
              className={`rounded-lg border px-2.5 py-2 ${
                i === 0 ? "border-mark/30 bg-mark/5" : "border-transparent"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] text-warm">{th.c}</span>
                {th.a > 0 ? (
                  <span className="rounded-full bg-mark px-1.5 text-[8px] font-semibold text-mark-ink">
                    {th.a}
                  </span>
                ) : null}
              </div>
              <p className="mt-0.5 truncate text-[10px] text-paper/85">{th.t}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto border-t border-line/70 p-2.5">
          <p className="font-mono text-[8px] text-muted">KNOWLEDGE BASE · RAG</p>
          <div className="mt-1 space-y-1">
            <Line label="Catalog" value="synced" />
            <Line label="Pricing rules" value="live" tone="emerald" />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b border-line/70 px-3 py-2.5">
          <span className="font-mono text-[9px] text-muted">WhatsApp · Kunde 04</span>
          <span className="rounded-full bg-warm/15 px-2 py-0.5 font-mono text-[8px] text-warm">
            qualified lead
          </span>
        </div>
        <div className="flex-1 space-y-2 p-3">
          <div className="max-w-[80%] rounded-xl rounded-tl-sm border border-line/70 bg-ink-2 px-3 py-2 text-[10px] text-paper/85">
            Hallo! Interessiert an Konfiguration und Lieferzeit.
          </div>
          <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-mark/10 px-3 py-2 text-[10px] text-paper">
            <LiveType text="Verfügbar: Standard & erweitert ab $1.200. Zusammenbau 5–7 Werktage." />
            <span className="caret ml-1 inline-block h-3 w-[2px] translate-y-0.5 bg-mark align-middle" />
          </div>
          <div className="flex flex-wrap gap-1">
            {["Budget erfasst", "Bedarf: config", "Score 82"].map((c) => (
              <span
                key={c}
                className="rounded bg-ink-3 px-2 py-0.5 font-mono text-[8px] text-muted"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-line/70 px-3 py-2.5">
          <span className="font-mono text-[8px] text-muted">handoff in 1 click</span>
          <span className="rounded-full bg-mark px-3 py-1 font-mono text-[8px] font-semibold text-mark-ink">
            → Manager übernehmen
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ SHOWROOM */

function ShowroomMock() {
  const specs = [
    ["Multi-tenant catalog", "isolated"],
    ["Formula & rules engine", "deterministic"],
    ["Parameter configurator", "active"],
    ["Spec & price validation", "0 errors"],
    ["PDF quote generator", "instant"],
    ["CRM / manager handoff", "synced"],
  ];
  return (
    <div className="grid h-full grid-cols-[56%_44%] bg-ink-3/30 text-paper">
      <div className="flex flex-col gap-2 border-r border-line/70 p-3">
        <div className="flex items-center justify-between">
          <span className="font-display text-[11px] font-semibold">Showroom.pro Core</span>
          <span className="flex items-center gap-1 font-mono text-[8px] text-mark">
            <Dot tone="emerald" /> v2.4
          </span>
        </div>
        <div className="space-y-1">
          {specs.map(([k, v], i) => (
            <div
              key={k}
              className="flex items-center justify-between rounded-md border border-line/70 bg-ink-2 px-2 py-1.5"
              style={{ "--reveal-delay": `${i * 60}ms` } as CSSProperties}
            >
              <span className="flex items-center gap-1.5 font-mono text-[9px] text-paper/85">
                <span className="font-mono text-[8px] text-warm">{String(i + 1).padStart(2, "0")}</span>
                {k}
              </span>
              <span className="font-mono text-[8px] text-muted">{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-lg border border-line/70 bg-ink-2 p-2">
          <p className="font-mono text-[8px] text-muted">CUSTOMER REQUEST → PDF</p>
          <svg viewBox="0 0 240 34" className="mt-1 h-9 w-full">
            <path
              className="flow-line"
              style={{ "--len": 360, "--reveal-delay": "200ms" } as CSSProperties}
              d="M2 26 C40 26, 40 8, 78 8 S120 26 156 26 S200 6 238 6"
              fill="none"
              stroke="var(--mark)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              className="flow-dash"
              d="M2 26 C40 26, 40 8, 78 8 S120 26 156 26 S200 6 238 6"
              fill="none"
              stroke="var(--warm)"
              strokeWidth="1"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <div className="rounded-lg border border-line/70 bg-ink-2 p-2.5">
          <p className="font-mono text-[8px] text-muted">CONFIGURATION</p>
          <div className="mt-1.5 space-y-1.5">
            {[
              ["Material", 0.7],
              ["Dimensions", 0.45],
              ["Finish", 0.85],
              ["Extras", 0.3],
            ].map(([label, v], i) => (
              <div key={label as string}>
                <div className="flex justify-between font-mono text-[8px] text-muted">
                  <span>{label}</span>
                  <span>{Math.round((v as number) * 100)}%</span>
                </div>
                <span className="mt-0.5 block h-1 overflow-hidden rounded-full bg-ink-3">
                  <span
                    className="ui-grow block h-full rounded-full bg-mark"
                    style={
                      {
                        width: `${(v as number) * 100}%`,
                        "--bar-delay": `${i * 110}ms`,
                      } as CSSProperties
                    }
                  />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-line/70 bg-ink-2 p-2.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[8px] text-muted">COMMERCIAL OFFER</span>
            <span className="font-mono text-[8px] text-warm">PDF</span>
          </div>
          <p className="mt-1 font-display text-lg font-bold text-paper">Draft</p>
          <p className="font-mono text-[8px] text-muted">incl. assembly · valid 14 days</p>
          <div className="mt-2 space-y-1 border-t border-line/60 pt-2">
            <Line label="Spec lines" value="24" />
            <Line label="Margin" value="on target" tone="emerald" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------ DIGITAL PRODUCTION SET */

function SaasMock() {
  const tenants = [
    { n: "Workspace A", plan: "Scale", seats: "—", mrr: "Sample", state: "example", tone: "emerald" as const },
    { n: "Workspace B", plan: "Growth", seats: "—", mrr: "Sample", state: "example", tone: "emerald" as const },
    { n: "Workspace C", plan: "Starter", seats: "—", mrr: "Sample", state: "trial", tone: "warm" as const },
    { n: "Workspace D", plan: "Scale", seats: "—", mrr: "Sample", state: "example", tone: "emerald" as const },
  ];
  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden bg-ink-3/30 p-3 text-paper">
      {/* Toolbar: console identity + section tabs */}
      <div className="flex items-center gap-2">
        <span className="font-display text-[11px] font-semibold whitespace-nowrap">
          Operational console
        </span>
        <span className="ml-auto flex items-center gap-0.5 rounded-full border border-line/70 bg-ink-2 p-0.5">
          {["overview", "tenants", "billing", "audit"].map((tab, i) => (
            <span
              key={tab}
              className={`rounded-full px-2 py-[3px] font-mono text-[8px] whitespace-nowrap ${
                i === 0 ? "bg-mark font-semibold text-mark-ink" : "text-muted"
              }`}
            >
              {tab}
            </span>
          ))}
        </span>
      </div>

      {/* KPI strip: value, delta chip and a micro trend line */}
      <div className="grid grid-cols-4 gap-1.5">
        {[
          {
            k: "Billing",
            v: "Sample",
            d: "Example",
            tone: "emerald" as const,
            spark: [18, 22, 20, 27, 25, 32, 30, 38],
          },
          {
            k: "Seats",
            v: "Sample",
            d: "Example",
            tone: "emerald" as const,
            spark: [12, 15, 14, 19, 23, 21, 27, 31],
          },
          {
            k: "Status",
            v: "Sketch",
            d: "Example",
            tone: "mark" as const,
            spark: [30, 29, 30, 28, 30, 30, 29, 30],
          },
          {
            k: "Health",
            v: "Sketch",
            d: "Example",
            tone: "warm" as const,
            spark: [27, 25, 26, 22, 19, 20, 16, 13],
          },
        ].map(({ k, v, d, tone, spark }, i) => (
          <div
            key={k}
            className="rounded-lg border border-line/70 bg-ink-2 px-2 py-1 transition-colors hover:border-line-strong"
            style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
          >
            <p className="font-mono text-[7px] tracking-wide text-muted">{k}</p>
            <p className="font-display text-[12px] leading-tight font-semibold">{v}</p>
            <div className="mt-0.5 flex items-center justify-between gap-1">
              <Pill tone={tone}>{d}</Pill>
              <Spark points={spark} className="h-3.5 w-8 shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {/* Body: usage + tenants on the left, platform health rail on the right */}
      <div className="grid min-h-0 flex-1 grid-cols-[1.6fr_1fr] gap-2">
        <div className="flex min-h-0 flex-col gap-2">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-line/70 bg-ink-2 p-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[7px] tracking-wide text-muted">
                USAGE · API CALLS / WEEK
              </span>
              <span className="flex items-center gap-1 font-mono text-[7px] text-mark">
                <Dot tone="emerald" /> example
              </span>
            </div>
            <div className="mt-1.5 flex min-h-0 flex-1 items-end justify-between gap-1 overflow-hidden">
              {[30, 42, 38, 55, 62, 58, 74, 70, 84, 79, 92, 88].map((h, i) => (
                <Bar key={i} h={h} delay={i * 55} />
              ))}
            </div>
            <div className="mt-1 flex justify-between font-mono text-[7px] text-muted">
              <span>W1</span>
              <span>W6</span>
              <span>W12</span>
            </div>
          </div>

          <div className="shrink-0 overflow-hidden rounded-lg border border-line/70 bg-ink-2">
            <div className="grid grid-cols-[1.6fr_0.8fr_0.55fr_0.7fr_0.6fr] items-center gap-1 border-b border-line/70 px-2.5 py-1 font-mono text-[7px] tracking-wide text-muted">
              <span>WORKSPACE</span>
              <span>PLAN</span>
              <span className="text-right">SEATS</span>
              <span className="text-right">MRR</span>
              <span className="text-right">STATE</span>
            </div>
            {tenants.map((t, i) => (
              <div
                key={t.n}
                className="group/row grid grid-cols-[1.6fr_0.8fr_0.55fr_0.7fr_0.6fr] items-center gap-1 border-b border-line/40 px-2.5 py-1.5 text-[9px] transition-colors last:border-b-0 hover:bg-ink-3/60"
                style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
              >
                <span className="flex min-w-0 items-center gap-1.5">
                  <Dot tone={t.tone === "emerald" ? "emerald" : "warm"} />
                  <span className="truncate transition-colors group-hover/row:text-mark">
                    {t.n}
                  </span>
                </span>
                <span className="font-mono text-[8px] text-muted">{t.plan}</span>
                <span className="text-right font-mono text-[8px]">{t.seats}</span>
                <span className="text-right font-mono text-[8px]">{t.mrr}</span>
                <span className="flex justify-end">
                  <Pill tone={t.tone}>{t.state}</Pill>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-1">
          <Line label="API latency" value="112ms" />
          <Line label="Error rate" value="0.02%" tone="emerald" />
          <Line label="Deploys / day" value="6" tone="warm" />
          <div className="shrink-0 rounded-md border border-line/70 bg-ink-2 px-2 py-1.5">
            <p className="font-mono text-[7px] tracking-wide text-muted">ROLES</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {["owner", "admin", "ops", "client"].map((r) => (
                <span
                  key={r}
                  className="rounded bg-ink-3 px-1.5 py-0.5 font-mono text-[7px] text-muted"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-line/70 bg-ink-2 px-2 py-1.5">
            <p className="font-mono text-[7px] tracking-wide text-muted">RECENT DEPLOYS</p>
            <div className="mt-1 space-y-1">
              {[
                ["v2.4.1", "12m", "emerald"],
                ["v2.4.0", "2h", "emerald"],
                ["v2.3.9", "1d", "warm"],
              ].map(([tag, ago, tone]) => (
                <div key={tag} className="flex items-center gap-1.5 font-mono text-[7px]">
                  <Dot tone={tone === "emerald" ? "emerald" : "warm"} />
                  <span className="text-paper/85">{tag}</span>
                  <span className="ml-auto text-muted">{ago}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compliance footer */}
      <div className="flex items-center justify-between gap-2 rounded-lg border border-line/70 bg-ink-2 px-2.5 py-1.5">
        <span className="truncate font-mono text-[7px] text-muted">
          SSO · SCIM · audit log · webhooks
        </span>
        <span className="flex shrink-0 items-center gap-2 font-mono text-[7px]">
          <span className="text-muted">region eu-central</span>
          <span className="flex items-center gap-1 font-semibold text-emerald-700">
            <Dot tone="emerald" /> SOC 2 ready
          </span>
        </span>
      </div>
    </div>
  );
}

function PortalMock() {
  const orders = [
    {
      id: "#1042",
      stage: "In production",
      progress: 0.72,
      eta: "12 Mar",
      value: "$12,480",
      state: "on track",
      tone: "emerald" as const,
    },
    {
      id: "#1041",
      stage: "Quote sent",
      progress: 0.34,
      eta: "awaiting",
      value: "$3,920",
      state: "approval",
      tone: "warm" as const,
    },
    {
      id: "#1038",
      stage: "Approved",
      progress: 0.55,
      eta: "18 Mar",
      value: "$8,140",
      state: "scheduled",
      tone: "mark" as const,
    },
    {
      id: "#1035",
      stage: "Delivered",
      progress: 1,
      eta: "done",
      value: "$1,260",
      state: "closed",
      tone: "emerald" as const,
    },
  ];
  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden bg-ink-3/30 p-3 text-paper">
      {/* Toolbar: workspace + account switcher */}
      <div className="flex items-center gap-2">
        <span className="font-display text-[11px] font-semibold whitespace-nowrap">
          Client workspace
        </span>
        <span className="ml-auto flex items-center gap-1 rounded-full border border-line/70 bg-ink-2 px-2 py-[3px] font-mono text-[8px] text-paper">
          <span className="h-3.5 w-3.5 place-items-center rounded-full bg-mark text-center text-[7px] leading-[14px] text-mark-ink">
            A
          </span>
          Atelier Nord
          <span className="text-muted">▾</span>
        </span>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-4 gap-1.5">
        {[
          {
            k: "Open orders",
            v: <LiveNumber value={12} />,
            d: "3 due",
            tone: "warm" as const,
            spark: [14, 18, 16, 22, 20, 25, 23, 28],
          },
          {
            k: "Awaiting approval",
            v: <LiveNumber value={3} />,
            d: "action",
            tone: "warm" as const,
            spark: [24, 22, 26, 20, 22, 17, 19, 15],
          },
          {
            k: "Avg. cycle",
            v: <LiveNumber value={4.2} decimals={1} suffix=" d" />,
            d: "−0.6",
            tone: "emerald" as const,
            spark: [28, 26, 27, 23, 21, 20, 17, 14],
          },
          {
            k: "On-time",
            v: <LiveNumber value={96} suffix="%" />,
            d: "+2.1",
            tone: "emerald" as const,
            spark: [16, 19, 18, 23, 25, 24, 28, 30],
          },
        ].map(({ k, v, d, tone, spark }, i) => (
          <div
            key={k}
            className="rounded-lg border border-line/70 bg-ink-2 px-2 py-1 transition-colors hover:border-line-strong"
            style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
          >
            <p className="truncate font-mono text-[7px] tracking-wide text-muted">{k}</p>
            <p className="font-display text-[12px] leading-tight font-semibold">{v}</p>
            <div className="mt-0.5 flex items-center justify-between gap-1">
              <Pill tone={tone}>{d}</Pill>
              <Spark points={spark} className="h-3.5 w-8 shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {/* Orders: stage progress + value, mirrors the shop card grid */}
      <div className="overflow-hidden rounded-lg border border-line/70 bg-ink-2">
        <div className="grid grid-cols-[0.6fr_1.5fr_0.6fr_0.7fr_0.7fr] items-center gap-1 border-b border-line/70 px-2.5 py-1 font-mono text-[7px] tracking-wide text-muted">
          <span>ORDER</span>
          <span>STAGE</span>
          <span className="text-right">ETA</span>
          <span className="text-right">VALUE</span>
          <span className="text-right">STATE</span>
        </div>
        {orders.map((o, i) => (
          <div
            key={o.id}
            className="group/row grid grid-cols-[0.6fr_1.5fr_0.6fr_0.7fr_0.7fr] items-center gap-1 border-b border-line/40 px-2.5 py-1.5 text-[9px] transition-colors last:border-b-0 hover:bg-ink-3/60"
            style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
          >
            <span className="font-mono text-[8px] text-muted transition-colors group-hover/row:text-mark">
              {o.id}
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-1.5">
                <Dot tone={o.tone === "emerald" ? "emerald" : "warm"} />
                <span className="truncate">{o.stage}</span>
              </span>
              <span className="mt-1 block h-[3px] overflow-hidden rounded-full bg-ink-3">
                <span
                  className="ui-grow block h-full rounded-full bg-gradient-to-r from-mark/70 to-mark"
                  style={
                    {
                      width: `${o.progress * 100}%`,
                      "--bar-delay": `${i * 90}ms`,
                    } as CSSProperties
                  }
                />
              </span>
            </span>
            <span className="text-right font-mono text-[8px] text-muted">{o.eta}</span>
            <span className="text-right font-mono text-[8px] font-semibold">{o.value}</span>
            <span className="flex justify-end">
              <Pill tone={o.tone}>{o.state}</Pill>
            </span>
          </div>
        ))}
      </div>

      {/* Quote volume + document pack + integration sync */}
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_1fr_0.85fr] gap-2">
        <div className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-line/70 bg-ink-2 p-2">
          <span className="font-mono text-[7px] tracking-wide text-muted">QUOTE VOLUME</span>
          <div className="mt-1.5 flex min-h-0 flex-1 items-end justify-between gap-1 overflow-hidden">
            {[40, 52, 48, 66, 72, 90, 78, 84].map((h, i) => (
              <Bar key={i} h={h} delay={i * 80} />
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-line/70 bg-ink-2 p-2">
          <span className="font-mono text-[7px] tracking-wide text-muted">DOCUMENTS</span>
          <div className="mt-1 space-y-1">
            {[
              ["Spec sheet", "PDF", true],
              ["Commercial offer", "PDF", true],
              ["Invoice #1042", "1C", false],
            ].map(([label, tag, done]) => (
              <div key={label as string} className="flex items-center justify-between gap-1">
                <span className="flex min-w-0 items-center gap-1 font-mono text-[7px] text-paper/85">
                  <span className={done ? "text-mark" : "text-muted"}>{done ? "✓" : "○"}</span>
                  <span className="truncate">{label as string}</span>
                </span>
                <span className="shrink-0 rounded bg-ink-3 px-1 font-mono text-[7px] text-muted">
                  {tag as string}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="rounded-lg border border-line/70 bg-ink-2 p-2">
            <p className="font-mono text-[7px] tracking-wide text-muted">SYNC</p>
            <div className="mt-1 space-y-1">
              {["1C:Enterprise", "CRM pipeline", "Payments"].map((s, i) => (
                <div key={s} className="flex items-center gap-1 font-mono text-[7px] text-muted">
                  <Dot tone={i === 1 ? "warm" : "emerald"} />
                  <span className="truncate">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center rounded-lg border border-mark/25 bg-mark/5 px-2 py-1.5">
            <p className="font-mono text-[7px] text-mark">NEXT MILESTONE</p>
            <p className="font-mono text-[8px] text-paper">Delivery · 12 Mar</p>
          </div>
        </div>
      </div>
    </div>
  );
}

type ThumbKind = "sofa" | "chair" | "lamp" | "table" | "bag" | "watch";

function Thumb({ kind }: { kind: ThumbKind }) {
  const paths: Record<ThumbKind, ReactNode> = {
    sofa: (
      <>
        <path d="M7 26v-7a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v7" />
        <path d="M7 26h22M10 26v4M26 26v4" />
        <path d="M10 16v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
      </>
    ),
    chair: (
      <>
        <path d="M13 9v11h10V9" />
        <path d="M12 20h12v12" />
        <path d="M13 32v3M23 32v3M12 24h12" />
      </>
    ),
    lamp: (
      <>
        <path d="M14 9h8l3 8H11z" />
        <path d="M18 17v13M12 33h12" />
      </>
    ),
    table: (
      <>
        <path d="M7 13h22" />
        <path d="M10 13v16M26 13v16M7 20h22" />
      </>
    ),
    bag: (
      <>
        <path d="M10 16h16l2 15H8z" />
        <path d="M14 16v-3a4 4 0 0 1 8 0v3" />
        <path d="M13 22h10" />
      </>
    ),
    watch: (
      <>
        <circle cx="18" cy="18" r="7" />
        <path d="M15 11.5 16 6h4l1 5.5M15 24.5 16 30h4l1-5.5" />
        <path d="M18 15v3l2 1" />
      </>
    ),
  };
  const tint: Record<ThumbKind, string> = {
    sofa: "bg-mark/12 text-mark",
    chair: "bg-warm/14 text-warm",
    lamp: "bg-ink-3 text-paper/70",
    table: "bg-mark/10 text-mark",
    bag: "bg-warm/12 text-warm",
    watch: "bg-ink-3 text-paper/70",
  };
  return (
    <span className={`group/thumb relative grid h-14 place-items-center ${tint[kind]}`}>
      <svg
        viewBox="0 0 36 36"
        className="h-8 w-8 transition-transform duration-500 group-hover/thumb:scale-110"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths[kind]}
      </svg>
      <span className="absolute right-1 top-1 rounded bg-ink-2/80 px-1 font-mono text-[7px] text-muted">
        ●
      </span>
    </span>
  );
}

function EcommerceMock() {
  const items: {
    kind: ThumbKind;
    name: string;
    cat: string;
    price: number;
    stock: string;
  }[] = [
    { kind: "sofa", name: "Modular sofa", cat: "Furniture", price: 1240, stock: "in stock" },
    { kind: "chair", name: "Oak chair", cat: "Furniture", price: 380, stock: "in stock" },
    { kind: "lamp", name: "Arc lamp", cat: "Lighting", price: 190, stock: "2 left" },
    { kind: "table", name: "Duo table", cat: "Furniture", price: 640, stock: "in stock" },
    { kind: "bag", name: "Week bag", cat: "Accessories", price: 210, stock: "in stock" },
    { kind: "watch", name: "Minimal watch", cat: "Accessories", price: 870, stock: "made to order" },
  ];
  return (
    <div className="h-full bg-ink-3/30 p-3 text-paper">
      <div className="flex items-center gap-2">
        <span className="flex-1 rounded-md border border-line/70 bg-ink-2 px-2.5 py-1.5 font-mono text-[9px] text-muted">
          ⌕ search catalog
        </span>
        <span className="rounded-md bg-mark px-2.5 py-1.5 font-mono text-[8px] font-semibold text-mark-ink">
          config
        </span>
      </div>

      <div className="mt-2 flex gap-1.5">
        {["All", "Furniture", "Lighting", "Accessories"].map((t, i) => (
          <Chip key={t} active={i === 0}>
            {t}
          </Chip>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2">
        {items.map((it, i) => (
          <div
            key={it.name}
            className="group overflow-hidden rounded-lg border border-line/70 bg-ink-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md"
            style={{ "--reveal-delay": `${i * 60}ms` } as CSSProperties}
          >
            <Thumb kind={it.kind} />
            <div className="p-1.5">
              <p className="truncate text-[9px] font-semibold text-paper">{it.name}</p>
              <p className="font-mono text-[7px] text-muted">{it.cat}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-mono text-[9px] font-semibold text-paper">
                  ${it.price.toLocaleString()}
                </span>
                <span className="font-mono text-[7px] text-mark">{it.stock}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between rounded-lg border border-line/70 bg-ink-2 px-2.5 py-1.5">
        <span className="font-mono text-[8px] text-muted">checkout · card · invoice</span>
        <span className="font-mono text-[9px] text-mark">ready</span>
      </div>
    </div>
  );
}

function AiEngineMock() {
  return (
    <div className="h-full bg-ink-3/30 p-3 text-paper">
      <div className="flex items-center justify-between">
        <span className="font-display text-[11px] font-semibold">AI agent pipeline</span>
        <span className="font-mono text-[8px] text-mark">guardrails on</span>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        {["ingest", "RAG", "draft", "HITL", "execute"].map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-1.5">
            <div className="flex-1 rounded-md border border-line/70 bg-ink-2 px-1.5 py-1.5 text-center font-mono text-[8px] text-paper/85">
              {s}
            </div>
            {i < 4 ? <span className="text-warm">→</span> : null}
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-[1.3fr_1fr] gap-2">
        <div className="rounded-lg border border-line/70 bg-ink-2 p-2">
          <p className="font-mono text-[8px] text-muted">TOKENS / MIN</p>
          <div className="mt-1 flex h-16 items-end justify-between gap-1">
            {[35, 48, 60, 44, 72, 88, 66, 94].map((h, i) => (
              <Bar key={i} h={h} delay={i * 70} />
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <Line label="RAG docs" value={<LiveNumber value={1204} />} />
          <Line
            label="Auto-resolved"
            value={<LiveNumber value={87} suffix="%" />}
            tone="emerald"
          />
          <Line
            label="Escalated"
            value={<LiveNumber value={13} suffix="%" />}
            tone="warm"
          />
        </div>
      </div>
      <div className="mt-2 rounded-lg border border-mark/25 bg-mark/5 px-2.5 py-2">
        <p className="font-mono text-[8px] text-mark">HUMAN APPROVAL REQUIRED BEFORE EXECUTION</p>
      </div>
    </div>
  );
}

const MAP: Record<ProductVariant, () => ReactNode> = {
  aime: AimeMock,
  assistant: AssistantMock,
  showroom: ShowroomMock,
  saas: SaasMock,
  portal: PortalMock,
  ecommerce: EcommerceMock,
  ai: AiEngineMock,
};

const URL_MAP: Record<ProductVariant, string> = {
  aime: "app.ai-mark.agency/marketing",
  assistant: "app.ai-mark.agency/inbox",
  showroom: "app.ai-mark.agency/showroom",
  saas: "app.ai-mark.agency/platform",
  portal: "app.ai-mark.agency/portal",
  ecommerce: "app.ai-mark.agency/catalog",
  ai: "app.ai-mark.agency/agents",
};

export function ProductUI({
  variant,
  className = "",
  ratio,
  peek,
}: {
  variant: ProductVariant;
  className?: string;
  ratio?: string;
  peek?: boolean;
}) {
  const Body = MAP[variant];
  return (
    <UIFrame url={URL_MAP[variant]} className={className} ratio={ratio} peek={peek}>
      <Body />
    </UIFrame>
  );
}
