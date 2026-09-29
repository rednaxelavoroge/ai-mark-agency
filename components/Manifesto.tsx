import type { CSSProperties } from "react";
import type { Locale } from "@/lib/site";
import { getPublicChromeCopy } from "@/content/sections";

export function Manifesto({ locale }: { locale: Locale }) {
  const m = getPublicChromeCopy(locale).manifesto;
  const statement = [m.statementA, m.statementB];

  return (
    <section id="principles" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase" data-reveal>
          {m.eyebrow}
        </p>

        <h2
          className="mt-6 max-w-4xl font-editorial text-4xl leading-[1.08] font-medium text-paper sm:text-5xl lg:text-6xl"
          data-reveal
          style={{ "--reveal-delay": "60ms" } as CSSProperties}
        >
          {statement[0]} <em className="text-mark">{statement[1]}</em>
        </h2>

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {m.principles.map((p, i) => (
            <div
              key={p.n}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
              className="border-t border-line pt-5"
            >
              <span className="font-editorial text-2xl italic text-warm">{p.n}</span>
              <h3 className="mt-3 font-display text-base font-semibold leading-snug text-paper">
                {p.t}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
