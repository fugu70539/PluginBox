"use client";
import { motion } from "framer-motion";

export const SearchInput = () => (
  <div className="w-full flex justify-center">
    <motion.div 
      whileTap={{ scale: 0.99 }}
      className="w-full max-w-[340px] mt-glass rounded-[1.6rem] h-[52px] flex items-center justify-between pl-5 pr-1.5"
    >
      <input 
        type="text"
        placeholder="Спросить что-нибудь..."
        className="bg-transparent border-none outline-none text-white text-base w-full placeholder:text-white/20 font-medium"
      />
      
      <button className="h-[38px] px-5 mt-glow-blue rounded-[1.1rem] flex items-center justify-center active:scale-90 transition-all shrink-0">
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
         </svg>
      </button>
    </motion.div>
  </div>
);
