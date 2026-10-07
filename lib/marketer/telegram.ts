import "server-only";

/**
 * Capability 8 (send each post to the client in Telegram with Approve/Reject)
 * and the client-reply side of capability 10 (free-text comment after a
 * reject). Thin wrapper over the Telegram Bot API — no SDK dependency.
 *
 * Setup: docs/marketer-setup.md. Without `TELEGRAM_BOT_TOKEN` every function
 * here returns `{ ok: false, notConfigured: true }` instead of throwing, so
 * the rest of the pipeline can still run and simply mark the post as
 * "waiting on a connection that is not configured yet".
 */

export type TelegramResult<T = { messageId: string }> =
  | ({ ok: true } & T)
  | { ok: false; error: string; notConfigured?: true };

function botToken(): string | null {
  return process.env.TELEGRAM_BOT_TOKEN?.trim() || null;
}

export function telegramConfigured(): boolean {
  return Boolean(botToken());
}

async function callTelegram<T>(
  method: string,
  body: Record<string, unknown>,
): Promise<TelegramResult<T>> {
  const token = botToken();
  if (!token) {
    return {
      ok: false,
      notConfigured: true,
      error: "TELEGRAM_BOT_TOKEN not set; see docs/marketer-setup.md",
    };
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20_000),
    });
    const data = (await res.json()) as { ok: boolean; description?: string; result?: unknown };
    if (!data.ok) {
      return { ok: false, error: data.description ?? `Telegram API error (HTTP ${res.status})` };
    }
    return { ok: true, ...(data.result as object) } as TelegramResult<T>;
  } catch (error) {
    const message = error instanceof Error ? error.message : "request failed";
    return { ok: false, error: message };
  }
}

export type ApprovalPost = {
  id: string;
  kind: string;
  topic: string;
  caption: string | null;
  script: string | null;
  imageUrl: string | null;
  version: number;
};

function approvalKeyboard(postId: string) {
  return {
    inline_keyboard: [
      [
        { text: "✅ Одобрить / Approve", callback_data: `approve:${postId}` },
        { text: "✏️ Отклонить / Reject", callback_data: `reject:${postId}` },
      ],
    ],
  };
}

function approvalText(post: ApprovalPost): string {
  const lines = [
    `${post.kind === "reel" ? "🎬 Reel" : post.kind === "story" ? "🟣 Story" : "📝 Post"} · ${post.topic}`,
    post.version > 1 ? `Версия ${post.version} / Version ${post.version}` : null,
    "",
    post.caption ?? "",
    post.script ? `\n— Script —\n${post.script}` : null,
  ];
  return lines.filter((l) => l !== null).join("\n");
}

/** Sends a post for the client's Approve/Reject decision (capability 8). */
export async function sendApprovalRequest(
  chatId: string,
  post: ApprovalPost,
): Promise<TelegramResult> {
  const text = approvalText(post);
  if (post.imageUrl) {
    const result = await callTelegram<{ message_id: number }>("sendPhoto", {
      chat_id: chatId,
      photo: post.imageUrl,
      caption: text.slice(0, 1024),
      reply_markup: approvalKeyboard(post.id),
    });
    if (!result.ok) return result;
    return { ok: true, messageId: String(result.message_id) };
  }
  const result = await callTelegram<{ message_id: number }>("sendMessage", {
    chat_id: chatId,
    text,
    reply_markup: approvalKeyboard(post.id),
  });
  if (!result.ok) return result;
  return { ok: true, messageId: String(result.message_id) };
}

/** Plain notice — e.g. "write what to change" after a reject. */
export async function sendTelegramMessage(chatId: string, text: string): Promise<TelegramResult> {
  const result = await callTelegram<{ message_id: number }>("sendMessage", {
    chat_id: chatId,
    text,
  });
  if (!result.ok) return result;
  return { ok: true, messageId: String(result.message_id) };
}

/** Acknowledges a button tap so Telegram stops showing the loading spinner. */
export async function answerCallbackQuery(
  callbackQueryId: string,
  text?: string,
): Promise<TelegramResult<Record<string, never>>> {
  return callTelegram("answerCallbackQuery", { callback_query_id: callbackQueryId, text });
}

export type TelegramWebhookEvent =
  | { type: "approve"; postId: string; chatId: string; callbackQueryId: string }
  | { type: "reject"; postId: string; chatId: string; callbackQueryId: string }
  | { type: "text"; chatId: string; text: string }
  | { type: "ignored" };

/** Parses a Telegram `Update` payload into the three events this pipeline cares about. */
export function parseTelegramUpdate(update: unknown): TelegramWebhookEvent {
  if (!update || typeof update !== "object") return { type: "ignored" };
  const u = update as Record<string, unknown>;

  const callback = u.callback_query as Record<string, unknown> | undefined;
  if (callback && typeof callback.data === "string") {
    const chat = (callback.message as Record<string, unknown> | undefined)?.chat as
      | Record<string, unknown>
      | undefined;
    const chatId = chat?.id != null ? String(chat.id) : null;
    const callbackQueryId = callback.id != null ? String(callback.id) : null;
    const [action, postId] = callback.data.split(":");
    if (chatId && callbackQueryId && postId && (action === "approve" || action === "reject")) {
      return { type: action, postId, chatId, callbackQueryId };
    }
    return { type: "ignored" };
  }

  const message = u.message as Record<string, unknown> | undefined;
  if (message && typeof message.text === "string") {
    const chat = message.chat as Record<string, unknown> | undefined;
    const chatId = chat?.id != null ? String(chat.id) : null;
    if (chatId) return { type: "text", chatId, text: message.text };
  }

  return { type: "ignored" };
}

export function verifyTelegramWebhookSecret(headerValue: string | null): boolean {
  const expected = process.env.TELEGRAM_WEBHOOK_SECRET?.trim();
  if (!expected) return false;
  return headerValue === expected;
}
