import React, { useState } from 'react';
import { ArrowRight, Phone, User, MapPin, Loader2, ShieldCheck, Lock, Edit3 } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Onboarding = ({ onComplete }: { onComplete: (user: any) => void }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [region, setRegion] = useState('');
  const [customRegion, setCustomRegion] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const srinagarRegions = ["Lal Bazar", "Karan Nagar", "Hyderpora", "Soura", "Rajbagh", "Batamaloo", "Bemina", "Nowgam", "Hazratbal", "Khanyar", "Jawahar Nagar", "Other / Not Listed"];

  const generateHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; 
    }
    return "user_" + Math.abs(hash).toString(16);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) return alert("Enter valid number");
    setLoading(true);

    const secureHash = generateHash(phoneNumber);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('phone_hash', secureHash)
      .single();

    if (data) {
      await supabase.from('profiles').update({ last_login: new Date() }).eq('phone_hash', secureHash);
      onComplete(data);
    } else {
      setIsNewUser(true);
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Logic to determine which area to save
    const finalRegion = region === "Other / Not Listed" ? customRegion : region;
    
    if (!finalRegion) return alert("Please specify your area");
    setLoading(true);

    const secureHash = generateHash(phoneNumber);
    const newUser = {
      phone_hash: secureHash,
      full_name: fullName,
      geo_region: finalRegion,
      has_phone_access: true,
      last_login: new Date()
    };

    const { data, error } = await supabase.from('profiles').insert([newUser]).select().single();

    if (error) alert("Error creating profile. Please try again.");
    else onComplete(data);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-[#FFF8F0] flex items-center justify-center p-6 text-center overflow-y-auto font-sans">
      <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-500 my-auto">
        <div className="relative inline-block">
            <img src="/logo.png" className="w-32 h-32 mx-auto rounded-full shadow-2xl border-4 border-white object-cover" />
            <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-lg shadow-lg">
                <Lock size={16} />
            </div>
        </div>
        
        {!isNewUser ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
                <h1 className="text-3xl font-black text-[#4A2C2A] uppercase italic leading-none">OnePaw Portal</h1>
                <p className="text-orange-900/60 font-bold text-[10px] uppercase tracking-widest mt-2 flex items-center justify-center gap-1">
                    <ShieldCheck size={12} className="text-blue-500"/> Privacy Encrypted Login
                </p>
            </div>
            <div className="relative">
              <Phone className="absolute left-5 top-5 text-orange-400" size={20} />
              <input 
                type="tel" placeholder="Phone Number" 
                className="w-full p-5 pl-14 rounded-3xl border-2 border-orange-100 text-lg font-bold outline-none focus:border-orange-400 shadow-inner bg-white"
                value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required
              />
            </div>
            <button disabled={loading} className="w-full bg-[#E67E22] text-white p-5 rounded-3xl font-black uppercase shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all">
              {loading ? <Loader2 className="animate-spin"/> : "Enter Community"} <ArrowRight size={20}/>
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black text-[#4A2C2A] uppercase italic">Complete Your Profile</h2>
            
            <div className="text-left space-y-4">
                <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-tighter">Full Name</label>
                    <input 
                        type="text" placeholder="Your Name" 
                        className="w-full p-4 mt-1 rounded-2xl border-2 border-orange-100 font-bold outline-none focus:border-orange-400 bg-white shadow-sm"
                        value={fullName} onChange={(e) => setFullName(e.target.value)} required
                    />
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-tighter">Your Area in Srinagar</label>
                    <select 
                        className="w-full p-4 mt-1 rounded-2xl border-2 border-orange-100 font-bold outline-none focus:border-orange-400 bg-white shadow-sm cursor-pointer"
                        value={region} onChange={(e) => setRegion(e.target.value)} required
                    >
                        <option value="">Select Region</option>
                        {srinagarRegions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>

                {/* --- NEW CUSTOM AREA INPUT --- */}
                {region === "Other / Not Listed" && (
                    <div className="animate-in slide-in-from-top-2 duration-300">
                        <label className="text-[10px] font-black uppercase text-orange-600 ml-2 tracking-tighter italic">Specify your location</label>
                        <div className="relative">
                            <Edit3 className="absolute left-4 top-4 text-orange-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Enter city or locality name" 
                                className="w-full p-4 pl-12 mt-1 rounded-2xl border-2 border-orange-300 font-bold outline-none focus:border-orange-500 bg-orange-50/30"
                                value={customRegion} 
                                onChange={(e) => setCustomRegion(e.target.value)} 
                                required
                            />
                        </div>
                    </div>
                )}
            </div>

            <button disabled={loading} className="w-full bg-[#4A2C2A] text-white p-5 rounded-3xl font-black uppercase shadow-xl flex items-center justify-center gap-2 mt-4 active:scale-95 transition-all">
               {loading ? <Loader2 className="animate-spin"/> : "Finish Registration"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Onboarding;