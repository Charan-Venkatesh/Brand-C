"use client";

import React, { useEffect, useState } from "react";
import { Camera, X } from "lucide-react";
import { gallery } from "@/data/portfolio";
import { withBase } from "@/lib/utils";

// Photo gallery driven by `gallery` in src/data/portfolio.ts; hidden when empty.
export const PhotoGallery: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (gallery.length === 0) return null;

  return (
    <section id="gallery" className="py-16 border-b border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5">
            <Camera className="w-4 h-4" />
            <span>Beyond the Terminal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Moments & Milestones
          </h2>
        </div>

        <div className="columns-2 md:columns-3 gap-4 [&>*]:mb-4">
          {gallery.map((g, i) => (
            <button
              key={g.src}
              onClick={() => setOpen(i)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
            >
              <img
                src={withBase(`/${g.src}`)}
                alt={g.caption}
                loading="lazy"
                className="w-full h-auto transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 text-left text-xs font-semibold text-white bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition">
                {g.caption}
              </div>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
          <figure className="max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={withBase(`/${gallery[open].src}`)}
              alt={gallery[open].caption}
              className="max-h-[80vh] w-auto rounded-xl mx-auto"
            />
            <figcaption className="mt-3 text-center text-sm text-slate-200">{gallery[open].caption}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
};
