import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills — Linux, Python, FastAPI, React, OpenTelemetry, Power BI",
  description: "Technical skills of Charan Venkatesh Gorle: Linux, networking, Python, FastAPI, React, Node.js, SQL, Git, OpenTelemetry, Power BI, Grafana, RBAC and WhatsApp Business API.",
  alternates: { canonical: "skills/" },
  openGraph: { title: "Skills — Linux, Python, FastAPI, React, OpenTelemetry, Power BI", description: "Technical skills of Charan Venkatesh Gorle: Linux, networking, Python, FastAPI, React, Node.js, SQL, Git, OpenTelemetry, Power BI, Grafana, RBAC and WhatsApp Business API.", url: "skills/", images: [{ url: "og.jpg", width: 1200, height: 630 }] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
