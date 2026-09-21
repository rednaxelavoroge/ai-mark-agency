import { isLocale, type Locale } from "@/lib/site";
import { productProxy } from "@/lib/partner-proxy";
import { resolveProductSlug } from "@/lib/products";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) {
    return new Response("Not found", { status: 404 });
  }
  const product = resolveProductSlug(slug);
  if (!product) {
    return new Response("Not found", { status: 404 });
  }
  return productProxy(raw as Locale, product);
}
