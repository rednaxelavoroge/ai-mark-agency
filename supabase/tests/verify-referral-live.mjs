#!/usr/bin/env node
/**
 * Live referral-engine verification for Phase 4B.
 *
 * Two halves, because they prove different things:
 *
 *   A. DATABASE (always) — the real Supabase project over PostgREST with real
 *      JWTs: the tables exist, RLS bounds every row to its owner, no client can
 *      write attribution data or execute the attribution RPC, and the RPC's
 *      every rejection path behaves as specified.
 *
 *   B. HTTP (needs a running server) — `/go/<code>` validates, records a click,
 *      sets the signed HTTP-only cookie and redirects without leaking an
 *      internal id; `/api/contact` still delivers AND records an attributed
 *      lead; tampered and expired cookies are refused.
 *
 * Usage:
 *   node supabase/tests/verify-referral-live.mjs
 *   BASE=http://localhost:3100 node supabase/tests/verify-referral-live.mjs
 *
 * Needs `.env.local` (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
 * SUPABASE_SECRET_KEY) and, for the HTTP half, a server already listening on
 * BASE. A recorded lead is a successful intake: if the row is written, the
 * route answers 200 even when mail delivery is not configured. It still
 * returns 503 when nothing was stored and delivery failed.
 *
 * Re-runnable: it removes leftover `phase4b-verify-*` users and its own rows
 * first, and cleans up everything it created in a `finally` block. It never
 * touches data it did not create.
 */

import { createHmac } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");

const PREFIX = "phase4b-verify-";
const PASSWORD = `Phase4b-${Math.random().toString(36).slice(2, 12)}!A9`;
const BASE = (process.env.BASE ?? "http://localhost:3100").replace(/\/$/, "");
const SKIP_HTTP = process.env.SKIP_HTTP === "1";

// ---------------------------------------------------------------- reporting

let passes = 0;
let failures = 0;

const green = (s) => `\u001b[32m${s}\u001b[0m`;
const red = (s) => `\u001b[31m${s}\u001b[0m`;
const bold = (s) => `\u001b[1m${s}\u001b[0m`;
const dim = (s) => `\u001b[2m${s}\u001b[0m`;

const pass = (label) => {
  passes += 1;
  console.log(`  ${green("PASS")} ${label}`);
};
const fail = (label, detail) => {
  failures += 1;
  console.log(`  ${red("FAIL")} ${label}`);
  if (detail) console.log(`       ${dim(String(detail).slice(0, 300))}`);
};
const check = (label, ok, detail) => (ok ? pass(label) : fail(label, detail));
const section = (title) => console.log(`\n${bold(title)}`);

// ------------------------------------------------------------------ env load

function loadEnvLocal() {
  const path = join(ROOT, ".env.local");
  if (!existsSync(path)) {
    console.error(
      `${red("Missing .env.local")} at ${path}\n` +
        "Copy .env.example, fill in the Supabase values, then re-run.",
    );
    process.exit(2);
  }

  const env = {};
  for (const rawLine of readFileSync(path, "utf8").split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = /^([A-Za-z0-9_]+)\s*=\s*(.*)$/.exec(line);
    if (!match) continue;
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[match[1]] = value;
  }
  return env;
}

// ------------------------------------------------------------------- helpers

function makeClient(url, key) {
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Exact row count, or an error.
 *
 * Deliberately NOT a HEAD request (`head: true`): against a table that does not
 * exist, supabase-js resolves a HEAD with `error: null` and `count: null`,
 * which would report a missing table as a healthy, empty one. A real GET
 * surfaces the 404/PGRST205 error, which is what the schema check depends on.
 * `limit(1)` keeps the payload tiny.
 */
async function countRows(client, table) {
  const { error, count } = await client
    .from(table)
    .select("id", { count: "exact" })
    .limit(1);
  return { error, count: count ?? null };
}

async function signIn(url, publishableKey, email) {
  const client = makeClient(url, publishableKey);
  const { error } = await client.auth.signInWithPassword({
    email,
    password: PASSWORD,
  });
  if (error) throw new Error(`sign-in failed for ${email}: ${error.message}`);
  return client;
}

/**
 * Mirrors lib/referral/cookie.ts. Duplicated on purpose: this script signs a
 * cookie the way the *server* would, so it can prove the HTTP layer refuses a
 * correctly-signed but expired value. The scheme is part of the test.
 */
function signReferralCookie({ code, issuedAt, clickId }, secret) {
  const body = Buffer.from(
    JSON.stringify({ v: 1, code, issuedAt, clickId: clickId ?? null }),
    "utf8",
  ).toString("base64url");
  const signature = createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${signature}`;
}

const REFERRAL_COOKIE_NAME = "am_ref";

function readSetCookie(response, name) {
  for (const line of response.headers.getSetCookie?.() ?? []) {
    if (line.startsWith(`${name}=`)) return line;
  }
  const single = response.headers.get("set-cookie");
  return single && single.startsWith(`${name}=`) ? single : null;
}

function cookiePair(setCookieLine) {
  return setCookieLine.split(";")[0];
}

function cookieValue(setCookieLine, name = REFERRAL_COOKIE_NAME) {
  return cookiePair(setCookieLine).slice(name.length + 1);
}

async function baseIsUp() {
  try {
    const response = await fetch(`${BASE}/partners`, { redirect: "manual" });
    return response.status > 0;
  } catch {
    return false;
  }
}

async function contactSubmission({ cookie, email, name, scenario = "partner" }) {
  const response = await fetch(`${BASE}/api/contact`, {
    method: "POST",
    redirect: "manual",
    headers: {
      "Content-Type": "application/json",
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: JSON.stringify({
      name,
      email,
      messenger: "@phase4b",
      company: "Phase 4B Verification",
      scenario,
      website: "",
    }),
  });
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  return { status: response.status, payload };
}

// ---------------------------------------------------------------------- main

async function main() {
  const env = loadEnvLocal();

  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const secretKey = env.SUPABASE_SECRET_KEY;
  const cookieSecret =
    env.REFERRAL_COOKIE_SECRET?.trim() || secretKey?.trim() || "";

  const missing = Object.entries({
    NEXT_PUBLIC_SUPABASE_URL: url,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: publishableKey,
    SUPABASE_SECRET_KEY: secretKey,
  })
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    console.error(`${red("Missing in .env.local:")} ${missing.join(", ")}`);
    process.exit(2);
  }

  const admin = makeClient(url, secretKey);
  const anon = makeClient(url, publishableKey);

  const created = [];
  const testEmails = [];
  const reachable = new Set();

  console.log(`${bold("Live Phase 4B referral verification")} ${dim(url)}`);
  console.log(dim(`BASE=${BASE}  (HTTP half ${SKIP_HTTP ? "skipped" : "required"})`));

  try {
    // ---------------------------------------------------------------- schema
    section("1. Phase 4B schema present");

    for (const table of [
      "referral_clicks",
      "leads",
      "partner_profiles",
      "partner_relationships",
    ]) {
      const { error } = await countRows(admin, table);
      if (error) {
        fail(`${table} is reachable`, error.message);
      } else {
        reachable.add(table);
        pass(`${table} is reachable`);
      }
    }

    // Every Phase 4B object is required: a partial apply must not look ready.
    const schemaReady =
      reachable.has("referral_clicks") && reachable.has("leads");

    const { error: rpcError } = await admin.rpc("partner_referral_stats");
    if (rpcError) {
      fail("partner_referral_stats() is callable", rpcError.message);
    } else {
      pass("partner_referral_stats() is callable");
    }

    if (!schemaReady) {
      console.log(
        `\n${red("The Phase 4B schema is not applied to this project.")}\n` +
          "Paste supabase/.generated/phase4b-all.sql into the Supabase SQL editor\n" +
          "(Database -> SQL editor -> Run) or apply\n" +
          "supabase/migrations/20260922090600_phase4b_referral_schema.sql and\n" +
          "supabase/migrations/20260922090700_phase4b_referral_rls.sql in order,\n" +
          "then re-run this script. See supabase/README.md section 10.",
      );
      return;
    }

    // -------------------------------------------------- pre-clean leftovers
    const { data: existingUsers } = await admin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    const leftovers = (existingUsers?.users ?? []).filter((user) =>
      user.email?.startsWith(PREFIX),
    );
    for (const user of leftovers) await admin.auth.admin.deleteUser(user.id);
    if (leftovers.length > 0) {
      console.log(dim(`removed ${leftovers.length} leftover test user(s)`));
    }
    await admin.from("leads").delete().like("email", `${PREFIX}%`);

    // ------------------------------------------------------------ identities
    section("2. Test identities");

    async function createPartner(suffix) {
      const email = `${PREFIX}${suffix}@example.com`;
      const { data, error } = await admin.auth.admin.createUser({
        email,
        password: PASSWORD,
        email_confirm: true,
        user_metadata: { full_name: `Phase 4B ${suffix}` },
      });
      if (error || !data?.user) throw new Error(`createUser(${suffix}): ${error?.message}`);
      created.push(data.user.id);

      const { data: partner, error: partnerError } = await admin
        .from("partner_profiles")
        .select("partner_id, referral_code, user_id, status")
        .eq("user_id", data.user.id)
        .maybeSingle();
      if (partnerError || !partner) {
        throw new Error(`partner_profiles(${suffix}): ${partnerError?.message}`);
      }
      return { ...partner, email };
    }

    const sponsor = await createPartner("sponsor");
    const downline = await createPartner("downline");
    const staleTarget = await createPartner("stale");
    const metaTarget = await createPartner("metadata");

    check("sponsor partner record provisioned", /^AM-[0-9]{6}$/.test(sponsor.partner_id), sponsor.partner_id);
    check("downline partner record provisioned", /^AM-[0-9]{6}$/.test(downline.partner_id), downline.partner_id);

    // ------------------------------------------------- attribution rejected
    section("3. A client cannot perform attribution");

    const partnerClient = await signIn(url, publishableKey, sponsor.email);

    const clickInsert = await partnerClient.from("referral_clicks").insert({
      partner_id: sponsor.partner_id,
      referral_code: sponsor.referral_code,
      landing_path: "/forged",
    });
    check(
      "a partner cannot insert a referral click over PostgREST",
      Boolean(clickInsert.error),
      "the insert unexpectedly succeeded",
    );

    const leadInsert = await partnerClient.from("leads").insert({
      partner_id: sponsor.partner_id,
      referral_code: sponsor.referral_code,
      referral_source: "referral",
      name: "Forged",
      email: "forged@example.com",
      messenger: "@forged",
      company: "Forged",
      scenario: "partner",
    });
    check(
      "a partner cannot insert a lead over PostgREST",
      Boolean(leadInsert.error),
      "the insert unexpectedly succeeded",
    );

    const rpcAsPartner = await partnerClient.rpc("attribute_partner_signup", {
      p_partner_user_id: downline.user_id,
      p_referral_code: sponsor.referral_code,
      p_click_id: null,
    });
    check(
      "a partner cannot execute the attribution RPC",
      Boolean(rpcAsPartner.error),
      "the RPC unexpectedly succeeded",
    );

    const selfSponsor = await partnerClient.from("partner_relationships").insert({
      sponsor_partner_id: sponsor.partner_id,
      partner_id: sponsor.partner_id,
    });
    check(
      "a partner cannot create a sponsor edge",
      Boolean(selfSponsor.error),
      "the insert unexpectedly succeeded",
    );

    const pointerUpdate = await partnerClient
      .from("partner_profiles")
      .update({ sponsor_partner_id: downline.partner_id })
      .eq("partner_id", sponsor.partner_id)
      .select("partner_id");
    check(
      "a partner cannot set their own sponsor pointer",
      (pointerUpdate.data?.length ?? 0) === 0,
      `updated ${pointerUpdate.data?.length ?? 0} rows`,
    );

    const anonClicks = await countRows(anon, "referral_clicks");
    check(
      "anon reaches no referral clicks",
      Boolean(anonClicks.error) || anonClicks.count === 0,
      `saw ${anonClicks.count} rows with no error`,
    );

    // ------------------------------------------------------- the RPC itself
    section("4. Server-side attribution rules");

    // Metadata cannot create a sponsor.
    const { count: metaEdges } = await admin
      .from("partner_relationships")
      .select("*", { count: "exact", head: true })
      .eq("partner_id", metaTarget.partner_id);
    check("signup metadata created no sponsor edge", (metaEdges ?? 0) === 0, `${metaEdges}`);

    const invalid = await admin.rpc("attribute_partner_signup", {
      p_partner_user_id: downline.user_id,
      p_referral_code: "zzzzzzzz",
      p_click_id: null,
    });
    check("an unknown referral code is rejected", invalid.data === "invalid_code", invalid.data);

    const malformed = await admin.rpc("attribute_partner_signup", {
      p_partner_user_id: downline.user_id,
      p_referral_code: "not a code",
      p_click_id: null,
    });
    check("a malformed referral code is rejected", malformed.data === "invalid_code", malformed.data);

    const selfReferral = await admin.rpc("attribute_partner_signup", {
      p_partner_user_id: downline.user_id,
      p_referral_code: downline.referral_code,
      p_click_id: null,
    });
    check("self-referral is rejected", selfReferral.data === "self_referral", selfReferral.data);

    const noTarget = await admin.rpc("attribute_partner_signup", {
      p_partner_user_id: "00000000-0000-0000-0000-000000000000",
      p_referral_code: sponsor.referral_code,
      p_click_id: null,
    });
    check("an unknown target account is refused", noTarget.data === "no_target", noTarget.data);

    const badClick = await admin.rpc("attribute_partner_signup", {
      p_partner_user_id: downline.user_id,
      p_referral_code: sponsor.referral_code,
      p_click_id: "11111111-1111-4111-8111-111111111111",
    });
    check("a foreign click id is rejected", badClick.data === "invalid_click", badClick.data);

    let missingClick = true;
    {
      const { data } = await admin
        .from("referral_clicks")
        .select("id")
        .eq("id", "11111111-1111-4111-8111-111111111111");
      missingClick = (data?.length ?? 0) === 0;
    }
    check("(the foreign click id does not exist at all)", missingClick);

    const attributed = await admin.rpc("attribute_partner_signup", {
      p_partner_user_id: downline.user_id,
      p_referral_code: sponsor.referral_code,
      p_click_id: null,
    });
    check("a valid referral attributes the new partner", attributed.data === "attributed", attributed.data);

    const { data: downlineProfile } = await admin
      .from("partner_profiles")
      .select("sponsor_partner_id")
      .eq("partner_id", downline.partner_id)
      .maybeSingle();
    check(
      "the attributed edge syncs the sponsor pointer",
      downlineProfile?.sponsor_partner_id === sponsor.partner_id,
      downlineProfile?.sponsor_partner_id,
    );

    const { data: edge } = await admin
      .from("partner_relationships")
      .select("attribution_source, attribution_code, confirmed_at")
      .eq("partner_id", downline.partner_id)
      .maybeSingle();
    check(
      "the edge records its provenance",
      edge?.attribution_source === "referral_link" &&
        edge?.attribution_code === sponsor.referral_code,
      JSON.stringify(edge),
    );

    const duplicate = await admin.rpc("attribute_partner_signup", {
      p_partner_user_id: downline.user_id,
      p_referral_code: sponsor.referral_code,
      p_click_id: null,
    });
    check("a duplicate attribution is refused", duplicate.data === "already_attributed", duplicate.data);

    const { count: edgeCount } = await admin
      .from("partner_relationships")
      .select("*", { count: "exact", head: true })
      .eq("partner_id", downline.partner_id);
    check("no second edge was created", (edgeCount ?? 0) === 1, `${edgeCount}`);

    const secondSponsor = await admin.rpc("attribute_partner_signup", {
      p_partner_user_id: downline.user_id,
      p_referral_code: staleTarget.referral_code,
      p_click_id: null,
    });
    check("an attributed partner cannot change sponsor", secondSponsor.data === "already_attributed", secondSponsor.data);

    // An account that already existed can never be attributed.
    await admin
      .from("partner_profiles")
      .update({ created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() })
      .eq("partner_id", staleTarget.partner_id);
    const stale = await admin.rpc("attribute_partner_signup", {
      p_partner_user_id: staleTarget.user_id,
      p_referral_code: sponsor.referral_code,
      p_click_id: null,
    });
    check("an account older than the signup window is refused", stale.data === "stale_target", stale.data);

    // ------------------------------------------------------------ sign-in RLS
    section("5. Partner isolation with a real JWT");

    const ownClicks = await countRows(partnerClient, "referral_clicks");
    check(
      "the sponsor reads only their own clicks",
      !ownClicks.error && ownClicks.count === 0,
      `saw ${ownClicks.count}`,
    );

    const { error: statsError, data: stats } = await partnerClient.rpc("partner_referral_stats");
    check("the partner can read their own counts rollup", !statsError, statsError?.message);
    const statsRow = Array.isArray(stats) ? stats[0] : stats;
    check(
      "the rollup reports the attributed downline",
      Number(statsRow?.partner_signups ?? -1) >= 1,
      JSON.stringify(statsRow),
    );

    const { data: downlineRows } = await partnerClient
      .from("partner_relationships")
      .select("partner_id");
    check(
      "the sponsor still cannot enumerate their downline rows",
      (downlineRows?.length ?? 0) === 0,
      `saw ${downlineRows?.length ?? 0} rows`,
    );

    // ------------------------------------------------------------------ HTTP
    if (!SKIP_HTTP) {
      section("6. HTTP — /go and /api/contact");

      const up = await baseIsUp();
      if (!up) {
        fail(
          `a server is listening on ${BASE}`,
          "start one (npm run dev) or re-run with SKIP_HTTP=1",
        );
      } else {
        const landing =
          `/go/${sponsor.referral_code}` +
          "?utm_source=live-suite&utm_medium=test&utm_campaign=phase4b&to=/products";

        const goResponse = await fetch(`${BASE}${landing}`, { redirect: "manual" });
        const location = goResponse.headers.get("location") ?? "";
        const setCookie = readSetCookie(goResponse, REFERRAL_COOKIE_NAME);

        check("a valid referral redirects (302)", goResponse.status === 302, String(goResponse.status));
        check(
          "it lands on the requested AI Mark page",
          location.endsWith("/products?utm_source=live-suite&utm_medium=test&utm_campaign=phase4b"),
          location,
        );
        check(
          "the URL exposes no internal partner or user id",
          !location.includes(sponsor.partner_id) && !location.includes(sponsor.user_id),
          location,
        );
        check("an attribution cookie is set", Boolean(setCookie), "no am_ref cookie");
        check("the cookie is HttpOnly", /HttpOnly/i.test(setCookie ?? ""), setCookie ?? "");
        check("the cookie is SameSite=Lax", /SameSite=Lax/i.test(setCookie ?? ""), setCookie ?? "");
        check(
          "referral responses are not indexable or cacheable",
          (goResponse.headers.get("x-robots-tag") ?? "").includes("noindex") &&
            (goResponse.headers.get("cache-control") ?? "").includes("no-store"),
          `${goResponse.headers.get("x-robots-tag")} / ${goResponse.headers.get("cache-control")}`,
        );

        const cookie = setCookie ? cookiePair(setCookie) : null;
        const clickValue = setCookie ? cookieValue(setCookie) : "";

        const { data: clicks } = await admin
          .from("referral_clicks")
          .select("id, partner_id, referral_code, landing_path, utm_source, utm_medium, utm_campaign")
          .eq("referral_code", sponsor.referral_code)
          .order("created_at", { ascending: false });

        const click = clicks?.[0];
        check("the click is recorded", Boolean(click), "no referral_clicks row");
        check("the click names the sponsor", click?.partner_id === sponsor.partner_id, click?.partner_id);
        check("the landing path is stored without the query string", click?.landing_path === "/products", click?.landing_path);
        check(
          "UTM source/medium/campaign are preserved",
          click?.utm_source === "live-suite" &&
            click?.utm_medium === "test" &&
            click?.utm_campaign === "phase4b",
          JSON.stringify(click),
        );

        const clicksAfterFirst = clicks?.length ?? 0;

        // A reload carrying the same cookie is the same click.
        const reloaded = await fetch(`${BASE}/go/${sponsor.referral_code}`, {
          redirect: "manual",
          headers: cookie ? { Cookie: cookie } : {},
        });
        check("a reload still redirects", reloaded.status === 302, String(reloaded.status));
        const { count: afterReload } = await admin
          .from("referral_clicks")
          .select("*", { count: "exact", head: true })
          .eq("referral_code", sponsor.referral_code);
        check(
          "a reload does not inflate the click count",
          (afterReload ?? 0) === clicksAfterFirst,
          `${clicksAfterFirst} -> ${afterReload}`,
        );

        // An unknown code redirects but records nothing.
        const before404 = (await admin
          .from("referral_clicks")
          .select("*", { count: "exact", head: true })).count ?? 0;
        const badGo = await fetch(`${BASE}/go/zzzzzzzz`, { redirect: "manual" });
        const badLocation = badGo.headers.get("location") ?? "";
        const badCookie = readSetCookie(badGo, REFERRAL_COOKIE_NAME);
        const after404 = (await admin
          .from("referral_clicks")
          .select("*", { count: "exact", head: true })).count ?? 0;

        check("an invalid code still redirects (no error page)", badGo.status === 302, String(badGo.status));
        check("an invalid code lands on the default page", badLocation.endsWith("/partners"), badLocation);
        check("an invalid code sets no attribution cookie", badCookie === null, badCookie ?? "cookie set");
        check("an invalid code records no click", after404 === before404, `${before404} -> ${after404}`);

        // ---- contact form + referral attribution
        const leadEmail = `${PREFIX}lead@example.com`;
        testEmails.push(leadEmail);
        const submitted = await contactSubmission({
          cookie,
          email: leadEmail,
          name: "Phase 4B Lead",
        });
        const leadRecorded = submitted.status === 200 || submitted.status === 503;
        check(
          "the contact form still answers (delivery contract unchanged)",
          leadRecorded,
          `status=${submitted.status} body=${JSON.stringify(submitted.payload)}`,
        );

        const { data: lead } = await admin
          .from("leads")
          .select("partner_id, referral_code, referral_source, referral_click_id, scenario, email")
          .eq("email", leadEmail)
          .maybeSingle();

        check("the submission is recorded as a lead", Boolean(lead), "no leads row");
        check("the lead is attributed to the sponsor", lead?.partner_id === sponsor.partner_id, lead?.partner_id);
        check("the lead records the referral code", lead?.referral_code === sponsor.referral_code, lead?.referral_code);
        check("the lead is marked as a referral", lead?.referral_source === "referral", lead?.referral_source);
        check("the lead keeps the existing contact fields", lead?.scenario === "partner", lead?.scenario);
        if (click?.id) {
          check("the lead points at the click it came from", lead?.referral_click_id === click.id, lead?.referral_click_id);
        }

        // ---- direct lead
        const directEmail = `${PREFIX}direct@example.com`;
        testEmails.push(directEmail);
        await contactSubmission({ cookie: null, email: directEmail, name: "Phase 4B Direct" });
        const { data: directLead } = await admin
          .from("leads")
          .select("partner_id, referral_source")
          .eq("email", directEmail)
          .maybeSingle();
        check(
          "a visitor without a referral cookie creates a direct lead",
          directLead?.referral_source === "direct" && directLead?.partner_id === null,
          JSON.stringify(directLead),
        );

        // ---- tampered cookie: the payload kept, the signature attacker-chosen
        const [cookieBody, cookieSignature] = clickValue.split(".");
        const tamperedValue = `${cookieBody}.${"A".repeat((cookieSignature ?? "").length || 43)}`;

        const tamperedEmail = `${PREFIX}tampered@example.com`;
        testEmails.push(tamperedEmail);
        await contactSubmission({
          cookie: `${REFERRAL_COOKIE_NAME}=${tamperedValue}`,
          email: tamperedEmail,
          name: "Phase 4B Tampered",
        });
        const { data: tamperedLead } = await admin
          .from("leads")
          .select("partner_id, referral_source")
          .eq("email", tamperedEmail)
          .maybeSingle();
        check(
          "a tampered cookie is not attributed",
          tamperedLead?.referral_source === "direct",
          JSON.stringify(tamperedLead),
        );

        // ---- correctly signed but expired cookie
        const expiredValue = signReferralCookie(
          {
            code: sponsor.referral_code,
            issuedAt: Date.now() - 31 * 24 * 60 * 60 * 1000,
            clickId: click?.id ?? null,
          },
          cookieSecret,
        );
        const expiredEmail = `${PREFIX}expired@example.com`;
        testEmails.push(expiredEmail);
        await contactSubmission({
          cookie: `${REFERRAL_COOKIE_NAME}=${expiredValue}`,
          email: expiredEmail,
          name: "Phase 4B Expired",
        });
        const { data: expiredLead } = await admin
          .from("leads")
          .select("partner_id, referral_source")
          .eq("email", expiredEmail)
          .maybeSingle();
        check(
          "a correctly-signed but expired cookie is refused (30-day window)",
          expiredLead?.referral_source === "direct",
          JSON.stringify(expiredLead),
        );

        // ---- the public site still works
        for (const path of ["/", "/ru", "/partners", "/ru/partners", "/products", "/investors"]) {
          const response = await fetch(`${BASE}${path}`, { redirect: "manual" });
          check(`the public site still answers ${path}`, response.status === 200, String(response.status));
        }
      }
    }
  } finally {
    section("Cleanup");

    await admin.from("leads").delete().like("email", `${PREFIX}%`);

    // Reverse creation order: a downline partner is deleted before its sponsor,
    // because partner_profiles.sponsor_partner_id is ON DELETE RESTRICT.
    for (const id of [...created].reverse()) {
      const { error } = await admin.auth.admin.deleteUser(id);
      if (error) fail(`delete test user ${id}`, error.message);
      else pass(`deleted test user ${id}`);
    }

    const { data: leftoverProfiles } = await admin
      .from("profiles")
      .select("email")
      .like("email", `${PREFIX}%`);
    check(
      "no test profiles were left behind",
      (leftoverProfiles?.length ?? 0) === 0,
      `${leftoverProfiles?.length ?? 0} rows`,
    );

    console.log(
      `\n${bold(`${passes} passed, ${failures} failed`)} ` +
        (failures > 0
          ? red("— live referral verification FAILED")
          : green("— live referral verification passed")),
    );
  }
}

main()
  .then(() => process.exit(failures > 0 ? 1 : 0))
  .catch((error) => {
    console.error(`\n${red("Live verification crashed:")} ${error?.message ?? error}`);
    process.exit(1);
  });
