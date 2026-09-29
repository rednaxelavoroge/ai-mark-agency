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
          width === "wide" ? "max-w-[86rem]" : "max-w-[1280px]"
        }`}
      >
        <div data-reveal>
          <div className="flex items-center gap-4">
            {index ? (
              <span className="font-editorial text-lg leading-none italic text-warm">
                {index}
              </span>
            ) : null}
            <p className="text-[13px] font-semibold tracking-[0.14em] text-muted uppercase">
              {eyebrow}
            </p>
            <span aria-hidden className="h-px flex-1 bg-line" />
          </div>
          <h2 className="mt-4 max-w-3xl font-sans text-3xl leading-[1.05] font-semibold tracking-[-0.05em] sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {lead ? <p className="mt-4 max-w-2xl text-muted">{lead}</p> : null}
        </div>
        <div className="mt-10">
          {children}
        </div>
      </div>
    </section>
  );
}
