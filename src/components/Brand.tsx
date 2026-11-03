import React from "react";

export const BRAND_TAGLINE = "Calm systems. Clear signals.";

// Logo mark: a "C" closing on a signal dot — observability as a brand.
export const BrandMark: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden>
    <defs>
      <linearGradient id="brand-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4f46e5" />
        <stop offset=".55" stopColor="#9333ea" />
        <stop offset="1" stopColor="#ec4899" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="9" fill="url(#brand-g)" />
    <path d="M21.5 11.2A7 7 0 1 0 21.5 20.8" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="23.4" cy="16" r="1.9" fill="#fff" />
  </svg>
);

export const Wordmark: React.FC<{ className?: string }> = ({ className = "" }) => (
  <span className={`font-black tracking-tight ${className}`}>
    charan<span className="text-gradient">.</span>
  </span>
);
