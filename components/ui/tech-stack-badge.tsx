import { cn } from "@/lib/utils";
import React from "react";

interface TechStackBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  color?: string; // hex or tailwind class
}

export const TechStackBadge = ({ name, color = "bg-gray-800", className, ...props }: TechStackBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        "bg-white/5 border border-white/10 backdrop-blur-sm",
        "transition-all hover:scale-105 hover:bg-white/10 hover:border-neon-purple/50",
        className
      )}
      {...props}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-neon-blue mr-2 animate-pulse" />
      {name}
    </span>
  );
};
