"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, ArrowRight, Activity, Workflow, Users } from "lucide-react";
import { HCCStore, ProfileData } from "@/lib/store";
import { withBase } from "@/lib/utils";
import { storyPortrait } from "@/data/portfolio";
import { BRAND_TAGLINE } from "@/components/Brand";

const principles = [
  {
    icon: Activity,
    title: "Observe everything",
    desc: "Traces, metrics and logs first — you can't fix what you can't see.",
  },
  {
    icon: Workflow,
    title: "Automate the toil",
    desc: "If it happens twice, it becomes a script, a pipeline or a check.",
  },
  {
    icon: Users,
    title: "Lead the room",
    desc: "Founded a club, ran workshops, and shipped for real users in the field.",
  },
];

export const MyStorySection: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    HCCStore.getOverview().then((data) => {
      if (data && data.profile) {
        setProfile(data.profile);
      }
    });
  }, []);

  const storyText =
    profile?.shortStory ||
    "I started with Computer Science and curiosity around AI, data, drones and software. Real-world engineering experiences took me from R&D and predictive maintenance to full-stack systems, operational workflows and enterprise AI-agent observability. Today I am focused on growing deeper in Cloud, DevOps, Infrastructure and SRE.";

  return (
    <section id="story" className="relative py-20 sm:py-28 border-b border-white/10 bg-slate-950 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Portrait */}
        <div className="md:col-span-5">
          <div className="relative max-w-sm mx-auto">
            <div aria-hidden className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-600/40 via-cyan-400/20 to-violet-500/40 blur-2xl" />
            <div className="relative rounded-[1.75rem] overflow-hidden border border-white/10 aspect-[4/5] bg-slate-900">
              <img
                src={withBase(`/${storyPortrait}`)}
                alt="Charan Venkatesh Gorle"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent">
                <div className="text-lg font-black text-white">Charan Venkatesh Gorle</div>
                <div className="text-xs text-slate-300">Cloud · DevOps · Observability · Hyderabad</div>
              </div>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="md:col-span-7">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-400 mb-4">
            <BookOpen className="w-4 h-4" />
            <span>My Story</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05] text-white">
            {BRAND_TAGLINE.split(". ")[0]}.{" "}
            <span className="text-gradient">{BRAND_TAGLINE.split(". ")[1]}</span>
          </h2>

          <p className="mt-3 text-base sm:text-lg font-semibold text-slate-300">
            {profile?.storyHeadline || "From curiosity and systems R&D to enterprise observability and cloud engineering."}
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">{storyText}</p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="spotlight-card p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-400/40 transition"
                >
                  <Icon className="w-5 h-5 text-sky-400 mb-2" />
                  <div className="text-sm font-bold text-white">{p.title}</div>
                  <div className="text-xs text-slate-400 mt-1 leading-relaxed">{p.desc}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href={withBase("/about")}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-white hover:text-sky-300 transition"
            >
              <span>Full background</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={withBase("/journey")}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-white transition"
            >
              <span>Career journey</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
