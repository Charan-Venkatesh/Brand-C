"use client";

import React, { useEffect, useRef } from "react";

interface Globe3DProps {
  className?: string;
  /** "light" draws blue on white; "dark" draws white on a colored background. */
  tone?: "light" | "dark";
  points?: number;
}

// A rotating 3D network sphere: nodes on a Fibonacci sphere, links to nearest
// neighbours, and signal pulses travelling along links — a service graph in 3D.
export const Globe3D: React.FC<Globe3DProps> = ({ className = "", tone = "light", points = 170 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const node = tone === "light" ? [37, 99, 235] : [255, 255, 255];
    const link = tone === "light" ? [96, 165, 250] : [191, 219, 254];
    const pulseColor = tone === "light" ? [14, 165, 233] : [255, 255, 255];

    // Fibonacci sphere
    const pts: [number, number, number][] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < points; i++) {
      const y = 1 - (i / (points - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
    }
    // Links: each node to its 3 nearest neighbours
    const edges: [number, number][] = [];
    const seen = new Set<string>();
    pts.forEach((p, i) => {
      const near = pts
        .map((q, j) => [j, (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2] as const)
        .filter(([j]) => j !== i)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 3);
      near.forEach(([j]) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([i, j]);
        }
      });
    });
    const pulses = Array.from({ length: 14 }, () => ({
      e: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      v: 0.006 + Math.random() * 0.01,
    }));

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let rotY = 0;
    let tiltX = -0.35, targetTiltX = -0.35, tiltY = 0, targetTiltY = 0;
    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      targetTiltY = ((e.clientX - (r.left + r.width / 2)) / window.innerWidth) * 0.8;
      targetTiltX = -0.35 + ((e.clientY - (r.top + r.height / 2)) / window.innerHeight) * 0.5;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(canvas);

    const project = (p: [number, number, number], R: number) => {
      const cy = Math.cos(rotY + tiltY), sy = Math.sin(rotY + tiltY);
      let x = p[0] * cy - p[2] * sy;
      let z = p[0] * sy + p[2] * cy;
      const cx = Math.cos(tiltX), sx = Math.sin(tiltX);
      const y = p[1] * cx - z * sx;
      z = p[1] * sx + z * cx;
      const persp = 2.6 / (2.6 - z);
      return { x: w / 2 + x * R * persp, y: h / 2 + y * R * persp, z, s: persp };
    };

    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      if (!reduce) rotY += 0.0025;
      tiltX += (targetTiltX - tiltX) * 0.04;
      tiltY += (targetTiltY - tiltY) * 0.04;

      const R = Math.min(w, h) * 0.42;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const P = pts.map((p) => project(p, R));

      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        const z = (P[a].z + P[b].z) / 2;
        const alpha = 0.06 + ((z + 1) / 2) * 0.32;
        ctx.strokeStyle = `rgba(${link[0]},${link[1]},${link[2]},${alpha})`;
        ctx.beginPath();
        ctx.moveTo(P[a].x, P[a].y);
        ctx.lineTo(P[b].x, P[b].y);
        ctx.stroke();
      }
      for (const p of P) {
        const front = (p.z + 1) / 2;
        ctx.fillStyle = `rgba(${node[0]},${node[1]},${node[2]},${0.2 + front * 0.75})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (0.8 + front * 1.8) * p.s, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const pu of pulses) {
        if (!reduce) pu.t += pu.v;
        if (pu.t > 1) {
          pu.t = 0;
          pu.e = Math.floor(Math.random() * edges.length);
        }
        const [a, b] = edges[pu.e];
        const x = P[a].x + (P[b].x - P[a].x) * pu.t;
        const y = P[a].y + (P[b].y - P[a].y) * pu.t;
        const front = ((P[a].z + P[b].z) / 2 + 1) / 2;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
        g.addColorStop(0, `rgba(${pulseColor[0]},${pulseColor[1]},${pulseColor[2]},${0.4 + front * 0.6})`);
        g.addColorStop(1, `rgba(${pulseColor[0]},${pulseColor[1]},${pulseColor[2]},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, [tone, points]);

  return <canvas ref={canvasRef} aria-hidden className={`block ${className}`} />;
};
