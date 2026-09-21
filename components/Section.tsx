import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
          {title}
        </h2>
        {lead ? <p className="mt-4 max-w-2xl text-muted">{lead}</p> : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
