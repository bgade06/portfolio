export default function SuccessSocietyProject() {
  return (
    <>
      <div className="mb-12">
        <a href="/" className="text-cyan-400 hover:text-cyan-300 text-sm font-mono mb-4 inline-block">
          ← Back
        </a>
        <h1 className="text-4xl font-black tracking-tight mb-2">Success Society</h1>
        <p className="text-slate-400">AI-powered SaaS for lead generation</p>
      </div>

      <div className="space-y-12">
        {/* Problem */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Problem</h2>
          <p className="text-slate-300 leading-relaxed">
            Sales teams spend hours manually qualifying leads. They need an automated system that generates qualified prospects, manages subscriptions fairly, and tracks usage in real-time. The backend needs to handle metered billing (pay per lead), integrate with external tools (Discord, AI models), and provide an audit trail for financial accuracy.
          </p>
        </section>

        {/* Architecture */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Architecture</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              The system is a multi-tenant SaaS built with Next.js backend and Supabase for user management and database. Each tenant has isolated data with row-level security enforced at the database level, not just application logic.
            </p>
            <p className="leading-relaxed">
              Stripe handles subscription management and metered billing. When a user consumes a lead, we log it with Stripe. Stripe calculates overage charges based on the usage records. We query Stripe's usage API to show users their current consumption.
            </p>
            <p className="leading-relaxed">
              Lead generation happens through an Anthropic API integration. Prompts are crafted to generate realistic, targeted leads based on the user's criteria. Results are cached in Supabase to avoid redundant API calls.
            </p>
            <p className="leading-relaxed">
              Discord notifications keep users engaged. When leads are generated, Discord bot posts a summary. Subscription changes also trigger Discord alerts so the user never misses billing updates.
            </p>
          </div>
        </section>

        {/* Technical Challenges */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Technical Challenges</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-white mb-2">Metered billing reconciliation</h3>
              <p className="text-slate-400">
                The system needs to accurately record every lead generated. If a request fails after consuming the lead, we still need to bill for it. Solution: record usage in Supabase first (idempotent), then send to Stripe. If Stripe fails, retry with exponential backoff. Stripe's idempotency keys ensure duplicate submissions don't double-charge.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Coordinating multiple external APIs</h3>
              <p className="text-slate-400">
                A lead generation request touches Anthropic (AI), Stripe (billing), and Discord (notifications). If one fails, the others might succeed, leaving inconsistent state. We use a saga pattern: record a transaction log, then execute steps sequentially. If a step fails, we have a record to retry or manually fix.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Row-level security in Supabase</h3>
              <p className="text-slate-400">
                Multi-tenant means one tenant's data must never leak to another. Supabase RLS policies enforce this at the database level. Even if the application code is compromised, queries can only access the authenticated user's data. No magic, just SQL predicates on every query.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Real-time billing updates for users</h3>
              <p className="text-slate-400">
                Users want to know their current usage without refreshing. We query Stripe's metered billing API on each request (with caching). Stripe rate limits these queries, so we cache for 30 seconds. Tradeoff: slightly stale usage data, but acceptable for real-time awareness.
              </p>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Key Features</h2>
          <ul className="space-y-3">
            <li className="flex gap-3 text-slate-300">
              <span className="text-violet-400 shrink-0">▸</span>
              <span><strong>Metered billing</strong> — Pay per lead generated, not a flat subscription rate. Fair pricing for low-volume users.</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-violet-400 shrink-0">▸</span>
              <span><strong>AI lead generation</strong> — Anthropic generates realistic prospects based on user criteria. Cached results prevent redundant API calls.</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-violet-400 shrink-0">▸</span>
              <span><strong>Discord integration</strong> — Leads and billing updates post to Discord in real-time. Users stay informed without checking email.</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-violet-400 shrink-0">▸</span>
              <span><strong>Real-time usage tracking</strong> — Dashboard shows current lead consumption, overage charges, and billing forecast.</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-violet-400 shrink-0">▸</span>
              <span><strong>Multi-tenant isolation</strong> — Each user's data is isolated at the database layer with Supabase RLS.</span>
            </li>
          </ul>
        </section>

        {/* Engineering Decisions */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Engineering Decisions</h2>
          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="font-semibold text-white mb-2">Supabase over custom auth</h3>
              <p className="text-slate-400">
                Building authentication is tedious and error-prone (password hashing, session management, MFA). Supabase provides PostgreSQL + auth out of the box. Tradeoff: less control over auth flow, but gains security and speed to market.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Stripe metered billing over flat rates</h3>
              <p className="text-slate-400">
                Flat subscriptions are simple but unfair. A user generating 1 lead pays the same as someone generating 100. Metered billing is fairer, attracts price-conscious customers. Stripe handles the complexity. We just log usage, Stripe does the math.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Transaction log for saga coordination</h3>
              <p className="text-slate-400">
                Coordinating multiple external APIs is risky. We log every transaction before executing steps. If anything fails, we have a record. Retries are idempotent because we check the log first: "did we already bill this lead?" If yes, skip billing, just notify Discord again.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Database-level RLS, not application checks</h3>
              <p className="text-slate-400">
                Row-level security policies in PostgreSQL enforce tenant isolation. Application code doesn't decide access—the database does. Much safer than relying on application logic. One less place for a bug to leak data.
              </p>
            </div>
          </div>
        </section>

        {/* Results */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Results</h2>
          <ul className="space-y-3">
            <li className="flex gap-3 text-slate-300">
              <span className="text-violet-400 shrink-0">▸</span>
              <span>Processes <strong>metered billing</strong> with zero reconciliation errors</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-violet-400 shrink-0">▸</span>
              <span>Generates leads with <strong>Anthropic API</strong> and caches results to reduce costs</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-violet-400 shrink-0">▸</span>
              <span>Discord bot reaches users with <strong>real-time notifications</strong>, no email delays</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-violet-400 shrink-0">▸</span>
              <span>Multi-tenant with <strong>Supabase RLS</strong> enforcing data isolation at the database layer</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-violet-400 shrink-0">▸</span>
              <span>Handles concurrent requests from multiple tenants without cross-tenant data leaks</span>
            </li>
          </ul>
        </section>

        {/* Links */}
        <div className="pt-8 border-t border-white/10 flex gap-4">
          <a
            href="https://github.com/bgade06"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-violet-400 px-6 py-2.5 text-sm font-bold text-black hover:bg-violet-300 transition-colors"
          >
            View Code →
          </a>
          <a
            href="/"
            className="rounded-lg border border-white/10 px-6 py-2.5 text-sm font-bold hover:border-white/25 hover:bg-white/5 transition-colors"
          >
            Back to Projects
          </a>
        </div>
      </div>
    </>
  );
}
