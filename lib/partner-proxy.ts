import type { ProductId } from "@/content/packages";
import {
  partnerLandingUrl,
  productPagePath,
  productsHubPath,
  PRODUCT_PATHS,
} from "@/lib/products";
import { absoluteUrl, type Locale } from "@/lib/site";

const FETCH_UA =
  "Mozilla/5.0 (compatible; AI-Mark-Agency/1.0; +https://ai-mark.agency)";

const PRODUCT_IDS: ProductId[] = ["aime", "assistant", "showroom"];

function localKeepPrefixes(): string[] {
  const locales: Locale[] = ["en", "ru"];
  const paths: string[] = [];
  for (const locale of locales) {
    paths.push(productsHubPath(locale));
    for (const id of PRODUCT_IDS) {
      paths.push(productPagePath(locale, id));
    }
  }
  return paths;
}

function rewritePartnerProductHrefs(html: string): string {
  const pairs: [RegExp, (locale: string) => string][] = [
    [
      /https?:\/\/(?:www\.)?alex-dev\.pro\/(en|ru)\/ai-marketing-employee\/?/g,
      (loc) => productPagePath(loc as Locale, "aime"),
    ],
    [
      /https?:\/\/(?:www\.)?alex-dev\.pro\/(en|ru)\/ai-business-assistant\/?/g,
      (loc) => productPagePath(loc as Locale, "assistant"),
    ],
    [
      /https?:\/\/(?:www\.)?alex-dev\.pro\/(en|ru)\/showroom-ai\/?/g,
      (loc) => productPagePath(loc as Locale, "showroom"),
    ],
    [
      /https?:\/\/(?:www\.)?alex-dev\.pro\/(en|ru)\/products\/?(?=["'?#]|$)/g,
      (loc) => productsHubPath(loc as Locale),
    ],
    [
      /https?:\/\/app\.alex-dev\.pro\/(en|ru)(?=["'/?#]|$)/g,
      (loc) => productPagePath(loc as Locale, "assistant"),
    ],
  ];

  for (const [re, to] of pairs) {
    html = html.replace(re, (_m, loc: string) => to(loc));
  }

  html = html.replace(
    /(["'])\/(en|ru)\/ai-marketing-employee\/?([?#][^"']*)?/g,
    (_m, q: string, loc: string, suffix = "") =>
      `${q}${productPagePath(loc as Locale, "aime")}${suffix}`,
  );
  html = html.replace(
    /(["'])\/(en|ru)\/ai-business-assistant\/?([?#][^"']*)?/g,
    (_m, q: string, loc: string, suffix = "") =>
      `${q}${productPagePath(loc as Locale, "assistant")}${suffix}`,
  );
  html = html.replace(
    /(["'])\/(en|ru)\/showroom-ai\/?([?#][^"']*)?/g,
    (_m, q: string, loc: string, suffix = "") =>
      `${q}${productPagePath(loc as Locale, "showroom")}${suffix}`,
  );
  html = html.replace(
    /(["'])\/(en|ru)\/products\/?(?=["'?#])/g,
    (_m, q: string, loc: string) => `${q}${productsHubPath(loc as Locale)}`,
  );

  return html;
}

function prefixRootRelative(
  html: string,
  origin: string,
  keep: string[],
): string {
  const shouldKeep = (path: string) => {
    const bare = path.split(/[?#]/)[0] || path;
    return keep.some(
      (prefix) => bare === prefix || bare.startsWith(`${prefix}/`),
    );
  };

  html = html.replace(/(["'])\/(?!\/)([^"']*)/g, (full, q: string, rest: string) => {
    const path = `/${rest}`;
    if (shouldKeep(path)) return full;
    return `${q}${origin}${path}`;
  });

  html = html.replace(
    /(url\((['"]?))\/(?!\/)/g,
    (_m, prefix: string) => `${prefix}${origin}/`,
  );

  html = html.replace(
    /(srcset=["'][^"']*)(,\s*)\/(?!\/)/gi,
    (_m, before: string, sep: string) => `${before}${sep}${origin}/`,
  );

  return html;
}

function freezeMarketingHtml(html: string, origin: string): string {
  html = html.replace(/(["'\s(,=])\/_next\//g, `$1${origin}/_next/`);
  html = html.replace(
    /<script\b(?![^>]*type=["']application\/ld\+json["'])[\s\S]*?<\/script>/gi,
    "",
  );
  html = html.replace(
    /<link\b[^>]*rel=["'](?:modulepreload|preload)["'][^>]*as=["']script["'][^>]*>/gi,
    "",
  );
  html = html.replace(
    /<link\b[^>]*as=["']script["'][^>]*rel=["'](?:modulepreload|preload)["'][^>]*>/gi,
    "",
  );
  return html;
}

function retargetSeo(html: string, canonical: string, locale: Locale): string {
  const pathname = new URL(canonical).pathname;
  const en = locale === "en"
    ? canonical
    : absoluteUrl("en", pathname.replace(/^\/ru/, "") || "/");
  const ru = locale === "ru"
    ? canonical
    : absoluteUrl("ru", pathname.startsWith("/ru") ? pathname.replace(/^\/ru/, "") || "/" : pathname);

  html = html.replace(
    /<link rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${canonical}"/>`,
  );
  html = html.replace(
    /property="og:url" content="[^"]*"/i,
    `property="og:url" content="${canonical}"`,
  );

  html = html.replace(
    /<link rel="alternate" hrefLang="en" href="[^"]*"\s*\/?>/gi,
    `<link rel="alternate" hrefLang="en" href="${en}"/>`,
  );
  html = html.replace(
    /<link rel="alternate" hrefLang="ru" href="[^"]*"\s*\/?>/gi,
    `<link rel="alternate" hrefLang="ru" href="${ru}"/>`,
  );
  html = html.replace(
    /<link rel="alternate" hrefLang="x-default" href="[^"]*"\s*\/?>/gi,
    `<link rel="alternate" hrefLang="x-default" href="${en}"/>`,
  );

  return html;
}

export async function proxyPartnerHtml(opts: {
  sourceUrl: string;
  canonical: string;
  locale: Locale;
}): Promise<Response> {
  let upstream: Response;
  try {
    upstream = await fetch(opts.sourceUrl, {
      headers: {
        accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        "user-agent": FETCH_UA,
      },
      redirect: "follow",
      next: { revalidate: 300 },
    });
  } catch {
    return new Response("Product page is temporarily unavailable.", {
      status: 502,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const contentType = upstream.headers.get("content-type") || "";
  if (!upstream.ok || !contentType.includes("text/html")) {
    return new Response("Product page is temporarily unavailable.", {
      status: 502,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const finalUrl = new URL(upstream.url);
  const origin = `${finalUrl.protocol}//${finalUrl.host}`;
  let html = await upstream.text();

  html = rewritePartnerProductHrefs(html);
  html = prefixRootRelative(html, origin, localKeepPrefixes());
  html = freezeMarketingHtml(html, origin);
  html = retargetSeo(html, opts.canonical, opts.locale);

  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, s-maxage=300, stale-while-revalidate=86400",
      "x-proxied-from": origin,
    },
  });
}

export function productProxy(locale: Locale, id: ProductId) {
  return proxyPartnerHtml({
    sourceUrl: partnerLandingUrl(locale, id),
    canonical: absoluteUrl(locale, PRODUCT_PATHS[id]),
    locale,
  });
}
