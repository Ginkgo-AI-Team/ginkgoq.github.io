export const siteConfig = {
  brand: {
    name: "GinkgoQ",
    label: "GINKGOQ",
    logoAlt: "GinkgoQ mark",
    logoPath: "/favicon.svg",
  },

  routes: {
    home: "/",
    blog: "/blog/",
    researchNotes: "/research-notes/",
    about: "/about/",
  },

  nav: {
    order: ["/", "/start-here/", "/blog/", "/research-notes/", "/releases/", "/roadmap/", "/about/"],
    labels: {
      "/": "Home",
      "/start-here/": "Start here",
      "/blog/": "Blog",
      "/research-notes/": "Research Notes",
      "/releases/": "Releases",
      "/roadmap/": "Roadmap",
      "/about/": "About",
    },
  },

  external: {
    favicon: "/favicon.svg",
    preconnect: [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
    ],
    fonts: [
      "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=IBM+Plex+Mono:wght@400;500&display=swap",
    ],
    api: {
      baseUrl: "https://api.example.com",
    },
    youtube: "https://www.youtube.com/ginkgoq",
  },

  siteUrl: "https://ginkgoq.github.io",

  author: {
    name: "Arman Asgharpoor",
    role: "Lead AI Engineer",
    bio: "Works on production AI systems, RAG, speech AI, VLMs, and backend AI infrastructure.",
    github: "https://github.com/Ginkgo-AI-Team",
    linkedin: "https://www.linkedin.com/in/arman-asgharpoor/",
    huggingFace: "https://huggingface.co/GinkgoQ",
  },

  publisher: {
    name: "GinkgoQ",
    url: "https://ginkgoq.github.io",
    logo: "/favicon.svg",
  },

  contact: {
    email: "hello@ginkgoq.ai",
    mailto: "mailto:hello@ginkgoq.ai",
  },

  social: [
    { type: "github", label: "GitHub", href: "https://github.com/Ginkgo-AI-Team", ariaLabel: "GitHub" },
    { type: "twitter", label: "X / Twitter", href: "https://twitter.com/ginkgoai", ariaLabel: "X / Twitter" },
    { type: "email", label: "Email", href: "mailto:hello@ginkgoq.ai", ariaLabel: "Email" },
  ],

  footer: {
    description: "Deep-tech AI for real-world systems. Technical writing on AI systems, domain intelligence, and practical AI infrastructure.",
    contactLinkLabel: "Contact",
    topics: [
      "AI Systems",
      "Domain Intelligence",
      "RAG",
      "Agents",
      "Pipelines",
      "Datasets",
      "Production",
      "Evaluation",
    ],
    copyright: "© 2026 GinkgoQ. All rights reserved.",
    legal: "Deep-tech AI for real-world systems",
  },

  search: {
    placeholder: "Search posts and notes…",
    label: "Search posts and notes",
    openButtonLabel: "Search (⌘K)",
    buttonText: "Search",
  },

  categories: {
    "AI Systems": "/images/categories/ai-systems.png",
    "Domain Intelligence": "/images/categories/domain-intelligence.png",
    RAG: "/images/categories/rag.png",
    Agents: "/images/categories/agents.png",
    Pipelines: "/images/categories/pipelines.png",
    Datasets: "/images/categories/datasets.png",
    Production: "/images/categories/production.png",
    Evaluation: "/images/categories/evaluation.png",
  },

  pages: {
    home: {
      title: "GinkgoQ — Deep-tech AI for real-world systems",
      description: "GinkgoQ builds practical AI systems across speech, healthcare, vision, documents, agents, and production infrastructure.",
      hero: {
        eyebrow: "GINKGOQ",
        title: "Deep‑tech AI for real‑world systems.",
        lead: "We publish technical writing on AI systems, domain intelligence, and practical infrastructure.",
        ctaText: "Explore our work",
        ctaRoute: "/blog/",
      },
      sections: [
        {
          href: "/start-here/",
          number: "00",
          title: "Start here",
          description: "New to GinkgoQ? Start with an introduction to what GinkgoQ is and how we publish.",
          actionText: "Read the guide",
        },
      {
          href: "/blog/",
          number: "01",
          title: "Blog",
          description: "Technical writing on AI systems, RAG, agents, domain intelligence, and production workflows.",
          actionText: "Read the blog",
        },
        {
          href: "/research-notes/",
          number: "02",
          title: "Research Notes",
          description: "Experiments, paper observations, and system analysis of real-world AI methods.",
          actionText: "Read the notes",
        },
        {
          href: "/about/",
          number: "03",
          title: "About GinkgoQ",
          description: "Who we are, what we build, and how we approach deep-tech AI for the real world.",
          actionText: "Learn more",
        },
      ],
      latestHeading: "Latest from GinkgoQ",
      latestViewAllText: "View all posts",
    },
    blog: {
      title: "Blog — GinkgoQ",
      description: "Technical writing from GinkgoQ on real-world AI systems, speech AI, healthcare and pharma AI, vision, documents, RAG, agents, datasets, and model progress.",
      heroLead: "Notes, build logs, product thinking, and engineering analysis from GinkgoQ.",
    },
    researchNotes: {
      title: "Research Notes — GinkgoQ",
      description: "Technical notes, research observations, and AI system analysis from GinkgoQ.",
      heroLead: "Technical notes, paper observations, experiments, and AI system analysis.",
    },
    about: {
      title: "About — GinkgoQ",
      description: "Learn more about GinkgoQ's deep-tech AI work and mission.",
      lead: "GinkgoQ is a deep-tech AI team working at the intersection of AI systems, domain intelligence, and language understanding. We focus on problems where retrieval, reasoning, and reliability actually matter.",
      contactBand: {
        heading: "Get in touch",
        lead: "For collaborations, technical discussions, or questions about our work.",
        actionText: "hello@ginkgoq.ai",
      },
    },
  },
};
