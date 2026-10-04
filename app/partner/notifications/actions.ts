"use server";

import { revalidatePath } from "next/cache";
import { requirePartner } from "@/lib/auth/dal";
import { markPartnerNotificationRead } from "@/lib/partner/notifications";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function markNotificationReadAction(formData: FormData): Promise<void> {
  await requirePartner("/partner/dashboard");
  const notificationId = String(formData.get("notification_id") ?? "");
  if (!notificationId) return;

  await markPartnerNotificationRead(notificationId);
  revalidatePath("/partner/dashboard");
}

export async function markAllNotificationsReadAction(): Promise<void> {
  const { partner } = await requirePartner("/partner/dashboard");
  try {
    const admin = createSupabaseAdminClient();
    await admin
      .from("partner_notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("partner_id", partner.partner_id)
      .is("read_at", null);
  } catch {
    // Graceful fallback
  }
  revalidatePath("/partner/dashboard");
}
