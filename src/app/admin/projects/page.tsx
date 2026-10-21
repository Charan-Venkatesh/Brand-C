"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  PlusCircle,
  Trash2,
  CheckCircle2,
  ExternalLink,
  X,
  Star,
  Shield,
  Building,
} from "lucide-react";
import { HCCStore, ProjectItem, ExperienceItem } from "@/lib/store";

export default function AdminProjects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [newProject, setNewProject] = useState<Partial<ProjectItem>>({
    title: "",
    category: "Cloud / DevOps",
    summary: "",
    problem: "",
    approach: "",
    architecture: "",
    technology: "",
    candidateContribution: "",
    outcome: "",
    currentStatus: "Completed Engineering Project",
    projectType: "Professional Project",
    classification: "PUBLIC",
    githubUrl: "https://github.com/Charan-Venkatesh",
    tags: ["Cloud", "DevOps"],
    isFeatured: true,
    isPublished: true,
    companyName: "",
    clientName: "",
  });
  const [tagInput, setTagInput] = useState("Cloud, DevOps, Automation");

  const loadData = async () => {
    setLoading(true);
    const [projs, exps] = await Promise.all([
      HCCStore.getProjects(true),
      HCCStore.getExperiences(),
    ]);
    setProjects(projs);
    setExperiences(exps);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleToggleFeatured = async (proj: ProjectItem) => {
    const updatedFeatured = !proj.isFeatured;
    const ok = await HCCStore.updateProject(proj.id, {
      ...proj,
      isFeatured: updatedFeatured,
    });
    if (ok) {
      setProjects(projects.map((p) => (p.id === proj.id ? { ...p, isFeatured: updatedFeatured } : p)));
      showNotice(`Updated featured status for ${proj.title}`);
    }
  };

  const handleTogglePublished = async (proj: ProjectItem) => {
    const updatedPublished = !proj.isPublished;
    const ok = await HCCStore.updateProject(proj.id, {
      ...proj,
      isPublished: updatedPublished,
    });
    if (ok) {
      setProjects(projects.map((p) => (p.id === proj.id ? { ...p, isPublished: updatedPublished } : p)));
      showNotice(`Updated publish status for ${proj.title} (Live site updated)`);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to permanently delete project: "${title}"?`)) {
      const ok = await HCCStore.deleteProject(id);
      if (ok) {
        setProjects(projects.filter((p) => p.id !== id));
        showNotice(`Project "${title}" deleted from database.`);
      }
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.summary) return;

    const parsedTags = tagInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload: Partial<ProjectItem> = {
      title: newProject.title,
      category: newProject.category || "Cloud / DevOps",
      summary: newProject.summary,
      problem: newProject.problem || "Technical challenge addressed through automation.",
      approach: newProject.approach || "Engineered scalable and maintainable workflows.",
      architecture: newProject.architecture || "Modular infrastructure components and automated delivery.",
      technology: newProject.technology || "Python, Docker, Linux, CI/CD",
      candidateContribution: newProject.candidateContribution || "End-to-end design, implementation, and verification.",
      outcome: newProject.outcome || "Operational reliability and verified throughput.",
      currentStatus: newProject.currentStatus || "Completed Engineering Project",
      projectType: newProject.projectType || "Professional Project",
      classification: newProject.classification || "PUBLIC",
      githubUrl: newProject.githubUrl || "https://github.com/Charan-Venkatesh",
      companyName: newProject.companyName,
      clientName: newProject.clientName,
      experienceId: newProject.experienceId,
      tags: parsedTags.length > 0 ? parsedTags : ["Cloud", "DevOps"],
      isFeatured: newProject.isFeatured ?? true,
      isPublished: newProject.isPublished ?? true,
    };

    const created = await HCCStore.createProject(payload);
    if (created) {
      setProjects([created, ...projects]);
      setIsCreating(false);
      showNotice(`Project "${created.title}" successfully saved to database & live on public site!`);
      setNewProject({
        title: "",
        category: "Cloud / DevOps",
        summary: "",
        problem: "",
        approach: "",
        architecture: "",
        technology: "",
        candidateContribution: "",
        outcome: "",
        currentStatus: "Completed Engineering Project",
        projectType: "Professional Project",
        classification: "PUBLIC",
        githubUrl: "https://github.com/Charan-Venkatesh",
        tags: ["Cloud", "DevOps"],
        isFeatured: true,
        isPublished: true,
        companyName: "",
        clientName: "",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Engineering Projects & Evidence
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Authoritative project database. All additions and edits persist directly to EF Core / SQLite and update the public website instantly.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {notification && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Creation Modal / Inline Form */}
      {isCreating && (
        <div className="p-6 rounded-xl bg-white border border-blue-200 shadow-xl relative">
          <button
            onClick={() => setIsCreating(false)}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>

          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Create & Persist Engineering Project</span>
          </h2>

          <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Integrated Flight Safety Monitoring System (IFSMS)"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Parent Company / Experience</label>
                <select
                  value={newProject.experienceId || ""}
                  onChange={(e) => {
                    const expId = e.target.value;
                    const exp = experiences.find((x) => x.id === expId);
                    setNewProject({
                      ...newProject,
                      experienceId: expId || undefined,
                      companyName: exp ? exp.company : "",
                    });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                >
                  <option value="">Independent / Self-Directed</option>
                  {experiences.map((exp) => (
                    <option key={exp.id} value={exp.id}>
                      {exp.company} ({exp.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category</label>
                <input
                  type="text"
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  placeholder="e.g. Indian Navy / Defense, Cloud / DevOps, R&D"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Client Name</label>
                <input
                  type="text"
                  value={newProject.clientName || ""}
                  onChange={(e) => setNewProject({ ...newProject, clientName: e.target.value })}
                  placeholder="e.g. Indian Navy — INS 324 / Accenture"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Classification (Security)</label>
                <select
                  value={newProject.classification}
                  onChange={(e) => setNewProject({ ...newProject, classification: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                >
                  <option value="PUBLIC">PUBLIC (Full details displayed)</option>
                  <option value="LIMITED DETAILS">LIMITED DETAILS (Operational details restricted)</option>
                  <option value="PRIVATE">PRIVATE (Defense internal only)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Executive Summary</label>
              <textarea
                rows={2}
                required
                placeholder="High-level description of scope, challenge, and engineering contribution..."
                value={newProject.summary}
                onChange={(e) => setNewProject({ ...newProject, summary: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Problem / Challenge</label>
                <textarea
                  rows={2}
                  value={newProject.problem}
                  onChange={(e) => setNewProject({ ...newProject, problem: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Approach & Solution</label>
                <textarea
                  rows={2}
                  value={newProject.approach}
                  onChange={(e) => setNewProject({ ...newProject, approach: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Architecture</label>
                <textarea
                  rows={2}
                  value={newProject.architecture}
                  onChange={(e) => setNewProject({ ...newProject, architecture: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Candidate Contribution</label>
                <textarea
                  rows={2}
                  value={newProject.candidateContribution}
                  onChange={(e) => setNewProject({ ...newProject, candidateContribution: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Technologies</label>
                <input
                  type="text"
                  placeholder="e.g. React.js, FastAPI, Python, MySQL, RBAC"
                  value={newProject.technology}
                  onChange={(e) => setNewProject({ ...newProject, technology: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Python, FastAPI, Defense, RBAC"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6 pt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newProject.isPublished ?? true}
                  onChange={(e) => setNewProject({ ...newProject, isPublished: e.target.checked })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="font-semibold text-slate-700">Published to Public Website</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newProject.isFeatured ?? true}
                  onChange={(e) => setNewProject({ ...newProject, isFeatured: e.target.checked })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="font-semibold text-slate-700">Feature on Homepage (Top 3–4)</span>
              </label>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm"
              >
                Save Project to Database
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Table */}
      <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500 font-semibold bg-slate-50">
          <span>Persisted Database Projects ({projects.length})</span>
          <span>Click status pills to toggle Publish / Featured</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading projects from backend API...</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition"
              >
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900">{proj.title}</h3>

                    {/* Published Pill */}
                    <button
                      onClick={() => handleTogglePublished(proj)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition ${
                        proj.isPublished
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                          : "bg-amber-100 text-amber-700 border border-amber-300"
                      }`}
                      title="Click to toggle publish status"
                    >
                      {proj.isPublished ? "Live" : "Draft"}
                    </button>

                    {/* Classification Pill */}
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      {proj.classification || "PUBLIC"}
                    </span>

                    {/* Featured Star */}
                    <button
                      onClick={() => handleToggleFeatured(proj)}
                      className={`p-1 rounded text-xs transition ${
                        proj.isFeatured ? "text-amber-500" : "text-slate-300 hover:text-slate-400"
                      }`}
                      title={proj.isFeatured ? "Featured on Homepage" : "Not Featured"}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-500 mt-1 flex items-center space-x-2">
                    {proj.companyName && (
                      <span className="font-semibold text-blue-600 flex items-center space-x-1">
                        <Building className="w-3 h-3" />
                        <span>{proj.companyName}</span>
                      </span>
                    )}
                    {proj.clientName && (
                      <>
                        <span>•</span>
                        <span className="text-slate-600">{proj.clientName}</span>
                      </>
                    )}
                    <span>•</span>
                    <span>{proj.category}</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-1">{proj.summary}</p>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {proj.tags?.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => handleDelete(proj.id, proj.title)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                    title="Delete Project from Database"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
