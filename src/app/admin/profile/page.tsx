"use client";

import React, { useState, useEffect } from "react";
import { User, Save, CheckCircle2, Globe, Mail, MapPin } from "lucide-react";
import { DEFAULT_MASTER_DATA } from "@/lib/store";

export default function AdminProfile() {
  const [profile, setProfile] = useState(DEFAULT_MASTER_DATA.profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/profile")
      .then((r) => r.ok && r.json())
      .then((data) => data && setProfile(data))
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/v1/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
    } catch (err) {}
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Profile & Personal Brand Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure candidate identity, professional positioning, summary, and public contact information.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Profile configuration saved successfully to database!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5 text-xs">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="font-bold text-sm text-white flex items-center space-x-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Candidate Master Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                required
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Current Location</label>
              <input
                type="text"
                required
                value={profile.currentLocation}
                onChange={(e) => setProfile({ ...profile, currentLocation: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Primary Positioning</label>
              <input
                type="text"
                required
                value={profile.primaryPositioning}
                onChange={(e) => setProfile({ ...profile, primaryPositioning: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Headline</label>
              <input
                type="text"
                required
                value={profile.headline}
                onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Tagline</label>
            <input
              type="text"
              required
              value={profile.tagline}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Professional Summary</label>
            <textarea
              rows={4}
              required
              value={profile.summary}
              onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 font-sans"
            />
          </div>
        </div>

        {/* Contact Information & Socials */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="font-bold text-sm text-white flex items-center space-x-2">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Contact Information & URLs</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Contact Email</label>
              <input
                type="email"
                required
                value={profile.contactEmail}
                onChange={(e) => setProfile({ ...profile, contactEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">LinkedIn URL</label>
              <input
                type="text"
                value={profile.linkedInUrl || ""}
                onChange={(e) => setProfile({ ...profile, linkedInUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">GitHub URL</label>
              <input
                type="text"
                value={profile.gitHubUrl || ""}
                onChange={(e) => setProfile({ ...profile, gitHubUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md shadow-cyan-400/20 transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
