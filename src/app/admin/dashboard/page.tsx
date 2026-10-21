"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  Briefcase,
  ShieldCheck,
  Image as ImageIcon,
  FileText,
  Inbox,
  Send,
  PlusCircle,
  Clock,
  ExternalLink,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { HCCStore, ContactInquiry, PublicationSnapshot, ProjectItem } from "@/lib/store";

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [snapshots, setSnapshots] = useState<PublicationSnapshot[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [stats, setStats] = useState({
    publishedProjects: 0,
    draftProjects: 0,
    experiences: 0,
    certificates: 0,
    media: 0,
    unreadInquiries: 0,
  });

  useEffect(() => {
    Promise.all([
      HCCStore.getOverview(),
      HCCStore.getProjects(true),
      HCCStore.getInquiries(),
      HCCStore.getSnapshots(),
    ]).then(([overview, allProjs, inqs, snaps]) => {
      setProjects(allProjs);
      setInquiries(inqs);
      setSnapshots(snaps);

      if (overview) {
        setStats({
          publishedProjects: allProjs.filter((p) => p.isPublished).length,
          draftProjects: allProjs.filter((p) => !p.isPublished).length,
          experiences: overview.experiences?.length || 0,
          certificates: overview.certifications?.length || 0,
          media: overview.media?.length || 0,
          unreadInquiries: inqs.filter((i) => !i.isRead).length,
        });
      }
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Executive Command Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time status of published portfolio assets, database evidence, and recruiter inquiries.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <a
            href="/admin/projects"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm transition"
          >
            <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Add Project</span>
          </a>
          <a
            href="/admin/publish"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Snapshot</span>
          </a>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-2 text-slate-500 text-[11px] font-semibold mb-1">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Live Projects</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.publishedProjects}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{stats.draftProjects} draft / private</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-2 text-slate-500 text-[11px] font-semibold mb-1">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span>Experiences</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.experiences}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">3 Core + Leadership</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-2 text-slate-500 text-[11px] font-semibold mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Certificates</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.certificates}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Microsoft, Google, Cisco</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-2 text-slate-500 text-[11px] font-semibold mb-1">
            <ImageIcon className="w-4 h-4 text-indigo-600" />
            <span>Media Assets</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.media}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Photos & Evidence</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-2 text-slate-500 text-[11px] font-semibold mb-1">
            <Inbox className="w-4 h-4 text-amber-600" />
            <span>Inquiries</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{inquiries.length}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{stats.unreadInquiries} unread</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-2 text-slate-500 text-[11px] font-semibold mb-1">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Snapshot</span>
          </div>
          <div className="text-2xl font-black text-slate-900">#v{snapshots[0]?.version || 1}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Active Release</div>
        </div>
      </div>

      {/* Quick Actions (Section 31) */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Quick Management Actions
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <a
            href="/admin/photos"
            className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold"
          >
            Upload Photo
          </a>
          <a
            href="/admin/projects"
            className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold"
          >
            Add Project
          </a>
          <a
            href="/admin/experience"
            className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold"
          >
            Add Experience
          </a>
          <a
            href="/admin/certifications"
            className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold"
          >
            Add Certificate
          </a>
          <a
            href="/admin/resumes"
            className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold"
          >
            Upload Resume
          </a>
          <a
            href="/admin/story"
            className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold"
          >
            Edit Story
          </a>
          <a
            href="/"
            target="_blank"
            className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold"
          >
            Preview Live
          </a>
          <a
            href="/admin/publish"
            className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold"
          >
            Publish Live
          </a>
        </div>
      </div>

      {/* Recruiter Inquiries Feed */}
      <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
            <Inbox className="w-4 h-4 text-blue-600" />
            <span>Recent Recruiter Inquiries ({inquiries.length})</span>
          </h2>
          <a href="/admin/inquiries" className="text-xs text-blue-600 font-semibold hover:underline">
            View All Inquiries →
          </a>
        </div>

        <div className="space-y-3">
          {inquiries.slice(0, 3).map((inq) => (
            <div key={inq.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{inq.senderName || inq.name}</span>
                <span className="text-[11px] text-slate-400">{inq.createdAt || inq.submittedAt}</span>
              </div>
              <div className="text-[11px] text-blue-600 font-semibold mt-0.5">
                {inq.companyName || inq.company} • {inq.roleInterestedIn || inq.roleInterest}
              </div>
              <p className="text-slate-600 mt-1 line-clamp-2">&ldquo;{inq.message}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
