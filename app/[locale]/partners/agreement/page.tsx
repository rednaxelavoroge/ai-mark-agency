import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/BackButton";
import { cardClass } from "@/components/ui/classes";
import {
  partnerAgreement,
  partnerAgreementHeader,
} from "@/content/partner-agreement";
import { absoluteUrl, isLocale, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const doc = partnerAgreement(raw === "ru" ? "ru" : "en");
  const header = partnerAgreementHeader[raw] ?? partnerAgreementHeader.en;
  return {
    title: header.title,
    description: doc.sections[0]?.paragraphs[0]?.slice(0, 160),
    alternates: {
      canonical: absoluteUrl(raw as Locale, "/partners/agreement"),
    },
  };
}

export default async function PartnerAgreementPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const useRu = locale === "ru";
  const doc = partnerAgreement(useRu ? "ru" : "en");
  const header = partnerAgreementHeader[locale] ?? partnerAgreementHeader.en;

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <BackButton locale={locale} targetHref="/partners" />
      <header className="mt-8">
        <p className="text-[11px] tracking-[0.2em] text-muted uppercase">AI MARK</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {header.title}
        </h1>
        <p className="mt-2 text-sm text-muted">
          Version {doc.version} · {doc.updated}
        </p>
        {header.notice ? (
          <p className="mt-3 text-sm text-muted">{header.notice}</p>
        ) : null}
      </header>

      <article className={`mt-10 grid gap-8 p-6 sm:p-8 ${cardClass}`}>
        {doc.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-base font-semibold tracking-tight">{section.title}</h2>
            <div className="mt-3 grid gap-3 text-sm leading-relaxed text-muted">
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </article>

      <p className="mt-8 text-xs text-muted">
        {locale === "ru"
          ? "Создавая партнёрский аккаунт, вы принимаете эту версию соглашения."
          : "By creating a partner account you accept this agreement version."}
      </p>
    </main>
  );
}
