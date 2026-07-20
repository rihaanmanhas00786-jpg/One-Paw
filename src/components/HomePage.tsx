import React from 'react';
import { 
  MapPin, BookOpen, AlertCircle, Shield, 
  Camera, Lock, UserCircle, Megaphone, Heart, Users, Info, 
  CheckCircle, Globe, Zap
} from 'lucide-react';

interface HomeProps {
  onNavigate: (view: 'home' | 'map' | 'guide' | 'admin' | 'profile' | 'lost') => void;
  onOpenReport: () => void;
  onSOS: () => void;
  onOpenVolunteer: () => void;
}

const HomePage: React.FC<HomeProps> = ({ onNavigate, onOpenReport, onSOS, onOpenVolunteer }) => {
  const user = JSON.parse(localStorage.getItem('onepaw_user') || '{"name": "User"}');

  const handleAdmin = () => {
    const p = prompt("Admin PIN:");
    if(p === "1234") onNavigate('admin');
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center pb-40 bg-[#FFF8F0] relative overflow-x-hidden">
      
      {/* BACKGROUND DECOR (Removes the "Missing" feeling) */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-40 -right-20 w-96 h-96 bg-brown-200/10 rounded-full blur-3xl -z-10"></div>

      {/* Top Navbar */}
      <div className="w-full max-w-7xl flex justify-between items-center p-6 z-50">
        <button onClick={handleAdmin} className="p-3 bg-white shadow-lg rounded-2xl text-[#4A2C2A] hover:bg-orange-50 transition-all border border-orange-100/50">
          <Lock size={20}/>
        </button>
        
        <button onClick={() => onNavigate('profile')} className="flex items-center gap-3 bg-white p-2 pr-6 rounded-full shadow-xl border border-orange-100 hover:border-orange-300 transition-all group">
          <div className="bg-orange-500 p-2.5 rounded-full text-white group-hover:rotate-12 transition-transform">
             <UserCircle size={24} />
          </div>
          <div className="text-left leading-tight">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Your Space</p>
            <p className="text-sm font-bold text-slate-800">{user.name}</p>
          </div>
        </button>
      </div>

      {/* Hero Section: 3 Columns */}
      <section className="w-full max-w-7xl px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* LEFT: About Us */}
        <div className="bg-white/60 p-8 rounded-[45px] border border-orange-200/50 backdrop-blur-md shadow-xl flex flex-col justify-center transform hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-3 mb-6 text-[#4A2C2A]">
            <div className="p-2 bg-orange-100 rounded-xl text-orange-600"><Info size={20} /></div>
            <h2 className="font-black uppercase tracking-widest text-xs">About OnePaw</h2>
          </div>
          <p className="text-[#4A2C2A] text-sm leading-relaxed font-medium italic opacity-90">
            OnePaw is a unified platform dedicated to improving animal welfare by connecting rescue efforts, adoption services, and community support in one ecosystem. We aim to bridge the gap between animals in need and people who care, using technology to make rescue, treatment, and adoption faster, easier, and more accessible.
          </p>
          <div className="mt-6 flex items-center gap-2 text-orange-600 font-black text-[10px] uppercase tracking-tighter">
             <CheckCircle size={14}/> Trusted by Srinagar Communities
          </div>
        </div>

        {/* CENTER: Logo & Brand */}
        <div className="text-center flex flex-col items-center justify-center py-6">
          <div className="relative inline-block mb-8">
              <div className="w-56 h-48 rounded-full bg-white shadow-2xl border-[10px] border-white overflow-hidden flex items-center justify-center transform hover:rotate-3 transition-transform">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover scale-110" />
              </div>
              <div className="absolute -bottom-2 right-4 bg-orange-500 text-white p-4 rounded-2xl shadow-2xl border-4 border-[#FFF8F0] animate-bounce">
                  <Shield size={28} fill="currentColor" />
              </div>
          </div>
          <h1 className="text-8xl font-black text-[#4A2C2A] tracking-tighter italic uppercase leading-none select-none">OnePaw</h1>
          <div className="mt-4 flex flex-col items-center gap-2">
            <div className="h-1 w-20 bg-orange-500 rounded-full"></div>
            <p className="text-orange-900/80 text-[13px] font-black uppercase tracking-[0.2em] max-w-[320px] leading-relaxed text-center">
                An Integrated Animal Welfare, Rescue and Support System
            </p>
          </div>
        </div>

        {/* RIGHT: Meet the Team (LARGER & FULL IMAGE) */}
        <div className="bg-white/60 p-8 rounded-[45px] border border-orange-200/50 backdrop-blur-md shadow-xl flex flex-col transform hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-3 mb-6 text-[#4A2C2A]">
            <div className="p-2 bg-orange-100 rounded-xl text-orange-600"><Users size={20} /></div>
            <h2 className="font-black uppercase tracking-widest text-xs">Meet the Team</h2>
          </div>
          <div className="flex flex-col gap-6">
             {/* ASPECT RATIO FIX: Set to auto/contain to see the whole photo */}
             <div className="w-full bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-orange-100 p-2">
                <img 
                    src="/team.jpg" 
                    alt="Team" 
                    className="w-full h-auto object-contain rounded-2xl" 
                />
             </div>
             <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] font-black uppercase text-[#4A2C2A]/80 italic">
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500 shadow-sm"></div> 1. Rehaan</span>
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-400 shadow-sm"></div> 2. Manqoosh</span>
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500 shadow-sm"></div> 3. Tarooba</span>
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-400 shadow-sm"></div> 4. Fariya</span>
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500 shadow-sm"></div> 5. Zikra</span>
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-400 shadow-sm"></div> 6. Yameen</span>
             </div>
          </div>
        </div>
      </section>

      {/* THE "MISSING" ELEMENT: STATS BAR */}
      <div className="w-full max-w-5xl px-6 flex justify-between gap-4 py-8 border-y border-orange-200/30 my-4">
          <StatBox icon={<MapPin size={16}/>} label="Verified Points" val="50+" />
          <StatBox icon={<Shield size={16}/>} label="Legal Protections" val="16" />
          <StatBox icon={<Zap size={16}/>} label="Response Time" val="Fast" />
          <StatBox icon={<Globe size={16}/>} label="Valley Wide" val="Srinagar" />
      </div>

      {/* Main Action Grid */}
      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 mt-6">
        <NavCard icon={<MapPin size={32}/>} title="Locator" color="orange" onClick={() => onNavigate('map')} />
        <NavCard icon={<BookOpen size={32}/>} title="Guide" color="brown" onClick={() => onNavigate('guide')} />
        <NavCard icon={<Camera size={32}/>} title="Report" color="red" onClick={onOpenReport} />
        <NavCard icon={<Megaphone size={32}/>} title="Lost/Found" color="blue" onClick={() => onNavigate('lost')} />
      </div>

      {/* Volunteer Section */}
      <div className="max-w-5xl w-full px-6 mt-16">
        <div className="bg-[#4A2C2A] p-8 rounded-[50px] shadow-2xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-700"></div>
            <div className="w-20 h-20 bg-orange-500 text-white rounded-3xl flex items-center justify-center shrink-0 shadow-xl rotate-3 group-hover:rotate-12 transition-transform">
                <Heart size={40} fill="currentColor" />
            </div>
            <div className="text-center md:text-left flex-1 relative z-10">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Become a Volunteer</h3>
                <p className="text-orange-100/70 text-sm font-medium mt-1 leading-relaxed max-w-md">Join Srinagar's fastest-growing rescue network. Help us transport, foster, and protect local animals.</p>
            </div>
            <button onClick={onOpenVolunteer} className="bg-white hover:bg-orange-500 hover:text-white text-[#4A2C2A] px-12 py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all relative z-10">
                Join Now
            </button>
        </div>
      </div>

      {/* SOS Button */}
      <div className="fixed bottom-8 left-0 right-0 px-6 z-[1000] flex justify-center">
        <button onClick={onSOS} className="w-full max-w-2xl bg-[#D35400] p-6 rounded-[35px] shadow-[0_20px_50px_rgba(211,84,0,0.4)] flex items-center justify-between text-white border-b-8 border-orange-900/30 active:border-b-0 active:translate-y-2 transition-all group">
          <div className="flex items-center gap-5 text-left">
            <div className="p-3 bg-white/20 rounded-2xl animate-pulse"><AlertCircle size={32} /></div>
            <div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none">Emergency SOS</h3>
                <p className="text-[10px] font-black uppercase opacity-70 tracking-widest mt-1">Direct Help Line</p>
            </div>
          </div>
          <span className="bg-white text-[#D35400] px-8 py-3 rounded-2xl font-black text-[11px] tracking-widest uppercase shadow-lg group-hover:px-10 transition-all">Dial Now</span>
        </button>
      </div>
    </div>
  );
};

// Helper Components
const StatBox = ({ icon, label, val }: any) => (
    <div className="flex flex-col items-center text-center px-4 border-x border-orange-200/20 first:border-l-0 last:border-r-0">
        <div className="text-orange-500 mb-1">{icon}</div>
        <p className="text-[16px] font-black text-[#4A2C2A] leading-none uppercase">{val}</p>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{label}</p>
    </div>
);

const NavCard = ({ icon, title, color, onClick }: any) => {
  const colors: any = { orange: "bg-[#E67E22]", brown: "bg-[#4A2C2A]", red: "bg-[#C0392B]", blue: "bg-[#2980B9]" };
  return (
    <button onClick={onClick} className="bg-white p-10 rounded-[55px] shadow-xl border border-orange-50 hover:-translate-y-4 transition-all duration-500 group active:scale-95">
      <div className={`${colors[color]} text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform shadow-lg shadow-orange-900/10`}>{icon}</div>
      <h3 className="text-xl font-black text-slate-800 uppercase italic text-center tracking-tighter">{title}</h3>
    </button>
  );
};

export default HomePage;