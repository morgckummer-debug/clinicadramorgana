import { writeFileSync } from "fs";
import { resolve } from "path";
import { exams } from "../src/data/exams";

const BASE_URL = "https://clinicadramorgana.lovable.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const today = new Date().toISOString().split("T")[0];

const entries: SitemapEntry[] = [
  { path: "/", lastmod: today, changefreq: "weekly", priority: "1.0" },
  { path: "/videos", changefreq: "monthly", priority: "0.7" },
  { path: "/agendar", changefreq: "monthly", priority: "0.7" },
  { path: "/pre-agendamento", changefreq: "monthly", priority: "0.7" },
  { path: "/preparo", changefreq: "monthly", priority: "0.7" },
  { path: "/como-chegar", changefreq: "monthly", priority: "0.6" },
  { path: "/falar-secretaria", changefreq: "monthly", priority: "0.6" },
];

// Dynamic exam pages
for (const exam of exams) {
  entries.push({
    path: `/exames/${exam.slug}`,
    changefreq: "monthly",
    priority: "0.8",
  });
}

// Legacy routes for SEO preservation
for (const exam of exams) {
  if (exam.legacySlug) {
    entries.push({
      path: exam.legacySlug,
      changefreq: "monthly",
      priority: "0.5",
    });
  }
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateSitemap(items: SitemapEntry[]) {
  const urls = items.map((e) => {
    const lines: (string | null)[] = [
      `  <url>`,
      `    <loc>${escapeXml(`${BASE_URL}${e.path}`)}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ];
    return lines.filter((l): l is string => l !== null).join("\n");
  });

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

const outputPath = resolve("public/sitemap.xml");
writeFileSync(outputPath, generateSitemap(entries));
console.log(`✅ sitemap.xml written (${entries.length} entries) → ${outputPath}`);
