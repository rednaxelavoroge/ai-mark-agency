import { NextResponse } from "next/server";
import { attributeContactLead } from "@/lib/referral/attribution";

export const runtime = "nodejs";
// Reads the request's referral cookie and writes a Lead row, so this route is
// never cached or prerendered.
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SCENARIOS = new Set([
  "idea",
  "business",
  "capital",
  "marketing",
  "partner",
  "investment",
  "aime",
  "assistant",
  "showroom",
  "product",
  "custom",
]);

type Payload = {
  name?: unknown;
  email?: unknown;
  messenger?: unknown;
  company?: unknown;
  scenario?: unknown;
  budget?: unknown;
  website?: unknown;
  message?: unknown;
  landing_path?: unknown;
};

function str(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

/** Internal path only. Query strings and off-site values are dropped. */
function landingPath(value: unknown): string | null {
  const raw = str(value, 300);
  if (!raw.startsWith("/") || raw.startsWith("//")) return null;
  if (/[\s?#\\]/.test(raw)) return null;
  return raw;
}

async function deliver(text: string, subject: string) {
  const to = process.env.CONTACT_TO_EMAIL;
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
    if (!to) throw new Error("CONTACT_TO_EMAIL is not set");
    const from =
      process.env.CONTACT_FROM_EMAIL ?? "AI MARK <noreply@ai-mark.agency>";
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

  if (!to) {
    throw new Error("CONTACT_TO_EMAIL is not set");
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
  const scenario = str(body.scenario, 40) || str(body.budget, 40);

  if (!name || !EMAIL_RE.test(email) || !messenger || !company || !SCENARIOS.has(scenario)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const message = str(body.message, 4000);
  const landing = landingPath(body.landing_path);
  const subject = `[ai-mark.agency] ${company} · ${scenario}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Telegram/WhatsApp: ${messenger}`,
    `Company: ${company}`,
    `Scenario: ${scenario}`,
    landing ? `Page: ${landing}` : "",
    message ? `Message: ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  // Phase 4B: record the submission as a Lead, attributed to the visitor's
  // referral cookie when there is a valid one. This is strictly ADDITIVE —
  // it cannot throw, and it does not replace the email/webhook delivery below,
  // which stays exactly as it was. The submission is recorded before delivery
  // so a provider outage cannot lose the lead itself.
  const lead = await attributeContactLead({
    name,
    email,
    messenger,
    company,
    scenario,
    message: message || null,
    landingPath: landing,
  });

  const recorded = Boolean(lead.leadId);
  try {
    await deliver(text, subject);
    return NextResponse.json({ ok: true, lead_source: lead.source, recorded });
  } catch (error) {
    console.error("contact_failed", error);
    // The lead row is the commercial record. A mail outage must not make the
    // visitor retry as if nothing was stored. Delivery still runs first when
    // a provider is configured; 503 remains when nothing was recorded.
    if (recorded) {
      return NextResponse.json({
        ok: true,
        lead_source: lead.source,
        recorded: true,
        notified: false,
      });
    }
    return NextResponse.json(
      { ok: false, error: "send_failed", recorded: false },
      { status: 503 },
    );
  }
}
