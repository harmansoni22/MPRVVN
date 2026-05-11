import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AppProvider } from './context/AppContext';
import AccessibilityPanel from './components/AccessibilityPanel';
import SearchModal from './components/SearchModal';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Auctions from './pages/Auctions';
import Gallery from './pages/Gallery';
import Tenders from './pages/Tenders';
import Downloads from './pages/Downloads';
import Contact from './pages/Contact';
import Directory from './pages/Directory';
import './index.css';

import ForestryActivities from './pages/ForestryActivities';
import TurnkeyProjects from './pages/TurnkeyProjects';
import Operations from './pages/Operations';
import EServices from './pages/EServices';

function AppRoutes() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/auctions" element={<Auctions />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/tenders" element={<Tenders />} />
                    <Route path="/downloads" element={<Downloads />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/directory" element={<Directory />} />
                    <Route path="/operations" element={<Operations />} />
                    <Route path="/e-services" element={<EServices />} />
                    <Route path="/forestry-activities" element={<ForestryActivities />} />
                    <Route path="/turnkey-projects" element={<TurnkeyProjects />} />
                </Routes>
                <AccessibilityPanel />
                <SearchModal />
            </Router>
        </>
    );
}

function App() {
    return (
        <LanguageProvider>
            <AppProvider>
                <AppRoutes />
            </AppProvider>
        </LanguageProvider>
    );
}

export default App;
