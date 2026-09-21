"use client";

import { useState } from "react";
import Link from "next/link";
import { type Locale } from "@/lib/site";
import { getAibaCopy } from "@/content/products/assistant";
import { ConsultationModal } from "@/components/ConsultationModal";
import { ConstellationOverlays } from "@/components/ui/ProductConstellation";
import { PanelDemo } from "@/components/products/PanelDemo";

export function AIBAPageContent({ locale }: { locale: Locale }) {
  const c = getAibaCopy(locale);
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const isRu = locale === "ru";
  const chatInvite = isRu
    ? "Хочу оценить, сколько диалогов возьмёт на себя ассистент"
    : "I want to estimate how many conversations the assistant can handle";

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

              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                {c.subtitle}
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
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

            {/* Simulated Live Multi-Channel Inbox Scene */}
            <div className="relative pb-0 sm:pb-14">
              <ConstellationOverlays cardKind="handoff">
                <div className="overflow-hidden rounded-2xl border border-line bg-ink-2 p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div>
                  <span className="font-display text-xs font-semibold text-paper">
                    {c.heroScene.headerTitle}
                  </span>
                  <p className="text-[10px] font-mono text-muted">{c.heroScene.headerSub}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {c.heroScene.tag}
                </span>
              </div>

              {/* Message 1: Incoming customer */}
              <div className="rounded-xl border border-line bg-ink-3/40 p-3 text-xs">
                <span className="font-mono text-[10px] text-muted">{c.heroScene.customerMeta}</span>
                <p className="mt-1 text-paper font-medium">{c.heroScene.customer}</p>
              </div>

              {/* Message 2: AI reply */}
              <div className="rounded-xl border border-mark/30 bg-mark/5 p-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-mark font-semibold">
                    🤖 {c.heroScene.aiLabel}
                  </span>
                  <span className="text-[9px] font-mono text-muted">{c.heroScene.engineNote}</span>
                </div>
                <p className="mt-1 text-paper leading-relaxed">{c.heroScene.aiReply}</p>
              </div>

              {/* Message 3: Human Intercept */}
              <div className="rounded-xl border border-warm/40 bg-warm/5 p-3 text-xs">
                <span className="font-mono text-[10px] text-warm font-semibold">
                  👤 {c.heroScene.operatorMeta}
                </span>
                <p className="mt-1 text-paper">{c.heroScene.operatorReply}</p>
              </div>

              <div className="border-t border-line pt-2 text-[10px] text-muted font-mono leading-relaxed">
                ℹ {c.heroScene.handoffNote}
              </div>
                </div>
              </ConstellationOverlays>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CHANNELS SECTION */}
      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
              01 // Каналы коммуникации
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-paper">
              {c.channelsTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {c.channelsSub}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.channels.map((ch) => (
              <div
                key={ch.type}
                className="rounded-xl border border-line bg-ink-2 p-6 transition-all hover:border-line-strong"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-mark" />
                  <h4 className="font-display text-base font-semibold text-paper">
                    {ch.name}
                  </h4>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  {ch.note}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted font-mono">{c.channelsNote}</p>
        </div>
      </section>

      {/* 3. WHAT WE AUTOMATE */}
      <section className="border-b border-line bg-ink-3/20 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
              02 // Автоматизация
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-paper">
              {c.autoTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {c.autoSub}
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.autoList.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 rounded-lg border border-line bg-ink-2 px-4 py-3 text-xs font-mono text-paper"
              >
                <span className="text-mark font-bold">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CLIENT PANEL SHOWCASE WITH SCREENSHOT TABS */}
      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
              03 // Панель управления
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-paper">
              {c.panelTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {c.panelLead}
            </p>
          </div>

          {/* Chat invite: opens the assistant widget with this very text */}
          <button
            type="button"
            data-reveal
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("am:open-chat", { detail: { text: chatInvite } }),
              )
            }
            className="mt-8 block w-full rounded-2xl border border-mark/30 bg-mark/5 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-mark/60 hover:shadow-md"
          >
            <span className="font-mono text-[11px] tracking-wider text-mark uppercase">
              {isRu ? "Попробуйте ассистента" : "Try the assistant"}
            </span>
            <span className="mt-2 block font-display text-lg font-medium text-paper">
              «{chatInvite}»
            </span>
            <span className="mt-1 block text-xs text-muted">
              {isRu
                ? "Нажмите — этот текст отправится в чат ассистента, и он ответит."
                : "Click — this text opens in the assistant chat and it replies."}
            </span>
          </button>

          {/* Interactive in-page demo */}
          <div className="mt-8" data-reveal="scale">
            <PanelDemo locale={locale} tabs={c.panelTabs} />
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS: 7-STEP WORKFLOW */}
      <section className="border-b border-line bg-ink-3/20 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
              04 // Сквозной цикл
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-paper">
              {c.howTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {c.howSub}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.steps.map((st) => (
              <div
                key={st.num}
                className="rounded-xl border border-line bg-ink-2 p-5 transition-all hover:border-line-strong"
              >
                <span className="font-mono text-xs font-semibold text-warm">
                  {st.num}
                </span>
                <h4 className="mt-2 font-display text-sm font-semibold text-paper leading-snug">
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

      {/* 6. HANDOFF BALANCE & CRM INTEGRATIONS */}
      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Handoff Split */}
            <div>
              <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
                05 // Баланс ролей
              </span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-paper">
                {c.handoffTitle}
              </h2>
              <p className="mt-2 text-xs text-muted">
                {c.handoffSub}
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-line bg-ink-2 p-5">
                  <h4 className="font-display text-sm font-semibold text-mark">
                    ⚡ {c.handoffAi.title}
                  </h4>
                  <ul className="mt-3 space-y-1.5 text-xs text-muted">
                    {c.handoffAi.items.map((it, i) => (
                      <li key={i}>· {it}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-warm/30 bg-warm/5 p-5">
                  <h4 className="font-display text-sm font-semibold text-warm">
                    🛡 {c.handoffHuman.title}
                  </h4>
                  <ul className="mt-3 space-y-1.5 text-xs text-paper/90">
                    {c.handoffHuman.items.map((it, i) => (
                      <li key={i}>· {it}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CRM Connectors */}
            <div>
              <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
                06 // CRM и интеграции
              </span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-paper">
                {c.crmTitle}
              </h2>
              <p className="mt-2 text-xs text-muted">
                {c.crmSub}
              </p>

              <div className="mt-6 space-y-4">
                {c.crmCards.map((crm) => (
                  <div key={crm.tag} className="rounded-xl border border-line bg-ink-2 p-5">
                    <span className="rounded bg-ink-3 px-2 py-0.5 font-mono text-[10px] text-warm uppercase">
                      {crm.tag}
                    </span>
                    <h4 className="mt-2 font-display text-base font-semibold text-paper">
                      {crm.title}
                    </h4>
                    <p className="mt-1 text-xs text-muted leading-relaxed">
                      {crm.desc}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {crm.items.map((it, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-ink-3 px-2 py-0.5 font-mono text-[10px] text-paper/80"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING & TURNKEY SETUP */}
      <section id="pricing" className="border-b border-line bg-ink-3/20 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
              07 // Тарифные планы
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-paper">
              {c.pricingTitle}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {c.pricingSub}
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {c.plans.map((p) => (
              <div
                key={p.id}
                className={`flex flex-col justify-between rounded-2xl border p-6 sm:p-7 ${
                  p.badge
                    ? "border-mark/60 bg-ink-2 shadow-xl relative"
                    : "border-line bg-ink-2"
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-3 right-6 rounded-full bg-mark px-3 py-0.5 font-mono text-[10px] font-semibold text-mark-ink uppercase">
                    {p.badge}
                  </span>
                )}
                <div>
                  <h3 className="font-display text-2xl font-semibold text-paper">{p.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold text-mark">{p.price}</span>
                    <span className="font-mono text-xs text-muted">{p.period}</span>
                  </div>
                  <p className="mt-1 font-mono text-[10px] text-warm">{p.note}</p>

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
                    onClick={() => setModalOpen(true)}
                    className={`w-full rounded-full px-5 py-3 text-xs font-semibold transition-all ${
                      p.badge
                        ? "bg-mark text-mark-ink shadow hover:bg-mark-light"
                        : "border border-line bg-ink-3/40 text-paper hover:bg-ink-3"
                    }`}
                  >
                    {c.ctaConsult}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Turnkey Setup Card */}
          <div className="mt-10 rounded-2xl border border-line bg-ink-2 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <span className="rounded bg-warm-soft px-2.5 py-0.5 font-mono text-[10px] text-warm uppercase font-semibold">
                  Разовая услуга
                </span>
                <h4 className="mt-2 font-display text-xl font-semibold text-paper">
                  {c.setupTitle} ({c.setupPrice})
                </h4>
                <p className="mt-2 text-xs text-muted max-w-2xl leading-relaxed">
                  {c.setupDesc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono text-paper/85">
                  {c.setupFeatures.map((f, idx) => (
                    <span key={idx} className="rounded bg-ink-3 px-2.5 py-1">
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="rounded-full bg-mark px-6 py-3 text-xs font-semibold text-mark-ink shadow hover:bg-mark-light transition-all"
                >
                  Запросить настройку
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
              08 // Вопросы и ответы
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

      {/* 9. BOTTOM BANNER */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-mark/30 bg-mark/5 p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-paper">
              Хватит терять клиентов, написавших ночью
            </h3>
            <p className="mt-3 text-sm text-muted max-w-xl mx-auto">
              Подключите AI Business Assistant и автоматизируйте первичный ответ за считанные секунды.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="rounded-full bg-mark px-7 py-3 text-sm font-semibold text-mark-ink shadow hover:bg-mark-light transition-all"
              >
                {c.ctaConsult} →
              </button>
              <Link
                href="/products"
                className="rounded-full border border-line bg-ink-2 px-6 py-3 text-sm font-medium text-paper hover:bg-ink-3 transition-colors"
              >
                Все продукты
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        locale={locale}
        productName="AI Business Assistant"
        defaultScenario="assistant"
      />
    </article>
  );
}
