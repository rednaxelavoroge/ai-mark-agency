import type { ReactNode } from "react";
import { cardClass, eyebrowClass } from "@/components/ui/classes";

/** Consistent page heading for every platform screen. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  actions,
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className={eyebrowClass}>{eyebrow}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        {lead ? (
          <div className="mt-2 max-w-2xl text-sm text-muted">{lead}</div>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}

/**
 * A metric tile.
 *
 * Phase 4A has no financial engine, so every value passed here is the honest
 * `NO_DATA` dash rather than an invented figure.
 */
export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className={`p-4 sm:p-5 ${cardClass}`}>
      <p className="text-[10px] tracking-[0.16em] text-muted uppercase">
        {label}
      </p>
      <p className="mt-3 font-mono text-2xl leading-none text-paper">{value}</p>
      {hint ? (
        <p className="mt-2 text-[11px] leading-relaxed text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

/** A labelled value, used for the partner identity block. */
export function DetailList({
  items,
}: {
  items: { label: string; value: ReactNode; mono?: boolean }[];
}) {
  return (
    <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="min-w-0">
          <dt className="text-[10px] tracking-[0.16em] text-muted uppercase">
            {item.label}
          </dt>
          <dd
            className={`mt-1.5 text-sm break-words ${
              item.mono ? "font-mono" : ""
            }`}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
