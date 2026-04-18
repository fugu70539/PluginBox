"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

import hubAnim from "../../../public/Icons/Hub.json";
import storeAnim from "../../../public/Icons/Store.json";
import socketAnim from "../../../public/Icons/Socket.json";

const tabs = [
  { id: "hub", icon: hubAnim, label: "Hub" },
  { id: "store", icon: storeAnim, label: "Store" },
  { id: "socket", icon: socketAnim, label: "Socket" },
];

export const Tabbar = () => {
  const [activeTab, setActiveTab] = useState("hub");

  const handleTabClick = (id: string) => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.selectionChanged();
    }
    setActiveTab(id);
  };

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-7">
      <nav className="tabbar-glass h-[64px] w-full max-w-[320px] rounded-[32px] flex items-center justify-around px-2 relative">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="relative flex flex-col items-center justify-center w-20 h-12 transition-all active:scale-90"
            >
              {isActive && (
                <motion.div
                  layoutId="tab-highlight"
                  className="absolute inset-0 tab-active-bg rounded-[24px] z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}

              <div className="relative z-10 size-6 flex items-center justify-center">
                <Lottie
                  animationData={tab.icon}
                  loop={isActive}
                  autoplay={isActive}
                  style={{ width: '100%', height: '100%', opacity: isActive ? 1 : 0.4 }}
                />
              </div>
              
              <span className={`text-[10px] mt-1 font-bold uppercase tracking-widest relative z-10 transition-opacity duration-300 ${isActive ? 'opacity-100 text-white' : 'opacity-30 text-white'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
