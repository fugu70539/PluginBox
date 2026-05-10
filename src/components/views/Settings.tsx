"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getCacheParam } from "@/lib/utils";

export const Settings = () => {
  const { setShowSettings, userData } = useApp();
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full font-display min-h-screen bg-[#0a0a0a] text-white flex flex-col"
    >
      {/* Header */}
      <div className="px-6 pt-4 pb-4 border-b border-white/[0.08] flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Параметры</h1>
          <p className="text-xs text-white/40 mt-1">Управляйте вашими настройками</p>
        </div>
        <button
          onClick={() => setShowSettings(false)}
          className="size-9 flex items-center justify-center active:scale-90 transition-transform duration-200 hover:bg-white/5 rounded-full"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="px-6 pt-6 pb-32 flex-1 flex flex-col gap-6 overflow-y-auto">
        {/* Profile section */}
        <div>
          <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
            Профиль
          </h2>
          <Card variant="glass">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                {userData.photoUrl ? (
                  <img
                    src={userData.photoUrl}
                    alt="Avatar"
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold text-white/60 uppercase">
                    {userData.firstName.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white/90">
                  {userData.firstName} {userData.lastName || ""}
                </h3>
                <p className="text-xs text-white/40">@username</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Preferences section */}
        <div>
          <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
            Предпочтения
          </h2>

          {/* Notifications toggle */}
          <Card variant="glass" className="mb-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-white/90 text-sm">Уведомления</h3>
                <p className="text-xs text-white/40 mt-0.5">Получайте обновления</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-12 h-7 rounded-full transition-all ${
                  notifications ? "bg-green-500/70" : "bg-white/10"
                }`}
              >
                <motion.div
                  animate={{ x: notifications ? 24 : 4 }}
                  className="absolute top-1 size-5 bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </Card>

          {/* Theme selector */}
          <Card variant="glass">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-white/90 text-sm">Тема</h3>
              <div className="flex gap-2">
                {["dark", "light"].map((t) => (
                  <Button
                    key={t}
                    variant={theme === t ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setTheme(t as any)}
                    className="flex-1"
                  >
                    {t === "dark" ? "Тёмная" : "Светлая"}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* About section */}
        <div>
          <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
            О приложении
          </h2>
          <Card variant="glass" className="flex flex-col gap-2 text-sm text-white/60">
            <div className="flex justify-between">
              <span>Версия</span>
              <span className="font-mono">1.0.0</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex justify-between">
              <span>Статус</span>
              <span className="text-green-400">Активно</span>
            </div>
          </Card>
        </div>

        {/* Danger zone */}
        <div>
          <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
            Опасная зона
          </h2>
          <Button variant="secondary" size="md" className="w-full border-red-500/30 text-red-400">
            Выход из аккаунта
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
