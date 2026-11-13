// Replace every page of a static export with a redirect to the same path on another origin.
// Usage: node scripts/redirect-site.mjs <outDir> <targetOrigin> <oldBasePath>
import { readdirSync, statSync, writeFileSync, rmSync } from "node:fs";
import { join, relative, sep } from "node:path";

const [outDir, origin, oldBase = ""] = process.argv.slice(2);
if (!outDir || !origin) {
  console.error("usage: redirect-site.mjs <outDir> <targetOrigin> <oldBasePath>");
  process.exit(1);
}

const page = (target) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Moved to ${target}</title>
<link rel="canonical" href="${target}">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)} + location.search + location.hash)</script>
</head><body><p>This page moved to <a href="${target}">${target}</a>.</p></body></html>
`;

// 404 fallback: map any unknown old path to the same path on the new origin.
const notFound = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Moved</title>
<script>
  var p = location.pathname.replace(${JSON.stringify(oldBase)}, "") || "/";
  location.replace(${JSON.stringify(origin)} + p + location.search + location.hash);
</script></head><body><p>Moved to <a href="${origin}/">${origin}/</a>.</p></body></html>
`;

let count = 0;
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === "_next") rmSync(full, { recursive: true, force: true });
      else walk(full);
      continue;
    }
    // Keep search-engine ownership files; drop data the redirect site doesn't need.
    if (/^google[0-9a-f]+\.html$/.test(name)) continue;
    if (name.endsWith(".txt") && !/^[0-9a-f]{32}\.txt$/.test(name)) { rmSync(full); continue; }
    if (name === "sitemap.xml" || name === "robots.txt") { rmSync(full); continue; }
    if (!name.endsWith(".html")) continue;
    const rel = relative(outDir, full).split(sep).join("/");
    if (rel === "404.html") { writeFileSync(full, notFound); count++; continue; }
    const path = rel === "index.html" ? "/" : "/" + rel.replace(/index\.html$/, "").replace(/\.html$/, "/");
    writeFileSync(full, page(origin + path));
    count++;
  }
};
walk(outDir);
console.log(`redirect-site: ${count} pages now redirect to ${origin}`);
