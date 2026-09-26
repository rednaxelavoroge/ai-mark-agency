"use client";

import { useState } from "react";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/site";
import { ProductConstellation } from "@/components/ui/ProductConstellation";
import { getShowroomCopy } from "@/content/products/showroom";
import type { Copy } from "@/content/copy";
import { openLauncher } from "@/lib/contact";
import { BuyLink } from "@/components/BuyLink";
import { InquiryLink, LeadInquiry } from "@/components/LeadInquiry";

export function ShowroomAIPageContent({
  locale,
  contact,
}: {
  locale: Locale;
  contact: Copy["contact"];
}) {
  const c = getShowroomCopy(locale);
  const ru = locale === "ru";
  const section = (n: string, en: string, ruLabel: string) => `${n} // ${ru ? ruLabel : en}`;
  const [activeIndustry, setActiveIndustry] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const currentInd = c.industries[activeIndustry];

  return (
    <article className="min-h-screen bg-ink text-paper">
      {/* 1. HERO SECTION WITH RUNTIME STATUS PANEL */}
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
                {c.title}
                <span className="block text-2xl sm:text-3xl lg:text-4xl text-warm font-normal mt-2">
                  — {c.tagline}
                </span>
              </h1>

              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                {c.subtitle}
              </p>

              <p className="mt-4 text-sm font-medium leading-relaxed text-paper">
                {ru
                  ? "Обращение → потребность → квалификация → подбор → расчёт → коммерческое предложение → менеджер"
                  : "Inquiry → need → qualification → selection → calculation → commercial proposal → manager"}
              </p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                {ru
                  ? "Меньше ручной обработки обращений, быстрее переход от запроса к предложению. Менеджер подключается там, где нужна сложная или финальная коммуникация. AI не заменяет отдел продаж."
                  : "Less manual handling of inquiries, and a shorter path from request to proposal. A manager joins where the conversation is complex or final. The AI does not replace the sales team."}
              </p>
              <p className="mt-3 text-sm text-paper/90">
                {ru
                  ? "Ассистент отвечает и квалифицирует. Showroom продаёт и готовит сделку."
                  : "The assistant answers and qualifies. Showroom sells and prepares the deal."}
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
                  href="#workflow"
                  className="inline-flex items-center rounded-full border border-line bg-ink-2 px-5 py-3 text-sm font-medium text-paper hover:bg-ink-3 transition-colors"
                >
                  {c.ctaExplore}
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

            {/* Runtime Status Spec Panel */}
            <div className="overflow-hidden rounded-2xl border border-line bg-ink-2 p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="font-mono text-xs font-semibold text-paper uppercase">
                  {c.heroSpec.title}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {c.heroSpec.status}
                </span>
              </div>

              <div className="space-y-2">
                {c.heroSpec.rows.map((row) => (
                  <div
                    key={row.n}
                    className="flex items-center justify-between rounded-lg border border-line/60 bg-ink-3/40 px-3 py-2 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] text-warm font-semibold">{row.n}</span>
                      <span className="text-paper/90 text-[11px]">{row.label}</span>
                    </div>
                    <span className="rounded bg-ink-2 px-2 py-0.5 font-mono text-[10px] text-mark font-medium border border-line/50">
                      {row.tag}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 pb-0 sm:pb-12" data-reveal="scale">
                <ProductConstellation variant="showroom" cardKind="quote" locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INDUSTRY CONFIGURATIONS */}
      <section id="industries" className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
              {section("01", "Industry fit", "Отраслевая адаптивность")}
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-paper">
              {c.industriesTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {c.industriesSub}
            </p>
          </div>

          {/* Industry Tab Buttons */}
          <div className="mt-8 flex flex-wrap gap-2">
            {c.industries.map((ind, i) => (
              <button
                key={ind.id}
                type="button"
                onClick={() => setActiveIndustry(i)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  activeIndustry === i
                    ? "bg-mark text-mark-ink shadow-sm"
                    : "border border-line bg-ink-2 text-muted hover:text-paper"
                }`}
              >
                {ind.name}
              </button>
            ))}
          </div>

          {/* Selected Industry Card */}
          <div className="mt-6 rounded-2xl border border-line bg-ink-2 p-6 sm:p-8 shadow-sm">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <span className="font-mono text-[10px] text-mark uppercase tracking-wider font-semibold">
                  {`${ru ? "Сценарий" : "Scenario"} · ${currentInd.name}`}
                </span>
                <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold text-paper">
                  {currentInd.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted">
                  {currentInd.desc}
                </p>

                <div className="mt-6">
                  <p className="font-mono text-[10px] text-warm uppercase tracking-wider mb-2 font-semibold">
                    {ru ? "Параметры и формулы" : "Parameters and formulas"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentInd.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg border border-line bg-ink-3/50 px-2.5 py-1 font-mono text-[11px] text-paper"
                      >
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metrics Strip */}
              <div className="rounded-xl border border-line bg-ink-3/30 p-5 space-y-3">
                <p className="font-mono text-[10px] text-muted uppercase tracking-wider">
                  {ru ? "Что делает сценарий" : "What this scenario does"}
                </p>
                {currentInd.metrics.map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-line/60 pb-2">
                    <span className="text-xs text-muted">{m.label}</span>
                    <span className="font-display text-sm font-semibold text-mark">{m.val}</span>
                  </div>
                ))}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => openLauncher()}
                    className="w-full rounded-full bg-mark px-4 py-2 text-xs font-semibold text-mark-ink hover:bg-mark-light transition-colors"
                  >
                    {ru ? "Обсудить конфигурацию" : "Discuss this configuration"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHITECTURE FLOW */}
      <section className="border-b border-line bg-ink-3/20 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
              {section("02", "How a request is handled", "Сквозная архитектура")}
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-paper">
              {c.archFlowTitle}
            </h2>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {c.archFlow.map((flow) => (
              <div
                key={flow.step}
                className="flex flex-col justify-between rounded-xl border border-line bg-ink-2 p-5"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-warm">{flow.step}</span>
                  <h4 className="mt-2 font-display text-sm font-semibold text-paper">
                    {flow.name}
                  </h4>
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-muted">{flow.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CORE CAPABILITIES */}
      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
              {section("03", "Platform capabilities", "Возможности платформы")}
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-paper">
              {c.capabilitiesTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {c.capabilitiesSub}
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.capabilities.map((cap) => (
              <div
                key={cap.num}
                className="rounded-2xl border border-line bg-ink-2 p-6 transition-all hover:border-line-strong hover:shadow-md"
              >
                <span className="font-mono text-xs font-semibold text-warm">{cap.num}</span>
                <h4 className="mt-3 font-display text-base font-semibold text-paper leading-snug">
                  {cap.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-muted">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WORKFLOW & DETERMINISTIC GATE */}
      <section id="workflow" className="scroll-mt-24 border-b border-line bg-ink-3/20 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
                {section("04", "Step by step", "Пошаговый цикл")}
              </span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-paper">
                {c.workflowTitle}
              </h2>
              <p className="mt-2 text-xs text-muted">
                {c.workflowSub}
              </p>

              <div className="mt-6 space-y-3">
                {c.workflowSteps.map((ws) => (
                  <div
                    key={ws.num}
                    className="flex items-start gap-3 rounded-xl border border-line bg-ink-2 p-4"
                  >
                    <span className="font-mono text-xs font-semibold text-warm shrink-0">
                      {ws.num}
                    </span>
                    <div>
                      <h4 className="font-display text-xs font-semibold text-paper">{ws.label}</h4>
                      <p className="mt-1 text-[11px] text-muted leading-relaxed">{ws.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deterministic & Multi-Tenant Details */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-mark/30 bg-mark/5 p-6 sm:p-7">
                <span className="font-mono text-xs font-semibold text-mark uppercase tracking-wider block mb-2">
                  🛡 {c.deterministicTitle}
                </span>
                <p className="text-xs text-muted leading-relaxed">
                  {c.deterministicDesc}
                </p>
              </div>

              <div>
                <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
                  {section("05", "Data isolation", "Защита данных")}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-paper">
                  {c.multitenantTitle}
                </h3>
                <p className="mt-2 text-xs text-muted">
                  {c.multitenantLead}
                </p>

                <div className="mt-4 space-y-3">
                  {c.multitenantExamples.map((ex, i) => (
                    <div key={i} className="rounded-xl border border-line bg-ink-2 p-4">
                      <h4 className="font-display text-xs font-semibold text-paper">{ex.title}</h4>
                      <p className="mt-1 text-[11px] text-muted leading-relaxed">{ex.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING TIERS */}
      <section id="pricing" className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
              {section("06", "Licence price", "Стоимость лицензии")}
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-paper">
              {c.pricingTitle}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {c.pricingSub}
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {c.pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className="flex flex-col justify-between rounded-2xl border border-line bg-ink-2 p-6 sm:p-7 shadow-sm transition-all hover:border-line-strong hover:shadow-lg"
              >
                <div>
                  <h3 className="font-display text-2xl font-semibold text-paper">{tier.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold text-mark">{tier.price}</span>
                    <span className="font-mono text-xs text-muted">{tier.period}</span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted">{tier.desc}</p>

                  <ul className="mt-6 space-y-2 border-t border-line/60 pt-4 text-xs text-paper/90">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-mark font-bold shrink-0">✓</span>
                        <span>{f}</span>
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
                  {/* Self-serve purchase of this exact tier, and only of a tier
                      that has a published self-serve price. The Enterprise tier
                      is custom (no sku id), so it renders nothing here and stays
                      contact-only.
                      The guard is at the call site on purpose: `BuyLink` without
                      a sku is a legitimate family link (the /products hub and the
                      home showcase use it that way), but on a *priced tier card*
                      it would send the buyer to /pay with some other product
                      preselected. A tier with no sku must not be payable. */}
                  {tier.skuId ? (
                    <BuyLink
                      locale={locale}
                      skuId={tier.skuId}
                      label={
                        locale === "ru"
                          ? `Оплатить ${tier.price} в USDT / USDC`
                          : `Pay ${tier.price} with USDT / USDC`
                      }
                      className="mt-2 block w-full rounded-full border border-mark/50 bg-mark/10 px-5 py-3 text-center text-xs font-semibold text-mark transition-all hover:bg-mark/20"
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
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

      <LeadInquiry contact={contact} scenario="showroom" />

      {/* 8. BOTTOM BANNER */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-mark/30 bg-mark/5 p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-paper">
              {locale === "ru"
                ? "Передайте диалоги, подбор и КП AI-продавцу"
                : "Let your AI Sales Agent handle conversations, selection, and quotes"}
            </h3>
            <p className="mt-3 text-sm text-muted max-w-xl mx-auto">
              {locale === "ru"
                ? "SHOWROOM AI ведёт разговор с клиентом, применяет ваши правила и детерминированный расчёт — и готовит сделку для отдела продаж."
                : "SHOWROOM AI talks to customers, applies your catalog and business rules with deterministic pricing — and prepares the opportunity for your sales team."}
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
                {ru ? "Все продукты" : "All products"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
