import { emailShell } from "./send";
import { normalizeEmailLocale } from "./locale";

const COPY: Record<
  string,
  { subject: string; lead: string; steps: string[]; cta: string }
> = {
  en: {
    subject: "Your product access is ready",
    lead: "Payment confirmed. Use the secure link below to open your workspace.",
    steps: [
      "Open the link — it is single-use and expires soon.",
      "Complete your profile in the product.",
      "Need help? Contact hello@ai-mark.agency from the same email you paid with.",
    ],
    cta: "Open my workspace",
  },
  ru: {
    subject: "Доступ к продукту готов",
    lead: "Оплата подтверждена. Перейдите по защищённой ссылке, чтобы открыть рабочую область.",
    steps: [
      "Откройте ссылку — она одноразовая и скоро истекает.",
      "Заполните профиль в продукте.",
      "Нужна помощь? Напишите на hello@ai-mark.agency с того же email, с которого оплачивали.",
    ],
    cta: "Открыть рабочую область",
  },
};

function pick(locale: string) {
  const l = normalizeEmailLocale(locale);
  return COPY[l] ?? COPY.en;
}

export function buyerOnboardingEmail(input: {
  locale: string;
  productRef: string;
  magicUrl: string;
}): { subject: string; html: string } {
  const t = pick(input.locale);
  const steps = t.steps.map((s) => `<li style="margin:0 0 8px;">${s}</li>`).join("");
  return {
    subject: t.subject,
    html: emailShell(
      `<p>${t.lead}</p>
<p style="margin:20px 0;"><a href="${input.magicUrl}" style="display:inline-block;padding:12px 20px;background:#c8a96e;color:#0a0a0b;text-decoration:none;border-radius:8px;font-weight:600;">${t.cta}</a></p>
<ol style="padding-left:20px;margin:16px 0 0;">${steps}</ol>`,
    ),
  };
}
