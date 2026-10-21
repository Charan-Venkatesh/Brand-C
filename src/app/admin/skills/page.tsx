"use client";

import React, { useState, useEffect } from "react";
import { Cpu, PlusCircle, Trash2, CheckCircle2 } from "lucide-react";
import { DEFAULT_MASTER_DATA, SkillItem } from "@/lib/store";

export default function AdminSkills() {
  const [skills, setSkills] = useState<SkillItem[]>(DEFAULT_MASTER_DATA.skills);
  const [newName, setNewName] = useState("");
  const [newCat, setNewCat] = useState("Cloud");
  const [newLevel, setNewLevel] = useState(4);
  const [newYears, setNewYears] = useState(2);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/skills")
      .then((r) => r.ok && r.json())
      .then((data) => data && data.length > 0 && setSkills(data))
      .catch(() => {});
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newSkill: SkillItem = {
      id: `s-${Date.now()}`,
      name: newName,
      categoryName: newCat,
      proficiencyLevel: newLevel,
      yearsOfExperience: newYears,
      isFeatured: true,
    };

    setSkills([newSkill, ...skills]);
    setNewName("");

    try {
      await fetch("http://localhost:5000/api/v1/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSkill),
      });
    } catch (err) {}
  };

  const handleDelete = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Technical Skills Inventory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage skills across Cloud, DevOps, Infrastructure, Programming, Testing, and Data.
          </p>
        </div>
      </div>

      <form onSubmit={handleAdd} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
        <h2 className="font-bold text-sm text-white flex items-center space-x-2">
          <PlusCircle className="w-4 h-4 text-cyan-400" />
          <span>Add Technical Skill</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Skill Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Terraform"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Category</label>
            <select
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
            >
              <option>Cloud</option>
              <option>DevOps / Infrastructure</option>
              <option>Programming</option>
              <option>Web / Application Technologies</option>
              <option>Data / Analytics</option>
              <option>Automation / Testing</option>
              <option>AI / Engineering Projects</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Proficiency (1-5)</label>
            <input
              type="number"
              min={1}
              max={5}
              value={newLevel}
              onChange={(e) => setNewLevel(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Years of Experience</label>
            <input
              type="number"
              min={0}
              max={15}
              value={newYears}
              onChange={(e) => setNewYears(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition shadow-md shadow-cyan-400/20"
          >
            Add Skill
          </button>
        </div>
      </form>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden divide-y divide-slate-800/80">
        {skills.map((skill) => (
          <div key={skill.id} className="p-4 flex items-center justify-between hover:bg-slate-800/20 text-xs">
            <div>
              <span className="font-bold text-white text-sm">{skill.name}</span>
              <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-slate-800 text-cyan-400 border border-slate-700">
                {skill.categoryName}
              </span>
              <span className="ml-2 text-slate-400 text-[11px]">{skill.yearsOfExperience} yrs exp</span>
            </div>
            <button
              onClick={() => handleDelete(skill.id)}
              className="p-1 rounded text-slate-500 hover:text-rose-400"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
