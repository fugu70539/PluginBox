"use client";
import { motion } from "framer-motion";

export const SearchInput = () => (
  <div className="w-full flex justify-center">
    <motion.div 
      whileTap={{ scale: 0.99 }}
      className="w-full max-w-[340px] black-mirror-search rounded-[1.6rem] h-[52px] flex items-center justify-between pl-5 pr-1.5"
    >
      <input 
        type="text"
        placeholder="Спросить что-нибудь..."
        className="bg-transparent border-none outline-none text-white/80 text-base w-full placeholder:text-white/20 font-medium"
      />
      
      {/* Кнопка с встроенной SVG-стрелкой */}
      <button className="h-[38px] px-5 bg-[#4A90E2] rounded-[1.1rem] flex items-center justify-center active:scale-90 transition-all shrink-0">
         <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7"/>
         </svg>
      </button>
    </motion.div>
  </div>
);
