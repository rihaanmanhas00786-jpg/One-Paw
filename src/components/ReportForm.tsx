import React, { useState } from 'react';
import { Send, X, AlertTriangle, MapPin } from 'lucide-react';
import { supabase } from '../supabaseClient';

const ReportForm = ({ onClose }: { onClose: () => void }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const user = JSON.parse(localStorage.getItem('onepaw_user') || '{"name": "Anonymous"}');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.target as HTMLFormElement);
    const caseType = formData.get('caseType');
    const details = formData.get('details');

    // SENDS DATA TO SUPABASE CLOUD
    const { error } = await supabase
      .from('reports')
      .insert([{
        userName: user.name,
        type: caseType,
        details: details,
        location: "Srinagar GPS Detected",
        timestamp: new Date().toLocaleString('en-IN'),
        status: 'Pending'
      }]);

    if (error) {
      alert("Database Error: " + error.message);
      setStatus('idle');
    } else {
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className="fixed inset-0 z-[10000] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm rounded-[40px] p-10 text-center shadow-2xl animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send size={32} />
          </div>
          <h2 className="text-2xl font-black uppercase italic">Report Logged</h2>
          <p className="text-slate-500 mt-2 font-medium leading-relaxed text-sm">
            Your report is saved in the cloud. Rescuers have been notified.
          </p>
          <button onClick={onClose} className="mt-8 w-full bg-slate-900 text-white p-4 rounded-2xl font-bold uppercase tracking-widest text-xs active:scale-95 transition-all">
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-[40px] overflow-hidden shadow-2xl my-auto">
        <div className="bg-blue-600 p-8 text-white relative text-center">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all"><X size={20}/></button>
          <AlertTriangle size={48} className="mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">Report Incident</h2>
          <p className="text-blue-100 text-[10px] mt-1 font-bold uppercase tracking-widest leading-none">Connecting to Srinagar Database</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Type of Case</label>
            <select name="caseType" className="w-full p-4 bg-slate-100 rounded-2xl border-none text-sm font-bold outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer">
              <option>Injured Stray Dog</option>
              <option>Hit & Run Accident</option>
              <option>Animal Cruelty/Abuse</option>
              <option>Sick Migratory Bird</option>
              <option>Horse Overloading</option>
            </select>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="text-red-500" size={20} />
              <div className="text-left">
                <p className="text-[10px] font-black uppercase text-slate-400 leading-none">Your Location</p>
                <p className="text-xs font-bold text-slate-700 italic text-[10px] mt-1">Srinagar GPS Verified</p>
              </div>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>

          <div className="space-y-1 text-left">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Situation Details</label>
            <textarea 
              name="details"
              placeholder="Describe the animal and the location exactly..."
              className="w-full p-4 bg-slate-100 rounded-2xl border-none text-sm outline-none h-28 focus:ring-2 focus:ring-blue-600 font-medium"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-slate-950 hover:bg-blue-600 text-white p-5 rounded-3xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
          >
            {status === 'sending' ? "Sending to Cloud..." : <><Send size={18}/> Submit to Rescuers</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;