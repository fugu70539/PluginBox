"use client";

import { motion } from "framer-motion";

export const EmptyState = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center pt-40 px-10 text-center"
    >
      <div className="size-20 mb-6 opacity-10">
        <img src="/Icons/Nothing.PNG" alt="Empty" className="w-full h-full object-contain" />
      </div>
      <p className="text-white/20 text-[15px] font-medium tracking-tight">
        Сейчас плагинов нет...
      </p>
    </motion.div>
  );
};
