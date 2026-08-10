import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  default: "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]",
  destructive: "bg-red-600 text-white hover:bg-red-500",
  outline: "border border-[var(--border-subtle)] bg-transparent text-white hover:bg-[var(--surface-elevated)]",
  secondary: "bg-[var(--surface-elevated)] text-white hover:bg-[var(--surface-highlight)]",
  ghost: "text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-white",
  link: "text-[var(--accent)] underline-offset-4 hover:underline",
};

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-12 rounded-md px-8",
  icon: "h-10 w-10",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:pointer-events-none disabled:opacity-50",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
