import type { Locale } from "@/lib/site";

/**
 * Company scope, placed before the long narrative.
 * Names the system in three groups. No client metrics.
 */
const GROUPS: Record<string, { label: string; items: string[] }[]> = {
  ru: [
    {
      label: "AI-инфраструктура",
      items: ["AI-маркетинг", "AI-продажи", "Клиентский сервис", "Автоматизация", "Цифровая разработка"],
    },
    {
      label: "Создание бизнеса",
      items: ["Исследование", "Бизнес-модель", "Цифровой продукт", "Запуск", "Рост"],
    },
    {
      label: "Дополнительные направления",
      items: ["Финансовые и Web3-решения", "Партнёрская сеть", "Инвесторам"],
    },
  ],
  en: [
    {
      label: "AI infrastructure",
      items: ["AI Marketing", "AI Sales", "Customer Service", "Automation", "Digital Production"],
    },
    {
      label: "Business creation",
      items: ["Research", "Business Model", "Digital Product", "Launch", "Growth"],
    },
    {
      label: "Additional directions",
      items: ["Financial / Web3 Solutions", "Partner Network", "Investors"],
    },
  ],
};

export function CapabilityBand({ locale }: { locale: Locale }) {
  const groups = GROUPS[locale] ?? GROUPS.en;
  const ru = locale === "ru";
  return (
    <section
      aria-label={ru ? "Из чего состоит AI MARK" : "What AI MARK includes"}
      className="relative border-y border-line bg-ink-2/40"
    >
      <div aria-hidden className="grid-field pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-warm">
          {ru ? "Одна система" : "One system"}
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {groups.map((group) => (
            <div key={group.label} className="rounded-xl border border-line bg-ink-2/80 p-4">
              <p className="font-display text-sm font-semibold text-paper">{group.label}</p>
              <ul className="mt-3 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-xs text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted">
          {ru
            ? "Инвесторы — это участие в компании AI MARK. Это отдельное направление и не совпадает с партнёрской сетью или заказом на создание бизнеса."
            : "Investors means participation in AI MARK as a company. It is separate from the partner network and from ordering a business to be built."}
        </p>
      </div>
    </section>
  );
}
