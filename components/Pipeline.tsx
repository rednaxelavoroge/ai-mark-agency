import type { CSSProperties } from "react";

function Connector({ delay }: { delay: number }) {
  return (
    <svg
      aria-hidden
      width="46"
      height="12"
      viewBox="0 0 46 12"
      className="hidden shrink-0 text-warm sm:block"
    >
      <line x1="2" y1="6" x2="44" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.28" />
      <line
        x1="2"
        y1="6"
        x2="44"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.4"
        className="flow-dash"
        style={{ animationDelay: `${delay}ms` }}
      />
      <path d="M38 2 L44 6 L38 10" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Pipeline({
  steps,
  result,
}: {
  steps: string[];
  result?: string;
}) {
  return (
    <div className="overflow-x-auto pb-2" data-reveal>
      <ol className="flex min-w-max items-center">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center">
            <span
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
              className="premium-card flex items-center gap-2 rounded-full px-3.5 py-2 text-sm"
            >
              <span className="font-mono text-[11px] text-warm">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-paper">{step}</span>
            </span>
            {i < steps.length - 1 ? <Connector delay={i * 70} /> : null}
          </li>
        ))}
        {result ? (
          <li className="flex items-center">
            <Connector delay={steps.length * 70} />
            <span
              data-reveal
              style={{ "--reveal-delay": `${steps.length * 70}ms` } as CSSProperties}
              className="rounded-full bg-mark px-3.5 py-2 text-sm font-medium text-mark-ink shadow-sm"
            >
              {result}
            </span>
          </li>
        ) : null}
      </ol>
    </div>
  );
}
