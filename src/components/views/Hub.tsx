"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SearchInput } from "../ui/SearchInput";

export default function Hub() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      setUserName(tg.initDataUnsafe.user?.first_name || "Artem");
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="min-h-screen space-bg px-6 pt-24"
    >
      <header className="flex flex-col items-center justify-center text-center mb-10">
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-1">
          Привет, {userName}!
        </h1>
        <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
          Что бы ты хотел найти?
        </p>
      </header>

      <SearchInput />
    </motion.div>
  );
}
