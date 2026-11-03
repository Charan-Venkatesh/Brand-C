"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, ExternalLink, Award } from "lucide-react";
import { HCCStore, CertificationItem } from "@/lib/store";

export const CertificationsBadges: React.FC = () => {
  const [certs, setCerts] = useState<CertificationItem[]>([]);

  useEffect(() => {
    HCCStore.getOverview().then((data) => {
      if (data && data.certifications) {
        setCerts(data.certifications);
      }
    });
  }, []);

  return (
    <section id="certifications" className="py-14 border-b border-slate-200/70 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-[-0.03em]">
            Certifications & Accreditations
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Professional certifications from Microsoft, Google, Cisco, and SAP.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {certs.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-3xl bg-slate-50/80 border border-slate-200/70 hover:border-blue-300 hover:bg-blue-50/60 transition flex flex-col justify-between"
            >
              <div>
                {/* Certificate Image or Badge Preview */}
                <div className="w-12 h-12 rounded-lg bg-white border border-slate-200/70 flex items-center justify-center mb-3 shadow-[0_1px_2px_rgba(28,25,23,0.04),0_12px_32px_-16px_rgb(var(--glow)/0.18)] overflow-hidden">
                  {c.certificateImageUrl ? (
                    <img
                      src={c.certificateImageUrl}
                      alt={c.name}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <Award className="w-6 h-6 text-blue-600" />
                  )}
                </div>

                <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                  {c.name}
                </h3>
                <div className="text-xs font-semibold text-blue-600 mt-1">{c.issuer}</div>

                {c.credentialId && (
                  <div className="text-[11px] text-slate-500 mt-1">ID: {c.credentialId}</div>
                )}
              </div>

              {c.credentialUrl && (
                <div className="mt-4 pt-3 border-t border-slate-200/70">
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
