import fs from "node:fs";
import path from "node:path";
import type { MdBlock } from "@/lib/markdown";
import { parseMarkdown } from "@/lib/markdown";
import type { Locale } from "@/lib/site";

export const INVESTOR_PAGE_PATH = "/investors";

export type InvestorSection = {
  id: string;
  number: string | null;
  title: string;
  blocks: MdBlock[];
};

export type InvestorProposal = {
  sections: InvestorSection[];
};

const CONTENT_DIR = path.join(process.cwd(), "content", "investors");

export function investorProposalFile(locale: Locale) {
  const target = path.join(CONTENT_DIR, `proposal.${locale}.md`);
  if (fs.existsSync(target)) return target;
  return path.join(CONTENT_DIR, "proposal.en.md");
}

/** Raw Markdown source — used by the download route and by the page. */
export function readInvestorProposalSource(locale: Locale): string {
  return fs.readFileSync(investorProposalFile(locale), "utf8");
}

function splitSections(blocks: MdBlock[]): InvestorSection[] {
  const sections: InvestorSection[] = [];

  for (const block of blocks) {
    if (block.kind === "h2") {
      const numbered = /^(\d+)\.\s+(.*)$/.exec(block.text);
      sections.push({
        id: `s${sections.length + 1}`,
        number: numbered ? numbered[1] : null,
        title: numbered ? numbered[2] : block.text,
        blocks: [],
      });
      continue;
    }

    const current = sections[sections.length - 1];
    if (current) current.blocks.push(block);
  }

  return sections;
}

const cache = new Map<Locale, InvestorProposal>();

export function getInvestorProposal(locale: Locale): InvestorProposal {
  const cached = cache.get(locale);
  if (cached) return cached;

  const proposal: InvestorProposal = {
    sections: splitSections(parseMarkdown(readInvestorProposalSource(locale))),
  };
  cache.set(locale, proposal);
  return proposal;
}
