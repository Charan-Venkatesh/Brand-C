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
    <div className="min-h-screen bg-white text-white flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
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

        {/* 10. BRAND CTA */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-6xl mx-auto overflow-hidden rounded-[2.5rem] bg-brand px-6 py-16 sm:px-16 sm:py-24 text-center text-white shadow-2xl shadow-violet-500/30">
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-amber-300/30 blur-3xl" />
              <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
            </div>
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-xs font-semibold backdrop-blur">
                <Compass className="w-3.5 h-3.5" />
                <span>Current focus · Cloud · DevOps · SRE</span>
              </div>
              <h2 className="mt-6 text-4xl sm:text-6xl font-black tracking-[-0.03em] leading-[1.02]">
                Let&apos;s build systems
                <br />
                that stay up.
              </h2>
              <p className="mt-5 text-sm sm:text-base text-white/85 max-w-xl mx-auto leading-relaxed">
                Actively targeting engineering opportunities where systems administration experience, telemetry monitoring, and automation pipelines translate into high-reliability production infrastructure.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-xl shadow-black/10 transition"
                >
                  <Mail className="w-4 h-4" />
                  <span>Start a conversation</span>
                </button>
                <a
                  href="#resume"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/30 text-white backdrop-blur transition"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Read the resume</span>
                </a>
              </div>
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
      <footer className="border-t border-slate-200/70 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <BrandMark className="w-10 h-10" />
              <Wordmark className="text-3xl text-slate-900" />
            </div>
            <p className="mt-4 text-lg font-semibold text-slate-700">{BRAND_TAGLINE}</p>
            <p className="mt-1 text-sm text-slate-500">
              Charan Venkatesh Gorle · Cloud, DevOps & Observability Engineer · Hyderabad, India
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">Explore</div>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#story" className="hover:text-slate-900 transition">Story</a></li>
              <li><a href="#experience" className="hover:text-slate-900 transition">Experience</a></li>
              <li><a href={withBase("/projects")} className="hover:text-slate-900 transition">All projects</a></li>
              <li><a href={withBase("/journey")} className="hover:text-slate-900 transition">Journey</a></li>
              {!IS_STATIC && (
                <li><a href={withBase("/admin/login")} className="hover:text-slate-900 transition">Admin</a></li>
              )}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">Connect</div>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href={`mailto:${CONTACT_EMAIL}`} title={CONTACT_EMAIL} className="hover:text-slate-900 transition">Email</a></li>
              <li><a href="https://github.com/Charan-Venkatesh" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition">GitHub</a></li>
              <li><button onClick={() => setIsContactOpen(true)} className="hover:text-slate-900 transition">Contact form</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between text-xs text-slate-500">
            <span>© {new Date().getFullYear()} Charan Venkatesh Gorle</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200/70 hover:bg-slate-50 text-slate-600 transition"
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
