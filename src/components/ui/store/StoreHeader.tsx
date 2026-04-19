"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const filtersConfig = [
  { id: 'sort', label: 'Сорт', options: ['Все', 'Новые', 'Старые'] },
  { id: 'cat', label: 'Категория', options: ['Все', 'Работа', 'Развлечения', 'Упрощение', 'Кодинг', 'Дизайн'] },
  { id: 'type', label: 'Тип', options: ['Инлайн', 'Аппер'] },
];

const getMinWidth = (id: string) => {
  if (id === 'cat') return 'w-[130px]';
  if (id === 'type') return 'w-[105px]';
  return 'w-[95px]';
};

// Никаких лишних обязательных пропсов вроде isDevLoading. Строгий и чистый интерфейс.
export const StoreHeader = ({ view, setView }: { view: string, setView: (v: any) => void }) => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({
    sort: 'Все', cat: 'Все', type: 'Инлайн'
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-[160] pointer-events-none font-display">
      <div className="absolute inset-0 h-72 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-0" />

      <div className="relative pt-6 flex flex-col pointer-events-auto">
        <div className="px-7">
          <div className="h-12 w-full mt-glass rounded-full p-1 flex relative">
            <motion.div
              animate={{ x: view === "plugins" ? "0%" : "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-white/[0.08] backdrop-blur-xl border border-white/[0.06] rounded-full z-0"
            />
            <button onClick={() => setView("plugins")} className={`flex-1 relative z-10 text-[14px] font-semibold tracking-tight transition-all ${view === "plugins" ? "text-white" : "text-white/30"}`}>Плагины</button>
            <button onClick={() => setView("developers")} className={`flex-1 relative z-10 text-[14px] font-semibold tracking-tight transition-all ${view === "developers" ? "text-white" : "text-white/30"}`}>Девелоперы</button>
          </div>
        </div>

        <AnimatePresence>
          {view === "plugins" && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
              className="flex px-7 justify-between items-end pt-5" 
            >
              {filtersConfig.map((filter, index) => (
                <div key={filter.id} className="relative flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.1em] text-white/15 pl-1 mb-1.5">{filter.label}</span>
                  <button
                    onClick={() => {
                      const tg = (window as any).Telegram?.WebApp;
                      if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred("light");
                      setOpenFilter(openFilter === filter.id ? null : filter.id);
                    }}
                    className={`h-11 ${getMinWidth(filter.id)} mt-glass rounded-full flex items-center justify-between px-5 active:scale-95 transition-all`}
                  >
                    <span className="text-[14px] font-bold text-white/60 tracking-tight truncate mr-2">{selectedFilters[filter.id]}</span>
                    <motion.img src="/Icons/ArrowRight.PNG?v=3" animate={{ rotate: openFilter === filter.id ? 90 : 0 }} className="size-3.5 object-contain invert brightness-200 opacity-20 shrink-0" />
                  </button>
                  <AnimatePresence>
                    {openFilter === filter.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 8 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        className={`absolute top-[100%] w-44 rounded-[28px] p-1.5 z-50 shadow-2xl bg-[#161616]/70 backdrop-blur-[30px] border border-white/[0.08] ${index === filtersConfig.length - 1 ? 'right-0' : 'left-0'}`}
                      >
                        <div className={`flex flex-col gap-1 no-scrollbar ${filter.options.length > 5 ? 'max-h-[240px] overflow-y-auto px-0.5' : ''}`}>
                          {filter.options.map((option) => (
                            <button key={option} onClick={() => { setSelectedFilters(prev => ({ ...prev, [filter.id]: option })); setOpenFilter(null); }} className="relative w-full px-4 py-3 text-left group">
                              {selectedFilters[filter.id] === option && (
                                <motion.div layoutId={`bg-${filter.id}`} className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-[20px] z-0" />
                              )}
                              <span className={`relative z-10 text-[14px] font-bold tracking-tight transition-colors duration-200 ${selectedFilters[filter.id] === option ? "text-white" : "text-white/30"}`}>{option}</span>
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
