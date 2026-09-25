-- Allow treasury invoices on BNB Chain and TON.
-- Does not change Phase 4C rates, lock window, RPCs, Auth, or RLS policies.

alter table public.payment_invoices
  drop constraint if exists payment_invoices_network_valid;

alter table public.payment_invoices
  add constraint payment_invoices_network_valid check (
    network in ('tron', 'ethereum', 'polygon', 'solana', 'bnb', 'ton')
  );
