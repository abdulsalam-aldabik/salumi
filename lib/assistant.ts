// "Ask my portfolio" — a small, reliable, offline answer engine.
// It matches a visitor's question to a curated intent and replies in the
// first person, from real project data. No API, no network, no hallucination.

import { personalInfo } from "./data";

export interface AnswerLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Answer {
  text: string;
  links?: AnswerLink[];
}

interface Intent {
  id: string;
  keywords: string[];
  answer: Answer;
}

const L = {
  projects: { label: "See projects", href: "#projects" },
  internship: { label: "Read the case study", href: "/internship" },
  contact: { label: "Get in touch", href: "#contact" },
  cv: { label: "Download CV", href: "/Abdul_Salam_CV.pdf" },
  github: { label: "GitHub", href: personalInfo.github, external: true },
  email: { label: "Email me", href: `mailto:${personalInfo.email}`, external: true },
} satisfies Record<string, AnswerLink>;

// Order matters: more specific intents come first and win ties.
const KB: Intent[] = [
  {
    id: "internship",
    keywords: ["internship", "intern", "smart nv", "smartnv", "iq noodles", "noodles", "stage", "placement"],
    answer: {
      text:
        "I interned at Smart NV in Kontich, from February to May 2026. I built IQ Noodles: a camera app that detects a physical puzzle's pieces and computes the solution. I trained the computer-vision model and built the web app around it. There's a full case study with the project documents.",
      links: [L.internship, L.contact],
    },
  },
  {
    id: "ml",
    keywords: ["ml", "machine learning", "ai", "deep learning", "computer vision", "neural", "model", "yolo", "resnet", "jarvis", "multi-agent", "agent", "vision"],
    answer: {
      text:
        "Machine learning is my specialty. I trained a synthetic-to-real computer-vision model for IQ Noodles during my internship, built an autonomous-driving system with ResNet50 and YOLOv11, and I'm designing JARVIS-2, a local-first multi-agent assistant. I care about models that actually ship, not just notebooks.",
      links: [L.internship, L.projects],
    },
  },
  {
    id: "production",
    keywords: ["production", "deploy", "deployed", "ship", "shipped", "live", "real world", "scale", "maintain"],
    answer: {
      text:
        "Yes. IQ Noodles runs a trained CV model in the browser, on-device. Beyond that, I run a home server at 99%+ uptime over six years, hosting Docker services, virtual machines and a Jellyfin media server. I'm comfortable taking something from an idea to a running, maintained system.",
      links: [L.internship, L.projects],
    },
  },
  {
    id: "infra",
    keywords: ["devops", "infra", "infrastructure", "server", "docker", "kubernetes", "k8s", "self-host", "self host", "homelab", "home lab", "ubuntu", "linux", "vm", "virtualization", "libvirt"],
    answer: {
      text:
        "Infrastructure is one of my strongest areas. I run Ubuntu Server with KVM/QEMU virtualization, Docker and Docker Compose, libvirt, a firewall and a VPN mesh for remote access, all at 99%+ uptime. I've also worked with Kubernetes and Helm. It began as a hobby home lab and grew into something production-grade.",
      links: [L.projects],
    },
  },
  {
    id: "fullstack",
    keywords: ["full stack", "full-stack", "fullstack", "web", "frontend", "front-end", "react", "next.js", "nextjs", "flutter", "mobile", "spring", "asp.net", "api"],
    answer: {
      text:
        "On the software side I've built a Flutter mobile app for smart-home and server control, web apps with React and Next.js, and worked with Spring Boot and ASP.NET. This portfolio itself is Next.js and TypeScript.",
      links: [L.projects, L.github],
    },
  },
  {
    id: "iot",
    keywords: ["iot", "hardware", "esp32", "raspberry", "arduino", "home assistant", "sensor", "ble", "rasbee", "embedded", "wyoming"],
    answer: {
      text:
        "I build with ESP32 and Raspberry Pi. I run a privacy-first Home Assistant setup with local voice control using ESP32 Wyoming satellites, and I built Rasbee, a beehive monitor using ESP32 and Bluetooth Low Energy.",
      links: [L.projects],
    },
  },
  {
    id: "data",
    keywords: ["data", "analytics", "bi", "dashboard", "qlik", "etl", "star schema", "tour de france", "visualization", "kimball"],
    answer: {
      text:
        "On the data side I built a Business Intelligence dashboard over 100+ years of Tour de France data in Qlik Sense, using Kimball dimensional modelling with a star schema and an ETL pipeline.",
      links: [L.projects],
    },
  },
  {
    id: "languages",
    keywords: ["language", "languages", "python", "java", "c++", "typescript", "javascript", "dart", "sql", "tech stack", "technologies", "tools", "stack"],
    answer: {
      text:
        "Mainly Python, which is my go-to for ML, plus Java, C++, JavaScript and TypeScript, Dart and SQL. I pick the tool that fits the problem rather than forcing one stack.",
      links: [L.projects],
    },
  },
  {
    id: "education",
    keywords: ["education", "study", "studied", "degree", "university", "school", "thomas more", "college", "student", "graduate", "graduating"],
    answer: {
      text:
        "I'm finishing a Bachelor in Applied Computer Science with an AI specialization at Thomas More, studying since 2022.",
      links: [L.cv],
    },
  },
  {
    id: "teamwork",
    keywords: ["team", "teamwork", "collaborate", "lead", "leadership", "manager", "group", "people"],
    answer: {
      text:
        "I work well in teams. I led a team of five on a requirements-analysis project as group manager, and I'm usually the one mapping the architecture and keeping people aligned and moving.",
      links: [L.projects],
    },
  },
  {
    id: "strengths",
    keywords: ["best", "strength", "good at", "strong", "specialty", "speciality", "superpower", "stand out", "skills"],
    answer: {
      text:
        "Two things: depth in ML, and range across the stack. I can train a model, wrap it in a web app, and deploy it on infrastructure I run myself, and I taught myself most of that. I'm the person who needs little hand-holding and takes ownership of the whole system.",
      links: [L.cv, L.contact],
    },
  },
  {
    id: "whyhire",
    keywords: ["why hire", "why should", "why you", "hire you", "convince", "what makes you", "fit"],
    answer: {
      text:
        "Because I build complete, working systems and I learn fast on my own. ML is my specialty, but I can also deploy and run what I build. You get someone who takes ownership and keeps shipping.",
      links: [L.cv, L.contact],
    },
  },
  {
    id: "contact",
    keywords: ["contact", "hire", "reach", "email", "get in touch", "available", "availability", "opportunit", "job", "recruit", "talk"],
    answer: {
      text:
        "I'm open to AI/ML and full-stack roles and internships. The quickest way to reach me is the contact form or email, and my CV is one click away.",
      links: [L.contact, L.email, L.cv],
    },
  },
  {
    id: "location",
    keywords: ["location", "where", "based", "country", "belgium", "relocat", "remote"],
    answer: {
      text:
        "I'm based in Belgium, in the Brussels area, and my internship was in Kontich.",
      links: [L.contact],
    },
  },
  {
    id: "cv",
    keywords: ["cv", "resume", "résumé", "curriculum"],
    answer: {
      text: "Here's my CV, ready to download.",
      links: [L.cv],
    },
  },
  {
    id: "projects",
    keywords: ["project", "projects", "portfolio", "built", "build", "work", "made", "showcase", "experience"],
    answer: {
      text:
        "I've shipped around ten projects across ML, infrastructure, web, IoT and data: IQ Noodles (computer vision, my internship), an autonomous-driving AI, JARVIS-2 (multi-agent), a home server and smart-home setup, a Flutter app, a Qlik BI dashboard and more.",
      links: [L.projects, L.internship],
    },
  },
  {
    id: "identity",
    keywords: ["who are you", "about you", "yourself", "introduce", "who is", "your background", "abdul", "salumi", "name"],
    answer: {
      text:
        "I'm Abdul Salam, also known as Salumi. I'm an Applied Computer Science student at Thomas More specializing in machine learning, and a generalist builder: I work across ML, full-stack, infrastructure and data, and I run my own home lab.",
      links: [L.cv, L.projects],
    },
  },
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "yo", "hallo", "greetings", "howdy"],
    answer: {
      text:
        "Hey! I'm Salumi's portfolio assistant. Ask me anything about his work: his ML projects, the Smart NV internship, his skills, or how to get in touch.",
    },
  },
];

const FALLBACK: Answer = {
  text:
    "I'm not sure about that one, but I can tell you about my ML work, my projects, the Smart NV internship, my skills, or how to reach me. Try one of these:",
};

export const SUGGESTIONS = [
  "What's your ML experience?",
  "Have you shipped to production?",
  "Tell me about your internship",
  "What are you best at?",
  "How do I contact you?",
];

function normalize(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function matches(input: string, kw: string): boolean {
  // Phrases / symbol-bearing keywords: plain substring.
  if (kw.includes(" ") || /[^a-z]/.test(kw)) return input.includes(kw);
  // Single words: whole-word match so "ai" doesn't fire inside "training".
  return new RegExp(`\\b${kw}\\b`).test(input);
}

export function ask(raw: string): Answer {
  const input = normalize(raw);
  if (!input) return FALLBACK;

  let best: Intent | null = null;
  let bestScore = 0;

  for (const intent of KB) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (matches(input, kw)) score += kw.includes(" ") ? 2 : 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  return best && bestScore > 0 ? best.answer : FALLBACK;
}
