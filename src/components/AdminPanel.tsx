import React, { useState, useEffect } from 'react';
import { ChevronLeft, ShieldCheck, Send, Trash2, Clock, MapPin } from 'lucide-react';

const AdminPanel = ({ onBack }: { onBack: () => void }) => {
  const [reports, setReports] = useState<any[]>([]);
  useEffect(() => { setReports(JSON.parse(localStorage.getItem('onepaw_reports') || '[]')); }, []);

  const forward = (r: any) => {
    const msg = `*EMERGENCY REPORT - ONEPAW*%0A*From:* ${r.userName}%0A*Type:* ${r.type}%0A*Details:* ${r.details}%0A*Loc:* ${r.location}`;
    window.open(`https://wa.me/916006948448?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 overflow-y-auto">
      <div className="p-6 bg-slate-900 flex items-center justify-between sticky top-0 z-50 border-b border-slate-800">
        <button onClick={onBack} className="p-3 bg-slate-800 rounded-2xl flex items-center gap-2 text-xs font-black uppercase tracking-widest"><ChevronLeft size={18}/> Back</button>
        <h1 className="font-black text-xl italic text-blue-500">ADMIN CONTROL</h1>
        <ShieldCheck className="text-blue-500" size={24} />
      </div>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {reports.map((r, i) => (
          <div key={i} className="bg-slate-900 p-8 rounded-[40px] border border-slate-800 shadow-2xl">
            <div className="flex justify-between mb-6"><span className="bg-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase">{r.type}</span><span className="text-[10px] text-slate-500 font-mono italic">By: {r.userName}</span></div>
            <p className="text-lg text-slate-200 font-medium mb-8 leading-relaxed">"{r.details}"</p>
            <div className="flex items-center gap-3 text-xs text-slate-400 mb-8 bg-slate-950 p-4 rounded-3xl border border-slate-800/50"><MapPin size={16} className="text-red-500"/><span>{r.location}</span></div>
            <div className="flex gap-3"><button onClick={() => forward(r)} className="flex-1 bg-white text-slate-950 py-4 rounded-3xl font-black text-xs uppercase flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all hover:bg-blue-500 hover:text-white"><Send size={16}/> Forward to Rescuers</button>
            <button onClick={() => { const up = reports.filter((_, idx) => idx !== i); setReports(up); localStorage.setItem('onepaw_reports', JSON.stringify(up)); }} className="p-4 bg-slate-800 text-red-500 rounded-3xl border border-slate-700 active:scale-95"><Trash2 size={20}/></button></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminPanel;