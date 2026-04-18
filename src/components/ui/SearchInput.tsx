"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";

import searchAnim from "../../../public/Icons/Search.json";
import searchAiAnim from "../../../public/Icons/SearchAI.json";

export const SearchInput = () => {
  const [isAiMode, setIsAiMode] = useState(false);

  const handleToggle = () => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred('medium');
      setTimeout(() => tg.HapticFeedback.impactOccurred('medium'), 100);
    }
    setIsAiMode(!isAiMode);
  };

  return (
    <div className="w-full flex items-center gap-2 relative h-[52px]">
      <div className="relative flex-1 h-full flex items-center">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="h-full flex-1 mt-glass rounded-full flex items-center justify-between pr-1.5 pl-6 relative z-10"
        >
          <input
            type="text"
            placeholder={isAiMode ? "Поиск с ИИ..." : "Найти что-нибудь..."}
            className="bg-transparent border-none outline-none text-white text-base w-full placeholder:text-white/20 font-medium"
          />
          <button className="h-[38px] px-5 btn-send-white flex items-center justify-center active:scale-90 transition-all shrink-0 rounded-full">
            <img src="/Icons/SendToAi.png" alt="Send" className="w-[18px] h-[18px]" />
          </button>
        </motion.div>
      </div>

      <motion.button
        layout
        onClick={handleToggle}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ order: isAiMode ? -1 : 1 }}
        className="h-[52px] w-[52px] mt-glass rounded-full flex items-center justify-center shrink-0 z-20 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isAiMode ? "ai-mode" : "search-mode"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { delay: 0.1 } }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="size-7"
          >
            <Lottie
              animationData={isAiMode ? searchAnim : searchAiAnim}
              autoplay={true}
              loop={false}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
