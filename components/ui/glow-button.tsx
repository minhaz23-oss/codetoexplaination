import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
  glowColor?: "blue" | "purple" | "pink";
}

export const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = "primary", isLoading, glowColor = "blue", children, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center rounded-lg px-8 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    const variants = {
      primary: `bg-gradient-to-r from-neon-${glowColor} to-neon-purple text-black hover:opacity-90 shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)]`,
      secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10",
      outline: "bg-transparent border border-neon-blue text-neon-blue hover:bg-neon-blue/10",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
        {/* Inner glow effect */}
        {variant === 'primary' && (
          <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
        )}
      </button>
    );
  }
);
GlowButton.displayName = "GlowButton";
