import React, { useState } from 'react';
import { 
  MapPin, BookOpen, AlertCircle, Shield, 
  Camera, Lock, UserCircle, Megaphone, Heart, Users, Info, Phone, Landmark, Menu, X 
} from 'lucide-react';

interface HomeProps {
  onNavigate: (view: any) => void;
  onOpenReport: () => void;
  onSOS: () => void;
  onOpenVolunteer: () => void;
}

const HomePage: React.FC<HomeProps> = ({ onNavigate, onOpenReport, onSOS, onOpenVolunteer }) => {
  const user = JSON.parse(localStorage.getItem('onepaw_user') || '{"full_name": "User"}');
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
      { d: "Kupwara", n: "Dr. Shabir Ahmad", p: "9622945732" },
      { d: "Anantnag", n: "Dr. Ghulam Nabi", p: "9419048202" },
      { d: "Kulgam", n: "Dr. Mushtaq Ahmad", p: "9419006420" },
      { d: "Shopian", n: "Dr. Gh. Mohideen Kumar", p: "7006508341" },
      { d: "Pulwama", n: "Dr. Mohd Hussain Wani", p: "9622670456" },
    ],
    jammu: [
      { d: "Jammu", n: "Dr. Yugal Kishore", p: "7406205177" },
      { d: "Kathua", n: "Dr. Yugal Kishore", p: "9419734724" },
      { d: "Samba", n: "Dr. Rahul Dev", p: "9622265531" },
      { d: "Udhampur", n: "Dr. Sanjay Gupta", p: "9419734724" },
      { d: "Reasi", n: "Dr. Ajay Sharma", p: "9419105373" },
      { d: "Doda", n: "Dr. Irfan Ali Wani", p: "9596727353" },
      { d: "Ramban", n: "Dr. Abdul Hamid", p: "7006977856" },
      { d: "Kishtwar", n: "Dr. Abdul Majeed", p: "7006827367" },
      { d: "Rajouri", n: "Dr. Ghulam Rasool Dar", p: "7006280093" },
      { d: "Poonch", n: "Dr. Mohd Ashraf", p: "9622265531" },
    ]
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF8F0] pb-40 relative font-sans">
      
      {/* NAVBAR */}
      <nav className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-[200] border-b border-orange-100 px-4 md:px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
            <img src="/logo.png" className="w-10 h-10 rounded-full border border-orange-100" alt="logo" />
            <span className="font-black text-[#4A2C2A] uppercase italic tracking-tighter text-xl">OnePaw</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
            <NavBtn label="Locator" onClick={() => onNavigate('map')} />
            <NavBtn label="Guide" onClick={() => onNavigate('guide')} />
            <NavBtn label="Lost & Found" onClick={() => onNavigate('lost')} />
            <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>
            <button onClick={() => onNavigate('profile')} className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-100 hover:bg-orange-100 transition-all group">
                <UserCircle size={18} className="text-orange-600 group-hover:rotate-12 transition-transform" />
                <span className="text-[10px] font-black uppercase text-orange-900 tracking-wider">{user.full_name || user.name}</span>
            </button>
            <button onClick={handleAdminLogin} className="text-slate-300 hover:text-blue-600 transition-colors"><Lock size={18}/></button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[#4A2C2A] bg-orange-50 rounded-xl">
          {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-white z-[150] p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 md:hidden">
            <MobileNavBtn icon={<MapPin size={20}/>} label="Verified Locator" onClick={() => { onNavigate('map'); setIsMenuOpen(false); }} />
            <MobileNavBtn icon={<BookOpen size={20}/>} label="Knowledge Hub" onClick={() => { onNavigate('guide'); setIsMenuOpen(false); }} />
            <MobileNavBtn icon={<Megaphone size={20}/>} label="Lost & Found" onClick={() => { onNavigate('lost'); setIsMenuOpen(false); }} />
            <MobileNavBtn icon={<UserCircle size={20}/>} label="My Profile" onClick={() => { onNavigate('profile'); setIsMenuOpen(false); }} />
            <div className="mt-auto border-t pt-8 flex justify-between items-center bg-slate-50 p-6 rounded-[32px]">
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Security</p>
                  <p className="text-sm font-bold text-slate-700">Administrator Access</p>
                </div>
                <button onClick={handleAdminLogin} className="p-4 bg-white shadow-md rounded-2xl text-blue-500"><Lock size={20}/></button>
            </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
        
        {/* LEFT: About Us (RESTORED FULL TEXT) */}
        <div className="bg-white/60 p-8 md:p-10 rounded-[50px] border border-orange-200 shadow-xl backdrop-blur-sm order-2 lg:order-1 flex flex-col">
          <div className="flex items-center gap-3 mb-6 text-[#4A2C2A]">
              <div className="p-2.5 bg-orange-100 rounded-2xl text-orange-600 shadow-sm"><Info size={22} /></div>
              <h2 className="font-black uppercase tracking-widest text-xs">About Us</h2>
          </div>
          <p className="text-[#4A2C2A] text-sm leading-relaxed font-medium italic opacity-90 flex-1">
              "OnePaw is a unified platform dedicated to improving animal welfare by connecting rescue efforts, 
              adoption services, and community support in one ecosystem. We aim to bridge the gap between 
              animals in need and people who care, using technology to make rescue, treatment, and 
              adoption faster, easier, and more accessible."
          </p>
          <div className="mt-10 pt-8 border-t border-orange-100/50">
             <p className="text-[#4A2C2A] text-[10px] font-black uppercase tracking-[0.2em] mb-3 opacity-50">Developed By:</p>
             <div className="bg-[#4A2C2A] text-[#FFF8F0] p-6 rounded-[32px] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                <p className="text-xs font-bold leading-relaxed italic text-center relative z-10">
                    "Made by the students of <span className="text-orange-400">Design your Degree</span>, University Of Kashmir, Group A"
                </p>
             </div>
          </div>
        </div>

        {/* CENTER: Brand (RESTORED SUBTITLE) */}
        <div className="text-center flex flex-col items-center justify-center order-1 lg:order-2 py-6">
          <div className="relative inline-block mb-10 group">
              <div className="w-52 h-52 md:w-64 md:h-64 rounded-full bg-white shadow-2xl border-[12px] border-white overflow-hidden flex items-center justify-center transform group-hover:scale-105 transition-all duration-500">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 right-8 bg-orange-500 text-white p-4 rounded-2xl shadow-2xl border-4 border-[#FFF8F0] animate-bounce">
                  <Shield size={24} fill="currentColor" />
              </div>
          </div>
          <h1 className="text-7xl md:text-8xl font-black text-[#4A2C2A] tracking-tighter italic uppercase leading-none">OnePaw</h1>
          <p className="text-orange-900 font-black text-xs md:text-sm mt-6 uppercase tracking-[0.2em] max-w-[360px] leading-relaxed opacity-80 mx-auto">
             An Integrated Animal Welfare, Rescue and Support System
          </p>
        </div>

        {/* RIGHT: Meet the Team (RESTORED FULL IMAGE & NAMES) */}
        <div className="bg-white/60 p-8 md:p-10 rounded-[50px] border border-orange-200 shadow-xl backdrop-blur-sm order-3">
          <div className="flex items-center gap-3 mb-6 text-[#4A2C2A]">
            <div className="p-2.5 bg-orange-100 rounded-2xl text-orange-600 shadow-sm"><Users size={22} /></div>
            <h2 className="font-black uppercase tracking-widest text-xs">Meet the Team</h2>
          </div>
          <div className="flex flex-col gap-6">
             <div className="w-full bg-white rounded-[32px] overflow-hidden shadow-lg border-2 border-orange-50 p-2">
                <img src="/team.jpg" alt="Team" className="w-full h-auto object-contain rounded-2xl" />
             </div>
             <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[10px] md:text-[11px] font-black uppercase text-[#4A2C2A]/80 italic">
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

      {/* EMERGENCY DIRECTORY (RESTORED ALL 20 DISTRICTS) */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 py-16 border-t border-orange-200/30">
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-[#4A2C2A] uppercase italic tracking-tighter mb-4">Emergency Directory</h2>
            <div className="h-1.5 w-32 bg-red-600 rounded-full mb-6"></div>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.5em] leading-relaxed">Official Animal Husbandry Department Contacts</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
              {/* Kashmir Division */}
              <div className="bg-white rounded-[50px] p-8 md:p-12 shadow-2xl border border-orange-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 text-emerald-50 -z-0"><Landmark size={120}/></div>
                  <h3 className="text-2xl font-black text-emerald-700 uppercase italic mb-8 border-b border-emerald-50 pb-6 flex items-center gap-4 relative z-10">
                      <div className="p-3 bg-emerald-100 rounded-2xl shadow-inner"><MapPin size={24}/></div> Kashmir Division
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                      {contactData.kashmir.map(c => <ContactCard key={c.d} {...c} />)}
                  </div>
              </div>

              {/* Jammu Division */}
              <div className="bg-white rounded-[50px] p-8 md:p-12 shadow-2xl border border-orange-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 text-blue-50 -z-0"><Landmark size={120}/></div>
                  <h3 className="text-2xl font-black text-blue-700 uppercase italic mb-8 border-b border-blue-50 pb-6 flex items-center gap-4 relative z-10">
                      <div className="p-3 bg-blue-100 rounded-2xl shadow-inner"><MapPin size={24}/></div> Jammu Division
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                      {contactData.jammu.map(c => <ContactCard key={c.d} {...c} />)}
                  </div>
              </div>
          </div>

          {/* Primary SOS Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <a href="tel:1962" className="bg-slate-900 p-10 rounded-[50px] text-white flex items-center justify-between hover:bg-black transition-all group shadow-2xl">
                  <div className="flex items-center gap-8"><div className="w-20 h-20 bg-red-600 rounded-[35px] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform"><Phone size={36} fill="white"/></div><div><h4 className="text-4xl font-black italic tracking-tighter">1962</h4><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Animal Ambulance (Toll Free)</p></div></div>
                  <div className="bg-white/10 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest">Call</div>
              </a>
              <a href="tel:112" className="bg-slate-900 p-10 rounded-[50px] text-white flex items-center justify-between hover:bg-black transition-all group shadow-2xl">
                  <div className="flex items-center gap-8"><div className="w-20 h-20 bg-blue-600 rounded-[35px] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform"><Phone size={36} fill="white"/></div><div><h4 className="text-4xl font-black italic tracking-tighter">112</h4><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">National Emergency Number</p></div></div>
                  <div className="bg-white/10 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest">Call</div>
              </a>
          </div>
      </section>

      {/* QUICK ACTION BUTTONS */}
      <div className="w-full max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-32">
          <button onClick={onOpenReport} className="bg-[#C0392B] text-white p-6 md:p-8 rounded-[40px] flex items-center justify-between shadow-2xl hover:bg-red-700 transition-all group active:scale-95">
              <div className="flex items-center gap-5"><div className="p-4 bg-white/10 rounded-2xl group-hover:rotate-12 transition-transform"><Camera size={28}/></div><div className="text-left"><h4 className="font-black italic uppercase text-lg md:text-xl tracking-tighter leading-none">Report Incident</h4><p className="text-[10px] font-bold opacity-60 uppercase mt-1 tracking-widest">Submit Live GPS Location</p></div></div>
              <div className="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Open</div>
          </button>
          <button onClick={onOpenVolunteer} className="bg-emerald-600 text-white p-6 md:p-8 rounded-[40px] flex items-center justify-between shadow-2xl hover:bg-emerald-700 transition-all group active:scale-95">
              <div className="flex items-center gap-5"><div className="p-4 bg-white/10 rounded-2xl group-hover:rotate-12 transition-transform"><Heart size={28} fill="white"/></div><div className="text-left"><h4 className="font-black italic uppercase text-lg md:text-xl tracking-tighter leading-none">Join Network</h4><p className="text-[10px] font-bold opacity-60 uppercase mt-1 tracking-widest">Register as a Volunteer</p></div></div>
              <div className="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Join</div>
          </button>
      </div>

      {/* STICKY BOTTOM SOS */}
      <div className="fixed bottom-8 left-0 right-0 px-6 z-[1000] flex justify-center pointer-events-none">
        <button onClick={onSOS} className="pointer-events-auto w-full max-w-2xl bg-[#D35400] p-6 rounded-[35px] shadow-[0_20px_60px_rgba(211,84,0,0.5)] flex items-center justify-between text-white active:scale-95 transition-all group border-b-8 border-orange-950/20">
          <div className="flex items-center gap-4 text-left">
            <AlertCircle size={32} className="animate-pulse" /> 
            <div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none">Emergency SOS Help</h3>
                <p className="text-[9px] font-bold uppercase opacity-70 tracking-widest mt-1 italic leading-none">Click to Connect with Srinagar rescuers</p>
            </div>
          </div>
          <span className="bg-white text-[#D35400] px-8 py-2 rounded-2xl font-black text-[11px] tracking-widest uppercase shadow-lg group-hover:px-10 transition-all">Quick Call</span>
        </button>
      </div>

      <footer className="w-full text-center py-10 opacity-30">
          <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#4A2C2A]">Design Your Degree • University of Kashmir</p>
      </footer>
    </div>
  );
};

const NavBtn = ({ label, onClick }: any) => (
  <button onClick={onClick} className="text-[10px] font-black uppercase text-slate-500 hover:text-orange-600 transition-colors tracking-widest">{label}</button>
);

const MobileNavBtn = ({ icon, label, onClick }: any) => (
  <button onClick={onClick} className="flex items-center gap-4 p-5 bg-slate-50 rounded-3xl text-[#4A2C2A] font-bold text-sm hover:bg-orange-50 transition-all border border-slate-100">
    <div className="text-orange-500 p-2 bg-white rounded-xl shadow-sm">{icon}</div>
    <span className="uppercase tracking-widest text-xs font-black">{label}</span>
  </button>
);

const ContactCard = ({ district, name, phone }: any) => (
    <div className="bg-slate-50 p-4 rounded-[28px] border border-slate-100 flex items-center justify-between hover:bg-white hover:shadow-xl hover:border-orange-100 transition-all group active:scale-95">
        <div className="text-left"><p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{district}</p><h5 className="font-bold text-slate-800 text-xs mt-1 leading-tight">{name}</h5></div>
        <a href={`tel:${phone}`} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm"><Phone size={14} fill="currentColor" /></a>
    </div>
);

export default HomePage;