"use client";

import { ContactForm } from "@/components/ContactForm";
import type { Copy } from "@/content/copy";
import type { Locale } from "@/lib/site";

/**
 * Public request form. Posts to `/api/contact`, which attributes the row from
 * the referral cookie. The visitor does not send a partner id, a rate, or a payment.
 */
export function LeadInquiry({
  contact,
  locale,
  scenario,
  framed = true,
  compact = false,
}: {
  contact: Copy["contact"];
  locale: Locale;
  scenario?: "aime" | "assistant" | "showroom";
  framed?: boolean;
  /** Parent already rendered the section title. */
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="grid max-w-xl gap-6">
        <p className="text-sm leading-relaxed text-muted">{contact.formNote}</p>
        <ContactForm t={contact} locale={locale} scenario={scenario} />
      </div>
    );
  }

  const body = (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div>
        <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase">
          {contact.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper">
          {contact.title}
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{contact.formNote}</p>
      </div>
      <ContactForm t={contact} locale={locale} scenario={scenario} />
    </div>
  );

  if (!framed) return body;

  return (
    <section id="inquiry" className="scroll-mt-24 border-b border-line py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{body}</div>
    </section>
  );
}

export function InquiryLink({
  contact,
  className,
}: {
  contact: Copy["contact"];
  className: string;
}) {
  return (
    <a href="#inquiry" className={className}>
      {contact.formCta}
    </a>
  );
}
