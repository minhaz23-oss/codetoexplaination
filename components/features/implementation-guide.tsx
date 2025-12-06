import { GlassCard } from "@/components/ui/glass-card";
import { Check, Terminal, Rocket, Server } from "lucide-react";

interface ImplementationGuideProps {
  features?: string[];
  prerequisites?: string[];
  deployment?: string;
}

export function ImplementationGuide({ features, prerequisites, deployment }: ImplementationGuideProps) {
  return (
    <div className="space-y-6 h-full">
      <h2 className="text-xl font-bold text-white mb-4">Implementation Details</h2>

      <GlassCard className="space-y-6 h-full border-l-4 border-l-neon-purple">
        {/* Features */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Rocket className="w-5 h-5 text-neon-purple" />
            Key Features
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {features?.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full h-px bg-white/10" />

        {/* Prerequisites */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-yellow-500" />
            Prerequisites
          </h3>
          <div className="flex flex-wrap gap-2">
            {prerequisites?.map((req, idx) => (
              <span key={idx} className="px-3 py-1 rounded bg-black/40 border border-white/10 text-xs font-mono text-gray-300">
                {req}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-white/10" />

        {/* Deployment */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-400" />
            Deployment Strategy
          </h3>
          <p className="text-sm text-gray-300 bg-black/20 p-3 rounded-lg border border-white/5">
            {deployment || "No specific deployment strategy detected."}
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
