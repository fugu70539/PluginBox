"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchInput } from "@/components/ui/SearchInput";

const filterOptions = ["Все", "По имени", "По дате", "По рейтингу"];
const demoPlugins = [
  { id: 1, title: "Plugin One" },
  { id: 2, title: "Teather Pro" },
  { id: 3, title: "Socket Tool" },
  { id: 4, title: "Nexus Core" },
  { id: 5, title: "Flow Mod" },
  { id: 6, title: "Vision Kit" },
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
    <div className="w-full font-display min-h-screen bg-[#0a0a0a] pb-40">
      {/* Невидимая зона размытия позади таббара */}
      <div className="bottom-blur-gradient" />

      <header className="fixed top-0 left-0 right-0 z-50 h-24 flex items-start justify-between px-7 pt-7 pointer-events-none">
        <div className="h-12 w-24 bg-white/[0.08] backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-between px-1.5 pointer-events-auto">
          <div className="size-9 rounded-full flex items-center justify-center overflow-hidden bg-white/10 ml-0.5">
            {userPhoto ? (
              <img src={userPhoto} alt="User" className="size-full rounded-full object-cover" />
            ) : (
              <div className="size-full rounded-full flex items-center justify-center text-white/40 text-[11px] font-bold uppercase bg-white/5">
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

        <div className="relative flex flex-col items-end pointer-events-auto">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="h-12 px-6 bg-white/[0.08] backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-3.5 active:scale-95 transition-all"
          >
            <span className="text-[14px] font-bold tracking-tight text-white/70">{activeFilter}</span>
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
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 10 }} exit={{ opacity: 0, y: -10 }}
                className="absolute top-full right-0 w-48 bg-[#1a1a1a]/80 backdrop-blur-3xl rounded-[32px] p-2 z-50 border border-white/[0.06]"
              >
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => { setActiveFilter(option); setIsFilterOpen(false); }}
                    className="relative w-full px-5 py-3.5 text-left rounded-[20px] overflow-hidden group"
                  >
                    {activeFilter === option && (
                      <motion.div layoutId="f-bg" className="absolute inset-0 bg-white/10" />
                    )}
                    <span className={`relative z-10 text-[14px] font-bold ${activeFilter === option ? "text-white" : "text-white/30"}`}>
                      {option}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="relative z-10 px-7 pt-32 flex flex-col items-start">
        <div className="w-full text-center mb-10">
          <h1 className="text-[32px] font-extrabold tracking-tight text-white">Привет, {userName}!</h1>
          <h2 className="text-[32px] font-extrabold tracking-tight text-white/30">Что бы ты хотел найти?</h2>
        </div>

        <SearchInput />

        {/* Подзаголовок РЕКОМЕНДУЕМ */}
        <div className="mt-12 mb-5">
          <h3 className="text-[11px] font-black tracking-[0.15em] text-white/20 uppercase">Рекомендуем</h3>
        </div>

        {/* Сетка из 6 демо плагинов */}
        <div className="w-full grid grid-cols-2 gap-5">
          {demoPlugins.map((item, i) => (
            <motion.div 
              key={item.id}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="mt-glass rounded-[2.5rem] p-7 flex flex-col items-center py-9 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            >
               <div className="w-14 h-14 bg-white/[0.06] rounded-3xl mb-4.5" />
               <span className="text-[12px] font-bold tracking-tight text-white/40 uppercase tracking-widest text-center">
                 {item.title}
               </span>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
