export default function InternshipProject() {
  return (
    <>
      <div className="mb-12">
        <a href="/" className="text-cyan-400 hover:text-cyan-300 text-sm font-mono mb-4 inline-block">
          ← Back
        </a>
        <h1 className="text-4xl font-black tracking-tight mb-2">Backend Internship</h1>
        <p className="text-slate-400">Production microservices on AWS</p>
      </div>

      <div className="space-y-12">
        {/* Problem */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Problem</h2>
          <p className="text-slate-300 leading-relaxed">
            Large systems are rarely monoliths. They're built from multiple services, each handling a specific domain. As an intern, the challenge was learning how services communicate, how they share data, how they fail independently without taking down the whole system, and how deployments actually work in production. This wasn't toy code—it was code running in production with real users and real monitoring.
          </p>
        </section>

        {/* Architecture */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Architecture</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              The company runs 6 Flask microservices, each deployed independently on AWS EC2 instances. Services are organized by domain: user management, billing, content, analytics, etc. Each has its own PostgreSQL database to avoid shared schema dependencies.
            </p>
            <p className="leading-relaxed">
              Communication happens over HTTP. No message queues or event buses (yet). Services call each other synchronously. This is simpler but creates coupling. We learned about timeouts, retries, and circuit breakers—essential patterns when one slow service can cascade failures.
            </p>
            <p className="leading-relaxed">
              AWS RDS manages the databases. Schema changes require coordination across teams (a real pain point). CloudWatch monitors logs and metrics. Deployments use a simple blue-green pattern: new code runs on a staging instance, verified, then swapped to production.
            </p>
          </div>
        </section>

        {/* Technical Challenges */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Technical Challenges</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-white mb-2">Debugging production issues</h3>
              <p className="text-slate-400">
                Local environment doesn't match production. Same code, different data, different load. Early on, I'd fix something locally and it'd break in production. Solution: read the logs. Set up proper logging (what request came in, what queries ran, what errors happened). CloudWatch was our friend. Still is.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Schema migrations without downtime</h3>
              <p className="text-slate-400">
                Changing a database schema while production is running is risky. Adding a column that's not nullable? Existing rows fail. Solution: deploy in stages. First, deploy code that ignores the new column. Then add the column with a default. Then populate existing rows. Finally, deploy code that uses the new column. Slow but safe.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Testing without a production database</h3>
              <p className="text-slate-400">
                Unit tests mock the database. Integration tests use a test database. But edge cases appear only under real load with real data. We write integration tests that cover the common paths. They run before every deployment. Not perfect, but catches most mistakes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Coordinating with other teams</h3>
              <p className="text-slate-400">
                Every service change affects someone. If your service starts failing, the downstream service fails too. We learned to communicate changes, coordinate deployments, and always have a rollback plan. Slack messages matter. Documentation matters.
              </p>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Key Features</h2>
          <ul className="space-y-3">
            <li className="flex gap-3 text-slate-300">
              <span className="text-indigo-400 shrink-0">▸</span>
              <span><strong>6 Flask microservices</strong> — Each focused on a single domain, independently deployable.</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-indigo-400 shrink-0">▸</span>
              <span><strong>AWS deployment</strong> — EC2 instances running Docker containers, RDS for databases, CloudWatch for monitoring.</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-indigo-400 shrink-0">▸</span>
              <span><strong>Integration tests</strong> — Every deployment runs full integration test suite against a test database replica.</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-indigo-400 shrink-0">▸</span>
              <span><strong>Zero-downtime deployments</strong> — Blue-green pattern ensures old code keeps running while new code is verified.</span>
            </li>
          </ul>
        </section>

        {/* Engineering Decisions */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Engineering Decisions</h2>
          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="font-semibold text-white mb-2">Microservices over monolith</h3>
              <p className="text-slate-400">
                Independent deployments and scaling are worth the operational complexity. One service goes down, others keep running. We can deploy a bug fix without redeploying the whole system. Tradeoff: coordinating services is harder than coordinating one codebase.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Separate database per service</h3>
              <p className="text-slate-400">
                Services could share a database with strict access controls. Instead, each has its own. Forces clean APIs between services. If you need another service's data, you call their API. Prevents tight coupling. Tradeoff: no joins across services, some data duplication.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Synchronous HTTP calls over async events</h3>
              <p className="text-slate-400">
                No message queue. Services call each other directly. Simpler to understand and debug. Tradeoff: tight coupling and cascading failures. If the billing service is slow, the user service waits. The right call for a small team, but we're moving toward async as we scale.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Comprehensive integration tests, not just unit tests</h3>
              <p className="text-slate-400">
                Unit tests mock everything, hiding real issues. Integration tests run against a real test database and call real services. Slower but catch real bugs. We run them before every production deployment. Prevented more issues than I can count.
              </p>
            </div>
          </div>
        </section>

        {/* Results & Learning */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Results & Learning</h2>
          <ul className="space-y-3">
            <li className="flex gap-3 text-slate-300">
              <span className="text-indigo-400 shrink-0">▸</span>
              <span><strong>6 microservices</strong> running in production across multiple domains</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-indigo-400 shrink-0">▸</span>
              <span><strong>Zero-downtime deployments</strong> — rolled out changes without service interruption</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-indigo-400 shrink-0">▸</span>
              <span><strong>Safe schema migrations</strong> — changed databases without data loss or downtime</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-indigo-400 shrink-0">▸</span>
              <span>Learned the real cost of distributed systems: complexity, debugging difficulty, operational overhead. Worth it at scale, not at startup.</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-indigo-400 shrink-0">▸</span>
              <span>Learned that production is different: monitoring matters, logging matters, testing matters. Toy projects don't teach this.</span>
            </li>
          </ul>
        </section>

        {/* Links */}
        <div className="pt-8 border-t border-white/10 flex gap-4">
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
