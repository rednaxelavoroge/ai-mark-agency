import { BrandLogo } from "@/components/BrandLogo";
import { BRAND_FOOTER_LINE, BRAND_LOCKUP_DESCRIPTOR } from "@/lib/brand";

type BrandLockupProps = {
  /** Sets lockup height via `font-size` on the wrapper (see app/globals.css). */
  className?: string;
  variant?: "header" | "footer";
  /** Header: descriptor band. Footer: company line under the mark. */
  line?: "descriptor" | "footer" | "none";
};

/**
 * Compact mark + optional HTML line sized to the wordmark width.
 * The raster is always the compact crop; the descriptor is never baked into
 * the PNG so it stays readable at phone header sizes.
 */
export function BrandLockup({
  className = "",
  variant = "header",
  line = "descriptor",
}: BrandLockupProps) {
  const text =
    line === "descriptor"
      ? BRAND_LOCKUP_DESCRIPTOR
      : line === "footer"
        ? BRAND_FOOTER_LINE
        : null;

  return (
    <span className={`brand-lockup brand-lockup--${variant} ${className}`.trim()}>
      <span className="brand-lockup__mark">
        <BrandLogo className="brand-lockup__logo" />
      </span>
      {text ? (
        <span className="brand-lockup__line" dir="ltr">
          {text}
        </span>
      ) : null}
    </span>
  );
}
