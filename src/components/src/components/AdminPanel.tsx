import React, { useState, useEffect } from 'react';
import { ChevronLeft, ShieldCheck, Send, Trash2, Clock, MapPin } from 'lucide-react';
import { AnimalReport } from '../types';

const AdminPanel = ({ onBack }: { onBack: () => void }) => {
  const [reports, setReports] = useState<AnimalReport[]>([]);

  // Load saved reports from browser storage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('onepaw_reports') || '[]');
    setReports(saved);
  }, []);

  const forwardReport = (report: AnimalReport) => {
    // Generates a professional WhatsApp message
    const message = `*ONEPAW SRINAGAR - EMERGENCY REPORT*%0A%0A` +
                    `*Case Type:* ${report.type}%0A` +
                    `*Details:* ${report.details}%0A` +
                    `*Detected Location:* ${report.location}%0A` +
                    `*Reported At:* ${report.timestamp}%0A%0A` +
                    `_Sent via OnePaw Admin Panel_`;
    
    // Forwards to ARK Rescue (Example number)
    window.open(`https://wa.me/916006948448?text=${message}`, '_blank');
  };

  const deleteReport = (id: string) => {
    if(window.confirm("Delete this report from records?")) {
        const updated = reports.filter(r => r.id !== id);
        setReports(updated);
        localStorage.setItem('onepaw_reports', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 overflow-y-auto">
      {/* Header Bar */}
      <div className="p-6 bg-slate-900 flex items-center justify-between border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md">
        <button onClick={onBack} className="p-3 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-all active:scale-90 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
          <ChevronLeft size={18}/> Back
        </button>
        <div className="text-center">
            <h1 className="font-black text-xl tracking-tighter uppercase italic text-blue-500">Command Center</h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Administrator Only</p>
        </div>
        <div className="p-3 bg-blue-600/20 text-blue-500 rounded-2xl border border-blue-500/20">
            <ShieldCheck size={20} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {reports.length === 0 ? (
          <div className="text-center py-32 space-y-4 opacity-30">
            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto border border-slate-800">
                <Clock size={32} />
            </div>
            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No active reports in queue</p>
          </div>
        ) : (
          <div className="grid gap-6">
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] px-2 mb-2">
              {reports.length} Incident{reports.length > 1 ? 's' : ''} Logged
            </p>
            {reports.map((r) => (
                <div key={r.id} className="bg-slate-900 p-8 rounded-[40px] border border-slate-800 shadow-2xl transition-all hover:border-blue-500/30 group relative overflow-hidden">
                <div className="flex justify-between items-start mb-6 relative z-10">
                    <span className="bg-blue-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                    {r.type}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono bg-slate-800 px-3 py-1 rounded-lg">{r.timestamp}</span>
                </div>
                
                <p className="text-lg text-slate-200 font-medium mb-8 leading-relaxed relative z-10 italic">
                    "{r.details}"
                </p>
                
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-8 bg-slate-950 p-4 rounded-3xl border border-slate-800/50 relative z-10">
                    <div className="p-2 bg-red-500/10 rounded-xl text-red-500">
                        <MapPin size={16}/>
                    </div>
                    <span className="font-medium truncate">{r.location}</span>
                </div>
                
                <div className="flex gap-3 relative z-10">
                    <button 
                      onClick={() => forwardReport(r)}
                      className="flex-1 bg-white hover:bg-blue-600 hover:text-white text-slate-950 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95"
                    >
                      <Send size={16}/> Forward to Rescuers
                    </button>
                    <button 
                      onClick={() => deleteReport(r.id)}
                      className="p-4 bg-slate-800 text-red-500 rounded-3xl hover:bg-red-600 hover:text-white transition-all active:scale-95 border border-slate-700 hover:border-red-500"
                    >
                      <Trash2 size={20}/>
                    </button>
                </div>
                </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;