"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { HCCStore, EducationItem } from "@/lib/store";

export const EducationSection: React.FC = () => {
  const [educations, setEducations] = useState<EducationItem[]>([]);

  useEffect(() => {
    HCCStore.getOverview().then((data) => {
      if (data && data.educations && data.educations.length > 0) {
        setEducations(data.educations);
      }
    });
  }, []);

  const fallbackEducations = [
    {
      degree: "B.Tech",
      specialization: "Computer Science and Systems Engineering",
      institution: "Andhra University",
      startYear: "2021",
      endYear: "2025",
      description: "Foundational coursework in computer systems, operating systems, networking fundamentals, distributed computing, and database architecture.",
    },
    {
      degree: "Intermediate (12th Grade)",
      specialization: "MPC (Mathematics, Physics, Chemistry)",
      institution: "Board of Intermediate Education",
      startYear: "2019",
      endYear: "2021",
      description: "Higher secondary coursework with core specialization in mathematics and physics.",
    },
    {
      degree: "Secondary School Certificate (10th Grade)",
      specialization: "General Studies & Sciences",
      institution: "Sri Chaitanya Techno School, Bobbili",
      startYear: "2018",
      endYear: "2019",
      description: "Secondary schooling with distinction in science and mathematics fundamentals.",
    },
  ];

  const items = educations.length > 0 ? educations : fallbackEducations;

  return (
    <section id="education" className="py-14 border-b border-slate-200 bg-slate-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Education
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((edu, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {edu.startYear} – {edu.endYear}
                </span>
                <h3 className="font-bold text-sm text-slate-900 mt-2">{edu.degree}</h3>
                <div className="text-xs font-semibold text-blue-600 mt-0.5">{edu.specialization}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{edu.institution}</div>
              </div>
              <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
