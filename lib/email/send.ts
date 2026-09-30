import "server-only";

/**
 * Transactional email via Resend (same provider as /api/contact).
 * When RESEND_API_KEY is missing, logs and returns without throwing.
 */

export type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export type SendEmailResult =
  | { ok: true; skipped?: false }
  | { ok: true; skipped: true }
  | { ok: false; error: string };

function fromAddress(): string {
  return (
    process.env.EMAIL_FROM?.trim() ||
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "AI MARK <noreply@auth.ai-mark.agency>"
  );
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const to = input.to.trim();
  if (!to || !to.includes("@")) {
    return { ok: false, error: "invalid recipient" };
  }

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (!resendKey) {
    console.info(
      "[email] RESEND_API_KEY not set; skipped:",
      input.subject,
      "→",
      to,
    );
    return { ok: true, skipped: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress(),
        to: [to],
        subject: input.subject,
        html: input.html,
        text: input.text ?? stripHtml(input.html),
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[email] resend failed:", res.status, body.slice(0, 200));
      return { ok: false, error: "resend failed" };
    }
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "send failed";
    console.error("[email]", message);
    return { ok: false, error: message };
  }
}

export function adminNotifyEmail(): string | null {
  const to =
    process.env.ADMIN_NOTIFY_EMAIL?.trim() ||
    process.env.CONTACT_TO_EMAIL?.trim() ||
    null;
  return to && to.includes("@") ? to : null;
}

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function emailShell(body: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0a0a0b;font-family:system-ui,-apple-system,sans-serif;color:#e8e6e3;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:24px auto;background:#141416;border:1px solid #2a2a2e;border-radius:12px;">
<tr><td style="padding:28px 24px 8px;">
<div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#888;">AI MARK</div>
</td></tr>
<tr><td style="padding:8px 24px 28px;font-size:15px;line-height:1.55;">${body}</td></tr>
<tr><td style="padding:0 24px 24px;font-size:11px;color:#666;">ai-mark.agency · Partner Platform</td></tr>
</table></body></html>`;
}
