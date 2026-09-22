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
const check = (label, ok, detail) => {
  if (ok) {
    passes += 1;
    console.log(`  PASS ${label}`);
  } else {
    failures += 1;
    console.log(`  FAIL ${label}${detail ? `  -> ${detail}` : ""}`);
  }
};

// ---------------------------------------------------------------- test users
const { data: existing } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
for (const u of existing?.users ?? []) {
  if (u.email?.startsWith(PREFIX)) await admin.auth.admin.deleteUser(u.id);
}

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
} finally {
  console.log("\n4. Cleanup");
  for (const id of [au?.user?.id, pu?.user?.id].filter(Boolean)) {
    const { error } = await admin.auth.admin.deleteUser(id);
    check(`deleted test user ${id}`, !error, error?.message);
  }
  const { data: left } = await admin
    .from("profiles")
    .select("email")
    .like("email", `${PREFIX}%`);
  check("no test accounts left behind", (left?.length ?? 0) === 0, `${left?.length ?? 0} rows`);

  await browser.close();
  console.log(`\n${passes} passed, ${failures} failed`);
}
process.exit(failures > 0 ? 1 : 0);
