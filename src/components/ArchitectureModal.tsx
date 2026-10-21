"use client";

import React from "react";
import { X, Layers, Database, Shield, Zap, ExternalLink } from "lucide-react";

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    diagramDescription: string;
    flowSteps: { step: string; detail: string }[];
  } | null;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700/80 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">
              System Architecture Deep-Dive: {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Narrative & Visual Topology */}
        <div className="mt-6 space-y-6">
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.diagramDescription}
          </p>

          {/* Interactive Topology Container */}
          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
            <div className="text-cyan-400 font-bold mb-4 uppercase tracking-widest flex items-center space-x-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Architectural Data Flow Pipeline</span>
            </div>

            <div className="space-y-4">
              {project.flowSteps.map((s, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">{s.step}</span>
                    <p className="text-slate-400 font-sans text-xs mt-0.5">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Architectural Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/60">
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold mb-1">
                <Database className="w-3.5 h-3.5" />
                <span>Zero Data Loss</span>
              </div>
              <p className="text-[11px] text-slate-400">
                PostgreSQL transactional write-ahead logs replicated cross-region with automated snapshotting.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/60">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span>Zero-Trust Security</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Managed Identity & Azure Key Vault eliminating credentials across the entire container tier.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/60">
              <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Sub-50ms p99</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Aggressive edge caching via Azure Front Door combined with asynchronous .NET 8 I/O pipelines.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition"
          >
            Close Deep-Dive
          </button>
        </div>
      </div>
    </div>
  );
};
