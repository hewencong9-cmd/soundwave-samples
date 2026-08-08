import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { AudioPlayer } from "@/components/AudioPlayer";

export const metadata: Metadata = {
  title: "SoundWave | 中国年轻制作人的音乐采样库",
  description: "暗色玻璃拟态的在线音乐采样库，面向 Lofi、Chill 与未来感音乐制作。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="min-h-screen bg-[#201d23] text-white antialiased">
        <Header />
        {children}
        <AudioPlayer />
      </body>
    </html>
  );
}
