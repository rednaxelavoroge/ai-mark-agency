/**
 * X/Twitter reads `twitter:image` for `summary_large_image` cards. Reusing the
 * Open Graph handler keeps the two tags from ever drifting apart.
 */
export const dynamic = "force-static";

export { alt, contentType, default, generateStaticParams, size } from "./opengraph-image";
