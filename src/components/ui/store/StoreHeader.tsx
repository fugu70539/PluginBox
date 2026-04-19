"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const filtersConfig = [
  { id: 'sort', label: 'Все', options: ['Все', 'Новые', 'Старые'] },
  { id: 'cat', label: 'Категории', options: ['Все', 'Работа', 'Развлечения', 'Упрощение', 'Кодинг', 'Дизайн'] },
  { id: 'type', label: 'Тип', options: ['Инлайн', 'Аппер'] },
];

export const StoreHeader = ({ view, setView }: { view: string, setView: (v: any) => void }) => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({
    sort: 'Все', cat: 'Категории', type: 'Тип'
  });

  const toggleFilter = (id: string) => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred("light");
    setOpenFilter(openFilter === id ? null : id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Фон-градиент */}
      <div className="absolute inset-0 h-64 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent z-0" />

      <div className="relative pt-6 flex flex-col gap-5 pointer-events-auto">
        
        {/* ChooseBar */}
        <div className="px-7">
          <div className="h-12 w-full mt-glass rounded-full p-1 flex relative">
            <motion.div
              animate={{ x: view === "plugins" ? "0%" : "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-white/[0.08] backdrop-blur-xl border border-white/[0.06] rounded-full z-0"
            />
            <button onClick={() => setView("plugins")} className={`flex-1 relative z-10 text-[13px] font-bold uppercase tracking-widest transition-all ${view === "plugins" ? "text-white" : "text-white/30"}`}>Плагины</button>
            <button onClick={() => setView("developers")} className={`flex-1 relative z-10 text-[13px] font-bold uppercase tracking-widest transition-all ${view === "developers" ? "text-white" : "text-white/30"}`}>Девелоперы</button>
          </div>
        </div>

        {/* Ряд фильтров — Чистая логика как в Хабе */}
        <AnimatePresence>
          {view === "plugins" && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex px-7 gap-2"
            >
              {filtersConfig.map((filter, index) => (
                <div key={filter.id} className={`relative flex-1 ${index === filtersConfig.length - 1 ? 'flex justify-end' : ''}`}>
                  <button
                    onClick={() => toggleFilter(filter.id)}
                    className="h-11 px-5 mt-glass rounded-full flex items-center gap-2.5 active:scale-95 transition-all whitespace-nowrap"
                  >
                    <span className="text-[14px] font-bold text-white/60 tracking-tight">
                      {selectedFilters[filter.id]}
                    </span>
                    <motion.img 
                      src="/Icons/ArrowRight.PNG?v=3" 
                      animate={{ rotate: openFilter === filter.id ? 90 : 0 }}
                      className="size-4 object-contain invert brightness-200 opacity-20"
                    />
                  </button>

                  {/* Выпадающее меню — Абсолютное позиционирование внутри relative родителя */}
                  <AnimatePresence>
                    {openFilter === filter.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 8 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        className={`mt-glass absolute top-full w-44 rounded-[28px] p-1.5 z-50 shadow-2xl 
                          ${index === filtersConfig.length - 1 ? 'right-0' : 'left-0'}`}
                      >
                        <div className="flex flex-col gap-1">
                          {filter.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setSelectedFilters(prev => ({ ...prev, [filter.id]: option }));
                                setOpenFilter(null);
                              }}
                              className="relative w-full px-4 py-3 text-left group"
                            >
                              {selectedFilters[filter.id] === option && (
                                <motion.div 
                                  layoutId={`bg-${filter.id}`}
                                  className="absolute inset-0 bg-white/15 backdrop-blur-xl rounded-[20px] z-0"
                                />
                              )}
                              <span className={`relative z-10 text-[14px] font-bold tracking-tight transition-colors duration-200 ${
                                selectedFilters[filter.id] === option ? "text-white" : "text-white/30 group-active:text-white/60"
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
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
