"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { Field } from "@/lib/admin/resources";
import type { FormState } from "@/lib/admin/types";

type Props = {
  fields: Field[];
  initial: Record<string, unknown>;
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  cancelHref: string;
  submitLabel: string;
};

const inputClass =
  "w-full rounded-lg border border-beige-300 bg-white px-3 py-2 text-sm outline-none focus:border-olive-500";

export function ResourceForm({ fields, initial, action, cancelHref, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, {} as FormState);

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      {fields.map((field) => {
        const value = initial[field.name];
        const id = `field-${field.name}`;

        if (field.type === "boolean") {
          return (
            <label key={field.name} htmlFor={id} className="flex items-center gap-2 text-sm font-semibold text-stone-700">
              <input
                id={id}
                name={field.name}
                type="checkbox"
                defaultChecked={Boolean(value)}
                className="h-4 w-4 rounded border-beige-300"
              />
              {field.label}
            </label>
          );
        }

        return (
          <div key={field.name}>
            <label htmlFor={id} className="mb-1 block text-sm font-semibold text-stone-700">
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={id}
                name={field.name}
                rows={5}
                required={field.required}
                defaultValue={(value as string) ?? ""}
                className={inputClass}
              />
            ) : field.type === "select" ? (
              <select
                id={id}
                name={field.name}
                required={field.required}
                defaultValue={(value as string) ?? ""}
                className={inputClass}
              >
                <option value="">— Select —</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                name={field.name}
                type={field.type === "number" ? "number" : "text"}
                required={field.required}
                defaultValue={value == null ? "" : String(value)}
                className={inputClass}
              />
            )}

            {field.help && <p className="mt-1 text-xs text-stone-400">{field.help}</p>}
          </div>
        );
      })}

      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-olive-800 px-5 py-2.5 text-sm font-bold text-beige-50 transition-colors hover:bg-olive-900 disabled:opacity-60"
        >
          {pending ? "Saving…" : submitLabel}
        </button>
        <Link
          href={cancelHref}
          className="rounded-lg border border-beige-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:bg-beige-100"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
