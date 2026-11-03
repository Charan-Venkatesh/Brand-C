"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, Building, Layers, Calendar, ChevronRight, CheckCircle2 } from "lucide-react";
import { HCCStore, ExperienceItem } from "@/lib/store";

export const ExperienceTimeline: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);

  useEffect(() => {
    HCCStore.getOverview().then((data) => {
      if (data && data.experiences) {
        setExperiences(data.experiences);
      }
    });
  }, []);

  // Filter core professional spine experiences
  const coreExperiences = experiences.filter((e) => !e.category || e.category === "Professional");

  return (
    <section id="experience" className="py-14 border-b border-slate-200/70 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-1.5">
            <Briefcase className="w-4 h-4" />
            <span>Professional Spine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-[-0.03em]">
            Engineering & Systems Experience
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            A progression through industrial R&D, defense operational software, and enterprise AI-agent observability.
          </p>
        </div>

        {/* The 3 Core Pillars */}
        <div className="space-y-6">
          {coreExperiences.map((exp) => (
            <div
              key={exp.id}
              id={`exp-${exp.id}`}
              className="spotlight-card p-6 rounded-3xl bg-white border border-slate-200/70 hover:border-blue-300 shadow-[0_1px_2px_rgba(28,25,23,0.04),0_12px_32px_-16px_rgb(var(--glow)/0.18)] transition duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{exp.company}</h3>
                    {exp.isCurrentRole && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Present
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-blue-600 mt-0.5">{exp.role}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{exp.location}</div>
                </div>

                <button
                  onClick={() => setSelectedExp(selectedExp?.id === exp.id ? null : exp)}
                  className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-100 text-slate-600 transition self-start"
                >
                  <span>{selectedExp?.id === exp.id ? "Hide details" : "View details"}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition ${selectedExp?.id === exp.id ? "rotate-90" : ""}`} />
                </button>
              </div>

              {/* Story Overview */}
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                {exp.description}
              </p>

              {/* Bullets */}
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-xs text-slate-500">
                  {exp.responsibilities.slice(0, 3).map((r, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-blue-600 font-bold shrink-0 mt-0.5">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Linked Projects Section */}
              {exp.projects && exp.projects.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    <span>Associated Engineering Projects</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {exp.projects.map((p) => (
                      <div
                        key={p.id}
                        className="p-3 rounded-lg bg-slate-50/80 border border-slate-200/70 text-xs hover:bg-blue-50/60 transition"
                      >
                        <div className="font-bold text-slate-800 flex items-center justify-between">
                          <span>{p.title}</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                            {p.clientName || p.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{p.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expanded Context -> Worked On -> Contributed -> Learned */}
              {selectedExp?.id === exp.id && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-xs space-y-3 animate-in fade-in duration-200">
                  {exp.context && (
                    <div>
                      <span className="font-bold text-slate-800">Operational Context: </span>
                      <span className="text-slate-500">{exp.context}</span>
                    </div>
                  )}
                  {exp.whatIWorkedOn && (
                    <div>
                      <span className="font-bold text-slate-800">What I Worked On: </span>
                      <span className="text-slate-500">{exp.whatIWorkedOn}</span>
                    </div>
                  )}
                  {exp.whatIContributed && (
                    <div>
                      <span className="font-bold text-slate-800">What I Contributed: </span>
                      <span className="text-slate-500">{exp.whatIContributed}</span>
                    </div>
                  )}
                  {exp.whatILearned && (
                    <div>
                      <span className="font-bold text-slate-800">What I Learned: </span>
                      <span className="text-slate-500">{exp.whatILearned}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100">
                {exp.technologies?.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
