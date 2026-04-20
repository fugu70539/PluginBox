"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import sparklesAnimation from "../../../../public/Icons/Sparkles.json";

export const SettingsBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      // Оставляем min-h, но убираем тесноту, добавляем padding-y
      className="relative w-full min-h-[110px] py-5 mt-glass overflow-hidden rounded-[32px] flex items-center border-white/[0.08] shrink-0"
      style={{ backgroundColor: "#7549F2" }}
    >
      {/* Контейнер для четкого позиционирования иконки */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center">
        {/* Иконка: белая, полупрозрачная, размер соразмерен заголовку */}
        <div className="size-10 opacity-60 pointer-events-none mix-blend-screen">
          <Lottie 
            animationData={sparklesAnimation} 
            loop={true} 
            style={{ width: '100%', height: '100%', filter: 'brightness(0) invert(1)' }}
          />
        </div>
      </div>

      {/* Текстовый блок: сдвигаем правее, даем дышать */}
      <div className="relative z-10 flex flex-col pl-[88px] pr-7 w-full gap-y-1">
        {/* Заголовок: мельче (text-[16px]) и соразмерен иконке */}
        <h3 className="text-[16px] font-bold text-white tracking-tight leading-tight">
          Настрой это!
        </h3>
        {/* Описание: чуть светлее и компактнее (max-w) */}
        <p className="text-[12px] font-medium text-white/80 leading-[1.4] tracking-tight max-w-[240px]">
          Здесь вы можете настроить приложение так, как удобно вам, чтобы скачивать плагины стало не только удобно, но и приятно!
        </p>
      </div>
    </motion.div>
  );
};
