"use client";

import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import loadingAnim from "../../../public/Icons/Loading.json";

export default function Developers({ isLoading }: { isLoading: boolean }) {
  // Никакой логики Telegram BackButton тут больше нет
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="flex items-center justify-center"
          >
            <div className="size-14 opacity-50">
              <Lottie animationData={loadingAnim} loop={true} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-[24px] font-bold tracking-tight text-white/40">Лидерборд</h2>
            <p className="text-white/10 text-[14px] mt-2 text-center max-w-[200px]">
              Рейтинг лучших разработчиков скоро появится
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
