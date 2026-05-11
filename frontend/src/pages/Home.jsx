import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

const Home = () => {
    const [activeTab, setActiveTab] = useState('whatsNew');

    const newsData = {
        whatsNew: [
            "eAuction (New and Withdrawn Teak Timber, Teak Pole, Non Teak Timber) Jabalpur Division",
            "Open Tender (Various Works in Satpura Forest Range) Hoshangabad Division",
            "Offline Tender (Soil and Water Conservation Works) Seoni Division",
            "Notification regarding new guidelines for NTFP collection 2026",
            "Result of eAuction held on 05-05-2026 for Bamboo Bundles"
        ],
        careers: [
            "Recruitment for Assistant Forest Managers - Apply by 25-05-2026",
            "Walk-in Interview for Project Consultants (GIS & Remote Sensing)",
            "Final list of selected candidates for Forest Guard positions 2025-26",
            "Advertisement for the post of Financial Advisor on Deputation"
        ],
        tenders: [
            "Tender Notice for Supply of High-Tech Nursery Equipment - Betul",
            "E-Tender for Construction of Boundary Wall at Central Depo",
            "Expression of Interest for CSR Plantation Partners",
            "Tender for Procurement of Drone Cameras for Forest Protection",
            "Short Term Tender Notice for Vehicle Hiring"
        ]
    };

    const employeeData = [
        "Accountants Final Seniority List Dated 01-01-2026 - Head Office",
        "Assistant Pay and Accounts Officers Final Seniority List Dated 01-01-2026 - Head Office",
        "Pay and Accounts Officers Final Seniority List Dated 01-01-2026 - Head Office",
        "Anukampa List of eligible applicants for Group C and D 12-02-2026 - Central Region",
        "Circular regarding submission of Annual Property Returns 2025-26",
        "Revised Guidelines for TA/DA claims effective from April 2026"
    ];

    return (
        <PageShell>
            {/* ── HERO SECTION ── */}
            <section className="relative bg-beige-50 overflow-hidden border-b border-beige-200">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #465A37 1px, transparent 1px)', backgroundSize: '28px 28px' }}></div>

                <div className="relative flex flex-col lg:flex-row min-h-[82vh]">

                    {/* ── LEFT: Text Content ── */}
                    <div className="flex-1 flex items-center px-8 md:px-16 lg:px-20 xl:px-28 py-16 lg:py-0">
                        <div className="max-w-xl w-full">

                            {/* Welcome line (separated) */}
                            <div className="mb-7">
                                <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-bold tracking-[0.18em] uppercase text-olive-700 bg-olive-100 border border-olive-200 rounded-full">
                                    <i className="fas fa-leaf text-olive-500 text-[10px]" /> Welcome to MPFSDC
                                </span>
                            </div>


                            {/* Government badge */}
                            {/* <div className="flex items-center gap-3 mb-6">
                                <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-bold tracking-[0.18em] uppercase text-olive-700 bg-olive-100 border border-olive-200 rounded-full">
                                    <i className="fas fa-leaf text-olive-500 text-[10px]"></i> Govt. of Madhya Pradesh
                                </span>
                                <span className="text-beige-400 font-light">·</span>
                                <span className="text-xs font-semibold text-beige-500 tracking-wider">Est. 1975</span>
                            </div> */}

                            {/* Main Heading (replaced by welcome line) */}
                            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-olive-900 leading-[1.12] tracking-tight mb-6">
                                Welcome to <span className="text-gold-500">MPRVVN</span>

                            </h1>

                            {/* Original main heading commented out */}
                            {/*
                            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-olive-900 leading-[1.12] tracking-tight mb-6">
                                Sustainable{' '}
                                <span className="relative inline-block">
                                    <span className="relative z-10 text-olive-700">Forest</span>
                                    <span className="absolute bottom-1 left-0 w-full h-3 bg-gold-200 -z-0 rounded" />
                                </span>
                                {' '}Management
                                <br className="hidden md:block" />
                                <span className="text-olive-600"> for Madhya Pradesh</span>
                            </h1>
                            */}


                            {/* Subtext */}
                            <p className="text-base md:text-lg text-olive-600 leading-relaxed mb-10 max-w-md">
                                Promoting environmental conservation and economic development through scientifically managed forest practices across the state.
                            </p>


                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 mb-12">
                                <Link to="/about" className="inline-flex items-center gap-2.5 bg-olive-800 text-beige-50 px-6 py-3.5 rounded-lg font-bold hover:bg-olive-900 transition-colors shadow-md hover:shadow-lg">
                                    <i className="fas fa-leaf text-gold-400"></i>
                                    About MPFSDC
                                </Link>
                                <Link to="/auctions" className="inline-flex items-center gap-2.5 bg-white text-olive-800 border-2 border-beige-300 px-6 py-3.5 rounded-lg font-bold hover:border-olive-400 hover:bg-beige-50 transition-all">
                                    <i className="fas fa-gavel text-olive-600"></i>
                                    E-Auction Portal
                                </Link>
                            </div>

                            {/* Key stats row */}
                            <div className="flex items-center gap-6 pt-8 border-t border-beige-200">
                                <div>
                                    <div className="text-2xl font-extrabold text-olive-900">11</div>
                                    <div className="text-xs text-olive-500 font-semibold uppercase tracking-wide mt-0.5">Project Divisions</div>
                                </div>
                                <div className="w-px h-10 bg-beige-300"></div>
                                <div>
                                    <div className="text-2xl font-extrabold text-olive-900">732</div>
                                    <div className="text-xs text-olive-500 font-semibold uppercase tracking-wide mt-0.5">JFM Samitis</div>
                                </div>
                                <div className="w-px h-10 bg-beige-300"></div>
                                <div>
                                    <div className="text-2xl font-extrabold text-olive-900">50+</div>
                                    <div className="text-xs text-olive-500 font-semibold uppercase tracking-wide mt-0.5">Years of Service</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT: Image ── */}
                    <div className="lg:w-[52%] relative min-h-[50vw] lg:min-h-full overflow-hidden">
                        <img
                            src="/hero-forest.png"
                            alt="Madhya Pradesh forest landscape"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* Modern overlay fades */}
                        <div className="absolute inset-0 bg-gradient-to-r from-beige-50/70 via-beige-50/10 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-olive-900/40 via-transparent to-transparent" />

                        {/* Framed image look */}
                        <div className="absolute inset-4 md:inset-8 rounded-3xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.12)] pointer-events-none" />

                        {/* Floating badge */}

                        {/* <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-beige-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-olive-100 rounded-full flex items-center justify-center">
                                    <i className="fas fa-certificate text-olive-600"></i>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-olive-900">FSC Certified</div>
                                    <div className="text-[10px] text-olive-500">Sustainable Forestry</div>
                                </div>
                            </div>
                        </div> */}
                    </div>

                </div>
            </section>

            {/* Quick Links / Information Portal */}
            <section className="bg-beige-50 py-10 px-4 border-b border-beige-200">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            { name: 'About Us', icon: 'fa-info-circle', to: '/about#about-us' },
                            { name: 'Organisation Chart', icon: 'fa-sitemap', to: '/about#organisation-chart' },
                            { name: 'Board of Directors', icon: 'fa-users', to: '/about#board-of-directors' },
                            { name: 'Management Plan', icon: 'fa-book', to: '/downloads#management-plan' },
                            { name: 'Plantation', icon: 'fa-tree', to: '/forestry-activities#plantation' },
                            { name: 'Nurseries', icon: 'fa-seedling', to: '/forestry-activities#nursery' },
                            { name: 'Monthly Auction', icon: 'fa-calendar-alt', to: '/auctions' },
                            { name: 'Terms & Conditions', icon: 'fa-file-contract', to: '/tenders' },
                        ].map((item) => (
                            <Link
                                to={item.to}
                                key={item.name}
                                className="bg-white border border-beige-300 rounded-md px-4 py-2 text-sm font-semibold text-olive-800 hover:bg-olive-50 hover:border-olive-400 transition-colors flex items-center gap-2"
                            >
                                <i className={`fas ${item.icon} text-olive-500`}></i> {item.name}
                            </Link>
                        ))}

                    </div>
                </div>
            </section>

            {/* Elaborate Partner With Us Section */}
            <section className="bg-beige-50 py-20 px-4 border-b border-beige-200 border-t border-t-beige-200">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-olive-900 mb-4">Partner With Us for a Sustainable Future</h2>
                        <p className="text-lg text-olive-700 max-w-3xl mx-auto">
                            We welcome partnerships with government agencies, NGOs, and private organizations for collaborative forest conservation, eco-restoration, and community development projects.
                        </p>
                    </div>

                    {/* Partnership Highlights */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-beige-200 text-center group hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 mx-auto bg-beige-100 text-olive-600 rounded-full flex items-center justify-center text-2xl mb-6 group-hover:bg-olive-600 group-hover:text-beige-100 transition-colors">
                                <i className="fas fa-handshake"></i>
                            </div>
                            <h3 className="text-xl font-bold text-olive-800 mb-3">Deposit Works</h3>
                            <p className="text-olive-600 text-sm">Execute large-scale plantations on behalf of external agencies to meet afforestation goals.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-beige-200 text-center group hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 mx-auto bg-beige-100 text-olive-600 rounded-full flex items-center justify-center text-2xl mb-6 group-hover:bg-olive-600 group-hover:text-beige-100 transition-colors">
                                <i className="fas fa-leaf"></i>
                            </div>
                            <h3 className="text-xl font-bold text-olive-800 mb-3">CSR Initiatives</h3>
                            <p className="text-olive-600 text-sm">Collaborate on impactful CSR projects focusing on environmental sustainability and carbon offset.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-beige-200 text-center group hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 mx-auto bg-beige-100 text-olive-600 rounded-full flex items-center justify-center text-2xl mb-6 group-hover:bg-olive-600 group-hover:text-beige-100 transition-colors">
                                <i className="fas fa-mountain"></i>
                            </div>
                            <h3 className="text-xl font-bold text-olive-800 mb-3">Eco Restoration</h3>
                            <p className="text-olive-600 text-sm">Partner for scientific reclamation of degraded lands and mined-out areas into green forests.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* News & Employee Corner Section */}
            <section className="bg-beige-100 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">

                        {/* Left Column: Tabs (What's New, Careers, Tenders) */}
                        <div className="bg-white rounded-lg shadow-sm border border-beige-300 overflow-hidden flex flex-col">
                            {/* Tab Headers */}
                            <div className="flex border-b border-beige-300 bg-olive-800">
                                <button
                                    onClick={() => setActiveTab('whatsNew')}
                                    className={`flex-1 py-4 text-sm font-bold tracking-wider transition-colors ${activeTab === 'whatsNew' ? 'bg-white text-olive-900 border-t-4 border-t-gold-500' : 'text-beige-200 hover:bg-olive-700 hover:text-white border-t-4 border-t-transparent'}`}
                                >
                                    WHATS NEW
                                </button>
                                <button
                                    onClick={() => setActiveTab('careers')}
                                    className={`flex-1 py-4 text-sm font-bold tracking-wider transition-colors border-l border-olive-700/50 ${activeTab === 'careers' ? 'bg-white text-olive-900 border-t-4 border-t-gold-500' : 'text-beige-200 hover:bg-olive-700 hover:text-white border-t-4 border-t-transparent'}`}
                                >
                                    CAREERS
                                </button>
                                <button
                                    onClick={() => setActiveTab('tenders')}
                                    className={`flex-1 py-4 text-sm font-bold tracking-wider transition-colors border-l border-olive-700/50 ${activeTab === 'tenders' ? 'bg-white text-olive-900 border-t-4 border-t-gold-500' : 'text-beige-200 hover:bg-olive-700 hover:text-white border-t-4 border-t-transparent'}`}
                                >
                                    TENDERS
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className="p-2 bg-white flex-1">
                                <h3 className="text-xl font-bold text-olive-900 p-4 border-b border-beige-100">
                                    {activeTab === 'whatsNew' && "WHAT'S NEW"}
                                    {activeTab === 'careers' && "CAREERS"}
                                    {activeTab === 'tenders' && "TENDERS"}
                                </h3>
                                <div className="h-[300px] overflow-y-auto px-4 py-2 custom-scrollbar">
                                    <ul className="space-y-0">
                                        {newsData[activeTab].map((item, index) => (
                                            <li key={index} className="py-4 border-b border-beige-100 last:border-0 flex items-start gap-3 group">
                                                <i className="fas fa-arrow-right text-olive-500 mt-1 flex-shrink-0 group-hover:text-gold-500 transition-colors"></i>
                                                <p className="text-sm text-olive-800 leading-relaxed font-medium group-hover:text-olive-600 transition-colors cursor-pointer">
                                                    {item}
                                                    {index < 3 && <span className="inline-block ml-2 px-1.5 py-0.5 text-[10px] font-bold text-white bg-red-500 rounded animate-pulse">NEW</span>}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Employee Corner */}
                        <div className="bg-white rounded-lg shadow-sm border border-beige-300 overflow-hidden flex flex-col">
                            {/* Header */}
                            <div className="bg-olive-800 py-4 px-6 border-b border-beige-300 border-t-4 border-t-olive-800">
                                <h2 className="text-center text-sm font-bold tracking-wider text-white uppercase">
                                    Employee Corner
                                </h2>
                            </div>

                            {/* Content */}
                            <div className="p-2 bg-white flex-1">
                                <div className="h-[355px] overflow-y-auto px-4 py-2 custom-scrollbar">
                                    <ul className="space-y-0">
                                        {employeeData.map((item, index) => (
                                            <li key={index} className="py-4 border-b border-beige-100 last:border-0 flex items-start gap-3 group">
                                                <i className="fas fa-arrow-right text-olive-500 mt-1 flex-shrink-0 group-hover:text-gold-500 transition-colors"></i>
                                                <p className="text-sm text-olive-800 leading-relaxed font-medium group-hover:text-olive-600 transition-colors cursor-pointer">
                                                    {item}
                                                    {index < 2 && <span className="inline-block ml-2 px-1.5 py-0.5 text-[10px] font-bold text-white bg-red-500 rounded animate-pulse">NEW</span>}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Our Partners / Associate Organizations Section */}
            <section className="bg-olive-800 py-16 px-4 border-t-4 border-gold-500">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-center text-2xl font-bold text-beige-50 mb-10 tracking-widest uppercase border-b border-olive-700 pb-4 max-w-sm mx-auto">
                        Our Partners
                    </h2>

                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                        {/* Card 1 */}
                        <div className="bg-white w-64 h-32 rounded-lg flex flex-col items-center justify-center p-4 shadow-lg border-2 border-transparent hover:border-gold-400 transition-all group">
                            <div className="text-4xl text-olive-600 mb-2 group-hover:scale-110 transition-transform"><i className="fas fa-bolt"></i></div>
                            <span className="font-bold text-olive-900 text-sm text-center">NTPC Limited</span>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white w-64 h-32 rounded-lg flex flex-col items-center justify-center p-4 shadow-lg border-2 border-transparent hover:border-gold-400 transition-all group">
                            <div className="text-4xl text-olive-600 mb-2 group-hover:scale-110 transition-transform"><i className="fas fa-hard-hat"></i></div>
                            <span className="font-bold text-olive-900 text-sm text-center">Northern Coalfields</span>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white w-64 h-32 rounded-lg flex flex-col items-center justify-center p-4 shadow-lg border-2 border-transparent hover:border-gold-400 transition-all group">
                            <div className="text-4xl text-olive-600 mb-2 group-hover:scale-110 transition-transform"><i className="fas fa-industry"></i></div>
                            <span className="font-bold text-olive-900 text-sm text-center">Western Coalfields</span>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white w-64 h-32 rounded-lg flex flex-col items-center justify-center p-4 shadow-lg border-2 border-transparent hover:border-gold-400 transition-all group">
                            <div className="text-4xl text-olive-600 mb-2 group-hover:scale-110 transition-transform"><i className="fas fa-lightbulb"></i></div>
                            <span className="font-bold text-olive-900 text-sm text-center">Havells India</span>
                        </div>

                        {/* Card 5 */}
                        <div className="bg-white w-64 h-32 rounded-lg flex flex-col items-center justify-center p-4 shadow-lg border-2 border-transparent hover:border-gold-400 transition-all group">
                            <div className="text-4xl text-olive-600 mb-2 group-hover:scale-110 transition-transform"><i className="fas fa-paw"></i></div>
                            <span className="font-bold text-olive-900 text-sm text-center">State Wildlife Board</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dedicated CTA Section */}
            <section className="bg-beige-100 py-20 px-4 text-center border-y border-beige-200">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-olive-900 mb-6">Partner With Us</h2>
                    <p className="text-lg md:text-xl text-olive-700 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Build long-term ecological and socio-economic value through deposit works, eco-restoration, and CSR-linked plantation programs.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-beige-50 bg-olive-700 hover:bg-olive-800 rounded-lg shadow-md transition-all hover:shadow-lg w-full sm:w-auto gap-2 border-2 border-olive-700">
                            <i className="fas fa-envelope"></i> Contact Us
                        </Link>
                        <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-olive-900 bg-gold-400 hover:bg-gold-300 rounded-lg shadow-md transition-all hover:shadow-lg w-full sm:w-auto gap-2 border-2 border-gold-400">
                            <i className="fas fa-handshake"></i> Partner With Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* How MPFSDC works (factual, non-numeric) */}
            <section className="bg-white py-16 px-4 border-b border-beige-200">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-olive-900">How we deliver</h2>
                            <p className="mt-3 text-lg text-stone-600 leading-relaxed">
                                Forest development programs typically follow a sequence: planning, nursery preparation, field execution, protection & monitoring, and documentation. This page explains that common flow in a simple way.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-beige-200 bg-beige-50 px-6 py-4">
                            <div className="text-sm font-bold text-olive-900">What you can expect</div>
                            <div className="mt-2 text-sm text-olive-700">
                                Clear scopes, protection-focused delivery, and outcome reporting through official records.
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            {
                                title: '1) Planning',
                                body: 'Site selection, species planning, and operational scheduling for the required forestry activity.'
                            },
                            {
                                title: '2) Nursery & Inputs',
                                body: 'Propagation and preparation of planting material along with the required inputs and logistics.'
                            },
                            {
                                title: '3) Field Execution',
                                body: 'Plantation, protection infrastructure, and on-ground implementation as per the approved plan.'
                            },
                            {
                                title: '4) Protection & Monitoring',
                                body: 'Surveillance, maintenance, and post-planting monitoring to ensure survival and health.'
                            }
                        ].map((item) => (
                            <article key={item.title} className="rounded-2xl border border-beige-200 bg-white p-6 shadow-sm">
                                <div className="text-olive-900 font-extrabold text-lg">{item.title}</div>
                                <p className="mt-3 text-sm text-stone-600 leading-relaxed">{item.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-beige-50 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-olive-900">Frequently asked</h2>
                        <p className="mt-3 text-lg text-stone-600">Quick answers to common questions from visitors and stakeholders.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                q: 'How can I find tenders and e-auction updates?',
                                a: 'Use the E-Services entry point and open the E-Auctions or Tenders & Notices pages, then follow the posted instructions for each notice.'
                            },
                            {
                                q: 'Where can I download official documents?',
                                a: 'Visit the Document Center (Downloads page) and open the relevant category for reports, guidelines, and other published materials.'
                            },
                            {
                                q: 'What is a deposit work?',
                                a: 'In many public procurement and forestry contexts, deposit works refer to implementation of activities on behalf of an external agency under an agreed scope and process.'
                            },
                            {
                                q: 'How do partnerships work?',
                                a: 'Partnerships are typically initiated through contact/queries, followed by scoping discussions, and then execution aligned to the agreed objectives and documentation requirements.'
                            }
                        ].map((item) => (
                            <article key={item.q} className="rounded-2xl border border-beige-200 bg-white p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-olive-900">{item.q}</h3>
                                <p className="mt-3 text-sm text-stone-600 leading-relaxed">{item.a}</p>
                            </article>
                        ))}
                    </div>

                    {/* Simple internal navigation */}
                    <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-3">
                        <Link to="/e-services" className="rounded-lg bg-olive-900 text-beige-50 px-6 py-3 text-sm font-bold hover:bg-olive-800 transition-colors">
                            Explore E-Services
                        </Link>
                        <Link to="/downloads" className="rounded-lg border border-olive-900/20 bg-white px-6 py-3 text-sm font-bold text-olive-900 hover:border-olive-900 hover:bg-beige-50 transition-colors">
                            Open Document Center
                        </Link>
                        <Link to="/contact" className="rounded-lg border border-olive-900/20 bg-white px-6 py-3 text-sm font-bold text-olive-900 hover:border-olive-900 hover:bg-beige-50 transition-colors">
                            Contact MPRVVN
                        </Link>
                    </div>
                </div>
            </section>

        </PageShell>
    );
};


export default Home;
