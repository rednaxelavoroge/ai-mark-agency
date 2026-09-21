import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCopy } from "@/content/copy";
import { products } from "@/content/packages";
import { productPagePath } from "@/lib/products";
import { absoluteUrl, isLocale, localePath, site, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = getCopy(locale);
  return {
    title: { absolute: `${t.products.title} · ${site.name}` },
    description: t.products.lead,
    alternates: {
      canonical: absoluteUrl(locale, "/products"),
      languages: {
        en: absoluteUrl("en", "/products"),
        ru: absoluteUrl("ru", "/products"),
      },
    },
  };
}

export default async function ProductsHubPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getCopy(locale);
  const home = localePath(locale);

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Link href={home} className="text-sm text-mark hover:underline">
        ← {site.name}
      </Link>
      <p className="mt-6 font-mono text-xs tracking-[0.2em] text-mark uppercase">
        {t.products.eyebrow}
      </p>
      <h1 className="mt-3 font-display text-4xl">{t.products.title}</h1>
      <p className="mt-4 max-w-2xl text-muted">{t.products.lead}</p>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {products.map((product) => {
          const item = t.products.items[product.id];
          return (
            <section
              key={product.id}
              className="flex flex-col rounded-xl border border-line bg-ink-2 p-6"
            >
              <h2 className="font-display text-xl">{product.name}</h2>
              <p className="mt-3 text-sm text-paper/90">{item.value}</p>
              <p className="mt-4 text-sm text-muted">{item.price}</p>
              <Link
                href={productPagePath(locale, product.id)}
                className="mt-6 inline-flex justify-center rounded-full bg-mark px-4 py-2.5 text-sm font-semibold text-mark-ink"
              >
                {t.products.detailCta}
              </Link>
            </section>
          );
        })}
      </div>
      <p className="mt-8 text-sm text-muted">
        <Link href={`${home}#contact`} className="text-mark hover:underline">
          {t.products.installCta}
        </Link>
      </p>
    </article>
  );
}
