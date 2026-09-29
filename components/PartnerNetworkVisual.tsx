import { Fragment, type CSSProperties } from "react";
import Link from "next/link";
import { getPublicChromeCopy } from "@/content/sections";
import { localePath, type Locale } from "@/lib/site";

export function PartnerNetworkVisual({ locale }: { locale: Locale }) {
  const v = getPublicChromeCopy(locale).partnerNetworkVisual;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-line bg-ink-2 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-line pb-4">
          <div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-warm">
              {v.commissionKicker}
            </span>
            <p className="mt-1 font-display text-sm sm:text-base font-semibold text-paper">
              {v.commissionTitle}
            </p>
          </div>
          <Link
            href={localePath(locale, "/partners")}
            className="inline-flex items-center gap-1 text-xs font-semibold text-mark hover:underline self-start sm:self-center"
          >
            {v.commissionLink}
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {v.mechanic.map((step, i) => (
            <Fragment key={step}>
              {i > 0 ? (
                <span aria-hidden className="font-mono text-xs text-warm">
                  →
                </span>
              ) : null}
              <span className="rounded-full border border-line bg-ink-3/50 px-3 py-1 text-xs font-mono text-paper">
                {step}
              </span>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {v.partnerTypes.map((p, pi) => (
          <div
            key={p.id}
            data-reveal
            style={{ "--reveal-delay": `${pi * 70}ms` } as CSSProperties}
            className="flex flex-col justify-between rounded-xl border border-line bg-ink-2 p-5 transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded bg-ink-3 px-2 py-0.5 font-mono text-[10px] text-warm font-medium">
                  {p.tag}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-mark" />
              </div>

              <h4 className="mt-3 font-display text-sm sm:text-base font-semibold text-paper leading-snug">
                {p.title}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-muted">{p.desc}</p>
            </div>

            <div className="mt-4 border-t border-line/60 pt-3">
              <ul className="space-y-1 text-[11px] text-paper/85">
                {p.roles.map((r, rIdx) => (
                  <li key={rIdx} className="flex items-center gap-1.5">
                    <span className="text-mark font-bold">·</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-3/40 p-6 sm:p-7 shadow-sm">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(198,214,139,0.22),transparent_70%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mark/40 to-transparent"
        />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 max-w-2xl flex-1">
            <h3 className="font-display text-base font-semibold leading-snug text-paper sm:text-lg">
              {v.programTitle}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">{v.programLead}</p>
          </div>
          <Link
            href={localePath(locale, "/partners")}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-mark px-5 py-3 text-xs font-semibold text-mark-ink shadow transition-all hover:bg-mark-light hover:shadow-md sm:self-center"
          >
            {v.programCta}
            <span className="btn-arrow" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
