import { useState } from 'react';
import PageShell from '../components/PageShell';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        consent: false
    });

    const [showNotification, setShowNotification] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setShowNotification(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                consent: false
            });
            setIsSubmitting(false);
            setTimeout(() => {
                setShowNotification(false);
            }, 5000);
        }, 1000);
    };

    return (
        <PageShell>
            {/* Hero Section */}
            <section className="bg-olive-900 text-beige-50 py-16 md:py-24 border-b-4 border-gold-500">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gold-300">Contact Us</h1>
                    <p className="text-lg md:text-xl text-beige-200 max-w-3xl leading-relaxed">
                        Get in touch with Madhya Pradesh Rajya Van Vikas Nigam. We are here to assist you with project inquiries, partnerships, and general support.
                    </p>
                </div>
            </section>

            <div className="bg-beige-50 py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-5 gap-12">

                        {/* Contact Information (Left Column) */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-olive-900 mb-6 border-b-2 border-gold-300 inline-block pb-1">Get In Touch</h2>
                                <p className="text-olive-700 mb-8 leading-relaxed">
                                    Our dedicated team is ready to answer your questions regarding forestry projects, e-auctions, and CSR initiatives. Please reach out via the form or use our direct contact details below.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* Address */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-olive-600 shadow-sm border border-beige-200 flex-shrink-0">
                                        <i className="fas fa-map-marker-alt text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-olive-900 text-lg mb-1">Registered Headquarters</h4>
                                        <p className="text-olive-700 leading-relaxed">
                                            Van Bhawan, Block-C, 1st Floor,<br />
                                            Tulsi Nagar, Bhopal,<br />
                                            Madhya Pradesh - 462003, India
                                            {/* Panchanan, 5th Floor,<br />
                                            Malviya Nagar, Bhopal,<br />
                                            Madhya Pradesh - 462003, India. */}
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-olive-600 shadow-sm border border-beige-200 flex-shrink-0">
                                        <i className="fas fa-phone-alt text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-olive-900 text-lg mb-1">Phone</h4>
                                        <p className="text-olive-700">+91 (0755) 255-XXXX</p>
                                        <p className="text-olive-700">+91 (0755) 255-XXXX (Fax)</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-olive-600 shadow-sm border border-beige-200 flex-shrink-0">
                                        <i className="fas fa-envelope text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-olive-900 text-lg mb-1">Email Address</h4>
                                        <p className="text-olive-700">mdrvvn@mp.gov.in</p>
                                        <p className="text-olive-700">info@mpfsdc.gov.in</p>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-olive-600 shadow-sm border border-beige-200 flex-shrink-0">
                                        <i className="fas fa-clock text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-olive-900 text-lg mb-1">Business Hours</h4>
                                        <p className="text-olive-700">Monday - Friday: 10:30 AM - 5:30 PM</p>
                                        <p className="text-olive-700">Second & Third Saturdays Closed</p>
                                    </div>
                                </div>
                            </div>

                            {/* Interactive Google Map */}
                            <div className="mt-8 bg-gray-200 rounded-xl h-64 w-full border border-beige-300 overflow-hidden shadow-inner">
                                <iframe
                                    // src="https://maps.google.com/maps?q=Panchanan%205th%20Floor%20Malviya%20Nagar%20Bhopal%20Madhya%20Pradesh%20462003&t=&z=14&ie=UTF8&iwloc=&output=embed"
                                    src="https://maps.google.com/maps?q=Van%20Bhawan,%20Tulsi%20Nagar,%20Bhopal,%20Madhya%20Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="MPFSDC Headquarters Location"
                                ></iframe>
                            </div>
                        </div>

                        {/* Contact Form (Right Column) */}
                        <div className="lg:col-span-3">
                            <div className="rounded-2xl border border-beige-200 bg-white p-8 shadow-sm">
                                <h3 className="text-2xl font-bold text-olive-900 mb-6">Send us a Message</h3>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-olive-800 font-semibold mb-2">Full Name <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter your name"
                                                className="w-full px-4 py-3 bg-beige-50 border border-beige-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-olive-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-olive-800 font-semibold mb-2">Email Address <span className="text-red-500">*</span></label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter your email"
                                                className="w-full px-4 py-3 bg-beige-50 border border-beige-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-olive-500 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-olive-800 font-semibold mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Enter your phone number"
                                                className="w-full px-4 py-3 bg-beige-50 border border-beige-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-olive-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-olive-800 font-semibold mb-2">Inquiry Subject <span className="text-red-500">*</span></label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-beige-50 border border-beige-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-olive-500 transition-colors text-olive-800"
                                            >
                                                <option value="">Select Subject</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="tenders">Tenders</option>
                                                <option value="auctions">E-Auctions</option>
                                                <option value="projects">Turnkey Projects / Deposit Works</option>
                                                <option value="csr">CSR Partnerships</option>
                                                <option value="complaint">Complaint</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-olive-800 font-semibold mb-2">Message <span className="text-red-500">*</span></label>
                                        <textarea
                                            name="message"
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="How can we help you?"
                                            className="w-full px-4 py-3 bg-beige-50 border border-beige-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-olive-500 transition-colors resize-none"
                                        ></textarea>
                                    </div>
                                    <div className="flex items-start pt-2">
                                        <input
                                            type="checkbox"
                                            id="consent"
                                            name="consent"
                                            checked={formData.consent}
                                            onChange={handleInputChange}
                                            required
                                            className="mt-1 mr-3 w-4 h-4 text-olive-600 bg-beige-50 border-beige-300 rounded focus:ring-olive-500"
                                        />
                                        <label htmlFor="consent" className="text-olive-700 text-sm leading-relaxed">
                                            I consent to having MPFSDC collect my details via this form. I agree to the <a href="#" className="text-gold-600 hover:text-gold-700 hover:underline font-semibold">Privacy Policy</a> and <a href="#" className="text-gold-600 hover:text-gold-700 hover:underline font-semibold">Terms of Service</a>.
                                        </label>
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="w-full bg-olive-700 text-beige-50 px-6 py-4 rounded-lg hover:bg-olive-800 shadow-md transition-all font-bold text-lg disabled:opacity-70 flex items-center justify-center gap-2 border border-olive-800">
                                        {isSubmitting ? (
                                            <><i className="fas fa-circle-notch fa-spin"></i> Sending Message...</>
                                        ) : (
                                            <><i className="fas fa-paper-plane"></i> Send Message</>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Directory of Officers CTA */}
            <div className="bg-white py-12 px-4 border-t border-beige-200">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="bg-beige-100 rounded-2xl p-8 border border-beige-200 shadow-sm">
                        <i className="fas fa-address-book text-4xl text-olive-600 mb-4"></i>
                        <h2 className="text-2xl font-bold text-olive-900 mb-3">Looking for a specific officer or regional office?</h2>
                        <p className="text-olive-700 mb-6 max-w-2xl mx-auto">
                            We have compiled a complete directory of all our Head Office executives, Regional Chief General Managers, and Divisional Managers, including their postal addresses and direct telephone numbers.
                        </p>
                        <a href="/directory" className="inline-flex items-center gap-2 bg-olive-700 text-beige-50 px-6 py-3 rounded-lg hover:bg-olive-800 transition font-bold shadow-sm">
                            View Full Officers Directory <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>

            {showNotification && (
                <div className="fixed bottom-8 right-8 px-6 py-4 bg-olive-800 text-beige-50 rounded-lg shadow-xl border-l-4 border-gold-500 z-50 transform transition-transform duration-300 flex items-center gap-3">
                    <i className="fas fa-check-circle text-gold-400 text-xl"></i>
                    <span className="font-medium">Message sent successfully! We'll get back to you soon.</span>
                    <button
                        onClick={() => setShowNotification(false)}
                        className="ml-4 hover:text-gold-400 transition-colors"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            )}
        </PageShell>
    );
};

export default Contact;
