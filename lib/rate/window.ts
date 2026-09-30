/** Tiny in-process fixed-window limiter (per serverless instance; best effort). */
const buckets = new Map<string, { n: number; start: number }>();

export function allow(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (now - v.start > windowMs) buckets.delete(k);
  }
  const b = buckets.get(key);
  if (!b || now - b.start > windowMs) {
    buckets.set(key, { n: 1, start: now });
    return true;
  }
  b.n += 1;
  return b.n <= max;
}
