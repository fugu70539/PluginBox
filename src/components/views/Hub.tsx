"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchInput } from "@/components/ui/SearchInput";

const filterOptions = ["Все", "По имени", "По дате", "По рейтингу"];

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
    <div className="w-full font-display">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-start justify-between px-7 pt-3 pointer-events-none">
        <div className="mt-glass h-11 w-22 rounded-full flex items-center justify-between px-1.5 pointer-events-auto">
          <div className="size-8 rounded-full flex items-center justify-center overflow-hidden bg-white/5 ml-0.5">
            {userPhoto ? (
              <img src={userPhoto} alt="User" className="size-full rounded-full object-cover" />
            ) : (
              <div className="size-full rounded-full flex items-center justify-center text-white/40 text-[10px] font-bold uppercase">
                {userName[0]}
              </div>
            )}
          </div>
          <button className="size-8 flex items-center justify-center active:scale-90 transition-all">
            <img src="/Icons/Settings.PNG" alt="Settings" className="size-7 object-contain opacity-40" />
          </button>
        </div>

        <div className="relative flex flex-col items-end pointer-events-auto">
          <button 
            onClick={toggleFilter}
            className="mt-glass h-11 px-5 rounded-full flex items-center gap-3 active:scale-95 transition-all"
          >
            <span className="text-[14px] font-bold tracking-tight text-white/60">{activeFilter}</span>
            <motion.img 
              src="/Icons/ArrowRight.PNG" 
              alt="Filter icon" 
              animate={{ rotate: isFilterOpen ? 90 : 0 }}
              className="size-5 object-contain opacity-40" 
              style={{ filter: "brightness(1.5) contrast(1.2)" }}
            />
          </button>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 5, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="mt-glass absolute top-full right-0 w-44 rounded-[24px] py-2 z-50 overflow-hidden shadow-2xl"
              >
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => { setActiveFilter(option); setIsFilterOpen(false); }}
                    className={`w-full px-5 py-3 text-left text-[14px] font-bold tracking-tight transition-colors ${
                      activeFilter === option ? "text-white bg-white/10" : "text-white/40 active:bg-white/5"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="relative z-10 px-7 pt-24 flex flex-col items-center text-white">
        <header className="w-full flex flex-col items-center justify-center text-center mb-6 gap-y-0.5">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-[28px] font-bold tracking-tight leading-tight"
          >
            Привет, {userName}!
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-[28px] font-bold tracking-tight text-white/25 leading-tight"
          >
            Что бы ты хотел найти?
          </motion.h2>
        </header>

        <SearchInput />

        <div className="mt-12 w-full grid grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <motion.div 
              key={i}
              whileTap={{ scale: 0.97 }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 * i }}
              className="mt-glass rounded-[2.2rem] p-6 flex flex-col items-center py-7"
            >
               <div className="w-12 h-12 bg-white/10 rounded-2xl mb-3 flex items-center justify-center">
                  <div className="size-6 bg-white/20 rounded-full blur-[3px]" />
               </div>
               <span className="text-[12px] font-bold tracking-tight text-white/40 uppercase">Plugin</span>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
