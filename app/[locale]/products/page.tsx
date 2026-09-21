import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCopy } from "@/content/copy";
import { products } from "@/content/packages";
import { ProductUI, type ProductVariant } from "@/components/ui/ProductUI";
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

const PRODUCT_MOCK: Record<string, ProductVariant> = {
  aime: "aime",
  assistant: "assistant",
  showroom: "showroom",
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

      {/* Ecosystem band */}
      <div
        className="mt-10 overflow-hidden rounded-2xl border border-line bg-ink-2 p-5 sm:p-6"
        data-reveal
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-mark px-4 py-2 font-mono text-[11px] font-semibold text-mark-ink">
            <span className="relative h-1.5 w-1.5 rounded-full bg-mark-ink text-mark-ink pulse-ring" />
            AI Mark Core
          </span>
          {(["aime", "assistant", "showroom"] as const).map((id, i) => (
            <span key={id} className="flex items-center gap-3">
              <svg width="42" height="12" viewBox="0 0 42 12" className="hidden text-warm sm:block">
                <line x1="2" y1="6" x2="40" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.28" />
                <line
                  x1="2"
                  y1="6"
                  x2="40"
                  y2="6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  className="flow-dash"
                  style={{ animationDelay: `${i * 260}ms` }}
                />
              </svg>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-3/40 px-3.5 py-2 text-xs text-paper">
                <span className="h-1.5 w-1.5 rounded-full bg-mark" />
                {products.find((p) => p.id === id)?.name ?? id}
              </span>
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">
          {isRu
            ? "Продукты работают автономно и как единый стек: общая база знаний, единый инбокс и сквозная аналитика."
            : "The products run standalone and as one stack: shared knowledge base, unified inbox and end-to-end analytics."}
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {products.map((product) => {
          const item = t.products.items[product.id];
          const page = t.productPages[product.id];
          const mock = PRODUCT_MOCK[product.id] ?? "saas";

          return (
            <section
              key={product.id}
              className="flex flex-col justify-between rounded-2xl border border-line bg-ink-2 p-6 sm:p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-warm font-semibold uppercase tracking-wider">
                    {page.eyebrow}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-mark" />
                </div>

                <div className="mt-4" data-reveal="scale">
                  <ProductUI variant={mock} ratio="aspect-[16/11]" />
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
