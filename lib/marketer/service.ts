import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { SupabaseAdminClient } from "@/lib/supabase/admin";
import { generateAndStorePostImage } from "./image";
import { generatePostCopy } from "./copywriting";
import {
  generateAudienceAnalysis,
  generateContentPlan,
  generateNicheResearch,
  generateStrategy,
} from "./research";
import { fetchPostInsights, publishImagePost } from "./instagram";
import {
  answerCallbackQuery,
  sendApprovalRequest,
  sendTelegramMessage,
  type ApprovalPost,
} from "./telegram";
import { transitionPost, type PostStatus } from "./pipeline";
import type { ContentPlan, MarketerProfileBrief, Strategy } from "./types";

type Profile = {
  id: string;
  business_name: string;
  business_description: string;
  website: string | null;
  niche: string | null;
  telegram_chat_id: string | null;
  pending_comment_post_id: string | null;
  instagram_business_account_id: string | null;
  instagram_page_access_token: string | null;
};

function toBrief(profile: Profile): MarketerProfileBrief {
  return {
    businessName: profile.business_name,
    businessDescription: profile.business_description,
    website: profile.website,
    niche: profile.niche,
  };
}

async function loadProfile(admin: SupabaseAdminClient, profileId: string): Promise<Profile | null> {
  const { data } = await admin
    .from("marketer_profiles")
    .select(
      "id, business_name, business_description, website, niche, telegram_chat_id, pending_comment_post_id, instagram_business_account_id, instagram_page_access_token",
    )
    .eq("id", profileId)
    .maybeSingle();
  return data ?? null;
}

export type CycleResult = { ok: true; strategyVersionId: string; postsCreated: number } | { ok: false; error: string };

/**
 * Capabilities 1-6: research -> audience -> strategy -> content plan -> for
 * each plan item, a post/reel/story draft with copy, script and image, sent
 * for the client's Telegram approval (capability 8).
 */
export async function runResearchAndContentCycle(profileId: string): Promise<CycleResult> {
  const admin = createSupabaseAdminClient();
  const profile = await loadProfile(admin, profileId);
  if (!profile) return { ok: false, error: "profile not found" };

  const brief = toBrief(profile);

  const research = await generateNicheResearch(brief);
  if (!research.ok) return { ok: false, error: `research: ${research.error}` };

  const audience = await generateAudienceAnalysis(brief, research.data);
  if (!audience.ok) return { ok: false, error: `audience: ${audience.error}` };

  const strategy = await generateStrategy(brief, research.data, audience.data);
  if (!strategy.ok) return { ok: false, error: `strategy: ${strategy.error}` };

  const plan = await generateContentPlan(brief, strategy.data);
  if (!plan.ok) return { ok: false, error: `content plan: ${plan.error}` };

  const { data: versionRow, error: versionError } = await admin
    .from("marketer_strategy_versions")
    .insert({
      profile_id: profileId,
      research: research.data,
      audience: audience.data,
      strategy: strategy.data,
      content_plan: plan.data,
      model: strategy.model,
    })
    .select("id")
    .single();
  if (versionError || !versionRow) {
    return { ok: false, error: versionError?.message ?? "failed to save strategy version" };
  }

  let postsCreated = 0;
  for (const item of plan.data.items) {
    const created = await createAndSendPost(admin, profile, versionRow.id, strategy.data, item);
    if (created) postsCreated += 1;
  }

  return { ok: true, strategyVersionId: versionRow.id, postsCreated };
}

async function createAndSendPost(
  admin: SupabaseAdminClient,
  profile: Profile,
  strategyVersionId: string,
  strategy: Strategy,
  planItem: ContentPlan["items"][number],
  options?: { parentPostId?: string; version?: number; regenerationComment?: string; previousCaption?: string },
): Promise<boolean> {
  const copy = await generatePostCopy(toBrief(profile), strategy, planItem, {
    regenerationComment: options?.regenerationComment,
    previousCaption: options?.previousCaption,
  });
  if (!copy.ok) {
    console.error("[marketer] post copy generation failed:", copy.error);
    return false;
  }

  const scheduledAt = new Date(Date.now() + Math.max(0, planItem.day) * 24 * 60 * 60 * 1000).toISOString();

  const { data: postRow, error: insertError } = await admin
    .from("marketer_posts")
    .insert({
      profile_id: profile.id,
      strategy_version_id: strategyVersionId,
      kind: planItem.kind,
      topic: planItem.topic,
      caption: copy.caption,
      script: copy.script,
      image_prompt: copy.imagePrompt,
      parent_post_id: options?.parentPostId ?? null,
      version: options?.version ?? 1,
      scheduled_at: scheduledAt,
    })
    .select("id")
    .single();
  if (insertError || !postRow) {
    console.error("[marketer] post insert failed:", insertError?.message);
    return false;
  }

  const image = await generateAndStorePostImage(copy.imagePrompt, postRow.id);
  await admin
    .from("marketer_posts")
    .update({
      image_url: image.status === "generated" ? image.url : null,
      image_status: image.status,
    })
    .eq("id", postRow.id);

  await sendPostForApproval(admin, profile, {
    id: postRow.id,
    kind: planItem.kind,
    topic: planItem.topic,
    caption: copy.caption,
    script: copy.script,
    imageUrl: image.status === "generated" ? image.url : null,
    version: options?.version ?? 1,
  });

  return true;
}

async function sendPostForApproval(
  admin: SupabaseAdminClient,
  profile: Profile,
  approvalPost: ApprovalPost,
): Promise<void> {
  if (!profile.telegram_chat_id) {
    await admin
      .from("marketer_posts")
      .update({ status: "draft", publish_error: "Telegram chat not connected; see docs/marketer-setup.md" })
      .eq("id", approvalPost.id);
    return;
  }

  const transition = transitionPost("draft", { type: "SEND_FOR_APPROVAL" });
  const sent = await sendApprovalRequest(profile.telegram_chat_id, approvalPost);
  if (!sent.ok) {
    await admin
      .from("marketer_posts")
      .update({ publish_error: `Telegram send failed: ${sent.error}` })
      .eq("id", approvalPost.id);
    return;
  }

  await admin
    .from("marketer_posts")
    .update({
      status: transition.status,
      telegram_chat_id: profile.telegram_chat_id,
      telegram_message_id: sent.messageId,
      publish_error: null,
    })
    .eq("id", approvalPost.id);
}

type PostRow = {
  id: string;
  profile_id: string;
  strategy_version_id: string | null;
  kind: "post" | "reel" | "story";
  topic: string;
  caption: string | null;
  script: string | null;
  status: PostStatus;
  version: number;
  scheduled_at: string | null;
  instagram_media_id: string | null;
};

async function loadPost(admin: SupabaseAdminClient, postId: string): Promise<PostRow | null> {
  const { data } = await admin
    .from("marketer_posts")
    .select("id, profile_id, strategy_version_id, kind, topic, caption, script, status, version, scheduled_at, instagram_media_id")
    .eq("id", postId)
    .maybeSingle();
  return (data as PostRow | null) ?? null;
}

export type CallbackResult = { ok: true } | { ok: false; error: string };

/** Capability 8/9: client tapped "Approve" in Telegram. */
export async function handleApprove(
  postId: string,
  callbackQueryId: string,
): Promise<CallbackResult> {
  const admin = createSupabaseAdminClient();
  const post = await loadPost(admin, postId);
  if (!post) return { ok: false, error: "post not found" };

  try {
    const approved = transitionPost(post.status, { type: "APPROVE" });
    const scheduled = transitionPost(approved.status, {
      type: "SCHEDULE",
      scheduledAt: post.scheduled_at ?? new Date().toISOString(),
    });
    await admin
      .from("marketer_posts")
      .update({ status: scheduled.status, scheduled_at: scheduled.scheduledAt })
      .eq("id", postId);
    await answerCallbackQuery(callbackQueryId, "Одобрено ✅ / Approved");
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "transition failed";
    await answerCallbackQuery(callbackQueryId, "Уже обработано / Already handled");
    return { ok: false, error: message };
  }
}

/** Capability 10, step 1: client tapped "Reject" — ask for a comment. */
export async function handleReject(
  postId: string,
  chatId: string,
  callbackQueryId: string,
): Promise<CallbackResult> {
  const admin = createSupabaseAdminClient();
  const post = await loadPost(admin, postId);
  if (!post) return { ok: false, error: "post not found" };

  try {
    const rejected = transitionPost(post.status, { type: "REJECT", comment: "" });
    await admin.from("marketer_posts").update({ status: rejected.status }).eq("id", postId);
    await admin.from("marketer_profiles").update({ pending_comment_post_id: postId }).eq("id", post.profile_id);
    await answerCallbackQuery(callbackQueryId, "Отклонено / Rejected");
    await sendTelegramMessage(
      chatId,
      "Напишите, что изменить в этом посте — я подготовлю новую версию.\n(Reply with what to change — I'll prepare a new version.)",
    );
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "transition failed";
    return { ok: false, error: message };
  }
}

/** Capability 10, step 2: client's free-text comment arrives — regenerate and resend. */
export async function handleRejectionComment(chatId: string, comment: string): Promise<CallbackResult> {
  const admin = createSupabaseAdminClient();
  const { data: profile } = await admin
    .from("marketer_profiles")
    .select(
      "id, business_name, business_description, website, niche, telegram_chat_id, pending_comment_post_id, instagram_business_account_id, instagram_page_access_token",
    )
    .eq("telegram_chat_id", chatId)
    .not("pending_comment_post_id", "is", null)
    .maybeSingle();
  if (!profile?.pending_comment_post_id) return { ok: false, error: "no post is awaiting a comment in this chat" };

  const post = await loadPost(admin, profile.pending_comment_post_id);
  if (!post) return { ok: false, error: "post not found" };
  if (!post.strategy_version_id) return { ok: false, error: "post has no strategy version to regenerate from" };

  await admin.from("marketer_posts").update({ reviewer_comment: comment }).eq("id", post.id);

  const { data: versionRow } = await admin
    .from("marketer_strategy_versions")
    .select("strategy")
    .eq("id", post.strategy_version_id)
    .maybeSingle();
  const strategy = (versionRow?.strategy as Strategy) ?? { positioning: "", pillars: [], targeting_ideas: [] };

  const regenerating = transitionPost(post.status, { type: "REGENERATE" });
  await admin.from("marketer_posts").update({ status: regenerating.status }).eq("id", post.id);

  await createAndSendPost(
    admin,
    profile as Profile,
    post.strategy_version_id,
    strategy,
    { day: 0, kind: post.kind, topic: post.topic, goal: "regeneration" },
    { parentPostId: post.id, version: post.version + 1, regenerationComment: comment, previousCaption: post.caption ?? undefined },
  );

  await admin.from("marketer_profiles").update({ pending_comment_post_id: null }).eq("id", profile.id);
  return { ok: true };
}

export type PublishSummary = { attempted: number; published: number; failed: number };

/** Capability 9: publish every approved post whose scheduled time has arrived. */
export async function publishDuePosts(): Promise<PublishSummary> {
  const admin = createSupabaseAdminClient();
  const nowIso = new Date().toISOString();
  const { data: due } = await admin
    .from("marketer_posts")
    .select("id, profile_id, kind, caption, image_url, status, scheduled_at")
    .eq("status", "scheduled")
    .lte("scheduled_at", nowIso);

  const summary: PublishSummary = { attempted: 0, published: 0, failed: 0 };
  for (const post of due ?? []) {
    summary.attempted += 1;
    const profile = await loadProfile(admin, post.profile_id);
    const fail = async (reason: string) => {
      const next = transitionPost("scheduled", { type: "PUBLISH_FAILURE", error: reason });
      await admin.from("marketer_posts").update({ status: next.status, publish_error: next.publishError }).eq("id", post.id);
      summary.failed += 1;
    };

    if (post.kind !== "post") {
      // Capability 6 only produces the reel/story *script*; turning it into
      // an actual video is not implemented in this PR (no video generation
      // or rendering integration exists). See docs/marketer-setup.md.
      await fail(`${post.kind} auto-publish needs a rendered video, which this pipeline does not produce yet; render the script manually`);
      continue;
    }
    if (!profile?.instagram_business_account_id || !profile.instagram_page_access_token) {
      await fail("Instagram not connected; see docs/marketer-setup.md");
      continue;
    }
    if (!post.image_url) {
      await fail("no image generated for this post; see docs/marketer-setup.md (OPENAI_API_KEY or OPENROUTER_API_KEY)");
      continue;
    }

    const result = await publishImagePost(
      { igUserId: profile.instagram_business_account_id, pageAccessToken: profile.instagram_page_access_token },
      { imageUrl: post.image_url, caption: post.caption ?? "" },
    );
    if (!result.ok) {
      await fail(result.error);
      continue;
    }

    const next = transitionPost("scheduled", { type: "PUBLISH_SUCCESS", instagramMediaId: result.mediaId });
    await admin
      .from("marketer_posts")
      .update({ status: next.status, instagram_media_id: next.instagramMediaId, published_at: new Date().toISOString(), publish_error: null })
      .eq("id", post.id);
    summary.published += 1;
  }

  return summary;
}

export type InsightsSummary = { checked: number; stored: number };

/** Capability 11: pull Instagram Insights for recently published posts. */
export async function collectPostInsights(): Promise<InsightsSummary> {
  const admin = createSupabaseAdminClient();
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { data: published } = await admin
    .from("marketer_posts")
    .select("id, profile_id, instagram_media_id")
    .eq("status", "published")
    .gte("published_at", since)
    .not("instagram_media_id", "is", null);

  const summary: InsightsSummary = { checked: 0, stored: 0 };
  for (const post of published ?? []) {
    summary.checked += 1;
    const profile = await loadProfile(admin, post.profile_id);
    if (!profile?.instagram_business_account_id || !profile.instagram_page_access_token || !post.instagram_media_id) {
      continue;
    }
    const insights = await fetchPostInsights(
      { igUserId: profile.instagram_business_account_id, pageAccessToken: profile.instagram_page_access_token },
      post.instagram_media_id,
    );
    if (!insights.ok) {
      console.error("[marketer] insights fetch failed:", insights.error);
      continue;
    }
    await admin.from("marketer_post_insights").insert({
      post_id: post.id,
      impressions: insights.data.impressions,
      reach: insights.data.reach,
      likes: insights.data.likes,
      comments: insights.data.comments,
      saves: insights.data.saves,
      shares: insights.data.shares,
      raw: insights.data.raw as never,
    });
    summary.stored += 1;
  }
  return summary;
}

/** Capability 12: fold the latest insights back into a new strategy + content plan. */
export async function improveStrategyFromResults(profileId: string): Promise<CycleResult> {
  const admin = createSupabaseAdminClient();
  const profile = await loadProfile(admin, profileId);
  if (!profile) return { ok: false, error: "profile not found" };

  const { data: latestVersion } = await admin
    .from("marketer_strategy_versions")
    .select("id, research, audience, strategy")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!latestVersion) return { ok: false, error: "no prior strategy version to improve on" };

  const { data: posts } = await admin
    .from("marketer_posts")
    .select("id, topic, kind")
    .eq("profile_id", profileId)
    .eq("strategy_version_id", latestVersion.id);

  const postIds = (posts ?? []).map((p) => p.id);
  const { data: insightRows } = postIds.length
    ? await admin.from("marketer_post_insights").select("post_id, reach, likes, comments, saves, shares").in("post_id", postIds)
    : { data: [] as { post_id: string; reach: number | null; likes: number | null; comments: number | null; saves: number | null; shares: number | null }[] };

  if (!insightRows || insightRows.length === 0) {
    return { ok: false, error: "no insights collected yet for the latest cycle" };
  }

  const totals = insightRows.reduce(
    (acc, row) => ({
      reach: acc.reach + (row.reach ?? 0),
      likes: acc.likes + (row.likes ?? 0),
      comments: acc.comments + (row.comments ?? 0),
      saves: acc.saves + (row.saves ?? 0),
      shares: acc.shares + (row.shares ?? 0),
    }),
    { reach: 0, likes: 0, comments: 0, saves: 0, shares: 0 },
  );
  const n = insightRows.length;
  const insightSummary =
    `Over the last cycle (${n} posts measured): avg reach ${Math.round(totals.reach / n)}, ` +
    `avg likes ${Math.round(totals.likes / n)}, avg comments ${Math.round(totals.comments / n)}, ` +
    `avg saves ${Math.round(totals.saves / n)}, avg shares ${Math.round(totals.shares / n)}.`;

  const brief = toBrief(profile);
  const research = latestVersion.research as Parameters<typeof generateStrategy>[1];
  const audience = latestVersion.audience as Parameters<typeof generateStrategy>[2];

  const strategy = await generateStrategy(brief, research, audience, insightSummary);
  if (!strategy.ok) return { ok: false, error: `strategy: ${strategy.error}` };

  const plan = await generateContentPlan(brief, strategy.data);
  if (!plan.ok) return { ok: false, error: `content plan: ${plan.error}` };

  const { data: versionRow, error: versionError } = await admin
    .from("marketer_strategy_versions")
    .insert({
      profile_id: profileId,
      previous_version_id: latestVersion.id,
      research,
      audience,
      strategy: strategy.data,
      content_plan: plan.data,
      insight_summary: insightSummary,
      based_on_insights: { post_count: n, totals } as never,
      model: strategy.model,
    })
    .select("id")
    .single();
  if (versionError || !versionRow) {
    return { ok: false, error: versionError?.message ?? "failed to save improved strategy version" };
  }

  let postsCreated = 0;
  for (const item of plan.data.items) {
    const created = await createAndSendPost(admin, profile, versionRow.id, strategy.data, item);
    if (created) postsCreated += 1;
  }

  return { ok: true, strategyVersionId: versionRow.id, postsCreated };
}
