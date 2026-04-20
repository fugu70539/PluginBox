"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SearchInput } from "@/components/ui/SearchInput";

export default function Hub({ onSettings }: { onSettings: () => void }) {
  const [userName, setUserName] = useState("Artem");
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      const userData = tg.initDataUnsafe?.user;
      if (userData?.first_name) setUserName(userData.first_name);
      if (userData?.photo_url) setUserPhoto(userData.photo_url);
    }
  }, []);

  return (
    <div className="w-full font-display min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      {/* Верхняя модальная плашка */}
      <div className="w-full bg-[#111111] border-b border-white/[0.05] rounded-b-[45px] px-7 pt-5 pb-10 shadow-2xl">
        
        {/* Хедер внутри плашки */}
        <header className="flex items-center justify-between mb-8">
          <div className="mt-glass h-11 w-22 rounded-full flex items-center justify-between px-1.5 border-white/5">
            <div className="size-8 rounded-full flex items-center justify-center overflow-hidden bg-white/10 ml-0.5">
              {userPhoto ? (
                <img src={userPhoto} alt="User" className="size-full rounded-full object-cover" />
              ) : (
                <div className="size-full rounded-full flex items-center justify-center text-white/40 text-[10px] font-bold uppercase">
                  {userName[0]}
                </div>
              )}
            </div>
            <button 
              onClick={onSettings}
              className="size-8 flex items-center justify-center active:scale-90 transition-all"
            >
              <img src="/Icons/Settings.PNG?v=3" alt="Settings" className="size-7 object-contain opacity-40" />
            </button>
          </div>
        </header>

        {/* Текстовый блок */}
        <div className="flex flex-col items-start justify-center mb-8 gap-y-1 text-white">
          <motion.h1 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className="text-[28px] font-bold tracking-tight leading-tight"
          >
            Привет, {userName}!
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-[28px] font-bold tracking-tight text-white/25 leading-tight"
          >
            Что бы ты хотел найти?
          </motion.h2>
        </div>

        {/* Поиск теперь замыкает плашку снизу */}
        <SearchInput />
      </div>

      {/* Основной контент под плашкой (пока пустой) */}
      <main className="px-7 pt-10">
        {/* Здесь в будущем будут твои плагины */}
      </main>
    </div>
  );
}
