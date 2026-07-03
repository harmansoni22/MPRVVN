import Link from "next/link";
import type { PageSection } from "@prisma/client";
import { ArrowRight, ChevronRight } from "lucide-react";
import { localePath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string | null;
  eyebrow?: string;
}) {
  return (
    <section className="border-b border-beige-200 bg-beige-50">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 xl:px-8">
        {eyebrow && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-gold-700">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-olive-900 md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-olive-700 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export function SectionBand({
  children,
  tone = "white",
  className,
}: {
  children: React.ReactNode;
  tone?: "white" | "beige" | "olive";
  className?: string;
}) {
  return (
    <section
      className={cn(
        "py-12 md:py-16",
        tone === "white" && "bg-white",
        tone === "beige" && "bg-beige-50",
        tone === "olive" && "bg-olive-800 text-beige-50",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-6 xl:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
  light = false,
}: {
  title?: string | null;
  subtitle?: string | null;
  light?: boolean;
}) {
  if (!title && !subtitle) return null;

  return (
    <div className="mb-8 max-w-3xl">
      {title && (
        <h2 className={cn("text-2xl font-extrabold md:text-3xl", light ? "text-gold-300" : "text-olive-900")}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={cn("mt-3 leading-relaxed", light ? "text-beige-100" : "text-olive-700")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function ProseSection({
  section,
  tone = "white",
}: {
  section?: Pick<PageSection, "heading" | "subheading" | "body"> | null;
  tone?: "white" | "beige";
}) {
  if (!section) return null;

  return (
    <SectionBand tone={tone}>
      <SectionHeading title={section.heading} subtitle={section.subheading} />
      {section.body && (
        <div className="max-w-4xl whitespace-pre-line text-base leading-8 text-stone-700">
          {section.body}
        </div>
      )}
    </SectionBand>
  );
}

export function StatGrid({
  stats,
  light = false,
}: {
  stats: { id: string; value: string; label: string }[];
  light?: boolean;
}) {
  if (!stats.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={cn(
            "border p-5 text-center",
            light
              ? "border-olive-600 bg-olive-900/30"
              : "border-beige-200 bg-white",
          )}
        >
          <div className={cn("text-2xl font-extrabold md:text-3xl", light ? "text-gold-300" : "text-olive-900")}>
            {stat.value}
          </div>
          <div className={cn("mt-1 text-xs font-semibold uppercase", light ? "text-beige-100" : "text-olive-500")}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function LinkGrid({
  items,
  lang,
}: {
  items: { id: string; label: string; href: string; isExternal?: boolean }[];
  lang: Locale;
}) {
  if (!items.length) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.isExternal ? item.href : localePath(lang, item.href)}
          className="inline-flex items-center gap-2 border border-beige-300 bg-white px-4 py-2 text-sm font-semibold text-olive-800 transition-colors hover:border-olive-400 hover:bg-olive-50"
        >
          {item.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ))}
    </div>
  );
}

export function CardList({
  items,
  columns = 3,
}: {
  items: { id: string; title: string; description?: string | null }[];
  columns?: 2 | 3 | 4;
}) {
  if (!items.length) return null;

  return (
    <div
      className={cn(
        "grid gap-5",
        columns === 2 && "md:grid-cols-2",
        columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
      )}
    >
      {items.map((item) => (
        <article key={item.id} className="border border-beige-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-bold text-olive-900">{item.title}</h3>
          {item.description && (
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-stone-600">
              {item.description}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

export function BulletList({ items }: { items: { id: string; text: string }[] }) {
  if (!items.length) return null;

  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.id} className="flex gap-3 text-stone-700">
          <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-gold-600" />
          <span className="leading-7">{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | number | null | undefined)[][];
}) {
  if (!rows.length) return null;

  return (
    <div className="overflow-x-auto border border-beige-200 bg-white">
      <table className="min-w-full divide-y divide-beige-200 text-left text-sm">
        <thead className="bg-olive-800 text-beige-50">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-4 py-3 font-bold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-beige-100">
          {rows.map((row, index) => (
            <tr key={index} className="align-top odd:bg-beige-50/60">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="whitespace-pre-line px-4 py-3 text-stone-700">
                  {cell ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
