import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

const EServices = () => {
    return (
        <PageShell>
            <section className="bg-olive-900 text-beige-50 py-16 md:py-24 border-b-4 border-gold-500">

                <div className="container mx-auto px-4 max-w-6xl">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-[0.2em] text-olive-900 bg-gold-400 rounded-full">E-SERVICES</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gold-300">Digital access to tenders & auctions</h1>
                    <p className="text-lg md:text-xl text-beige-200 max-w-3xl leading-relaxed">
                        Use this portal to find tender notices and e-auction updates. Download rules and related documents from the Document Center.
                    </p>
                </div>
            </section>

            <section className="bg-beige-50 py-8 px-4 border-b border-beige-200">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-6">
                        <article className="bg-white border border-beige-200 rounded-2xl shadow-sm p-6">
                            <div className="w-12 h-12 rounded-xl bg-olive-100 flex items-center justify-center text-olive-700">
                                <i className="fas fa-gavel text-2xl" />
                            </div>
                            <h2 className="mt-4 text-xl font-bold text-olive-900">E-Auctions</h2>
                            <p className="mt-2 text-sm text-stone-600">
                                Auction cycles and process overview for bidders and stakeholders.
                            </p>
                            <Link to="/auctions" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                                Open auctions <i className="fas fa-arrow-right" />
                            </Link>
                        </article>

                        <article className="bg-white border border-beige-200 rounded-2xl shadow-sm p-6">
                            <div className="w-12 h-12 rounded-xl bg-olive-100 flex items-center justify-center text-olive-700">
                                <i className="fas fa-file-alt text-2xl" />
                            </div>
                            <h2 className="mt-4 text-xl font-bold text-olive-900">Tenders & Notices</h2>
                            <p className="mt-2 text-sm text-stone-600">
                                Tender presentation style with category clarity and procedural progression.
                            </p>
                            <Link to="/tenders" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                                View tenders <i className="fas fa-arrow-right" />
                            </Link>
                        </article>

                        <article className="bg-white border border-beige-200 rounded-2xl shadow-sm p-6">
                            <div className="w-12 h-12 rounded-xl bg-olive-100 flex items-center justify-center text-olive-700">
                                <i className="fas fa-download text-2xl" />
                            </div>
                            <h2 className="mt-4 text-xl font-bold text-olive-900">Document Center</h2>
                            <p className="mt-2 text-sm text-stone-600">
                                Download acts, rules, guidelines, publications and annual records.
                            </p>
                            <Link to="/downloads" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                                Browse documents <i className="fas fa-arrow-right" />
                            </Link>
                        </article>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-12">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-7">
                    <h3 className="text-2xl font-bold text-emerald-900">How to use</h3>
                    {/* Note: Added content is generic and does not claim any organization-specific numbers. */}

                    <ol className="mt-4 space-y-3">
                        {[
                            {
                                title: 'Select your service',
                                body: 'Start from this landing page: E-Auctions or Tenders & Notices.'
                            },
                            {
                                title: 'Follow the process steps',
                                body: 'Each section follows a public-sector pattern: timelines, eligibility, and clear next actions.'
                            },
                            {
                                title: 'Download supporting documents',
                                body: 'Use the Document Center to access guidelines, circulars, and acts/rules.'
                            },
                        ].map((item, idx) => (
                            <li key={item.title} className="bg-white border border-beige-200 rounded-xl p-5 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <div className="font-bold text-emerald-900">{item.title}</div>
                                        <div className="mt-1 text-sm text-stone-700 leading-relaxed">{item.body}</div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-3">
                    <Link to="/contact" className="rounded-lg bg-olive-900 px-5 py-3 text-center text-sm font-bold text-beige-50 hover:bg-olive-800 transition-colors">
                        Grievance / Contact
                    </Link>
                    <Link to="/directory" className="rounded-lg border border-olive-900/20 bg-white px-5 py-3 text-center text-sm font-bold text-olive-900 hover:border-olive-900 hover:bg-beige-50 transition-colors">
                        Officers directory
                    </Link>
                </div>
            </section>
        </PageShell>
    );
};

export default EServices;

