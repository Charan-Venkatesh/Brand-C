"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, Clock, Sparkles, Layers, History, Globe } from "lucide-react";
import { HCCStore, PublicationSnapshot } from "@/lib/store";

export default function AdminPublish() {
  const [snapshots, setSnapshots] = useState<PublicationSnapshot[]>([]);
  const [releaseNotes, setReleaseNotes] = useState("");
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  const loadSnapshots = () => {
    HCCStore.getSnapshots().then((data) => setSnapshots(data));
  };

  useEffect(() => {
    loadSnapshots();
  }, []);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSnap = await HCCStore.publishSnapshot(releaseNotes);
    if (newSnap) {
      setSnapshots([newSnap, ...snapshots]);
      setPublishedSuccess(true);
      setReleaseNotes("");
      setTimeout(() => setPublishedSuccess(false), 4000);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Snapshot Publishing Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish an immutable versioned snapshot. Triggers global Next.js ISR cache invalidation.
          </p>
        </div>
      </div>

      {publishedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-xs flex items-center space-x-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <div className="font-bold">Production Snapshot Deployed Successfully!</div>
            <p className="text-[11px] text-emerald-400/90 mt-0.5">
              Cache tags revalidated. Recruiters globally will see updated architectural case studies instantly.
            </p>
          </div>
        </div>
      )}

      {/* Main Publishing Box */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Deploy Next Incremental Snapshot</span>
        </div>

        <form onSubmit={handlePublish} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Release Notes & Version Log
            </label>
            <textarea
              rows={3}
              required
              placeholder="e.g. Added high-scale payment gateway case study, updated p99 telemetry benchmarks..."
              value={releaseNotes}
              onChange={(e) => setReleaseNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-400 outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">
              Next Snapshot Version: <strong className="text-cyan-400">#v{(snapshots[0]?.version || 0) + 1}</strong>
            </span>
            <button
              type="submit"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Deploy Live Snapshot</span>
            </button>
          </div>
        </form>
      </div>

      {/* Snapshot History */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-2">
          <History className="w-4 h-4 text-cyan-400" />
          <span>Publication Release History</span>
        </h2>

        <div className="space-y-3">
          {snapshots.map((snap, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white">Snapshot #v{snap.version}</span>
                  {idx === 0 && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      CURRENT PRODUCTION
                    </span>
                  )}
                </div>
                <p className="text-slate-300 text-xs mt-1">{snap.releaseNotes || snap.notes}</p>
                {snap.summary && <div className="text-[11px] text-slate-500 mt-1">{snap.summary}</div>}
              </div>
              <div className="text-slate-400 text-xs shrink-0 flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{snap.publishedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
