"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchInput } from "@/components/ui/SearchInput";

const filterOptions = ["Все", "По имени", "По дате", "По рейтингу"];
const demoPlugins = [
  { title: "Plugin One" },
  { title: "Plugin Two" },
  { title: "Plugin Three" },
  { title: "Plugin Four" },
  { title: "Plugin Five" },
  { title: "Plugin Six" },
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

  const toggleFilter = () => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred("light");
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="w-full font-display min-h-screen bg-[#0a0a0a] relative">
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
            onClick={toggleFilter}
            className="h-12 px-6 bg-white/[0.08] backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-3.5 active:scale-95 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
          >
            <span className="text-[14px] font-bold tracking-tight text-white/70">{activeFilter}</span>
            <motion.svg 
              viewBox="0 0 24 24" 
              fill="none" 
              animate={{ rotate: isFilterOpen ? 90 : 0 }}
              className="size-5 stroke-white opacity-40 transition-opacity"
              strokeWidth="2.5"
            >
              <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </button>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 10 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="absolute top-full right-0 w-48 bg-[#1a1a1a]/70 backdrop-blur-3xl rounded-[32px] p-2 z-50 shadow-[0_16px_48px_rgba(0,0,0,0.6)] border border-white/[0.06]"
              >
                <div className="flex flex-col gap-1.5 overflow-hidden">
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => { setActiveFilter(option); setIsFilterOpen(false); }}
                      className="relative w-full px-5 py-3.5 text-left group overflow-hidden rounded-[20px]"
                    >
                      {activeFilter === option && (
                        <motion.div 
                          layoutId="filter-bg"
                          className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl z-0 border border-white/[0.08]"
                        />
                      )}
                      <span className={`relative z-10 text-[14px] font-bold tracking-tight transition-colors duration-200 ${
                        activeFilter === option ? "text-white" : "text-white/40 group-active:text-white/70"
                      }`}>
                        {option}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="relative z-10 px-7 pt-32 flex flex-col items-center">
        <header className="w-full flex flex-col items-center justify-center text-center mb-10 gap-y-1.5 text-white font-display">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-[32px] font-extrabold tracking-tight leading-tight"
          >
            <span className="bg-gradient-to-b from-white to-white/90 bg-clip-text">Привет, {userName}!</span>
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-[32px] font-extrabold tracking-tight text-white/30 leading-tight"
          >
            Что бы ты хотел найти?
          </motion.h2>
        </header>

        <SearchInput />

        <div className="w-full mt-10">
          <h3 className="text-[11px] font-bold text-white/20 uppercase tracking-[0.15em] ml-2 mb-5">Рекомендуем</h3>
          
          <div className="grid grid-cols-2 gap-5 pb-40">
            {demoPlugins.map((item, i) => (
              <motion.div 
                key={i}
                whileTap={{ scale: 0.97 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
                className="mt-glass rounded-[2.5rem] p-7 flex flex-col items-center py-9 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
              >
                 <div className="w-14 h-14 bg-white/[0.06] rounded-3xl mb-4.5" />
                 <span className="text-[12px] font-bold tracking-tight text-white/40 uppercase tracking-widest text-center">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-[180px] pointer-events-none z-40 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent backdrop-blur-[12px] [mask-image:linear-gradient(to_top,black_60%,transparent)]" />
    </div>
  );
}
