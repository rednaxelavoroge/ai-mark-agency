/**
 * Locale key parity across public copy bundles.
 *
 *   node --test lib/i18n/locale-parity.test.mjs
 */
import assert from "node:assert/strict";
import { test } from "node:test";

import { copyEn } from "../../content/locales/en.ts";
import { copyRu } from "../../content/locales/ru.ts";
import { copyEs } from "../../content/locales/es.ts";
import { copyPt } from "../../content/locales/pt.ts";
import { copyAr } from "../../content/locales/ar.ts";
import { copyZh } from "../../content/locales/zh.ts";
import { copyId } from "../../content/locales/id.ts";
import { copyVi } from "../../content/locales/vi.ts";
import { copyDe } from "../../content/locales/de.ts";
import { copyFr } from "../../content/locales/fr.ts";
import { copyJa } from "../../content/locales/ja.ts";
import { copyTr } from "../../content/locales/tr.ts";
import { cabinetEn } from "../../content/cabinet/en.ts";
import { cabinetRu } from "../../content/cabinet/locales/ru.ts";
import { cabinetDe } from "../../content/cabinet/locales/de.ts";
import { cabinetEs } from "../../content/cabinet/locales/es.ts";
import { cabinetPt } from "../../content/cabinet/locales/pt.ts";
import { cabinetAr } from "../../content/cabinet/locales/ar.ts";
import { cabinetZh } from "../../content/cabinet/locales/zh.ts";
import { cabinetId } from "../../content/cabinet/locales/id.ts";
import { cabinetVi } from "../../content/cabinet/locales/vi.ts";
import { cabinetFr } from "../../content/cabinet/locales/fr.ts";
import { cabinetJa } from "../../content/cabinet/locales/ja.ts";
import { cabinetTr } from "../../content/cabinet/locales/tr.ts";
import { ideaToBusinessCopy } from "../../content/sections/idea-to-business.ts";
import { operatingModelCopy } from "../../content/sections/operating-model.ts";
import { publicChromeCopy } from "../../content/sections/public-chrome.ts";
import { site } from "../site.ts";

const copy = {
  en: copyEn,
  ru: copyRu,
  es: copyEs,
  pt: copyPt,
  ar: copyAr,
  zh: copyZh,
  id: copyId,
  vi: copyVi,
  de: copyDe,
  fr: copyFr,
  ja: copyJa,
  tr: copyTr,
};

const cabinetCopy = {
  en: cabinetEn,
  ru: cabinetRu,
  de: cabinetDe,
  es: cabinetEs,
  pt: cabinetPt,
  ar: cabinetAr,
  zh: cabinetZh,
  id: cabinetId,
  vi: cabinetVi,
  fr: cabinetFr,
  ja: cabinetJa,
  tr: cabinetTr,
};

function flattenKeys(value, prefix = "") {
  /** @type {string[]} */
  const keys = [];
  if (value === null || typeof value !== "object") {
    keys.push(prefix || "(root)");
    return keys;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      keys.push(...flattenKeys(item, `${prefix}[${index}]`));
    });
    return keys;
  }
  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (child !== null && typeof child === "object") {
      keys.push(...flattenKeys(child, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

function assertLocaleParity(name, bundle) {
  const enKeys = new Set(flattenKeys(bundle.en));
  for (const locale of site.locales) {
    if (locale === "en") continue;
    const localeKeys = new Set(flattenKeys(bundle[locale]));
    for (const key of enKeys) {
      assert.ok(
        localeKeys.has(key),
        `${name}/${locale} missing key ${key} (present in en)`,
      );
    }
    for (const key of localeKeys) {
      assert.ok(
        enKeys.has(key),
        `${name}/${locale} extra key ${key} (not in en)`,
      );
    }
  }
}

test("content/copy locales share the same flattened keys as en", () => {
  assertLocaleParity("copy", copy);
});

test("cabinet copy locales share the same flattened keys as en", () => {
  assertLocaleParity("cabinet", cabinetCopy);
});

test("idea-to-business locales share the same flattened keys as en", () => {
  assertLocaleParity("idea-to-business", ideaToBusinessCopy);
});

test("operating-model locales share the same flattened keys as en", () => {
  assertLocaleParity("operating-model", operatingModelCopy);
});

test("public-chrome locales share the same flattened keys as en", () => {
  assertLocaleParity("public-chrome", publicChromeCopy);
});
