"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const filtersConfig = [
  { id: 'sort', label: 'Все', options: ['Все', 'Новые', 'Старые'] },
  { id: 'cat', label: 'Категории', options: ['Все', 'Работа', 'Развлечения', 'Упрощение', 'Кодинг', 'Дизайн'] },
  { id: 'rate', label: 'Рейтинг', options: ['5 звезд', '4 звезды', '3 звезды'] },
  { id: 'type', label: 'Тип', options: ['Инлайн', 'Аппер'] },
];

export const StoreHeader = ({ view, setView }: { view: string, setView: (v: any) => void }) => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState({ x: 0 }); // Координата для выравнивания
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({
    sort: 'Все', cat: 'Категории', rate: 'Рейтинг', type: 'Тип'
  });

  const handleToggle = (e: React.MouseEvent, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPos({ x: rect.left }); // Запоминаем, где стоит кнопка
    
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred("light");
    setOpenFilter(openFilter === id ? null : id);
  };

  return (
    <>
      {/* 1. Глобальная подложка и САМО МЕНЮ (вне скроллбара) */}
      <AnimatePresence>
        {openFilter && (
          <>
            <div className="fixed inset-0 z-[150]" onClick={() => setOpenFilter(null)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              style={{ 
                left: menuPos.x,
                top: '125px' // Фиксированная высота под рядом кнопок
              }}
              className="fixed w-48 bg-[#161616]/90 backdrop-blur-3xl rounded-[28px] py-2 z-[200] shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/[0.08] overflow-hidden pointer-events-auto"
            >
              {filtersConfig.find(f => f.id === openFilter)?.options.map((opt) => (
                <button 
                  key={opt} 
                  onClick={() => {
                    setSelectedFilters(prev => ({ ...prev, [openFilter]: opt }));
                    setOpenFilter(null);
                  }}
                  className={`w-full px-6 py-3.5 text-left text-[14px] font-bold transition-all active:bg-white/5 ${selectedFilters[openFilter] === opt ? 'text-white' : 'text-white/30'}`}
                >
                  {opt}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 2. Фон-градиент */}
      <div className="fixed top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent z-[40] pointer-events-none" />

      {/* 3. Основной хедер */}
      <header className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
        <div className="relative pt-6 flex flex-col gap-5 pointer-events-auto">
          
          {/* ChooseBar */}
          <div className="px-7">
            <div className="h-12 w-full mt-glass rounded-full p-1 flex relative">
              <motion.div
                animate={{ x: view === "plugins" ? "0%" : "100%" }}
                className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-white/[0.08] backdrop-blur-xl border border-white/[0.06] rounded-full z-0"
              />
              <button onClick={() => setView("plugins")} className={`flex-1 relative z-10 text-[13px] font-bold uppercase tracking-widest ${view === "plugins" ? "text-white" : "text-white/30"}`}>Плагины</button>
              <button onClick={() => setView("developers")} className={`flex-1 relative z-10 text-[13px] font-bold uppercase tracking-widest ${view === "developers" ? "text-white" : "text-white/30"}`}>Девелоперы</button>
            </div>
          </div>

          {/* Ряд фильтров с overflow-x-auto */}
          <AnimatePresence>
            {view === "plugins" && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex overflow-x-auto gap-2 px-7 no-scrollbar"
              >
                {filtersConfig.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={(e) => handleToggle(e, filter.id)}
                    className="h-11 px-5 mt-glass rounded-full flex items-center gap-2.5 shrink-0 active:scale-95 transition-all"
                  >
                    <span className="text-[14px] font-bold text-white/60 tracking-tight whitespace-nowrap">
                      {selectedFilters[filter.id]}
                    </span>
                    <motion.svg 
                      viewBox="0 0 24 24" fill="none" strokeWidth="2.5"
                      animate={{ rotate: openFilter === filter.id ? 90 : 0 }}
                      className="size-4 stroke-white/20"
                    >
                      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  </button>
                ))}
                <div className="min-w-[28px] h-1" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
};
