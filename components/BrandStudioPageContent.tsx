import Link from "next/link";
import { BackButton } from "@/components/BackButton";
import { ContactCta } from "@/components/ContactCta";
import { BrandStudioPlans } from "@/components/BrandStudioPlans";
import { ProductUI } from "@/components/ui/ProductUI";
import { getBrandStudioCopy } from "@/content/brand-studio";
import { brandStudioPath } from "@/lib/brand-studio";
import type { Locale } from "@/lib/site";

export function BrandStudioPageContent({ locale }: { locale: Locale }) {
  const t = getBrandStudioCopy(locale);

  return (
    <article>
      <section className="relative overflow-hidden border-b border-line">
        <div className="ambient-drift pointer-events-none absolute -right-20 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(198,214,139,0.12),transparent_68%)]" />
        <div className="am-hero-split mx-auto grid max-w-6xl items-center gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div>
            <BackButton locale={locale} targetHref="/#services" />
            <p className="mt-6 font-mono text-[11px] font-semibold tracking-[0.22em] text-warm uppercase">
              {t.hero.label}
            </p>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-paper sm:text-4xl lg:text-5xl">
              {t.hero.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {t.hero.subtitle}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ContactCta className="inline-flex items-center gap-1.5 rounded-full bg-mark px-5 py-3 text-sm font-semibold text-mark-ink shadow transition-all hover:bg-mark-light">
                {t.hero.ctaDiscuss}
                <span className="btn-arrow" aria-hidden>
                  →
                </span>
              </ContactCta>
              <Link
                href="#plans"
                className="inline-flex items-center rounded-full border border-line bg-ink-2 px-5 py-3 text-sm font-semibold text-paper transition hover:border-line-strong"
              >
                {t.hero.ctaPlans}
              </Link>
            </div>
          </div>
          <div className="am-page-visual overflow-hidden rounded-2xl border border-line bg-ink-2">
            <ProductUI variant="aime" ratio="aspect-[16/10]" locale={locale} />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink-2/20">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.how.eyebrow}</p>
          <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
            {t.how.title}
          </h2>
          <div className="am-step-grid mt-6 grid gap-3 sm:grid-cols-2">
            {t.how.steps.map((step) => (
              <article
                key={step.num}
                className="rounded-2xl border border-line bg-ink-2 p-5"
              >
                <span className="font-mono text-xs font-semibold text-warm">{step.num}</span>
                <h3 className="mt-2 font-display text-base font-semibold text-paper">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.why.eyebrow}</p>
          <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
            {t.why.title}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {t.why.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 rounded-xl border border-line bg-ink-2 p-4 text-sm text-paper/90"
              >
                <span className="mt-0.5 font-bold text-mark">✓</span>
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <BrandStudioPlans locale={locale} id="plans" className="scroll-mt-24" />
      </div>

      <section className="border-t border-line bg-ink-2/20">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
          <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.faq.eyebrow}</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-paper">{t.faq.title}</h2>
          <dl className="mt-6 space-y-4">
            {t.faq.items.map((item) => (
              <div key={item.q} className="rounded-xl border border-line bg-ink-2 p-5">
                <dt className="text-sm font-semibold text-paper">{item.q}</dt>
                <dd className="mt-2 text-xs leading-relaxed text-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ContactCta className="inline-flex items-center rounded-full bg-mark px-6 py-3 text-sm font-semibold text-mark-ink shadow hover:bg-mark-light">
              {t.hero.ctaDiscuss} →
            </ContactCta>
            <Link
              href={brandStudioPath(locale)}
              className="inline-flex items-center rounded-full border border-line bg-ink-2 px-6 py-3 text-sm font-semibold text-paper hover:border-line-strong"
            >
              {t.hero.ctaPlans}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
