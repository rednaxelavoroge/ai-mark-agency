/**
 * Public brand lockup guards — full raster only, no HTML taglines.
 */
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const LOGO_SURFACES = [
  "components/Header.tsx",
  "components/Footer.tsx",
  "components/auth/AuthCard.tsx",
  "components/platform/PlatformShell.tsx",
];

test("BrandLogo serves only the full 1844×327 lockup PNGs", () => {
  const logo = read("components/BrandLogo.tsx");
  assert.match(logo, /ai-mark-logo-light\.png/);
  assert.match(logo, /ai-mark-logo-dark\.png/);
  assert.doesNotMatch(logo, /compact/);
  assert.match(logo, /height=\{327\}/);
  assert.throws(() => read("components/BrandLockup.tsx"), /ENOENT/);
});

test("no compact logo, BrandLockup, or HTML venture tagline on logo surfaces", () => {
  for (const rel of LOGO_SURFACES) {
    const src = read(rel);
    assert.doesNotMatch(src, /BrandLockup|brand-lockup|crop="compact"|ventureTagline|BRAND_FOOTER/i);
    assert.match(src, /BrandLogo/);
  }
});

test("footer pricing link; pay page has no card-soon copy", () => {
  const footer = read("components/Footer.tsx");
  assert.match(footer, /navHref\(locale, "\/pricing"\)/);
  assert.doesNotMatch(footer, /payCrypto|cardsSoon/i);
  const pay = read("app/[locale]/pay/page.tsx");
  assert.doesNotMatch(pay, /cardOption|coming soon|cardsSoon/i);
});

test("auth routes do not pass ventureTagline to AuthCard", () => {
  for (const rel of [
    "app/auth/login/page.tsx",
    "app/auth/signup/page.tsx",
    "app/partner/no-access/page.tsx",
  ]) {
    assert.doesNotMatch(read(rel), /ventureTagline/);
  }
});
