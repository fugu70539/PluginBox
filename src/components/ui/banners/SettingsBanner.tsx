"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
// Выходим из banners -> ui -> components -> src и попадаем в public
import sparklesAnimation from "../../../../public/Icons/Sparkles.json";

export const SettingsBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full h-[100px] mt-glass overflow-hidden rounded-[30px] flex items-center px-6 border-white/[0.05] shrink-0"
      style={{ backgroundColor: "#7549F2" }}
    >
      <div className="absolute left-[-10px] opacity-[0.85] size-28 pointer-events-none">
        <Lottie 
          animationData={sparklesAnimation} 
          loop={true} 
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10 flex flex-col ml-16">
        <h3 className="text-[17px] font-bold text-white tracking-tight leading-tight">
          Настрой это!
        </h3>
        <p className="text-[12px] font-medium text-white/80 mt-1 leading-snug max-w-[200px]">
          Здесь вы можете настроить приложение так, как удобно вам, чтобы скачивать плагины стало не только удобно, но и приятно!
        </p>
      </div>
    </motion.div>
  );
};
