"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
  status: "waiting" | "active" | "completed";
}

interface LoadingTimelineProps {
  currentStep: number;
}

const STEPS = [
  { id: "fetch", label: "Fetching Repository..." },
  { id: "analyze", label: "Analyzing Code Structure..." },
  { id: "understand", label: "Understanding Dependencies..." },
  { id: "build", label: "Generating Architecture Diagram..." },
];

export const LoadingTimeline = ({ currentStep }: LoadingTimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate the active step
    gsap.fromTo(
      `.step-${currentStep}`,
      { scale: 0.9, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  }, { scope: containerRef, dependencies: [currentStep] });

  return (
    <div ref={containerRef} className="max-w-md w-full mx-auto space-y-6">
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10" />

        <div className="space-y-8">
          {STEPS.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div
                key={step.id}
                className={cn(
                  "relative flex items-center space-x-4 transition-all duration-300",
                  `step-${index}`,
                  index > currentStep ? "opacity-40 blur-[1px]" : "opacity-100 blur-none"
                )}
              >
                <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-background border-2 border-white/20 transition-colors duration-300">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-neon-green text-green-400" />
                  ) : isActive ? (
                    <Loader2 className="w-5 h-5 text-neon-blue animate-spin" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-600" />
                  )}

                  {/* Glowing background for active step */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-neon-blue/20 blur-md animate-pulse" />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className={cn(
                    "text-lg font-medium transition-colors",
                    isActive ? "text-white" : "text-gray-400"
                  )}>
                    {step.label}
                  </h3>
                  {isActive && (
                    <p className="text-sm text-neon-blue/80 animate-pulse mt-1">
                      Processing...
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
