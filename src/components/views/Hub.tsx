"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchInput } from "@/components/ui/SearchInput";

const filterOptions = ["Все", "По имени", "По дате", "По рейтингу"];
const demoPlugins = [
  { id: 1, title: "Elevator Plus" },
  { id: 2, title: "Script API" },
  { id: 3, title: "UI Engine" },
  { id: 4, title: "Logic Box" },
  { id: 5, title: "Shader Pack" },
  { id: 6, title: "Anarchy Core" },
];

export default function Hub() {
  const [userName, setUserName] = useState("Artem");
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("Все");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      const userData = tg.initDataUnsafe?.user;
      if (userData?.first_name) setUserName(userData.first_name);
      if (userData?.photo_url) setUserPhoto(userData.photo_url);
    }
  }, []);

  return (
    <div className="w-full font-display min-h-screen bg-[#0a0a0a] overflow-y-auto no-scrollbar pb-40">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 h-24 flex items-start justify-between px-7 pt-7 pointer-events-none">
        <div className="h-12 w-24 bg-white/[0.08] backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-between px-1.5 pointer-events-auto">
          <div className="size-9 rounded-full flex items-center justify-center overflow-hidden bg-white/10 ml-0.5 border border-white/5">
            {userPhoto ? (
              <img src={userPhoto} alt="User" className="size-full rounded-full object-cover" />
            ) : (
              <div className="size-full flex items-center justify-center text-white/40 text-[11px] font-bold uppercase">
                {userName[0]}
              </div>
            )}
          </div>
          <button className="size-9 flex items-center justify-center active:scale-90 transition-all opacity-40">
            <svg viewBox="0 0 24 24" fill="none" className="size-7 stroke-white" strokeWidth="1.5">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="3" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="relative pointer-events-auto">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="h-12 px-6 bg-white/[0.08] backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-3.5 active:scale-95 transition-all shadow-lg"
          >
            <span className="text-[14px] font-bold text-white/70">{activeFilter}</span>
            <motion.svg 
              viewBox="0 0 24 24" fill="none" 
              animate={{ rotate: isFilterOpen ? 90 : 0 }}
              className="size-5 stroke-white opacity-40" strokeWidth="2.5"
            >
              <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </button>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 10 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute top-full right-0 w-48 bg-[#1a1a1a]/80 backdrop-blur-3xl rounded-[28px] p-1.5 z-50 border border-white/[0.08] shadow-2xl"
              >
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => { setActiveFilter(option); setIsFilterOpen(false); }}
                    className="relative w-full px-5 py-3 text-left rounded-[20px] overflow-hidden group"
                  >
                    {activeFilter === option && (
                      <motion.div layoutId="f-bg" className="absolute inset-0 bg-white/10 backdrop-blur-md" />
                    )}
                    <span className={`relative z-10 text-[14px] font-bold ${activeFilter === option ? "text-white" : "text-white/30 group-active:text-white/60"}`}>
                      {option}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="px-7 pt-32 flex flex-col">
        <header className="w-full flex flex-col items-center text-center mb-10 gap-y-1">
          <h1 className="text-[32px] font-extrabold tracking-tight">Привет, {userName}!</h1>
          <h2 className="text-[32px] font-extrabold tracking-tight text-white/25">Что бы ты хотел найти?</h2>
        </header>

        <SearchInput />

        {/* SECTION: РЕКОМЕНДУЕМ */}
        <div className="mt-10 mb-5 ml-1">
           <h3 className="text-[11px] font-black tracking-[0.2em] text-white/30 uppercase">Рекомендуем</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 pb-10">
          {demoPlugins.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.96 }}
              className="mt-glass rounded-[2.5rem] p-7 flex flex-col items-center py-9 shadow-lg"
            >
               <div className="w-14 h-14 bg-white/[0.06] rounded-[1.4rem] mb-4.5 border border-white/5" />
               <span className="text-[12px] font-bold text-white/40 uppercase tracking-widest">{item.title}</span>
            </motion.div>
          ))}
        </div>
      </main>

      {/* BLUR OVERLAY (Невидимая зона размытия) */}
      <div className="bottom-blur-mask" />
    </div>
  );
}
