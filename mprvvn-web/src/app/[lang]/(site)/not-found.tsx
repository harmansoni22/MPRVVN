import Link from "next/link";

// Shown when a public route doesn't exist. Rendered inside the localized site
// layout (header/footer present). Bilingual, since the locale isn't available
// to this file.
export default function SiteNotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <p className="text-5xl font-extrabold text-gold-500">404</p>
        <h1 className="mt-3 text-2xl font-extrabold text-olive-900">
          Page Not Found · पृष्ठ नहीं मिला
        </h1>
        <p className="mt-3 text-olive-700">
          The page you are looking for does not exist or has moved.
          <br />
          आप जिस पृष्ठ की तलाश कर रहे हैं वह मौजूद नहीं है या स्थानांतरित हो गया है।
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-olive-800 px-6 py-3 text-sm font-bold text-beige-50 transition-colors hover:bg-olive-900"
        >
          Home · मुख्य पृष्ठ
        </Link>
      </div>
    </section>
  );
}
