"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import sparklesAnimation from "../../../../public/Icons/Sparkles.json";

export const SettingsBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full min-h-[110px] py-4 mt-glass overflow-hidden rounded-[32px] flex items-center border-white/[0.08] shrink-0"
      style={{ backgroundColor: "#7549F2" }}
    >
      {/* Иконка: теперь она большая, белая (через фильтр) и служит фоном */}
      <div className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-40 size-40 pointer-events-none mix-blend-screen">
        <Lottie 
          animationData={sparklesAnimation} 
          loop={true} 
          style={{ width: '100%', height: '100%', filter: 'brightness(0) invert(1)' }}
        />
      </div>

      {/* Текстовый блок: свободное позиционирование с нормальными отступами */}
      <div className="relative z-10 flex flex-col pl-24 pr-6 w-full">
        <h3 className="text-[19px] font-bold text-white tracking-tight leading-tight">
          Настрой это!
        </h3>
        <p className="text-[13px] font-medium text-white/90 mt-1.5 leading-[1.4] tracking-tight">
          Здесь вы можете настроить приложение так, как удобно вам, чтобы скачивать плагины стало не только удобно, но и приятно!
        </p>
      </div>
    </motion.div>
  );
};
