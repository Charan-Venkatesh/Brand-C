"use client";

import React from "react";
import { Users, Award, Radio, Lightbulb, Trophy } from "lucide-react";

export const LeadershipCommunitySection: React.FC = () => {
  const leadershipItems = [
    {
      title: "Google Developer Student Club (GDSC)",
      role: "Core Member & Workshop Facilitator",
      period: "2023 – 2025",
      desc: "Delivered flagship technical workshop on 'Drones — Exploring Innovation and Applications'. Mentored student engineers in Git, Python, and IoT systems.",
      icon: Users,
    },
    {
      title: "CrossRoads with Shazin Hijazy",
      role: "Technical Support Lead",
      period: "June 2024 – June 2025",
      desc: "Led live streaming coordination, AV broadcast pipelines, and technical troubleshooting for professional digital media sessions.",
      icon: Radio,
    },
    {
      title: "Vedic Science & Culture Club",
      role: "Founder & President",
      period: "March 2024 – April 2025",
      desc: "Founded student organization coordinating weekly seminars, speaker sessions, leadership workshops, and personal development initiatives for 100+ members.",
      icon: Lightbulb,
    },
    {
      title: "Hult Prize Global Challenge",
      role: "Top 3 / Campus Finalist",
      period: "2023",
      desc: "Presented project Bugginess—an autonomous drone-based agricultural pest monitoring and targeted precision spraying concept for sustainable farming.",
      icon: Trophy,
    },
    {
      title: "Smart India Hackathon 2024",
      role: "Campus-Level Winning Team",
      period: "2024",
      desc: "Selected as campus-level winning team for rapid software prototyping and engineering problem solving under competitive hackathon timelines.",
      icon: Award,
    },
  ];

  return (
    <section id="leadership" className="py-14 border-b border-slate-200 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5">
            <Users className="w-4 h-4" />
            <span>Community & Initiatives</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Leadership & Technical Initiatives
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Developer community facilitation, workshop delivery, hackathons, and technical event coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {leadershipItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 shadow-sm transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400">{item.period}</span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 leading-snug">{item.title}</h3>
                  <div className="text-xs font-semibold text-blue-600 mt-0.5">{item.role}</div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
