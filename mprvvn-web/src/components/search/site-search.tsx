"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, FileText, Search, X } from "lucide-react";
import { format, localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { searchEntries } from "@/config/search-index";

type Props = {
  lang: Locale;
  searchDict: Dictionary["search"];
  navDict: Dictionary["nav"];
  triggerLabel: string;
};

/**
 * Navbar search: a trigger button plus a modal (Ctrl/⌘+K to open, Esc to close).
 * Both live in one component so the fixed-position modal can be mounted from the
 * header without extra context. Ported from the legacy React `SearchModal`.
 */
export function SiteSearch({ lang, searchDict, navDict, triggerLabel }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const index = useMemo(
    () =>
      searchEntries.map((e) => ({
        title: navDict[e.navKey],
        path: localePath(lang, e.path),
        haystack: `${navDict[e.navKey]} ${e.tags}`.toLowerCase(),
      })),
    [lang, navDict],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return index.filter((item) => item.haystack.includes(q));
  }, [query, index]);

  // Global shortcuts: Ctrl/⌘+K opens, Esc closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setQuery("");
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus the input when the modal opens.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 40);
    return () => clearTimeout(t);
  }, [open]);

  const suggestionKeys: (keyof Dictionary["nav"])[] = [
    "auctions",
    "plantation",
    "nursery",
    "contact",
    "csr",
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setQuery("");
          setOpen(true);
        }}
        className="flex items-center gap-2 rounded-md border border-beige-300/40 bg-olive-700/40 px-3 py-1.5 text-xs font-semibold text-beige-100 transition-colors hover:bg-olive-700"
        aria-label={triggerLabel}
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">{triggerLabel}</span>
        <kbd className="ml-1 hidden rounded bg-olive-900/60 px-1.5 py-0.5 font-mono text-[10px] text-beige-200 lg:inline">
          Ctrl K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[2000] flex items-start justify-center px-4 pt-20 md:pt-28"
          role="dialog"
          aria-modal="true"
          aria-label={triggerLabel}
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-beige-100 px-5 py-4">
              <Search className="h-5 w-5 shrink-0 text-stone-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchDict.placeholder}
                className="flex-1 bg-transparent text-base text-stone-800 outline-none placeholder:text-stone-400"
                aria-label={searchDict.placeholder}
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 transition hover:bg-beige-100 hover:text-stone-600"
                aria-label={searchDict.escToClose}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {query.trim().length < 2 ? (
                <div className="p-6 text-center text-stone-400">
                  <Search className="mx-auto mb-3 h-8 w-8 opacity-30" />
                  <p className="text-sm">{searchDict.typeToSearch}</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {suggestionKeys.map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setQuery(navDict[key])}
                        className="rounded-full bg-olive-50 px-3 py-1.5 text-xs text-olive-700 transition hover:bg-olive-100"
                      >
                        {navDict[key]}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="p-6 text-center text-stone-400">
                  <Search className="mx-auto mb-3 h-8 w-8 opacity-30" />
                  <p className="text-sm">{format(searchDict.noResults, { query })}</p>
                </div>
              ) : (
                <div>
                  <div className="bg-beige-50 px-5 py-2 text-xs font-medium text-stone-500">
                    {format(searchDict.resultsCount, { count: results.length })}
                  </div>
                  {results.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 border-b border-beige-50 px-5 py-3 transition last:border-0 hover:bg-olive-50"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-olive-100">
                        <FileText className="h-4 w-4 text-olive-600" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-stone-800">
                          {item.title}
                        </span>
                        <span className="block truncate text-xs text-stone-400">{item.path}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-stone-300" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-beige-100 bg-beige-50 px-5 py-2.5 text-xs text-stone-400">
              <span>{searchDict.escToClose}</span>
              <span>{searchDict.poweredBy}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
