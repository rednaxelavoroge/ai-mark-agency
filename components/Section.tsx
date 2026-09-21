import type { CSSProperties, ReactNode } from "react";

/**
 * Editorial chapter wrapper.
 *
 * Every section opens with a numbered rule — `index` / eyebrow — which gives
 * the long page a printed-chapter rhythm instead of a stack of identical
 * blocks. `width="wide"` lets a section's media break out of the reading
 * measure while its headline stays on the text column.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  index,
  width = "default",
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  index?: string;
  width?: "default" | "wide";
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line">
      <div
        className={`mx-auto px-4 py-16 sm:px-6 sm:py-20 ${
          width === "wide" ? "max-w-[86rem]" : "max-w-6xl"
        }`}
      >
        <div data-reveal>
          <div className="flex items-center gap-4">
            {index ? (
              <span className="font-editorial text-lg leading-none italic text-warm">
                {index}
              </span>
            ) : null}
            <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">
              {eyebrow}
            </p>
            <span aria-hidden className="h-px flex-1 bg-line" />
          </div>
          <h2 className="mt-4 max-w-3xl font-editorial text-3xl leading-[1.1] font-medium tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          {lead ? <p className="mt-4 max-w-2xl text-muted">{lead}</p> : null}
        </div>
        <div
          className="mt-10"
          data-reveal
          style={{ "--reveal-delay": "120ms" } as CSSProperties}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
