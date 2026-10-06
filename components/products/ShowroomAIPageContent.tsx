"use client";

import { useState } from "react";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/site";
import { ProductConstellation } from "@/components/ui/ProductConstellation";
import { getShowroomCopy } from "@/content/products/showroom";
import type { Copy } from "@/content/copy";
import { openLauncher } from "@/lib/contact";
import { InquiryLink, LeadInquiry } from "@/components/LeadInquiry";
import { BackButton } from "@/components/BackButton";
import { brief } from "@/lib/brief";
import { getShowroomAiCopy } from "@/content/showroom-ai";
import { ShowroomAiIncluded, ShowroomAiPlans } from "@/components/products/ShowroomAiPlans";
import { ShowroomDemoChatButton } from "@/components/products/ShowroomDemoChat";
import { ShowroomRoles } from "@/components/products/ShowroomRoles";

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
      <section className="am-forest-hero relative overflow-hidden border-b border-line pb-16 pt-12 sm:pb-24 sm:pt-20">
        <div className="pointer-events-none absolute -top-40 right-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(45,56,27,0.1),transparent_70%)]" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6">
            <BackButton locale={locale} targetHref="/#products" />
          </div>
          <div className="am-hero-split grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
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
                {brief(c.subtitle)}
              </p>
              <details open className="mt-3 rounded-xl border border-white/20 group">
                <summary className="flex cursor-pointer list-none items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-[#f4f6ee] hover:bg-white/5 transition-colors rounded-t-xl">
                  <span>{ru ? "Как устроена сделка" : "How a deal moves"}</span>
                  <span className="font-mono text-muted text-xs transition-transform duration-200 group-open:rotate-180">▼</span>
                </summary>
                <p className="px-3 pb-2 text-sm font-medium leading-relaxed text-[#f4f6ee]">
                  {ru
                    ? "Обращение → потребность → квалификация → подбор → расчёт → коммерческое предложение → менеджер"
                    : "Inquiry → need → qualification → selection → calculation → commercial proposal → manager"}
                </p>
                <p className="px-3 pb-2 text-sm leading-relaxed text-[#d3ddd2]">
                  {ru
                    ? "Меньше ручной обработки обращений, быстрее переход от запроса к предложению. Менеджер подключается там, где нужна сложная или финальная коммуникация. AI не заменяет отдел продаж."
                    : "Less manual handling of inquiries, and a shorter path from request to proposal. A manager joins where the conversation is complex or final. The AI does not replace the sales team."}
                </p>
                <p className="px-3 pb-3 text-sm text-[#f4f6ee]">
                  {ru
                    ? "Ассистент отвечает и квалифицирует. Showroom AI продаёт и готовит сделку."
                    : "The assistant answers and qualifies. Showroom AI sells and prepares the deal."}
                </p>
              </details>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ShowroomDemoChatButton
                  locale={locale}
                  className="inline-flex items-center rounded-full bg-mark px-6 py-3 text-sm font-semibold text-mark-ink shadow-md transition-all hover:bg-mark-light"
                />
                <button
                  type="button"
                  onClick={() => openLauncher()}
                  className="inline-flex items-center rounded-full border border-mark/40 bg-mark/10 px-5 py-3 text-sm font-semibold text-mark transition-colors hover:bg-mark/20"
                >
                  {c.ctaConsult} →
                </button>
                <a
                  href="https://showroom-ai.pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-warm/40 bg-warm/10 px-5 py-3 text-sm font-semibold text-warm hover:bg-warm/20 transition-all"
                >
                  <span>showroom-ai.pro</span>
                  <span>↗</span>
                </a>
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

            <div data-motion className="am-hero-visual am-page-visual overflow-hidden rounded-2xl border border-line bg-ink-2 p-4 shadow-xl space-y-3">
              <ProductConstellation variant="showroom" cardKind="quote" locale={locale} />
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="font-mono text-xs font-semibold text-paper uppercase">
                  {c.heroSpec.title}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-700">
                  <span className="illu-pulse h-1.5 w-1.5 rounded-full bg-emerald-500" />
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
            </div>
          </div>
        </div>
      </section>

      {/* SHOWROOM AI ROLES — the brand made explicit. This page is the Seller
          role page; Marketer and Business Assistant keep their own URLs. */}
      <section id="seller" className="scroll-mt-24 border-b border-line py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ShowroomRoles locale={locale} current="seller" />
        </div>
      </section>

      {/* 2. INDUSTRY CONFIGURATIONS */}
      <section id="industries" className="border-b border-line py-8 sm:py-10">
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

      <details open className="border-b border-line group">
        <summary className="mx-auto max-w-6xl cursor-pointer list-none px-4 py-4 text-sm font-semibold sm:px-6 flex items-center justify-between text-paper hover:bg-ink-3/40 transition-colors">
          <span>{ru ? "Сквозная архитектура" : "End-to-end architecture"}</span>
          <span className="font-mono text-muted text-xs transition-transform duration-200 group-open:rotate-180">▼</span>
        </summary>
      {/* 3. ARCHITECTURE FLOW */}
      <section className="border-b border-line bg-ink-3/20 py-8 sm:py-10">
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
                <p className="mt-3 text-[11px] leading-relaxed text-muted">{brief(flow.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      </details>
      {/* 4. CORE CAPABILITIES */}
      <section className="border-b border-line py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
              {section("03", "Platform capabilities", "Возможности платформы")}
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-paper">
              {c.capabilitiesTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {brief(c.capabilitiesSub)}
            </p>
          </div>

          <div className="am-step-grid mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.capabilities.map((cap) => (
              <div
                key={cap.num}
                className="rounded-2xl border border-line bg-ink-2 p-4"
              >
                <span className="font-mono text-xs font-semibold text-warm">{cap.num}</span>
                <h4 className="mt-3 font-display text-base font-semibold text-paper leading-snug">
                  {cap.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-muted">{brief(cap.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WORKFLOW & DETERMINISTIC GATE */}
      <section id="workflow" className="scroll-mt-24 border-b border-line bg-ink-3/20 py-8 sm:py-10">
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

              <div className="am-step-grid mt-4 grid grid-cols-2 gap-2">
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

            <details open className="group rounded-2xl border border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-semibold text-paper hover:bg-ink-3/40 transition-colors rounded-t-2xl">
                <span>{ru ? "Расчёт и изоляция данных" : "Calculation and data isolation"}</span>
                <span className="font-mono text-muted text-xs transition-transform duration-200 group-open:rotate-180">▼</span>
              </summary>
            <div className="border-t border-line/60 space-y-6 p-5">
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
            </details>
          </div>
        </div>
      </section>

      {/* 6. SHOWROOM AI PRICING — bundles, roles sold separately, setup, trial.
          Every amount is resolved from `PAYABLE_SKUS` inside ShowroomAiPlans;
          this page publishes no price literal. */}
      <section id="pricing" className="border-b border-line py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ShowroomAiPlans locale={locale} />
          <ShowroomAiIncluded locale={locale} className="mt-8" />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ShowroomDemoChatButton
              locale={locale}
              className="inline-flex min-h-11 items-center rounded-full bg-mark px-6 text-sm font-semibold text-mark-ink shadow transition-all hover:bg-mark-light"
            />
            <span className="text-xs text-muted">{getShowroomAiCopy(locale).demoHint}</span>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="border-b border-line bg-ink-3/20 py-8 sm:py-10">
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
                    className="flex w-full items-center justify-between p-5 text-start text-sm font-semibold text-paper"
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

      <details open className="border-b border-line group">
        <summary className="mx-auto max-w-6xl cursor-pointer list-none px-4 py-4 text-sm font-semibold sm:px-6 flex items-center justify-between">
          <span>{ru ? "Оставить контакты" : "Leave your contacts"}</span>
          <span className="font-mono text-muted text-xs transition-transform duration-200 group-open:rotate-180">▼</span>
        </summary>
        <LeadInquiry contact={contact} locale={locale} scenario="showroom" />
      </details>

      {/* 8. BOTTOM BANNER */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-mark/30 bg-mark/5 p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-paper">
              {locale === "ru"
                ? "Передайте диалоги, подбор и КП AI-продавцу"
                : "Let your AI Sales Agent handle conversations, selection, and quotes"}
            </h3>
            <p className="mt-3 text-sm text-muted max-w-xl mx-auto">
              {locale === "ru"
                ? "Showroom AI ведёт разговор с клиентом, применяет ваши правила и детерминированный расчёт — и готовит сделку для отдела продаж."
                : "Showroom AI talks to customers, applies your catalog and business rules with deterministic pricing — and prepares the opportunity for your sales team."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => openLauncher()}
                className="rounded-full bg-mark px-7 py-3 text-sm font-semibold text-mark-ink shadow hover:bg-mark-light transition-all"
              >
                {c.ctaConsult} →
              </button>
              <a
                href="https://showroom-ai.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-warm/40 bg-warm/10 px-6 py-3 text-sm font-semibold text-warm hover:bg-warm/20 transition-all"
              >
                <span>showroom-ai.pro ↗</span>
              </a>
              <BackButton locale={locale} targetHref="/#products" className="py-3 px-6 text-sm" />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
