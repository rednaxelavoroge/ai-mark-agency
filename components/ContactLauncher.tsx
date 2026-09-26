"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
  listPublicMessengers,
  OPEN_CHAT_EVENT,
  OPEN_LAUNCHER_EVENT,
  type MessengerKey,
  type OpenChatDetail,
} from "@/lib/contact";
import { isWidgetMessageUrl, withChatContext } from "@/lib/chat-context";
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
    /*
     * Once-only greeting: when the visitor has already dismissed it, the marker
     * is latched on <html> before first paint, so the widget's re-injected
     * teaser is hidden by CSS from its very first frame. The 200ms JS loop
     * below is only a backstop — on its own it let the card flash for a frame.
     */
    html[data-teaser-seen] .aiba-root .aiba-greeting {
      display: none !important;
    }
    /* Hosted widget footer links the BA product origin (alex-dev.pro). Hide it. */
    .aiba-root .aiba-footer { display: none !important; }
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
 *
 * The body-level `data-overlay-open` flag is set by any full-screen overlay we
 * own (the mobile language sheet publishes it) and is observed here, so the
 * teaser also stays out of the way of overlays this component never sees.
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

/**
 * Once-only greeting.
 *
 * The hosted widget re-injects its greeting teaser on every full page load and
 * keeps re-rendering it while the visitor navigates, so without a marker it
 * pops up again and again — on reloads, on soft navigations and on any later
 * visit. The widget exposes no API for this, so the dismissal is remembered in
 * localStorage and re-asserted over the widget's own DOM, the same way the
 * channel-chooser hide works.
 *
 * The marker is written when the visitor dismisses the teaser themselves; an
 * ignored greeting is not treated as seen.
 */
const TEASER_SEEN_KEY = "aimark.chat.teaser.v1";

function hasSeenTeaser(): boolean {
  // The attribute is the in-page latch (and survives a storage-less browser);
  // the key carries the decision across page loads and tabs.
  if (document.documentElement.hasAttribute("data-teaser-seen")) return true;
  try {
    return window.localStorage.getItem(TEASER_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberTeaserSeen() {
  // The attribute is what the stylesheet keys off; set it even if storage is
  // unavailable so the greeting still stays down for this page view.
  document.documentElement.setAttribute("data-teaser-seen", "");
  try {
    window.localStorage.setItem(TEASER_SEEN_KEY, "1");
  } catch {
    // Private mode / storage disabled: the greeting simply reappears, which is
    // the pre-existing behaviour and never blocks the page.
  }
}

/**
 * Close button wiring for the hosted teaser, delegated at the document so it
 * also catches a teaser the widget re-creates after a soft navigation.
 */
function isTeaserCloseClick(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  return !!el?.closest?.(".aiba-root .aiba-greeting-close");
}

/**
 * The widget POSTs visitor text to the hosted orchestrator with no prompt
 * override. Prefix AI MARK context onto those payloads only.
 */
function installChatContextGate() {
  const w = window as Window & { __aimarkChatGate?: boolean };
  if (w.__aimarkChatGate) return;
  w.__aimarkChatGate = true;
  const originalFetch = window.fetch.bind(window);
  window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : input instanceof Request
            ? input.url
            : String(input);
    if (!isWidgetMessageUrl(url) || (init?.method ?? "GET").toUpperCase() !== "POST") {
      return originalFetch(input, init);
    }
    const bodyText = typeof init?.body === "string" ? init.body : null;
    if (!bodyText && input instanceof Request) {
      return input
        .clone()
        .text()
        .then((text) => {
          try {
            const payload = JSON.parse(text) as { text?: string };
            if (typeof payload.text === "string") {
              payload.text = withChatContext(payload.text);
              return originalFetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });
            }
          } catch {
            /* send original */
          }
          return originalFetch(input, init);
        });
    }
    if (bodyText) {
      try {
        const payload = JSON.parse(bodyText) as { text?: string };
        if (typeof payload.text === "string") {
          payload.text = withChatContext(payload.text);
          return originalFetch(input, { ...init, body: JSON.stringify(payload) });
        }
      } catch {
        /* send original */
      }
    }
    return originalFetch(input, init);
  };
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

function IconTelegram() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.38 0-4.54 3.7-8.24 8.25-8.24 4.55 0 8.25 3.7 8.25 8.24 0 4.54-3.7 8.24-8.25 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.04s.88 2.37 1.01 2.53c.12.17 1.74 2.65 4.21 3.72.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z" />
    </svg>
  );
}

function IconMessenger() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.43 3.14 7.21.16.15.27.36.27.58l.07 1.8c.03.74.8 1.22 1.48.91l2.02-.92c.18-.08.38-.1.57-.06.77.21 1.6.32 2.45.32 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm1.19 12.18l-2.61-2.79c-.19-.2-.49-.24-.72-.09l-3.51 2.31c-.47.31-1.06-.22-.78-.71l3.74-6.52c.2-.34.65-.41.95-.15l2.6 2.29c.19.17.47.18.67.04l3.52-2.3c.49-.32 1.08.23.79.73l-3.79 6.54c-.2.35-.64.43-.96.15z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function MessengerIcon({ name }: { name: MessengerKey }) {
  switch (name) {
    case "telegram":
      return <IconTelegram />;
    case "whatsapp":
      return <IconWhatsApp />;
    case "messenger":
      return <IconMessenger />;
    case "instagram":
      return <IconInstagram />;
    default:
      return null;
  }
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
    installChatContextGate();
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

  // Latch the once-only marker on <html> before the browser paints anything, so
  // a returning visitor never sees the greeting flash: the rule above hides the
  // teaser from its first frame instead of waiting for the 200ms sync loop.
  // `injectHideBubbleStyle` runs first because it is what defines the widget's
  // base styles in the first place.
  useLayoutEffect(() => {
    injectHideBubbleStyle();
    if (hasSeenTeaser()) document.documentElement.setAttribute("data-teaser-seen", "");
  }, []);

  // Keeps the widget's greeting teaser out of the way while the chooser is up.
  // The widget paints at z-index 2147483000 and its DOM is a sibling of ours
  // under <body>, so no stylesheet can reach it — and because it can recreate
  // the teaser at any time, the hide is re-asserted on a timer rather than once.
  // The same loop re-asserts the once-only dismissal, since the widget re-injects
  // its greeting on every soft navigation.
  useEffect(() => {
    const syncTeaser = () => {
      if (hasSeenTeaser()) {
        syncTeaserVisibility(true);
        return;
      }
      syncTeaserVisibility(menuOpen && !chatOpen);
    };

    syncTeaser();
    const timer = window.setInterval(syncTeaser, 200);
    return () => {
      window.clearInterval(timer);
      if (!hasSeenTeaser()) syncTeaserVisibility(false);
    };
  }, [menuOpen, chatOpen]);

  // Remember the dismissal the moment the visitor closes the greeting, so the
  // widget cannot bring it back on the next page or the next visit. Delegated at
  // the document because the widget owns (and re-creates) the markup.
  useEffect(() => {
    const onCloseClick = (e: Event) => {
      if (!isTeaserCloseClick(e.target)) return;
      rememberTeaserSeen();
      window.setTimeout(() => syncTeaserVisibility(true), 0);
    };
    document.addEventListener("click", onCloseClick, true);
    return () => document.removeEventListener("click", onCloseClick, true);
  }, []);

  // Any full-screen overlay we own (today the mobile language sheet) raises the
  // body-level `data-overlay-open` flag; mirror it into the hosted widget's
  // teaser, which paints at z-index 2147483000 and would otherwise sit on top of
  // an overlay its DOM has no relation to.
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const overlayOpen = document.documentElement.hasAttribute("data-overlay-open");
      if (overlayOpen || hasSeenTeaser()) syncTeaserVisibility(true);
      else syncTeaserVisibility(menuOpen && !chatOpen);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-overlay-open"] });
    return () => observer.disconnect();
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
                <MessengerIcon name={row.key} />
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
