/**
 * Navigational search index over the actual public pages.
 *
 * `navKey` indexes into the `nav` dictionary so result titles are localized;
 * `tags` are English keywords used only for matching (never displayed). This is
 * intentionally a small, page-level index — full content search can become
 * database-driven in a later milestone.
 */

import type { Dictionary } from "@/i18n/get-dictionary";

export type SearchEntry = {
  path: string;
  navKey: keyof Dictionary["nav"];
  tags: string;
};

export const searchEntries: SearchEntry[] = [
  { path: "/", navKey: "home", tags: "home welcome mprvvn forestry" },
  { path: "/about", navKey: "about", tags: "about us history 1975 50 years company profile crop silviculture" },
  { path: "/about/vision-mission", navKey: "visionMission", tags: "vision mission government consumers beneficiaries employees" },
  { path: "/about/objectives", navKey: "objectives", tags: "objectives goals biodiversity bamboo ntfp carbon sdg green cover" },
  { path: "/about/board-of-directors", navKey: "board", tags: "board of directors chairman vice managing director ias ifs" },
  { path: "/about/organisation-structure", navKey: "orgStructure", tags: "organisation structure chart regions divisions managers" },
  { path: "/forestry", navKey: "forestry", tags: "forestry activities plantation nursery wildlife community" },
  { path: "/forestry/plantation", navKey: "plantation", tags: "plantation teak bamboo sandalwood khamer phases hectares species" },
  { path: "/forestry/nursery", navKey: "nursery", tags: "nursery teak root shoot rhizome saplings seedlings locations" },
  { path: "/forestry/wildlife", navKey: "wildlife", tags: "wildlife corridor tiger kanha pench bandhavgarh ratapani satpura melghat biodiversity conservation" },
  { path: "/forestry/community", navKey: "community", tags: "community jfm vss gvs van suraksha samiti tribal benefit sharing" },
  { path: "/deposit-works", navKey: "depositWorks", tags: "deposit work ec compliance csr miyawaki mine restoration roadside avenue execution experience" },
  { path: "/csr", navKey: "csr", tags: "csr education renewable energy solar skill development community infrastructure" },
  { path: "/auctions", navKey: "auctions", tags: "auction timber teak pole tender e-auction depot schedule dates 2026" },
  { path: "/contact", navKey: "contact", tags: "contact officers directory address phone email get in touch head office" },
];
