"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { SiteSearch } from "@/components/search/site-search";
import type { PublicNavItem, SiteSettings } from "@/lib/public-content";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string, isHome: boolean) {
  if (isHome) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

type HeaderProps = {
  lang: Locale;
  dict: Dictionary;
  navItems: PublicNavItem[];
  settings: SiteSettings;
};

export function SiteHeader({ lang, dict, navItems, settings }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [today, setToday] = useState<string | null>(null);

  // Render the date only after mount to avoid an SSR/client hydration mismatch.
  // Deferred via rAF so the state update happens in a callback, not synchronously
  // in the effect body.
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      setToday(
        new Date().toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      ),
    );
    return () => cancelAnimationFrame(id);
  }, [lang]);

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenMobileGroup(null);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Government info bar */}
      <div className="bg-olive-900 text-beige-100">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-4 py-1.5 text-xs xl:px-8">
          <span className="truncate opacity-90">{today ?? " "}</span>
          <div className="flex items-center gap-3">
            <SiteSearch
              lang={lang}
              searchDict={dict.search}
              navDict={dict.nav}
              triggerLabel={dict.common.search}
            />
            <LanguageSwitcher current={lang} label={dict.common.changeLanguage} />
          </div>
        </div>
      </div>

      {/* Logo / identity row */}
      <div className="border-b border-beige-200 bg-beige-50">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-2.5 xl:px-8">
          <Link href={localePath(lang, "/")} className="flex items-center gap-3">
            <Image
              src={settings?.logoUrl ?? "/logo.png"}
              alt={`${settings?.shortName ?? dict.header.shortName} logo`}
              width={56}
              height={56}
              priority
              className="h-14 w-14 object-contain"
            />
            <span className="leading-tight">
              <span className="block text-base font-extrabold tracking-tight text-olive-900 md:text-lg">
                {settings?.siteName ?? dict.header.orgName}
              </span>
              <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-widest text-olive-500">
                {settings?.tagline ?? dict.header.tagline}
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-olive-800 text-beige-50 transition-colors hover:bg-olive-700 lg:hidden"
            aria-label={mobileOpen ? dict.common.closeMenu : dict.common.openMenu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Desktop navigation */}
      <nav
        aria-label={dict.common.menu}
        className="hidden border-b border-olive-900 bg-olive-800 shadow-md lg:block"
      >
        <ul className="mx-auto flex w-full max-w-7xl items-stretch justify-center px-4 text-sm font-semibold text-beige-100 xl:px-8">
          {navItems.map((item) => (
            <DesktopNavItem key={item.id} item={item} lang={lang} pathname={pathname} />
          ))}
        </ul>
      </nav>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 top-0 z-50 overflow-y-auto bg-white lg:hidden">
          <div className="flex items-center justify-between border-b border-beige-200 bg-beige-50 px-4 py-3">
            <span className="text-sm font-bold text-olive-900">{dict.common.menu}</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-olive-700 hover:bg-beige-100"
              aria-label={dict.common.closeMenu}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <ul className="divide-y divide-beige-100">
            {navItems.map((item) => {
              const hasChildren = !!item.children?.length;
              const expanded = openMobileGroup === item.id;
              const href = item.isExternal ? item.href : localePath(lang, item.href);
              return (
                <li key={item.id}>
                  <div className="flex items-center justify-between px-4">
                    <Link
                      href={href}
                      onClick={closeMobile}
                      className={cn(
                        "flex-1 py-3 text-sm font-bold",
                        isActive(pathname, href, item.href === "/")
                          ? "text-olive-900"
                          : "text-olive-700",
                      )}
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        onClick={() => setOpenMobileGroup(expanded ? null : item.id)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-olive-400 hover:bg-beige-100"
                        aria-label={item.label}
                        aria-expanded={expanded}
                      >
                        <ChevronDown
                          className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
                        />
                      </button>
                    )}
                  </div>
                  {hasChildren && expanded && (
                    <ul className="border-y border-beige-100 bg-beige-50 py-1">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={child.isExternal ? child.href : localePath(lang, child.href)}
                            onClick={closeMobile}
                            className="block py-2.5 pl-8 pr-4 text-sm font-medium text-olive-600 hover:bg-beige-100 hover:text-olive-900"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}

function DesktopNavItem({
  item,
  lang,
  pathname,
}: {
  item: PublicNavItem;
  lang: Locale;
  pathname: string;
}) {
  const href = item.isExternal ? item.href : localePath(lang, item.href);
  const active = isActive(pathname, href, item.href === "/");
  const hasChildren = !!item.children?.length;

  return (
    <li className="group relative">
      <Link
        href={href}
        className={cn(
          "flex h-full items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-3.5 transition-colors",
          active
            ? "border-gold-400 bg-olive-700 text-gold-300"
            : "border-transparent hover:bg-olive-700 hover:text-gold-200",
        )}
      >
        {item.label}
        {hasChildren && <ChevronDown className="h-3 w-3 opacity-70" />}
      </Link>

      {hasChildren && (
        <div className="invisible absolute left-0 top-full z-50 min-w-[240px] pt-1 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
          <div className="overflow-hidden rounded-b-lg border border-beige-200 bg-white shadow-xl">
            <div className="h-0.5 w-full bg-gold-400" />
            <ul className="py-1.5">
              {item.children.map((child) => (
                <li key={child.id}>
                  <Link
                    href={child.isExternal ? child.href : localePath(lang, child.href)}
                    className="block border-b border-beige-100 px-5 py-2.5 text-sm font-medium text-olive-800 transition-colors last:border-0 hover:bg-beige-50 hover:text-olive-900"
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
}
