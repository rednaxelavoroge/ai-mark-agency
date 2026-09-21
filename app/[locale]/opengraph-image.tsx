import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { isLocale, site } from "@/lib/site";
import { socialAlt } from "@/lib/social";

export const dynamic = "force-static";

export const alt = socialAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

export function generateStaticParams() {
  return site.locales.map((locale) => ({ locale }));
}

/**
 * Per-locale link preview, served from the supplied 1200x630 artwork so the
 * social card carries the real brand composite instead of a generated
 * placeholder.
 *
 * This is a file convention rather than `openGraph.images` on purpose: Next
 * shallowly merges a page's metadata over its layout's, so any page declaring
 * its own `openGraph` object (home, product, investors) would silently drop a
 * config-based image. File-based metadata is resolved per segment, which means
 * every route under `/[locale]` — including ones added later — inherits the
 * right artwork automatically.
 *
 * Read once at module scope: the bytes never depend on request data, and this
 * route is prerendered for both locales.
 */
const previews = {
  en: readFile(join(process.cwd(), "public/og/ai-mark-preview-en.jpg")),
  ru: readFile(join(process.cwd(), "public/og/ai-mark-preview-ru.jpg")),
} as const;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const bytes = await (isLocale(raw) ? previews[raw] : previews[site.defaultLocale]);

  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
