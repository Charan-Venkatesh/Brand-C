"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Cloud,
  Terminal,
  Server,
  Zap,
  Activity,
  FileDown,
  ArrowRight,
  MapPin,
  Mail,
  Anchor,
  Trophy,
  MessageCircle,
  Phone,
} from "lucide-react";
import { CountUp, RoleTyper } from "@/components/SiteEffects";
import { Globe3D } from "@/components/Globe3D";
import { HCCStore, ProfileData } from "@/lib/store";
import { CONTACT_PHONE, LINKEDIN_URL, profilePhoto } from "@/data/portfolio";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { LinkedInMark } from "@/components/ContactSection";
import { withBase } from "@/lib/utils";

interface HeroSectionProps {
  onOpenContact: () => void;
  onSelectCategory?: (category: string) => void;
  selectedCategory?: string;
}

const stats = [
  { value: 3, suffix: "", label: "Engineering roles", tint: "from-blue-50 to-white text-blue-700" },
  { value: 5, suffix: "+", label: "Production systems", tint: "from-blue-50 to-white text-blue-700" },
  { value: 3, suffix: "", label: "Naval bases served", tint: "from-blue-50 to-white text-blue-700" },
  { value: 5, suffix: "", label: "Certifications", tint: "from-blue-50 to-white text-blue-700" },
];

const stack = [
  "OpenTelemetry", "Neo4j", "Python", "Docker", "Linux", "CI/CD", "React",
  "FastAPI", "Power BI", "Azure", "Git", "SQL", "Shell", "Observability",
];

const orgs = ["Accenture", "Indian Navy", "Efftronics Systems", "Andhra University", "Google DSC", "Hult Prize"];

const capabilities = [
  {
    label: "Cloud",
    desc: "Architecting reliable multi-region resources, managed storage, and scalable container environments.",
    icon: Cloud,
    tint: "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-600/25",
  },
  {
    label: "DevOps",
    desc: "Continuous integration, automated build pipelines, containerized deployments, and reproducible artifacts.",
    icon: Zap,
    tint: "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-600/25",
  },
  {
    label: "Infrastructure",
    desc: "Linux systems administration, networking fundamentals, storage provisioning, and secure configuration.",
    icon: Server,
    tint: "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-600/25",
  },
  {
    label: "Automation",
    desc: "Eliminating repetitive operational toil with Python, shell scripting, API hooks, and automated testing.",
    icon: Terminal,
    tint: "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-600/25",
  },
  {
    label: "Observability / AI Systems",
    desc: "Distributed tracing with OpenTelemetry, telemetry validation, dependency mapping, and log anomaly analysis.",
    icon: Activity,
    tint: "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-600/25",
  },
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

  const handleDownload = async () => {
    await HCCStore.downloadActiveResume();
    window.open("#resume", "_self");
  };

  const photo = profile?.heroPhotoUrl || profile?.primaryPhotoUrl || withBase(`/${profilePhoto}`);

  return (
    <section
      ref={heroRef}
      onPointerMove={onPointerMove}
      className="hero relative overflow-hidden bg-[var(--background)] text-slate-900"
    >
      {/* Background: pastel glows, dot grid, cursor spotlight */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="dot-grid absolute inset-0" />
        <span className="orb-glass orb float-slower hidden lg:block w-20 h-20 top-24 left-[46%]" />
        <div className="hero-spotlight absolute inset-0" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Identity */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full bg-white/80 border border-slate-200/80 shadow-sm text-xs font-medium text-slate-600 backdrop-blur">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Open to work
              </span>
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{profile?.currentLocation || "Hyderabad, India"}</span>
            </div>

            <h1 className="text-[2.75rem] sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.98] text-slate-900">
              {profile?.fullName ? (
                profile.fullName
              ) : (
                <>
                  Charan Venkatesh <span className="text-gradient">Gorle</span>
                </>
              )}
            </h1>

            <div className="text-lg sm:text-2xl font-bold text-blue-600 min-h-[1.75rem] sm:min-h-[2.25rem]">
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

            <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-slate-600 leading-relaxed">
              I trace failures through distributed AI-agent systems, ship software for naval
              operations, and turn noisy telemetry into decisions — now building toward
              production-grade <span className="font-semibold text-slate-900">Cloud, DevOps and SRE</span>.
            </p>

            <div className="pt-1 flex flex-wrap justify-center lg:justify-start gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/15 transition"
              >
                <span>See my work</span>
                <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
              </a>
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold bg-brand text-white shadow-xl shadow-sky-500/25 hover:brightness-110 transition"
              >
                <Mail className="w-4 h-4" />
                <span>Let&apos;s talk</span>
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-sm transition"
              >
                <FileDown className="w-4 h-4" />
                <span>Resume</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm">
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/80 transition">
                <LinkedInMark className="w-4 h-4 text-[#0a66c2]" /> LinkedIn
              </a>
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/80 transition">
                <MessageCircle className="w-4 h-4 text-emerald-600" /> WhatsApp
              </a>
              <a href={telUrl} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/80 transition">
                <Phone className="w-4 h-4 text-blue-600" /> {CONTACT_PHONE}
              </a>
            </div>
          </div>

          {/* Photo card with floating highlights */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-[78%] max-w-[360px] sm:w-80 lg:w-[360px]">
              {/* 3D art behind the photo: network globe + glossy spheres */}
              <Globe3D className="absolute -inset-[38%] w-[176%] h-[176%] -z-0 pointer-events-none opacity-90" />
              <span aria-hidden className="orb float-slower w-24 h-24 sm:w-28 sm:h-28 -top-10 -right-8 sm:-right-14" />
              <span aria-hidden className="orb-glass orb float-slow w-14 h-14 -bottom-8 right-4" />
              <span aria-hidden className="orb float-slow w-8 h-8 top-[72%] -left-10 sm:-left-14" />
              <div className="relative photo-ring rounded-[2rem] p-[3px] shadow-2xl shadow-blue-600/25">
                <div className="relative aspect-[4/5] rounded-[1.85rem] overflow-hidden bg-gradient-to-br from-blue-100 to-sky-100 flex items-center justify-center">
                  {photoOk ? (
                    <img
                      ref={imgRef}
                      src={photo}
                      alt={profile?.fullName || "Charan Venkatesh Gorle"}
                      className="w-full h-full object-cover object-center"
                      onError={() => setPhotoOk(false)}
                    />
                  ) : (
                    <span className="text-7xl font-black text-gradient select-none">CG</span>
                  )}
                </div>
              </div>

              {/* Floating chips */}
              <div className="float-slow absolute -left-6 sm:-left-12 top-8 flex items-center gap-2.5 pl-2 pr-3.5 py-2 rounded-2xl bg-white/95 border border-slate-200/80 shadow-xl shadow-blue-500/10 backdrop-blur">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </span>
                <div className="text-left leading-tight">
                  <div className="text-[11px] text-slate-500">Now tracing</div>
                  <div className="text-xs font-bold text-slate-900">OpenTelemetry · Neo4j</div>
                </div>
              </div>
              <div className="float-slower absolute -right-3 sm:-right-6 top-[66%] flex items-center gap-2.5 pl-2 pr-3.5 py-2 rounded-2xl bg-white/95 border border-slate-200/80 shadow-xl shadow-blue-500/10 backdrop-blur">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Anchor className="w-4 h-4" />
                </span>
                <div className="text-left leading-tight">
                  <div className="text-[11px] text-slate-500">Shipped for</div>
                  <div className="text-xs font-bold text-slate-900">Indian Navy</div>
                </div>
              </div>
              <div className="float-slow absolute -left-3 sm:-left-8 -bottom-5 flex items-center gap-2.5 pl-2 pr-3.5 py-2 rounded-2xl bg-white/95 border border-slate-200/80 shadow-xl shadow-blue-500/10 backdrop-blur">
                <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                  <Trophy className="w-4 h-4" />
                </span>
                <div className="text-left leading-tight">
                  <div className="text-[11px] text-slate-500">Campus finalist</div>
                  <div className="text-xs font-bold text-slate-900">Hult Prize</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`rounded-3xl bg-gradient-to-br ${s.tint} border border-slate-200/70 px-5 py-5 shadow-sm`}
            >
              <div className="text-4xl sm:text-5xl font-black tracking-tight">
                <CountUp to={s.value} />
                {s.suffix}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Organizations */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div className="shrink-0 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Built for &amp; with
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm sm:text-base font-black tracking-tight text-slate-400">
            {orgs.map((o) => (
              <span key={o} className="hover:text-slate-900 transition">{o}</span>
            ))}
          </div>
        </div>

        {/* What I work on */}
        <div className="mt-16">
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">What I work on</div>
              <div className="mt-1 text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                Five disciplines, one goal: <span className="text-gradient">reliability</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {capabilities.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.label}
                  className="spotlight-card card-soft p-5 rounded-3xl hover:-translate-y-1 transition duration-300"
                >
                  <div className={`w-10 h-10 rounded-2xl ${c.tint} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mb-1.5">{c.label}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tech marquee */}
      <div className="relative border-y border-slate-200/70 bg-white/60 py-5 overflow-hidden marquee-mask">
        <div className="marquee flex w-max gap-10 text-sm font-semibold text-slate-400">
          {[...stack, ...stack].map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              {t}
              <span className="text-sky-400">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
