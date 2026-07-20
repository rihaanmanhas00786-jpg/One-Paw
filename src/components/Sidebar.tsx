import React from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';
import { Location, Category } from '../types';

interface SidebarProps {
  locations: Location[];
  onSelect: (loc: Location) => void;
  activeFilter: string;
  setFilter: (f: Category | 'all') => void;
  search: string;
  setSearch: (s: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ locations, onSelect, activeFilter, setFilter, search, setSearch }) => {
  
  const filtered = locations.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'all' || l.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="p-6 bg-slate-950 text-white">
        <h1 className="text-xl font-black mb-4 flex items-center gap-2 tracking-tighter uppercase">
          <Navigation fill="currentColor" size={20}/> OnePaw Locator
        </h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input 
            className="w-full pl-10 pr-4 py-3 bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none"
            placeholder="Search verified clinics..."
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: 'all', label: 'All' },
            { id: 'govt_vet', label: 'Govt' },
            { id: 'private_vet', label: 'Private' },
            { id: 'pet_store', label: 'Stores' },
            { id: 'rescue', label: 'Rescue' }
          ].map(f => (
            <button 
              key={f.id} 
              onClick={() => setFilter(f.id as any)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeFilter === f.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-3">
        <p className="text-[10px] font-black text-slate-400 uppercase px-2 tracking-widest">{filtered.length} results</p>
        {filtered.map(loc => (
          <div key={loc.id} onClick={() => onSelect(loc)} className="p-5 bg-white rounded-[28px] border border-slate-200 hover:border-blue-500 transition-all cursor-pointer group shadow-sm active:scale-95">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 leading-tight">{loc.name}</h3>
              <div className={`w-2 h-2 rounded-full mt-1.5 ${loc.category === 'govt_vet' ? 'bg-red-500' : 'bg-blue-500'}`} />
            </div>
            <p className="text-[11px] text-slate-400 flex items-start gap-1 italic"><MapPin size={12} className="shrink-0 mt-0.5"/> {loc.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;