"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const storeFilterOptions = ["Все", "По рейтингу", "Выбор редакции"];

export default function Store() {
  const [activeFilter, setActiveFilter] = useState("Все");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred("light");
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="w-full font-display min-h-screen bg-[#0a0a0a]">
      {/* Шапка Стора: строго повторяет высоту и отступы Хаба */}
      <header className="fixed top-0 left-0 right-0 z-50 h-24 flex items-start justify-between px-7 pt-7 pointer-events-none">
        {/* Левая часть пустая или для заголовка секции */}
        <div className="flex flex-col pointer-events-auto">
           <h3 className="text-[20px] font-extrabold tracking-tight text-white/90 ml-1">
             Маркетплейс
           </h3>
        </div>

        {/* Фильтр — копия логики из Хаба */}
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
              className="size-5 stroke-white opacity-40"
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
                className="absolute top-full right-0 w-52 bg-[#1a1a1a]/70 backdrop-blur-3xl rounded-[32px] p-2 z-50 shadow-[0_16px_48px_rgba(0,0,0,0.6)] border border-white/[0.06]"
              >
                <div className="flex flex-col gap-1.5">
                  {storeFilterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => { setActiveFilter(option); setIsFilterOpen(false); }}
                      className="relative w-full px-5 py-3.5 text-left group overflow-hidden rounded-[20px]"
                    >
                      {activeFilter === option && (
                        <motion.div 
                          layoutId="store-filter-bg"
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
        {/* Место для будущего контента плагинов */}
        <div className="w-full flex flex-col gap-6">
           {/* Сюда будем вешать карточки */}
           <div className="mt-glass w-full h-40 rounded-[2.5rem] flex items-center justify-center border-dashed border-white/5">
              <span className="text-white/10 font-bold uppercase tracking-widest text-[12px]">Контент магазина</span>
           </div>
        </div>
      </main>
    </div>
  );
}
