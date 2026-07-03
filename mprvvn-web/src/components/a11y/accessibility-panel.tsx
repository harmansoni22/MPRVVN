"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accessibility,
  BookOpen,
  Check,
  Contrast,
  Highlighter,
  Palette,
  PenTool,
  RotateCcw,
  Type,
  Underline,
  X,
} from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type Settings = {
  highContrast: boolean;
  grayscale: boolean;
  largeText: boolean;
  readableFont: boolean;
  dyslexicFont: boolean;
  highlightLinks: boolean;
  underlineLinks: boolean;
};

const DEFAULTS: Settings = {
  highContrast: false,
  grayscale: false,
  largeText: false,
  readableFont: false,
  dyslexicFont: false,
  highlightLinks: false,
  underlineLinks: false,
};

const STORAGE_KEY = "mprvvn-a11y";

/**
 * Government-style accessibility widget (ported from the legacy React app).
 * Floating button + popup with high-contrast, grayscale, text-resize, readable/
 * dyslexic fonts and link emphasis toggles. Settings persist in localStorage and
 * are applied to <html>/<body>; the CSS lives in globals.css.
 */
export function AccessibilityPanel({ labels }: { labels: Dictionary["a11y"] }) {
  const [open, setOpen] = useState(false);
  // Lazy initial state hydrates from localStorage on the client. The widget's
  // initial markup (button + closed panel) doesn't depend on these values, so
  // starting from DEFAULTS on the server causes no hydration mismatch.
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window === "undefined") return DEFAULTS;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) } : DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });
  const panelRef = useRef<HTMLDivElement>(null);

  // Apply settings to the document and persist them.
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    body.classList.toggle("accessibility-high-contrast", settings.highContrast);
    body.classList.toggle("accessibility-highlight-links", settings.highlightLinks);
    body.classList.toggle("accessibility-underline-links", settings.underlineLinks);

    body.style.filter = settings.grayscale ? "grayscale(100%)" : "";
    root.style.fontSize = settings.largeText ? "118%" : "";

    if (settings.dyslexicFont) {
      body.style.fontFamily = "'Comic Sans MS', 'Chalkboard SE', cursive";
    } else if (settings.readableFont) {
      body.style.fontFamily = "Georgia, 'Times New Roman', serif";
    } else {
      body.style.fontFamily = "";
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = (key: keyof Settings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const resetAll = () => setSettings(DEFAULTS);

  const options: { key: keyof Settings; label: string; icon: typeof Contrast }[] = [
    { key: "highContrast", label: labels.highContrast, icon: Contrast },
    { key: "grayscale", label: labels.grayscale, icon: Palette },
    { key: "largeText", label: labels.largeText, icon: Type },
    { key: "readableFont", label: labels.readableFont, icon: BookOpen },
    { key: "dyslexicFont", label: labels.dyslexicFont, icon: PenTool },
    { key: "highlightLinks", label: labels.highlightLinks, icon: Highlighter },
    { key: "underlineLinks", label: labels.underlineLinks, icon: Underline },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "fixed bottom-5 left-5 z-[1001] flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300",
          open
            ? "rotate-90 bg-olive-800 text-beige-50"
            : "border border-olive-200 bg-white text-olive-700 hover:bg-olive-50",
        )}
        aria-label={labels.buttonLabel}
        aria-expanded={open}
        aria-haspopup="dialog"
        title={labels.buttonLabel}
      >
        <Accessibility className="h-6 w-6" />
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label={labels.title}
          className="animate-in fade-in slide-in-from-bottom-2 fixed bottom-20 left-5 z-[1001] w-72 overflow-hidden rounded-2xl border border-beige-200 bg-white shadow-2xl duration-200"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-olive-800 to-olive-700 px-5 py-4">
            <h2 className="flex items-center gap-2 text-sm font-bold text-beige-50">
              <Accessibility className="h-4 w-4" /> {labels.title}
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-beige-100/70 transition hover:text-beige-50"
              aria-label={labels.title}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-96 space-y-2 overflow-y-auto p-4">
            {options.map(({ key, label, icon: Icon }) => {
              const on = settings[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggle(key)}
                  aria-pressed={on}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
                    on
                      ? "border-olive-200 bg-olive-50 text-olive-700"
                      : "border-transparent text-stone-700 hover:bg-beige-50",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      on ? "bg-olive-600 text-beige-50" : "bg-beige-100 text-stone-500",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-left">{label}</span>
                  {on && <Check className="h-3.5 w-3.5 text-olive-600" />}
                </button>
              );
            })}
          </div>

          <div className="border-t border-beige-100 p-4">
            <button
              type="button"
              onClick={resetAll}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-beige-100 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-beige-200"
            >
              <RotateCcw className="h-4 w-4" /> {labels.resetAll}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
