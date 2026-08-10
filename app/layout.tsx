import type { Metadata } from "next";
import "./globals.css";
import { ClientShell } from "@/components/ClientShell";

export const metadata: Metadata = {
  title: "SoundWave | 360° 采样平台",
  description: "像 Tracklib 一样浏览、采样、创作。面向 Lofi、Chill、Trap 与未来感音乐制作。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="bg-black text-white antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
