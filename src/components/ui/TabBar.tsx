"use client";

import { motion } from "framer-motion";

interface TabConfig {
  id: string;
  icon: string;
  label: string;
}

interface TabbarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  tabsConfig: TabConfig[];
}

export const Tabbar = ({ activeTab, setActiveTab, tabsConfig }: TabbarProps) => {
  const handleTabClick = (id: string) => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.selectionChanged();
    }
    setActiveTab(id);
  };

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-7 pointer-events-none">
      <nav className="tabbar-glass h-[64px] w-full max-w-[340px] rounded-full flex items-center justify-between p-1 relative pointer-events-auto">
        {tabsConfig.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="relative flex-1 h-full flex flex-col items-center justify-center transition-all active:scale-95"
            >
              {isActive && (
                <motion.div
                  layoutId="tab-highlight"
                  className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/10 rounded-full z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <div className="relative z-10 size-7 flex items-center justify-center">
                <img
                  src={tab.icon}
                  alt={tab.label}
                  className={`size-full object-contain transition-all duration-300 ${isActive ? 'opacity-100 scale-110' : 'opacity-40 scale-100'}`}
                />
              </div>
              
              <span className={`text-[11px] mt-1 font-bold tracking-tight relative z-10 transition-opacity duration-300 font-display ${isActive ? 'opacity-100 text-white' : 'opacity-30 text-white'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
