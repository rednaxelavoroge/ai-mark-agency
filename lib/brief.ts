/** First sentence only, so public pages match the sample's copy density. */
export function brief(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  const cut = clean.split(/(?<=[.!?])\s/)[0];
  return (cut || clean).trim();
}
