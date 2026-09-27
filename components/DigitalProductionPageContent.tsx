import Link from "next/link";
import { ContactCta } from "@/components/ContactCta";
import { ProductUI } from "@/components/ui/ProductUI";
import { getDigitalProductionCopy } from "@/content/digital-production";
import { navHref, type Locale } from "@/lib/site";
import { productPagePath, productsHubPath } from "@/lib/products";
import { Pipeline } from "@/components/Pipeline";

export function DigitalProductionPageContent({ locale }: { locale: Locale }) {
  const t = getDigitalProductionCopy(locale);

  return (
    <article>
      <section className="relative overflow-hidden border-b border-line">
        <div className="ambient-drift pointer-events-none absolute -right-20 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(198,214,139,0.12),transparent_68%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:py-20">
          <div data-reveal>
            <p className="font-mono text-[11px] font-semibold tracking-[0.22em] text-warm uppercase">
              {t.hero.label}
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.08] tracking-tight text-paper sm:text-5xl">
              {t.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {t.hero.body}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-line bg-ink-2 px-3 py-1 font-mono text-[10px] font-semibold tracking-wider text-mark uppercase">
                {t.hero.badge}
              </span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <ContactCta className="inline-flex items-center gap-1.5 rounded-full bg-mark px-5 py-3 text-sm font-semibold text-mark-ink shadow transition-all hover:bg-mark-light">
                {t.hero.cta}
                <span className="btn-arrow" aria-hidden>
                  →
                </span>
              </ContactCta>
              <Link
                href={productsHubPath(locale)}
                className="inline-flex items-center rounded-full border border-line bg-ink-2 px-5 py-3 text-sm font-semibold text-paper transition hover:border-line-strong"
              >
                {t.bottom.secondary}
              </Link>
            </div>
          </div>
          <div className="min-w-0" data-reveal="scale">
            <ProductUI variant="saas" ratio="aspect-[16/10] sm:aspect-[16/9] lg:h-[420px] lg:aspect-auto" />
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div data-reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.contrast.eyebrow}</p>
            <h2 className="mt-3 max-w-3xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">
              {t.contrast.title}
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article
              data-reveal
              className="flex flex-col rounded-2xl border border-line bg-ink-2 p-6 sm:p-7"
            >
              <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-warm uppercase">
                SKU
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-paper">
                {t.contrast.catalogTitle}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t.contrast.catalogBody}</p>
              <Link
                href={productsHubPath(locale)}
                className="mt-5 inline-flex text-xs font-semibold text-warm hover:text-paper"
              >
                {t.contrast.catalogLink}
              </Link>
            </article>
            <article
              data-reveal
              className="flex flex-col rounded-2xl border border-mark/30 bg-mark/5 p-6 sm:p-7"
            >
              <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-mark uppercase">
                {t.hero.badge}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-paper">
                {t.contrast.productionTitle}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {t.contrast.productionBody}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink-2/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div data-reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.builds.eyebrow}</p>
            <h2 className="mt-3 max-w-3xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">
              {t.builds.title}
            </h2>
            <p className="mt-4 max-w-2xl text-muted">{t.builds.lead}</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {t.builds.items.map((item, i) => (
              <article
                key={item.title}
                data-reveal
                className="catalog-card peek-host group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-ink-2"
              >
                <div className="p-4 sm:p-5">
                  <div className="overflow-hidden rounded-xl border border-line bg-ink-3/30">
                    <ProductUI variant={item.mock} ratio="aspect-[16/9]" peek />
                  </div>
                </div>
                <div className="flex flex-1 flex-col border-t border-line p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-warm uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] font-semibold tracking-wider text-mark uppercase">
                      {t.hero.badge}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-paper">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{item.forWhom}</p>
                  <ul className="mt-4 space-y-2 border-t border-line/60 pt-3">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-[11px] leading-relaxed text-paper/85">
                        <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-mark/15 text-[10px] font-bold text-mark">
                          ✓
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div data-reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.process.eyebrow}</p>
            <h2 className="mt-3 max-w-3xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">
              {t.process.title}
            </h2>
            <p className="mt-4 max-w-2xl text-muted">{t.process.lead}</p>
          </div>
          <div className="mt-10 min-w-0">
            <Pipeline steps={t.process.steps} />
          </div>
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-muted">{t.process.note}</p>
        </div>
      </section>

      <section className="border-b border-line bg-ink-2/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div data-reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.scenarios.eyebrow}</p>
            <h2 className="mt-3 max-w-3xl font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">
              {t.scenarios.title}
            </h2>
            <p className="mt-4 max-w-2xl text-muted">{t.scenarios.lead}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {t.scenarios.items.map((item, i) => (
              <article
                key={item.title}
                data-reveal
                className="rounded-2xl border border-line bg-ink-2 p-6 transition hover:-translate-y-1 hover:border-line-strong hover:shadow-md"
              >
                <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-warm">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-paper">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div
            data-reveal
            className="overflow-hidden rounded-2xl border border-line bg-ink-2 p-6 sm:p-8"
          >
            <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.embed.eyebrow}</p>
            <h2 className="mt-3 max-w-3xl font-editorial text-2xl leading-tight tracking-tight text-paper sm:text-3xl">
              {t.embed.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-muted">{t.embed.lead}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href={productPagePath(locale, "aime")}
                className="rounded-full border border-line bg-ink-3/40 px-3.5 py-2 text-xs text-paper hover:border-line-strong"
              >
                {t.embed.aime}
              </Link>
              <Link
                href={productPagePath(locale, "assistant")}
                className="rounded-full border border-line bg-ink-3/40 px-3.5 py-2 text-xs text-paper hover:border-line-strong"
              >
                {t.embed.assistant}
              </Link>
              <Link
                href={productPagePath(locale, "showroom")}
                className="rounded-full border border-line bg-ink-3/40 px-3.5 py-2 text-xs text-paper hover:border-line-strong"
              >
                {t.embed.showroom}
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted">{t.embed.orCustom}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24" data-reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">{t.hero.label}</p>
          <h2 className="mt-3 font-editorial text-3xl leading-tight tracking-tight text-paper sm:text-4xl">
            {t.hero.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted">{t.hero.body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ContactCta className="inline-flex items-center gap-1.5 rounded-full bg-mark px-6 py-3 text-sm font-semibold text-mark-ink shadow transition-all hover:bg-mark-light">
              {t.bottom.primary}
              <span className="btn-arrow" aria-hidden>
                →
              </span>
            </ContactCta>
            <Link
              href={navHref(locale, "/products")}
              className="inline-flex items-center rounded-full border border-line bg-ink-2 px-6 py-3 text-sm font-semibold text-paper transition hover:border-line-strong"
            >
              {t.bottom.secondary}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
