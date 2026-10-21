/**
 * Public header/footer brand lockup guards.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

import { BRAND_FOOTER_LINE } from "./brand.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

test("header uses full raster lockup with baked descriptor (no HTML tagline)", () => {
  const header = read("components/Header.tsx");
  const logo = read("components/BrandLogo.tsx");
  assert.match(header, /BrandLogo crop="full"/);
  assert.doesNotMatch(header, /BrandLockup/);
  assert.match(logo, /ai-mark-logo-light\.png/);
  assert.match(logo, /1844.*327|w: 1844, h: 327/);
  assert.doesNotMatch(header, /BRAND_LOCKUP_DESCRIPTOR|brand-lockup__line/);
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
