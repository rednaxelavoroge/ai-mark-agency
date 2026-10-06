/**
 * Marketer post approval state machine. Pure — no I/O, no Supabase, no
 * network — so the transitions can be unit tested directly against the
 * rules in `content/products/aime.ts`: pending approval in Telegram, approved
 * posts auto-publish, rejected posts come back as a new version from the
 * client's comment.
 */

export type PostStatus =
  | "draft"
  | "pending_approval"
  | "approved"
  | "rejected"
  | "regenerating"
  | "scheduled"
  | "published"
  | "publish_failed";

export type PostEvent =
  | { type: "SEND_FOR_APPROVAL" }
  | { type: "APPROVE" }
  | { type: "REJECT"; comment: string }
  | { type: "REGENERATE" }
  | { type: "RESEND_FOR_APPROVAL" }
  | { type: "SCHEDULE"; scheduledAt: string }
  | { type: "PUBLISH_SUCCESS"; instagramMediaId: string }
  | { type: "PUBLISH_FAILURE"; error: string };

export class InvalidPostTransitionError extends Error {
  constructor(status: PostStatus, event: PostEvent["type"]) {
    super(`Cannot apply event "${event}" to a post in status "${status}"`);
    this.name = "InvalidPostTransitionError";
  }
}

/** Allowed (status -> event) pairs. Anything else throws. */
const ALLOWED: Record<PostStatus, PostEvent["type"][]> = {
  draft: ["SEND_FOR_APPROVAL"],
  pending_approval: ["APPROVE", "REJECT"],
  approved: ["SCHEDULE"],
  rejected: ["REGENERATE"],
  regenerating: ["RESEND_FOR_APPROVAL"],
  scheduled: ["PUBLISH_SUCCESS", "PUBLISH_FAILURE"],
  published: [],
  publish_failed: ["SCHEDULE"],
};

export type PostTransitionResult = {
  status: PostStatus;
  reviewerComment?: string;
  scheduledAt?: string;
  instagramMediaId?: string;
  publishError?: string;
};

/**
 * Applies one event to the current status and returns the next state.
 * Rejection and regeneration do not mutate the rejected post in place — the
 * caller creates a new `marketer_posts` row (parent_post_id = this post,
 * version + 1) and that new row starts at "draft". This function only
 * decides what status the *current* row moves to.
 */
export function transitionPost(status: PostStatus, event: PostEvent): PostTransitionResult {
  const allowed = ALLOWED[status];
  if (!allowed.includes(event.type)) {
    throw new InvalidPostTransitionError(status, event.type);
  }

  switch (event.type) {
    case "SEND_FOR_APPROVAL":
      return { status: "pending_approval" };
    case "APPROVE":
      return { status: "approved" };
    case "REJECT":
      return { status: "rejected", reviewerComment: event.comment };
    case "REGENERATE":
      return { status: "regenerating" };
    case "RESEND_FOR_APPROVAL":
      return { status: "pending_approval" };
    case "SCHEDULE":
      return { status: "scheduled", scheduledAt: event.scheduledAt };
    case "PUBLISH_SUCCESS":
      return { status: "published", instagramMediaId: event.instagramMediaId };
    case "PUBLISH_FAILURE":
      return { status: "publish_failed", publishError: event.error };
  }
}

export function canTransition(status: PostStatus, eventType: PostEvent["type"]): boolean {
  return ALLOWED[status].includes(eventType);
}

export const TERMINAL_STATUSES: readonly PostStatus[] = ["published"];
