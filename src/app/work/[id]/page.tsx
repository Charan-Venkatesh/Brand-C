import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Building, CheckCircle2, Layers, MessageCircle, Mail } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { CONTACT_EMAIL, SITE_URL, projects } from "@/data/portfolio";
import { whatsappUrl } from "@/lib/contact";
import { withBase } from "@/lib/utils";

// One statically generated, indexable page per project.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

type Props = { params: Promise<{ id: string }> };

const orgOf = (p: (typeof projects)[number]) =>
  [p.clientName, p.companyName && p.clientName ? `via ${p.companyName}` : p.companyName].filter(Boolean).join(" ");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = projects.find((x) => x.id === id);
  if (!p) return {};
  const org = orgOf(p);
  const title = `${p.title}${org ? ` — ${org}` : ""}`;
  const description = `${p.summary} ${p.approach} Built by Charan Venkatesh Gorle with ${p.technology}.`;
  return {
    title,
    description,
    alternates: { canonical: `work/${p.id}/` },
    openGraph: { type: "article", title, description, url: `work/${p.id}/`, images: [{ url: "og.jpg", width: 1200, height: 630 }] },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { id } = await params;
  const p = projects.find((x) => x.id === id);
  if (!p) notFound();
  const org = orgOf(p);
  const others = projects.filter((x) => x.id !== p.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: `${p.summary} ${p.problem} ${p.approach}`,
    url: `${SITE_URL}work/${p.id}/`,
    keywords: p.tags.join(", "),
    about: p.category,
    creator: { "@type": "Person", name: "Charan Venkatesh Gorle", url: SITE_URL },
    ...(p.clientName ? { sourceOrganization: { "@type": "Organization", name: p.clientName } } : {}),
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="flex-1">
        <article className="relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="aurora aurora-1" />
            <div className="dot-grid absolute inset-0" />
          </div>

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5">
              <a href={withBase("/")} className="hover:text-slate-900">Home</a>
              <span>/</span>
              <a href={withBase("/projects/")} className="hover:text-slate-900">Projects</a>
              <span>/</span>
              <span className="text-slate-700 truncate">{p.title}</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">{p.category}</span>
              {p.classification && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">{p.classification}</span>
              )}
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">{p.currentStatus}</span>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-black tracking-[-0.03em] leading-[1.05]">{p.title}</h1>
            {org && (
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-blue-700">
                <Building className="w-4 h-4" /> {org}
              </p>
            )}
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">{p.summary}</p>

            <div className="mt-10 grid gap-4">
              <section className="card-soft rounded-3xl p-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">The problem</h2>
                <p className="mt-2 text-base text-slate-700 leading-relaxed">{p.problem}</p>
              </section>
              <section className="card-soft rounded-3xl p-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">What I built</h2>
                <p className="mt-2 text-base text-slate-700 leading-relaxed">{p.approach}</p>
              </section>
              <section className="card-soft rounded-3xl p-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Technology</h2>
                <p className="mt-2 text-base font-semibold text-slate-900">{p.technology}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">{t}</span>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-10 rounded-[2rem] bg-brand text-white p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-2xl shadow-blue-600/25">
              <div>
                <div className="text-xl font-black">Need something like this built?</div>
                <div className="text-sm text-white/80 mt-1">Talk to Charan Venkatesh Gorle directly.</div>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={whatsappUrl(`Hi Charan, I read your ${p.title} case study and would like to talk.`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-white text-slate-900 hover:bg-slate-100 transition">
                  <MessageCircle className="w-4 h-4 text-emerald-600" /> WhatsApp
                </a>
                <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`About ${p.title}`)}`} className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-white/10 border border-white/30 hover:bg-white/20 transition">
                  <Mail className="w-4 h-4" /> Email
                </a>
              </div>
            </div>

            <section className="mt-14">
              <h2 className="flex items-center gap-2 text-lg font-black">
                <Layers className="w-5 h-5 text-blue-600" /> More case studies
              </h2>
              <div className="mt-4 grid gap-3">
                {others.map((o) => (
                  <a key={o.id} href={withBase(`/work/${o.id}/`)} className="group card-soft rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-blue-300 transition">
                    <span>
                      <span className="block text-sm font-bold text-slate-900">{o.title}</span>
                      <span className="block text-xs text-slate-500 mt-0.5">{o.summary}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 shrink-0 text-slate-300 group-hover:text-blue-600 transition" />
                  </a>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold">
                <a href={withBase("/projects/")} className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900">
                  <ArrowLeft className="w-4 h-4" /> All projects
                </a>
                <a href={withBase("/hire/")} className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-800">
                  <CheckCircle2 className="w-4 h-4" /> Hiring? 30-second summary
                </a>
              </div>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
