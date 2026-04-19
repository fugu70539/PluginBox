"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import loadingAnim from "../../../public/Icons/Loading.json";
import { StoreHeader } from "../ui/store/StoreHeader";
import { EmptyState } from "../ui/store/EmptyState";
import Developers from "./Developers";

// Глобальная переменная вне компонента, чтобы стейт сохранялся при переключении вкладок
let isStoreWasLoaded = false;

interface StoreProps {
  onBack: () => void; // Пропс для возврата на Хаб
}

export default function Store({ onBack }: StoreProps) {
  const [isLoading, setIsLoading] = useState(!isStoreWasLoaded);
  const [view, setView] = useState<"plugins" | "developers">("plugins");

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    
    // Настраиваем BackButton
    if (tg?.BackButton) {
      tg.BackButton.show();
      tg.BackButton.onClick(() => {
        onBack(); // Вызываем функцию возврата
        tg.BackButton.hide();
      });
    }

    if (!isStoreWasLoaded) {
      const delay = Math.floor(Math.random() * 800) + 700;
      const timer = setTimeout(() => {
        setIsLoading(false);
        isStoreWasLoaded = true;
      }, delay);
      return () => clearTimeout(timer);
    }

    // При размонтировании скрываем кнопку (если нужно)
    return () => {
      if (tg?.BackButton) tg.BackButton.hide();
    };
  }, [onBack]);

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a]">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="loader" exit={{ opacity: 0 }} className="fixed inset-0 flex items-center justify-center z-[200] bg-[#0a0a0a]">
            <div className="size-14 opacity-50">
              <Lottie animationData={loadingAnim} loop={true} />
            </div>
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative pt-44">
            <StoreHeader view={view} setView={setView} />
            <main className="px-7">
              {view === "plugins" ? <EmptyState /> : <Developers />}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
