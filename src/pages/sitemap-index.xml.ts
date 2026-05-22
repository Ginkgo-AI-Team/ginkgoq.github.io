import { getCollection } from 'astro:content';

export async function GET() {
  const site = 'https://ginkgoq.github.io';

  // Get latest modification times for index
  const blog = await getCollection('blog', ({ data }) => !data.draft);
  const research = await getCollection('research', ({ data }) => !data.draft);
  const latestPost = [...blog, ...research].sort((a, b) => ((b.data.updated ?? b.data.date).getTime() - (a.data.updated ?? a.data.date).getTime()))[0];
  const lastmod = latestPost ? (latestPost.data.updated ?? latestPost.data.date).toISOString() : new Date().toISOString();

  const sitemaps = [
    { loc: `${site}/sitemap-pages.xml` },
    { loc: `${site}/sitemap-blog.xml` },
    { loc: `${site}/sitemap-research.xml` },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps
    .map((s) => `  <sitemap>\n    <loc>${s.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`)
    .join('\n')}\n</sitemapindex>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
