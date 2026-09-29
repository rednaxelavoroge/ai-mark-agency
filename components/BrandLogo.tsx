/**
 * AI MARK brand lockup — compact crop only.
 *
 * The full PNG bakes in a tagline that is unreadably small in the header and
 * collided with the nav at 1440px. The readable line "Venture and Marketing"
 * is set in HTML next to this mark (see Header and Footer), in English on
 * every locale. Both theme files are the approved artwork; nothing here
 * redraws it.
 */
export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-plate ${className}`}>
      <picture className="brand-logo-light">
        <img
          src="/brand/ai-mark-logo-compact-light.png"
          alt="AI MARK"
          width={1844}
          height={261}
          className="brand-logo"
        />
      </picture>
      <picture className="brand-logo-dark">
        <img
          src="/brand/ai-mark-logo-compact-dark.png"
          alt=""
          width={1844}
          height={261}
          className="brand-logo"
        />
      </picture>
    </span>
  );
}
