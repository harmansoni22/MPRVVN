"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

export type NoticeRow = {
  id: string;
  category: string;
  text: string;
  href: string | null;
  isNew: boolean;
};

function NoticeList({ items, newLabel }: { items: NoticeRow[]; newLabel: string }) {
  if (items.length === 0) {
    return <div className="px-4 py-10 text-center text-sm text-stone-400">—</div>;
  }
  return (
    <ul className="custom-scrollbar h-[320px] overflow-y-auto px-4 py-1">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-start gap-3 border-b border-beige-100 py-3.5 last:border-0"
        >
          <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-olive-500" />
          <p className="text-sm font-medium leading-relaxed text-olive-800">
            {item.href ? (
              <a href={item.href} className="hover:text-olive-900 hover:underline">
                {item.text}
              </a>
            ) : (
              item.text
            )}
            {item.isNew && (
              <span className="ml-2 inline-block rounded bg-red-500 px-1.5 py-0.5 align-middle text-[10px] font-bold text-white">
                {newLabel}
              </span>
            )}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function NewsPortal({
  notices,
  dict,
}: {
  notices: NoticeRow[];
  dict: Dictionary;
  lang: Locale;
}) {
  const tabs = [
    { key: "WHATS_NEW", label: dict.home.whatsNew },
    { key: "TENDER", label: dict.home.tenders },
    { key: "CAREER", label: dict.home.careers },
  ] as const;

  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("WHATS_NEW");
  const newLabel = dict.common.newBadge;

  const byCategory = (category: string) => notices.filter((n) => n.category === category);
  const activeTab = tabs.find((t) => t.key === active)!;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Tabbed notices */}
      <div className="flex flex-col overflow-hidden rounded-lg border border-beige-300 bg-white shadow-sm">
        <div className="flex bg-olive-800">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              aria-pressed={active === tab.key}
              className={cn(
                "flex-1 border-t-4 py-4 text-sm font-bold tracking-wider transition-colors",
                active === tab.key
                  ? "cursor-default border-t-gold-500 bg-white text-olive-900"
                  : "cursor-pointer border-t-transparent text-beige-200 hover:bg-olive-700 hover:text-white",
              )}
            >
              {tab.label.toUpperCase()}
            </button>
          ))}
        </div>
        <h3 className="border-b border-beige-100 p-4 text-lg font-bold text-olive-900">
          {activeTab.label}
        </h3>
        <NoticeList items={byCategory(active)} newLabel={newLabel} />
      </div>

      {/* Employee corner */}
      <div className="flex flex-col overflow-hidden rounded-lg border border-beige-300 bg-white shadow-sm">
        <div className="bg-olive-800 py-4">
          <h2 className="text-center text-sm font-bold uppercase tracking-wider text-white">
            {dict.home.employeeCorner}
          </h2>
        </div>
        <NoticeList items={byCategory("EMPLOYEE_CORNER")} newLabel={newLabel} />
      </div>
    </div>
  );
}
