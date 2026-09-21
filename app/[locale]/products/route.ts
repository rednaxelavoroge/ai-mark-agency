import { isLocale, type Locale } from "@/lib/site";
import { hubProxy } from "@/lib/partner-proxy";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    return new Response("Not found", { status: 404 });
  }
  return hubProxy(raw as Locale);
}
