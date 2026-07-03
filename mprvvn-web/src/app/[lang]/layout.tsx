import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getSiteSettings } from "@/lib/public-content";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mprvvn.vercel.app";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const [dict, settings] = await Promise.all([getDictionary(lang), getSiteSettings(lang)]);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings?.siteName ?? dict.meta.siteTitle,
      template: `%s | ${settings?.shortName ?? "MPRVVN"}`,
    },
    description: settings?.tagline ?? dict.meta.description,
    icons: { icon: settings?.faviconUrl ?? "/favicon.ico" },
  };
}

export default async function LocaleRootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang as Locale}
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
