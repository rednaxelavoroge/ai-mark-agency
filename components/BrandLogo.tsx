/**
 * AI MARK brand lockup — the approved raster package.
 *
 * Both files are crops of the one client-approved PNG
 * (`public/brand/ai-mark-logo-master.png`); nothing here redraws, recolours,
 * re-typesets or re-proportions the artwork, it only constrains how much space
 * the art may occupy:
 *
 *   ai-mark-logo.png          mark + AI MARK wordmark + the
 *                             "AI-NATIVE VENTURE & MARKETING" descriptor.
 *   ai-mark-logo-compact.png  the same artwork with only the descriptor band
 *                             removed, for viewports where a ~4 px descriptor
 *                             would be unreadable microtext.
 *
 * A native <picture> picks the source, so exactly one file is ever painted and
 * only one is downloaded — no CSS `display` juggling, and the home link keeps a
 * single accessible name from the <img> fallback.
 *
 * The artwork ships on its own white plate, so it is inset in a light surface
 * container (`.brand-plate` in app/globals.css). That is deliberate on both
 * themes: the site's dark theme keeps the same approved ink rather than
 * swapping to a different, redrawn lockup.
 *
 * Plain <img> on purpose: these are fixed rasters with no responsive variants
 * for the optimizer to negotiate.
 */
export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-plate ${className}`}>
      {/* Light theme artwork */}
      <picture className="brand-logo-light">
        <source media="(min-width: 640px)" srcSet="/brand/ai-mark-logo-light.png" />
        <img
          src="/brand/ai-mark-logo-compact-light.png"
          alt="AI MARK — AI-NATIVE VENTURE & MARKETING"
          width={1844}
          height={261}
          className="brand-logo"
        />
      </picture>
      {/* Dark theme artwork */}
      <picture className="brand-logo-dark">
        <source media="(min-width: 640px)" srcSet="/brand/ai-mark-logo-dark.png" />
        <img
          src="/brand/ai-mark-logo-compact-dark.png"
          alt="AI MARK — AI-NATIVE VENTURE & MARKETING"
          width={1844}
          height={261}
          className="brand-logo"
        />
      </picture>
    </span>
  );
}
