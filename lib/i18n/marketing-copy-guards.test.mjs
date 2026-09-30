/**
 * Guards against known bad machine translations in public chrome copy.
 */
import assert from "node:assert/strict";
import { test } from "node:test";

import { publicChromeCopy } from "../../content/sections/public-chrome.ts";

const RETAINER_TAG_PATH = (loc) => publicChromeCopy[loc].homeRest.retainerTag;

test("ar keeps Venture and Marketing tagline in English under the logo", () => {
  assert.equal(
    publicChromeCopy.ar.footer.ventureTagline,
    publicChromeCopy.en.footer.ventureTagline,
  );
});

test("ar venture hub card and pay labels are localized", () => {
  const hub = publicChromeCopy.ar.homePage.hubModules.find((m) => m.num === "05");
  assert.ok(hub);
  assert.notEqual(hub.tag, "Venture Capital");
  assert.ok(!hub.desc.startsWith("Growth capital"));
  assert.ok(publicChromeCopy.ar.footer.showroomAi.includes("وكيل"));
  assert.ok(publicChromeCopy.ar.footer.payCrypto.includes("USDT"));
  assert.notEqual(publicChromeCopy.ar.footer.payCrypto, publicChromeCopy.en.footer.payCrypto);
});

test("de retainer label uses Retainer, not Vorbehalt", () => {
  const tag = RETAINER_TAG_PATH("de");
  assert.match(tag, /Retainer/i);
  assert.doesNotMatch(tag, /Vorbehalt/i);
});

test("no locale uses false retainer translations (loanword Retainer)", () => {
  const forbidden = [
    /Vorbehalt/i,
    /التجنيب/,
    /Người lưu giữ/,
    /^保留/,
    /^Tutucu /,
    /^Mandat /,
  ];
  for (const loc of Object.keys(publicChromeCopy)) {
    if (loc === "en") continue;
    const tag = RETAINER_TAG_PATH(loc);
    for (const pattern of forbidden) {
      assert.doesNotMatch(
        tag,
        pattern,
        `${loc} retainerTag must not match ${pattern}`,
      );
    }
  }
});

test("non-en locales do not leave venture hub desc in English", () => {
  const enDesc = publicChromeCopy.en.homePage.hubModules.find(
    (m) => m.num === "05",
  )?.desc;
  for (const loc of Object.keys(publicChromeCopy)) {
    if (loc === "en") continue;
    const hub = publicChromeCopy[loc].homePage.hubModules.find(
      (m) => m.num === "05",
    );
    assert.ok(hub);
    assert.notEqual(
      hub.desc,
      enDesc,
      `${loc} hub venture desc should be translated`,
    );
  }
});
