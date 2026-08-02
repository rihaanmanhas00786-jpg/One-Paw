import React, { useState } from 'react';
import { 
  MapPin, BookOpen, AlertCircle, Shield, 
  Camera, Lock, UserCircle, Megaphone, Heart, Users, Info, Phone, Landmark, CheckCircle, Menu, X 
} from 'lucide-react';

interface HomeProps {
  onNavigate: (view: any) => void;
  onOpenReport: () => void;
  onSOS: () => void;
  onOpenVolunteer: () => void;
}

const HomePage: React.FC<HomeProps> = ({ onNavigate, onOpenReport, onSOS, onOpenVolunteer }) => {
  const user = JSON.parse(localStorage.getItem('onepaw_user') || '{"name": "User"}');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAdminLogin = () => {
    const pin = prompt("Enter Security PIN:");
    if (pin === "Synergy*00642") {
      onNavigate('admin');
    } else if (pin !== null) {
      alert("Unauthorized Access Denied.");
    }
  };

  const contactData = {
    kashmir: [
      { d: "Srinagar", n: "Dr. Bashir Ahmad", p: "9419001805" },
      { d: "Budgam", n: "Dr. Ghulam Mohammad", p: "7006073617" },
      { d: "Ganderbal", n: "Dr. Mushtaq Ahmad", p: "9419081306" },
      { d: "Bandipora", n: "Dr. Abdul Rashid", p: "7006665188" },
      { d: "Baramulla", n: "Dr. Manzoor Ahmad", p: "9419035609" },
    ],
    jammu: [
      { d: "Jammu", n: "Dr. Yugal Kishore", p: "7406205177" },
      { d: "Kathua", n: "Dr. Yugal Kishore", p: "9419734724" },
      { d: "Samba", n: "Dr. Rahul Dev", p: "9622265531" },
    ]
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF8F0] pb-40 relative">
      
      {/* MOBILE & DESKTOP NAVBAR */}
      <nav className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-[200] border-b border-orange-100 shadow-sm px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <img src="/logo.png" className="w-8 h-8 rounded-full border border-orange-100" alt="logo" />
            <span className="font-black text-[#4A2C2A] uppercase italic tracking-tighter text-lg">OnePaw</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
            <NavBtn label="Locator" onClick={() => onNavigate('map')} />
            <NavBtn label="Guide" onClick={() => onNavigate('guide')} />
            <NavBtn label="Lost & Found" onClick={() => onNavigate('lost')} />
            <div className="h-4 w-[1px] bg-slate-200"></div>
            <button onClick={() => onNavigate('profile')} className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
                <UserCircle size={16} className="text-orange-600" />
                <span className="text-[10px] font-black uppercase text-orange-900">{user.name}</span>
            </button>
            <button onClick={handleAdminLogin} className="text-slate-300 hover:text-[#4A2C2A]"><Lock size={16}/></button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[#4A2C2A] bg-orange-50 rounded-xl">
          {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </nav>

      {/* MOBILE DROPDOWN MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-white z-[150] p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 md:hidden">
            <MobileNavBtn icon={<MapPin size={18}/>} label="Verified Locator" onClick={() => { onNavigate('map'); setIsMenuOpen(false); }} />
            <MobileNavBtn icon={<BookOpen size={18}/>} label="Knowledge Hub" onClick={() => { onNavigate('guide'); setIsMenuOpen(false); }} />
            <MobileNavBtn icon={<Megaphone size={18}/>} label="Lost & Found" onClick={() => { onNavigate('lost'); setIsMenuOpen(false); }} />
            <MobileNavBtn icon={<UserCircle size={18}/>} label="My Profile" onClick={() => { onNavigate('profile'); setIsMenuOpen(false); }} />
            <div className="mt-auto border-t pt-6 flex justify-between items-center">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Administrator</p>
                <button onClick={handleAdminLogin} className="p-3 bg-slate-100 rounded-2xl text-slate-400"><Lock size={20}/></button>
            </div>
        </div>
      )}

      {/* HERO SECTION - Responsive Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-8 md:pt-12 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* CENTER COLUMN (Logo) - Moved to top on mobile for visual impact */}
        <div className="text-center flex flex-col items-center justify-center order-1 lg:order-2 mb-4 md:mb-0">
          <div className="relative inline-block mb-6 md:mb-10">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-white shadow-2xl border-[8px] md:border-[12px] border-white overflow-hidden flex items-center justify-center">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover scale-110" />
              </div>
              <div className="absolute -bottom-2 right-4 bg-orange-500 text-white p-3 md:p-4 rounded-2xl shadow-2xl border-4 border-[#FFF8F0] animate-bounce">
                  <Shield size={20} fill="currentColor" />
              </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-[#4A2C2A] tracking-tighter italic uppercase leading-none">OnePaw</h1>
          <p className="text-orange-900 font-black text-[10px] md:text-xs mt-4 uppercase tracking-[0.2em] max-w-[280px] md:max-w-[340px] leading-relaxed opacity-80 mx-auto">
            an Integrated Animal Welfare, Rescue and Support System
          </p>
        </div>

        {/* LEFT: About Us */}
        <div className="bg-white/60 p-6 md:p-10 rounded-[40px] md:rounded-[50px] border border-orange-200 shadow-xl backdrop-blur-sm order-2 lg:order-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 md:mb-6 text-[#4A2C2A]">
                <div className="p-2 bg-orange-100 rounded-xl text-orange-600"><Info size={18} /></div>
                <h2 className="font-black uppercase tracking-widest text-[10px]">About Us</h2>
            </div>
            <p className="text-[#4A2C2A] text-xs md:text-sm leading-relaxed font-medium italic opacity-90">
                "OnePaw is a unified platform dedicated to improving animal welfare by connecting rescue efforts, 
                adoption services, and community support in one ecosystem."
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-orange-100/50">
             <div className="bg-[#4A2C2A] text-[#FFF8F0] p-5 rounded-3xl shadow-lg">
                <p className="text-[10px] md:text-xs font-bold leading-relaxed italic text-center">
                    "Made by the students of <span className="text-orange-400">Design your Degree</span>, University Of Kashmir, Group A"
                </p>
             </div>
          </div>
        </div>

        {/* RIGHT: Meet the Team */}
        <div className="bg-white/60 p-6 md:p-10 rounded-[40px] md:rounded-[50px] border border-orange-200 shadow-xl backdrop-blur-sm order-3">
          <div className="flex items-center gap-2 mb-6 text-[#4A2C2A]">
            <div className="p-2 bg-orange-100 rounded-xl text-orange-600"><Users size={18} /></div>
            <h2 className="font-black uppercase tracking-widest text-[10px]">Meet the Team</h2>
          </div>
          <div className="flex flex-col gap-6">
             <div className="w-full bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-orange-50 p-1">
                <img src="/team.jpg" alt="Team" className="w-full h-auto object-contain rounded-2xl" />
             </div>
             <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-[9px] md:text-[11px] font-black uppercase text-[#4A2C2A]/80 italic">
                <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> 1. Rehaan</span>
                <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div> 2. Manqoosh</span>
                <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> 3. Tarooba</span>
                <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div> 4. Fariya</span>
                <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> 5. Zikra</span>
                <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div> 6. Yameen</span>
             </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <div className="w-full max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
          <button onClick={onOpenReport} className="bg-[#C0392B] text-white p-5 md:p-6 rounded-[30px] md:rounded-[35px] flex items-center justify-between shadow-xl active:scale-95 transition-all group">
              <div className="flex items-center gap-4"><Camera size={24}/><div className="text-left"><h4 className="font-black italic uppercase text-sm md:text-lg leading-none">Report Stray</h4><p className="text-[9px] font-bold opacity-60 uppercase mt-1">Submit GPS Location</p></div></div>
              <div className="bg-white/10 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase">Report</div>
          </button>
          <button onClick={onOpenVolunteer} className="bg-emerald-600 text-white p-5 md:p-6 rounded-[30px] md:rounded-[35px] flex items-center justify-between shadow-xl active:scale-95 transition-all group">
              <div className="flex items-center gap-4"><Heart size={24}/><div className="text-left"><h4 className="font-black italic uppercase text-sm md:text-lg leading-none">Join Network</h4><p className="text-[9px] font-bold opacity-60 uppercase mt-1">Become a Volunteer</p></div></div>
              <div className="bg-white/10 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase">Join</div>
          </button>
      </div>

      {/* EMERGENCY DIRECTORY */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 py-10">
          <div className="flex flex-col items-center mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-[#4A2C2A] uppercase italic tracking-tighter mb-2">Emergency Directory</h2>
            <div className="h-1 w-20 bg-red-600 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="bg-white rounded-[40px] p-6 md:p-8 shadow-xl border border-orange-100">
                  <h3 className="text-lg font-black text-emerald-700 uppercase italic mb-6 border-b pb-4">Kashmir Division</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {contactData.kashmir.map(c => <ContactCard key={c.d} {...c} />)}
                  </div>
              </div>
              <div className="bg-white rounded-[40px] p-6 md:p-8 shadow-xl border border-orange-100">
                  <h3 className="text-lg font-black text-blue-700 uppercase italic mb-6 border-b pb-4">Jammu Division</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {contactData.jammu.map(c => <ContactCard key={c.d} {...c} />)}
                  </div>
              </div>
          </div>
      </section>

      {/* FLOATING SOS BUTTON */}
      <div className="fixed bottom-6 left-0 right-0 px-4 z-[500] flex justify-center pointer-events-none">
        <button onClick={onSOS} className="pointer-events-auto w-full max-w-md bg-[#D35400] p-5 rounded-full shadow-2xl flex items-center justify-between text-white active:scale-95 transition-all group">
          <div className="flex items-center gap-3">
            <AlertCircle size={24} className="animate-pulse" /> 
            <h3 className="text-lg font-black uppercase tracking-tighter italic">SOS HELP</h3>
          </div>
          <span className="bg-white text-[#D35400] px-6 py-2 rounded-full font-black text-[10px] tracking-widest uppercase">Call Now</span>
        </button>
      </div>
    </div>
  );
};

const NavBtn = ({ label, onClick }: any) => (
  <button onClick={onClick} className="text-[10px] font-black uppercase text-slate-500 hover:text-orange-600 transition-colors tracking-widest">{label}</button>
);

const MobileNavBtn = ({ icon, label, onClick }: any) => (
  <button onClick={onClick} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-[#4A2C2A] font-bold text-sm hover:bg-orange-50 transition-colors">
    <div className="text-orange-500">{icon}</div>
    <span className="uppercase tracking-widest">{label}</span>
  </button>
);

const ContactCard = ({ d, n, p }: any) => (
    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between group">
        <div className="text-left"><p className="text-[8px] font-black text-slate-400 uppercase">{d}</p><h5 className="font-bold text-slate-800 text-xs mt-0.5">{n}</h5></div>
        <a href={`tel:${p}`} className="p-2.5 bg-white border rounded-xl text-slate-400 group-hover:bg-green-600 group-hover:text-white transition-all"><Phone size={12}/></a>
    </div>
);

export default HomePage;