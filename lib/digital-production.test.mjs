import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { getDigitalProductionCopy } from "../content/digital-production.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

describe("Digital Production is a separate service, not the SKU catalog", () => {
  it("exposes a dedicated route helper", () => {
    const src = read("lib/digital-production.ts");
    assert.match(src, /DIGITAL_PRODUCTION_PATH = "\/digital-production"/);
    assert.match(src, /localePath\(locale, DIGITAL_PRODUCTION_PATH\)/);
  });

  it("falls back to English copy for locales other than RU", () => {
    const en = getDigitalProductionCopy("en");
    const fr = getDigitalProductionCopy("fr");
    const ru = getDigitalProductionCopy("ru");
    assert.equal(fr.hero.title, en.hero.title);
    assert.equal(ru.hero.label, "PROJECT / B2B-СЕРВИС");
    assert.equal(en.hero.label, "PROJECT / B2B SERVICE");
    assert.equal(ru.hero.badge, "ИНДИВИДУАЛЬНО");
    assert.equal(en.hero.badge, "Custom");
  });

  it("does not invent prices, ROI, clients or guarantees", () => {
    for (const locale of ["en", "ru"]) {
      const t = getDigitalProductionCopy(locale);
      const blob = JSON.stringify(t);
      assert.doesNotMatch(blob, /\$\d/);
      assert.doesNotMatch(blob, /ROI|ROAS|CAC/i);
      assert.doesNotMatch(blob, /гарантир/i);
      assert.doesNotMatch(blob, /guarantee/i);
      assert.match(blob, locale === "ru" ? /ИНДИВИДУАЛЬНО/ : /Custom/);
      assert.match(blob, /SHOWROOM AI/);
    }
  });

  it("retargets Digital Production CTAs away from /products", () => {
    const partners = read("app/[locale]/partners/page.tsx");
    assert.match(partners, /digitalProductionPath\(locale\)/);
    assert.doesNotMatch(partners, /productsHubPath\(locale\)/);

    const footer = read("components/Footer.tsx");
    assert.match(footer, /DIGITAL_PRODUCTION_PATH/);
    assert.doesNotMatch(footer, /how-it-works#production/);

    const home = read("app/[locale]/page.tsx") + read("components/home/HomeRest.tsx");
    assert.match(home, /\/digital-production/);
  });
});
