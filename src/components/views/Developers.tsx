"use client";

import { motion } from "framer-motion";

export default function Developers() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center pb-20">
      {/* Центрируем блок текста относительно центра экрана */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center"
      >
        <h2 className="text-[24px] font-bold tracking-tight text-white/40 leading-none">
          Лидерборд
        </h2>
        <p className="text-white/10 text-[14px] mt-3 text-center max-w-[220px]">
          Рейтинг лучших разработчиков скоро появится
        </p>
      </motion.div>
    </div>
  );
}
