import React, { useState, useEffect } from 'react';
import { Send, X, AlertTriangle, MapPin, Loader2, Camera } from 'lucide-react';
import { supabase } from '../supabaseClient';

const ReportForm = ({ onClose }: { onClose: () => void }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [coords, setCoords] = useState<string>("Detecting...");
  const [image, setImage] = useState<string | null>(null);
  
  const user = JSON.parse(localStorage.getItem('onepaw_user') || '{}');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCoords(`${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`);
      });
    }
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.target as HTMLFormElement);

    const { error } = await supabase.from('reports').insert([{
      user_name: user.full_name || user.name, // Fixed sync key
      type: formData.get('caseType'),
      details: formData.get('details'),
      location: coords,
      photo_url: image, // Saves image string to database
      timestamp: new Date().toLocaleString('en-IN'),
      status: 'Pending'
    }]);

    if (error) { alert(error.message); setStatus('idle'); }
    else { setStatus('success'); }
  };

  if (status === 'success') return (
    <div className="fixed inset-0 z-[10000] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-[40px] p-10 text-center shadow-2xl">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><Send size={32} /></div>
        <h2 className="text-2xl font-black uppercase italic">Report Logged</h2>
        <p className="text-slate-500 mt-2 text-sm">Visible in your profile history now.</p>
        <button onClick={onClose} className="mt-8 w-full bg-slate-950 text-white p-4 rounded-2xl font-bold uppercase text-xs">Done</button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[10000] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-[40px] overflow-hidden shadow-2xl my-auto">
        <div className="bg-blue-600 p-8 text-white text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full"><X size={20}/></button>
          <Camera size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Emergency Report</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <select name="caseType" className="w-full p-4 bg-slate-100 rounded-2xl font-bold outline-none border-none">
            <option>Injured Stray Dog</option>
            <option>Hit & Run Accident</option>
            <option>Animal Cruelty</option>
          </select>

          <div className="flex gap-2">
            <label className="flex-1 bg-orange-50 border-2 border-dashed border-orange-200 p-4 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-orange-100 transition-all">
               <Camera size={24} className="text-orange-500 mb-1"/>
               <span className="text-[10px] font-black uppercase text-orange-600">{image ? "Photo Attached" : "Add Photo"}</span>
               <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
            </label>
            <div className="flex-[2] bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
              <MapPin className="text-red-500" size={20}/>
              <span className="text-[10px] font-mono font-bold text-slate-500">{coords}</span>
            </div>
          </div>

          {image && <img src={image} className="w-full h-32 object-cover rounded-2xl border-2 border-orange-100" alt="preview" />}

          <textarea name="details" placeholder="Describe the animal and situation..." className="w-full p-4 bg-slate-100 rounded-2xl h-24 outline-none font-medium" required />
          
          <button type="submit" disabled={status === 'sending'} className="w-full bg-slate-950 text-white p-5 rounded-3xl font-black uppercase shadow-xl active:scale-95">
            {status === 'sending' ? "Uploading to Cloud..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ReportForm;