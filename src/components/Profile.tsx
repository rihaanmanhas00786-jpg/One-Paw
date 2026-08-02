import React, { useState, useEffect } from 'react';
import { ChevronLeft, User, MapPin, Calendar, ClipboardList, Camera, LogOut } from 'lucide-react';
import { AnimalReport } from '../types';

interface ProfileProps {
  onBack: () => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onBack, onLogout }) => {
  const [reports, setReports] = useState<AnimalReport[]>([]);
  const user = JSON.parse(localStorage.getItem('onepaw_user') || '{}');

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('onepaw_reports') || '[]');
    setReports(all.filter((r: any) => r.userName === user.full_name));
  }, [user.full_name]);

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-24 overflow-y-auto font-sans">
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 p-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 bg-orange-50 text-orange-700 rounded-xl"><ChevronLeft/></button>
        <h1 className="font-black text-xl tracking-tighter uppercase text-[#4A2C2A]">Community Profile</h1>
        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-black">{user.full_name?.charAt(0)}</div>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-8">
        {/* Identity Card */}
        <div className="bg-white rounded-[40px] p-10 shadow-2xl border border-orange-50 text-center relative overflow-hidden">
          <div className="w-28 h-28 bg-orange-100 rounded-full mx-auto mb-6 flex items-center justify-center text-orange-600 border-4 border-white shadow-xl">
             <User size={48} />
          </div>
          <h2 className="text-4xl font-black text-[#4A2C2A]">{user.full_name}</h2>
          <p className="text-orange-500 font-bold text-[10px] uppercase tracking-[0.3em] mt-2 italic">Area: {user.geo_region}</p>
          
          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="bg-[#FFF8F0] p-5 rounded-3xl border border-orange-100">
                <Calendar size={20} className="mx-auto mb-2 text-orange-400" />
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Joined</p>
                <p className="text-sm font-black text-[#4A2C2A]">{user.joined_at ? new Date(user.joined_at).toLocaleDateString() : 'Active Member'}</p>
            </div>
            <div className="bg-[#FFF8F0] p-5 rounded-3xl border border-orange-100">
                <ClipboardList size={20} className="mx-auto mb-2 text-orange-400" />
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Submissions</p>
                <p className="text-sm font-black text-[#4A2C2A]">{reports.length}</p>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <button 
            onClick={onLogout}
            className="mt-10 flex items-center justify-center gap-2 mx-auto text-red-500 font-black text-[10px] uppercase tracking-widest hover:text-red-700 transition-colors py-2 px-6 rounded-full bg-red-50"
          >
            <LogOut size={14}/> Sign Out / Switch User
          </button>
        </div>

        {/* History Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-[#4A2C2A] px-2 flex items-center gap-2 tracking-tight uppercase italic font-serif">
            <Camera size={20} className="text-orange-500"/> My Recent Reports
          </h3>
          
          {reports.length === 0 ? (
            <div className="bg-white p-12 rounded-[40px] text-center border-2 border-dashed border-orange-200">
               <p className="text-slate-400 font-medium italic">Your report history is empty.</p>
            </div>
          ) : (
            reports.map(r => (
              <div key={r.id} className="bg-white p-6 rounded-[35px] shadow-lg border border-orange-50">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-orange-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{r.type}</span>
                  <span className="text-[9px] text-slate-400 font-mono italic">{r.timestamp}</span>
                </div>
                <p className="text-slate-700 font-bold leading-relaxed">"{r.details}"</p>
                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                   <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <MapPin size={12} className="text-red-500"/> Srinagar Area
                   </div>
                   <div className="text-[9px] font-black text-green-600 uppercase italic">
                      Status: {r.status}
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