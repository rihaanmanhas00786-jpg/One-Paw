import React from 'react';
import { 
  ChevronLeft, Bird, Dog, Scale, Snowflake, 
  Info, Zap, Heart, Cat, AlertTriangle 
} from 'lucide-react';

const InfoHub = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="w-full min-h-screen bg-[#FFF8F0] pb-24 overflow-y-auto">
      {/* Premium Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 p-4 flex items-center justify-between shadow-sm">
        <button 
          onClick={onBack} 
          className="p-3 bg-orange-50 text-orange-700 rounded-2xl hover:bg-orange-600 hover:text-white transition-all active:scale-90"
        >
          <ChevronLeft size={24} strokeWidth={3}/>
        </button>
        <h1 className="font-black text-xl tracking-tighter uppercase text-[#4A2C2A] italic">Knowledge Hub</h1>
        <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
          <Heart size={24} fill="currentColor"/>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-12">
        
        {/* NEW SECTION: CAT CARE (20 Points) */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-[#4A2C2A] mb-8 flex items-center gap-3 italic">
            <Cat size={36} className="text-orange-600"/> Cat Care & Safety
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Cat Do's */}
            <div className="bg-white p-8 rounded-[40px] shadow-xl border border-orange-50">
              <p className="font-black text-green-600 text-xs uppercase tracking-[0.2em] mb-4 border-b border-green-50 pb-2">✅ Essential Do's</p>
              <ul className="text-xs space-y-3 text-slate-600 font-medium leading-relaxed">
                <li>• Provide clean, fresh water whenever possible.</li>
                <li>• Feed cat-safe food (commercial or plain cooked chicken/fish).</li>
                <li>• Provide shelter from extreme heat, cold, and rain.</li>
                <li>• Take pet cats for regular veterinary checkups.</li>
                <li>• Help injured strays reach a rescue or veterinarian.</li>
                <li>• Vaccinate and deworm pet cats to prevent diseases.</li>
                <li>• Spay or neuter cats to control the stray population.</li>
                <li>• Handle gently and respect their space if frightened.</li>
                <li>• Keep surroundings and food bowls clean.</li>
                <li>• Provide toys or scratching posts for stimulation.</li>
              </ul>
            </div>

            {/* Cat Don'ts */}
            <div className="bg-white p-8 rounded-[40px] shadow-xl border border-orange-50">
              <p className="font-black text-red-600 text-xs uppercase tracking-[0.2em] mb-4 border-b border-red-50 pb-2">❌ Strict Don'ts</p>
              <ul className="text-xs space-y-3 text-slate-600 font-medium leading-relaxed">
                <li>• Don't feed chocolate, onions, garlic, grapes, or raisins.</li>
                <li>• Don't give cooked bones (they splinter and cause injury).</li>
                <li>• Don't force interaction if a cat feels threatened.</li>
                <li>• Don't hit, shout at, or mistreat any cat.</li>
                <li>• Don't leave plastic bags or strings where they can swallow them.</li>
                <li>• Don't give human medicines without veterinary advice.</li>
                <li>• Don't ignore breathing difficulty or severe wounds.</li>
                <li>• Don't abandon pet cats to survive on their own.</li>
                <li>• Don't expose them to pesticides or poisonous plants.</li>
                <li>• Don't disturb a mother cat and her kittens unnecessarily.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION: WINTER CARE (10 Points) */}
        <section className="bg-[#4A2C2A] rounded-[50px] p-10 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform">
            <Snowflake size={150} />
          </div>
          <h2 className="text-2xl font-black mb-8 flex items-center gap-3 italic tracking-tight underline decoration-orange-500 underline-offset-8">
            <Snowflake className="text-blue-300 animate-pulse"/> Srinagar Winter Protocol
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-sm relative z-10">
            <ul className="space-y-4 font-medium opacity-90">
              <li>1. Use **dry straw** in stray shelters (it doesn't hold moisture like blankets).</li>
              <li>2. **Check under car hoods**; cats sleep on warm engines.</li>
              <li>3. Provide **lukewarm water**; cold water drops their body temp.</li>
              <li>4. Feed high-calorie meals to help them generate internal heat.</li>
              <li>5. Clean paws after snow walks to remove burning **salt chemicals**.</li>
            </ul>
            <ul className="space-y-4 font-medium opacity-90">
              <li>6. Waterproof all outdoor shelters using plastic tarps.</li>
              <li>7. Never shave their coats in winter; it is their only insulation.</li>
              <li>8. Keep heaters guarded; pets often get **"radiator burns"**.</li>
              <li>9. Check for "Frostbite" (hard, cold, or pale skin) on ear tips.</li>
              <li>10. Clean Antifreeze spills immediately; they are toxic and sweet.</li>
            </ul>
          </div>
        </section>

        {/* SECTION: DOGS & BIRDS */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-[40px] shadow-lg border border-orange-50">
            <h3 className="font-black text-orange-600 mb-6 flex items-center gap-2 uppercase tracking-tighter italic">
              <Dog size={24}/> Stray Dog Safety
            </h3>
            <ul className="text-xs space-y-4 text-slate-600 font-bold italic">
              <li className="flex gap-3">🚫 <p>NEVER run away; it triggers a chase instinct.</p></li>
              <li className="flex gap-3">🚫 <p>Avoid direct eye contact; look at the ground.</p></li>
              <li className="flex gap-3">🚫 <p>Don't feed in high-traffic areas like main markets.</p></li>
              <li className="flex gap-3">🚫 <p>Don't give spicy food, sweets, or oily Wazwan remains.</p></li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-[40px] shadow-lg border border-orange-50">
            <h3 className="font-black text-blue-600 mb-6 flex items-center gap-2 uppercase tracking-tighter italic">
              <Bird size={24}/> Bird Protection
            </h3>
            <ul className="text-xs space-y-4 text-slate-600 font-bold italic">
              <li className="flex gap-3">⭐ <p>Clean water in shallow pots is vital for summer/winter.</p></li>
              <li className="flex gap-3">⭐ <p>Feed Bajra or Kangni; avoid white bread (Angel Wing risk).</p></li>
              <li className="flex gap-3">⭐ <p>Keep feeders high to protect from stray/pet cats.</p></li>
              <li className="flex gap-3">⭐ <p>Report sick migratory birds near Dal Lake to Wildlife Dept.</p></li>
            </ul>
          </div>
        </section>

        {/* SECTION: LEGAL RIGHTS */}
        <section className="space-y-6 pt-10 border-t border-orange-100">
          <h2 className="text-3xl font-black text-[#4A2C2A] flex items-center gap-3 italic">
            <Scale size={32} className="text-slate-400"/> Animal Rights & Laws
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <LawCard s="11(1)(a)" t="Torture" d="Beating, kicking, or over-riding any animal is a punishable crime." />
            <LawCard s="11(1)(i)" t="Abandonment" d="Abandoning a pet in a way that it suffers hunger or thirst is illegal." />
            <LawCard s="ABC 2023" t="Stray Rights" d="Stray dogs cannot be killed or relocated. Population control is via ABC." />
            <LawCard s="BNS 2023" t="Maiming" d="Poisoning or killing animals carries heavy fines and imprisonment." />
            <LawCard s="Rules 2018" t="Pet Shops" d="Pet shops must be registered and provide adequate space & ventilation." />
            <LawCard s="Wild 1972" t="Wildlife" d="Capturing wild birds (including local species) is a non-bailable crime." />
          </div>
        </section>

        {/* Footer Accent */}
        <div className="bg-orange-500 p-10 rounded-[50px] text-white text-center">
            <AlertTriangle className="mx-auto mb-4" size={32} />
            <h3 className="text-xl font-black italic">REPORT CRUELTY</h3>
            <p className="text-xs font-bold opacity-80 mt-2 uppercase tracking-widest leading-relaxed">
                If you witness a violation of these laws in Srinagar,<br/>
                use the REPORT feature on the Home Page immediately.
            </p>
        </div>
      </div>
    </div>
  );
};

const LawCard = ({s, t, d}: any) => (
  <div className="bg-white p-6 rounded-[32px] border border-orange-50 shadow-md hover:border-orange-400 transition-all group">
    <span className="text-[10px] font-black bg-[#4A2C2A] text-white px-3 py-1 rounded-full uppercase tracking-tighter">Section {s}</span>
    <h4 className="font-black text-[#4A2C2A] mt-3 text-lg uppercase italic group-hover:text-orange-600 transition-colors">{t}</h4>
    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-medium">{d}</p>
  </div>
);

export default InfoHub;