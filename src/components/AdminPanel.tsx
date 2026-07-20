import React, { useState, useEffect } from 'react';
import { ChevronLeft, ShieldCheck, Send, Trash2, Clock, MapPin, RefreshCcw } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { AnimalReport } from '../types';

const AdminPanel = ({ onBack }: { onBack: () => void }) => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('id', { ascending: false });

    if (error) console.error("Fetch Error:", error);
    else if (data) setReports(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const forwardReport = (report: any) => {
    // Generate WhatsApp link using coordinates for precise navigation
    const coordsUrl = `https://www.google.com/maps/search/?api=1&query=${report.location}`;
    const message = `*ONEPAW SRINAGAR - INCIDENT REPORT*%0A%0A` +
                    `*Reported By:* ${report.user_name}%0A` +
                    `*Type:* ${report.type}%0A` +
                    `*Details:* ${report.details}%0A` +
                    `*GPS Coordinates:* ${report.location}%0A` +
                    `*Map Link:* ${coordsUrl}%0A%0A` +
                    `_Sent via Admin Command Center_`;
    
    window.open(`https://wa.me/916006948448?text=${message}`, '_blank');
  };

  const deleteReport = async (id: string) => {
    if(window.confirm("Permanently remove this report from Cloud Database?")) {
      const { error } = await supabase.from('reports').delete().eq('id', id);
      if (error) alert(error.message);
      else setReports(reports.filter(r => r.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 overflow-y-auto">
      <div className="p-6 bg-slate-900 flex items-center justify-between border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md">
        <button onClick={onBack} className="p-3 bg-slate-800 rounded-2xl hover:bg-blue-600 transition-all active:scale-90 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
          <ChevronLeft size={18}/> Back
        </button>
        <div className="text-center">
            <h1 className="font-black text-xl tracking-tighter uppercase italic text-blue-500">Command Center</h1>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em]">Administrator Only</p>
        </div>
        <button onClick={fetchReports} className="p-3 bg-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all">
            <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {loading && reports.length === 0 ? (
           <p className="text-center py-20 text-slate-500 font-bold uppercase tracking-widest animate-pulse italic text-xs">Querying Supabase Cloud...</p>
        ) : reports.length === 0 ? (
          <div className="text-center py-32 space-y-4 opacity-30">
            <Clock size={48} className="mx-auto mb-4" />
            <p className="font-bold uppercase text-xs tracking-widest text-white">No active incidents in queue</p>
          </div>
        ) : (
          <div className="grid gap-6">
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] px-2 mb-2">
              {reports.length} Real-Time Incident{reports.length > 1 ? 's' : ''} Active
            </p>
            {reports.map((r) => (
                <div key={r.id} className="bg-slate-900 p-8 rounded-[40px] border border-slate-800 shadow-2xl group transition-all hover:border-blue-500/30">
                <div className="flex justify-between items-start mb-6">
                    <span className="bg-blue-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    {r.type}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono bg-slate-800 px-3 py-1 rounded-lg italic">{r.timestamp}</span>
                </div>
                
                <p className="text-lg text-slate-200 font-medium mb-2 leading-relaxed italic">
                    "{r.details}"
                </p>
                <p className="text-[10px] text-slate-500 uppercase font-black mb-8 tracking-widest">— Reported by {r.user_name}</p>
                
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-8 bg-slate-950 p-4 rounded-3xl border border-slate-800/50">
                    <div className="p-2 bg-red-500/10 rounded-xl text-red-500">
                        <MapPin size={16}/>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-600 uppercase">Exact Coordinates</span>
                        <span className="font-mono text-slate-300 font-bold">{r.location}</span>
                    </div>
                </div>
                
                <div className="flex gap-3">
                    <button 
                      onClick={() => forwardReport(r)}
                      className="flex-1 bg-white hover:bg-blue-500 hover:text-white text-slate-950 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95"
                    >
                      <Send size={16}/> Forward to Rescuers
                    </button>
                    <button 
                      onClick={() => deleteReport(r.id)}
                      className="p-4 bg-slate-800 text-red-500 rounded-3xl hover:bg-red-600 hover:text-white transition-all active:scale-95 border border-slate-700"
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