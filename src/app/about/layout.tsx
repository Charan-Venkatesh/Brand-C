import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Charan — Cloud, DevOps & Systems Engineer",
  description: "Background of Charan Venkatesh Gorle: Computer Science & Systems Engineering (Andhra University), Indian Navy systems, Efftronics R&D and enterprise AI-agent operations at JoulestoWatts (Accenture client).",
  alternates: { canonical: "about/" },
  openGraph: { title: "About Charan — Cloud, DevOps & Systems Engineer", description: "Background of Charan Venkatesh Gorle: Computer Science & Systems Engineering (Andhra University), Indian Navy systems, Efftronics R&D and enterprise AI-agent operations at JoulestoWatts (Accenture client).", url: "about/", images: [{ url: "og.jpg", width: 1200, height: 630 }] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
