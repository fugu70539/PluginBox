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
    <div className="space-bg overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-6 pt-24 min-h-screen"
      >
        <header className="flex flex-col items-center justify-center text-center mb-10">
          <h1 className="text-[28px] font-bold tracking-tight text-white">
            Привет, {userName}!
          </h1>
          {/* Вторая строка: теперь светло-серая */}
          <h2 className="text-[28px] font-bold tracking-tight text-white/60">
            Что бы ты хотел найти?
          </h2>
        </header>

        <SearchInput />

        <div className="mt-12">
          <h2 className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ml-4">
            Suggested
          </h2>
          <div className="grid grid-cols-2 gap-4 pb-10">
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
