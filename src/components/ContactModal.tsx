"use client";

import React, { useState } from "react";
import { X, Mail, Send, CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { HCCStore, IS_STATIC } from "@/lib/store";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/data/portfolio";
import { inquiryBody, mailtoUrl, telUrl, whatsappUrl } from "@/lib/contact";

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

  const inquiry = {
    senderName: formData.name,
    senderEmail: formData.email,
    companyName: formData.company,
    roleInterestedIn: formData.roleInterest,
    message: formData.message,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await HCCStore.submitInquiry(inquiry);
    setSending(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200/70 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {IS_STATIC ? "Almost there — press Send" : "Message sent"}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              {IS_STATIC ? (
                <>
                  Thanks, <span className="font-semibold text-slate-900">{formData.name}</span>. Your email app
                  opened with the message ready to {CONTACT_EMAIL}. Didn&apos;t open? Send it on WhatsApp instead.
                </>
              ) : (
                <>
                  Thanks, <span className="font-semibold text-slate-900">{formData.name}</span>. Charan will get back to you soon.
                </>
              )}
            </p>
            {IS_STATIC && (
              <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={whatsappUrl(inquiryBody(inquiry))}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  Send on WhatsApp
                </a>
                <a
                  href={mailtoUrl(inquiry)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                >
                  <Mail className="w-4 h-4" />
                  Open email again
                </a>
              </div>
            )}
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-6 px-5 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-[0_1px_2px_rgba(28,25,23,0.04),0_12px_32px_-16px_rgb(var(--glow)/0.18)]"
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

            <div className="mb-5 grid grid-cols-2 gap-2">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a
                href={telUrl}
                className="inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 transition"
              >
                <Phone className="w-4 h-4" /> {CONTACT_PHONE}
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hiring Manager / Talent Lead"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50/80 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="recruiter@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50/80 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Company</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Enterprise Cloud Org"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50/80 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Role / Opportunity</label>
                <select
                  value={formData.roleInterest}
                  onChange={(e) => setFormData({ ...formData, roleInterest: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50/80 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
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
                <label className="block text-slate-600 font-semibold mb-1">Message</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share details about the role, technical scope, and team..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50/80 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-2.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-[0_1px_2px_rgba(28,25,23,0.04),0_12px_32px_-16px_rgb(var(--glow)/0.18)] transition flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{sending ? "Opening…" : "Send message"}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
