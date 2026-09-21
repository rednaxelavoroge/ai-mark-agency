"use client";

import { useCallback, useEffect, useState } from "react";
import { OPEN_CHAT_EVENT, OPEN_LAUNCHER_EVENT, type OpenChatDetail } from "@/lib/contact";
import { navHref, site, type Locale } from "@/lib/site";

type MessengerKey = "telegram" | "whatsapp" | "messenger" | "instagram";

const COPY = {
  ru: {
    open: "Связаться",
    close: "Закрыть",
    title: "Чем можем помочь?",
    aiLabel: "Чат с AI-ассистентом",
    aiHint: "Отвечает мгновенно, круглосуточно",
    messengerHint: "Обычно отвечаем в течение нескольких часов",
    emailLabel: "Email",
    emailHint: "Отвечаем в течение одного рабочего дня",
    greeting:
      "Здравствуйте! Я AI Business Assistant AI Mark. Расскажите, что нужно — маркетинг, продажи или продукт.",
    placeholder: "Напишите сообщение…",
  },
  en: {
    open: "Contact us",
    close: "Close",
    title: "How can we help?",
    aiLabel: "Chat with our AI assistant",
    aiHint: "Answers instantly, day or night",
    messengerHint: "Usually replies within a few hours",
    emailLabel: "Email",
    emailHint: "We reply within one business day",
    greeting:
      "Hi! I'm AI Mark's AI Business Assistant. Tell us what you need — marketing, sales, or a product.",
    placeholder: "Type a message…",
  },
} as const;

const MESSENGER_META: Record<MessengerKey, { label: string; color: string }> = {
  telegram: { label: "Telegram", color: "#229ED9" },
  whatsapp: { label: "WhatsApp", color: "#25D366" },
  messenger: { label: "Messenger", color: "#0084FF" },
  instagram: { label: "Instagram", color: "#E1306C" },
};

function messengerRows(): { key: MessengerKey; href: string; label: string }[] {
  const m = site.messengers;
  const rows: { key: MessengerKey; href: string }[] = [];
  if (m.telegram) rows.push({ key: "telegram", href: m.telegram });
  if (m.whatsapp) {
    const href = m.whatsapp.startsWith("http") ? m.whatsapp : `https://wa.me/${m.whatsapp.replace(/\D/g, "")}`;
    rows.push({ key: "whatsapp", href });
  }
  if (m.messenger) rows.push({ key: "messenger", href: m.messenger });
  if (m.instagram) rows.push({ key: "instagram", href: m.instagram });
  return rows.map((row) => ({ ...row, label: MESSENGER_META[row.key].label }));
}

function orderedMessengers(locale: Locale) {
  const rows = messengerRows();
  if (locale === "en") {
    const order: MessengerKey[] = ["whatsapp", "messenger", "instagram", "telegram"];
    return [...rows].sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));
  }
  const order: MessengerKey[] = ["telegram", "whatsapp", "messenger", "instagram"];
  return [...rows].sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));
}

let injectPromise: Promise<void> | null = null;

function injectHideBubbleStyle() {
  if (document.getElementById("aiba-hide-bubble-style")) return;
  const el = document.createElement("style");
  el.id = "aiba-hide-bubble-style";
  el.textContent = `
    .aiba-root .aiba-bubble { display: none !important; }
    .aiba-panel[hidden],
    .aiba-root .aiba-panel[hidden],
    .aiba-root [hidden] {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
    .aiba-panel:not([hidden]) { display: flex !important; }
    .aiba-close-btn {
      min-width: 44px !important;
      min-height: 44px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      pointer-events: auto !important;
      z-index: 100 !important;
      font-size: 24px !important;
      padding: 0 !important;
      line-height: 1 !important;
    }
    .aiba-panel { z-index: 2147483001 !important; }
  `;
  document.head.appendChild(el);
}

function ensureWidget(): Promise<void> {
  if (injectPromise) return injectPromise;
  injectPromise = new Promise((resolve) => {
    injectHideBubbleStyle();
    if (document.querySelector(`script[data-key="${site.widget.key}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = site.widget.src;
    script.async = true;
    script.setAttribute("data-key", site.widget.key);
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });
  return injectPromise;
}

function waitFor<T>(fn: () => T | null, timeout = 5000, interval = 100): Promise<T | null> {
  return new Promise((resolve) => {
    const start = Date.now();
    const tick = () => {
      const found = fn();
      if (found || Date.now() - start >= timeout) {
        resolve(found || null);
        return;
      }
      window.setTimeout(tick, interval);
    };
    tick();
  });
}

function showPanel() {
  const panel = document.querySelector<HTMLElement>(".aiba-root .aiba-panel");
  if (!panel) return null;
  panel.hidden = false;
  panel.removeAttribute("hidden");
  panel.style.removeProperty("display");
  panel.style.setProperty("display", "flex", "important");
  return panel;
}

function hidePanel() {
  const panel = document.querySelector<HTMLElement>(".aiba-root .aiba-panel");
  const bubble = document.querySelector<HTMLElement>(".aiba-root .aiba-bubble");
  if (bubble?.getAttribute("aria-expanded") === "true") bubble.click();
  if (panel) {
    panel.hidden = true;
    panel.setAttribute("hidden", "");
    panel.style.setProperty("display", "none", "important");
  }
}

function applyLocaleChrome(locale: Locale) {
  const t = COPY[locale] ?? COPY.en;
  const body = document.querySelector(".aiba-root .aiba-body");
  if (body) {
    const welcome = body.querySelector(".aiba-welcome-msg");
    if (welcome) {
      const text = welcome.querySelector("div:last-child");
      if (text && text.textContent !== t.greeting) text.textContent = t.greeting;
    } else if (body.querySelectorAll(".aiba-msg").length === 0) {
      const wrap = document.createElement("div");
      wrap.className = "aiba-msg aiba-welcome-msg";
      wrap.setAttribute("data-side", "left");
      const tag = document.createElement("span");
      tag.className = "aiba-tag";
      tag.textContent = site.name;
      const div = document.createElement("div");
      div.textContent = t.greeting;
      wrap.appendChild(tag);
      wrap.appendChild(div);
      body.prepend(wrap);
    }
  }
  const input = document.querySelector<HTMLTextAreaElement>(".aiba-root textarea.aiba-input");
  if (input && input.placeholder !== t.placeholder) input.placeholder = t.placeholder;
}

async function typeAndSend(text: string, sendImmediately = true) {
  const controls = await waitFor(() => {
    const panel = document.querySelector<HTMLElement>(".aiba-root .aiba-panel");
    const input = document.querySelector<HTMLTextAreaElement>(".aiba-root textarea.aiba-input");
    const sendBtn = document.querySelector<HTMLButtonElement>(".aiba-root button.aiba-send");
    if (panel && !panel.hidden && input && sendBtn) return { input, sendBtn };
    return null;
  }, 6000);
  if (!controls) return;
  const { input, sendBtn } = controls;
  const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
  const setValue = (value: string) => {
    if (setter) setter.call(input, value);
    else input.value = value;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  };
  setValue(text);
  if (!sendImmediately) {
    input.focus();
    return;
  }
  for (let i = 0; i < 15 && input.value; i++) {
    await new Promise((r) => setTimeout(r, 120));
    if (input.value !== text) setValue(text);
    if (sendBtn && !sendBtn.disabled) sendBtn.click();
    if (input.value) {
      input.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Enter",
          code: "Enter",
          keyCode: 13,
          which: 13,
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    if (!input.value) break;
  }
}

function IconChat() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M12 2.5c.3 3.3 1 5.6 2.1 6.9 1.2 1.3 3.4 2.1 6.9 2.4-3.4.3-5.7 1.1-6.9 2.4-1.2 1.3-1.8 3.6-2.1 6.9-.3-3.3-1-5.6-2.1-6.9-1.2-1.3-3.4-2.1-6.9-2.4 3.4-.3 5.7-1.1 6.9-2.4C11 8.1 11.7 5.8 12 2.5Z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2.2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function ContactLauncher({ locale }: { locale: Locale }) {
  const t = COPY[locale] ?? COPY.en;
  const [menuOpen, setMenuOpen] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const messengers = orderedMessengers(locale);
  const emailHref = navHref(locale, "#contact");
  const fabOpen = menuOpen || chatOpen;

  const closeChat = useCallback(() => {
    hidePanel();
    setChatOpen(false);
  }, []);

  const openWidget = useCallback(
    async (detail?: OpenChatDetail) => {
      setMenuOpen(false);
      setLoadingChat(true);
      await ensureWidget();
      const bubble = await waitFor(
        () => document.querySelector<HTMLElement>(".aiba-root .aiba-bubble"),
        7000,
      );
      setLoadingChat(false);
      document.querySelector(".aiba-root .aiba-greeting, .aiba-greeting")?.remove();
      showPanel();
      if (bubble && bubble.getAttribute("aria-expanded") !== "true") bubble.click();
      showPanel();
      setChatOpen(true);
      applyLocaleChrome(locale);
      const input = document.querySelector<HTMLTextAreaElement>(".aiba-root textarea.aiba-input");
      if (input) window.setTimeout(() => input.focus(), 80);
      const message = detail?.initialMessage || detail?.text;
      if (message) await typeAndSend(message, detail?.sendImmediately !== false);
    },
    [locale],
  );

  useEffect(() => {
    const id = window.setTimeout(() => {
      void ensureWidget();
    }, 200);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const onOpenChat = (e: Event) => {
      const detail = (e as CustomEvent<OpenChatDetail | string>).detail;
      const normalized: OpenChatDetail =
        typeof detail === "string" ? { initialMessage: detail } : detail ?? {};
      if (normalized.text && !normalized.initialMessage) {
        normalized.initialMessage = normalized.text;
      }
      void openWidget(normalized);
    };
    window.addEventListener(OPEN_CHAT_EVENT, onOpenChat);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpenChat);
  }, [openWidget]);

  useEffect(() => {
    const onOpenLauncher = () => {
      closeChat();
      setMenuOpen(true);
    };
    window.addEventListener(OPEN_LAUNCHER_EVENT, onOpenLauncher);
    return () => window.removeEventListener(OPEN_LAUNCHER_EVENT, onOpenLauncher);
  }, [closeChat]);

  useEffect(() => {
    const sync = () => {
      const panel = document.querySelector<HTMLElement>(".aiba-root .aiba-panel");
      const open = !!(panel && !panel.hidden && panel.style.display !== "none");
      setChatOpen(open);
      if (open) {
        setMenuOpen(false);
        applyLocaleChrome(locale);
      }
    };
    const timer = window.setInterval(sync, 200);
    const onCloseClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.(".aiba-close-btn")) {
        const panel = document.querySelector<HTMLElement>(".aiba-root .aiba-panel");
        if (panel) {
          panel.hidden = true;
          panel.setAttribute("hidden", "");
          panel.style.setProperty("display", "none", "important");
        }
        setChatOpen(false);
        window.setTimeout(sync, 40);
      }
    };
    document.addEventListener("click", onCloseClick, true);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("click", onCloseClick, true);
    };
  }, [locale]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="cl-root">
      {menuOpen && !chatOpen ? (
        <div className="cl-backdrop" onClick={() => setMenuOpen(false)} aria-hidden />
      ) : null}
      {menuOpen && !chatOpen ? (
        <div className="cl-menu" role="menu" aria-label={t.title}>
          <div className="cl-menu-head">
            <span className="cl-menu-title">{t.title}</span>
            <button type="button" className="cl-menu-close" onClick={() => setMenuOpen(false)} aria-label={t.close}>
              <IconClose />
            </button>
          </div>
          <button type="button" className="cl-item cl-item-ai" role="menuitem" onClick={() => void openWidget()} disabled={loadingChat}>
            <span className="cl-item-icon cl-item-icon-ai">
              <IconSpark />
            </span>
            <span className="cl-item-text">
              <span className="cl-item-label">{t.aiLabel}</span>
              <span className="cl-item-hint">{t.aiHint}</span>
            </span>
          </button>
          {messengers.length ? <div className="cl-menu-sep" /> : null}
          {messengers.map((row) => (
            <a
              key={row.key}
              className="cl-item"
              role="menuitem"
              href={row.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className="cl-item-icon"
                style={{ background: MESSENGER_META[row.key].color, color: "#fff" }}
              >
                {row.label[0]}
              </span>
              <span className="cl-item-text">
                <span className="cl-item-label">{row.label}</span>
                <span className="cl-item-hint">{t.messengerHint}</span>
              </span>
            </a>
          ))}
          <div className="cl-menu-sep" />
          <a
            className="cl-item"
            role="menuitem"
            href={emailHref}
            onClick={() => setMenuOpen(false)}
          >
            <span className="cl-item-icon cl-item-icon-email">
              <IconMail />
            </span>
            <span className="cl-item-text">
              <span className="cl-item-label">{t.emailLabel}</span>
              <span className="cl-item-hint">{t.emailHint}</span>
            </span>
          </a>
        </div>
      ) : null}
      <button
        type="button"
        className="cl-fab"
        onClick={() => {
          if (chatOpen) {
            closeChat();
            setMenuOpen(false);
            return;
          }
          setMenuOpen((v) => !v);
        }}
        aria-expanded={fabOpen}
        aria-label={fabOpen ? t.close : t.open}
      >
        <span className="cl-fab-icon">{fabOpen ? <IconClose /> : <IconChat />}</span>
        <span className="cl-fab-label">{fabOpen ? t.close : t.open}</span>
      </button>
    </div>
  );
}
