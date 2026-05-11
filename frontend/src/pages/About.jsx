import PageShell from '../components/PageShell';

const About = () => {
    const objectives = [
        {
            title: 'Afforestation',
            desc: 'Promoting and executing large-scale afforestation projects to systematically increase the forest cover across Madhya Pradesh.',
            icon: 'fa-tree'
        },
        {
            title: 'Forest Development',
            desc: 'Undertaking systematic development and management of forest resources for sustainable economic and ecological benefits.',
            icon: 'fa-chart-line'
        },
        {
            title: 'Scientific Management',
            desc: 'Implementing updated technology and scientific approaches for the protection and better management of dense forest areas.',
            icon: 'fa-microscope'
        },
        {
            title: 'Conservation',
            desc: 'Focusing on the conservation of forests, forest produce, and wildlife, including initiatives to rehabilitate degraded land like mined-out areas.',
            icon: 'fa-leaf'
        },
        {
            title: 'Community Involvement',
            desc: 'Connecting local communities and forest dwellers with conservation activities, ensuring livelihood generation through Joint Forest Management.',
            icon: 'fa-users'
        }
    ];

    const boardMembers = [
        { name: 'Shri Sandeep Yadav, IAS', role: 'Chairman / Vice Chairman & ACS (Forest)', desc: 'Providing strategic leadership and governance oversight at the state level.' },
        { name: 'Shri H.U. Khan, IFS', role: 'Managing Director', desc: 'Overseeing daily operations and execution of statewide forestry projects.' },
        { name: 'Shri Shubhranjan Sen, IFS', role: 'Principal Chief Conservator of Forests & HoFF', desc: 'Technical and Ecological Advisor.' },
        { name: 'Shri Atul Mishra, IFS', role: 'Secretary (Forest)', desc: 'State Government Representative from Mantralaya.' }
    ];

    return (
        <PageShell>
            {/* Hero Section */}
            <section className="bg-olive-900 text-beige-50 py-16 md:py-24 border-b-4 border-gold-500">
                <div className="container mx-auto px-4 max-w-6xl">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-[0.2em] text-olive-900 bg-gold-400 rounded-full">ESTABLISHED JULY 24, 1975</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gold-300">Company Profile</h1>
                    <p className="text-lg md:text-xl text-beige-200 max-w-3xl leading-relaxed">
                        Madhya Pradesh Rajya Van Vikas Nigam Limited (MPRVVN) is a premier state government undertaking dedicated to the scientific management, conservation, and development of forest wealth in Madhya Pradesh.
                    </p>
                </div>
            </section>

            {/* Quick Links / Page Navigation */}
            <section className="bg-beige-50 py-6 px-4 border-b border-beige-200">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            { name: 'About Us', icon: 'fa-info-circle', link: '#about-us' },
                            { name: 'Company Objectives', icon: 'fa-bullseye', link: '#company-objectives' },
                            { name: 'Organisation Chart', icon: 'fa-sitemap', link: '#organisation-chart' },
                            { name: 'Board of Directors', icon: 'fa-users', link: '#board-of-directors' },
                        ].map((item) => (
                            <a href={item.link} key={item.name} className="bg-white border border-beige-300 rounded-md px-4 py-2 text-sm font-semibold text-olive-800 hover:bg-olive-50 hover:border-olive-400 transition-colors flex items-center gap-2 shadow-sm">
                                <i className={`fas ${item.icon} text-olive-500`}></i> {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <div className="bg-beige-50 py-12">
                <div className="container mx-auto px-4 max-w-5xl space-y-20">
                    
                    {/* About Us Section */}
                    <section id="about-us" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-8 border-b-2 border-gold-300 pb-2">
                            <h2 className="text-3xl font-bold text-olive-900">About Us</h2>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-beige-200 text-olive-800 leading-relaxed space-y-4">
                            <p>
                                <strong>Madhya Pradesh Rajya Van Vikas Nigam Limited (MPRVVN)</strong>, incorporated on July 24, 1975, is a fully-owned state government company operating under the Companies Act. Headquartered at Van Bhawan in Bhopal, the Nigam was established with the primary mandate to accelerate the pace of forestry development in the state.
                            </p>
                            <p>
                                The corporation plays a pivotal role in the systematic management of forest resources. By transitioning from traditional forestry to highly productive and scientifically managed plantations, MPRVVN aims to improve the quality of forests while generating substantial revenue and employment.
                            </p>
                            <p>
                                Today, MPRVVN operates across numerous project divisions, engaging hundreds of Joint Forest Management (JFM) samitis. We specialize in timber harvesting, bamboo plantation, eco-restoration of mined-out areas, and executing turnkey deposit works for major corporations like NTPC and various coalfields.
                            </p>
                            <div className="mt-8 bg-beige-100 p-6 rounded-xl border-l-4 border-olive-500 flex flex-col md:flex-row gap-6 items-center">
                                <div className="text-4xl text-olive-600"><i className="fas fa-map-marked-alt"></i></div>
                                <div>
                                    <h4 className="font-bold text-olive-900 mb-1">Registered Headquarters</h4>
                                    <p className="text-sm">Van Bhawan, Block-C, 1st Floor, Tulsi Nagar, Bhopal, Madhya Pradesh - 462003, India</p>
                                    <p className="text-sm mt-1"><strong>Email:</strong> mdrvvn@mp.gov.in</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Company Objectives Section */}
                    <section id="company-objectives" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-8 border-b-2 border-gold-300 pb-2">
                            <h2 className="text-3xl font-bold text-olive-900">Company Objectives</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {objectives.map((obj, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-beige-200 hover:border-gold-400 hover:shadow-md transition-all group">
                                    <div className="w-12 h-12 bg-olive-100 rounded-full flex items-center justify-center text-olive-600 text-xl mb-4 group-hover:bg-olive-600 group-hover:text-beige-50 transition-colors">
                                        <i className={`fas ${obj.icon}`}></i>
                                    </div>
                                    <h3 className="font-bold text-olive-900 text-lg mb-2">{obj.title}</h3>
                                    <p className="text-sm text-olive-700 leading-relaxed">{obj.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Organisation Chart Section */}
                    <section id="organisation-chart" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-8 border-b-2 border-gold-300 pb-2">
                            <h2 className="text-3xl font-bold text-olive-900">Organisation Chart</h2>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-beige-200 overflow-x-auto">
                            {/* CSS-based simple hierarchy tree representation */}
                            <div className="flex flex-col items-center min-w-[600px] py-4">
                                {/* Level 1 */}
                                <div className="bg-olive-800 text-white px-6 py-3 rounded-lg font-bold shadow-md relative z-10 w-64 text-center">
                                    Board of Directors
                                </div>
                                <div className="w-0.5 h-6 bg-olive-300"></div>
                                
                                {/* Level 2 */}
                                <div className="bg-olive-700 text-beige-50 px-6 py-3 rounded-lg font-bold shadow-md relative z-10 w-64 text-center border-b-4 border-gold-400">
                                    Managing Director
                                </div>
                                <div className="w-0.5 h-6 bg-olive-300"></div>

                                {/* Level 3 - Connecting Line */}
                                <div className="w-[80%] h-0.5 bg-olive-300 relative"></div>
                                
                                {/* Level 3 - Nodes */}
                                <div className="flex justify-between w-[90%] mt-6 relative gap-4">
                                    {/* Connector lines from the horizontal bar */}
                                    <div className="absolute top-[-24px] left-[10%] w-0.5 h-6 bg-olive-300"></div>
                                    <div className="absolute top-[-24px] left-[50%] w-0.5 h-6 bg-olive-300"></div>
                                    <div className="absolute top-[-24px] right-[10%] w-0.5 h-6 bg-olive-300"></div>

                                    <div className="flex-1 bg-beige-100 text-olive-900 border border-olive-200 px-4 py-3 rounded-lg font-semibold text-sm text-center shadow-sm">
                                        Head Office / Administration
                                    </div>
                                    <div className="flex-1 bg-beige-100 text-olive-900 border border-olive-200 px-4 py-3 rounded-lg font-semibold text-sm text-center shadow-sm">
                                        Regional General Managers (RGM)
                                    </div>
                                    <div className="flex-1 bg-beige-100 text-olive-900 border border-olive-200 px-4 py-3 rounded-lg font-semibold text-sm text-center shadow-sm">
                                        Project Divisions
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Board of Directors Section */}
                    <section id="board-of-directors" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-8 border-b-2 border-gold-300 pb-2">
                            <h2 className="text-3xl font-bold text-olive-900">Board of Directors</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {boardMembers.map((member, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-beige-200 flex gap-6 items-center">
                                    <div className="w-16 h-16 rounded-full bg-beige-100 border-2 border-gold-300 flex items-center justify-center text-olive-400 flex-shrink-0">
                                        <i className="fas fa-user-tie text-2xl"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-olive-900 text-lg">{member.name}</h3>
                                        <div className="text-gold-600 font-semibold text-sm mb-1 uppercase tracking-wider">{member.role}</div>
                                        <p className="text-sm text-olive-600">{member.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Key Offices Section */}
                    <section id="key-offices" className="scroll-mt-24">
                        <div className="flex items-center justify-between mb-8 border-b-2 border-gold-300 pb-2">
                            <h2 className="text-3xl font-bold text-olive-900">Key Offices</h2>
                            <a href="/directory" className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-olive-600 hover:text-gold-500 transition-colors">
                                View Full Directory <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Head Office */}
                            <div className="bg-olive-800 text-beige-50 p-6 rounded-xl shadow-sm border border-olive-700 relative overflow-hidden">
                                <div className="absolute -right-4 -top-4 opacity-10 text-7xl"><i className="fas fa-building"></i></div>
                                <div className="mb-4">
                                    <span className="bg-gold-500 text-olive-900 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Headquarters</span>
                                </div>
                                <h3 className="font-bold text-xl mb-2 text-gold-300">Head Office, Bhopal</h3>
                                <p className="text-sm text-beige-200 leading-relaxed mb-4">
                                    Van Bhawan, Block-C, 1st Floor, Link Road No.-2,<br />
                                    Tulsi Nagar, Bhopal-462003 (Madhya Pradesh)
                                </p>
                                <div className="text-sm font-medium">
                                    <i className="fas fa-phone mr-2 text-gold-400"></i> 0755-2674204
                                </div>
                            </div>
                            
                            {/* Regional Bhopal */}
                            <div className="bg-white text-olive-800 p-6 rounded-xl shadow-sm border border-beige-200 hover:border-gold-300 transition-colors">
                                <div className="mb-4 text-olive-400 text-2xl"><i className="fas fa-map-marker-alt"></i></div>
                                <h3 className="font-bold text-lg mb-2 text-olive-900">Regional General Manager, Bhopal</h3>
                                <p className="text-sm text-olive-600 leading-relaxed mb-4">
                                    O/o Regional Chief General Manager<br />
                                    Vanita Nursery Parisar, Near Jawahar Bal Bhawan, Bhopal
                                </p>
                                <div className="text-sm font-medium">
                                    <i className="fas fa-phone mr-2 text-olive-500"></i> 0755-2674298
                                </div>
                            </div>

                            {/* Regional Jabalpur */}
                            <div className="bg-white text-olive-800 p-6 rounded-xl shadow-sm border border-beige-200 hover:border-gold-300 transition-colors">
                                <div className="mb-4 text-olive-400 text-2xl"><i className="fas fa-map-marker-alt"></i></div>
                                <h3 className="font-bold text-lg mb-2 text-olive-900">Regional General Manager, Jabalpur</h3>
                                <p className="text-sm text-olive-600 leading-relaxed mb-4">
                                    O/o Regional Chief General Manager<br />
                                    451, Sanjeevni Nagar, (Gadha) Jabalpur (M.P) 482001
                                </p>
                                <div className="text-sm font-medium">
                                    <i className="fas fa-phone mr-2 text-olive-500"></i> 0761-4017345
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 text-center md:hidden">
                            <a href="/directory" className="inline-flex items-center gap-2 text-sm font-bold text-olive-600 hover:text-gold-500 transition-colors">
                                View Full Directory <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </section>

                </div>
            </div>
        </PageShell>
    );
};

export default About;
