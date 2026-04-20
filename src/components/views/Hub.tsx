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

      tg.setHeaderColor("#131313");
      tg.setBackgroundColor("#0a0a0a");
    }
  }, []);

  const toggleFilter = () => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred("light");
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="w-full font-display min-h-screen bg-[#0a0a0a] overflow-x-hidden text-white flex flex-col">
      <div className="w-full hub-panel rounded-b-[45px] px-7 pt-5 pb-10 border-b border-white/[0.02] shrink-0">
        <header className="flex items-center justify-between mb-6">
          <div className="mt-glass h-11 w-22 rounded-full flex items-center justify-between px-1.5 border-white/5">
            <div className="size-8 rounded-full flex items-center justify-center overflow-hidden bg-white/10 ml-0.5">
              {userPhoto ? (
                <img src={userPhoto} alt="User" className="size-full rounded-full object-cover" />
              ) : (
                <div className="size-full rounded-full flex items-center justify-center text-white/40 text-[10px] font-bold uppercase">
                  {userName[0]}
                </div>
              )}
            </div>
            <button 
              onClick={onSettings}
              className="size-8 flex items-center justify-center active:scale-90 transition-all"
            >
              <img src="/Icons/Settings.PNG?v=3" alt="Settings" className="size-7 object-contain opacity-40" />
            </button>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center text-center mb-8 gap-y-0.5">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-[30px] font-bold tracking-tight leading-tight"
          >
            Привет, {userName}!
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-[30px] font-bold tracking-tight text-white/20 leading-tight"
          >
            Что бы ты хотел найти?
          </motion.h2>
        </div>

        <SearchInput />
      </div>

      <main className="px-7 pt-8 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6 relative shrink-0">
          <h3 className="text-[17px] font-bold text-white/90 tracking-tight">Рекомендуем</h3>
          
          <div className="relative">
            <button 
              onClick={toggleFilter}
              className="h-11 min-w-[95px] mt-glass rounded-full flex items-center justify-between px-5 active:scale-95 transition-all border-white/5"
            >
              <span className="text-[14px] font-bold tracking-tight text-white/60 mr-2">{activeFilter}</span>
              <motion.img 
                src="/Icons/ArrowRight.PNG?v=3" 
                alt="Filter" 
                animate={{ rotate: isFilterOpen ? 90 : 0 }}
                className="size-3.5 object-contain invert brightness-200 opacity-20" 
              />
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 8 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  className="absolute top-full right-0 w-44 rounded-[28px] p-1.5 z-50 shadow-2xl bg-[#161616]/70 backdrop-blur-[30px] border border-white/[0.08]"
                >
                  <div className="flex flex-col gap-1">
                    {filterOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => { setActiveFilter(option); setIsFilterOpen(false); }}
                        className="relative w-full px-4 py-3 text-left group"
                      >
                        {activeFilter === option && (
                          <motion.div 
                            layoutId="filter-bg-hub-new"
                            className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-[20px] z-0"
                          />
                        )}
                        <span className={`relative z-10 text-[14px] font-bold tracking-tight transition-colors duration-200 ${
                          activeFilter === option ? "text-white" : "text-white/30 group-active:text-white/60"
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
        </div>

        {/* Плейсхолдер при отсутствии плагинов */}
        <div className="flex-1 flex flex-col items-center justify-center pb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-white/5 rounded-[22px] mb-6 flex items-center justify-center border border-white/5"
          >
             <div className="w-6 h-6 bg-white/10 rounded-lg" />
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-center space-y-1.5"
          >
            <h4 className="text-[18px] font-bold text-white tracking-tight">У вас нет плагинов</h4>
            <p className="max-w-[240px] text-[14px] font-medium text-white/20 leading-snug">
              Возвращайтесь позже, мы уже готовим для вас что-то новое!
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
