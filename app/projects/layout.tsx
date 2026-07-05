export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
                href={`/#${s}`}
                className="text-slate-500 hover:text-sky-400 transition-colors"
              >
                ./{s}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-8 py-12 md:py-16">
        {children}
      </div>
    </main>
  );
}
