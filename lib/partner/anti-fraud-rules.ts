export type AntiFraudFlag =
  | "self_payment"
  | "shared_wallet_or_email"
  | "high_velocity_registrations"
  | "payment_reversed_or_cancelled";

export const ANTI_FRAUD_FLAG_DESCRIPTIONS: Record<
  AntiFraudFlag,
  { ru: string; en: string }
> = {
  self_payment: {
    ru: "Партнёр оплатил сам себе (совпадение email, кошелька или user_id)",
    en: "Self-payment detected (matching email, wallet or user_id)",
  },
  shared_wallet_or_email: {
    ru: "Один кошелёк или email у нескольких партнёров",
    en: "Shared wallet or email across multiple partners",
  },
  high_velocity_registrations: {
    ru: "Больше 5 регистраций по одной ссылке за час с одного IP/устройства",
    en: "More than 5 registrations per hour on link from same IP/device",
  },
  payment_reversed_or_cancelled: {
    ru: "Возврат или отмена оплаты",
    en: "Payment refunded or cancelled",
  },
};

export type AntiFraudEvaluationInput = {
  buyerEmail?: string | null;
  buyerWallet?: string | null;
  buyerUserId?: string | null;
  beneficiaryPartnerId: string;
  beneficiaryUserId?: string | null;
  beneficiaryEmail?: string | null;
  beneficiaryWallet?: string | null;
  /** Referral code used for this sale */
  referralCode?: string | null;
  /** Sale status ('recorded' | 'confirmed' | 'locked' | 'refunded' | 'chargeback' | 'cancelled') */
  saleStatus?: string | null;
  /** Invoice status */
  invoiceStatus?: string | null;
  /** Known shared partners count for this wallet/email */
  partnersWithSameWalletCount?: number;
  partnersWithSameEmailCount?: number;
  /** Max registrations per hour from same IP/device on this referral code */
  registrationsPerHourSameIp?: number;
};

export type AntiFraudEvaluationResult = {
  underReview: boolean;
  flags: AntiFraudFlag[];
  details: Record<string, unknown>;
};

/**
 * Pure rule-based anti-fraud evaluator (no AI, 100% deterministic).
 */
export function evaluateAntiFraudRules(
  input: AntiFraudEvaluationInput,
): AntiFraudEvaluationResult {
  const flags: AntiFraudFlag[] = [];
  const details: Record<string, unknown> = {};

  const clean = (val: string | null | undefined) =>
    (val ?? "").trim().toLowerCase();

  const buyerEmail = clean(input.buyerEmail);
  const buyerWallet = clean(input.buyerWallet);
  const buyerUserId = clean(input.buyerUserId);

  const benEmail = clean(input.beneficiaryEmail);
  const benWallet = clean(input.beneficiaryWallet);
  const benUserId = clean(input.beneficiaryUserId);

  // Rule 1: Self-payment in chain
  const emailMatch = Boolean(buyerEmail && benEmail && buyerEmail === benEmail);
  const walletMatch = Boolean(buyerWallet && benWallet && buyerWallet === benWallet);
  const userMatch = Boolean(buyerUserId && benUserId && buyerUserId === benUserId);

  if (emailMatch || walletMatch || userMatch) {
    flags.push("self_payment");
    details.self_payment = {
      emailMatch,
      walletMatch,
      userMatch,
      buyerEmail: input.buyerEmail,
      beneficiaryEmail: input.beneficiaryEmail,
    };
  }

  // Rule 2: Shared wallet or email across multiple partners
  const sharedWallet = (input.partnersWithSameWalletCount ?? 1) > 1;
  const sharedEmail = (input.partnersWithSameEmailCount ?? 1) > 1;
  if (sharedWallet || sharedEmail) {
    flags.push("shared_wallet_or_email");
    details.shared_wallet_or_email = {
      sharedWallet,
      sharedEmail,
      walletCount: input.partnersWithSameWalletCount,
      emailCount: input.partnersWithSameEmailCount,
    };
  }

  // Rule 3: More than 5 registrations per hour on link from same IP/device
  if ((input.registrationsPerHourSameIp ?? 0) > 5) {
    flags.push("high_velocity_registrations");
    details.high_velocity_registrations = {
      count: input.registrationsPerHourSameIp,
      threshold: 5,
    };
  }

  // Rule 4: Payment refunded, chargeback, or cancelled
  const saleStatus = clean(input.saleStatus);
  const invoiceStatus = clean(input.invoiceStatus);
  const isReversed =
    saleStatus === "refunded" ||
    saleStatus === "chargeback" ||
    saleStatus === "cancelled" ||
    invoiceStatus === "cancelled";

  if (isReversed) {
    flags.push("payment_reversed_or_cancelled");
    details.payment_reversed_or_cancelled = {
      saleStatus: input.saleStatus,
      invoiceStatus: input.invoiceStatus,
    };
  }

  return {
    underReview: flags.length > 0,
    flags,
    details,
  };
}
