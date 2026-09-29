import { emailShell } from "./send";
import { normalizeEmailLocale } from "./locale";
import { LEVEL_RATE_LABELS, PARTNER_POOL_CAP_LABEL } from "@/lib/partner/commission-model";
import { LOCK_HOLD_DAYS } from "@/lib/partner/format";
import { PARTNER_PAYOUT_MIN_USD } from "@/lib/partner/payout";
import { site } from "@/lib/site";

type Strings = {
  welcomeSubject: string;
  welcomeBody: string;
  referralSubject: string;
  referralBody: (code: string) => string;
  commissionSubject: string;
  commissionBody: (amount: string, currency: string, level: number) => string;
  payoutRequestedSubject: string;
  payoutRequestedBody: (amount: string, currency: string) => string;
  payoutPaidSubject: string;
  payoutPaidBody: (amount: string, currency: string) => string;
  payoutCancelledSubject: string;
  payoutCancelledBody: (amount: string, currency: string) => string;
};

const EN: Strings = {
  welcomeSubject: "Welcome to the AI MARK Partner Platform",
  welcomeBody: `Your partner account is live. Commission on qualifying sales follows the published schedule (L1 ${LEVEL_RATE_LABELS[1]} through L5 ${LEVEL_RATE_LABELS[5]}, ${PARTNER_POOL_CAP_LABEL} partner pool). Entries are held ${LOCK_HOLD_DAYS} days before they are payable. Minimum payout request is $${PARTNER_PAYOUT_MIN_USD} USDC.`,
  referralSubject: "A new partner joined your network",
  referralBody: (code) =>
    `A new partner registered with your referral link (code <strong>${code}</strong>). You may earn commission when they or their network generate qualifying sales.`,
  commissionSubject: "Commission recorded on a qualifying sale",
  commissionBody: (amount, currency, level) =>
    `A commission of <strong>${currency} ${amount}</strong> was recorded at level L${level} (${LEVEL_RATE_LABELS[level as 1]}). It is held ${LOCK_HOLD_DAYS} days, then becomes payable if the sale stands.`,
  payoutRequestedSubject: "Your payout request was received",
  payoutRequestedBody: (amount, currency) =>
    `We opened a payout request for <strong>${currency} ${amount}</strong>. AI MARK will send USDC to the address on your profile after review.`,
  payoutPaidSubject: "Your payout was marked paid",
  payoutPaidBody: (amount, currency) =>
    `Payout <strong>${currency} ${amount}</strong> is marked paid in the ledger. Check your wallet for the on-chain transfer.`,
  payoutCancelledSubject: "Your payout request was cancelled",
  payoutCancelledBody: (amount, currency) =>
    `The open payout for <strong>${currency} ${amount}</strong> was cancelled. Commission entries return to payable status.`,
};

const RU: Strings = {
  welcomeSubject: "Добро пожаловать в партнёрскую платформу AI MARK",
  welcomeBody: `Аккаунт партнёра активен. Комиссия по квалифицированным продажам: L1 ${LEVEL_RATE_LABELS[1]} … L5 ${LEVEL_RATE_LABELS[5]} (пул партнёров ${PARTNER_POOL_CAP_LABEL}). Удержание ${LOCK_HOLD_DAYS} дней, затем сумма доступна к выплате. Минимальный запрос выплаты — $${PARTNER_PAYOUT_MIN_USD} USDC.`,
  referralSubject: "В сеть зарегистрировался новый партнёр",
  referralBody: (code) =>
    `Новый партнёр зарегистрировался по вашей ссылке (код <strong>${code}</strong>). Комиссия начисляется при квалифицированных продажах в сети.`,
  commissionSubject: "Начислена комиссия по продаже",
  commissionBody: (amount, currency, level) =>
    `Начислено <strong>${currency} ${amount}</strong> на уровне L${level} (${LEVEL_RATE_LABELS[level as 1]}). Удержание ${LOCK_HOLD_DAYS} дней, затем статус «к выплате», если продажа не отменена.`,
  payoutRequestedSubject: "Запрос выплаты принят",
  payoutRequestedBody: (amount, currency) =>
    `Открыт запрос на <strong>${currency} ${amount}</strong>. USDC будет отправлен на адрес из профиля после проверки.`,
  payoutPaidSubject: "Выплата отмечена как выполненная",
  payoutPaidBody: (amount, currency) =>
    `Выплата <strong>${currency} ${amount}</strong> отмечена в реестре. Проверьте поступление в кошельке.`,
  payoutCancelledSubject: "Запрос выплаты отменён",
  payoutCancelledBody: (amount, currency) =>
    `Открытая выплата <strong>${currency} ${amount}</strong> отменена. Комиссии снова доступны к выплате.`,
};

const PACK: Record<string, Strings> = { en: EN, ru: RU };

function strings(locale: string): Strings {
  const l = normalizeEmailLocale(locale);
  return PACK[l] ?? EN;
}

function dashboardLink(): string {
  return `${site.url}/partner/dashboard`;
}

export async function sendPartnerWelcomeEmail(input: {
  to: string;
  locale: string;
  partnerId: string;
  referralCode: string;
}): Promise<void> {
  const s = strings(input.locale);
  const { sendEmail } = await import("./send");
  await sendEmail({
    to: input.to,
    subject: s.welcomeSubject,
    html: emailShell(
      `<p>${s.welcomeBody}</p>
<p>Partner ID: <strong>${input.partnerId}</strong><br/>Referral code: <strong>${input.referralCode}</strong></p>
<p><a href="${dashboardLink()}" style="color:#c8a96e;">Open dashboard</a></p>`,
    ),
  });
}

export async function sendPartnerReferralEmail(input: {
  to: string;
  locale: string;
  sponsorCode: string;
}): Promise<void> {
  const s = strings(input.locale);
  const { sendEmail } = await import("./send");
  await sendEmail({
    to: input.to,
    subject: s.referralSubject,
    html: emailShell(`<p>${s.referralBody(input.sponsorCode)}</p>`),
  });
}

export async function sendPartnerCommissionEmail(input: {
  to: string;
  locale: string;
  amount: string;
  currency: string;
  level: number;
}): Promise<void> {
  const s = strings(input.locale);
  const { sendEmail } = await import("./send");
  await sendEmail({
    to: input.to,
    subject: s.commissionSubject,
    html: emailShell(
      `<p>${s.commissionBody(input.amount, input.currency, input.level)}</p>
<p><a href="${site.url}/partner/commissions" style="color:#c8a96e;">View commissions</a></p>`,
    ),
  });
}

export async function sendPartnerPayoutEmail(
  kind: "requested" | "paid" | "cancelled",
  input: { to: string; locale: string; amount: string; currency: string },
): Promise<void> {
  const s = strings(input.locale);
  const { sendEmail } = await import("./send");
  const map = {
    requested: [s.payoutRequestedSubject, s.payoutRequestedBody(input.amount, input.currency)],
    paid: [s.payoutPaidSubject, s.payoutPaidBody(input.amount, input.currency)],
    cancelled: [
      s.payoutCancelledSubject,
      s.payoutCancelledBody(input.amount, input.currency),
    ],
  } as const;
  const [subject, body] = map[kind];
  await sendEmail({
    to: input.to,
    subject,
    html: emailShell(`<p>${body}</p>`),
  });
}
