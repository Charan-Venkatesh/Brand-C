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
import { BrandMark, Wordmark, BRAND_TAGLINE } from "@/components/Brand";
import { CONTACT_EMAIL } from "@/data/portfolio";
import { PhotoGallery } from "@/components/PhotoGallery";
import { ResumeViewer } from "@/components/ResumeViewer";
import { ContactModal } from "@/components/ContactModal";
import { Mail, FileDown, ArrowUp, Compass } from "lucide-react";
import { withBase } from "@/lib/utils";
import { IS_STATIC } from "@/lib/store";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
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

        {/* Photos */}
        <PhotoGallery />

        {/* 8. CERTIFICATIONS */}
        <CertificationsBadges />

        {/* 9. EDUCATION */}
        <EducationSection />

        {/* 10. BRAND CTA BAND */}
        <section className="relative overflow-hidden py-20 sm:py-28 bg-slate-950 border-y border-white/10">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="aurora aurora-1" style={{ top: -260, left: "10%", opacity: 0.35 }} />
            <div className="aurora aurora-3" style={{ bottom: -260, opacity: 0.3 }} />
            <div className="hero-grid absolute inset-0" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sky-300 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Current focus · Cloud · DevOps · SRE</span>
            </div>
            <h2 className="mt-6 text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] text-white">
              Let&apos;s build systems
              <br />
              <span className="text-gradient">that stay up.</span>
            </h2>
            <p className="mt-5 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
              Actively targeting engineering opportunities where systems administration experience, telemetry monitoring, and automation pipelines translate into high-reliability production infrastructure.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setIsContactOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 text-white shadow-lg shadow-blue-600/30 transition"
              >
                <Mail className="w-4 h-4" />
                <span>Start a conversation</span>
              </button>
              <a
                href="#resume"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/15 text-white transition"
              >
                <FileDown className="w-4 h-4" />
                <span>Read the resume</span>
              </a>
            </div>
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
      <footer className="border-t border-white/10 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <BrandMark className="w-10 h-10" />
              <Wordmark className="text-3xl text-white" />
            </div>
            <p className="mt-4 text-lg font-semibold text-slate-200">{BRAND_TAGLINE}</p>
            <p className="mt-1 text-sm text-slate-500">
              Charan Venkatesh Gorle · Cloud, DevOps & Observability Engineer · Hyderabad, India
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">Explore</div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#story" className="hover:text-white transition">Story</a></li>
              <li><a href="#experience" className="hover:text-white transition">Experience</a></li>
              <li><a href={withBase("/projects")} className="hover:text-white transition">All projects</a></li>
              <li><a href={withBase("/journey")} className="hover:text-white transition">Journey</a></li>
              {!IS_STATIC && (
                <li><a href={withBase("/admin/login")} className="hover:text-white transition">Admin</a></li>
              )}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">Connect</div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href={`mailto:${CONTACT_EMAIL}`} title={CONTACT_EMAIL} className="hover:text-white transition">Email</a></li>
              <li><a href="https://github.com/Charan-Venkatesh" target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub</a></li>
              <li><button onClick={() => setIsContactOpen(true)} className="hover:text-white transition">Contact form</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between text-xs text-slate-500">
            <span>© {new Date().getFullYear()} Charan Venkatesh Gorle</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
