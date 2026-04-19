"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const filters = [
  { id: 'sort', label: 'Все', options: ['Все', 'Новые', 'Старые'] },
  { id: 'cat', label: 'Категории', options: ['Все', 'Работа', 'Развлечения', 'Упрощение', 'Кодинг'] },
  { id: 'rate', label: 'Рейтинг', options: ['5 звезд', '4 звезды', '3 звезды'] },
  { id: 'type', label: 'Тип', options: ['Инлайн', 'Аппер'] },
];

interface StoreHeaderProps {
  view: "plugins" | "developers";
  setView: (v: "plugins" | "developers") => void;
}

export const StoreHeader = ({ view, setView }: StoreHeaderProps) => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred("light");
    setOpenFilter(openFilter === id ? null : id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="absolute inset-0 h-48 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent" />
      
      <div className="relative pt-6 flex flex-col gap-5 pointer-events-auto">
        {/* Ряд фильтров */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 px-7">
          {filters.map((filter) => (
            <div key={filter.id} className="relative">
              <button
                onClick={() => handleToggle(filter.id)}
                className="h-11 px-5 mt-glass rounded-full flex items-center gap-2.5 shrink-0 active:scale-95 transition-all"
              >
                <span className="text-[14px] font-bold text-white/60 tracking-tight whitespace-nowrap">{filter.label}</span>
                <motion.svg 
                  viewBox="0 0 24 24" fill="none" strokeWidth="2.5"
                  animate={{ rotate: openFilter === filter.id ? 90 : 0 }}
                  className="size-4 stroke-white/20"
                >
                  <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </button>

              <AnimatePresence>
                {openFilter === filter.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 10, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute top-full left-0 w-48 bg-[#1a1a1a]/80 backdrop-blur-3xl rounded-[28px] p-1.5 z-[60] shadow-2xl border border-white/[0.08]"
                  >
                    {filter.options.map((opt) => (
                      <button 
                        key={opt}
                        onClick={() => setOpenFilter(null)}
                        className="w-full px-5 py-3 text-left text-[14px] font-bold text-white/40 active:text-white transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="shrink-0 w-7" />
        </div>

        {/* ChooseBar — Переключатель Плагины / Девелоперы */}
        <div className="px-7">
          <div className="h-12 w-full mt-glass rounded-full p-1 flex relative overflow-hidden">
            <motion.div
              initial={false}
              animate={{ x: view === "plugins" ? "0%" : "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-white/[0.08] backdrop-blur-xl border border-white/[0.06] rounded-full z-0"
            />
            <button 
              onClick={() => setView("plugins")}
              className={`flex-1 relative z-10 text-[13px] font-bold uppercase tracking-widest transition-colors ${view === "plugins" ? "text-white" : "text-white/30"}`}
            >
              Плагины
            </button>
            <button 
              onClick={() => setView("developers")}
              className={`flex-1 relative z-10 text-[13px] font-bold uppercase tracking-widest transition-colors ${view === "developers" ? "text-white" : "text-white/30"}`}
            >
              Девелоперы
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
