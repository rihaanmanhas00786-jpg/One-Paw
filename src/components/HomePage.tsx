import React, { useState } from 'react';
import { 
  MapPin, BookOpen, AlertCircle, Shield, 
  Camera, Lock, UserCircle, Megaphone, Heart, Users, Info, Phone, Landmark, Menu, X, Star, GraduationCap, Zap
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
      { district: "Srinagar", name: "Dr. Bashir Ahmad", phone: "9419001805" },
      { district: "Budgam", name: "Dr. Ghulam Mohammad", phone: "7006073617" },
      { district: "Ganderbal", name: "Dr. Mushtaq Ahmad", phone: "9419081306" },
      { district: "Bandipora", name: "Dr. Abdul Rashid", phone: "7006665188" },
      { district: "Baramulla", name: "Dr. Manzoor Ahmad", phone: "9419035609" },
      { district: "Kupwara", name: "Dr. Shabir Ahmad", phone: "9622945732" },
      { district: "Anantnag", name: "Dr. Ghulam Nabi", phone: "9419048202" },
      { district: "Kulgam", name: "Dr. Mushtaq Ahmad", phone: "9419006420" },
      { district: "Shopian", name: "Dr. Gh. Mohideen Kumar", phone: "7006508341" },
      { district: "Pulwama", name: "Dr. Mohd Hussain Wani", phone: "9622670456" },
    ],
    jammu: [
      { district: "Jammu", name: "Dr. Yugal Kishore", phone: "7406205177" },
      { district: "Kathua", name: "Dr. Yugal Kishore", phone: "9419734724" },
      { district: "Samba", name: "Dr. Rahul Dev", phone: "9622265531" },
      { district: "Udhampur", name: "Dr. Sanjay Gupta", phone: "9419734724" },
      { district: "Reasi", name: "Dr. Ajay Sharma", phone: "9419105373" },
      { district: "Doda", name: "Dr. Irfan Ali Wani", phone: "9596727353" },
      { district: "Ramban", name: "Dr. Abdul Hamid", phone: "7006977856" },
      { district: "Kishtwar", name: "Dr. Abdul Majeed", phone: "7006827367" },
      { district: "Rajouri", name: "Dr. Ghulam Rasool Dar", phone: "7006280093" },
      { district: "Poonch", name: "Dr. Mohd Ashraf", phone: "9622265531" },
    ]
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF8F0] pb-40 relative font-sans">
      
      {/* NAVBAR */}
      <nav className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-[200] border-b border-orange-100 px-4 md:px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src="/logo.png" className="w-10 h-10 rounded-full border border-orange-100" alt="logo" />
            <span className="font-black text-[#4A2C2A] uppercase italic tracking-tighter text-xl">OnePaw</span>
        </div>
        
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
                <p className="text-sm font-bold text-slate-700 uppercase tracking-widest">Admin Access</p>
                <button onClick={handleAdminLogin} className="p-4 bg-white shadow-md rounded-2xl text-blue-500"><Lock size={20}/></button>
            </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
        
        {/* LEFT: About Us (RESTORED LONG TEXT) */}
        <div className="bg-white/60 p-8 md:p-10 rounded-[50px] border border-orange-200 shadow-xl backdrop-blur-sm order-2 lg:order-1 flex flex-col">
          <div className="flex items-center gap-3 mb-6 text-[#4A2C2A]">
              <div className="p-2.5 bg-orange-100 rounded-2xl text-orange-600 shadow-sm"><Info size={22} /></div>
              <h2 className="font-black uppercase tracking-widest text-xs leading-none">About Us</h2>
          </div>
          <div className="space-y-4 text-[#4A2C2A] text-[13px] leading-relaxed font-medium opacity-90 flex-1">
              <p>
                OnePaw is a comprehensive digital platform dedicated to transforming animal welfare by bringing together rescue operations, adoption services, veterinary care, donations, volunteering, and community support into one integrated ecosystem. Our mission is to bridge the gap between animals in need and compassionate individuals through innovative technology, making rescue, treatment, rehabilitation, fostering, and adoption faster, simpler, and more accessible for everyone involved.
              </p>
              <p>
                OnePaw offers a wide range of features designed to support both animals and the people who care for them. Users can locate nearby veterinary hospitals and clinics, report missing or found animals, request emergency rescue assistance, browse pets available for adoption, and access educational resources on responsible pet care.
              </p>
          </div>
          <div className="mt-8 pt-6 border-t border-orange-100/50 text-center">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Developed By:</p>
                <p className="text-[11px] font-bold text-[#4A2C2A] italic">
                    Students of <span className="text-orange-600 font-black">Design your Degree</span>,<br/> University Of Kashmir, Group A
                </p>
          </div>
        </div>

        {/* CENTER: Brand */}
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
          <p className="text-orange-900 font-black text-xs md:text-[13px] mt-6 uppercase tracking-[0.2em] max-w-[380px] leading-relaxed opacity-80 mx-auto text-center">
             An Integrated Animal Welfare, Rescue and Support System
          </p>
        </div>

        {/* RIGHT: Meet the Team */}
        <div className="bg-white/60 p-8 md:p-10 rounded-[50px] border border-orange-200 shadow-xl backdrop-blur-sm order-3">
          <div className="flex items-center gap-3 mb-6 text-[#4A2C2A]">
            <div className="p-2.5 bg-orange-100 rounded-2xl text-orange-600 shadow-sm"><Users size={22} /></div>
            <h2 className="font-black uppercase tracking-widest text-xs leading-none">The Team</h2>
          </div>
          <div className="flex flex-col gap-6">
             <div className="w-full bg-white rounded-[32px] overflow-hidden shadow-lg border-2 border-orange-50 p-2 transform hover:rotate-1 transition-transform">
                <img src="/team.jpg" alt="Team" className="w-full h-auto object-contain rounded-2xl" />
             </div>
             <div className="space-y-2 border-b border-orange-100 pb-4 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-[#4A2C2A]">
                    <GraduationCap size={14} className="text-orange-600"/>
                    <p className="text-[9px] font-black uppercase tracking-widest">Academic Supervisors</p>
                </div>
                <p className="text-[11px] font-bold text-slate-800 leading-tight">Prof. Syeda Afshana <span className="opacity-40 font-black ml-1">(Coordinator)</span></p>
                <p className="text-[11px] font-bold text-slate-800 leading-tight">Dr. Baasit Abubakr <span className="opacity-40 font-black ml-1">(Mentor)</span></p>
             </div>
             <div className="grid grid-cols-1 gap-y-2.5">
                <TeamMember name="Rehaan" role="Team Lead & Coding Management" />
                <TeamMember name="Manqoosh" role="Co-Lead & Database Architect" />
                <TeamMember name="Tarooba" role="UI/UX Design & Creative Lead" />
                <TeamMember name="Fariya" role="Research & Data Specialist" />
                <TeamMember name="Zikra" role="Quality Assurance & Testing" />
                <TeamMember name="Yameen" role="Outreach & Presentation" />
             </div>
          </div>
        </div>
      </section>

      {/* RESTORED: QUICK ACTION BARS (FROM SCREENSHOT) */}
      <div className="w-full max-w-4xl mx-auto px-4 space-y-4 mb-20">
          <button 
            onClick={onOpenReport} 
            className="w-full bg-[#C0392B] text-white p-6 md:p-8 rounded-[40px] flex items-center justify-between shadow-2xl hover:scale-[1.02] transition-all group active:scale-95"
          >
              <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl group-hover:rotate-12 transition-transform"><Camera size={28}/></div>
                  <div className="text-left">
                      <h4 className="font-black italic uppercase text-lg md:text-xl tracking-tighter leading-none">Report Incident</h4>
                      <p className="text-[10px] font-bold opacity-60 uppercase mt-1 tracking-widest leading-none">Submit Live GPS Location</p>
                  </div>
              </div>
              <div className="bg-white/20 px-6 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest group-hover:bg-white group-hover:text-[#C0392B] transition-all">Open</div>
          </button>

          <button 
            onClick={onOpenVolunteer} 
            className="w-full bg-[#16A085] text-white p-6 md:p-8 rounded-[40px] flex items-center justify-between shadow-2xl hover:scale-[1.02] transition-all group active:scale-95"
          >
              <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl group-hover:rotate-12 transition-transform"><Heart size={28} fill="white"/></div>
                  <div className="text-left">
                      <h4 className="font-black italic uppercase text-lg md:text-xl tracking-tighter leading-none">Join Network</h4>
                      <p className="text-[10px] font-bold opacity-60 uppercase mt-1 tracking-widest leading-none">Register as a Volunteer</p>
                  </div>
              </div>
              <div className="bg-white/20 px-6 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest group-hover:bg-white group-hover:text-[#16A085] transition-all">Join</div>
          </button>
      </div>

      {/* EMERGENCY DIRECTORY */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 py-10 border-t border-orange-200/30">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-[#4A2C2A] uppercase italic tracking-tighter mb-4 leading-none">Emergency Directory</h2>
            <div className="h-1.5 w-32 bg-red-600 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
              <div className="bg-white rounded-[60px] p-8 md:p-12 shadow-2xl border border-orange-100 relative overflow-hidden">
                  <h3 className="text-2xl font-black text-emerald-700 uppercase italic mb-10 border-b border-emerald-50 pb-6 flex items-center gap-4 relative z-10 leading-none">
                      <div className="p-3 bg-emerald-100 rounded-2xl"><MapPin size={24}/></div> Kashmir Division
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                      {contactData.kashmir.map((item, idx) => (
                          <ContactCard key={idx} {...item} />
                      ))}
                  </div>
              </div>

              <div className="bg-white rounded-[60px] p-8 md:p-12 shadow-2xl border border-orange-100 relative overflow-hidden">
                  <h3 className="text-2xl font-black text-blue-700 uppercase italic mb-10 border-b border-blue-50 pb-6 flex items-center gap-4 relative z-10 leading-none">
                      <div className="p-3 bg-blue-100 rounded-2xl"><MapPin size={24}/></div> Jammu Division
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                      {contactData.jammu.map((item, idx) => (
                          <ContactCard key={idx} {...item} />
                      ))}
                  </div>
              </div>
          </div>

          {/* RESTORED: MASTER SOS BUTTONS (FROM SCREENSHOT) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto">
              <a href="tel:1962" className="bg-[#1A1A2E] p-8 rounded-[45px] text-white flex items-center justify-between hover:bg-black transition-all group shadow-2xl border border-white/5">
                  <div className="flex items-center gap-8">
                    <div className="w-20 h-20 bg-[#E74C3C] rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform"><Phone size={36} fill="white"/></div>
                    <div className="text-left">
                        <h4 className="text-5xl font-black italic tracking-tighter leading-none">1962</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 leading-none">Animal Ambulance (Toll Free)</p>
                    </div>
                  </div>
                  <div className="bg-white/10 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest group-hover:bg-white group-hover:text-black transition-all">Dial</div>
              </a>
              
              <a href="tel:112" className="bg-[#1A1A2E] p-8 rounded-[45px] text-white flex items-center justify-between hover:bg-black transition-all group shadow-2xl border border-white/5">
                  <div className="flex items-center gap-8">
                    <div className="w-20 h-20 bg-[#3498DB] rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform"><Phone size={36} fill="white"/></div>
                    <div className="text-left">
                        <h4 className="text-5xl font-black italic tracking-tighter leading-none">112</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 leading-none">National Emergency Number</p>
                    </div>
                  </div>
                  <div className="bg-white/10 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest group-hover:bg-white group-hover:text-black transition-all">Dial</div>
              </a>
          </div>
      </section>

      {/* FLOATING SOS (BOTTOM) */}
      <div className="fixed bottom-8 left-0 right-0 px-6 z-[1000] flex justify-center pointer-events-none">
        <button onClick={onSOS} className="pointer-events-auto w-full max-w-2xl bg-[#D35400] p-6 rounded-[35px] shadow-[0_20px_60px_rgba(211,84,0,0.5)] flex items-center justify-between text-white active:scale-95 transition-all group border-b-8 border-orange-950/20">
          <div className="flex items-center gap-4 text-left leading-none">
            <AlertCircle size={32} className="animate-pulse" /> 
            <div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none">Emergency SOS Help</h3>
                <p className="text-[9px] font-bold uppercase opacity-70 tracking-widest mt-1 italic leading-none">Direct link to local responders</p>
            </div>
          </div>
          <span className="bg-white text-[#D35400] px-8 py-2 rounded-2xl font-black text-[11px] tracking-widest uppercase shadow-lg group-hover:px-10 transition-all">Quick Call</span>
        </button>
      </div>

    </div>
  );
};

// Sub-component: Individual Team Member
const TeamMember = ({ name, role }: { name: string, role: string }) => (
    <div className="flex items-start gap-3 group px-1">
        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shadow-sm group-hover:scale-150 transition-all"></div>
        <div>
            <p className="text-[11px] font-black text-slate-800 uppercase tracking-tighter leading-none">{name}</p>
            <p className="text-[9px] font-bold text-slate-400 mt-0.5 leading-tight">{role}</p>
        </div>
    </div>
);

const NavBtn = ({ label, onClick }: any) => (
  <button onClick={onClick} className="text-[10px] font-black uppercase text-slate-500 hover:text-orange-600 transition-all tracking-widest">{label}</button>
);

const MobileNavBtn = ({ icon, label, onClick }: any) => (
  <button onClick={onClick} className="flex items-center gap-4 p-5 bg-slate-50 rounded-3xl text-[#4A2C2A] font-bold text-sm hover:bg-orange-50 transition-all border border-slate-100 active:scale-95">
    <div className="text-orange-500 p-2 bg-white rounded-xl shadow-sm">{icon}</div>
    <span className="uppercase tracking-widest text-[10px] font-black">{label}</span>
  </button>
);

const ContactCard = ({ district, name, phone }: any) => (
    <div className="bg-slate-50 p-5 rounded-[28px] border border-slate-100 flex items-center justify-between hover:bg-white hover:shadow-xl hover:border-orange-100 transition-all group active:scale-95">
        <div className="text-left">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter leading-none mb-1">{district}</p>
            <h5 className="font-bold text-slate-800 text-[13px] leading-tight leading-none">{name}</h5>
        </div>
        <a href={`tel:${phone}`} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm"><Phone size={14} fill="currentColor" /></a>
    </div>
);

export default HomePage;