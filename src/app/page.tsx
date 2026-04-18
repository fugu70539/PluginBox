"use client";

import { useState, useEffect } from "react";
import Hub from "@/components/views/Hub";
import Store from "@/components/views/Store";
import Socket from "@/components/views/Socket";
import { Tabbar } from "@/components/ui/TabBar";

const tabsConfig = [
  { id: "hub", icon: "/Icons/Hub.PNG", label: "Хаб" },
  { id: "store", icon: "/Icons/Plugins.PNG", label: "Плагины" },
  { id: "socket", icon: "/Icons/Workshop.PNG", label: "Мастерская" },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState("hub");

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.setHeaderColor("#0a0a0a");
      tg.setBackgroundColor("#0a0a0a");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] select-none overflow-hidden font-display">
      <div className="pb-32">
        {activeTab === "hub" && <Hub />}
        {activeTab === "store" && <Store />}
        {activeTab === "socket" && <Socket />}
      </div>
      <Tabbar activeTab={activeTab} setActiveTab={setActiveTab} tabsConfig={tabsConfig} />
    </div>
  );
}
