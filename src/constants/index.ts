import type { TabConfig } from "@/types";

/**
 * Color palette
 */
export const COLORS = {
  background: "#0a0a0a",
  surface: "#131313",
  surfaceSecondary: "#1a1a1a",
  border: "rgba(255, 255, 255, 0.08)",
  text: {
    primary: "#ffffff",
    secondary: "rgba(255, 255, 255, 0.6)",
    tertiary: "rgba(255, 255, 255, 0.3)",
    disabled: "rgba(255, 255, 255, 0.15)",
  },
} as const;

/**
 * Animation timings
 */
export const ANIMATION = {
  easing: {
    spring: { type: "spring", stiffness: 350, damping: 28 },
    springSnappy: { type: "spring", stiffness: 400, damping: 30 },
    standard: "ease-out",
  },
  duration: {
    instant: 0,
    short: 150,
    standard: 300,
    medium: 400,
    long: 500,
  },
} as const;

/**
 * Tab configuration
 */
export const TABS_CONFIG: TabConfig[] = [
  { id: "hub", icon: "/Icons/Hub.PNG", label: "Хаб" },
  { id: "store", icon: "/Icons/Store.PNG", label: "Плагины" },
  { id: "socket", icon: "/Icons/Socket.PNG", label: "Мастерская" },
];

/**
 * Filter options
 */
export const FILTER_OPTIONS = ["Все", "По имени", "По дате", "По рейтингу"] as const;

/**
 * Breakpoints (for responsive design)
 */
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
} as const;
