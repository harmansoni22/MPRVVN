/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useCallback } from 'react';

export const LanguageContext = createContext({
    lang: 'en',
    setLang: () => { },
    toggle: () => { },
    t: (key) => key,
});

const translations = {
    en: {
        home: 'Home',
        about: 'About MPRVVN',
        services: 'Services',
        projects: 'Projects',
        auctions: 'Auctions',
        gallery: 'Gallery',
        tenders: 'Tenders',
        contact: 'Contact',
        search: 'Search',
        accessibility: 'Accessibility',
        noticeBoard: 'Notice Board',

        welcome: 'Welcome to MPRVVN',
        heroTitle: 'Sustainable Forest Development for a Greener Madhya Pradesh',
        heroDesc: 'Promoting forest conservation, plantation development, and public value through sustainable forestry initiatives across Madhya Pradesh.',

        aboutMpf: 'About MPRVVN',
        auctionPortal: 'E-Auction Portal',
        quickLinks: 'Quick Links',
        leadership: 'Leadership Corner',
        specialInitiatives: 'Special Initiatives',
        photoGallery: 'Photo Gallery',
        viewAll: 'View All',
        documents: 'Important Documents',

        partner: 'Partner With Us for Sustainable Forest Development',
        partnerDesc: 'We welcome collaboration with government bodies, institutions, and organizations working toward forestry, conservation, and rural development.',

        footerAbout: 'Madhya Pradesh Rajya Van Vikas Nigam Ltd. is committed to sustainable forest development, scientific resource management, and public-oriented forestry services.',

        subscribe: 'Stay Updated with MPRVVN',
        subscribeDesc: 'Get updates on tenders, auctions, projects, and forest initiatives.',
        enterEmail: 'Enter your email',
        subscribeBtn: 'Subscribe',
        thankYou: 'Thank you for subscribing!',

        quickLinksFooter: 'Quick Links',
        importantLinks: 'Important Links',
        connect: 'Connect With Us',
        office: 'Office Location',
        rights: 'All Rights Reserved.',
        lastUpdated: 'Last Updated',
        visitorCount: 'Visitor Count',
    },

    hi: {
        home: 'होम',
        about: 'MPRVVN के बारे में',
        services: 'सेवाएं',
        projects: 'परियोजनाएं',
        auctions: 'नीलामी',
        gallery: 'गैलरी',
        tenders: 'टेंडर',
        contact: 'संपर्क',
        search: 'खोज',
        accessibility: 'पहुंचनीयता',
        noticeBoard: 'सूचना पट्ट',

        welcome: 'MPRVVN में आपका स्वागत है',
        heroTitle: 'हरित मध्य प्रदेश के लिए सतत वन विकास',
        heroDesc: 'मध्य प्रदेश में सतत वानिकी पहलों के माध्यम से वन संरक्षण, वृक्षारोपण विकास और जनहितकारी सेवाओं को बढ़ावा देना।',

        aboutMpf: 'MPRVVN के बारे में',
        auctionPortal: 'ई-नीलामी पोर्टल',
        quickLinks: 'त्वरित लिंक',
        leadership: 'नेतृत्व अनुभाग',
        specialInitiatives: 'विशेष पहल',
        photoGallery: 'फोटो गैलरी',
        viewAll: 'सभी देखें',
        documents: 'महत्वपूर्ण दस्तावेज',

        partner: 'सतत वन विकास के लिए हमारे साथ साझेदारी करें',
        partnerDesc: 'हम वानिकी, संरक्षण और ग्रामीण विकास के क्षेत्र में कार्यरत सरकारी निकायों, संस्थानों और संगठनों के साथ सहयोग का स्वागत करते हैं।',

        footerAbout: 'मध्य प्रदेश राज्य वन विकास निगम लिमिटेड सतत वन विकास, वैज्ञानिक संसाधन प्रबंधन और जनोन्मुखी वानिकी सेवाओं के लिए प्रतिबद्ध है।',

        subscribe: 'MPRVVN से अपडेट रहें',
        subscribeDesc: 'टेंडर, नीलामी, परियोजनाओं और वन संबंधी पहलों की जानकारी प्राप्त करें।',
        enterEmail: 'अपना ईमेल दर्ज करें',
        subscribeBtn: 'सदस्यता लें',
        thankYou: 'सदस्यता लेने के लिए धन्यवाद!',

        quickLinksFooter: 'त्वरित लिंक',
        importantLinks: 'महत्वपूर्ण लिंक',
        connect: 'हमसे जुड़ें',
        office: 'कार्यालय स्थान',
        rights: 'सर्वाधिकार सुरक्षित।',
        lastUpdated: 'अंतिम अद्यतन',
        visitorCount: 'आगंतुक संख्या',
    },
};

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('en');

    const t = useCallback((key) => {
        return translations[lang]?.[key] ?? key;
    }, [lang]);

    const toggle = useCallback(() => {
        setLang(prev => (prev === 'en' ? 'hi' : 'en'));
    }, []);

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
