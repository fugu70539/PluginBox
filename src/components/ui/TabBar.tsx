"use client";
import { motion } from "framer-motion";

export default function TabBar({ activeTab, setActiveTab }: any) {
  const tabs = [
    { id: "hub", icon: "/Icons/bread.svg" },
    { id: "store", icon: "/Icons/box.svg" },
    { id: "socket", icon: "/Icons/bolt.svg" }
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[88%] h-20 glass-effect bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-around px-2 z-50">
      {tabs.map((tab) => (
        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="relative p-4">
          <img src={tab.icon} className={`w-7 h-7 transition-all ${activeTab === tab.id ? "opacity-100 scale-110" : "opacity-30"}`} alt={tab.id} />
          {activeTab === tab.id && (
            <motion.div layoutId="dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
          )}
        </button>
      ))}
    </nav>
  );
}
