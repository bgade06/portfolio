"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const proof = [
  { value: "180K+", label: "blockchain events / day" },
  { value: "14.5K+", label: "venues indexed" },
  { value: "$2.4K", label: "monthly recurring revenue" },
  { value: "65%", label: "lower AI inference cost" },
  { value: "52", label: "passing automated tests" },
];

const systems = [
  { eyebrow: "01 / AI infrastructure", title: "Ideas in. Prioritized action out.", summary: "A production AI workflow that turns unstructured team discussions into reliable, traceable action items.", metric: "12% → <2%", metricLabel: "hallucination & retrieval error", nodes: ["Discussion", "Bedrock", "Validation", "Action items"], accent: "lime" },
  { eyebrow: "02 / Real-time data", title: "Market events, processed in milliseconds.", summary: "A streaming Solana analytics backend designed to ingest, normalize, persist, and serve high-volume blockchain events.", metric: "120ms", metricLabel: "p95 ingestion latency", nodes: ["Geyser", "FastAPI", "PostgreSQL", "Signals"], accent: "blue" },
  { eyebrow: "03 / Product systems", title: "Nationwide discovery without duplicate noise.", summary: "A geospatial venue platform that converts third-party place data into fast, searchable, bookable inventory.", metric: "98%", metricLabel: "duplicate listings eliminated", nodes: ["Places API", "Ingestion", "Geo search", "Bookings"], accent: "orange" },
];

const projects = [
  { number: "01", title: "Solana Intelligence Engine", category: "Real-time systems", summary: "A FastAPI and PostgreSQL pipeline processing live blockchain activity across thousands of tokens and pools.", impact: ["180K+ events daily", "350 events/sec peak", "60% lower p95 latency"], stack: "Python · FastAPI · PostgreSQL · WebSockets · Docker", href: "/projects/solana", accent: "blue" },
  { number: "02", title: "The Pickle Nest", category: "Geospatial product", summary: "A nationwide venue discovery and booking platform with a relational domain model and high-speed location search.", impact: ["14,500+ venues", "49 REST endpoints", "110+ active users"], stack: "Next.js · TypeScript · PostgreSQL · Prisma · Google Places", href: "/projects/pickle-nest", live: "https://www.thepicklenest.com", accent: "lime" },
  { number: "03", title: "Success Society", category: "Revenue-generating SaaS", summary: "A subscription platform and AI lead engine built around authentication, billing, role-based tools, and automation.", impact: ["$2.4K MRR", "160 paying members", "14 hrs/week saved"], stack: "Next.js · TypeScript · Supabase · Stripe · AI", href: "/projects/success-society", live: "https://www.successsociety.co", accent: "orange" },
];

const experience = [
  { dates: "Jul 2026 — Present", company: "Morsby, Gorman, McCarthy LLC", team: "Project Guardian", role: "Systems Engineering & Automation Intern", summary: "Building auditable analytics and automation for national connectivity research.", bullets: ["Automated validation across 13 Excel source-data and QA worksheets using Python and JavaScript.", "Built a Tableau dashboard connecting three national KPIs to a 31.6-point urban-rural adoption gap."] },
  { dates: "Jun 2026 — Sep 2026", company: "Emergtech Business Solutions", team: "AI collaboration platform", role: "Software Engineering Intern", summary: "Shipped multi-tenant backend systems and lower-cost, more reliable AI workflows.", bullets: ["Reduced AI workflow error rates from 12% to under 2% for 150+ users across 12 organizations.", "Cut average latency 54% and inference cost 65% with caching, deduplication, and token tracking.", "Delivered 25 backend routes and 14 MongoDB models, validated by 52 passing tests."] },
  { dates: "Jun 2025 — Dec 2025", company: "Digeon Technologies", team: "AI marketplace", role: "Software Engineering Intern", summary: "Built and deployed a five-service marketplace supporting real users, agents, and payments.", bullets: ["Supported 304 registered users, 200+ AI agents, and 127 completed Stripe-powered sales.", "Reduced p95 API latency 45% while handling 2.5× more concurrent requests.", "Scaled releases from 4 to 16+ per month with a zero-downtime CI/CD pipeline."] },
];

const capabilities = [
  { title: "AI systems", body: "Bedrock, LLM orchestration, caching, retrieval quality", proof: "Proven at Emergtech" },
  { title: "Backend platforms", body: "FastAPI, Flask, Node.js, REST APIs, WebSockets", proof: "Proven across 3 internships" },
  { title: "Data systems", body: "PostgreSQL, MongoDB, Redis, Prisma, SQLAlchemy", proof: "Proven at production scale" },
  { title: "Cloud & reliability", body: "AWS, Docker, GitHub Actions, CI/CD, monitoring", proof: "Proven with zero-downtime releases" },
];

function ArrowIcon() { return <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M11 6l4 4-4 4" /></svg>; }
function ExternalIcon() { return <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M8 5H5v10h10v-3M10 4h6v6M16 4l-7 7" /></svg>; }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSystem, setActiveSystem] = useState(0);
  const [openExperience, setOpenExperience] = useState(0);
  const system = systems[activeSystem];

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Bharadwaj Gade, home">BG<span>.</span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#work">Work</a><a href="#experience">Experience</a><a href="#profile">Profile</a>
          <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer">Résumé <ExternalIcon /></a>
        </nav>
        <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
        {menuOpen ? <nav className="mobile-nav" aria-label="Mobile navigation">{[["Work", "#work"], ["Experience", "#experience"], ["Profile", "#profile"], ["Résumé", "/resume.pdf"]].map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowIcon /></a>)}</nav> : null}
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Open to 2027 software engineering internships</p>
          <h1>Backend &amp; AI engineer building systems that <em>hold up.</em></h1>
          <p className="hero-intro">I&apos;m Bharadwaj, a Computer Science student at Michigan State. I build reliable AI pipelines, real-time data systems, and full-stack products with measurable outcomes.</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">Explore selected work <ArrowIcon /></a><a className="button button-secondary" href="/resume.pdf" target="_blank" rel="noreferrer">View résumé <ExternalIcon /></a></div>
          <div className="hero-meta" aria-label="Candidate details"><span>Michigan</span><span>Graduating May 2028</span><span>U.S. Citizen</span></div>
        </div>
        <div className="hero-portrait">
          <div className="portrait-frame"><Image src="/headshot.webp" alt="Bharadwaj Gade" fill priority sizes="(max-width: 900px) 88vw, 38vw" /><div className="portrait-caption"><span>Currently</span><strong>Systems Engineering &amp;<br />Automation Intern</strong></div></div>
          <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
        </div>
      </section>

      <section className="proof-strip" aria-label="Selected outcomes"><div className="proof-track shell">{proof.map((item) => <div className="proof-item" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div></section>

      <section className="systems-section shell section" aria-labelledby="systems-title">
        <div className="section-heading split-heading"><div><p className="eyebrow">How I think</p><h2 id="systems-title">Systems over screenshots.</h2></div><p>I like the part beneath the interface: how data moves, where reliability breaks, and which tradeoffs make a product faster without making it fragile.</p></div>
        <div className={`system-lab accent-${system.accent}`}>
          <div className="system-tabs" role="tablist" aria-label="System examples">{systems.map((item, index) => <button key={item.eyebrow} type="button" role="tab" aria-selected={activeSystem === index} onClick={() => setActiveSystem(index)}><span>0{index + 1}</span>{item.eyebrow.split(" / ")[1]}</button>)}</div>
          <div className="system-content" role="tabpanel">
            <div className="system-story"><p className="eyebrow">{system.eyebrow}</p><h3>{system.title}</h3><p>{system.summary}</p></div>
            <div className="system-flow" aria-label={`${system.title} architecture flow`}>{system.nodes.map((node, index) => <div className="flow-step" key={node}><span>{String(index + 1).padStart(2, "0")}</span><strong>{node}</strong>{index < system.nodes.length - 1 ? <i aria-hidden="true"><ArrowIcon /></i> : null}</div>)}</div>
            <div className="system-metric"><strong>{system.metric}</strong><span>{system.metricLabel}</span></div>
          </div>
        </div>
      </section>

      <section className="work-section section" id="work" aria-labelledby="work-title"><div className="shell">
        <div className="section-heading"><p className="eyebrow">Selected work</p><h2 id="work-title">Built for real users.<br />Measured in real outcomes.</h2></div>
        <div className="project-list">{projects.map((project) => <article className={`project-card accent-${project.accent}`} key={project.title}>
          <div className="project-index"><span>{project.number}</span><p>{project.category}</p></div>
          <div className="project-main"><h3>{project.title}</h3><p>{project.summary}</p><div className="impact-list">{project.impact.map((impact) => <span key={impact}>{impact}</span>)}</div><p className="project-stack">{project.stack}</p></div>
          <div className="project-actions"><Link className="round-link" href={project.href} aria-label={`Read ${project.title} case study`}><ArrowIcon /></Link>{project.live ? <a href={project.live} target="_blank" rel="noreferrer">Live site <ExternalIcon /></a> : null}</div>
        </article>)}</div>
      </div></section>

      <section className="experience-section shell section" id="experience" aria-labelledby="experience-title">
        <div className="section-heading split-heading"><div><p className="eyebrow">Experience</p><h2 id="experience-title">Where I&apos;ve shipped.</h2></div><p>Three engineering roles spanning AI automation, analytics, infrastructure, and production SaaS.</p></div>
        <div className="experience-list">{experience.map((item, index) => { const open = openExperience === index; return <article className={open ? "experience-row is-open" : "experience-row"} key={item.company}>
          <button type="button" aria-expanded={open} onClick={() => setOpenExperience(open ? -1 : index)}><span className="experience-date">{item.dates}</span><span className="experience-company"><strong>{item.company}</strong><small>{item.team}</small></span><span className="experience-role">{item.role}</span><span className="experience-toggle" aria-hidden="true">{open ? "−" : "+"}</span></button>
          <div className="experience-detail" hidden={!open}><p>{item.summary}</p><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>
        </article>; })}</div>
      </section>

      <section className="profile-section section" id="profile" aria-labelledby="profile-title"><div className="shell profile-grid">
        <div className="profile-intro"><p className="eyebrow">Engineering profile</p><h2 id="profile-title">Broad toolkit.<br />Backend center of gravity.</h2><p>I care about the details that make software dependable: clean interfaces, traceable data, sensible failure modes, and performance you can measure.</p></div>
        <div className="capability-list">{capabilities.map((item, index) => <div className="capability" key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.body}</p><small>{item.proof}</small></div></div>)}</div>
      </div></section>

      <section className="contact-section shell section" id="contact"><p className="eyebrow">Let&apos;s build something useful</p><h2>Looking for an engineer<br />who owns the outcome?</h2><div className="contact-row"><a className="button button-primary" href="mailto:gadebhar@msu.edu">Start a conversation <ArrowIcon /></a><div className="social-links"><a href="https://www.linkedin.com/in/bharadwaj-gade/" target="_blank" rel="noreferrer">LinkedIn <ExternalIcon /></a><a href="https://github.com/bgade06" target="_blank" rel="noreferrer">GitHub <ExternalIcon /></a></div></div></section>
      <footer className="site-footer shell"><p>© 2026 Bharadwaj Gade</p><p>Designed &amp; engineered in Michigan.</p><a href="#top">Back to top ↑</a></footer>
      <div className="mobile-action-bar"><a href="mailto:gadebhar@msu.edu">Email</a><a href="/resume.pdf" target="_blank" rel="noreferrer">Résumé</a><a href="https://www.linkedin.com/in/bharadwaj-gade/" target="_blank" rel="noreferrer">LinkedIn</a></div>
    </main>
  );
}
