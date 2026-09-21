"use client";

import { useState } from "react";
import Link from "next/link";
import { navHref, type Locale } from "@/lib/site";
import { ProductUI, type ProductVariant } from "@/components/ui/ProductUI";
export function DigitalProductionShowcase({ locale }: { locale: Locale }) {
  const isRu = locale === "ru";
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const categories = [
    {
      id: "saas",
      name: isRu ? "SaaS & Веб-приложения" : "SaaS & Web Applications",
      badge: "High Scale",
      headline: isRu
        ? "Сложные веб-платформы, личные кабинеты и многопользовательские системы"
        : "Complex Web Platforms, Workspaces & Multi-Tenant SaaS Engines",
      desc: isRu
        ? "Разрабатываем программные продукты с ролевыми моделями доступа, биллингом, сквозной аналитикой и отказоустойчивой облачной инфраструктурой."
        : "Engineering production software with role-based access, automated billing, end-to-end telemetry, and fault-tolerant cloud backends.",
      specs: [
        isRu ? "Next.js / TypeScript / Tailwind" : "Next.js / TypeScript / Tailwind",
        isRu ? "Multi-tenant изоляция данных" : "Multi-tenant data isolation",
        isRu ? "Real-time синхронизация" : "Real-time synchronization",
        isRu ? "Встроенный AI-слой" : "Integrated AI agent layer",
      ],
      mock: "saas" as ProductVariant,
    },
    {
      id: "portals",
      name: isRu ? "Кабинеты & Внутренние системы" : "Portals & Operations",
      badge: "Enterprise",
      headline: isRu
        ? "Клиентские порталы, дашборды и CRM/ERP-коннекторы"
        : "Customer Portals, Operational Dashboards & ERP Integrations",
      desc: isRu
        ? "Интерфейсы для управления заказами, каталогами, расчётами и взаимодействием с клиентами и партнёрами."
        : "Interfaces designed for order orchestration, catalogue management, quoting logic, and automated client communication.",
      specs: [
        isRu ? "Безопасный API-шлюз" : "Secure API Gateway",
        isRu ? "Интеграции с 1С, Bitrix24, Kommo" : "Connectors to 1C, Bitrix24, Kommo",
        isRu ? "PDF-генератор спецификаций" : "Automated PDF specification engine",
        isRu ? "Аналитика воронки" : "Conversion funnel telemetry",
      ],
      mock: "portal" as ProductVariant,
    },
    {
      id: "ecommerce",
      name: isRu ? "E-Commerce & Маркетплейсы" : "E-Commerce & Marketplaces",
      badge: "Transactional",
      headline: isRu
        ? "Транзакционные платформы с гибкими каталогами и автоматизацией"
        : "Transactional Digital Showrooms, Catalogs & Order Systems",
      desc: isRu
        ? "Быстрые каталоги товаров и услуг с моментальным поиском, умным подбором конфигураций и подключением платёжных шлюзов."
        : "Ultra-fast product and service catalogues featuring sub-second search, configuration calculators, and multi-currency checkout.",
      specs: [
        isRu ? "Каталоги на десятки тысяч SKU" : "High-SKU performant catalogues",
        isRu ? "Конфигуратор параметров в реальном времени" : "Real-time parameter configurators",
        isRu ? "Подключение эквайринга и рассрочек" : "Payment processing & installment gateways",
        isRu ? "Оптимизация под Core Web Vitals" : "Strict Core Web Vitals optimization",
      ],
      mock: "ecommerce" as ProductVariant,
    },
    {
      id: "ai-engines",
      name: isRu ? "AI-инструменты & Автоматизация" : "AI Engines & Automation",
      badge: "Proprietary",
      headline: isRu
        ? "Индивидуальные AI-пайплайны и автоматизированные агенты"
        : "Custom AI Agent Pipelines & Autonomous Business Workflows",
      desc: isRu
        ? "Внедряем LLM, RAG (базы знаний), автономные боты в Telegram/WhatsApp и автоматические скрипты генерации коммерческих предложений."
        : "Integrating LLMs, RAG knowledge retrieval, autonomous messaging agents, and algorithmic quotation generators.",
      specs: [
        isRu ? "RAG на корпоративных регламентах" : "RAG on corporate documentation",
        isRu ? "WhatsApp Cloud API & Telegram" : "WhatsApp Cloud API & Telegram bots",
        isRu ? "Предохранитель Hard-Floor" : "Hard-Floor safety guardrails",
        isRu ? "Нулевая утечка клиентских данных" : "Zero client data leakage",
      ],
      mock: "ai" as ProductVariant,
    },
  ];

  const current = categories[activeCategory];

  return (
    <div className="space-y-8">
      {/* Category Pills Selector */}
      <div className="flex flex-wrap gap-2 pb-2">
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(i)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
              activeCategory === i
                ? "bg-mark text-mark-ink shadow-sm"
                : "border border-line bg-ink-2 text-muted hover:border-paper/30 hover:text-paper"
            }`}
          >
            <span>{cat.name}</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[9px] font-mono uppercase ${
                activeCategory === i ? "bg-mark-ink/20 text-mark-ink" : "bg-ink-3 text-muted"
              }`}
            >
              {cat.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Main Showcase Window */}
      <div className="overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-lg">
        {/* Browser Top Window Bar */}
        <div className="flex items-center justify-between border-b border-line bg-ink-3/50 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-3 font-mono text-[11px] text-muted truncate max-w-[200px] sm:max-w-none">
              ai-mark.production // {current.id}
            </span>
          </div>
          <span className="font-mono text-[10px] text-warm uppercase tracking-wider">
            {isRu ? "Цифровая инфраструктура" : "Digital Core"}
          </span>
        </div>

        {/* Content Details Split */}
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="font-mono text-xs font-semibold tracking-wider text-mark uppercase">
              {current.badge} · {current.name}
            </span>
            <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold text-paper leading-tight">
              {current.headline}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {current.desc}
            </p>

            {/* Technical Specs List */}
            <div className="mt-6 space-y-2">
              <p className="font-mono text-[11px] font-semibold text-warm uppercase tracking-wider">
                {isRu ? "Инженерные стандарты:" : "Engineering Standards:"}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {current.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center gap-2 rounded-lg border border-line/70 bg-ink-3/40 px-3 py-2 text-xs font-mono text-paper"
                  >
                    <span className="text-mark font-bold">✓</span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <Link
                href={navHref(locale, "#contact")}
                className="inline-flex items-center gap-1.5 rounded-full bg-mark px-5 py-2.5 text-xs font-semibold text-mark-ink hover:bg-mark-light transition-all shadow"
              >
                {isRu ? "Запросить оценку проекта" : "Request Scope Estimate"} →
              </Link>
            </div>
          </div>

          {/* Proprietary UI preview */}
          <div data-reveal="scale">
            <ProductUI
              variant={current.mock}
              ratio="h-[380px] sm:h-[390px] lg:h-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
