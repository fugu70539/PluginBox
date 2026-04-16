"use client";
import { motion } from "framer-motion";
import { SparkleIcon } from "./SparkleIcon";

export const SearchInput = () => (
  <div className="w-full flex justify-center relative">
    
    {/* ЗВЕЗДЫ ВОКРУГ СТРОКИ: фиксированы с ней */}
    {/* Слева вверху, большая, темная */}
    <SparkleIcon className="sparkle left-[-30px] top-[-10px] size-8 opacity-[0.3]" />
    {/* Справа вверху, маленькая, очень темная */}
    <SparkleIcon className="sparkle right-[-15px] top-[-5px] size-5 opacity-[0.08] rotate-[35deg]" />
    {/* Слева внизу, средняя, темная */}
    <SparkleIcon className="sparkle left-[-10px] bottom-[-8px] size-6 opacity-[0.15] rotate-[-15deg]" />
    
    {/* СТРОКА ПОИСКА */}
    <motion.div 
      whileTap={{ scale: 0.99 }}
      className="w-full max-w-[340px] mt-glass rounded-[1.6rem] h-[52px] flex items-center justify-between pl-5 pr-1.5 transition-all relative z-10"
    >
      <input 
        type="text"
        placeholder="Спросить что-нибудь..."
        className="bg-transparent border-none outline-none text-white text-base w-full placeholder:text-white/20 font-medium"
      />
      
      <button className="h-[38px] px-5 btn-send-white flex items-center justify-center active:scale-90 transition-all shrink-0">
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
         </svg>
      </button>
    </motion.div>
  </div>
);
