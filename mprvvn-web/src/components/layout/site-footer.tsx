import Link from "next/link";
import { Clock, Landmark, MapPin } from "lucide-react";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { FooterGroup, SiteSettings } from "@/lib/public-content";

type FooterProps = {
  lang: Locale;
  dict: Dictionary;
  footerGroups: FooterGroup[];
  settings: SiteSettings;
};

export function SiteFooter({ lang, dict, footerGroups, settings }: FooterProps) {
  const year = 2026;
  const quickLinkGroups = footerGroups.length
    ? footerGroups
    : [{ title: dict.footer.quickLinks, links: [] }];

  return (
    <footer className="mt-auto border-t-4 border-gold-400 bg-beige-100 text-stone-700">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Identity */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-beige-300 bg-white shadow-sm">
              <Landmark className="h-5 w-5 text-olive-600" />
            </div>
            <div>
              <h3 className="text-base font-extrabold leading-tight text-stone-800">
                {settings?.shortName ?? dict.header.shortName}
              </h3>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                {dict.header.locationLine}
              </p>
            </div>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-stone-600">
            {settings?.siteName ?? dict.header.orgName}. {settings?.tagline ?? dict.header.tagline}.
          </p>
          {settings?.cin && <p className="text-xs text-stone-500">CIN: {settings.cin}</p>}
        </div>

        {/* Quick links (DB-driven groups) */}
        {quickLinkGroups.slice(0, 2).map((group) => (
          <div key={group.title}>
            <h4 className="mb-5 border-b border-beige-300 pb-2 text-xs font-bold uppercase tracking-widest text-stone-400">
              {group.title}
            </h4>
            <ul className="space-y-3">
              {group.links.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.isExternal ? item.href : localePath(lang, item.href)}
                    className="text-sm text-stone-600 transition-colors hover:text-olive-800"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Regions */}
        <div>
          <h4 className="mb-5 border-b border-beige-300 pb-2 text-xs font-bold uppercase tracking-widest text-stone-400">
            {dict.footer.regions}
          </h4>
          <ul className="space-y-3 text-sm text-stone-600">
            <li>Jabalpur {dict.footer.regionSuffix}</li>
            <li>Bhopal {dict.footer.regionSuffix}</li>
          </ul>
        </div>

        {/* Head office */}
        <div>
          <h4 className="mb-5 border-b border-beige-300 pb-2 text-xs font-bold uppercase tracking-widest text-stone-400">
            {dict.footer.headOffice}
          </h4>
          <div className="space-y-4 text-sm text-stone-600">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-500" />
              <span className="leading-relaxed">{settings?.addressLine}</span>
            </div>
            <div className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-500" />
              <span className="leading-relaxed">{settings?.officeHours}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-beige-300 bg-beige-200">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-stone-500 sm:flex-row">
          <p>
            © {year} {settings?.siteName ?? dict.header.orgName} — {dict.footer.govOfMp}.{" "}
            {dict.footer.rights}
          </p>
          <p>{dict.footer.officialPortal}</p>
        </div>
      </div>
    </footer>
  );
}
