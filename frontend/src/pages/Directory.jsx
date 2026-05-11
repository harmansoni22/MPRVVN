import PageShell from '../components/PageShell';
import { Link } from 'react-router-dom';

const Directory = () => {
    return (
        <PageShell>
            {/* Header Section */}
            <section className="bg-olive-900 text-beige-50 py-16 md:py-24 border-b-4 border-gold-500">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="mb-4">
                        <Link to="/contact" className="text-gold-400 hover:text-gold-300 font-semibold text-sm flex items-center gap-2 transition-colors inline-flex">
                            <i className="fas fa-arrow-left"></i> Back to Contact
                        </Link>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gold-300">Directory of Officers</h1>
                    <p className="text-lg md:text-xl text-beige-200 max-w-3xl leading-relaxed">
                        Complete contact information for all Head Office and Regional division management of the MP State Forest Development Corporation.
                    </p>
                </div>
            </section>

            <div className="bg-white py-16 px-4">
                <div className="container mx-auto max-w-7xl">
                    <div className="overflow-x-auto rounded-xl border border-beige-200 shadow-sm">
                        <table className="w-full text-left text-sm text-olive-800">
                            <thead className="bg-olive-800 text-beige-50 font-bold uppercase tracking-wider text-xs">
                                <tr>
                                    <th className="px-6 py-4">Name of Office</th>
                                    <th className="px-6 py-4">Name and Designation</th>
                                    <th className="px-6 py-4">Postal Address</th>
                                    <th className="px-6 py-4">Telephone No.</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-beige-100 font-medium">
                                {/* HEAD OFFICE */}
                                <tr className="bg-beige-100">
                                    <td colSpan="4" className="px-6 py-3 font-bold text-olive-900 uppercase">Head Office, Bhopal</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors">
                                    <td className="px-6 py-4">Head Office, Bhopal</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Shri H.U. Khan, IFS</span><br/>Managing Director</td>
                                    <td className="px-6 py-4">Van Bhawan, Block-C, 1st Floor, Link Road No.-2, Tulsi Nagar, Bhopal-462003</td>
                                    <td className="px-6 py-4 whitespace-nowrap">0755-2674204</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors">
                                    <td className="px-6 py-4">Head Office, Bhopal</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Additional Managing Director</span></td>
                                    <td className="px-6 py-4">Van Bhawan, Block-C, 1st Floor, Link Road No.-2, Tulsi Nagar, Bhopal-462003</td>
                                    <td className="px-6 py-4 whitespace-nowrap">0755-2524249</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors">
                                    <td className="px-6 py-4">Head Office, Bhopal</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Shri Anil Kumar Shukla, IFS</span><br/>Executive Director (Administration, Coordination, Marketing, PF)</td>
                                    <td className="px-6 py-4">Van Bhawan, Block-C, 1st Floor, Link Road No.-2, Tulsi Nagar, Bhopal-462003</td>
                                    <td className="px-6 py-4 whitespace-nowrap">-</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors">
                                    <td className="px-6 py-4">Head Office, Bhopal</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Shri Sanjay Kumar Jain, SFS</span><br/>Dy. General Manager (Finance & Budget, Marketing, Coordination, PF)</td>
                                    <td className="px-6 py-4">Van Bhawan, Block-C, 1st Floor, Link Road No.-2, Tulsi Nagar, Bhopal-462003</td>
                                    <td className="px-6 py-4 whitespace-nowrap">-</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors">
                                    <td className="px-6 py-4">Head Office, Bhopal</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Shri Samir Mathur</span><br/>Company Secretary and General Manager (Finance & Budget)</td>
                                    <td className="px-6 py-4">Van Bhawan, Block-C, 1st Floor, Link Road No.-2, Tulsi Nagar, Bhopal-462003</td>
                                    <td className="px-6 py-4 whitespace-nowrap">0755-2524251</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors">
                                    <td className="px-6 py-4">Head Office, Bhopal</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Shri Brajesh Saxena</span><br/>Staff Officer to MD</td>
                                    <td className="px-6 py-4">Van Bhawan, Block-C, 1st Floor, Link Road No.-2, Tulsi Nagar, Bhopal-462003</td>
                                    <td className="px-6 py-4 whitespace-nowrap">0755-2764204</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors border-b-2 border-olive-200">
                                    <td className="px-6 py-4">Head Office, Bhopal</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Shri Umesh Kumar Prajapati</span><br/>Sr. Data Entry Operator and CISO</td>
                                    <td className="px-6 py-4">Van Bhawan, Block-C, 1st Floor, Link Road No.-2, Tulsi Nagar, Bhopal-462003</td>
                                    <td className="px-6 py-4 whitespace-nowrap">-</td>
                                </tr>

                                {/* REGIONAL BHOPAL */}
                                <tr className="bg-beige-100">
                                    <td colSpan="4" className="px-6 py-3 font-bold text-olive-900 uppercase">Regional Chief General Manager, Bhopal</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors">
                                    <td className="px-6 py-4">Regional General Manager, Bhopal</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Shri Praful Neeraj Gulabrao Phuljhele, IFS</span><br/>Regional Chief General Manager</td>
                                    <td className="px-6 py-4">O/o Regional Chief General Manager, Vanita Nursery Parisar, Near Jawahar Bal Bhawan, Bhopal</td>
                                    <td className="px-6 py-4 whitespace-nowrap">0755-2674298</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors">
                                    <td className="px-6 py-4">Divisional Manager, Vidisha-Raisen</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Shri Tarun Kaurav</span><br/>Divisional Manager</td>
                                    <td className="px-6 py-4">O/o Divisional Manager, Vidisha-Raisen Project Division, 74 Bunglow, Khel Parisar, IInd Floor, Bhopal</td>
                                    <td className="px-6 py-4 whitespace-nowrap">0755-2802307</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors">
                                    <td className="px-6 py-4">Divisional Manager, Chhindwara</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Smt. S. Deepika, IFS</span><br/>Divisional Manager</td>
                                    <td className="px-6 py-4">O/o Divisional Manager, 4, Adarsh Nagar, Parasiya Road, Chhindwara 480001</td>
                                    <td className="px-6 py-4 whitespace-nowrap">07162-292787</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors">
                                    <td className="px-6 py-4">Divisional Manager, Khandwa</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Shri Ram Kumar Awadhiya</span><br/>Divisional Manager</td>
                                    <td className="px-6 py-4">O/o Divisional Manager, Khandwa Project Division, 35, Keshav Kunj, Siddhipuram, Bhandaria Road, Khandwa (M.P.) - 450 001</td>
                                    <td className="px-6 py-4 whitespace-nowrap">0733-2225025</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors">
                                    <td className="px-6 py-4">Divisional Manager, Rampur Bhatodi</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Shri Sheetal Prasad Shakya, IFS</span><br/>Divisional Manager</td>
                                    <td className="px-6 py-4">O/o Divisional Manager, Rampur Bhatodi Project Division, Sadar Bazar Itarsi Road, Betul (M.P) 460001</td>
                                    <td className="px-6 py-4 whitespace-nowrap">07141-238417</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors border-b-2 border-olive-200">
                                    <td className="px-6 py-4">Divisional Manager, Sehore</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Shri Tarun Kaurav</span><br/>Divisional Manager</td>
                                    <td className="px-6 py-4">O/o Divisional Manager, Sehore Project Division, Jungly Ahata, Indore Naka, Sehore 466001</td>
                                    <td className="px-6 py-4 whitespace-nowrap">07562-226345</td>
                                </tr>

                                {/* REGIONAL JABALPUR */}
                                <tr className="bg-beige-100">
                                    <td colSpan="4" className="px-6 py-3 font-bold text-olive-900 uppercase">Regional Chief General Manager, Jabalpur</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors">
                                    <td className="px-6 py-4">Regional General Manager, Jabalpur</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Shri Brajendra Jha, IFS</span><br/>Regional Chief General Manager</td>
                                    <td className="px-6 py-4">O/o Regional Chief General Manager, 451, Sanjeevni Nagar, (Gadha) Jabalpur (M.P) 482001</td>
                                    <td className="px-6 py-4 whitespace-nowrap">0761-4017345</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors">
                                    <td className="px-6 py-4">Divisional Manager, Kundam</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Shri Mohit Sud, IFS</span><br/>Divisional Manager</td>
                                    <td className="px-6 py-4">O/o Divisional Manager, Kundam Project Division, 451, Sanjeevni Nagar, (Gadha) Jabalpur (M.P)</td>
                                    <td className="px-6 py-4 whitespace-nowrap">0761-2420362</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors">
                                    <td className="px-6 py-4">Divisional Manager, Rewa-Sidhi</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Shri Rakesh Kodape, IFS</span><br/>Divisional Manager</td>
                                    <td className="px-6 py-4">O/o Divisional Manager, Rewa-Sidhi Project Division, Van Mandal Campus, Kotwali Road, Sidhi (M.P) 486661</td>
                                    <td className="px-6 py-4 whitespace-nowrap">07822-796058</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors">
                                    <td className="px-6 py-4">Divisional Manager, Mohgaon</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Shri Amit Patodi, IFS</span><br/>Divisional Manager</td>
                                    <td className="px-6 py-4">O/o Divisional Manager, Mohgaon Project Division, Opp. to South Mandla Forest Dn., Civil Lines, Mandla (M.P)</td>
                                    <td className="px-6 py-4 whitespace-nowrap">07642-251287</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors">
                                    <td className="px-6 py-4">Divisional Manager, Barghat</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Shri Ramkishan Solanki, IFS</span><br/>Divisional Manager</td>
                                    <td className="px-6 py-4">O/o Divisional Manager, Barghat Project Division, Nagpur Jabalpur Road, Near Jyrat Naka, Seoni (M.P) 480661</td>
                                    <td className="px-6 py-4 whitespace-nowrap">07692-220240</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors">
                                    <td className="px-6 py-4">Divisional Manager, Lamta</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Shri Ramkishan Solanki, IFS</span><br/>Divisional Manager</td>
                                    <td className="px-6 py-4">O/o Divisional Manager, Lamta Project Division, Supdt. Engineer, In Front of Banganga Circuit Office, Balaghat (M.P)</td>
                                    <td className="px-6 py-4 whitespace-nowrap">07632-240772</td>
                                </tr>
                                <tr className="hover:bg-beige-50 transition-colors">
                                    <td className="px-6 py-4">Divisional Manager, Umaria</td>
                                    <td className="px-6 py-4"><span className="font-bold text-olive-900">Shri Amit Patodi, IFS</span><br/>Divisional Manager</td>
                                    <td className="px-6 py-4">O/o Divisional Manager, Umaria Project Division, P.O. Umaria, District Umaria (M.P) 484661</td>
                                    <td className="px-6 py-4 whitespace-nowrap">07653-222218</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </PageShell>
    );
};

export default Directory;
