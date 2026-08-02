import React from 'react';
import { 
  MapPin, BookOpen, AlertCircle, Shield, 
  Camera, Lock, UserCircle, Megaphone, Heart, Users, Info, Phone, Landmark, CheckCircle
} from 'lucide-react';

interface HomeProps {
  onNavigate: (view: any) => void;
  onOpenReport: () => void;
  onSOS: () => void;
  onOpenVolunteer: () => void;
}

const HomePage: React.FC<HomeProps> = ({ onNavigate, onOpenReport, onSOS, onOpenVolunteer }) => {
  const user = JSON.parse(localStorage.getItem('onepaw_user') || '{"name": "User"}');

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
    <div className="w-full min-h-screen bg-[#FFF8F0] pb-40 relative">
      
      {/* PROFESSIONAL TOP NAVBAR */}
      <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-[100] border-b border-orange-100 shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <img src="/logo.png" className="w-8 h-8 rounded-full" alt="logo" />
            <span className="font-black text-[#4A2C2A] uppercase italic tracking-tighter">OnePaw</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
            <button onClick={() => onNavigate('map')} className="text-[10px] font-black uppercase text-slate-500 hover:text-orange-600 transition-colors tracking-widest">Locator</button>
            <button onClick={() => onNavigate('guide')} className="text-[10px] font-black uppercase text-slate-500 hover:text-orange-600 transition-colors tracking-widest">Guide</button>
            <button onClick={() => onNavigate('lost')} className="text-[10px] font-black uppercase text-slate-500 hover:text-orange-600 transition-colors tracking-widest">Lost & Found</button>
            <div className="h-4 w-[1px] bg-slate-200"></div>
            <button onClick={() => onNavigate('profile')} className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-100 group">
                <UserCircle size={16} className="text-orange-600 group-hover:rotate-12 transition-transform" />
                <span className="text-[10px] font-black uppercase text-orange-900">{user.name}</span>
            </button>
            <button onClick={() => { const p = prompt("PIN:"); if(p === "1234") onNavigate('admin'); }} className="text-slate-300 hover:text-[#4A2C2A] transition-colors"><Lock size={16}/></button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-12 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
        
        {/* LEFT: About Us & University Credit */}
        <div className="bg-white/60 p-10 rounded-[50px] border border-orange-200 shadow-xl backdrop-blur-sm order-2 lg:order-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6 text-[#4A2C2A]">
                <div className="p-2 bg-orange-100 rounded-xl text-orange-600"><Info size={20} /></div>
                <h2 className="font-black uppercase tracking-widest text-xs">About Us</h2>
            </div>
            <p className="text-[#4A2C2A] text-sm leading-relaxed font-medium italic opacity-90">
                "OnePaw is a unified platform dedicated to improving animal welfare by connecting rescue efforts, 
                adoption services, and community support in one ecosystem. We aim to bridge the gap between 
                animals in need and people who care, using technology to make rescue, treatment, and 
                adoption faster, easier, and more accessible."
            </p>
          </div>
          
          <div className="mt-10 pt-6 border-t border-orange-100/50">
             <p className="text-[#4A2C2A] text-[11px] font-black uppercase tracking-wider mb-2">Developed By:</p>
             <div className="bg-[#4A2C2A] text-[#FFF8F0] p-6 rounded-3xl shadow-lg border border-white/10">
                <p className="text-xs font-bold leading-relaxed italic text-center">
                    "Made by the students of <span className="text-orange-400">Design your Degree</span>, University Of Kashmir, Group A"
                </p>
             </div>
          </div>
        </div>

        {/* CENTER: Brand */}
        <div className="text-center flex flex-col items-center justify-center order-1 lg:order-2">
          <div className="relative inline-block mb-10 group">
              <div className="w-56 h-56 rounded-full bg-white shadow-2xl border-[12px] border-white overflow-hidden flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover scale-110" />
              </div>
              <div className="absolute -bottom-2 right-6 bg-orange-500 text-white p-4 rounded-2xl shadow-2xl border-4 border-[#FFF8F0] animate-bounce">
                  <Shield size={28} fill="currentColor" />
              </div>
          </div>
          <h1 className="text-8xl font-black text-[#4A2C2A] tracking-tighter italic uppercase leading-none">OnePaw</h1>
          <p className="text-orange-900 font-black text-xs mt-6 uppercase tracking-[0.25em] max-w-[340px] leading-relaxed opacity-80">
            an Integrated Animal Welfare, Rescue and Support System
          </p>
        </div>

        {/* RIGHT: Meet the Team */}
        <div className="bg-white/60 p-10 rounded-[50px] border border-orange-200 shadow-xl backdrop-blur-sm order-3">
          <div className="flex items-center gap-2 mb-6 text-[#4A2C2A]">
            <div className="p-2 bg-orange-100 rounded-xl text-orange-600"><Users size={20} /></div>
            <h2 className="font-black uppercase tracking-widest text-xs">Meet the Team</h2>
          </div>
          <div className="flex flex-col gap-6">
             <div className="w-full bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-orange-50 p-2">
                <img src="/team.jpg" alt="Team" className="w-full h-auto object-contain rounded-2xl" />
             </div>
             <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] font-black uppercase text-[#4A2C2A]/80 italic">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> 1. Rehaan</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div> 2. Manqoosh</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> 3. Tarooba</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div> 4. Fariya</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> 5. Zikra</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div> 6. Yameen</span>
             </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS BUTTONS */}
      <div className="w-full max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
          <button onClick={onOpenReport} className="bg-[#C0392B] text-white p-6 rounded-[35px] flex items-center justify-between shadow-xl hover:bg-red-700 transition-all group active:scale-95">
              <div className="flex items-center gap-4"><div className="p-3 bg-white/10 rounded-2xl group-hover:rotate-12 transition-transform"><Camera size={24}/></div><div className="text-left"><h4 className="font-black italic uppercase text-lg leading-none">Report Stray</h4><p className="text-[10px] font-bold opacity-60 uppercase mt-1">Submit GPS Location</p></div></div>
              <div className="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Report</div>
          </button>
          <button onClick={onOpenVolunteer} className="bg-emerald-600 text-white p-6 rounded-[35px] flex items-center justify-between shadow-xl hover:bg-emerald-700 transition-all group active:scale-95">
              <div className="flex items-center gap-4"><div className="p-3 bg-white/10 rounded-2xl group-hover:rotate-12 transition-transform"><Heart size={24}/></div><div className="text-left"><h4 className="font-black italic uppercase text-lg leading-none">Join Network</h4><p className="text-[10px] font-bold opacity-60 uppercase mt-1">Become a Volunteer</p></div></div>
              <div className="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Join</div>
          </button>
      </div>

      {/* EMERGENCY DIRECTORY */}
      <section className="w-full max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl font-black text-[#4A2C2A] uppercase italic tracking-tighter mb-2">Emergency Directory</h2>
            <div className="h-1.5 w-24 bg-red-600 rounded-full"></div>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em] mt-4">J&K Animal Husbandry Department Contacts</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="bg-white rounded-[50px] p-8 shadow-2xl border border-orange-100">
                  <h3 className="text-xl font-black text-emerald-700 uppercase italic mb-6 border-b border-emerald-50 pb-4 flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600"><MapPin size={20}/></div> Kashmir Division (District Officers)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {contactData.kashmir.map(c => (
                          <ContactCard key={c.d} district={c.d} name={c.n} phone={c.p} />
                      ))}
                  </div>
              </div>

              <div className="bg-white rounded-[50px] p-8 shadow-2xl border border-orange-100">
                  <h3 className="text-xl font-black text-blue-700 uppercase italic mb-6 border-b border-blue-50 pb-4 flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-xl text-blue-600"><MapPin size={20}/></div> Jammu Division (District Officers)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {contactData.jammu.map(c => (
                          <ContactCard key={c.d} district={c.d} name={c.n} phone={c.p} />
                      ))}
                  </div>
              </div>
          </div>

          {/* Primary SOS Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <a href="tel:1962" className="bg-slate-900 p-10 rounded-[50px] text-white flex items-center justify-between hover:bg-black transition-all group">
                  <div className="flex items-center gap-8"><div className="w-20 h-20 bg-red-600 rounded-[35px] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform"><Phone size={36}/></div><div><h4 className="text-4xl font-black italic">1962</h4><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Animal Ambulance (Toll Free)</p></div></div>
                  <div className="bg-white/10 px-8 py-3 rounded-2xl font-black text-xs tracking-widest uppercase">Dial</div>
              </a>
              <a href="tel:112" className="bg-slate-900 p-10 rounded-[50px] text-white flex items-center justify-between hover:bg-black transition-all group">
                  <div className="flex items-center gap-8"><div className="w-20 h-20 bg-blue-600 rounded-[35px] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform"><Phone size={36}/></div><div><h4 className="text-4xl font-black italic">112</h4><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">National Emergency Helpline</p></div></div>
                  <div className="bg-white/10 px-8 py-3 rounded-2xl font-black text-xs tracking-widest uppercase">Dial</div>
              </a>
          </div>
      </section>

      {/* SOS BUTTON */}
      <div className="fixed bottom-8 left-0 right-0 px-6 z-[2000] flex justify-center pointer-events-none">
        <button onClick={onSOS} className="pointer-events-auto w-full max-w-2xl bg-[#D35400] p-6 rounded-[35px] shadow-[0_20px_60px_rgba(211,84,0,0.5)] flex items-center justify-between text-white active:scale-95 transition-all group border-b-8 border-orange-950/20">
          <div className="flex items-center gap-4 text-left">
            <AlertCircle size={32} className="animate-pulse" /> 
            <div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none">Emergency SOS Help</h3>
                <p className="text-[9px] font-bold uppercase opacity-70 tracking-widest mt-1 italic leading-none">Connect with Srinagar rescuers</p>
            </div>
          </div>
          <span className="bg-white text-[#D35400] px-8 py-2 rounded-2xl font-black text-[11px] tracking-widest uppercase shadow-lg group-hover:px-10 transition-all">Quick Call</span>
        </button>
      </div>

      <div className="mt-20 text-[10px] font-black text-slate-400 uppercase tracking-[0.6em]">
        Design your Degree • Group A
      </div>
    </div>
  );
};

const ContactCard = ({ district, name, phone }: any) => (
    <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex items-center justify-between hover:bg-white hover:shadow-md hover:border-orange-200 transition-all group">
        <div className="text-left">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{district}</p>
            <h5 className="font-bold text-slate-800 text-sm leading-tight mt-1">{name}</h5>
        </div>
        <a href={`tel:${phone}`} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm">
            <Phone size={14} fill="currentColor" />
        </a>
    </div>
);

export default HomePage;