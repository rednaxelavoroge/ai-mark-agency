"use client";

import { useCallback, useEffect, useState } from "react";
import {
  listPublicMessengers,
  OPEN_CHAT_EVENT,
  OPEN_LAUNCHER_EVENT,
  type MessengerKey,
  type OpenChatDetail,
} from "@/lib/contact";
import { site, type Locale } from "@/lib/site";

const COPY = {
  ru: {
    open: "Связаться",
    close: "Закрыть",
    title: "Чем можем помочь?",
    aiLabel: "Чат с AI-ассистентом",
    aiHint: "Отвечает мгновенно, круглосуточно",
    messengerHint: "Написать в чат",
    emailLabel: "Email",
    emailHint: "hello@ai-mark.agency",
    greeting:
      "Здравствуйте! Я AI Business Assistant AI MARK. Расскажите, что нужно — маркетинг, продажи или продукт.",
    placeholder: "Напишите сообщение…",
  },
  en: {
    open: "Contact us",
    close: "Close",
    title: "How can we help?",
    aiLabel: "Chat with our AI assistant",
    aiHint: "Answers instantly, day or night",
    messengerHint: "Chat with us",
    emailLabel: "Email",
    emailHint: "hello@ai-mark.agency",
    greeting:
      "Hi! I'm AI MARK's AI Business Assistant. Tell us what you need — marketing, sales, or a product.",
    placeholder: "Type a message…",
  },
} as const;

/**
 * Channel order is fixed and deliberate: the AI chat is the first and primary
 * option, then the messengers, then email last. Instagram and the others are
 * listed by `listPublicMessengers()` only when a URL is configured, so a
 * channel disappears from the chooser rather than becoming a dead button.
 */
const MESSENGER_META: Record<MessengerKey, { color: string }> = {
  telegram: { color: "#229ED9" },
  whatsapp: { color: "#25D366" },
  messenger: { color: "#0084FF" },
  instagram: { color: "#E1306C" },
};

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

    /*
     * Greeting teaser.
     *
     * The hosted widget anchors .aiba-greeting to .aiba-root, which is a
     * zero-width box. An auto width therefore shrink-to-fits against a 0px
     * containing block and collapses to min-content, so the bubble rendered as
     * a tall 95px column. Give it an explicit width instead — matched to
     * .cl-menu so the widget and the launcher read as one system.
     */
    .aiba-root .aiba-greeting {
      box-sizing: border-box !important;
      width: 328px !important;
      max-width: calc(100vw - 28px) !important;
      min-width: 0 !important;
      padding: 14px 40px 14px 16px !important;
      border: 1px solid var(--line) !important;
      border-radius: 18px !important;
      background: var(--ink-2) !important;
      color: var(--paper) !important;
      box-shadow: var(--shadow-lg) !important;
      font-size: 14px !important;
      line-height: 1.45 !important;
    }
    /* Downward tail, so the bubble points at the launcher button. */
    .aiba-root .aiba-greeting::after {
      content: "" !important;
      position: absolute !important;
      right: 22px !important;
      bottom: -6px !important;
      width: 12px !important;
      height: 12px !important;
      background: var(--ink-2) !important;
      border-right: 1px solid var(--line) !important;
      border-bottom: 1px solid var(--line) !important;
      transform: rotate(45deg) !important;
    }
    .aiba-root .aiba-greeting-close {
      position: absolute !important;
      top: 6px !important;
      right: 6px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 28px !important;
      height: 28px !important;
      padding: 0 !important;
      border: 0 !important;
      border-radius: 50% !important;
      background: transparent !important;
      color: var(--muted) !important;
      font-size: 18px !important;
      line-height: 1 !important;
      cursor: pointer !important;
      transition: background 0.2s ease, color 0.2s ease !important;
    }
    .aiba-root .aiba-greeting-close:hover {
      background: var(--ink-3) !important;
      color: var(--paper) !important;
    }
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

/**
 * Localize the greeting teaser.
 *
 * Its text comes from the workspace config, and that endpoint ignores `?lang=`,
 * so /ru visitors were shown an English greeting. Rewrite it with the same
 * localized copy the panel uses. Only the text div is touched — the sibling
 * dismiss button keeps its own markup.
 */
function applyTeaserChrome(locale: Locale) {
  const t = locale === "ru" ? COPY.ru : COPY.en;
  const text = document.querySelector<HTMLElement>(".aiba-root .aiba-greeting > div");
  if (text && text.textContent !== t.greeting) text.textContent = t.greeting;
}

/**
 * The hosted widget paints at z-index 2147483000, so its greeting teaser covers
 * the channel chooser. Its DOM and ours are siblings under <body>, so no CSS
 * selector can reach from one to the other — hide the teaser directly while the
 * menu is up and release it as soon as the menu closes.
 */
function syncTeaserVisibility(hide: boolean) {
  const teaser = document.querySelector<HTMLElement>(".aiba-root .aiba-greeting");
  if (!teaser) return;
  if (hide) {
    if (teaser.style.getPropertyValue("display") !== "none") {
      teaser.style.setProperty("display", "none", "important");
    }
  } else if (teaser.style.getPropertyValue("display") === "none") {
    teaser.style.removeProperty("display");
  }
}

function applyLocaleChrome(locale: Locale) {
  const t = locale === "ru" ? COPY.ru : COPY.en;
  // The panel header is painted from the workspace config at
  // `app.alex-dev.pro` (`title: "AlexDev"`), which is a dashboard setting we
  // cannot change from this repo — and a public "AlexDev" label is not
  // acceptable. Re-assert the brand name here; `sync()` re-runs every 200ms
  // while the panel is open, so the patch survives the widget's own renders.
  // The widget gives no class to its title span (it is the only non-dot span
  // inside `.aiba-header-title`), so match it structurally rather than by class.
  const titleWrap = document.querySelector<HTMLElement>(".aiba-root .aiba-header-title");
  const titleText = titleWrap?.querySelector<HTMLElement>("span:not(.aiba-dot)");
  if (titleText && titleText.textContent !== site.name) titleText.textContent = site.name;

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
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function ContactLauncher({ locale }: { locale: Locale }) {
  const t = locale === "ru" ? COPY.ru : COPY.en;
  const [menuOpen, setMenuOpen] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const messengers = listPublicMessengers();
  const fabOpen = menuOpen || chatOpen;
  // The public site carries no email intake any more, so Email is a plain
  // mailto rather than a link to a form that no longer exists.
  const emailHref = `mailto:${site.email}?subject=${encodeURIComponent("AI MARK — inquiry")}`;

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
      // The CTA opens the chooser, not the chat: the AI assistant is the first
      // item in it, but the visitor still picks their channel.
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
      // The teaser is only on screen while the panel is closed, so it is patched
      // on every tick rather than inside the `open` branch below.
      applyTeaserChrome(locale);
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

  // Keeps the widget's greeting teaser out of the way while the chooser is up.
  // The widget paints at z-index 2147483000 and its DOM is a sibling of ours
  // under <body>, so no stylesheet can reach it — and because it can recreate
  // the teaser at any time, the hide is re-asserted on a timer rather than once.
  useEffect(() => {
    const hide = menuOpen && !chatOpen;
    syncTeaserVisibility(hide);
    if (!hide) return;
    const timer = window.setInterval(() => syncTeaserVisibility(true), 200);
    return () => {
      window.clearInterval(timer);
      syncTeaserVisibility(false);
    };
  }, [menuOpen, chatOpen]);

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

          {/* 1 — primary channel, always first */}
          <button
            type="button"
            className="cl-item cl-item-ai"
            role="menuitem"
            onClick={() => void openWidget()}
            disabled={loadingChat}
          >
            <span className="cl-item-icon cl-item-icon-ai">
              <IconSpark />
            </span>
            <span className="cl-item-text">
              <span className="cl-item-label">{t.aiLabel}</span>
              <span className="cl-item-hint">{t.aiHint}</span>
            </span>
          </button>

          {/* 2 — messengers, in the order listPublicMessengers() returns them */}
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

          {/* 3 — email, always last */}
          <div className="cl-menu-sep" />
          <a className="cl-item" role="menuitem" href={emailHref}>
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
