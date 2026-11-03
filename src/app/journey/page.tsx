"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { CareerJourneySection } from "@/components/CareerJourneySection";
import { ArrowLeft, ExternalLink, ShieldCheck, Terminal, Award } from "lucide-react";
import { withBase } from "@/lib/utils";

export default function JourneyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navigation onOpenContact={() => {}} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <a
          href={withBase("/")}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Command Center</span>
        </a>

        <div className="mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">
            Career Story & Milestones
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Professional Evolution & Engineering Journey
          </h1>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed max-w-2xl">
            A transparent walkthrough of real engineering progression—from university systems fundamentals and drone experimentation to mission-critical naval software and enterprise AI observability.
          </p>
        </div>

        <CareerJourneySection />

        <div className="mt-12 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <h3 className="font-bold text-sm text-white mb-2">Looking Ahead</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            With solid foundations in Linux, systems engineering, telemetry monitoring, and automation pipelines, I am directing my technical energy into Cloud Engineering, DevOps, Platform Architecture, and SRE. I look forward to contributing to high-reliability production engineering teams.
          </p>
          <div className="mt-4">
            <a
              href={withBase("/contact")}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
            >
              <span>Connect Regarding Opportunities</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
