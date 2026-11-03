"use client";

import React, { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { CountUp, RoleTyper } from "@/components/SiteEffects";
import { HCCStore, ProfileData } from "@/lib/store";
import { profilePhoto } from "@/data/portfolio";
import { withBase } from "@/lib/utils";

interface HeroSectionProps {
  onOpenContact: () => void;
  onSelectCategory?: (category: string) => void;
  selectedCategory?: string;
}

const stats = [
  { value: 3, suffix: "", label: "Engineering roles" },
  { value: 5, suffix: "+", label: "Production systems" },
  { value: 3, suffix: "", label: "Naval bases served" },
  { value: 5, suffix: "", label: "Certifications" },
];

const stack = [
  "OpenTelemetry", "Neo4j", "Python", "Docker", "Linux", "CI/CD", "React",
  "FastAPI", "Power BI", "Azure", "Git", "SQL", "Shell", "Observability",
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [photoOk, setPhotoOk] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // The static HTML can fail to load the photo before React attaches onError.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setPhotoOk(false);
  }, []);

  useEffect(() => {
    HCCStore.getOverview().then((data) => {
      if (data && data.profile) {
        setProfile(data.profile);
      }
    });
  }, []);

  // Cursor-following spotlight over the hero background.
  const onPointerMove = (e: React.PointerEvent) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

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

  const photo = profile?.heroPhotoUrl || profile?.primaryPhotoUrl || withBase(`/${profilePhoto}`);

  return (
    <section
      ref={heroRef}
      onPointerMove={onPointerMove}
      className="hero relative overflow-hidden bg-slate-950 text-white"
    >
      {/* Background: aurora blobs, grid, cursor spotlight */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="hero-grid absolute inset-0" />
        <div className="hero-spotlight absolute inset-0" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* Identity */}
          <div className="md:col-span-7 lg:col-span-8 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-emerald-300 font-semibold">Open to opportunities</span>
              <span className="text-slate-600">•</span>
              <MapPin className="w-3.5 h-3.5" />
              <span>{profile?.currentLocation || "Hyderabad, India"}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02]">
              {profile?.fullName ? (
                profile.fullName
              ) : (
                <>
                  Charan Venkatesh
                  <br />
                  <span className="text-gradient">Gorle</span>
                </>
              )}
            </h1>

            <div className="text-lg sm:text-2xl font-semibold text-sky-300 min-h-[1.75rem] sm:min-h-[2.25rem]">
              {profile?.headline || (
                <RoleTyper
                  roles={[
                    "Cloud / DevOps / Infrastructure Engineer",
                    "Observability & OpenTelemetry",
                    "Linux • Docker • CI/CD",
                    "Python Automation",
                  ]}
                />
              )}
            </div>

            <p className="max-w-xl mx-auto md:mx-0 text-sm sm:text-base text-slate-400 leading-relaxed">
              I trace failures through distributed AI-agent systems, ship software for naval
              operations, and turn noisy telemetry into decisions. Now building toward
              production-grade Cloud, DevOps and SRE.
            </p>

            <div className="pt-1 flex flex-wrap justify-center md:justify-start gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-white text-slate-950 hover:bg-sky-100 shadow-lg shadow-sky-500/10 transition"
              >
                <Layers className="w-4 h-4" />
                <span>Explore Work</span>
              </a>
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 text-white shadow-lg shadow-blue-600/30 transition"
              >
                <Mail className="w-4 h-4" />
                <span>Let&apos;s Connect</span>
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/15 text-white transition"
              >
                <FileDown className="w-4 h-4" />
                <span>Resume</span>
              </button>
            </div>
          </div>

          {/* Photo */}
          <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end">
            <div className="photo-ring relative w-56 h-56 sm:w-72 sm:h-72 rounded-full p-[3px]">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
                {photoOk ? (
                  <img
                    ref={imgRef}
                    src={photo}
                    alt={profile?.fullName || "Charan Venkatesh Gorle"}
                    className="w-full h-full object-cover"
                    onError={() => setPhotoOk(false)}
                  />
                ) : (
                  <span className="text-6xl sm:text-7xl font-black text-gradient select-none">CG</span>
                )}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-[11px] font-semibold text-slate-200 backdrop-blur shadow-xl">
                Cloud · DevOps · SRE
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/10">
          {stats.map((s) => (
            <div key={s.label} className="bg-slate-950/80 backdrop-blur px-5 py-5 text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-black tracking-tight">
                <CountUp to={s.value} />
                <span className="text-sky-400">{s.suffix}</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* What I work on */}
        <div className="mt-16">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-5">
            What I Work On
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="spotlight-card p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-400/40 hover:-translate-y-1 transition duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-400/20 text-sky-300 flex items-center justify-center mb-3 ring-1 ring-white/10">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-white mb-1.5">{c.label}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tech marquee */}
      <div className="relative border-t border-white/10 py-5 overflow-hidden marquee-mask">
        <div className="marquee flex w-max gap-10 text-sm font-semibold text-slate-500">
          {[...stack, ...stack].map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              {t}
              <span className="text-sky-500/60">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
