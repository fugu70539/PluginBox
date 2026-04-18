"use client";
import { motion } from "framer-motion";

export const SearchInput = () => {
  return (
    <div className="w-full">
      <motion.div 
        whileTap={{ scale: 0.99 }}
        className="w-full mt-glass rounded-[1.6rem] h-[52px] flex items-center justify-between pl-5 pr-1.5 relative z-10"
      >
        <input 
          type="text"
          placeholder="Спросить что-нибудь..."
          className="bg-transparent border-none outline-none text-white text-base w-full placeholder:text-white/20 font-medium"
        />
        
        <button className="h-[38px] px-5 btn-send-white flex items-center justify-center active:scale-90 transition-all shrink-0 overflow-hidden">
           <img src="/Icons/SendToAi.png" alt="Send" className="w-[18px] h-[18px]" />
        </button>
      </motion.div>
    </div>
  );
};
