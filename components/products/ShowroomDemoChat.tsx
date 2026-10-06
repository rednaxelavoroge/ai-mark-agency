"use client";

import { getShowroomAiCopy } from "@/content/showroom-ai";
import { openChat } from "@/lib/contact";
import type { Locale } from "@/lib/site";

/**
 * Opens the live site chat — the same hosted widget the contact launcher uses —
 * with a Showroom AI opening line already typed in.
 *
 * This is the demo on the first screen: no second chat implementation, no new
 * embed. It dispatches the launcher's own `am:open-chat` event, which
 * `ContactLauncher` handles by loading the widget and sending the message.
 */
export function ShowroomDemoChatButton({
  locale,
  label,
  className,
}: {
  locale: Locale;
  label?: string;
  className?: string;
}) {
  const c = getShowroomAiCopy(locale);
  return (
    <button
      type="button"
      onClick={() => openChat({ initialMessage: c.demoInitialMessage })}
      className={className}
    >
      {label ?? c.demoCta}
    </button>
  );
}
