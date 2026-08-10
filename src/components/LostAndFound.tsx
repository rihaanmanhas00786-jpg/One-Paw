import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Megaphone, MapPin, Phone, X, Camera, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { LostPet } from '../types';

const LostAndFound = ({ onBack }: { onBack: () => void }) => {
  const [pets, setPets] = useState<LostPet[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fetchPets = async () => {
    const { data } = await supabase.from('lost_pets').select('*').order('id', { ascending: false });
    if (data) setPets(data as any);
  };

  useEffect(() => { fetchPets(); }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setIsUploading(false);
      };
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
      date: new Date().toLocaleDateString('en-IN')
    };
    await supabase.from('lost_pets').insert([newPet]);
    setIsFormOpen(false);
    setImage(null);
    fetchPets();
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-24 overflow-y-auto">
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 p-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 bg-orange-50 text-orange-700 rounded-xl transition-all active:scale-90"><ChevronLeft size={24}/></button>
        <h1 className="font-black text-xl uppercase italic text-[#4A2C2A]">Community Alerts</h1>
        <button onClick={() => setIsFormOpen(true)} className="bg-orange-500 text-white p-2.5 rounded-xl shadow-lg shadow-orange-200 active:scale-90 transition-all"><Plus size={24}/></button>
      </div>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pets.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-300 uppercase font-black tracking-widest opacity-50">No Active Reports</div>
        ) : (
          pets.map(pet => (
            <div key={pet.id} className="bg-white rounded-[45px] shadow-2xl border border-orange-50 overflow-hidden group flex flex-col">
              <div className="relative h-64 overflow-hidden">
                {pet.photo_url ? (
                  <img src={pet.photo_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="pet" />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300"><ImageIcon size={48}/></div>
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
                    <span className="text-[10px] font-bold text-slate-300 uppercase">{pet.date}</span>
                    <a href={`tel:${pet.contact}`} className="bg-[#4A2C2A] text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all active:scale-95 shadow-xl">
                      <Phone size={14}/> Contact Finder
                    </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FORM MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[6000] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-[50px] overflow-hidden shadow-2xl my-auto animate-in zoom-in duration-300">
            <div className="bg-[#4A2C2A] p-10 text-white text-center relative">
              <button onClick={() => setIsFormOpen(false)} className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20"><X size={20}/></button>
              <Megaphone size={48} className="mx-auto mb-4 animate-pulse text-orange-400" />
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">Submit Pet Alert</h2>
              <p className="text-orange-200/60 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Srinagar Community Network</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Status</label>
                    <select className="w-full p-4 bg-slate-100 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"><option>Lost</option><option>Found</option></select>
                </div>
                <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Animal Type</label>
                    <input placeholder="e.g. Dog, Cat" className="w-full p-4 bg-slate-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-orange-500" required />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Identifying Info</label>
                <input placeholder="Breed (e.g. Golden Retriever, Persian)" className="w-full p-4 bg-slate-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-orange-500" required />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Locality</label>
                <input placeholder="Area in Srinagar" className="w-full p-4 bg-slate-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-orange-500" required />
              </div>
              
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Photo Evidence</label>
                <label className={`w-full p-6 border-2 border-dashed rounded-[32px] flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${image ? 'bg-emerald-50 border-emerald-500' : 'bg-orange-50 border-orange-200 hover:bg-orange-100'}`}>
                    {isUploading ? <Loader2 className="animate-spin text-orange-500" /> : (
                      image ? <CheckCircle2 className="text-emerald-500" size={32}/> : <Camera className="text-orange-500" size={32}/>
                    )}
                    <span className={`font-black text-[10px] uppercase tracking-widest ${image ? 'text-emerald-600' : 'text-orange-600'}`}>
                        {image ? "Photo Linked Successfully" : "Upload Pet Image"}
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
                </label>
              </div>

              {image && (
                <div className="w-full h-32 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md">
                    <img src={image} className="w-full h-full object-cover" alt="preview" />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Additional Details</label>
                <textarea placeholder="Any unique features, collar color, health status..." className="w-full p-4 bg-slate-100 rounded-2xl h-24 outline-none font-medium text-sm" required />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Emergency Contact</label>
                <input placeholder="Phone Number" className="w-full p-4 bg-slate-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-orange-500" required />
              </div>

              <button type="submit" className="w-full bg-[#E67E22] text-white p-6 rounded-[32px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all mt-4">Publish Alert</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default LostAndFound;