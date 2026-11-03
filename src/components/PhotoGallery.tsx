"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery } from "@/data/portfolio";
import { withBase } from "@/lib/utils";

// Bento layout: the first photo is the large feature tile.
const tileClass = (i: number) =>
  i === 0
    ? "sm:col-span-2 sm:row-span-2"
    : [3, 6, 7, 8].includes(i)
      ? "sm:col-span-2"
      : "";

// Photo gallery driven by `gallery` in src/data/portfolio.ts; hidden when empty.
export const PhotoGallery: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + gallery.length) % gallery.length)),
    []
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  if (gallery.length === 0) return null;

  return (
    <section id="gallery" className="relative py-20 bg-white text-slate-900 overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="aurora aurora-2" style={{ top: "auto", bottom: -200, opacity: 0.2 }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-2">
              <Camera className="w-4 h-4" />
              <span>Beyond the Terminal</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Leading rooms, <span className="text-gradient">not just systems</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-slate-500">
            Founding a student club, running technical sessions, and showing the work to the people it serves.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 auto-rows-[220px] sm:auto-rows-[200px] gap-3">
          {gallery.map((g, i) => (
            <button
              key={g.src}
              onClick={() => setOpen(i)}
              className={`group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-100 text-left shadow-[0_12px_32px_-16px_rgb(var(--glow)/0.25)] ${tileClass(i)}`}
            >
              <img
                src={withBase(`/${g.src}`)}
                alt={g.caption}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-xs sm:text-sm font-semibold leading-snug text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
                {g.caption}
              </div>
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/0 group-hover:ring-sky-400/70 transition" />
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[70] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
          <button
            className="hidden sm:flex absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="hidden sm:flex absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <figure className="max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              key={open}
              src={withBase(`/${gallery[open].src}`)}
              alt={gallery[open].caption}
              className="max-h-[78vh] w-auto rounded-xl mx-auto shadow-2xl animate-[fadeIn_.35s_ease]"
            />
            <figcaption className="mt-4 text-center text-sm text-white">
              {gallery[open].caption}
              <span className="ml-2 text-white/60">
                {open + 1} / {gallery.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
};
