"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { TABS_CONFIG, ANIMATION } from "@/constants";
import { getCacheParam } from "@/lib/utils";

export const TabBar = () => {
  const { activeTab, setActiveTab, hapticFeedback } = useApp();

  const handleTabClick = (tabId: string) => {
    hapticFeedback("selection");
    setActiveTab(tabId as any);
  };

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
      <nav
        className={
          "tabbar-glass h-16 w-full max-w-sm rounded-full flex items-center " +
          "justify-between p-1 relative pointer-events-auto"
        }
      >
        {TABS_CONFIG.map((tab) => {
          const isActive = activeTab === tab.id;
          const iconPath = `${tab.icon}${getCacheParam(tab.id)}`;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="relative flex-1 h-full flex flex-col items-center justify-center transition-all active:scale-95"
            >
              {/* Highlight background */}
              {isActive && (
                <motion.div
                  layoutId="tab-highlight"
                  className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/10 rounded-full z-0"
                  transition={ANIMATION.easing.springSnappy}
                />
              )}

              {/* Icon */}
              <div className="relative z-10 size-6 flex items-center justify-center">
                <img
                  src={iconPath}
                  alt={tab.label}
                  loading="lazy"
                  className={`size-full object-contain transition-all duration-300 ${
                    isActive ? "opacity-100 scale-110" : "opacity-40"
                  }`}
                />
              </div>

              {/* Label */}
              <span
                className={`text-[10px] mt-1 font-bold uppercase tracking-tight relative z-10 ${
                  isActive ? "opacity-100 text-white" : "opacity-30 text-white"
                } transition-opacity duration-300`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
