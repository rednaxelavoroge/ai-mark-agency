import type { ReactNode } from "react";
import { cardClass } from "@/components/ui/classes";
import { NO_DATA } from "@/lib/partner/format";

/**
 * Read-only table for ledger and attribution rows.
 * The caller passes stored values. This component does not add them up.
 */
export function DataTable({
  columns,
  rows,
  empty,
  unreadable,
}: {
  columns: string[];
  rows: ReactNode[][];
  empty: string;
  unreadable: boolean;
}) {
  if (unreadable) {
    return (
      <p className="text-sm text-muted">
        {NO_DATA} This list could not be read.
      </p>
    );
  }

  if (rows.length === 0) {
    return <p className="max-w-2xl text-sm leading-relaxed text-muted">{empty}</p>;
  }

  return (
    <div className={`overflow-x-auto ${cardClass}`}>
      <table className="w-full min-w-[40rem] text-left text-xs">
        <thead>
          <tr className="border-b border-line text-[10px] tracking-[0.14em] text-muted uppercase">
            {columns.map((column) => (
              <th key={column} className="px-4 py-3 font-medium">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-line/70 last:border-b-0">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 align-top text-paper">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
