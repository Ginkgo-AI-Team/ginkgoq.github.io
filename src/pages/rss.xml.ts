import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const blogPosts = await getCollection("blog", ({ data }) => !data.draft);
  const researchPosts = await getCollection("research", ({ data }) => !data.draft);

  const posts = [...blogPosts, ...researchPosts].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: "GinkgoQ",
    description: "Technical writing on AI systems, domain intelligence, speech AI, RAG, agents, datasets, models, and production AI infrastructure.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${post.collection === "research" ? "research-notes" : "blog"}/${post.id.replace(/\.mdx?$/, "")}/`,
    })),
  });
}
