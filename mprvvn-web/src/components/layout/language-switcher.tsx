"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  locales,
  localeNames,
  localeShortNames,
  switchLocaleInPath,
  type Locale,
} from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * EN | हिं toggle. Uses real <Link>s so it works without client JS and the
 * current path is preserved when switching locale.
 */
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center overflow-hidden rounded-md border border-beige-300/40"
    >
      {locales.map((loc) => {
        const active = loc === current;
        return (
          <Link
            key={loc}
            href={switchLocaleInPath(pathname, loc)}
            hrefLang={loc}
            aria-current={active ? "true" : undefined}
            aria-label={localeNames[loc]}
            className={cn(
              "px-2.5 py-1 text-xs font-bold transition-colors",
              active
                ? "bg-gold-400 text-olive-900"
                : "bg-transparent text-beige-100 hover:bg-olive-700",
            )}
          >
            {localeShortNames[loc]}
          </Link>
        );
      })}
    </div>
  );
}
