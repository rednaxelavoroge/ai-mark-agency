import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCopy } from "@/content/copy";
import { absoluteUrl, isLocale, localePath, site, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = getCopy(locale);
  return {
    title: t.privacy.title,
    description: t.privacy.paragraphs[0],
    alternates: {
      canonical: absoluteUrl(locale, "/privacy"),
      languages: {
        en: `${site.url}/privacy`,
        ru: `${site.url}/ru/privacy`,
      },
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getCopy(locale);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <a href={localePath(locale)} className="text-sm text-mark hover:underline">
        ← {site.name}
      </a>
      <h1 className="mt-6 font-display text-4xl">{t.privacy.title}</h1>
      <p className="mt-2 text-sm text-muted">{t.privacy.updated}</p>
      <div className="mt-8 space-y-4 text-sm leading-7 text-paper/90">
        {t.privacy.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </article>
  );
}
