import type { Metadata } from "next";
import { headers } from "next/headers";
import { Manrope, Unbounded, Playfair_Display, Noto_Sans_Arabic, Noto_Sans_SC, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { isLocale, isRtlLocale, site } from "@/lib/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
});

const notoAr = Noto_Sans_Arabic({
  variable: "--font-noto-ar",
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
});

const notoSc = Noto_Sans_SC({
  variable: "--font-noto-sc",
  weight: ["400", "600", "700"],
  preload: false,
});

const notoJp = Noto_Sans_JP({
  variable: "--font-noto-jp",
  weight: ["400", "600", "700"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  robots: { index: true, follow: true },
};

const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light"){var m=document.cookie.match(/(?:^|; )theme=(light|dark)/);t=m?m[1]:"light";}document.documentElement.setAttribute("data-theme",t);document.documentElement.style.colorScheme=t;}catch(e){}})();`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const localeHeader = headerList.get("x-locale") ?? site.defaultLocale;
  const locale = isLocale(localeHeader) ? localeHeader : site.defaultLocale;
  const dir = isRtlLocale(locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      data-theme="light"
      style={{ colorScheme: "light" }}
      className={`${manrope.variable} ${unbounded.variable} ${playfair.variable} ${notoAr.variable} ${notoSc.variable} ${notoJp.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full bg-ink text-paper">{children}</body>
    </html>
  );
}
