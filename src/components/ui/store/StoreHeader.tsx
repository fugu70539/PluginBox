"use client";

import { motion } from "framer-motion";

const filters = [
  { id: 'sort', label: 'Все', options: ['Все', 'Новые', 'Старые'] },
  { id: 'cat', label: 'Категории', options: ['Все', 'Работа', 'Развлечения', 'Упрощение', 'Кодинг', 'Безопасность', 'Дизайн', 'Инструменты'] },
  { id: 'rate', label: 'Рейтинг', options: ['5 звезд', '4 звезды', '3 звезды', '2 звезды', '1 звезда'] },
  { id: 'type', label: 'Тип', options: ['Инлайн', 'Аппер'] },
];

export const StoreHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-32 pointer-events-none">
      {/* Плавный градиентный блюр сверху вниз */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent backdrop-blur-md" />
      
      <div className="relative pt-8 flex flex-col gap-4 pointer-events-auto">
        <div className="flex overflow-x-auto no-scrollbar gap-2 px-6 pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className="h-11 px-5 mt-glass rounded-full flex items-center gap-2 shrink-0 active:scale-95 transition-all"
            >
              <span className="text-[13px] font-bold text-white/60 tracking-tight whitespace-nowrap">
                {filter.label}
              </span>
              <svg viewBox="0 0 24 24" fill="none" className="size-4 stroke-white/30" strokeWidth="2.5">
                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
