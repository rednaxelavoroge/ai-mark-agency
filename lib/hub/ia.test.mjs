import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { partnerProgramTerms } from "../../content/partner-program.ts";

describe("compact IA publishes Partner Commission Model v2", () => {
  it("keeps approved EN v2 rates and the 90-day status window", () => {
    assert.match(partnerProgramTerms.en.note, /L1 50%/);
    assert.match(partnerProgramTerms.en.note, /L2 15%/);
    assert.match(partnerProgramTerms.en.note, /L3 7%/);
    assert.match(partnerProgramTerms.en.note, /L4 5%/);
    assert.match(partnerProgramTerms.en.note, /L5 3%/);
    assert.match(partnerProgramTerms.en.note, /80% aggregate partner pool/);
    assert.match(partnerProgramTerms.en.launch, /90 days/);
    assert.doesNotMatch(partnerProgramTerms.en.launch, /1\.5×/);
    assert.match(partnerProgramTerms.en.lock, /14 days/);
    assert.match(partnerProgramTerms.en.example, /not \$800/);
  });

  it("keeps approved RU v2 rates", () => {
    assert.match(partnerProgramTerms.ru.note, /L1 50%/);
    assert.match(partnerProgramTerms.ru.note, /80%/);
    assert.match(partnerProgramTerms.ru.launch, /90 дней/);
    assert.doesNotMatch(partnerProgramTerms.ru.launch, /1,5/);
    assert.match(partnerProgramTerms.ru.lock, /14 дней/);
    assert.match(partnerProgramTerms.ru.example, /не \$800/);
  });
});
