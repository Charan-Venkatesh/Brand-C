"use client";

import React from "react";
import { Users, Award, Radio, Lightbulb, Trophy } from "lucide-react";
import { leadershipPhotos } from "@/data/portfolio";
import { withBase } from "@/lib/utils";

export const LeadershipCommunitySection: React.FC = () => {
  const leadershipItems = [
    {
      title: "Hult Prize Global Challenge",
      role: "Top 3 / Campus Finalist",
      period: "2023",
      desc: "Presented project Bugginess—an autonomous drone-based agricultural pest monitoring and targeted precision spraying concept for sustainable farming.",
      icon: Trophy,
    },
    {
      title: "Vedic Science & Culture Club",
      role: "Founder & President",
      period: "March 2024 – April 2025",
      desc: "Founded student organization coordinating weekly seminars, speaker sessions, leadership workshops, and personal development initiatives for 100+ members.",
      icon: Lightbulb,
    },
    {
      title: "CrossRoads with Shazin Hijazy",
      role: "Technical Support Lead",
      period: "June 2024 – June 2025",
      desc: "Led live streaming coordination, AV broadcast pipelines, and technical troubleshooting for professional digital media sessions.",
      icon: Radio,
    },
    {
      title: "Google Developer Student Club (GDSC)",
      role: "Core Member & Workshop Facilitator",
      period: "2023 – 2025",
      desc: "Delivered flagship technical workshop on 'Drones — Exploring Innovation and Applications'. Mentored student engineers in Git, Python, and IoT systems.",
      icon: Users,
    },
    {
      title: "Smart India Hackathon 2024",
      role: "Campus-Level Winning Team",
      period: "2024",
      desc: "Selected as campus-level winning team for rapid software prototyping and engineering problem solving under competitive hackathon timelines.",
      icon: Award,
    },
  ];

  const featured = leadershipItems.filter((i) => leadershipPhotos[i.title]);
  const rest = leadershipItems.filter((i) => !leadershipPhotos[i.title]);

  return (
    <section id="leadership" className="py-20 sm:py-24 border-b border-slate-200/70 bg-gradient-to-b from-sky-50/50 to-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-2">
            <Users className="w-4 h-4" />
            <span>Community & Initiatives</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-[-0.03em]">
            Beyond the job title
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500">
            Founding communities, competing on global stages, and running the tech behind live events.
          </p>
        </div>

        {/* Photo-led featured initiatives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="spotlight-card group rounded-3xl overflow-hidden bg-white border border-slate-200/70 hover:border-sky-300 transition duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={withBase(`/${leadershipPhotos[item.title]}`)}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/70 border border-slate-200 backdrop-blur text-[11px] font-semibold text-white">
                    <Icon className="w-3.5 h-3.5 text-blue-600" />
                    {item.role}
                  </span>
                </div>
                <div className="p-5 -mt-6 relative">
                  <div className="text-[11px] font-semibold text-slate-500">{item.period}</div>
                  <h3 className="mt-1 font-bold text-base text-slate-900 leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-2">{item.desc}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Remaining initiatives */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {rest.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="spotlight-card flex gap-4 p-5 rounded-3xl bg-white border border-slate-200/70 hover:border-sky-300 transition"
              >
                <div className="w-11 h-11 shrink-0 rounded-2xl bg-gradient-to-br from-blue-100 to-sky-100 ring-1 ring-slate-200 text-blue-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                    <span className="text-[11px] text-slate-500">{item.period}</span>
                  </div>
                  <div className="text-xs font-semibold text-blue-600 mt-0.5">{item.role}</div>
                  <p className="text-xs text-slate-500 leading-relaxed mt-2">{item.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
