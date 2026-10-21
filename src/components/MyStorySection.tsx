"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import { HCCStore, ProfileData } from "@/lib/store";

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
    <section id="story" className="py-14 border-b border-slate-200 bg-slate-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
          <BookOpen className="w-4 h-4" />
          <span>My Story</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-4">
          {profile?.storyHeadline || "From Curiosity & Systems R&D to Enterprise Observability & Cloud Engineering"}
        </h2>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
          {storyText}
        </p>

        <div className="mt-5 flex items-center space-x-4">
          <a
            href="/about"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
          >
            <span>Read complete professional background</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="/journey"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:underline"
          >
            <span>View visual career progression</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
