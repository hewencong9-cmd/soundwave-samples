"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, Menu, Search, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navItems = [
  { label: "采样库", href: "/sounds" },
  { label: "采样包", href: "/packs" },
  { label: "定价", href: "/pricing" },
  { label: "上传", href: "/upload" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#201d23]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold text-white">
            SoundWave
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3 md:gap-4">
          <div className="relative hidden max-w-xs flex-1 md:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/50" />
            <Input
              type="search"
              placeholder="搜索采样、Loop、BPM..."
              className="h-9 rounded-full border-white/10 bg-white/5 pl-9"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative text-white/70">
            <Bell className="size-5" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-cyan-300" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/70 md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
          <Button
            variant="outline"
            className="hidden items-center gap-2 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 md:inline-flex"
          >
            <UserRound className="size-4" />
            登录
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#201d23]/95 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
