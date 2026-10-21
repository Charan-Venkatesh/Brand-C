"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      <Navigation onOpenContact={() => {}} />
      <main className="flex-1 py-10">
        <ExperienceTimeline />
      </main>
    </div>
  );
}
