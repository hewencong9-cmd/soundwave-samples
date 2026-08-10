"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Sparkles,
  Music2,
  AudioLines,
  Library,
  Heart,
  FileCheck,
  Drum,
  Bookmark,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainNav = [
  { label: "发现", href: "/", icon: Compass },
  { label: "新的", href: "/sounds", icon: Sparkles },
  { label: "歌曲", href: "/packs", icon: Music2 },
  { label: "声音", href: "/sounds", icon: AudioLines },
];

const libraryNav = [
  { label: "我的图书馆", href: "/sounds", icon: Library },
  { label: "许可证", href: "/pricing", icon: FileCheck },
  { label: "节拍", href: "/sounds", icon: Drum },
  { label: "收藏夹", href: "/sounds", icon: Heart },
  { label: "收藏", href: "/packs", icon: Bookmark },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[var(--sidebar-width)] flex-shrink-0 flex-col border-r border-[var(--border-subtle)] bg-[var(--surface)] md:flex">
      {/* Logo */}
      <div className="flex h-[var(--topbar-height)] items-center px-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--accent)] text-xs font-black text-white">
            S
          </span>
          SoundWave
        </Link>
      </div>

      {/* Main nav */}
      <nav className="flex flex-col gap-1 px-3 pt-2">
        {mainNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-[var(--surface-highlight)] text-white"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-white"
              )}
            >
              <item.icon className="size-5 shrink-0" strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-5 my-4 h-px bg-[var(--border-subtle)]" />

      {/* Library nav */}
      <div className="px-5 pb-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
        我的图书馆
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {libraryNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-[var(--surface-highlight)] text-white"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-white"
              )}
            >
              <item.icon className="size-5 shrink-0" strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4">
        <div className="rounded-xl bg-[var(--surface-elevated)] p-4">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            无限畅玩
          </div>
          <p className="mb-3 text-xs leading-relaxed text-[var(--text-secondary)]">
            订阅即可搜索完整采样库与采样包。
          </p>
          <button className="w-full rounded-md bg-[var(--accent)] px-3 py-2 text-xs font-bold text-white transition hover:bg-[var(--accent-hover)]">
            订阅
          </button>
        </div>
      </div>
    </aside>
  );
}
