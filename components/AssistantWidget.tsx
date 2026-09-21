"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navHref, site, type Locale } from "@/lib/site";

/**
 * AI Mark's own AI Business Assistant, embedded as a site widget.
 *
 * It is a scripted demonstration of the product: an assistant asks a guiding
 * question when the chat opens, and replies from a small canned knowledge
 * base. No contact details are invented — channels that are not publicly
 * configured route customers to the contact form / email.
 */

type Msg = { role: "assistant" | "user"; text: string };

const COPY = {
  ru: {
    launcher: "Чат с AI-ассистентом",
    title: "Чем можем помочь?",
    close: "Закрыть",
    assistTitle: "Чат с AI-ассистентом",
    assistSub: "Отвечает мгновенно, круглосуточно",
    viaSub: "Проверим и ответим по этому каналу",
    emailSub: "Отвечаем в течение одного рабочего дня",
    openChat: "Открыть чат",
    placeholder: "Опишите задачу…",
    send: "Отправить",
    demoNote: "Демонстрационный ассистент AI Mark. Продолжим по почте или в форме заявки.",
    greeting:
      "Здравствуйте! Я AI Business Assistant. Что нужно автоматизировать — каналы, объём диалогов или CRM?",
    channelsQuestion: (c: string) =>
      `Запрос на подключение канала «${c}». Что нужно автоматизировать и сколько примерно обращений в день?`,
  },
  en: {
    launcher: "Chat with AI assistant",
    title: "How can we help?",
    close: "Close",
    assistTitle: "Chat with AI assistant",
    assistSub: "Replies instantly, 24/7",
    viaSub: "We'll review and respond on this channel",
    emailSub: "We reply within one business day",
    openChat: "Open chat",
    placeholder: "Describe your task…",
    send: "Send",
    demoNote: "AI Mark demonstration assistant. We'll continue by email or the contact form.",
    greeting:
      "Hi! I'm the AI Business Assistant. What should we automate — channels, message volume, or CRM?",
    channelsQuestion: (c: string) =>
      `Request to connect the “${c}” channel. What should be automated and roughly how many inquiries per day?`,
  },
} as const;

const CHANNELS = [
  { id: "telegram", label: "Telegram", color: "bg-[#229ED9]" },
  { id: "whatsapp", label: "WhatsApp", color: "bg-[#25D366]" },
  { id: "messenger", label: "Messenger", color: "bg-[#0084FF]" },
  { id: "instagram", label: "Instagram", color: "bg-[#E1306C]" },
] as const;

function reply(input: string, locale: Locale): string {
  const t = input.toLowerCase();
  const ru = locale === "ru";
  if (/цена|стоим|тариф|price|cost|pricing/.test(t))
    return ru
      ? "Тарифы начинаются от $149/мес за рабочее пространство и не зависят от числа мест. Точную конфигурацию подберём после короткого разбора задачи."
      : "Plans start at $149/mo per workspace and don't depend on seat count. We'll pick an exact configuration after a short scoping call.";
  if (/crm|bitrix|kommo|amocrm|hubspot|интеграц|integrat/.test(t))
    return ru
      ? "Ассистент передаёт контакты, лиды и переписку в Bitrix24, Kommo, amoCRM, HubSpot или ваш собственный endpoint через webhooks и REST API."
      : "The assistant pushes contacts, leads and transcripts into Bitrix24, Kommo, amoCRM, HubSpot, or your own endpoint via webhooks and REST API.";
  if (/канал|channel|whatsapp|telegram|instagram|messenger|сайт/.test(t))
    return ru
      ? "Поддерживаются WhatsApp, Telegram, Instagram Direct, Messenger и чат на сайте — всё в одном общем инбоксе, один тред на клиента."
      : "WhatsApp, Telegram, Instagram Direct, Messenger and a website chat are supported — all in one shared inbox, one thread per customer.";
  if (/срок|внедреж|запуск|how long|timeline/.test(t))
    return ru
      ? "Обычно запуск занимает 3–5 рабочих дней: подключаем каналы, импортируем каталог и FAQ, настраиваем тон и CRM."
      : "Launch usually takes 3–5 business days: we connect channels, import your catalog and FAQ, and wire up the CRM.";
  if (/человек|менеджер|handoff|передач|оператор/.test(t))
    return ru
      ? "Ассистент передаёт диалог менеджеру в один клик или по ключевому слову и мгновенно замолкает, а затем возвращается сам."
      : "The assistant hands a conversation to a manager in one click or by keyword, goes silent at once, then returns on its own.";
  return ru
    ? "Спасибо! Чтобы подготовить точный ответ, оставьте контакт — или напишите на hello@ai-mark.agency, и мы вернёмся с разбором задачи."
    : "Thanks! To give you a precise answer, leave a contact — or email hello@ai-mark.agency and we'll come back with a scoping review.";
}

export function AssistantWidget({ locale }: { locale: Locale }) {
  const t = COPY[locale] ?? COPY.ru;
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"channels" | "chat">("channels");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pushAssistant = useCallback((text: string) => {
    setMessages((m) => [...m, { role: "assistant", text }]);
  }, []);

  const send = useCallback(
    (text: string) => {
      const clean = text.trim();
      if (!clean) return;
      setMessages((m) => [...m, { role: "user", text: clean }]);
      setInput("");
      window.setTimeout(() => pushAssistant(reply(clean, locale)), 650);
    },
    [locale, pushAssistant],
  );

  const openChat = useCallback(
    (firstMessage?: string) => {
      setOpen(true);
      setView("chat");
      setMessages((m) => {
        if (m.length === 0) {
          const seed: Msg[] = [{ role: "assistant", text: t.greeting }];
          if (firstMessage) {
            seed.push({ role: "user", text: firstMessage });
            seed.push({ role: "assistant", text: reply(firstMessage, locale) });
          }
          return seed;
        }
        if (firstMessage) {
          return [
            ...m,
            { role: "user", text: firstMessage },
            { role: "assistant", text: reply(firstMessage, locale) },
          ];
        }
        return m;
      });
    },
    [locale, t.greeting],
  );

  // Allow any page element to open the chat with prefilled text.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ text?: string }>).detail;
      openChat(detail?.text);
    };
    window.addEventListener("am:open-chat", handler as EventListener);
    return () => window.removeEventListener("am:open-chat", handler as EventListener);
  }, [openChat]);

  useEffect(() => {
    if (open && view === "chat") {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
      inputRef.current?.focus();
    }
  }, [open, view, messages]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : (setOpen(true), setView("channels")))}
        className="fixed bottom-5 right-5 z-[70] flex items-center gap-2 rounded-full bg-mark px-4 py-3 text-sm font-semibold text-mark-ink shadow-xl transition-transform hover:scale-105 active:scale-95"
        aria-label={t.launcher}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-mark-ink opacity-60 pulse-ring" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-mark-ink" />
        </span>
        <span className="hidden sm:inline">{t.launcher}</span>
        <span className="sm:hidden">AI</span>
      </button>

      {open ? (
        <div className="fixed bottom-20 right-4 z-[70] w-[min(92vw,380px)] overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
            <div>
              <p className="font-display text-sm font-semibold text-paper">
                {view === "chat" ? t.assistTitle : t.title}
              </p>
              <p className="font-mono text-[10px] text-muted">
                {view === "chat" ? t.assistSub : "AI Mark"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="grid h-7 w-7 place-items-center rounded-full border border-line text-muted hover:text-paper"
            >
              ✕
            </button>
          </div>

          {view === "channels" ? (
            <div className="p-2">
              <button
                type="button"
                onClick={() => openChat()}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-ink-3/60"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-warm-soft text-warm">
                  ✦
                </span>
                <span>
                  <span className="block text-sm font-semibold text-paper">{t.assistTitle}</span>
                  <span className="block text-xs text-muted">{t.assistSub}</span>
                </span>
              </button>
              <div className="my-1 h-px bg-line" />
              {CHANNELS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => openChat(t.channelsQuestion(c.label))}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-ink-3/60"
                >
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white ${c.color}`}>
                    {c.label[0]}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-paper">{c.label}</span>
                    <span className="block text-xs text-muted">{t.viaSub}</span>
                  </span>
                </button>
              ))}
              <a
                href={`mailto:${site.email}`}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-ink-3/60"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-line text-muted">
                  ✉
                </span>
                <span>
                  <span className="block text-sm font-medium text-paper">Email</span>
                  <span className="block text-xs text-muted">{t.emailSub}</span>
                </span>
              </a>
            </div>
          ) : (
            <div>
              <div ref={scrollRef} className="max-h-[46vh] space-y-2 overflow-y-auto px-4 py-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                      m.role === "assistant"
                        ? "border border-line/70 bg-ink-3/40 text-paper/90"
                        : "ml-auto bg-mark/12 text-paper"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2 border-t border-line px-3 py-2.5"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.placeholder}
                  className="min-w-0 flex-1 bg-transparent text-sm text-paper outline-none placeholder:text-muted"
                />
                <button
                  type="submit"
                  className="rounded-full bg-mark px-3 py-1.5 text-xs font-semibold text-mark-ink"
                >
                  {t.send}
                </button>
              </form>
              <div className="flex items-center gap-2 border-t border-line px-3 py-2">
                <a
                  href={navHref(locale, "#contact")}
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full border border-line px-3 py-1.5 text-center text-[11px] font-medium text-paper hover:bg-ink-3"
                >
                  {locale === "ru" ? "Оставить заявку" : "Leave a request"}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[10px] text-muted hover:text-paper"
                >
                  {site.email}
                </a>
              </div>
              <p className="bg-ink-3/40 px-3 py-2 text-[10px] leading-snug text-muted">
                {t.demoNote}
              </p>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
