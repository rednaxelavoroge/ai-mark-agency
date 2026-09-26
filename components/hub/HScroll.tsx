import type { CSSProperties, ReactNode } from "react";

export function HScroll({
  cols,
  children,
  label,
}: {
  cols: number;
  children: ReactNode;
  label?: string;
}) {
  return (
    <div
      className="hub-hscroll"
      style={{ "--hub-cols": cols } as CSSProperties}
      role="list"
      aria-label={label}
    >
      {children}
    </div>
  );
}

export function HubSection({
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
    <section id={id} className="hub-section border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <header data-reveal>
          <p className="font-mono text-[10px] tracking-[0.2em] text-mark uppercase">{eyebrow}</p>
          <h2 className="mt-2 max-w-3xl font-editorial text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
            {title}
          </h2>
          {lead ? <p className="mt-2 max-w-2xl text-sm text-muted">{lead}</p> : null}
        </header>
        <div className="mt-5">{children}</div>
      </div>
    </section>
  );
}
