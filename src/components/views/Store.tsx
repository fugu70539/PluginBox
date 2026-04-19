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

export default function Store({ onBack, onViewChange }: StoreProps) {
  const [view, setView] = useState<"plugins" | "developers">("plugins");

  useEffect(() => {
    onViewChange(view === "developers");
  }, [view, onViewChange]);

  return (
    <div className="w-full h-screen bg-[#0a0a0a] flex flex-col">
      {/* Шапка теперь всегда на месте, так как загрузки нет */}
      <StoreHeader view={view} setView={setView} />

      <main className="flex-1 flex flex-col px-7 pt-44 overflow-hidden">
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
              <Developers />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
