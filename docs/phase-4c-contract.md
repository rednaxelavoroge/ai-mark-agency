---
cursor:
  subagentId: "bc-46af4e1a-2774-50e9-917d-c39adaf85757"
---

# Phase 4C contract

STATUS = APPROVED

Числа ниже фиксированы. Движок читает ставки из `commission_rules`, а не из кода интерфейса.

## Qualifying sale

Qualifying sale — фактически оплаченная клиентом продажа или invoice. Commissionable amount — полученная сумма. Себестоимость, зарплаты, AI/API и инфраструктуру не вычитать. Исключить VAT и sales tax, refund и chargeback. Отменённый или неуспешный платёж не является sale.

`referral_clicks` и `leads` не являются sales и не входят в ledger.

## Base

L1 15%, L2 5%, L3 3%, L4 2%, L5 1%. Pool 26%. Пример: $1000 → L1 $150, L2 $50, L3 $30, L4 $20, L5 $10 (итого $260).

## Launch boost

90 дней с активации партнёра, индивидуально, не календарный квартал. Множитель 1.5: 22.5 / 7.5 / 4.5 / 3 / 1.5. Pool 39%. Пример: $1000 → L1 $225, L2 $75, L3 $45, L4 $30, L5 $15 (итого $390).

Повторяющиеся qualifying payments внутри 90 дней считаются по launch. После 90 дней — по base. Lifetime не обещать.

Launch eligibility = timestamp активации партнёра, которому атрибутирована продажа (L1), плюс 90 дней, сравнённый с временем фактической оплаты. В `partner_profiles` нет колонки activation: используется существующий `created_at`. Новую колонку не добавлять.

Окно считается по L1 этой продажи и применяется ко всем уровням той же продажи.

## Country / Strategic Partner

Отдельная модель. 50/50 profit share не входит в affiliate `commission_rules`.

## Lifecycle

sale → confirmed → locked → payable → paid.

`confirmed_at` ставится после фактической оплаты. `locked_at` ставится через 14 дней после `confirmed_at`, если нет refund, chargeback или cancellation. До locked комиссия не выплачивается. После locked entry становится payable.

Refund и chargeback не меняют историческую entry. Пишется новая reversal entry с отрицательной суммой и ссылкой на исходную.

`partner_relationships` не переписывается. `confirmed_at` / `locked_at` продажи живут на `sales`. `advance_sponsor_lock` двигает lock продажи и статус начислений, не ребро спонсора.

## Client

Клиент не пишет sale, commission и payout и не передаёт sponsor, amount, rate, level, timestamps. L1–L5 считаются только на сервере по существующему графу `partner_relationships`. Второй граф не создавать.

## Idempotency

- sale = unique(`source`, `external_order_id`)
- commission = unique(`sale_id`, `beneficiary_partner_id`, `level`, `commission_type`)
- одна commission entry не больше чем в одной активной non-void payout

## Tables

Только: `sales`, `commission_rules`, `commission_entries`, `payouts`, `payout_allocations`.

`sales` минимум: `external_order_id`, `source`, partner/referral attribution, `amount`, `currency`, `status`, `confirmed_at`, `locked_at`, `created_at`.

`commission_entries`: `sale_id`, `beneficiary_partner_id`, `level`, `commission_type`, `base_amount`, `rate`, `amount`, `currency`, `status`, reversal linkage, timestamps.

`payouts`: `status`, `currency`, `amount`, `created_by`, `confirmed_by`, timestamps.

`payout_allocations`: `payout_id`, `commission_entry_id`, `allocated_amount`.

Деньги — `numeric`, не float. Валюта sale хранится. FX не выдумывать: разные валюты не суммируются.

## commission_rules

Колонки: `level`, `base_rate`, `launch_multiplier`, `active_from`, `active_to` nullable.

Seed BASE: 0.15 / 0.05 / 0.03 / 0.02 / 0.01 и multiplier 1.5.

Движок читает правила из базы. Маркетинговая страница может показать эти ставки как контракт. Экран earnings ставки не хардкодит.

## RPC

`SECURITY DEFINER`, `search_path = ''`, только `service_role`, идемпотентны, fail-closed:

`record_sale`, `qualify_sale`, `post_commission_entries`, `reverse_sale_commissions`, `advance_sponsor_lock`, `create_payout`, `confirm_payout`.

`record_sale` принимает `source`, `external_order_id`, product/order reference, `amount`, `currency`, `paid_at`, `referral_code` или `partner_id`. Атрибуция на сервере.

`partner_ledger_stats` — `authenticated` и `service_role`. Без поддельных значений. Нет данных — реальные нули и пусто. Ошибка чтения на dashboard — `—`, не выдуманный ноль. Earnings dashboard только из ledger. Пустой партнёр: 0 / — / empty.

## RLS

Клиент не пишет ledger. RLS фаз 4A и 4B не ослаблять. Нет write-policy на таблицах ledger. DML только у `service_role`.

## Не менять

Существующие миграции 4A/4B. `partner_relationships`. `attribute_partner_signup`. Auth, SMTP и Google config.
