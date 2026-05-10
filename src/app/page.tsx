"use client";

import { AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { TabBar } from "@/components/ui/TabBar";
import { Hub } from "@/components/views/Hub";
import { Store } from "@/components/views/Store";
import { Socket } from "@/components/views/Socket";
import { Settings } from "@/components/views/Settings";

export default function Page() {
  const { activeTab, showSettings } = useApp();

  const isTabbarVisible = !showSettings;

  return (
    <div className="min-h-screen bg-[#0a0a0a] select-none overflow-hidden font-display text-white">
      <AnimatePresence mode="wait">
        {showSettings ? (
          <Settings />
        ) : (
          <>
            {activeTab === "hub" && <Hub />}
            {activeTab === "store" && <Store />}
            {activeTab === "socket" && <Socket />}
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTabbarVisible && <TabBar />}
      </AnimatePresence>
    </div>
  );
}
