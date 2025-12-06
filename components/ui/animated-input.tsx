import { cn } from "@/lib/utils";
import React from "react";

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const AnimatedInput = React.forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-neon-blue transition-colors">
          {icon}
        </div>
        <input
          ref={ref}
          className={cn(
            "w-full bg-white/5 border border-white/10 rounded-xl py-4 pr-4",
            icon ? "pl-12" : "pl-4",
            "text-white placeholder:text-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:border-neon-blue",
            "transition-all duration-300",
            "hover:bg-white/10",
            className
          )}
          {...props}
        />
        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-neon-blue to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
      </div>
    );
  }
);
AnimatedInput.displayName = "AnimatedInput";
