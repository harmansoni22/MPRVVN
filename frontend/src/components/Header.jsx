import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { companySnapshot, navItems } from '../data/siteData';

const Header = () => {
    const { lang, toggle: toggleLang } = useLanguage();
    const { openSearch } = useApp();
    const location = useLocation();

    const today = new Date().toLocaleDateString('en-IN', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        // Reset UI state on route change.
        // eslint rule workaround: schedule state update.
        const id = setTimeout(() => {
            setMobileOpen(false);
            setOpenDropdown(null);
        }, 0);

        return () => clearTimeout(id);
    }, [location.pathname]);

    return (
        <>
            {/* ── ROW 1 & 2: Info bar + Logo (scrolls away) ── */}
            <header>
                {/* Thin top info bar */}
                <div className="bg-olive-900 text-beige-100 text-xs py-1.5 border-b border-olive-800">
                    <div className="w-full px-4 xl:px-8 flex justify-between items-center gap-2">
                        <div className="flex items-center gap-4">
                            <span className="opacity-80"><i className="far fa-calendar-alt mr-1.5"></i>{today}</span>
                            <span className="text-olive-600 hidden sm:inline">|</span>
                            <a href="#main-content" className="hover:text-gold-400 transition hidden sm:inline">Skip to Main Content</a>
                        </div>
                        <button onClick={toggleLang} className="bg-olive-700 hover:bg-olive-600 px-3 py-0.5 rounded border border-olive-600 transition-colors flex items-center gap-1.5 font-medium">
                            <i className="fas fa-language text-gold-300 text-sm"></i>
                            {lang === 'en' ? 'हिन्दी' : 'English'}
                        </button>
                    </div>
                </div>

                {/* Logo + Search bar */}
                <div className="bg-beige-50 border-b border-beige-200">
                    <div className="w-full px-4 xl:px-8 py-3 flex items-center justify-between gap-6">
                        <Link to="/" className="flex items-center gap-4 group flex-shrink-0">
                            <img src="/logo_no-bg.png" alt="MPRVVN logo" className="w-16 h-16 object-contain" />
                            <div className="hidden sm:block">
                                <h1 className="text-base md:text-xl font-extrabold tracking-tight text-olive-900 group-hover:text-olive-700 transition-colors leading-tight">
                                    {companySnapshot.name}
                                </h1>
                                <p className="text-[11px] font-semibold text-olive-500 uppercase tracking-widest mt-0.5">
                                    {companySnapshot.tagline}
                                </p>
                            </div>
                        </Link>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={openSearch}
                                className="hidden sm:flex items-center gap-3 bg-white border border-beige-300 rounded-lg px-4 py-2 text-sm text-olive-500 hover:border-olive-400 hover:bg-beige-50 transition-all shadow-sm group min-w-[220px] lg:min-w-[280px]"
                                aria-label="Open search"
                            >
                                <i className="fas fa-search text-olive-400 group-hover:text-olive-600 transition-colors"></i>
                                <span className="flex-1 text-left">Search pages, tenders, services…</span>
                                <span className="text-[10px] font-mono text-olive-400 bg-beige-100 border border-beige-200 px-1.5 py-0.5 rounded">Ctrl+K</span>
                            </button>

                            <button
                                onClick={openSearch}
                                className="sm:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-beige-300 text-olive-700 hover:bg-beige-100 transition shadow-sm"
                                aria-label="Search"
                            >
                                <i className="fas fa-search"></i>
                            </button>

                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-olive-800 text-beige-50 hover:bg-olive-700 transition-colors"
                                aria-label="Toggle menu"
                            >
                                <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── ROW 3: Navigation bar — STICKY ── */}
            <nav className="hidden lg:block bg-olive-800 border-b border-olive-900 sticky top-0 z-50 shadow-md">
                <div className="w-full px-4 xl:px-8">
                    <ul className="flex items-center justify-start gap-0 font-semibold text-sm text-beige-100">
                        {navItems.map((item, index) => {
                            const hasDropdown = item.subItems && item.subItems.length > 0;
                            const active = location.pathname === item.path ||
                                (hasDropdown && item.subItems.some(sub => location.pathname === sub.path));

                            return (
                                <li
                                    key={index}
                                    className="relative"
                                    onMouseEnter={() => setOpenDropdown(index)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <Link
                                        to={item.path}
                                        className={`flex items-center gap-2 px-4 py-3.5 whitespace-nowrap border-b-2 transition-all duration-200 ${
                                            active
                                                ? 'bg-olive-700 text-gold-300 border-gold-400'
                                                : 'border-transparent hover:bg-olive-700 hover:text-gold-200'
                                        }`}
                                    >
                                        <i className={`${item.icon} text-xs ${active ? 'text-gold-400' : 'text-olive-400'}`}></i>
                                        {item.label}
                                        {hasDropdown && <i className="fas fa-chevron-down text-[9px] opacity-70 ml-0.5"></i>}
                                    </Link>

                                    {hasDropdown && openDropdown === index && (
                                        <div className="absolute left-0 top-full pt-1 min-w-[240px] z-50">
                                            <div className="bg-white rounded-b-lg shadow-xl border border-beige-200 overflow-hidden animate-fade-in-up">
                                                <div className="h-0.5 bg-gold-400 w-full"></div>
                                                <ul className="py-1.5">
                                                    {item.subItems.map((subItem, subIndex) => (
                                                        <li key={subIndex}>
                                                            <Link
                                                                to={subItem.path}
                                                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-olive-800 hover:bg-beige-50 hover:text-olive-900 transition-colors border-b border-beige-100 last:border-0"
                                                            >
                                                                <i className="fas fa-chevron-right text-[9px] text-olive-400"></i>
                                                                {subItem.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>

            {/* ── Mobile Navigation Menu ── */}
            {mobileOpen && (
                <div className="lg:hidden fixed top-0 left-0 w-full h-full bg-white z-50 overflow-y-auto">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-beige-200 bg-beige-50">
                        <span className="font-bold text-olive-900 text-sm">Menu</span>
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg text-stone-500 hover:bg-beige-100 transition"
                        >
                            <i className="fas fa-times text-lg"></i>
                        </button>
                    </div>
                    <ul className="divide-y divide-beige-100">
                        {navItems.map((item, index) => {
                            const hasDropdown = item.subItems && item.subItems.length > 0;
                            const active = location.pathname === item.path;
                            const isDropdownOpen = openDropdown === index;

                            return (
                                <li key={index}>
                                    <div className="flex justify-between items-center px-4">
                                        <Link
                                            to={item.path}
                                            className={`flex-1 flex items-center gap-3 py-3 text-sm font-bold ${active ? 'text-olive-900' : 'text-olive-700'}`}
                                        >
                                            <i className={`${item.icon} w-5 text-center ${active ? 'text-gold-500' : 'text-olive-400'}`}></i>
                                            {item.label}
                                        </Link>
                                        {hasDropdown && (
                                            <button
                                                onClick={() => setOpenDropdown(isDropdownOpen ? null : index)}
                                                className="w-10 h-10 flex items-center justify-center text-olive-400 hover:bg-beige-100 rounded-lg transition-colors"
                                            >
                                                <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'} text-xs`}></i>
                                            </button>
                                        )}
                                    </div>
                                    {hasDropdown && isDropdownOpen && (
                                        <ul className="bg-beige-50 border-y border-beige-100 py-1">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link
                                                        to={subItem.path}
                                                        className="block pl-12 pr-4 py-2.5 text-sm text-olive-600 hover:text-olive-900 hover:bg-beige-100 font-medium"
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Header;
