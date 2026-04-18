"use client";
import { motion } from "framer-motion";

export const SearchInput = () => {
  return (
    <div className="w-full flex justify-center relative">
      <motion.div 
        whileTap={{ scale: 0.99 }}
        className="w-full max-w-[340px] mt-glass rounded-[1.6rem] h-[52px] flex items-center justify-between pl-5 pr-1.5 relative z-10"
      >
        <input 
          type="text"
          placeholder="Спросить что-нибудь..."
          className="bg-transparent border-none outline-none text-white text-base w-full placeholder:text-white/20 font-medium"
        />
        
        <button className="h-[38px] w-[38px] rounded-[1.1rem] flex items-center justify-center active:scale-90 transition-all shrink-0 overflow-hidden">
           <img src="/SendToAi.png" alt="Send" className="size-full object-contain" />
        </button>
      </motion.div>
    </div>
  );
};
