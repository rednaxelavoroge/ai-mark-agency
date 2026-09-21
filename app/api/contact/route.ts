import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BUDGETS = new Set(["starter", "growth", "scale", "unsure"]);

type Payload = {
  name?: unknown;
  email?: unknown;
  messenger?: unknown;
  company?: unknown;
  budget?: unknown;
  website?: unknown;
};

function str(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

async function deliver(text: string, subject: string) {
  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) {
    throw new Error("CONTACT_TO_EMAIL is not set");
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, text, to }),
    });
    if (!res.ok) throw new Error("webhook failed");
    return;
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const from =
      process.env.CONTACT_FROM_EMAIL ?? "AI Mark Agency <noreply@ai-mark.agency>";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, text }),
    });
    if (!res.ok) throw new Error("resend failed");
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[contact]", subject, text);
    return;
  }

  throw new Error("No email provider configured");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (str(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const messenger = str(body.messenger, 120);
  const company = str(body.company, 160);
  const budget = str(body.budget, 40);

  if (!name || !EMAIL_RE.test(email) || !messenger || !company || !BUDGETS.has(budget)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const subject = `[ai-mark.agency] ${company} · ${budget}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Telegram/WhatsApp: ${messenger}`,
    `Company: ${company}`,
    `Budget: ${budget}`,
  ].join("\n");

  try {
    await deliver(text, subject);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact_failed", error);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 503 });
  }
}
