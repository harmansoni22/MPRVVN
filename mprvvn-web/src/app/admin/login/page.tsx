import { redirect } from "next/navigation";
import { Landmark } from "lucide-react";
import { getCurrentUser } from "@/lib/dal";
import { LoginForm } from "@/components/admin/login-form";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-olive-800 text-beige-50">
            <Landmark className="h-7 w-7" />
          </span>
          <h1 className="text-xl font-extrabold text-olive-900">MPRVVN Admin</h1>
          <p className="mt-1 text-sm text-stone-500">Sign in to manage website content</p>
        </div>
        <div className="rounded-2xl border border-beige-200 bg-white p-6 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
