import { useEffect } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import NoticeBoard from '../components/NoticeBoard';
import Footer from '../components/Footer';

const About = () => {
    useEffect(() => {
        // Initialize animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Counter animation
        const animateCounter = (element) => {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target.toLocaleString();
                }
            };
            
            updateCounter();
        };

        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const counterObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            counterObserver.observe(counter);
        });
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <Navigation />
            <NoticeBoard />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-green-50 to-green-100 py-20 relative overflow-hidden">
                    <div className="absolute inset-0 hero-pattern"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-gray-800 text-center max-w-4xl mx-auto">
                            <h1 className="text-5xl font-bold mb-6 animate-on-scroll">About MPFSDC</h1>
                            <p className="text-xl mb-8 animate-on-scroll">
                                Leading sustainable forest management and conservation in Madhya Pradesh since 1975
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 animate-on-scroll">
                                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 shadow-md">
                                    <i className="fas fa-tree mr-2 text-green-800"></i> 2.5M+ Hectares Managed
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 shadow-md">
                                    <i className="fas fa-users mr-2 text-green-800"></i> 50K+ Employed
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 shadow-md">
                                    <i className="fas fa-award mr-2 text-green-800"></i> Working towards FSC Certification
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Welcome Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="animate-on-scroll">
                                <h2 className="text-4xl font-bold mb-6 text-gray-800">Welcome to MPFSDC</h2>
                                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                    Madhya Pradesh Forest State Development Corporation (MPFSDC), established in 1985 under the Companies Act, 1956, is a wholly-owned Government of Madhya Pradesh undertaking. The corporation was formed with the primary objective of promoting sustainable forest management and conservation while ensuring economic development of the state.
                                </p>
                                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                    With over three decades of dedicated service, MPFSDC has emerged as a leading organization in forest development, managing vast forest resources across the state. Our commitment to environmental conservation and sustainable development has earned us recognition as a pioneer in the field of forest management.
                                </p>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-green-50 p-6 rounded-lg">
                                        <i className="fas fa-calendar text-green-800 text-3xl mb-3"></i>
                                        <h3 className="font-bold text-green-900 mb-1">Established</h3>
                                        <p className="text-gray-700">1985</p>
                                    </div>
                                    <div className="bg-green-50 p-6 rounded-lg">
                                        <i className="fas fa-building text-green-800 text-3xl mb-3"></i>
                                        <h3 className="font-bold text-green-900 mb-1">Headquarters</h3>
                                        <p className="text-gray-700">Bhopal, M.P.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="animate-on-scroll">
                                <div className="relative">
                                    <img src="https://via.placeholder.com/600x400" alt="Forest Management" className="rounded-lg shadow-xl" />
                                    <div className="absolute -bottom-6 -right-6 bg-green-800 text-white p-6 rounded-lg shadow-lg max-w-xs">
                                        <h4 className="font-bold mb-2">First in India</h4>
                                        <p className="text-sm">First forest corporation to achieve FSC certification</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision & Mission */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12 animate-on-scroll">
                            <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Vision & Mission</h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                Guided by our commitment to sustainability and community development
                            </p>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="bg-white rounded-xl shadow-lg p-8 animate-on-scroll">
                                <div className="text-center mb-6">
                                    <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                        <i className="fas fa-eye text-green-800 text-3xl"></i>
                                    </div>
                                    <h3 className="text-2xl font-bold text-green-800 mb-4">Our Vision</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-center">
                                    To be the leading forest development corporation in India, setting benchmarks in sustainable forest management, biodiversity conservation, and community development while contributing significantly to the state's economic growth and environmental sustainability.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-8 animate-on-scroll">
                                <div className="text-center mb-6">
                                    <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                        <i className="fas fa-bullseye text-green-800 text-3xl"></i>
                                    </div>
                                    <h3 className="text-2xl font-bold text-green-800 mb-4">Our Mission</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-center">
                                    To manage and develop forest resources through scientific methods, promote afforestation and conservation, ensure sustainable utilization of forest produce, and empower local communities while maintaining ecological balance and contributing to the nation's environmental goals.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Achievements */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12 animate-on-scroll">
                            <h2 className="text-4xl font-bold mb-4 text-gray-800">Key Achievements</h2>
                            <p className="text-gray-600 text-lg">Milestones that define our journey of excellence</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 animate-on-scroll">
                                <div className="bg-green-800 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                    <i className="fas fa-award"></i>
                                </div>
                                <h3 className="font-bold text-gray-800 mb-2">FSC Certification</h3>
                                <p className="text-gray-600 text-sm">First forest corporation in India to achieve Forest Stewardship Council certification</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 animate-on-scroll">
                                <div className="bg-green-800 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                    <i className="fas fa-tree"></i>
                                </div>
                                <h3 className="font-bold text-gray-800 mb-2">2.5 Million Hectares</h3>
                                <p className="text-gray-600 text-sm">Forest area under sustainable management</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 animate-on-scroll">
                                <div className="bg-green-800 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                    <i className="fas fa-industry"></i>
                                </div>
                                <h3 className="font-bold text-gray-800 mb-2">75,000 m³ Annual Production</h3>
                                <p className="text-gray-600 text-sm">Sustainable timber and bamboo production</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 animate-on-scroll">
                                <div className="bg-green-800 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                    <i className="fas fa-users"></i>
                                </div>
                                <h3 className="font-bold text-gray-800 mb-2">50,000+ Employment</h3>
                                <p className="text-gray-600 text-sm">Direct and indirect employment opportunities created</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Leadership Team */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12 animate-on-scroll">
                            <h2 className="text-4xl font-bold mb-4 text-gray-800">Leadership Team</h2>
                            <p className="text-gray-600 text-lg">Experienced professionals guiding our mission</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-on-scroll">
                                <div className="bg-gradient-to-r from-green-800 to-green-900 p-6 text-center">
                                    <div className="bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                        <i className="fas fa-user-tie text-green-800 text-3xl"></i>
                                    </div>
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold mb-2">Shri. Arvind Singh Tomar</h3>
                                    <p className="text-green-700 font-semibold mb-3">Managing Director</p>
                                    <p className="text-gray-600 text-sm">IFS Officer with 25+ years of experience in forest management and administration</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-on-scroll">
                                <div className="bg-gradient-to-r from-green-800 to-green-900 p-6 text-center">
                                    <div className="bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                        <i className="fas fa-user-tie text-green-800 text-3xl"></i>
                                    </div>
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold mb-2">Shri. Ramesh Chand Patel</h3>
                                    <p className="text-green-700 font-semibold mb-3">Chairman</p>
                                    <p className="text-gray-600 text-sm">Senior IAS officer with extensive experience in public administration and policy making</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-on-scroll">
                                <div className="bg-gradient-to-r from-green-800 to-green-900 p-6 text-center">
                                    <div className="bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                        <i className="fas fa-user-tie text-green-800 text-3xl"></i>
                                    </div>
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold mb-2">Shri. Pradeep Kumar Sharma</h3>
                                    <p className="text-green-700 font-semibold mb-3">Director (Operations)</p>
                                    <p className="text-gray-600 text-sm">Expert in forest operations with 20+ years of field experience</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Statistics */}
                <section className="py-20 bg-gradient-to-r from-green-50 to-green-100">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12 animate-on-scroll">
                            <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Impact</h2>
                            <p className="text-gray-600 text-lg">Numbers that speak volumes about our commitment</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center animate-on-scroll">
                                <div className="text-5xl font-bold mb-2 text-green-800 counter" data-target="2500000">0</div>
                                <p className="text-gray-600">Hectares Managed</p>
                            </div>
                            <div className="text-center animate-on-scroll">
                                <div className="text-5xl font-bold mb-2 text-green-800 counter" data-target="75000">0</div>
                                <p className="text-gray-600">m³ Annual Production</p>
                            </div>
                            <div className="text-center animate-on-scroll">
                                <div className="text-5xl font-bold mb-2 text-green-800 counter" data-target="50000">0</div>
                                <p className="text-gray-600">People Employed</p>
                            </div>
                            <div className="text-center animate-on-scroll">
                                <div className="text-5xl font-bold mb-2 text-green-800 counter" data-target="38">0</div>
                                <p className="text-gray-600">Years of Service</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-12 text-center animate-on-scroll border border-green-200">
                            <h2 className="text-3xl font-bold mb-4 text-gray-800">Join Us in Our Mission</h2>
                            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                                Be part of our journey towards sustainable forest management and environmental conservation. Together, we can make a difference for future generations.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors">
                                    <i className="fas fa-handshake mr-2"></i>
                                    Partner With Us
                                </button>
                                <button className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold border-2 border-green-800 hover:bg-green-50 transition-colors">
                                    <i className="fas fa-info-circle mr-2"></i>
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default About;
