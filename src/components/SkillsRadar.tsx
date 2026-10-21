"use client";

import React, { useState } from "react";
import { Cloud, Server, Code, Database, Zap, Cpu } from "lucide-react";

export const SkillsRadar: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Cloud & Infrastructure");

  const skillGroups = [
    {
      category: "Cloud & Infrastructure",
      icon: Cloud,
      skills: [
        { name: "AWS (EC2, S3, RDS, Lambda)", level: 4, years: 2, detail: "Cloud compute, object storage, serverless handlers, relational instances" },
        { name: "Linux / Ubuntu Administration", level: 5, years: 3, detail: "CLI, shell automation, user permissions, networking & process management" },
        { name: "Docker & Docker Compose", level: 4, years: 2, detail: "Containerization, multi-service local stacks, environment reproducibility" },
        { name: "Jenkins & CI/CD Pipelines", level: 4, years: 2, detail: "Automated test runs, build triggers, artifact promotion workflows" },
        { name: "Networking Fundamentals", level: 4, years: 3, detail: "TCP/IP, DNS, subnets, routing, ports, secure shell (SSH)" },
      ],
    },
    {
      category: "Programming & Web",
      icon: Code,
      skills: [
        { name: "Python", level: 4, years: 3, detail: "Automation scripts, backend services, data transformation, LLM pipelines" },
        { name: "SQL", level: 4, years: 3, detail: "Relational queries, joins, aggregation, schema structure, data filtering" },
        { name: "FastAPI & Flask", level: 4, years: 2, detail: "REST APIs, asynchronous request handling, schema validation" },
        { name: "TypeScript & JavaScript", level: 4, years: 2, detail: "Playwright automation scripts, frontend application logic" },
        { name: "React & Angular", level: 3, years: 2, detail: "Component architecture, state management, responsive UI development" },
      ],
    },
    {
      category: "Automation, Data & AI",
      icon: Zap,
      skills: [
        { name: "Playwright Automation", level: 4, years: 2, detail: "End-to-end browser automation, Page Object Model, test reporting" },
        { name: "ServiceNow Automation", level: 4, years: 2, detail: "Enterprise ticketing workflow automation, incident lifecycle testing" },
        { name: "Power BI & Analytics", level: 4, years: 2, detail: "DAX calculations, interactive reporting dashboards, trend visualizations" },
        { name: "RAG & LLM Workflows", level: 4, years: 1, detail: "Sentence Transformers, LangChain, LangGraph stateful agent graphs" },
        { name: "PostgreSQL & MySQL", level: 4, years: 2, detail: "Table indexing, relational data persistence, analytical queries" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-14 border-b border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-widest mb-1.5">
              <Cpu className="w-4 h-4" />
              <span>Technical Skills Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Verified Technical Capabilities
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {skillGroups.map((g) => (
              <button
                key={g.category}
                onClick={() => setActiveCategory(g.category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeCategory === g.category
                    ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/40"
                    : "text-slate-400 hover:text-slate-200 border border-transparent"
                }`}
              >
                {g.category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups
            .find((g) => g.category === activeCategory)
            ?.skills.map((skill, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{skill.name}</span>
                  <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
                    {skill.years} Yrs
                  </span>
                </div>

                {/* Rating Bar */}
                <div className="mt-3 flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className={`h-1.5 flex-1 rounded-full ${
                        star <= skill.level ? "bg-cyan-400" : "bg-slate-800"
                      }`}
                    />
                  ))}
                </div>

                <p className="mt-2.5 text-xs text-slate-400 leading-relaxed">
                  {skill.detail}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
