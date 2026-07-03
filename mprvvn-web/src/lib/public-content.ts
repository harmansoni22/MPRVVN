import "server-only";
import { cache } from "react";
import type {
  FooterLink,
  HomeHero,
  NavItem,
  PageSection,
  SeoMeta,
  SiteSetting,
} from "@prisma/client";
import { db } from "@/lib/db";
import { localize, localizeOne } from "@/lib/dal";
import type { Locale } from "@/i18n/config";

export type PublicNavItem = Pick<
  NavItem,
  "id" | "label" | "href" | "order" | "isExternal"
> & {
  children: PublicNavItem[];
};

export type FooterGroup = {
  title: string;
  links: Pick<FooterLink, "id" | "label" | "href" | "order" | "isExternal">[];
};

export const getSiteSettings = cache(async (locale: Locale) => {
  const settings = await db.siteSetting.findUnique({ where: { id: "singleton" } });
  return localizeOne(locale, "SiteSetting", settings, [
    "siteName",
    "shortName",
    "tagline",
    "addressLine",
    "officeHours",
    "contactEmail",
    "contactPhone",
  ]);
});

export const getNavigation = cache(async (locale: Locale): Promise<PublicNavItem[]> => {
  const parents = await db.navItem.findMany({
    where: { parentId: null, isVisible: true, deletedAt: null },
    include: {
      children: {
        where: { isVisible: true, deletedAt: null },
        orderBy: { order: "asc" },
      },
    },
    orderBy: { order: "asc" },
  });

  const rows = parents.flatMap((parent) => [parent, ...parent.children]);
  const localized = await localize(locale, "NavItem", rows, ["label"]);
  const byId = new Map(localized.map((row) => [row.id, row]));

  return parents.map((parent) => {
    const localizedParent = byId.get(parent.id) ?? parent;
    return {
      id: localizedParent.id,
      label: localizedParent.label,
      href: localizedParent.href,
      order: localizedParent.order,
      isExternal: localizedParent.isExternal,
      children: parent.children.map((child) => {
        const localizedChild = byId.get(child.id) ?? child;
        return {
          id: localizedChild.id,
          label: localizedChild.label,
          href: localizedChild.href,
          order: localizedChild.order,
          isExternal: localizedChild.isExternal,
          children: [],
        };
      }),
    };
  });
});

export const getFooterGroups = cache(async (locale: Locale): Promise<FooterGroup[]> => {
  const rows = await db.footerLink.findMany({
    where: { deletedAt: null },
    orderBy: [{ groupTitle: "asc" }, { order: "asc" }],
  });
  const localized = await localize(locale, "FooterLink", rows, ["groupTitle", "label"]);
  const groups = new Map<string, FooterGroup>();

  for (const row of localized) {
    const group = groups.get(row.groupTitle) ?? { title: row.groupTitle, links: [] };
    group.links.push({
      id: row.id,
      label: row.label,
      href: row.href,
      order: row.order,
      isExternal: row.isExternal,
    });
    groups.set(row.groupTitle, group);
  }

  return [...groups.values()];
});

export const getPublicLayout = cache(async (locale: Locale) => {
  const [settings, navItems, footerGroups] = await Promise.all([
    getSiteSettings(locale),
    getNavigation(locale),
    getFooterGroups(locale),
  ]);

  return { settings, navItems, footerGroups };
});

export const getSeoMeta = cache(async (locale: Locale, pathKey: string) => {
  const row = await db.seoMeta.findUnique({ where: { pathKey } });
  return localizeOne(locale, "SeoMeta", row, [
    "title",
    "description",
    "ogTitle",
    "ogDescription",
    "ogImageUrl",
    "canonicalUrl",
  ]);
});

export async function getSections(locale: Locale, pageKey: string) {
  const rows = await db.pageSection.findMany({
    where: { pageKey, isVisible: true, deletedAt: null },
    orderBy: { order: "asc" },
  });
  return localize(locale, "PageSection", rows, ["heading", "subheading", "body"]);
}

export async function getSection(locale: Locale, pageKey: string, sectionKey: string) {
  const row = await db.pageSection.findUnique({
    where: { pageKey_sectionKey: { pageKey, sectionKey } },
  });
  if (!row || !row.isVisible || row.deletedAt) return null;
  return localizeOne(locale, "PageSection", row, ["heading", "subheading", "body"]);
}

export const getHomePageData = cache(async (locale: Locale) => {
  const [hero, stats, notices, quickLinks, about, forestry, deposit, csr, execution, trusted, faqs] =
    await Promise.all([
      db.homeHero.findFirst({ where: { isActive: true }, orderBy: { order: "asc" } }),
      db.stat.findMany({ where: { group: "home", deletedAt: null }, orderBy: { order: "asc" } }),
      db.notice.findMany({
        where: { isVisible: true, deletedAt: null },
        orderBy: [{ category: "asc" }, { order: "asc" }],
      }),
      getNavigation(locale),
      getSection(locale, "home", "about-preview"),
      getSection(locale, "forestry", "intro"),
      getSection(locale, "deposit-works", "intro"),
      getSection(locale, "csr", "intro"),
      db.executionStep.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
      db.trustedOrg.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
      getSections(locale, "faq"),
    ]);

  const [
    localizedHero,
    localizedStats,
    localizedNotices,
    localizedExecution,
    localizedTrusted,
  ] = await Promise.all([
    localizeOne(locale, "HomeHero", hero, [
      "badge",
      "heading",
      "subheading",
      "primaryCtaLabel",
      "secondaryCtaLabel",
    ]),
    localize(locale, "Stat", stats, ["label", "value"]),
    localize(locale, "Notice", notices, ["text"]),
    localize(locale, "ExecutionStep", execution, ["title", "description"]),
    localize(locale, "TrustedOrg", trusted, ["name"]),
  ]);

  return {
    hero: localizedHero,
    stats: localizedStats,
    notices: localizedNotices,
    quickLinks,
    sections: { about, forestry, deposit, csr },
    execution: localizedExecution,
    trusted: localizedTrusted,
    faqs,
  };
});

export const getAboutData = cache(async (locale: Locale) => {
  const [sections, objectives, missions, board, orgNodes] = await Promise.all([
    getSections(locale, "about"),
    db.objective.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
    db.missionPoint.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
    db.boardMember.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
    db.orgNode.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
  ]);

  const [localizedObjectives, localizedMissions, localizedBoard, localizedOrgNodes] =
    await Promise.all([
      localize(locale, "Objective", objectives, ["text"]),
      localize(locale, "MissionPoint", missions, ["text"]),
      localize(locale, "BoardMember", board, ["name", "designation"]),
      localize(locale, "OrgNode", orgNodes, ["title", "subtitle"]),
    ]);

  return {
    sections,
    objectives: localizedObjectives,
    missions: localizedMissions,
    board: localizedBoard,
    orgNodes: localizedOrgNodes,
  };
});

export const getForestryData = cache(async (locale: Locale) => {
  const [
    sections,
    phases,
    species,
    nurseries,
    specializations,
    corridors,
    measures,
    community,
  ] = await Promise.all([
    Promise.all([
      getSections(locale, "forestry"),
      getSections(locale, "plantation"),
      getSections(locale, "nursery"),
      getSections(locale, "wildlife"),
      getSections(locale, "community"),
    ]),
    db.plantationPhase.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
    db.species.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
    db.nursery.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
    db.nurserySpecialization.findMany({
      where: { deletedAt: null },
      orderBy: { order: "asc" },
    }),
    db.wildlifeCorridor.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
    db.conservationMeasure.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
    db.communityInitiative.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
  ]);

  const [
    forestrySections,
    plantationSections,
    nurserySections,
    wildlifeSections,
    communitySections,
  ] = sections;

  const [
    localizedPhases,
    localizedSpecies,
    localizedNurseries,
    localizedSpecializations,
    localizedCorridors,
    localizedMeasures,
    localizedCommunity,
  ] = await Promise.all([
    localize(locale, "PlantationPhase", phases, ["phaseLabel", "period"]),
    localize(locale, "Species", species, ["name", "scientificName", "category", "note"]),
    localize(locale, "Nursery", nurseries, ["division", "location"]),
    localize(locale, "NurserySpecialization", specializations, ["text"]),
    localize(locale, "WildlifeCorridor", corridors, ["name", "description", "area", "divisions"]),
    localize(locale, "ConservationMeasure", measures, ["text"]),
    localize(locale, "CommunityInitiative", community, ["title", "description"]),
  ]);

  return {
    sections: {
      forestry: forestrySections,
      plantation: plantationSections,
      nursery: nurserySections,
      wildlife: wildlifeSections,
      community: communitySections,
    },
    phases: localizedPhases,
    species: localizedSpecies,
    nurseries: localizedNurseries,
    specializations: localizedSpecializations,
    corridors: localizedCorridors,
    measures: localizedMeasures,
    community: localizedCommunity,
  };
});

export const getDepositWorksData = cache(async (locale: Locale) => {
  const [sections, services, execution, stats, trusted] = await Promise.all([
    getSections(locale, "deposit-works"),
    db.depositWorkService.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
    db.executionStep.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
    db.stat.findMany({ where: { group: "experience", deletedAt: null }, orderBy: { order: "asc" } }),
    db.trustedOrg.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
  ]);

  const [localizedServices, localizedExecution, localizedStats, localizedTrusted] =
    await Promise.all([
      localize(locale, "DepositWorkService", services, ["title", "description"]),
      localize(locale, "ExecutionStep", execution, ["title", "description"]),
      localize(locale, "Stat", stats, ["label", "value"]),
      localize(locale, "TrustedOrg", trusted, ["name"]),
    ]);

  return { sections, services: localizedServices, execution: localizedExecution, stats: localizedStats, trusted: localizedTrusted };
});

export const getCsrData = cache(async (locale: Locale) => {
  const [sections, initiatives] = await Promise.all([
    getSections(locale, "csr"),
    db.csrInitiative.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
  ]);

  return {
    sections,
    initiatives: await localize(locale, "CsrInitiative", initiatives, ["title", "description"]),
  };
});

export const getAuctionsData = cache(async (locale: Locale) => {
  const [sections, schedule, links] = await Promise.all([
    getSections(locale, "auctions"),
    db.auctionScheduleRow.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
    db.auctionLink.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
  ]);

  const [localizedSchedule, localizedLinks] = await Promise.all([
    localize(locale, "AuctionScheduleRow", schedule, [
      "projectDivision",
      "depot",
      "auctionDepot",
      "january",
      "february",
      "march",
      "april",
      "may",
      "year",
    ]),
    localize(locale, "AuctionLink", links, ["label", "url"]),
  ]);

  return { sections, schedule: localizedSchedule, links: localizedLinks };
});

export const getContactData = cache(async (locale: Locale) => {
  const [sections, officers] = await Promise.all([
    getSections(locale, "contact"),
    db.officer.findMany({ where: { deletedAt: null }, orderBy: { order: "asc" } }),
  ]);

  return {
    sections,
    officers: await localize(locale, "Officer", officers, [
      "office",
      "name",
      "designation",
      "address",
      "phone",
      "email",
    ]),
  };
});

export type SeoRow = SeoMeta | null;
export type SiteSettings = SiteSetting | null;
export type HomeHeroRow = HomeHero | null;
export type PageSectionRow = PageSection;
