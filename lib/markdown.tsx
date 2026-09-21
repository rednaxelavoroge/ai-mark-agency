import { Fragment, type ReactNode } from "react";

/**
 * Minimal, dependency-free Markdown reader for the investor proposal.
 *
 * It intentionally supports only the subset the proposal documents use:
 * `##` chapters, `###` cards, paragraphs, `-` / `1.` lists, `>` notes,
 * `---` rules, plus **bold**, *italic*, `code` and links inline.
 *
 * Two typographic conveniences keep the Markdown clean and source-faithful:
 *  - a paragraph that is entirely bold becomes a "keyline" pull-statement;
 *  - a keyline containing a `→` becomes a flow of chips.
 */

export type MdBlock =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "quote"; text: string }
  | { kind: "hr" };

const RE_H2 = /^##\s+(.*)$/;
const RE_H3 = /^###\s+(.*)$/;
const RE_UL = /^[-*]\s+(.*)$/;
const RE_OL = /^\d+[.)]\s+(.*)$/;
const RE_QUOTE = /^>\s?(.*)$/;
const RE_HR = /^(?:-{3,}|\*{3,}|_{3,})$/;

function startsBlock(line: string) {
  return (
    RE_H2.test(line) ||
    RE_H3.test(line) ||
    RE_UL.test(line) ||
    RE_OL.test(line) ||
    RE_QUOTE.test(line) ||
    RE_HR.test(line.trim())
  );
}

export function parseMarkdown(source: string): MdBlock[] {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks: MdBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (RE_HR.test(trimmed)) {
      blocks.push({ kind: "hr" });
      i += 1;
      continue;
    }

    let match = RE_H3.exec(trimmed);
    if (match) {
      blocks.push({ kind: "h3", text: match[1].trim() });
      i += 1;
      continue;
    }

    match = RE_H2.exec(trimmed);
    if (match) {
      blocks.push({ kind: "h2", text: match[1].trim() });
      i += 1;
      continue;
    }

    match = RE_QUOTE.exec(trimmed);
    if (match) {
      const buffer: string[] = [];
      while (i < lines.length) {
        const inner = RE_QUOTE.exec(lines[i].trim());
        if (!inner) break;
        buffer.push(inner[1].trim());
        i += 1;
      }
      blocks.push({ kind: "quote", text: buffer.join(" ") });
      continue;
    }

    match = RE_UL.exec(trimmed);
    if (match) {
      const items: string[] = [];
      while (i < lines.length) {
        const inner = RE_UL.exec(lines[i].trim());
        if (!inner) break;
        items.push(inner[1].trim());
        i += 1;
      }
      blocks.push({ kind: "ul", items });
      continue;
    }

    match = RE_OL.exec(trimmed);
    if (match) {
      const items: string[] = [];
      while (i < lines.length) {
        const inner = RE_OL.exec(lines[i].trim());
        if (!inner) break;
        items.push(inner[1].trim());
        i += 1;
      }
      blocks.push({ kind: "ol", items });
      continue;
    }

    const paragraph: string[] = [trimmed];
    i += 1;
    while (i < lines.length) {
      const next = lines[i].trim();
      if (!next || startsBlock(next)) break;
      paragraph.push(next);
      i += 1;
    }
    blocks.push({ kind: "p", text: paragraph.join(" ") });
  }

  return blocks;
}

const RE_INLINE = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

export function renderInline(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  for (const match of text.matchAll(RE_INLINE)) {
    const index = match.index ?? 0;
    if (index > cursor) nodes.push(text.slice(cursor, index));

    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++} className="font-semibold text-paper">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={key++}
          className="rounded bg-ink-3/60 px-1.5 py-0.5 font-mono text-[0.85em] text-paper"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("[")) {
      const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token);
      nodes.push(
        <a
          key={key++}
          href={link?.[2] ?? "#"}
          className="link-underline font-medium text-mark"
        >
          {link?.[1] ?? token}
        </a>,
      );
    } else {
      nodes.push(
        <em key={key++} className="italic text-paper">
          {token.slice(1, -1)}
        </em>,
      );
    }

    cursor = index + token.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

/** A paragraph wrapped entirely in `**…**` is the author's emphasis line. */
export function keylineOf(text: string): string | null {
  const match = /^\*\*([^*]+)\*\*$/.exec(text.trim());
  return match ? match[1].trim() : null;
}

/** Split a keyline that is a `→` pipeline into its steps. */
export function flowSteps(line: string): string[] {
  if (!line.includes("→")) return [];
  return line
    .split("→")
    .map((step) => step.trim())
    .filter(Boolean);
}

export function isChipList(items: string[]): boolean {
  return (
    items.length > 1 &&
    items.every(
      (item) => item.length <= 34 && !/[.;:,]$/.test(item) && !item.includes("→"),
    )
  );
}

export function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
      {steps.map((step, index) => (
        <Fragment key={`${step}-${index}`}>
          {index > 0 ? (
            <span aria-hidden className="font-mono text-[11px] text-warm">
              →
            </span>
          ) : null}
          <span className="rounded-full border border-line bg-ink-3/40 px-2.5 py-1 font-mono text-[11px] tracking-tight text-paper">
            {step}
          </span>
        </Fragment>
      ))}
    </div>
  );
}
