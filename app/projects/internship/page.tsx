export default function InternshipProject() {
  return (
    <>
      <div className="mb-12">
        <a href="/" className="text-sky-400 hover:text-sky-300 text-sm font-mono mb-4 inline-block">
          ← Back
        </a>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">Backend Internship</h1>
        <p className="text-slate-400 text-sm md:text-base">A case study in production engineering at scale</p>
      </div>

      <div className="space-y-12">
        {/* Problem */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">The Problem</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              The company runs multiple services (billing, user management, content, analytics). Each service has its own database, deployment pipeline, and team responsible for it. The challenge: how do you maintain reliability when changes to one service can affect others? How do you deploy without downtime? How do you handle database migrations at scale?
            </p>
            <p className="leading-relaxed">
              As an intern, I was tasked with: understanding how production systems work, participating in real deployments, debugging production issues, and implementing features that serve real users. No safe sandbox—actual production code.
            </p>
            <p className="text-sm text-slate-400">
              The learning curve was steep. Local development doesn't look like production. Testing doesn't catch everything production does. Systems fail in unexpected ways.
            </p>
          </div>
        </section>

        {/* Architecture */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">System Architecture & Deployment</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              6 Flask microservices. Each runs on its own AWS EC2 instance. Each has its own PostgreSQL database (separate RDS instance). Services communicate synchronously via HTTP (no message queues yet—simpler, but tighter coupling).
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm space-y-3">
              <div>
                <p className="font-semibold text-white mb-1">Service Independence</p>
                <p className="text-slate-400">Each service owns its database. No shared schema. If you need another service's data, you call their API. Prevents tight coupling and allows independent scaling.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Deployment Pipeline</p>
                <p className="text-slate-400">Blue-green deployments. New code runs on a staging instance, verified, then swapped to production. Old code still runs until we confirm new code is healthy. Rollback is one swap away.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Monitoring & Logging</p>
                <p className="text-slate-400">CloudWatch monitors logs and metrics. Alerts fire if error rates spike or latency increases. Critical for catching problems before users do.</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm mt-4">
              This architecture works for a small team. Synchronous calls simplify debugging but create cascading failures. As the company scales, async messaging (event bus) will be necessary.
            </p>
          </div>
        </section>

        {/* Technical Decisions */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">Technical Decisions & Tradeoffs</h2>
          <div className="space-y-5">
            <div className="border-l-2 border-indigo-400/30 pl-4">
              <h3 className="font-semibold text-white mb-2">Microservices over monolith</h3>
              <p className="text-slate-300 mb-2">
                Separate services for billing, users, content, analytics.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Why:</strong> Independent deployments. One service can be restarted without affecting others. Clear ownership boundaries. Easier to scale one hot service without scaling everything.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong>Tradeoff:</strong> Distributed systems are harder. Debugging is harder. Changes affecting multiple services require coordination. Worth it at this scale.
              </p>
            </div>

            <div className="border-l-2 border-indigo-400/30 pl-4">
              <h3 className="font-semibold text-white mb-2">Separate database per service</h3>
              <p className="text-slate-300 mb-2">
                Each service has its own PostgreSQL instance. No shared schema.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Why:</strong> Prevents tight coupling. If billing changes its schema, users service isn't affected. Database owner is responsible for migrations, backups, and performance.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong>Tradeoff:</strong> No joins across services (must call APIs). Some data duplication. Acceptable to avoid the "shared database couples everything" problem.
              </p>
            </div>

            <div className="border-l-2 border-indigo-400/30 pl-4">
              <h3 className="font-semibold text-white mb-2">Synchronous HTTP over async messaging</h3>
              <p className="text-slate-300 mb-2">
                Services call each other directly. No message queue.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Why:</strong> Simpler to build and debug. Request-response is easier to reason about than eventual consistency and retries. Works fine for the current scale.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong>Tradeoff:</strong> If one service is slow, requests queue up. Cascading failures if one service goes down. At higher scale, this becomes unacceptable, and you need async messaging.
              </p>
            </div>

            <div className="border-l-2 border-indigo-400/30 pl-4">
              <h3 className="font-semibold text-white mb-2">Blue-green deployments</h3>
              <p className="text-slate-300 mb-2">
                New code runs alongside old code, then swaps traffic.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Why:</strong> Zero-downtime deployments. If new code is broken, rollback instantly. Vastly simpler than coordinating a service restart.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong>Tradeoff:</strong> Requires more infrastructure (staging instance for each service). Worth it for reliability.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">Challenges & Learning</h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-white mb-2">Debugging production issues</h3>
              <p className="text-slate-400 mb-2 text-sm">
                A feature worked in development but failed in production. Same code, different data, different load. Couldn't reproduce locally.
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Solution:</strong> Read the logs in CloudWatch. Turned out a downstream service was occasionally timing out, causing cascading failures. Added timeout handling and retry logic. Lesson: production is different. Always monitor.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Schema migrations without downtime</h3>
              <p className="text-slate-400 mb-2 text-sm">
                Wanted to add a NOT NULL column to a table. But existing rows don't have values. Adding the column blocks writes until it's populated.
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Solution:</strong> Expand-contract pattern. Deploy code that ignores the new column. Add the column with a default value (non-blocking). Backfill existing rows in the background. Finally, deploy code that uses the new column. Each step is independent, database stays available.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Cascading failures between services</h3>
              <p className="text-slate-400 mb-2 text-sm">
                One service got slow, causing timeouts. Clients kept retrying, making it worse. Eventually, dependent services timed out too, cascading to the entire system.
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Solution:</strong> Implement circuit breakers and timeouts. If a service times out, stop calling it for 30 seconds. Return a cached response if available. Prevents the cascade.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Testing in production</h3>
              <p className="text-slate-400 mb-2 text-sm">
                Unit tests caught ~50% of bugs. Integration tests caught another ~40%. The remaining 10% only appeared under real load with real data.
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Solution:</strong> Write comprehensive integration tests. Run them in a staging environment that mirrors production. Monitor production closely (alerts on error rates). Catch problems early before users do.
              </p>
            </div>
          </div>
        </section>

        {/* What I Learned */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">Key Learning & Outcomes</h2>
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-sm text-slate-300 mb-4">
                Working on production systems taught me things that no tutorial or course can convey. Real systems are messy. They fail in unexpected ways. Documentation is incomplete. You have to read code, understand tradeoffs, and make decisions with incomplete information.
              </p>
              <div className="grid gap-3 text-sm">
                <div>
                  <p className="font-semibold text-white mb-1">✓ Deployed code that serves real users</p>
                  <p className="text-slate-400">Features I built are used daily. No sandbox.</p>
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">✓ Debugged production incidents</p>
                  <p className="text-slate-400">Read logs, understood distributed failures, implemented fixes. Under pressure, without all the information.</p>
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">✓ Performed zero-downtime deployments</p>
                  <p className="text-slate-400">Blue-green swaps, rolling updates, careful coordination across services. Reliability matters.</p>
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">✓ Learned the cost of distributed systems</p>
                  <p className="text-slate-400">Microservices scale independently but add complexity. Synchronous calls are simple but fragile. Tradeoffs matter.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="font-semibold text-white mb-2">Most important lesson:</p>
              <p className="text-sm text-slate-300">
                Shipping matters. Theory is useful, but production experience teaches what matters and what doesn't. I know the cost of a slow query because I've seen it cascade. I know why idempotency matters because I've seen duplicate charges. I know why monitoring is critical because I've debugged failures in production logs.
              </p>
            </div>
          </div>
        </section>

        {/* Links */}
        <div className="pt-8 border-t border-white/10 flex gap-4">
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
