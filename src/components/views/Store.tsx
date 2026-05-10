"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { getCacheParam } from "@/lib/utils";

export const Store = () => {
  const { storeView, setStoreView } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full h-screen bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a0a] border-b border-white/[0.08]">
        <div className="px-6 pt-4 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setStoreView("plugins")}
              className="text-lg font-bold tracking-tight text-white/60 hover:text-white transition-colors"
            >
              ← Назад
            </button>
          </div>

          {/* View tabs */}
          <div className="flex gap-3 mb-4">
            {["plugins", "developers"].map((view) => (
              <Button
                key={view}
                variant={storeView === view ? "primary" : "secondary"}
                size="sm"
                onClick={() => setStoreView(view as any)}
              >
                {view === "plugins" ? "Плагины" : "Разработчики"}
              </Button>
            ))}
          </div>

          {/* Search */}
          <SearchInput
            placeholder={
              storeView === "plugins"
                ? "Поиск плагинов..."
                : "Поиск разработчиков..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 px-6 pt-40 pb-32 overflow-y-auto">
        <AnimatePresence mode="wait">
          {storeView === "plugins" ? (
            <motion.div
              key="plugins"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 gap-3"
            >
              <div className="size-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="opacity-30"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="text-sm text-white/40">Плагины скоро будут доступны</p>
            </motion.div>
          ) : (
            <motion.div
              key="developers"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 gap-3"
            >
              <div className="size-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="opacity-30"
                >
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="text-sm text-white/40">Разработчики скоро будут доступны</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
