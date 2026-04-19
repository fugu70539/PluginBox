"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hub from "@/components/views/Hub";
import Store from "@/components/views/Store";
import Socket from "@/components/views/Socket";
import { Tabbar } from "@/components/ui/TabBar";

const tabsConfig = [
  { id: "hub", icon: "/Icons/Hub.PNG", label: "Хаб" },
  { id: "store", icon: "/Icons/Store.PNG", label: "Плагины" },
  { id: "socket", icon: "/Icons/Socket.PNG", label: "Мастерская" },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState("hub");
  const [isDevView, setIsDevView] = useState(false);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.setHeaderColor("#0a0a0a");
      tg.setBackgroundColor("#0a0a0a");
      tg.enableClosingConfirmation();
    }
  }, []);

  const isTabbarVisible = !isDevView;

  return (
    <div className="min-h-screen bg-[#0a0a0a] select-none overflow-hidden font-display text-white">
      <div className={isTabbarVisible ? "pb-32" : ""}>
        <AnimatePresence mode="wait">
          {activeTab === "hub" && (
            <motion.div key="hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hub />
            </motion.div>
          )}

          {activeTab === "store" && (
            <motion.div key="store" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Store onBack={() => setActiveTab("hub")} onViewChange={setIsDevView} />
            </motion.div>
          )}

          {activeTab === "socket" && (
            <motion.div key="socket" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Socket />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isTabbarVisible && (
          <motion.div
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-[100]"
          >
            <Tabbar activeTab={activeTab} setActiveTab={setActiveTab} tabsConfig={tabsConfig} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
