import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { defaultLocale, type Locale } from "@/i18n/config";

/**
 * Data Access Layer — centralized session/authorization helpers.
 * Memoized with React `cache` so repeated calls within one render/request
 * do not re-verify the session.
 */

export const getSession = cache(async () => auth());

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}

/**
 * Server-side guard for admin pages, Server Actions and Route Handlers.
 * Requires both a valid session AND the ADMIN role (defence-in-depth beyond the
 * proxy's optimistic cookie check). Redirects to login otherwise.
 */
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }
  return user;
}

export async function isAuthenticated() {
  return (await getCurrentUser()) !== null;
}

/**
 * Content localization overlay.
 *
 * English (the default locale) is the source of truth and lives on each row.
 * For any other locale we overlay the translated `fields` from the
 * `Translation` table, FALLING BACK to the English source value wherever a
 * translation is missing or empty — so Hindi pages are never blank and no
 * content is ever fabricated. `model` must match the value stored in
 * `Translation.model` (typically the Prisma model name, e.g. "Objective").
 */
export async function localize<T extends { id: string }>(
  locale: Locale,
  model: string,
  rows: T[],
  fields: (keyof T & string)[],
): Promise<T[]> {
  if (locale === defaultLocale || rows.length === 0) return rows;

  const translations = await db.translation.findMany({
    where: {
      locale,
      model,
      recordId: { in: rows.map((r) => r.id) },
      field: { in: fields },
    },
  });
  if (translations.length === 0) return rows;

  const byRecord = new Map<string, Map<string, string>>();
  for (const t of translations) {
    const fieldMap = byRecord.get(t.recordId) ?? new Map<string, string>();
    fieldMap.set(t.field, t.value);
    byRecord.set(t.recordId, fieldMap);
  }

  return rows.map((row) => {
    const fieldMap = byRecord.get(row.id);
    if (!fieldMap) return row;
    const next: T = { ...row };
    for (const field of fields) {
      const value = fieldMap.get(field);
      if (value != null && value !== "") {
        (next as Record<string, unknown>)[field] = value;
      }
    }
    return next;
  });
}

/** Single-row convenience wrapper around {@link localize}. */
export async function localizeOne<T extends { id: string }>(
  locale: Locale,
  model: string,
  row: T | null,
  fields: (keyof T & string)[],
): Promise<T | null> {
  if (!row) return null;
  const [out] = await localize(locale, model, [row], fields);
  return out ?? row;
}
