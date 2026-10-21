"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { MyStorySection } from "@/components/MyStorySection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectsMatrix } from "@/components/ProjectsMatrix";
import { CareerJourneySection } from "@/components/CareerJourneySection";
import { LeadershipCommunitySection } from "@/components/LeadershipCommunitySection";
import { CertificationsBadges } from "@/components/CertificationsBadges";
import { EducationSection } from "@/components/EducationSection";
import { ResumeViewer } from "@/components/ResumeViewer";
import { ContactModal } from "@/components/ContactModal";
import { Terminal, Mail, FileDown, ArrowUp, Compass, Cpu } from "lucide-react";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Header Navigation */}
      <Navigation onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Narrative Homepage Body */}
      <main className="flex-1">
        {/* 1. HERO + 3. WHAT I WORK ON */}
        <HeroSection onOpenContact={() => setIsContactOpen(true)} />

        {/* 2. MY STORY (100–150 words) */}
        <MyStorySection />

        {/* 4. PROFESSIONAL EXPERIENCE (The 3 Core Pillars) */}
        <ExperienceTimeline />

        {/* 5. SELECTED WORK (Top 3–4 Featured Projects) */}
        <ProjectsMatrix />

        {/* 6. CAREER JOURNEY */}
        <CareerJourneySection />

        {/* 7. LEADERSHIP & COMMUNITY */}
        <LeadershipCommunitySection />

        {/* 8. CERTIFICATIONS */}
        <CertificationsBadges />

        {/* 9. EDUCATION */}
        <EducationSection />

        {/* 10. CURRENT FOCUS BANNER */}
        <section className="py-12 bg-slate-900 text-white border-y border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700 text-blue-300 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Current Technical Focus</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Cloud • DevOps • Infrastructure • Observability • SRE
            </h2>
            <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
              Actively targeting engineering opportunities where systems administration experience, telemetry monitoring, and automation pipelines translate into high-reliability production infrastructure.
            </p>
          </div>
        </section>

        {/* 11. RESUME & CONTACT SECTION */}
        <ResumeViewer />
      </main>

      {/* Recruiter Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800">Charan Venkatesh Gorle</span>
            <span>•</span>
            <span>Hiring Command Center</span>
          </div>

          <div className="flex items-center space-x-4">
            <a href="/admin/login" className="hover:text-blue-600 transition">
              Admin Portal
            </a>
            <a href="/projects" className="hover:text-blue-600 transition">
              All Projects
            </a>
            <a href="/journey" className="hover:text-blue-600 transition">
              Journey
            </a>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
