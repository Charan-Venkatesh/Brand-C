"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { CertificationsBadges } from "@/components/CertificationsBadges";

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      <Navigation onOpenContact={() => {}} />
      <main className="flex-1 py-10">
        <CertificationsBadges />
      </main>
    </div>
  );
}
