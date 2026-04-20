"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import sparklesAnimation from "../../../../public/Icons/Sparkles.json";

export const SettingsBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full h-[90px] mt-glass overflow-hidden rounded-[26px] flex items-center border-white/[0.08] shrink-0"
      // Добавили легкий линейный градиент для объема
      style={{ backgroundImage: "linear-gradient(135deg, #7549F2 0%, #5E3AC1 100%)" }}
    >
      {/* Левая часть: Контейнер для иконки */}
      <div className="pl-5 flex shrink-0 items-center justify-center">
        <div className="size-12 opacity-90 pointer-events-none mix-blend-screen">
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
      <div className="flex flex-col pl-4 pr-6 justify-center">
        {/* Заголовок с добавленным смайликом :) */}
        <h3 className="text-[15px] font-bold text-white tracking-tight leading-tight">
          Настрой это! :)
        </h3>
        {/* Описание */}
        <p className="text-[11px] font-medium text-white/70 mt-0.5 leading-[1.3] tracking-tight">
          Здесь вы можете настроить приложение так, как удобно вам, чтобы скачивать плагины стало не только удобно, но и приятно!
        </p>
      </div>
    </motion.div>
  );
};
