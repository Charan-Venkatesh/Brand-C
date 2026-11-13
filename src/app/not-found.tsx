import { withBase } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white">
      <div className="text-7xl font-black text-gradient">404</div>
      <h1 className="mt-4 text-2xl font-black text-slate-900">This page doesn&apos;t exist</h1>
      <p className="mt-2 text-slate-500">The link may be old. Here&apos;s where you probably wanted to go:</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a href={withBase("/")} className="px-5 py-3 rounded-full text-sm font-bold bg-slate-900 text-white">Home</a>
        <a href={withBase("/projects/")} className="px-5 py-3 rounded-full text-sm font-semibold bg-white border border-slate-200 text-slate-700">Projects</a>
        <a href={withBase("/hire/")} className="px-5 py-3 rounded-full text-sm font-semibold bg-white border border-slate-200 text-slate-700">Hire Charan</a>
      </div>
    </main>
  );
}
