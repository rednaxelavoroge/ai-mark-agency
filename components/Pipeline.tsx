"use client";

import { useRef } from "react";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group/pipeline" data-reveal>
      {/* Scroll Arrows */}
      <div className="flex items-center justify-between mb-3 sm:hidden">
        <span className="font-mono text-[10px] text-muted uppercase">Свайпайте вправо →</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="grid h-7 w-7 place-items-center rounded-full border border-line bg-ink-2 text-xs text-paper hover:bg-ink-3"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="grid h-7 w-7 place-items-center rounded-full border border-line bg-ink-2 text-xs text-paper hover:bg-ink-3"
          >
            ›
          </button>
        </div>
      </div>

      {/* Main Track */}
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-3 pt-1 scroll-smooth no-scrollbar"
      >
        <ol className="flex min-w-max items-center pr-8">
          {steps.map((step, i) => (
            <li key={step} className="flex items-center">
              <span
                className="premium-card flex items-center gap-2 rounded-full px-3.5 py-2 text-xs sm:text-sm transition-all hover:border-mark/40 hover:-translate-y-0.5"
              >
                <span className="font-mono text-[11px] text-warm font-semibold">
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
              <span className="rounded-full bg-mark px-4 py-2 text-xs sm:text-sm font-semibold text-mark-ink shadow-sm">
                {result}
              </span>
            </li>
          ) : null}
        </ol>
      </div>
    </div>
  );
}
