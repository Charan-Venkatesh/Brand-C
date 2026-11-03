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
    <section id="certifications" className="py-14 border-b border-white/10 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-sky-400 mb-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Certifications & Accreditations
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Professional certifications from Microsoft, Google, Cisco, and SAP.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {certs.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-400/40 hover:bg-sky-400/5 transition flex flex-col justify-between"
            >
              <div>
                {/* Certificate Image or Badge Preview */}
                <div className="w-12 h-12 rounded-lg bg-slate-950 border border-white/10 flex items-center justify-center mb-3 shadow-sm overflow-hidden">
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
                    <Award className="w-6 h-6 text-sky-400" />
                  )}
                </div>

                <h3 className="font-bold text-xs sm:text-sm text-white leading-snug">
                  {c.name}
                </h3>
                <div className="text-xs font-semibold text-sky-400 mt-1">{c.issuer}</div>

                {c.credentialId && (
                  <div className="text-[11px] text-slate-400 mt-1">ID: {c.credentialId}</div>
                )}
              </div>

              {c.credentialUrl && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-[11px] font-bold text-sky-400 hover:text-sky-200 hover:underline"
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
