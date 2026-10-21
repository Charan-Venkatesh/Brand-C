"use client";

import React, { useState, useEffect } from "react";
import {
  Cloud,
  Terminal,
  Server,
  Zap,
  Activity,
  FileDown,
  Layers,
  MapPin,
  Mail,
  ArrowRight,
  User,
} from "lucide-react";
import { HCCStore, ProfileData } from "@/lib/store";

interface HeroSectionProps {
  onOpenContact: () => void;
  onSelectCategory?: (category: string) => void;
  selectedCategory?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    HCCStore.getOverview().then((data) => {
      if (data && data.profile) {
        setProfile(data.profile);
      }
    });
  }, []);

  const capabilities = [
    {
      label: "Cloud",
      desc: "Architecting reliable multi-region resources, managed storage, and scalable container environments.",
      icon: Cloud,
    },
    {
      label: "DevOps",
      desc: "Continuous integration, automated build pipelines, containerized deployments, and reproducible artifacts.",
      icon: Zap,
    },
    {
      label: "Infrastructure",
      desc: "Linux systems administration, networking fundamentals, storage provisioning, and secure configuration.",
      icon: Server,
    },
    {
      label: "Automation",
      desc: "Eliminating repetitive operational toil with Python, shell scripting, API hooks, and automated testing.",
      icon: Terminal,
    },
    {
      label: "Observability / AI Systems",
      desc: "Distributed tracing with OpenTelemetry, telemetry validation, dependency mapping, and log anomaly analysis.",
      icon: Activity,
    },
  ];

  const handleDownload = async () => {
    await HCCStore.downloadActiveResume();
    window.open("#resume", "_self");
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 border-b border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple & Credible Hero */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Candidate Identity Left */}
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>{profile?.currentLocation || "Hyderabad, India"}</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-bold">Open to Opportunities</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {profile?.fullName || "Charan Venkatesh Gorle"}
            </h1>

            <div className="text-lg sm:text-xl font-bold text-blue-600">
              {profile?.headline || "Cloud / DevOps / Infrastructure Engineer"}
            </div>

            <p className="text-sm font-semibold text-slate-600">
              {profile?.tagline || "Systems • Cloud • Automation • Observability"}
            </p>

            {/* Clear Primary CTAs */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={handleDownload}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition"
              >
                <FileDown className="w-4 h-4" />
                <span>View Resume</span>
              </button>

              <a
                href="#projects"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
              >
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Explore Work</span>
              </a>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
              >
                <Mail className="w-4 h-4" />
                <span>Let&apos;s Connect</span>
              </button>
            </div>
          </div>

          {/* Professional Photograph Right */}
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md bg-slate-100 flex items-center justify-center">
              {profile?.heroPhotoUrl || profile?.primaryPhotoUrl ? (
                <img
                  src={profile.heroPhotoUrl || profile.primaryPhotoUrl}
                  alt={profile.fullName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder avatar if image path is not yet uploaded
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : null}
              {/* Clean human monogram avatar fallback */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50 p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl mb-2">
                  CG
                </div>
                <div className="font-bold text-xs text-slate-800">Charan Venkatesh Gorle</div>
                <div className="text-[10px] text-slate-500">Cloud / DevOps / Systems</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 26: "WHAT I WORK ON" - 5 Compact Areas */}
        <div className="mt-14 pt-10 border-t border-slate-100">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            What I Work On
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/20 transition"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-2.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mb-1">{c.label}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
