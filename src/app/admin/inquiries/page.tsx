"use client";

import React, { useState, useEffect } from "react";
import { Inbox, Mail, CheckCircle2, Clock, Building, Send } from "lucide-react";
import { HCCStore, ContactInquiry } from "@/lib/store";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);

  const loadInquiries = () => {
    HCCStore.getInquiries().then((data) => setInquiries(data));
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleMarkRead = async (id: string) => {
    await HCCStore.markInquiryRead(id);
    loadInquiries();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Recruiter Inquiries & Leads
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Priority technical recruiter and hiring manager outreach inbox.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            No inquiries received yet.
          </div>
        ) : (
          inquiries.map((inq) => (
            <div
              key={inq.id}
              className={`p-6 rounded-2xl border transition ${
                inq.isRead
                  ? "bg-slate-900/60 border-slate-800"
                  : "bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-500/10"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center font-bold text-xs">
                    {(inq.senderName || inq.name || "R").charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white flex items-center space-x-2">
                      <span>{inq.senderName || inq.name}</span>
                      {!inq.isRead && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center space-x-2">
                      <span className="text-cyan-400 font-semibold">{inq.companyName || inq.company}</span>
                      <span>•</span>
                      <span>{inq.senderEmail || inq.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{inq.createdAt || inq.submittedAt}</span>
                  </div>
                  {!inq.isRead && (
                    <button
                      onClick={() => handleMarkRead(inq.id)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold transition"
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <div className="text-xs font-semibold text-slate-300">
                  Target Opportunity: <span className="text-white">{inq.roleInterestedIn || inq.roleInterest}</span>
                </div>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/60">
                  &ldquo;{inq.message}&rdquo;
                </p>
              </div>

              <div className="mt-4 flex justify-end">
                <a
                  href={`mailto:${inq.senderEmail || inq.email}?subject=Re: ${encodeURIComponent(inq.roleInterestedIn || inq.roleInterest || "Opportunity")}`}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
