import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const Onboarding = ({ onComplete }: { onComplete: (name: string) => void }) => {
  const [name, setName] = useState('');
  return (
    <div className="fixed inset-0 z-[10000] bg-[#FFF8F0] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-8">
        <img src="/logo.png" className="w-48 h-48 mx-auto rounded-full shadow-2xl border-4 border-orange-200" />
        <h1 className="text-4xl font-black text-[#4A2C2A] uppercase italic">Welcome to OnePaw</h1>
        <form onSubmit={(e) => { e.preventDefault(); if(name) onComplete(name); }} className="space-y-4">
          <input 
            type="text" placeholder="Enter your name..." 
            className="w-full p-5 rounded-3xl border-2 border-orange-100 text-center text-xl font-bold outline-none focus:border-orange-400"
            value={name} onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="w-full bg-[#E67E22] text-white p-5 rounded-3xl font-black uppercase shadow-xl hover:bg-[#D35400] transition-all flex items-center justify-center gap-2">
            Get Started <ArrowRight size={20}/>
          </button>
        </form>
      </div>
    </div>
  );
};
export default Onboarding;