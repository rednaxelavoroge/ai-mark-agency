"use client";

import { useState } from "react";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/site";
import { getAimeCopy } from "@/content/products/aime";
import type { Copy } from "@/content/copy";
import { openLauncher } from "@/lib/contact";
import { BuyLink } from "@/components/BuyLink";
import { InquiryLink, LeadInquiry } from "@/components/LeadInquiry";
import { ProductConstellation } from "@/components/ui/ProductConstellation";

export function AIMEPageContent({
  locale,
  contact,
}: {
  locale: Locale;
  contact: Copy["contact"];
}) {
  const c = getAimeCopy(locale);
  const ru = locale === "ru";
  const section = (n: string, en: string, ruLabel: string) => `${n} // ${ru ? ruLabel : en}`;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <article className="min-h-screen bg-ink text-paper">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-ink-3/40 via-ink to-ink pb-16 pt-12 sm:pb-24 sm:pt-20">
        <div className="pointer-events-none absolute -top-40 right-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(45,56,27,0.1),transparent_70%)]" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-mark/20 bg-mark/5 px-3 py-1 text-[11px] font-mono tracking-widest text-mark uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-mark animate-pulse" />
                {c.badge}
              </div>

              <h1 className="mt-4 font-display text-4xl leading-[1.08] font-medium tracking-tight text-paper sm:text-5xl lg:text-6xl">
                {c.titleA} <span className="text-mark font-semibold">{c.titleB}</span>
              </h1>

              <p className="mt-3 font-mono text-xs text-warm tracking-wider uppercase">
                {c.tagline}
              </p>

              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                {c.subtitle}
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => openLauncher()}
                  className="inline-flex items-center rounded-full bg-mark px-6 py-3 text-sm font-semibold text-mark-ink shadow-md transition-all hover:bg-mark-light"
                >
                  {c.ctaConsult} →
                </button>
                <a
                  href="#pricing"
                  className="inline-flex items-center rounded-full border border-line bg-ink-2 px-5 py-3 text-sm font-medium text-paper hover:bg-ink-3 transition-colors"
                >
                  {c.ctaPricing}
                </a>
                <InquiryLink
                  contact={contact}
                  className="inline-flex items-center rounded-full border border-line bg-ink-2 px-5 py-3 text-sm font-medium text-paper hover:bg-ink-3 transition-colors"
                />
              </div>

              {/* Hero meta chips */}
              <div className="mt-8 flex flex-wrap gap-2 text-[11px] font-mono text-muted">
                {c.heroMeta.map((m, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 rounded-full border border-line bg-ink-2/60 px-3 py-1"
                  >
                    <span className="text-mark">✦</span> {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Product UI visual preview */}
            <div className="relative pb-0 sm:pb-14" data-reveal>
              <div data-reveal="scale" data-reveal-delay="120">
                <ProductConstellation variant="aime" locale={locale} />
              </div>

              {/* Platform pills */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {c.platforms.map((p) => (
                  <div
                    key={p.type}
                    className="flex items-center gap-1.5 rounded-lg border border-line bg-ink-2 px-3 py-1.5 text-xs font-mono"
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        p.status === "ready" ? "bg-emerald-500" : "bg-amber-500/70"
                      }`}
                    />
                    <span className="text-paper">{p.name}</span>
                    {p.badge && (
                      <span className="ml-1 text-[9px] text-muted font-mono">{p.badge}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SMM COMPARISON SECTION */}
      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
              {section("01", "Positioning", "Позиционирование")}
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-paper">
              {c.compareTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {c.compareSub}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {c.compareColumns.map((col) => (
              <div
                key={col.id}
                className={`rounded-2xl border p-6 sm:p-7 transition-all ${
                  col.featured
                    ? "border-mark/60 bg-ink-2 shadow-lg relative"
                    : "border-line bg-ink-2/60"
                }`}
              >
                {col.featured && (
                  <span className="absolute -top-3 right-6 rounded-full bg-mark px-3 py-0.5 font-mono text-[10px] font-semibold text-mark-ink uppercase">
                    AI MARK Core
                  </span>
                )}
                <span className="font-mono text-xs text-warm font-semibold uppercase">
                  {col.tag}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-paper">
                  {col.name}
                </h3>
                <p className="mt-4 text-xs leading-relaxed text-muted">
                  {col.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TWO USAGE TRACKS */}
      <section className="border-b border-line bg-ink-3/20 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
              {section("02", "How it is used", "Форматы использования")}
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-paper">
              {c.tracksTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {c.tracksSub}
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {c.tracks.map((t) => (
              <div
                key={t.id}
                className="flex flex-col justify-between rounded-2xl border border-line bg-ink-2 p-6 sm:p-8 shadow-sm"
              >
                <div>
                  <span className="rounded-full border border-mark/20 bg-mark/5 px-3 py-1 font-mono text-[10px] font-semibold text-mark uppercase">
                    {t.badge}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-paper">
                    {t.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-display text-xl font-bold text-mark">{t.pricePrimary}</span>
                    <span className="font-mono text-xs text-muted">{t.priceSecondary}</span>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-muted">
                    {t.summary}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-line/60 pt-4 text-xs text-paper/90">
                    {t.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-mark font-bold shrink-0">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-line">
                  <button
                    type="button"
                    onClick={() => openLauncher()}
                    className="w-full rounded-full bg-mark px-5 py-3 text-xs font-semibold text-mark-ink shadow hover:bg-mark-light transition-all"
                  >
                    {c.ctaConsult}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CLOSED-LOOP SMM WORKFLOW */}
      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
              {section("03", "How publishing works", "Технологический регламент")}
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-paper">
              {c.howTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {c.howSub}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.steps.map((st) => (
              <div
                key={st.num}
                className="rounded-xl border border-line bg-ink-2 p-6 transition-all hover:border-line-strong"
              >
                <span className="font-mono text-xs font-semibold text-warm">
                  {st.num}
                </span>
                <h4 className="mt-2 font-display text-base font-semibold text-paper leading-snug">
                  {st.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. META GRAPH API INFRASTRUCTURE & TRUST */}
      <section className="border-b border-line bg-ink-3/20 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Meta Cards */}
            <div>
              <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
                {section("04", "Account access", "Безопасность доступов")}
              </span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-paper">
                {c.metaTitle}
              </h2>
              <p className="mt-2 text-xs text-muted">
                {c.metaSub}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {c.metaCards.map((card, i) => (
                  <div key={i} className="rounded-xl border border-line bg-ink-2 p-4">
                    <h4 className="font-display text-xs font-semibold text-paper">
                      {card.title}
                    </h4>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Levels & Hard Floor */}
            <div>
              <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
                {section("05", "Approval before publish", "Модель согласования")}
              </span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-paper">
                {c.trustTitle}
              </h2>
              <p className="mt-2 text-xs text-muted">
                {c.trustSub}
              </p>

              <div className="mt-6 space-y-3">
                {c.trustLevels.map((lvl) => (
                  <div key={lvl.lvl} className="rounded-xl border border-line bg-ink-2 p-4">
                    <span className="font-mono text-[10px] text-warm font-semibold uppercase">
                      {lvl.lvl}
                    </span>
                    <h4 className="font-display text-xs font-semibold text-paper mt-0.5">
                      {lvl.title}
                    </h4>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted">
                      {lvl.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Hard-Floor notice */}
              <div className="mt-4 rounded-xl border border-mark/30 bg-mark/5 p-4 text-xs text-paper/90">
                <span className="font-mono text-mark font-bold uppercase tracking-wider block mb-1">
                  🛡 {c.hardFloorTitle}
                </span>
                <p className="text-[11px] leading-relaxed text-muted">
                  {c.hardFloorDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING SECTION */}
      <section id="pricing" className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
              {section("06", "Subscription price", "Стоимость подписки")}
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-paper">
              {c.pricingTitle}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {c.pricingSub}
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {/* Direct Plans */}
            {c.plansDirect.map((p) => (
              <div
                key={p.id}
                className={`flex flex-col justify-between rounded-2xl border p-6 sm:p-7 ${
                  p.featured
                    ? "border-mark/60 bg-ink-2 shadow-xl relative"
                    : "border-line bg-ink-2"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 right-6 rounded-full bg-mark px-3 py-0.5 font-mono text-[10px] font-semibold text-mark-ink uppercase">
                    {ru ? "Рекомендуем" : "Recommended"}
                  </span>
                )}
                <div>
                  <h3 className="font-display text-2xl font-semibold text-paper">{p.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold text-mark">{p.price}</span>
                    <span className="font-mono text-xs text-muted">{p.period}</span>
                  </div>
                  {p.note && <p className="mt-1 font-mono text-[10px] text-warm">{p.note}</p>}
                  <p className="mt-3 text-xs leading-relaxed text-muted">{p.desc}</p>

                  <ul className="mt-6 space-y-2 border-t border-line/60 pt-4 text-xs text-paper/90">
                    {p.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-mark font-bold shrink-0">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-line">
                  <button
                    type="button"
                    onClick={() => openLauncher()}
                    className={`w-full rounded-full px-5 py-3 text-xs font-semibold transition-all ${
                      p.featured
                        ? "bg-mark text-mark-ink shadow hover:bg-mark-light"
                        : "border border-line bg-ink-3/40 text-paper hover:bg-ink-3"
                    }`}
                  >
                    {c.ctaConsult}
                  </button>
                  {/* The published, self-serve way to buy this exact plan, and
                      only a plan that has one. A plan with no listed sku id
                      renders nothing here (the agency construct has no published
                      self-serve SKU), so its card keeps the contact CTA above
                      rather than inventing a price.
                      The guard is at the call site on purpose: `BuyLink` without
                      a sku is a legitimate family link (the /products hub and the
                      home showcase use it that way), but on a *priced plan card*
                      it would send the buyer to /pay with some other plan
                      preselected. */}
                  {p.skuId ? (
                    <BuyLink
                      locale={locale}
                      skuId={p.skuId}
                      label={
                        locale === "ru"
                          ? `Оплатить ${p.price} в USDT / USDC`
                          : `Pay ${p.price} with USDT / USDC`
                      }
                      className="mt-2 block w-full rounded-full border border-mark/50 bg-mark/10 px-5 py-3 text-center text-xs font-semibold text-mark transition-all hover:bg-mark/20"
                    />
                  ) : null}
                </div>
              </div>
            ))}

            {/* Agency Plan */}
            <div className="flex flex-col justify-between rounded-2xl border border-line bg-ink-2 p-6 sm:p-7">
              <div>
                <span className="rounded bg-ink-3 px-2 py-0.5 font-mono text-[10px] text-warm uppercase">
                  {ru ? "Агентский формат" : "Agency format"}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-paper">
                  {c.planAgency.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-paper">
                    {c.planAgency.price}
                  </span>
                  <span className="font-mono text-xs text-muted">{c.planAgency.period}</span>
                </div>
                <p className="mt-1 font-mono text-[10px] text-warm">{c.planAgency.note}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted">{c.planAgency.desc}</p>

                <ul className="mt-6 space-y-2 border-t border-line/60 pt-4 text-xs text-paper/90">
                  {c.planAgency.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-warm font-bold shrink-0">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-line">
                <button
                  type="button"
                  onClick={() => openLauncher()}
                  className="w-full rounded-full border border-line bg-ink-3/40 px-5 py-3 text-xs font-semibold text-paper hover:bg-ink-3 transition-all"
                >
                  {c.ctaConsult}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="border-b border-line bg-ink-3/20 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
              {section("07", "Questions", "Вопросы и ответы")}
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-paper">
              {c.faqTitle}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {c.faqSub}
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {c.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-xl border border-line bg-ink-2 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-paper"
                  >
                    <span>{faq.q}</span>
                    <span className="ml-4 font-mono text-muted text-base">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-line/60 p-5 pt-3 text-xs leading-relaxed text-muted bg-ink-3/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <LeadInquiry contact={contact} locale={locale} scenario="aime" />

      {/* 8. BOTTOM CTA BANNER */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-mark/30 bg-mark/5 p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-paper">
              {ru ? "Готовы запустить AI Marketing Employee?" : "Ready to start AI Marketing Employee?"}
            </h3>
            <p className="mt-3 text-sm text-muted max-w-xl mx-auto">
              {ru
                ? "Подключение занимает до 5 рабочих дней. Для прямого бизнеса — без платы за настройку."
                : "Connection takes up to 5 business days. Direct businesses are not charged a setup fee."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => openLauncher()}
                className="rounded-full bg-mark px-7 py-3 text-sm font-semibold text-mark-ink shadow hover:bg-mark-light transition-all"
              >
                {c.ctaConsult} →
              </button>
              <Link
                href={localePath(locale, "/products")}
                className="rounded-full border border-line bg-ink-2 px-6 py-3 text-sm font-medium text-paper hover:bg-ink-3 transition-colors"
              >
                {ru ? "Каталог продуктов" : "Product catalog"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
