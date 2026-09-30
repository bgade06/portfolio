"use client";

import Image from "next/image";
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
    company: "Morsby, Gorman, McCarthy LLC · Project Guardian",
    title: "Engineering Research and Systems Analyst Intern",
    subtitle: "Remote",
    dates: "July 2026 – Present",
    status: "current",
    desc: "Building Tableau dashboards and data workflows that analyze digital connectivity in Kenya, turning multi-source infrastructure and survey data into traceable metrics and decision-oriented visualizations.",
    tags: ["Tableau", "Data Pipelines", "Data Validation", "Analytics"],
    highlights: [
      "Analytics across 10 Kenyan counties",
      "Source validation and calculation checks",
      "Reproducible transformation logs",
      "Scored 94/100 on the technical assessment",
    ],
    color: "emerald",
  },
  {
    id: "02",
    company: "Emergtech Business Solutions Inc.",
    title: "Software Engineering Intern",
    subtitle: "Farmington Hills, MI",
    dates: "June 2026 – Sept. 2026",
    status: "previous",
    desc: "Built backend systems for a multi-tenant SaaS platform with tenant-isolated workspaces. Wrote AI orchestration services on AWS Bedrock that turn user discussions into structured action items, with cached inference and token tracking to cut redundant LLM calls.",
    tags: ["Node.js", "Express.js", "MongoDB", "AWS Bedrock", "OAuth", "Jira API", "Webhooks"],
    highlights: [
      "12 organization-scoped REST APIs",
      "MongoDB models for multi-tenant data",
      "AI orchestration with AWS Bedrock",
      "15+ integrations (OAuth, Jira, webhooks)",
    ],
    color: "cyan",
  },
  {
    id: "03",
    company: "Trustworthy and Reliable Technology (TART) Lab",
    title: "Undergraduate Researcher",
    subtitle: "Michigan State University · East Lansing, MI",
    dates: "Aug. 2025 – Mar. 2026",
    status: "previous",
    desc: "Profiled CPU, memory, and cache behavior of C and Rust programs to find and remove bottlenecks. Designed energy-use experiments on refactored computing models to evaluate performance and energy tradeoffs.",
    tags: ["C", "Rust", "Profiling", "Systems Performance"],
    highlights: [
      "~18% faster execution on benchmarks",
      "CPU, memory, and cache profiling",
      "Energy-use experiment design",
      "Performance vs. energy tradeoff analysis",
    ],
    color: "violet",
  },
  {
    id: "04",
    company: "Digeon Technologies LLC",
    title: "Software Engineering Intern",
    subtitle: "Canton, MI",
    dates: "June 2025 – Dec. 2025",
    status: "previous",
    desc: "Engineered an AI marketplace with Flask, React, SQLAlchemy, and MySQL on a 5-service microservices architecture covering authentication, payments, search, and 200+ AI agents. Containerized the services and deployed them on AWS.",
    tags: ["Flask", "React", "SQLAlchemy", "MySQL", "Docker Compose", "AWS EC2", "AWS RDS", "Stripe"],
    highlights: [
      "5-service microservices architecture",
      "Marketplace for 200+ AI agents",
      "Stripe payments integration",
      "Centralized logging and monitoring",
    ],
    color: "indigo",
  },
];

const featuredProjects = [
  {
    id: "01",
    title: "The Pickle Nest",
    subtitle: "Next.js, TypeScript, PostgreSQL, Prisma, REST APIs",
    desc: "A full-stack platform for finding pickleball venues and games, with bookings, messaging, and authenticated community workflows. Includes a geospatial pipeline built on the Google Places API, PostgreSQL, and browser geolocation that covers all 50 states.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Google Places API", "REST APIs"],
    highlights: [
      "49 REST API endpoints",
      "22-model relational database",
      "Coverage across all 50 states",
      "Up to 3,000 venue candidates per seeding cycle",
    ],
    live: "https://www.thepicklenest.com",
    link: "/projects/pickle-nest",
    color: "emerald",
  },
  {
    id: "02",
    title: "Solana Intelligence Engine",
    subtitle: "Python, FastAPI, PostgreSQL, Redis, WebSockets, Docker",
    desc: "A real-time backend that ingests, normalizes, and streams blockchain events. Asynchronous pipelines compute predictive signals over rolling time windows, and the whole backend is containerized and covered by an automated test suite.",
    tags: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Redis", "WebSockets", "Async", "Docker"],
    highlights: [
      "15+ predictive signals",
      "Five rolling time windows",
      "Real-time WebSocket streaming",
      "100+ automated tests",
    ],
    link: "/projects/solana",
    color: "cyan",
  },
  {
    id: "03",
    title: "Success Society",
    subtitle: "Next.js, TypeScript, Supabase, Stripe, AI",
    desc: "A full-stack platform for an entrepreneur community with authentication, subscription billing, event management, and role-based dashboards. Event-driven workflows tie together Stripe, Supabase, and Discord, and an AI pipeline automates business discovery, qualification, and outreach.",
    tags: ["Next.js", "TypeScript", "Supabase", "Stripe", "Discord API", "AI/LLMs"],
    highlights: [
      "160+ members on the platform",
      "Subscription billing with Stripe",
      "Role-based dashboards",
      "AI pipeline for lead discovery and outreach",
    ],
    live: "https://www.successsociety.co",
    link: "/projects/success-society",
    color: "violet",
  },
];

const skills: Record<string, string[]> = {
  "Languages": ["Python", "C/C++", "Java", "Rust", "TypeScript", "JavaScript", "SQL", "HTML/CSS"],
  "Backend & Data": ["FastAPI", "Flask", "Node.js", "Express.js", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "SQLAlchemy", "REST APIs", "WebSockets"],
  "Cloud & Tools": ["AWS", "Bedrock", "EC2", "RDS", "Docker", "Git", "Linux/Unix", "Tableau", "Supabase"],
  "Technologies": ["Next.js", "React.js", "OAuth", "Stripe", "Pandas", "Microservices", "Distributed Systems", "Database Design", "System Design", "AI/LLMs"],
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
            {["about", "experience", "projects", "skills", "contact"].map((s) => (
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
            {["about", "experience", "projects", "skills", "contact"].map((s) => (
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
              <Image
                src="/headshot.webp"
                alt="Bharadwaj Gade"
                width={96}
                height={96}
                priority
                className="lg:hidden mb-6 h-24 w-24 rounded-full object-cover border border-white/10"
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-2">
                Hey, I&apos;m Bharadwaj.
              </h1>
              <p className="text-lg text-sky-400 font-medium mb-16">I go to Michigan State and design systems that scale.</p>
            </Reveal>

            {/* Key Proof Points */}
            <Reveal delay={240}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
                <CountUpStat target={4} label="Internships & Research" />
                <CountUpStat target={49} label="REST Endpoints Shipped" />
                <CountUpStat target={160} suffix="+" label="Platform Members" />
                <CountUpStat target={15} suffix="+" label="API Integrations" />
                <CountUpStat target={100} suffix="+" label="Automated Tests" />
                <CountUpStat target={18} suffix="%" label="Runtime Reduction" />
              </div>
            </Reveal>

            {/* Systems Built */}
            <Reveal delay={360} className="mb-12">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Systems</p>
              <div className="flex flex-wrap gap-2">
                {["Multi-tenant SaaS", "AI Orchestration", "Microservices", "Real-time APIs", "Geospatial Search", "Systems Performance"].map((system) => (
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
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/15 px-6 py-3 sm:py-2.5 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/5 hover:scale-[1.02] text-center"
                >
                  Resume
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
              <Image
                src="/headshot.webp"
                alt="Bharadwaj Gade"
                width={380}
                height={300}
                priority
                className="w-full h-[300px] object-cover object-[center_30%] border-b border-white/10"
              />
              <div className="p-5 font-mono text-[13px] leading-relaxed">
                <p><span className="text-emerald-400">$</span> <span className="text-slate-300">whoami</span></p>
                <p className="text-slate-500 pl-4 mb-3">bharadwaj_gade — backend engineer</p>
                <p><span className="text-emerald-400">$</span> <span className="text-slate-300">cat stack.txt</span></p>
                <p className="text-slate-500 pl-4 mb-3">Python, TypeScript, PostgreSQL, AWS</p>
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
            I&apos;m a Computer Science student at Michigan State University. I&apos;ve spent the last two years building backend systems at internships, doing systems performance research in the TART Lab, and shipping my own full-stack platforms. I care about reliability, performance, and clean architecture.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Focused on: backend and API design, multi-tenant SaaS, AI integrations, database design, and systems that scale without surprises.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal delay={200} className="h-full">
            <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Education</p>
              <h3 className="text-lg font-semibold text-white">Michigan State University</h3>
              <p className="text-sm text-sky-400 mb-1">B.S. in Computer Science</p>
              <p className="text-xs text-slate-500 mb-4">East Lansing, MI · Expected May 2028</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Coursework: Software Engineering I, Information Management &amp; the Cloud, Discrete Structures, Computer Organization &amp; Architecture, Computer Systems, Algorithms &amp; Data Structures, Matrix Algebra
              </p>
            </div>
          </Reveal>
          <Reveal delay={300} className="h-full">
            <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Awards &amp; Certifications</p>
              <ul className="space-y-2">
                {["Eagle Scout", "MSU Cybersecurity Bootcamp"].map((award) => (
                  <li key={award} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-sky-400 text-xs shrink-0">▸</span>
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Professional Experience */}
      <section id="experience" className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:py-16 lg:py-24">
        <Reveal className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Professional Experience</h2>
          <p className="text-slate-500 text-sm mt-2">Internships and research</p>
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
                      {exp.status === 'current' && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-xs text-slate-500 mb-2">{exp.dates}</p>
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
