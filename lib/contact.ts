import { site } from "@/lib/site";

export const OPEN_LAUNCHER_EVENT = "am:open-launcher";
export const OPEN_CHAT_EVENT = "am:open-chat";

export type OpenChatDetail = {
  text?: string;
  initialMessage?: string;
  sendImmediately?: boolean;
};

export type MessengerKey = "telegram" | "whatsapp" | "messenger" | "instagram";

const MESSENGER_ORDER: MessengerKey[] = ["telegram", "whatsapp", "messenger", "instagram"];

const MESSENGER_LABELS: Record<MessengerKey, string> = {
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  messenger: "Messenger",
  instagram: "Instagram",
};

/**
 * Instagram has no public username-to-DM redirect that survives bot blocking,
 * so the number we actually hold is the account id. Accept whatever form ends
 * up in `site.messengers.instagram` and turn it into a working Direct link:
 * a full URL is used as-is, `@handle`/`handle` becomes `ig.me/m/<handle>`, and
 * a bare numeric account id becomes the `direct/t/<id>` thread URL.
 */
export function instagramDirectUrl(value: string): string {
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const handle = trimmed.replace(/^@/, "");
  if (/^\d+$/.test(handle)) return `https://www.instagram.com/direct/t/${handle}`;
  return `https://ig.me/m/${handle}`;
}

/** Public messenger links in display order (Chat launcher uses the same list). */
export function listPublicMessengers(): { key: MessengerKey; href: string; label: string }[] {
  const m = site.messengers;
  const rows: { key: MessengerKey; href: string }[] = [];
  if (m.telegram) rows.push({ key: "telegram", href: m.telegram });
  if (m.whatsapp) {
    const href = m.whatsapp.startsWith("http")
      ? m.whatsapp
      : `https://wa.me/${m.whatsapp.replace(/\D/g, "")}`;
    rows.push({ key: "whatsapp", href });
  }
  if (m.messenger) rows.push({ key: "messenger", href: m.messenger });
  if (m.instagram) rows.push({ key: "instagram", href: instagramDirectUrl(m.instagram) });
  return rows
    .sort((a, b) => MESSENGER_ORDER.indexOf(a.key) - MESSENGER_ORDER.indexOf(b.key))
    .map((row) => ({ ...row, label: MESSENGER_LABELS[row.key] }));
}

function payload(detail?: OpenChatDetail | string): OpenChatDetail {
  if (typeof detail === "string") return { initialMessage: detail };
  return detail ?? {};
}

/** Opens the site AI chat (the launcher's first and primary channel). */
export function openLauncher() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_LAUNCHER_EVENT));
}

/** Opens the AI chat directly, bypassing the channel chooser. */
export function openChat(detail?: OpenChatDetail | string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT, { detail: payload(detail) }));
}
