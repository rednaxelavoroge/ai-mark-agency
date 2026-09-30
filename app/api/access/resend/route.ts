import { resendBuyerAccessLinks } from "@/lib/provisioning/worker";
import { normalizeEmailLocale } from "@/lib/email/locale";
import { allow } from "@/lib/rate/window";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientIp(request: Request): string {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

/** Always answers the same generic ok, so it can't be used to probe who bought. */
export async function POST(request: Request) {
  let body: { email?: unknown; locale?: unknown } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    /* empty body */
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 254) : "";
  const locale = normalizeEmailLocale(typeof body.locale === "string" ? body.locale : "en");
  if (!EMAIL_RE.test(email)) return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });

  const ip = clientIp(request);
  const ipOk = allow(`resend-ip:${ip}`, 5, 15 * 60_000);
  const emailOk = allow(`resend-email:${email}`, 3, 60 * 60_000);
  if (ipOk && emailOk) {
    try {
      await resendBuyerAccessLinks({ email, locale });
    } catch (error) {
      console.error("[resend-access]", error);
    }
  }
  return Response.json({ ok: true });
}
