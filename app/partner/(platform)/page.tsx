import { redirect } from "next/navigation";
import { requirePartner } from "@/lib/auth/dal";

/**
 * `/partner` is a real route: it authorises first, then hands over to the
 * dashboard, so the platform has one canonical entry point.
 */
export default async function PartnerIndexPage() {
  await requirePartner("/partner");
  redirect("/partner/dashboard");
}
