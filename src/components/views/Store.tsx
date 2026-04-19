"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";

import loadingAnim from "../../../public/Icons/Loading.json";
import { StoreHeader } from "../ui/store/StoreHeader";
import { EmptyState } from "../ui/store/EmptyState";
import Developers from "./Developers";

export default function Store() {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"plugins" | "developers">("plugins");

  useEffect(() => {
    const delay = Math.floor(Math.random() * 1000) + 1000;
    const timer = setTimeout(() => setIsLoading(false), delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] font-display">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="loader" exit={{ opacity: 0 }} className="fixed inset-0 flex items-center justify-center z-[200] bg-[#0a0a0a]">
            <div className="size-14 opacity-50"><Lottie animationData={loadingAnim} loop={true} /></div>
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
            <StoreHeader view={view} setView={setView} />
            
            <main className={`px-7 transition-all duration-500 ${view === "plugins" ? "pt-48" : "pt-32"}`}>
              {view === "plugins" ? <EmptyState /> : <Developers />}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
