"use client";

import { motion } from "framer-motion";

export const EmptyState = () => {
  return (
    <div className="w-full pt-24 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative mb-8"
      >
        {/* Используем None.PNG с увеличенным размером */}
        <img 
          src="/Icons/None.PNG?v=3" 
          alt="Nothing found" 
          className="size-28 object-contain opacity-20 grayscale brightness-150"
        />
      </motion.div>
      
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-[17px] font-bold text-white/30 tracking-tight"
      >
        Сейчас плагинов нет...
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-[14px] font-medium text-white/10 mt-1.5 max-w-[220px]"
      >
        Загляните позже, мы уже готовим что-то новое
      </motion.p>
    </div>
  );
};
