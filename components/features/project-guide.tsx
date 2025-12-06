import { GlassCard } from "@/components/ui/glass-card";

import React from "react";

interface ProjectGuideProps {
  projectInfo?: {
    name: string;
    purpose: string;
    description: string;
    type: string;
  };
  structure?: {
    summary: string;
    directories: Array<{ name: string; description: string }>;
  };
  routes?: Array<{
    path: string;
    type: "frontend" | "backend";
    description: string;
    file: string;
  }>;
}

export function ProjectGuide({ projectInfo, structure, routes }: ProjectGuideProps) {
  if (!projectInfo) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 1. Project Header */}
      <GlassCard className="p-8 border-l-4 border-l-neon-blue">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-3xl font-bold text-white tracking-tight">{projectInfo.name || "Project Analysis"}</h1>
          <span className="px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple text-xs border border-neon-purple/50 uppercase tracking-widest font-semibold">
            {projectInfo.type}
          </span>
        </div>
        <p className="text-xl text-gray-200 font-medium mb-4">{projectInfo.purpose}</p>
        <p className="text-gray-400 leading-relaxed">{projectInfo.description}</p>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 2. Folder Structure */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-mono">/</span>
            Folder Structure
          </h2>
          <GlassCard className="space-y-4">
            <p className="text-sm text-gray-400 italic mb-4">{structure?.summary}</p>
            <div className="space-y-3">
              {structure?.directories.map((dir, idx) => (
                <div key={idx} className="group flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                  <div className="text-yellow-400 mt-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V8C22 6.89543 21.1046 6 20 6H12L10 4Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-mono text-sm font-semibold group-hover:text-neon-blue transition-colors">{dir.name}</h4>
                    <p className="text-gray-500 text-xs mt-1">{dir.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* 3. Key Routes */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-mono">➔</span>
            Key Routes & Pages
          </h2>
          <GlassCard className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
            {routes?.map((route, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-black/40 border border-white/5 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm text-neon-cyan font-mono bg-neon-cyan/10 px-2 py-0.5 rounded">
                    {route.path}
                  </code>
                  <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${route.type === 'frontend' ? 'bg-pink-500/20 text-pink-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                    {route.type}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{route.description}</p>
                <div className="text-xs text-gray-600 font-mono text-right truncate">
                  {route.file}
                </div>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
