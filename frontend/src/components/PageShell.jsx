import Header from './Header';
import NoticeBoard from './NoticeBoard';
import Footer from './Footer';

const PageShell = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800">
            <Header />
            <NoticeBoard />
            <main id="main-content" className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default PageShell;
