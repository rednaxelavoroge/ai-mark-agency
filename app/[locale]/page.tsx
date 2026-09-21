import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Pipeline } from "@/components/Pipeline";
import { Section } from "@/components/Section";
import { getCopy } from "@/content/copy";
import { packages, products } from "@/content/packages";
import { productPagePath, productsHubPath } from "@/lib/products";
import { absoluteUrl, isLocale, navHref, site, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = getCopy(locale);
  const url = absoluteUrl(locale);

  return {
    title: { absolute: t.meta.title },
    description: t.meta.description,
    keywords: t.meta.keywords,
    alternates: {
      canonical: url,
      languages: {
        en: site.url,
        ru: `${site.url}/ru`,
        "x-default": site.url,
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: t.meta.ogTitle,
      description: t.meta.description,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      alternateLocale: locale === "ru" ? ["en_US"] : ["ru_RU"],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.ogTitle,
      description: t.meta.description,
    },
  };
}

function formatUsd(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getCopy(locale);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(58,67,24,0.08),transparent_50%)]" />
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="font-mono text-[11px] tracking-[0.22em] text-mark uppercase">
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.08] font-medium tracking-tight sm:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{t.hero.lead}</p>
          <p className="mt-4 max-w-2xl text-sm text-paper/80">{t.hero.extra}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={navHref(locale, "#contact")}
              className="rounded-full bg-mark px-5 py-3 text-sm font-semibold text-mark-ink"
            >
              {t.hero.primaryCta}
            </Link>
            <Link
              href={navHref(locale, "#how")}
              className="rounded-full border border-line px-5 py-3 text-sm hover:border-paper/30"
            >
              {t.hero.secondaryCta}
            </Link>
            <Link
              href={navHref(locale, "#investors")}
              className="rounded-full border border-line px-5 py-3 text-sm hover:border-paper/30"
            >
              {t.hero.investorCta}
            </Link>
          </div>
          <p className="mt-8 max-w-xl text-sm text-muted">{t.hero.soft}</p>
        </div>
      </section>

      <Section id="what-we-do" eyebrow={t.pillars.eyebrow} title={t.pillars.title}>
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {t.pillars.items.map((item) => (
            <li key={item.n} className="rounded-xl border border-line bg-ink-2 p-5">
              <p className="font-mono text-xs text-warm">{item.n}</p>
              <h3 className="mt-2 font-display text-lg leading-snug">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="business-creation"
        eyebrow={t.creation.eyebrow}
        title={t.creation.title}
        lead={t.creation.lead}
      >
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.creation.steps.map((step, i) => (
            <li key={step.title} className="rounded-xl border border-line bg-ink-2 p-5">
              <p className="font-mono text-xs text-warm">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-display text-lg">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-3xl rounded-xl border border-line bg-ink-3 p-5 text-sm">
          {t.creation.withoutIdea}
        </p>
      </Section>

      <Section id="pipeline" eyebrow={t.pipeline.eyebrow} title={t.pipeline.title}>
        <Pipeline steps={t.pipeline.steps} />
      </Section>

      <Section id="products" eyebrow={t.tech.eyebrow} title={t.tech.title} lead={t.tech.lead}>
        <p className="mb-6 font-display text-xl">{t.products.title}</p>
        <p className="mb-8 max-w-2xl text-sm text-muted">{t.products.lead}</p>
        <div className="grid gap-4 lg:grid-cols-3">
          {products.map((product) => {
            const item = t.products.items[product.id];
            return (
              <article
                key={product.id}
                className="flex flex-col rounded-xl border border-line bg-ink-2 p-6"
              >
                <h3 className="font-display text-xl">{product.name}</h3>
                <p className="mt-3 text-sm text-paper/90">{item.value}</p>
                <p className="mt-4 text-xs font-semibold tracking-wide text-mark uppercase">
                  {t.products.whoLabel}
                </p>
                <p className="mt-1 text-sm text-muted">{item.who}</p>
                <p className="mt-3 text-xs font-semibold tracking-wide text-muted uppercase">
                  {t.products.extraLabel}
                </p>
                <p className="mt-1 text-sm text-muted">{item.extra}</p>
                <p className="mt-4 flex-1 text-sm text-paper/80">{item.price}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link
                    href={productPagePath(locale, product.id)}
                    className="inline-flex justify-center rounded-full bg-mark px-4 py-2.5 text-sm font-semibold text-mark-ink"
                  >
                    {t.products.detailCta}
                  </Link>
                  <Link
                    href={navHref(locale, "#contact")}
                    className="inline-flex justify-center rounded-full border border-line px-4 py-2.5 text-sm hover:border-paper/30"
                  >
                    {t.products.installCta}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-6 text-sm">
          <Link href={productsHubPath(locale)} className="text-mark hover:underline">
            {t.products.hubCta} →
          </Link>
        </p>
      </Section>

      <Section
        id="production"
        eyebrow={t.production.eyebrow}
        title={t.production.title}
        lead={t.production.lead}
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {t.production.items.map((item) => (
            <li key={item} className="rounded-xl border border-line bg-ink-2 px-5 py-4 text-sm">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm text-muted">{t.production.note}</p>
      </Section>

      <Section id="cycle" eyebrow={t.cycle.eyebrow} title={t.cycle.title} lead={t.cycle.lead}>
        <Pipeline steps={t.cycle.steps} />
      </Section>

      <Section id="how" eyebrow={t.how.eyebrow} title={t.how.title} lead={t.how.lead}>
        <p className="mb-8 max-w-3xl rounded-xl border border-mark/30 bg-ink-3 p-4 text-sm">
          {t.how.hitl}
        </p>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.how.steps.map((step, i) => (
            <li key={step.title} className="rounded-xl border border-line bg-ink-2 p-5">
              <p className="font-mono text-xs text-warm">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="commercial"
        eyebrow={t.commercial.eyebrow}
        title={t.commercial.title}
        lead={t.commercial.lead}
      >
        <p className="mb-8 max-w-3xl text-sm text-paper/85">{t.commercial.skuNote}</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {t.commercial.tiers.map((tier) => (
            <article key={tier.name} className="rounded-xl border border-line bg-ink-2 p-6">
              <h3 className="font-display text-xl">{tier.name}</h3>
              <p className="mt-2 font-display text-2xl tracking-tight">{tier.price}</p>
              <p className="mt-3 text-sm text-muted">{tier.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="font-display text-2xl">
            {t.commercial.tiers[2].name}
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-muted">{t.commercial.tiers[2].body}</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {packages.map((pkg) => {
              const item = t.packages.items[pkg.id];
              return (
                <article
                  key={pkg.id}
                  className={`flex flex-col rounded-xl border p-6 ${
                    pkg.featured ? "border-mark bg-ink-3" : "border-line bg-ink-2"
                  }`}
                >
                  {pkg.featured ? (
                    <p className="mb-3 text-xs font-semibold tracking-wide text-mark uppercase">
                      {t.commercial.featured}
                    </p>
                  ) : null}
                  <h4 className="font-display text-2xl">{item.name}</h4>
                  <p className="mt-3 font-display text-3xl tracking-tight">
                    {formatUsd(pkg.priceUsd)}
                    <span className="text-base text-muted">{t.commercial.perMonth}</span>
                  </p>
                  <p className="mt-3 text-sm text-muted">{item.summary}</p>
                  <ul className="mt-5 flex-1 space-y-2 text-sm">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="text-warm">·</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={navHref(locale, "#contact")}
                    className={`mt-6 inline-flex justify-center rounded-full px-4 py-2.5 text-sm font-semibold ${
                      pkg.featured
                        ? "bg-mark text-mark-ink"
                        : "border border-line hover:border-paper/30"
                    }`}
                  >
                    {t.commercial.retainerCta}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
        <p className="mt-6 text-sm text-muted">{t.commercial.footnote}</p>
      </Section>

      <Section
        id="partners"
        eyebrow={t.partners.eyebrow}
        title={t.partners.title}
        lead={t.partners.lead}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.partners.types.map((type) => (
            <article key={type.title} className="rounded-xl border border-line bg-ink-2 p-5">
              <h3 className="font-display text-lg">{type.title}</h3>
              <p className="mt-2 text-sm text-muted">{type.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm font-medium">{t.partners.earn}</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {t.partners.can.map((item) => (
            <li key={item} className="rounded-full border border-line bg-ink-2 px-4 py-2 text-sm">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm text-muted">{t.partners.model}</p>
        <Link
          href={navHref(locale, "#contact")}
          className="mt-8 inline-flex rounded-full bg-mark px-5 py-3 text-sm font-semibold text-mark-ink"
        >
          {t.partners.cta}
        </Link>
      </Section>

      <Section id="why-now" eyebrow={t.why.eyebrow} title={t.why.title} lead={t.why.lead}>
        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <ul className="rounded-xl border border-line bg-ink-2 p-6">
            <li className="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">
              {t.why.oldLabel}
            </li>
            {t.why.old.map((item) => (
              <li key={item} className="border-t border-line py-2 text-sm">
                {item}
              </li>
            ))}
          </ul>
          <p className="hidden text-center font-display text-warm md:block">→</p>
          <ul className="rounded-xl border border-mark/40 bg-ink-3 p-6">
            <li className="mb-3 text-xs font-semibold tracking-wide text-mark uppercase">
              {t.why.newLabel}
            </li>
            {t.why.next.map((item) => (
              <li key={item} className="border-t border-line py-2 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 max-w-3xl text-sm text-muted">{t.why.close}</p>
      </Section>

      <Section
        id="investors"
        eyebrow={t.investors.eyebrow}
        title={t.investors.title}
        lead={t.investors.lead}
      >
        <h3 className="font-display text-lg">{t.investors.usesTitle}</h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {t.investors.uses.map((item) => (
            <li key={item} className="rounded-xl border border-line bg-ink-2 px-5 py-4 text-sm">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm">{t.investors.not}</p>
        <p className="mt-3 max-w-3xl text-sm text-muted">{t.investors.scale}</p>
        <Link
          href={navHref(locale, "#contact")}
          className="mt-8 inline-flex rounded-full bg-mark px-5 py-3 text-sm font-semibold text-mark-ink"
        >
          {t.investors.cta}
        </Link>
      </Section>

      <Section id="network" eyebrow={t.network.eyebrow} title={t.network.title}>
        <Pipeline steps={t.network.nodes} result={t.network.result} />
      </Section>

      <Section id="contact" eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead}>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <ContactForm t={t.contact} />
          <aside className="rounded-xl border border-line bg-ink-2 p-6 text-sm text-muted">
            <p className="font-display text-paper">{site.domain}</p>
            <p className="mt-3">{t.footer.blurb}</p>
            <p className="mt-4">
              <a className="text-mark hover:underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
