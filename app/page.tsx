"use client";

const professionalExperience = [
  {
    id: "01",
    company: "Emergtech AI",
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
    company: "Digeon AI",
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
    repo: "https://github.com/bgade06",
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
    repo: "https://thepicklenest.com/",
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
    repo: "https://github.com/bgade06",
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

  return (
    <main className="min-h-screen bg-[#050510] text-slate-200">
      {/* Dot grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,212,255,0.06) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-[5%] h-[700px] w-[700px] rounded-full bg-cyan-500/[0.04] blur-[140px]" />
        <div className="absolute top-[50%] right-[-5%] h-[500px] w-[500px] rounded-full bg-indigo-500/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[35%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.04] blur-[130px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#050510]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="font-mono text-sm text-cyan-400 tracking-wider">
            &gt; BG<span className="animate-blink">_</span>
          </div>
          <nav className="flex gap-7 text-sm font-mono">
            {["about", "projects", "skills", "contact"].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="text-slate-500 hover:text-cyan-400 transition-colors"
              >
                ./{s}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-6 py-16 md:py-20">
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-3xl">
            {/* Name and Title */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-2">
                Bharadwaj Gade
              </h1>
              <p className="text-xl text-cyan-400 font-semibold">Backend Engineer</p>
              <p className="text-sm text-slate-500 mt-1">Michigan State University</p>
            </div>

            {/* Value Prop */}
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-12">
              I build distributed systems that scale. 49 production APIs. 500+ events per second. Sub-200ms query latency. PostgreSQL, FastAPI, Redis, AWS.
            </p>

            {/* Key Proof Points */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              <div>
                <div className="text-2xl font-black text-white">49</div>
                <div className="text-xs text-slate-400 mt-1">Production APIs</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">22</div>
                <div className="text-xs text-slate-400 mt-1">Database Models</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">500+</div>
                <div className="text-xs text-slate-400 mt-1">Events/Second</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">&lt;200ms</div>
                <div className="text-xs text-slate-400 mt-1">Query Latency</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">3</div>
                <div className="text-xs text-slate-400 mt-1">Shipped SaaS</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">2</div>
                <div className="text-xs text-slate-400 mt-1">Years Production</div>
              </div>
            </div>

            {/* Systems Built */}
            <div className="mb-12">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Systems</p>
              <div className="flex flex-wrap gap-2">
                {["Distributed Systems", "Real-time APIs", "Async Workers", "Geospatial Search", "Metered Billing", "Multi-tenant SaaS"].map((system) => (
                  <span key={system} className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-lg text-slate-300">
                    {system}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-4">
              <a
                href="#projects"
                className="rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-black hover:bg-cyan-300 transition-colors"
              >
                View Projects
              </a>
              <a
                href="https://github.com/bgade06"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/5 transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:gadebhar@msu.edu"
                className="rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/5 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center">
          <div className="text-xs text-slate-600 font-mono">↓ scroll to see projects</div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">Background</h2>
        </div>
        <div className="max-w-2xl">
          <p className="text-slate-300 leading-relaxed mb-4">
            I shipped distributed systems, real-time APIs, and SaaS platforms while learning systems design through production code. I care about reliability, performance, and clean architecture.
          </p>
          <p className="text-slate-400 leading-relaxed text-sm">
            Focused on: database design, query optimization, async systems, cloud infrastructure, and building systems that scale without surprises.
          </p>
        </div>
      </section>

      {/* Professional Experience */}
      <section id="experience" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white">Professional Experience</h2>
          <p className="text-slate-500 text-sm mt-2">Software engineering internships building production systems</p>
        </div>

        <div className="space-y-5">
          {professionalExperience.map((exp) => {
            const a = accents[exp.color as AccentColor];
            return (
              <div
                key={exp.id}
                className={`group rounded-2xl border ${a.border} bg-white/[0.02] p-8 transition-all duration-300 hover:-translate-y-0.5`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-2xl font-bold tracking-tight text-white">{exp.title}</h3>
                      <span className={`text-sm font-semibold px-2.5 py-1 rounded-full ${
                        exp.status === 'current'
                          ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                          : 'bg-slate-500/10 text-slate-400 border border-slate-500/30'
                      }`}>
                        {exp.status === 'current' ? 'Current' : 'Previous'}
                      </span>
                    </div>
                    <p className="text-lg text-cyan-400 font-semibold mb-1">{exp.company}</p>
                    <p className={`font-mono text-xs ${a.num} opacity-70 mb-4`}>{exp.subtitle}</p>
                    <p className="text-slate-300 leading-relaxed mb-5 max-w-2xl">{exp.desc}</p>

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
            );
          })}
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white">Featured Projects</h2>
          <p className="text-slate-500 text-sm mt-2">Personal projects demonstrating backend engineering depth</p>
        </div>

        <div className="space-y-5">
          {featuredProjects.map((p) => {
            const a = accents[p.color as AccentColor];
            return (
              <div
                key={p.id}
                className={`group rounded-2xl border ${a.border} bg-white/[0.02] p-8 transition-all duration-300 hover:-translate-y-0.5`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      <span className={`font-mono text-xs ${a.num}`}>{p.id}</span>
                      <h3 className="text-2xl font-bold tracking-tight">{p.title}</h3>
                    </div>
                    <p className={`font-mono text-xs ${a.num} opacity-70 mb-4`}>{p.subtitle}</p>
                    <p className="text-slate-300 leading-relaxed mb-5 max-w-2xl">{p.desc}</p>

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

                  {(p.link || p.repo) && (
                    <div className="flex md:flex-col gap-3 shrink-0">
                      {p.link && (
                        <a
                          href={p.link}
                          className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all text-center ${a.btn}`}
                        >
                          Details →
                        </a>
                      )}
                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-bold text-slate-300 transition-all hover:border-white/25 hover:text-white hover:bg-white/5 text-center"
                        >
                          {p.link ? "Code" : "View →"}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white">Stack</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors"
            >
              <h3 className="font-mono text-sm text-slate-400 mb-4">
                <span className="text-cyan-400">$ </span>
                {category.toLowerCase().replace(/ & /g, "_").replace(/ /g, "_")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="text-sm border border-white/10 bg-white/[0.03] text-slate-200 px-3 py-1.5 rounded-lg hover:border-cyan-400/30 hover:text-cyan-300 transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white">Get in Touch</h2>
        </div>

        <div className="flex flex-col gap-4 max-w-sm">
          <a
            href="mailto:gadebhar@msu.edu"
            className="rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-black hover:bg-cyan-300 transition-colors inline-block w-fit"
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
        </div>

        <p className="mt-16 text-xs text-slate-700">
          © {new Date().getFullYear()} Bharadwaj Gade
        </p>
      </section>
    </main>
  );
}
