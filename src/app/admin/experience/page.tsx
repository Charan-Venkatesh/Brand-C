"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, PlusCircle, Trash2, CheckCircle2, Building, Layers } from "lucide-react";
import { HCCStore, ExperienceItem } from "@/lib/store";

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("Hyderabad, India");
  const [category, setCategory] = useState("Professional");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrentRole, setIsCurrentRole] = useState(false);
  const [description, setDescription] = useState("");
  const [contextText, setContextText] = useState("");
  const [whatIWorkedOn, setWhatIWorkedOn] = useState("");
  const [whatIContributed, setWhatIContributed] = useState("");
  const [whatILearned, setWhatILearned] = useState("");

  const loadExperiences = async () => {
    setLoading(true);
    const data = await HCCStore.getExperiences();
    setExperiences(data);
    setLoading(false);
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !role) return;

    const newExp: Partial<ExperienceItem> = {
      company,
      role,
      location,
      category,
      employmentType,
      startDate: startDate || new Date().toISOString(),
      endDate: isCurrentRole ? undefined : (endDate || undefined),
      isCurrentRole,
      description,
      context: contextText,
      whatIWorkedOn,
      whatIContributed,
      whatILearned,
      responsibilities: [description],
      achievements: [],
      technologies: ["Cloud", "DevOps", "Linux"],
      displayOrder: experiences.length + 1,
    };

    const created = await HCCStore.createExperience(newExp);
    if (created) {
      setExperiences([created, ...experiences]);
      setIsAdding(false);
      setNotification(`Experience "${created.company}" saved to database!`);
      setTimeout(() => setNotification(null), 4000);
      setCompany("");
      setRole("");
      setDescription("");
      setContextText("");
      setWhatIWorkedOn("");
      setWhatIContributed("");
      setWhatILearned("");
    }
  };

  const handleDelete = async (id: string, compName: string) => {
    if (confirm(`Delete experience record for "${compName}"?`)) {
      try {
        await fetch(`http://localhost:5000/api/v1/experience/${id}`, { method: "DELETE" });
        setExperiences(experiences.filter((e) => e.id !== id));
        setNotification(`Experience deleted.`);
        setTimeout(() => setNotification(null), 4000);
      } catch (err) {
        console.error("Error deleting experience:", err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <span>Professional Experience & Career History</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your authentic employment records (Accenture/JoulestoWatts, Meghana Technologies, Efftronics) and associated project portfolios.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {notification && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {isAdding && (
        <form onSubmit={handleAdd} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs">
          <h2 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
            <Building className="w-4 h-4 text-blue-600" />
            <span>Add Professional Experience Record</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Company / Organization</label>
              <input
                type="text"
                required
                placeholder="e.g. Meghana Technologies / Efftronics Systems"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Role Title</label>
              <input
                type="text"
                required
                placeholder="e.g. System and Data Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
              >
                <option value="Professional">Core Professional (Spine)</option>
                <option value="Additional">Additional Experience</option>
                <option value="Leadership & Community">Leadership & Community</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">End Date</label>
              <input
                type="date"
                disabled={isCurrentRole}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none disabled:opacity-40"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isCurrentRole}
                onChange={(e) => setIsCurrentRole(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="font-semibold text-slate-700">Currently active role</span>
            </label>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Overview Description</label>
            <textarea
              rows={2}
              required
              placeholder="High-level description of scope, mission, and systems focus..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Context</label>
              <textarea
                rows={2}
                placeholder="Operational environment or problem space..."
                value={contextText}
                onChange={(e) => setContextText(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">What I Worked On</label>
              <textarea
                rows={2}
                placeholder="Specific tools, SDKs, or systems..."
                value={whatIWorkedOn}
                onChange={(e) => setWhatIWorkedOn(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">What I Contributed</label>
              <textarea
                rows={2}
                placeholder="Direct engineering contributions delivered..."
                value={whatIContributed}
                onChange={(e) => setWhatIContributed(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">What I Learned</label>
              <textarea
                rows={2}
                placeholder="Key learnings in engineering or operations..."
                value={whatILearned}
                onChange={(e) => setWhatILearned(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-200">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition flex items-center space-x-2"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Save Experience to Database</span>
            </button>
          </div>
        </form>
      )}

      {/* Experience Records List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading experiences...</div>
        ) : (
          experiences.map((exp) => (
            <div key={exp.id} className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-sm text-slate-900">{exp.company}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {exp.category || "Professional"}
                    </span>
                    {exp.isCurrentRole && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-600 font-semibold mt-0.5">
                    {exp.role} • <span className="text-slate-400 font-normal">{exp.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(exp.id, exp.company)}
                  className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 self-start sm:self-center transition"
                  title="Delete Experience"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{exp.description}</p>

              {/* Nested Projects Portfolio */}
              {exp.projects && exp.projects.length > 0 && (
                <div className="mt-3.5 pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    <span>Linked Engineering Projects ({exp.projects.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {exp.projects.map((p) => (
                      <div key={p.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                        <div className="font-bold text-slate-800 flex items-center justify-between">
                          <span>{p.title}</span>
                          <span className="text-[9px] px-1 rounded bg-slate-200 text-slate-600">
                            {p.classification || "PUBLIC"}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{p.summary}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
