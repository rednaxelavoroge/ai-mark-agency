import { BrandLogo } from "@/components/BrandLogo";
import { BRAND_FOOTER_LINE } from "@/lib/brand";

type BrandLockupProps = {
  /** Sets lockup height via `font-size` on the wrapper (see app/globals.css). */
  className?: string;
  variant?: "footer";
  line?: "footer" | "none";
};

/** Footer: compact mark + HTML company line (header uses full raster in BrandLogo). */
export function BrandLockup({
  className = "",
  variant = "footer",
  line = "footer",
}: BrandLockupProps) {
  const text = line === "footer" ? BRAND_FOOTER_LINE : null;

  return (
    <span className={`brand-lockup brand-lockup--${variant} ${className}`.trim()}>
      <span className="brand-lockup__mark">
        <BrandLogo crop="compact" className="brand-lockup__logo" />
      </span>
      {text ? (
        <span className="brand-lockup__line" dir="ltr">
          {text}
        </span>
      ) : null}
    </span>
  );
}
