import type { CSSProperties } from "react";
import type { Locale } from "@/lib/site";
import { getOperatingModelCopy } from "@/content/sections";

export function OperatingModelSection({ locale }: { locale: Locale }) {
  const copy = getOperatingModelCopy(locale);

  return (
    <div className="space-y-10">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {copy.stages.map((stg, i) => (
          <div
            key={stg.n}
            data-reveal
            style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
            className="flex flex-col justify-between rounded-xl border border-line bg-ink-2 p-4 transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-sm"
          >
            <div>
              <span
                className="loop-pulse grid h-7 w-7 place-items-center rounded-md font-mono text-[11px] font-semibold"
                style={{ "--i": i } as CSSProperties}
              >
                {stg.n}
              </span>
              <h4 className="mt-2 font-display text-sm font-semibold text-paper">{stg.t}</h4>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-muted">{stg.d}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-8" data-reveal>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-mark" />
            <span className="font-mono text-xs font-semibold text-mark uppercase tracking-wider">
              {copy.aiColumn.kicker}
            </span>
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold text-paper">
            {copy.aiColumn.title}
          </h3>
          <p className="mt-2 text-xs text-muted">{copy.aiColumn.lead}</p>

          <ul className="mt-6 space-y-2.5 text-xs text-paper/85">
            {copy.aiColumn.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-mark font-bold shrink-0">⚡</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-mark/30 bg-ink-3/40 p-6 sm:p-8" data-reveal>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-warm" />
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-wider">
              {copy.humanColumn.kicker}
            </span>
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold text-paper">
            {copy.humanColumn.title}
          </h3>
          <p className="mt-2 text-xs text-muted">{copy.humanColumn.lead}</p>

          <ul className="mt-6 space-y-2.5 text-xs text-paper/85">
            {copy.humanColumn.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-warm font-bold shrink-0">🛡</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
