/**
 * i18n configuration.
 *
 * Locale routing is handled by the `app/[lang]` segment (Next.js native
 * internationalization). English is the default and source-of-truth locale;
 * Hindi content is overlaid from the `Translation` table at render time and
 * falls back to English wherever a translation is absent.
 *
 * The locale codes here match the Prisma `Locale` enum values exactly.
 */

export const locales = ["en", "hi"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Native display name for each locale (used by the language switcher). */
export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
};

/** Short label for compact UI (e.g. the header switch). */
export const localeShortNames: Record<Locale, string> = {
  en: "EN",
  hi: "हिं",
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/**
 * Prefix an internal href with the active locale.
 *   localePath("hi", "/")        -> "/hi"
 *   localePath("en", "/about")   -> "/en/about"
 * External/absolute URLs and hash links are returned unchanged.
 */
export function localePath(locale: Locale, href: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  const clean = href === "/" ? "" : href.startsWith("/") ? href : `/${href}`;
  return `/${locale}${clean}`;
}

/** Interpolate `{name}` placeholders in a dictionary string. Safe on client & server. */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}

/**
 * Swap the locale prefix on a pathname while preserving the rest of the path.
 * Used by the language switcher.
 */
export function switchLocaleInPath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/");
  // segments[0] is "" (leading slash); segments[1] is the current locale.
  if (isLocale(segments[1])) {
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  }
  return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
}
