"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Hash,
  Briefcase,
  Layers,
  Award,
  Camera,
  Mail,
  Copy,
  GitBranch,
  FileText,
  CornerDownLeft,
  FileStack,
} from "lucide-react";
import { CONTACT_EMAIL, certifications, experiences, gallery, projects } from "@/data/portfolio";
import { withBase } from "@/lib/utils";

type Item = {
  id: string;
  group: string;
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  href?: string;
  run?: () => void;
};

// Open from anywhere with: window.dispatchEvent(new Event("open-search"))
export const openSearch = () => window.dispatchEvent(new Event("open-search"));

const home = (hash: string) => `${withBase("/")}#${hash}`;

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items: Item[] = useMemo(
    () => [
      { id: "a-email", group: "Actions", title: "Email Charan", subtitle: CONTACT_EMAIL, icon: Mail, href: `mailto:${CONTACT_EMAIL}` },
      {
        id: "a-copy",
        group: "Actions",
        title: "Copy email address",
        subtitle: CONTACT_EMAIL,
        icon: Copy,
        run: () => {
          navigator.clipboard?.writeText(CONTACT_EMAIL).then(
            () => setToast("Email copied"),
            () => setToast(CONTACT_EMAIL)
          );
        },
      },
      { id: "a-github", group: "Actions", title: "Open GitHub", subtitle: "github.com/Charan-Venkatesh", icon: GitBranch, href: "https://github.com/Charan-Venkatesh" },
      { id: "a-resume", group: "Actions", title: "View resume", icon: FileText, href: home("resume") },

      ...[
        ["story", "My story"],
        ["experience", "Experience"],
        ["projects", "Selected work"],
        ["journey", "Career journey"],
        ["leadership", "Leadership & community"],
        ["gallery", "Photos"],
        ["certifications", "Certifications"],
        ["education", "Education"],
        ["resume", "Resume"],
      ].map(([id, title]) => ({ id: `s-${id}`, group: "Sections", title, icon: Hash, href: home(id) })),

      { id: "p-projects", group: "Pages", title: "All projects", subtitle: "Filterable case studies", icon: FileStack, href: withBase("/projects/") },
      { id: "p-journey", group: "Pages", title: "Journey page", icon: FileStack, href: withBase("/journey/") },
      { id: "p-about", group: "Pages", title: "About", icon: FileStack, href: withBase("/about/") },

      ...projects.map((p) => ({
        id: `pr-${p.id}`,
        group: "Projects",
        title: p.title,
        subtitle: [p.clientName || p.companyName, p.tags.join(" · ")].filter(Boolean).join(" — "),
        icon: Layers,
        href: withBase("/projects/"),
      })),
      ...experiences.map((e) => ({
        id: `ex-${e.id}`,
        group: "Experience",
        title: e.role,
        subtitle: `${e.company} · ${e.period ?? ""}`,
        icon: Briefcase,
        href: home("experience"),
      })),
      ...certifications.map((c) => ({
        id: `ce-${c.id}`,
        group: "Certifications",
        title: c.name,
        subtitle: c.issuer,
        icon: Award,
        href: home("certifications"),
      })),
      ...gallery.map((g, i) => ({
        id: `ph-${i}`,
        group: "Photos",
        title: g.caption,
        icon: Camera,
        href: home("gallery"),
      })),
    ],
    []
  );

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return items.filter((i) => i.group === "Actions" || i.group === "Sections");
    return items.filter((i) => {
      const hay = `${i.title} ${i.subtitle ?? ""} ${i.group}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [items, query]);

  // Global shortcuts: ⌘K / Ctrl+K toggles, "/" opens when not typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest?.("input, textarea, [contenteditable]");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-search", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 10);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const choose = (item: Item | undefined) => {
    if (!item) return;
    setOpen(false);
    if (item.run) return item.run();
    if (!item.href) return;
    if (item.href.startsWith("http")) window.open(item.href, "_blank", "noopener");
    else window.location.href = item.href;
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  let lastGroup = "";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh] bg-slate-900/30 backdrop-blur-sm animate-[fadeIn_.15s_ease]"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-label="Search"
            className="w-full max-w-xl overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-indigo-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 border-b border-slate-100">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search projects, skills, roles, photos…"
                className="w-full py-4 text-base bg-transparent outline-none placeholder:text-slate-400 text-slate-900"
              />
              <kbd className="hidden sm:inline-flex px-2 py-1 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-500">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[55vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <div className="px-4 py-10 text-center text-sm text-slate-500">
                  No results for &ldquo;{query}&rdquo;
                </div>
              )}
              {results.map((item, i) => {
                const Icon = item.icon;
                const header = item.group !== lastGroup;
                lastGroup = item.group;
                return (
                  <React.Fragment key={item.id}>
                    {header && (
                      <div className="px-3 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        {item.group}
                      </div>
                    )}
                    <button
                      data-index={i}
                      onMouseMove={() => setActive(i)}
                      onClick={() => choose(item)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition ${
                        i === active ? "bg-indigo-50" : ""
                      }`}
                    >
                      <span
                        className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${
                          i === active ? "bg-brand text-white" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-slate-900 truncate">{item.title}</span>
                        {item.subtitle && (
                          <span className="block text-xs text-slate-500 truncate">{item.subtitle}</span>
                        )}
                      </span>
                      {i === active && <CornerDownLeft className="w-4 h-4 text-indigo-400 shrink-0" />}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>

            <div className="hidden sm:flex items-center gap-4 px-5 py-3 border-t border-slate-100 bg-slate-50/70 text-[11px] text-slate-500">
              <span><kbd className="font-semibold">↑↓</kbd> navigate</span>
              <span><kbd className="font-semibold">↵</kbd> open</span>
              <span className="ml-auto"><kbd className="font-semibold">⌘K</kbd> toggle</span>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] px-4 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold shadow-xl animate-[fadeIn_.2s_ease]">
          {toast}
        </div>
      )}
    </>
  );
};
