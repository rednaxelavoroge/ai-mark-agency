"use client";

import { useCabinetCopy } from "@/components/platform/CabinetCopyProvider";

/** Short notice when sign-in cannot start. Operator detail stays in the server log. */
export function SetupNotice() {
  const copy = useCabinetCopy();
  const notice = copy.auth.setupNotice;
  return (
    <div className="rounded-xl border border-danger/30 bg-danger/5 p-4 text-xs text-danger">
      <p className="font-semibold">{notice.title}</p>
      <p className="mt-1.5 leading-relaxed">{notice.body}</p>
    </div>
  );
}
