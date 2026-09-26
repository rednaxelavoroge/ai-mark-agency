import { Explore } from "@/components/hub/Explore";
import { getCopy } from "@/content/copy";
import type { ProductId } from "@/content/packages";
import type { Locale } from "@/lib/site";

export function ProductGlance({ locale, id }: { locale: Locale; id: ProductId }) {
  const t = getCopy(locale);
  const item = t.products.items[id];
  const page = t.productPages[id];
  const isRu = locale === "ru";

  return (
    <div className="mx-auto mt-6 max-w-6xl px-4 sm:px-6">
      <div className="rounded-xl border border-line bg-ink-2 p-4 sm:p-5">
        <p className="font-mono text-[10px] uppercase tracking-wider text-warm">{page.eyebrow}</p>
        <p className="mt-1 text-sm text-muted">{page.lead}</p>
        <p className="mt-2 font-mono text-xs text-mark">{item.price}</p>
        <div className="mt-3">
          <Explore summary={isRu ? "Подробнее о продукте" : "Explore product"}>
            {page.sections.map((section) => (
              <p key={section.title}>
                <strong className="text-paper">{section.title}.</strong> {section.body}
              </p>
            ))}
            <p>
              <strong className="text-paper">{isRu ? "Контур." : "Loop."}</strong> {page.flow.join(" → ")}
            </p>
            <p>
              <strong className="text-paper">{t.products.whoLabel}.</strong> {item.who}
            </p>
            <p>
              <strong className="text-paper">{t.products.extraLabel}.</strong> {item.extra}
            </p>
            <p>
              <strong className="text-paper">{isRu ? "Коммерческая модель." : "Commercial model."}</strong> {item.price}
            </p>
          </Explore>
        </div>
      </div>
    </div>
  );
}
