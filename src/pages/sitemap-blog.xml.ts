import { getCollection } from 'astro:content';

const site = 'https://ginkgoq.github.io';

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const urls = posts.map((post) => {
    const slug = `/blog/${post.id.replace(/\.mdx?$/, '')}/`;
    const lastmod = (post.data.updated ?? post.data.date).toISOString();
    const priority = post.data.featured ? '0.9' : '0.65';
    return { loc: `${site}${slug}`, lastmod, priority };
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`)
    .join('\n')}\n</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
