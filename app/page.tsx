const projects = [
  {
    title: "AI Study Tool",
    desc: "Turns notes into quizzes + flashcards. Built for fast studying with real UX.",
    tags: ["Next.js", "TypeScript", "API", "UI/UX"],
    live: "#",
    repo: "#",
  },
  {
    title: "Full-Stack SaaS App",
    desc: "Auth + database + dashboards. Built like a real product, not a class project.",
    tags: ["React", "Postgres", "Prisma", "Auth"],
    live: "#",
    repo: "#",
  },
  {
    title: "Systems Project",
    desc: "Rate-limited API + caching layer. Focused on performance + clean architecture.",
    tags: ["Node", "Redis", "Docker", "Testing"],
    live: "#",
    repo: "#",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-40 right-[-120px] h-[420px] w-[420px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[-180px] left-[-120px] h-[480px] w-[480px] rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-sm tracking-widest text-white/80">PORTFOLIO</div>
          <nav className="flex gap-6 text-sm text-white/70">
            <a className="hover:text-white transition" href="#about">
              About
            </a>
            <a className="hover:text-white transition" href="#projects">
              Projects
            </a>
            <a className="hover:text-white transition" href="#contact">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto flex min-h-[85vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="animate-in fade-in duration-700">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
            Full-Stack • Systems-Oriented • Built with Discipline
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Hi, I’m <span className="text-white">Bharadwaj</span>.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
  I build software with intention, practical systems shaped by real problems. My focus is clarity, reliability, and thoughtful execution from interface to infrastructure. Every project is something I would confidently use myself.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#projects"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] active:scale-[0.98]"
            >
              View Projects
            </a>

            <a
              href="/resume.pdf"
              className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Resume
            </a>

            <a
              href="https://github.com/bgade06"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-white/80 transition hover:text-white hover:bg-white/5"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight">About</h2>
            <p className="text-white/70 leading-relaxed">
                Software engineering is where structure meets creativity for me. 
                I approach projects with a clear head and long-term perspective, designing systems that are maintainable, scalable, and purposeful.
            </p>
            <p className="text-white/70 leading-relaxed">
              I’m currently building projects that demonstrate authentication, databases,
              APIs, performance, and deployment.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold mb-4">Technical Foundation</h3>
            <div className="flex flex-wrap gap-2">
              {["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-4">How I Build</h3>
            <ul className="space-y-2 text-white/70 text-sm">
                <li>• Clear structure and maintainable architecture</li>
                <li>• Interfaces that feel simple and intentional</li>
                <li>• Reliable systems that I can confidently deploy and use</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Projects</h2>
            <p className="mt-2 text-white/70">
              Each project is deployed + backed by readable code.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-white/20"
            >
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{p.desc}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-3 text-sm">
                <a
                  href={p.live}
                  className="rounded-lg bg-white px-3 py-2 font-semibold text-black transition hover:scale-[1.02] active:scale-[0.98]"
                >
                  Live
                </a>
                <a
                  href={p.repo}
                  className="rounded-lg border border-white/20 px-3 py-2 font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
                >
                  Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative mx-auto max-w-6xl px-6 pb-24 text-center">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10">
          <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>

          <p className="mx-auto mt-3 max-w-2xl text-white/70">
            If you’d like to connect, collaborate, or discuss opportunities,
            feel free to reach out directly.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <a
              href="mailto:gadebhar@msu.edu"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] active:scale-[0.98]"
            >
              Email
            </a>

            <a
              href="https://www.linkedin.com/in/bharadwaj-gade/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              LinkedIn
            </a>

            <a
              href="https://github.com/bgade06"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              GitHub
            </a>

          </div>
        </div>

        <p className="mt-10 text-xs text-white/50">
          © {new Date().getFullYear()} Bharadwaj. Built with Next.js + Tailwind.
        </p>
      </section> 
    </main>
  );
}