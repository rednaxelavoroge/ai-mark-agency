/**
 * Application roles.
 *
 * Authorization is data (`public.user_roles`), never a constant: nothing here
 * decides who is an admin, it only names the roles the database can grant.
 * Server-side checks live in `lib/auth/dal.ts`.
 */

export const APP_ROLES = ["partner", "admin"] as const;

export type AppRole = (typeof APP_ROLES)[number];

export function isAppRole(value: string): value is AppRole {
  return (APP_ROLES as readonly string[]).includes(value);
}

/** Human-readable labels for the partner lifecycle status. */
export const PARTNER_STATUS_LABELS: Record<string, string> = {
  partner: "Partner",
  growth: "Growth",
  regional: "Regional",
  strategic: "Strategic",
  suspended: "Suspended",
};

/**
 * Statuses a partner may still operate from. A suspended partner keeps read
 * access to their own record but is flagged in the UI.
 */
export const OPERATIONAL_PARTNER_STATUSES = [
  "partner",
  "growth",
  "regional",
  "strategic",
] as const;
