import { CabinetSkeleton } from "@/components/platform/CabinetSkeleton";

/**
 * Shown as soon as the session check finishes, while the cabinet shell and
 * its first queries are still running.
 */
export default function PartnerLoading() {
  return (
    <div className="min-h-svh bg-ink">
      <div className="border-b border-line px-4 py-3 lg:hidden">
        <div className="h-6 w-36 rounded-lg bg-ink-3/80 motion-safe:animate-pulse" />
      </div>
      <div className="mx-auto w-full max-w-[92rem] px-4 py-6 sm:px-6">
        <CabinetSkeleton />
      </div>
    </div>
  );
}
