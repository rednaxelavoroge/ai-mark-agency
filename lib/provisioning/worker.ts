import "server-only";

import { sendEmail, adminNotifyEmail, emailShell } from "@/lib/email/send";
import { buyerOnboardingEmail } from "@/lib/email/buyer";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  idempotencyKey,
  provisioningFetch,
  type TenantCreateBody,
} from "./client";
import {
  MAX_PROVISIONING_ATTEMPTS,
  provisioningBackoffMinutes,
  provisioningConfigForProduct,
} from "./config";

type SubscriptionRow = {
  id: string;
  email: string;
  sku: string;
  product: string;
  status: string;
  active_until: string;
  referral_code: string | null;
  product_tenant_id: string | null;
  provisioning_status: string;
  provisioning_attempts: number;
  product_access_suspended: boolean;
};

export type ProvisioningEnqueueInput = {
  subscriptionId: string;
  invoiceRef: string;
  /** First paid invoice for this subscription vs renewal. */
  mode: "initial" | "renewal";
};

export async function enqueueSubscriptionProvisioning(
  input: ProvisioningEnqueueInput,
): Promise<void> {
  const admin = createSupabaseAdminClient();
  const config = await loadSubscription(admin, input.subscriptionId);
  if (!config) return;

  const productConfig = provisioningConfigForProduct(config.product);
  if (!productConfig) {
    await markManual(admin, config, input.invoiceRef, "provisioning URL not configured");
    return;
  }

  await admin
    .from("subscriptions")
    .update({
      provisioning_status: "pending",
      provisioning_next_retry_at: new Date().toISOString(),
      last_provisioned_invoice_ref: input.invoiceRef,
    })
    .eq("id", input.subscriptionId);

  if (input.mode === "renewal" && config.product_tenant_id) {
    await ensureLogRow(admin, {
      subscriptionId: input.subscriptionId,
      invoiceRef: input.invoiceRef,
      action: "resume",
      idempotencyKey: idempotencyKey(input.invoiceRef, "resume"),
    });
  } else {
    await ensureLogRow(admin, {
      subscriptionId: input.subscriptionId,
      invoiceRef: input.invoiceRef,
      action: "create",
      idempotencyKey: idempotencyKey(input.invoiceRef, "create"),
    });
    await ensureLogRow(admin, {
      subscriptionId: input.subscriptionId,
      invoiceRef: input.invoiceRef,
      action: "magic_link",
      idempotencyKey: idempotencyKey(input.invoiceRef, "magic_link"),
    });
  }
}

export async function runProvisioningBatch(limit = 12): Promise<{
  processed: number;
  errors: number;
}> {
  const admin = createSupabaseAdminClient();
  const now = new Date().toISOString();
  const subs = await admin
    .from("subscriptions")
    .select(
      "id, email, sku, product, status, active_until, referral_code, product_tenant_id, provisioning_status, provisioning_attempts, product_access_suspended",
    )
    .in("provisioning_status", ["pending", "failed"])
    .or(`provisioning_next_retry_at.is.null,provisioning_next_retry_at.lte.${now}`)
    .order("provisioning_next_retry_at", { ascending: true, nullsFirst: true })
    .limit(limit);

  if (subs.error || !subs.data?.length) {
    return { processed: 0, errors: 0 };
  }

  let processed = 0;
  let errors = 0;
  for (const row of subs.data as SubscriptionRow[]) {
    const ok = await processSubscription(admin, row);
    processed += 1;
    if (!ok) errors += 1;
  }

  await processExpirySuspensions(admin, limit);
  return { processed, errors };
}

async function processExpirySuspensions(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  limit: number,
): Promise<void> {
  const now = new Date().toISOString();
  const expired = await admin
    .from("subscriptions")
    .select(
      "id, email, sku, product, status, active_until, referral_code, product_tenant_id, provisioning_status, provisioning_attempts, product_access_suspended",
    )
    .eq("status", "active")
    .lt("active_until", now)
    .eq("product_access_suspended", false)
    .not("product_tenant_id", "is", null)
    .limit(limit);

  for (const row of (expired.data ?? []) as SubscriptionRow[]) {
    await admin
      .from("subscriptions")
      .update({ status: "past_due" })
      .eq("id", row.id);
    const ref = `expiry-${row.id}`;
    await ensureLogRow(admin, {
      subscriptionId: row.id,
      invoiceRef: ref,
      action: "suspend",
      idempotencyKey: idempotencyKey(ref, "suspend"),
    });
    await processSubscription(admin, {
      ...row,
      provisioning_status: "pending",
    });
  }
}

async function processSubscription(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  sub: SubscriptionRow,
): Promise<boolean> {
  const config = provisioningConfigForProduct(sub.product);
  if (!config) {
    await markManual(admin, sub, sub.id, "provisioning URL not configured");
    return false;
  }

  const pendingLogs = await admin
    .from("subscription_provisioning_log")
    .select("id, action, status, idempotency_key, invoice_ref")
    .eq("subscription_id", sub.id)
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  const logs = pendingLogs.data ?? [];
  if (!logs.length) {
    if (sub.provisioning_status === "pending" || sub.provisioning_status === "failed") {
      await admin
        .from("subscriptions")
        .update({ provisioning_status: "active" })
        .eq("id", sub.id);
    }
    return true;
  }

  await admin
    .from("subscriptions")
    .update({ provisioning_status: "provisioning" })
    .eq("id", sub.id);

  let tenantId = sub.product_tenant_id;

  for (const log of logs) {
    const invoiceRef = log.invoice_ref as string;
    if (log.action === "create") {
      const body: TenantCreateBody = {
        email: sub.email,
        plan: sub.sku,
        invoice_no: invoiceRef,
        partner_code: sub.referral_code,
      };
      const created = await provisioningFetch<{ tenant_id?: string }>(
        config.baseUrl,
        config.secret,
        "/tenants",
        {
          method: "POST",
          idempotencyKey: log.idempotency_key as string,
          body,
        },
      );
      if (!created.ok) {
        await failStep(admin, sub, created.error);
        return false;
      }
      tenantId = created.data?.tenant_id ?? tenantId;
      if (!tenantId) {
        await failStep(admin, sub, "tenant_id missing in response");
        return false;
      }
      await admin
        .from("subscriptions")
        .update({ product_tenant_id: tenantId })
        .eq("id", sub.id);
      await admin
        .from("subscription_provisioning_log")
        .update({ status: "succeeded", response_snapshot: created.data })
        .eq("id", log.id);
    } else if (log.action === "magic_link" && tenantId) {
      const link = await provisioningFetch<{ url?: string }>(
        config.baseUrl,
        config.secret,
        `/tenants/${encodeURIComponent(tenantId)}/magic-link`,
        {
          method: "POST",
          idempotencyKey: log.idempotency_key as string,
          body: {},
        },
      );
      if (!link.ok) {
        await failStep(admin, sub, link.error);
        return false;
      }
      const url = link.data?.url;
      if (url) {
        const localeRow = await admin
          .from("profiles")
          .select("language")
          .eq("email", sub.email)
          .maybeSingle();
        const mail = buyerOnboardingEmail({
          locale: localeRow.data?.language ?? "en",
          productRef: sub.product,
          magicUrl: url,
        });
        await sendEmail({ to: sub.email, subject: mail.subject, html: mail.html });
      }
      await admin
        .from("subscription_provisioning_log")
        .update({ status: "succeeded", response_snapshot: link.data })
        .eq("id", log.id);
    } else if (log.action === "suspend" && tenantId) {
      const suspended = await provisioningFetch<Record<string, unknown>>(
        config.baseUrl,
        config.secret,
        `/tenants/${encodeURIComponent(tenantId)}/suspend`,
        {
          method: "POST",
          idempotencyKey: log.idempotency_key as string,
          body: {},
        },
      );
      if (!suspended.ok) {
        await failStep(admin, sub, suspended.error);
        return false;
      }
      await admin
        .from("subscriptions")
        .update({ product_access_suspended: true })
        .eq("id", sub.id);
      await admin
        .from("subscription_provisioning_log")
        .update({ status: "succeeded" })
        .eq("id", log.id);
    } else if (log.action === "resume" && tenantId) {
      const resumed = await provisioningFetch<Record<string, unknown>>(
        config.baseUrl,
        config.secret,
        `/tenants/${encodeURIComponent(tenantId)}/resume`,
        {
          method: "POST",
          idempotencyKey: log.idempotency_key as string,
          body: {},
        },
      );
      if (!resumed.ok) {
        await failStep(admin, sub, resumed.error);
        return false;
      }
      await admin
        .from("subscriptions")
        .update({
          product_access_suspended: false,
          status: "active",
        })
        .eq("id", sub.id);
      await admin
        .from("subscription_provisioning_log")
        .update({ status: "succeeded" })
        .eq("id", log.id);
    }
  }

  await admin
    .from("subscriptions")
    .update({
      provisioning_status: "active",
      provisioning_error: null,
      provisioning_attempts: 0,
      provisioning_next_retry_at: null,
      status: "active",
    })
    .eq("id", sub.id);

  return true;
}

async function failStep(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  sub: SubscriptionRow,
  error: string,
): Promise<void> {
  const attempts = (sub.provisioning_attempts ?? 0) + 1;
  const exhausted = attempts >= MAX_PROVISIONING_ATTEMPTS;
  const next = exhausted
    ? null
    : new Date(
        Date.now() + provisioningBackoffMinutes(attempts) * 60_000,
      ).toISOString();

  await admin
    .from("subscriptions")
    .update({
      provisioning_status: exhausted ? "manual" : "failed",
      provisioning_error: error.slice(0, 500),
      provisioning_attempts: attempts,
      provisioning_next_retry_at: next,
    })
    .eq("id", sub.id);

  if (exhausted) {
    await markManual(admin, sub, sub.id, error);
  }
}

async function markManual(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  sub: SubscriptionRow | { id: string; email: string; sku: string; product: string },
  invoiceRef: string,
  reason: string,
): Promise<void> {
  await admin
    .from("subscriptions")
    .update({
      provisioning_status: "manual",
      provisioning_error: reason.slice(0, 500),
    })
    .eq("id", sub.id);

  await admin.from("provisioning_manual_queue").insert({
    subscription_id: sub.id,
    invoice_ref: invoiceRef,
    reason: reason.slice(0, 500),
  });

  const adminEmail = adminNotifyEmail();
  if (adminEmail) {
    await sendEmail({
      to: adminEmail,
      subject: `[AI MARK] Manual activation: ${sub.email} · ${sub.sku}`,
      html: emailShell(
        `<p>Subscription <strong>${sub.id}</strong> needs manual activation.</p>
<p>Buyer: ${sub.email}<br/>SKU: ${sub.sku}<br/>Product: ${sub.product}</p>
<p>${reason}</p>
<p>Open the admin provisioning queue.</p>`,
      ),
    });
  }
}

async function loadSubscription(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  id: string,
): Promise<SubscriptionRow | null> {
  const result = await admin
    .from("subscriptions")
    .select(
      "id, email, sku, product, status, active_until, referral_code, product_tenant_id, provisioning_status, provisioning_attempts, product_access_suspended",
    )
    .eq("id", id)
    .maybeSingle();
  return (result.data as SubscriptionRow | null) ?? null;
}

async function ensureLogRow(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  input: {
    subscriptionId: string;
    invoiceRef: string;
    action: string;
    idempotencyKey: string;
  },
): Promise<void> {
  await admin.from("subscription_provisioning_log").upsert(
    {
      subscription_id: input.subscriptionId,
      invoice_ref: input.invoiceRef,
      action: input.action,
      status: "pending",
      idempotency_key: input.idempotencyKey,
    },
    { onConflict: "idempotency_key", ignoreDuplicates: true },
  );
}
