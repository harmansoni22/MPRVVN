import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { delegate, getResource } from "@/lib/admin/resources";
import { saveRecord } from "@/lib/admin/actions";
import { ResourceForm } from "@/components/admin/resource-form";

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ resource: string; id: string }>;
}) {
  const { resource: key, id } = await params;
  const resource = getResource(key);
  if (!resource) notFound();

  const record: Record<string, unknown> | null = await delegate(resource.model).findUnique({
    where: { id },
  });
  if (!record) notFound();

  // Pass only the editable fields (avoids serializing Date columns to the client).
  const initial: Record<string, unknown> = {};
  for (const field of resource.fields) initial[field.name] = record[field.name];

  return (
    <div>
      <Link
        href={`/admin/${key}`}
        className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-stone-500 hover:text-olive-800"
      >
        <ChevronLeft className="h-4 w-4" /> {resource.label}
      </Link>
      <h1 className="mb-6 text-2xl font-extrabold text-olive-900">Edit {resource.singular}</h1>

      <ResourceForm
        fields={resource.fields}
        initial={initial}
        action={saveRecord.bind(null, key, id)}
        cancelHref={`/admin/${key}`}
        submitLabel="Save changes"
      />
    </div>
  );
}
