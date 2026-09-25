import type { CSSProperties } from "react";
import type { Locale } from "@/lib/site";
export function OperatingModelSection({ locale }: { locale: Locale }) {
  const isRu = locale === "ru";

  const aiHandles = isRu
    ? [
        "Непрерывный мониторинг конкурентов и трендов",
        "Генерация контента, визуалов и сценариев Reels",
        "Первый ответ в мессенджерах и на сайте, затем передача человеку",
        "Первичная квалификация входящих обращений",
        "Расчёт сложных спецификаций по каталогам и формулам",
        "Формирование регулярных аналитических отчётов",
      ]
    : [
        "Continuous competitor and trend intelligence",
        "Automated content, visual drafts & Reels storyboards",
        "First reply in messengers and on the site, then a handoff to a person",
        "Pre-qualification of inbound commercial inquiries",
        "Deterministic quote and spec calculations by formulas",
        "Automated analytics reporting & cohort analysis",
      ];

  const humanHandles = isRu
    ? [
        "Утверждение ключевых бизнес-стратегий и позиционирования",
        "Финальный аппрув коммерческих предложений и постов в Telegram",
        "Ведение переговоров по крупным контрактам и спецпроектам",
        "Контроль соблюдения бренд-гайдов и тональности",
        "Принятие юридических и финансовых обязательств",
        "Управление структурой капитала и партнёрской сетью",
      ]
    : [
        "Strategic business decisions, model structuring and positioning",
        "Final approval of marketing posts & quotes in Telegram",
        "Negotiation of enterprise contracts & custom milestones",
        "Supervision of brand voice, guidelines, and ethics",
        "Approval of legally binding commercial commitments",
        "Capital allocation and partner network governance",
      ];

  const stages = isRu
    ? [
        { n: "01", t: "Research & Data", d: "AI непрерывно анализирует рынок и аудиторию" },
        { n: "02", t: "Strategy & Model", d: "Человек определяет цели и экономические рамки" },
        { n: "03", t: "Production Drafts", d: "AI формирует код, тексты, визуалы и расчёты" },
        { n: "04", t: "Human Approval", d: "Апрув в 1 клик через Telegram или рабочий инбокс" },
        { n: "05", t: "Execution", d: "Автоматическая публикация и доставка клиентам" },
        { n: "06", t: "Optimization", d: "Самообучение алгоритмов на конверсиях" },
      ]
    : [
        { n: "01", t: "Research & Data", d: "AI continuously monitors competitors and intent" },
        { n: "02", t: "Strategy & Model", d: "Human leadership sets targets and boundaries" },
        { n: "03", t: "Production Drafts", d: "AI synthesizes code, assets, copy, and quotes" },
        { n: "04", t: "Human Approval", d: "1-click review via Telegram or unified inbox" },
        { n: "05", t: "Execution", d: "Automated distribution via Meta & API pipelines" },
        { n: "06", t: "Optimization", d: "Closed-loop refinement based on conversions" },
      ];

  return (
    <div className="space-y-10">
      {/* 6-step loop diagram */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {stages.map((stg, i) => (
          <div
            key={stg.n}
            data-reveal
            style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
            className="flex flex-col justify-between rounded-xl border border-line bg-ink-2 p-4 transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-sm"
          >
            <div>
              <span
                className="loop-pulse grid h-7 w-7 place-items-center rounded-md font-mono text-[11px] font-semibold"
                style={{ "--i": i } as CSSProperties}
              >
                {stg.n}
              </span>
              <h4 className="mt-2 font-display text-sm font-semibold text-paper">{stg.t}</h4>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-muted">{stg.d}</p>
          </div>
        ))}
      </div>

      {/* Human-in-the-loop comparison split */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Column 1: AI Speed & Routine */}
        <div className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-8" data-reveal>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-mark" />
            <span className="font-mono text-xs font-semibold text-mark uppercase tracking-wider">
              {isRu ? "AI берёт на себя (Скорость & Рутина)" : "AI Core (Speed & Repetitive Ops)"}
            </span>
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold text-paper">
            {isRu ? "Скорость, объём и автоматизация 24/7" : "Continuous Throughput & Speed"}
          </h3>
          <p className="mt-2 text-xs text-muted">
            {isRu
              ? "Рутинные операции, сбор данных, черновики контента и моментальные ответы не требуют ручного труда."
              : "Repetitive tasks, market monitoring, content drafts, and immediate inquiry handling run without human delay."}
          </p>

          <ul className="mt-6 space-y-2.5 text-xs text-paper/85">
            {aiHandles.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-mark font-bold shrink-0">⚡</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Human Strategic Control */}
        <div className="rounded-2xl border border-mark/30 bg-ink-3/40 p-6 sm:p-8" data-reveal>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-warm" />
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-wider">
              {isRu ? "Человек контролирует (Стратегия & Доверие)" : "Human Control (Strategy & Trust)"}
            </span>
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold text-paper">
            {isRu ? "Контроль качества и юридический барьер" : "Business Judgment & Hard-Floor Guard"}
          </h3>
          <p className="mt-2 text-xs text-muted">
            {isRu
              ? "Обязательства и цены не публикуются без согласования человека."
              : "Binding commitments and prices are not published without a person's approval."}
          </p>

          <ul className="mt-6 space-y-2.5 text-xs text-paper/85">
            {humanHandles.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-warm font-bold shrink-0">🛡</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
