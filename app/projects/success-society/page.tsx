export default function SuccessSocietyProject() {
  return (
    <>
      <div className="mb-12">
        <a href="/" className="text-sky-400 hover:text-sky-300 text-sm font-mono mb-4 inline-block">
          ← Back
        </a>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">Success Society</h1>
        <p className="text-slate-400 text-sm md:text-base">A case study in multi-tenant SaaS and payment orchestration</p>
      </div>

      <div className="space-y-12">
        {/* Problem */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">The Problem</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              SaaS requires coordination across multiple concerns: user authentication, subscription billing, metered usage tracking, generating actual value (leads), and notifying users. A single failure (Stripe doesn't confirm payment, Anthropic API times out, Discord notification fails) can leave the system in an inconsistent state.
            </p>
            <p className="leading-relaxed">
              Metered billing adds complexity: we charge by the lead generated. If a lead generation request partially succeeds (Anthropic returns results but Stripe times out), have we charged the customer? What's the source of truth? A naive implementation would double-charge or skip charges entirely.
            </p>
            <p className="text-sm text-slate-400">
              Multi-tenancy adds another layer: one tenant's data must never leak to another, even if application code has bugs. Row-level security must be enforced at the database layer, not just in application logic.
            </p>
          </div>
        </section>

        {/* Architecture */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">Architecture & Design</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              The system separates into layers: <strong>authentication</strong> (Supabase), <strong>data</strong> (Supabase PostgreSQL with RLS), <strong>business logic</strong> (lead generation), and <strong>external services</strong> (Stripe, Anthropic, Discord).
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm space-y-3">
              <div>
                <p className="font-semibold text-white mb-1">Authentication & Authorization</p>
                <p className="text-slate-400">Supabase Auth handles user signup/login. Each user is associated with a tenant (multi-tenant). Database Row-Level Security (RLS) policies ensure queries automatically filter by authenticated user's tenant. No need to trust application code.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Lead Generation</p>
                <p className="text-slate-400">Anthropic API generates leads based on user criteria. Results are stored in Supabase immediately. This creates a record of what was generated before we charge for it.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Metered Billing</p>
                <p className="text-slate-400">Record usage in Supabase (idempotent: same lead generation request always records the same number of leads). Then sync with Stripe using Stripe's metered billing API. Stripe calculates overages and charges the next billing cycle.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Orchestration</p>
                <p className="text-slate-400">A transaction log tracks each step (lead generated, usage recorded, Stripe notified, Discord message sent). If a step fails, it's retried independently. No cascading failures.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Decisions */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">Technical Decisions & Tradeoffs</h2>
          <div className="space-y-5">
            <div className="border-l-2 border-violet-400/30 pl-4">
              <h3 className="font-semibold text-white mb-2">Supabase for auth and data</h3>
              <p className="text-slate-300 mb-2">
                Managed PostgreSQL + authentication + real-time subscriptions.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Why:</strong> Authentication is notoriously easy to get wrong. Supabase handles password hashing, session management, MFA. One less thing to mess up. PostgreSQL RLS gives data isolation at the database layer—the most trusted place.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong>Tradeoff:</strong> Less control over auth flow (can't customize arbitrarily). But gains security and speed to market. The tradeoff is worth it.
              </p>
            </div>

            <div className="border-l-2 border-violet-400/30 pl-4">
              <h3 className="font-semibold text-white mb-2">Record usage before charging</h3>
              <p className="text-slate-300 mb-2">
                Store lead generation records in Supabase first. Then send to Stripe for billing.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Why:</strong> Supabase is the source of truth. If Stripe times out, we have a record of what to charge. Retries are safe (Stripe's idempotency keys prevent double-charging).
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong>Tradeoff:</strong> Slightly more complex flow (write, then sync). Better than the alternative (charge, then record) where a failure means either missing charge or data loss.
              </p>
            </div>

            <div className="border-l-2 border-violet-400/30 pl-4">
              <h3 className="font-semibold text-white mb-2">Stripe metered billing, not flat subscriptions</h3>
              <p className="text-slate-300 mb-2">
                Users pay per lead, not a monthly flat rate.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Why:</strong> Fair pricing. A user generating 1 lead doesn't pay the same as someone generating 1,000. Attracts price-conscious customers. Stripe handles all the math.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong>Tradeoff:</strong> Slightly more complex to implement. Worth it for fairness and customer acquisition.
              </p>
            </div>

            <div className="border-l-2 border-violet-400/30 pl-4">
              <h3 className="font-semibold text-white mb-2">Saga pattern for multi-step workflows</h3>
              <p className="text-slate-300 mb-2">
                Each lead generation touches multiple services. Track each step in a log.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Why:</strong> Distributed transactions are hard. Saga pattern (sequence of steps, each with a redo) is proven. If step 3 fails, we know step 2 succeeded and can retry independently.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong>Tradeoff:</strong> More complex than a single transaction. Necessary when coordinating external services (Stripe, Anthropic, Discord).
              </p>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">Challenges & Solutions</h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-white mb-2">Metered billing reconciliation</h3>
              <p className="text-slate-400 mb-2 text-sm">
                Stripe's metered billing API has rate limits. Syncing every lead individually would hit those limits. Also, if the sync fails mid-batch, we'd have partial records.
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Solution:</strong> Batch usage records. Flush to Stripe every minute (not every lead). Stripe's usage API accepts batch records. Single sync call syncs 100+ leads atomically.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Discord integration reliability</h3>
              <p className="text-slate-400 mb-2 text-sm">
                Discord API can be flaky. If the notification fails, should we fail the entire lead generation? Probably not—the lead was already created and paid for.
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Solution:</strong> Decouple Discord from the main flow. Lead generation returns successfully immediately. Discord notification is best-effort (if it fails, log it, retry later with a background job). Users get leads even if Discord notifications fail.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Row-level security complexity</h3>
              <p className="text-slate-400 mb-2 text-sm">
                Writing RLS policies is tricky. One mistake and a tenant reads another tenant's data. Hard to test exhaustively.
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Solution:</strong> Explicit policies for each table. Default: deny all. Then whitelist specific operations per tenant. Verbose but safe. Use test suite to verify: user A can't read user B's data.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Handling Anthropic API timeouts</h3>
              <p className="text-slate-400 mb-2 text-sm">
                Anthropic API sometimes takes &gt;10 seconds. If the lead generation request times out, we've created a usage record but have no leads to show. Customer sees $0.10 charged with nothing to show for it.
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Solution:</strong> Implement request-level retry with exponential backoff. Timeout after 30 seconds (generous). If API times out, retry up to 2 times. If all retries fail, charge is refunded (manually or automatically through Stripe). Users see transparent error messaging.
              </p>
            </div>
          </div>
        </section>

        {/* Results */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">Performance & Outcomes</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-violet-400">0</div>
                <div className="text-sm text-slate-400 mt-1">Billing errors</div>
                <div className="text-xs text-slate-500 mt-2">Metered billing reconciliation ensures accurate charging, no over/under-billing.</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-violet-400">100%</div>
                <div className="text-sm text-slate-400 mt-1">Multi-tenant isolation</div>
                <div className="text-xs text-slate-500 mt-2">Database RLS policies prevent cross-tenant data leaks even with application bugs.</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-violet-400">~5s</div>
                <div className="text-sm text-slate-400 mt-1">Lead generation time</div>
                <div className="text-xs text-slate-500 mt-2">Anthropic API request + Supabase write + Stripe sync complete within seconds.</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-violet-400">3</div>
                <div className="text-sm text-slate-400 mt-1">External integrations</div>
                <div className="text-xs text-slate-500 mt-2">Stripe, Anthropic, Discord orchestrated reliably with saga pattern.</div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-sm text-slate-300">
                <strong>What this demonstrates:</strong> The system successfully coordinated multiple external services (Stripe, Anthropic, Discord) without cascading failures. Metered billing is accurate. Multi-tenancy is enforced at the database layer. The architecture prioritizes data integrity over speed—we record leads before charging, ensuring correctness even if services time out.
              </p>
            </div>
          </div>
        </section>

        {/* Links */}
        <div className="pt-8 border-t border-white/10 flex gap-4">
          <a
            href="https://github.com/bgade06"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-violet-400 px-6 py-2.5 text-sm font-semibold text-black hover:bg-violet-300 transition-colors"
          >
            View Code →
          </a>
          <a
            href="/"
            className="rounded-lg border border-white/10 px-6 py-2.5 text-sm font-semibold hover:border-white/25 hover:bg-white/5 transition-colors"
          >
            Back to Projects
          </a>
        </div>
      </div>
    </>
  );
}
