/**
 * Database types for the Phase 4A + 4B schema.
 *
 * Hand-written to mirror `supabase/migrations/*` exactly, because the Supabase
 * CLI cannot reach a project from this environment. When the project exists,
 * replace this file with the real generator so it can never drift:
 *
 *   npx supabase gen types typescript --project-id <ref> --schema public \
 *     > lib/supabase/database.types.ts
 *
 * The shape follows Supabase's codegen conventions (`Tables` / `Views` /
 * `Functions` / `Enums` / `CompositeTypes`) so it is a drop-in replacement.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AppRole = "partner" | "admin";

export type PartnerStatus =
  | "partner"
  | "growth"
  | "regional"
  | "strategic"
  | "suspended";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          phone: string | null;
          country: string | null;
          region: string | null;
          language: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          phone?: string | null;
          country?: string | null;
          region?: string | null;
          language?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string | null;
          phone?: string | null;
          country?: string | null;
          region?: string | null;
          language?: string;
          avatar_url?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      partner_profiles: {
        Row: {
          id: string;
          user_id: string;
          partner_id: string;
          referral_code: string;
          sponsor_partner_id: string | null;
          status: PartnerStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          partner_id: string;
          referral_code: string;
          status?: PartnerStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: PartnerStatus;
          updated_at?: string;
        };
        Relationships: [];
      };
      partner_relationships: {
        Row: {
          id: string;
          sponsor_partner_id: string;
          partner_id: string;
          /** Phase 4B: how the edge was decided (referral_link/operator/import). */
          attribution_source: string | null;
          /** Phase 4B: the referral code that produced a referral_link edge. */
          attribution_code: string | null;
          confirmed_at: string | null;
          locked_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          sponsor_partner_id: string;
          partner_id: string;
          attribution_source?: string | null;
          attribution_code?: string | null;
          confirmed_at?: string | null;
          locked_at?: string | null;
          created_at?: string;
        };
        Update: {
          confirmed_at?: string | null;
          locked_at?: string | null;
        };
        Relationships: [];
      };
      partner_status_history: {
        Row: {
          id: string;
          partner_id: string;
          old_status: PartnerStatus | null;
          new_status: PartnerStatus;
          reason: string | null;
          created_at: string;
          changed_by: string | null;
        };
        Insert: {
          id?: string;
          partner_id: string;
          old_status?: PartnerStatus | null;
          new_status: PartnerStatus;
          reason?: string | null;
          created_at?: string;
          changed_by?: string | null;
        };
        Update: {
          reason?: string | null;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: AppRole;
          granted_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: AppRole;
          granted_by?: string | null;
          created_at?: string;
        };
        Update: {
          role?: AppRole;
          granted_by?: string | null;
        };
        Relationships: [];
      };
      /**
       * Phase 4B. One row per tracked `/go/<code>` visit. Written by the server
       * only: RLS grants `authenticated` SELECT on its own rows and no write
       * policy exists at all. No IP address or user agent is stored.
       */
      referral_clicks: {
        Row: {
          id: string;
          partner_id: string;
          referral_code: string;
          landing_path: string;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          partner_id: string;
          referral_code: string;
          landing_path?: string;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          created_at?: string;
        };
        Update: {
          landing_path?: string;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
        };
        Relationships: [];
      };
      /**
       * Phase 4B. Contact submissions from `/api/contact`, attributed to the
       * visitor's signed referral cookie when one is valid. Written by the
       * server only — the email/webhook delivery path is unchanged.
       */
      leads: {
        Row: {
          id: string;
          partner_id: string | null;
          referral_code: string | null;
          referral_source: "direct" | "referral";
          referral_click_id: string | null;
          name: string;
          email: string;
          messenger: string;
          company: string;
          scenario: string;
          message: string | null;
          landing_path: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          partner_id?: string | null;
          referral_code?: string | null;
          referral_source?: "direct" | "referral";
          referral_click_id?: string | null;
          name: string;
          email: string;
          messenger: string;
          company: string;
          scenario: string;
          message?: string | null;
          landing_path?: string | null;
          created_at?: string;
        };
        Update: {
          partner_id?: string | null;
          referral_code?: string | null;
          referral_click_id?: string | null;
          message?: string | null;
          landing_path?: string | null;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
      current_partner_id: { Args: Record<string, never>; Returns: string | null };
      /**
       * Server-only (service_role). Creates the sponsor edge for a new partner
       * from a referral code. Returns a status string, never throws for a
       * hostile input: attributed | already_attributed | invalid_code |
       * self_referral | no_target | stale_target | invalid_click.
       */
      attribute_partner_signup: {
        Args: {
          p_partner_user_id: string;
          p_referral_code: string;
          p_click_id?: string | null;
        };
        Returns: string;
      };
      /** Counts-only rollup for the calling partner (never a row-level view). */
      partner_referral_stats: {
        Args: Record<string, never>;
        Returns: {
          clicks: number;
          leads: number;
          partner_signups: number;
        }[];
      };
    };
    Enums: {
      app_role: AppRole;
      partner_status: PartnerStatus;
    };
    CompositeTypes: { [_ in never]: never };
  };
};

export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export type PartnerProfileRow =
  Database["public"]["Tables"]["partner_profiles"]["Row"];
export type PartnerRelationshipRow =
  Database["public"]["Tables"]["partner_relationships"]["Row"];
export type PartnerStatusHistoryRow =
  Database["public"]["Tables"]["partner_status_history"]["Row"];
export type UserRoleRow = Database["public"]["Tables"]["user_roles"]["Row"];
export type ReferralClickRow =
  Database["public"]["Tables"]["referral_clicks"]["Row"];
export type LeadRow = Database["public"]["Tables"]["leads"]["Row"];
