import { readInvestorProposalSource } from "@/lib/investors";
import { isLocale, type Locale } from "@/lib/site";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }];
}

/** Serves the Markdown source of the investment proposal as a download. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    return new Response("Not found", { status: 404 });
  }

  const locale = raw as Locale;
  return new Response(readInvestorProposalSource(locale), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `inline; filename="ai-mark-investment-proposal-${locale}.md"`,
    },
  });
}
