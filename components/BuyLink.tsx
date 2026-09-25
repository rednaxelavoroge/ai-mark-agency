import Link from "next/link";
import { PAY_PAGE_PATH, PAY_SKU_PARAM, payableSkuById } from "@/lib/crypto/catalog";
import { navHref, type Locale } from "@/lib/site";

/**
 * The buy call-to-action for a published, payable offering.
 *
 * This is the one component that turns "shown price" into "reachable purchase
 * path": it links to `/pay` and preselects the published sku, so a buyer who
 * just chose a plan on a product page does not have to find the payment page in
 * the footer and re-identify the product in a dropdown.
 *
 * Deliberately honest about what it is:
 *
 *   * `skuId` must be an id that exists in `PAYABLE_SKUS`. An unknown id makes
 *     the component render nothing rather than a link that would quietly fall
 *     back to a different product.
 *   * It carries no price. The amount is always resolved server-side from
 *     `PAYABLE_SKUS`, so a hand-edited URL cannot change what is invoiced.
 *   * It is used **only** for offerings with a published list price. Custom /
 *     "по запросу" tiers keep their contact call-to-action — a payable link
 *     there would invent a number.
 *
 * Server and client components both use it; it renders a plain link and holds
 * no state, so it needs no `"use client"` boundary of its own.
 */
export function BuyLink({
  locale,
  skuId,
  label,
  className,
}: {
  locale: Locale;
  skuId?: string;
  label: string;
  className?: string;
}) {
  const sku = skuId ? payableSkuById(skuId) : null;
  if (skuId && !sku) return null;

  const href = sku
    ? `${navHref(locale, PAY_PAGE_PATH)}?${PAY_SKU_PARAM}=${encodeURIComponent(sku.id)}`
    : navHref(locale, PAY_PAGE_PATH);

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
