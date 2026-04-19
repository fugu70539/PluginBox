"use client";

import { motion } from "framer-motion";

export const EmptyState = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center pt-52 px-10 text-center"
    >
      <div className="size-16 mb-5 opacity-5">
        <img src="/Icons/Nothing.PNG" alt="Empty" className="w-full h-full object-contain" />
      </div>
      <p className="text-white/15 text-[14px] font-bold uppercase tracking-[0.15em]">
        Сейчас плагинов нет
      </p>
    </motion.div>
  );
};
