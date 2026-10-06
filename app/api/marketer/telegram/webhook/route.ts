import {
  handleApprove,
  handleReject,
  handleRejectionComment,
} from "@/lib/marketer/service";
import { parseTelegramUpdate, verifyTelegramWebhookSecret } from "@/lib/marketer/telegram";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * Telegram Bot API webhook. Registered once with `setWebhook` (see
 * docs/marketer-setup.md) with `secret_token` set to `TELEGRAM_WEBHOOK_SECRET`;
 * Telegram echoes it back in `X-Telegram-Bot-Api-Secret-Token` on every call,
 * which is how this route tells a real update from a forged POST.
 *
 * Handles capability 8 (Approve/Reject buttons) and capability 10
 * (the client's free-text comment after a reject).
 */
export async function POST(request: Request) {
  if (!verifyTelegramWebhookSecret(request.headers.get("x-telegram-bot-api-secret-token"))) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let update: unknown;
  try {
    update = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }

  const event = parseTelegramUpdate(update);

  switch (event.type) {
    case "approve": {
      const result = await handleApprove(event.postId, event.callbackQueryId);
      return Response.json({ ok: result.ok });
    }
    case "reject": {
      const result = await handleReject(event.postId, event.chatId, event.callbackQueryId);
      return Response.json({ ok: result.ok });
    }
    case "text": {
      const result = await handleRejectionComment(event.chatId, event.text);
      return Response.json({ ok: result.ok });
    }
    case "ignored":
    default:
      return Response.json({ ok: true, ignored: true });
  }
}
