"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SearchInput } from "../ui/SearchInput";

export default function Hub() {
  const [userName, setUserName] = useState("Artem");

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      const firstName = tg.initDataUnsafe?.user?.first_name;
      if (firstName) setUserName(firstName);
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="min-h-screen space-bg px-6 pt-24"
    >
      <header className="flex flex-col items-center justify-center text-center mb-10">
        {/* Приветствие */}
        <h1 className="text-[28px] font-bold tracking-tight">
          Привет, {userName}!
        </h1>
        
        {/* Подзаголовок: теперь такой же стиль, как у H1 */}
        <h2 className="text-[28px] font-bold tracking-tight">
          Что бы ты хотел найти?
        </h2>
      </header>

      <SearchInput />

      {/* Сетка Suggested */}
      <div className="mt-12">
        <h2 className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ml-4">
          Suggested
        </h2>
        <div className="grid grid-cols-2 gap-4 pb-10">
          <div className="glass-ios rounded-[2.2rem] p-6 flex flex-col items-center py-5 transition-transform active:scale-95">
            <div className="w-10 h-10 bg-white/5 rounded-2xl mb-2" />
            <span className="text-[10px] font-bold uppercase tracking-tighter opacity-60">Plug anc</span>
          </div>
          <div className="glass-ios rounded-[2.2rem] p-6 flex flex-col items-center py-5 transition-transform active:scale-95">
            <div className="w-10 h-10 bg-white/5 rounded-2xl mb-2" />
            <span className="text-[10px] font-bold uppercase tracking-tighter opacity-60">Teather</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
