import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCopy } from "@/content/copy";
import { products } from "@/content/packages";
import { productPagePath } from "@/lib/products";
import { absoluteUrl, isLocale, navHref, site, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = getCopy(locale);
  return {
    title: { absolute: `${t.products.hubTitle} · ${site.name}` },
    description: t.products.hubLead,
    alternates: {
      canonical: absoluteUrl(locale, "/products"),
      languages: {
        en: absoluteUrl("en", "/products"),
        ru: absoluteUrl("ru", "/products"),
      },
    },
  };
}

const PRODUCT_IMAGES = {
  aime: "/work/ai-marketing-employee-desktop-1280.webp",
  assistant: "/work/ai-business-assistant-desktop-1280.webp",
  showroom: "/work/showroom-ai-desktop-1280.webp",
};

export default async function ProductsHubPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getCopy(locale);
  const isRu = locale === "ru";

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="max-w-3xl">
        <p className="font-mono text-[11px] tracking-[0.22em] text-mark uppercase font-semibold">
          {t.products.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-semibold text-paper">
          {t.products.hubTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted leading-relaxed">
          {t.products.hubLead}
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {products.map((product) => {
          const item = t.products.items[product.id];
          const page = t.productPages[product.id];
          const imageSrc = PRODUCT_IMAGES[product.id];

          return (
            <section
              key={product.id}
              className="flex flex-col justify-between rounded-2xl border border-line bg-ink-2 p-6 sm:p-7 shadow-sm transition-all hover:border-line-strong hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-warm font-semibold uppercase tracking-wider">
                    {page.eyebrow}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-mark" />
                </div>

                <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-xl border border-line bg-ink-3/40">
                  <Image
                    src={imageSrc}
                    alt={product.name}
                    fill
                    className="object-cover object-top transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <h2 className="mt-5 font-display text-xl font-semibold text-paper">
                  {product.name}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-muted">{item.value}</p>

                <div className="mt-5 border-t border-line/60 pt-3">
                  <span className="font-mono text-[10px] text-mark font-semibold uppercase tracking-wider block">
                    {t.products.whoLabel}
                  </span>
                  <p className="mt-1 text-xs text-paper/85">{item.who}</p>
                </div>

                <div className="mt-3">
                  <span className="font-mono text-[10px] text-muted uppercase tracking-wider block">
                    {t.products.extraLabel}
                  </span>
                  <p className="mt-1 text-xs text-muted">{item.extra}</p>
                </div>
              </div>

              <div className="mt-6 border-t border-line pt-4">
                <p className="font-mono text-xs font-semibold text-mark">{item.price}</p>
                <div className="mt-4 flex items-center gap-2">
                  <Link
                    href={productPagePath(locale, product.id)}
                    className="flex-1 text-center rounded-full bg-mark px-4 py-2.5 text-xs font-semibold text-mark-ink shadow hover:bg-mark-light transition-all"
                  >
                    {t.products.detailCta} →
                  </Link>
                  <Link
                    href={navHref(locale, "#contact")}
                    className="rounded-full border border-line bg-ink-3/40 px-3.5 py-2.5 text-xs font-medium text-paper hover:bg-ink-3 transition-colors"
                  >
                    {t.products.installCta}
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-12 rounded-2xl border border-line bg-ink-3/30 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="font-display text-base font-semibold text-paper">
            {isRu ? "Нужна помощь с выбором архитектуры?" : "Need guidance choosing product architecture?"}
          </h3>
          <p className="mt-1 text-xs text-muted">
            {isRu
              ? "Мы поможем оценить сценарий вашей компании и подобрать точную конфигурацию."
              : "We'll review your company workflow and formulate the precise stack configuration."}
          </p>
        </div>
        <Link
          href={navHref(locale, "#contact")}
          className="inline-flex rounded-full bg-mark px-6 py-2.5 text-xs font-semibold text-mark-ink shadow hover:bg-mark-light transition-all whitespace-nowrap"
        >
          {t.hero.primaryCta} →
        </Link>
      </div>
    </article>
  );
}
