"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SearchInput } from "../ui/SearchInput";

export default function Hub() {
  const [userName, setUserName] = useState("Artem");

  useEffect(() => {
    // Получаем объект Telegram WebApp через приведение к any для обхода TS
    const tg = (window as any).Telegram?.WebApp;
    
    if (tg) {
      tg.ready();
      tg.expand();
      
      // Определяем имя пользователя напрямую из API Telegram
      const firstName = tg.initDataUnsafe?.user?.first_name;
      if (firstName) {
        setUserName(firstName);
      }
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="min-h-screen space-bg px-6 pt-24"
    >
      <header className="flex flex-col items-center justify-center text-center mb-10">
        {/* Заголовок: Приветствие */}
        <h1 className="text-[28px] font-bold tracking-tight">
          Привет, {userName}!
        </h1>
        
        {/* Вторая строка: в том же стиле, что и приветствие */}
        <h2 className="text-[28px] font-bold tracking-tight">
          Что бы ты хотел найти?
        </h2>
      </header>

      {/* Поисковая строка с патчем "More Than Glass" */}
      <SearchInput />

      {/* Сетка Suggested с обновленными стилями стекла */}
      <div className="mt-12">
        <h2 className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ml-4">
          Suggested
        </h2>
        <div className="grid grid-cols-2 gap-4 pb-10">
          {/* Карточки теперь используют глобальный класс mt-glass */}
          <div className="mt-glass rounded-[2.2rem] p-6 flex flex-col items-center py-5 transition-all active:scale-95">
            <div className="w-10 h-10 bg-white/10 rounded-2xl mb-2" />
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Plug anc</span>
          </div>
          
          <div className="mt-glass rounded-[2.2rem] p-6 flex flex-col items-center py-5 transition-all active:scale-95">
            <div className="w-10 h-10 bg-white/10 rounded-2xl mb-2" />
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Teather</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
