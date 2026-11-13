import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience — JoulestoWatts, Meghana Technologies, Efftronics, DharviX",
  description: "Work experience of Charan Venkatesh Gorle across enterprise AI-agent operations (Accenture client), Indian Navy software, railway predictive-maintenance R&D and business intelligence.",
  alternates: { canonical: "experience/" },
  openGraph: { title: "Experience — JoulestoWatts, Meghana Technologies, Efftronics, DharviX", description: "Work experience of Charan Venkatesh Gorle across enterprise AI-agent operations (Accenture client), Indian Navy software, railway predictive-maintenance R&D and business intelligence.", url: "experience/", images: [{ url: "og.jpg", width: 1200, height: 630 }] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
