import type { ReactNode } from "react";

export function Explore({
  summary,
  children,
  className = "",
}: {
  summary: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <details className={`hub-explore group ${className}`}>
      <summary className="flex cursor-pointer items-center justify-between gap-3 rounded-full border border-line bg-ink-3/40 px-3 py-1.5 text-[11px] font-semibold text-paper transition-colors hover:border-line-strong">
        <span>{summary}</span>
        <span className="font-mono text-mark transition group-open:rotate-45" aria-hidden>
          +
        </span>
      </summary>
      <div className="mt-3 space-y-3 text-xs leading-relaxed text-muted">{children}</div>
    </details>
  );
}

export function AccordionItem({
  q,
  a,
}: {
  q: string;
  a: string;
}) {
  return (
    <details className="hub-explore group border-b border-line px-4 py-4 last:border-b-0 sm:px-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-sm font-semibold text-paper">
        <span>{q}</span>
        <span className="font-mono text-lg text-mark transition group-open:rotate-45" aria-hidden>
          +
        </span>
      </summary>
      <p className="max-w-3xl pt-3 text-xs leading-relaxed text-muted">{a}</p>
    </details>
  );
}
