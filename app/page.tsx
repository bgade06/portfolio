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
      <section className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-6">
        <div className="max-w-4xl">
          <p className="font-mono text-cyan-400 text-sm mb-5 tracking-wider">
            &gt; Backend Engineer
          </p>

          <h1 className="text-6xl md:text-[88px] font-black tracking-tighter leading-none mb-5">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)",
              }}
            >
              BHARADWAJ
            </span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #22d3ee 0%, #818cf8 100%)",
              }}
            >
              GADE
            </span>
          </h1>

          <p className="text-slate-400 max-w-2xl text-base md:text-lg leading-relaxed mb-10">
            CS student at{" "}
            <span className="text-white font-semibold">Michigan State University.</span> I build backends that handle real scale: distributed systems, async workers, ML pipelines, real-time APIs. Production experience on AWS with Python, TypeScript, and PostgreSQL.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-xl bg-cyan-400 px-7 py-3 text-sm font-bold text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_28px_rgba(34,211,238,0.45)]"
            >
              View Projects
            </a>
            <a
              href="https://github.com/bgade06"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 px-7 py-3 text-sm font-bold text-slate-300 transition-all hover:border-white/25 hover:text-white hover:bg-white/5"
            >
              GitHub
            </a>
          </div>

          <div className="mt-16 flex flex-wrap gap-10 border-t border-white/[0.06] pt-8">
            {[
              { label: "Active Projects", value: "4" },
              { label: "Focus", value: "Backend" },
              { label: "Languages", value: "Python, TS" },
              { label: "Status", value: "Open to Internships" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs font-mono text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-700">
          <span className="text-xs font-mono tracking-widest">scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-slate-600 to-transparent" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
        <div className="mb-12">
          <p className="font-mono text-cyan-400 text-xs tracking-widest mb-2">{"// 01"}</p>
          <h2 className="text-4xl font-black tracking-tight">About</h2>
        </div>

        <div className="max-w-3xl space-y-6">
          <p className="text-slate-300 leading-relaxed text-lg">
            I&apos;m a CS student at Michigan State. I build production backends that scale. I've shipped distributed systems handling real-time trading data, APIs serving hundreds of endpoints, and SaaS platforms processing payments.
          </p>
          <p className="text-slate-400 leading-relaxed">
            On the backend side: I design schemas, optimize queries, build async workers, and think about production reliability. I care about code clarity and systems that don't surprise you at 3am.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Current focus: distributed systems, real-time APIs, ML infrastructure, and anything that moves data fast and reliably.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
        <div className="mb-12">
          <p className="font-mono text-cyan-400 text-xs tracking-widest mb-2">{"// 02"}</p>
          <h2 className="text-4xl font-black tracking-tight">Projects</h2>
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
      <section id="skills" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
        <div className="mb-12">
          <p className="font-mono text-cyan-400 text-xs tracking-widest mb-2">{"// 03"}</p>
          <h2 className="text-4xl font-black tracking-tight">Skills</h2>
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
      <section id="contact" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
        <div className="mb-12">
          <p className="font-mono text-cyan-400 text-xs tracking-widest mb-2">{"// 04"}</p>
          <h2 className="text-4xl font-black tracking-tight">Contact</h2>
        </div>

        <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-10 md:p-14 overflow-hidden">
          <div className="pointer-events-none absolute top-0 right-0 h-60 w-60 bg-cyan-500/[0.06] rounded-full blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-60 w-60 bg-indigo-500/[0.04] rounded-full blur-3xl" />

          <p className="text-slate-300 text-lg max-w-xl mb-8 relative z-10">
            Open to internships, collaborations, and interesting problems.{" "}
            <span className="text-white font-semibold">Let&apos;s build something great.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <a
              href="mailto:gadebhar@msu.edu"
              className="rounded-xl bg-cyan-400 px-8 py-4 text-sm font-bold text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_32px_rgba(34,211,238,0.45)] text-center"
            >
              gadebhar@msu.edu
            </a>
            <a
              href="https://www.linkedin.com/in/bharadwaj-gade/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 px-8 py-4 text-sm font-bold text-slate-300 transition-all hover:border-cyan-400/30 hover:text-cyan-400 hover:bg-cyan-400/5 text-center"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/bgade06"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 px-8 py-4 text-sm font-bold text-slate-300 transition-all hover:border-white/25 hover:text-white hover:bg-white/5 text-center"
            >
              GitHub
            </a>
          </div>
        </div>

        <p className="mt-12 text-xs text-slate-700 font-mono">
          © {new Date().getFullYear()} Bharadwaj Gade — Built with Next.js + Tailwind CSS.
        </p>
      </section>
    </main>
  );
}
