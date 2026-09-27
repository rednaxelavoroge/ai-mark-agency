/**
 * Partner Commission Model v2 — offline invariants.
 *
 *   node --test lib/partner/commission-model.test.mjs
 *
 * Formula, $1,000 example, pool cap, launch-multiplier ban, and a scan of
 * active marketing copy. Ledger refund/chargeback/payout tests live in
 * supabase/tests/run-phase4c-tests.sh.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

import {
  AI_MARK_RETAINED_SHARE_BPS,
  AI_MARK_RETAINED_SHARE_LABEL,
  COMMISSION_LEVELS,
  EXAMPLE_BREAKDOWN,
  EXAMPLE_SALE_MINOR,
  EXAMPLE_USD,
  LAUNCH_RATE_MULTIPLIER,
  LEVEL_RATE_BPS,
  LEVEL_RATE_LABELS,
  PARTNER_POOL_CAP_BPS,
  PARTNER_POOL_CAP_LABEL,
  V2_ACTIVE_RULES_SQL,
  allocatePartnerPool,
  commissionMinor,
  formatMinorUnits,
  formatRatePercent,
  parseMinorUnits,
} from "./commission-model.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

test("$1,000 L1 is $500 at 50%", () => {
  const l1 = commissionMinor(EXAMPLE_SALE_MINOR, LEVEL_RATE_BPS[1]);
  assert.equal(formatMinorUnits(l1), "500.00");
  assert.equal(EXAMPLE_USD.l1, "500.00");
});

test("full five-level $1,000 network is Partner Pool $800", () => {
  assert.equal(formatMinorUnits(EXAMPLE_BREAKDOWN.levels[0].amountMinor), "500.00");
  assert.equal(formatMinorUnits(EXAMPLE_BREAKDOWN.levels[1].amountMinor), "150.00");
  assert.equal(formatMinorUnits(EXAMPLE_BREAKDOWN.levels[2].amountMinor), "70.00");
  assert.equal(formatMinorUnits(EXAMPLE_BREAKDOWN.levels[3].amountMinor), "50.00");
  assert.equal(formatMinorUnits(EXAMPLE_BREAKDOWN.levels[4].amountMinor), "30.00");
  assert.equal(formatMinorUnits(EXAMPLE_BREAKDOWN.partnerPoolMinor), "800.00");
  assert.equal(EXAMPLE_USD.pool, "800.00");
});

test("AI Mark retained share on $1,000 is $200", () => {
  assert.equal(formatMinorUnits(EXAMPLE_BREAKDOWN.retainedMinor), "200.00");
  assert.equal(EXAMPLE_USD.retained, "200.00");
  assert.equal(
    EXAMPLE_BREAKDOWN.partnerPoolMinor + EXAMPLE_BREAKDOWN.retainedMinor,
    EXAMPLE_SALE_MINOR,
  );
  assert.equal(AI_MARK_RETAINED_SHARE_BPS, 2000);
  assert.equal(AI_MARK_RETAINED_SHARE_LABEL, "20%");
});

test("level rates sum to the 80% partner pool cap and never exceed it", () => {
  const sum = COMMISSION_LEVELS.reduce((acc, level) => acc + LEVEL_RATE_BPS[level], 0);
  assert.equal(sum, PARTNER_POOL_CAP_BPS);
  assert.equal(PARTNER_POOL_CAP_LABEL, "80%");
  const pool = allocatePartnerPool(parseMinorUnits("1000.00"));
  const cap = commissionMinor(parseMinorUnits("1000.00"), PARTNER_POOL_CAP_BPS);
  assert.ok(pool.partnerPoolMinor <= cap);
});

test("launch is not a commission multiplier and cannot raise the pool above 80%", () => {
  assert.equal(LAUNCH_RATE_MULTIPLIER, 1);
  const boosted = COMMISSION_LEVELS.reduce(
    (acc, level) => acc + commissionMinor(EXAMPLE_SALE_MINOR, LEVEL_RATE_BPS[level] * 1.5),
    0n,
  );
  assert.ok(
    boosted > commissionMinor(EXAMPLE_SALE_MINOR, PARTNER_POOL_CAP_BPS),
    "1.5× on v2 rates would break the 80% ceiling — that path must stay disabled",
  );
  const actual = allocatePartnerPool(EXAMPLE_SALE_MINOR).partnerPoolMinor;
  assert.equal(actual, 80_000n);
});

test("integer minor-unit math matches the $1,000 contract without floats", () => {
  assert.equal(parseMinorUnits("1000.00"), 100_000n);
  assert.equal(parseMinorUnits("1000"), 100_000n);
  assert.equal(formatMinorUnits(100_000n), "1000.00");
  assert.throws(() => parseMinorUnits("1000.001"));
  assert.throws(() => parseMinorUnits(String(0.1 + 0.2)));
  // PostgreSQL round(333.33 * 0.07, 2) = 23.33
  assert.equal(formatMinorUnits(commissionMinor(parseMinorUnits("333.33"), 700)), "23.33");
});

test("published rate labels are L1 50 / L2 15 / L3 7 / L4 5 / L5 3", () => {
  assert.equal(LEVEL_RATE_LABELS[1], "50%");
  assert.equal(LEVEL_RATE_LABELS[2], "15%");
  assert.equal(LEVEL_RATE_LABELS[3], "7%");
  assert.equal(LEVEL_RATE_LABELS[4], "5%");
  assert.equal(LEVEL_RATE_LABELS[5], "3%");
  assert.equal(formatRatePercent(5000), "50%");
  assert.equal(V2_ACTIVE_RULES_SQL.startsWith("1:0.500000:1.000000"), true);
});

const ACTIVE_COPY = [
  "content/partner-program.ts",
  "lib/chat-context.ts",
  "lib/partner/commission-model.ts",
  "components/platform/PartnerDashboardView.tsx",
  "components/platform/CommissionScheduleCard.tsx",
  "app/[locale]/partners/page.tsx",
];

const FORBIDDEN_ACTIVE = [
  /L1 15%/,
  /L2 5%, L3 3%, L4 2%/,
  /Together that is 26%/,
  /Вместе это 26%/,
  /1\.5× launch/,
  /launch boost: 22\.5%/,
  /множителем 1,5: 22,5%/,
  /Pool 39%/,
  /80% × 1\.5/,
  /0\.15 \/ 0\.05 \/ 0\.03 \/ 0\.02 \/ 0\.01/,
];

test("active marketing and dashboard copy has no old 15/5/3/2/1 or 1.5× rates", () => {
  for (const rel of ACTIVE_COPY) {
    const text = readFileSync(join(root, rel), "utf8");
    for (const pattern of FORBIDDEN_ACTIVE) {
      assert.doesNotMatch(text, pattern, `${rel} still has ${pattern}`);
    }
  }
});

test("EN and RU partner terms publish v2 rates, 80% pool, and the $1,000 aggregate example", () => {
  const terms = readFileSync(join(root, "content/partner-program.ts"), "utf8");
  const page = readFileSync(join(root, "app/[locale]/partners/page.tsx"), "utf8");
  assert.match(terms, /L1 50%/);
  assert.match(terms, /L2 15%/);
  assert.match(terms, /L3 7%/);
  assert.match(terms, /L4 5%/);
  assert.match(terms, /L5 3%/);
  assert.match(terms, /80% aggregate partner pool/);
  assert.doesNotMatch(terms, /Together that is 26%/);
  assert.match(terms, /The direct \(L1\) partner receives \$500, not \$800/);
  assert.match(terms, /Прямой партнёр \(L1\) получает \$500, не \$800/);
  assert.doesNotMatch(terms, /1\.5× launch/);
  assert.doesNotMatch(terms, /множителем 1,5/);
  assert.match(page, /Up to 80% total partner rewards across the network/);
  assert.match(page, /До 80% партнёрского вознаграждения/);
  assert.match(page, /L1 50% за прямую продажу/);
  assert.match(page, /rate: "50%"/);
  assert.match(page, /rate: "15%"/);
  assert.match(page, /rate: "7%"/);
});

test("one L1 partner is never described as receiving the whole 80% pool", () => {
  const terms = readFileSync(join(root, "content/partner-program.ts"), "utf8");
  assert.match(terms, /not a payout to one partner/);
  assert.match(terms, /а не выплата одному партнёру/);
});
