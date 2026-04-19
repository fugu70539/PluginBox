"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const filtersConfig = [
  { id: 'sort', label: 'Сортировка', options: ['Все', 'Новые', 'Старые'] },
  { id: 'cat', label: 'Категория', options: ['Все', 'Работа', 'Развлечения', 'Упрощение', 'Кодинг', 'Дизайн', 'Безопасность', 'Музыка'] },
  { id: 'type', label: 'Тип плагина', options: ['Инлайн', 'Аппер'] },
];

// Ширина плашек, чтобы всё влезло и не прыгало
const getMinWidth = (id: string) => {
  if (id === 'cat') return 'w-[140px]'; // Самая широкая для "Развлечения"
  if (id === 'type') return 'w-[110px]';
  return 'w-[100px]';
};

export const StoreHeader = ({ view, setView }: { view: string, setView: (v: any) => void }) => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({
    sort: 'Все', cat: 'Все', type: 'Инлайн'
  });

  const toggleFilter = (id: string) => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred("light");
    setOpenFilter(openFilter === id ? null : id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="absolute inset-0 h-72 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent z-0" />

      <div className="relative pt-6 flex flex-col gap-6 pointer-events-auto">
        
        {/* ChooseBar */}
        <div className="px-7">
          <div className="h-12 w-full mt-glass rounded-full p-1 flex relative">
            <motion.div
              animate={{ x: view === "plugins" ? "0%" : "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-white/[0.08] backdrop-blur-xl border border-white/[0.06] rounded-full z-0"
            />
            <button onClick={() => setView("plugins")} className={`flex-1 relative z-10 text-[13px] font-bold uppercase tracking-[0.15em] transition-all ${view === "plugins" ? "text-white" : "text-white/30"}`}>Плагины</button>
            <button onClick={() => setView("developers")} className={`flex-1 relative z-10 text-[13px] font-bold uppercase tracking-[0.15em] transition-all ${view === "developers" ? "text-white" : "text-white/30"}`}>Девелоперы</button>
          </div>
        </div>

        {/* Ряд фильтров */}
        <AnimatePresence>
          {view === "plugins" && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
              className="flex px-7 justify-between items-end gap-2"
            >
              {filtersConfig.map((filter, index) => (
                <div key={filter.id} className="relative flex flex-col gap-1.5">
                  {/* Заголовок над плашкой */}
                  <span className="ml-4 text-[10px] font-black uppercase tracking-[0.1em] text-white/15">
                    {filter.label}
                  </span>

                  <button
                    onClick={() => toggleFilter(filter.id)}
                    className={`h-11 ${getMinWidth(filter.id)} mt-glass rounded-full flex items-center justify-between px-5 active:scale-95 transition-all`}
                  >
                    <span className="text-[14px] font-bold text-white/60 tracking-tight truncate mr-2">
                      {selectedFilters[filter.id]}
                    </span>
                    <motion.img 
                      src="/Icons/ArrowRight.PNG?v=3" 
                      animate={{ rotate: openFilter === filter.id ? 90 : 0 }}
                      className="size-3.5 object-contain invert brightness-200 opacity-20 shrink-0"
                    />
                  </button>

                  {/* Меню с логикой скролла */}
                  <AnimatePresence>
                    {openFilter === filter.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 8 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        className={`mt-glass absolute top-[100%] w-48 rounded-[28px] p-1.5 z-50 shadow-2xl 
                          ${index === filtersConfig.length - 1 ? 'right-0' : 'left-0'}`}
                      >
                        <div className={`flex flex-col gap-1 no-scrollbar ${filter.options.length > 5 ? 'max-h-[240px] overflow-y-auto px-0.5' : ''}`}>
                          {filter.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setSelectedFilters(prev => ({ ...prev, [filter.id]: option }));
                                setOpenFilter(null);
                              }}
                              className="relative w-full px-4 py-3 text-left group shrink-0"
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
