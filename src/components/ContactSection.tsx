"use client";

import React, { useState } from "react";
import { Mail, Phone, MessageCircle, Download, Share2, Copy, Check, ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE, LINKEDIN_URL, SITE_URL } from "@/data/portfolio";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { withBase } from "@/lib/utils";

// LinkedIn's "in" mark (lucide has no brand icons).
export const LinkedInMark: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <span className={`inline-flex items-center justify-center rounded-[5px] bg-current ${className}`} aria-hidden>
    <span className="text-[0.62em] font-black leading-none text-white">in</span>
  </span>
);

const channels = [
  {
    label: "Email",
    value: (
      <>
        {CONTACT_EMAIL.split("@")[0]}
        <wbr />@{CONTACT_EMAIL.split("@")[1]}
      </>
    ) as React.ReactNode,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: <Mail className="w-5 h-5" />,
    tint: "bg-blue-100 text-blue-700",
  },
  {
    label: "Call",
    value: CONTACT_PHONE,
    href: telUrl,
    icon: <Phone className="w-5 h-5" />,
    tint: "bg-sky-100 text-sky-700",
  },
  {
    label: "WhatsApp",
    value: "Chat instantly",
    href: whatsappUrl(),
    icon: <MessageCircle className="w-5 h-5" />,
    tint: "bg-emerald-100 text-emerald-700",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "in/charan-venkatesh-gorle",
    href: LINKEDIN_URL,
    icon: <LinkedInMark className="w-5 h-5 text-[#0a66c2]" />,
    tint: "bg-sky-100 text-sky-700",
    external: true,
  },
];

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1600);
    });
  };

  const share = async () => {
    const data = { title: "Charan Venkatesh Gorle — Cloud / DevOps Engineer", url: SITE_URL };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch {
        // dismissed
      }
    } else copy(SITE_URL, "link");
  };

  return (
    <section id="contact" className="relative py-20 sm:py-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="aurora aurora-2" style={{ top: "auto", bottom: -260 }} />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Contact</div>
          <h2 className="mt-2 text-3xl sm:text-5xl font-black tracking-[-0.03em] text-slate-900">
            Pick a channel. <span className="text-gradient">I reply fast.</span>
          </h2>
          <p className="mt-3 text-base text-slate-500">
            Hiring, collaborating, or just want to talk systems — any of these reaches me directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Channels */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {channels.map((c) => (
              <div key={c.label} className="spotlight-card card-soft group relative rounded-3xl p-5 hover:-translate-y-1 transition duration-300">
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noreferrer" : undefined}
                  className="absolute inset-0 rounded-3xl"
                  aria-label={c.label}
                />
                <div className="flex items-start justify-between">
                  <span className={`w-11 h-11 rounded-2xl flex items-center justify-center ${c.tint}`}>{c.icon}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate-300 transition group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-5 text-sm font-semibold text-slate-500">{c.label}</div>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-base sm:text-lg font-bold text-slate-900 min-w-0">{c.value}</span>
                  {(c.label === "Email" || c.label === "Call") && (
                    <button
                      onClick={() => copy(c.label === "Email" ? CONTACT_EMAIL : CONTACT_PHONE, c.label)}
                      className="relative z-10 p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                      aria-label={`Copy ${c.label.toLowerCase()}`}
                    >
                      {copied === c.label ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Card for networking: QR, save contact, share */}
          <div className="lg:col-span-4 rounded-3xl bg-slate-900 text-white p-6 flex flex-col items-center text-center shadow-2xl shadow-blue-900/20">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">Scan to open</div>
            <div className="mt-4 p-3 rounded-2xl bg-white">
              <img src={withBase("/qr.png")} alt="QR code to this portfolio" className="w-36 h-36" />
            </div>
            <p className="mt-4 text-sm text-slate-300">Put it on your slides, visiting card or poster.</p>
            <div className="mt-5 w-full grid grid-cols-2 gap-2">
              <a
                href={withBase("/charan-venkatesh-gorle.vcf")}
                download
                className="inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-brand text-sm font-bold text-white hover:brightness-110 transition"
              >
                <Download className="w-4 h-4" /> Save contact
              </a>
              <button
                onClick={share}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-white/10 border border-white/20 text-sm font-semibold hover:bg-white/20 transition"
              >
                {copied === "link" ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                {copied === "link" ? "Copied" : "Share"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Floating WhatsApp shortcut, shown once the visitor scrolls past the hero.
export const FloatingWhatsApp: React.FC = () => {
  const [show, setShow] = useState(false);

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-5 right-5 z-40 group inline-flex items-center gap-2 h-12 pl-3.5 pr-4 rounded-full bg-emerald-600 text-white shadow-xl shadow-emerald-700/30 hover:bg-emerald-700 transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-bold">Chat</span>
    </a>
  );
};
