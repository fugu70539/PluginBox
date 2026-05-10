/**
 * Core type definitions for PluginBox
 */

export type ViewType = "hub" | "store" | "socket";
export type StoreViewType = "plugins" | "developers";

export interface TabConfig {
  id: ViewType;
  icon: string;
  label: string;
}

export interface Plugin {
  id: string;
  name: string;
  description: string;
  rating: number;
  installs: number;
  thumbnail?: string;
  createdAt: Date;
}

export interface Developer {
  id: string;
  name: string;
  avatar?: string;
  pluginCount: number;
  rating: number;
}

export interface Socket {
  id: string;
  name: string;
  status: "connected" | "disconnected" | "connecting";
  address: string;
  connectedAt?: Date;
}

export interface UserData {
  id?: string;
  firstName: string;
  lastName?: string;
  photoUrl?: string;
}

export interface TelegramWebApp {
  ready: () => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  HapticFeedback?: {
    impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void;
    selectionChanged: () => void;
    notificationOccurred: (type: "error" | "success" | "warning") => void;
  };
  initDataUnsafe?: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      photo_url?: string;
    };
  };
}
