import React, { useState } from 'react';
import { Heart, X, Send, User, Phone, MapPin, CheckCircle2 } from 'lucide-react';

const VolunteerForm = ({ onClose }: { onClose: () => void }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a database. 
    // For the demo, we show a success message.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[10000] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm rounded-[40px] p-10 text-center shadow-2xl animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={32} fill="currentColor" />
          </div>
          <h2 className="text-2xl font-black uppercase italic text-slate-800">Welcome Aboard!</h2>
          <p className="text-slate-500 mt-2 font-medium leading-relaxed text-sm">
            Thank you for joining the OnePaw network. We will contact you when an animal in your area needs help.
          </p>
          <button onClick={onClose} className="mt-8 w-full bg-emerald-600 text-white p-4 rounded-2xl font-bold uppercase tracking-widest text-xs active:scale-95 transition-all">
            Start Helping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-[40px] overflow-hidden shadow-2xl my-auto">
        <div className="bg-emerald-600 p-8 text-white relative text-center">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
            <X size={20}/>
          </button>
          <Heart size={48} className="mx-auto mb-4 fill-white animate-pulse" />
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">Volunteer Registry</h2>
          <p className="text-emerald-100 text-[10px] mt-1 font-bold uppercase tracking-widest">Join the Srinagar Rescue Network</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Full Name</label>
            <div className="relative">
                <User className="absolute left-4 top-3.5 text-slate-400" size={18}/>
                <input type="text" placeholder="Your Name" className="w-full pl-12 p-4 bg-slate-100 rounded-2xl border-none text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Phone</label>
                <div className="relative">
                    <Phone className="absolute left-4 top-3.5 text-slate-400" size={18}/>
                    <input type="tel" placeholder="Mobile No." className="w-full pl-12 p-4 bg-slate-100 rounded-2xl border-none text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500" required />
                </div>
            </div>
            <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Area</label>
                <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 text-slate-400" size={18}/>
                    <input type="text" placeholder="e.g. Soura" className="w-full pl-12 p-4 bg-slate-100 rounded-2xl border-none text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500" required />
                </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">I can help with:</label>
            <div className="grid grid-cols-2 gap-2">
                {['Transport', 'Temporary Foster', 'First Aid', 'Food Donation'].map((skill) => (
                    <label key={skill} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors border border-transparent has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50">
                        <input type="checkbox" className="w-4 h-4 accent-emerald-600" />
                        <span className="text-xs font-bold text-slate-600">{skill}</span>
                    </label>
                ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-slate-900 hover:bg-emerald-600 text-white p-5 rounded-3xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl mt-4">
            <CheckCircle2 size={18}/> Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;