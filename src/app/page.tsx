"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hub from "@/components/views/Hub";
import Store from "@/components/views/Store";
import Socket from "@/components/views/Socket";
import Settings from "@/components/views/Settings";
import { Tabbar } from "@/components/ui/TabBar";

const tabsConfig = [
  { id: "hub", icon: "/Icons/Hub.PNG", label: "Хаб" },
  { id: "store", icon: "/Icons/Store.PNG", label: "Плагины" },
  { id: "socket", icon: "/Icons/Socket.PNG", label: "Мастерская" },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState("hub");
  const [isDevView, setIsDevView] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.setHeaderColor("#0a0a0a");
      tg.setBackgroundColor("#0a0a0a");
    }
  }, []);

  const isTabbarVisible = !showSettings && !(activeTab === "store" && isDevView);

  return (
    <div className="min-h-screen bg-[#0a0a0a] select-none overflow-hidden font-display text-white">
      <AnimatePresence mode="wait">
        {showSettings ? (
          <motion.div 
            key="settings" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <Settings onBack={() => setShowSettings(false)} />
          </motion.div>
        ) : (
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className={isTabbarVisible ? "pb-32" : ""}
          >
            {activeTab === "hub" && <Hub onSettings={() => setShowSettings(true)} />}
            {activeTab === "store" && <Store onBack={() => setActiveTab("hub")} onViewChange={setIsDevView} />}
            {activeTab === "socket" && <Socket />}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTabbarVisible && (
          <motion.div
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[100]"
          >
            <Tabbar activeTab={activeTab} setActiveTab={setActiveTab} tabsConfig={tabsConfig} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
