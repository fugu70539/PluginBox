"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

interface TabbarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const tabsConfig = [
  { id: "hub", path: "/Icons/Hub.json", label: "Hub" },
  { id: "store", path: "/Icons/Store.json", label: "Store" },
  { id: "socket", path: "/Icons/Socket.json", label: "Socket" },
];

export const Tabbar = ({ activeTab, setActiveTab }: TabbarProps) => {
  const [animations, setAnimations] = useState<Record<string, any>>({});

  // Загружаем JSON файлы как обычные данные, а не как модули
  useEffect(() => {
    tabsConfig.forEach(async (tab) => {
      try {
        const res = await fetch(tab.path);
        const data = await res.json();
        setAnimations(prev => ({ ...prev, [tab.id]: data }));
      } catch (e) {
        console.error("Failed to load animation:", tab.path);
      }
    });
  }, []);

  const handleTabClick = (id: string) => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.selectionChanged();
    }
    setActiveTab(id);
  };

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-7 pointer-events-none">
      <nav className="tabbar-glass h-[64px] w-full max-w-[320px] rounded-[32px] flex items-center justify-around px-2 relative pointer-events-auto">
        {tabsConfig.map((tab) => {
          const isActive = activeTab === tab.id;
          const animData = animations[tab.id];

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
                {animData && (
                  <Lottie
                    animationData={animData}
                    loop={isActive}
                    autoplay={isActive}
                    style={{ width: '100%', height: '100%', opacity: isActive ? 1 : 0.3 }}
                  />
                )}
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
