"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const filters = [
  { id: 'sort', label: 'Все', options: ['Все', 'Новые', 'Старые'] },
  { id: 'cat', label: 'Категории', options: ['Все', 'Работа', 'Развлечения', 'Упрощение', 'Кодинг', 'Дизайн'] },
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
    <>
      {/* Слой фона вынесен отдельно, чтобы не перекрывать z-index списков */}
      <div className="fixed top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent z-[40] pointer-events-none" />

      <header className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
        <div className="relative pt-6 flex flex-col gap-5 pointer-events-auto">
          
          {/* ChooseBar */}
          <div className="px-7">
            <div className="h-12 w-full mt-glass rounded-full p-1 flex relative">
              <motion.div
                initial={false}
                animate={{ x: view === "plugins" ? "0%" : "100%" }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-white/[0.08] backdrop-blur-xl border border-white/[0.06] rounded-full z-0"
              />
              <button onClick={() => setView("plugins")} className={`flex-1 relative z-10 text-[13px] font-bold uppercase tracking-widest transition-colors ${view === "plugins" ? "text-white" : "text-white/30"}`}>
                Плагины
              </button>
              <button onClick={() => setView("developers")} className={`flex-1 relative z-10 text-[13px] font-bold uppercase tracking-widest transition-colors ${view === "developers" ? "text-white" : "text-white/30"}`}>
                Девелоперы
              </button>
            </div>
          </div>

          {/* Ряд фильтров */}
          <AnimatePresence>
            {view === "plugins" && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex overflow-x-auto gap-2 px-7 pb-20 -mb-20" // Отрицательный марджин позволяет спискам выпадать за пределы контейнера
              >
                {filters.map((filter) => (
                  <div key={filter.id} className="relative shrink-0">
                    <button
                      onClick={() => handleToggle(filter.id)}
                      className="h-11 px-5 mt-glass rounded-full flex items-center gap-2.5 active:scale-95 transition-all"
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
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 14, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          className="absolute top-full left-0 w-48 bg-[#161616] backdrop-blur-3xl rounded-[24px] py-2 z-[200] shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/[0.08]"
                        >
                          {filter.options.map((opt) => (
                            <button key={opt} onClick={() => setOpenFilter(null)} className="w-full px-5 py-3 text-left text-[14px] font-bold text-white/40 active:text-white active:bg-white/5 transition-all">
                              {opt}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                {/* Ограничитель скролла — просто небольшой паддинг в конце */}
                <div className="min-w-[28px] h-1" /> 
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
};
