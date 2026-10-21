"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { ResumeViewer } from "@/components/ResumeViewer";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      <Navigation onOpenContact={() => {}} />
      <main className="flex-1 py-10">
        <ResumeViewer />
      </main>
    </div>
  );
}
