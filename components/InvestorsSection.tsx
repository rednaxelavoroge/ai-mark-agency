import type { CSSProperties } from "react";
import Link from "next/link";
import { INVESTOR_PAGE_PATH } from "@/lib/investors";
import { navHref, type Locale } from "@/lib/site";
export function InvestorsSection({ locale }: { locale: Locale }) {
  const isRu = locale === "ru";

  const capitalUses = isRu
    ? [
        { label: "Клиентское привлечение & GTM", desc: "Масштабирование performance-маркетинга и прямых продаж в целевых юрисдикциях." },
        { label: "Международная экспансия", desc: "Локализация интерфейсов, онбординг региональных партнёров и юридическая структуризация." },
        { label: "Инфраструктура & AI-модели", desc: "Расширение серверных мощностей, развитие RAG-пайплайнов и proprietary AI-агентов." },
        { label: "Digital Production Capacity", desc: "Увеличение пропускной способности инженерной команды для запуска клиентских продуктов." },
        { label: "Партнёрская экосистема", desc: "Формирование образовательных программ, документации и стимулирование партнёрских продаж." },
        { label: "Операционное масштабирование", desc: "Автоматизация внутреннего менеджмента, контроля качества и юридической поддержки." },
      ]
    : [
        { label: "Go-to-Market & Acquisition", desc: "Scaling performance channels, direct sales workflows, and international lead acquisition." },
        { label: "Territorial Expansion", desc: "Multi-jurisdiction localization, regional partner onboarding, and compliance structuring." },
        { label: "AI Infrastructure & Agents", desc: "Capacity scaling for multi-tenant inference, proprietary RAG pipelines, and model finetuning." },
        { label: "Production Engineering Capacity", desc: "Expanding dedicated engineering capacity to build and launch turnkey client systems faster." },
        { label: "Partner Network Operations", desc: "Tooling, documentation, onboarding playbooks, and incentive management for partners." },
        { label: "Operational Automation", desc: "Systematizing internal governance, QA oversight, and cross-border commercial execution." },
      ];

  const fundamentals = isRu
    ? [
        { title: "Технологическая база создана", desc: "Три готовых AI-продукта (AIME, AIBA, Showroom.pro — AI-продавец) уже функционируют коммерчески. Инвестиции привлекаются не в разработку с нуля, а в масштаб." },
        { title: "Сквозная бизнес-модель", desc: "Диверсифицированная выручка: SaaS-подписки от $149–$349/мес, ретейнеры на AI-маркетинг от $1,200/мес и заказные цифровые внедрения." },
        { title: "Сетевой эффект дистрибуции", desc: "Масштабирование через сеть региональных, отраслевых и агентских партнёров обеспечивает международный охват без раздувания локальных офисов." },
      ]
    : [
        { title: "Technology already in commercial use", desc: "Three proprietary products (AIME, AIBA, Showroom.pro — AI Sales Agent) are already used commercially. Capital, if taken, is for scale rather than building the stack from scratch." },
        { title: "Diversified Revenue Mix", desc: "SaaS subscriptions from $149–$349/mo, marketing department retainers from $1,200/mo, and high-ticket digital production contracts." },
        { title: "Capital-Efficient Distribution", desc: "Scaling through a global web of regional, industry, and agency partners delivers international reach without burdensome fixed overhead." },
      ];

  return (
    <div className="space-y-10">
      {/* 3 Fundamentals Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {fundamentals.map((f, i) => (
          <div
            key={i}
            data-reveal
            style={{ "--reveal-delay": `${i * 100}ms` } as CSSProperties}
            className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-7 shadow-sm flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              <span className="font-mono text-xs font-semibold text-warm">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-3 font-display text-base font-semibold text-paper leading-snug">
                {f.title}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {f.desc}
              </p>
            </div>
            <div className="mt-5 border-t border-line/60 pt-3">
              <span className="font-mono text-[10px] text-mark uppercase tracking-wider">
                {isRu ? "Фактор устойчивости" : "Value Driver"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Capital Allocation Matrix */}
      <div className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-line pb-4">
          <div>
            <span className="font-mono text-xs font-semibold text-mark uppercase tracking-wider">
              {isRu ? "Направления использования капитала" : "Allocation of Growth Capital"}
            </span>
            <h3 className="mt-1 font-display text-lg font-semibold text-paper">
              {isRu ? "Целевое применение инвестиционных ресурсов" : "Targeted Commercial Deployment"}
            </h3>
          </div>
          <span className="font-mono text-[11px] text-warm uppercase">
            {isRu ? "Коммерческое масштабирование" : "Commercial Scaling Phase"}
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capitalUses.map((u, idx) => (
            <div
              key={idx}
              data-reveal
              style={{ "--reveal-delay": `${idx * 70}ms` } as CSSProperties}
              className="rounded-xl border border-line/70 bg-ink-3/30 p-4 transition-all hover:-translate-y-1 hover:border-line-strong hover:bg-ink-3/60"
            >
              <h5 className="font-display text-sm font-semibold text-paper">
                {u.label}
              </h5>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                {u.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Structured Venture Statement & CTA */}
      <div className="rounded-2xl border border-warm/30 bg-warm-soft p-6 sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold text-warm uppercase tracking-widest">
              {isRu ? "Формат участия & Структура" : "Participation & Terms"}
            </span>
            <p className="mt-2 font-display text-base sm:text-lg font-medium text-paper">
              {isRu
                ? "Компания открыта к раннему финансированию на этапе коммерческого масштабирования. Размер участия и структура сделки определяются индивидуально."
                : "The company is open to early-stage financing during its commercial scaling phase. Participation size and structure are determined individually."}
            </p>
            <p className="mt-2 text-xs text-muted">
              {isRu
                ? "По мере роста клиентской базы, операционной выручки и международного присутствия компания может рассматривать дальнейшие этапы финансирования."
                : "As the verified customer base, revenue volume, and international presence expand, the company may evaluate subsequent financing rounds."}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={navHref(locale, INVESTOR_PAGE_PATH)}
              className="inline-flex items-center gap-1.5 rounded-full bg-mark px-6 py-3 text-xs font-semibold text-mark-ink hover:bg-mark-light shadow-md transition-all whitespace-nowrap"
            >
              {isRu ? "Полное инвестиционное предложение" : "Full investment proposal"}
              <span className="btn-arrow" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
