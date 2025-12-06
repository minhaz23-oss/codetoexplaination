"use client";

import { AnimatedBackground } from "@/components/ui/animated-background";
import { AnimatedInput } from "@/components/ui/animated-input";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".hero-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    })
      .from(".hero-input", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.5")
      .from(".hero-footer", {
        opacity: 0,
        duration: 1,
      }, "-=0.5");
  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    // Simulate short delay for effect before navigation
    setTimeout(() => {
      // Encode URL to pass as query param or generic state
      router.push(`/generate?repo=${encodeURIComponent(url)}`);
    }, 800);
  };

  return (
    <main ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      <AnimatedBackground />

      <div className="z-10 w-full max-w-4xl flex flex-col items-center text-center space-y-8">

        {/* Badge */}
        <div className="hero-text inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium text-neon-blue mb-4">
          <Sparkles className="w-3 h-3 mr-2" />
          AI-Powered Architecture Analysis
        </div>

        {/* Headline */}
        <h1 className="hero-text text-[40px] md:text-[60px] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 leading-tight">
          Generate Your System <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
            Architecture
          </span>
          {" "}Automatically
        </h1>

        {/* Subtext */}
        <p className="hero-text text-lg md:text-xl text-gray-400 max-w-2xl">
          Paste any GitHub repository URL and get an interactive, comprehensive architecture diagram generated instantly using advanced AI analysis.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="hero-input w-full max-w-lg mt-8 relative z-20">
          <GlassCard className="p-2 flex flex-col md:flex-row gap-2 items-stretch">
            <div className="flex-1">
              <AnimatedInput
                placeholder="https://github.com/username/repo"
                icon={<Github className="w-5 h-5" />}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="bg-transparent border-none focus:ring-0"
              />
            </div>
            <GlowButton type="submit" isLoading={isLoading}>
              Generate <ArrowRight className="ml-2 w-4 h-4" />
            </GlowButton>
          </GlassCard>
        </form>

        {/* Footer Credits */}
        <div className="hero-footer absolute bottom-8 text-sm text-gray-500">
          Built with Next.js 15, Tailwind, & GSAP
        </div>
      </div>
    </main>
  );
}
