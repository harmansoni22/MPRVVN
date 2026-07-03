import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RESOURCES, delegate } from "@/lib/admin/resources";

export default async function AdminDashboard() {
  const counts = await Promise.all(
    RESOURCES.map(async (r) => {
      const where = r.softDelete ? { deletedAt: null } : {};
      const count = (await delegate(r.model).count({ where })) as number;
      return { ...r, count };
    }),
  );

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-olive-900">Dashboard</h1>
      <p className="mb-8 text-sm text-stone-500">
        Manage all website content. Changes publish to the live site immediately.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {counts.map((r) => (
          <Link
            key={r.key}
            href={`/admin/${r.key}`}
            className="group flex flex-col rounded-xl border border-beige-200 bg-white p-5 transition-colors hover:border-olive-300"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
              {r.group}
            </span>
            <span className="mt-1 text-sm font-bold text-olive-900">{r.label}</span>
            <span className="mt-3 text-3xl font-extrabold text-olive-800">{r.count}</span>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-olive-600 group-hover:gap-2">
              Manage <ArrowRight className="h-3.5 w-3.5 transition-all" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
