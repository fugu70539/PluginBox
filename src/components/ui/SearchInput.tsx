"use client";
import { motion } from "framer-motion";

export const SearchInput = () => {
  return (
    <div className="w-full">
      <motion.div 
        whileTap={{ scale: 0.995 }}
        className="w-full mt-glass rounded-full h-[54px] flex items-center justify-between pl-6 pr-2 relative z-10"
      >
        <input 
          type="text"
          placeholder="Спросить что-нибудь..."
          className="bg-transparent border-none outline-none text-white text-base w-full placeholder:text-white/20 font-medium"
        />
        
        <button className="size-10 rounded-full btn-send-white flex items-center justify-center active:scale-90 transition-all shrink-0 overflow-hidden">
           <img src="/Icons/SendToAi.png" alt="Send" className="size-5 object-contain" />
        </button>
      </motion.div>
    </div>
  );
};
