"use client";

import { GlassCard } from "@/components/ui/glass-card";
import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import React, { useEffect } from "react";

export interface DiagramCanvasProps {
  initialNodes?: any[];
  initialEdges?: any[];
}

export const DiagramCanvas = ({ initialNodes = [], initialEdges = [] }: DiagramCanvasProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    if (initialNodes.length > 0) {
      setNodes(initialNodes);
    }
    if (initialEdges.length > 0) {
      setEdges(initialEdges);
    }
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  return (
    <div className="w-full h-[600px] md:h-[800px] relative rounded-xl overflow-hidden border border-white/10">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        colorMode="dark"
        id="diagram-canvas"
      >
        <Background color="#333" gap={20} />
        <Controls className="bg-white/10 border border-white/10 text-white fill-white" />
      </ReactFlow>

      {/* Overlay Badge */}
      <div className="absolute top-4 right-4 z-10">
        <GlassCard className="py-2 px-4 !bg-black/50 text-xs text-white/70">
          Interactive Mode
        </GlassCard>
      </div>
    </div>
  );
};
