"use client";
import { motion } from "framer-motion";

export const SearchInput = () => (
  <div className="w-full flex justify-center">
    <motion.div 
      whileTap={{ scale: 0.99 }}
      /* Применяем наш глобальный стиль mt-glass */
      className="w-full max-w-[340px] mt-glass rounded-[1.6rem] h-[52px] flex items-center justify-between pl-5 pr-1.5 transition-all duration-300"
    >
      <input 
        type="text"
        placeholder="Спросить что-нибудь..."
        className="bg-transparent border-none outline-none text-white/90 text-base w-full placeholder:text-white/20 font-medium"
      />
      
      {/* Кнопка с внутренним свечением как на фото 4 и 5 */}
      <button className="h-[38px] px-5 mt-glow-blue rounded-[1.1rem] flex items-center justify-center active:scale-90 transition-all shrink-0">
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
         </svg>
      </button>
    </motion.div>
  </div>
);
