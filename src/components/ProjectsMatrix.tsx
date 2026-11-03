"use client";

import React, { useState, useEffect } from "react";
import { Layers, ArrowRight, Building, Shield, ExternalLink, Code2 } from "lucide-react";
import { HCCStore, ProjectItem } from "@/lib/store";
import { withBase } from "@/lib/utils";

interface ProjectsMatrixProps {
  selectedCategory?: string;
}

export const ProjectsMatrix: React.FC<ProjectsMatrixProps> = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedProj, setSelectedProj] = useState<ProjectItem | null>(null);

  useEffect(() => {
    HCCStore.getOverview().then((data) => {
      if (data && data.projects) {
        // Only 3-4 strongest featured projects on homepage per Section 18
        const featured = data.projects.filter((p: ProjectItem) => p.isFeatured).slice(0, 4);
        setProjects(featured);
      }
    });
  }, []);

  return (
    <section id="projects" className="py-14 border-b border-white/10 bg-slate-900/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-sky-400 mb-1.5">
              <Layers className="w-4 h-4" />
              <span>Selected Work</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Featured Engineering Evidence
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Curated case studies highlighting real architectural problem solving, defense deployments, and telemetry pipelines.
            </p>
          </div>

          <a
            href={withBase("/projects")}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-slate-950 hover:bg-white/10 text-slate-100 border border-white/10 shadow-sm transition"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3-4 Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="spotlight-card p-6 rounded-2xl bg-slate-950 border border-white/10 hover:border-sky-400/40 shadow-sm transition duration-300 hover:shadow-xl hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {proj.title}
                    </h3>
                    <div className="text-[11px] font-semibold text-sky-400 mt-0.5 flex items-center space-x-1.5">
                      {proj.clientName && <span>{proj.clientName}</span>}
                      {proj.companyName && !proj.clientName && <span>{proj.companyName}</span>}
                      <span>•</span>
                      <span className="text-slate-400 font-normal">{proj.category}</span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-white/[0.06] text-slate-300 border border-white/10 shrink-0">
                    {proj.classification || "PUBLIC"}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                  {proj.summary}
                </p>

                {/* The Technical Challenge & Approach */}
                <div className="mt-4 p-3 rounded-lg bg-white/[0.03] border border-white/10 text-xs space-y-2">
                  <div>
                    <span className="font-semibold text-slate-100">The Problem: </span>
                    <span className="text-slate-400">{proj.problem}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-100">Approach: </span>
                    <span className="text-slate-400">{proj.approach}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5">
                <div className="text-[11px] text-slate-400 mb-2">
                  <span className="font-semibold text-slate-300">Tech: </span>
                  <span>{proj.technology}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {proj.tags?.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.06] text-slate-300 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
