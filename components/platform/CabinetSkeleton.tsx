import { cardClass } from "@/components/ui/classes";

function Block({ className }: { className: string }) {
  return <div className={`rounded-lg bg-ink-3/80 motion-safe:animate-pulse ${className}`} />;
}

/** Content placeholder shown while a cabinet page resolves. No figures. */
export function CabinetSkeleton() {
  return (
    <div className="grid gap-7" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading</span>
      <div className="border-b border-line pb-6">
        <Block className="h-3 w-28" />
        <Block className="mt-3 h-8 w-56 max-w-full" />
        <Block className="mt-3 h-4 w-full max-w-md" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <Block className={`h-24 ${cardClass}`} />
        <Block className={`h-24 ${cardClass}`} />
        <Block className={`h-24 ${cardClass}`} />
        <Block className={`h-24 ${cardClass}`} />
      </div>
      <Block className={`h-40 ${cardClass}`} />
    </div>
  );
}
