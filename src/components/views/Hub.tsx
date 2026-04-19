"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchInput } from "@/components/ui/SearchInput";

const filterOptions = ["Все", "По имени", "По дате", "По рейтингу"];

export default function Hub({ onSettings }: { onSettings: () => void }) {
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
    <div className="w-full font-display min-h-screen bg-[#0a0a0a]">
      <header className="fixed top-0 left-0 right-0 z-50 h-20 flex items-start justify-between px-7 pt-5 pointer-events-none">
        <div className="mt-glass h-11 w-22 rounded-full flex items-center justify-between px-1.5 pointer-events-auto">
          <div className="size-8 rounded-full flex items-center justify-center overflow-hidden bg-white/10 ml-0.5">
            {userPhoto ? (
              <img src={userPhoto} alt="User" className="size-full rounded-full object-cover" />
            ) : (
              <div className="size-full rounded-full flex items-center justify-center text-white/40 text-[10px] font-bold uppercase">{userName[0]}</div>
            )}
          </div>
          <button onClick={onSettings} className="size-8 flex items-center justify-center active:scale-90 transition-all">
            <img src="/Icons/Settings.PNG?v=3" alt="Settings" className="size-7 object-contain opacity-40" />
          </button>
        </div>

        <div className="relative flex flex-col items-end pointer-events-auto">
          <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="mt-glass h-11 px-5 rounded-full flex items-center gap-3 active:scale-95 transition-all">
            <span className="text-[14px] font-bold tracking-tight text-white/60">{activeFilter}</span>
            <motion.img src="/Icons/ArrowRight.PNG?v=3" animate={{ rotate: isFilterOpen ? 90 : 0 }} className="size-5 object-contain invert brightness-200 opacity-40" />
          </button>
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div initial={{ opacity: 0, scale: 0.9, y: -20 }} animate={{ opacity: 1, scale: 1, y: 8 }} exit={{ opacity: 0, scale: 0.9, y: -20 }} className="mt-glass absolute top-full right-0 w-44 rounded-[28px] p-1.5 z-50 shadow-2xl">
                <div className="flex flex-col gap-1">
                  {filterOptions.map((option) => (
                    <button key={option} onClick={() => { setActiveFilter(option); setIsFilterOpen(false); }} className="relative w-full px-4 py-3 text-left group">
                      {activeFilter === option && <motion.div layoutId="filter-bg" className="absolute inset-0 bg-white/15 backdrop-blur-xl rounded-[20px]" />}
                      <span className={`relative z-10 text-[14px] font-bold tracking-tight transition-colors ${activeFilter === option ? "text-white" : "text-white/30"}`}>{option}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="relative z-10 px-7 pt-28 flex flex-col items-center">
        <header className="w-full flex flex-col items-center justify-center text-center mb-8 gap-y-1">
          <motion.h1 className="text-[30px] font-bold tracking-tight">Привет, {userName}!</motion.h1>
          <motion.h2 className="text-[30px] font-bold tracking-tight text-white/25">Что бы ты хотел найти?</motion.h2>
        </header>
        <SearchInput />
      </main>
    </div>
  );
}
