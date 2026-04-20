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
    if (e.target.value.length <= 10) setInputValue(e.target.value);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] w-full min-h-screen bg-[#0a0a0a] pt-16 px-7 font-display select-none"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-full h-11 mt-glass rounded-full flex items-center px-5 border border-white/5 shadow-2xl">
          <input
            type="text" value={inputValue} onChange={handleChange}
            placeholder="Придумай и введи бейдж…"
            className="w-full bg-transparent border-none outline-none text-[14px] font-bold text-white/90 placeholder:text-white/20 pr-12"
            autoFocus
          />
          <span className="absolute right-5 text-[12px] font-bold text-white/10 tabular-nums">
            {inputValue.length}/10
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onSave(inputValue.trim() || "Юзер")}
          className="w-full h-14 bg-white rounded-full flex items-center justify-center shadow-xl active:opacity-90 transition-opacity"
        >
          <span className="text-[16px] font-bold text-black tracking-tight">Готово</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

interface SelectionWindowProps {
  title: string;
  options: string[];
  currentValue: string;
  onSelect: (value: string) => void;
}

export const SelectionWindow = ({ title, options, currentValue, onSelect }: SelectionWindowProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] w-full min-h-screen bg-[#0a0a0a] pt-16 px-7 font-display select-none"
    >
      <h3 className="text-[13px] font-semibold text-white/30 ml-1 mb-4 uppercase tracking-wider">{title}</h3>
      <div className="mt-glass rounded-[28px] overflow-hidden p-1.5 shadow-2xl">
        <div className="flex flex-col gap-1">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className="relative w-full px-5 py-4 text-left group"
            >
              {currentValue === option && (
                <motion.div 
                  layoutId="selection-bg"
                  className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-[20px] z-0"
                />
              )}
              <span className={`relative z-10 text-[15px] font-bold tracking-tight transition-colors ${
                currentValue === option ? "text-white" : "text-white/30"
              }`}>
                {option}
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
