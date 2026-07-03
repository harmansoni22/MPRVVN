import "server-only";
import { db } from "@/lib/db";

/**
 * Config-driven admin CMS.
 *
 * Each resource maps a Prisma model to an editable form + list view. The
 * generic list/create/edit pages and the create/update/delete Server Actions all
 * read from this single definition, so adding a module is just adding an entry.
 */

export type FieldType = "text" | "textarea" | "number" | "boolean" | "select";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  help?: string;
};

export type Resource = {
  key: string; // URL segment, e.g. "objectives"
  model: string; // Prisma delegate name, e.g. "objective"
  label: string; // plural display label
  singular: string;
  group: string; // sidebar grouping
  softDelete: boolean; // model has a deletedAt column
  fields: Field[];
  listColumns: string[]; // field names shown in the table
};

const MISSION_CATEGORIES = [
  { value: "GOVERNMENT", label: "Government" },
  { value: "CONSUMERS", label: "Consumers / Beneficiaries" },
  { value: "EMPLOYEES", label: "Employees" },
];

const CSR_CATEGORIES = [
  { value: "EDUCATION", label: "Education" },
  { value: "COMMUNITY_INFRASTRUCTURE", label: "Community Infrastructure" },
  { value: "RENEWABLE_ENERGY", label: "Renewable Energy" },
  { value: "SKILL_DEVELOPMENT", label: "Skill Development" },
];

const NOTICE_CATEGORIES = [
  { value: "WHATS_NEW", label: "What's New" },
  { value: "TENDER", label: "Tender" },
  { value: "CAREER", label: "Career" },
  { value: "EMPLOYEE_CORNER", label: "Employee Corner" },
];

const OFFICER_REGIONS = [
  { value: "HEAD_OFFICE", label: "Head Office" },
  { value: "BHOPAL", label: "Bhopal" },
  { value: "JABALPUR", label: "Jabalpur" },
];

const order: Field = { name: "order", label: "Order", type: "number" };

export const RESOURCES: Resource[] = [
  // --- Home ---
  {
    key: "notices",
    model: "notice",
    label: "Notices",
    singular: "Notice",
    group: "Home",
    softDelete: true,
    fields: [
      { name: "category", label: "Category", type: "select", required: true, options: NOTICE_CATEGORIES },
      { name: "text", label: "Text", type: "textarea", required: true },
      { name: "href", label: "Link (optional)", type: "text" },
      { name: "isNew", label: "Show NEW badge", type: "boolean" },
      { name: "isSample", label: "Sample content", type: "boolean", help: "Flag placeholder notices not from the source document." },
      { name: "isVisible", label: "Visible", type: "boolean" },
      order,
    ],
    listColumns: ["category", "text", "isNew"],
  },
  {
    key: "stats",
    model: "stat",
    label: "Statistics",
    singular: "Statistic",
    group: "Home",
    softDelete: true,
    fields: [
      { name: "group", label: "Group", type: "text", required: true, help: "e.g. home, experience" },
      { name: "value", label: "Value", type: "text", required: true },
      { name: "label", label: "Label", type: "text", required: true },
      order,
    ],
    listColumns: ["group", "value", "label"],
  },

  // --- About ---
  {
    key: "objectives",
    model: "objective",
    label: "Objectives",
    singular: "Objective",
    group: "About",
    softDelete: true,
    fields: [{ name: "text", label: "Text", type: "textarea", required: true }, order],
    listColumns: ["text"],
  },
  {
    key: "mission-points",
    model: "missionPoint",
    label: "Mission Points",
    singular: "Mission Point",
    group: "About",
    softDelete: true,
    fields: [
      { name: "category", label: "Category", type: "select", required: true, options: MISSION_CATEGORIES },
      { name: "text", label: "Text", type: "textarea", required: true },
      order,
    ],
    listColumns: ["category", "text"],
  },
  {
    key: "board",
    model: "boardMember",
    label: "Board of Directors",
    singular: "Board Member",
    group: "About",
    softDelete: true,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "designation", label: "Designation", type: "text", required: true },
      { name: "photoUrl", label: "Photo URL", type: "text" },
      order,
    ],
    listColumns: ["name", "designation"],
  },

  // --- Forestry ---
  {
    key: "plantation-phases",
    model: "plantationPhase",
    label: "Plantation Phases",
    singular: "Plantation Phase",
    group: "Forestry",
    softDelete: true,
    fields: [
      { name: "phaseLabel", label: "Phase", type: "text", required: true },
      { name: "period", label: "Period", type: "text", required: true },
      { name: "areaHectares", label: "Area (hectares)", type: "number", required: true },
      order,
    ],
    listColumns: ["phaseLabel", "period", "areaHectares"],
  },
  {
    key: "species",
    model: "species",
    label: "Species",
    singular: "Species",
    group: "Forestry",
    softDelete: true,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "scientificName", label: "Scientific name", type: "text" },
      { name: "category", label: "Category", type: "text" },
      { name: "note", label: "Note", type: "text" },
      order,
    ],
    listColumns: ["name", "scientificName"],
  },
  {
    key: "nurseries",
    model: "nursery",
    label: "Nurseries",
    singular: "Nursery",
    group: "Forestry",
    softDelete: true,
    fields: [
      { name: "serialNo", label: "S. No.", type: "number" },
      { name: "division", label: "Division / Headquarters", type: "text", required: true },
      { name: "location", label: "Nursery location", type: "text", required: true },
      order,
    ],
    listColumns: ["serialNo", "division", "location"],
  },
  {
    key: "nursery-specializations",
    model: "nurserySpecialization",
    label: "Nursery Specializations",
    singular: "Specialization",
    group: "Forestry",
    softDelete: true,
    fields: [{ name: "text", label: "Text", type: "text", required: true }, order],
    listColumns: ["text"],
  },
  {
    key: "wildlife-corridors",
    model: "wildlifeCorridor",
    label: "Wildlife Corridors",
    singular: "Corridor",
    group: "Forestry",
    softDelete: true,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "area", label: "Area", type: "text" },
      { name: "divisions", label: "Divisions", type: "text" },
      order,
    ],
    listColumns: ["name", "divisions"],
  },
  {
    key: "conservation-measures",
    model: "conservationMeasure",
    label: "Conservation Measures",
    singular: "Measure",
    group: "Forestry",
    softDelete: true,
    fields: [{ name: "text", label: "Text", type: "text", required: true }, order],
    listColumns: ["text"],
  },
  {
    key: "community-initiatives",
    model: "communityInitiative",
    label: "Community Initiatives",
    singular: "Initiative",
    group: "Forestry",
    softDelete: true,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "imageUrl", label: "Image URL", type: "text" },
      order,
    ],
    listColumns: ["title"],
  },

  // --- Deposit Works & CSR ---
  {
    key: "deposit-services",
    model: "depositWorkService",
    label: "Deposit Work Services",
    singular: "Service",
    group: "Deposit & CSR",
    softDelete: true,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      order,
    ],
    listColumns: ["title"],
  },
  {
    key: "execution-steps",
    model: "executionStep",
    label: "Execution Steps",
    singular: "Step",
    group: "Deposit & CSR",
    softDelete: true,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      order,
    ],
    listColumns: ["title"],
  },
  {
    key: "trusted-orgs",
    model: "trustedOrg",
    label: "Trusted Organisations",
    singular: "Organisation",
    group: "Deposit & CSR",
    softDelete: true,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "logoUrl", label: "Logo URL", type: "text" },
      order,
    ],
    listColumns: ["name"],
  },
  {
    key: "csr-initiatives",
    model: "csrInitiative",
    label: "CSR Initiatives",
    singular: "CSR Initiative",
    group: "Deposit & CSR",
    softDelete: true,
    fields: [
      { name: "category", label: "Category", type: "select", required: true, options: CSR_CATEGORIES },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      order,
    ],
    listColumns: ["category", "title"],
  },

  // --- Auctions ---
  {
    key: "auction-schedule",
    model: "auctionScheduleRow",
    label: "Auction Schedule",
    singular: "Schedule Row",
    group: "Auctions",
    softDelete: true,
    fields: [
      { name: "serialNo", label: "S. No.", type: "number" },
      { name: "projectDivision", label: "Project Division", type: "text", required: true },
      { name: "depot", label: "Depot", type: "text" },
      { name: "auctionDepot", label: "Auction Depot", type: "text" },
      { name: "january", label: "January", type: "text" },
      { name: "february", label: "February", type: "text" },
      { name: "march", label: "March", type: "text" },
      { name: "april", label: "April", type: "text" },
      { name: "may", label: "May", type: "text" },
      { name: "year", label: "Year", type: "text" },
      order,
    ],
    listColumns: ["serialNo", "projectDivision", "auctionDepot"],
  },
  {
    key: "auction-links",
    model: "auctionLink",
    label: "Auction Links",
    singular: "Auction Link",
    group: "Auctions",
    softDelete: true,
    fields: [
      { name: "label", label: "Label", type: "text", required: true },
      { name: "url", label: "URL", type: "text", required: true },
      order,
    ],
    listColumns: ["label", "url"],
  },

  // --- Contact ---
  {
    key: "officers",
    model: "officer",
    label: "Officers Directory",
    singular: "Officer",
    group: "Contact",
    softDelete: true,
    fields: [
      { name: "office", label: "Office", type: "text", required: true },
      { name: "name", label: "Name", type: "text" },
      { name: "designation", label: "Designation", type: "text" },
      { name: "address", label: "Address", type: "textarea" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "region", label: "Region", type: "select", required: true, options: OFFICER_REGIONS },
      order,
    ],
    listColumns: ["office", "name", "region"],
  },

  // --- Content sections (prose) ---
  {
    key: "page-sections",
    model: "pageSection",
    label: "Page Sections",
    singular: "Page Section",
    group: "Content",
    softDelete: true,
    fields: [
      { name: "pageKey", label: "Page key", type: "text", required: true, help: "e.g. about, forestry, csr" },
      { name: "sectionKey", label: "Section key", type: "text", required: true, help: "e.g. intro, vision" },
      { name: "heading", label: "Heading", type: "text" },
      { name: "subheading", label: "Subheading", type: "text" },
      { name: "body", label: "Body", type: "textarea" },
      { name: "imageUrl", label: "Image URL", type: "text" },
      { name: "isVisible", label: "Visible", type: "boolean" },
      order,
    ],
    listColumns: ["pageKey", "sectionKey", "heading"],
  },
];

export function getResource(key: string): Resource | undefined {
  return RESOURCES.find((r) => r.key === key);
}

export function resourceGroups(): { group: string; resources: Resource[] }[] {
  const groups: string[] = [];
  for (const r of RESOURCES) if (!groups.includes(r.group)) groups.push(r.group);
  return groups.map((group) => ({ group, resources: RESOURCES.filter((r) => r.group === group) }));
}

/** Untyped Prisma delegate for a model name (admin code is config-driven). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function delegate(model: string): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (db as unknown as Record<string, any>)[model];
}
