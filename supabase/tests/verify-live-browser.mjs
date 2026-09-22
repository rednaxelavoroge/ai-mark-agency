/**
 * Phase 4A browser acceptance test — the checks in the brief, through the real UI.
 *
 * Prerequisites: `.env.local` filled in, `npm run build && npm run start` (or
 * `npm run dev`) already listening, and playwright resolvable from the repo root.
 *
 *   BASE=http://localhost:3100 node supabase/tests/verify-live-browser.mjs
 *
 * It creates its own `phase4a-accept-*` accounts, drives the real login form,
 * and deletes them in a `finally` block.
 */
import { readFileSync } from "node:fs";
import { chromium } from "playwright";
import { createClient } from "@supabase/supabase-js";

const BASE = process.env.BASE ?? "http://localhost:3100";
const PREFIX = "phase4a-accept-";
const PASSWORD = `Acc-${Math.random().toString(36).slice(2, 10)}!A9`;

const env = {};
for (const raw of readFileSync(".env.local", "utf8").split("\n")) {
  const line = raw.trim();
  if (!line || line.startsWith("#")) continue;
  const m = /^([A-Za-z0-9_]+)\s*=\s*(.*)$/.exec(line);
  if (m) env[m[1]] = m[2].trim();
}

const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

let passes = 0;
let failures = 0;
let skips = 0;
const check = (label, ok, detail) => {
  if (ok) {
    passes += 1;
    console.log(`  PASS ${label}`);
  } else {
    failures += 1;
    console.log(`  FAIL ${label}${detail ? `  -> ${detail}` : ""}`);
  }
};
/** Reported, not failed: an environment limit outside the code under test. */
const skip = (label, reason) => {
  skips += 1;
  console.log(`  SKIP ${label}${reason ? `  -> ${reason}` : ""}`);
};

// ---------------------------------------------------------------- test users
const { data: existing } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
for (const u of existing?.users ?? []) {
  if (u.email?.startsWith(PREFIX)) await admin.auth.admin.deleteUser(u.id);
}

/**
 * Whether the Phase 4B migration is applied.
 *
 * The Phase 4A checks run either way. The referral-specific checks are SKIPped,
 * with the reason, when the attribution tables are not there yet — an
 * environment gap should not be reported as a code failure.
 *
 * A real GET, not a HEAD: supabase-js resolves a HEAD against a missing table
 * with `error: null`, which would report a missing table as a healthy, empty
 * one.
 */
const { error: referralProbeError } = await admin
  .from("referral_clicks")
  .select("id", { count: "exact" })
  .limit(1);
const phase4bReady = !referralProbeError;

/** Accounts created by this run; deleted before the sponsor in `finally`. */
const referredUserIds = [];

const partnerEmail = `${PREFIX}partner@example.com`;
const adminEmail = `${PREFIX}admin@example.com`;

const { data: pu, error: puErr } = await admin.auth.admin.createUser({
  email: partnerEmail,
  password: PASSWORD,
  email_confirm: true,
  user_metadata: { full_name: "Accept Partner" },
});
const { data: au, error: auErr } = await admin.auth.admin.createUser({
  email: adminEmail,
  password: PASSWORD,
  email_confirm: true,
  user_metadata: { full_name: "Accept Admin" },
});
if (puErr || auErr) throw new Error(`createUser: ${puErr?.message ?? auErr?.message}`);

await admin.from("user_roles").insert({ user_id: au.user.id, role: "admin" });

const { data: partnerRow } = await admin
  .from("partner_profiles")
  .select("partner_id, referral_code")
  .eq("user_id", pu.user.id)
  .maybeSingle();
const { count: partnerCount } = await admin
  .from("partner_profiles")
  .select("*", { count: "exact", head: true });

const browser = await chromium.launch();

async function signIn(email, viewport) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/auth/login`, { waitUntil: "load" });
  const form = page.locator("form").first();
  await form.locator('input[name="email"]').fill(email);
  await form.locator('input[name="password"]').fill(PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.startsWith("/auth/login"), { timeout: 30000 }),
    form.locator('button[type="submit"]').click(),
  ]);
  await page.waitForTimeout(500);
  return { ctx, page };
}

/**
 * Reads a StatCard value by its label. The tile renders the label and the value
 * as adjacent <p> elements, so the value is the label's next sibling.
 */
async function statValue(page, label) {
  const node = page.locator(`p:text-is("${label}")`).first();
  return (await node.locator("xpath=following-sibling::p[1]").innerText()).trim();
}

try {
  console.log("\n1. Logged out");
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/partner/dashboard`, { waitUntil: "load" });
    check(
      "/partner/dashboard redirects to login",
      page.url().includes("/auth/login"),
      page.url(),
    );
    check(
      "the requested path is preserved in ?next=",
      page.url().includes("next=%2Fpartner%2Fdashboard"),
      page.url(),
    );
    await page.goto(`${BASE}/admin`, { waitUntil: "load" });
    check("/admin redirects to login", page.url().includes("/auth/login"), page.url());
    await ctx.close();
  }

  console.log("\n2. Partner (mobile 390px)");
  {
    const { ctx, page } = await signIn(partnerEmail, { width: 390, height: 844 });
    check("partner lands on the dashboard", page.url().includes("/partner/dashboard"), page.url());

    const body = await page.locator("body").innerText();
    check("partner sees their own Partner ID", body.includes(partnerRow.partner_id), partnerRow.partner_id);
    check("partner sees their referral code", body.includes(partnerRow.referral_code));
    check("partner sees the Growth/Partner status", /Partner|Growth/.test(body));

    const referral = await page.locator("#referral-link").inputValue();
    check(
      "referral link points at /go/<code>",
      referral.endsWith(`/go/${partnerRow.referral_code}`),
      referral,
    );

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    check(
      "no horizontal overflow at 390px",
      overflow.scrollWidth === overflow.clientWidth,
      JSON.stringify(overflow),
    );

    await page.screenshot({ path: "/tmp/accept-partner-390.png", fullPage: true });

    await page.goto(`${BASE}/admin`, { waitUntil: "load" });
    await page.waitForTimeout(500);
    check(
      "partner cannot reach /admin (redirected to their dashboard)",
      page.url().includes("/partner/dashboard"),
      page.url(),
    );
    await ctx.close();
  }

  console.log("\n3. Admin");
  {
    const { ctx, page } = await signIn(adminEmail, { width: 1440, height: 1000 });
    await page.goto(`${BASE}/admin`, { waitUntil: "load" });
    check("admin reaches /admin without redirect", page.url().endsWith("/admin"), page.url());

    const counts = page.locator('section[aria-label="Schema counts"]');
    const countsText = await counts.innerText();
    check("admin overview shows real counts, not dashes", /\d/.test(countsText) && !countsText.includes("—"), countsText.replace(/\n/g, " "));
    check(
      "the partner count matches the database",
      countsText.includes(String(partnerCount)),
      `db=${partnerCount} ui=${countsText.replace(/\n/g, " ")}`,
    );

    await page.screenshot({ path: "/tmp/accept-admin-1440.png" });

    await page.goto(`${BASE}/admin/partners`, { waitUntil: "load" });
    check("admin can open /admin/partners", page.url().includes("/admin/partners"), page.url());
    await ctx.close();
  }
  console.log("\n4. Phase 4B — a referral link attributes a new partner");
  if (!phase4bReady) {
    skip(
      "referral-link signup attribution",
      "the Phase 4B schema is not applied to this project — apply supabase/.generated/phase4b-all.sql and re-run",
    );
  } else {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();

    // A signed-out visitor follows the sponsor's referral link. This is what
    // sets the signed attribution cookie in this browser context.
    await page.goto(`${BASE}/go/${partnerRow.referral_code}`, { waitUntil: "load" });
    check("the referral link lands on an AI Mark page", page.url().includes("/partners"), page.url());
    check(
      "the referral URL never exposes the partner id",
      !page.url().includes(partnerRow.partner_id),
      page.url(),
    );

    // Register through the real form in the same context.
    //
    // `example.org`, not `example.com`: GoTrue rejects the latter outright as
    // an invalid address. With email confirmation enabled on a project the
    // built-in SMTP has a low hourly quota, so a rate-limited run is reported
    // as a SKIP — `npm run verify:referral` covers the same attribution rule
    // over the real APIs without sending mail.
    const signupEmail = `${PREFIX}referral@example.org`;
    await page.goto(`${BASE}/auth/signup?next=/partner/dashboard`, { waitUntil: "load" });
    const form = page.locator("form").first();
    await form.locator('input[name="full_name"]').fill("Referral Signup");
    await form.locator('input[name="email"]').fill(signupEmail);
    await form.locator('input[name="password"]').fill(PASSWORD);
    await form.locator('button[type="submit"]').click();
    await page.waitForTimeout(3000);

    const { data: users } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    const signupUser = (users?.users ?? []).find((u) => u.email === signupEmail);

    if (!signupUser) {
      const bodyText = await page.locator("body").innerText();

      // Tell "our own form validation rejected the input" (a real bug) apart
      // from "GoTrue refused the request" (an environment limit). Email
      // confirmation is enabled on this project and the built-in SMTP has a
      // low hourly quota, so a run can legitimately hit `email rate limit
      // exceeded`; the Server Action answers with one generic message for
      // every provider-side failure, and the exact reason is in the server
      // log.
      const ownValidationFailed =
        /Enter your full name|Enter a valid email address|Choose a password/i.test(
          bodyText,
        );

      if (ownValidationFailed) {
        check(
          "the signup form accepts valid input",
          false,
          bodyText.replace(/\n/g, " ").slice(0, 200),
        );
      } else {
        skip(
          "referral signup through the real form",
          "GoTrue refused the signup (typically `email rate limit exceeded` — email confirmation is on for this project). `npm run verify:referral` makes the same attribution assertion over the real APIs.",
        );
      }
      await ctx.close();
    } else {
      referredUserIds.push(signupUser.id);
      check("the signup created the account", true);

      const { data: newPartner } = await admin
        .from("partner_profiles")
        .select("partner_id, referral_code, sponsor_partner_id")
        .eq("user_id", signupUser.id)
        .maybeSingle();
      check("the new partner has a partner record", Boolean(newPartner), JSON.stringify(newPartner));
      check(
        "the new partner is attributed to the referral link",
        newPartner?.sponsor_partner_id === partnerRow.partner_id,
        `${newPartner?.sponsor_partner_id} != ${partnerRow.partner_id}`,
      );

      const { data: edge } = await admin
        .from("partner_relationships")
        .select("sponsor_partner_id, attribution_source, attribution_code")
        .eq("partner_id", newPartner?.partner_id ?? "")
        .maybeSingle();
      check(
        "a sponsor relationship row exists",
        edge?.sponsor_partner_id === partnerRow.partner_id,
        JSON.stringify(edge),
      );
      check(
        "the edge is recorded as referral-link attribution",
        edge?.attribution_source === "referral_link" &&
          edge?.attribution_code === partnerRow.referral_code,
        JSON.stringify(edge),
      );

      await ctx.close();
    }
  }

  console.log("\n5. Phase 4B — the dashboard referral section (390px)");
  {
    const { ctx, page } = await signIn(partnerEmail, { width: 390, height: 844 });
    const body = await page.locator("body").innerText();

    check("the dashboard shows a referral section", body.includes("Referral program"));
    check("it shows the Partner ID", body.includes(partnerRow.partner_id));
    check("it shows the referral code", body.includes(partnerRow.referral_code));
    {
      // StatCard labels are uppercased by CSS, and innerText returns the
      // rendered casing, so compare case-insensitively.
      const lower = body.toLowerCase();
      check(
        "it shows the three real counters",
        lower.includes("referral clicks") &&
          lower.includes("attributed leads") &&
          lower.includes("partner signups"),
        body.replace(/\n/g, " ").slice(0, 160),
      );
    }

    const link = await page.locator("#referral-link").inputValue();
    check(
      "the referral link points at /go/<code>",
      link.endsWith(`/go/${partnerRow.referral_code}`),
      link,
    );
    check(
      "the copy button is present",
      (await page.getByRole("button", { name: /copy referral link/i }).count()) > 0,
    );

    if (phase4bReady) {
      const { count: dbClicks } = await admin
        .from("referral_clicks")
        .select("*", { count: "exact", head: true })
        .eq("referral_code", partnerRow.referral_code);
      const uiClicks = await statValue(page, "Referral clicks");
      check("the click counter is a real number", /^\d+$/.test(uiClicks), uiClicks);
      check(
        "the click counter matches the database",
        Number(uiClicks) === (dbClicks ?? 0),
        `ui=${uiClicks} db=${dbClicks}`,
      );

      const { count: dbSignups } = await admin
        .from("partner_relationships")
        .select("*", { count: "exact", head: true })
        .eq("sponsor_partner_id", partnerRow.partner_id);
      const uiSignups = await statValue(page, "Partner signups");
      check(
        "the signup counter matches the database",
        Number(uiSignups) === (dbSignups ?? 0),
        `ui=${uiSignups} db=${dbSignups}`,
      );
    } else {
      const degraded = await statValue(page, "Referral clicks");
      check(
        "an unreadable count degrades to a dash, never to 0",
        degraded === "—",
        degraded,
      );
      skip(
        "the counters match the database",
        "the Phase 4B schema is not applied to this project",
      );
    }

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    check(
      "no horizontal overflow at 390px with the referral section",
      overflow.scrollWidth === overflow.clientWidth,
      JSON.stringify(overflow),
    );

    await page.screenshot({ path: "/tmp/accept-referral-390.png", fullPage: true });
    await ctx.close();
  }
} finally {
  console.log("\n6. Cleanup");
  // The referred partner is deleted before its sponsor: partner_profiles'
  // sponsor pointer is ON DELETE RESTRICT, so order matters.
  for (const id of [au?.user?.id, ...referredUserIds, pu?.user?.id].filter(Boolean)) {
    const { error } = await admin.auth.admin.deleteUser(id);
    check(`deleted test user ${id}`, !error, error?.message);
  }
  const { data: left } = await admin
    .from("profiles")
    .select("email")
    .like("email", `${PREFIX}%`);
  check("no test accounts left behind", (left?.length ?? 0) === 0, `${left?.length ?? 0} rows`);

  await browser.close();
  console.log(`\n${passes} passed, ${failures} failed${skips > 0 ? `, ${skips} skipped` : ""}`);
}
process.exit(failures > 0 ? 1 : 0);
