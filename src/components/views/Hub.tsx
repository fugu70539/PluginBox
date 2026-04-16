"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SearchInput } from "../ui/SearchInput";

export default function Hub() {
  const [userName, setUserName] = useState("Artem");

  useEffect(() => {
    // Получаем WebApp API Telegram
    const tg = (window as any).Telegram?.WebApp;
    
    if (tg) {
      tg.ready();
      tg.expand();
      
      // Определяем имя из Telegram
      const firstName = tg.initDataUnsafe?.user?.first_name;
      if (firstName) {
        setUserName(firstName);
      }
    }
  }, []);

  return (
    <div className="space-bg overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 px-7 pt-28 min-h-screen"
      >
        <header className="flex flex-col items-center justify-center text-center mb-10">
          {/* Заголовок H1 (Имя) */}
          <h1 className="text-[28px] font-bold tracking-tight text-white mb-1">
            Привет, {userName}!
          </h1>
          {/* Заголовок H2 (Вопрос): светло-серый */}
          <h2 className="text-[28px] font-bold tracking-tight text-white/60">
            Что бы ты хотел найти?
          </h2>
        </header>

        {/* Поисковая строка "Black Mirror" */}
        <SearchInput />

        {/* Сетка Suggested: тоже использует mt-glass */}
        <div className="mt-14 pb-12">
          <h2 className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ml-4">
            Suggested
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="mt-glass rounded-[2.2rem] p-6 flex flex-col items-center py-5 transition-all active:scale-95">
              <div className="w-10 h-10 bg-white/10 rounded-2xl mb-2" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Plug anc</span>
            </div>
            
            <div className="mt-glass rounded-[2.2rem] p-6 flex flex-col items-center py-5 transition-all active:scale-95">
              <div className="w-10 h-10 bg-white/10 rounded-2xl mb-2" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Teather</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
