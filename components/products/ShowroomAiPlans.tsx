import Link from "next/link";
import { BuyLink } from "@/components/BuyLink";
import { getShowroomAiCopy } from "@/content/showroom-ai";
import {
  SHOWROOM_AI_PLANS,
  SHOWROOM_AI_SEPARATE_OFFERS,
  SHOWROOM_AI_SETUP_FEE_USD,
  SHOWROOM_AI_TRIAL_DAYS,
  skuPayHref,
  skuPrice,
} from "@/lib/showroom-ai";
import { CRYPTO_CHECKOUT_DISCOUNT_BPS, formatUsdPrice } from "@/lib/pricing/crypto-checkout";
import { websitesPageUrl } from "@/lib/developer";
import type { Locale } from "@/lib/site";

/**
 * The Showroom AI commercial block: three bundles, the roles sold separately,
 * setup and trial terms.
 *
 * Prices are never literals here. Each card asks `skuPrice()` for the published
 * list amount and its computed USDT/USDC amount, so the marketing page and the
 * `/pay` checkout can only ever show the same number, and the crypto discount
 * stays a single formula (`cryptoPriceUsd`).
 *
 * Server component: it renders links and holds no state.
 */
export function ShowroomAiPlans({
  locale,
  withPositioning = true,
  className,
}: {
  locale: Locale;
  withPositioning?: boolean;
  className?: string;
}) {
  const c = getShowroomAiCopy(locale);
  const cryptoPercent = CRYPTO_CHECKOUT_DISCOUNT_BPS / 100;

  return (
    <div className={className}>
      <header className="max-w-3xl">
        <p className="font-mono text-[11px] font-semibold tracking-[0.22em] text-mark uppercase">
          {c.brand} · {c.kicker}
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-paper sm:text-4xl">
          {c.plansTitle}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{c.plansSub}</p>
      </header>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {SHOWROOM_AI_PLANS.map((plan) => {
          const price = skuPrice(plan.skuId);
          const copy = c.plans.find((p) => p.id === plan.id);
          if (!price || !copy) return null;
          // The bundles that pair the Seller with the Marketer are the product's
          // actual pitch, so they carry the accent bar and the pair badge.
          const paired = plan.roles.includes("marketer");
          return (
            <article
              key={plan.id}
              data-reveal
              className={`relative flex flex-col justify-between rounded-2xl border p-5 sm:p-6 ${
                paired
                  ? "border-mark/70 bg-ink-2 shadow-lg shadow-mark/10 ring-1 ring-mark/20"
                  : "border-line bg-ink-2"
              }`}
            >
              {paired ? (
                <span className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-mark" aria-hidden />
              ) : null}
              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold text-paper">{copy.name}</h3>
                  {plan.featured ? (
                    <span className="rounded-full bg-mark px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-mark-ink">
                      {c.featuredLabel}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-warm">
                  {copy.rolesLabel}
                </p>
                {paired ? (
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-mark/40 bg-mark/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-mark">
                    {c.pairPlanBadge}
                  </p>
                ) : null}

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-semibold tracking-tight text-paper">
                    {formatUsdPrice(price.listUsd)}
                  </span>
                  <span className="font-mono text-xs text-muted">{c.perMonth}</span>
                </div>
                <p className="mt-1 font-mono text-xs text-mark">
                  {c.cryptoLabel}: {formatUsdPrice(price.cryptoUsd)}
                  <span className="ml-1 font-sans text-[10px] font-normal text-muted">
                    −{cryptoPercent}%
                  </span>
                </p>

                <p className="mt-3 text-xs leading-relaxed text-muted">{copy.desc}</p>

                <ul className="mt-5 space-y-2 border-t border-line pt-4 text-xs text-paper/90">
                  {copy.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="shrink-0 font-bold text-mark">✓</span>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-line pt-4">
                <BuyLink
                  locale={locale}
                  skuId={plan.skuId}
                  label={c.payCta}
                  className="block w-full rounded-xl bg-mark py-3 text-center text-xs font-semibold text-mark-ink shadow transition-all hover:bg-mark-light"
                />
              </div>
            </article>
          );
        })}
      </div>

      {/* The developer side of the same team: AI MARK builds the site if the
          customer has none. External, locale-aware URL from `lib/developer.ts`. */}
      <p className="mt-5 text-xs text-muted">
        <a
          href={websitesPageUrl(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-mark hover:underline"
        >
          {c.websiteCtaLabel} ↗
        </a>{" "}
        {c.websiteCtaHint}
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-line bg-ink-2 p-5 sm:p-6">
          <h3 className="font-display text-base font-semibold text-paper">{c.separateTitle}</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {SHOWROOM_AI_SEPARATE_OFFERS.map((offer) => {
              const price = skuPrice(offer.skuId);
              const copy = c.separate.find((row) => row.id === offer.id);
              if (!price || !copy) return null;
              return (
                <li
                  key={offer.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line bg-ink-3/40 px-3 py-2.5"
                >
                  <span>
                    <span className="block text-xs font-semibold text-paper">{copy.label}</span>
                    <span className="mt-0.5 block text-[11px] text-muted">{copy.sub}</span>
                  </span>
                  <Link
                    href={skuPayHref(locale, offer.skuId)}
                    className="shrink-0 font-mono text-xs font-semibold text-mark hover:underline"
                  >
                    {formatUsdPrice(price.listUsd)}
                    {c.perMonth}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-ink-2 p-5 sm:p-6">
          <h3 className="font-display text-base font-semibold text-paper">{c.setupTitle}</h3>
          <p className="mt-1 text-xs text-muted">{c.setupSub}</p>
          <ul className="mt-4 space-y-3 text-xs">
            <li className="rounded-xl border border-line bg-ink-3/40 p-3">
              <span className="flex items-center justify-between gap-3">
                <span className="font-semibold text-paper">{c.setupFreeLabel}</span>
                <span className="font-mono font-semibold text-mark">
                  {locale === "ru" ? "бесплатно" : "free"}
                </span>
              </span>
              <span className="mt-1 block leading-relaxed text-muted">{c.setupFreeBody}</span>
            </li>
            <li className="rounded-xl border border-line bg-ink-3/40 p-3">
              <span className="flex items-center justify-between gap-3">
                <span className="font-semibold text-paper">{c.setupPaidLabel}</span>
                <span className="font-mono font-semibold text-mark">
                  {formatUsdPrice(SHOWROOM_AI_SETUP_FEE_USD)}
                </span>
              </span>
              <span className="mt-1 block leading-relaxed text-muted">{c.setupPaidBody}</span>
            </li>
          </ul>
          <div className="mt-4 rounded-xl border border-mark/30 bg-mark/5 p-3 text-xs">
            <span className="font-semibold text-paper">
              {c.trialTitle} — {SHOWROOM_AI_TRIAL_DAYS} {locale === "ru" ? "дней" : "days"}
            </span>
            <span className="mt-1 block leading-relaxed text-muted">{c.trialBody}</span>
          </div>
        </div>
      </div>

      {withPositioning ? (
        <div className="mt-6 rounded-2xl border border-line bg-ink-3/30 p-5 sm:p-6">
          <h3 className="font-display text-base font-semibold text-paper">{c.positioningTitle}</h3>
          <p className="mt-2 max-w-3xl text-xs leading-relaxed text-muted sm:text-sm">
            {c.positioningBody}
          </p>
          <ul className="mt-4 grid gap-2 text-xs text-paper/90 sm:grid-cols-2">
            {c.positioningPoints.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="shrink-0 font-bold text-mark">✓</span>
                <span className="leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

/** What every Showroom AI plan includes, as a standalone strip. */
export function ShowroomAiIncluded({ locale, className }: { locale: Locale; className?: string }) {
  const c = getShowroomAiCopy(locale);
  return (
    <div className={className}>
      <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-warm">
        {c.includedTitle}
      </h3>
      <ul className="mt-4 grid gap-2 text-xs text-paper/90 sm:grid-cols-2 lg:grid-cols-3">
        {c.includedPoints.map((point) => (
          <li key={point} className="flex items-start gap-2 rounded-xl border border-line bg-ink-2 p-3">
            <span className="shrink-0 font-bold text-mark">✓</span>
            <span className="leading-snug">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
