"use client";

import { useState } from "react";
import Hub from "@/components/views/Hub";
import Store from "@/components/views/Store";
import Socket from "@/components/views/Socket";
import { Tabbar } from "@/components/ui/TabBar";

const tabsConfig = [
  { id: "hub", icon: "/Icons/Hub.PNG", label: "Хаб" },
  { id: "store", icon: "/Icons/Store.PNG", label: "Маркет" },
  { id: "socket", icon: "/Icons/Socket.PNG", label: "Воркплейс" },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState("hub");

  return (
    <div className="min-h-screen bg-[#0a0a0a] select-none overflow-hidden">
      <div className="pb-32">
        {activeTab === "hub" && <Hub />}
        {activeTab === "store" && <Store />}
        {activeTab === "socket" && <Socket />}
      </div>
      <Tabbar activeTab={activeTab} setActiveTab={setActiveTab} tabsConfig={tabsConfig} />
    </div>
  );
}
