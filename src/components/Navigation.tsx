"use client";

import React, { useEffect, useState } from "react";
import { Mail, Menu, Search, X } from "lucide-react";
import { IS_STATIC } from "@/lib/store";
import { withBase } from "@/lib/utils";
import { BrandMark, Wordmark } from "@/components/Brand";
import { openSearch } from "@/components/CommandPalette";

interface NavigationProps {
  onOpenContact: () => void;
}

const links = [
  { id: "story", label: "Story" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "leadership", label: "Leadership" },
  { id: "gallery", label: "Photos" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

const home = (hash: string) => `${withBase("/")}#${hash}`;

export const Navigation: React.FC<NavigationProps> = ({ onOpenContact }) => {
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);

  // Highlight the section currently in view (sections may render after data loads).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    const watch = () =>
      links.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && !el.dataset.spy) {
          el.dataset.spy = "1";
          observer.observe(el);
        }
      });
    watch();
    const mutations = new MutationObserver(watch);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/75 backdrop-blur-xl text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <a href={withBase("/")} className="flex items-center gap-2.5 group shrink-0" aria-label="Home">
          <BrandMark className="w-8 h-8 transition group-hover:scale-105" />
          <div className="leading-tight">
            <Wordmark className="text-lg text-slate-900" />
            <p className="text-[10px] text-slate-500 hidden xl:block tracking-wide">
              Cloud · DevOps · Observability
            </p>
          </div>
        </a>

        {/* Section links with active indicator */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100/70 border border-slate-200/70">
          {links.map((l) => (
            <a
              key={l.id}
              href={home(l.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                active === l.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {!IS_STATIC && (
            <a
              href={withBase("/admin/dashboard")}
              className="hidden sm:inline-flex px-2.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
            >
              Admin
            </a>
          )}

          <button
            onClick={openSearch}
            className="group inline-flex items-center gap-2 h-9 pl-3 pr-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-slate-900 shadow-sm transition"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-medium">Search</span>
            <kbd className="hidden sm:inline-flex px-1.5 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          </button>

          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-1.5 whitespace-nowrap h-9 px-4 rounded-full text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/15 transition"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Let&apos;s talk</span>
          </button>

          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-900 text-white"
            aria-label="Open menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>

    </header>

      {/* Mobile menu (outside the header: its backdrop-filter would trap a fixed overlay) */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl animate-[fadeIn_.2s_ease]">
          <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="aurora aurora-1" />
            <div className="aurora aurora-2" />
          </div>
          <div className="relative h-16 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <BrandMark className="w-8 h-8" />
              <Wordmark className="text-lg text-slate-900" />
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-slate-900"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <nav className="relative px-6 pt-6 flex flex-col">
            {links.map((l, i) => (
              <a
                key={l.id}
                href={home(l.id)}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-4 py-3 border-b border-slate-200/70 text-3xl font-black tracking-tight text-slate-900"
              >
                <span className="text-xs font-bold text-blue-500 w-6">{String(i + 1).padStart(2, "0")}</span>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="relative px-6 pt-8 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setMenuOpen(false);
                openSearch();
              }}
              className="inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-white border border-slate-200 text-sm font-semibold text-slate-700 shadow-sm"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenContact();
              }}
              className="inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-brand text-sm font-bold text-white shadow-lg shadow-sky-500/25"
            >
              <Mail className="w-4 h-4" />
              Let&apos;s talk
            </button>
          </div>
        </div>
      )}
    </>
  );
};
