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
          payout_recipient: string | null;
          payout_details: string | null;
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
          payout_recipient?: string | null;
          payout_details?: string | null;
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
          payout_recipient?: string | null;
          payout_details?: string | null;
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
          agreement_accepted_at: string | null;
          agreement_version: string | null;
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
          agreement_accepted_at?: string | null;
          agreement_version?: string | null;
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
      payment_invoices: {
        Row: {
          id: string;
          public_ref: string;
          sku_id: string;
          product_ref: string;
          amount: string;
          expected_amount: string;
          ledger_currency: string;
          asset: string;
          network: string;
          treasury_address: string;
          memo: string;
          referral_code: string | null;
          buyer_email: string | null;
          buyer_name: string | null;
          buyer_company: string | null;
          billing_period_days: number | null;
          subscription_id: string | null;
          status: string;
          tx_hash: string | null;
          sale_id: string | null;
          confirmed_by: string | null;
          confirmed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          public_ref: string;
          sku_id: string;
          product_ref: string;
          amount: number | string;
          expected_amount: number | string;
          ledger_currency?: string;
          asset: string;
          network: string;
          treasury_address: string;
          memo: string;
          referral_code?: string | null;
          buyer_email?: string | null;
          buyer_name?: string | null;
          buyer_company?: string | null;
          billing_period_days?: number | null;
          subscription_id?: string | null;
          status?: string;
          tx_hash?: string | null;
          sale_id?: string | null;
          confirmed_by?: string | null;
          confirmed_at?: string | null;
        };
        Update: {
          status?: string;
          tx_hash?: string | null;
          sale_id?: string | null;
          subscription_id?: string | null;
          confirmed_by?: string | null;
          confirmed_at?: string | null;
          referral_code?: string | null;
          buyer_email?: string | null;
          buyer_name?: string | null;
          buyer_company?: string | null;
          billing_period_days?: number | null;
        };
        Relationships: [];
      };
      sales: {
        Row: {
          id: string;
          external_order_id: string;
          source: string;
          product_ref: string | null;
          partner_id: string;
          referral_code: string | null;
          amount: string;
          currency: string;
          status: string;
          paid_at: string;
          confirmed_at: string | null;
          locked_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          external_order_id: string;
          source: string;
          product_ref?: string | null;
          partner_id: string;
          referral_code?: string | null;
          amount: string;
          currency: string;
          status?: string;
          paid_at: string;
          confirmed_at?: string | null;
          locked_at?: string | null;
        };
        Update: {
          status?: string;
          confirmed_at?: string | null;
          locked_at?: string | null;
        };
        Relationships: [];
      };
      commission_entries: {
        Row: {
          id: string;
          sale_id: string;
          beneficiary_partner_id: string;
          level: number;
          commission_type: string;
          base_amount: string;
          rate: string;
          amount: string;
          currency: string;
          status: string;
          reverses_entry_id: string | null;
          review_status?: string;
          fraud_flags?: string[];
          created_at: string;
          updated_at: string;
          paid_at: string | null;
        };
        Insert: {
          sale_id: string;
          beneficiary_partner_id: string;
          level: number;
          commission_type: string;
          base_amount: string;
          rate: string;
          amount: string;
          currency: string;
          status: string;
          reverses_entry_id?: string | null;
          review_status?: string;
          fraud_flags?: string[];
        };
        Update: {
          status?: string;
          review_status?: string;
          fraud_flags?: string[];
          paid_at?: string | null;
        };
        Relationships: [];
      };
      payouts: {
        Row: {
          id: string;
          partner_id: string;
          status: string;
          currency: string;
          amount: string;
          tx_hash?: string | null;
          created_by: string;
          confirmed_by: string | null;
          created_at: string;
          updated_at: string;
          confirmed_at: string | null;
          paid_at: string | null;
        };
        Insert: {
          partner_id: string;
          status?: string;
          currency: string;
          amount: string;
          tx_hash?: string | null;
          created_by: string;
        };
        Update: {
          status?: string;
          amount?: string;
          tx_hash?: string | null;
          confirmed_by?: string | null;
          confirmed_at?: string | null;
          paid_at?: string | null;
        };
        Relationships: [];
      };
      partner_notifications: {
        Row: {
          id: string;
          partner_id: string;
          user_id: string | null;
          sale_id: string | null;
          payment_ref: string | null;
          product_ref: string | null;
          amount: number | string;
          currency: string;
          level: number;
          title: string;
          message: string;
          read_at: string | null;
          email_sent_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          partner_id: string;
          user_id?: string | null;
          sale_id?: string | null;
          payment_ref?: string | null;
          product_ref?: string | null;
          amount: number | string;
          currency?: string;
          level: number;
          title: string;
          message: string;
          read_at?: string | null;
          email_sent_at?: string | null;
          created_at?: string;
        };
        Update: {
          read_at?: string | null;
          email_sent_at?: string | null;
        };
        Relationships: [];
      };
      commission_fraud_reviews: {
        Row: {
          id: string;
          commission_entry_id: string;
          sale_id: string;
          beneficiary_partner_id: string;
          status: string;
          flags: string[];
          flag_details: Json;
          reviewed_by: string | null;
          reviewed_at: string | null;
          review_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          commission_entry_id: string;
          sale_id: string;
          beneficiary_partner_id: string;
          status?: string;
          flags?: string[];
          flag_details?: Json;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          review_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: string;
          flags?: string[];
          flag_details?: Json;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          review_notes?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      registration_device_logs: {
        Row: {
          id: string;
          referral_code: string;
          ip_hash: string;
          device_fingerprint: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          referral_code: string;
          ip_hash: string;
          device_fingerprint?: string | null;
          created_at?: string;
        };
        Update: {
          referral_code?: string;
          ip_hash?: string;
          device_fingerprint?: string | null;
        };
        Relationships: [];
      };
      payout_allocations: {
        Row: {
          id: string;
          payout_id: string;
          commission_entry_id: string;
          allocated_amount: string;
          created_at: string;
        };
        Insert: {
          payout_id: string;
          commission_entry_id: string;
          allocated_amount: string;
        };
        Update: {
          allocated_amount?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          email: string;
          sku: string;
          product: string;
          status: string;
          active_until: string;
          cancel_at_period_end: boolean;
          referral_code: string | null;
          partner_id: string | null;
          product_tenant_id: string | null;
          provisioning_status: string;
          provisioning_error: string | null;
          provisioning_attempts: number;
          provisioning_next_retry_at: string | null;
          product_access_suspended: boolean;
          last_provisioned_invoice_ref: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          email: string;
          sku: string;
          product: string;
          status?: string;
          active_until: string;
          cancel_at_period_end?: boolean;
          referral_code?: string | null;
          partner_id?: string | null;
        };
        Update: {
          status?: string;
          active_until?: string;
          cancel_at_period_end?: boolean;
          product_tenant_id?: string | null;
          provisioning_status?: string;
          provisioning_error?: string | null;
          provisioning_attempts?: number;
          provisioning_next_retry_at?: string | null;
          product_access_suspended?: boolean;
          last_provisioned_invoice_ref?: string | null;
        };
        Relationships: [];
      };
      subscription_provisioning_log: {
        Row: {
          id: string;
          subscription_id: string;
          invoice_ref: string;
          action: string;
          status: string;
          idempotency_key: string;
          response_snapshot: Json | null;
          error_message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          subscription_id: string;
          invoice_ref: string;
          action: string;
          status?: string;
          idempotency_key: string;
          response_snapshot?: Json | null;
        };
        Update: {
          status?: string;
          response_snapshot?: Json | null;
          error_message?: string | null;
        };
        Relationships: [];
      };
      provisioning_manual_queue: {
        Row: {
          id: string;
          subscription_id: string;
          invoice_ref: string | null;
          reason: string;
          resolved_at: string | null;
          resolved_by: string | null;
          created_at: string;
        };
        Insert: {
          subscription_id: string;
          invoice_ref?: string | null;
          reason: string;
        };
        Update: {
          resolved_at?: string | null;
          resolved_by?: string | null;
        };
        Relationships: [];
      };
      marketer_profiles: {
        Row: {
          id: string;
          subscription_id: string;
          business_name: string;
          business_description: string;
          website: string | null;
          niche: string | null;
          status: string;
          telegram_chat_id: string | null;
          pending_comment_post_id: string | null;
          instagram_business_account_id: string | null;
          instagram_page_access_token: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          subscription_id: string;
          business_name: string;
          business_description?: string;
          website?: string | null;
          niche?: string | null;
          status?: string;
          telegram_chat_id?: string | null;
          instagram_business_account_id?: string | null;
          instagram_page_access_token?: string | null;
        };
        Update: {
          business_name?: string;
          business_description?: string;
          website?: string | null;
          niche?: string | null;
          status?: string;
          telegram_chat_id?: string | null;
          pending_comment_post_id?: string | null;
          instagram_business_account_id?: string | null;
          instagram_page_access_token?: string | null;
        };
        Relationships: [];
      };
      marketer_strategy_versions: {
        Row: {
          id: string;
          profile_id: string;
          previous_version_id: string | null;
          research: Json;
          audience: Json;
          strategy: Json;
          content_plan: Json;
          insight_summary: string | null;
          based_on_insights: Json | null;
          model: string | null;
          created_at: string;
        };
        Insert: {
          profile_id: string;
          previous_version_id?: string | null;
          research?: Json;
          audience?: Json;
          strategy?: Json;
          content_plan?: Json;
          insight_summary?: string | null;
          based_on_insights?: Json | null;
          model?: string | null;
        };
        Update: {
          insight_summary?: string | null;
          based_on_insights?: Json | null;
        };
        Relationships: [];
      };
      marketer_posts: {
        Row: {
          id: string;
          profile_id: string;
          strategy_version_id: string | null;
          kind: string;
          topic: string;
          caption: string | null;
          script: string | null;
          image_prompt: string | null;
          image_url: string | null;
          image_status: string;
          status: string;
          version: number;
          parent_post_id: string | null;
          reviewer_comment: string | null;
          telegram_chat_id: string | null;
          telegram_message_id: string | null;
          scheduled_at: string | null;
          instagram_media_id: string | null;
          published_at: string | null;
          publish_error: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          profile_id: string;
          strategy_version_id?: string | null;
          kind?: string;
          topic?: string;
          caption?: string | null;
          script?: string | null;
          image_prompt?: string | null;
          image_url?: string | null;
          image_status?: string;
          status?: string;
          version?: number;
          parent_post_id?: string | null;
          reviewer_comment?: string | null;
          telegram_chat_id?: string | null;
          telegram_message_id?: string | null;
          scheduled_at?: string | null;
          instagram_media_id?: string | null;
          published_at?: string | null;
          publish_error?: string | null;
        };
        Update: {
          caption?: string | null;
          script?: string | null;
          image_prompt?: string | null;
          image_url?: string | null;
          image_status?: string;
          status?: string;
          version?: number;
          reviewer_comment?: string | null;
          telegram_chat_id?: string | null;
          telegram_message_id?: string | null;
          scheduled_at?: string | null;
          instagram_media_id?: string | null;
          published_at?: string | null;
          publish_error?: string | null;
        };
        Relationships: [];
      };
      marketer_post_insights: {
        Row: {
          id: string;
          post_id: string;
          impressions: number | null;
          reach: number | null;
          likes: number | null;
          comments: number | null;
          saves: number | null;
          shares: number | null;
          raw: Json;
          fetched_at: string;
        };
        Insert: {
          post_id: string;
          impressions?: number | null;
          reach?: number | null;
          likes?: number | null;
          comments?: number | null;
          saves?: number | null;
          shares?: number | null;
          raw?: Json;
        };
        Update: {
          impressions?: number | null;
          reach?: number | null;
          likes?: number | null;
          comments?: number | null;
          saves?: number | null;
          shares?: number | null;
          raw?: Json;
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
      /**
       * Ledger rollup for the calling partner. Amounts are text from numeric
       * columns. An empty ledger is zeros; mixed currencies are separate rows.
       */
      partner_ledger_stats: {
        Args: Record<string, never>;
        Returns: {
          qualifying_sales: number;
          commission_net: string;
          currency: string | null;
          payable_amount: string;
          paid_amount: string;
          entry_count: number;
        }[];
      };
      record_sale: {
        Args: {
          p_source: string;
          p_external_order_id: string;
          p_product_ref: string;
          p_amount: number;
          p_currency: string;
          p_paid_at: string;
          p_referral_code?: string;
          p_partner_id?: string;
        };
        Returns: string;
      };
      qualify_sale: {
        Args: { p_sale_id: string };
        Returns: string;
      };
      post_commission_entries: {
        Args: { p_sale_id: string };
        Returns: number;
      };
      reverse_sale_commissions: {
        Args: { p_sale_id: string; p_reason: string };
        Returns: number;
      };
      /**
       * Confirms one treasury invoice. Idempotent for the same invoice or tx
       * hash. Renewals extend the subscription and post with the frozen code.
       */
      fulfill_paid_invoice: {
        Args: {
          p_invoice_id: string;
          p_tx_hash: string;
          p_paid_at: string;
          p_confirmed_by: string;
          p_referral_code?: string;
          p_partner_id?: string;
        };
        Returns: Json;
      };
      advance_sponsor_lock: {
        Args: { p_sale_id?: string };
        Returns: number;
      };
      create_payout: {
        Args: {
          p_partner_id: string;
          p_currency: string;
          p_created_by: string;
        };
        Returns: string;
      };
      confirm_payout: {
        Args: { p_payout_id: string; p_confirmed_by: string };
        Returns: string;
      };
      request_partner_payout: {
        Args: { p_currency: string; p_requested_by: string };
        Returns: string;
      };
      /** Partner Commission Model v2: aggregate L1–L5 pool cap (0.80). */
      partner_pool_cap: {
        Args: Record<string, never>;
        Returns: number;
      };
      /** AI Mark retained share of commissionable amount (0.20). Not net profit. */
      ai_mark_retained_share: {
        Args: Record<string, never>;
        Returns: number;
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
export type SaleRow = Database["public"]["Tables"]["sales"]["Row"];
export type CommissionEntryRow =
  Database["public"]["Tables"]["commission_entries"]["Row"];
export type PayoutRow = Database["public"]["Tables"]["payouts"]["Row"];
export type PaymentInvoiceRow =
  Database["public"]["Tables"]["payment_invoices"]["Row"];
