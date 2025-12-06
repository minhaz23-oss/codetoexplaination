"use client";

import { ImplementationGuide } from "@/components/features/implementation-guide";
import { LoadingTimeline } from "@/components/features/loading-timeline";
import { ProjectGuide } from "@/components/features/project-guide";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { TechStackBadge } from "@/components/ui/tech-stack-badge";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, Share2, AlertTriangle, Check } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function GeneratePageContent() {
  const searchParams = useSearchParams();
  const repoUrl = searchParams.get("repo");
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState<any>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  useEffect(() => {
    if (!repoUrl) {
      setStatus("error");
      setErrorMsg("No Repository URL provided.");
      return;
    }

    const fetchData = async () => {
      try {
        setCurrentStep(0);

        // Progress simulation
        const progressInterval = setInterval(() => {
          setCurrentStep(prev => prev < 2 ? prev + 1 : prev);
        }, 2000);

        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: repoUrl }),
        });

        clearInterval(progressInterval);

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || "Failed to generate");
        }

        const result = await response.json();
        setData(result);

        setCurrentStep(3);
        setTimeout(() => setStatus("success"), 800);

      } catch (err: any) {
        setStatus("error");
        setErrorMsg(err.message);
      }
    };

    fetchData();
  }, [repoUrl]);

  useGSAP(() => {
    if (status === "success") {
      gsap.from(".result-view", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
      });
    }
  }, [status]);

  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <AnimatedBackground />
        <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/50 text-white max-w-md">
          <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Generation Failed</h2>
          <p className="text-gray-400 mb-6">{errorMsg}</p>
          <GlowButton variant="outline" onClick={() => router.push("/")}>
            Try Another Repo
          </GlowButton>
        </div>
      </div>
    )
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <AnimatedBackground />
        <h2 className="text-2xl font-bold mb-8 animate-pulse">
          Analyzing Repository...
        </h2>
        <div className="text-sm text-gray-500 mb-8 max-w-md truncate">
          {repoUrl || "No URL provided"}
        </div>
        <LoadingTimeline currentStep={currentStep} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6 lg:p-10 relative">
      <AnimatedBackground />

      <header className="result-view flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <button
            onClick={() => router.push("/")}
            className="flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
          </button>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            System Architecture
          </h1>
          <p className="text-gray-500 text-sm mt-1 truncate max-w-lg">
            Source: <span className="text-neon-blue">{repoUrl}</span>
          </p>
        </div>

        <div className="flex gap-3">
          <GlowButton variant="outline" className="px-4 py-2" onClick={handleShare}>
            {isCopied ? (
              <>
                <Check className="w-4 h-4 mr-2" /> Copied!
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 mr-2" /> Share
              </>
            )}
          </GlowButton>
        </div>
      </header>

      <div className="result-view flex flex-col gap-10 flex-1">
        {/* New "Understanding" Section */}
        <ProjectGuide
          projectInfo={data?.projectInfo}
          structure={data?.structure}
          routes={data?.routes}
        />

        {/* Technical Details Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Technical Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6 lg:col-span-1">
              <GlassCard className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Detected Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {data?.analysis?.stack?.length ? (
                    data.analysis.stack.map((tech: string) => (
                      <TechStackBadge key={tech} name={tech} />
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No stack detected</span>
                  )}
                </div>
              </GlassCard>

              <GlassCard className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Analysis Stats</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex justify-between">
                    <span>Files</span>
                    <span className="text-white">{data?.analysis?.stats?.files || 0}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Database Tables</span>
                    <span className="text-white">{data?.analysis?.database?.length || 0}</span>
                  </li>
                </ul>
              </GlassCard>
            </div>

            <div className="lg:col-span-2">
              <ImplementationGuide
                features={data?.implementation?.features}
                prerequisites={data?.implementation?.prerequisites}
                deployment={data?.implementation?.deployment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Loading...</div>}>
      <GeneratePageContent />
    </Suspense>
  )
}
