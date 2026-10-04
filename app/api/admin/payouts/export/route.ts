import { NextResponse } from "next/server";
import { getAdminPayoutSheet, requireAdmin } from "@/lib/auth/dal";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin("/admin/payouts");
    const sheet = await getAdminPayoutSheet();

    if (!sheet.rows) {
      return new NextResponse("Failed to read payout sheet", { status: 500 });
    }

    const header = [
      "Commission ID",
      "Partner ID",
      "Level",
      "Type",
      "Amount",
      "Currency",
      "Wallet Address",
      "Status",
      "Anti-Fraud Flags",
      "Created At",
    ];

    const escapeCsv = (val: string | number | null | undefined): string => {
      const str = val === null || val === undefined ? "" : String(val);
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const csvLines = [
      header.join(","),
      ...sheet.rows.map((row) =>
        [
          escapeCsv(row.id),
          escapeCsv(row.partnerId),
          escapeCsv(`L${row.level}`),
          escapeCsv(row.commissionType),
          escapeCsv(row.amount),
          escapeCsv(row.currency),
          escapeCsv(row.wallet ?? ""),
          escapeCsv(row.status),
          escapeCsv(row.flags.join("; ")),
          escapeCsv(row.createdAt),
        ].join(","),
      ),
    ];

    const csvContent = csvLines.join("\n");
    const filename = `payout-sheet-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return new NextResponse(message, { status: 401 });
  }
}
