"use client";
import { motion } from "framer-motion";

export const SearchInput = () => (
  <motion.div 
    whileTap={{ scale: 0.98 }}
    className="w-full black-mirror-search rounded-[2rem] h-16 flex items-center justify-between px-6 mb-12"
  >
    <input 
      type="text"
      placeholder="Спросить что-нибудь..."
      className="bg-transparent border-none outline-none text-white/50 text-lg w-full placeholder:text-white/30"
    />
    
    <button className="h-11 w-11 bg-white rounded-full flex items-center justify-center active:scale-90 transition-all shrink-0 ml-2">
       <img src="/Icons/arrow-up.svg" alt="↑" className="w-5 h-5 invert" />
    </button>
  </motion.div>
);
