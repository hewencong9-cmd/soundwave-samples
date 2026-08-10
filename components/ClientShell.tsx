"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { AppPlayer } from "@/components/AppPlayer";
import { MarketingHeader } from "@/components/MarketingHeader";

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black text-white antialiased">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <AppHeader />
        <main className="flex-1 overflow-y-auto bg-black">{children}</main>
        <AppPlayer />
      </div>
    </div>
  );
}

function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-black text-white antialiased">
      <MarketingHeader />
      <main>{children}</main>
    </div>
  );
}

export function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by rendering nothing until mounted.
  if (!mounted) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
        <span className="text-sm text-[var(--text-secondary)]">Loading…</span>
      </div>
    );
  }

  const isMarketing = pathname === "/";

  if (isMarketing) {
    return <MarketingShell>{children}</MarketingShell>;
  }

  return <AppShell>{children}</AppShell>;
}
