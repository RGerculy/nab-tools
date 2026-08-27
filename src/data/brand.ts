/** Site branding — change BRAND below to rebrand the whole site. */
export const BRAND = 'NAB Tools';
export const BRAND_TAGLINE = 'Free online tools that run 100% in your browser';
export const DEFAULT_TITLE = `${BRAND} — ${BRAND_TAGLINE}`;

export function pageTitle(title: string): string {
  return `${title} — ${BRAND}`;
}
