import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Megaphone, MapPin, Phone, X, Camera, Image as ImageIcon, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { LostPet } from '../types';

const LostAndFound = ({ onBack }: { onBack: () => void }) => {
  const [pets, setPets] = useState<LostPet[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const fetchPets = async () => {
    try {
      const { data, error } = await supabase.from('lost_pets').select('*').order('id', { ascending: false });
      if (error) throw error;
      if (data) setPets(data as any);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { fetchPets(); }, []);

  // --- IMAGE COMPRESSION LOGIC (Prevents Crashing) ---
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // Shrink to 800px max width
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert to low-quality JPEG to keep file size tiny (approx 50KB)
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
        setImage(compressedBase64);
        setIsCompressing(false);
      };
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as any;
    
    try {
      const newPet = {
        type: form[0].value,
        petType: form[1].value,
        breed: form[2].value,
        area: form[3].value,
        description: form[4].value,
        contact: form[5].value,
        photo_url: image, // Now small enough for the database
        date: new Date().toLocaleDateString('en-IN')
      };

      const { error } = await supabase.from('lost_pets').insert([newPet]);
      if (error) throw error;

      setIsFormOpen(false);
      setImage(null);
      fetchPets();
    } catch (err: any) {
      alert("Error saving: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-24 overflow-y-auto">
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 p-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 bg-orange-50 text-orange-700 rounded-xl transition-all active:scale-90"><ChevronLeft size={24}/></button>
        <h1 className="font-black text-xl uppercase italic text-[#4A2C2A]">Community Alerts</h1>
        <button onClick={() => setIsFormOpen(true)} className="bg-orange-500 text-white p-2.5 rounded-xl shadow-lg active:scale-90 transition-all"><Plus size={24}/></button>
      </div>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pets.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-300 uppercase font-black tracking-widest opacity-50 italic text-sm">No Active Reports Found</div>
        ) : (
          pets.map(pet => (
            <div key={pet.id} className="bg-white rounded-[45px] shadow-2xl border border-orange-50 overflow-hidden group flex flex-col transform hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-64 overflow-hidden bg-slate-100">
                {pet.photo_url ? (
                  <img src={pet.photo_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="pet" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageIcon size={48}/></div>
                )}
                <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase shadow-lg ${pet.type === 'Lost' ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'}`}>
                  {pet.type}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-black text-[#4A2C2A] tracking-tighter uppercase italic leading-none">{pet.petType} - {pet.breed}</h3>
                <p className="text-[10px] text-orange-600 flex items-center gap-1 font-black mt-2 uppercase tracking-widest"><MapPin size={12}/> {pet.area}</p>
                <div className="bg-slate-50 p-4 rounded-3xl mt-4 flex-1">
                    <p className="text-sm text-slate-600 font-medium leading-relaxed italic">"{pet.description}"</p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">{pet.date}</span>
                    <a href={`tel:${pet.contact}`} className="bg-[#4A2C2A] text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all active:scale-95 shadow-xl">
                      <Phone size={14}/> Contact
                    </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-[6000] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-[50px] overflow-hidden shadow-2xl my-auto animate-in zoom-in duration-300">
            <div className="bg-[#4A2C2A] p-10 text-white text-center relative">
              <button onClick={() => setIsFormOpen(false)} className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20"><X size={20}/></button>
              <Megaphone size={48} className="mx-auto mb-4 animate-pulse text-orange-400" />
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">New Alert</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Status</label>
                    <select className="w-full p-4 bg-slate-100 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"><option>Lost</option><option>Found</option></select>
                </div>
                <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Type</label>
                    <input placeholder="Dog/Cat" className="w-full p-4 bg-slate-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-orange-500" required />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Locality</label>
                <input placeholder="Area in Srinagar" className="w-full p-4 bg-slate-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-orange-500" required />
              </div>
              
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Photo</label>
                <label className={`w-full p-6 border-2 border-dashed rounded-[32px] flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${image ? 'bg-emerald-50 border-emerald-500' : 'bg-orange-50 border-orange-200 hover:bg-orange-100'}`}>
                    {isCompressing ? <Loader2 className="animate-spin text-orange-500" /> : (
                      image ? <CheckCircle2 className="text-emerald-500" size={32}/> : <Camera className="text-orange-500" size={32}/>
                    )}
                    <span className={`font-black text-[10px] uppercase tracking-widest ${image ? 'text-emerald-600' : 'text-orange-600'}`}>
                        {isCompressing ? "Compressing Image..." : image ? "Photo Optimized" : "Upload Image"}
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImage} disabled={isCompressing} />
                </label>
              </div>

              <button type="submit" disabled={isCompressing} className="w-full bg-[#E67E22] text-white p-6 rounded-[32px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all mt-4 disabled:opacity-50">Publish Now</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default LostAndFound;