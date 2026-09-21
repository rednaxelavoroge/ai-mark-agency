import type { Metadata } from "next";
import { headers } from "next/headers";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";
import { isLocale, site } from "@/lib/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
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

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const headerLocale = (await headers()).get("x-locale") ?? site.defaultLocale;
  const lang = isLocale(headerLocale) ? headerLocale : site.defaultLocale;

  return (
    <html
      lang={lang}
      className={`${manrope.variable} ${unbounded.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-paper">{children}</body>
    </html>
  );
}
