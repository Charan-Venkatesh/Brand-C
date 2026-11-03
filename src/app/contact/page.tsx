"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Mail, Send, CheckCircle2, ArrowLeft } from "lucide-react";
import { HCCStore } from "@/lib/store";
import { withBase } from "@/lib/utils";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    roleInterest: "Cloud Engineer",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await HCCStore.submitInquiry({
      senderName: formData.name,
      senderEmail: formData.email,
      companyName: formData.company,
      roleInterestedIn: formData.roleInterest,
      message: formData.message,
    });
    setSending(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navigation onOpenContact={() => {}} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex-1">
        <a
          href={withBase("/")}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Command Center</span>
        </a>

        <div className="text-center mb-8">
          <div className="text-xs text-sky-400 font-bold uppercase tracking-wider mb-1.5 flex items-center justify-center space-x-1.5">
            <Mail className="w-4 h-4" />
            <span>Recruiter & Hiring Outreach</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Let&apos;s build something useful.</h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Open to conversations around Cloud, DevOps, Infrastructure, and SRE opportunities.
          </p>
        </div>

        <div className="p-8 rounded-2xl border border-white/10 bg-slate-950 shadow-sm">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">Inquiry Dispatched</h3>
              <p className="text-xs text-slate-400 mt-1">
                Thank you, <span className="font-semibold text-white">{formData.name}</span>. Your message has been received by Charan Venkatesh Gorle.
              </p>
              <a
                href={withBase("/")}
                className="mt-6 inline-block px-5 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              >
                Return to Homepage
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hiring Manager / Technical Recruiter"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/15 text-white focus:border-sky-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="recruiter@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/15 text-white focus:border-sky-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Company</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CloudScale Systems"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/15 text-white focus:border-sky-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Role / Opportunity Focus</label>
                <select
                  value={formData.roleInterest}
                  onChange={(e) => setFormData({ ...formData, roleInterest: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/15 text-white focus:border-sky-400 outline-none"
                >
                  <option>Cloud Engineer</option>
                  <option>DevOps Engineer</option>
                  <option>Infrastructure Engineer</option>
                  <option>SRE / Reliability Engineer</option>
                  <option>Platform Engineer</option>
                  <option>Automation Engineer</option>
                  <option>Observability Engineer</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about the role, team, and technology stack..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/15 text-white focus:border-sky-400 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-2.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{sending ? "Sending..." : "Submit Inquiry to Candidate"}</span>
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
