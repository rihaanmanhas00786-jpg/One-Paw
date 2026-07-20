import React from 'react';
import { Phone, X, AlertCircle } from 'lucide-react';

const SOSModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  const helplines = [
    { n: "Animal Ambulance (Govt)", p: "1962", desc: "Toll Free Helpline" },
    { n: "PETA India Emergency", p: "9820122602", desc: "Animal Cruelty Reporting" },
    { n: "ARK Srinagar", p: "6006948448", desc: "Rescue & Rehab" },
    { n: "KAWF Srinagar", p: "6005331108", desc: "Welfare Foundation" },
    { n: "Dachigam Rescue", p: "7006692300", desc: "Wildlife Emergency" },
    { n: "National Emergency", p: "112", desc: "Police & Emergency" }
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden">
        <div className="bg-red-600 p-8 text-white text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
            <X size={20}/>
          </button>
          <AlertCircle className="mx-auto mb-4 animate-pulse" size={56} />
          <h2 className="text-3xl font-black tracking-tight">SOS EMERGENCY</h2>
          <p className="text-red-100 text-sm mt-1 opacity-90 font-medium">Click to call immediately</p>
        </div>
        <div className="p-6 space-y-3 bg-slate-50">
          {helplines.map((h, i) => (
            <a key={i} href={`tel:${h.p}`} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-3xl hover:border-red-500 hover:bg-red-50 transition-all group shadow-sm">
              <div>
                <h4 className="font-black text-slate-800 text-sm group-hover:text-red-600">{h.n}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{h.desc}</p>
              </div>
              <div className="bg-red-100 text-red-600 p-3 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Phone size={18} fill="currentColor" />
              </div>
            </a>
          ))}
          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-4">OnePaw Srinagar</p>
        </div>
      </div>
    </div>
  );
};

export default SOSModal;