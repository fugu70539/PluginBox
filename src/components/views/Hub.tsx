"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { SearchInput } from "@/components/ui/SearchInput";
import { Dropdown } from "@/components/ui/Dropdown";
import { Avatar } from "@/components/ui/Avatar";
import { FILTER_OPTIONS, ANIMATION } from "@/constants";
import { getCacheParam } from "@/lib/utils";

export const Hub = () => {
  const { userData, setShowSettings } = useApp();
  const [activeFilter, setActiveFilter] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    // Disable initial animations after first render
    setIsInitialRender(false);
  }, []);

  const filterOptions = FILTER_OPTIONS.map((opt) => ({
    value: opt,
    label: opt,
  }));

  return (
    <div className="w-full font-display min-h-screen bg-[#0a0a0a] overflow-x-hidden text-white flex flex-col">
      {/* Header / Panel */}
      <div className="w-full hub-panel rounded-b-[40px] px-6 pt-4 pb-8">
        {/* Top bar with avatar and settings */}
        <header className="flex items-center justify-between mb-6">
          <Avatar
            src={userData.photoUrl}
            fallback={userData.firstName}
            size="md"
            status="online"
          />
          <button
            onClick={() => setShowSettings(true)}
            className="size-9 flex items-center justify-center active:scale-90 transition-transform duration-200"
            aria-label="Settings"
          >
            <img
              src={`/Icons/Settings.PNG${getCacheParam("settings")}`}
              alt="Settings"
              className="size-7 object-contain opacity-40 hover:opacity-60 transition-opacity"
            />
          </button>
        </header>

        {/* Welcome section */}
        <div className="flex flex-col items-center justify-center text-center mb-7 gap-0.5">
          {isInitialRender ? (
            <>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={ANIMATION.easing.spring}
                className="text-[28px] font-bold tracking-tight leading-tight"
              >
                Привет, {userData.firstName}!
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...ANIMATION.easing.spring, delay: 0.05 }}
                className="text-[28px] font-bold tracking-tight text-white/20 leading-tight"
              >
                Что бы ты хотел найти?
              </motion.h2>
            </>
          ) : (
            <>
              <h1 className="text-[28px] font-bold tracking-tight leading-tight">
                Привет, {userData.firstName}!
              </h1>
              <h2 className="text-[28px] font-bold tracking-tight text-white/20 leading-tight">
                Что бы ты хотел найти?
              </h2>
            </>
          )}
        </div>

        {/* Search input */}
        <SearchInput
          placeholder="Искать плагины..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Main content */}
      <main className="px-6 pt-6 flex-1 flex flex-col">
        {/* Recommendations header with filter */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-white/90 tracking-tight">
            Рекомендуем
          </h3>

          <Dropdown
            options={filterOptions}
            value={activeFilter}
            onChange={setActiveFilter}
            label="Фильтр"
          />
        </div>

        {/* Empty state or plugins grid */}
        <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
          <div className="size-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="opacity-30"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2z"
                fill="currentColor"
              />
            </svg>
          </div>
          <p className="text-sm text-white/40">Нет плагинов для отображения</p>
        </div>
      </main>
    </div>
  );
};
