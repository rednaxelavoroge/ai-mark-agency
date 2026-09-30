"use client";

import { useState, type CSSProperties } from "react";
import { ContactCta } from "@/components/ContactCta";
import { getPublicChromeCopy } from "@/content/sections";
import { type Locale } from "@/lib/site";

export function BusinessCreationVisual({ locale }: { locale: Locale }) {
  const v = getPublicChromeCopy(locale).businessCreationVisual;
  const [startingState, setStartingState] = useState<"with-idea" | "capital">("with-idea");

  const points =
    startingState === "with-idea" ? v.withIdeaPoints : v.capitalPoints;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-mono text-muted uppercase tracking-wider">
          {v.startingLabel}
        </span>
        <div className="inline-flex rounded-full border border-line bg-ink-2 p-1 text-xs">
          <button
            type="button"
            onClick={() => setStartingState("with-idea")}
            className={`rounded-full px-4 py-2 font-medium transition-all ${
              startingState === "with-idea"
                ? "bg-mark text-mark-ink shadow-sm"
                : "text-muted hover:text-paper"
            }`}
          >
            {v.tabWithIdea}
          </button>
          <button
            type="button"
            onClick={() => setStartingState("capital")}
            className={`rounded-full px-4 py-2 font-medium transition-all ${
              startingState === "capital"
                ? "bg-mark text-mark-ink shadow-sm"
                : "text-muted hover:text-paper"
            }`}
          >
            {v.tabCapital}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p, idx) => (
          <div
            key={p.title}
            data-reveal
            style={{ "--reveal-delay": `${idx * 90}ms` } as CSSProperties}
            className="group rounded-xl border border-line bg-ink-2 p-6 transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-warm">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-mark opacity-40 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="mt-4 font-display text-base font-semibold text-paper leading-snug">
              {p.title}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-muted">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-line bg-ink-3/40 p-6 sm:p-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] text-warm uppercase tracking-widest">
              {v.chainKicker}
            </span>
            <p className="mt-1 font-display text-base sm:text-lg font-medium text-paper">
              {v.chainLine}
            </p>
            <p className="mt-2 text-xs text-muted">{v.chainNote}</p>
          </div>

          <div className="shrink-0">
            <ContactCta className="inline-flex items-center gap-1.5 rounded-full bg-mark px-5 py-2.5 text-xs font-semibold text-mark-ink shadow hover:bg-mark-light transition-all">
              {v.discussCta} →
            </ContactCta>
          </div>
        </div>

        <div className="mt-5 border-t border-line/60 pt-4 flex items-start gap-2.5 text-[11px] text-muted">
          <span className="font-mono text-warm font-bold">ℹ</span>
          <p>{v.responsibleNotice}</p>
        </div>
      </div>
    </div>
  );
}
