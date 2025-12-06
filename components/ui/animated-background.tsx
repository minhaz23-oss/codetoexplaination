"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export const AnimatedBackground = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate blobs
      gsap.to(".blob", {
        y: "random(-50, 50)",
        x: "random(-50, 50)",
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 5,
          from: "random",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("fixed inset-0 -z-10 overflow-hidden bg-[#030014]", className)}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Orb 1 */}
      <div className="blob absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-neon-purple/20 blur-[100px]" />

      {/* Orb 2 */}
      <div className="blob absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-neon-blue/20 blur-[100px]" />

      {/* Orb 3 */}
      <div className="blob absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-neon-pink/10 blur-[100px]" />
    </div>
  );
};
