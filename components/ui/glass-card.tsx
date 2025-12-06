import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  active?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, active, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass rounded-xl p-6 transition-all duration-300",
          "hover:glass-hover hover:scale-[1.01]",
          active && "neon-border bg-white/5",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";
