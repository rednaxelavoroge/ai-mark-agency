# Marketer (AIME) pipeline — setup

What `/aime` (content/products/aime.ts) promises and what connects it:
research → audience analysis → strategy → content plan → post text/reel
script → image → Telegram approval → Instagram auto-publish → insights →
strategy improvement. Code lives in `lib/marketer/*`, the DB schema in
`supabase/migrations/20261006120000_marketer_pipeline.sql`.

Every external connection below is optional at the code level: when it is
unset, the relevant step returns a clear "not configured" result instead of
throwing, and `npm run build` stays green. The pipeline only becomes real
end-to-end once all four are set for a given client.

## 1. Apply the migration

Not auto-applied (see the file header). Run it once against the Supabase
project in the SQL editor, same as every other migration in this repo —
see `supabase/README.md`.

## 2. Create a client

One row per paying Marketer client, keyed to their `subscriptions` row
(product = `aime`):

```sql
insert into public.marketer_profiles (subscription_id, business_name, business_description, website, niche)
values ('<subscriptions.id>', 'Client name', 'What they sell, to whom', 'https://…', 'niche');
```

`telegram_chat_id`, `instagram_business_account_id` and
`instagram_page_access_token` are filled in steps 4-5 below.

## 3. Content generation — Anthropic (+ OpenAI or OpenRouter for images)

- **Anthropic API key**: https://console.anthropic.com/settings/keys →
  "Create Key". Set `ANTHROPIC_API_KEY`. Powers capabilities 1-6 and 12
  (research, audience, strategy, content plan, post copy, reel/story
  scripts, strategy improvement). This path is Anthropic-only.
- **Image provider** (capability 7) — one of:
  - **OpenAI**: https://platform.openai.com/api-keys → "Create new secret
    key". Set `OPENAI_API_KEY`. Needs access to `gpt-image-1`
    (`MARKETER_IMAGE_MODEL` overrides the model).
  - **OpenRouter**: https://openrouter.ai/keys → "Create key". Set
    `OPENROUTER_API_KEY` and leave `OPENAI_API_KEY` unset. Calls go to
    `https://openrouter.ai/api/v1/images` with `MARKETER_IMAGE_MODEL` (or
    `MARKETER_OPENROUTER_MODEL`) as the model id — an OpenRouter slug like
    `google/gemini-2.5-flash-image`, **not** an OpenAI id. Credit/image-model
    availability is per OpenRouter account.

  **If both keys are set, OpenAI wins** — adding an OpenRouter key never
  silently reroutes a deployment that already works against OpenAI. The
  resolution lives in `lib/marketer/openai-compatible.ts`; everything below
  sees only "the configured provider".
- **Supabase Storage bucket for generated images**: Supabase Dashboard →
  Storage → "New bucket" → name it exactly `marketer-media` → **Public**
  bucket (the Instagram Graph API fetches `image_url` directly, so it must
  be publicly reachable; no private bucket + signed URL today).

Without either image key, posts still get a caption and go through Telegram
approval — `marketer_posts.image_status` is `not_configured` and publishing
later fails with a readable reason instead of posting a blank image.

## 4. Telegram approval (capabilities 8, 10)

1. Open https://t.me/BotFather → `/newbot` → follow the prompts → copy the
   token into `TELEGRAM_BOT_TOKEN`.
2. Generate a webhook secret: `openssl rand -base64 32` → set
   `TELEGRAM_WEBHOOK_SECRET` (same value on Vercel and locally).
3. Register the webhook (replace `<TOKEN>`, `<SECRET>`, and the deployed
   origin):
   ```
   curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://ai-mark.agency/api/marketer/telegram/webhook&secret_token=<SECRET>"
   ```
4. Get each client's chat id: have them message the bot once, then call
   `https://api.telegram.org/bot<TOKEN>/getUpdates` and read
   `message.chat.id` from the response. Save it:
   ```sql
   update public.marketer_profiles set telegram_chat_id = '<chat id>' where id = '<profile id>';
   ```

The bot account is shared; each client's `telegram_chat_id` is what routes
their approvals to their own chat.

## 5. Instagram publish + insights (capabilities 9, 11)

Content Publishing requires an **Instagram Business or Creator account**
linked to a **Facebook Page**, and a Meta app in Live mode with the
`instagram_content_publish` and `instagram_manage_insights` permissions.

1. Create/open an app: https://developers.facebook.com/apps/ → add the
   "Instagram Graph API" product.
2. Business verification + App Review are required before this works for
   real client accounts (self-review for your own test account is enough to
   start). Meta's current checklist:
   https://developers.facebook.com/docs/instagram-platform/instagram-content-publishing
3. Get the Page's long-lived access token and the IG Business Account id via
   the Graph API Explorer: https://developers.facebook.com/tools/explorer/ —
   call `GET /me/accounts` for the Page, then
   `GET /<page-id>?fields=instagram_business_account`.
4. Save both on the client's row:
   ```sql
   update public.marketer_profiles
     set instagram_business_account_id = '<ig user id>',
         instagram_page_access_token = '<long-lived page access token>'
   where id = '<profile id>';
   ```

**Important limit**: the Graph API's Content Publishing endpoint has no
native "publish later" parameter for organic posts (that only exists for
ads). "Scheduled time" in this pipeline is enforced by us: `/api/cron/marketer-publish`
polls every hour for posts whose `scheduled_at` has passed and publishes
them then — not by Meta's servers.

Long-lived page tokens expire (~60 days); there is no refresh flow in this
PR — rotating the token is a manual `update` on `marketer_profiles` for now.

## 6. Wire up the crons and the secret they share

`CRON_SECRET` already exists in this repo (`/api/cron/advance-sponsor-lock`).
The two new crons reuse it — nothing new to generate:

- `GET /api/cron/marketer-publish` — hourly, publishes due posts (capability 9).
- `GET /api/cron/marketer-insights` — daily, pulls Instagram Insights for
  recently published posts (capability 11).

Both are already registered in `vercel.json`.

## 7. Running a cycle

There is no admin UI for this yet. Trigger a cycle by hand with the same
bearer secret:

```
curl -X POST https://ai-mark.agency/api/marketer/run-cycle \
  -H "Authorization: Bearer $CRON_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"profileId": "<marketer_profiles.id>"}'
```

Generates research → audience → strategy → content plan, then a draft per
plan item with copy/script/image, each sent to the client's Telegram for
approval.

Once a cycle has published posts and `marketer-insights` has collected
results, run the improvement cycle (capability 12) the same way with
`"mode": "improve"` instead of a fresh profile id's first cycle.

## What is still manual after this PR

- No admin UI to create a `marketer_profiles` row, trigger a cycle, or watch
  post status — everything above is a SQL `insert`/`update` or a `curl`.
- No long-lived-token refresh for Instagram — rotate it by hand before it
  expires.
- Video (actual Reels production) is out of scope: capability 6 produces the
  *script* text, not a rendered video file, so a Reel still needs a human (or
  a future video-generation integration) to turn the script into footage
  before it can be approved as a Reel with a real asset.
