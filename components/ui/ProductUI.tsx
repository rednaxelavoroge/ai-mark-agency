import type { CSSProperties, ReactNode } from "react";

/**
 * AI Mark proprietary product-UI mockups.
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
}: {
  children: ReactNode;
  url?: string;
  className?: string;
  ratio?: string;
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
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-mark">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          LIVE
        </span>
      </div>
      <div className={`relative isolate overflow-hidden ${ratio}`}>
        <div
          aria-hidden
          className="scanline pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-transparent via-mark/10 to-transparent"
        />
        {children}
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
      className={`ui-bar block w-full rounded-t-[3px] bg-gradient-to-t from-mark/60 to-mark ${className}`}
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

function Line({ label, value, tone = "mark" }: { label: string; value: string; tone?: "mark" | "warm" | "emerald" }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-line/70 bg-ink-2 px-2.5 py-1.5">
      <span className="flex items-center gap-1.5 font-mono text-[9px] text-muted">
        <Dot tone={tone} />
        {label}
      </span>
      <span className="font-mono text-[9px] font-semibold text-paper">{value}</span>
    </div>
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
            <div className="flex h-14 items-end gap-1">
              {[38, 52, 44, 68, 60, 82, 74, 91].map((h, i) => (
                <Bar key={i} h={h} delay={i * 70} />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <Line label="Drafts / week" value="42" />
            <Line label="Approval time" value="3.1m" tone="warm" />
            <Line label="Reach Δ" value="+38%" tone="emerald" />
          </div>
        </div>

        <div className="rounded-lg border border-line/70 bg-ink-2 p-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[8px] text-muted">TELEGRAM APPROVAL</span>
            <span className="font-mono text-[8px] text-warm">human-in-the-loop</span>
          </div>
          <p className="mt-1 text-[10px] leading-snug text-paper/85">
            Reels · «Kaçan für den Sommer» — Skript bereit.
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
            <Line label="Catalog + 428 SKU" value="synced" />
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
            Verfügbar: Standard & erweitert ab $1.200. Zusammenbau 5–7 Werktage.
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
          <span className="font-display text-[11px] font-semibold">Showroom AI Core</span>
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
          <p className="mt-1 font-display text-lg font-bold text-paper">$12,480</p>
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
  return (
    <div className="h-full bg-ink-3/30 p-3 text-paper">
      <div className="flex items-center justify-between">
        <span className="font-display text-[11px] font-semibold">Operational console</span>
        <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[8px] text-muted">
          multi-tenant
        </span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {[
          ["MRR", "$24.8k"],
          ["Active seats", "1,284"],
          ["Uptime", "99.98%"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-line/70 bg-ink-2 p-2">
            <p className="font-mono text-[8px] text-muted">{k}</p>
            <p className="font-display text-sm font-semibold">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-[1.6fr_1fr] gap-2">
        <div className="rounded-lg border border-line/70 bg-ink-2 p-2">
          <p className="mb-1.5 font-mono text-[8px] text-muted">USAGE · 12w</p>
          <div className="flex h-20 items-end gap-1.5">
            {[30, 42, 38, 55, 62, 58, 74, 70, 84, 79, 92, 88].map((h, i) => (
              <Bar key={i} h={h} delay={i * 55} />
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <Line label="API latency" value="112ms" />
          <Line label="Error rate" value="0.02%" tone="emerald" />
          <Line label="Deploys / d" value="6" tone="warm" />
          <div className="rounded-md border border-line/70 bg-ink-2 p-2">
            <p className="font-mono text-[8px] text-muted">ROLES</p>
            <div className="mt-1 flex gap-1">
              {["admin", "ops", "client"].map((r) => (
                <span key={r} className="rounded bg-ink-3 px-1.5 py-0.5 font-mono text-[8px] text-muted">
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortalMock() {
  const rows = [
    ["#1042", "In production", "$12,480"],
    ["#1041", "Quote sent", "$3,920"],
    ["#1038", "Approved", "$8,140"],
    ["#1035", "Delivered", "$1,260"],
  ];
  return (
    <div className="h-full bg-ink-3/30 p-3 text-paper">
      <div className="flex items-center justify-between">
        <span className="font-display text-[11px] font-semibold">Client workspace</span>
        <span className="font-mono text-[8px] text-muted">orders & quotes</span>
      </div>
      <div className="mt-2 overflow-hidden rounded-lg border border-line/70 bg-ink-2">
        <div className="grid grid-cols-[1fr_1.4fr_1fr] border-b border-line/70 px-3 py-1.5 font-mono text-[8px] text-muted">
          <span>ORDER</span>
          <span>STATUS</span>
          <span className="text-right">VALUE</span>
        </div>
        {rows.map((r, i) => (
          <div
            key={r[0]}
            className="grid grid-cols-[1fr_1.4fr_1fr] items-center border-b border-line/40 px-3 py-2 text-[10px]"
            style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
          >
            <span className="font-mono text-muted">{r[0]}</span>
            <span className="flex items-center gap-1.5">
              <Dot tone={i < 2 ? "warm" : "emerald"} />
              {r[1]}
            </span>
            <span className="text-right font-mono">{r[2]}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        <div className="col-span-2 rounded-lg border border-line/70 bg-ink-2 p-2">
          <p className="mb-1 font-mono text-[8px] text-muted">QUOTE VOLUME</p>
          <div className="flex h-12 items-end gap-1">
            {[40, 52, 48, 66, 72, 90].map((h, i) => (
              <Bar key={i} h={h} delay={i * 80} />
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-line/70 bg-ink-2 p-2">
          <p className="font-mono text-[8px] text-muted">1C / CRM</p>
          <p className="mt-1 font-mono text-[9px] text-mark">synced</p>
        </div>
      </div>
    </div>
  );
}

function EcommerceMock() {
  return (
    <div className="h-full bg-ink-3/30 p-3 text-paper">
      <div className="flex items-center gap-2">
        <span className="flex-1 rounded-md border border-line/70 bg-ink-2 px-2.5 py-1.5 font-mono text-[9px] text-muted">
          search · 24,000 SKU
        </span>
        <span className="rounded-md bg-mark px-2.5 py-1.5 font-mono text-[8px] font-semibold text-mark-ink">
          config
        </span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-line/70 bg-ink-2">
            <span
              className={`block h-12 ${
                i % 3 === 0 ? "bg-mark/15" : i % 3 === 1 ? "bg-warm/15" : "bg-ink-3"
              }`}
            />
            <div className="p-1.5">
              <p className="font-mono text-[8px] text-muted">SKU-{1024 + i}</p>
              <p className="text-[10px] font-semibold">${(120 + i * 37).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between rounded-lg border border-line/70 bg-ink-2 px-2.5 py-1.5">
        <span className="font-mono text-[8px] text-muted">checkout · acquisition</span>
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
          <div className="mt-1 flex h-16 items-end gap-1">
            {[35, 48, 60, 44, 72, 88, 66, 94].map((h, i) => (
              <Bar key={i} h={h} delay={i * 70} />
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <Line label="RAG docs" value="1,204" />
          <Line label="Auto-resolved" value="87%" tone="emerald" />
          <Line label="Escalated" value="13%" tone="warm" />
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
}: {
  variant: ProductVariant;
  className?: string;
  ratio?: string;
}) {
  const Body = MAP[variant];
  return (
    <UIFrame url={URL_MAP[variant]} className={className} ratio={ratio}>
      <Body />
    </UIFrame>
  );
}
