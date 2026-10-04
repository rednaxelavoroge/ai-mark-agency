"use client";

import { useState, useRef, useEffect } from "react";
import type { PartnerNotificationItem } from "@/lib/partner/notifications";
import { markNotificationReadAction, markAllNotificationsReadAction } from "@/app/partner/notifications/actions";
import { formatDateTime } from "@/lib/partner/format";

export function PartnerNotificationsBadge({
  notifications = [],
  unreadCount = 0,
  locale = "en",
}: {
  notifications?: PartnerNotificationItem[];
  unreadCount?: number;
  locale?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const titleText = locale === "ru" ? "Уведомления" : "Notifications";
  const emptyText = locale === "ru" ? "Нет новых уведомлений" : "No new notifications";
  const markAllText = locale === "ru" ? "Прочитать все" : "Mark all as read";

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={titleText}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-ink-2/60 text-muted transition hover:border-line-strong hover:text-paper"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>

        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-mark px-1 text-[10px] font-bold text-mark-ink">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-80 sm:w-96 origin-top-right rounded-2xl border border-line bg-ink-2 p-3 shadow-xl ring-1 ring-black/5 focus:outline-none">
          <div className="flex items-center justify-between border-b border-line/60 pb-2 px-1">
            <span className="text-xs font-semibold tracking-wide text-paper uppercase">
              {titleText}
            </span>
            {unreadCount > 0 ? (
              <form action={markAllNotificationsReadAction} onSubmit={() => setOpen(false)}>
                <button
                  type="submit"
                  className="text-[11px] text-mark hover:underline"
                >
                  {markAllText}
                </button>
              </form>
            ) : null}
          </div>

          <div className="mt-2 max-h-80 overflow-y-auto space-y-2">
            {notifications.length === 0 ? (
              <p className="py-6 text-center text-xs text-muted">{emptyText}</p>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-xl border p-3 transition-colors ${
                    item.read_at
                      ? "border-line/40 bg-ink-3/20 opacity-80"
                      : "border-mark/30 bg-mark/5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-paper">
                      {item.title}
                    </span>
                    <span className="font-mono text-[10px] text-muted shrink-0">
                      {formatDateTime(item.created_at)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    {item.message}
                  </p>
                  {!item.read_at ? (
                    <form action={markNotificationReadAction} className="mt-2 text-right">
                      <input type="hidden" name="notification_id" value={item.id} />
                      <button
                        type="submit"
                        className="text-[10px] text-warm hover:underline"
                      >
                        ✓
                      </button>
                    </form>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
