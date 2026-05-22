# GinkgoQ Website

GinkgoQ is a static content site built with Astro. It publishes blog posts and research notes on AI systems, retrieval-augmented systems, domain intelligence, and production-ready AI infrastructure.

## What this repo contains

- `src/pages/` — page routes and content templates
- `src/components/` — shared UI components such as header, footer, and search
- `src/layouts/` — page layout components and metadata
- `src/styles/` — global site styles and typography
- `public/` — static assets and client-side scripts
- `src/pages/rss.xml.ts` — RSS feed generation for content syndication

## Key features

- client-side, site-wide search with keyboard shortcut support (`⌘K` / `/`)
- accessible navigation and mobile menu handling
- visible RSS feed link in the header and footer
- dark/light theme toggle persisted across sessions
- SEO-friendly metadata and structured JSON-LD

## Run locally

```sh
npm install
npm run dev
```

Visit the local dev server and confirm the site loads correctly.

## Build

```sh
npm run build
```

## Notes

- The site uses content collections for `blog` and `research` posts.
- Search is implemented using a lightweight client-side index rendered from `BaseLayout.astro`.
- The RSS feed is available at `/rss.xml`.

## Recommended GitHub topics

`astro`, `static-site`, `rss`, `search`, `ai`, `domain-intelligence`, `research-notes`, `production-ml`
