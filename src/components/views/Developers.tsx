"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import loadingAnim from "../../../public/Icons/Loading.json";

export default function Developers({ onBack }: { onBack: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.BackButton) {
      tg.BackButton.show();
      tg.BackButton.onClick(() => {
        onBack();
        tg.BackButton.hide();
      });
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      if (tg?.BackButton) tg.BackButton.hide();
      clearTimeout(timer);
    };
  }, [onBack]);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-[200] bg-[#0a0a0a]"
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
            className="flex flex-col items-center pt-10"
          >
            <h2 className="text-[24px] font-bold tracking-tight text-white/40">Лидерборд</h2>
            <p className="text-white/10 text-[14px] mt-2">Рейтинг скоро появится</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
