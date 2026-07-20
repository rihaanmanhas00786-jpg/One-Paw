import React, { useState, useEffect } from 'react';
import { Send, X, AlertTriangle, MapPin, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

const ReportForm = ({ onClose }: { onClose: () => void }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [coords, setCoords] = useState<string>("Detecting location...");
  const user = JSON.parse(localStorage.getItem('onepaw_user') || '{"name": "Anonymous"}');

  // Automatically get real-time GPS when form opens
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);
          setCoords(`${lat}, ${lng}`);
        },
        (error) => {
          console.error("GPS Error:", error);
          setCoords("Srinagar (GPS Denied)");
        },
        { enableHighAccuracy: true }
      );
    } else {
      setCoords("Location not supported");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.target as HTMLFormElement);

    // SEND TO SUPABASE WITH REAL GPS
    const { error } = await supabase
      .from('reports')
      .insert([{
        user_name: user.name,
        type: formData.get('caseType'),
        details: formData.get('details'),
        location: coords, // This is now the real Lat/Lng
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
        <div className="bg-white w-full max-w-sm rounded-[40px] p-10 text-center shadow-2xl animate-in zoom-in duration-300 border-8 border-emerald-500/20">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send size={32} />
          </div>
          <h2 className="text-2xl font-black uppercase italic">Report Logged</h2>
          <p className="text-slate-500 mt-2 font-medium leading-relaxed text-sm">
            Rescuers now have your exact GPS coordinates. Help is on the way.
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
          <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Emergency Report</h2>
          <p className="text-blue-100 text-[10px] mt-1 font-bold uppercase tracking-widest leading-none">Cloud GPS System Active</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-1 text-left">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Type of Emergency</label>
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
              <div className="text-left leading-tight">
                <p className="text-[10px] font-black uppercase text-slate-400">Current GPS</p>
                <p className="text-xs font-mono font-bold text-slate-700 italic mt-0.5">
                   {coords === "Detecting location..." ? "Acquiring Satellites..." : coords}
                </p>
              </div>
            </div>
            {coords === "Detecting location..." ? (
                <Loader2 className="animate-spin text-blue-600" size={18} />
            ) : (
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            )}
          </div>

          <div className="space-y-1 text-left">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Situation Details</label>
            <textarea 
              name="details"
              placeholder="e.g. Near Batamaloo bridge, brown dog is bleeding from leg..."
              className="w-full p-4 bg-slate-100 rounded-2xl border-none text-sm outline-none h-28 focus:ring-2 focus:ring-blue-600 font-medium"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={status === 'sending' || coords === "Detecting location..."}
            className="w-full bg-slate-950 hover:bg-blue-600 text-white p-5 rounded-3xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
          >
            {status === 'sending' ? "Connecting to Database..." : <><Send size={18}/> Send Exact Location</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;