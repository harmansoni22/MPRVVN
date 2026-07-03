import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Contrast,
  Gavel,
  HeartHandshake,
  Highlighter,
  Leaf,
  Network,
  Sprout,
  TreePine,
  Type,
} from "lucide-react";
import {
  BulletList,
  CardList,
  DataTable,
  JsonLd,
  LinkGrid,
  PageHero,
  ProseSection,
  SectionBand,
  SectionHeading,
  StatGrid,
} from "@/components/content/page-primitives";
import { NewsPortal } from "@/components/home/news-portal";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/get-dictionary";
import {
  getAboutData,
  getAuctionsData,
  getContactData,
  getCsrData,
  getDepositWorksData,
  getForestryData,
  getHomePageData,
  getSeoMeta,
  getSections,
  getSiteSettings,
} from "@/lib/public-content";
import {
  getRouteBySlug,
  routeAlternates,
  staticRouteParams,
  type PublicRoute,
} from "@/lib/routes";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type Props = {
  params: Promise<{ lang: string; slug?: string[] }>;
};

export async function generateStaticParams() {
  return staticRouteParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug = [] } = await params;
  if (!isLocale(lang)) return {};

  const route = getRouteBySlug(slug);
  if (!route) return {};

  const [dict, seo] = await Promise.all([getDictionary(lang), getSeoMeta(lang, route.pathKey)]);
  const title = seo?.title ?? (dict.pages as Record<string, { title?: string }>)[route.kind]?.title;
  const description = seo?.description ?? dict.meta.description;
  const alternates = routeAlternates(route.pathKey, siteUrl);

  return {
    title,
    description,
    alternates: {
      canonical: alternates[lang],
      languages: alternates,
    },
    robots: seo?.robots ?? "index,follow",
    openGraph: {
      title: seo?.ogTitle ?? title,
      description: seo?.ogDescription ?? description,
      url: alternates[lang],
      images: seo?.ogImageUrl ? [seo.ogImageUrl] : undefined,
      locale: lang === "hi" ? "hi_IN" : "en_IN",
      siteName: dict.header.shortName,
    },
  };
}

export default async function PublicPage({ params }: Props) {
  const { lang, slug = [] } = await params;
  if (!isLocale(lang)) notFound();

  const route = getRouteBySlug(slug);
  if (!route) notFound();

  const [dict, settings] = await Promise.all([getDictionary(lang), getSiteSettings(lang)]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: settings?.siteName ?? dict.header.orgName,
    url: new URL(localePath(lang, route.pathKey), siteUrl).toString(),
    address: settings?.addressLine,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      {await renderRoute(route, lang, dict)}
    </>
  );
}

async function renderRoute(route: PublicRoute, lang: Locale, dict: Dictionary) {
  switch (route.kind) {
    case "home":
      return <HomePage lang={lang} dict={dict} />;
    case "about":
      return <AboutPage lang={lang} dict={dict} />;
    case "visionMission":
      return <VisionMissionPage lang={lang} dict={dict} />;
    case "objectives":
      return <ObjectivesPage lang={lang} dict={dict} />;
    case "board":
      return <BoardPage lang={lang} dict={dict} />;
    case "orgStructure":
      return <OrgStructurePage lang={lang} dict={dict} />;
    case "forestry":
      return <ForestryPage lang={lang} dict={dict} />;
    case "plantation":
      return <PlantationPage lang={lang} dict={dict} />;
    case "nursery":
      return <NurseryPage lang={lang} dict={dict} />;
    case "wildlife":
      return <WildlifePage lang={lang} dict={dict} />;
    case "community":
      return <CommunityPage lang={lang} dict={dict} />;
    case "depositWorks":
      return <DepositWorksPage lang={lang} dict={dict} />;
    case "csr":
      return <CsrPage lang={lang} dict={dict} />;
    case "auctions":
      return <AuctionsPage lang={lang} dict={dict} />;
    case "contact":
      return <ContactPage lang={lang} dict={dict} />;
    case "accessibility":
      return <AccessibilityPage lang={lang} dict={dict} />;
    default:
      notFound();
  }
}

async function HomePage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const data = await getHomePageData(lang);
  const hero = data.hero;
  const quickLinks = data.quickLinks.flatMap((item) => [item, ...item.children]).slice(1, 11);

  return (
    <>
      <section className="relative overflow-hidden border-b border-beige-200 bg-beige-50">
        <div className="mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col lg:flex-row">
          <div className="flex flex-1 items-center px-6 py-12 md:px-10 lg:py-16 xl:px-8">
            <div className="max-w-xl">
              <span className="mb-6 inline-flex items-center gap-2 border border-olive-200 bg-olive-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-olive-700">
                <Leaf className="h-3 w-3 text-olive-500" />
                {hero?.badge ?? dict.home.heroBadge}
              </span>
              <h1 className="mb-5 text-4xl font-extrabold leading-[1.12] tracking-tight text-olive-900 md:text-5xl">
                {hero?.heading ?? dict.header.orgName}
              </h1>
              {hero?.subheading && (
                <p className="mb-8 max-w-md text-base leading-relaxed text-olive-700 md:text-lg">
                  {hero.subheading}
                </p>
              )}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={localePath(lang, hero?.primaryCtaHref ?? "/about")}
                  className="inline-flex items-center gap-2.5 bg-olive-800 px-6 py-3.5 font-bold text-beige-50 shadow-md transition-colors hover:bg-olive-900"
                >
                  {hero?.primaryCtaLabel ?? dict.home.ctaAbout}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={localePath(lang, hero?.secondaryCtaHref ?? "/forestry/plantation")}
                  className="inline-flex items-center gap-2.5 border-2 border-beige-300 bg-white px-6 py-3.5 font-bold text-olive-800 transition-colors hover:border-olive-400 hover:bg-beige-50"
                >
                  {hero?.secondaryCtaLabel ?? dict.home.ctaForestry}
                </Link>
              </div>
            </div>
          </div>

          <div className="relative min-h-[44vw] overflow-hidden lg:min-h-full lg:w-[50%]">
            <Image
              src={hero?.imageUrl ?? "/hero-forest.png"}
              alt={hero?.heading ?? dict.header.orgName}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <SectionBand tone="beige" className="py-8">
        <LinkGrid items={quickLinks} lang={lang} />
      </SectionBand>

      <SectionBand>
        <StatGrid stats={data.stats} />
      </SectionBand>

      <SectionBand tone="beige">
        <NewsPortal notices={data.notices} dict={dict} lang={lang} />
      </SectionBand>

      <ProseSection section={data.sections.about} tone="white" />

      <SectionBand tone="beige">
        <SectionHeading title={dict.home.forestryTitle} subtitle={data.sections.forestry?.body} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [dict.nav.plantation, "/forestry/plantation", TreePine],
            [dict.nav.nursery, "/forestry/nursery", Sprout],
            [dict.nav.wildlife, "/forestry/wildlife", Network],
            [dict.nav.community, "/forestry/community", HeartHandshake],
          ].map(([label, href, Icon]) => (
            <Link
              key={String(href)}
              href={localePath(lang, String(href))}
              className="border border-beige-200 bg-white p-5 text-olive-800 transition-colors hover:border-olive-300 hover:bg-olive-50"
            >
              <Icon className="mb-4 h-7 w-7 text-olive-600" />
              <span className="font-bold">{String(label)}</span>
            </Link>
          ))}
        </div>
      </SectionBand>

      <SectionBand>
        <SectionHeading title={dict.home.executionTitle} />
        <CardList
          columns={3}
          items={data.execution.map((step) => ({
            id: step.id,
            title: step.title,
            description: step.description,
          }))}
        />
      </SectionBand>

      <SectionBand tone="olive">
        <SectionHeading title={dict.home.trustedTitle} light />
        <div className="flex flex-wrap gap-3">
          {data.trusted.map((org) => (
            <span key={org.id} className="bg-beige-50 px-4 py-2 text-sm font-bold text-olive-800">
              {org.name}
            </span>
          ))}
        </div>
      </SectionBand>

      <ProseSection section={data.sections.csr} tone="white" />
    </>
  );
}

async function AboutPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const data = await getAboutData(lang);
  const intro = data.sections.find((section) => section.sectionKey === "intro");
  const cropI = data.sections.find((section) => section.sectionKey === "crop-i");
  const cropII = data.sections.find((section) => section.sectionKey === "crop-ii");

  return (
    <>
      <PageHero title={dict.pages.about.title} subtitle={dict.pages.about.subtitle} />
      <ProseSection section={intro} />
      <ProseSection section={cropI} tone="beige" />
      <ProseSection section={cropII} />
    </>
  );
}

async function VisionMissionPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const data = await getAboutData(lang);
  const vision = data.sections.find((section) => section.sectionKey === "vision");
  const groups = [
    ["GOVERNMENT", dict.pages.visionMission.missionGovernment],
    ["CONSUMERS", dict.pages.visionMission.missionConsumers],
    ["EMPLOYEES", dict.pages.visionMission.missionEmployees],
  ] as const;

  return (
    <>
      <PageHero title={dict.pages.visionMission.title} />
      <ProseSection section={vision} />
      <SectionBand tone="beige">
        <SectionHeading title={dict.pages.visionMission.missionHeading} />
        <div className="grid gap-6 lg:grid-cols-3">
          {groups.map(([category, title]) => (
            <article key={category} className="border border-beige-200 bg-white p-5">
              <h2 className="mb-4 text-lg font-bold text-olive-900">{title}</h2>
              <BulletList
                items={data.missions
                  .filter((mission) => mission.category === category)
                  .map((mission) => ({ id: mission.id, text: mission.text }))}
              />
            </article>
          ))}
        </div>
      </SectionBand>
    </>
  );
}

async function ObjectivesPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const data = await getAboutData(lang);
  return (
    <>
      <PageHero title={dict.pages.objectives.title} subtitle={dict.pages.objectives.subtitle} />
      <SectionBand>
        <BulletList items={data.objectives.map((item) => ({ id: item.id, text: item.text }))} />
      </SectionBand>
    </>
  );
}

async function BoardPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const data = await getAboutData(lang);
  return (
    <>
      <PageHero title={dict.pages.board.title} />
      <SectionBand>
        <DataTable
          headers={[dict.pages.board.colSno, dict.pages.board.colName, dict.pages.board.colDesignation]}
          rows={data.board.map((member, index) => [index + 1, member.name, member.designation])}
        />
      </SectionBand>
    </>
  );
}

async function OrgStructurePage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const data = await getAboutData(lang);
  const roots = data.orgNodes.filter((node) => !node.parentId);
  const childrenOf = (id: string) => data.orgNodes.filter((node) => node.parentId === id);

  return (
    <>
      <PageHero title={dict.pages.orgStructure.title} />
      <SectionBand tone="beige">
        <div className="space-y-4">
          {roots.map((root) => (
            <article key={root.id} className="border border-beige-200 bg-white p-5">
              <h2 className="text-lg font-extrabold text-olive-900">{root.title}</h2>
              {root.subtitle && <p className="mt-1 text-sm text-stone-600">{root.subtitle}</p>}
              {childrenOf(root.id).length > 0 && (
                <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {childrenOf(root.id).map((child) => (
                    <div key={child.id} className="border border-beige-200 bg-beige-50 p-4">
                      <h3 className="font-bold text-olive-900">{child.title}</h3>
                      {child.subtitle && (
                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-stone-600">
                          {child.subtitle}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </SectionBand>
    </>
  );
}

async function ForestryPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const data = await getForestryData(lang);
  const intro = data.sections.forestry.find((section) => section.sectionKey === "intro");
  return (
    <>
      <PageHero title={dict.pages.forestry.title} subtitle={dict.pages.forestry.subtitle} />
      <ProseSection section={intro} />
      <SectionBand tone="beige">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [dict.nav.plantation, "/forestry/plantation", TreePine],
            [dict.nav.nursery, "/forestry/nursery", Sprout],
            [dict.nav.wildlife, "/forestry/wildlife", Network],
            [dict.nav.community, "/forestry/community", HeartHandshake],
          ].map(([label, href, Icon]) => (
            <Link
              key={String(href)}
              href={localePath(lang, String(href))}
              className="border border-beige-200 bg-white p-5 text-olive-800 transition-colors hover:border-olive-300 hover:bg-olive-50"
            >
              <Icon className="mb-4 h-7 w-7 text-olive-600" />
              <span className="font-bold">{String(label)}</span>
            </Link>
          ))}
        </div>
      </SectionBand>
    </>
  );
}

async function PlantationPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const data = await getForestryData(lang);
  const intro = data.sections.plantation.find((section) => section.sectionKey === "intro");
  const focus = data.sections.plantation.find((section) => section.sectionKey === "focus");

  return (
    <>
      <PageHero title={dict.pages.plantation.title} />
      <ProseSection section={intro} />
      <SectionBand tone="beige">
        <SectionHeading title={dict.pages.plantation.phaseTitle} />
        <DataTable
          headers={[
            dict.pages.plantation.colPhase,
            dict.pages.plantation.colPeriod,
            dict.pages.plantation.colArea,
          ]}
          rows={data.phases.map((phase) => [
            phase.phaseLabel,
            phase.period,
            `${phase.areaHectares.toLocaleString("en-IN")} Ha`,
          ])}
        />
      </SectionBand>
      <ProseSection section={focus} />
      <SectionBand tone="beige">
        <SectionHeading title={dict.pages.plantation.speciesTitle} />
        <CardList
          columns={3}
          items={data.species.map((item) => ({
            id: item.id,
            title: item.scientificName ? `${item.name} (${item.scientificName})` : item.name,
            description: item.note ?? item.category,
          }))}
        />
      </SectionBand>
    </>
  );
}

async function NurseryPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const data = await getForestryData(lang);
  const intro = data.sections.nursery.find((section) => section.sectionKey === "intro");
  return (
    <>
      <PageHero title={dict.pages.nursery.title} />
      <ProseSection section={intro} />
      <SectionBand tone="beige">
        <SectionHeading title={dict.pages.nursery.tableTitle} />
        <DataTable
          headers={[
            dict.pages.nursery.colSno,
            dict.pages.nursery.colDivision,
            dict.pages.nursery.colLocation,
          ]}
          rows={data.nurseries.map((nursery) => [
            nursery.serialNo,
            nursery.division,
            nursery.location,
          ])}
        />
      </SectionBand>
      <SectionBand>
        <SectionHeading title={dict.pages.nursery.specializationTitle} />
        <BulletList items={data.specializations.map((item) => ({ id: item.id, text: item.text }))} />
      </SectionBand>
    </>
  );
}

async function WildlifePage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const data = await getForestryData(lang);
  const intro = data.sections.wildlife.find((section) => section.sectionKey === "intro");
  return (
    <>
      <PageHero title={dict.pages.wildlife.title} />
      <ProseSection section={intro} />
      <SectionBand tone="beige">
        <SectionHeading title={dict.pages.wildlife.corridorsTitle} />
        <CardList
          columns={2}
          items={data.corridors.map((item) => ({
            id: item.id,
            title: item.name,
            description: [item.description, item.area, item.divisions].filter(Boolean).join("\n"),
          }))}
        />
      </SectionBand>
      <SectionBand>
        <SectionHeading title={dict.pages.wildlife.measuresTitle} />
        <BulletList items={data.measures.map((item) => ({ id: item.id, text: item.text }))} />
      </SectionBand>
    </>
  );
}

async function CommunityPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const data = await getForestryData(lang);
  const intro = data.sections.community.find((section) => section.sectionKey === "intro");
  return (
    <>
      <PageHero title={dict.pages.community.title} />
      <ProseSection section={intro} />
      <SectionBand tone="beige">
        <CardList
          columns={2}
          items={data.community.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
          }))}
        />
      </SectionBand>
    </>
  );
}

async function DepositWorksPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const data = await getDepositWorksData(lang);
  const intro = data.sections.find((section) => section.sectionKey === "intro");
  return (
    <>
      <PageHero title={dict.pages.depositWorks.title} />
      <ProseSection section={intro} />
      <SectionBand tone="beige">
        <SectionHeading title={dict.pages.depositWorks.servicesTitle} />
        <CardList
          columns={3}
          items={data.services.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
          }))}
        />
      </SectionBand>
      <SectionBand>
        <SectionHeading
          title={dict.pages.depositWorks.executionTitle}
          subtitle={dict.pages.depositWorks.executionSubtitle}
        />
        <CardList
          columns={3}
          items={data.execution.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
          }))}
        />
      </SectionBand>
      <SectionBand tone="olive">
        <SectionHeading title={dict.pages.depositWorks.experienceTitle} light />
        <StatGrid stats={data.stats} light />
      </SectionBand>
      <SectionBand>
        <SectionHeading title={dict.pages.depositWorks.trustedTitle} />
        <div className="flex flex-wrap gap-3">
          {data.trusted.map((org) => (
            <span key={org.id} className="bg-beige-100 px-4 py-2 text-sm font-bold text-olive-800">
              {org.name}
            </span>
          ))}
        </div>
      </SectionBand>
    </>
  );
}

async function CsrPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const data = await getCsrData(lang);
  const intro = data.sections.find((section) => section.sectionKey === "intro");
  return (
    <>
      <PageHero title={dict.pages.csr.title} />
      <ProseSection section={intro} />
      <SectionBand tone="beige">
        <SectionHeading title={dict.pages.csr.initiativesTitle} />
        <CardList
          columns={2}
          items={data.initiatives.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
          }))}
        />
      </SectionBand>
    </>
  );
}

async function AuctionsPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const data = await getAuctionsData(lang);
  const intro = data.sections.find((section) => section.sectionKey === "intro");
  return (
    <>
      <PageHero title={dict.pages.auctions.title} />
      <ProseSection section={intro} />
      <SectionBand tone="beige">
        <SectionHeading title={dict.pages.auctions.scheduleTitle} />
        <DataTable
          headers={[
            dict.pages.auctions.colSno,
            dict.pages.auctions.colDivision,
            dict.pages.auctions.colDepot,
            dict.pages.auctions.colAuctionDepot,
            ...dict.pages.auctions.months,
          ]}
          rows={data.schedule.map((row) => [
            row.serialNo,
            row.projectDivision,
            row.depot,
            row.auctionDepot,
            row.january,
            row.february,
            row.march,
            row.april,
            row.may,
          ])}
        />
      </SectionBand>
      <SectionBand>
        <SectionHeading title={dict.pages.auctions.linksTitle} />
        <div className="flex flex-wrap gap-3">
          {data.links.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-olive-800 px-4 py-2 text-sm font-bold text-beige-50 hover:bg-olive-900"
            >
              <Gavel className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </div>
      </SectionBand>
    </>
  );
}

async function ContactPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const data = await getContactData(lang);
  const intro = data.sections.find((section) => section.sectionKey === "intro");
  const address = data.sections.find((section) => section.sectionKey === "address");
  return (
    <>
      <PageHero title={dict.pages.contact.title} />
      <ProseSection section={intro} />
      <SectionBand tone="beige">
        <SectionHeading title={dict.pages.contact.directoryTitle} />
        <DataTable
          headers={[
            dict.pages.contact.colOffice,
            dict.pages.contact.colName,
            dict.pages.contact.colAddress,
          ]}
          rows={data.officers.map((officer) => [
            officer.office,
            [officer.name, officer.designation].filter(Boolean).join("\n"),
            officer.address,
          ])}
        />
      </SectionBand>
      <ProseSection section={address} />
    </>
  );
}

async function AccessibilityPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const sections = await getSections(lang, "accessibility");
  const intro = sections.find((section) => section.sectionKey === "intro");
  return (
    <>
      <PageHero
        title={dict.pages.accessibility.title}
        subtitle={dict.pages.accessibility.subtitle}
      />
      <ProseSection section={intro} />
      <SectionBand tone="beige">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            [dict.a11y.highContrast, Contrast],
            [dict.a11y.largeText, Type],
            [dict.a11y.highlightLinks, Highlighter],
          ].map(([label, Icon]) => (
            <div key={String(label)} className="border border-beige-200 bg-white p-5">
              <Icon className="mb-4 h-6 w-6 text-olive-700" />
              <h2 className="font-bold text-olive-900">{String(label)}</h2>
            </div>
          ))}
        </div>
      </SectionBand>
    </>
  );
}
