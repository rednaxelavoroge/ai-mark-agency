/**
 * Locale copy bundles keep translatable strings per locale but must share
 * identical service/metadata fields with English (ids, routes, CSS tokens, SKUs).
 */

/** @type {ReadonlySet<string>} */
export const SERVICE_FIELD_KEYS = new Set([
  "id",
  "key",
  "slug",
  "href",
  "accent",
  "icon",
  "sku",
  "color",
  "colors",
]);

/**
 * @param {unknown} enNode
 * @param {unknown} locNode
 */
export function syncServiceFieldsFromEn(enNode, locNode) {
  if (enNode === null || locNode === null) return;
  if (typeof enNode !== "object" || typeof locNode !== "object") return;

  if (Array.isArray(enNode) && Array.isArray(locNode)) {
    const len = Math.min(enNode.length, locNode.length);
    for (let i = 0; i < len; i++) {
      syncServiceFieldsFromEn(enNode[i], locNode[i]);
    }
    return;
  }

  for (const key of Object.keys(enNode)) {
    const enChild = enNode[key];
    if (!(key in locNode)) continue;
    const locChild = locNode[key];

    if (SERVICE_FIELD_KEYS.has(key)) {
      locNode[key] = enChild;
      continue;
    }

    if (
      enChild !== null &&
      typeof enChild === "object" &&
      locChild !== null &&
      typeof locChild === "object"
    ) {
      syncServiceFieldsFromEn(enChild, locChild);
    }
  }
}

/**
 * @param {unknown} enNode
 * @param {unknown} locNode
 * @param {string} path
 * @param {string} locale
 * @param {string[]} errors
 */
export function collectServiceFieldMismatches(
  enNode,
  locNode,
  path,
  locale,
  errors,
) {
  if (enNode === null || locNode === null) return;
  if (typeof enNode !== "object" || typeof locNode !== "object") return;

  if (Array.isArray(enNode) && Array.isArray(locNode)) {
    const len = Math.min(enNode.length, locNode.length);
    for (let i = 0; i < len; i++) {
      collectServiceFieldMismatches(
        enNode[i],
        locNode[i],
        `${path}[${i}]`,
        locale,
        errors,
      );
    }
    return;
  }

  for (const key of Object.keys(enNode)) {
    const nextPath = path ? `${path}.${key}` : key;
    if (!(key in locNode)) continue;
    const enChild = enNode[key];
    const locChild = locNode[key];

    if (SERVICE_FIELD_KEYS.has(key)) {
      if (enChild !== locChild) {
        errors.push(
          `${locale} ${nextPath}: expected "${enChild}", got "${locChild}"`,
        );
      }
      continue;
    }

    if (
      enChild !== null &&
      typeof enChild === "object" &&
      locChild !== null &&
      typeof locChild === "object"
    ) {
      collectServiceFieldMismatches(
        enChild,
        locChild,
        nextPath,
        locale,
        errors,
      );
    }
  }
}

/**
 * Showroom AI list price on the home featured cards (pay page starts at $199).
 * @param {Record<string, unknown>} localeRoot
 */
export function fixShowroomFeaturedPrice(localeRoot) {
  const bump = (products) => {
    if (!Array.isArray(products)) return;
    for (const item of products) {
      if (item && typeof item === "object" && item.id === "showroom") {
        if (typeof item.price === "string" && item.price.includes("349")) {
          item.price = item.price.replace(/349/g, "199");
        }
      }
    }
  };

  const home = localeRoot.homePage;
  if (home && typeof home === "object") {
    bump(home.featuredProducts);
  }
  const showcase = localeRoot.aiProductsShowcase;
  if (showcase && typeof showcase === "object") {
    bump(showcase.products);
  }
}
