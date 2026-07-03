/**
 * Database seed — ALL content is sourced strictly from the official MPRVVN
 * content document (website content.pdf). No data is invented. Where the
 * document has no value (e.g. officer phone/email), the field is left null so
 * it can be filled from the Admin panel later.
 *
 * The homepage "Notices" (What's New / Tenders / Careers / Employee Corner) are
 * the only SAMPLE rows — flagged with `isSample: true` — ported from the legacy
 * demo at the user's request; they are placeholders to be replaced via Admin.
 *
 * Hindi: only UI-chrome strings that are genuine interface translations
 * (navigation, footer links, organisation name/tagline) get Hindi `Translation`
 * rows. PDF-derived CONTENT is left untranslated so Hindi pages fall back to the
 * English source — nothing is machine-translated or fabricated.
 */

import { PrismaClient, type Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function reset() {
  // Delete in an order that respects relations; Translation is a loose ref.
  await db.translation.deleteMany();
  await db.navItem.deleteMany(); // self-relation cascades
  await db.footerLink.deleteMany();
  await db.orgNode.deleteMany();
  await db.pageSection.deleteMany();
  await db.seoMeta.deleteMany();
  await db.stat.deleteMany();
  await db.notice.deleteMany();
  await db.homeHero.deleteMany();
  await db.objective.deleteMany();
  await db.missionPoint.deleteMany();
  await db.boardMember.deleteMany();
  await db.plantationPhase.deleteMany();
  await db.species.deleteMany();
  await db.nursery.deleteMany();
  await db.nurserySpecialization.deleteMany();
  await db.wildlifeCorridor.deleteMany();
  await db.conservationMeasure.deleteMany();
  await db.communityInitiative.deleteMany();
  await db.depositWorkService.deleteMany();
  await db.executionStep.deleteMany();
  await db.trustedOrg.deleteMany();
  await db.csrInitiative.deleteMany();
  await db.auctionScheduleRow.deleteMany();
  await db.auctionLink.deleteMany();
  await db.officer.deleteMany();
  await db.siteSetting.deleteMany();
}

async function seedSettings() {
  await db.siteSetting.create({
    data: {
      id: "singleton",
      siteName: "Madhya Pradesh Rajya Van Vikas Nigam Limited",
      shortName: "MPRVVN",
      tagline: "A Government of Madhya Pradesh Undertaking",
      cin: "U02001MP1975SGC001341",
      established: "Founded on 24 July 1975",
      logoUrl: "/logo.png",
      addressLine: "Van Bhawan, Block-C, 1st Floor, Bhopal, Madhya Pradesh",
      officeHours: "Monday – Friday, 10:00 am – 6:00 pm",
      eauctionEnabled: false,
    },
  });
}

const NAV: { id: string; label: string; href: string; order: number; children?: { id: string; label: string; href: string }[] }[] = [
  { id: "nav-home", label: "Home", href: "/", order: 0 },
  {
    id: "nav-about",
    label: "About",
    href: "/about",
    order: 1,
    children: [
      { id: "nav-about-profile", label: "Company Profile", href: "/about" },
      { id: "nav-about-vision", label: "Vision & Mission", href: "/about/vision-mission" },
      { id: "nav-about-objectives", label: "Objectives", href: "/about/objectives" },
      { id: "nav-about-board", label: "Board of Directors", href: "/about/board-of-directors" },
      { id: "nav-about-org", label: "Organisation Structure", href: "/about/organisation-structure" },
    ],
  },
  {
    id: "nav-forestry",
    label: "Forestry",
    href: "/forestry",
    order: 2,
    children: [
      { id: "nav-forestry-plantation", label: "Plantation", href: "/forestry/plantation" },
      { id: "nav-forestry-nursery", label: "Nursery", href: "/forestry/nursery" },
      { id: "nav-forestry-wildlife", label: "Wildlife Conservation", href: "/forestry/wildlife" },
      { id: "nav-forestry-community", label: "Community", href: "/forestry/community" },
    ],
  },
  { id: "nav-deposit", label: "Deposit Works", href: "/deposit-works", order: 3 },
  { id: "nav-csr", label: "CSR", href: "/csr", order: 4 },
  { id: "nav-auctions", label: "Auctions", href: "/auctions", order: 5 },
  { id: "nav-contact", label: "Contact", href: "/contact", order: 6 },
];

// Hindi labels for navigation / footer (genuine interface translations).
const NAV_HI: Record<string, string> = {
  "nav-home": "मुख्य पृष्ठ",
  "nav-about": "हमारे बारे में",
  "nav-about-profile": "कंपनी प्रोफ़ाइल",
  "nav-about-vision": "दृष्टि एवं मिशन",
  "nav-about-objectives": "उद्देश्य",
  "nav-about-board": "निदेशक मंडल",
  "nav-about-org": "संगठन संरचना",
  "nav-forestry": "वानिकी",
  "nav-forestry-plantation": "वृक्षारोपण",
  "nav-forestry-nursery": "नर्सरी",
  "nav-forestry-wildlife": "वन्यजीव संरक्षण",
  "nav-forestry-community": "समुदाय",
  "nav-deposit": "निक्षेप कार्य",
  "nav-csr": "सीएसआर",
  "nav-auctions": "नीलामी",
  "nav-contact": "संपर्क करें",
};

async function seedNav() {
  for (const parent of NAV) {
    await db.navItem.create({
      data: { id: parent.id, label: parent.label, href: parent.href, order: parent.order },
    });
    if (parent.children) {
      await db.navItem.createMany({
        data: parent.children.map((c, i) => ({
          id: c.id,
          label: c.label,
          href: c.href,
          order: i,
          parentId: parent.id,
        })),
      });
    }
  }
}

async function seedFooter() {
  const links = NAV.map((n, i) => ({
    id: `footer-${n.id}`,
    groupTitle: "Quick Links",
    label: n.label,
    href: n.href,
    order: i,
  }));
  await db.footerLink.createMany({ data: links });
}

async function seedPageSections() {
  const sections: Prisma.PageSectionCreateManyInput[] = [
    {
      pageKey: "home",
      sectionKey: "about-preview",
      heading: "Welcome to MPRVVN",
      body: "Madhya Pradesh Rajya Van Vikas Nigam Limited is dedicated to sustainable forestry development, ecological conservation, and scientific plantation management across Madhya Pradesh. Through innovative forestry practices, biodiversity conservation, and environmentally responsible initiatives, MPRVVN continues to strengthen the State's green economy while preserving its natural heritage.\n\nWith a vision towards ecological sustainability and institutional excellence, MPRVVN is actively engaged in plantation development, bamboo and sandalwood cultivation, nursery modernization, eco-restoration, and climate-resilient forestry initiatives.",
      order: 0,
    },
    {
      pageKey: "about",
      sectionKey: "intro",
      heading: "Pioneering Journey in Forestry Excellence",
      body: "The M.P. Rajya Van Vikas Nigam Ltd., founded on July 24, 1975, celebrates its 50th Anniversary in 2025, marking five decades of transformative contributions to sustainable forestry and rural development in Madhya Pradesh. MPRVVN was established as a company under the Companies Act, 1956 based on the 1972 Interim Report of the National Commission on Agriculture. MPRVVN aims to enhance forestry production through plantations of fast-growing, economically valuable species like teak, bamboo, and mixed species.\n\nMPRVVN commenced operations on November 1, 1975. The corporation was initially established with six project divisions: Kesla, Barghat, Lamta, Barnawapara, Mohagaon, and Kota Pandaria. These divisions collectively managed 114,544 hectares of reserved and protected forests, leased to MPRVVN by the Forest Department of the Government of Madhya Pradesh. At the time of its inception, Madhya Pradesh and Chhattisgarh functioned as a single state, allowing MPRVVN to conduct forestry operations across both regions. Following the reorganization of states on November 1, 2000, which resulted in the formation of Chhattisgarh as a separate state, MPRVVN continued its operations in Madhya Pradesh. At present, the extent of forest area with MPRVVN is over 4.25 lakh ha., which is divided into two Regions namely, Jabalpur and Bhopal. The above two regions are further sub-divided into 11 Forest Project Divisions.",
      order: 0,
    },
    {
      pageKey: "about",
      sectionKey: "crop-i",
      heading: "Crop – I",
      body: "Crop-I refers to the initial felling of existing forest stands handed over by the Forest Department, undertaken by MPRVVN with requisite approvals under the Working Plan. The entire revenue from the sale of Crop-I is credited to the State Government, with MPRVVN receiving a commission of 2% for its harvesting, administration, and sale operations.",
      order: 1,
    },
    {
      pageKey: "about",
      sectionKey: "crop-ii",
      heading: "Crop – II",
      body: "Following the clearance of Crop-I, MPRVVN develops fresh plantations on the same land, managing them through a full 60-year rotation cycle. This includes structured silvicultural interventions such as cleaning in the sixth year, periodic thinning every five years starting from the eleventh year, and final harvesting at the end of the cycle. As the entire plantation process—cultivation, maintenance, and harvesting—is executed solely by MPRVVN, it retains full rights to the resulting sale proceeds.",
      order: 2,
    },
    {
      pageKey: "about",
      sectionKey: "vision",
      heading: "Vision Statement",
      body: "\"To be a pioneering forest Enterprise committed to realizing the full economic potential of forests through scientific and sustainable management, while actively diversifying into innovative forestry ventures across the State. We aim to foster strategic partnerships with public and private stakeholders to promote inclusive forest development, aligned with ecological integrity and environmental sustainability.\"",
      order: 3,
    },
    {
      pageKey: "forestry",
      sectionKey: "intro",
      heading: "Forestry Activities",
      body: "Madhya Pradesh Rajya Van Vikas Nigam Limited has undertaken large-scale plantation activities across more than 4.25 lakh hectares of forest area distributed under two regional jurisdictions — Jabalpur Region and Bhopal Region — through its 11 Forest Project Divisions. The plantation programs are implemented through scientifically designed silvicultural models focusing on ecological restoration, commercial forestry, biodiversity conservation, and climate resilience.",
      order: 0,
    },
    {
      pageKey: "plantation",
      sectionKey: "intro",
      heading: "Plantation Activities",
      body: "Madhya Pradesh Rajya Van Vikas Nigam Limited has undertaken large-scale plantation activities across more than 4.25 lakh hectares of forest area distributed under two regional jurisdictions — Jabalpur Region and Bhopal Region — through its 11 Forest Project Divisions. Since its establishment, MPRVVN has continuously expanded plantation activities under various forestry phases with emphasis on sustainable and scientific forestry management.",
      order: 0,
    },
    {
      pageKey: "plantation",
      sectionKey: "focus",
      heading: "Focus Species",
      body: "MPRVVN plantation activities primarily focus on Teak (Tectona grandis), Bamboo species, Khamer, RET (Rare, Endangered & Threatened) and native species — and recently Sandalwood plantation started from 2025.",
      order: 1,
    },
    {
      pageKey: "nursery",
      sectionKey: "intro",
      heading: "Nursery",
      body: "MPRVVN has established itself as the largest producer of high-quality Teak (Tectona grandis) plants and teak root shoots in India. The primary focus of Phases I to X was on the propagation and distribution of teak root shoots, which substantially contributed to plantation programs across the state and beyond.",
      order: 0,
    },
    {
      pageKey: "wildlife",
      sectionKey: "intro",
      heading: "Wildlife Management & Biodiversity Conservation",
      body: "The Madhya Pradesh Rajya Van Vikas Nigam (MPRVVN)'s expansive plantation areas form critical and vibrant wildlife corridors, facilitating the safe movement of iconic species such as tigers, leopards, bison, and spotted deer. These corridors are vital for maintaining genetic diversity and ecosystem resilience. These initiatives significantly strengthen ecological connectivity, wildlife conservation, and ecosystem resilience across Madhya Pradesh.",
      order: 0,
    },
    {
      pageKey: "community",
      sectionKey: "intro",
      heading: "Community",
      body: "Madhya Pradesh Rajya Van Vikas Nigam Limited has established a strong Joint Forest Management (JFM) network through Van Suraksha Samitis (VSS) and Gram Van Samitis (GVS), actively engaging tribal and rural communities in forest protection, plantation activities, nursery operations, bamboo management, and biodiversity conservation. From 2013 to 2021, MPRVVN distributed over ₹102 crore under JFM benefit-sharing mechanisms, including nearly ₹50 crore directly transferred to committee members.",
      order: 0,
    },
    {
      pageKey: "deposit-works",
      sectionKey: "intro",
      heading: "Deposit Works",
      body: "MPRVVN (M.P. Rajya Van Vikas Nigam Limited) is a Government of Madhya Pradesh forestry organisation with over five decades of experience in scientific plantation and ecological restoration. We deliver dependable, professionally managed plantation solutions that support corporate, PSU and institutional requirements for EC compliance, CSR commitments and sustainable development.",
      order: 0,
    },
    {
      pageKey: "csr",
      sectionKey: "intro",
      heading: "CSR Activities",
      body: "Madhya Pradesh Rajya Van Vikas Nigam Limited undertakes CSR initiatives focused on education, community development, renewable energy, and skill enhancement in tribal and forest fringe villages. During FY 2024–25, the Nigam contributed ₹1.5 crore towards various community welfare initiatives.",
      order: 0,
    },
    {
      pageKey: "auctions",
      sectionKey: "intro",
      heading: "Tentative Dates of Auctions — January to May 2026",
      body: "The tentative dates of auctions are listed below division-wise. The monthly auction advertisement is published separately. E-Auction can be enabled in future.",
      order: 0,
    },
    {
      pageKey: "contact",
      sectionKey: "intro",
      heading: "Get in Touch",
      body: "For information regarding plantations, nursery services, projects, deposit works, and other activities, please contact us through the official communication channels. We welcome your suggestions, participation, and collaboration towards building a greener and more sustainable future.",
      order: 0,
    },
    {
      pageKey: "contact",
      sectionKey: "address",
      heading: "Address & Timing",
      body: "Van Bhawan, Block-C, 1st Floor, Bhopal, Madhya Pradesh\nTiming: Monday – Friday, 10:00 am – 6:00 pm",
      order: 1,
    },
    {
      pageKey: "accessibility",
      sectionKey: "intro",
      heading: "Our Commitment to Accessibility",
      body: "MPRVVN is committed to ensuring that this website is accessible to all users, including persons with disabilities, in line with the Guidelines for Indian Government Websites (GIGW) and WCAG 2.1 Level AA. Use the accessibility tools button to adjust contrast, text size, fonts and link emphasis. The site supports keyboard navigation and screen readers. If you experience any difficulty accessing content, please contact us through the official channels listed on the Contact page.",
      order: 0,
    },
  ];
  await db.pageSection.createMany({ data: sections });
}

async function seedHome() {
  await db.homeHero.create({
    data: {
      badge: "Government of Madhya Pradesh Undertaking",
      heading: "Madhya Pradesh Rajya Van Vikas Nigam",
      subheading:
        "Dedicated to sustainable forestry development, ecological conservation, and scientific plantation management across Madhya Pradesh.",
      primaryCtaLabel: "About MPRVVN",
      primaryCtaHref: "/about",
      secondaryCtaLabel: "Forestry Activities",
      secondaryCtaHref: "/forestry/plantation",
      imageUrl: "/hero-forest.png",
      isActive: true,
      order: 0,
    },
  });

  await db.stat.createMany({
    data: [
      { group: "home", label: "Forest Project Divisions", value: "11", order: 0 },
      { group: "home", label: "Forest Area Managed", value: "4.25 Lakh ha", order: 1 },
      { group: "home", label: "Regions (Jabalpur & Bhopal)", value: "2", order: 2 },
      { group: "home", label: "Of Service (1975–2025)", value: "50 Years", order: 3 },
      { group: "experience", label: "Plantations raised", value: "3+ Lakh ha", order: 0 },
      { group: "experience", label: "Plants in NCL mining areas", value: "1.40 Crore", order: 1 },
      { group: "experience", label: "Plants in NTPC projects", value: "15.03 Lakh", order: 2 },
      { group: "experience", label: "Seedlings — WCL contract 2025–29", value: "29 Lakh", order: 3 },
    ],
  });
}

async function seedNotices() {
  const notices: Prisma.NoticeCreateManyInput[] = [
    { category: "WHATS_NEW", text: "eAuction (New & Withdrawn Teak Timber, Teak Pole, Non-Teak Timber) — Jabalpur Region", isNew: true, isSample: true, order: 0 },
    { category: "WHATS_NEW", text: "Open Tender (Various Works in Satpura Forest Range) — Hoshangabad", isNew: true, isSample: true, order: 1 },
    { category: "WHATS_NEW", text: "Notification regarding new guidelines for NTFP collection 2026", isSample: true, order: 2 },
    { category: "WHATS_NEW", text: "Result of eAuction held on 05-05-2026 for Bamboo Bundles", isSample: true, order: 3 },
    { category: "TENDER", text: "Tender Notice for Supply of High-Tech Nursery Equipment — Betul", isNew: true, isSample: true, order: 0 },
    { category: "TENDER", text: "E-Tender for Construction of Boundary Wall at Central Depot", isNew: true, isSample: true, order: 1 },
    { category: "TENDER", text: "Expression of Interest for CSR Plantation Partners", isSample: true, order: 2 },
    { category: "TENDER", text: "Short-Term Tender Notice for Vehicle Hiring", isSample: true, order: 3 },
    { category: "CAREER", text: "Recruitment for Assistant Forest Managers — Apply by 25-05-2026", isNew: true, isSample: true, order: 0 },
    { category: "CAREER", text: "Walk-in Interview for Project Consultants (GIS & Remote Sensing)", isSample: true, order: 1 },
    { category: "CAREER", text: "Final list of selected candidates for Forest Guard positions 2025-26", isSample: true, order: 2 },
    { category: "EMPLOYEE_CORNER", text: "Accountants Final Seniority List dated 01-01-2026 — Head Office", isNew: true, isSample: true, order: 0 },
    { category: "EMPLOYEE_CORNER", text: "Pay & Accounts Officers Final Seniority List dated 01-01-2026", isSample: true, order: 1 },
    { category: "EMPLOYEE_CORNER", text: "Circular regarding submission of Annual Property Returns 2025-26", isSample: true, order: 2 },
    { category: "EMPLOYEE_CORNER", text: "Revised Guidelines for TA/DA claims effective from April 2026", isSample: true, order: 3 },
  ];
  await db.notice.createMany({ data: notices });
}

async function seedAbout() {
  await db.objective.createMany({
    data: [
      "To Accelerate and increase Forestry Production by creating plantation of the species of higher economic value, fast growing species and species capable of diversified use for Industrial and Commercial purposes.",
      "To enhance the productivity and quality of Forest by imposing intensive Forest Management Practices.",
      "Increasing Green Cover and conservation of Biodiversity.",
      "Enhancing revenue from forest produce.",
      "Empowering Tribal and Forest dependent communities.",
      "Promoting Bamboo and NTFP industries.",
      "Adopting Climate Resilient Forest Practices.",
      "Improving Infrastructure and digital systems for forest management.",
      "Strengthen community participation and benefit-sharing.",
      "Maximize Carbon Sequestration and align with SDGs.",
    ].map((text, order) => ({ text, order })),
  });

  await db.missionPoint.createMany({
    data: [
      { category: "GOVERNMENT", text: "To supplement Government's efforts in extending and enriching the forest cover of the State.", order: 0 },
      { category: "GOVERNMENT", text: "To give optimal returns to the Government in form of dividends.", order: 1 },
      { category: "GOVERNMENT", text: "To continue to be a financial asset to the State Government.", order: 2 },
      { category: "CONSUMERS", text: "To be transparent and fair in dealing with consumers for mutual benefit.", order: 0 },
      { category: "CONSUMERS", text: "To improve socio-economic conditions of the local communities by imparting training and involving them as partners in Nigam's activities.", order: 1 },
      { category: "EMPLOYEES", text: "To be transparent and fair with employees and provide them growth opportunities through training and good management practices.", order: 0 },
    ],
  });

  await db.boardMember.createMany({
    data: [
      { name: "Hon'ble Shri Ram Niwas Rawat", designation: "Chairman", order: 0 },
      { name: "Hon'ble Shri Ram Mohan Singh Baghel", designation: "Vice Chairman", order: 1 },
      { name: "Shri Sandeep Yadav, IAS — Principal Secretary, Forest", designation: "Director", order: 2 },
      { name: "Shri Subharanjan Sen, IFS — Principal Chief Conservator of Forests & HoFF", designation: "Director", order: 3 },
      { name: "Shri Bhaskar Lakshakar, IAS — Additional Secretary, Finance", designation: "Director", order: 4 },
      { name: "Shri H.U. Khan, IFS — Principal Chief Conservator of Forests", designation: "Managing Director", order: 5 },
    ],
  });
}

async function seedOrg() {
  const roots = [
    {
      id: "org-apex",
      title: "Apex Leadership",
      order: 0,
      children: [
        { title: "Chairman", subtitle: "Hon'ble Shri Ram Niwas Rawat" },
        { title: "Vice Chairman", subtitle: "Hon'ble Shri Ram Mohan Singh Baghel" },
        { title: "Managing Director", subtitle: "Shri H.U. Khan, IFS" },
        { title: "Additional Managing Director", subtitle: null },
      ],
    },
    {
      id: "org-amd",
      title: "Additional Managing Directors",
      order: 1,
      children: [
        { title: "Finance & Budget", subtitle: null },
        { title: "Administration / Coordination", subtitle: null },
        { title: "Project Formulation", subtitle: null },
        { title: "Marketing", subtitle: null },
        { title: "Company Secretary", subtitle: null },
      ],
    },
    {
      id: "org-rgm-bhopal",
      title: "Regional General Manager, Bhopal",
      order: 2,
      children: [
        { title: "Vidisha – Raisen", subtitle: null },
        { title: "Sehore", subtitle: null },
        { title: "Khandwa", subtitle: null },
        { title: "Chhindwara", subtitle: null },
        { title: "Rampur – Bhatodi", subtitle: null },
      ],
    },
    {
      id: "org-rgm-jabalpur",
      title: "Regional General Manager, Jabalpur",
      order: 3,
      children: [
        { title: "Barghat – Seoni", subtitle: null },
        { title: "Lamta – Balaghat", subtitle: null },
        { title: "Kundam – Jabalpur", subtitle: null },
        { title: "Umaria", subtitle: null },
        { title: "Mohgaon – Mandla", subtitle: null },
        { title: "Rewa – Sidhi", subtitle: null },
      ],
    },
  ];

  for (const root of roots) {
    await db.orgNode.create({
      data: { id: root.id, title: root.title, order: root.order },
    });
    await db.orgNode.createMany({
      data: root.children.map((c, i) => ({
        title: c.title,
        subtitle: c.subtitle,
        parentId: root.id,
        order: i,
      })),
    });
  }
}

async function seedForestry() {
  await db.plantationPhase.createMany({
    data: [
      { phaseLabel: "Phase I–II", period: "1976–1983", areaHectares: 23739, order: 0 },
      { phaseLabel: "Phase III", period: "1983–1988", areaHectares: 32770, order: 1 },
      { phaseLabel: "Phase IV", period: "1988–1995", areaHectares: 47102, order: 2 },
      { phaseLabel: "Phase V", period: "1995–2000", areaHectares: 20585, order: 3 },
      { phaseLabel: "Phase VI", period: "2000–2005", areaHectares: 18096, order: 4 },
      { phaseLabel: "Phase VII", period: "2005–2010", areaHectares: 37401, order: 5 },
      { phaseLabel: "Phase VIII", period: "2010–2015", areaHectares: 39306, order: 6 },
      { phaseLabel: "Phase IX", period: "2015–2020", areaHectares: 47152, order: 7 },
      { phaseLabel: "Phase X", period: "2020–2025", areaHectares: 37410, order: 8 },
    ],
  });

  await db.species.createMany({
    data: [
      { name: "Teak", scientificName: "Tectona grandis", category: "Primary focus species", order: 0 },
      { name: "Bamboo", category: "Focus species", order: 1 },
      { name: "Khamer", category: "Focus species", order: 2 },
      { name: "RET species", category: "Rare, Endangered & Threatened", order: 3 },
      { name: "Native species", category: "Indigenous & mixed", order: 4 },
      { name: "Sandalwood", category: "Focus species", note: "Plantation started from 2025", order: 5 },
    ],
  });

  await db.nursery.createMany({
    data: [
      { serialNo: 1, division: "Chhindwara, Chhindwara", location: "Lavagoghri", order: 0 },
      { serialNo: 2, division: "Rampur Bhatodi, Betul", location: "Saapna", order: 1 },
      { serialNo: 3, division: "Vidisha-Raisen, Bhopal", location: "Vanita Samaj Nursery, Peguai", order: 2 },
      { serialNo: 4, division: "Khandwa, Khandwa", location: "Narmada Nagar, Rajor", order: 3 },
      { serialNo: 5, division: "Kundam, Jabalpur", location: "Belkund", order: 4 },
      { serialNo: 6, division: "Mohgaon, Mandla", location: "Kanchangaon", order: 5 },
      { serialNo: 7, division: "Barghat, Seoni", location: "Dhhuti, Hirrisangam", order: 6 },
      { serialNo: 8, division: "Lamta, Balaghat", location: "Katanga, Kanki", order: 7 },
      { serialNo: 9, division: "Umaria, Umaria", location: "Chandia", order: 8 },
      { serialNo: 10, division: "Rewa-Sidhi", location: "Jiyavan", order: 9 },
      { serialNo: 11, division: "Sehore", location: "Matthagaon", order: 10 },
    ],
  });

  await db.nurserySpecialization.createMany({
    data: [
      "Teak root-shoot",
      "Bamboo rhizomes",
      "Sandalwood saplings",
      "Indigenous and mixed species",
      "Ornamental and avenue plants",
      "RET (Rare, Endangered & Threatened) species",
    ].map((text, order) => ({ text, order })),
  });

  await db.wildlifeCorridor.createMany({
    data: [
      {
        name: "Kanha–Pench Corridor",
        description: "Acts as a biodiversity lifeline, linking two of India's premier tiger reserves.",
        area: "75,181.593 hectares",
        divisions: "Lamta, Barghat, Mohgaon",
        order: 0,
      },
      {
        name: "Bandhavgarh Buffer Zones",
        description: "The Umaria and Kundam divisions reinforce the ecological connectivity of the Bandhavgarh Tiger Reserve.",
        divisions: "Umaria, Kundam",
        order: 1,
      },
      {
        name: "Ratapani Tiger Reserve Connectivity",
        description: "Sehore and Vidisha divisions strengthen linkages with the Ratapani Tiger Reserve, contributing to a dynamic habitat network.",
        divisions: "Sehore, Vidisha",
        order: 2,
      },
      {
        name: "Satpura–Melghat Tiger Corridor",
        description: "This vital inter-state corridor connects the Satpura Tiger Reserve in Madhya Pradesh with the Melghat Tiger Reserve in Maharashtra via the Rampur Bhatodi division, enabling seamless wildlife movement across state boundaries.",
        divisions: "Rampur Bhatodi",
        order: 3,
      },
    ],
  });

  await db.conservationMeasure.createMany({
    data: [
      "Waterhole development",
      "Habitat improvement and meadow development",
      "Plantation of native fruit-bearing species such as jamun and fig",
      "Conservation of natural dens and snag trees",
      "Invasive species management",
    ].map((text, order) => ({ text, order })),
  });

  await db.communityInitiative.createMany({
    data: [
      {
        title: "Joint Forest Management (JFM) Network",
        description: "Through Van Suraksha Samitis (VSS) and Gram Van Samitis (GVS), MPRVVN engages tribal and rural communities in forest protection, plantation activities, nursery operations, bamboo management, and biodiversity conservation.",
        order: 0,
      },
      {
        title: "Benefit Sharing",
        description: "From 2013 to 2021, MPRVVN distributed over ₹102 crore under JFM benefit-sharing mechanisms, including nearly ₹50 crore directly transferred to committee members.",
        order: 1,
      },
    ],
  });
}

async function seedDepositWorks() {
  await db.depositWorkService.createMany({
    data: [
      { title: "Turnkey plantations for Environmental Clearance (EC) compliance", order: 0 },
      { title: "CSR-funded greening and ecological improvement programmes", order: 1 },
      { title: "Roadside and avenue plantations along highways, industrial zones, campuses", order: 2 },
      { title: "Miyawaki urban dense forests", order: 3 },
      { title: "Scientific restoration of mine-dumps and degraded lands", order: 4 },
    ],
  });

  await db.executionStep.createMany({
    data: [
      { title: "Site selection and survey", order: 0 },
      { title: "Soil and species planning – site specific", order: 1 },
      { title: "Plantation execution at scale and across diverse landscape", order: 2 },
      { title: "Protection & maintenance", order: 3 },
      { title: "Monitoring and evaluation", order: 4 },
    ],
  });

  await db.trustedOrg.createMany({
    data: [
      "WCL",
      "NTPC",
      "Havells India Ltd.",
      "NHAI",
      "Indian Railways",
      "Coca-Cola",
      "AKVN",
      "SECL",
      "NCL",
      "THDC India Limited",
      "MP Power Generating Co. Ltd.",
      "SAIL",
    ].map((name, order) => ({ name, order })),
  });
}

async function seedCsr() {
  await db.csrInitiative.createMany({
    data: [
      {
        category: "EDUCATION",
        title: "Education Support",
        description: "Smart boards in village schools; dual desks and classroom infrastructure; safe drinking water facilities through water filters.",
        order: 0,
      },
      {
        category: "COMMUNITY_INFRASTRUCTURE",
        title: "Community Infrastructure",
        description: "Development of community halls and public gathering spaces; village infrastructure support through Van Suraksha Samiti (VSS) participation.",
        order: 1,
      },
      {
        category: "RENEWABLE_ENERGY",
        title: "Renewable Energy",
        description: "Solar panel installation in community centres and educational institutions; promotion of clean energy solutions in remote forest villages.",
        order: 2,
      },
      {
        category: "SKILL_DEVELOPMENT",
        title: "Skill Development",
        description: "Employment-oriented skill training programmes for rural and tribal youth; construction skill development in collaboration with Larsen & Toubro at the Forest Guard Training School, Lakhnadon and CII Chhindwara.",
        order: 3,
      },
    ],
  });
}

async function seedAuctions() {
  const rows: Prisma.AuctionScheduleRowCreateManyInput[] = [
    { serialNo: 1, projectDivision: "Rampur Bhatodi, Betul", depot: "Bhaura", auctionDepot: "Bhaura (Betul Production)", january: "29", february: "19", march: "14", april: "13", may: "13", year: "2026", order: 0 },
    { serialNo: 2, projectDivision: "Chhindwada, Chhindwada", depot: "Satnur", auctionDepot: "Satnur", january: "15", february: "18", march: "25", april: "17", may: "11", year: "2026", order: 1 },
    { serialNo: 3, projectDivision: "Barghat, Seoni", depot: "Behrai", auctionDepot: "Behrai/Kanki", january: "13", february: "12", march: "09", april: "02", may: "02", year: "2026", order: 2 },
    { serialNo: 4, projectDivision: "Lamta, Balaghat", depot: "Kanki", auctionDepot: "Kanki", january: "19", february: "16", march: "12", april: "16", may: "12", year: "2026", order: 3 },
    { serialNo: 5, projectDivision: "Lamta, Balaghat", depot: "Padriganj", auctionDepot: "Kanki", year: "2026", order: 4 },
    { serialNo: 6, projectDivision: "Khandwa, Khandwa", depot: "Narmada Nagar", auctionDepot: "Narmada Nagar", january: "12", february: "09", march: "11", april: "10", may: "09", year: "2026", order: 5 },
    { serialNo: 7, projectDivision: "Vidisha-Raisen, Bhopal", depot: "Dhakna Chapna (Sanchi)", auctionDepot: "Dhakna Chapna (Sanchi)", january: "03", february: "03", march: "10", april: "27", may: "26", year: "2026", order: 6 },
    { serialNo: 8, projectDivision: "Sehore, Sehore", depot: "Ladkui", auctionDepot: "Ladkui", january: "23", february: "23", march: "23", april: "21", may: "18", year: "2026", order: 7 },
    { serialNo: 9, projectDivision: "Mohgaon, Mandla", depot: "Devridadar", auctionDepot: "Pandiwara", january: "08", february: "05", march: "11", april: "08", may: "06", year: "2026", order: 8 },
    { serialNo: 10, projectDivision: "Mohgaon, Mandla", depot: "Pandiwara", year: "2026", order: 9 },
    { serialNo: 11, projectDivision: "Kundam, Jabalpur", depot: "Gosalpur", auctionDepot: "Gosalpur", january: "24", february: "25", march: "16", april: "25", may: "22", year: "2026", order: 10 },
    { serialNo: 12, projectDivision: "Umaria, Umaria", depot: "Umaria", auctionDepot: "Umaria", january: "21", february: "20", march: "18", april: "22", may: "20", year: "2026", order: 11 },
    { serialNo: 13, projectDivision: "Rewa-Sidhi, Sidhi", depot: "Tikari", auctionDepot: "Umaria", year: "2026", order: 12 },
  ];
  await db.auctionScheduleRow.createMany({ data: rows });

  await db.auctionLink.createMany({
    data: [
      { label: "Tentative Dates of Auctions (Jan–May 2026)", url: "http://www.mpsfdc.com/dateofauction-new.htm", order: 0 },
      { label: "Monthly Auction Advertisement (May 2026)", url: "http://www.mpsfdc.com/Auction_Advertisement_May_2026.pdf", order: 1 },
    ],
  });
}

async function seedContact() {
  const headOffice = "Van Bhawan, Block-C, 1st Floor, Bhopal";
  const officers: Prisma.OfficerCreateManyInput[] = [
    { office: "Head Office, Bhopal", name: "Shri H.U. Khan, IFS", designation: "Managing Director", address: headOffice, region: "HEAD_OFFICE", order: 0 },
    { office: "Head Office, Bhopal", name: null, designation: "Additional Managing Director", address: headOffice, region: "HEAD_OFFICE", order: 1 },
    { office: "Head Office, Bhopal", name: "Shri Anil Kumar Shukla, IFS", designation: "Executive Director (Administration, Coordination, Marketing, PF)", address: headOffice, region: "HEAD_OFFICE", order: 2 },
    { office: "Head Office, Bhopal", name: "Shri Sanjay Kumar Jain, SFS", designation: "Dy. General Manager (Finance & Budget, Marketing, Coordination, PF)", address: headOffice, region: "HEAD_OFFICE", order: 3 },
    { office: "Head Office, Bhopal", name: "Shri Samir Mathur", designation: "Company Secretary and General Manager (Finance & Budget)", address: headOffice, region: "HEAD_OFFICE", order: 4 },
    { office: "Head Office, Bhopal", name: "Shri Brajesh Saxena", designation: "Staff Officer to MD", address: headOffice, region: "HEAD_OFFICE", order: 5 },
    { office: "Head Office, Bhopal", name: "Shri Umesh Kumar Prajapati", designation: "Sr. Data Entry Operator and CISO", address: headOffice, region: "HEAD_OFFICE", order: 6 },

    { office: "Regional General Manager, Bhopal", name: "Shri Praful Neeraj Gulabrao Phuljhele, IFS", designation: "Regional Chief General Manager", address: "O/o Regional Chief General Manager, Bhopal", region: "BHOPAL", order: 0 },
    { office: "Divisional Manager, Vidisha-Raisen", name: "Shri Tarun Kaurav", designation: "Divisional Manager", address: "O/o Divisional Manager, Bhopal", region: "BHOPAL", order: 1 },
    { office: "Divisional Manager, Chhindwara", name: "Smt. S. Deepika, IFS", designation: "Divisional Manager", address: "O/o Divisional Manager, Chhindwara", region: "BHOPAL", order: 2 },
    { office: "Divisional Manager, Khandwa", name: "Shri Ram Kumar Awadhiya", designation: "Divisional Manager", address: "O/o Divisional Manager, Bhandaria Road, Khandwa", region: "BHOPAL", order: 3 },
    { office: "Divisional Manager, Rampur Bhatodi", name: "Shri Sheetal Prasad Shakya, IFS", designation: "Divisional Manager", address: "O/o Divisional Manager, Betul (M.P.) 460001", region: "BHOPAL", order: 4 },
    { office: "Divisional Manager, Sehore", name: "Shri Tarun Kaurav", designation: "Divisional Manager", address: "O/o Divisional Manager, Sehore (M.P.) 466001", region: "BHOPAL", order: 5 },

    { office: "Regional General Manager, Jabalpur", name: "Shri Brajendra Jha, IFS", designation: "Regional Chief General Manager", address: "O/o Regional Chief General Manager, Jabalpur (M.P.) 482001", region: "JABALPUR", order: 0 },
    { office: "Divisional Manager, Kundam", name: "Shri Mohit Sud, IFS", designation: "Divisional Manager", address: "O/o Divisional Manager, Jabalpur (M.P.)", region: "JABALPUR", order: 1 },
    { office: "Divisional Manager, Rewa-Sidhi", name: "Shri Rakesh Kodape, IFS", designation: "Divisional Manager", address: "O/o Divisional Manager, Sidhi (M.P.) 486661", region: "JABALPUR", order: 2 },
    { office: "Divisional Manager, Mohgaon", name: "Shri Amit Patodi, IFS", designation: "Divisional Manager", address: "O/o Divisional Manager, Civil Lines, Mandla (M.P.)", region: "JABALPUR", order: 3 },
    { office: "Divisional Manager, Barghat", name: "Shri Ramkishan Solanki, IFS", designation: "Divisional Manager", address: "O/o Divisional Manager, Seoni (M.P.) 480661", region: "JABALPUR", order: 4 },
    { office: "Divisional Manager, Lamta", name: "Shri Ramkishan Solanki, IFS", designation: "Divisional Manager", address: "O/o Divisional Manager, Circuit Office, Balaghat", region: "JABALPUR", order: 5 },
    { office: "Divisional Manager, Umaria", name: "Shri Amit Patodi, IFS", designation: "Divisional Manager", address: "O/o Divisional Manager, Umaria (M.P.) 484661", region: "JABALPUR", order: 6 },
  ];
  await db.officer.createMany({ data: officers });
}

async function seedTranslationsHi() {
  const rows: Prisma.TranslationCreateManyInput[] = [];

  // Navigation labels.
  for (const [recordId, value] of Object.entries(NAV_HI)) {
    rows.push({ locale: "hi", model: "NavItem", recordId, field: "label", value });
  }
  // Footer links mirror the nav; group title localized too.
  for (const [navId, value] of Object.entries(NAV_HI)) {
    const recordId = `footer-${navId}`;
    rows.push({ locale: "hi", model: "FooterLink", recordId, field: "label", value });
    rows.push({ locale: "hi", model: "FooterLink", recordId, field: "groupTitle", value: "त्वरित लिंक" });
  }
  // Site settings (organisation identity).
  rows.push(
    { locale: "hi", model: "SiteSetting", recordId: "singleton", field: "siteName", value: "मध्य प्रदेश राज्य वन विकास निगम लिमिटेड" },
    { locale: "hi", model: "SiteSetting", recordId: "singleton", field: "tagline", value: "मध्य प्रदेश शासन का उपक्रम" },
  );

  await db.translation.createMany({ data: rows });
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn("⚠ ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin user.");
    return;
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await db.user.upsert({
    where: { email },
    update: { passwordHash, role: "ADMIN" },
    create: { email, name: "Administrator", passwordHash, role: "ADMIN" },
  });
  console.log(`✔ Admin user ready: ${email}`);
}

async function main() {
  console.log("Seeding database (PDF-sourced content only)…");
  await reset();
  await seedSettings();
  await seedNav();
  await seedFooter();
  await seedPageSections();
  await seedHome();
  await seedNotices();
  await seedAbout();
  await seedOrg();
  await seedForestry();
  await seedDepositWorks();
  await seedCsr();
  await seedAuctions();
  await seedContact();
  await seedTranslationsHi();
  await seedAdmin();
  console.log("✔ Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
