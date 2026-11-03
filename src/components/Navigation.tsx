"use client";

import React, { useState } from "react";
import { Download, Mail } from "lucide-react";
import { IS_STATIC, HCCStore } from "@/lib/store";
import { withBase } from "@/lib/utils";
import { BrandMark, Wordmark } from "@/components/Brand";

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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Identity */}
        <a href={withBase("/")} className="flex items-center gap-2.5 group" aria-label="Home">
          <BrandMark className="w-8 h-8 transition group-hover:scale-105" />
          <div className="leading-tight">
            <Wordmark className="text-lg text-white" />
            <p className="text-[10px] text-slate-400 hidden lg:block tracking-wide">
              Cloud · DevOps · Observability
            </p>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-5 text-xs font-semibold text-slate-300">
          <a href="#story" className="hover:text-white transition">Story</a>
          <a href="#experience" className="hover:text-white transition">Experience</a>
          <a href={withBase("/projects")} className="hover:text-white transition">Projects</a>
          <a href={withBase("/journey")} className="hover:text-white transition">Journey</a>
          <a href="#leadership" className="hover:text-white transition">Leadership</a>
          <a href="#certifications" className="hover:text-white transition">Certifications</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2.5">
          {!IS_STATIC && (
<a
            href={withBase("/admin/dashboard")}
            className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition"
            title="Open Admin Portal"
          >
            <span>Admin</span>
          </a>
)}

          <button
            onClick={handleDownloadResume}
            disabled={downloading}
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? "Downloading..." : "Resume"}</span>
          </button>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center space-x-1.5 whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 text-white shadow-lg shadow-blue-600/30 transition"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Let&apos;s Connect</span>
          </button>
        </div>
      </div>
    </header>
  );
};
