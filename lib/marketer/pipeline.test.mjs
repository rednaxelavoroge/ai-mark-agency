/**
 * Marketer post approval state machine — offline invariants.
 *
 *   node --test lib/marketer/pipeline.test.mjs
 */

import assert from "node:assert/strict";
import { test } from "node:test";

import {
  InvalidPostTransitionError,
  canTransition,
  transitionPost,
} from "./pipeline.ts";

test("happy path: draft -> pending_approval -> approved -> scheduled -> published", () => {
  let state = transitionPost("draft", { type: "SEND_FOR_APPROVAL" });
  assert.equal(state.status, "pending_approval");

  state = transitionPost(state.status, { type: "APPROVE" });
  assert.equal(state.status, "approved");

  state = transitionPost(state.status, { type: "SCHEDULE", scheduledAt: "2026-10-10T09:00:00Z" });
  assert.equal(state.status, "scheduled");
  assert.equal(state.scheduledAt, "2026-10-10T09:00:00Z");

  state = transitionPost(state.status, { type: "PUBLISH_SUCCESS", instagramMediaId: "ig_123" });
  assert.equal(state.status, "published");
  assert.equal(state.instagramMediaId, "ig_123");
});

test("rejection path: pending_approval -> rejected -> regenerating -> pending_approval again", () => {
  let state = transitionPost("pending_approval", {
    type: "REJECT",
    comment: "Сделай текст короче и добавь цену",
  });
  assert.equal(state.status, "rejected");
  assert.equal(state.reviewerComment, "Сделай текст короче и добавь цену");

  state = transitionPost(state.status, { type: "REGENERATE" });
  assert.equal(state.status, "regenerating");

  state = transitionPost(state.status, { type: "RESEND_FOR_APPROVAL" });
  assert.equal(state.status, "pending_approval");
});

test("publish failure can be retried via a fresh schedule", () => {
  let state = transitionPost("scheduled", { type: "PUBLISH_FAILURE", error: "IG token expired" });
  assert.equal(state.status, "publish_failed");
  assert.equal(state.publishError, "IG token expired");

  state = transitionPost(state.status, { type: "SCHEDULE", scheduledAt: "2026-10-11T09:00:00Z" });
  assert.equal(state.status, "scheduled");
});

test("published is terminal — no further event is accepted", () => {
  assert.equal(canTransition("published", "SCHEDULE"), false);
  assert.equal(canTransition("published", "APPROVE"), false);
});

test("invalid transitions throw instead of silently no-op-ing", () => {
  assert.throws(
    () => transitionPost("draft", { type: "APPROVE" }),
    InvalidPostTransitionError,
  );
  assert.throws(
    () => transitionPost("approved", { type: "REJECT", comment: "no" }),
    InvalidPostTransitionError,
  );
  assert.throws(
    () => transitionPost("rejected", { type: "SEND_FOR_APPROVAL" }),
    InvalidPostTransitionError,
  );
});

test("a rejected post cannot be approved directly — it must regenerate first", () => {
  assert.equal(canTransition("rejected", "APPROVE"), false);
  assert.equal(canTransition("rejected", "REGENERATE"), true);
});
