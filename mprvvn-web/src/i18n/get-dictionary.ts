import "server-only";
import type { Locale } from "./config";
import en from "./dictionaries/en.json";

/**
 * The dictionary shape is inferred from the English (source) catalogue, so every
 * locale is structurally type-checked against it. UI chrome only — page content
 * is sourced from the database and localized via the `Translation` overlay.
 */
export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => Promise.resolve(en as Dictionary),
  hi: () => import("./dictionaries/hi.json").then((m) => m.default as Dictionary),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (dictionaries[locale] ?? dictionaries.en)();
}
