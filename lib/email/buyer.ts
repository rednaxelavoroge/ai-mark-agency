import { emailShell } from "./send";
import { normalizeEmailLocale } from "./locale";
import { BUYER_COPY, type BuyerProduct } from "./buyer-copy";
import { absoluteUrl, type Locale } from "@/lib/site";

function esc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function productKey(ref: string): BuyerProduct {
  if (ref === "assistant" || ref === "showroom") return ref;
  return "aime";
}

export function resendAccessUrl(locale: Locale, email?: string): string {
  const q = email ? `?email=${encodeURIComponent(email)}` : "";
  return `${absoluteUrl(locale, "/access")}${q}`;
}

export function buyerOnboardingEmail(input: {
  locale: string;
  productRef: string;
  magicUrl: string;
  email?: string;
}): { subject: string; html: string } {
  const locale = normalizeEmailLocale(input.locale);
  const t = BUYER_COPY[locale] ?? BUYER_COPY.en;
  const dir = locale === "ar" ? ' dir="rtl"' : "";
  const steps = t.steps[productKey(input.productRef)]
    .map((s) => `<li style="margin:0 0 8px;">${esc(s)}</li>`)
    .join("");
  const button = (href: string, label: string, primary: boolean) =>
    `<a href="${esc(href)}" style="display:inline-block;padding:12px 20px;${
      primary ? "background:#c8a96e;color:#0a0a0b;" : "background:#ffffff;color:#0a0a0b;border:1px solid #c8a96e;"
    }text-decoration:none;border-radius:8px;font-weight:600;">${esc(label)}</a>`;
  return {
    subject: t.subject,
    html: emailShell(
      `<div${dir}>
<p>${esc(t.lead)}</p>
<p style="margin:20px 0;">${button(input.magicUrl, t.cta, true)}</p>
<p style="margin:24px 0 8px;font-weight:600;">${esc(t.stepsTitle)}</p>
<ol style="padding-inline-start:20px;margin:0 0 16px;">${steps}</ol>
<p style="margin:16px 0 8px;">${esc(t.expired)}</p>
<p style="margin:0 0 16px;">${button(resendAccessUrl(locale, input.email), t.resendCta, false)}</p>
<p style="margin:16px 0 0;color:#666;font-size:13px;">${esc(t.help)}</p>
</div>`,
    ),
  };
}
