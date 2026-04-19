"use client";

import { motion } from "framer-motion";

export default function Developers() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      {/* Центрируем весь текстовый блок как единое целое */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center -mt-10"
      >
        <h2 className="text-[24px] font-bold tracking-tight text-white/40">Лидерборд</h2>
        <p className="text-white/10 text-[14px] mt-2 max-w-[200px]">
          Рейтинг лучших разработчиков скоро появится
        </p>
      </motion.div>
    </div>
  );
}
