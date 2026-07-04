"use client";

const projects = [
  {
    id: "01",
    title: "Solana Market Intelligence Platform",
    subtitle: "Real-time trading signals and wallet analysis at scale",
    desc: "Built a distributed backend that processes market data and generates trading signals for crypto markets. The system handles WebSocket feeds in real-time, runs ML pipelines asynchronously, and serves an API for paper trading. Everything is designed around low latency and high throughput.",
    tags: ["FastAPI", "PostgreSQL", "Redis", "SQLAlchemy", "WebSockets", "Async", "Docker"],
    highlights: [
      "Async data ingestion from multiple exchanges",
      "ML-based alpha scoring engine",
      "Real-time WebSocket API",
      "Explainable signal generation with paper trading",
    ],
    repo: "https://github.com/bgade06",
    link: "/projects/solana",
    color: "cyan",
    featured: true,
  },
  {
    id: "02",
    title: "The Pickle Nest",
    subtitle: "Production backend for location-based discovery",
    desc: "Built the backend for a platform that helps users discover and organize nearby games. The system handles complex geospatial queries, manages 22 database models, and exposes 49 APIs for game discovery, player profiles, and real-time matching. Deployed on production infrastructure with monitoring and caching.",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Geospatial", "APIs", "Production"],
    highlights: [
      "49 production APIs serving discovery and matching",
      "22 database models with complex relationships",
      "Geospatial search using PostGIS",
      "Sub-200ms query latency with Redis caching",
    ],
    repo: "https://thepicklenest.com/",
    link: "/projects/pickle-nest",
    color: "emerald",
    featured: false,
  },
  {
    id: "03",
    title: "Success Society",
    subtitle: "AI-powered SaaS for lead generation workflows",
    desc: "Built a multi-tenant SaaS platform that uses AI to generate qualified leads and manage subscription workflows. The backend handles Stripe payments, Discord integrations, and Anthropic API orchestration. Users pay for leads monthly; the system tracks usage and billing in real-time.",
    tags: ["Next.js", "Supabase", "Stripe", "Anthropic", "Discord", "SaaS"],
    highlights: [
      "Stripe subscription and metered billing",
      "Discord bot integration for notifications",
      "Anthropic API for AI lead generation",
      "Real-time usage tracking and analytics",
    ],
    repo: "https://github.com/bgade06",
    link: "/projects/success-society",
    color: "violet",
    featured: false,
  },
  {
    id: "04",
    title: "Backend Internship",
    subtitle: "Production microservices on AWS",
    desc: "Built Flask microservices as part of a professional engineering team. Deployed and maintained services on AWS infrastructure, wrote integration tests, and participated in code review. Learned how production systems handle scale and reliability.",
    tags: ["Flask", "Python", "AWS EC2", "AWS RDS", "Docker", "Integration Testing"],
    highlights: [
      "6 Flask microservices across multiple domains",
      "AWS deployment with CloudWatch monitoring",
      "Database migrations and schema design",
      "Integration test coverage and CI/CD",
    ],
    link: "/projects/internship",
    color: "indigo",
    featured: false,
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

      {/* Projects */}
      <section id="projects" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white">Projects</h2>
          <p className="text-slate-500 text-sm mt-2">Production systems with detailed engineering breakdown</p>
        </div>

        <div className="space-y-5">
          {projects.map((p) => {
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
                      <h3 className="text-2xl font-black tracking-tight">{p.title}</h3>
                      {p.featured && (
                        <span className="font-mono text-[10px] border border-cyan-400/30 text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-400/5">
                          featured
                        </span>
                      )}
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
