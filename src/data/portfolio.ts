// Static portfolio content used when no backend API is configured
// (e.g. the GitHub Pages build). Edit this file to update the public site.
import type { CertificationItem, ExperienceItem, ProjectItem } from "@/lib/store";

export const CONTACT_EMAIL = "gorle.charanvenkatesh@gmail.com";

export const projects: ProjectItem[] = [
  {
    id: "agent-observability",
    title: "Enterprise AI-Agent Observability",
    category: "Observability",
    projectType: "Professional",
    companyName: "JoulestoWatts",
    clientName: "Accenture",
    classification: "Enterprise",
    summary:
      "Distributed tracing and dependency mapping for enterprise multi-agent AI workflows.",
    problem:
      "Failures in multi-agent call paths were hard to trace across services, slowing root-cause analysis.",
    approach:
      "Instrumented services with OpenTelemetry and built runtime dependency graphs in Neo4j to visualize call paths and failure propagation.",
    architecture: "",
    technology: "OpenTelemetry, Neo4j, Python",
    candidateContribution: "",
    outcome: "",
    currentStatus: "Active",
    tags: ["OpenTelemetry", "Neo4j", "Tracing", "RCA"],
    isFeatured: true,
  },
  {
    id: "ifsms",
    title: "Integrated Flight Safety Monitoring System (IFSMS)",
    category: "Defense Systems",
    projectType: "Professional",
    companyName: "Meghana Technologies",
    clientName: "Indian Navy · INS 324",
    classification: "Defense",
    summary:
      "Flight safety monitoring software for a naval aviation squadron.",
    problem:
      "The squadron needed a single system to track and monitor flight safety operations.",
    approach:
      "Designed the full-stack application and database architecture with a React.js frontend and FastAPI backend.",
    architecture: "",
    technology: "React.js, FastAPI, SQL",
    candidateContribution: "",
    outcome: "",
    currentStatus: "Delivered",
    tags: ["React", "FastAPI", "Full-stack"],
    isFeatured: true,
  },
  {
    id: "logistics-file-status",
    title: "Logistics File Status Management System",
    category: "Defense Systems",
    projectType: "Professional",
    companyName: "Meghana Technologies",
    clientName: "Indian Navy · INS DEGA",
    classification: "Defense",
    summary: "QR-based file tracking with role-based access for a naval base.",
    problem: "Physical logistics files were difficult to locate and audit across departments.",
    approach: "Built a tracking system using QR codes for file movement and RBAC for secure access.",
    architecture: "",
    technology: "QR tracking, RBAC, Web stack",
    candidateContribution: "",
    outcome: "",
    currentStatus: "Delivered",
    tags: ["QR", "RBAC", "Workflow"],
    isFeatured: true,
  },
  {
    id: "rdpms",
    title: "Remote Diagnostics & Predictive Maintenance (RDPMS)",
    category: "Data & Telemetry",
    projectType: "Professional",
    companyName: "Efftronics Systems",
    classification: "Industrial R&D",
    summary:
      "Telemetry validation and condition-monitoring dashboards for railway signaling infrastructure.",
    problem:
      "High-frequency sensor and log streams were noisy, making equipment health hard to assess.",
    approach:
      "Performed data validation, trend analysis and noise filtering, and built Power BI condition-monitoring dashboards.",
    architecture: "",
    technology: "Power BI, Python, Sensor telemetry",
    candidateContribution: "",
    outcome: "",
    currentStatus: "Delivered",
    tags: ["Power BI", "Telemetry", "Anomaly analysis"],
    isFeatured: true,
  },
  {
    id: "whatsapp-service-desk",
    title: "WhatsApp Service Desk Routing",
    category: "Automation",
    projectType: "Professional",
    companyName: "Meghana Technologies",
    clientName: "Indian Navy · INS Circars",
    classification: "Defense",
    summary: "Automated administrative service desk routing over WhatsApp.",
    problem: "Administrative requests were routed manually.",
    approach: "Automated request routing using the WhatsApp Business API.",
    architecture: "",
    technology: "WhatsApp Business API, Automation",
    candidateContribution: "",
    outcome: "",
    currentStatus: "Delivered",
    tags: ["Automation", "API"],
    isFeatured: false,
  },
];

export const experiences: ExperienceItem[] = [
  {
    id: "joulestowatts",
    company: "JoulestoWatts Business Solutions (Client: Accenture)",
    role: "AI-Agent Operations & Observability Engineer",
    employmentType: "Full-time",
    location: "Hyderabad, India",
    startDate: "2025-07",
    isCurrentRole: true,
    description:
      "Engineering enterprise AI-agent operations, OpenTelemetry distributed tracing, Neo4j dependency mapping, failure investigation, and root-cause analysis.",
    responsibilities: [
      "Instrumented services with OpenTelemetry for distributed trace collection and telemetry streaming.",
      "Constructed runtime dependency graphs in Neo4j to visualize multi-agent call paths and failure propagation.",
      "Diagnosed production exceptions, bottlenecks, and orchestration timeouts in enterprise AI-agent workflows.",
    ],
    achievements: [],
    technologies: ["OpenTelemetry", "Neo4j", "Python"],
    period: "July 2025 – Present",
  },
  {
    id: "meghana",
    company: "Meghana Technologies (Indian Navy Projects)",
    role: "System and Data Engineer",
    employmentType: "Full-time",
    location: "India",
    startDate: "2025-06",
    endDate: "2025-12",
    isCurrentRole: false,
    description:
      "Designed full-stack software and database architectures for naval operational systems across Indian Navy base stations.",
    responsibilities: [
      "Engineered Integrated Flight Safety Monitoring System (IFSMS) for naval aviation squadron INS 324 using React.js and FastAPI.",
      "Built Logistics File Status Management System with QR tracking and RBAC for INS DEGA naval base.",
      "Automated administrative service desk routing using WhatsApp Business API for INS Circars.",
    ],
    achievements: [],
    technologies: ["React.js", "FastAPI", "WhatsApp Business API"],
    period: "June 2025 – December 2025",
  },
  {
    id: "efftronics",
    company: "Efftronics Systems Pvt. Ltd.",
    role: "Research & Development Trainee (Data Analyst)",
    employmentType: "Internship",
    location: "India",
    startDate: "2024-12",
    endDate: "2025-06",
    isCurrentRole: false,
    description:
      "Worked on RDPMS (Remote Diagnostics & Predictive Maintenance System): sensor validation, anomaly analysis, and Power BI dashboards.",
    responsibilities: [
      "Analyzed high-frequency operational sensor and log telemetry for RDPMS.",
      "Performed data validation, trend analysis, and noise filtering on railway signaling infrastructure streams.",
      "Built interactive Power BI diagnostic condition-monitoring dashboards for engineering oversight.",
    ],
    achievements: [],
    technologies: ["Power BI", "Python", "Telemetry"],
    period: "December 2024 – June 2025",
  },
];

export const certifications: CertificationItem[] = [
  { id: "ms-fabric", name: "Fabric Data Engineer Associate", issuer: "Microsoft" },
  { id: "ms-ai900", name: "Azure AI Fundamentals", issuer: "Microsoft" },
  { id: "cisco-jca", name: "Junior Cybersecurity Analyst Career Path", issuer: "Cisco" },
  { id: "sap-sac", name: "Data Analyst – SAP Analytics Cloud", issuer: "SAP" },
  { id: "google-da", name: "Professional Data Analytics Certificate", issuer: "Google" },
];

export const staticOverview = {
  profile: null,
  careerPreference: null,
  projects,
  skills: [],
  experiences,
  certifications,
  achievements: [],
  education: null,
  educations: [],
  activeResume: null,
  media: [],
};
