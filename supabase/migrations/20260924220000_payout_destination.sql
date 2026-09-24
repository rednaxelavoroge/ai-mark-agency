-- Payout destination on the partner's own profile.
--
-- The partner types where a payout should be sent. This is not a KYC record
-- and not an account at a payment provider. Nothing here moves money.
--
-- profiles is already editable by the account owner (profiles_update_own_or_admin).
-- These columns ride that policy. No new write policy is added. partner_profiles,
-- sales, commission_entries, payouts and payout_allocations stay as they are:
-- a partner still cannot write the ledger or their platform-owned partner row.
-- create_payout and confirm_payout are unchanged.

alter table public.profiles
  add column if not exists payout_recipient text;

alter table public.profiles
  add column if not exists payout_details text;

do $$
begin
  if not exists (
    select 1
      from pg_constraint
     where conname = 'profiles_payout_recipient_len'
       and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_payout_recipient_len
      check (
        payout_recipient is null
        or char_length(btrim(payout_recipient)) between 1 and 120
      );
  end if;

  if not exists (
    select 1
      from pg_constraint
     where conname = 'profiles_payout_details_len'
       and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_payout_details_len
      check (
        payout_details is null
        or char_length(btrim(payout_details)) between 1 and 2000
      );
  end if;
end
$$;

comment on column public.profiles.payout_recipient is
  'Name the partner asks to be paid to. Free text the partner typed. Not verified.';

comment on column public.profiles.payout_details is
  'Where to send a payout: bank, account, wallet or other instructions the partner typed. Not a payment provider.';

-- The payable queue reads status = payable. The existing beneficiary index
-- leads with partner id; this one matches the admin scan.
create index if not exists commission_entries_payable_idx
  on public.commission_entries (created_at, beneficiary_partner_id, currency)
  where status = 'payable';
