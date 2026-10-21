"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal, Lock, Mail, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@charanvenkatesh.dev");
  const [password, setPassword] = useState("Admin#2026");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-panel p-8 rounded-2xl border border-slate-800 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-cyan-500/20 text-white">
            <Terminal className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-white">Command Center Login</h1>
          <p className="text-xs text-slate-400 mt-1">
            Authenticated Administration Portal for Charan Venkatesh Gorle
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Admin Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition shadow-md shadow-cyan-400/20 flex items-center justify-center space-x-2"
          >
            <span>{loading ? "Authenticating..." : "Access Command Center"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
          <a href="/" className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold">
            ← Return to Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
