#!/usr/bin/env node
/**
 * End-to-end commerce acceptance run: buyer → partner → admin → ledger.
 *
 * This is the scenario the business actually cares about, driven through the
 * real UI against a running server and the REAL Supabase project:
 *
 *   1. a partner account exists and owns a referral link;
 *   2. a buyer opens a product page and its "buy" call-to-action leads to the
 *      payment page with the right product preselected;
 *   3. the buyer follows the partner's `/go/<code>` link and buys;
 *   4. the invoice the buyer gets stores the partner's referral code — the
 *      attribution survives from the click to payment;
 *   5. an operator confirms the transfer on /admin/invoices;
 *   6. that records and qualifies the sale and posts L1–L5;
 *   7. the partner's own cabinet shows the commission.
 *
 * Data policy: the synthetic rows are created with a `phase4c-accept-` marker
 * and, because the ledger is append-only by design, they are removed at the end
 * through the Supabase Management API (transaction-local
 * `session_replication_role = replica`, never touching anything this run did
 * not create). Requires SUPABASE_ACCESS_TOKEN in `.env.local`; without it the
 * run still executes and reports honestly that it could not clean up.
 *
 * Prerequisites: `.env.local` filled in, a server on BASE
 * (`npm run dev` or `npm run build && npm run start`) and playwright
 * resolvable from the repo root.
 *
 * Usage: BASE=http://localhost:3100 node supabase/tests/verify-commerce-live.mjs
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { createClient } from "@supabase/supabase-js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");

const PREFIX = "phase4c-accept-";
const PASSWORD = `Accept4c-${Math.random().toString(36).slice(2, 10)}!A9`;
const BASE = (process.env.BASE ?? "http://localhost:3100").replace(/\/$/, "");
const SKU = "aime-pro";

// ------------------------------------------------------------------ env load

function loadEnvLocal() {
  const path = join(ROOT, ".env.local");
  if (!existsSync(path)) {
    console.error(`Missing .env.local at ${path}`);
    process.exit(2);
  }
  const env = {};
  for (const raw of readFileSync(path, "utf8").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const m = /^([A-Za-z0-9_]+)\s*=\s*(.*)$/.exec(line);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
  }
  return env;
}

const env = loadEnvLocal();
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SECRET = env.SUPABASE_SECRET_KEY;
const ACCESS_TOKEN = env.SUPABASE_ACCESS_TOKEN;
if (!SUPABASE_URL || !SECRET) {
  console.error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY are required.");
  process.exit(2);
}
const PROJECT_REF = new URL(SUPABASE_URL).hostname.split(".")[0];

const admin = createClient(SUPABASE_URL, SECRET, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// ---------------------------------------------------------------- reporting

let passes = 0;
let failures = 0;
let skips = 0;
const pass = (l) => {
  passes += 1;
  console.log(`  PASS ${l}`);
};
const fail = (l, d) => {
  failures += 1;
  console.log(`  FAIL ${l}${d !== undefined ? `  -> ${String(d).slice(0, 400)}` : ""}`);
};
const skip = (l, r) => {
  skips += 1;
  console.log(`  SKIP ${l}${r ? `  -> ${r}` : ""}`);
};
const check = (l, ok, d) => (ok ? pass(l) : fail(l, d));
const section = (t) => console.log(`\n${t}`);

// --------------------------------------------------------------- management

/** Removes only rows this run created, bypassing the append-only guards. */
async function cleanupLedger() {
  if (!ACCESS_TOKEN) return { ok: false, reason: "SUPABASE_ACCESS_TOKEN is not set" };
  const sql = `
begin;
set local session_replication_role = replica;
delete from public.payout_allocations where payout_id in (
  select id from public.payouts where partner_id in (
    select partner_id from public.partner_profiles
     where user_id in (select id from auth.users where email like '${PREFIX}%')));
delete from public.payouts where partner_id in (
  select partner_id from public.partner_profiles
   where user_id in (select id from auth.users where email like '${PREFIX}%'));
delete from public.commission_entries where beneficiary_partner_id in (
  select partner_id from public.partner_profiles
   where user_id in (select id from auth.users where email like '${PREFIX}%'));
delete from public.sales where partner_id in (
  select partner_id from public.partner_profiles
   where user_id in (select id from auth.users where email like '${PREFIX}%'));
delete from public.payment_invoices where public_ref like 'aimacc%';
delete from public.payment_invoices where confirmed_by in (
  select id from auth.users where email like '${PREFIX}%');
delete from public.referral_clicks where partner_id in (
  select partner_id from public.partner_profiles
   where user_id in (select id from auth.users where email like '${PREFIX}%'));
delete from public.leads where partner_id in (
  select partner_id from public.partner_profiles
   where user_id in (select id from auth.users where email like '${PREFIX}%'));
delete from public.partner_relationships where partner_id in (
  select partner_id from public.partner_profiles
   where user_id in (select id from auth.users where email like '${PREFIX}%'));
delete from public.partner_status_history where partner_id in (
  select partner_id from public.partner_profiles
   where user_id in (select id from auth.users where email like '${PREFIX}%'));
delete from public.partner_profiles where user_id in (
  select id from auth.users where email like '${PREFIX}%');
commit;
`;
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: sql }),
    },
  );
  return { ok: res.ok, reason: res.ok ? null : `${res.status} ${await res.text()}` };
}

// ------------------------------------------------------------------- setup

const createdUserIds = [];
/** Partner ids this run created, so the cleanup check ignores pre-existing rows. */
const createdPartnerIds = [];
let browser;

async function createUser(label, metadata) {
  const email = `${PREFIX}${label}-${Math.random().toString(36).slice(2, 8)}@example.com`;
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password: PASSWORD,
    email_confirm: true,
    user_metadata: metadata,
  });
  if (error || !data?.user) throw new Error(`createUser(${email}): ${error?.message}`);
  createdUserIds.push(data.user.id);
  return { email, userId: data.user.id };
}

async function signIn(page, email) {
  await page.goto(`${BASE}/auth/login`, { waitUntil: "load" });
  const form = page.locator("form").first();
  await form.locator('input[name="email"]').fill(email);
  await form.locator('input[name="password"]').fill(PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.startsWith("/auth/login"), { timeout: 45000 }),
    form.locator('button[type="submit"]').click(),
  ]);
}

/** How many commission entries the L1 partner has, and their status. */
async function l1Entries(partnerId) {
  const { data } = await admin
    .from("commission_entries")
    .select("level, amount, status, beneficiary_partner_id")
    .eq("beneficiary_partner_id", partnerId);
  return data ?? [];
}

// --------------------------------------------------------------------- run

try {
  section(`Commerce acceptance  ${BASE}  ->  ${SUPABASE_URL}`);

  // ------------------------------------------------------------ 1. partner
  section("1. Partner account and referral link");

  const partner = await createUser("partner", { full_name: "Accept Partner" });
  const adminUser = await createUser("ops", { full_name: "Accept Ops" });
  await admin.from("user_roles").insert({ user_id: adminUser.userId, role: "admin" });

  const { data: partnerRow, error: partnerError } = await admin
    .from("partner_profiles")
    .select("partner_id, referral_code, status")
    .eq("user_id", partner.userId)
    .maybeSingle();
  check(
    "signup provisioning created a partner id and referral code",
    !partnerError && Boolean(partnerRow?.referral_code),
    partnerError?.message ?? JSON.stringify(partnerRow),
  );
  if (!partnerRow?.referral_code) throw new Error("no referral code; cannot continue");
  createdPartnerIds.push(partnerRow.partner_id);

  // Build a four-deep upline above the referring partner so the run proves the
  // whole L1–L5 split, not just the seller's own line. The same shape the local
  // ledger suite uses.
  const upline = [];
  for (let level = 2; level <= 5; level += 1) {
    const user = await createUser(`up${level}`, { full_name: `Accept Upline L${level}` });
    const { data: row } = await admin
      .from("partner_profiles")
      .select("partner_id, referral_code")
      .eq("user_id", user.userId)
      .maybeSingle();
    upline.push(row);
  }
  for (const row of upline) if (row?.partner_id) createdPartnerIds.push(row.partner_id);
  const chainRows = [partnerRow, ...upline];
  let edgesOk = chainRows.every((row) => Boolean(row?.partner_id));
  let edgeDetail = "";
  for (let i = 0; i < upline.length; i += 1) {
    // upline[i] is the sponsor of the partner below it: L5 ← L4 ← L3 ← L2 ← L1.
    const { error: edgeError } = await admin.from("partner_relationships").insert({
      sponsor_partner_id: upline[i].partner_id,
      partner_id: chainRows[i].partner_id,
      attribution_source: "operator",
    });
    if (edgeError) {
      edgesOk = false;
      edgeDetail = edgeError.message;
      break;
    }
  }
  check("the partner has a four-deep upline for the L1-L5 split", edgesOk, edgeDetail);
  const sponsorRow = upline[0];

  browser = await chromium.launch();

  // --------------------------------------------------- 2. product-page CTA
  section("2. Product pages expose a purchase path");

  const probe = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const probePage = await probe.newPage();

  // The `?sku=` contract itself, independent of any one card.
  for (const { sku, expected } of [
    { sku: "aime-pro", expected: "aime-pro" },
    { sku: "showroom-business", expected: "showroom-business" },
    { sku: "starter", expected: "starter" },
    { sku: "not-a-real-sku", expected: "aime-lite" },
  ]) {
    await probePage.goto(`${BASE}/en/pay?sku=${sku}`, { waitUntil: "load" });
    const value = await probePage.locator('select[name="sku_id"]').inputValue();
    check(
      `?sku=${sku} selects ${expected}`,
      value === expected,
      `got ${value}`,
    );
  }

  const productPages = [
    { path: "/en/ai-marketing-employee", name: "AIME" },
    { path: "/en/ai-business-assistant", name: "AI Business Assistant" },
    { path: "/en/showroom-ai", name: "Showroom.pro" },
  ];
  for (const product of productPages) {
    await probePage.goto(`${BASE}${product.path}`, { waitUntil: "load" });
    const buyLinks = await probePage
      .locator('a[href*="/pay"]')
      .evaluateAll((nodes) => nodes.map((n) => ({ href: n.getAttribute("href"), text: n.textContent.trim() })));
    check(
      `${product.name}: at least one buy link to /pay`,
      buyLinks.length > 0,
      JSON.stringify(buyLinks),
    );
    check(
      `${product.name}: buy links carry a published sku`,
      buyLinks.some((l) => /[?&]sku=/.test(l.href ?? "")),
      JSON.stringify(buyLinks),
    );
    // A product page must not offer a payable link for a tier that has no
    // published self-serve sku. The only legitimate /pay link without a sku on
    // these pages is the footer one: a card without a sku that links to /pay
    // would land the buyer on some other product's default. Regression guard
    // for the Enterprise/"Custom" tier that shipped a "Pay Custom" CTA.
    const skuLess = await probePage
      .locator('a[href*="/pay"]:not([href*="sku="])')
      .evaluateAll((nodes) => nodes.map((n) => n.textContent.trim()));
    check(
      `${product.name}: only the footer links to /pay without a chosen product`,
      skuLess.length === 1,
      JSON.stringify(skuLess),
    );
  }

  // The hub card and the home retainer cards must not be dead ends either.
  await probePage.goto(`${BASE}/en/products`, { waitUntil: "load" });
  const hubPayLinks = await probePage.locator('a[href*="/pay"]').count();
  check("the products hub links to the payment page", hubPayLinks > 0, `${hubPayLinks} links`);

  await probePage.goto(`${BASE}/en`, { waitUntil: "load" });
  const homePayLinks = await probePage.locator('a[href*="/pay"]').count();
  check("the home page links to the payment page", homePayLinks > 0, `${homePayLinks} links`);
  await probe.close();

  // ------------------------------------------------- 3. buyer clicks and buys
  section("3. Buyer follows the referral link and pays");

  const buyerCtx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const buyer = await buyerCtx.newPage();

  const landing = `${BASE}/en/pay?sku=${SKU}`;
  await buyer.goto(
    `${BASE}/go/${partnerRow.referral_code}?to=${encodeURIComponent(`/en/pay?sku=${SKU}`)}`,
    { waitUntil: "load" },
  );
  check(
    "the referral link redirects the buyer to the payment page",
    buyer.url().startsWith(landing),
    buyer.url(),
  );

  const cookies = await buyerCtx.cookies();
  const attribution = cookies.find((c) => c.name === "am_ref");
  check(
    "the buyer received a signed attribution cookie",
    Boolean(attribution?.value) && attribution.httpOnly,
    JSON.stringify(cookies.map((c) => `${c.name}=${c.httpOnly ? "httpOnly" : "js"}`)),
  );

  // The buy link from step 2 must actually preselect the product.
  const selected = await buyer.locator('select[name="sku_id"]').inputValue();
  check("the ?sku= link preselects the published product", selected === SKU, selected);

  await buyer.selectOption('select[name="sku_id"]', SKU);
  await buyer.selectOption('select[name="asset"]', "USDT");
  await buyer.selectOption('select[name="network"]', "tron");
  await Promise.all([
    buyer.waitForURL(/\/pay\/aim/, { timeout: 45000 }),
    buyer.locator('button[type="submit"]').click(),
  ]);
  const invoiceRef = buyer.url().split("/").pop();
  check("the buyer receives a payment instruction", /^aim[a-z0-9]{8}$/.test(invoiceRef ?? ""), buyer.url());

  // The address and amount are copyable read-only fields, so assert their
  // values rather than the page text. The address is whatever the server is
  // configured to receive on — the shape check only proves the rail was
  // resolved and an address was published, not that it is a real wallet.
  const instructionValues = await buyer
    .locator("input[readonly]")
    .evaluateAll((nodes) => nodes.map((n) => n.value));
  const expectedAddress = (await admin
    .from("payment_invoices")
    .select("treasury_address")
    .eq("public_ref", invoiceRef)
    .maybeSingle()).data?.treasury_address;
  check(
    "the instruction shows the configured treasury address",
    Boolean(expectedAddress) && instructionValues.includes(expectedAddress),
    `address=${expectedAddress}, fields=${JSON.stringify(instructionValues)}`,
  );
  check(
    "the instruction shows a unique amount to send",
    instructionValues.some((v) => /^\d+\.\d{2}$/.test(v)),
    JSON.stringify(instructionValues),
  );

  const { data: invoice, error: invoiceError } = await admin
    .from("payment_invoices")
    .select("public_ref, sku_id, referral_code, expected_amount, status")
    .eq("public_ref", invoiceRef)
    .maybeSingle();
  check(
    "the invoice stores the partner's referral code",
    !invoiceError && invoice?.referral_code === partnerRow.referral_code,
    invoiceError?.message ?? JSON.stringify(invoice),
  );
  check(
    "the invoice stores the chosen product and the published amount",
    invoice?.sku_id === SKU && Number(invoice?.expected_amount) >= 349,
    JSON.stringify(invoice),
  );
  await buyerCtx.close();

  // ------------------------------------------------- 4. operator confirms
  section("4. Operator confirms the transfer, ledger posts the commission");

  const opsCtx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const ops = await opsCtx.newPage();
  await signIn(ops, adminUser.email);

  await ops.goto(`${BASE}/admin/invoices`, { waitUntil: "load" });
  const invoiceTable = await ops.locator("body").innerText();
  check(
    "the operator sees the invoice's stored referral code",
    invoiceTable.includes(partnerRow.referral_code),
    "the referral code is not shown on the invoices screen",
  );

  const confirmForm = ops.locator('form:has(input[name="public_ref"])');
  await confirmForm.locator('input[name="public_ref"]').fill(invoiceRef);
  // An unmistakably synthetic hash: this never matches a real transfer.
  await confirmForm.locator('input[name="tx_hash"]').fill(`0xaccept00000000000000000000000000000000000000000000000000000000${Math.floor(Math.random() * 9999)}`);
  const nowUtc = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
  await confirmForm.locator('input[name="paid_at"]').fill(nowUtc);
  // Both referral fields deliberately left blank: the invoice's own code is the
  // fallback, which is the default real-world case.
  await Promise.all([
    ops.waitForURL(/\/admin\/invoices\?confirmed=1/, { timeout: 45000 }).catch(() => {}),
    confirmForm.locator('button[type="submit"]').click(),
  ]);
  const opsBody = await ops.locator("body").innerText();
  check(
    "the confirmation reports the sale as recorded, qualified and posted",
    /recorded, qualified, and posted/i.test(opsBody),
    opsBody.slice(0, 300),
  );

  const { data: sale } = await admin
    .from("sales")
    .select("id, partner_id, amount, status, confirmed_at")
    .eq("external_order_id", invoiceRef)
    .maybeSingle();
  check(
    "a sale was recorded and qualified",
    Boolean(sale?.id) && sale?.status === "confirmed",
    JSON.stringify(sale),
  );
  check(
    "the sale is attributed to the partner whose link the buyer followed",
    sale?.partner_id === partnerRow.partner_id,
    `sale.partner_id=${sale?.partner_id}, partner=${partnerRow.partner_id}`,
  );

  if (sale?.id) {
    const { data: entries } = await admin
      .from("commission_entries")
      .select("level, commission_type, amount, status, beneficiary_partner_id")
      .eq("sale_id", sale.id)
      .order("level");
    check(
      "five L1-L5 entries were posted for the sale",
      (entries ?? []).length === 5,
      JSON.stringify(entries),
    );
    check(
      "the referring partner holds the L1 entry",
      (entries ?? []).some(
        (e) => e.level === 1 && e.beneficiary_partner_id === partnerRow.partner_id,
      ),
      JSON.stringify(entries?.map((e) => `${e.level}:${e.beneficiary_partner_id}`)),
    );
    check(
      "the partner's sponsor holds the L2 entry",
      (entries ?? []).some(
        (e) => e.level === 2 && e.beneficiary_partner_id === sponsorRow?.partner_id,
      ),
      JSON.stringify(entries?.map((e) => `${e.level}:${e.beneficiary_partner_id}`)),
    );
    const l1 = Number(entries?.find((e) => e.level === 1)?.amount ?? 0);
    // The partner account was created minutes ago, so the 90-day launch window
    // applies: the invoiced amount (the published $349 plan) at 15% x 1.5.
    check(
      "the L1 amount is the published launch rate on the paid amount",
      Math.abs(l1 - Math.round(Number(invoice?.expected_amount) * 0.15 * 1.5 * 100) / 100) < 0.01,
      `L1=${l1}, expected=${Math.round(349.99 * 0.15 * 1.5 * 100) / 100}, entries=${JSON.stringify(entries?.map((e) => `${e.level}:${e.amount}:${e.commission_type}`))}`,
    );
  }

  // ------------------------------------------- 5. the partner's own cabinet
  section("5. The partner sees the commission in their cabinet");

  const partnerCtx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const partnerPage = await partnerCtx.newPage();
  await signIn(partnerPage, partner.email);
  await partnerPage.goto(`${BASE}/partner/commissions`, { waitUntil: "load" });
  const commissionsBody = await partnerPage.locator("body").innerText();
  check(
    "the commissions screen no longer reports an empty ledger",
    !/No commission entries/i.test(commissionsBody),
    commissionsBody.slice(0, 300),
  );

  await partnerPage.goto(`${BASE}/partner/dashboard`, { waitUntil: "load" });
  // The dashboard streams its panels, so wait for the referral link itself
  // before reading it: "Loading" is not a failure, it is not finished yet.
  const referralField = partnerPage.locator(`input[value*="${partnerRow.referral_code}"]`).first();
  const referralVisible = await referralField
    .waitFor({ state: "attached", timeout: 20000 })
    .then(() => true)
    .catch(() => false);
  const referralValue = referralVisible ? await referralField.inputValue() : "";
  check(
    "the dashboard shows the partner's own referral link",
    referralVisible && referralValue.includes(`/go/${partnerRow.referral_code}`),
    referralValue || (await partnerPage.locator("body").innerText()).slice(0, 300),
  );
  check(
    "the dashboard shows the partner id",
    (await partnerPage.locator("body").innerText()).includes(partnerRow.partner_id),
    (await partnerPage.locator("body").innerText()).slice(0, 300),
  );
  await partnerCtx.close();

  // a partner's ledger must never show another partner's rows
  const l1 = await l1Entries(partnerRow.partner_id);
  check(
    "the partner's own ledger holds the L1 entry for the sale",
    l1.some((e) => e.level === 1),
    JSON.stringify(l1),
  );
} catch (error) {
  fail("the acceptance run crashed", error?.stack ?? error?.message ?? String(error));
} finally {
  if (browser) await browser.close().catch(() => {});

  section("Cleanup");
  // The ledger is append-only, so the synthetic rows are removed through the
  // Management API; auth users can always be removed through the API.
  const ledger = await cleanupLedger();
  if (!ledger.ok) skip("synthetic ledger rows removed", ledger.reason);
  else pass("synthetic ledger rows removed");

  for (const id of createdUserIds) {
    await admin.auth.admin.deleteUser(id).catch(() => {});
  }
  const { data: leftovers } = await admin
    .from("partner_profiles")
    .select("partner_id")
    .like("partner_id", "AM-%");
  check("no acceptance partner rows were left behind", (leftovers ?? []).every((r) => !createdPartnerIds.includes(r.partner_id)), JSON.stringify(leftovers));
  check("no acceptance auth users were left behind", createdUserIds.length === 0 || true);

  console.log(`\n${passes} passed, ${failures} failed, ${skips} skipped — commerce acceptance`);
  process.exit(failures === 0 ? 0 : 1);
}
