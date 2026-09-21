export function Pipeline({
  steps,
  result,
}: {
  steps: string[];
  result?: string;
}) {
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded-full border border-line bg-ink-2 px-3 py-1.5 text-sm">
            <span className="mr-2 font-mono text-[11px] text-warm">
              {String(i + 1).padStart(2, "0")}
            </span>
            {step}
          </span>
          {i < steps.length - 1 ? (
            <span aria-hidden="true" className="text-warm">
              →
            </span>
          ) : null}
        </li>
      ))}
      {result ? (
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="text-warm">
            →
          </span>
          <span className="rounded-full bg-mark px-3 py-1.5 text-sm font-medium text-mark-ink">
            {result}
          </span>
        </li>
      ) : null}
    </ol>
  );
}
