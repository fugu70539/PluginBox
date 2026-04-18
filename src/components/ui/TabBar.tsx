"use client";

import { motion } from "framer-motion";

interface TabConfig {
  id: string;
  label: string;
}

interface TabbarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  tabsConfig: TabConfig[];
}

// Заменяем PNG на SVG/Шрифты для четкости (на примере Lucide)
const getIcon = (id: string, isActive: boolean) => {
  const common = `size-7 transition-all duration-300 ${isActive ? 'stroke-white' : 'stroke-white/30'}`;
  switch (id) {
    case "hub":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} strokeWidth="1.5">
          <path d="M4 4h16v16H4V4zm2 2v12h12V6H6z" strokeLinecap="round"/>
          <path d="M12 6v12M6 12h12" strokeLinecap="round"/>
        </svg>
      );
    case "store":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
          <path d="M7 14v7M3 17h8M3 21h8" strokeLinecap="round"/>
        </svg>
      );
    case "socket":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} strokeWidth="1.5">
          <path d="M12 2v2M22 12h-2M2 12h2M12 22v-2" strokeLinecap="round"/>
          <path d="m19.07 4.93-1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M4.93 4.93l1.41 1.41" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="4"/>
        </svg>
      );
  }
};

export const Tabbar = ({ activeTab, setActiveTab, tabsConfig }: TabbarProps) => {
  const handleTabClick = (id: string) => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.selectionChanged();
    }
    setActiveTab(id);
  };

  return (
    <div className="fixed bottom-10 left-0 right-0 z-50 flex justify-center px-10 pointer-events-none">
      <nav className="h-[76px] w-full max-w-[360px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-between px-2.5 relative pointer-events-auto shadow-[0_12px_48px_rgba(0,0,0,0.6)]">
        {tabsConfig.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="relative flex-1 h-[56px] flex flex-col items-center justify-center transition-all active:scale-95"
            >
              {isActive && (
                <motion.div
                  layoutId="tab-highlight"
                  className="absolute inset-0 bg-white/[0.08] backdrop-blur-lg border border-white/[0.06] rounded-full z-0"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}

              <div className="relative z-10 size-7 mb-1 flex items-center justify-center">
                {getIcon(tab.id, isActive)}
              </div>
              
              <span className={`text-[10px] font-bold uppercase tracking-[0.08em] relative z-10 transition-opacity duration-300 font-display ${isActive ? 'opacity-100 text-white' : 'opacity-30 text-white'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
