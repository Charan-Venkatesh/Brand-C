"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { MapPin, GraduationCap, Terminal, ArrowLeft, Briefcase, Award } from "lucide-react";
import { withBase } from "@/lib/utils";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navigation onOpenContact={() => {}} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1">
        <a
          href={withBase("/")}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Command Center</span>
        </a>

        <div className="mb-8">
          <div className="text-xs text-sky-400 font-bold uppercase tracking-wider mb-1 flex items-center space-x-1.5">
            <Terminal className="w-4 h-4" />
            <span>Professional Background</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            About Charan Venkatesh Gorle
          </h1>
          <div className="text-xs text-slate-400 mt-1.5 flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>Hyderabad, India • Open to Hyderabad / India / Remote Roles</span>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed rounded-2xl border border-white/10 bg-slate-950 p-6 sm:p-10 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Who Am I?</h2>
            <p>
              I am a systems and infrastructure-focused technology professional building toward{" "}
              <strong className="text-white font-bold">Cloud Engineering, DevOps, SRE, Platform Engineering</strong>, and{" "}
              <strong className="text-white font-bold">Infrastructure Automation</strong> roles.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">My Engineering Story</h2>
            <p className="mb-3">
              I started with Computer Science and curiosity around AI, ML, data, drones, and software. University exploration led to technical workshops, student developer communities, and innovation programs like the Hult Prize.
            </p>
            <p className="mb-3">
              Real engineering exposure grew through <strong className="text-white font-bold">Efftronics Systems</strong> working on the Remote Diagnostics & Predictive Maintenance System (RDPMS), where I analyzed operational telemetry, performed anomaly validation, and built Power BI condition-monitoring dashboards for railway infrastructure.
            </p>
            <p className="mb-3">
              At <strong className="text-white font-bold">Meghana Technologies</strong>, the work evolved into full-stack and data systems for the Indian Navy, delivering the Integrated Flight Safety Monitoring System (IFSMS) for naval aviation squadron INS 324, physical file tracking for INS DEGA, and WhatsApp help desk automation for INS Circars.
            </p>
            <p>
              Currently at <strong className="text-white font-bold">JoulestoWatts Business Solutions (Client: Accenture)</strong>, my focus is centered around enterprise AI-agent workflows, OpenTelemetry distributed tracing, Neo4j runtime dependency mapping, failure investigation, and operational observability.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 flex items-center space-x-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </h3>
            <div className="text-base font-bold text-white">B.Tech in Computer Science & Systems Engineering</div>
            <div className="text-xs text-slate-400 mt-0.5">Andhra University • 2021 – 2025</div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Foundational coursework in computer systems, distributed computing, operating systems, networking fundamentals, and database architecture.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
