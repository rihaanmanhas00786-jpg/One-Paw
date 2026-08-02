import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import Sidebar from './components/Sidebar';
import MapComponent from './components/Map';
import InfoHub from './components/InfoHub';
import SOSModal from './components/SOSModal';
import ReportForm from './components/ReportForm';
import AdminPanel from './components/AdminPanel';
import Onboarding from './components/Onboarding';
import ProfilePage from './components/Profile';
import LostAndFound from './components/LostAndFound';
import VolunteerForm from './components/VolunteerForm';
import { Location, Category } from './types';
import { fetchSrinagarLocations } from './services/api';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  // 1. USER & DATA STATES
  const [user, setUser] = useState<any>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selected, setSelected] = useState<Location | null>(null);
  
  // 2. NAVIGATION STATES (Controls which page is showing)
  const [view, setView] = useState<'home' | 'map' | 'guide' | 'admin' | 'profile' | 'lost'>('home');
  const [filter, setFilter] = useState<Category | 'all'>('all');
  
  // 3. UI STATES (Popups/Modals)
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // APP INITIALIZATION: Load data and check login session
  useEffect(() => {
    const init = async () => {
      try {
        const data = await fetchSrinagarLocations();
        setLocations(data);
        
        // Check if user is already logged in on this phone/computer
        const savedUser = localStorage.getItem('onepaw_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.error("Initialization Error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // SCROLL FIX: Every time the page changes, move to the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // LOGIN SUCCESS HANDLER: Receives the data from Onboarding.tsx
  const handleLoginComplete = (userData: any) => {
    localStorage.setItem('onepaw_user', JSON.stringify(userData));
    setUser(userData);
  };

  // LOGOUT HANDLER: Clears session and returns to login screen
  const handleLogout = () => {
    if(window.confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem('onepaw_user');
      setUser(null);
      setView('home');
    }
  };

  // LOADING SCREEN (While database is connecting)
  if (loading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950">
        <Loader2 className="animate-spin text-orange-500 mb-4" size={48} />
        <p className="text-white font-black tracking-widest text-[10px] uppercase opacity-50">OnePaw Srinagar</p>
    </div>
  );

  // --- SECURITY: If not logged in, show the Onboarding screen ONLY ---
  if (!user) {
    return <Onboarding onComplete={handleLoginComplete} />;
  }

  // --- ROUTING LOGIC (Which "Page" to render) ---

  // Page: Lost & Found
  if (view === 'lost') {
    return (
        <div className="w-full h-full">
            <LostAndFound onBack={() => setView('home')} />
            <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
        </div>
    );
  }

  // Page: User Profile (With Logout)
  if (view === 'profile') {
    return (
        <div className="w-full h-full">
            <ProfilePage onBack={() => setView('home')} onLogout={handleLogout} />
            <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
        </div>
    );
  }

  // Page: Admin Dashboard (Hidden)
  if (view === 'admin') {
    return (
        <div className="w-full h-full">
            <AdminPanel onBack={() => setView('home')} />
            <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
        </div>
    );
  }

  // Page: Knowledge Hub / Guide
  if (view === 'guide') {
    return (
        <div className="w-full h-full">
            <InfoHub onBack={() => setView('home')} />
            <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
        </div>
    );
  }

  // Page: Map Locator (Special Full-Screen Layout)
  if (view === 'map') {
    return (
      <div className="map-layout bg-white flex flex-col md:flex-row h-screen overflow-hidden">
        {/* Navigation Sidebar for Map Page */}
        <div className="w-full md:w-[380px] lg:w-[420px] h-[45%] md:h-full shrink-0 shadow-2xl z-20 flex flex-col border-r border-slate-200">
          <div className="p-4 bg-[#4A2C2A] flex items-center gap-4 text-white">
             <button 
                onClick={() => setView('home')} 
                className="px-4 py-2 bg-white/10 rounded-xl text-[10px] font-black uppercase hover:bg-orange-600 transition-all"
             >
               ← Home
             </button>
             <div className="h-6 w-[1px] bg-white/20"></div>
             <button 
                onClick={() => setIsSOSOpen(true)} 
                className="px-4 py-2 bg-red-600 rounded-xl text-[10px] font-black uppercase ml-auto animate-pulse shadow-lg shadow-red-900/50"
             >
               SOS Help
             </button>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <Sidebar 
                locations={locations} 
                onSelect={setSelected} 
                activeFilter={filter} 
                setFilter={setFilter} 
                search="" 
                setSearch={() => {}} 
            />
          </div>
        </div>

        {/* The Interactive Leaflet Map */}
        <div className="flex-1 h-[55%] md:h-full relative z-10">
          <MapComponent 
            locations={locations.filter(l => filter === 'all' || l.category === filter)} 
            selectedLocation={selected} 
            userPos={null} 
            onMarkerClick={setSelected} 
          />
        </div>
        <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
      </div>
    );
  }

  // DEFAULT VIEW: HOME PAGE
  return (
    <div className="w-full min-h-screen bg-[#FFF8F0] relative">
      <HomePage 
        onNavigate={setView} 
        onOpenReport={() => setIsReportOpen(true)} 
        onSOS={() => setIsSOSOpen(true)} 
        onOpenVolunteer={() => setIsVolunteerOpen(true)}
      />
      
      {/* GLOBAL POPUPS (Accessible from Home Page) */}
      <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
      
      {isReportOpen && (
        <ReportForm onClose={() => setIsReportOpen(false)} />
      )}
      
      {isVolunteerOpen && (
        <VolunteerForm onClose={() => setIsVolunteerOpen(false)} />
      )}
    </div>
  );
};

export default App;