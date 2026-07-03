import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getResource } from "@/lib/admin/resources";
import { saveRecord } from "@/lib/admin/actions";
import { ResourceForm } from "@/components/admin/resource-form";

export default async function NewResourcePage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource: key } = await params;
  const resource = getResource(key);
  if (!resource) notFound();

  return (
    <div>
      <Link
        href={`/admin/${key}`}
        className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-stone-500 hover:text-olive-800"
      >
        <ChevronLeft className="h-4 w-4" /> {resource.label}
      </Link>
      <h1 className="mb-6 text-2xl font-extrabold text-olive-900">New {resource.singular}</h1>

      <ResourceForm
        fields={resource.fields}
        initial={{ order: 0, isVisible: true }}
        action={saveRecord.bind(null, key, "")}
        cancelHref={`/admin/${key}`}
        submitLabel={`Create ${resource.singular}`}
      />
    </div>
  );
}
