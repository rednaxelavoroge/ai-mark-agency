import type { CSSProperties } from "react";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/site";
export function PartnerNetworkVisual({ locale }: { locale: Locale }) {
  const isRu = locale === "ru";

  const partnerTypes = isRu
    ? [
        {
          id: "regional",
          title: "Региональные партнёры",
          tag: "Локализация",
          desc: "Развивают присутствие AI Mark на локальных рынках, адаптируют продукты под региональные требования и сопровождают местных клиентов.",
          roles: ["Лидогенерация на месте", "Локальные договоры", "Сопровождение внедрений"],
        },
        {
          id: "industry",
          title: "Отраслевые партнёры",
          tag: "Вертикали",
          desc: "Эксперты в конкретных индустриях (мебель, автодилеры, строительство, недвижимость), внедряющие Showroom AI и ассистентов в свои отраслевые кластеры.",
          roles: ["Отраслевые каталоги", "Внедрение в нишу", "Интеграции с ERP/CRM"],
        },
        {
          id: "agency",
          title: "Агентские партнёры",
          tag: "Белая метка / Инфраструктура",
          desc: "Маркетинговые и консалтинговые агентства, подключающие AIME и AI Business Assistant своим клиентам для повышения маржинальности.",
          roles: ["SaaS на клиента", "Собственные услуги", "Высокая рентабельность"],
        },
        {
          id: "referral",
          title: "Реферальные партнёры",
          tag: "Интродукция",
          desc: "Бизнес-консультанты, интеграторы и брокеры, рекомендующие комплексные решения AI Mark своим корпоративным клиентам.",
          roles: ["Прямое интро", "Комиссия за сделку", "Совместные проекты"],
        },
      ]
    : [
        {
          id: "regional",
          title: "Regional Partners",
          tag: "Territory",
          desc: "Expanding AI Mark presence in specific geographic jurisdictions, onboarding local enterprises and managing regional accounts.",
          roles: ["Local business development", "Territory agreements", "Customer success"],
        },
        {
          id: "industry",
          title: "Industry Partners",
          tag: "Verticals",
          desc: "Domain specialists (automotive, construction, retail, real estate) embedding Showroom AI and sales engines into their industry networks.",
          roles: ["Domain-specific catalogs", "Vertical deployment", "Specialized ERP flows"],
        },
        {
          id: "agency",
          title: "Agency Partners",
          tag: "Infrastructure",
          desc: "Digital and marketing agencies licensing AIME and AI Business Assistant to scale client deliverables without headcount expansion.",
          roles: ["Multi-client licensing", "Turnkey operations", "High gross margins"],
        },
        {
          id: "referral",
          title: "Referral & Strategic Introducers",
          tag: "Network",
          desc: "Enterprise consultants, software advisors, and venture scouts connecting qualified corporate opportunities to AI Mark.",
          roles: ["Executive introductions", "Success-based commission", "Joint initiatives"],
        },
      ];

  const networkNodes = isRu
    ? [
        { label: "Клиент / Бизнес", sub: "Входной запрос", type: "input" },
        { label: "Партнёрский контур", sub: "Локальный контакт & онбординг", type: "node" },
        { label: "AI Mark Core", sub: "Продукты, AI, продакшн", type: "core" },
        { label: "Результат & Рост", sub: "Запущенный бизнес / выручка", type: "output" },
      ]
    : [
        { label: "Client Enterprise", sub: "Opportunity initiation", type: "input" },
        { label: "Partner Node", sub: "Territory / Domain interface", type: "node" },
        { label: "AI Mark Platform", sub: "Products, AI core, production", type: "core" },
        { label: "Operating Growth", sub: "Scaled revenue & ops", type: "output" },
      ];

  return (
    <div className="space-y-10">
      {/* Network Flow Nodes */}
      <div className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-mark" />
            <span className="font-mono text-xs font-semibold text-paper uppercase tracking-wider">
              {isRu ? "Архитектура международного масштабирования" : "International Distribution Topology"}
            </span>
          </div>
          <span className="font-mono text-[10px] text-warm uppercase">
            {isRu ? "Модель сети" : "Network Topology"}
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {networkNodes.map((n, i) => (
            <div
              key={i}
              data-reveal="scale"
              style={{ "--reveal-delay": `${i * 110}ms` } as CSSProperties}
              className={`relative flex flex-col justify-between rounded-xl border p-4 transition-all hover:-translate-y-1 hover:shadow-md ${
                n.type === "core"
                  ? "border-mark/40 bg-mark/5"
                  : "border-line bg-ink-3/30"
              }`}
            >
              <span
                aria-hidden
                className="loop-pulse absolute -right-2 -top-2 hidden h-4 w-4 rounded-full lg:block"
                style={{ "--i": i } as CSSProperties}
              />
              <div>
                <span className="font-mono text-[10px] text-warm font-semibold">
                  STAGE 0{i + 1}
                </span>
                <h4 className="mt-1 font-display text-sm font-semibold text-paper">
                  {n.label}
                </h4>
              </div>
              <p className="mt-2 text-xs text-muted font-mono">{n.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Partner Track Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {partnerTypes.map((p, pi) => (
          <div
            key={p.id}
            data-reveal
            style={{ "--reveal-delay": `${pi * 90}ms` } as CSSProperties}
            className="flex flex-col rounded-xl border border-line bg-ink-2 p-6 transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="rounded bg-ink-3 px-2 py-0.5 font-mono text-[10px] text-warm font-medium">
                {p.tag}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-mark" />
            </div>

            <h4 className="mt-4 font-display text-base font-semibold text-paper leading-snug">
              {p.title}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-muted flex-1">
              {p.desc}
            </p>

            <div className="mt-5 border-t border-line/60 pt-3">
              <p className="font-mono text-[10px] text-warm uppercase tracking-wider mb-2">
                {isRu ? "Формат участия:" : "Core Focus:"}
              </p>
              <ul className="space-y-1 text-[11px] text-paper/85">
                {p.roles.map((r, rIdx) => (
                  <li key={rIdx} className="flex items-center gap-1.5">
                    <span className="text-mark font-bold">·</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Partner Terms Banner */}
      <div className="rounded-xl border border-line bg-ink-3/40 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="max-w-2xl">
          <h4 className="font-display text-sm font-semibold text-paper">
            {isRu ? "Прозрачные коммерческие условия партнёрства" : "Transparent Commercial Partner Governance"}
          </h4>
          <p className="mt-1 text-xs text-muted">
            {isRu
              ? "Партнёры получают согласованную долю от подписок на AI-продукты, вознаграждение за привлечение клиентов и возможность продавать свои услуги поверх нашей платформы."
              : "Partners receive agreed recurring revenue shares on AI SaaS subscriptions, introduction fees, and the capability to build service retainers on top of our technology stack."}
          </p>
        </div>
        <Link
          href={localePath(locale, "/partners")}
          className="inline-flex items-center gap-1.5 rounded-full bg-mark px-5 py-2.5 text-xs font-semibold text-mark-ink hover:bg-mark-light transition-all whitespace-nowrap shadow"
        >
          {isRu ? "Стать партнёром" : "Join Partner Network"} →
        </Link>
      </div>
    </div>
  );
}
