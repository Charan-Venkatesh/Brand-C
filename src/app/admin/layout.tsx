import type { Metadata } from "next";
import { AdminShell } from "./AdminShell";

// Admin needs the backend; keep it out of search results on the public site.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
