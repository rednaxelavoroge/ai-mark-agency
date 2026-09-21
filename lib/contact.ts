export const OPEN_LAUNCHER_EVENT = "am:open-launcher";
export const OPEN_CHAT_EVENT = "am:open-chat";

export type OpenChatDetail = {
  text?: string;
  initialMessage?: string;
  sendImmediately?: boolean;
};

function payload(detail?: OpenChatDetail | string): OpenChatDetail {
  if (typeof detail === "string") return { initialMessage: detail };
  return detail ?? {};
}

/** Opens the ContactLauncher chooser (Chat → messengers → Email). */
export function openLauncher() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_LAUNCHER_EVENT));
}

/** Injects/opens the real BA widget (not the chooser). */
export function openChat(detail?: OpenChatDetail | string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT, { detail: payload(detail) }));
}
