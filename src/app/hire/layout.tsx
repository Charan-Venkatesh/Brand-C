import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire Charan Venkatesh Gorle — Cloud / DevOps & Systems Engineer, Hyderabad",
  description:
    "30-second summary for recruiters and startup founders: Cloud, DevOps and systems engineer in Hyderabad with three Indian Navy systems deployed, OpenTelemetry tracing, Python/FastAPI, React and Power BI. Call, WhatsApp or email directly.",
  openGraph: {
    title: "Hire Charan Venkatesh Gorle — 30-second summary",
    description: "Cloud / DevOps & systems engineer, Hyderabad. Three Indian Navy systems deployed. Contact in one tap.",
    images: [{ url: "og.jpg", width: 1200, height: 630 }],
  },
};

export default function HireLayout({ children }: { children: React.ReactNode }) {
  return children;
}
