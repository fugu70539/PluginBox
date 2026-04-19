"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

import loadingAnim from "../../../public/Icons/Loading.json";

export default function Store() {
  const [isLoading, setIsLoading] = useState(true);

  // Варианты анимации для плавного появления каждой точки
  const dotVariants = {
    initial: { opacity: 0.2 },
    animate: { opacity: 1 },
  };

  return (
    <div className="w-full h-screen bg-[#0a0a0a] flex flex-col items-center justify-center font-display">
      <motion.div 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Иконка теперь мелкая и аккуратная (size-16 вместо size-40) */}
        <div className="size-16 mb-8 opacity-80">
          <Lottie 
            animationData={loadingAnim} 
            loop={true} 
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Текст «Секундочку…» с плавной анимацией точек */}
        <div className="flex items-center gap-0.5">
          <p className="text-white/25 text-[14px] font-bold tracking-tight">
            Секундочку
          </p>
          <div className="flex gap-0.5 ml-0.5">
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                variants={dotVariants}
                initial="initial"
                animate="animate"
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: index * 0.2, // Задержка создает эффект «волны»
                }}
                className="text-white/25 text-[14px] font-bold"
              >
                .
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
