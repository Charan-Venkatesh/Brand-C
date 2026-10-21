"use client";

import React, { useState } from "react";
import { Download, Mail, Terminal, ExternalLink } from "lucide-react";
import { HCCStore } from "@/lib/store";

interface NavigationProps {
  onOpenContact: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenContact }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadResume = async () => {
    setDownloading(true);
    await HCCStore.downloadActiveResume();
    setTimeout(() => {
      setDownloading(false);
      window.open("#resume", "_self");
    }, 400);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Identity */}
        <a href="/" className="flex items-center space-x-3 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white shadow-sm group-hover:bg-blue-700 transition">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm tracking-tight text-slate-900">
                Charan Venkatesh Gorle
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                Hiring Command Center
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Cloud • DevOps • Infrastructure • Observability
            </p>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-5 text-xs font-semibold text-slate-600">
          <a href="#story" className="hover:text-blue-600 transition">Story</a>
          <a href="#experience" className="hover:text-blue-600 transition">Experience</a>
          <a href="/projects" className="hover:text-blue-600 transition">Projects</a>
          <a href="/journey" className="hover:text-blue-600 transition">Journey</a>
          <a href="#leadership" className="hover:text-blue-600 transition">Leadership</a>
          <a href="#certifications" className="hover:text-blue-600 transition">Certifications</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2.5">
          <a
            href="/admin/dashboard"
            className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            title="Open Admin Portal"
          >
            <span>Admin</span>
          </a>

          <button
            onClick={handleDownloadResume}
            disabled={downloading}
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? "Downloading..." : "Resume"}</span>
          </button>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Let&apos;s Connect</span>
          </button>
        </div>
      </div>
    </header>
  );
};
