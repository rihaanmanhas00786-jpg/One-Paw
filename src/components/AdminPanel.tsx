import React, { useState, useEffect } from 'react';
import { ChevronLeft, ShieldCheck, Send, Trash2, Clock, MapPin } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { AnimalReport } from '../types';

const AdminPanel = ({ onBack }: { onBack: () => void }) => {
  const [reports, setReports] = useState<AnimalReport[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH REPORTS FROM SUPABASE ON START
  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) console.error("Error fetching reports:", error);
      else if (data) setReports(data as AnimalReport[]);
      setLoading(false);
    };

    fetchReports();
  }, []);

  const forwardReport = (report: AnimalReport) => {
    const message = `*ONEPAW SRINAGAR - EMERGENCY REPORT*%0A%0A` +
                    `*Reporter:* ${report.userName}%0A` +
                    `*Type:* ${report.type}%0A` +
                    `*Details:* ${report.details}%0A` +
                    `*Location:* ${report.location}%0A` +
                    `*Time:* ${report.timestamp}%0A%0A` +
                    `_Sent via Cloud Admin Panel_`;
    window.open(`https://wa.me/916006948448?text=${message}`, '_blank');
  };

  const deleteReport = async (id: string) => {
    if(window.confirm("Permanently delete this report from the database?")) {
      const { error } = await supabase.from('reports').delete().eq('id', id);
      if (error) alert(error.message);
      else setReports(reports.filter(r => r.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 overflow-y-auto">
      <div className="p-6 bg-slate-900 flex items-center justify-between border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md">
        <button onClick={onBack} className="p-3 bg-slate-800 rounded-2xl flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition-all">
          <ChevronLeft size={18}/> Back
        </button>
        <div className="text-center">
            <h1 className="font-black text-xl tracking-tighter uppercase italic text-blue-500 leading-none">Cloud Dashboard</h1>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1 text-center">Real-Time Srinagar Intel</p>
        </div>
        <div className="p-3 bg-blue-600/20 text-blue-500 rounded-2xl">
            <ShieldCheck size={20} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {loading ? (
           <p className="text-center py-20 text-slate-500 animate-pulse">Fetching Cloud Records...</p>
        ) : reports.length === 0 ? (
          <div className="text-center py-32 opacity-30">
            <Clock size={48} className="mx-auto mb-4 text-slate-700" />
            <p className="font-bold uppercase text-xs tracking-widest">Database Queue Empty</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {reports.map((r) => (
                <div key={r.id} className="bg-slate-900 p-8 rounded-[40px] border border-slate-800 shadow-2xl transition-all hover:border-blue-500/30">
                <div className="flex justify-between items-start mb-6">
                    <span className="bg-blue-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase">{r.type}</span>
                    <span className="text-[9px] text-slate-500 font-mono italic">{r.timestamp}</span>
                </div>
                <p className="text-lg text-slate-200 font-medium mb-6">"{r.details}"</p>
                <p className="text-[10px] text-slate-500 uppercase font-black mb-6 italic">— Reported by {r.userName}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-8 bg-slate-950 p-4 rounded-3xl border border-slate-800/50">
                    <MapPin size={16} className="text-red-500"/>
                    <span>{r.location}</span>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => forwardReport(r)} className="flex-1 bg-white text-slate-950 py-4 rounded-3xl font-black text-xs uppercase flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white transition-all shadow-xl">
                      <Send size={16}/> Forward to Rescuers
                    </button>
                    <button onClick={() => deleteReport(r.id)} className="p-4 bg-slate-800 text-red-500 rounded-3xl border border-slate-700 active:scale-95 transition-all">
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