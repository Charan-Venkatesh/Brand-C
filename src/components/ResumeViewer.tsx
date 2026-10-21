"use client";

import React, { useState } from "react";
import { FileText, Download, Printer } from "lucide-react";
import { HCCStore } from "@/lib/store";

export const ResumeViewer: React.FC = () => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    await HCCStore.downloadActiveResume();
    setTimeout(() => {
      setDownloading(false);
      window.open("#resume", "_self");
    }, 400);
  };

  return (
    <section id="resume" className="py-14 border-b border-slate-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
              <FileText className="w-4 h-4" />
              <span>Tailored Resume</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Curated Curriculum Vitae
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center space-x-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? "Downloading..." : "Download Official PDF"}</span>
            </button>
          </div>
        </div>

        {/* Clean Light-Themed Resume Container */}
        <div className="rounded-2xl p-6 sm:p-10 border border-slate-200 bg-white shadow-sm space-y-6 text-xs text-slate-700">
          {/* Header */}
          <div className="border-b border-slate-200 pb-5 text-center sm:text-left sm:flex sm:justify-between sm:items-start">
            <div>
              <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                Charan Venkatesh Gorle
              </h1>
              <p className="text-xs font-semibold text-blue-600 mt-0.5">
                Cloud / DevOps / Infrastructure / Observability Engineer
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Hyderabad, India • gorle.charanvenkatesh@gmail.com • Open to Hyderabad / India / Remote
              </p>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Systems and infrastructure-focused technology professional with hands-on experience spanning enterprise AI-agent observability, naval defense systems engineering, industrial R&D telemetry validation, Linux administration, Docker, CI/CD, and Python automation. Committed to high-reliability production engineering across Cloud, DevOps, and SRE environments.
            </p>
          </div>

          {/* Core Technical Experience */}
          <div>
            <h2 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
              Professional Experience
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">AI-Agent Operations & Observability Engineer</h3>
                    <p className="text-[11px] text-blue-600 font-semibold">JoulestoWatts Business Solutions (Client: Accenture)</p>
                  </div>
                  <span className="text-[11px] text-slate-400">July 2025 – Present</span>
                </div>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-[11px] text-slate-600">
                  <li>Instrumented services with OpenTelemetry for distributed trace collection and telemetry streaming.</li>
                  <li>Constructed runtime dependency graphs in Neo4j to visualize multi-agent call paths and failure propagation.</li>
                  <li>Diagnosed production exceptions, bottlenecks, and orchestration timeouts in enterprise AI-agent workflows.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">System and Data Engineer</h3>
                    <p className="text-[11px] text-blue-600 font-semibold">Meghana Technologies (Indian Navy Projects)</p>
                  </div>
                  <span className="text-[11px] text-slate-400">June 2025 – December 2025</span>
                </div>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-[11px] text-slate-600">
                  <li>Engineered Integrated Flight Safety Monitoring System (IFSMS) for naval aviation squadron INS 324 using React.js and FastAPI.</li>
                  <li>Built Logistics File Status Management System with QR tracking and RBAC for INS DEGA naval base.</li>
                  <li>Automated administrative service desk routing using WhatsApp Business API for INS Circars.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">Research & Development Trainee (Data Analyst)</h3>
                    <p className="text-[11px] text-blue-600 font-semibold">Efftronics Systems Pvt. Ltd.</p>
                  </div>
                  <span className="text-[11px] text-slate-400">December 2024 – June 2025</span>
                </div>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-[11px] text-slate-600">
                  <li>Analyzed high-frequency operational sensor and log telemetry for Remote Diagnostics & Predictive Maintenance System (RDPMS).</li>
                  <li>Performed data validation, trend analysis, and noise filtering on railway signaling infrastructure streams.</li>
                  <li>Built interactive Power BI diagnostic condition-monitoring dashboards for engineering oversight.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-200">
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                Education
              </h2>
              <div className="text-[11px]">
                <p className="font-bold text-slate-800">Andhra University</p>
                <p className="text-slate-600">B.Tech in Computer Science & Systems Engineering</p>
                <p className="text-slate-400 mt-0.5">2021 – 2025</p>
              </div>
            </div>

            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                Verified Certifications
              </h2>
              <ul className="text-[11px] text-slate-600 space-y-1">
                <li>• Microsoft Certified: Fabric Data Engineer Associate</li>
                <li>• Microsoft Certified: Azure AI Fundamentals</li>
                <li>• Cisco Junior Cybersecurity Analyst Career Path</li>
                <li>• SAP Certified - Data Analyst - SAP Analytics Cloud</li>
                <li>• Google Professional Data Analytics Certificate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
