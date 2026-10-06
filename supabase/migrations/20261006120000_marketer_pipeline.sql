-- Marketer (AIME) content pipeline: research/strategy, content plan, posts with
-- a Telegram approval state machine, and post-result insights.
-- Idempotent migration with Row Level Security (RLS).
-- Do NOT auto-apply: manual execution by database owner.

-- ---------------------------------------------------------------- profiles
-- One row per paying Marketer client (one `subscriptions` row with
-- product = 'aime'). Holds the business brief plus the per-tenant Telegram
-- and Instagram connection — each client approves and publishes through
-- their own chat and their own Instagram Business Account.
create table if not exists public.marketer_profiles (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references public.subscriptions (id) on delete cascade,
  business_name text not null,
  business_description text not null default '',
  website text,
  niche text,
  status text not null default 'active',
  telegram_chat_id text,
  -- The one rejected post currently awaiting the client's free-text comment
  -- in that Telegram chat, so the next inbound message is attributed to it
  -- instead of being treated as small talk.
  pending_comment_post_id uuid,
  instagram_business_account_id text,
  instagram_page_access_token text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint marketer_profiles_subscription_uq unique (subscription_id),
  constraint marketer_profiles_status_valid check (status in ('active', 'paused')),
  constraint marketer_profiles_business_name_len check (char_length(business_name) between 1 and 200)
);

comment on table public.marketer_profiles is
  'Marketer (AIME) client brief + per-tenant Telegram/Instagram connection.';
comment on column public.marketer_profiles.instagram_page_access_token is
  'Meta Graph API page access token for this client''s Instagram Business Account. Server-only; never selectable by the authenticated role.';

drop trigger if exists marketer_profiles_set_updated_at on public.marketer_profiles;
create trigger marketer_profiles_set_updated_at
before update on public.marketer_profiles
for each row execute function public.set_updated_at();

-- (the FK on pending_comment_post_id is added once marketer_posts exists, below)

-- ------------------------------------------------------- strategy versions
-- Capabilities 1-4: niche/competitor research, audience analysis, strategy
-- and targeting ideas, content plan. One row per generation cycle; a later
-- cycle references the version it supersedes so the improvement loop
-- (capability 12) has a trail of what changed and why.
create table if not exists public.marketer_strategy_versions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.marketer_profiles (id) on delete cascade,
  previous_version_id uuid references public.marketer_strategy_versions (id) on delete set null,
  research jsonb not null default '{}'::jsonb,
  audience jsonb not null default '{}'::jsonb,
  strategy jsonb not null default '{}'::jsonb,
  content_plan jsonb not null default '{}'::jsonb,
  -- Populated only when this version was produced by the improvement loop
  -- from a prior cycle's insights (capability 12). Null for the first cycle.
  insight_summary text,
  based_on_insights jsonb,
  model text,
  created_at timestamptz not null default now()
);

comment on table public.marketer_strategy_versions is
  'One research/audience/strategy/content-plan cycle. Chained via previous_version_id so the strategy-improvement loop has a history.';

create index if not exists marketer_strategy_versions_profile_idx
  on public.marketer_strategy_versions (profile_id, created_at desc);

-- ------------------------------------------------------------------- posts
-- Capabilities 5-10: post text, reel/story script, image, Telegram approval,
-- auto-publish on approval, regenerate-and-resend on rejection.
create table if not exists public.marketer_posts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.marketer_profiles (id) on delete cascade,
  strategy_version_id uuid references public.marketer_strategy_versions (id) on delete set null,
  kind text not null default 'post',
  topic text not null default '',
  caption text,
  script text,
  image_prompt text,
  image_url text,
  image_status text not null default 'pending',
  status text not null default 'draft',
  version integer not null default 1,
  parent_post_id uuid references public.marketer_posts (id) on delete set null,
  reviewer_comment text,
  telegram_chat_id text,
  telegram_message_id text,
  scheduled_at timestamptz,
  instagram_media_id text,
  published_at timestamptz,
  publish_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint marketer_posts_kind_valid check (kind in ('post', 'reel', 'story')),
  constraint marketer_posts_image_status_valid check (
    image_status in ('pending', 'generated', 'not_configured', 'failed', 'not_required')
  ),
  constraint marketer_posts_status_valid check (
    status in (
      'draft', 'pending_approval', 'approved', 'rejected', 'regenerating',
      'scheduled', 'published', 'publish_failed'
    )
  )
);

comment on table public.marketer_posts is
  'One planned Instagram post/reel/story and its approval state machine. Rejection creates a new row (parent_post_id) with an incremented version instead of mutating the rejected one, so the approval history stays intact.';
comment on column public.marketer_posts.reviewer_comment is
  'Client''s free-text rejection comment from Telegram, used as the regeneration brief for the next version.';

drop trigger if exists marketer_posts_set_updated_at on public.marketer_posts;
create trigger marketer_posts_set_updated_at
before update on public.marketer_posts
for each row execute function public.set_updated_at();

create index if not exists marketer_posts_profile_idx
  on public.marketer_posts (profile_id, created_at desc);
create index if not exists marketer_posts_status_idx
  on public.marketer_posts (status);
create index if not exists marketer_posts_due_idx
  on public.marketer_posts (scheduled_at)
  where status = 'scheduled';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'marketer_profiles_pending_comment_post_fkey'
  ) then
    alter table public.marketer_profiles
      add constraint marketer_profiles_pending_comment_post_fkey
      foreign key (pending_comment_post_id) references public.marketer_posts (id) on delete set null;
  end if;
end
$$;

-- --------------------------------------------------------------- insights
-- Capability 11: post-result analysis from Instagram Insights.
create table if not exists public.marketer_post_insights (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.marketer_posts (id) on delete cascade,
  impressions integer,
  reach integer,
  likes integer,
  comments integer,
  saves integer,
  shares integer,
  raw jsonb not null default '{}'::jsonb,
  fetched_at timestamptz not null default now()
);

comment on table public.marketer_post_insights is
  'Instagram Graph API insights snapshot for a published post. One row per fetch; the latest row per post is the current reading.';

create index if not exists marketer_post_insights_post_idx
  on public.marketer_post_insights (post_id, fetched_at desc);

-- ------------------------------------------------------------------- RLS
alter table public.marketer_profiles enable row level security;
alter table public.marketer_strategy_versions enable row level security;
alter table public.marketer_posts enable row level security;
alter table public.marketer_post_insights enable row level security;

-- No end-customer cabinet exists yet for Marketer clients (they are reached
-- over Telegram, not the website), so the only authenticated reader is the
-- admin role. The pipeline itself always runs as service_role (cron +
-- webhook), which bypasses RLS.
drop policy if exists marketer_profiles_admin_all on public.marketer_profiles;
create policy marketer_profiles_admin_all
  on public.marketer_profiles for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists marketer_strategy_versions_admin_all on public.marketer_strategy_versions;
create policy marketer_strategy_versions_admin_all
  on public.marketer_strategy_versions for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists marketer_posts_admin_all on public.marketer_posts;
create policy marketer_posts_admin_all
  on public.marketer_posts for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists marketer_post_insights_admin_all on public.marketer_post_insights;
create policy marketer_post_insights_admin_all
  on public.marketer_post_insights for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());
