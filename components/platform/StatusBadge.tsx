import { partnerStatusLabel } from "@/lib/partner/format";
import { cardClass } from "@/components/ui/classes";

const STATUS_TONE: Record<string, string> = {
  suspended: "border-danger/40 bg-danger/5 text-danger",
  strategic: "border-warm/50 bg-warm/10 text-warm",
  regional: "border-warm/50 bg-warm/10 text-warm",
  growth: "border-mark/40 bg-mark/10 text-mark",
  partner: "border-line bg-ink-3/70 text-muted",
};

/** Partner lifecycle status as a pill. */
export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
        STATUS_TONE[status] ?? STATUS_TONE.partner
      }`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
      {partnerStatusLabel(status)}
    </span>
  );
}

/**
 * Honest placeholder for a surface that a later phase will build.
 *
 * The brief forbids inventing numbers, so every not-yet-built area states what
 * it will contain instead of drawing a mock chart.
 */
export function PlaceholderPanel({
  summary,
  planned,
}: {
  summary: string;
  planned?: string[];
}) {
  return (
    <div className={`p-5 sm:p-6 ${cardClass}`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-line px-2.5 py-1 text-[10px] tracking-[0.16em] text-muted uppercase">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-warm" />
        Planned
      </span>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
        {summary}
      </p>

      {planned?.length ? (
        <ul className="mt-5 grid max-w-2xl gap-2.5">
          {planned.map((item) => (
            <li key={item} className="flex gap-2.5 text-xs text-muted">
              <span
                aria-hidden
                className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-mark"
              />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
