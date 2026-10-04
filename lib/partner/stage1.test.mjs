import test from "node:test";
import assert from "node:assert/strict";

import {
  getLaunchBonusTimer,
  formatLaunchBonusTimerText,
} from "./launch-timer.ts";
import { LAUNCH_BONUS_END_DATE } from "./commission-model.ts";
import {
  evaluateAntiFraudRules,
  ANTI_FRAUD_FLAG_DESCRIPTIONS,
} from "./anti-fraud-rules.ts";

test("Launch bonus timer: date sourced from commission-model", () => {
  assert.equal(
    LAUNCH_BONUS_END_DATE,
    "2026-12-31",
    "Single source of truth for launch bonus date must be 2026-12-31",
  );
});

test("Launch bonus timer: active before 31.12.2026 and counts days correctly", () => {
  // Test on current date (Oct 2026)
  const nowOct = new Date("2026-10-04T12:00:00.000Z");
  const timer = getLaunchBonusTimer(nowOct);
  assert.ok(timer !== null, "Timer should be active on 2026-10-04");
  assert.equal(timer.active, true);
  assert.equal(timer.formattedDate, "31.12.2026");
  assert.ok(timer.daysRemaining > 0, "Days remaining should be positive");

  // Format in RU
  const ruText = formatLaunchBonusTimerText(timer, "ru");
  assert.match(ruText, /^Бонус 80% до 31\.12\.2026 — осталось \d+ дн/);

  // Format in EN
  const enText = formatLaunchBonusTimerText(timer, "en");
  assert.match(enText, /^80% bonus until 31\.12\.2026 — \d+ days remaining$/);

  // On 30.12.2026: ~2 days
  const nowDec30 = new Date("2026-12-30T10:00:00.000Z");
  const timerDec30 = getLaunchBonusTimer(nowDec30);
  assert.ok(timerDec30 !== null);
  assert.equal(timerDec30.daysRemaining, 2);

  // On 31.12.2026: 1 day
  const nowDec31 = new Date("2026-12-31T10:00:00.000Z");
  const timerDec31 = getLaunchBonusTimer(nowDec31);
  assert.ok(timerDec31 !== null);
  assert.equal(timerDec31.daysRemaining, 1);
});

test("Launch bonus timer: automatically hides after 31.12.2026", () => {
  // 1 second after 2026-12-31T23:59:59.999Z
  const now2027 = new Date("2027-01-01T00:00:00.000Z");
  const timer2027 = getLaunchBonusTimer(now2027);
  assert.equal(timer2027, null, "Timer must be null (hidden) on 2027-01-01");

  const later2027 = new Date("2027-06-15T12:00:00.000Z");
  assert.equal(getLaunchBonusTimer(later2027), null);
});

test("Anti-fraud Rule 1: detects partner paying themselves (email, wallet, user_id)", () => {
  // 1a. Email match
  const resEmail = evaluateAntiFraudRules({
    buyerEmail: "partner@example.com",
    beneficiaryPartnerId: "AM-001042",
    beneficiaryEmail: "partner@example.com",
  });
  assert.equal(resEmail.underReview, true);
  assert.ok(resEmail.flags.includes("self_payment"));

  // 1b. Wallet match
  const resWallet = evaluateAntiFraudRules({
    buyerWallet: "0x1234567890abcdef1234567890abcdef12345678",
    beneficiaryPartnerId: "AM-001042",
    beneficiaryWallet: "0x1234567890abcdef1234567890abcdef12345678",
  });
  assert.equal(resWallet.underReview, true);
  assert.ok(resWallet.flags.includes("self_payment"));

  // 1c. User ID match
  const resUser = evaluateAntiFraudRules({
    buyerUserId: "user-12345",
    beneficiaryPartnerId: "AM-001042",
    beneficiaryUserId: "user-12345",
  });
  assert.equal(resUser.underReview, true);
  assert.ok(resUser.flags.includes("self_payment"));

  // 1d. Different email/wallet/user -> no self_payment flag
  const resDiff = evaluateAntiFraudRules({
    buyerEmail: "buyer@client.com",
    beneficiaryPartnerId: "AM-001042",
    beneficiaryEmail: "partner@company.com",
    buyerWallet: "0xaaaa",
    beneficiaryWallet: "0xbbbb",
  });
  assert.equal(resDiff.flags.includes("self_payment"), false);
});

test("Anti-fraud Rule 2: detects shared wallet or email across multiple partners", () => {
  // 2a. Shared wallet
  const resSharedWallet = evaluateAntiFraudRules({
    beneficiaryPartnerId: "AM-001042",
    beneficiaryWallet: "0xwallet123",
    partnersWithSameWalletCount: 2,
  });
  assert.equal(resSharedWallet.underReview, true);
  assert.ok(resSharedWallet.flags.includes("shared_wallet_or_email"));

  // 2b. Shared email
  const resSharedEmail = evaluateAntiFraudRules({
    beneficiaryPartnerId: "AM-001042",
    beneficiaryEmail: "shared@domain.com",
    partnersWithSameEmailCount: 3,
  });
  assert.equal(resSharedEmail.underReview, true);
  assert.ok(resSharedEmail.flags.includes("shared_wallet_or_email"));

  // 2c. Unique wallet and email
  const resUnique = evaluateAntiFraudRules({
    beneficiaryPartnerId: "AM-001042",
    beneficiaryWallet: "0xwallet123",
    partnersWithSameWalletCount: 1,
    partnersWithSameEmailCount: 1,
  });
  assert.equal(resUnique.flags.includes("shared_wallet_or_email"), false);
});

test("Anti-fraud Rule 3: detects > 5 registrations per hour on one link from same IP", () => {
  // 3a. Exactly 5 registrations -> pass
  const res5 = evaluateAntiFraudRules({
    beneficiaryPartnerId: "AM-001042",
    registrationsPerHourSameIp: 5,
  });
  assert.equal(res5.flags.includes("high_velocity_registrations"), false);

  // 3b. 6 registrations in an hour -> flagged!
  const res6 = evaluateAntiFraudRules({
    beneficiaryPartnerId: "AM-001042",
    registrationsPerHourSameIp: 6,
  });
  assert.equal(res6.underReview, true);
  assert.ok(res6.flags.includes("high_velocity_registrations"));

  // 3c. 20 registrations (bot burst) -> flagged!
  const res20 = evaluateAntiFraudRules({
    beneficiaryPartnerId: "AM-001042",
    registrationsPerHourSameIp: 20,
  });
  assert.equal(res20.underReview, true);
  assert.ok(res20.flags.includes("high_velocity_registrations"));
});

test("Anti-fraud Rule 4: detects payment refund, chargeback, or cancellation", () => {
  // 4a. Sale refunded
  const resRefund = evaluateAntiFraudRules({
    beneficiaryPartnerId: "AM-001042",
    saleStatus: "refunded",
  });
  assert.equal(resRefund.underReview, true);
  assert.ok(resRefund.flags.includes("payment_reversed_or_cancelled"));

  // 4b. Sale chargeback
  const resChargeback = evaluateAntiFraudRules({
    beneficiaryPartnerId: "AM-001042",
    saleStatus: "chargeback",
  });
  assert.equal(resChargeback.underReview, true);
  assert.ok(resChargeback.flags.includes("payment_reversed_or_cancelled"));

  // 4c. Sale cancelled
  const resCancelled = evaluateAntiFraudRules({
    beneficiaryPartnerId: "AM-001042",
    saleStatus: "cancelled",
  });
  assert.equal(resCancelled.underReview, true);
  assert.ok(resCancelled.flags.includes("payment_reversed_or_cancelled"));

  // 4d. Invoice cancelled
  const resInvCancelled = evaluateAntiFraudRules({
    beneficiaryPartnerId: "AM-001042",
    invoiceStatus: "cancelled",
  });
  assert.equal(resInvCancelled.underReview, true);
  assert.ok(resInvCancelled.flags.includes("payment_reversed_or_cancelled"));

  // 4e. Confirmed sale -> no flag
  const resConfirmed = evaluateAntiFraudRules({
    beneficiaryPartnerId: "AM-001042",
    saleStatus: "confirmed",
    invoiceStatus: "confirmed",
  });
  assert.equal(resConfirmed.flags.includes("payment_reversed_or_cancelled"), false);
});

test("Clean sale passes anti-fraud with no flags and not under review", () => {
  const clean = evaluateAntiFraudRules({
    buyerEmail: "legit-buyer@corporate.com",
    buyerWallet: "0x1111111111111111111111111111111111111111",
    beneficiaryPartnerId: "AM-001042",
    beneficiaryEmail: "partner@agency.com",
    beneficiaryWallet: "0x2222222222222222222222222222222222222222",
    partnersWithSameWalletCount: 1,
    partnersWithSameEmailCount: 1,
    registrationsPerHourSameIp: 1,
    saleStatus: "confirmed",
    invoiceStatus: "confirmed",
  });

  assert.equal(clean.underReview, false);
  assert.equal(clean.flags.length, 0);
});

test("Payout statement excludes flagged (under_review) entries from payout groups", () => {
  // Mock sheet entries: 1 approved entry ($500), 1 under_review entry ($150), 1 rejected ($70)
  const mockEntries = [
    {
      id: "entry-1",
      partnerId: "AM-001001",
      amount: "500.00",
      currency: "USDT",
      status: "payable",
      flags: [],
    },
    {
      id: "entry-2",
      partnerId: "AM-001001",
      amount: "150.00",
      currency: "USDT",
      status: "under_review",
      flags: ["self_payment"],
    },
    {
      id: "entry-3",
      partnerId: "AM-001002",
      amount: "70.00",
      currency: "USDT",
      status: "rejected",
      flags: ["shared_wallet_or_email"],
    },
  ];

  // Logic used in AdminPayoutsPage:
  const underReviewIds = new Set(
    mockEntries
      .filter((r) => r.status === "under_review" || r.status === "rejected")
      .map((r) => r.id),
  );

  const payableGroups = new Map();
  for (const entry of mockEntries) {
    if (underReviewIds.has(entry.id)) {
      // Excluded!
      continue;
    }
    const key = `${entry.partnerId}\0${entry.currency}`;
    const prev = payableGroups.get(key) || { count: 0, total: 0 };
    payableGroups.set(key, {
      count: prev.count + 1,
      total: prev.total + parseFloat(entry.amount),
    });
  }

  // Verify: AM-001001 only has 1 payable entry of $500 (entry-2 was excluded)
  assert.equal(payableGroups.has("AM-001001\0USDT"), true);
  const grp1 = payableGroups.get("AM-001001\0USDT");
  assert.equal(grp1.count, 1);
  assert.equal(grp1.total, 500.0);

  // AM-001002 was rejected -> not present in payable groups
  assert.equal(payableGroups.has("AM-001002\0USDT"), false);
});

test("Notifications: idempotency ensures payment id is processed only once", () => {
  const processedSales = new Set();
  const sentEmails = [];

  function simulateNotificationDispatch(saleId, partnerId, level, amount) {
    const key = `${saleId}:${partnerId}:${level}`;
    if (processedSales.has(key)) {
      return { sent: false, duplicate: true };
    }
    processedSales.add(key);
    sentEmails.push({ saleId, partnerId, level, amount });
    return { sent: true, duplicate: false };
  }

  const saleId = "sale-uuid-9999";

  // First dispatch: 5 levels (L1-L5)
  for (let lvl = 1; lvl <= 5; lvl++) {
    const res = simulateNotificationDispatch(saleId, `AM-00100${lvl}`, lvl, "100.00");
    assert.equal(res.sent, true);
    assert.equal(res.duplicate, false);
  }
  assert.equal(sentEmails.length, 5);

  // Second dispatch with same saleId: all must be skipped (idempotent)
  for (let lvl = 1; lvl <= 5; lvl++) {
    const res = simulateNotificationDispatch(saleId, `AM-00100${lvl}`, lvl, "100.00");
    assert.equal(res.sent, false);
    assert.equal(res.duplicate, true);
  }
  // No new emails sent
  assert.equal(sentEmails.length, 5);
});
