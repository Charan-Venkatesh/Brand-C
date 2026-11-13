import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteEffects } from "@/components/SiteEffects";
import { CommandPalette } from "@/components/CommandPalette";
import { FloatingWhatsApp } from "@/components/ContactSection";
import { CONTACT_EMAIL, CONTACT_PHONE_TEL, GITHUB_URL, GOOGLE_SITE_VERIFICATION, LINKEDIN_URL, SITE_URL } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DESCRIPTION =
  "Charan Venkatesh Gorle — Cloud, DevOps & Observability engineer. OpenTelemetry tracing for enterprise AI agents, software for Indian Navy operations, and telemetry analytics.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  verification: GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : undefined,
  title: { default: "Charan Venkatesh Gorle — Cloud / DevOps Engineer, Hyderabad", template: "%s | Charan Venkatesh Gorle" },
  description: DESCRIPTION,
  alternates: { canonical: "./" },
  authors: [{ name: "Charan Venkatesh Gorle", url: SITE_URL }],
  creator: "Charan Venkatesh Gorle",
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
        <FloatingWhatsApp />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${SITE_URL}#person`,
                  name: "Charan Venkatesh Gorle",
                  alternateName: ["Gorle Charan Venkatesh", "Charan Venkatesh"],
                  jobTitle: "Cloud / DevOps / Observability Engineer",
                  description: DESCRIPTION,
                  url: SITE_URL,
                  image: `${SITE_URL}photos/profile.webp`,
                  email: `mailto:${CONTACT_EMAIL}`,
                  telephone: CONTACT_PHONE_TEL,
                  address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
                  worksFor: { "@type": "Organization", name: "JoulestoWatts Business Solutions" },
                  alumniOf: { "@type": "CollegeOrUniversity", name: "Andhra University College of Engineering" },
                  knowsAbout: ["DevOps", "Cloud computing", "Site reliability engineering", "Observability", "OpenTelemetry", "Linux", "Python", "FastAPI", "React", "Power BI", "Grafana", "Role-based access control"],
                  sameAs: [LINKEDIN_URL, GITHUB_URL],
                },
                {
                  "@type": "ProfilePage",
                  "@id": `${SITE_URL}#profile`,
                  url: SITE_URL,
                  name: "Charan Venkatesh Gorle — Portfolio",
                  mainEntity: { "@id": `${SITE_URL}#person` },
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}#website`,
                  url: SITE_URL,
                  name: "Charan Venkatesh Gorle",
                  publisher: { "@id": `${SITE_URL}#person` },
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
