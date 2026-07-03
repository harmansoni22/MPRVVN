import { locales, localePath, type Locale } from "@/i18n/config";

export type PublicRouteKind =
  | "home"
  | "about"
  | "visionMission"
  | "objectives"
  | "board"
  | "orgStructure"
  | "forestry"
  | "plantation"
  | "nursery"
  | "wildlife"
  | "community"
  | "depositWorks"
  | "csr"
  | "auctions"
  | "contact"
  | "accessibility";

export type PublicRoute = {
  kind: PublicRouteKind;
  pathKey: string;
  slug: string[];
  navKey: string;
};

export const publicRoutes: PublicRoute[] = [
  { kind: "home", pathKey: "/", slug: [], navKey: "home" },
  { kind: "about", pathKey: "/about", slug: ["about"], navKey: "about" },
  {
    kind: "visionMission",
    pathKey: "/about/vision-mission",
    slug: ["about", "vision-mission"],
    navKey: "visionMission",
  },
  {
    kind: "objectives",
    pathKey: "/about/objectives",
    slug: ["about", "objectives"],
    navKey: "objectives",
  },
  {
    kind: "board",
    pathKey: "/about/board-of-directors",
    slug: ["about", "board-of-directors"],
    navKey: "board",
  },
  {
    kind: "orgStructure",
    pathKey: "/about/organisation-structure",
    slug: ["about", "organisation-structure"],
    navKey: "orgStructure",
  },
  { kind: "forestry", pathKey: "/forestry", slug: ["forestry"], navKey: "forestry" },
  {
    kind: "plantation",
    pathKey: "/forestry/plantation",
    slug: ["forestry", "plantation"],
    navKey: "plantation",
  },
  {
    kind: "nursery",
    pathKey: "/forestry/nursery",
    slug: ["forestry", "nursery"],
    navKey: "nursery",
  },
  {
    kind: "wildlife",
    pathKey: "/forestry/wildlife",
    slug: ["forestry", "wildlife"],
    navKey: "wildlife",
  },
  {
    kind: "community",
    pathKey: "/forestry/community",
    slug: ["forestry", "community"],
    navKey: "community",
  },
  {
    kind: "depositWorks",
    pathKey: "/deposit-works",
    slug: ["deposit-works"],
    navKey: "depositWorks",
  },
  { kind: "csr", pathKey: "/csr", slug: ["csr"], navKey: "csr" },
  { kind: "auctions", pathKey: "/auctions", slug: ["auctions"], navKey: "auctions" },
  { kind: "contact", pathKey: "/contact", slug: ["contact"], navKey: "contact" },
  {
    kind: "accessibility",
    pathKey: "/accessibility",
    slug: ["accessibility"],
    navKey: "accessibility",
  },
];

export function getRouteBySlug(slug: string[] = []) {
  const key = slug.join("/");
  return publicRoutes.find((route) => route.slug.join("/") === key) ?? null;
}

export function localizedRouteUrl(locale: Locale, pathKey: string) {
  return localePath(locale, pathKey);
}

export function routeAlternates(pathKey: string, siteUrl: string) {
  return Object.fromEntries(
    locales.map((locale) => [locale, new URL(localizedRouteUrl(locale, pathKey), siteUrl).toString()]),
  ) as Record<Locale, string>;
}

export function staticRouteParams() {
  return locales.flatMap((lang) =>
    publicRoutes.map((route) => ({
      lang,
      slug: route.slug,
    })),
  );
}
