import { notFound } from "next/navigation";
import { getCopy } from "@/content/copy";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HtmlLang } from "@/components/HtmlLang";
import { JsonLd } from "@/components/JsonLd";
import { MotionRoot, ScrollProgress } from "@/components/Motion";
import { PageTransition } from "@/components/PageTransition";
import { isLocale, site, type Locale } from "@/lib/site";

export function generateStaticParams() {
  return site.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getCopy(locale);

  return (
    <div lang={locale} className="flex min-h-full flex-col">
      <HtmlLang locale={locale} />
      <JsonLd locale={locale} />
      <noscript>
        {/* Reveal-on-scroll must never hide content when JS is unavailable. */}
        <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
      </noscript>
      <div className="grain-overlay" aria-hidden />
      <MotionRoot />
      <ScrollProgress />
      <Header locale={locale} t={t} />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer locale={locale} t={t} />
    </div>
  );
}
