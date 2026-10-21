"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, PlusCircle, Trash2, CheckCircle2, Upload, ExternalLink, Image as ImageIcon } from "lucide-react";
import { HCCStore, CertificationItem } from "@/lib/store";

export default function AdminCertifications() {
  const [certs, setCerts] = useState<CertificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [credId, setCredId] = useState("");
  const [credUrl, setCredUrl] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [certFile, setCertFile] = useState<File | null>(null);
  const [certPreview, setCertPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const loadCerts = async () => {
    setLoading(true);
    const data = await HCCStore.getCertifications();
    setCerts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCerts();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCertFile(file);
      setCertPreview(URL.createObjectURL(file));
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !issuer) return;

    setSaving(true);
    let imageUrl = "";

    if (certFile) {
      const formData = new FormData();
      formData.append("file", certFile);
      formData.append("category", "Certifications");
      formData.append("classification", "PUBLIC");
      formData.append("altText", `${name} Certificate`);

      const uploaded = await HCCStore.uploadMedia(formData);
      if (uploaded) {
        imageUrl = uploaded.publicUrl;
      }
    }

    const newCert: Partial<CertificationItem> = {
      name,
      issuer,
      credentialId: credId,
      credentialUrl: credUrl || "https://learn.microsoft.com",
      issueDate: issueDate || new Date().toISOString(),
      certificateImageUrl: imageUrl,
      isPublished: true,
      displayOrder: certs.length + 1,
    };

    const created = await HCCStore.createCertification(newCert);
    setSaving(false);

    if (created) {
      setCerts([...certs, created]);
      setName("");
      setIssuer("");
      setCredId("");
      setCredUrl("");
      setIssueDate("");
      setCertFile(null);
      setCertPreview(null);
      setNotification(`Certification "${created.name}" saved to database!`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleDelete = async (id: string, certName: string) => {
    if (confirm(`Delete certification "${certName}"?`)) {
      try {
        await fetch(`http://localhost:5000/api/v1/certifications/${id}`, { method: "DELETE" });
        setCerts(certs.filter((c) => c.id !== id));
        setNotification(`Certification removed.`);
        setTimeout(() => setNotification(null), 4000);
      } catch (e) {
        console.error("Error deleting certification:", e);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <span>Verified Certifications & Accreditations</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage authentic credentials, issuer verification links, and certificate document uploads.
          </p>
        </div>
      </div>

      {notification && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Add Form */}
      <form onSubmit={handleAdd} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs">
        <h2 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
          <PlusCircle className="w-4 h-4 text-blue-600" />
          <span>Add Verified Certification with Certificate Image</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Certification Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Microsoft Certified: Fabric Data Engineer Associate"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Issuing Authority</label>
            <input
              type="text"
              required
              placeholder="e.g. Microsoft / Cisco / Google / SAP / Tableau"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Credential ID</label>
            <input
              type="text"
              placeholder="e.g. MS-FABRIC-DE-2024"
              value={credId}
              onChange={(e) => setCredId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Verification URL</label>
            <input
              type="url"
              placeholder="https://learn.microsoft.com / https://credly.com"
              value={credUrl}
              onChange={(e) => setCredUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Issue Date</label>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">Certificate Image / Badge Upload</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {certPreview && (
            <div className="mt-2 p-2 bg-slate-50 rounded border border-slate-200 inline-block">
              <img src={certPreview} alt="Certificate preview" className="h-20 w-auto object-contain rounded" />
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-200">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition disabled:opacity-50 flex items-center space-x-2"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{saving ? "Saving to Database..." : "Save Certification to Database"}</span>
          </button>
        </div>
      </form>

      {/* Certifications List */}
      <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
          Verified Credentials in Database ({certs.length})
        </h2>

        {loading ? (
          <div className="text-center py-6 text-slate-400 text-xs">Loading certifications...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {certs.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-lg border border-slate-200 bg-slate-50 flex items-start justify-between gap-3 hover:border-blue-200 transition"
              >
                <div>
                  <div className="font-bold text-sm text-slate-900">{c.name}</div>
                  <div className="text-xs text-blue-600 font-semibold mt-0.5">{c.issuer}</div>
                  {c.credentialId && (
                    <div className="text-[11px] text-slate-500 mt-1">ID: {c.credentialId}</div>
                  )}
                  {c.credentialUrl && (
                    <a
                      href={c.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-blue-600 hover:underline flex items-center space-x-1 mt-1"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(c.id, c.name)}
                  className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
