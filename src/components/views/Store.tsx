"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

import loadingAnim from "../../../public/Icons/Loading.json";

export default function Store() {
  const [isLoading, setIsLoading] = useState(true);
  const [dots, setDots] = useState("");

  // Анимация троеточия
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-[#0a0a0a] flex flex-col items-center justify-center font-display">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Lottie анимация в центре */}
        <div className="size-40 mb-4">
          <Lottie 
            animationData={loadingAnim} 
            loop={true} 
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Текст загрузки с анимированными точками */}
        <div className="text-center">
          <p className="text-white/20 text-[13px] font-bold uppercase tracking-[0.2em] ml-[1ch]">
            Загрузка маркетплейса<span className="inline-block w-[20px] text-left">{dots}</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
