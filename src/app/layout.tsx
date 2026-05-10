import type { Metadata } from "next";
import { AppProvider } from "@/contexts/AppContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "PluginBox",
  description: "Telegram Mini App for discovering and managing plugins",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
