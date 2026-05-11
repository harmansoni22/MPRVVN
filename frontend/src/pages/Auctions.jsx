import PageShell from '../components/PageShell';

const Auctions = () => {
    return (
        <PageShell>
            <section className="mx-auto max-w-6xl px-4 py-12">
                <h2 className="text-4xl font-extrabold text-emerald-900">Auctions</h2>
                <p className="mt-2 max-w-3xl text-stone-600">This section follows the public-sector pattern used by state forestry corporations: current auction notices, process clarity, and downloadable terms.</p>
            </section>
            <section className="mx-auto max-w-6xl px-4 pb-12">
                <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-emerald-800 text-white">
                            <tr>
                                <th className="px-4 py-3">Auction Window</th>
                                <th className="px-4 py-3">Material Group</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-stone-100"><td className="px-4 py-3">Current cycle</td><td className="px-4 py-3">Teak, bamboo, mixed lots</td><td className="px-4 py-3">Open updates</td></tr>
                            <tr className="border-t border-stone-100"><td className="px-4 py-3">Next cycle</td><td className="px-4 py-3">Division-wise notified lots</td><td className="px-4 py-3">Upcoming</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-12 md:grid-cols-2">
                <article className="rounded-xl border border-stone-200 bg-white p-5">
                    <h3 className="font-bold text-emerald-800">Auction Process</h3>
                    <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-stone-700">
                        <li>Bidder registration and document verification.</li>
                        <li>Lot publication with quantity and division details.</li>
                        <li>Inspection and bidding window operations.</li>
                        <li>Allotment, payment compliance, and material release.</li>
                    </ol>
                </article>
                <article className="rounded-xl border border-stone-200 bg-white p-5">
                    <h3 className="font-bold text-emerald-800">Auction Overview</h3>
                    <p className="mt-2 text-sm text-stone-700 leading-relaxed">
                        This page provides an at-a-glance overview of the e-auction cycle, including how auctions are typically organized into windows,
                        and what bidders should expect in the workflow (publication → inspection window → bid submission → compliance).
                    </p>

                    <div className="mt-4 bg-beige-50 border border-beige-200 rounded-xl p-4">
                        <h4 className="font-bold text-emerald-900">What you will find here</h4>
                        <ul className="mt-2 list-disc list-inside text-sm text-stone-700 space-y-1">
                            <li>Current auction window snapshot</li>
                            <li>Lot/material group categories</li>
                            <li>Step-by-step auction process for bidders</li>
                            <li>Practical checklists for readiness before bidding</li>
                        </ul>
                    </div>
                </article>
            </section>
        </PageShell>
    );
};

export default Auctions;
