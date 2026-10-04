import { getLaunchBonusTimer, formatLaunchBonusTimerText } from "@/lib/partner/launch-timer";
import type { Locale } from "@/lib/site";

export function LaunchBonusTimerBanner({
  locale = "en",
  variant = "cabinet",
  className = "",
}: {
  locale?: string | Locale;
  variant?: "cabinet" | "public";
  className?: string;
}) {
  const timer = getLaunchBonusTimer();
  if (!timer) return null;

  const text = formatLaunchBonusTimerText(timer, locale);

  if (variant === "public") {
    return (
      <div
        data-reveal
        className={`inline-flex items-center gap-2 rounded-full border border-mark/40 bg-mark/10 px-3.5 py-1.5 text-xs font-medium text-mark ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mark opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-mark" />
        </span>
        <span className="font-mono tracking-tight">{text}</span>
      </div>
    );
  }

  return (
    <div
      role="status"
      className={`flex items-center justify-between gap-3 rounded-xl border border-mark/30 bg-mark/5 px-4 py-3 text-xs text-paper ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mark opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-mark" />
        </span>
        <span className="font-medium text-mark">{text}</span>
      </div>
      <span className="hidden font-mono text-[11px] text-muted sm:inline">
        50/15/7/5/3
      </span>
    </div>
  );
}
