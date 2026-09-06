export type Project = {
  id: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  stack: string[];
  description: string;
  link?: string;
};

export const owner = {
  name: "Al Kafi",
  handle: "@alkafi",
  role: "Creative Engineer — WebGL & Interface Systems",
  location: "Dhaka, Bangladesh",
  email: "hello@example.com",
  bio: "I build cinematic, high-performance interfaces where realtime 3D and product thinking meet. Ten-ish years across studios and startups, shipping work that has to feel good at 60 frames a second and still convert.",
  focus: [
    "Realtime 3D & shader work",
    "Interaction and motion design",
    "Design systems at scale",
    "Performance budgets & Core Web Vitals",
  ],
  socials: [
    { label: "GitHub", url: "https://github.com" },
    { label: "LinkedIn", url: "https://linkedin.com" },
    { label: "Dribbble", url: "https://dribbble.com" },
  ],
};

export const projects: Project[] = [
  {
    id: "aurora",
    title: "Aurora Engine",
    tagline: "A realtime configurator rendering 4M-tri assets in the browser",
    year: "2025",
    role: "Lead engineer",
    stack: ["Three.js", "React", "GLSL", "Vite"],
    description:
      "Progressive mesh streaming plus a custom deferred pass let shoppers spin photoreal product builds on mid-tier phones. Cut first meaningful paint to 1.1s and held 60fps on a 2019 Android.",
  },
  {
    id: "signal",
    title: "Signal Deck",
    tagline: "An operations console for a satellite imagery team",
    year: "2024",
    role: "Design engineer",
    stack: ["React", "WebGL", "D3", "TypeScript"],
    description:
      "Millions of telemetry points, one canvas. Built a windowed workspace with persistent layouts so analysts could keep six live feeds side by side without losing context.",
  },
  {
    id: "monolith",
    title: "Monolith",
    tagline: "Award-winning launch site for a hardware studio",
    year: "2024",
    role: "Creative developer",
    stack: ["Three.js", "GSAP", "Vite"],
    description:
      "Scroll-driven cinematography with baked lighting and a 900kb total 3D budget. Featured on three design galleries and shipped with a Lighthouse mobile score of 94.",
  },
  {
    id: "atlas",
    title: "Atlas Design System",
    tagline: "Tokens, motion rules and 60 components across five products",
    year: "2023",
    role: "Systems lead",
    stack: ["React", "Tailwind", "Storybook"],
    description:
      "One semantic token layer replaced four divergent themes. Feature teams shipped roughly 30% faster and accessibility regressions dropped to near zero.",
  },
];
