"use client";

import { motion } from "framer-motion";

export const EmptyState = () => {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center text-center pb-20">
      {/* Обертка для всей группы элементов */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center"
      >
        <div className="relative mb-4">
          <img 
            src="/Icons/None.PNG?v=3" 
            alt="Nothing found" 
            className="size-28 object-contain opacity-20 grayscale brightness-150"
          />
        </div>
        
        <div className="flex flex-col items-center">
          <h3 className="text-[17px] font-bold text-white/30 tracking-tight">
            Сейчас плагинов нет...
          </h3>
          
          <p className="text-[14px] font-medium text-white/10 mt-1 max-w-[220px]">
            Загляните позже, мы уже готовим что-то новое
          </p>
        </div>
      </motion.div>
    </div>
  );
};
