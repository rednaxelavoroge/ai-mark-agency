#!/usr/bin/env node
/**
 * Live Supabase project verification for Phase 4A.
 *
 * The local suite (`run-rls-tests.sh`) proves the migrations against a plain
 * PostgreSQL instance. This script proves the same properties against the REAL
 * project over the real PostgREST/Auth APIs with real JWTs — the one thing a
 * local harness cannot cover.
 *
 * It reads `.env.local` (gitignored) and needs:
 *   NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, SUPABASE_SECRET_KEY
 *
 * Checks:
 *   1. the Phase 4A schema is present;
 *   2. signup provisioning fills profiles / partner_profiles / user_roles;
 *   3. a partner, authenticated with their own JWT, reads only their own rows;
 *   4. a partner cannot read another partner's rows;
 *   5. a partner cannot escalate, and cannot write platform-owned data;
 *   6. an anonymous caller holding only the publishable key reaches no data;
 *   7. an admin sees across partners;
 *   8. the sponsor edge is single-valued, immutable and self-sponsorship-proof.
 *
 * Re-runnable: leftover `phase4a-verify-` users from an interrupted run are
 * removed first, and everything this run creates is deleted in a `finally`
 * block. It never touches data it did not create.
 *
 * Usage: node supabase/tests/verify-live-project.mjs
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");

const PREFIX = "phase4a-verify-";
/** Random per run: a fixed literal would be a credential worth keeping. */
const PASSWORD = `Phase4a-${Math.random().toString(36).slice(2, 12)}!A9`;

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

/** A fresh client per identity — a shared one would leak a session across tests. */
function makeClient(url, key) {
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Cheap probe: ask for the count without pulling rows. */
async function countRows(client, table) {
  const { error, count } = await client
    .from(table)
    .select("*", { count: "exact", head: true });
  return { error, count: count ?? 0 };
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

// ---------------------------------------------------------------------- main

async function main() {
  const env = loadEnvLocal();

  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const secretKey = env.SUPABASE_SECRET_KEY;

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

  if (publishableKey.startsWith("sb_secret_")) {
    console.error(
      `${red("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY holds a SECRET key.")}\n` +
        "Rotate it in the Supabase dashboard and put the sb_publishable_… value there.",
    );
    process.exit(2);
  }

  const admin = makeClient(url, secretKey);
  const anon = makeClient(url, publishableKey);

  /** Only ids created by this run are ever deleted. */
  const created = [];
  let schemaReady = false;

  console.log(`${bold("Live Phase 4A verification")} ${dim(url)}`);

  try {
    // ---------------------------------------------------------------- schema
    section("1. Schema present");

    for (const table of [
      "profiles",
      "partner_profiles",
      "partner_relationships",
      "partner_status_history",
      "user_roles",
    ]) {
      const { error } = await countRows(admin, table);
      if (error) {
        fail(`${table} is reachable`, error.message);
      } else {
        schemaReady = true;
        pass(`${table} is reachable`);
      }
    }

    if (!schemaReady) {
      console.log(
        `\n${red("The Phase 4A schema is not applied to this project.")}\n` +
          "Apply supabase/migrations/*.sql in filename order in the Supabase SQL\n" +
          "editor, then re-run. See supabase/README.md section 2.",
      );
      return;
    }

    // -------------------------------------------------- pre-clean leftovers
    const { data: existingUsers } = await admin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    const previousRuns = (existingUsers?.users ?? []).filter((user) =>
      user.email?.startsWith(PREFIX),
    );
    for (const user of previousRuns) {
      await admin.auth.admin.deleteUser(user.id);
    }
    if (previousRuns.length > 0) {
      console.log(
        dim(`removed ${previousRuns.length} leftover test user(s) from an earlier run`),
      );
    }

    // ---------------------------------------------------------- provisioning
    section("2. Provisioning — signup creates the partner record");

    const partnerEmail = `${PREFIX}partner@example.com`;
    const adminEmail = `${PREFIX}admin@example.com`;

    const { data: partnerUser, error: partnerCreateError } =
      await admin.auth.admin.createUser({
        email: partnerEmail,
        password: PASSWORD,
        email_confirm: true,
        user_metadata: { full_name: "Phase 4A Verify Partner", language: "en" },
      });

    if (partnerCreateError || !partnerUser?.user) {
      fail("create the test partner", partnerCreateError?.message);
      return;
    }
    created.push(partnerUser.user.id);
    pass("create the test partner");

    const { data: adminUser, error: adminCreateError } =
      await admin.auth.admin.createUser({
        email: adminEmail,
        password: PASSWORD,
        email_confirm: true,
        user_metadata: { full_name: "Phase 4A Verify Admin" },
      });

    if (adminCreateError || !adminUser?.user) {
      fail("create the test admin", adminCreateError?.message);
      return;
    }
    created.push(adminUser.user.id);
    pass("create the test admin");

    const partnerUid = partnerUser.user.id;
    const adminUid = adminUser.user.id;

    const { data: partnerProfile } = await admin
      .from("partner_profiles")
      .select("*")
      .eq("user_id", partnerUid)
      .maybeSingle();

    check(
      "the auth trigger created a partner_profile",
      Boolean(partnerProfile),
      "no partner_profiles row — is the provisioning migration applied?",
    );
    if (!partnerProfile) return;

    check(
      "partner_id matches AM-######",
      /^AM-[0-9]{6}$/.test(partnerProfile.partner_id),
      partnerProfile.partner_id,
    );
    check(
      "referral_code is 8 url-safe characters",
      /^[a-z0-9]{8}$/.test(partnerProfile.referral_code),
      partnerProfile.referral_code,
    );
    check(
      "the partner starts in status 'partner'",
      partnerProfile.status === "partner",
      partnerProfile.status,
    );

    const { data: profileRow } = await admin
      .from("profiles")
      .select("*")
      .eq("id", partnerUid)
      .maybeSingle();
    check(
      "full_name came from the signup metadata",
      profileRow?.full_name === "Phase 4A Verify Partner",
      profileRow?.full_name,
    );

    const { data: partnerRoles } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", partnerUid);
    check(
      "the new account holds the partner role",
      (partnerRoles ?? []).some((row) => row.role === "partner"),
      JSON.stringify(partnerRoles),
    );

    const { data: initialHistory } = await admin
      .from("partner_status_history")
      .select("partner_id")
      .eq("partner_id", partnerProfile.partner_id);
    check(
      "the initial status is in the audit trail",
      (initialHistory?.length ?? 0) >= 1,
      `rows: ${initialHistory?.length ?? 0}`,
    );

    // The elevated client must be able to grant a role: Postgres checks grants
    // before RLS, so a BYPASSRLS role without the grant fails right here.
    const { error: grantError } = await admin
      .from("user_roles")
      .insert({ user_id: adminUid, role: "admin" });
    check(
      "the elevated client can grant the admin role",
      !grantError,
      grantError?.message,
    );

    // ------------------------------------------------------------ partner RLS
    section("3. Partner isolation with real JWTs");

    const partnerClient = await signIn(url, publishableKey, partnerEmail);

    const ownProfiles = await countRows(partnerClient, "profiles");
    check(
      "the partner reads exactly one profile (their own)",
      ownProfiles.count === 1,
      `saw ${ownProfiles.count}`,
    );

    const ownPartner = await countRows(partnerClient, "partner_profiles");
    check(
      "the partner reads exactly one partner_profile",
      ownPartner.count === 1,
      `saw ${ownPartner.count}`,
    );

    const ownRoles = await countRows(partnerClient, "user_roles");
    check(
      "the partner reads only their own role rows",
      ownRoles.count === 1,
      `saw ${ownRoles.count}`,
    );

    const otherEmail = `${PREFIX}other@example.com`;
    const { data: otherUser, error: otherError } =
      await admin.auth.admin.createUser({
        email: otherEmail,
        password: PASSWORD,
        email_confirm: true,
        user_metadata: { full_name: "Phase 4A Verify Other" },
      });

    if (otherError || !otherUser?.user) {
      fail("create the second test partner", otherError?.message);
    } else {
      created.push(otherUser.user.id);
      const otherUid = otherUser.user.id;

      const { data: crossProfile } = await partnerClient
        .from("profiles")
        .select("id")
        .eq("id", otherUid);
      check(
        "the partner cannot read another partner's profile",
        (crossProfile?.length ?? 0) === 0,
        `saw ${crossProfile?.length ?? 0} rows`,
      );

      const { data: crossPartner } = await partnerClient
        .from("partner_profiles")
        .select("partner_id")
        .eq("user_id", otherUid);
      check(
        "the partner cannot read another partner's partner_profile",
        (crossPartner?.length ?? 0) === 0,
        `saw ${crossPartner?.length ?? 0} rows`,
      );
    }

    // ----------------------------------------------------- escalation attempts
    section("4. A partner cannot escalate or write platform data");

    const escalate = await partnerClient
      .from("user_roles")
      .insert({ user_id: partnerUid, role: "admin" });
    check(
      "the partner cannot grant themselves admin",
      Boolean(escalate.error),
      "the insert unexpectedly succeeded",
    );

    const selfStatus = await partnerClient
      .from("partner_profiles")
      .update({ status: "strategic" })
      .eq("user_id", partnerUid)
      .select("partner_id");
    check(
      "the partner cannot change their own status",
      (selfStatus.data?.length ?? 0) === 0,
      `updated ${selfStatus.data?.length ?? 0} rows`,
    );

    const forgeEdge = await partnerClient.from("partner_relationships").insert({
      sponsor_partner_id: partnerProfile.partner_id,
      partner_id: partnerProfile.partner_id,
    });
    check(
      "the partner cannot insert a sponsor relationship",
      Boolean(forgeEdge.error),
      "the insert unexpectedly succeeded",
    );

    // ------------------------------------------------------------------- anon
    section("5. Anonymous caller holding only the publishable key");

    const anonProfiles = await countRows(anon, "profiles");
    check(
      "anon reaches no profile rows",
      Boolean(anonProfiles.error) || anonProfiles.count === 0,
      `saw ${anonProfiles.count} rows with no error`,
    );

    const anonPartner = await countRows(anon, "partner_profiles");
    check(
      "anon reaches no partner_profile rows",
      Boolean(anonPartner.error) || anonPartner.count === 0,
      `saw ${anonPartner.count} rows with no error`,
    );

    // ------------------------------------------------------------------ admin
    section("6. Admin sees across partners");

    const adminClient = await signIn(url, publishableKey, adminEmail);

    const { data: isAdminFlag } = await adminClient.rpc("is_admin");
    check(
      "is_admin() is true for the admin",
      isAdminFlag === true,
      String(isAdminFlag),
    );

    const allPartners = await countRows(adminClient, "partner_profiles");
    check(
      "the admin reads every partner_profile",
      allPartners.count >= 3,
      `saw ${allPartners.count}`,
    );

    // -------------------------------------------------- sponsor edge integrity
    section("7. Sponsor edge — single-valued and immutable");

    const { data: secondPartner } = await admin
      .from("partner_profiles")
      .select("partner_id")
      .eq("user_id", created[2])
      .maybeSingle();

    const sponsorId = partnerProfile.partner_id;
    const downlineId = secondPartner?.partner_id;

    if (!downlineId) {
      fail("resolve the second partner's partner_id", "not found");
      return;
    }

    const { error: edgeError } = await admin
      .from("partner_relationships")
      .insert({ sponsor_partner_id: sponsorId, partner_id: downlineId });
    check("the admin can create the sponsor edge", !edgeError, edgeError?.message);

    const { data: synced } = await admin
      .from("partner_profiles")
      .select("sponsor_partner_id")
      .eq("partner_id", downlineId)
      .maybeSingle();
    check(
      "the edge syncs partner_profiles.sponsor_partner_id",
      synced?.sponsor_partner_id === sponsorId,
      `got ${synced?.sponsor_partner_id}`,
    );

    const duplicate = await admin
      .from("partner_relationships")
      .insert({ sponsor_partner_id: sponsorId, partner_id: downlineId });
    check(
      "a partner cannot have two sponsors",
      Boolean(duplicate.error),
      "the duplicate insert unexpectedly succeeded",
    );

    const rewrite = await admin
      .from("partner_relationships")
      .update({ sponsor_partner_id: downlineId })
      .eq("partner_id", downlineId);
    check(
      "the sponsor edge cannot be rewritten",
      Boolean(rewrite.error),
      "the update unexpectedly succeeded",
    );

    const selfSponsor = await admin
      .from("partner_relationships")
      .insert({ sponsor_partner_id: downlineId, partner_id: downlineId });
    check(
      "self-sponsorship is rejected",
      Boolean(selfSponsor.error),
      "the insert unexpectedly succeeded",
    );

    // Left unconfirmed on purpose: a confirmed edge is intentionally permanent,
    // which would block the cascade cleanup below.
    const { error: removeEdge } = await admin
      .from("partner_relationships")
      .delete()
      .eq("partner_id", downlineId);
    check("cleanup: remove the test edge", !removeEdge, removeEdge?.message);
  } finally {
    section("Cleanup");

    // Reverse order: the downline partner is deleted before its sponsor.
    for (const id of [...created].reverse()) {
      const { error } = await admin.auth.admin.deleteUser(id);
      if (error) fail(`delete test user ${id}`, error.message);
      else pass(`deleted test user ${id}`);
    }

    if (schemaReady) {
      const { data: leftoverProfiles, error: leftoverError } = await admin
        .from("profiles")
        .select("email")
        .like("email", `${PREFIX}%`);
      check(
        "no test profiles were left behind",
        !leftoverError && (leftoverProfiles?.length ?? 0) === 0,
        leftoverError?.message ?? `${leftoverProfiles?.length ?? 0} leftover rows`,
      );
    }

    console.log(
      `\n${bold(`${passes} passed, ${failures} failed`)} ` +
        (failures > 0
          ? red("— live verification FAILED")
          : green("— live verification passed")),
    );
  }
}

main()
  .then(() => process.exit(failures > 0 ? 1 : 0))
  .catch((error) => {
    console.error(
      `\n${red("Live verification crashed:")} ${error?.message ?? error}`,
    );
    process.exit(1);
  });
