"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { ViewType, StoreViewType, UserData, TelegramWebApp } from "@/types";

interface AppContextType {
  // Navigation
  activeTab: ViewType;
  setActiveTab: (tab: ViewType) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  storeView: StoreViewType;
  setStoreView: (view: StoreViewType) => void;

  // User
  userData: UserData;
  setUserData: (data: UserData) => void;

  // Telegram integration
  tg: TelegramWebApp | null;
  hapticFeedback: (type: "light" | "medium" | "selection") => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Navigation state
  const [activeTab, setActiveTab] = useState<ViewType>("hub");
  const [showSettings, setShowSettings] = useState(false);
  const [storeView, setStoreView] = useState<StoreViewType>("plugins");

  // User state
  const [userData, setUserData] = useState<UserData>({
    firstName: "User",
  });

  // Telegram
  const [tg, setTg] = useState<TelegramWebApp | null>(null);

  // Initialize Telegram and get user data
  useEffect(() => {
    const telegram = (window as any).Telegram?.WebApp as TelegramWebApp;
    if (telegram) {
      setTg(telegram);
      telegram.ready();
      telegram.setBackgroundColor("#0a0a0a");

      const userInfo = telegram.initDataUnsafe?.user;
      if (userInfo) {
        setUserData({
          id: userInfo.id?.toString(),
          firstName: userInfo.first_name,
          lastName: userInfo.last_name,
          photoUrl: userInfo.photo_url,
        });
      }
    }
  }, []);

  // Update header color on tab/settings change
  useEffect(() => {
    if (!tg) return;

    if (showSettings) {
      tg.setHeaderColor("#0a0a0a");
    } else if (activeTab === "hub") {
      tg.setHeaderColor("#131313");
    } else {
      tg.setHeaderColor("#0a0a0a");
    }
  }, [activeTab, showSettings, tg]);

  // Haptic feedback wrapper
  const hapticFeedback = useCallback(
    (type: "light" | "medium" | "selection") => {
      if (tg?.HapticFeedback) {
        if (type === "selection") {
          tg.HapticFeedback.selectionChanged();
        } else {
          tg.HapticFeedback.impactOccurred(type);
        }
      }
    },
    [tg]
  );

  const value: AppContextType = {
    activeTab,
    setActiveTab,
    showSettings,
    setShowSettings,
    storeView,
    setStoreView,
    userData,
    setUserData,
    tg,
    hapticFeedback,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
