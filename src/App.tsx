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
  const [user, setUser] = useState<any>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selected, setSelected] = useState<Location | null>(null);
  const [view, setView] = useState<'home' | 'map' | 'guide' | 'admin' | 'profile' | 'lost'>('home');
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSrinagarLocations().then(setLocations);
    const savedUser = localStorage.getItem('onepaw_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  const handleLoginComplete = (userData: any) => {
    localStorage.setItem('onepaw_user', JSON.stringify(userData));
    setUser(userData);
  };

  // --- LOGOUT LOGIC ---
  const handleLogout = () => {
    if(window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('onepaw_user');
      setUser(null);
      setView('home');
    }
  };

  if (loading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950">
        <Loader2 className="animate-spin text-orange-500" size={48} />
    </div>
  );

  if (!user) return <Onboarding onComplete={handleLoginComplete} />;

  if (view === 'lost') return <><LostAndFound onBack={() => setView('home')} /><SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} /></>;
  
  // Pass the logout function to the Profile Page
  if (view === 'profile') return <><ProfilePage onBack={() => setView('home')} onLogout={handleLogout} /><SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} /></>;
  
  if (view === 'admin') return <><AdminPanel onBack={() => setView('home')} /><SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} /></>;
  if (view === 'guide') return <><InfoHub onBack={() => setView('home')} /><SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} /></>;

  if (view === 'map') {
    return (
      <div className="map-layout bg-white flex flex-col md:flex-row h-screen overflow-hidden">
        <div className="w-full md:w-[380px] lg:w-[420px] h-[45%] md:h-full shrink-0 shadow-2xl z-20 flex flex-col border-r border-slate-200">
          <div className="p-4 bg-[#4A2C2A] flex items-center gap-4 text-white">
             <button onClick={() => setView('home')} className="px-4 py-2 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest">← Home</button>
             <button onClick={() => setIsSOSOpen(true)} className="px-4 py-2 bg-red-600 rounded-xl text-[10px] font-black uppercase ml-auto">SOS Help</button>
          </div>
          <div className="flex-1 overflow-hidden">
            <Sidebar locations={locations} onSelect={setSelected} activeFilter={filter} setFilter={setFilter} search="" setSearch={() => {}} />
          </div>
        </div>
        <div className="flex-1 h-[55%] md:h-full relative z-10">
          <MapComponent locations={locations.filter(l => filter === 'all' || l.category === filter)} selectedLocation={selected} userPos={null} onMarkerClick={setSelected} />
        </div>
        <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FFF8F0]">
      <HomePage onNavigate={setView} onOpenReport={() => setIsReportOpen(true)} onSOS={() => setIsSOSOpen(true)} onOpenVolunteer={() => setIsVolunteerOpen(true)} />
      <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
      {isReportOpen && <ReportForm onClose={() => setIsReportOpen(false)} />}
      {isVolunteerOpen && <VolunteerForm onClose={() => setIsVolunteerOpen(false)} />}
    </div>
  );
};

export default App;