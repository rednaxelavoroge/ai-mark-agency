import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.defaultLocale}
      className={`${manrope.variable} ${unbounded.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-paper">{children}</body>
    </html>
  );
}
