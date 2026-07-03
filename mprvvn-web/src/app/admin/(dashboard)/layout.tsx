import Link from "next/link";
import { LogOut } from "lucide-react";
import { requireAdmin } from "@/lib/dal";
import { logout } from "@/lib/admin/actions";
import { resourceGroups } from "@/lib/admin/resources";
import { AdminSidebar, AdminMobileNav } from "@/components/admin/admin-sidebar";

// The admin dashboard is session-gated (requireAdmin) and reads live counts from
// Postgres, so it is always request-time rendered. Declaring it here stops Next
// from probing these routes during the build's static-generation pass — which is
// what was emitting `prisma.*.count()` "DATABASE_URL not found" errors at build.
export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  const groups = resourceGroups().map((g) => ({
    group: g.group,
    items: g.resources.map((r) => ({ key: r.key, label: r.label })),
  }));

  return (
    <div className="flex min-h-screen">
      <AdminSidebar groups={groups} />

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-beige-200 bg-white px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <AdminMobileNav groups={groups} />
            <Link href="/" className="text-sm font-semibold text-olive-700 hover:text-olive-900">
              ← View public site
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-500">{user.email}</span>
            <form action={logout}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg border border-beige-300 px-3 py-1.5 text-xs font-semibold text-stone-700 transition-colors hover:bg-beige-100"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign out
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
