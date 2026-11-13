import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications — Microsoft, Google, Cisco, SAP",
  description: "Certifications of Charan Venkatesh Gorle: Microsoft Fabric Data Engineer Associate, Azure AI Fundamentals, Cisco Junior Cybersecurity Analyst, SAP Analytics Cloud and Google Data Analytics.",
  alternates: { canonical: "certifications/" },
  openGraph: { title: "Certifications — Microsoft, Google, Cisco, SAP", description: "Certifications of Charan Venkatesh Gorle: Microsoft Fabric Data Engineer Associate, Azure AI Fundamentals, Cisco Junior Cybersecurity Analyst, SAP Analytics Cloud and Google Data Analytics.", url: "certifications/", images: [{ url: "og.jpg", width: 1200, height: 630 }] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
