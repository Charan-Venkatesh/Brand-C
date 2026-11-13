import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Case Studies — Indian Navy, Observability, Automation",
  description: "Case studies by Charan Venkatesh Gorle: Integrated Flight Safety Monitoring System (INS 324), QR logistics tracking (INS DEGA), WhatsApp service-desk routing (INS Circars), RFID asset tracking, RDPMS telemetry and CADGen-AI.",
  alternates: { canonical: "projects/" },
  openGraph: { title: "Projects & Case Studies — Indian Navy, Observability, Automation", description: "Case studies by Charan Venkatesh Gorle: Integrated Flight Safety Monitoring System (INS 324), QR logistics tracking (INS DEGA), WhatsApp service-desk routing (INS Circars), RFID asset tracking, RDPMS telemetry and CADGen-AI.", url: "projects/", images: [{ url: "og.jpg", width: 1200, height: 630 }] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
