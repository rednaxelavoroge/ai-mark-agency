"use client";

import { useState, type CSSProperties } from "react";
import { ContactCta } from "@/components/ContactCta";
import { type Locale } from "@/lib/site";
export function BusinessCreationVisual({ locale }: { locale: Locale }) {
  const isRu = locale === "ru";
  const [startingState, setStartingState] = useState<"with-idea" | "capital">("with-idea");

  const withIdeaPoints = isRu
    ? [
        { title: "Аудит идеи и рынка", desc: "Оцениваем реальный спрос, барьеры входа, регуляторные риски и динамику ниши." },
        { title: "Конкурентная разведка", desc: "Разбираем сильные и слабые места прямых игроков, их каналы трафика и ценообразование." },
        { title: "Сборка юнит-экономики", desc: "Считаем CAC, LTV, конверсии и точку безубыточности до вливания больших бюджетов." },
        { title: "Формирование УТП", desc: "Усиливаем оффер, отстраиваемся от конкурентов и проектируем продуктовую матрицу." },
      ]
    : [
        { title: "Market & Opportunity Audit", desc: "Assessing genuine demand, barrier to entry, regulatory requirements, and niche growth." },
        { title: "Competitor Intelligence", desc: "Analyzing strengths, weaknesses, traffic acquisition strategies, and pricing of rivals." },
        { title: "Unit Economics Modeling", desc: "Calculating CAC, LTV, expected margins, and break-even milestones before scaling budgets." },
        { title: "Value Proposition & Brand", desc: "Refining core offer, differentiation angles, and structuring the product portfolio." },
      ];

  const capitalOnlyPoints = isRu
    ? [
        { title: "Поиск рыночных окон", desc: "Находим незанятые или неэффективные сегменты под заданный объём капитала." },
        { title: "3–4 концепции на выбор", desc: "Готовим детальные бизнес-концепции с расчётом требуемых инвестиций и сроков окупаемости." },
        { title: "Подбор бизнес-модели", desc: "Выбираем оптимальную модель: B2B SaaS, e-commerce, сервисное производство или консалтинг." },
        { title: "Сборка под ключ", desc: "Берём на себя архитектуру продукта, бренд, AI-инфраструктуру и операционный запуск." },
      ]
    : [
        { title: "Market Window Sourcing", desc: "Screening fragmented and inefficient market niches matched to your capital volume." },
        { title: "3–4 Curated Business Concepts", desc: "Formulating vetted concepts complete with investment scope and timeline horizons." },
        { title: "Model Architecture Selection", desc: "Choosing optimal structure: B2B SaaS, specialized e-commerce, high-ticket services, or agency." },
        { title: "Turnkey Venture Build", desc: "Assuming full responsibility for digital production, branding, AI workflows, and launch." },
      ];

  const points = startingState === "with-idea" ? withIdeaPoints : capitalOnlyPoints;

  return (
    <div className="space-y-8">
      {/* State Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-mono text-muted uppercase tracking-wider">
          {isRu ? "Ваша исходная точка:" : "Your starting scenario:"}
        </span>
        <div className="inline-flex rounded-full border border-line bg-ink-2 p-1 text-xs">
          <button
            type="button"
            onClick={() => setStartingState("with-idea")}
            className={`rounded-full px-4 py-2 font-medium transition-all ${
              startingState === "with-idea"
                ? "bg-mark text-mark-ink shadow-sm"
                : "text-muted hover:text-paper"
            }`}
          >
            {isRu ? "💡 Есть идея или бизнес" : "💡 Have an Idea / Business"}
          </button>
          <button
            type="button"
            onClick={() => setStartingState("capital")}
            className={`rounded-full px-4 py-2 font-medium transition-all ${
              startingState === "capital"
                ? "bg-mark text-mark-ink shadow-sm"
                : "text-muted hover:text-paper"
            }`}
          >
            {isRu ? "💼 Есть капитал, нет идеи" : "💼 Have Capital, Need an Idea"}
          </button>
        </div>
      </div>

      {/* Grid of Steps */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p, idx) => (
          <div
            key={p.title}
            data-reveal
            style={{ "--reveal-delay": `${idx * 90}ms` } as CSSProperties}
            className="group rounded-xl border border-line bg-ink-2 p-6 transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-warm">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-mark opacity-40 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="mt-4 font-display text-base font-semibold text-paper leading-snug">
              {p.title}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Full transformation chain summary banner */}
      <div className="rounded-xl border border-line bg-ink-3/40 p-6 sm:p-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] text-warm uppercase tracking-widest">
              {isRu ? "Сквозная цепочка AI MARK" : "AI MARK Value Chain"}
            </span>
            <p className="mt-1 font-display text-base sm:text-lg font-medium text-paper">
              {isRu
                ? "Идея / Капитал → Анализ → Модель → Бренд → Продукт → AI → Маркетинг → Продажи → Рост"
                : "Idea / Capital → Research → Model → Brand → Product → AI → Marketing → Sales → Growth"}
            </p>
            <p className="mt-2 text-xs text-muted">
              {isRu
                ? "Клиенту не нужно собирать 10 разнородных подрядчиков и согласовывать стыки между ними. Мы обеспечиваем единый управляемый контур."
                : "Clients do not need to assemble ten separate contractors. AI MARK delivers a unified, tightly integrated operating system."}
            </p>
          </div>

          <div className="shrink-0">
            <ContactCta className="inline-flex items-center gap-1.5 rounded-full bg-mark px-5 py-2.5 text-xs font-semibold text-mark-ink shadow hover:bg-mark-light transition-all">
              {isRu ? "Обсудить концепцию" : "Discuss Concept"} →
            </ContactCta>
          </div>
        </div>

        {/* Responsible venture notice */}
        <div className="mt-5 border-t border-line/60 pt-4 flex items-start gap-2.5 text-[11px] text-muted">
          <span className="font-mono text-warm font-bold">ℹ</span>
          <p>
            {isRu
              ? "Ответственный венчурный подход: мы строим бизнес-модель на объективных рыночных данных и стресс-тестах. Фиксированную гарантированную прибыль мы не обещаем, но минимизируем стоимость ошибки на ранних этапах."
              : "Responsible venture approach: we stress-test models against empirical data. We do not guarantee returns, but we systematically mitigate early-stage execution risk."}
          </p>
        </div>
      </div>
    </div>
  );
}
