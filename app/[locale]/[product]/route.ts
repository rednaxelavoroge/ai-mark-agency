import { isLocale, type Locale } from "@/lib/site";
import { productProxy } from "@/lib/partner-proxy";
import {
  PUBLIC_PRODUCT_SLUGS,
  resolvePublicProductSlug,
} from "@/lib/products";

export const dynamic = "force-dynamic";
export const dynamicParams = false;

type Props = { params: Promise<{ locale: string; product: string }> };

export function generateStaticParams() {
  return PUBLIC_PRODUCT_SLUGS.map((product) => ({ product }));
}

export async function GET(_request: Request, { params }: Props) {
  const { locale: raw, product } = await params;
  if (!isLocale(raw)) {
    return new Response("Not found", { status: 404 });
  }
  const id = resolvePublicProductSlug(product);
  if (!id) {
    return new Response("Not found", { status: 404 });
  }
  return productProxy(raw as Locale, id);
}
