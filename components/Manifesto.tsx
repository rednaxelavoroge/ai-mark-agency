import type { CSSProperties } from "react";
import type { Locale } from "@/lib/site";

/**
 * Editorial "how we think" spread. A single typographic moment that gives the
 * page something to actually read — no fabricated metrics, only operating
 * principles that mirror the published positioning.
 */
export function Manifesto({ locale }: { locale: Locale }) {
  const isRu = locale === "ru";

  const statement = isRu
    ? ["Мы не обещаем прибыль.", "Мы снижаем стоимость ошибки."]
    : ["We don't promise profit.", "We reduce the cost of being wrong."];

  const principles = isRu
    ? [
        {
          n: "01",
          t: "AI готовит — человек решает",
          d: "Рутина и черновики на алгоритмах, стратегия и финальное решение — за человеком.",
        },
        {
          n: "02",
          t: "Одна инфраструктура",
          d: "Создание бизнеса, продукт, маркетинг и продажи работают как единый контур, а не десять подрядчиков.",
        },
        {
          n: "03",
          t: "Скорость без потери контроля",
          d: "Быстрее там, где это безопасно. Ручной апрув там, где есть обязательства и деньги.",
        },
        {
          n: "04",
          t: "Решения от данных",
          d: "Спрос, юнит-экономика и конкуренты — до бюджета, а не после.",
        },
      ]
    : [
        {
          n: "01",
          t: "AI prepares — humans decide",
          d: "Routine and drafts run on algorithms; strategy and the final call stay with people.",
        },
        {
          n: "02",
          t: "One infrastructure",
          d: "Venture creation, product, marketing and sales run as a single contour — not ten contractors.",
        },
        {
          n: "03",
          t: "Speed without losing control",
          d: "Faster where it is safe. Human approval where commitments and money are involved.",
        },
        {
          n: "04",
          t: "Decisions from data",
          d: "Demand, unit economics and competitors — before the budget, not after.",
        },
      ];

  return (
    <section id="principles" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="font-mono text-xs tracking-[0.2em] text-mark uppercase" data-reveal>
          {isRu ? "Как мы думаем" : "How we think"}
        </p>

        <h2
          className="mt-6 max-w-4xl font-editorial text-4xl leading-[1.08] font-medium text-paper sm:text-5xl lg:text-6xl"
          data-reveal
          style={{ "--reveal-delay": "60ms" } as CSSProperties}
        >
          {statement[0]}{" "}
          <em className="text-mark">{statement[1]}</em>
        </h2>

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <div
              key={p.n}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
              className="border-t border-line pt-5"
            >
              <span className="font-editorial text-2xl italic text-warm">{p.n}</span>
              <h3 className="mt-3 font-display text-base font-semibold leading-snug text-paper">
                {p.t}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
