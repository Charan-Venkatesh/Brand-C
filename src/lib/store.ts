"use client";

const API_BASE = "http://localhost:5000/api/v1";

export interface ProfileData {
  fullName: string;
  currentLocation: string;
  targetMarket: string;
  workPreference: string;
  primaryPositioning: string;
  headline: string;
  tagline: string;
  summary: string;
  bio?: string;
  contactEmail: string;
  contactPhone?: string;
  linkedInUrl?: string;
  gitHubUrl?: string;
  websiteUrl?: string;
  resumeCtaText: string;
  recruiterCtaText: string;
  heroPhotoUrl?: string;
  primaryPhotoUrl?: string;
  storyHeadline?: string;
  shortStory?: string;
  longStory?: string;
  careerFocus?: string;
  currentDirection?: string;
  featuredStatement?: string;
}

export interface CareerPreferenceData {
  targetRoles: string[];
  preferredLocations: string[];
  remotePreference: string;
  employmentType: string;
  availability: string;
  careerFocus: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug?: string;
  category: string;
  summary: string;
  problem: string;
  approach: string;
  architecture: string;
  technology: string;
  candidateContribution: string;
  outcome: string;
  currentStatus: string;
  projectType: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  projectImageUrl?: string;
  tags: string[];
  tagsJson?: string;
  isFeatured: boolean;
  isPublished?: boolean;
  displayOrder?: number;
  experienceId?: string;
  companyName?: string;
  clientName?: string;
  classification?: string;
  whatWasIt?: string;
  whyDidItMatter?: string;
  whatDidIDo?: string;
  whatDidILearn?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  categoryName: string;
  proficiencyLevel: number;
  yearsOfExperience: number;
  isFeatured: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrentRole: boolean;
  category?: string;
  description: string;
  context?: string;
  whatIWorkedOn?: string;
  whatIContributed?: string;
  whatILearned?: string;
  responsibilities: string[];
  responsibilitiesJson?: string;
  achievements: string[];
  achievementsJson?: string;
  technologies: string[];
  technologiesJson?: string;
  projects?: ProjectItem[];
  displayOrder?: number;
  period?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateImageUrl?: string;
  isPublished?: boolean;
  displayOrder?: number;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  evidenceUrl?: string;
  imageUrl?: string;
  displayOrder?: number;
}

export interface EducationItem {
  id: string;
  degree: string;
  specialization: string;
  institution: string;
  startYear: string;
  endYear: string;
  description: string;
  gradeOrScore?: string;
  displayOrder?: number;
}

export interface MediaItem {
  id: string;
  fileName: string;
  publicUrl: string;
  contentType: string;
  fileSizeBytes: number;
  altText: string;
  category: string;
  classification: string;
  isPrimary: boolean;
  isHero: boolean;
  isFeatured: boolean;
  displayOrder?: number;
}

export interface ResumeVersion {
  id: string;
  versionLabel: string;
  targetRole: string;
  category?: string;
  fileName: string;
  fileSizeBytes: number;
  fileSize?: string;
  uploadedAt?: string;
  downloadCount: number;
  isActive: boolean;
}

export interface PublicationSnapshot {
  id: string;
  version: number;
  publishedAt: string;
  releaseNotes: string;
  isCurrent: boolean;
  notes?: string;
  summary?: string;
}

export interface ContactInquiry {
  id: string;
  senderName: string;
  senderEmail: string;
  companyName: string;
  roleInterestedIn: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  name?: string;
  email?: string;
  company?: string;
  submittedAt?: string;
  roleInterest?: string;
}

export const HCCStore = {
  getOverview: async () => {
    try {
      const res = await fetch(`${API_BASE}/public/overview`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        return {
          profile: data.profile,
          careerPreference: data.careerPreference
            ? {
                targetRoles: JSON.parse(data.careerPreference.targetRolesJson || "[]"),
                preferredLocations: JSON.parse(data.careerPreference.preferredLocationsJson || "[]"),
                remotePreference: data.careerPreference.remotePreference,
                employmentType: data.careerPreference.employmentType,
                availability: data.careerPreference.availability,
                careerFocus: data.careerPreference.careerFocus,
              }
            : null,
          projects: (data.projects || []).map((p: any) => ({
            ...p,
            tags: typeof p.tagsJson === "string" ? JSON.parse(p.tagsJson || "[]") : p.tags || [],
          })),
          skills: data.skills || [],
          experiences: (data.experiences || []).map((e: any) => ({
            ...e,
            responsibilities: typeof e.responsibilitiesJson === "string" ? JSON.parse(e.responsibilitiesJson || "[]") : e.responsibilities || [],
            achievements: typeof e.achievementsJson === "string" ? JSON.parse(e.achievementsJson || "[]") : e.achievements || [],
            technologies: typeof e.technologiesJson === "string" ? JSON.parse(e.technologiesJson || "[]") : e.technologies || [],
            projects: (e.projects || []).map((p: any) => ({
              ...p,
              tags: typeof p.tagsJson === "string" ? JSON.parse(p.tagsJson || "[]") : p.tags || [],
            })),
          })),
          certifications: data.certifications || [],
          achievements: data.achievements || [],
          education: data.education,
          educations: data.educations || [],
          activeResume: data.activeResume,
          media: data.media || [],
        };
      }
    } catch (e) {
      console.warn("API overview fetch error:", e);
    }
    return null;
  },

  // 1. Projects Real CRUD
  getProjects: async (all = false): Promise<ProjectItem[]> => {
    try {
      const res = await fetch(`${API_BASE}/projects?all=${all}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        return data.map((p: any) => ({
          ...p,
          tags: typeof p.tagsJson === "string" ? JSON.parse(p.tagsJson || "[]") : p.tags || [],
        }));
      }
    } catch (e) {
      console.warn("Failed to fetch projects from API:", e);
    }
    return [];
  },

  createProject: async (project: Partial<ProjectItem>): Promise<ProjectItem | null> => {
    try {
      const payload = {
        ...project,
        tagsJson: JSON.stringify(project.tags || []),
      };
      const res = await fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const created = await res.json();
        return {
          ...created,
          tags: typeof created.tagsJson === "string" ? JSON.parse(created.tagsJson || "[]") : created.tags || [],
        };
      }
    } catch (e) {
      console.error("Error creating project:", e);
    }
    return null;
  },

  updateProject: async (id: string, project: Partial<ProjectItem>): Promise<boolean> => {
    try {
      const payload = {
        ...project,
        tagsJson: JSON.stringify(project.tags || []),
      };
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch (e) {
      console.error("Error updating project:", e);
      return false;
    }
  },

  deleteProject: async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, { method: "DELETE" });
      return res.ok;
    } catch (e) {
      console.error("Error deleting project:", e);
      return false;
    }
  },

  // 2. Story Management
  getStory: async () => {
    try {
      const res = await fetch(`${API_BASE}/story`, { cache: "no-store" });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Failed to fetch story:", e);
    }
    return null;
  },

  updateStory: async (story: {
    storyHeadline: string;
    shortStory: string;
    longStory: string;
    careerFocus: string;
    currentDirection: string;
    featuredStatement: string;
  }) => {
    try {
      const res = await fetch(`${API_BASE}/story`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(story),
      });
      return res.ok;
    } catch (e) {
      console.error("Error updating story:", e);
      return false;
    }
  },

  // 3. Media & Photo Management
  getMedia: async (): Promise<MediaItem[]> => {
    try {
      const res = await fetch(`${API_BASE}/media`, { cache: "no-store" });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Failed to fetch media:", e);
    }
    return [];
  },

  uploadMedia: async (formData: FormData): Promise<MediaItem | null> => {
    try {
      const res = await fetch(`${API_BASE}/media/upload`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.error("Error uploading media:", e);
    }
    return null;
  },

  setHeroMedia: async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/media/${id}/set-hero`, { method: "PUT" });
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  setPrimaryMedia: async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/media/${id}/set-primary`, { method: "PUT" });
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  deleteMedia: async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/media/${id}`, { method: "DELETE" });
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  // 4. Experiences Management
  getExperiences: async (): Promise<ExperienceItem[]> => {
    try {
      const res = await fetch(`${API_BASE}/experience`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        return data.map((e: any) => ({
          ...e,
          responsibilities: typeof e.responsibilitiesJson === "string" ? JSON.parse(e.responsibilitiesJson || "[]") : e.responsibilities || [],
          achievements: typeof e.achievementsJson === "string" ? JSON.parse(e.achievementsJson || "[]") : e.achievements || [],
          technologies: typeof e.technologiesJson === "string" ? JSON.parse(e.technologiesJson || "[]") : e.technologies || [],
          projects: (e.projects || []).map((p: any) => ({
            ...p,
            tags: typeof p.tagsJson === "string" ? JSON.parse(p.tagsJson || "[]") : p.tags || [],
          })),
        }));
      }
    } catch (e) {
      console.warn("Failed to fetch experiences:", e);
    }
    return [];
  },

  createExperience: async (exp: Partial<ExperienceItem>): Promise<ExperienceItem | null> => {
    try {
      const payload = {
        ...exp,
        responsibilitiesJson: JSON.stringify(exp.responsibilities || []),
        achievementsJson: JSON.stringify(exp.achievements || []),
        technologiesJson: JSON.stringify(exp.technologies || []),
      };
      const res = await fetch(`${API_BASE}/experience`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.error("Error creating experience:", e);
    }
    return null;
  },

  // 5. Certifications Management
  getCertifications: async (): Promise<CertificationItem[]> => {
    try {
      const res = await fetch(`${API_BASE}/certifications`, { cache: "no-store" });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Failed to fetch certifications:", e);
    }
    return [];
  },

  createCertification: async (cert: Partial<CertificationItem>): Promise<CertificationItem | null> => {
    try {
      const res = await fetch(`${API_BASE}/certifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cert),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.error("Error creating certification:", e);
    }
    return null;
  },

  // 6. Resumes Management
  getResumes: async (): Promise<ResumeVersion[]> => {
    try {
      const res = await fetch(`${API_BASE}/resumes`, { cache: "no-store" });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Failed to fetch resumes:", e);
    }
    return [];
  },

  activateResume: async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/resumes/${id}/activate`, { method: "PUT" });
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  downloadActiveResume: async () => {
    try {
      const res = await fetch(`${API_BASE}/resumes/active/download`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Resume download counter API error:", e);
    }
    return { success: true, fileName: "Charan_Venkatesh_Cloud_DevOps_Resume.pdf" };
  },

  // 7. Recruiter Inquiries
  getInquiries: async (): Promise<ContactInquiry[]> => {
    try {
      const res = await fetch(`${API_BASE}/inquiries`, { cache: "no-store" });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Failed to fetch inquiries:", e);
    }
    return [];
  },

  markInquiryRead: async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/inquiries/${id}/read`, { method: "PUT" });
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  submitInquiry: async (inquiry: {
    senderName: string;
    senderEmail: string;
    companyName: string;
    roleInterestedIn: string;
    message: string;
  }) => {
    try {
      const res = await fetch(`${API_BASE}/contact/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("API submission error:", e);
    }
    return { success: true, message: "Inquiry received." };
  },

  // 8. Snapshots & Publishing
  getSnapshots: async (): Promise<PublicationSnapshot[]> => {
    try {
      const res = await fetch(`${API_BASE}/publishing/history`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        return data.map((d: any) => ({
          id: d.id,
          version: d.versionNumber,
          publishedAt: d.publishedAt,
          releaseNotes: d.releaseNotes,
          notes: d.releaseNotes,
          isCurrent: true,
        }));
      }
    } catch (e) {
      console.warn("Failed to fetch publication history:", e);
    }
    return [];
  },

  publishSnapshot: async (releaseNotes: string): Promise<PublicationSnapshot | null> => {
    try {
      const res = await fetch(`${API_BASE}/publishing/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: releaseNotes }),
      });
      if (res.ok) {
        const data = await res.json();
        return {
          id: `pub-${data.version}`,
          version: data.version,
          publishedAt: data.publishedAt,
          releaseNotes,
          notes: releaseNotes,
          isCurrent: true,
        };
      }
    } catch (e) {
      console.error("Error publishing snapshot:", e);
    }
    return null;
  },
};

export const DEFAULT_MASTER_DATA = {
  profile: {
    fullName: "Charan Venkatesh Gorle",
    currentLocation: "Hyderabad, India",
    targetMarket: "India / Global Remote",
    workPreference: "Hybrid / Remote / On-Site",
    primaryPositioning: "Cloud / DevOps Engineer & Observability Specialist",
    headline: "Cloud & DevOps Engineer | Enterprise AI-Agent Observability | Defense Systems",
    tagline: "Specializing in Cloud Platforms, Observability Pipelines, Infrastructure Automation, and High-Reliability Systems.",
    summary: "DevOps & Cloud Engineer with direct engineering impact spanning Enterprise AI-agent observability telemetry at Accenture (via JoulestoWatts) and mission-critical Indian Navy automation systems at Meghana Technologies. Experienced in Docker, Kubernetes, CI/CD, OpenTelemetry, Neo4j, Python, and Linux infrastructure.",
    bio: "Focused on reliable cloud infrastructure, telemetry context propagation, and resilient operations.",
    contactEmail: "gorlecharanvenkatesh@gmail.com",
    contactPhone: "+91-9392476567",
    linkedInUrl: "https://www.linkedin.com/in/charan-venkatesh-gorle",
    gitHubUrl: "https://github.com/Charan-Venkatesh",
    websiteUrl: "https://charanvenkatesh.dev",
    resumeCtaText: "Download Verified Resume",
    recruiterCtaText: "Contact Directly",
    heroPhotoUrl: "/uploads/charan-headshot.jpg",
    primaryPhotoUrl: "/uploads/charan-headshot.jpg",
    storyHeadline: "Engineering for Real-World Reliability",
    shortStory: "My engineering path is rooted in systems that cannot afford failure: from sensor validation and predictive telemetry at Efftronics, to defense workflow automation for Indian Navy establishments at Meghana Technologies, to production AI-agent observability at Accenture.",
    longStory: "I started in Electronics and Communication Engineering at Andhra University, where I built a deep appreciation for systems architecture, real-time protocols, and hardware-software interfaces. During my trainee stint at Efftronics, I worked on the Remote Condition Monitoring System (RDPMS), processing multi-sensor telemetry data. At Meghana Technologies, I engineered high-integrity digital workflow automation systems for Indian Navy naval stations, maintaining rigorous operational security and auditability. Today at Accenture (via JoulestoWatts), I focus on enterprise observability for autonomous AI-agent workflows using OpenTelemetry and Neo4j.",
    careerFocus: "Cloud Infrastructure, Kubernetes, CI/CD, Observability, and Resilient Automation",
    currentDirection: "Advancing enterprise platform engineering, telemetry context propagation, and scalable cloud systems.",
    featuredStatement: "Engineering high-reliability cloud platforms and observability pipelines.",
  },
  careerPreference: {
    targetRoles: [
      "Cloud Engineer",
      "DevOps Engineer",
      "Site Reliability Engineer (SRE)",
      "Infrastructure Engineer",
      "Platform / Observability Engineer"
    ],
    preferredLocations: ["Hyderabad", "Bengaluru", "Remote"],
    remotePreference: "Hybrid / Remote / On-Site",
    employmentType: "Full-Time",
    availability: "Immediate to 30 Days",
    careerFocus: "Cloud Infrastructure, Kubernetes, CI/CD, Observability, and Resilient Automation",
  },
  skills: [
    { id: "1", name: "Docker", categoryName: "Cloud & DevOps", proficiencyLevel: 5, yearsOfExperience: 2, isFeatured: true },
    { id: "2", name: "Kubernetes", categoryName: "Cloud & DevOps", proficiencyLevel: 4, yearsOfExperience: 2, isFeatured: true },
    { id: "3", name: "CI/CD (GitHub Actions)", categoryName: "Cloud & DevOps", proficiencyLevel: 5, yearsOfExperience: 2, isFeatured: true },
    { id: "4", name: "OpenTelemetry", categoryName: "Observability", proficiencyLevel: 5, yearsOfExperience: 1, isFeatured: true },
    { id: "5", name: "Neo4j", categoryName: "Observability", proficiencyLevel: 4, yearsOfExperience: 1, isFeatured: true },
    { id: "6", name: "Linux / Shell Scripting", categoryName: "Infrastructure", proficiencyLevel: 5, yearsOfExperience: 3, isFeatured: true },
    { id: "7", name: "Python", categoryName: "Languages", proficiencyLevel: 5, yearsOfExperience: 3, isFeatured: true },
    { id: "8", name: "TypeScript / Node.js", categoryName: "Languages", proficiencyLevel: 4, yearsOfExperience: 2, isFeatured: false },
    { id: "9", name: "FastAPI / REST APIs", categoryName: "Backend", proficiencyLevel: 4, yearsOfExperience: 2, isFeatured: false },
    { id: "10", name: "PostgreSQL / MySQL", categoryName: "Databases", proficiencyLevel: 4, yearsOfExperience: 2, isFeatured: false },
  ]
};
