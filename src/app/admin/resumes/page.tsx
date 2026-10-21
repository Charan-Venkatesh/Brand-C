"use client";

import React, { useState, useEffect } from "react";
import { FileText, Download, CheckCircle, Upload, CheckCircle2, ShieldCheck } from "lucide-react";
import { HCCStore, ResumeVersion } from "@/lib/store";

export default function AdminResumes() {
  const [resumes, setResumes] = useState<ResumeVersion[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newRole, setNewRole] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadResumes = () => {
    HCCStore.getResumes().then((data) => setResumes(data));
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const handleSetActive = async (id: string) => {
    const ok = await HCCStore.activateResume(id);
    if (ok) {
      setSuccessMsg("Active resume updated successfully.");
      loadResumes();
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  const handleUploadNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel || !newRole) return;

    try {
      await fetch("http://localhost:5000/api/v1/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          versionLabel: newLabel,
          targetRole: newRole,
          category: newRole,
          fileName: `Charan_Venkatesh_${newLabel.replace(/\s+/g, "_")}.pdf`,
          fileSizeBytes: 148000,
          isActive: false,
        }),
      });
    } catch (e) {
      console.warn("Upload error:", e);
    }

    setIsUploading(false);
    setNewLabel("");
    setNewRole("");
    setSuccessMsg("Resume variant registered successfully.");
    loadResumes();
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Resume Version Vault
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage tailored CV variants, designate the 1-click active default, and monitor recruiter downloads.
          </p>
        </div>
        <button
          onClick={() => setIsUploading(!isUploading)}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload PDF Variant</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {isUploading && (
        <form onSubmit={handleUploadNew} className="p-6 rounded-2xl bg-white border border-blue-200 shadow-sm space-y-4 text-xs">
          <h2 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Upload New Resume Version</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Version Label</label>
              <input
                type="text"
                required
                placeholder="e.g. v2.1 - Cloud & DevOps Engineer"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Target Role Focus</label>
              <input
                type="text"
                required
                placeholder="e.g. Cloud Engineer / DevOps Engineer"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsUploading(false)}
              className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold"
            >
              Confirm Upload
            </button>
          </div>
        </form>
      )}

      {/* Resume Cards */}
      <div className="grid grid-cols-1 gap-4">
        {resumes.map((res) => (
          <div
            key={res.id}
            className={`p-5 rounded-2xl border transition flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white ${
              res.isActive
                ? "border-blue-500 ring-2 ring-blue-100 shadow-sm"
                : "border-slate-200 hover:border-slate-300 shadow-sm"
            }`}
          >
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="font-bold text-sm text-slate-900">{res.versionLabel}</span>
                {res.isActive && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase">
                    Active Default
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Target Role: <strong className="text-slate-800">{res.targetRole}</strong>
              </p>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center space-x-3">
                <span>File: {res.fileName}</span>
                <span>•</span>
                <span>Size: {res.fileSize || `${Math.round((res.fileSizeBytes || 124000) / 1024)} KB`}</span>
                <span>•</span>
                <span>Uploaded: {res.uploadedAt || "2026-09-30"}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <div className="text-right text-xs text-slate-600 mr-2">
                <div className="text-sm font-bold text-slate-900">{res.downloadCount}</div>
                <div className="text-[10px] text-slate-400">Recruiter Downloads</div>
              </div>

              {!res.isActive && (
                <button
                  onClick={() => handleSetActive(res.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition"
                >
                  Set as Active
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
