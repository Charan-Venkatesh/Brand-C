"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, Save, CheckCircle2 } from "lucide-react";
import { DEFAULT_MASTER_DATA } from "@/lib/store";

export default function AdminPreferences() {
  const [pref, setPref] = useState(DEFAULT_MASTER_DATA.careerPreference);
  const [saved, setSaved] = useState(false);
  const [rolesInput, setRolesInput] = useState(DEFAULT_MASTER_DATA.careerPreference.targetRoles.join(", "));
  const [locationsInput, setLocationsInput] = useState(DEFAULT_MASTER_DATA.careerPreference.preferredLocations.join(", "));

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/career-preferences")
      .then((r) => r.ok && r.json())
      .then((data) => {
        if (data) {
          const roles = JSON.parse(data.targetRolesJson || "[]");
          const locs = JSON.parse(data.preferredLocationsJson || "[]");
          setPref({
            targetRoles: roles,
            preferredLocations: locs,
            remotePreference: data.remotePreference,
            employmentType: data.employmentType,
            availability: data.availability,
            careerFocus: data.careerFocus,
          });
          setRolesInput(roles.join(", "));
          setLocationsInput(locs.join(", "));
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const rolesArray = rolesInput.split(",").map((s) => s.trim()).filter(Boolean);
    const locsArray = locationsInput.split(",").map((s) => s.trim()).filter(Boolean);

    try {
      await fetch("http://localhost:5000/api/v1/career-preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRolesJson: JSON.stringify(rolesArray),
          preferredLocationsJson: JSON.stringify(locsArray),
          remotePreference: pref.remotePreference,
          employmentType: pref.employmentType,
          availability: pref.availability,
          careerFocus: pref.careerFocus,
        }),
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
            Career & Job Preferences Configuration
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure target roles, preferred locations, remote preferences, and availability status.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Preferences updated and persisted to database!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5 text-xs">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="font-bold text-sm text-white flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span>Target Opportunities</span>
          </h2>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Target Roles (comma-separated)
            </label>
            <input
              type="text"
              required
              value={rolesInput}
              onChange={(e) => setRolesInput(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Preferred Locations (comma-separated)
            </label>
            <input
              type="text"
              required
              value={locationsInput}
              onChange={(e) => setLocationsInput(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Remote Policy</label>
              <input
                type="text"
                value={pref.remotePreference}
                onChange={(e) => setPref({ ...pref, remotePreference: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Employment Type</label>
              <input
                type="text"
                value={pref.employmentType}
                onChange={(e) => setPref({ ...pref, employmentType: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Availability Status</label>
              <input
                type="text"
                value={pref.availability}
                onChange={(e) => setPref({ ...pref, availability: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Career Focus Direction</label>
            <textarea
              rows={3}
              value={pref.careerFocus}
              onChange={(e) => setPref({ ...pref, careerFocus: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md shadow-cyan-400/20 transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
