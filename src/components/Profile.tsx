import React, { useState, useEffect } from 'react';
import { ChevronLeft, User, MapPin, Calendar, ClipboardList, Camera } from 'lucide-react';
import { AnimalReport } from '../types';

const Profile = ({ onBack }: { onBack: () => void }) => {
  const [reports, setReports] = useState<AnimalReport[]>([]);
  const user = JSON.parse(localStorage.getItem('onepaw_user') || '{}');

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('onepaw_reports') || '[]');
    setReports(all.filter((r: any) => r.userName === user.name));
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-20">
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b p-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 bg-orange-50 rounded-xl"><ChevronLeft/></button>
        <h1 className="font-black text-xl tracking-tighter uppercase text-[#4A2C2A]">My Profile</h1>
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"><User size={20}/></div>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-8">
        <div className="bg-white rounded-[40px] p-8 shadow-xl border border-orange-50 text-center">
          <div className="w-24 h-24 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center text-orange-600 border-4 border-white shadow-lg"><User size={40} /></div>
          <h2 className="text-3xl font-black text-slate-800">{user.name}</h2>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-slate-50 p-4 rounded-3xl"><Calendar size={18} className="mx-auto mb-1 text-slate-400"/><p className="text-[10px] font-bold text-slate-400">JOINED</p><p className="text-sm font-bold text-slate-700">{user.joinedDate}</p></div>
            <div className="bg-slate-50 p-4 rounded-3xl"><ClipboardList size={18} className="mx-auto mb-1 text-slate-400"/><p className="text-[10px] font-bold text-slate-400">REPORTS</p><p className="text-sm font-bold text-slate-700">{reports.length}</p></div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-black text-[#4A2C2A] px-2 flex items-center gap-2"><Camera size={20} className="text-orange-500"/> My Submissions</h3>
          {reports.map(r => (
            <div key={r.id} className="bg-white p-6 rounded-[32px] shadow-md border border-orange-50">
              <div className="flex justify-between mb-3"><span className="bg-orange-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase">{r.type}</span><span className="text-[9px] text-slate-400">{r.timestamp}</span></div>
              <p className="text-slate-700 font-medium">"{r.details}"</p>
              <div className="mt-4 pt-4 border-t flex justify-between items-center"><div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase"><MapPin size={12}/> Srinagar</div><div className="text-[10px] font-black text-green-600 uppercase italic">{r.status}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Profile;