"use client";

import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { ContactModal } from "@/components/ContactModal";
import { Search, Layers, ExternalLink, Code2, Building, ShieldCheck, ArrowLeft } from "lucide-react";
import { HCCStore, ProjectItem } from "@/lib/store";
import { withBase } from "@/lib/utils";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    HCCStore.getProjects(false).then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const filters = [
    "All",
    "Professional",
    "Indian Navy / Defense",
    "R&D",
    "AI / ML",
    "Automation",
    "Cloud / Infrastructure",
    "Data / Analytics",
    "Social Impact",
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesFilter =
      selectedFilter === "All" ||
      p.category?.toLowerCase().includes(selectedFilter.toLowerCase()) ||
      p.projectType?.toLowerCase().includes(selectedFilter.toLowerCase());

    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technology.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navigation onOpenContact={() => setIsContactOpen(true)} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <a
          href={withBase("/")}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Command Center</span>
        </a>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">
              <Layers className="w-4 h-4" />
              <span>Full Portfolio</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Engineering Projects & Technical Case Studies
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-xl">
              All projects are queried directly from the backend database and represent verified technical implementations.
            </p>
          </div>

          {/* Live Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search tech, title, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-slate-400 focus:border-sky-400 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 pb-6 border-b border-white/10 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedFilter === f
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white/[0.06] text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading verified projects from backend...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 bg-white/[0.03] rounded-xl border border-white/10">
            No projects found matching filter &quot;{selectedFilter}&quot; or search query &quot;{searchQuery}&quot;.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="p-6 rounded-2xl bg-slate-950 border border-white/10 hover:border-sky-400/40 shadow-sm transition hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h2 className="text-base font-bold text-white">{p.title}</h2>
                      <div className="text-[11px] font-semibold text-sky-400 mt-0.5 flex items-center space-x-1.5">
                        {p.clientName && <span>{p.clientName}</span>}
                        {p.companyName && !p.clientName && <span>{p.companyName}</span>}
                        <span>•</span>
                        <span className="text-slate-400 font-normal">{p.category}</span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-white/[0.06] text-slate-300 border border-white/10 shrink-0">
                      {p.classification || "PUBLIC"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mt-2">{p.summary}</p>

                  <div className="mt-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs space-y-2">
                    {p.problem && (
                      <div>
                        <span className="font-semibold text-slate-100">Problem: </span>
                        <span className="text-slate-400">{p.problem}</span>
                      </div>
                    )}
                    {p.approach && (
                      <div>
                        <span className="font-semibold text-slate-100">Approach: </span>
                        <span className="text-slate-400">{p.approach}</span>
                      </div>
                    )}
                    {p.candidateContribution && (
                      <div>
                        <span className="font-semibold text-slate-100">Contribution: </span>
                        <span className="text-slate-400">{p.candidateContribution}</span>
                      </div>
                    )}
                    {p.outcome && (
                      <div>
                        <span className="font-semibold text-slate-100">Outcome: </span>
                        <span className="text-slate-400">{p.outcome}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <div className="text-[11px] text-slate-400 mb-2">
                    <span className="font-semibold text-slate-300">Technology: </span>
                    <span>{p.technology}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags?.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.06] text-slate-300 border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                        title="GitHub Repository"
                      >
                        <Code2 className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
