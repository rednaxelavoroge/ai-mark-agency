import type { CSSProperties } from "react";
import Link from "next/link";
import type { InvestorsPageCopy } from "@/content/investors";
import type { InvestorSection } from "@/lib/investors";
import { getInvestorProposal } from "@/lib/investors";
import {
  Flow,
  flowSteps,
  isChipList,
  keylineOf,
  renderInline,
  type MdBlock,
} from "@/lib/markdown";
import type { Locale } from "@/lib/site";

type Card = { head: string; blocks: MdBlock[] };
type Segment =
  | { kind: "flow"; blocks: MdBlock[] }
  | { kind: "cards"; cards: Card[] };

/** A `###` opens a card; `---` closes the card group so trailing text stays at section level. */
function segment(blocks: MdBlock[]): Segment[] {
  const segments: Segment[] = [];
  let flow: MdBlock[] = [];
  let cards: Card[] = [];

  const closeFlow = () => {
    if (flow.length) {
      segments.push({ kind: "flow", blocks: flow });
      flow = [];
    }
  };
  const closeCards = () => {
    if (cards.length) {
      segments.push({ kind: "cards", cards });
      cards = [];
    }
  };

  for (const block of blocks) {
    if (block.kind === "h3") {
      closeFlow();
      cards.push({ head: block.text, blocks: [] });
      continue;
    }
    if (block.kind === "hr") {
      closeCards();
      continue;
    }
    if (cards.length) {
      cards[cards.length - 1].blocks.push(block);
      continue;
    }
    flow.push(block);
  }

  closeFlow();
  closeCards();
  return segments;
}

const GRID: Record<number, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2",
  5: "sm:grid-cols-2 lg:grid-cols-3",
  6: "sm:grid-cols-2 lg:grid-cols-3",
};

function gridClass(count: number) {
  return GRID[count] ?? "sm:grid-cols-2 lg:grid-cols-3";
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="rounded-full border border-line bg-ink-3/40 px-3 py-1 text-xs text-paper"
        >
          {renderInline(item)}
        </li>
      ))}
    </ul>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="flex gap-3">
          <span
            aria-hidden
            className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-warm"
          />
          <span className="text-sm leading-relaxed text-muted sm:text-[15px]">
            {renderInline(item)}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Numbers({ items }: { items: string[] }) {
  return (
    <ol className="space-y-2.5">
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="flex gap-3">
          <span className="mt-0.5 shrink-0 font-mono text-[11px] font-semibold text-warm">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm leading-relaxed text-muted sm:text-[15px]">
            {renderInline(item)}
          </span>
        </li>
      ))}
    </ol>
  );
}

function blockNode(block: MdBlock, key: string) {
  if (block.kind === "p") {
    const keyline = keylineOf(block.text);

    if (keyline) {
      const steps = flowSteps(keyline);
      if (steps.length > 1) {
        return (
          <div key={key}>
            <Flow steps={steps} />
          </div>
        );
      }
      return (
        <p
          key={key}
          className={`font-display text-base font-semibold leading-snug sm:text-lg ${
            keyline.includes("$") ? "text-mark" : "text-paper"
          }`}
        >
          {renderInline(keyline)}
        </p>
      );
    }

    return (
      <p key={key} className="text-sm leading-relaxed text-muted sm:text-[15px]">
        {renderInline(block.text)}
      </p>
    );
  }

  if (block.kind === "ul") {
    return isChipList(block.items) ? (
      <Chips key={key} items={block.items} />
    ) : (
      <Bullets key={key} items={block.items} />
    );
  }

  if (block.kind === "ol") {
    return <Numbers key={key} items={block.items} />;
  }

  if (block.kind === "quote") {
    return (
      <blockquote
        key={key}
        className="rounded-xl border border-warm/30 bg-warm/10 p-4 text-sm leading-relaxed text-paper sm:p-5"
      >
        {renderInline(block.text)}
      </blockquote>
    );
  }

  return null;
}

function Blocks({ blocks, idPrefix }: { blocks: MdBlock[]; idPrefix: string }) {
  return (
    <>
      {blocks.map((block, index) => blockNode(block, `${idPrefix}-${index}`))}
    </>
  );
}

function CardGrid({ cards, idPrefix }: { cards: Card[]; idPrefix: string }) {
  return (
    <div className={`grid gap-4 ${gridClass(cards.length)}`}>
      {cards.map((card, index) => (
        <section
          key={card.head}
          className="flex h-full flex-col rounded-xl border border-line/70 bg-ink-3/25 p-4 transition-colors hover:border-line-strong sm:p-5"
        >
          <header className="flex items-center gap-2.5">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-mark" />
            <h3 className="font-display text-sm font-semibold tracking-tight text-paper">
              {renderInline(card.head)}
            </h3>
          </header>
          <div className="mt-3.5 space-y-3">
            <Blocks blocks={card.blocks} idPrefix={`${idPrefix}-c${index}`} />
          </div>
        </section>
      ))}
    </div>
  );
}

function Section({ section }: { section: InvestorSection }) {
  const segments = segment(section.blocks);

  return (
    <section
      id={section.id}
      data-reveal
      className="scroll-mt-24 rounded-2xl border border-line bg-ink-2 p-5 shadow-sm sm:p-7"
    >
      <header className="flex items-start gap-4 border-b border-line pb-4">
        <span className="mt-1 shrink-0 font-mono text-[11px] font-semibold tracking-wider text-warm">
          {section.number ? String(section.number).padStart(2, "0") : "—"}
        </span>
        <h2 className="min-w-0 font-display text-lg font-semibold leading-snug text-paper sm:text-2xl">
          {renderInline(section.title)}
        </h2>
      </header>

      <div className="mt-5 space-y-5">
        {segments.map((seg, index) =>
          seg.kind === "flow" ? (
            <div key={`f${index}`} className="space-y-4">
              <Blocks blocks={seg.blocks} idPrefix={`${section.id}-f${index}`} />
            </div>
          ) : (
            <CardGrid
              key={`g${index}`}
              cards={seg.cards}
              idPrefix={`${section.id}-g${index}`}
            />
          ),
        )}
      </div>
    </section>
  );
}

export function InvestorProposalView({
  locale,
  copy,
}: {
  locale: Locale;
  copy: InvestorsPageCopy;
}) {
  const { sections } = getInvestorProposal(locale);

  return (
    <div className="mt-14 grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-line bg-ink-2 p-4 sm:p-5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-mark">
              {copy.contentsLabel}
            </span>
            <span className="font-mono text-[10px] text-muted">
              {sections.length} {locale === "ru" ? "разделов" : "sections"}
            </span>
          </div>
          <nav className="mt-3 max-h-[19rem] overflow-y-auto pr-1 lg:max-h-[calc(100vh-11rem)]">
            <ol className="space-y-0.5">
              {sections.map((section) => (
                <li key={section.id}>
                  <Link
                    href={`#${section.id}`}
                    className="group flex items-baseline gap-2 rounded-lg px-2 py-1.5 text-xs text-muted transition-colors hover:bg-ink-3/50 hover:text-paper"
                  >
                    <span className="font-mono text-[10px] text-warm/80 group-hover:text-warm">
                      {section.number
                        ? String(section.number).padStart(2, "0")
                        : "—"}
                    </span>
                    <span className="leading-snug">{section.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mt-3 border-t border-line pt-3">
            <p className="text-[11px] leading-relaxed text-muted">
              {copy.downloadHint}
            </p>
          </div>
        </div>
      </aside>

      <div className="space-y-5">
        {sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}

/** Delay helper for staggered reveals inside the page shell. */
export function revealDelay(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}
