export const navItems = [
    { path: '/', label: 'Home', icon: 'fas fa-home' },
    {
        path: '/about',
        label: 'About Us',
        icon: 'fas fa-building',
        subItems: [
            { path: '/about#about-us', label: 'Company Profile' },
            { path: '/about#company-objectives', label: 'Company Objectives' },
            { path: '/about#organisation-chart', label: 'Organisation Chart' },
            { path: '/about#board-of-directors', label: 'Board of Directors' },
            { path: '/directory', label: 'Officers Directory' }
        ]
    },
    {
        path: '/operations',
        label: 'Operations',
        icon: 'fas fa-tree',
        subItems: [
            { path: '/forestry-activities', label: 'Forestry Activities' },
            { path: '/turnkey-projects', label: 'Turnkey Projects' },
            { path: '/services', label: 'Consultancy & Services' }
        ]
    },
    {
        path: '/e-services',
        label: 'E-Services',
        icon: 'fas fa-laptop',
        subItems: [
            { path: '/auctions', label: 'E-Auctions' },
            { path: '/tenders', label: 'Tenders & Notices' }
        ]
    },
    { path: '/gallery', label: 'Gallery', icon: 'fas fa-images' },
    {
        path: '/downloads',
        label: 'Downloads',
        icon: 'fas fa-download',
        subItems: [
            { path: '/downloads#annual-reports', label: 'Annual Reports' },
            { path: '/downloads#annual-returns', label: 'Annual Returns' },
            { path: '/downloads#rti-rts', label: 'RTI/RTS' },
            { path: '/downloads#management-plan', label: 'Management Plan' },
            { path: '/downloads#guidelines-circulars', label: 'Guidelines / Circulars' },
            { path: '/downloads#acts-rules', label: 'Acts / Rules' },
            { path: '/downloads#publication', label: 'Publication' }
        ]
    },
    { path: '/contact', label: 'Contact', icon: 'fas fa-phone' },
];

export const notices = [
    {
        id: 1,
        text: 'Vision 2047: Phase XI focuses on ecology plus revenue across 11 divisions.',
        link: '/projects',
        isNew: true,
    },
    {
        id: 2,
        text: 'Working plans and zonation-led forestry continue to guide site-specific interventions.',
        link: '/about',
        isNew: false,
    },
    {
        id: 3,
        text: 'Tender and auction updates are published in dedicated sections for transparent access.',
        link: '/tenders',
        isNew: true,
    },
    {
        id: 4,
        text: 'Deposit-work partnerships include utilities and industrial collaborators.',
        link: '/services',
        isNew: false,
    },
];

export const companySnapshot = {
    name: 'Madhya Pradesh Rajya Van Vikas Nigam (MPRVVN)',
    tagline: 'Planting Prosperity, Growing Sustainability',
    anniversary: '50 Years of Sustainable Growth | 1975–2025',
    established: 'Constituted in 1975 under the Madhya Pradesh Van Vikas Nigam Adhiniyam, 1975.',
    legal: 'A state government company operating under the applicable Companies Act framework.',
};

export const visionThemes = [
    'Sandal plantations',
    'Self-sustaining nurseries',
    'Revenue enhancement',
    'Expenditure rationalisation',
    'Plantation asset quality',
    'Reassessing low-productive areas',
    'Administrative and accounting reform',
    'Inclusive forest development',
    'Strategic alliances and collaborations',
];
