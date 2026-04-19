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
    <div className="w-full min-h-screen bg-[#0a0a0a]">
      <div className="relative pt-44">
        <StoreHeader view={view} setView={setView} />
        <main className="px-7">
          <AnimatePresence mode="wait">
            {view === "plugins" ? (
              <motion.div key="plugins" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <EmptyState />
              </motion.div>
            ) : (
              <motion.div key="developers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Developers onBack={() => setView("plugins")} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
