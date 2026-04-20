"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface BadgeWindowProps {
  currentBadge: string;
  onSave: (newBadge: string) => void;
  onBack: () => void;
}

export const BadgeWindow = ({ currentBadge, onSave, onBack }: BadgeWindowProps) => {
  const [inputValue, setInputValue] = useState(currentBadge);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setInputValue(e.target.value);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] pt-16 px-6 font-display select-none">
      <div className="flex flex-col items-center gap-4">
        
        {/* Строка ввода: параметры точно как в Hub */}
        <div className="relative w-full h-[54px] mt-glass rounded-[22px] flex items-center px-5 border border-white/5 shadow-2xl">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Придумай и введи бейдж…"
            className="w-full bg-transparent border-none outline-none text-[15px] font-semibold text-white/90 placeholder:text-white/20 pr-12"
            autoFocus
          />
          {/* Лимит справа в строке */}
          <span className="absolute right-5 text-[13px] font-medium text-white/20 tabular-nums">
            {inputValue.length}/10
          </span>
        </div>

        {/* Кнопка "Готово": Ярко-белая, в длину строки */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onSave(inputValue.trim() || "Юзер")}
          className="w-full h-[54px] bg-white rounded-[22px] flex items-center justify-center shadow-lg active:opacity-90 transition-opacity"
        >
          <span className="text-[16px] font-bold text-black tracking-tight">Готово</span>
        </motion.button>

      </div>
    </div>
  );
};
