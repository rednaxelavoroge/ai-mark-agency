import { notFound } from "next/navigation";
import { getCopy } from "@/content/copy";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
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
      <JsonLd locale={locale} />
      <Header locale={locale} t={t} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} t={t} />
    </div>
  );
}
