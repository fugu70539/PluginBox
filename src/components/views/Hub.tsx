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
      <motion.header 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center px-7"
      >
        <div id="avatar-panel" className="mt-glass h-11 w-22 rounded-full flex items-center justify-between px-1.5 overflow-hidden">
          <div className="size-8 rounded-full flex items-center justify-center overflow-hidden bg-white/5 ml-0.5">
            {userPhoto ? (
              <img src={userPhoto} alt="User" className="size-full rounded-full object-cover" />
            ) : (
              <div className="size-full rounded-full flex items-center justify-center text-white/40 text-[10px] font-bold uppercase">
                {userName[0]}
              </div>
            )}
          </div>
          <button className="size-8 flex items-center justify-center active:scale-90 transition-all text-white/40">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-7 pt-20 pb-12 flex flex-col items-center"
      >
        <header className="w-full flex flex-col items-center justify-center text-center mb-6 gap-y-0.5">
          <h1 className="text-[28px] font-bold tracking-tight text-white leading-tight">
            Привет, {userName}!
          </h1>
          <h2 className="text-[28px] font-bold tracking-tight text-white/25 leading-tight">
            Что бы ты хотел найти?
          </h2>
        </header>

        <SearchInput />

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
