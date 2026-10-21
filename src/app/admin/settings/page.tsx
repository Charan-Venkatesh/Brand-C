"use client";

import React, { useState, useEffect } from "react";
import { Settings, Shield, Database, Server, CheckCircle2 } from "lucide-react";

export default function AdminSettings() {
  const [apiStatus, setApiStatus] = useState("Checking...");

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((r) => r.ok && r.json())
      .then((data) => setApiStatus(`Connected (${data.service} - ${data.status})`))
      .catch(() => setApiStatus("Offline (Using local fallback)"));
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            System & Security Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Database connection status, security controls, and infrastructure configurations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold mb-2">
            <Server className="w-4 h-4" />
            <span>Backend .NET 8 API</span>
          </div>
          <p className="text-slate-300 font-medium">{apiStatus}</p>
          <div className="text-[11px] text-slate-500 mt-1">Endpoint: http://localhost:5000</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold mb-2">
            <Database className="w-4 h-4" />
            <span>Persistence Tier</span>
          </div>
          <p className="text-slate-300 font-medium">SQLite (Local) / PostgreSQL Ready</p>
          <div className="text-[11px] text-slate-500 mt-1">EF Core 8 with Soft-Delete & Indexing</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center space-x-2 text-sky-400 font-bold mb-2">
            <Shield className="w-4 h-4" />
            <span>Security & Auth</span>
          </div>
          <p className="text-slate-300 font-medium">JWT Sessions / Rate-Limiting</p>
          <div className="text-[11px] text-slate-500 mt-1">Protected Admin Portal Routes</div>
        </div>
      </div>
    </div>
  );
}
