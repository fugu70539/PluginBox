import { GlassCard } from "../ui/GlassCard";

export default function Hub() {
  return (
    <div className="px-6 pt-14 animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-8">
        <img src="/Icons/back.svg" className="w-6 h-6" alt="Back" />
        <h1 className="text-[10px] font-black tracking-[0.4em] uppercase opacity-50">PluginBox</h1>
        <img src="/Icons/settings.svg" className="w-6 h-6" alt="Settings" />
      </header>

      <GlassCard className="aspect-square flex flex-col items-center justify-center mb-8">
        <img src="/Pictures/empty-box.png" className="w-32 h-32 mb-6 opacity-30" alt="Box" />
        <span className="text-white/30 text-xl font-medium tracking-tight">No Plugs</span>
      </GlassCard>

      <button className="w-full bg-white text-black py-5 rounded-full font-black uppercase text-[12px] tracking-widest active:scale-95 transition-all">
        Browse
      </button>

      <div className="mt-12">
        <h2 className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ml-4">Suggested</h2>
        <div className="grid grid-cols-2 gap-4">
          <GlassCard className="flex flex-col items-center py-4">
            <div className="w-10 h-10 bg-white/5 rounded-xl mb-2" />
            <span className="text-[11px] font-bold uppercase tracking-tighter">Plug anc</span>
          </GlassCard>
          <GlassCard className="flex flex-col items-center py-4">
            <div className="w-10 h-10 bg-white/5 rounded-xl mb-2" />
            <span className="text-[11px] font-bold uppercase tracking-tighter">Teather</span>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
