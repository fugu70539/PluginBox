"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";

import loadingAnim from "../../../public/Icons/Loading.json";

export default function Store() {
  return (
    <div className="w-full h-screen bg-[#0a0a0a] flex items-center justify-center font-display">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center"
      >
        {/* Компактная иконка без подписей */}
        <div className="size-14 opacity-60">
          <Lottie 
            animationData={loadingAnim} 
            loop={true} 
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
