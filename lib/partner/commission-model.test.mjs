/**
 * Partner commission schedules — offline invariants.
 *
 *   node --test lib/partner/commission-model.test.mjs
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

import {
  EXAMPLE_BREAKDOWN,
  EXAMPLE_RENEWAL_BREAKDOWN,
  EXAMPLE_SALE_MINOR,
  EXAMPLE_USD,
  EXAMPLE_RENEWAL_USD,
  LEVEL_RATE_BPS_LAUNCH_INITIAL,
  PARTNER_POOL_CAP_BPS,
  allocatePartnerPool,
  commissionMinor,
  formatMinorUnits,
  parseMinorUnits,
  resolveSchedulePhase,
} from "./commission-model.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

test("$1,000 launch initial L1 is $500", () => {
  assert.equal(formatMinorUnits(commissionMinor(EXAMPLE_SALE_MINOR, LEVEL_RATE_BPS_LAUNCH_INITIAL[1])), "500.00");
  assert.equal(EXAMPLE_USD.l1, "500.00");
});

test("full five-level $1,000 launch initial network is $800 pool", () => {
  assert.equal(formatMinorUnits(EXAMPLE_BREAKDOWN.partnerPoolMinor), "800.00");
  assert.equal(EXAMPLE_USD.pool, "800.00");
});

test("month 4+ renewal on $1,000 is L1 $200 + L2 $50", () => {
  assert.equal(formatMinorUnits(EXAMPLE_RENEWAL_BREAKDOWN.partnerPoolMinor), "250.00");
  assert.equal(EXAMPLE_RENEWAL_USD.l1, "200.00");
  assert.equal(EXAMPLE_RENEWAL_USD.l2, "50.00");
});

test("resolveSchedulePhase: month index and 2027 cutoff", () => {
  assert.equal(
    resolveSchedulePhase(new Date("2026-11-01T00:00:00Z"), 1),
    "launch_initial",
  );
  assert.equal(
    resolveSchedulePhase(new Date("2026-11-01T00:00:00Z"), 4),
    "renewal",
  );
  assert.equal(
    resolveSchedulePhase(new Date("2027-02-01T00:00:00Z"), 2),
    "standard_initial",
  );
  assert.equal(
    resolveSchedulePhase(new Date("2027-02-01T00:00:00Z"), 5),
    "renewal",
  );
});

test("standard initial pool on $1,000 is $500", () => {
  const pool = allocatePartnerPool(parseMinorUnits("1000.00"), "standard_initial");
  assert.equal(formatMinorUnits(pool.partnerPoolMinor), "500.00");
  const cap = commissionMinor(parseMinorUnits("1000.00"), PARTNER_POOL_CAP_BPS.standard_initial);
  assert.ok(pool.partnerPoolMinor <= cap);
});

test("integer minor-unit math rejects bad input", () => {
  assert.throws(() => parseMinorUnits("1000.001"));
});

const ACTIVE_COPY = [
  "content/partner-program.ts",
  "lib/chat-context.ts",
  "lib/partner/commission-model.ts",
  "components/platform/CommissionScheduleCard.tsx",
  "app/[locale]/partners/page.tsx",
  "content/partners/en.ts",
  "content/partners/ru.ts",
];

const FORBIDDEN_ACTIVE = [
  /90 days/,
  /90 дней/,
  /1\.5× launch/,
  /L1 15%, L2 5%, L3 3%/,
];

test("active copy has no 90-day partner launch or v1 rates", () => {
  for (const rel of ACTIVE_COPY) {
    const text = readFileSync(join(root, rel), "utf8");
    for (const pattern of FORBIDDEN_ACTIVE) {
      assert.doesNotMatch(text, pattern, `${rel} still has ${pattern}`);
    }
  }
});

test("EN partner page mentions launch bonus and renewal grid", () => {
  const enPage = readFileSync(join(root, "content/partners/en.ts"), "utf8");
  assert.match(enPage, /31\.12\.2026|31 Dec 2026/);
  assert.match(enPage, /20%/);
  assert.match(enPage, /renewal/i);
});
