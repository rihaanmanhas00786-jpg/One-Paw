import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Megaphone, MapPin, Phone, X, Camera, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { LostPet } from '../types';

const LostAndFound = ({ onBack }: { onBack: () => void }) => {
  const [pets, setPets] = useState<LostPet[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const fetchPets = async () => {
    const { data } = await supabase.from('lost_pets').select('*').order('id', { ascending: false });
    if (data) setPets(data as any);
  };

  useEffect(() => { fetchPets(); }, []);

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
    const form = e.target as any;
    const newPet = {
      type: form[0].value,
      petType: form[1].value,
      breed: form[2].value,
      area: form[3].value,
      description: form[4].value,
      contact: form[5].value,
      photo_url: image,
      date: new Date().toLocaleDateString()
    };
    await supabase.from('lost_pets').insert([newPet]);
    setIsFormOpen(false);
    setImage(null);
    fetchPets();
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-24 overflow-y-auto">
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 p-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 bg-orange-50 text-orange-700 rounded-xl"><ChevronLeft/></button>
        <h1 className="font-black text-xl uppercase text-[#4A2C2A]">Lost & Found</h1>
        <button onClick={() => setIsFormOpen(true)} className="bg-orange-500 text-white p-2 rounded-xl"><Plus/></button>
      </div>

      <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {pets.map(pet => (
          <div key={pet.id} className="bg-white rounded-[40px] shadow-xl border border-orange-50 overflow-hidden group">
            {pet.photo_url ? (
                <img src={pet.photo_url} className="w-full h-48 object-cover" alt="pet" />
            ) : (
                <div className="w-full h-48 bg-slate-100 flex items-center justify-center text-slate-300"><ImageIcon size={48}/></div>
            )}
            <div className="p-6">
                <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase mb-3 ${pet.type === 'Lost' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{pet.type}</div>
                <h3 className="text-xl font-black text-[#4A2C2A]">{pet.petType} - {pet.breed}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 font-bold mt-1 uppercase"><MapPin size={12}/> {pet.area}</p>
                <p className="text-sm text-slate-600 mt-3 italic">"{pet.description}"</p>
                <a href={`tel:${pet.contact}`} className="mt-6 w-full bg-[#4A2C2A] text-white py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest">Contact Finder</a>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-[6000] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-[40px] overflow-hidden shadow-2xl my-auto">
            <div className="bg-[#4A2C2A] p-8 text-white text-center relative">
              <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full"><X size={20}/></button>
              <h2 className="text-2xl font-black uppercase italic">Post Pet Alert</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <select className="p-4 bg-slate-100 rounded-2xl font-bold border-none"><option>Lost</option><option>Found</option></select>
                <input placeholder="Pet Type" className="p-4 bg-slate-100 rounded-2xl font-bold" required />
              </div>
              <input placeholder="Breed" className="w-full p-4 bg-slate-100 rounded-2xl font-bold" required />
              <input placeholder="Area in Srinagar" className="w-full p-4 bg-slate-100 rounded-2xl font-bold" required />
              
              <label className="w-full p-4 bg-orange-50 border-2 border-dashed border-orange-200 rounded-2xl flex items-center justify-center gap-3 cursor-pointer">
                  <Camera className="text-orange-500" />
                  <span className="font-black text-xs text-orange-600 uppercase">{image ? "Photo Ready" : "Upload Pet Photo"}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
              </label>

              <textarea placeholder="Identifying marks..." className="w-full p-4 bg-slate-100 rounded-2xl h-20 outline-none" required />
              <input placeholder="Contact Number" className="w-full p-4 bg-slate-100 rounded-2xl font-bold" required />
              <button type="submit" className="w-full bg-orange-600 text-white p-5 rounded-3xl font-black uppercase shadow-xl">Post Alert</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default LostAndFound;