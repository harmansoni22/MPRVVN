"use client";

import Link from "next/link";

// Friendly error boundary for the public site. No stack traces or internal
// details are shown to visitors.
export default function SiteError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-extrabold text-olive-900">Something went wrong</h1>
        <p className="mt-3 text-olive-700">
          We hit an unexpected error loading this page. Please try again in a moment.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-olive-800 px-5 py-2.5 text-sm font-bold text-beige-50 transition-colors hover:bg-olive-900"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-beige-300 px-5 py-2.5 text-sm font-semibold text-olive-800 transition-colors hover:bg-beige-50"
          >
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
