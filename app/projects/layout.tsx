"use client";

import { useState } from "react";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
                href={`/#${s}`}
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
                href={`/#${s}`}
                onClick={() => setMenuOpen(false)}
                className="px-6 py-3 text-slate-400 hover:text-sky-400 hover:bg-white/5 transition-colors border-b border-white/[0.03] last:border-b-0"
              >
                ./{s}
              </a>
            ))}
          </nav>
        )}
      </header>

      <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-8 py-12 md:py-16">
        {children}
      </div>
    </main>
  );
}
