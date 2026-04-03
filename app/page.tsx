"use client";

import { useEffect, useState } from "react";

const roles = [
  "Software Engineer",
  "Security Researcher",
  "Full-Stack Developer",
  "Systems Builder",
];

const projects = [
  {
    id: "01",
    title: "Digeon",
    subtitle: "AI Tools Marketplace & Developer Platform",
    desc: "Co-founded and architected a full-stack platform where users discover and deploy verified AI agents, and developers publish and monetize their tools. Took the product from idea to production serving early adopters and small businesses.",
    tags: ["Flask", "Python", "MySQL", "Docker", "AWS EC2", "AWS RDS", "Stripe", "SQLAlchemy", "Caddy"],
    highlights: [
      "Flask microservices (6 modules)",
      "Stripe payment & subscriptions",
      "AWS EC2 + RDS + CloudWatch",
      "Caddy reverse proxy",
    ],
    repo: "https://github.com/bgade06/digeon",
    color: "cyan",
    featured: true,
  },
  {
    id: "02",
    title: "ThreatWatch",
    subtitle: "Splunk SIEM — Enterprise Threat Detection",
    desc: "Built a comprehensive threat detection and incident response framework using Splunk Security Essentials. Monitors Windows Server and Apache HTTP logs for brute-force attacks, privilege escalation, and anomalous traffic using the MITRE ATT&CK and Cyber Kill Chain frameworks.",
    tags: ["Splunk SSE", "SIEM", "Windows Server", "Apache", "MITRE ATT&CK", "Kill Chain"],
    highlights: [
      "Real-time alerting & dashboards",
      "Brute-force & login abuse detection",
      "Geo-traffic anomaly analysis",
      "Post-incident log forensics",
    ],
    repo: "https://github.com/bgade06/threatwatch",
    color: "indigo",
    featured: false,
  },
  {
    id: "03",
    title: "Linux Hardening",
    subtitle: "Production Server Security Engagement",
    desc: "Conducted a full security hardening engagement for Baker Street Corporation's production Linux infrastructure. Implemented access controls, PAM password policies, SSH hardening, service audits, and automated compliance scripts with cron-based scheduling.",
    tags: ["Bash", "Linux", "PAM", "SSH", "UFW", "Lynis", "Tripwire", "Cron"],
    highlights: [
      "SSH hardening & root access disabled",
      "PAM password policy enforcement",
      "Automated monthly/weekly scripts",
      "Lynis & Tripwire integration",
    ],
    repo: "https://github.com/bgade06/linux-hardening",
    color: "violet",
    featured: false,
  },
];

const skills: Record<string, string[]> = {
  Languages: ["Python", "TypeScript", "JavaScript", "Bash", "SQL", "HTML/CSS"],
  Frameworks: ["Flask", "React", "Next.js", "Node.js", "SQLAlchemy"],
  Security: ["Splunk SIEM", "MITRE ATT&CK", "PAM", "UFW", "Lynis", "SSH Hardening", "Tripwire"],
  "Cloud & DevOps": ["AWS EC2", "AWS RDS", "CloudWatch", "Docker", "Caddy", "Linux Server"],
};

type AccentColor = "cyan" | "indigo" | "violet";

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
};

export default function Home() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 75);
    } else if (!deleting && displayed.length === role.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

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
            &gt; Hello, world. I&apos;m
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

          <div className="font-mono text-lg md:text-xl text-slate-300 mb-7 flex items-center h-8">
            <span className="text-cyan-400 mr-2">$</span>
            <span>{displayed}</span>
            <span className="inline-block w-[2px] h-5 bg-cyan-400 ml-0.5 animate-blink" />
          </div>

          <p className="text-slate-400 max-w-2xl text-base md:text-lg leading-relaxed mb-10">
            CS student at{" "}
            <span className="text-white font-semibold">Michigan State University</span> building{" "}
            <span className="text-cyan-400 font-medium">secure</span>,{" "}
            <span className="text-indigo-400 font-medium">scalable</span> systems — from AI
            marketplaces to enterprise SIEM platforms and hardened Linux infrastructure.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-xl bg-cyan-400 px-7 py-3 text-sm font-bold text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_28px_rgba(34,211,238,0.45)]"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              className="rounded-xl border border-cyan-400/30 px-7 py-3 text-sm font-bold text-cyan-400 transition-all hover:border-cyan-400 hover:bg-cyan-400/10"
            >
              Resume
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
              { label: "Projects Shipped", value: "3+" },
              { label: "Focus Areas", value: "2" },
              { label: "University", value: "MSU" },
              { label: "Status", value: "Open to Roles" },
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
          <p className="font-mono text-cyan-400 text-xs tracking-widest mb-2">// 01</p>
          <h2 className="text-4xl font-black tracking-tight">About</h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="space-y-5">
            <p className="text-slate-300 leading-relaxed text-lg">
              I&apos;m a Computer Science student at{" "}
              <span className="text-white font-semibold">Michigan State University</span> with a dual
              focus on{" "}
              <span className="text-cyan-400 font-semibold">cybersecurity</span> and{" "}
              <span className="text-indigo-400 font-semibold">full-stack development</span>.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I&apos;ve co-founded and shipped a full-stack AI marketplace, built enterprise
              threat-detection pipelines using Splunk and MITRE ATT&CK, and conducted real security
              hardening engagements for production Linux servers.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I care about systems that are intentionally designed — secure from the ground up,
              clean in architecture, and reliable in production.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="font-mono text-xs border border-cyan-400/30 text-cyan-400 px-3 py-1.5 rounded-lg bg-cyan-400/5">
                MSU Cybersecurity Bootcamp
              </span>
              <span className="font-mono text-xs border border-indigo-400/30 text-indigo-400 px-3 py-1.5 rounded-lg bg-indigo-400/5">
                CompTIA Network+ (in progress)
              </span>
            </div>
          </div>

          {/* Terminal card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="font-mono text-xs text-slate-500 ml-2">bharadwaj.json</span>
            </div>
            <div className="p-6 font-mono text-sm leading-7">
              <p className="text-slate-500">{"{"}</p>
              <p className="pl-5">
                <span className="text-indigo-400">&quot;name&quot;</span>
                <span className="text-slate-500">: </span>
                <span className="text-cyan-300">&quot;Bharadwaj Gade&quot;</span>
                <span className="text-slate-500">,</span>
              </p>
              <p className="pl-5">
                <span className="text-indigo-400">&quot;university&quot;</span>
                <span className="text-slate-500">: </span>
                <span className="text-cyan-300">&quot;Michigan State University&quot;</span>
                <span className="text-slate-500">,</span>
              </p>
              <p className="pl-5">
                <span className="text-indigo-400">&quot;degree&quot;</span>
                <span className="text-slate-500">: </span>
                <span className="text-cyan-300">&quot;Computer Science&quot;</span>
                <span className="text-slate-500">,</span>
              </p>
              <p className="pl-5">
                <span className="text-indigo-400">&quot;focus&quot;</span>
                <span className="text-slate-500">: [</span>
              </p>
              <p className="pl-10">
                <span className="text-green-400">&quot;Cybersecurity&quot;</span>
                <span className="text-slate-500">,</span>
              </p>
              <p className="pl-10">
                <span className="text-green-400">&quot;Full-Stack Development&quot;</span>
              </p>
              <p className="pl-5">
                <span className="text-slate-500">],</span>
              </p>
              <p className="pl-5">
                <span className="text-indigo-400">&quot;email&quot;</span>
                <span className="text-slate-500">: </span>
                <span className="text-cyan-300">&quot;gadebhar@msu.edu&quot;</span>
                <span className="text-slate-500">,</span>
              </p>
              <p className="pl-5">
                <span className="text-indigo-400">&quot;status&quot;</span>
                <span className="text-slate-500">: </span>
                <span className="text-yellow-400">&quot;Open to Opportunities&quot;</span>
              </p>
              <p className="text-slate-500">{"}"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
        <div className="mb-12">
          <p className="font-mono text-cyan-400 text-xs tracking-widest mb-2">// 02</p>
          <h2 className="text-4xl font-black tracking-tight">Projects</h2>
          <p className="mt-2 text-slate-500 font-mono text-sm">
            Real work. Real deployments. Real problems solved.
          </p>
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

                  <div className="flex md:flex-col gap-3 shrink-0">
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all text-center ${a.btn}`}
                    >
                      View →
                    </a>
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-bold text-slate-300 transition-all hover:border-white/25 hover:text-white hover:bg-white/5 text-center"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
        <div className="mb-12">
          <p className="font-mono text-cyan-400 text-xs tracking-widest mb-2">// 03</p>
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
          <p className="font-mono text-cyan-400 text-xs tracking-widest mb-2">// 04</p>
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
