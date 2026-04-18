"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          className={`h-full flex-1 mt-glass flex items-center justify-between pr-1.5 relative z-10 
            ${isAiMode ? 'rounded-r-[1.6rem] rounded-l-[0.8rem] pl-3' : 'rounded-l-[1.6rem] rounded-r-[0.8rem] pl-5'}`}
        >
          <input
            type="text"
            placeholder="Спросить что-нибудь..."
            className="bg-transparent border-none outline-none text-white text-base w-full placeholder:text-white/20 font-medium"
          />
          <button className="h-[38px] px-5 btn-send-white flex items-center justify-center active:scale-90 transition-all shrink-0">
            <img src="/Icons/SendToAi.png" alt="Send" className="w-[18px] h-[18px]" />
          </button>
        </motion.div>
      </div>

      <motion.button
        layout
        onClick={handleToggle}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ order: isAiMode ? -1 : 1 }}
        className="h-full w-[52px] mt-glass flex items-center justify-center shrink-0 z-20 overflow-hidden rounded-[1.2rem]"
      >
        <AnimatePresence mode="wait" initial={true}>
          <motion.div
            key={isAiMode ? "ai" : "search"}
            initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.4, opacity: 0, rotate: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="size-6 flex items-center justify-center"
          >
            <img 
              src={isAiMode ? "/Icons/SearchAI.json" : "/Icons/Search.json"} 
              alt="icon" 
              className="size-full object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
