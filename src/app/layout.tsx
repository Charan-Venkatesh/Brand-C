import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteEffects } from "@/components/SiteEffects";
import { CommandPalette } from "@/components/CommandPalette";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://charan-venkatesh.github.io/Brand-C/";
const DESCRIPTION =
  "Charan Venkatesh Gorle — Cloud, DevOps & Observability engineer. OpenTelemetry tracing for enterprise AI agents, software for Indian Navy operations, and telemetry analytics.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Charan Venkatesh Gorle — Cloud / DevOps Engineer",
  description: DESCRIPTION,
  keywords: ["Charan Venkatesh Gorle", "DevOps", "Cloud", "SRE", "Observability", "OpenTelemetry", "Hyderabad"],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Charan Venkatesh Gorle — Calm systems. Clear signals.",
    description: DESCRIPTION,
    images: [{ url: "og.jpg", width: 1200, height: 630, alt: "Charan Venkatesh Gorle" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Charan Venkatesh Gorle — Cloud / DevOps Engineer",
    description: DESCRIPTION,
    images: ["og.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteEffects />
        <CommandPalette />
        {children}
      </body>
    </html>
  );
}
