import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CHAT_KNOWLEDGE, isWidgetMessageUrl, withChatContext } from "./chat-context.ts";

describe("chat context", () => {
  it("forbids legacy brand except as a do-not-say instruction", () => {
    const mentions = CHAT_KNOWLEDGE.match(/alex[- ]?dev/gi) ?? [];
    assert.equal(mentions.length, 2);
    assert.match(CHAT_KNOWLEDGE, /Never mention/);
    assert.match(CHAT_KNOWLEDGE, /SHOWROOM AI/);
    assert.match(CHAT_KNOWLEDGE, /Do not use Showroom\.pro/);
  });

  it("names AI MARK products that are on the public site", () => {
    assert.match(CHAT_KNOWLEDGE, /AI MARK/);
    assert.match(CHAT_KNOWLEDGE, /SHOWROOM AI/);
    assert.match(CHAT_KNOWLEDGE, /AI Business Assistant/);
    assert.match(CHAT_KNOWLEDGE, /AI Marketing Employee/);
  });

  it("uses currently published list prices, not legacy guesses", () => {
    assert.match(CHAT_KNOWLEDGE, /Entry \$149\/month/);
    assert.match(CHAT_KNOWLEDGE, /Standard \$249\/month/);
    assert.match(CHAT_KNOWLEDGE, /Lite \$199\/month/);
    assert.match(CHAT_KNOWLEDGE, /Pro \$349\/month/);
    assert.match(CHAT_KNOWLEDGE, /Standard \$199\/month/);
    assert.match(CHAT_KNOWLEDGE, /Business \$299\/month/);
    assert.match(CHAT_KNOWLEDGE, /Starter \$1,200/);
    assert.doesNotMatch(CHAT_KNOWLEDGE, /Showroom\.pro Standard/);
    assert.match(CHAT_KNOWLEDGE, /no published free-trial/);
  });

  it("prefixes visitor text once", () => {
    const once = withChatContext("Что вы можете?");
    const twice = withChatContext(once);
    assert.equal(once, twice);
    assert.match(once, /Visitor message:\nЧто вы можете\?/);
  });

  it("matches the hosted widget message endpoint", () => {
    assert.equal(
      isWidgetMessageUrl("https://app.alex-dev.pro/api/webchat/wc_30ff859272acf6000db08542/messages"),
      true,
    );
    assert.equal(isWidgetMessageUrl("https://ai-mark.agency/api/contact"), false);
  });
});
