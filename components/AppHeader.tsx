"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, Menu, Bell, UserRound, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePlayerStore } from "@/stores/playerStore";

interface AppHeaderProps {
  onMenuToggle?: () => void;
  sidebarOpen?: boolean;
}

export function AppHeader({ onMenuToggle, sidebarOpen }: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { searchQuery, setSearchQuery } = usePlayerStore();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    setSearchQuery(value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && localSearch.trim()) {
      router.push(`/sounds`);
    }
  };

  const pageTitles: Record<string, string> = {
    "/": "发现",
    "/sounds": "采样库",
    "/packs": "采样包",
    "/pricing": "定价",
    "/upload": "上传",
  };

  const currentTitle = pageTitles[pathname] || "页面";

  return (
    <header className="flex h-[var(--topbar-height)] flex-shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-black px-4 md:px-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuToggle}
          className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--text-secondary)] transition hover:bg-[var(--surface-elevated)] hover:text-white"
        >
          {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <h1 className="text-base font-semibold text-white">{currentTitle}</h1>
      </div>

      <div className="mx-4 flex max-w-xl flex-1 justify-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" />
          <Input
            type="search"
            placeholder="搜索采样、Loop、BPM、Key..."
            value={localSearch}
            onChange={handleSearch}
            onKeyDown={handleSearchKeyDown}
            className="h-9 w-full rounded-full border-[var(--border-subtle)] bg-[var(--surface)] pl-9 text-sm text-white placeholder:text-[var(--text-muted)] focus-visible:ring-[var(--accent)]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={() => router.push("/pricing")}
          className="hidden text-sm font-medium text-[var(--text-secondary)] transition hover:text-white md:block"
        >
          订阅
        </button>
        <button 
          onClick={() => router.push("/upload")}
          className="hidden rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-bold text-white transition hover:bg-[var(--accent-hover)] md:block"
        >
          上传
        </button>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-secondary)] transition hover:bg-[var(--surface-elevated)] hover:text-white">
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-[var(--accent)]" />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-elevated)] text-[var(--text-secondary)] transition hover:text-white">
          <UserRound className="size-4" />
        </button>
      </div>
    </header>
  );
}
