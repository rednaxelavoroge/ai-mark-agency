import Link from "next/link";
import { getBrandStudioCopy } from "@/content/brand-studio";
import {
  BRAND_STUDIO_FEATURED_PLAN,
  BRAND_STUDIO_PLAN_ORDER,
  BRAND_STUDIO_PLAN_PRICES,
  brandStudioPath,
} from "@/lib/brand-studio";
import { formatUsdPrice } from "@/lib/pricing/crypto-checkout";
import type { Locale } from "@/lib/site";

export function BrandStudioPlans({
  locale,
  id,
  className,
}: {
  locale: Locale;
  id?: string;
  className?: string;
}) {
  const t = getBrandStudioCopy(locale);

  return (
    <section id={id} className={className}>
      <header className="max-w-3xl">
        <p className="font-mono text-[11px] font-semibold tracking-[0.22em] text-mark uppercase">
          {t.plans.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-paper sm:text-3xl">
          {t.plans.title}
        </h2>
      </header>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {BRAND_STUDIO_PLAN_ORDER.map((planId) => {
          const copy = t.plans.items.find((p) => p.id === planId);
          const amount = BRAND_STUDIO_PLAN_PRICES[planId];
          const featured = planId === BRAND_STUDIO_FEATURED_PLAN;
          if (!copy) return null;

          return (
            <article
              key={planId}
              className={`relative flex flex-col rounded-2xl border p-5 sm:p-6 ${
                featured
                  ? "border-mark/70 bg-ink-2 shadow-lg shadow-mark/10 ring-1 ring-mark/20"
                  : "border-line bg-ink-2"
              }`}
            >
              {featured ? (
                <span className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-mark" aria-hidden />
              ) : null}
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl font-semibold text-paper">{copy.name}</h3>
                {featured ? (
                  <span className="rounded-full bg-mark px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-mark-ink">
                    {t.plans.featuredLabel}
                  </span>
                ) : null}
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
                  {formatUsdPrice(amount)}
                </span>
                <span className="font-mono text-xs text-muted">{t.plans.perMonth}</span>
              </div>
              <ul className="mt-5 flex-1 space-y-2 border-t border-line pt-4 text-xs text-paper/90">
                {copy.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="shrink-0 font-bold text-mark">✓</span>
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted">{t.plans.footnote}</p>
    </section>
  );
}

export function BrandStudioPricingTeaser({ locale }: { locale: Locale }) {
  const t = getBrandStudioCopy(locale);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-ink-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div>
        <h3 className="font-display text-lg font-semibold text-paper">{t.pricingTeaser.title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{t.pricingTeaser.lead}</p>
      </div>
      <Link
        href={`${brandStudioPath(locale)}#plans`}
        className="inline-flex shrink-0 min-h-11 items-center rounded-full bg-mark px-6 py-2.5 text-xs font-semibold text-mark-ink shadow hover:bg-mark-light transition-all"
      >
        {t.pricingTeaser.cta} →
      </Link>
    </div>
  );
}
