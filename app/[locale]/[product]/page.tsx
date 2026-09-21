import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Pipeline } from "@/components/Pipeline";
import { getCopy } from "@/content/copy";
import type { ProductId } from "@/content/packages";
import {
  PRODUCT_PATHS,
  PUBLIC_PRODUCT_SLUGS,
  productsHubPath,
  resolvePublicProductSlug,
} from "@/lib/products";
import { absoluteUrl, isLocale, navHref, site, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string; product: string }> };

const ACCENT: Record<ProductId, string> = {
  aime: "from-[rgba(58,67,24,0.12)]",
  assistant: "from-[rgba(38,72,64,0.12)]",
  showroom: "from-[rgba(138,115,72,0.14)]",
};

export function generateStaticParams() {
  return PUBLIC_PRODUCT_SLUGS.map((product) => ({ product }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, product } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const id = resolvePublicProductSlug(product);
  if (!id) return {};
  const t = getCopy(locale);
  const page = t.productPages[id];
  const path = PRODUCT_PATHS[id];
  return {
    title: { absolute: `${page.title} · ${site.name}` },
    description: page.lead,
    alternates: {
      canonical: absoluteUrl(locale, path),
      languages: {
        en: absoluteUrl("en", path),
        ru: absoluteUrl("ru", path),
      },
    },
    openGraph: {
      title: page.title,
      description: page.lead,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale: raw, product } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const id = resolvePublicProductSlug(product);
  if (!id) notFound();
  const t = getCopy(locale);
  const page = t.productPages[id];
  const item = t.products.items[id];

  return (
    <article>
      <section className={`relative overflow-hidden bg-gradient-to-br ${ACCENT[id]} to-transparent`}>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Link
            href={productsHubPath(locale)}
            className="text-sm text-mark hover:underline"
          >
            ← {t.products.hubTitle}
          </Link>
          <p className="mt-6 font-mono text-[11px] tracking-[0.22em] text-mark uppercase">
            {page.eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">{page.lead}</p>
          <p className="mt-4 max-w-2xl text-sm text-paper/80">{page.metaphor}</p>
          <p className="mt-6 text-sm">{item.price}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={navHref(locale, "#contact")}
              className="rounded-full bg-mark px-5 py-3 text-sm font-semibold text-mark-ink"
            >
              {t.products.installCta}
            </Link>
            <Link
              href={navHref(locale, "/")}
              className="rounded-full border border-line px-5 py-3 text-sm hover:border-paper/30"
            >
              {t.nav.items[0].label}
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Pipeline steps={page.flow} />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {page.sections.map((section) => (
            <section key={section.title} className="rounded-xl border border-line bg-ink-2 p-6">
              <h2 className="font-display text-xl">{section.title}</h2>
              <p className="mt-3 text-sm text-muted">{section.body}</p>
            </section>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-line bg-ink-3 p-6">
          <p className="text-xs font-semibold tracking-wide text-mark uppercase">
            {t.products.whoLabel}
          </p>
          <p className="mt-2 text-sm">{item.who}</p>
          <p className="mt-4 text-xs font-semibold tracking-wide text-muted uppercase">
            {t.products.extraLabel}
          </p>
          <p className="mt-2 text-sm text-muted">{item.extra}</p>
        </div>
      </div>
    </article>
  );
}
