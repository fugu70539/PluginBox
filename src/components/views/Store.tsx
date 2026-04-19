"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StoreHeader } from "../ui/store/StoreHeader";
import { EmptyState } from "../ui/store/EmptyState";
import Developers from "./Developers";

interface StoreProps {
  onBack: () => void;
  onViewChange: (isDev: boolean) => void;
}

// Переменная вне компонента для отслеживания загрузки в рамках одной сессии
let hasLoadedOnce = false;

export default function Store({ onBack, onViewChange }: StoreProps) {
  const [view, setView] = useState<"plugins" | "developers">("plugins");
  const [isDataLoading, setIsDataLoading] = useState(!hasLoadedOnce);

  useEffect(() => {
    onViewChange(view === "developers");
  }, [view, onViewChange]);

  useEffect(() => {
    if (view === "developers" && !hasLoadedOnce) {
      const timer = setTimeout(() => {
        setIsDataLoading(false);
        hasLoadedOnce = true;
      }, 1500);
      return () => clearTimeout(timer);
    } else if (view === "developers" && hasLoadedOnce) {
      setIsDataLoading(false);
    }
  }, [view]);

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a]">
      <div className="relative pt-44 h-screen flex flex-col">
        {/* Шапка скрывается при загрузке */}
        <AnimatePresence>
          {!isDataLoading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 left-0 right-0 z-[160]"
            >
              <StoreHeader view={view} setView={setView} />
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 flex flex-col px-7">
          <AnimatePresence mode="wait">
            {view === "plugins" ? (
              <motion.div 
                key="plugins" 
                className="flex-1 flex flex-col"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
              >
                <EmptyState />
              </motion.div>
            ) : (
              <motion.div 
                key="developers" 
                className="flex-1 flex flex-col"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
              >
                <Developers isLoading={isDataLoading} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
