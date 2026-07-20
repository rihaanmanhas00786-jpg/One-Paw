import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Search, Megaphone, MapPin, Phone, X } from 'lucide-react';
import { LostPet } from '../types';

const LostAndFound = ({ onBack }: { onBack: () => void }) => {
  const [pets, setPets] = useState<LostPet[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('onepaw_lostpets') || '[]');
    setPets(saved);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as any;
    const newPet: LostPet = {
      id: Date.now().toString(),
      type: form[0].value,
      petType: form[1].value,
      breed: form[2].value,
      area: form[3].value,
      description: form[4].value,
      contact: form[5].value,
      date: new Date().toLocaleDateString()
    };
    const updated = [newPet, ...pets];
    setPets(updated);
    localStorage.setItem('onepaw_lostpets', JSON.stringify(updated));
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-24 overflow-y-auto">
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 p-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 bg-orange-50 text-orange-700 rounded-xl"><ChevronLeft/></button>
        <h1 className="font-black text-xl tracking-tighter uppercase text-[#4A2C2A]">Lost & Found</h1>
        <button onClick={() => setIsFormOpen(true)} className="bg-orange-500 text-white p-2 rounded-xl shadow-lg shadow-orange-200"><Plus/></button>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-orange-600 p-6 rounded-[35px] text-white flex items-center gap-4 shadow-xl">
          <Megaphone size={32} className="animate-bounce" />
          <div>
            <h2 className="font-black italic text-lg uppercase leading-none">Community Alert</h2>
            <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-1">Help reunite pets with their families in Srinagar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pets.length === 0 ? (
            <p className="col-span-full text-center py-20 text-slate-400 font-medium italic">No active alerts. Use the + button to post.</p>
          ) : (
            pets.map(pet => (
              <div key={pet.id} className="bg-white p-6 rounded-[40px] shadow-lg border border-orange-50 relative overflow-hidden group">
                <div className={`absolute top-0 right-0 px-4 py-1 text-[10px] font-black uppercase rounded-bl-2xl ${pet.type === 'Lost' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                  {pet.type}
                </div>
                <h3 className="text-xl font-black text-[#4A2C2A]">{pet.petType} - {pet.breed}</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-xs text-slate-500 flex items-center gap-1 font-bold uppercase tracking-tighter"><MapPin size={14} className="text-orange-500"/> {pet.area}</p>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium italic">"{pet.description}"</p>
                </div>
                <a href={`tel:${pet.contact}`} className="mt-4 w-full bg-slate-900 text-white py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all">
                  <Phone size={14}/> Contact Owner
                </a>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Post Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[6000] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="bg-[#4A2C2A] p-8 text-white text-center relative">
              <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full"><X size={20}/></button>
              <h2 className="text-2xl font-black uppercase italic">Post Pet Alert</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <select className="p-4 bg-slate-100 rounded-2xl font-bold outline-none"><option>Lost</option><option>Found</option></select>
                <input placeholder="Pet Type (e.g. Dog)" className="p-4 bg-slate-100 rounded-2xl font-bold outline-none" required />
              </div>
              <input placeholder="Breed (e.g. GSD)" className="w-full p-4 bg-slate-100 rounded-2xl font-bold outline-none" required />
              <input placeholder="Area in Srinagar" className="w-full p-4 bg-slate-100 rounded-2xl font-bold outline-none" required />
              <textarea placeholder="Specific identifying marks..." className="w-full p-4 bg-slate-100 rounded-2xl h-24 outline-none font-medium" required />
              <input placeholder="Your Phone Number" className="w-full p-4 bg-slate-100 rounded-2xl font-bold outline-none" required />
              <button type="submit" className="w-full bg-orange-600 text-white p-5 rounded-3xl font-black uppercase shadow-xl active:scale-95 transition-all">Publish Alert</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostAndFound;