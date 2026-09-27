import { cardClass } from "@/components/ui/classes";
import {
  AI_MARK_RETAINED_SHARE_LABEL,
  COMMISSION_LEVELS,
  EXAMPLE_USD,
  LEVEL_RATE_LABELS,
  PARTNER_POOL_CAP_LABEL,
  type CommissionLevel,
} from "@/lib/partner/commission-model";

const LEVEL_COPY: Record<
  CommissionLevel,
  { title: string; body: string }
> = {
  1: {
    title: "Direct sale",
    body: "The customer you personally introduce. This is 50% of the commissionable amount — not the whole 80% pool.",
  },
  2: {
    title: "First network",
    body: "Paid customer sales from your first-level partners.",
  },
  3: {
    title: "Extended network",
    body: "Paid sales one level deeper.",
  },
  4: {
    title: "Market depth",
    body: "The network beyond direct relationships.",
  },
  5: {
    title: "Maximum depth",
    body: "The deepest level of the standard schedule.",
  },
};

const EXAMPLE_ROWS: { label: string; value: string; accent?: boolean }[] = [
  { label: "L1", value: `$${EXAMPLE_USD.l1.replace(/\.00$/, "")}`, accent: true },
  { label: "L2", value: `$${EXAMPLE_USD.l2.replace(/\.00$/, "")}` },
  { label: "L3", value: `$${EXAMPLE_USD.l3.replace(/\.00$/, "")}` },
  { label: "L4", value: `$${EXAMPLE_USD.l4.replace(/\.00$/, "")}` },
  { label: "L5", value: `$${EXAMPLE_USD.l5.replace(/\.00$/, "")}` },
  { label: "Total network pool", value: `$${EXAMPLE_USD.pool.replace(/\.00$/, "")}` },
  { label: "AI Mark retained share", value: `$${EXAMPLE_USD.retained.replace(/\.00$/, "")}` },
];

/**
 * Published Partner Commission Model v2 schedule.
 *
 * Display only: the ledger posts from `commission_rules` on the server.
 * This card must not accept or render a client-supplied rate.
 */
export function CommissionScheduleCard() {
  return (
    <section aria-labelledby="commission-model-heading" className={`p-5 sm:p-6 ${cardClass}`}>
      <h2 id="commission-model-heading" className="text-sm font-semibold tracking-tight">
        Partner Commission Model
      </h2>
      <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted">
        50% for a direct sale. Up to {PARTNER_POOL_CAP_LABEL} total partner
        rewards across the network. {PARTNER_POOL_CAP_LABEL} is the aggregate
        pool across qualified L1–L5, not a single-partner payout. AI Mark
        retained share is {AI_MARK_RETAINED_SHARE_LABEL} of the commissionable
        amount. Ledger totals above are stored values; this card does not
        recompute your earnings.
      </p>

      <ol className="mt-5 grid gap-2 sm:grid-cols-5">
        {COMMISSION_LEVELS.map((level) => {
          const copy = LEVEL_COPY[level];
          const accent = level === 1;
          return (
            <li
              key={level}
              className={`rounded-xl border px-3 py-3 ${
                accent ? "border-mark/40 bg-mark/10" : "border-line bg-ink-3/40"
              }`}
            >
              <p className={`font-mono text-[10px] tracking-[0.16em] ${accent ? "text-mark" : "text-warm"}`}>
                L{level}
              </p>
              <p className={`mt-1 font-editorial ${accent ? "text-3xl text-mark" : "text-xl text-paper"}`}>
                {LEVEL_RATE_LABELS[level]}
              </p>
              <p className="mt-1 text-[11px] font-medium text-paper">{copy.title}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted">{copy.body}</p>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 rounded-xl border border-line bg-ink-3/30 px-4 py-4">
        <p className="font-mono text-[10px] tracking-wider text-muted uppercase">
          $1,000 commissionable sale · full network
        </p>
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          {EXAMPLE_ROWS.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-3 text-xs"
            >
              <dt className="text-muted">{row.label}</dt>
              <dd className={`font-mono ${row.accent ? "text-mark" : "text-paper"}`}>
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-[11px] leading-relaxed text-muted">
          The direct partner receives $500, not $800. Total network pool{" "}
          {PARTNER_POOL_CAP_LABEL}.
        </p>
      </div>
    </section>
  );
}
