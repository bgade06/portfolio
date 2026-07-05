"use client";

import { useEffect, useRef, useState } from "react";

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 700ms ease-out ${delay}ms, transform 700ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function CountUpStat({
  target,
  prefix = "",
  suffix = "",
  label,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 900;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setN(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target]);

  return (
    <div ref={ref}>
      <div className="text-2xl font-bold text-white">{prefix}{n}{suffix}</div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </div>
  );
}

const professionalExperience = [
  {
    id: "01",
    company: "Emergtech Business Solutions Inc.",
    title: "Software Engineering Intern",
    subtitle: "Multi-tenant AI orchestration platform",
    status: "current",
    desc: "Built backend systems for a multi-tenant SaaS platform that orchestrates AI workflows. Designed and implemented REST APIs, managed database schema evolution, and collaborated with the team through production pull requests and code reviews. Worked on features involving OAuth, third-party API integration (Jira), and AI model coordination.",
    tags: ["Node.js", "Express.js", "MongoDB", "AWS Bedrock", "OAuth", "REST APIs", "SaaS Architecture"],
    highlights: [
      "Multi-tenant backend architecture",
      "REST API design and implementation",
      "OAuth integration for third-party apps",
      "AI orchestration and workflow management",
      "Production code review and collaboration",
    ],
    color: "cyan",
  },
  {
    id: "02",
    company: "Digeon Technologies LLC",
    title: "Software Engineering Intern",
    subtitle: "Production backend microservices",
    status: "previous",
    desc: "Developed and maintained Flask microservices in a production environment. Worked across multiple services handling billing, user management, and content delivery. Designed database schemas, implemented REST APIs, managed Docker containerization, and participated in cloud infrastructure decisions on AWS. Gained hands-on experience with payment processing, CI/CD pipelines, and production deployments.",
    tags: ["Flask", "Python", "Docker", "Docker Compose", "MySQL", "AWS EC2", "AWS RDS", "Stripe", "REST APIs"],
    highlights: [
      "Flask microservices across multiple domains",
      "Payment processing with Stripe",
      "Database schema design and migrations",
      "Docker containerization and deployment",
      "AWS infrastructure (EC2, RDS)",
      "Production debugging and monitoring",
    ],
    color: "indigo",
  },
];

const featuredProjects = [
  {
    id: "01",
    title: "Solana Market Intelligence Platform",
    subtitle: "Real-time data ingestion and stream processing",
    desc: "Built a distributed backend that processes market data and generates trading signals. The system handles WebSocket feeds in real-time, runs ML pipelines asynchronously, and serves an API for paper trading. Designed around low latency and high throughput to handle hundreds of messages per second.",
    tags: ["FastAPI", "PostgreSQL", "Redis", "SQLAlchemy", "WebSockets", "Async", "Docker"],
    highlights: [
      "500+ events per second ingestion",
      "P95 API latency: 45ms",
      "Async worker architecture for ML pipelines",
      "Real-time WebSocket updates",
    ],
    link: "/projects/solana",
    color: "cyan",
  },
  {
    id: "02",
    title: "The Pickle Nest",
    subtitle: "Geospatial search and complex data relationships",
    desc: "Engineered the backend for a platform that helps users discover nearby games through intelligent matching. The system handles geospatial queries at scale, manages 22 related database models, and exposes 49 REST APIs. Built with production-grade architecture including PostGIS indexing and strategic caching.",
    tags: ["PostgreSQL", "Prisma", "PostGIS", "Redis", "REST APIs", "Production"],
    highlights: [
      "49 production APIs with clear semantics",
      "22 normalized database models",
      "Sub-200ms geospatial queries",
      "70% cache hit rate with Redis",
    ],
    live: "https://www.thepicklenest.com",
    link: "/projects/pickle-nest",
    color: "emerald",
  },
  {
    id: "03",
    title: "Success Society",
    subtitle: "Multi-tenant SaaS with payment orchestration",
    desc: "Built a multi-tenant SaaS platform that coordinates multiple external services (Stripe, Anthropic, Discord) for lead generation and subscription management. Implemented metered billing, row-level security for data isolation, and saga patterns for reliable service orchestration.",
    tags: ["Next.js", "Supabase", "Stripe", "Anthropic", "PostgreSQL", "SaaS Architecture"],
    highlights: [
      "Zero billing reconciliation errors",
      "100% multi-tenant data isolation via RLS",
      "Metered billing with Stripe",
      "External service orchestration",
    ],
    live: "https://www.successsociety.co",
    link: "/projects/success-society",
    color: "violet",
  },
];

const skills: Record<string, string[]> = {
  "Backend & APIs": ["FastAPI", "Flask", "Node.js", "PostgreSQL", "Redis", "SQLAlchemy", "Prisma"],
  "Databases": ["PostgreSQL", "Supabase", "Schema Design", "Geospatial (PostGIS)", "Indexing", "Query Optimization"],
  "Async & Concurrency": ["WebSockets", "Async/Await", "Background Jobs", "Event Streaming", "Real-time Systems"],
  "Cloud": ["AWS EC2", "AWS RDS", "Docker", "Linux", "Monitoring"],
  "Languages": ["Python", "TypeScript", "SQL", "Stripe API", "Discord API", "Anthropic API"],
};

type AccentColor = "cyan" | "indigo" | "violet" | "emerald";

const accents: Record<AccentColor, {
  border: string;
  badgeBorder: string;
  badgeBg: string;
  badgeText: string;
  num: string;
  btn: string;
  bullet: string;
}> = {
  cyan: {
    border: "border-cyan-500/25 hover:border-cyan-500/60",
    badgeBorder: "border-cyan-500/20",
    badgeBg: "bg-cyan-500/5",
    badgeText: "text-cyan-300",
    num: "text-cyan-400",
    btn: "bg-cyan-400 text-black hover:bg-cyan-300",
    bullet: "text-cyan-400",
  },
  indigo: {
    border: "border-indigo-500/25 hover:border-indigo-500/60",
    badgeBorder: "border-indigo-500/20",
    badgeBg: "bg-indigo-500/5",
    badgeText: "text-indigo-300",
    num: "text-indigo-400",
    btn: "bg-indigo-400 text-black hover:bg-indigo-300",
    bullet: "text-indigo-400",
  },
  violet: {
    border: "border-violet-500/25 hover:border-violet-500/60",
    badgeBorder: "border-violet-500/20",
    badgeBg: "bg-violet-500/5",
    badgeText: "text-violet-300",
    num: "text-violet-400",
    btn: "bg-violet-400 text-black hover:bg-violet-300",
    bullet: "text-violet-400",
  },
  emerald: {
    border: "border-emerald-500/25 hover:border-emerald-500/60",
    badgeBorder: "border-emerald-500/20",
    badgeBg: "bg-emerald-500/5",
    badgeText: "text-emerald-300",
    num: "text-emerald-400",
    btn: "bg-emerald-400 text-black hover:bg-emerald-300",
    bullet: "text-emerald-400",
  },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#050510] text-slate-200">

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-[#050510]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:py-4">
          <a href="/" className="font-mono text-sm text-sky-400 tracking-wider hover:text-sky-300 transition-colors">
            &gt; BG<span className="animate-blink">_</span>
          </a>
          <nav className="hidden md:flex gap-6 lg:gap-7 text-sm font-mono">
            {["about", "projects", "skills", "contact"].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="text-slate-500 hover:text-sky-400 transition-colors"
              >
                ./{s}
              </a>
            ))}
          </nav>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block h-0.5 w-5 bg-slate-300 transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-slate-300 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-slate-300 transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden flex flex-col border-t border-white/[0.05] bg-[#050510]/95 text-sm font-mono">
            {["about", "projects", "skills", "contact"].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                onClick={() => setMenuOpen(false)}
                className="px-6 py-3 text-slate-400 hover:text-sky-400 hover:bg-white/5 transition-colors border-b border-white/[0.03] last:border-b-0"
              >
                ./{s}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center px-6 py-8 md:py-12 lg:py-16">
        <div className="flex-1 flex flex-col lg:flex-row lg:items-center justify-center gap-10">
          <div className="max-w-3xl">
            {/* Name and Title */}
            <Reveal delay={0} className="mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-2">
                Hey, I&apos;m Bharadwaj.
              </h1>
              <p className="text-lg text-sky-400 font-medium mb-1">I build backend systems that don&apos;t fall over.</p>
              <p className="text-sm text-slate-500">Backend Engineer · Michigan State University</p>
            </Reveal>

            {/* Value Prop */}
            <Reveal delay={120}>
              <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-16">
                49 production APIs. 500+ events per second. Sub-200ms query latency. PostgreSQL, FastAPI, Redis, AWS.
              </p>
            </Reveal>

            {/* Key Proof Points */}
            <Reveal delay={240}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
                <CountUpStat target={49} label="Production APIs" />
                <CountUpStat target={22} label="Database Models" />
                <CountUpStat target={500} suffix="+" label="Events/Second" />
                <CountUpStat target={200} prefix="<" suffix="ms" label="Query Latency" />
                <CountUpStat target={3} label="Shipped SaaS" />
                <CountUpStat target={2} label="Years Production" />
              </div>
            </Reveal>

            {/* Systems Built */}
            <Reveal delay={360} className="mb-12">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Systems</p>
              <div className="flex flex-wrap gap-2">
                {["Distributed Systems", "Real-time APIs", "Async Workers", "Geospatial Search", "Metered Billing", "Multi-tenant SaaS"].map((system) => (
                  <span key={system} className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-lg text-slate-300 transition-colors hover:border-sky-400/40 hover:text-sky-300">
                    {system}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal delay={480}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#projects"
                  className="rounded-lg bg-sky-400 px-6 py-3 sm:py-2.5 text-sm font-semibold text-black transition-all hover:bg-sky-300 hover:scale-[1.02] text-center"
                >
                  View Projects
                </a>
                <a
                  href="https://github.com/bgade06"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/15 px-6 py-3 sm:py-2.5 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/5 hover:scale-[1.02] text-center"
                >
                  GitHub
                </a>
              </div>
            </Reveal>
          </div>

          {/* Terminal panel */}
          <Reveal delay={300} className="hidden lg:block shrink-0">
            <div className="w-[380px] rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden shadow-2xl shadow-black/40">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
                <span className="h-3 w-3 rounded-full bg-red-500/50" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/50" />
                <span className="h-3 w-3 rounded-full bg-green-500/50" />
                <span className="ml-2 text-xs text-slate-500 font-mono">whoami.sh</span>
              </div>
              <div className="p-5 font-mono text-[13px] leading-relaxed">
                <p><span className="text-emerald-400">$</span> <span className="text-slate-300">whoami</span></p>
                <p className="text-slate-500 pl-4 mb-3">bharadwaj_gade — backend engineer</p>
                <p><span className="text-emerald-400">$</span> <span className="text-slate-300">cat stack.txt</span></p>
                <p className="text-slate-500 pl-4 mb-3">PostgreSQL, FastAPI, Redis, AWS</p>
                <p><span className="text-emerald-400">$</span> <span className="text-slate-300">./deploy --env=production</span></p>
                <p className="text-sky-400 pl-4 mb-3">✓ 49 endpoints live, 0 downtime</p>
                <p><span className="text-emerald-400">$</span> <span className="text-slate-300 animate-blink">_</span></p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="pt-8 text-xs text-slate-500 font-mono tracking-wide">↓ scroll to see projects</div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:py-16 lg:py-24">
        <Reveal className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Background</h2>
        </Reveal>
        <Reveal delay={100} className="max-w-2xl">
          <p className="text-base text-slate-300 leading-relaxed mb-4">
            I shipped distributed systems, real-time APIs, and SaaS platforms while learning systems design through production code. I care about reliability, performance, and clean architecture.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Focused on: database design, query optimization, async systems, cloud infrastructure, and building systems that scale without surprises.
          </p>
        </Reveal>
      </section>

      {/* Professional Experience */}
      <section id="experience" className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:py-16 lg:py-24">
        <Reveal className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Professional Experience</h2>
          <p className="text-slate-500 text-sm mt-2">Software engineering internships building production systems</p>
        </Reveal>

        <div className="space-y-6">
          {professionalExperience.map((exp, i) => {
            const a = accents[exp.color as AccentColor];
            return (
              <Reveal key={exp.id} delay={i * 120}>
              <div
                className={`group rounded-2xl border ${a.border} bg-white/[0.02] p-6 md:p-8 transition-all duration-300 hover:-translate-y-0.5`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h3 className="text-xl font-semibold tracking-tight text-white">{exp.title}</h3>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        exp.status === 'current'
                          ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                          : 'bg-slate-500/10 text-slate-400 border border-slate-500/30'
                      }`}>
                        {exp.status === 'current' ? 'Current' : 'Previous'}
                      </span>
                    </div>
                    <p className="text-base text-sky-400 font-medium mb-2">{exp.company}</p>
                    <p className={`text-xs text-slate-500 mb-4`}>{exp.subtitle}</p>
                    <p className="text-sm text-slate-300 leading-relaxed mb-5 max-w-2xl">{exp.desc}</p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`font-mono text-xs border ${a.badgeBorder} ${a.badgeBg} ${a.badgeText} px-2.5 py-1 rounded-lg`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {exp.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-slate-400">
                          <span className={`${a.bullet} text-xs shrink-0`}>▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:py-16 lg:py-24">
        <Reveal className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Featured Projects</h2>
        </Reveal>

        <div className="space-y-6">
          {featuredProjects.map((p, i) => {
            const a = accents[p.color as AccentColor];
            return (
              <Reveal key={p.id} delay={i * 120}>
              <div
                className={`group rounded-2xl border ${a.border} bg-white/[0.02] p-6 md:p-8 transition-all duration-300 hover:-translate-y-0.5`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className={`font-mono text-xs ${a.num}`}>{p.id}</span>
                      <h3 className="text-xl font-semibold tracking-tight text-white">{p.title}</h3>
                    </div>
                    <p className={`text-xs text-slate-500 mb-4`}>{p.subtitle}</p>
                    <p className="text-sm text-slate-300 leading-relaxed mb-5 max-w-2xl">{p.desc}</p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`font-mono text-xs border ${a.badgeBorder} ${a.badgeBg} ${a.badgeText} px-2.5 py-1 rounded-lg`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-slate-400">
                          <span className={`${a.bullet} text-xs shrink-0`}>▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {(p.link || p.live) && (
                    <div className="flex md:flex-col gap-3 shrink-0">
                      {p.link && (
                        <a
                          href={p.link}
                          className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all text-center ${a.btn}`}
                        >
                          Details →
                        </a>
                      )}
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl border border-white/8 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:border-white/20 hover:text-white hover:bg-white/5 text-center"
                        >
                          View Live →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:py-16 lg:py-24">
        <Reveal className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Stack</h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(skills).map(([category, items], i, arr) => (
            <Reveal
              key={category}
              delay={i * 100}
              className={`h-full ${i === arr.length - 1 && arr.length % 2 === 1 ? "md:col-span-2" : ""}`}
            >
              <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15">
                <h3 className="font-mono text-sm text-slate-400 mb-4">
                  <span className="text-sky-400">$ </span>
                  {category.toLowerCase().replace(/ & /g, "_").replace(/ /g, "_")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="text-sm border border-white/10 bg-white/[0.02] text-slate-300 px-3 py-1.5 rounded-lg hover:border-sky-400/40 hover:text-sky-300 transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:py-16 lg:py-24">
        <Reveal className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Get in Touch</h2>
        </Reveal>

        <Reveal delay={100} className="flex flex-col items-center gap-4 max-w-sm mx-auto">
          <a
            href="mailto:gadebhar@msu.edu"
            className="rounded-lg bg-sky-400 px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-sky-300 hover:scale-[1.02] inline-block w-fit"
          >
            gadebhar@msu.edu
          </a>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/bharadwaj-gade/"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-slate-600">·</span>
            <a
              href="https://github.com/bgade06"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </Reveal>

        <p className="mt-16 text-xs text-slate-700 text-center">
          © {new Date().getFullYear()} Bharadwaj Gade
        </p>
      </section>
    </main>
  );
}
