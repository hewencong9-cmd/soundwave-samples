"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "浏览", href: "/sounds" },
  { label: "工作原理", href: "#how-it-works" },
  { label: "应用", href: "#apps" },
  { label: "定价", href: "/pricing" },
];

export function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="text-lg font-black tracking-tight text-white">
          SOUNDWAVE
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-white/70 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/sounds"
            className="rounded-full px-4 py-2 text-sm font-bold text-white transition hover:text-white/80"
          >
            登录
          </Link>
          <Link
            href="/sounds"
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--accent-hover)]"
          >
            开始使用
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-white md:hidden"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden bg-black transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-96 border-b border-white/5" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-white/5 pt-3">
            <Link
              href="/sounds"
              className="rounded-md px-3 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/5 hover:text-white"
            >
              登录
            </Link>
            <Link
              href="/sounds"
              className="rounded-md bg-[var(--accent)] px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
            >
              开始使用
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
