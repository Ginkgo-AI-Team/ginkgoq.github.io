const site = 'https://ginkgoq.github.io';

const staticRoutes = [
  '/',
  '/start-here/',
  '/blog/',
  '/research-notes/',
  '/about/',
  '/releases/',
  '/roadmap/',
];

export function GET() {
  const now = new Date().toISOString();
  const urls = staticRoutes.map((p) => ({ loc: `${site}${p}`, lastmod: now, changefreq: 'monthly', priority: p === '/' ? '1.0' : '0.6' }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`)
    .join('\n')}\n</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
