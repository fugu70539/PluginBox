import "./globals.css";

export const metadata = {
  title: "PluginBox",
  description: "Next-gen Telegram Mini App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
