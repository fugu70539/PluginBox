"use client";

import { motion } from "framer-motion";

const filters = [
  { id: 'sort', label: 'Все', options: ['Все', 'Новые', 'Старые'] },
  { id: 'cat', label: 'Категории', options: ['Все', 'Работа', 'Развлечения', 'Упрощение', 'Кодинг', 'Безопасность', 'Дизайн'] },
  { id: 'rate', label: 'Рейтинг', options: ['5 звезд', '4 звезды', '3 звезды'] },
  { id: 'type', label: 'Тип', options: ['Инлайн', 'Аппер'] },
];

export const StoreHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-32 pointer-events-none">
      {/* Плавный градиент для эффекта погружения под шапку */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
      
      {/* pt-7 ставит их на один уровень с шапкой Хаба */}
      <div className="relative pt-7 pointer-events-auto">
        <div className="flex overflow-x-auto no-scrollbar gap-2 px-7">
          {filters.map((filter) => (
            <button
              key={filter.id}
              // h-11 и rounded-full точно копируют плашку фильтра из Hub.tsx
              className="h-11 px-5 mt-glass rounded-full flex items-center gap-2.5 shrink-0 active:scale-95 transition-all shadow-sm"
            >
              <span className="text-[14px] font-bold text-white/60 tracking-tight whitespace-nowrap">
                {filter.label}
              </span>
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="size-4 stroke-white/20" 
                strokeWidth="2.5"
              >
                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
          {/* Небольшой отступ в конце для красоты скролла */}
          <div className="shrink-0 w-5" />
        </div>
      </div>
    </header>
  );
};
