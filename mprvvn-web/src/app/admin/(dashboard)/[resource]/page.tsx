import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus, Pencil } from "lucide-react";
import { delegate, getResource, type Field } from "@/lib/admin/resources";
import { DeleteButton } from "@/components/admin/delete-button";

function formatCell(field: Field | undefined, value: unknown): string {
  if (value == null || value === "") return "—";
  if (field?.type === "boolean") return value ? "Yes" : "No";
  if (field?.type === "select") {
    return field.options?.find((o) => o.value === value)?.label ?? String(value);
  }
  const text = String(value);
  return text.length > 80 ? `${text.slice(0, 80)}…` : text;
}

export default async function ResourceListPage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource: key } = await params;
  const resource = getResource(key);
  if (!resource) notFound();

  const where = resource.softDelete ? { deletedAt: null } : {};
  const rows: Record<string, unknown>[] = await delegate(resource.model).findMany({
    where,
    orderBy: { order: "asc" },
  });

  const columns = resource.listColumns.map((name) => resource.fields.find((f) => f.name === name));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-olive-900">{resource.label}</h1>
          <p className="text-sm text-stone-500">{rows.length} item(s)</p>
        </div>
        <Link
          href={`/admin/${key}/new`}
          className="inline-flex items-center gap-2 rounded-lg bg-olive-800 px-4 py-2 text-sm font-bold text-beige-50 transition-colors hover:bg-olive-900"
        >
          <Plus className="h-4 w-4" /> New {resource.singular}
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-beige-300 bg-white p-10 text-center text-sm text-stone-400">
          No items yet. Create the first one.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-beige-200 bg-white">
          <table className="min-w-full divide-y divide-beige-200 text-left text-sm">
            <thead className="bg-beige-100 text-xs uppercase tracking-wide text-stone-500">
              <tr>
                {columns.map((col, i) => (
                  <th key={i} className="px-4 py-3 font-bold">
                    {col?.label ?? resource.listColumns[i]}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-100">
              {rows.map((row) => (
                <tr key={String(row.id)} className="align-top hover:bg-beige-50/60">
                  {columns.map((col, i) => (
                    <td key={i} className="px-4 py-3 text-stone-700">
                      {formatCell(col, row[resource.listColumns[i]])}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/${key}/${String(row.id)}`}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-olive-700 transition-colors hover:bg-olive-50"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </Link>
                      <DeleteButton resourceKey={key} id={String(row.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
