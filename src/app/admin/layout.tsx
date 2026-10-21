"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Terminal,
  LayoutDashboard,
  User,
  BookOpen,
  Briefcase,
  Image as ImageIcon,
  Layers,
  Cpu,
  ShieldCheck,
  FileText,
  Share2,
  Inbox,
  Send,
  Settings,
  Globe,
  LogOut,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Story Narrative", href: "/admin/story", icon: BookOpen },
    { label: "Photos & Media", href: "/admin/photos", icon: ImageIcon },
    { label: "Projects & Evidence", href: "/admin/projects", icon: Layers },
    { label: "Experience & Spine", href: "/admin/experience", icon: Briefcase },
    { label: "Certifications", href: "/admin/certifications", icon: ShieldCheck },
    { label: "Profile & Identity", href: "/admin/profile", icon: User },
    { label: "Career Preferences", href: "/admin/preferences", icon: Briefcase },
    { label: "Resume Vault", href: "/admin/resumes", icon: FileText },
    { label: "Recruiter Inquiries", href: "/admin/inquiries", icon: Inbox },
    { label: "Publish Snapshot", href: "/admin/publish", icon: Send },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Top Admin Control Bar */}
      <header className="h-14 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900">
                HCC Admin Command Center
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Single Source of Truth
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open Live Website</span>
          </a>
          <a
            href="/admin/login"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 transition"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-60 shrink-0">
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
              Control Plane
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-bold border border-blue-200"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
