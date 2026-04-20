"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface BadgeWindowProps {
  currentBadge: string;
  onSave: (newBadge: string) => void;
}

export const BadgeWindow = ({ currentBadge, onSave }: BadgeWindowProps) => {
  const [inputValue, setInputValue] = useState(currentBadge);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setInputValue(e.target.value);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] w-full min-h-screen bg-[#0a0a0a] pt-4 px-7 font-display select-none"
    >
      <div className="flex flex-col items-center gap-4">
        
        <div className="relative w-full h-11 mt-glass rounded-full flex items-center px-5 border border-white/5 shadow-2xl">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Придумай и введи бейдж…"
            className="w-full bg-transparent border-none outline-none text-[14px] font-bold text-white/90 placeholder:text-white/20 pr-12"
            autoFocus
          />
          <span className="absolute right-5 text-[12px] font-bold text-white/10 tabular-nums">
            {inputValue.length}/10
          </span>
        </div>

        {/* Описание: центрирование "столбиком" с ограничением ширины */}
        <p className="max-w-[280px] text-[12px] font-medium text-white/30 leading-[1.4] text-center">
          Бейдж будет показан возле вашего имени в профиле разработчика, комментариях и созданных вами плагинах
        </p>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onSave(inputValue.trim() || "Юзер")}
          className="w-full h-14 bg-white rounded-full flex items-center justify-center shadow-xl active:opacity-90 transition-opacity mt-1"
        >
          <span className="text-[16px] font-bold text-black tracking-tight">Готово</span>
        </motion.button>

      </div>
    </motion.div>
  );
};
