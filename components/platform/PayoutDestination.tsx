import { NETWORK_LABELS } from "@/lib/crypto/networks";
import { parsePayoutDetails } from "@/lib/crypto/payout-destination";
import { NO_DATA } from "@/lib/partner/format";

function shown(value: string | null | undefined): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : NO_DATA;
}

/** Recipient and destination. Structured USDC rows show network + address. */
export function PayoutDestinationText({
  recipient,
  details,
}: {
  recipient: string | null | undefined;
  details: string | null | undefined;
}) {
  const parsed = parsePayoutDetails(details);
  return (
    <div className="max-w-xs">
      <div className="break-words">{shown(recipient)}</div>
      {parsed ? (
        <div className="mt-1 grid gap-0.5 text-[11px] leading-relaxed">
          <div className="text-muted">
            {parsed.asset} · {NETWORK_LABELS[parsed.network]}
          </div>
          <div className="break-all font-mono text-paper">{parsed.address}</div>
          {parsed.notes ? (
            <div className="whitespace-pre-wrap text-muted">{parsed.notes}</div>
          ) : null}
        </div>
      ) : (
        <div className="mt-1 line-clamp-4 break-words whitespace-pre-wrap text-[11px] leading-relaxed text-muted">
          {shown(details)}
        </div>
      )}
    </div>
  );
}
