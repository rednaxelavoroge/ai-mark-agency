/**
 * Phase 4B — referral attribution unit tests (offline, no database).
 *
 *   node --test supabase/tests/referral.test.mjs
 *
 * These cover the pure half of the engine: code validation, landing-path
 * safety, UTM handling and the signed attribution cookie (including the 30-day
 * expiry). The database half — attribution RPC, RLS, self-referral and
 * duplicate rejection — is covered by run-rls-tests.sh, and the end-to-end
 * HTTP behaviour by verify-referral-live.mjs.
 *
 * The two modules under test are deliberately dependency-free and are imported
 * here by their real `.ts` paths (Node strips the types natively), so the tests
 * exercise the exact code the application runs — not a re-implementation.
 */

import assert from "node:assert/strict";
import { test } from "node:test";

import {
  ATTRIBUTION_WINDOW_DAYS,
  ATTRIBUTION_WINDOW_MS,
  CLOCK_SKEW_MS,
  REFERRAL_COOKIE_NAME,
  referralCookieOptions,
  signReferralCookie,
  verifyReferralCookie,
} from "../../lib/referral/cookie.ts";

import {
  CLICK_DEDUPE_MS,
  DEFAULT_LANDING_PATH,
  REFERRAL_CODE_RE,
  SITE_ORIGIN,
  buildReferralUrl,
  collectUtm,
  isReferralCode,
  landingPathOnly,
  normalizeReferralCode,
  resolveLandingPath,
  sanitizeUtm,
} from "../../lib/referral/rules.ts";

const SECRET = "test-secret-do-not-use-anywhere-else";
const NOW = Date.UTC(2026, 8, 22, 12, 0, 0);

function payload(overrides = {}) {
  return {
    v: 1,
    code: "abcd2345",
    issuedAt: NOW,
    clickId: "3f1a6f6e-0000-4000-8000-000000000000",
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// 1. Valid referral codes
// ---------------------------------------------------------------------------
test("valid referral: a well-formed code is accepted and normalised", () => {
  assert.equal(isReferralCode("abcd2345"), true);
  assert.equal(normalizeReferralCode("abcd2345"), "abcd2345");

  // 8 characters from the unambiguous alphabet used by the DB generator.
  assert.match("abcd2345", REFERRAL_CODE_RE);
  assert.equal(normalizeReferralCode("ABCD2345"), "abcd2345", "case is normalised");
  assert.equal(normalizeReferralCode("  abcd2345  "), "abcd2345", "whitespace is trimmed");

  // The schema allows 4–32 characters and `-`/`_` after the first character.
  assert.equal(normalizeReferralCode("ab-9"), "ab-9");
  assert.equal(normalizeReferralCode("a".repeat(32)), "a".repeat(32));
});

test("valid referral: the public URL only ever contains the code", () => {
  const url = buildReferralUrl("abcd2345");
  assert.equal(url, `${SITE_ORIGIN}/go/abcd2345`);

  const parsed = new URL(url);
  assert.equal(parsed.pathname, "/go/abcd2345");
  assert.equal(parsed.search, "", "no query string is added to a referral link");

  // A referral link must never leak an internal identifier.
  assert.doesNotMatch(url, /AM-\d+/, "partner_id must not appear in the URL");
  assert.doesNotMatch(url, /user_id|partner_id|token|session/i);
});

// ---------------------------------------------------------------------------
// 2. Invalid referral codes
// ---------------------------------------------------------------------------
test("invalid referral: malformed codes are refused, never repaired", () => {
  const invalid = [
    "",
    " ",
    "abc", // too short
    "a".repeat(33), // too long
    "go",
    "-abcd",
    "ab cd",
    "abcd.2345",
    "abcd/2345",
    "abcd?x=1",
    "<script>",
    "абвгд",
    null,
    undefined,
    42,
    {},
  ];

  for (const value of invalid) {
    assert.equal(isReferralCode(value), false, `should reject ${JSON.stringify(value)}`);
    assert.equal(normalizeReferralCode(value), null, `should not normalise ${JSON.stringify(value)}`);
  }
});

test("invalid referral: a reserved word passes the shape check but can never resolve", () => {
  // `admin` is a well-formed 5-character code, so this module — which only
  // checks the SHAPE — accepts it. Two server-side gates reject it: the
  // `partner_profiles_referral_code_reserved` CHECK constraint means no partner
  // can hold it, and /go/[code] only issues attribution after a database
  // lookup finds a real partner. That layering is deliberate: a word list
  // drifts, a lookup does not.
  assert.equal(isReferralCode("admin"), true);
  assert.equal(normalizeReferralCode("admin"), "admin");
});

test("invalid referral: an unknown landing target falls back to the Partner Network page", () => {
  const hostile = [
    "https://evil.example/phish",
    "//evil.example",
    "/\\evil.example",
    "javascript:alert(1)",
    "data:text/html,<script>",
    "/go/abcd2345", // a referral loop
    "/api/contact",
    "/auth/login",
    "/partner/dashboard",
    "/admin",
    "/_next/static/chunk.js",
    `/${"a".repeat(400)}`,
    "relative/path",
    "",
    null,
    123,
  ];

  for (const value of hostile) {
    assert.equal(
      resolveLandingPath(value),
      DEFAULT_LANDING_PATH,
      `should fall back for ${JSON.stringify(value)}`,
    );
  }
});

test("invalid referral: only internal paths are kept, and they stay on-origin", () => {
  assert.equal(resolveLandingPath("/products"), "/products");
  assert.equal(resolveLandingPath("/ru/partners"), "/ru/partners");
  // A partner link may point at a specific offer, so the target's own query
  // survives; the hash is never forwarded.
  assert.equal(
    resolveLandingPath("/products/aime?x=1"),
    "/products/aime?x=1",
    "the target's query is kept",
  );
  assert.equal(resolveLandingPath("/privacy#top"), "/privacy", "hash is dropped");
  assert.equal(resolveLandingPath(undefined), DEFAULT_LANDING_PATH);

  // Even an encoded protocol-relative value resolves to our own origin.
  const resolved = resolveLandingPath("/%2F%2Fevil.example");
  assert.ok(resolved.startsWith("/"), resolved);
  const destination = new URL(resolved, SITE_ORIGIN);
  assert.equal(destination.origin, SITE_ORIGIN);
});

// ---------------------------------------------------------------------------
// UTM handling
// ---------------------------------------------------------------------------
test("UTM: the three stored parameters are kept, sanitised and forwarded", () => {
  const params = new URLSearchParams({
    utm_source: "newsletter",
    utm_medium: "email",
    utm_campaign: "phase-4b",
    utm_term: "referral",
    utm_content: "header-link",
    utm_evil: "ignored",
    to: "/products",
  });

  const utm = collectUtm(params);
  assert.deepEqual(utm, {
    utm_source: "newsletter",
    utm_medium: "email",
    utm_campaign: "phase-4b",
    utm_term: "referral",
    utm_content: "header-link",
  });

  const landing = resolveLandingPath(params.get("to"), utm);
  assert.equal(
    landing,
    "/products?utm_source=newsletter&utm_medium=email&utm_campaign=phase-4b&utm_term=referral&utm_content=header-link",
  );
  assert.equal(landingPathOnly(landing), "/products", "only the path is stored on the click");
});

test("landing: a partner link can point at a specific offer", () => {
  // The buy call-to-action deep link a partner shares: the product choice must
  // survive the redirect, otherwise the buyer lands on the default product.
  assert.equal(
    resolveLandingPath("/en/pay?sku=aime-pro"),
    "/en/pay?sku=aime-pro",
  );

  // UTMs still ride along, and the destination's own parameter is not rewritten.
  assert.equal(
    resolveLandingPath("/en/pay?sku=showroom-business", {
      utm_source: "telegram",
      utm_campaign: "launch",
    }),
    "/en/pay?sku=showroom-business&utm_source=telegram&utm_campaign=launch",
  );

  // A hostile target is still discarded entirely, query included.
  assert.equal(
    resolveLandingPath("//evil.example/pay?sku=aime-pro"),
    DEFAULT_LANDING_PATH,
  );
  assert.equal(
    resolveLandingPath("/admin?sku=aime-pro"),
    DEFAULT_LANDING_PATH,
  );
});

test("UTM: control characters are stripped and values are bounded", () => {
  assert.equal(sanitizeUtm("news\u0000letter\u001f"), "newsletter");
  assert.equal(sanitizeUtm("   "), null);
  assert.equal(sanitizeUtm(undefined), null);
  assert.equal(sanitizeUtm(7), null);
  assert.equal(sanitizeUtm("x".repeat(500))?.length, 200);
});

// ---------------------------------------------------------------------------
// 3. The referral cookie
// ---------------------------------------------------------------------------
test("referral cookie: a signed cookie verifies and round-trips its payload", () => {
  const value = signReferralCookie(payload(), SECRET);
  assert.equal(typeof value, "string");

  const verified = verifyReferralCookie(value, { secret: SECRET, now: NOW });
  assert.deepEqual(verified, payload());

  // Nothing personal or internal is in the cookie — only the public code.
  const decoded = JSON.parse(
    Buffer.from(value.split(".")[0], "base64url").toString("utf8"),
  );
  assert.deepEqual(Object.keys(decoded).sort(), ["clickId", "code", "issuedAt", "v"]);
  assert.equal(decoded.code, "abcd2345");
});

test("referral cookie: attributes are HTTP-only, same-site and scoped to the site", () => {
  const options = referralCookieOptions(undefined, true);

  assert.equal(REFERRAL_COOKIE_NAME, "am_ref");
  assert.equal(options.httpOnly, true, "scripts must never read the attribution cookie");
  assert.equal(options.sameSite, "lax", "the cookie must survive the referral navigation");
  assert.equal(options.secure, true, "production cookies are HTTPS-only");
  assert.equal(options.path, "/");
  assert.equal(options.maxAge, ATTRIBUTION_WINDOW_DAYS * 24 * 60 * 60);

  // Local development over plain HTTP must still be able to store it.
  assert.equal(referralCookieOptions(undefined, false).secure, false);
});

test("referral cookie: tampering with the payload or signature is refused", () => {
  const value = signReferralCookie(payload(), SECRET);
  const [body, signature] = value.split(".");

  // 1. Signature swapped for another valid-looking one.
  assert.equal(verifyReferralCookie(`${body}.${"A".repeat(signature.length)}`, { secret: SECRET, now: NOW }), null);

  // 2. Payload replaced with an attacker-chosen code (signature kept).
  const forgedBody = Buffer.from(JSON.stringify({ ...payload(), code: "evil2345" }), "utf8").toString("base64url");
  assert.equal(verifyReferralCookie(`${forgedBody}.${signature}`, { secret: SECRET, now: NOW }), null);

  // 3. Issued-at pushed into the future to defeat expiry.
  const extended = Buffer.from(JSON.stringify({ ...payload(), issuedAt: NOW + 10 * ATTRIBUTION_WINDOW_MS }), "utf8").toString("base64url");
  assert.equal(verifyReferralCookie(`${extended}.${signature}`, { secret: SECRET, now: NOW }), null);

  // 4. Signed with a different key.
  const otherSecret = signReferralCookie(payload(), "another-secret");
  assert.equal(verifyReferralCookie(otherSecret, { secret: SECRET, now: NOW }), null);

  // 5. Structural garbage.
  for (const bad of [undefined, null, "", "abc", `${body}.`, ".abc", `${body}.${signature}.extra`, "a".repeat(600)]) {
    assert.equal(verifyReferralCookie(bad, { secret: SECRET, now: NOW }), null, `should reject ${String(bad).slice(0, 20)}`);
  }

  // 6. No secret configured at all: nothing verifies and nothing is signed.
  assert.equal(signReferralCookie(payload(), ""), null);
  assert.equal(verifyReferralCookie(value, { secret: "" }), null);
});

// ---------------------------------------------------------------------------
// 4. Attribution expiry
// ---------------------------------------------------------------------------
test("attribution expiry: the window is 30 days", () => {
  assert.equal(ATTRIBUTION_WINDOW_DAYS, 30);
  assert.equal(ATTRIBUTION_WINDOW_MS, 30 * 24 * 60 * 60 * 1000);
  assert.equal(CLICK_DEDUPE_MS, 30 * 60 * 1000);
});

test("attribution expiry: valid inside the window, refused after it", () => {
  const value = signReferralCookie(payload(), SECRET);

  const oneMinuteLater = NOW + 60 * 1000;
  const twentyNineDaysLater = NOW + ATTRIBUTION_WINDOW_MS - 60 * 1000;
  const exactlyThirtyDays = NOW + ATTRIBUTION_WINDOW_MS;
  const thirtyDaysAndOneSecond = NOW + ATTRIBUTION_WINDOW_MS + 1000;

  assert.ok(verifyReferralCookie(value, { secret: SECRET, now: oneMinuteLater }));
  assert.ok(verifyReferralCookie(value, { secret: SECRET, now: twentyNineDaysLater }));
  assert.ok(verifyReferralCookie(value, { secret: SECRET, now: exactlyThirtyDays }), "the boundary itself is still inside");
  assert.equal(verifyReferralCookie(value, { secret: SECRET, now: thirtyDaysAndOneSecond }), null);
  assert.equal(verifyReferralCookie(value, { secret: SECRET, now: NOW + 10 * ATTRIBUTION_WINDOW_MS }), null);
});

test("attribution expiry: a far-future timestamp is treated as forged", () => {
  const value = signReferralCookie(payload(), SECRET);

  // Slight clock skew is tolerated...
  assert.ok(verifyReferralCookie(value, { secret: SECRET, now: NOW - CLOCK_SKEW_MS }));
  // ...but a value issued well into the future is not.
  assert.equal(verifyReferralCookie(value, { secret: SECRET, now: NOW - CLOCK_SKEW_MS - 1000 }), null);
});
