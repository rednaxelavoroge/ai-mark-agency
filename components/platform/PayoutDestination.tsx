import { NO_DATA } from "@/lib/partner/format";

function shown(value: string | null | undefined): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : NO_DATA;
}

/** Recipient and free-text destination. Blank fields render as a dash. */
export function PayoutDestinationText({
  recipient,
  details,
}: {
  recipient: string | null | undefined;
  details: string | null | undefined;
}) {
  return (
    <div className="max-w-xs">
      <div className="break-words">{shown(recipient)}</div>
      <div className="mt-1 line-clamp-4 break-words whitespace-pre-wrap text-[11px] leading-relaxed text-muted">
        {shown(details)}
      </div>
    </div>
  );
}
