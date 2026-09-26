import Link from "next/link";
import { ContactCta } from "@/components/ContactCta";
import { BuyLink } from "@/components/BuyLink";
import { Explore } from "@/components/hub/Explore";
import { HScroll } from "@/components/hub/HScroll";
import { getCopy } from "@/content/copy";
import { products } from "@/content/packages";
import { productPagePath } from "@/lib/products";
import type { Locale } from "@/lib/site";

export function CompactProductsHub({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const isRu = locale === "ru";

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <p className="font-mono text-[11px] tracking-[0.22em] text-mark uppercase font-semibold">
        {t.products.eyebrow}
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-paper sm:text-5xl">{t.products.hubTitle}</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted leading-relaxed">{t.products.hubLead}</p>

      <div className="mt-8">
        <HScroll cols={3} label={t.products.hubTitle}>
          {products.map((product) => {
            const item = t.products.items[product.id];
            const page = t.productPages[product.id];
            return (
              <section key={product.id} role="listitem" className="flex flex-col rounded-xl border border-line bg-ink-2 p-4">
                <span className="font-mono text-[10px] font-semibold tracking-wider text-warm uppercase">
                  {page.eyebrow}
                </span>
                <h2 className="mt-1 font-display text-lg font-semibold text-paper">{product.name}</h2>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted">{item.value}</p>
                <p className="mt-3 font-mono text-[11px] font-semibold text-mark">{item.price}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    href={productPagePath(locale, product.id)}
                    className="rounded-full bg-mark px-3 py-1.5 text-[11px] font-semibold text-mark-ink hover:bg-mark-light"
                  >
                    {t.products.detailCta}
                  </Link>
                  <ContactCta className="rounded-full border border-line px-3 py-1.5 text-[11px] font-medium text-paper">
                    {t.products.installCta}
                  </ContactCta>
                </div>
                <div className="mt-3">
                  <Explore summary={isRu ? "Подробнее" : "Explore"}>
                    <p>
                      <strong className="text-paper">{isRu ? "Что делает." : "What it does."}</strong> {item.value}
                    </p>
                    <p>
                      <strong className="text-paper">{isRu ? "Каналы / контур." : "Channels / loop."}</strong>{" "}
                      {page.flow.join(" → ")}
                    </p>
                    {page.sections.map((section) => (
                      <p key={section.title}>
                        <strong className="text-paper">{section.title}.</strong> {section.body}
                      </p>
                    ))}
                    <p>
                      <strong className="text-paper">{t.products.whoLabel}.</strong> {item.who}
                    </p>
                    <p>
                      <strong className="text-paper">{t.products.extraLabel}.</strong> {item.extra}
                    </p>
                    <p>
                      <strong className="text-paper">{isRu ? "Коммерческая модель." : "Commercial model."}</strong>{" "}
                      {item.price}
                    </p>
                  </Explore>
                </div>
                <BuyLink
                  locale={locale}
                  label={isRu ? "Оплатить USDT / USDC" : "Pay USDT / USDC"}
                  className="mt-3 block w-full rounded-full border border-line px-3 py-2 text-center text-[11px] font-medium text-paper"
                />
              </section>
            );
          })}
        </HScroll>
      </div>

      <div className="mt-8 rounded-xl border border-line bg-ink-3/30 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-display text-base font-semibold text-paper">
            {isRu ? "Нужна помощь с выбором архитектуры?" : "Need guidance choosing product architecture?"}
          </h2>
          <p className="mt-1 text-xs text-muted">
            {isRu
              ? "Мы поможем оценить сценарий вашей компании и подобрать точную конфигурацию."
              : "We'll review your company workflow and formulate the precise stack configuration."}
          </p>
        </div>
        <ContactCta className="inline-flex rounded-full bg-mark px-5 py-2.5 text-xs font-semibold text-mark-ink hover:bg-mark-light whitespace-nowrap">
          {t.hero.primaryCta} →
        </ContactCta>
      </div>
    </article>
  );
}
