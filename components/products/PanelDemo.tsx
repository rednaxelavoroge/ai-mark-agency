"use client";

import { useState } from "react";
import type { Locale } from "@/lib/site";

type TabKey = "dashboard" | "inbox" | "knowledge" | "playground";

export type PanelTab = { key: TabKey; label: string; caption: string };

const NAV: Record<TabKey, { ru: string; en: string }> = {
  dashboard: { ru: "Дашборд", en: "Dashboard" },
  inbox: { ru: "Инбокс", en: "Inbox" },
  knowledge: { ru: "База знаний", en: "Knowledge" },
  playground: { ru: "Песочница", en: "Playground" },
};

function Dashboard({ ru }: { ru: boolean }) {
  const kpis = [
    { k: ru ? "Очередь" : "Queue", v: ru ? "Входящие" : "Inbound" },
    { k: ru ? "Ответ" : "Reply", v: ru ? "По базе" : "From knowledge" },
    { k: ru ? "Квалификация" : "Qualification", v: ru ? "В диалоге" : "In the chat" },
    { k: ru ? "Передача" : "Handoff", v: ru ? "Человеку" : "To a person" },
  ];
  return (
    <div className="space-y-3">
      <p className="font-mono text-[9px] uppercase tracking-wider text-muted">
        {ru ? "Пример интерфейса" : "Example interface"}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {kpis.map((x) => (
          <div key={x.k} className="rounded-lg border border-line/70 bg-ink-2 p-2.5">
            <p className="font-mono text-[8px] text-muted">{x.k}</p>
            <p className="font-display text-base font-semibold text-paper">{x.v}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-line/70 bg-ink-2 p-3">
        <p className="mb-2 font-mono text-[8px] text-muted">
          {ru ? "ОБЪЁМ ДИАЛОГОВ · 7 ДНЕЙ" : "CONVERSATION VOLUME · 7D"}
        </p>
        <div className="flex h-24 items-end gap-2">
          {[48, 62, 55, 78, 70, 88, 96].map((h, i) => (
            <span
              key={i}
              className="ui-bar flex-1 rounded-t-[3px] bg-gradient-to-t from-mark/55 to-mark"
              style={{ height: `${h}%`, "--h": h / 100, "--bar-delay": `${i * 70}ms` } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Inbox({ ru }: { ru: boolean }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[40%_60%]">
      <div className="space-y-1">
        {[
          { c: "WhatsApp", t: ru ? "Трёхместный диван в наличии?" : "Is the 3-seat sofa in stock?", n: 2 },
          { c: "Instagram", t: ru ? "Цена на серию Monte" : "Price for Monte series", n: 0 },
          { c: "Telegram", t: ru ? "Счёт по заказу #1042" : "Invoice for #1042", n: 1 },
          { c: "Webchat", t: ru ? "Сроки доставки" : "Delivery timeline", n: 0 },
        ].map((th, i) => (
          <div
            key={th.c}
            className={`rounded-lg border px-2.5 py-2 ${i === 0 ? "border-mark/30 bg-mark/5" : "border-transparent"}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] text-warm">{th.c}</span>
              {th.n > 0 ? (
                <span className="rounded-full bg-mark px-1.5 text-[8px] font-semibold text-mark-ink">{th.n}</span>
              ) : null}
            </div>
            <p className="mt-0.5 truncate text-[10px] text-paper/85">{th.t}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col rounded-lg border border-line/70 bg-ink-3/30">
        <div className="flex items-center justify-between border-b border-line/70 px-3 py-2">
          <span className="font-mono text-[9px] text-muted">WhatsApp · Nino</span>
          <span className="rounded-full bg-warm/15 px-2 py-0.5 font-mono text-[8px] text-warm">
            {ru ? "перехвачен" : "claimed"}
          </span>
        </div>
        <div className="flex-1 space-y-2 p-3">
          <div className="max-w-[80%] rounded-xl rounded-tl-sm border border-line/70 bg-ink-2 px-3 py-2 text-[10px] text-paper/85">
            {ru ? "Здравствуйте! Есть в наличии и сколько ждать доставку?" : "Hi! Is it in stock and what's the lead time?"}
          </div>
          <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-mark/10 px-3 py-2 text-[10px] text-paper">
            {ru
              ? "Проверю базу знаний и передам диалог человеку, если нужно решение."
              : "I'll check the knowledge base and hand this to a person if a decision is needed."}
          </div>
          <div className="rounded-lg border border-warm/40 bg-warm/5 px-2.5 py-1.5 text-[9px] text-warm">
            {ru ? "Менеджер подключился · ассистент замолчал" : "Manager joined · assistant silenced"}
          </div>
        </div>
      </div>
    </div>
  );
}

function Knowledge({ ru }: { ru: boolean }) {
  const docs = [
    { n: ru ? "Каталог" : "Catalog", s: "indexed" },
    { n: ru ? "Прайс-лист" : "Price list", s: "indexed" },
    { n: ru ? "FAQ · 36 вопросов" : "FAQ · 36 items", s: "indexed" },
    { n: ru ? "Доставка и оплата" : "Delivery & payment", s: "syncing" },
    { n: ru ? "Гарантия и возврат" : "Warranty & returns", s: "indexed" },
  ];
  return (
    <div className="space-y-2">
      <p className="font-mono text-[8px] text-muted">
        {ru ? "БАЗА ЗНАНИЙ · RAG" : "KNOWLEDGE BASE · RAG"}
      </p>
      {docs.map((d) => (
        <div
          key={d.n}
          className="flex items-center justify-between rounded-lg border border-line/70 bg-ink-2 px-3 py-2"
        >
          <span className="text-[11px] text-paper/90">{d.n}</span>
          <span
            className={`font-mono text-[8px] ${d.s === "indexed" ? "text-mark" : "text-warm"}`}
          >
            {d.s === "indexed" ? (ru ? "проиндексировано" : "indexed") : ru ? "обновление…" : "syncing…"}
          </span>
        </div>
      ))}
    </div>
  );
}

function Playground({ ru }: { ru: boolean }) {
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const samples = ru
    ? ["Есть ли доставка в Батуми?", "Сколько стоит рассрочка?", "Работаете в выходные?"]
    : ["Do you deliver to Batumi?", "What is the installment price?", "Are you open on weekends?"];
  return (
    <div className="space-y-3">
      <p className="font-mono text-[8px] text-muted">
        {ru ? "ПЕСОЧНИЦА · ПРОВЕРКА ОТВЕТА" : "PLAYGROUND · TEST A REPLY"}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {samples.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setValue(s);
              setAnswer(null);
            }}
            className="rounded-full border border-line/70 px-2.5 py-1 font-mono text-[9px] text-muted hover:text-paper"
          >
            {s}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setAnswer(null);
          }}
          placeholder={ru ? "Введите вопрос клиента…" : "Type a customer question…"}
          className="min-w-0 flex-1 rounded-lg border border-line/70 bg-ink-2 px-3 py-2 text-xs text-paper outline-none placeholder:text-muted focus:border-mark/50"
        />
        <button
          type="button"
          onClick={() =>
            setAnswer(
              value.trim()
                ? ru
                  ? "Ответ по базе знаний. Если нужен расчёт или коммерческое предложение, диалог передаётся человеку или в Showroom.pro."
                  : "Answer from the knowledge base. A calculation or commercial proposal is handed to a person or to Showroom.pro."
                : null,
            )
          }
          className="rounded-full bg-mark px-3.5 py-2 text-xs font-semibold text-mark-ink"
        >
          {ru ? "Проверить" : "Test"}
        </button>
      </div>
      {answer ? (
        <div className="stage-enter rounded-xl border border-mark/30 bg-mark/5 px-3 py-2.5 text-[11px] leading-relaxed text-paper">
          <span className="mb-1 block font-mono text-[8px] text-mark">
            AI BUSINESS ASSISTANT
          </span>
          {answer}
        </div>
      ) : (
        <p className="text-[10px] text-muted">
          {ru
            ? "Выберите пример или введите вопрос — и нажмите «Проверить»."
            : "Pick a sample or type a question — then press “Test”."}
        </p>
      )}
    </div>
  );
}

export function PanelDemo({ locale, tabs }: { locale: Locale; tabs: PanelTab[] }) {
  const ru = locale === "ru";
  const [active, setActive] = useState<TabKey>(tabs[0]?.key ?? "dashboard");
  const current = tabs.find((t) => t.key === active) ?? tabs[0];

  const panes: Record<TabKey, React.ReactNode> = {
    dashboard: <Dashboard ru={ru} />,
    inbox: <Inbox ru={ru} />,
    knowledge: <Knowledge ru={ru} />,
    playground: <Playground ru={ru} />,
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[210px_1fr]">
      {/* Vertical tab buttons */}
      <div className="flex flex-col gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all ${
              active === tab.key
                ? "border-mark bg-mark/8 text-paper"
                : "border-line bg-ink-2 text-muted hover:text-paper"
            }`}
          >
            {tab.label}
          </button>
        ))}
        <p key={active} className="stage-enter mt-1 text-[11px] leading-relaxed text-muted">
          {current?.caption}
        </p>
      </div>

      {/* App shell */}
      <div className="overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-xl">
        <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[170px_1fr]">
          <aside className="bg-[#1b1d16] p-3">
            <div className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-mark text-[9px] font-bold text-mark-ink">
                AM
              </span>
              <div className="leading-tight">
                <p className="font-mono text-[9px] font-semibold text-white/85">AI MARK</p>
                <p className="font-mono text-[8px] text-white/45">workspace</p>
              </div>
            </div>
            <nav className="mt-4 space-y-0.5">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActive(tab.key)}
                  className={`block w-full rounded-md px-2.5 py-1.5 text-left font-mono text-[10px] transition-colors ${
                    active === tab.key ? "bg-white/10 text-white" : "text-white/55 hover:text-white/90"
                  }`}
                >
                  {NAV[tab.key][ru ? "ru" : "en"]}
                </button>
              ))}
            </nav>
            <div className="mt-6 border-t border-white/10 pt-2">
              <p className="font-mono text-[8px] text-white/40">{NAV[active][ru ? "ru" : "en"]}</p>
              <p className="font-mono text-[8px] text-white/30">ai-mark.agency</p>
            </div>
          </aside>

          <div key={active} className="stage-enter min-w-0 p-3 sm:p-4">
            {panes[active]}
          </div>
        </div>
      </div>
    </div>
  );
}
