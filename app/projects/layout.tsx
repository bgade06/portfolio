export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <a href="/" className="font-mono text-sm text-cyan-400 tracking-wider">
            &gt; BG<span className="animate-blink">_</span>
          </a>
          <nav className="flex gap-7 text-sm font-mono">
            {["about", "projects", "skills", "contact"].map((s) => (
              <a
                key={s}
                href={`/#${s}`}
                className="text-slate-500 hover:text-cyan-400 transition-colors"
              >
                ./{s}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16">
        {children}
      </div>
    </main>
  );
}
