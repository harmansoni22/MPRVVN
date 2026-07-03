"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteRecord } from "@/lib/admin/actions";

export function DeleteButton({ resourceKey, id }: { resourceKey: string; id: string }) {
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm("Delete this item? It will be removed from the public site.")) {
          start(() => deleteRecord(resourceKey, id));
        }
      }}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
      aria-label="Delete"
    >
      <Trash2 className="h-3.5 w-3.5" />
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
