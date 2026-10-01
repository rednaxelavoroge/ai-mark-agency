import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { partnerProgramTerms } from "../../content/partner-program.ts";

describe("compact IA publishes launch bonus partner terms", () => {
  it("keeps approved EN launch bonus and renewal wording", () => {
    assert.match(partnerProgramTerms.en.note, /L1 50%/);
    assert.match(partnerProgramTerms.en.note, /20% \+ L2 5%/);
    assert.match(partnerProgramTerms.en.launchBonus, /31\.12\.2026/);
    assert.match(partnerProgramTerms.en.standardFrom, /01\.01\.2027/);
    assert.match(partnerProgramTerms.en.exampleRenewal, /\$200/);
    assert.doesNotMatch(partnerProgramTerms.en.note, /90 days/);
    assert.match(partnerProgramTerms.en.lock, /14 days/);
  });

  it("keeps approved RU launch bonus wording", () => {
    assert.match(partnerProgramTerms.ru.note, /L1 50%/);
    assert.match(partnerProgramTerms.ru.launchBonus, /31\.12\.2026/);
    assert.doesNotMatch(partnerProgramTerms.ru.note, /90 дней/);
    assert.match(partnerProgramTerms.ru.lock, /14 дней/);
  });
});
