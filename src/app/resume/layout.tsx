import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Charan Venkatesh Gorle",
  description: "Resume of Charan Venkatesh Gorle, Cloud / DevOps / Observability engineer in Hyderabad, India.",
  alternates: { canonical: "resume/" },
  openGraph: { title: "Resume — Charan Venkatesh Gorle", description: "Resume of Charan Venkatesh Gorle, Cloud / DevOps / Observability engineer in Hyderabad, India.", url: "resume/", images: [{ url: "og.jpg", width: 1200, height: 630 }] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
