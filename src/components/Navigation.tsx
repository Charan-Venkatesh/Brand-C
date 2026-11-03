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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/75 backdrop-blur-xl text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Identity */}
        <a href={withBase("/")} className="flex items-center gap-2.5 group" aria-label="Home">
          <BrandMark className="w-8 h-8 transition group-hover:scale-105" />
          <div className="leading-tight">
            <Wordmark className="text-lg text-slate-900" />
            <p className="text-[10px] text-slate-500 hidden lg:block tracking-wide">
              Cloud · DevOps · Observability
            </p>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-5 text-xs font-semibold text-slate-600">
          <a href="#story" className="hover:text-slate-900 transition">Story</a>
          <a href="#experience" className="hover:text-slate-900 transition">Experience</a>
          <a href={withBase("/projects")} className="hover:text-slate-900 transition">Projects</a>
          <a href={withBase("/journey")} className="hover:text-slate-900 transition">Journey</a>
          <a href="#leadership" className="hover:text-slate-900 transition">Leadership</a>
          <a href="#certifications" className="hover:text-slate-900 transition">Certifications</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2.5">
          {!IS_STATIC && (
<a
            href={withBase("/admin/dashboard")}
            className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
            title="Open Admin Portal"
          >
            <span>Admin</span>
          </a>
)}

          <button
            onClick={handleDownloadResume}
            disabled={downloading}
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 border border-slate-200/70 text-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? "Downloading..." : "Resume"}</span>
          </button>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center space-x-1.5 whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/15 transition"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Let&apos;s Connect</span>
          </button>
        </div>
      </div>
    </header>
  );
};
