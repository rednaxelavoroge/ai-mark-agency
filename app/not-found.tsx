import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-mono text-xs text-mark">404</p>
      <h1 className="mt-3 font-display text-3xl">{site.name}</h1>
      <p className="mt-3 text-muted">This page is not here.</p>
      <Link href="/" className="mt-8 inline-block text-sm text-mark hover:underline">
        ← Home
      </Link>
    </div>
  );
}
