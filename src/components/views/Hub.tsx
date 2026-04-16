"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SearchInput } from "../ui/SearchInput";
import { SparkleIcon } from "../ui/SparkleIcon";

export default function Hub() {
  const [userName, setUserName] = useState("Artem");
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  useEffect(() => {
    // Подключаем Telegram WebApp API
    const tg = (window as any).Telegram?.WebApp;
    
    if (tg) {
      tg.ready();
      tg.expand();
      
      // Вытягиваем данные пользователя
      const userData = tg.initDataUnsafe?.user;
      if (userData?.first_name) {
        setUserName(userData.first_name);
      }
      if (userData?.photo_url) {
        setUserPhoto(userData.photo_url);
      }
    }
  }, []);

  return (
    <div className="space-bg overflow-hidden min-h-screen">
      
      {/* 1. ШАПКА: Аватарка слева в стеклянном квадрате */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center px-7"
      >
        <div className="mt-glass size-11 rounded-[1.1rem] flex items-center justify-center p-[1px] overflow-hidden">
          {userPhoto ? (
            <img 
              src={userPhoto} 
              alt="User" 
              className="size-full rounded-[1.0rem] object-cover" 
            />
          ) : (
            <div className="size-full bg-white/5 rounded-[1.0rem] flex items-center justify-center text-white/40 text-xs font-bold uppercase">
              {userName[0]}
            </div>
          )}
        </div>
      </motion.header>

      {/* 2. ОСНОВНОЙ КОНТЕНТ: Поднят выше к шапке */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 px-7 pt-24 pb-12"
      >
        
        {/* Блок заголовков со звездами */}
        <header className="flex flex-col items-center justify-center text-center mb-8 relative">
          
          {/* Звезды вокруг текста (асимметрично) */}
          <SparkleIcon className="sparkle right-[-35px] top-[-5px] size-7 opacity-[0.22] rotate-[15deg]" />
          <SparkleIcon className="sparkle left-[-25px] bottom-[-10px] size-5 opacity-[0.08] rotate-[-20deg]" />

          <h1 className="text-[28px] font-bold tracking-tight text-white leading-tight">
            Привет, {userName}!
          </h1>
          <h2 className="text-[28px] font-bold tracking-tight text-white/35 leading-tight">
            Что бы ты хотел найти?
          </h2>
        </header>

        {/* Поисковая строка (внутри неё уже есть свои звезды) */}
        <SearchInput />

        {/* Секция Suggested */}
        <div className="mt-14">
          <h2 className="text-white/20 text-[10px] font-bold uppercase tracking-[0.25em] mb-5 ml-4">
            Suggested
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Карточка 1 */}
            <motion.div 
              whileTap={{ scale: 0.96 }}
              className="mt-glass rounded-[2.2rem] p-6 flex flex-col items-center py-6 transition-all relative overflow-hidden group"
            >
              {/* Легкое свечение при ховере/тапе внутри карточки */}
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-active:opacity-100 transition-opacity" />
              
              <div className="w-11 h-11 bg-white/10 rounded-2xl mb-3 flex items-center justify-center">
                <div className="size-5 bg-white/20 rounded-full" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
                Plug anc
              </span>
            </motion.div>
            
            {/* Карточка 2 */}
            <motion.div 
              whileTap={{ scale: 0.96 }}
              className="mt-glass rounded-[2.2rem] p-6 flex flex-col items-center py-6 transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-active:opacity-100 transition-opacity" />
              
              <div className="w-11 h-11 bg-white/10 rounded-2xl mb-3 flex items-center justify-center">
                <div className="size-5 bg-white/20 rounded-full" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
                Teather
              </span>
            </motion.div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
