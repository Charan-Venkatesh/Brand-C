"use client";

import React from "react";
import {
  MapPin,
  Briefcase,
  Mail,
  Phone,
  MessageCircle,
  FileText,
  Layers,
  CheckCircle2,
  Rocket,
  Users,
  ArrowRight,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { LinkedInMark } from "@/components/ContactSection";
import { CONTACT_EMAIL, CONTACT_PHONE, LINKEDIN_URL, profilePhoto } from "@/data/portfolio";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { withBase } from "@/lib/utils";

const home = (hash: string) => `${withBase("/")}#${hash}`;

const facts = [
  { icon: MapPin, label: "Location", value: "Hyderabad, India · open to India-wide & remote" },
  { icon: Briefcase, label: "Looking for", value: "Cloud · DevOps · SRE · Platform / Systems Engineer" },
  { icon: Layers, label: "Experience", value: "JoulestoWatts (Accenture client) · Meghana Technologies (Indian Navy) · Efftronics R&D · DharviX BI" },
  { icon: CheckCircle2, label: "Status", value: "Open to opportunities" },
];

const proof = [
  "3 Indian Navy systems deployed and in operational use — IFSMS (INS 324), logistics file tracking (INS DEGA), WhatsApp service-desk routing (INS Circars)",
  "OpenTelemetry tracing and log-based troubleshooting for enterprise AI-agent workflows (Accenture client)",
  "Power BI & Grafana dashboards for railway predictive-maintenance telemetry (Efftronics) and business reporting (DharviX)",
  "Hult Prize Top 3 · Founder, Vedic Science & Culture Club (100+ members) · Lead Organiser, CONNECT 2K24",
];

const skills = ["Linux", "Python", "FastAPI", "React.js", "Node.js", "SQL / MySQL", "Git / GitHub", "OpenTelemetry", "Power BI", "Grafana", "TCP/IP & DNS", "RBAC", "WhatsApp Business API"];

const forFounders = [
  { title: "Internal tools that ship", desc: "Role-based web apps with React + FastAPI — the same stack behind the Navy systems in daily use." },
  { title: "Dashboards your team reads", desc: "Power BI / Grafana views over your data so decisions stop waiting on spreadsheets." },
  { title: "Automation on WhatsApp", desc: "Request routing and auto-replies on the WhatsApp Business API for support or ops." },
  { title: "Monitoring & troubleshooting", desc: "Logs, tracing and repeatable checks so incidents get found and handed off cleanly." },
];

export default function HirePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Header */}
        <section className="relative overflow-hidden border-b border-slate-200/70">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="aurora aurora-1" />
            <div className="aurora aurora-2" />
            <div className="dot-grid absolute inset-0" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">For recruiters &amp; founders</div>
              <h1 className="mt-3 text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-[1.05]">
                Charan in <span className="text-gradient">30 seconds.</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Cloud, DevOps &amp; systems engineer in Hyderabad who has shipped production software for the Indian Navy
                and works on enterprise AI-agent operations today.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <a href={whatsappUrl("Hi Charan, I saw your portfolio and would like to talk about a role.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a href={telUrl} className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition">
                  <Phone className="w-4 h-4" /> {CONTACT_PHONE}
                </a>
                <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Opportunity for Charan")}`} className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-brand text-white shadow-lg shadow-blue-600/25 hover:brightness-110 transition">
                  <Mail className="w-4 h-4" /> Email
                </a>
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:border-slate-300 transition">
                  <LinkedInMark className="w-4 h-4 text-[#0a66c2]" /> LinkedIn
                </a>
              </div>
            </div>
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="photo-ring rounded-[2rem] p-[3px] w-48 sm:w-56 shadow-2xl shadow-blue-600/25">
                <img src={withBase(`/${profilePhoto}`)} alt="Charan Venkatesh Gorle" className="block w-full aspect-[4/5] object-cover rounded-[1.85rem]" />
              </div>
            </div>
          </div>
        </section>

        {/* Quick facts */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {facts.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.label} className="card-soft rounded-3xl p-5 flex gap-4">
                <span className="w-10 h-10 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-slate-500">{f.label}</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{f.value}</div>
                </div>
              </div>
            );
          })}
        </section>

        {/* For recruiters */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 card-soft rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              <Users className="w-4 h-4" /> For recruiters
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-tight">Proof, not adjectives</h2>
            <ul className="mt-5 space-y-3">
              {proof.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-blue-600 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={home("resume")} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 transition">
                <FileText className="w-4 h-4" /> Resume
              </a>
              <a href={withBase("/projects/")} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:border-slate-300 transition">
                Case studies <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 card-soft rounded-3xl p-6 sm:p-8">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Core skills</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* For founders */}
        <section className="bg-gradient-to-b from-blue-50/60 to-white border-t border-slate-200/70">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              <Rocket className="w-4 h-4" /> For startup founders
            </div>
            <h2 className="mt-2 text-3xl font-black tracking-tight">What I can take off your plate</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {forFounders.map((f) => (
                <div key={f.title} className="spotlight-card card-soft rounded-3xl p-6">
                  <div className="text-base font-bold text-slate-900">{f.title}</div>
                  <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-[2rem] bg-brand text-white p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl shadow-blue-600/25">
              <div>
                <div className="text-2xl font-black tracking-tight">Have a role or a project?</div>
                <div className="mt-1 text-white/80 text-sm">WhatsApp is the fastest way to reach me.</div>
              </div>
              <a href={whatsappUrl("Hi Charan, I'm a founder and would like to discuss a project/role.")} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold bg-white text-slate-900 hover:bg-slate-100 transition">
                <MessageCircle className="w-4 h-4 text-emerald-600" /> Message on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
