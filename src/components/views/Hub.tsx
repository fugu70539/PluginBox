"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SearchInput } from "../ui/SearchInput";
import { Tabbar } from "../ui/Tabbar";

export default function Hub() {
  const [userName, setUserName] = useState("Artem");
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  useEffect(() => {
    const initTg = () => {
      const tg = (window as any).Telegram?.WebApp;
      if (tg) {
        tg.ready();
        tg.expand();
        tg.enableClosingConfirmation();
        
        const userData = tg.initDataUnsafe?.user;
        if (userData?.first_name) setUserName(userData.first_name);
        if (userData?.photo_url) setUserPhoto(userData.photo_url);
      }
    };
    initTg();
  }, []);

  return (
    <div className="space-bg">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-7 pointer-events-none">
        <div className="mt-glass h-11 w-22 rounded-full flex items-center justify-between px-1.5 pointer-events-auto">
          <div className="size-8 rounded-full flex items-center justify-center overflow-hidden bg-white/5 ml-0.5">
            {userPhoto ? (
              <img src={userPhoto} alt="User" className="size-full rounded-full object-cover" />
            ) : (
              <div className="size-full rounded-full flex items-center justify-center text-white/40 text-[10px] font-bold uppercase">
                {userName[0]}
              </div>
            )}
          </div>
          <button className="size-8 flex items-center justify-center active:scale-90 transition-all">
            <img 
              src="/Icons/Settings.PNG" 
              alt="Settings" 
              className="size-7 object-contain opacity-40" 
            />
          </button>
        </div>
      </header>

      <main className="relative z-10 px-7 pt-20 pb-32 flex flex-col items-center">
        <header className="w-full flex flex-col items-center justify-center text-center mb-5 gap-y-0.5">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[28px] font-bold tracking-tight text-white leading-tight"
          >
            Привет, {userName}!
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[28px] font-bold tracking-tight text-white/25 leading-tight"
          >
            Что бы ты хотел найти?
          </motion.h2>
        </header>

        <SearchInput />

        <div className="mt-12 w-full grid grid-cols-2 gap-4">
          <motion.div 
            whileTap={{ scale: 0.97 }} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-glass rounded-[2.2rem] p-6 flex flex-col items-center py-6"
          >
             <div className="w-11 h-11 bg-white/10 rounded-2xl mb-3 flex items-center justify-center">
                <div className="size-5 bg-white/20 rounded-full blur-[2px]" />
             </div>
             <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">Plug anc</span>
          </motion.div>

          <motion.div 
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-glass rounded-[2.2rem] p-6 flex flex-col items-center py-6"
          >
             <div className="w-11 h-11 bg-white/10 rounded-2xl mb-3 flex items-center justify-center">
                <div className="size-5 bg-white/20 rounded-full blur-[2px]" />
             </div>
             <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">Teather</span>
          </motion.div>
        </div>
      </main>

      <Tabbar />
    </div>
  );
}
