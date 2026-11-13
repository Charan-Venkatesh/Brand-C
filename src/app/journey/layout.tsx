import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Journey — From Andhra University to Cloud & DevOps",
  description: "The career path of Charan Venkatesh Gorle: computer science foundation, drones and hackathons, Efftronics R&D, Indian Navy systems and enterprise observability.",
  alternates: { canonical: "journey/" },
  openGraph: { title: "Career Journey — From Andhra University to Cloud & DevOps", description: "The career path of Charan Venkatesh Gorle: computer science foundation, drones and hackathons, Efftronics R&D, Indian Navy systems and enterprise observability.", url: "journey/", images: [{ url: "og.jpg", width: 1200, height: 630 }] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
