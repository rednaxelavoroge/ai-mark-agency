-- Treasury invoices: customer pays USDT/USDC to AI MARK addresses.
--
-- This is not a custodial merchant. Funds never sit in NOWPayments, BitPay
-- or Coinbase Commerce. The row records an instruction (our address, asset,
-- network, unique amount + memo) so an operator can match an on-chain
-- transfer and then call the existing Phase 4C RPCs.
--
-- Clients do not write sales, commissions or payouts. This table is written
-- only by service_role. authenticated may SELECT when is_admin(). There is
-- no write policy. Phase 4A/4B/4C tables, rates, lock window and RPCs are
-- unchanged.

create table public.payment_invoices (
  id uuid primary key default gen_random_uuid(),
  public_ref text not null,
  sku_id text not null,
  product_ref text not null,
  amount numeric(20, 2) not null,
  expected_amount numeric(20, 2) not null,
  ledger_currency text not null default 'USD',
  asset text not null,
  network text not null,
  treasury_address text not null,
  memo text not null,
  referral_code text,
  status text not null default 'awaiting',
  tx_hash text,
  sale_id uuid references public.sales (id) on delete restrict,
  confirmed_by uuid,
  confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint payment_invoices_ref_format check (
    public_ref ~ '^aim[a-z0-9]{8}$'
  ),
  constraint payment_invoices_ref_unique unique (public_ref),
  constraint payment_invoices_sku_len check (
    char_length(sku_id) between 1 and 64
  ),
  constraint payment_invoices_product_ref_len check (
    char_length(product_ref) between 1 and 200
  ),
  constraint payment_invoices_amount_positive check (amount > 0),
  constraint payment_invoices_expected_positive check (expected_amount > 0),
  constraint payment_invoices_currency_format check (
    ledger_currency ~ '^[A-Z]{3}$'
  ),
  constraint payment_invoices_asset_valid check (asset in ('USDT', 'USDC')),
  constraint payment_invoices_network_valid check (
    network in ('tron', 'ethereum', 'polygon', 'solana')
  ),
  constraint payment_invoices_address_len check (
    char_length(btrim(treasury_address)) between 8 and 128
  ),
  constraint payment_invoices_memo_len check (
    char_length(memo) between 1 and 64
  ),
  constraint payment_invoices_referral_format check (
    referral_code is null
    or referral_code ~ '^[a-z0-9][a-z0-9_-]{3,31}$'
  ),
  constraint payment_invoices_status_valid check (
    status in ('awaiting', 'confirmed', 'cancelled')
  ),
  constraint payment_invoices_tx_len check (
    tx_hash is null or char_length(btrim(tx_hash)) between 8 and 128
  ),
  constraint payment_invoices_confirmed_shape check (
    (status = 'confirmed' and tx_hash is not null and confirmed_at is not null)
    or (status <> 'confirmed')
  )
);

create unique index payment_invoices_open_amount_uq
  on public.payment_invoices (asset, network, expected_amount)
  where status = 'awaiting';

create unique index payment_invoices_tx_hash_uq
  on public.payment_invoices (tx_hash)
  where tx_hash is not null;

create index payment_invoices_status_idx
  on public.payment_invoices (status, created_at desc);

comment on table public.payment_invoices is
  'Payment instruction to an AI MARK treasury address. Not a custodial merchant balance. Client sessions cannot write this table.';

drop trigger if exists payment_invoices_set_updated_at on public.payment_invoices;
create trigger payment_invoices_set_updated_at
before update on public.payment_invoices
for each row execute function public.set_updated_at();

alter table public.payment_invoices enable row level security;

drop policy if exists payment_invoices_select_admin on public.payment_invoices;
create policy payment_invoices_select_admin
  on public.payment_invoices for select to authenticated
  using (public.is_admin());

do $$
declare
  role_name text;
begin
  execute 'revoke all on table public.payment_invoices from public';

  foreach role_name in array array['anon', 'authenticated'] loop
    if exists (select 1 from pg_roles where rolname = role_name) then
      execute format(
        'revoke all on table public.payment_invoices from %I',
        role_name
      );
    end if;
  end loop;

  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    execute 'grant select on table public.payment_invoices to authenticated';
  end if;

  if exists (select 1 from pg_roles where rolname = 'service_role') then
    execute 'grant select, insert, update, delete on table public.payment_invoices to service_role';
  end if;
end
$$;
