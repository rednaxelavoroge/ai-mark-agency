-- Phase 4D / Stage 1 · Partner Notifications, Anti-Fraud and Payout Extensions
-- Idempotent migration with Row Level Security (RLS).
-- Do NOT auto-apply: manual execution by database owner.

-- 1. In-cabinet partner notifications table
create table if not exists public.partner_notifications (
  id uuid primary key default gen_random_uuid(),
  partner_id text not null references public.partner_profiles (partner_id) on delete cascade,
  user_id uuid references auth.users (id) on delete cascade,
  sale_id uuid references public.sales (id) on delete cascade,
  payment_ref text,
  product_ref text,
  amount numeric(20, 2) not null,
  currency text not null default 'USD',
  level smallint not null check (level between 1 and 5),
  title text not null,
  message text not null,
  read_at timestamptz,
  email_sent_at timestamptz,
  created_at timestamptz not null default now(),
  constraint partner_notifications_idempotency unique (sale_id, partner_id, level)
);

create index if not exists partner_notifications_partner_idx
  on public.partner_notifications (partner_id, created_at desc);

create index if not exists partner_notifications_user_unread_idx
  on public.partner_notifications (user_id, read_at)
  where read_at is null;

comment on table public.partner_notifications is
  'In-cabinet partner feed for client payments, commission records and status notices. Idempotent per sale and level.';

-- RLS for partner_notifications
alter table public.partner_notifications enable row level security;

drop policy if exists partner_notifications_select_own_or_admin on public.partner_notifications;
create policy partner_notifications_select_own_or_admin
  on public.partner_notifications for select to authenticated
  using (
    user_id = (select auth.uid())
    or exists (
      select 1 from public.user_roles r
       where r.user_id = (select auth.uid())
         and r.role = 'admin'
    )
  );

drop policy if exists partner_notifications_update_own on public.partner_notifications;
create policy partner_notifications_update_own
  on public.partner_notifications for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

drop policy if exists partner_notifications_admin_all on public.partner_notifications;
create policy partner_notifications_admin_all
  on public.partner_notifications for all to authenticated
  using (
    exists (
      select 1 from public.user_roles r
       where r.user_id = (select auth.uid())
         and r.role = 'admin'
    )
  );


-- 2. Anti-fraud review records
create table if not exists public.commission_fraud_reviews (
  id uuid primary key default gen_random_uuid(),
  commission_entry_id uuid not null references public.commission_entries (id) on delete cascade,
  sale_id uuid not null references public.sales (id) on delete cascade,
  beneficiary_partner_id text not null references public.partner_profiles (partner_id) on delete cascade,
  status text not null default 'under_review' check (status in ('under_review', 'approved', 'rejected')),
  flags text[] not null default '{}',
  flag_details jsonb not null default '{}'::jsonb,
  reviewed_by uuid references auth.users (id),
  reviewed_at timestamptz,
  review_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint commission_fraud_reviews_entry_unique unique (commission_entry_id)
);

create index if not exists commission_fraud_reviews_partner_idx
  on public.commission_fraud_reviews (beneficiary_partner_id, status);

create index if not exists commission_fraud_reviews_status_idx
  on public.commission_fraud_reviews (status);

comment on table public.commission_fraud_reviews is
  'Rule-based anti-fraud audit records. Flagged commissions hold under_review status until admin approval.';

-- RLS for commission_fraud_reviews
alter table public.commission_fraud_reviews enable row level security;

drop policy if exists commission_fraud_reviews_select_own_or_admin on public.commission_fraud_reviews;
create policy commission_fraud_reviews_select_own_or_admin
  on public.commission_fraud_reviews for select to authenticated
  using (
    beneficiary_partner_id in (
      select p.partner_id from public.partner_profiles p
       where p.user_id = (select auth.uid())
    )
    or exists (
      select 1 from public.user_roles r
       where r.user_id = (select auth.uid())
         and r.role = 'admin'
    )
  );

drop policy if exists commission_fraud_reviews_admin_all on public.commission_fraud_reviews;
create policy commission_fraud_reviews_admin_all
  on public.commission_fraud_reviews for all to authenticated
  using (
    exists (
      select 1 from public.user_roles r
       where r.user_id = (select auth.uid())
         and r.role = 'admin'
    )
  );


-- 3. Registration device & IP logs (anti-sybil velocity guard)
create table if not exists public.registration_device_logs (
  id uuid primary key default gen_random_uuid(),
  referral_code text not null,
  ip_hash text not null,
  device_fingerprint text,
  created_at timestamptz not null default now()
);

create index if not exists registration_device_logs_rate_idx
  on public.registration_device_logs (referral_code, ip_hash, created_at desc);

comment on table public.registration_device_logs is
  'Tracks registration velocity per referral link and IP hash to catch burst bot attacks (>5/hour).';

alter table public.registration_device_logs enable row level security;

drop policy if exists registration_device_logs_admin_read on public.registration_device_logs;
create policy registration_device_logs_admin_read
  on public.registration_device_logs for select to authenticated
  using (
    exists (
      select 1 from public.user_roles r
       where r.user_id = (select auth.uid())
         and r.role = 'admin'
    )
  );


-- 4. Alterations to existing tables (backward compatible, idempotent)
alter table public.payouts add column if not exists tx_hash text;
comment on column public.payouts.tx_hash is
  'On-chain transaction hash for completed USDT/USDC payout transfer.';

alter table public.commission_entries add column if not exists review_status text default 'approved';
comment on column public.commission_entries.review_status is
  'Anti-fraud review status: approved, under_review, rejected.';

alter table public.commission_entries add column if not exists fraud_flags text[] default '{}';
comment on column public.commission_entries.fraud_flags is
  'Array of triggered anti-fraud rule codes.';
