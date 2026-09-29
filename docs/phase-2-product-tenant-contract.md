# Phase 2 — Product tenant provisioning contract

AI MARK calls each product’s tenant API after a treasury invoice is fulfilled for a subscription SKU. Products implement these HTTP endpoints on their own origin.

## Authentication

- Header: `Authorization: Bearer <product secret>`
- Header: `Idempotency-Key: <invoice public ref>` (e.g. `INV-…`) on every request
- `Content-Type: application/json`

## Environment (AI MARK server)

| Product | Base URL env | Secret env |
|---------|--------------|------------|
| AIME (`product_ref=aime`) | `AIME_PROVISIONING_URL` | `AIME_PROVISIONING_SECRET` |
| Business Assistant (`assistant`) | `ASSISTANT_PROVISIONING_URL` | `ASSISTANT_PROVISIONING_SECRET` |
| SHOWROOM AI (`showroom`) | `SHOWROOM_PROVISIONING_URL` | `SHOWROOM_PROVISIONING_SECRET` |

If a product’s URL is unset, provisioning is queued for manual activation.

## Endpoints

### `POST {base}/tenants`

Create or return an existing tenant for the buyer.

Request body:

```json
{
  "email": "buyer@example.com",
  "plan": "aime-lite",
  "invoice_no": "INV-20260929-ABCD",
  "partner_code": "alex42"
}
```

- `plan` — published SKU id from AI MARK (`PAYABLE_SKUS`)
- `partner_code` — frozen referral code from the subscription (nullable)

Response `201` or `200`:

```json
{ "tenant_id": "tn_abc123" }
```

### `POST {base}/tenants/{tenant_id}/magic-link`

Issue a one-time sign-in URL for the buyer.

Request body: `{}` or omitted.

Response:

```json
{ "url": "https://product.example/login?token=…" }
```

### `POST {base}/tenants/{tenant_id}/suspend`

Suspend product access when the subscription period ends without renewal.

### `POST {base}/tenants/{tenant_id}/resume`

Restore access after a renewal payment extends `active_until`.

## Idempotency

Repeating the same `Idempotency-Key` must not create duplicate tenants or charges. AI MARK logs each invoice ref per action in `subscription_provisioning_log`.

## AI MARK subscription fields

- `subscriptions.product_tenant_id`
- `subscriptions.provisioning_status` — `pending` | `provisioning` | `active` | `manual` | `failed`
- Cron: `GET /api/cron/subscription-provisioning` (Bearer `CRON_SECRET`)
