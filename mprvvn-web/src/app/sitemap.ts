import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { localizedRouteUrl, publicRoutes, routeAlternates } from "@/lib/routes";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mprvvn.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: new URL(localizedRouteUrl(locale, route.pathKey), siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: route.pathKey === "/" ? 1 : 0.7,
      alternates: { languages: routeAlternates(route.pathKey, siteUrl) },
    })),
  );
}
