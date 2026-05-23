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
    order: ["/", "/start-here/", "/blog/", "/research-notes/", "/roadmap/", "/about/"],
    labels: {
      "/": "Home",
      "/start-here/": "Start here",
      "/blog/": "Blog",
      "/research-notes/": "Research Notes",
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
    role: "AI Systems Engineer",
    bio: "Designing production AI systems, extraction pipelines, evaluation frameworks, and infrastructure for real-world deployment.",
    github: "https://github.com/GinkgoQ",
    linkedin: "https://www.linkedin.com/company/GinkgoQ",
    huggingFace: "https://huggingface.co/GinkgoQ",
  },

  publisher: {
    name: "GinkgoQ",
    url: "https://ginkgoq.github.io",
    logo: "/favicon.svg",
  },

  contact: {
    email: "ai-team@ginkgoq.com",
    mailto: "mailto:ai-team@ginkgoq.com",
  },

  social: [
    { type: "github", label: "GitHub", href: "https://github.com/GinkgoQ", ariaLabel: "GitHub" },
    { type: "twitter", label: "X / Twitter", href: "https://twitter.com/GinkgoQAI", ariaLabel: "X / Twitter" },
    { type: "email", label: "Email", href: "mailto:ai-team@ginkgoq.com", ariaLabel: "Email" },
  ],

  footer: {
    description: "Technical writing and engineering insights for building production AI systems. We share what we learn about extraction, evaluation, and real-world deployment.",
    contactLinkLabel: "Contact",
    topics: [
      "AI Systems",
      "Production Infrastructure",
      "Extraction & Validation",
      "Evaluation & Benchmarks",
      "Real-World Deployment",
      "System Architecture",
      "Technical Analysis",
    ],
    copyright: "© 2026 GinkgoQ. All rights reserved.",
    legal: "Production AI systems for the real world.",
  },

  search: {
    placeholder: "Search articles and research…",
    label: "Search articles and research",
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
      title: "GinkgoQ — Production AI systems and engineering insights",
      description: "Technical writing on building reliable AI systems: extraction pipelines, domain intelligence, evaluation frameworks, and real-world deployment patterns.",
      hero: {
        eyebrow: "GINKGOQ",
        title: "Transform information into intelligence.",
        lead: "In-depth technical writing for teams building production AI systems that extract value from complex data.",
        ctaText: "Explore our work",
        ctaRoute: "/blog/",
      },
      sections: [
        {
          href: "/start-here/",
          number: "00",
          title: "Start here",
          description: "New to GinkgoQ? Learn what we publish, where to find what you're looking for, and how our content is organized.",
          actionText: "Read the guide",
        },
      {
          href: "/blog/",
          number: "01",
          title: "Blog",
          description: "In-depth technical guides and engineering case studies on document processing, RAG systems, and production infrastructure.",
          actionText: "Read the blog",
        },
        {
          href: "/research-notes/",
          number: "02",
          title: "Research Notes",
          description: "Short-form technical analysis: evaluation frameworks, system architecture decisions, and observations on real-world AI challenges.",
          actionText: "Read the notes",
        },
        {
          href: "/about/",
          number: "03",
          title: "About us",
          description: "Our approach to deep-tech AI, the problems we focus on, and how we collaborate with teams building the next generation of AI systems.",
          actionText: "Learn more",
        },
      ],
      latestHeading: "Latest insights",
      latestViewAllText: "View all posts",
    },
    blog: {
      title: "Blog — GinkgoQ",
      description: "Technical guides and case studies on document AI, RAG pipelines, evaluation frameworks, production infrastructure, and real-world AI system design.",
      heroLead: "In-depth technical writing, build logs, and engineering analysis for teams building production AI systems.",
    },
    researchNotes: {
      title: "Research Notes — GinkgoQ",
      description: "Short-form technical analysis on AI system design, evaluation frameworks, and practical approaches to real-world AI challenges.",
      heroLead: "Focused technical analysis on AI systems architecture and evaluation frameworks.",
    },
    about: {
      title: "About GinkgoQ",
      description: "Learn about our team, our approach to AI systems, the problems we're solving, and how we work with technical teams.",
      lead: "We build practical AI systems and publish what we learn. Our work spans extraction pipelines, evaluation frameworks, and the architectural decisions that make AI production-ready.",
      contactBand: {
        heading: "Let's work together",
        lead: "For technical collaborations, architecture reviews, or questions about our work.",
        actionText: "ai-team@ginkgoq.com",
      },
    },
  },
};
