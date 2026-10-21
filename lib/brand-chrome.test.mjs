/**
 * Public header/footer brand lockup guards.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

import { BRAND_FOOTER_LINE, BRAND_LOCKUP_DESCRIPTOR } from "./brand.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

test("header uses the approved lockup descriptor in English", () => {
  const header = read("components/Header.tsx");
  assert.match(header, /BrandLockup/);
  assert.doesNotMatch(header, /Showroom AI/);
  assert.equal(BRAND_LOCKUP_DESCRIPTOR, "AI-NATIVE VENTURE & MARKETING");
});

test("footer brand line and pricing link; no card-soon payment block", () => {
  const footer = read("components/Footer.tsx");
  assert.match(footer, /BrandLockup variant="footer" line="footer"/);
  assert.match(footer, /navHref\(locale, "\/pricing"\)/);
  assert.doesNotMatch(footer, /payCrypto|cardsSoon|\/pay/);
  assert.equal(BRAND_FOOTER_LINE, "AI MARK — Venture & Marketing");
});

test("pay page does not advertise bank cards as coming soon", () => {
  const pay = read("app/[locale]/pay/page.tsx");
  assert.doesNotMatch(pay, /cardOption|coming soon|cardsSoon/i);
  assert.match(pay, /USDT \/ USDC/);
});
