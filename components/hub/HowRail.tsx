import { Explore } from "@/components/hub/Explore";
import { HScroll } from "@/components/hub/HScroll";
import type { Copy } from "@/content/copy";
import type { Locale } from "@/lib/site";

export function HowRail({ locale, t }: { locale: Locale; t: Copy }) {
  const isRu = locale === "ru";
  const steps = [
    {
      n: "01",
      title: isRu ? "Идея" : "Idea",
      summary: t.creation.steps[0]?.body ?? t.creation.lead,
      detail: `${t.creation.withoutIdea} ${t.creation.steps.map((s) => `${s.title}: ${s.body}`).join(" ")}`,
    },
    {
      n: "02",
      title: isRu ? "Продукт" : "Product",
      summary: t.production.lead,
      detail: `${t.production.note} ${t.production.items.join(" · ")}`,
    },
    {
      n: "03",
      title: isRu ? "AI-инфраструктура" : "AI Infrastructure",
      summary: t.tech.lead,
      detail: t.products.lead,
    },
    {
      n: "04",
      title: isRu ? "Апрув человека" : "Human Approval",
      summary: t.how.hitl,
      detail: t.how.steps.map((s) => `${s.title}: ${s.body}`).join(" "),
    },
    {
      n: "05",
      title: isRu ? "Поставка" : "Delivery",
      summary: t.how.lead,
      detail: t.how.steps[3] ? `${t.how.steps[3].title}: ${t.how.steps[3].body}` : t.how.lead,
    },
    {
      n: "06",
      title: isRu ? "Рост" : "Growth",
      summary: t.pillars.items[4]?.body ?? t.cycle.lead,
      detail: t.cycle.steps.join(" → "),
    },
  ];

  return (
    <div className="space-y-4">
      <HScroll cols={6} label={t.how.title}>
        {steps.map((step) => (
          <article key={step.n} role="listitem" className="rounded-xl border border-line bg-ink-2 p-4">
            <p className="font-mono text-[10px] font-semibold text-warm">{step.n}</p>
            <h3 className="mt-1 font-display text-sm font-semibold text-paper">{step.title}</h3>
            <p className="mt-2 line-clamp-3 text-[11px] leading-relaxed text-muted">{step.summary}</p>
            <div className="mt-3">
              <Explore summary={isRu ? "Шаг" : "Step detail"}>
                <p>{step.detail}</p>
              </Explore>
            </div>
          </article>
        ))}
      </HScroll>
      <p className="text-xs leading-relaxed text-muted">
        {isRu
          ? "Тот же путь одной строкой: "
          : "The same path in one line: "}
        {t.pipeline.steps.join(" → ")}
      </p>
    </div>
  );
}
