"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SearchInput } from "../ui/SearchInput";

export default function Hub() {
  const [userName, setUserName] = useState("Artem");
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      const userData = tg.initDataUnsafe?.user;
      if (userData?.first_name) setUserName(userData.first_name);
      if (userData?.photo_url) setUserPhoto(userData.photo_url);
    }
  }, []);

  return (
    <div className="space-bg overflow-hidden min-h-screen">
      {/* Шапка с аватаркой в стекле */}
      <motion.header 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center px-7"
      >
        <div className="mt-glass size-11 rounded-[1.1rem] flex items-center justify-center p-[1px] overflow-hidden">
          {userPhoto ? (
            <img src={userPhoto} alt="User" className="size-full rounded-[1.0rem] object-cover" />
          ) : (
            <div className="size-full bg-white/5 rounded-[1.0rem] flex items-center justify-center text-white/40 text-xs font-bold uppercase">
              {userName[0]}
            </div>
          )}
        </div>
      </motion.header>

      {/* Основной контент */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-7 pt-20 pb-12 flex flex-col items-center"
      >
        {/* Текстовый блок */}
        <header className="flex flex-col items-center justify-center text-center mb-6 gap-y-0.5">
          <h1 className="text-[28px] font-bold tracking-tight text-white leading-tight">
            Привет, {userName}!
          </h1>
          <h2 className="text-[28px] font-bold tracking-tight text-white/25 leading-tight">
            Что бы ты хотел найти?
          </h2>
        </header>

        <SearchInput />

        {/* Сетка подсказок */}
        <div className="mt-14 w-full grid grid-cols-2 gap-4">
          <motion.div whileTap={{ scale: 0.97 }} className="mt-glass rounded-[2.2rem] p-6 flex flex-col items-center py-6">
             <div className="w-11 h-11 bg-white/10 rounded-2xl mb-3" />
             <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">Plug anc</span>
          </motion.div>
          <motion.div whileTap={{ scale: 0.97 }} className="mt-glass rounded-[2.2rem] p-6 flex flex-col items-center py-6">
             <div className="w-11 h-11 bg-white/10 rounded-2xl mb-3" />
             <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">Teather</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
