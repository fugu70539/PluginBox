"use client";

import { useState, useEffect } from "react";
import Hub from "@/components/views/Hub";
import Store from "@/components/views/Store";
import Socket from "@/components/views/Socket";
import { Tabbar } from "@/components/ui/TabBar";

// Конфиг теперь содержит только ID и лэйблы, иконки в Таббаре
const tabsConfig = [
  { id: "hub", label: "Хаб" },
  { id: "store", label: "Плагины" },
  { id: "socket", label: "Мастерская" },
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
    <div className="min-h-screen bg-[#0a0a0a] select-none overflow-hidden font-display text-white">
      <div className="pb-36">
        {activeTab === "hub" && <Hub />}
        {activeTab === "store" && <Store />}
        {activeTab === "socket" && <Socket />}
      </div>
      <Tabbar activeTab={activeTab} setActiveTab={setActiveTab} tabsConfig={tabsConfig} />
    </div>
  );
}
