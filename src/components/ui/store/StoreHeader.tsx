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

export const StoreHeader = ({ view, setView, isDevLoading }: { view: string, setView: (v: any) => void, isDevLoading: boolean }) => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({
    sort: 'Все', cat: 'Все', type: 'Инлайн'
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-[160] pointer-events-none font-display">
      <div className="absolute inset-0 h-72 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-0" />

      <motion.div 
        animate={{ opacity: isDevLoading ? 0 : 1, y: isDevLoading ? -20 : 0 }}
        transition={{ duration: 0.2 }}
        className="relative pt-6 flex flex-col pointer-events-auto"
      >
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
                    onClick={() => setOpenFilter(openFilter === filter.id ? null : filter.id)}
                    className={`h-11 ${getMinWidth(filter.id)} mt-glass rounded-full flex items-center justify-between px-5 active:scale-95 transition-all`}
                  >
                    <span className="text-[14px] font-bold text-white/60 tracking-tight truncate mr-2">{selectedFilters[filter.id]}</span>
                    <motion.img src="/Icons/ArrowRight.PNG?v=3" animate={{ rotate: openFilter === filter.id ? 90 : 0 }} className="size-3.5 object-contain invert brightness-200 opacity-20 shrink-0" />
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};
