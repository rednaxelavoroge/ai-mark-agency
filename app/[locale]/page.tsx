import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";
import { getCopy } from "@/content/copy";
import { packages, products } from "@/content/packages";
import { productPagePath, productsHubPath } from "@/lib/products";
import { absoluteUrl, isLocale, localePath, site, type Locale } from "@/lib/site";

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
  const home = localePath(locale);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(214,255,63,0.12),transparent_45%)]" />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">
              {t.hero.eyebrow}
            </p>
            <p className="mt-3 text-sm text-mark">{t.hero.tagline}</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl lg:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">{t.hero.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`${home}#packages`}
                className="rounded-full bg-mark px-5 py-3 text-sm font-semibold text-mark-ink"
              >
                {t.hero.primaryCta}
              </Link>
              <Link
                href={`${home}#tools`}
                className="rounded-full border border-line px-5 py-3 text-sm hover:border-paper/40"
              >
                {t.hero.secondaryCta}
              </Link>
            </div>
          </div>
          <ul className="grid gap-3 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            {t.hero.notes.map((note) => (
              <li key={note} className="text-sm text-paper/90">
                <span className="mr-2 text-mark">→</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section
        id="tools"
        eyebrow={t.products.eyebrow}
        title={t.products.title}
        lead={t.products.lead}
      >
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
                    href={`${home}#contact`}
                    className="inline-flex justify-center rounded-full border border-line px-4 py-2.5 text-sm hover:border-paper/40"
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

      <aside className="border-t border-line bg-ink-3">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">
              {t.agencyStrip.eyebrow}
            </p>
            <p className="mt-2 font-display text-2xl">{t.agencyStrip.title}</p>
            <p className="mt-2 text-sm text-muted">{t.agencyStrip.body}</p>
          </div>
          <Link
            href={productsHubPath(locale)}
            className="shrink-0 rounded-full bg-mark px-5 py-3 text-center text-sm font-semibold text-mark-ink"
          >
            {t.agencyStrip.cta}
          </Link>
        </div>
      </aside>

      <Section
        id="channels"
        eyebrow={t.channels.eyebrow}
        title={t.channels.title}
        lead={t.channels.lead}
      >
        <h3 className="font-display text-lg">{t.channels.loopTitle}</h3>
        <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
          {t.channels.loop.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-xl border border-line bg-ink-2 p-4"
            >
              <p className="font-mono text-xs text-mark">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 font-display text-base leading-snug">{step.title}</p>
              <p className="mt-1 text-xs text-muted">{step.note}</p>
              {i < t.channels.loop.length - 1 ? (
                <span className="pointer-events-none absolute top-1/2 -right-2 hidden text-mark lg:block">
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
        <h3 className="mt-12 font-display text-lg">{t.channels.linesTitle}</h3>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {t.channels.lines.map((line) => (
            <li
              key={line.name}
              className="rounded-xl border border-line bg-ink-2 p-5"
            >
              <p
                className={`inline-block rounded-full border px-2 py-0.5 text-xs ${
                  line.status === "live"
                    ? "border-mark text-mark"
                    : line.status === "later"
                      ? "border-line text-muted"
                      : "border-line text-paper/80"
                }`}
              >
                {t.channels.status[line.status]}
              </p>
              <h4 className="mt-3 font-display text-lg">{line.name}</h4>
              <p className="mt-2 text-sm text-muted">{line.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">{t.channels.footnote}</p>
      </Section>

      <Section id="model" eyebrow={t.model.eyebrow} title={t.model.title} lead={t.model.lead}>
        <ol className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          {t.model.chain.map((step, i) => (
            <li key={step} className="flex items-center gap-2 text-sm">
              <span className="rounded-full border border-line bg-ink-2 px-3 py-1.5">
                {step}
              </span>
              {i < t.model.chain.length - 1 ? (
                <span className="hidden text-mark sm:inline">→</span>
              ) : null}
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-sm text-paper/90">{t.model.shift}</p>
        <div className="mt-8 rounded-xl border border-line bg-ink-2 p-6">
          <h3 className="font-display text-xl">{t.model.scaleTitle}</h3>
          <p className="mt-2 text-sm text-muted">{t.model.scaleBody}</p>
        </div>
      </Section>

      <Section id="how" eyebrow={t.how.eyebrow} title={t.how.title} lead={t.how.lead}>
        <p className="mb-8 max-w-3xl rounded-xl border border-mark/40 bg-ink-3 p-4 text-sm">
          {t.how.hitl}
        </p>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.how.steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-xl border border-line bg-ink-2 p-5"
            >
              <p className="font-mono text-xs text-mark">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="packages"
        eyebrow={t.packages.eyebrow}
        title={t.packages.title}
        lead={t.packages.lead}
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {packages.map((pkg) => {
            const item = t.packages.items[pkg.id];
            return (
              <article
                key={pkg.id}
                className={`flex flex-col rounded-xl border p-6 ${
                  pkg.featured
                    ? "border-mark bg-ink-3"
                    : "border-line bg-ink-2"
                }`}
              >
                {pkg.featured ? (
                  <p className="mb-3 text-xs font-semibold tracking-wide text-mark uppercase">
                    {t.packages.featured}
                  </p>
                ) : null}
                <h3 className="font-display text-2xl">{item.name}</h3>
                <p className="mt-3 font-display text-3xl tracking-tight">
                  {formatUsd(pkg.priceUsd)}
                  <span className="text-base text-muted">{t.packages.perMonth}</span>
                </p>
                <p className="mt-3 text-sm text-muted">{item.summary}</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-mark">·</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`${home}#contact`}
                  className={`mt-6 inline-flex justify-center rounded-full px-4 py-2.5 text-sm font-semibold ${
                    pkg.featured
                      ? "bg-mark text-mark-ink"
                      : "border border-line hover:border-paper/40"
                  }`}
                >
                  {t.packages.cta}
                </Link>
              </article>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-muted">{t.packages.footnote}</p>
      </Section>

      <Section
        id="stack"
        eyebrow={t.stack.eyebrow}
        title={t.stack.title}
        lead={t.stack.lead}
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-lg">{t.stack.readyTitle}</h3>
            <ul className="mt-4 space-y-4">
              {t.stack.ready.map((item) => (
                <li key={item.title} className="border-b border-line pb-4">
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg">{t.stack.laterTitle}</h3>
            <ul className="mt-4 space-y-4">
              {t.stack.later.map((item) => (
                <li key={item.title} className="border-b border-line pb-4">
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        id="compare"
        eyebrow={t.compare.eyebrow}
        title={t.compare.title}
        lead={t.compare.lead}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <tbody>
              {t.compare.rows.map((row) => {
                const isUs = row.name === t.compare.usLabel;
                return (
                  <tr
                    key={row.name}
                    className={isUs ? "bg-ink-3" : "border-b border-line"}
                  >
                    <th
                      scope="row"
                      className={`w-[38%] px-4 py-3 font-display font-medium ${
                        isUs ? "text-mark" : ""
                      }`}
                    >
                      {row.name}
                    </th>
                    <td className="px-4 py-3 text-muted">{row.body}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="fit" eyebrow={t.fit.eyebrow} title={t.fit.title}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-line bg-ink-2 p-6">
            <h3 className="font-display text-xl text-mark">{t.fit.forTitle}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {t.fit.forItems.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-ink-2 p-6">
            <h3 className="font-display text-xl">{t.fit.notTitle}</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {t.fit.notItems.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <aside id="partners" className="scroll-mt-24 border-t border-line bg-ink-3">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">
              {t.partners.eyebrow}
            </p>
            <p className="mt-2 font-display text-2xl">{t.partners.title}</p>
            <p className="mt-2 text-sm text-muted">{t.partners.body}</p>
          </div>
          <Link
            href={`${home}#contact`}
            className="shrink-0 rounded-full bg-mark px-5 py-3 text-center text-sm font-semibold text-mark-ink"
          >
            {t.partners.cta}
          </Link>
        </div>
      </aside>

      <Section
        id="contact"
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        lead={t.contact.lead}
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
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
