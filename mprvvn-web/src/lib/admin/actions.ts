"use server";

import { AuthError } from "next-auth";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { requireAdmin } from "@/lib/dal";
import { delegate, getResource, type Field } from "@/lib/admin/resources";
import type { FormState } from "@/lib/admin/types";

/** Credentials sign-in. Returns an error string on failure; redirects on success. */
export async function authenticate(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    throw error; // re-throw the redirect
  }
}

function coerce(field: Field, raw: FormDataEntryValue | null): unknown {
  if (field.type === "boolean") return raw === "on" || raw === "true";
  if (field.type === "number") {
    if (raw == null || raw === "") return field.required ? 0 : null;
    const n = Number(raw);
    if (Number.isNaN(n)) return field.required ? 0 : null;
    return Math.trunc(n);
  }
  const value = (raw ?? "").toString().trim();
  if (value === "") return field.required ? "" : null;
  return value;
}

/**
 * Create (id === "") or update a record of the given resource from form data.
 * Bound in forms as `saveRecord.bind(null, resourceKey, id)`.
 */
export async function saveRecord(
  resourceKey: string,
  id: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const resource = getResource(resourceKey);
  if (!resource) return { error: "Unknown resource." };

  const data: Record<string, unknown> = {};
  for (const field of resource.fields) {
    const value = coerce(field, formData.get(field.name));
    if (field.required && (value === "" || value === null)) {
      return { error: `${field.label} is required.` };
    }
    data[field.name] = value;
  }

  try {
    if (id) {
      await delegate(resource.model).update({ where: { id }, data });
    } else {
      await delegate(resource.model).create({ data });
    }
  } catch (error) {
    // Log the full error server-side; return a safe, generic message to the client.
    console.error(`[admin] saveRecord(${resourceKey}, ${id || "new"}) failed:`, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "A record with these values already exists." };
    }
    return { error: "Could not save the record. Please review your input and try again." };
  }

  revalidatePath("/", "layout");
  redirect(`/admin/${resourceKey}`);
}

/** Soft-delete (or hard-delete) a record, then refresh the list. */
export async function deleteRecord(resourceKey: string, id: string): Promise<void> {
  await requireAdmin();

  const resource = getResource(resourceKey);
  if (!resource) return;

  if (resource.softDelete) {
    await delegate(resource.model).update({ where: { id }, data: { deletedAt: new Date() } });
  } else {
    await delegate(resource.model).delete({ where: { id } });
  }

  revalidatePath("/", "layout");
  revalidatePath(`/admin/${resourceKey}`);
}

export async function logout(): Promise<void> {
  await signOut({ redirectTo: "/admin/login" });
}
