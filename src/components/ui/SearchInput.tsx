"use client";
import { motion } from "framer-motion";

export const SearchInput = () => (
  <div className="w-full flex justify-center">
    <motion.div 
      whileTap={{ scale: 0.99 }}
      className="w-full max-w-[340px] black-mirror-search rounded-[1.8rem] h-[58px] flex items-center justify-between pl-6 pr-2"
    >
      <input 
        type="text"
        placeholder="Спросить что-нибудь..."
        className="bg-transparent border-none outline-none text-white/80 text-base w-full placeholder:text-white/20 font-medium"
      />
      
      {/* Кнопка как на фото: прямоугольная с закруглением */}
      <button className="h-[42px] px-5 bg-[#4A90E2] rounded-[1.2rem] flex items-center justify-center active:scale-90 transition-all shrink-0">
         <img src="/Icons/SendToAi.svg" alt="Send" className="w-5 h-5" />
      </button>
    </motion.div>
  </div>
);
