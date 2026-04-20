"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BadgeWindowProps {
  currentBadge: string;
  onSave: (newBadge: string) => void;
  onBack: () => void;
}

export const BadgeWindow = ({ currentBadge, onSave, onBack }: BadgeWindowProps) => {
  const [inputValue, setInputValue] = useState(currentBadge);

  // Ограничение в 10 символов
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setInputValue(e.target.value);
    }
  };

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.BackButton) {
      tg.BackButton.show();
      tg.BackButton.onClick(onBack);
      return () => {
        tg.BackButton.offClick(onBack);
        tg.BackButton.hide();
      };
    }
  }, [onBack]);

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] pt-16 px-7 font-display select-none">
      <div className="flex flex-col items-center gap-6">
        
        {/* Поле ввода в стиле Hub */}
        <div className="w-full h-[54px] mt-glass rounded-[22px] flex items-center px-5 border border-white/5 shadow-2xl">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Придумай и введи бейдж…"
            className="w-full bg-transparent border-none outline-none text-[15px] font-semibold text-white/90 placeholder:text-white/20"
            autoFocus
          />
        </div>

        {/* Кнопка Готово (Белая, стеклянная, в длину контента) */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => onSave(inputValue || "Юзер")}
          className="px-8 h-[48px] bg-white/[0.08] backdrop-blur-xl border border-white/10 rounded-[20px] flex items-center justify-center shadow-lg"
        >
          <span className="text-[15px] font-bold text-white tracking-tight">Готово</span>
        </motion.button>

        {/* Подсказка о лимите символов */}
        <p className="text-[11px] font-medium text-white/10 uppercase tracking-widest">
          Лимит: {inputValue.length}/10
        </p>
      </div>
    </div>
  );
};
