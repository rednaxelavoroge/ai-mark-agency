/**
 * Locale negotiation for the public site.
 *
 *   node --test lib/locale-negotiate.test.mjs
 *
 * Covers the proxy decision without booting Next: Accept-Language, an explicit
 * selector cookie, a stale `locale=fr` cookie, prefixed URLs, and the single
 * redirect away from `/`.
 */

import assert from "node:assert/strict";
import { test } from "node:test";

import {
  EXPLICIT_LOCALE_SOURCE,
  LOCALE_COOKIE,
  LOCALE_SOURCE_COOKIE,
  decidePublicLocale,
  explicitLocaleCookieAssignments,
  matchAcceptLanguage,
} from "./locale-negotiate.ts";
import { site } from "./site.ts";

const locales = site.locales;
const fallback = "ru";

function decide(overrides) {
  return decidePublicLocale({
    pathname: "/",
    acceptLanguage: null,
    localeCookie: null,
    localeSource: null,
    locales,
    defaultLocale: site.defaultLocale,
    fallbackLocale: fallback,
    ...overrides,
  });
}

test("root + ru-RU redirects once to /ru", () => {
  const decision = decide({
    acceptLanguage: "ru-RU,ru;q=0.9,en;q=0.8",
  });
  assert.deepEqual(decision, {
    action: "redirect",
    locale: "ru",
    pathname: "/ru",
    clearStaleLocaleCookie: false,
  });
  const landed = decide({
    pathname: decision.pathname,
    acceptLanguage: "ru-RU,ru;q=0.9,en;q=0.8",
  });
  assert.equal(landed.action, "next");
  assert.equal(landed.locale, "ru");
});

test("root + en-US is served by the /en route without a redirect", () => {
  const decision = decide({ acceptLanguage: "en-US,en;q=0.9" });
  assert.equal(decision.action, "rewrite");
  assert.equal(decision.locale, "en");
  assert.equal(decision.pathname, "/en");
  const prefixed = decide({
    pathname: "/en",
    acceptLanguage: "fr-FR,fr;q=0.9",
  });
  assert.equal(prefixed.action, "next");
  assert.equal(prefixed.locale, "en");
});

test("root + fr-FR redirects to /fr", () => {
  const decision = decide({
    acceptLanguage: "fr-FR,fr;q=0.9,en;q=0.8",
  });
  assert.equal(decision.action, "redirect");
  assert.equal(decision.pathname, "/fr");
});

test("supported de-DE redirects to /de", () => {
  const decision = decide({
    acceptLanguage: "de-DE,de;q=0.9,en;q=0.8",
  });
  assert.equal(decision.pathname, "/de");
});

test("unsupported preferred language falls back to /ru, not to a lower-q en", () => {
  assert.equal(
    matchAcceptLanguage(
      "de-DE,de;q=0.9,en;q=0.8",
      locales.filter((locale) => locale !== "de"),
      "ru",
      "en",
    ),
    "ru",
  );
  const decision = decide({
    acceptLanguage: "pl-PL,pl;q=0.9,en;q=0.8",
  });
  assert.equal(decision.action, "redirect");
  assert.equal(decision.pathname, "/ru");
});

test("missing Accept-Language stays on the default English route", () => {
  const decision = decide({ acceptLanguage: null });
  assert.equal(decision.action, "rewrite");
  assert.equal(decision.pathname, "/en");
  assert.equal(matchAcceptLanguage("*", locales, "ru", "en"), "en");
});

test("explicit /en/... is unchanged by the browser locale", () => {
  const decision = decide({
    pathname: "/en/showroom-ai",
    acceptLanguage: "ru-RU,ru;q=0.9,fr;q=0.8",
    localeCookie: "fr",
    localeSource: EXPLICIT_LOCALE_SOURCE,
  });
  assert.equal(decision.action, "next");
  assert.equal(decision.locale, "en");
});

test("explicit /ru/... is unchanged by the browser locale", () => {
  const decision = decide({
    pathname: "/ru/showroom-ai",
    acceptLanguage: "en-US,en;q=0.9",
    localeCookie: "fr",
    localeSource: EXPLICIT_LOCALE_SOURCE,
  });
  assert.equal(decision.action, "next");
  assert.equal(decision.locale, "ru");
});

test("manual language selection persists and beats the browser", () => {
  const assignments = explicitLocaleCookieAssignments("fr");
  assert.equal(assignments.length, 2);
  assert.match(assignments[0], new RegExp(`^${LOCALE_COOKIE}=fr;`));
  assert.match(
    assignments[1],
    new RegExp(`^${LOCALE_SOURCE_COOKIE}=${EXPLICIT_LOCALE_SOURCE};`),
  );

  const again = decide({
    acceptLanguage: "ru-RU,ru;q=0.9,en;q=0.8",
    localeCookie: "fr",
    localeSource: EXPLICIT_LOCALE_SOURCE,
  });
  assert.equal(again.action, "redirect");
  assert.equal(again.pathname, "/fr");
  assert.equal(again.clearStaleLocaleCookie, false);

  const russian = decide({
    acceptLanguage: "fr-FR,fr;q=0.9",
    localeCookie: "ru",
    localeSource: EXPLICIT_LOCALE_SOURCE,
  });
  assert.equal(russian.pathname, "/ru");
});

test("stale locale=fr without an explicit source does not force French", () => {
  const decision = decide({
    acceptLanguage: "ru-RU,ru;q=0.9,en;q=0.8",
    localeCookie: "fr",
    localeSource: null,
  });
  assert.equal(decision.pathname, "/ru");
  assert.equal(decision.clearStaleLocaleCookie, true);
});

test("prefixed routes do not redirect again", () => {
  for (const locale of locales) {
    const home = decide({
      pathname: `/${locale}`,
      acceptLanguage: "ru-RU,ru;q=0.9",
    });
    assert.equal(home.action, "next", locale);
    assert.equal(home.locale, locale);
    const nested = decide({
      pathname: `/${locale}/showroom-ai`,
      acceptLanguage: "en-US,en;q=0.9",
    });
    assert.equal(nested.action, "next");
    assert.equal(nested.locale, locale);
  }
});

test("a path that merely shares letters with a locale is not that locale", () => {
  const decision = decide({
    pathname: "/friends",
    acceptLanguage: "en-US,en;q=0.9",
  });
  assert.equal(decision.action, "rewrite");
  assert.equal(decision.pathname, "/en/friends");
});

test("redirect keeps the rest of an unprefixed path and does not loop", () => {
  const decision = decide({
    pathname: "/showroom-ai",
    acceptLanguage: "ru-RU,ru;q=0.9",
  });
  assert.equal(decision.pathname, "/ru/showroom-ai");
  const landed = decide({
    pathname: decision.pathname,
    acceptLanguage: "en-US,en;q=0.9",
  });
  assert.equal(landed.action, "next");
  assert.equal(landed.locale, "ru");
  assert.notEqual(decision.pathname, "/");
});

test("quality order picks the higher-q language", () => {
  assert.equal(
    matchAcceptLanguage("en;q=0.8,fr;q=0.9", locales, "ru", "en"),
    "fr",
  );
  assert.equal(
    matchAcceptLanguage("zh-CN,zh;q=0.9,en;q=0.8", locales, "ru", "en"),
    "zh",
  );
});
