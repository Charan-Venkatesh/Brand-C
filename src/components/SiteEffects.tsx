"use client";

import React, { useEffect, useState } from "react";

// Page-wide motion: a scroll progress bar and fade-in of sections as they enter view.
export const SiteEffects: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08 }
    );
    // Sections render asynchronously (data loads), so pick up new ones as they appear.
    const watch = () =>
      document.querySelectorAll("main section:not(.reveal)").forEach((el) => {
        el.classList.add("reveal");
        observer.observe(el);
      });
    watch();
    const mutations = new MutationObserver(watch);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 z-[60] h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500"
      style={{ width: `${progress * 100}%` }}
    />
  );
};

// Cycles through roles with a typewriter effect.
export const RoleTyper: React.FC<{ roles: string[] }> = ({ roles }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[index % roles.length];
    const done = !deleting && text === full;
    const cleared = deleting && text === "";
    const delay = done ? 1800 : deleting ? 35 : 70;
    const t = setTimeout(() => {
      if (done) setDeleting(true);
      else if (cleared) {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(full.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, roles]);

  return (
    <span>
      {text}
      <span className="inline-block w-0.5 h-[1em] -mb-0.5 ml-0.5 bg-blue-600 animate-pulse" />
    </span>
  );
};
