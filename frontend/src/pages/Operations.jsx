import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

const Operations = () => {
    return (
        <PageShell>
            <section className="bg-olive-900 text-beige-50 py-16 md:py-24 border-b-4 border-gold-500">

                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-[0.2em] text-olive-900 bg-gold-400 rounded-full">WELCOME</span>
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gold-300">Operations</h1>
                            <p className="text-lg md:text-xl text-beige-200 max-w-xl leading-relaxed">
                                Explore the core operational pillars that drive ecology + revenue: field forestry activities, turnkey plantation execution, and consultancy & services.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link to="/forestry-activities" className="rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 px-5 py-3 text-sm font-bold text-beige-50 transition-colors">
                                    Forestry Activities
                                </Link>
                                <Link to="/turnkey-projects" className="rounded-lg border border-gold-400/40 bg-gold-400/10 hover:bg-gold-400/15 px-5 py-3 text-sm font-bold text-gold-200 transition-colors">
                                    Turnkey Projects
                                </Link>
                            </div>
                        </div>

                        {/* <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-gold-500/25 to-emerald-500/20 blur-2xl rounded-3xl" />
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                <img
                                    src="/hero-forest.png"
                                    alt="Forest operations"
                                    className="w-full h-72 md:h-96 object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-olive-900/20" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="bg-white/10 backdrop-blur rounded-2xl border border-white/15 p-4">
                                        <div className="flex items-center gap-3">
                                            <i className="fas fa-leaf text-gold-300 text-lg" />
                                            <p className="text-sm text-beige-50 font-semibold">
                                                Ecology + revenue execution, phase-wise.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>

            <section className="bg-beige-50 py-8 px-4 border-b border-beige-200">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-6">
                        <article className="bg-white border border-beige-200 rounded-2xl shadow-sm p-6">
                            <div className="w-12 h-12 rounded-xl bg-olive-100 flex items-center justify-center text-olive-700">
                                <i className="fas fa-tree text-2xl" />
                            </div>
                            <h2 className="mt-4 text-xl font-bold text-olive-900">Forestry Activities</h2>
                            <p className="mt-2 text-sm text-stone-600">
                                Nursery, plantation, forest protection, depo management, wildlife conservation and community engagement.
                            </p>
                            <Link to="/forestry-activities" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                                View operations <i className="fas fa-arrow-right" />
                            </Link>
                        </article>

                        <article className="bg-white border border-beige-200 rounded-2xl shadow-sm p-6">
                            <div className="w-12 h-12 rounded-xl bg-olive-100 flex items-center justify-center text-olive-700">
                                <i className="fas fa-plant-wilt text-2xl" />
                            </div>
                            <h2 className="mt-4 text-xl font-bold text-olive-900">Turnkey Projects</h2>
                            <p className="mt-2 text-sm text-stone-600">
                                Eco-restoration and plantation solutions executed end-to-end with measurable outcomes.
                            </p>
                            <Link to="/turnkey-projects" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                                Explore turnkey <i className="fas fa-arrow-right" />
                            </Link>
                        </article>

                        <article className="bg-white border border-beige-200 rounded-2xl shadow-sm p-6">
                            <div className="w-12 h-12 rounded-xl bg-olive-100 flex items-center justify-center text-olive-700">
                                <i className="fas fa-cogs text-2xl" />
                            </div>
                            <h2 className="mt-4 text-xl font-bold text-olive-900">Consultancy & Services</h2>
                            <p className="mt-2 text-sm text-stone-600">
                                Advisory and implementation support aligned to scientific forestry and execution needs.
                            </p>
                            <Link to="/services" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                                View services <i className="fas fa-arrow-right" />
                            </Link>
                        </article>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-12">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-7">
                    <h3 className="text-2xl font-bold text-emerald-900">Execution principles</h3>
                    <p className="mt-2 text-sm text-emerald-950/90 leading-relaxed">
                        Forestry programs are typically executed with documented planning, on-ground implementation, protection and monitoring, and administrative closure.
                        This section expands those principles in a way that is easy to scan.
                    </p>
                    <ul className="mt-4 grid gap-4 md:grid-cols-2">

                        {[
                            {
                                title: 'Scientific planning',
                                body: 'Phase-wise and site-specific treatment planning aligned with working plans.'
                            },
                            {
                                title: 'Ecology + revenue',
                                body: 'High input methods paired with protection, survival monitoring, and value-chain readiness.'
                            },
                            {
                                title: 'Protection-led delivery',
                                body: 'Fencing, surveillance, community participation and wildlife corridor sensitivity.'
                            },
                            {
                                title: 'Transparent operations',
                                body: 'Clear procedures for depo/lot management, inspection workflows, and public updates.'
                            }
                        ].map((item) => (
                            <li key={item.title} className="bg-white border border-beige-200 rounded-xl p-5 shadow-sm">
                                <div className="font-bold text-emerald-900">{item.title}</div>
                                <div className="mt-2 text-sm text-stone-700 leading-relaxed">{item.body}</div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-3">
                    <Link to="/tenders" className="rounded-lg bg-olive-900 px-5 py-3 text-center text-sm font-bold text-beige-50 hover:bg-olive-800 transition-colors">
                        View tender notices
                    </Link>
                    <Link to="/auctions" className="rounded-lg border border-olive-900/20 bg-white px-5 py-3 text-center text-sm font-bold text-olive-900 hover:border-olive-900 hover:bg-beige-50 transition-colors">
                        View e-auction portal
                    </Link>
                </div>

                <div className="mt-12 rounded-2xl border border-beige-200 bg-white p-7">
                    <h3 className="text-2xl font-bold text-emerald-900">Frequently asked</h3>
                    <div className="mt-4 grid md:grid-cols-2 gap-6">
                        {[
                            {
                                q: 'What does “execution” include?',
                                a: 'In forestry operations, execution typically includes field works, protection arrangements, and documentation/closure activities that support accountability.'
                            },
                            {
                                q: 'How do stakeholders get updates?',
                                a: 'Updates are generally published through official sections such as tenders/notices, auction portals, and downloadable documents in the Document Center.'
                            },
                            {
                                q: 'Where do services fit in?',
                                a: 'Consultancy and services provide technical support—such as planning assistance, monitoring frameworks, and advisory—so works can be implemented effectively.'
                            },
                            {
                                q: 'How are projects connected to e-services?',
                                a: 'Active opportunities and public notices are shared through the e-services entry points, which help users quickly find what is currently available.'
                            }
                        ].map((item) => (
                            <article key={item.q} className="rounded-xl border border-beige-200 bg-beige-50 p-5 shadow-sm">
                                <h4 className="font-bold text-emerald-900">{item.q}</h4>
                                <p className="mt-2 text-sm text-stone-700 leading-relaxed">{item.a}</p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <Link to="/e-services" className="rounded-lg bg-emerald-700 px-5 py-3 text-center text-sm font-bold text-white hover:bg-emerald-800 transition-colors">
                            Go to E-Services
                        </Link>
                        <Link to="/downloads" className="rounded-lg border border-emerald-700/20 bg-white px-5 py-3 text-center text-sm font-bold text-emerald-900 hover:border-emerald-700 hover:bg-emerald-50 transition-colors">
                            View Documents
                        </Link>
                    </div>
                </div>
            </section>
        </PageShell>
    );
};


export default Operations;

