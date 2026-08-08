import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "border-transparent bg-white/15 text-white hover:bg-white/25",
  secondary: "border-transparent bg-white/10 text-white/80 hover:bg-white/20",
  destructive: "border-transparent bg-red-500/20 text-red-300 hover:bg-red-500/30",
  outline: "text-white/80 border-white/20",
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
