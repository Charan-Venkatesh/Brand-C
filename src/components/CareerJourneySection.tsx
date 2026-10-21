"use client";

import React, { useState } from "react";
import { Milestone, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

export const CareerJourneySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      title: "Computer Science Foundation",
      subtitle: "Andhra University (2021–2025)",
      desc: "Coursework in distributed computing, computer systems, operating systems, data structures, and computer networks.",
      tag: "Foundation",
    },
    {
      title: "AI / Data / Drones Exploration",
      subtitle: "Hackathons & Student Communities",
      desc: "Conducted university technical workshops on 'Drones — Innovation and Applications', GDSC core leadership, and Hult Prize Bugginess concept.",
      tag: "Curiosity & Prototyping",
    },
    {
      title: "Efftronics Systems R&D",
      subtitle: "December 2024 – June 2025",
      desc: "Research & Development Trainee working on RDPMS (Remote Diagnostics & Predictive Maintenance System), sensor validation, anomaly analysis, and Power BI dashboards.",
      tag: "Industrial R&D",
    },
    {
      title: "Meghana Technologies",
      subtitle: "June 2025 – December 2025",
      desc: "System and Data Engineer designing full-stack software and database architectures for naval operational systems across Indian Navy base stations.",
      tag: "Systems Engineering",
    },
    {
      title: "Indian Navy Defense Projects",
      subtitle: "INS 324, INS DEGA, INS Circars",
      desc: "Delivered Integrated Flight Safety Monitoring System (IFSMS), Logistics File Status Management, and automated WhatsApp service desk routing.",
      tag: "High-Reliability Defense",
    },
    {
      title: "Accenture / JoulestoWatts",
      subtitle: "Current Professional Focus",
      desc: "Engineering enterprise AI-agent operations, OpenTelemetry distributed tracing, Neo4j dependency mapping, failure investigation, and root-cause analysis.",
      tag: "Enterprise Observability",
    },
    {
      title: "Current Direction: Cloud / DevOps / SRE",
      subtitle: "Platform & Infrastructure Engineering",
      desc: "Deepening focus in cloud-native infrastructure, automated CI/CD pipelines, container orchestration, systems resilience, and production reliability.",
      tag: "Current Focus",
    },
  ];

  return (
    <section id="journey" className="py-14 border-b border-slate-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5">
            <Milestone className="w-4 h-4" />
            <span>Visual Career Progression</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            The Professional Journey
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            From academic curiosity and drone innovation to naval defense systems, enterprise observability, and cloud infrastructure.
          </p>
        </div>

        {/* Stepper Flow */}
        <div className="relative border-l-2 border-blue-200 ml-4 sm:ml-8 space-y-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative pl-6 sm:pl-8 group cursor-pointer"
              onClick={() => setActiveStep(activeStep === idx ? null : idx)}
            >
              {/* Stepper Dot */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center group-hover:scale-125 transition">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                    <span>{step.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">
                      {step.tag}
                    </span>
                  </h3>
                  <span className="text-[11px] font-medium text-slate-500">{step.subtitle}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/journey"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
          >
            <span>Explore comprehensive narrative on the dedicated Journey page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
