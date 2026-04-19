"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";

import loadingAnim from "../../../public/Icons/Loading.json";

// Варианты анимации для контейнера точек
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Задержка между появлением каждой точки
    },
  },
};

// Варианты анимации для каждой отдельной точки
const dotVariants = {
  initial: { opacity: 0, y: 0 },
  animate: {
    opacity: [0, 1, 0],
    y: [0, -2, 0],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Store() {
  return (
    <div className="w-full h-screen bg-[#0a0a0a] flex flex-col items-center justify-center font-display">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Маленькая иконка загрузки */}
        <div className="size-12 opacity-60"> 
          <Lottie 
            animationData={loadingAnim} 
            loop={true} 
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Текст с умной анимацией точек */}
        <div className="flex items-center gap-0.5">
          <span className="text-white/40 text-[15px] font-medium tracking-tight">
            Секундочку
          </span>
          
          <motion.div 
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="flex gap-0.5 mt-1"
          >
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                variants={dotVariants}
                className="size-1 bg-white/40 rounded-full"
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
