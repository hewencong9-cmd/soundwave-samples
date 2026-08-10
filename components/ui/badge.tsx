import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "border-transparent bg-[var(--surface-elevated)] text-white hover:bg-[var(--surface-highlight)]",
  secondary: "border-transparent bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)]",
  destructive: "border-transparent bg-red-500/20 text-red-300 hover:bg-red-500/30",
  outline: "border-[var(--border-subtle)] text-[var(--text-secondary)]",
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
