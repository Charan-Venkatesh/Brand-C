"use client";

import React, { useState } from "react";
import { Globe, Save, CheckCircle2 } from "lucide-react";

export default function AdminSocial() {
  const [links, setLinks] = useState({
    linkedin: "https://linkedin.com/in/charan-venkatesh-gorle",
    github: "https://github.com/Charan-Venkatesh",
    website: "",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Social & External Links
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage links to verified professional profiles and code repositories.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Social links updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
        <div>
          <label className="block text-slate-300 font-semibold mb-1">LinkedIn Profile URL</label>
          <input
            type="text"
            value={links.linkedin}
            onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">GitHub Profile URL</label>
          <input
            type="text"
            value={links.github}
            onChange={(e) => setLinks({ ...links, github: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-cyan-400 text-slate-950 font-bold"
          >
            Save Links
          </button>
        </div>
      </form>
    </div>
  );
}
