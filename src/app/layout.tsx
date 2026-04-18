import type { Metadata, Viewport } from "next";
import Script from "next/script"; // Импортируем компонент для скриптов
import "./globals.css";

export const metadata: Metadata = {
  title: "PluginBox",
  description: "Marketplace for plugins",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="fixed-layout">
      <head>
        {/* Подключаем основной скрипт Telegram API */}
        <Script 
          src="https://telegram.org/js/telegram-web-app.js" 
          strategy="beforeInteractive" 
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
