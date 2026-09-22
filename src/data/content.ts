/**
 * =============================================================================
 * CONTENT SOURCE OF TRUTH — edit this file to update the live site
 * =============================================================================
 *
 * HOW TO UPDATE (edit here, then commit + push `main`; Actions rebuilds Pages)
 *
 * Profile / contact
 *   profile.name, .positioning, .heroLede, .summary
 *   profile.phone / profile.phoneTel   → change phone (+91 display / tel: digits)
 *   profile.email                      → change email
 *   profile.links.*                    → LinkedIn, GitHub, Medium, Credly, Topmate, Calendly
 *
 * Hero
 *   expertise[]                        → add/remove/reorder expertise lines
 *   heroMetrics[]                      → numeric callouts (value + label); keep count-up friendly
 *   ui.expertiseKicker, ui.heroCta*    → small hero chrome labels
 *
 * About
 *   about.paragraphs[], about.highlights[]
 *   about.pullQuote / about.pullQuoteFooter
 *   education.*
 *
 * Experience / skills / certs / work / writing / mentoring
 *   experience[]                       → add a role object, or delete one to remove
 *   skills[]                           → skill groups
 *   certifications.featured[] / .resumeOnly[] / .credlyCount
 *   projects[]                         → selected GitHub work
 *   writing[]                          → Medium pieces
 *   mentoring.*                        → Topmate services + testimonials
 *
 * Gallery photos
 *   1. Drop a .jpg into public/ (e.g. public/gallery-event.jpg)
 *   2. Add an entry to gallery[] with src: "/gallery-event.jpg", alt, label, aspect
 *   3. To remove: delete the gallery[] entry (and optionally the file in public/)
 *
 * Section titles / decks / nav
 *   sections[]                         → numeral, heading, deck, navLabel per chapter
 *   ui.*                               → CTAs, contact blurbs, spine, footer mark
 *
 * Do NOT edit dist/ by hand. Do NOT invent employers, metrics, or quotes.
 * =============================================================================
 */

export const profile = {
  name: "Aritra De",
  /** Resume headline — verified */
  positioning: "Customer Success Leader · Enterprise AI Adoption & Applied AI",
  /** GitHub public bio — verified */
  githubBio:
    "Strategic Customer Success Leader · AI Practitioner · Building agentic AI on nights and weekends",
  email: "aritrajob79@gmail.com",
  /** Visible format; tel: href uses digits only */
  phone: "+91 9147116011",
  phoneTel: "+919147116011",
  summary:
    "Enterprise customer success leader with 11+ years owning post-sale relationships, adoption planning, and executive trust-building across Nutanix, Veeam, and VMware — guiding BFSI, fintech, and Fortune-scale accounts from onboarding through renewal and multi-million-dollar expansion. A hands-on daily builder with the Claude API and modern AI coding tools, having shipped production-grade applied-AI systems spanning RAG, multi-agent orchestration, and LLM evaluation.",
  /** Short first-screen line — first sentence of summary only */
  heroLede:
    "Enterprise customer success leader with 11+ years owning post-sale relationships, adoption planning, and executive trust-building across Nutanix, Veeam, and VMware — guiding BFSI, fintech, and Fortune-scale accounts from onboarding through renewal and multi-million-dollar expansion.",
  links: {
    linkedin: "https://www.linkedin.com/in/itsmearitrade/",
    github: "https://github.com/aritrade",
    medium: "https://medium.com/@decodedbyaritra",
    credly: "https://www.credly.com/users/aritrade/badges",
    topmate: "https://topmate.io/aritrade",
    calendly: "https://calendly.com/de-aritrade-aritra",
  },
} as const;

export const about = {
  paragraphs: [
    "I own the full post-sale lifecycle — onboarding, adoption planning, QBRs, renewals, and expansion — for multi-million-dollar portfolios across BFSI and fintech. I've worked across both consumption-based and seat-based commercial models, translating between infrastructure leads, developers, and C-suite executives so high-impact use cases become repeatable, org-wide adoption.",
    "Outside the day job I build applied-AI systems end-to-end: account-risk engines, privacy-first health platforms, hybrid RAG learning products, and multi-agent career tools — practicing the same developer-workflow fluency and AI-driven change management that customers need to adopt.",
  ],
  pullQuote:
    "Own a $7.5M ARR portfolio focused on SAARC and ASEAN — full lifecycle from onboarding through renewal.",
  pullQuoteFooter: "Current role · Nutanix",
  highlights: [
    {
      label: "Portfolio ownership",
      detail:
        "11+ years running post-sale lifecycles for multi-million-dollar books of business",
    },
    {
      label: "Commercial fluency",
      detail:
        "Experience across subscription/seat licensing and consumption-based infrastructure models",
    },
    {
      label: "Applied AI practice",
      detail:
        "Daily builder with Claude API, RAG (BM25 + pgvector), LangGraph multi-agent systems, and evals/guardrails",
    },
    {
      label: "Executive engagement",
      detail:
        "QBRs and architecture reviews with CTOs, CISOs, and infrastructure leads at major banks",
    },
  ],
} as const;

export type ExperienceRole = {
  title: string;
  company: string;
  dates: string;
  bullets: string[];
};

export const experience: ExperienceRole[] = [
  {
    title: "Customer Experience Manager",
    company: "Nutanix Technologies India",
    dates: "Mar 2026 – Present",
    bullets: [
      "Own a $7.5M ARR portfolio focused on SAARC and ASEAN customers, spanning adoption planning, architecture guidance, and executive trust-building — the full lifecycle from onboarding through renewal.",
      "Partner cross-functionally with engineering, support, and product teams to unblock adoption and translate customer requirements into technical roadmaps and actionable feedback.",
      "Partner closely with Sales and Presales to drive value realization and portfolio expansion across the region.",
    ],
  },
  {
    title: "Customer Success Technical Onboarding Manager",
    company: "Veeam Software",
    dates: "Apr 2025 – Jan 2026",
    bullets: [
      "Served as primary technical advisor for a post-sale portfolio representing ~$8–10M ARR, guiding architecture, configuration strategy, and policy design for data-resilience outcomes.",
      "Delivered technical enablement across the full stakeholder spectrum — from infrastructure leads to C-suite — pairing business-value narratives with deep-dive engineering sessions.",
      "Built proactive, data-driven engagement models and workflow analyses that reduced churn, improved renewals, and cut onboarding setup time by ~30%.",
    ],
  },
  {
    title: "Senior Technical Account Manager",
    company: "Nutanix Technologies India",
    dates: "Feb 2024 – Apr 2025",
    bullets: [
      "Owned the technical advisory relationship for a $4.75M ARR portfolio spanning India's largest BFSI accounts, serving as primary point of contact and escalation owner across HCI, cloud, and storage.",
      "Led technical discovery, architecture reviews, and QBRs with CTOs, CISOs, and infrastructure leads at major private and public-sector banks — translating technical outcomes into business narratives.",
      "Implemented analytics-driven observability (Prometheus/Grafana) that shifted customers from reactive to proactive operations, reducing P1 incidents and strengthening renewals.",
    ],
  },
  {
    title: "Escalations Engineer / TSE 2 (Backline)",
    company: "VMware by Broadcom",
    dates: "Jan 2021 – Feb 2024",
    bullets: [
      "Acted as de-facto solutions architect for complex multi-product environments — vSphere, NSX-T, vSAN, Tanzu, and VMware Cloud on AWS.",
      "Restored production services during critical outages and built incident-response processes/scenario playbooks that reduced recurring escalations.",
      "Delivered structured feedback and mentoring to junior engineers; recognized as Top Performer, Q2 FY20.",
    ],
  },
  {
    title: "Technical Solutions Consultant",
    company: "Hewlett-Packard Enterprise",
    dates: "Dec 2017 – Jan 2021",
    bullets: [
      "Delivered end-to-end resolution for ProLiant environments across Windows, Linux, and VMware; served as de-escalation contact on escalated calls.",
      "Standardized resolution documentation and workflows to improve consistency and speed of technical support delivery.",
    ],
  },
  {
    title: "Enterprise Helpdesk & Escalation Roles",
    company: "Unisys Global & Infosys BPM",
    dates: "2015 – 2017",
    bullets: [
      "Built the operational foundation for escalation-path design and incident resolution supporting Baxter, Flowserve, and British Telecom.",
    ],
  },
];

export const skills = {
  groups: [
    {
      title: "AI Platforms & Applied AI",
      items:
        "Claude API · OpenAI API · Cursor · Prompt Engineering · RAG (BM25 + pgvector) · Multi-agent (LangGraph) · Evals & guardrails · FastAPI · Python",
    },
    {
      title: "Customer Success & Delivery",
      items:
        "Book-of-business ownership · Onboarding & adoption · Renewals & expansion (consumption + seat-based) · Technical discovery · CXO/QBR communication · Escalation management · Change management · Mentoring",
    },
    {
      title: "Cloud & Infrastructure",
      items:
        "VMware (vSphere / NSX-T / vSAN / Tanzu) · Nutanix (HCI / Files / Cloud) · Kubernetes · Azure · AWS · Linux",
    },
    {
      title: "Data & Observability",
      items: "PostgreSQL / pgvector · SQL · Prometheus / PromQL / Grafana · SIEM (QRadar / Splunk)",
    },
    {
      title: "Support & Case Management",
      items:
        "Zendesk / Intercom / Gorgias / ServiceNow-style ticketing · Gmail · Calendar · Slack-equivalent messaging",
    },
  ],
} as const;

/** Featured certifications with Credly public badge URLs where available */
export type Certification = {
  name: string;
  issuer: string;
  issued?: string;
  url?: string;
  source: "credly" | "resume";
};

export const certifications: {
  credlyCount: number;
  credlyProfile: string;
  featured: Certification[];
  resumeOnly: Certification[];
} = {
  credlyCount: 40,
  credlyProfile: "https://www.credly.com/users/aritrade/badges",
  featured: [
    {
      name: "Nutanix Certified Master – Multicloud Infrastructure 6",
      issuer: "Nutanix",
      issued: "2026-03-31",
      url: "https://www.credly.com/badges/d370138e-5445-4d9c-82f4-fa6f6fa64033/public_url",
      source: "credly",
    },
    {
      name: "Nutanix Certified Professional – Artificial Intelligence 6",
      issuer: "Nutanix",
      issued: "2026-05-24",
      url: "https://www.credly.com/badges/55b62040-5ae3-4796-b2c7-606f0a08d791/public_url",
      source: "credly",
    },
    {
      name: "VMware Certified Implementation Expert – Data Center Virtualization 2023 (VCIX-DCV)",
      issuer: "Broadcom",
      issued: "2023-05-18",
      url: "https://www.credly.com/badges/1056c6aa-84e4-46d2-b647-37d52bfc07ab/public_url",
      source: "credly",
    },
    {
      name: "VMware Certified Advanced Professional – Data Center Virtualization Deploy 2023",
      issuer: "Broadcom",
      issued: "2023-05-18",
      url: "https://www.credly.com/badges/8aa82b17-b773-4787-8f6a-03eed5cd9c4b/public_url",
      source: "credly",
    },
    {
      name: "VMware Certified Advanced Professional – Data Center Virtualization Design 2022",
      issuer: "Broadcom",
      issued: "2022-12-23",
      url: "https://www.credly.com/badges/faba3387-8853-4d9e-81c8-1e2ab4f8a7c7/public_url",
      source: "credly",
    },
    {
      name: "VMware Certified Master Specialist – VMware Cloud on AWS 2022",
      issuer: "Broadcom",
      issued: "2022-09-04",
      url: "https://www.credly.com/badges/f4f1bb5a-0b7e-466d-8371-2dec8737b8af/public_url",
      source: "credly",
    },
    {
      name: "Veeam Certified Engineer (VMCE) 2025",
      issuer: "Veeam",
      issued: "2025-11-17",
      url: "https://www.credly.com/badges/83f3f777-12fb-4ba7-bdb3-3cc4cd7f2ef4/public_url",
      source: "credly",
    },
    {
      name: "KCNA: Kubernetes and Cloud Native Associate",
      issuer: "The Linux Foundation",
      issued: "2026-04-04",
      url: "https://www.credly.com/badges/3b47466b-21ce-40a7-8dba-80d7f317ce0c/public_url",
      source: "credly",
    },
    {
      name: "PCA: Prometheus Certified Associate",
      issuer: "The Linux Foundation",
      issued: "2026-03-21",
      url: "https://www.credly.com/badges/d14788aa-e62b-4279-a20c-0096c0455f13/public_url",
      source: "credly",
    },
    {
      name: "Google AI Essentials V1",
      issuer: "Coursera",
      issued: "2025-07-10",
      url: "https://www.credly.com/badges/61ead383-058a-44d2-be34-febd982202a3/public_url",
      source: "credly",
    },
    {
      name: "Nutanix Certified Professional – Multicloud Infrastructure 7",
      issuer: "Nutanix",
      issued: "2026-06-20",
      url: "https://www.credly.com/badges/f22c51c8-26a4-4f23-beca-e6830451a388/public_url",
      source: "credly",
    },
    {
      name: "CGOA: Certified GitOps Associate",
      issuer: "The Linux Foundation",
      issued: "2026-08-05",
      url: "https://www.credly.com/badges/0e90ad67-9700-4716-8d0f-2333dbb6ade4/public_url",
      source: "credly",
    },
  ],
  /** Listed on resume; no matching Credly badge found during research */
  resumeOnly: [
    {
      name: "Agentic AI",
      issuer: "Listed on resume (Applied AI & Cloud-Native)",
      source: "resume",
    },
    {
      name: "Generative AI with LLMs",
      issuer: "DeepLearning.AI (per resume)",
      source: "resume",
    },
    {
      name: "International Certificate in Product Management",
      issuer: "Institute of Product Leadership (5-month, faculty-led)",
      source: "resume",
    },
  ],
};

export type Project = {
  name: string;
  description: string;
  url: string;
  homepage?: string;
  stack?: string;
};

export const projects: Project[] = [
  {
    name: "Enterprise Adoption & Risk Analyzer",
    description:
      "Applied-AI account-risk engine that fuses support, telemetry, and adoption signals into an explainable 0–100 escalation-risk score, with a server-side Claude advisory layer. Live demo on synthetic data.",
    url: "https://github.com/aritrade/enterprise-adoption-risk-analyzer",
    stack: "Python · FastAPI · Pydantic · APScheduler · Anthropic Claude · ChromaDB · Playwright",
  },
  {
    name: "Kintsugi Health OS",
    description:
      "Privacy-first personal Health OS — investigation, not diagnosis. Turns scattered health data into understanding with a guardrailed Health Detective, modular Investigation Packs, N-of-1 experiments, and doctor-ready cases.",
    url: "https://github.com/aritrade/kintsugi-health-os",
    homepage: "https://kintsugi-health-os.vercel.app",
    stack: "Next.js 15 · Supabase · Claude · OpenAI",
  },
  {
    name: "Intimacy & Therapy Library",
    description:
      "Evidence-based, clinician-reviewed learning platform for South Asian lives, with Sahay — an India-aware AI wellness companion. Hybrid BM25 + pgvector RAG; DPDP/GDPR-oriented design.",
    url: "https://github.com/aritrade/intimacy-and-sex-therapy-library",
    homepage: "https://intimacy-and-sex-therapy-library.vercel.app",
    stack: "Next.js · React · TypeScript · Tailwind · Postgres · pgvector",
  },
  {
    name: "AI Survival Score",
    description:
      "Paste a LinkedIn profile and get an AI career-displacement risk score in ~60s — six-dimension breakdown, AI-augmented headline, and a 6-month survival roadmap. Private and client-side.",
    url: "https://github.com/aritrade/ai-survival-score",
    stack: "LangGraph · multi-agent",
  },
  {
    name: "Video Nuggets",
    description:
      "Turn any document into a narrated, animated video lesson — moving diagrams, kinetic captions, and a source-grounded Q&A bot — with a real media pipeline.",
    url: "https://github.com/aritrade/video-nuggets",
    homepage: "https://video-nuggets.vercel.app",
  },
  {
    name: "ProductiveYou",
    description:
      "A dark, minimalist multi-year discipline operating system: non-negotiables, habits, streak grid, multi-modal journaling, and a Spotify-style Wrapped recap. Installable as a PWA.",
    url: "https://github.com/aritrade/productiveyou",
    homepage: "https://productiveyou.lovable.app",
    stack: "React · Vite · Supabase",
  },
];

export type Article = {
  title: string;
  subtitle: string;
  url: string;
  date: string;
};

export const writing: Article[] = [
  {
    title: "Building an Agentic AI Workflow with n8n",
    subtitle:
      "How a chat trigger, an AI agent, memory, and a live API tool combine into something that can actually reason — not just respond.",
    url: "https://medium.com/@decodedbyaritra/building-an-agentic-ai-workflow-with-n8n-30aa50e207b9",
    date: "Apr 2026",
  },
  {
    title: "The Shift From AI Tools to AI Agents — Why the Real Advantage Isn’t Models, But Process",
    subtitle:
      "There’s a quiet but seismic change happening in how AI gets deployed inside organizations.",
    url: "https://medium.com/@decodedbyaritra/the-shift-from-ai-tools-to-ai-agents-why-the-real-advantage-isnt-models-but-process-78254842e729",
    date: "Mar 2026",
  },
  {
    title: "Getting started with AI workflow automation beast — n8n",
    subtitle:
      "n8n is an open-source workflow automation platform that connects applications, services, and AI into living systems.",
    url: "https://medium.com/@decodedbyaritra/getting-started-with-ai-workflow-automation-beast-n8n-50e40980ba3c",
    date: "May 2025",
  },
  {
    title: "Reflecting on One Year at Nutanix: A Journey of Growth, Learning, and Gratitude",
    subtitle:
      "Reflections on joining Nutanix as a Senior Technical Account Manager — growth, learning, and gratitude.",
    url: "https://medium.com/@decodedbyaritra/reflecting-on-one-year-at-nutanix-a-journey-of-growth-learning-and-gratitude-cb092c89593b",
    date: "Feb 2025",
  },
  {
    title: "The Feedback You’re Avoiding Might Be the Key to Your Growth",
    subtitle: "Growth requires feedback. Wisdom requires filtering it. Most people are doing neither.",
    url: "https://medium.com/@decodedbyaritra/the-feedback-youre-avoiding-might-be-the-key-to-your-growth-cb7d37b70c1f",
    date: "Mar 2026",
  },
  {
    title: "The Reclining Seat Problem: A Design Lesson at 35,000 Feet",
    subtitle:
      "A systems and design lesson hiding inside one of travel’s most unspoken tensions.",
    url: "https://medium.com/@decodedbyaritra/the-reclining-seat-problem-a-design-lesson-at-35-000-feet-328df260dbf7",
    date: "Mar 2026",
  },
];

export const mentoring = {
  tagline:
    "A seeker helping seekers get unstuck. I help tech professionals land better roles, ace interviews, navigate career moves & build careers in Customer Success, Cloud & Virtualization, Modern Apps and AI.",
  rating: "5 / 5 from 3 ratings on Topmate",
  profileUrl: "https://topmate.io/aritrade",
  services: [
    {
      name: "Free Career Clarity Call",
      detail: "30 mins · Video meeting · Free",
      url: "https://topmate.io/aritrade/1427618",
    },
    {
      name: "Ask Aritra — Career & Tech",
      detail: "Priority DM · Reply within 2 days · Free",
      url: "https://topmate.io/aritrade/1512420",
    },
  ],
  testimonials: [
    {
      quote:
        "My 1 on 1 call with Aritra was very helpful, he shared tools which was so relevant to my current job which i was not aware, he was very friendly throughout the call and listened with a lot of focus, I will definitely recommend Aritra if you are looking for any career guidance.",
      author: "Uday Chander",
    },
    {
      quote:
        "What really stands out about Aritra is not only his depth of technical knowledge, but also the way he shares that knowledge. He explains even complex concepts in a very clear and structured manner… Aritra is an excellent mentor and trainer.",
      author: "Topmate review (vSphere mentoring)",
    },
  ],
} as const;

export const education = {
  degree: "B.E. Electronics & Communication",
  school: "CMR Institute of Technology",
  year: "2015",
} as const;

/** Hero callout — expertise focus (not a currency metric) */
export const expertise = [
  "Customer retention",
  "Proactive churn risk identification and mitigation",
  "Customer advocacy",
  "Customer relationship building",
  "Product and feature adoption",
  "Own the customer experience post sales",
] as const;

export type GalleryItem = {
  src: string;
  alt: string;
  label: string;
  aspect: "portrait" | "landscape" | "square";
};

export const gallery: GalleryItem[] = [
  {
    src: "/aritra-de.jpg",
    alt: "Aritra De",
    label: "Portrait",
    aspect: "portrait",
  },
  {
    src: "/gallery-veeam-tour.jpg",
    alt: "Aritra De at Veeam on Tour",
    label: "Veeam on Tour",
    aspect: "portrait",
  },
  {
    src: "/gallery-conference.jpg",
    alt: "Aritra De at a conference",
    label: "In the room",
    aspect: "landscape",
  },
  {
    src: "/gallery-veeam-sign.jpg",
    alt: "Veeam on Tour sign at the Grand Ballroom",
    label: "Veeam on Tour",
    aspect: "landscape",
  },
  {
    src: "/gallery-nutanix-team.jpg",
    alt: "Aritra De with the Nutanix team",
    label: "Nutanix",
    aspect: "landscape",
  },
  {
    src: "/gallery-conference-close.jpg",
    alt: "Aritra De at a conference",
    label: "In the room",
    aspect: "portrait",
  },
  {
    src: "/gallery-veeam-backdrop.jpg",
    alt: "Aritra De at Veeam on Tour",
    label: "Veeam on Tour",
    aspect: "portrait",
  },
  {
    src: "/gallery-veeam-ballroom.jpg",
    alt: "Aritra De beside the Veeam on Tour sign",
    label: "Grand Ballroom",
    aspect: "portrait",
  },
];

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "work", label: "Work" },
  { id: "writing", label: "Writing" },
  { id: "mentoring", label: "Mentoring" },
  { id: "gallery", label: "In frame" },
  { id: "contact", label: "Contact" },
] as const;

/** Section headings + decks — keep numeral order in sync with nav */
export const sections = [
  {
    id: "about",
    numeral: "01",
    heading: "About",
    deck: "Post-sale ownership with practicing depth in the AI systems customers are adopting.",
  },
  {
    id: "experience",
    numeral: "02",
    heading: "Experience",
    deck: "Roles and impact from the resume — Nutanix, Veeam, VMware, HPE, Unisys, and Infosys.",
  },
  {
    id: "skills",
    numeral: "03",
    heading: "Skills & qualifications",
    deck: "Tools and practices from the resume — customer success delivery paired with applied AI and infrastructure depth.",
  },
  {
    id: "certifications",
    numeral: "04",
    heading: "Certifications",
    deck: null as string | null, // built in App from certifications.credlyCount
  },
  {
    id: "work",
    numeral: "05",
    heading: "Selected work",
    deck: "Public GitHub projects with substance. Empty or undescribed repos omitted.",
  },
  {
    id: "writing",
    numeral: "06",
    heading: "Writing",
    deck: null as string | null, // Medium link rendered in App
  },
  {
    id: "mentoring",
    numeral: "07",
    heading: "Mentoring & office hours",
    deck: null as string | null, // uses mentoring.tagline
  },
  {
    id: "gallery",
    numeral: "08",
    heading: "In frame",
    deck: "A short filmstrip of Aritra — portrait, on tour, and in the room.",
  },
  {
    id: "contact",
    numeral: "09",
    heading: "Contact",
    deck: "Book a conversation, or reach out directly.",
  },
] as const;

/** Hero metric specs (count-up). Labels are separate for easy editing. */
export const heroMetrics = [
  {
    display: "11+",
    value: 11,
    suffix: "+",
    label: "Years post-sale ownership",
  },
  {
    display: "40",
    value: 40,
    label: "Verified Credly badges",
  },
] as const;

/** UI chrome that is still “content” (labels, CTAs) — not layout */
export const ui = {
  expertiseKicker: "Expertise",
  spineLine: "Enterprise AI · Customer Success",
  heroScroll: "Enter",
  bookTimeShort: "Book time",
  bookTimeCalendly: "Book time on Calendly",
  openCalendly: "Open Calendly",
  linkedInCta: "LinkedIn",
  mentoringCta: "Mentoring on Topmate",
  contactHeading: "Book time or call",
  contactBlurb: "Schedule via Calendly, or reach Aritra directly by phone.",
  linkedInDisplay: "linkedin.com/in/itsmearitrade",
  footerMark: "AD",
  viewBadge: "View badge",
  liveDemo: "Live demo",
  githubLabel: "GitHub",
} as const;
