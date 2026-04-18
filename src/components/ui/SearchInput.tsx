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

  const currentPlaceholder = isAiMode ? "Поиск с ИИ..." : "Найти что-нибудь...";

  // Настройка разных направлений для текста
  const textVariants = {
    initial: (isAi: boolean) => ({
      opacity: 0,
      y: isAi ? 15 : -15, // Приходит снизу для ИИ, сверху для классики
    }),
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: (isAi: boolean) => ({
      opacity: 0,
      y: isAi ? -15 : 15, // Уходит вверх для ИИ, вниз для классики
    }),
  };

  return (
    <div className="w-full flex items-center gap-2 relative h-[52px]">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="flex-1 h-full mt-glass rounded-full flex items-center justify-between pr-1.5 pl-6 relative z-10 overflow-hidden"
      >
        <div className="relative flex-1 h-full flex items-center mr-2">
          <AnimatePresence mode="wait" custom={isAiMode}>
            <motion.span
              key={currentPlaceholder}
              custom={isAiMode}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2, ease: "backOut" }}
              className="absolute left-0 text-white/20 font-medium text-base pointer-events-none whitespace-nowrap"
            >
              {currentPlaceholder}
            </motion.span>
          </AnimatePresence>

          <input
            type="text"
            className="bg-transparent border-none outline-none text-white text-base w-full font-medium relative z-10"
          />
        </div>

        <button className="h-[38px] px-5 btn-send-white flex items-center justify-center active:scale-90 transition-all shrink-0 rounded-full">
          <img src="/Icons/SendToAi.png" alt="Send" className="w-[18px] h-[18px]" />
        </button>
      </motion.div>

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
            key={isAiMode ? "ai-icon" : "search-icon"}
            initial={{ scale: 0.4, opacity: 0, rotate: isAiMode ? -45 : 45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="size-7 flex items-center justify-center"
          >
            {/* Lottie проиграет TGS-анимацию один раз при монтировании */}
            <Lottie
              animationData={isAiMode ? searchAnim : searchAiAnim}
              loop={false}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
