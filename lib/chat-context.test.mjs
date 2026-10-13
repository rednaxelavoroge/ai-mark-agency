import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CHAT_CONTEXT_PREFIX, CHAT_KNOWLEDGE, isWidgetMessageUrl, withChatContext } from "./chat-context.ts";

describe("chat context", () => {
  it("forbids legacy brand except as a do-not-say instruction", () => {
    const mentions = CHAT_KNOWLEDGE.match(/alex[- ]?dev/gi) ?? [];
    assert.equal(mentions.length, 2);
    assert.match(CHAT_KNOWLEDGE, /Never mention/);
    assert.match(CHAT_KNOWLEDGE, /Showroom AI/);
    assert.match(CHAT_KNOWLEDGE, /Do not use Showroom\.pro/);
  });

  it("names Showroom AI and its three roles", () => {
    assert.match(CHAT_KNOWLEDGE, /AI MARK/);
    assert.match(CHAT_KNOWLEDGE, /Showroom AI — one product with three roles: Seller, Marketer, Business Assistant/);
    assert.match(CHAT_KNOWLEDGE, /\/digital-production/);
  });

  it("quotes only Start / Business / Pro and the optional setup", () => {
    assert.match(CHAT_KNOWLEDGE, /Start \$89\/month/);
    assert.match(CHAT_KNOWLEDGE, /Business \$249\/month/);
    assert.match(CHAT_KNOWLEDGE, /Pro \$399\/month/);
    assert.match(CHAT_KNOWLEDGE, /setup \$300/);
    for (const legacy of [/\$149/, /\$199/, /\$349/, /\$799/, /\$1,200/, /\$299/]) {
      assert.doesNotMatch(CHAT_KNOWLEDGE, legacy);
      assert.doesNotMatch(CHAT_CONTEXT_PREFIX, legacy);
    }
  });

  it("prefixes visitor text once", () => {
    const once = withChatContext("Что вы можете?");
    const twice = withChatContext(once);
    assert.equal(once, twice);
    assert.match(once, /Visitor message:\nЧто вы можете\?/);
    assert.ok(once.length < 900, `prefix too large for hosted /messages: ${once.length}`);
  });

  it("matches the hosted widget message endpoint", () => {
    assert.equal(
      isWidgetMessageUrl("https://app.alex-dev.pro/api/webchat/wc_30ff859272acf6000db08542/messages"),
      true,
    );
    assert.equal(isWidgetMessageUrl("https://ai-mark.agency/api/contact"), false);
  });
});
