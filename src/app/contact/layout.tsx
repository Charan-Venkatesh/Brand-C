import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Email, Call or WhatsApp Charan",
  description: "Contact Charan Venkatesh Gorle: charanvenkateshgorle@gmail.com, +91 77807 60730 (call / WhatsApp), LinkedIn in/charan-venkatesh-gorle.",
  alternates: { canonical: "contact/" },
  openGraph: { title: "Contact — Email, Call or WhatsApp Charan", description: "Contact Charan Venkatesh Gorle: charanvenkateshgorle@gmail.com, +91 77807 60730 (call / WhatsApp), LinkedIn in/charan-venkatesh-gorle.", url: "contact/", images: [{ url: "og.jpg", width: 1200, height: 630 }] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
