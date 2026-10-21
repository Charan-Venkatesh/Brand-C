"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Save, CheckCircle2, Sparkles, UserCheck } from "lucide-react";
import { HCCStore } from "@/lib/store";

export default function AdminStory() {
  const [headline, setHeadline] = useState("");
  const [shortStory, setShortStory] = useState("");
  const [longStory, setLongStory] = useState("");
  const [careerFocus, setCareerFocus] = useState("");
  const [currentDirection, setCurrentDirection] = useState("");
  const [featuredStatement, setFeaturedStatement] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    HCCStore.getStory().then((data) => {
      if (data) {
        setHeadline(data.storyHeadline || "");
        setShortStory(data.shortStory || "");
        setLongStory(data.longStory || "");
        setCareerFocus(data.careerFocus || "");
        setCurrentDirection(data.currentDirection || "");
        setFeaturedStatement(data.featuredStatement || "");
      }
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const ok = await HCCStore.updateStory({
      storyHeadline: headline,
      shortStory,
      longStory,
      careerFocus,
      currentDirection,
      featuredStatement,
    });
    setSaving(false);
    if (ok) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <span>My Story & Professional Narrative Editor</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Edit your authentic professional journey narrative without changing source code. Changes update the public homepage and about sections immediately.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Story narrative updated in database and live on public website!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs">
        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Story Headline
          </label>
          <input
            type="text"
            required
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
            placeholder="e.g. From Curiosity & Systems R&D to Enterprise Observability & Cloud Engineering"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-slate-700 font-semibold">
              Short Story (100–150 Words for Homepage)
            </label>
            <span className="text-[11px] text-slate-400">
              {shortStory.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <textarea
            rows={4}
            required
            value={shortStory}
            onChange={(e) => setShortStory(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none leading-relaxed"
            placeholder="I started with Computer Science and curiosity around AI, data, drones and software. Real-world engineering experiences took me from R&D and predictive maintenance..."
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Comprehensive Story Narrative (For About & Detailed Scans)
          </label>
          <textarea
            rows={6}
            required
            value={longStory}
            onChange={(e) => setLongStory(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Current Engineering Direction
            </label>
            <input
              type="text"
              required
              value={currentDirection}
              onChange={(e) => setCurrentDirection(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
              placeholder="Cloud / DevOps / Infrastructure / Observability / SRE"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Featured Tagline / Positioning Statement
            </label>
            <input
              type="text"
              required
              value={featuredStatement}
              onChange={(e) => setFeaturedStatement(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
              placeholder="Systems • Cloud • Automation • Observability"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Career Transition Focus
          </label>
          <textarea
            rows={2}
            value={careerFocus}
            onChange={(e) => setCareerFocus(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500 outline-none"
            placeholder="Moving from traditional support-oriented work toward engineering-focused Cloud, DevOps, SRE, Platform, and Infrastructure roles."
          />
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-200">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Story..." : "Save Story Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
