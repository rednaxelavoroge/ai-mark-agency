"use client";

import { useCabinetCopy } from "@/components/platform/CabinetCopyProvider";
import { cardClass } from "@/components/ui/classes";
import {
  COMMISSION_LEVELS,
  EXAMPLE_USD,
  LEVEL_RATE_LABELS,
  type CommissionLevel,
} from "@/lib/partner/commission-model";

/**
 * Published Partner Commission Model v2 schedule.
 *
 * Display only: the ledger posts from `commission_rules` on the server.
 * This card must not accept or render a client-supplied rate.
 */
export function CommissionScheduleCard() {
  const t = useCabinetCopy();
  const c = t.commissionSchedule;

  const exampleRows: { label: string; value: string; accent?: boolean }[] = [
    { label: c.exampleRows.l1, value: `$${EXAMPLE_USD.l1.replace(/\.00$/, "")}`, accent: true },
    { label: c.exampleRows.l2, value: `$${EXAMPLE_USD.l2.replace(/\.00$/, "")}` },
    { label: c.exampleRows.l3, value: `$${EXAMPLE_USD.l3.replace(/\.00$/, "")}` },
    { label: c.exampleRows.l4, value: `$${EXAMPLE_USD.l4.replace(/\.00$/, "")}` },
    { label: c.exampleRows.l5, value: `$${EXAMPLE_USD.l5.replace(/\.00$/, "")}` },
    { label: c.exampleRows.totalPool, value: `$${EXAMPLE_USD.pool.replace(/\.00$/, "")}` },
    {
      label: c.exampleRows.retainedShare,
      value: `$${EXAMPLE_USD.retained.replace(/\.00$/, "")}`,
    },
  ];

  return (
    <section aria-labelledby="commission-model-heading" className={`p-5 sm:p-6 ${cardClass}`}>
      <h2 id="commission-model-heading" className="text-sm font-semibold tracking-tight">
        {c.title}
      </h2>
      <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted">{c.lead}</p>

      <ol className="mt-5 grid gap-2 sm:grid-cols-5">
        {COMMISSION_LEVELS.map((level) => {
          const levelCopy = c.levels[String(level) as keyof typeof c.levels];
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
              <p className="mt-1 text-[11px] font-medium text-paper">{levelCopy.title}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted">{levelCopy.body}</p>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 rounded-xl border border-line bg-ink-3/30 px-4 py-4">
        <p className="font-mono text-[10px] tracking-wider text-muted uppercase">
          {c.exampleHeading}
        </p>
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          {exampleRows.map((row) => (
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
        <p className="mt-3 text-[11px] leading-relaxed text-muted">{c.exampleFootnote}</p>
      </div>
    </section>
  );
}
