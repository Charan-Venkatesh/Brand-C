"use client";

import React, { useState } from "react";
import { X, Mail, Send, CheckCircle2 } from "lucide-react";
import { HCCStore } from "@/lib/store";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    roleInterest: "Cloud Engineer / DevOps Engineer",
    message: "",
  });

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Inquiry Dispatched</h3>
            <p className="mt-2 text-xs text-slate-600">
              Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Your message has been received directly by Charan Venkatesh Gorle.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-6 px-5 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 flex items-center space-x-1.5">
                <Mail className="w-4 h-4" />
                <span>Recruiter & Hiring Outreach</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Let&apos;s build something useful.
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Open to conversations around Cloud, DevOps, Infrastructure and SRE.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hiring Manager / Talent Lead"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="recruiter@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Company</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Enterprise Cloud Org"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Role / Opportunity</label>
                <select
                  value={formData.roleInterest}
                  onChange={(e) => setFormData({ ...formData, roleInterest: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
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
                <label className="block text-slate-700 font-semibold mb-1">Message</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share details about the role, technical scope, and team..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-2.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{sending ? "Dispatching..." : "Submit Inquiry to Candidate"}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
