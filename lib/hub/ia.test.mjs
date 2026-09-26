import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { partnerProgramTerms } from "../../content/partner-program.ts";

describe("compact IA does not rewrite partner economics", () => {
  it("keeps approved EN base rates and launch window", () => {
    assert.match(partnerProgramTerms.en.note, /L1 15%/);
    assert.match(partnerProgramTerms.en.note, /L2 5%/);
    assert.match(partnerProgramTerms.en.note, /L3 3%/);
    assert.match(partnerProgramTerms.en.note, /L4 2%/);
    assert.match(partnerProgramTerms.en.note, /L5 1%/);
    assert.match(partnerProgramTerms.en.launch, /90 days/);
    assert.match(partnerProgramTerms.en.launch, /1\.5×/);
    assert.match(partnerProgramTerms.en.lock, /14 days/);
  });

  it("keeps approved RU base rates", () => {
    assert.match(partnerProgramTerms.ru.note, /L1 15%/);
    assert.match(partnerProgramTerms.ru.launch, /90 дней/);
    assert.match(partnerProgramTerms.ru.lock, /14 дней/);
  });
});
