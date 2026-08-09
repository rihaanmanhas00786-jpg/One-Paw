import React, { useState, useEffect } from 'react';
import { ChevronLeft, User, MapPin, Calendar, ClipboardList, Camera, LogOut, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Profile = ({ onBack, onLogout }: { onBack: () => void, onLogout: () => void }) => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('onepaw_user') || '{}');

  useEffect(() => {
    const fetchMyData = async () => {
      // Sync with Supabase using either full_name or name
      const { data } = await supabase
        .from('reports')
        .select('*')
        .eq('user_name', user.full_name || user.name)
        .order('id', { ascending: false });
      
      if (data) setReports(data);
      setLoading(false);
    };
    fetchMyData();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-24 overflow-y-auto">
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 p-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-600 hover:text-white transition-all"><ChevronLeft/></button>
        <h1 className="font-black text-xl tracking-tighter uppercase text-[#4A2C2A]">My Space</h1>
        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-black">{user.full_name?.charAt(0)}</div>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-8">
        {/* IDENTITY CARD - UPDATED WITH AREA */}
        <div className="bg-white rounded-[45px] p-10 shadow-2xl border border-orange-50 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-orange-500"></div>
          <div className="w-24 h-24 bg-orange-100 rounded-full mx-auto mb-6 flex items-center justify-center text-orange-600 border-4 border-white shadow-lg"><User size={40} /></div>
          
          <h2 className="text-3xl font-black text-[#4A2C2A]">{user.full_name || user.name}</h2>
          <div className="flex items-center justify-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-widest mt-2">
            <MapPin size={14}/> {user.geo_region || "Srinagar"}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="bg-slate-50 p-5 rounded-3xl border border-orange-100">
                <Calendar size={20} className="mx-auto mb-1 text-orange-400" />
                <p className="text-[10px] font-black text-slate-400 uppercase">Joined</p>
                <p className="text-sm font-black text-[#4A2C2A]">{user.joined_at ? new Date(user.joined_at).toLocaleDateString() : "Active"}</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-3xl border border-orange-100">
                <ClipboardList size={20} className="mx-auto mb-1 text-orange-400" />
                <p className="text-[10px] font-black text-slate-400 uppercase">My Reports</p>
                <p className="text-sm font-black text-[#4A2C2A]">{reports.length}</p>
            </div>
          </div>

          <button onClick={onLogout} className="mt-10 flex items-center justify-center gap-2 mx-auto text-red-500 font-black text-[10px] uppercase tracking-widest hover:text-red-700 py-2 px-6 rounded-full bg-red-50 transition-all active:scale-95">
            <LogOut size={14}/> Sign Out / Switch Account
          </button>
        </div>

        {/* LIVE HISTORY LIST */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-[#4A2C2A] px-2 flex items-center gap-2 tracking-tight uppercase italic">
            <Camera size={20} className="text-orange-500"/> Personal Report History
          </h3>
          
          {loading ? (
            <p className="text-center py-10 text-slate-400 animate-pulse uppercase font-black text-[10px] tracking-widest">Syncing with cloud...</p>
          ) : reports.length === 0 ? (
            <div className="bg-white p-12 rounded-[40px] text-center border-2 border-dashed border-orange-200">
               <p className="text-slate-400 font-medium italic">You haven't reported any animals yet.</p>
            </div>
          ) : (
            reports.map(r => (
              <div key={r.id} className="bg-white rounded-[35px] shadow-lg border border-orange-50 overflow-hidden">
                {r.photo_url && <img src={r.photo_url} className="w-full h-32 object-cover" alt="incident" />}
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                    <span className="bg-orange-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase">{r.type}</span>
                    <span className="text-[9px] text-slate-400 font-mono italic">{r.timestamp}</span>
                    </div>
                    <p className="text-slate-700 font-bold leading-relaxed">"{r.details}"</p>
                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest"><MapPin size={12} className="text-red-500"/> {r.location}</div>
                    <div className="text-[9px] font-black text-green-600 uppercase italic">Status: {r.status}</div>
                    </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Profile;