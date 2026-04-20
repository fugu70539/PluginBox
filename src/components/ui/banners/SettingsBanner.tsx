"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import sparklesAnimation from "../../../../public/Icons/Sparkles.json";

export const SettingsBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full min-h-[120px] py-6 mt-glass overflow-hidden rounded-[32px] flex items-center border-white/[0.08] shrink-0"
      style={{ backgroundColor: "#7549F2" }}
    >
      {/* Левая часть: Контейнер для иконки */}
      <div className="pl-6 flex shrink-0 items-center justify-center">
        <div className="size-16 opacity-90 pointer-events-none mix-blend-screen">
          <Lottie 
            animationData={sparklesAnimation} 
            loop={true} 
            style={{ 
              width: '100%', 
              height: '100%', 
              filter: 'brightness(0) invert(1)' 
            }}
          />
        </div>
      </div>

      {/* Правая часть: Весь текст */}
      <div className="flex flex-col pl-5 pr-8 justify-center gap-y-1">
        <h3 className="text-[15px] font-bold text-white tracking-tight leading-tight uppercase opacity-90">
          Настрой это!
        </h3>
        <p className="text-[12px] font-medium text-white/80 leading-[1.4] tracking-tight">
          Здесь вы можете настроить приложение так, как удобно вам, чтобы скачивать плагины стало не только удобно, но и приятно!
        </p>
      </div>
    </motion.div>
  );
};
