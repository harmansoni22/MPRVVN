"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Group = { group: string; items: { key: string; label: string }[] };

function NavLinks({
  groups,
  pathname,
  onNavigate,
}: {
  groups: Group[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      <Link
        href="/admin"
        onClick={onNavigate}
        className={cn(
          "mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
          pathname === "/admin" ? "bg-olive-800 text-beige-50" : "text-stone-700 hover:bg-beige-100",
        )}
      >
        <LayoutDashboard className="h-4 w-4" /> Dashboard
      </Link>

      {groups.map((group) => (
        <div key={group.group} className="mb-4">
          <p className="px-3 pb-1 pt-3 text-[11px] font-bold uppercase tracking-wider text-stone-400">
            {group.group}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const href = `/admin/${item.key}`;
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={item.key}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={cn(
                      "block rounded-lg px-3 py-1.5 text-sm transition-colors",
                      active
                        ? "bg-olive-100 font-semibold text-olive-900"
                        : "text-stone-600 hover:bg-beige-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}

function Brand() {
  return (
    <div className="border-b border-beige-200 px-5 py-4">
      <span className="text-base font-extrabold text-olive-900">MPRVVN CMS</span>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
        Content Management
      </p>
    </div>
  );
}

/** Desktop sidebar — sticky, full-height, scrolls independently. */
export function AdminSidebar({ groups }: { groups: Group[] }) {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 shrink-0 flex-col self-start border-r border-beige-200 bg-white lg:sticky lg:top-0 lg:flex lg:h-screen">
      <Brand />
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <NavLinks groups={groups} pathname={pathname} />
      </nav>
    </aside>
  );
}

/** Mobile hamburger + slide-in drawer (rendered in the dashboard top bar). */
export function AdminMobileNav({ groups }: { groups: Group[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // The drawer closes via each link's onNavigate handler (below), so no
  // route-change effect is needed.

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-beige-300 text-olive-800 hover:bg-beige-100"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-72 max-w-[82%] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-beige-200 px-5 py-4">
              <span className="text-base font-extrabold text-olive-900">MPRVVN CMS</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-600 hover:bg-beige-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <NavLinks groups={groups} pathname={pathname} onNavigate={() => setOpen(false)} />
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}
