export default function SolanaProject() {
  return (
    <>
      <div className="mb-12">
        <a href="/" className="text-cyan-400 hover:text-cyan-300 text-sm font-mono mb-4 inline-block">
          ← Back
        </a>
        <h1 className="text-4xl font-black tracking-tight mb-2">Solana Market Intelligence Platform</h1>
        <p className="text-slate-400">Real-time trading signals from on-chain data</p>
      </div>

      <div className="space-y-12">
        {/* Problem */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Problem</h2>
          <p className="text-slate-300 leading-relaxed">
            Crypto traders need real-time market intelligence to make informed trading decisions. The challenge isn't just fetching data—it's processing it fast enough to be useful. By the time you analyze a signal, the market has already moved. We built a backend that could ingest market data, run analysis, and serve results in under 100ms.
          </p>
        </section>

        {/* Architecture */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Architecture</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              The system runs on FastAPI with async/await to handle I/O-bound operations efficiently. Market data comes in through WebSocket feeds from multiple exchanges. Each new price tick triggers analysis without blocking subsequent updates.
            </p>
            <p className="leading-relaxed">
              PostgreSQL stores the canonical record: price history, wallet activity, trading signals. Redis sits in front for caching hot data and for real-time pub/sub. SQLAlchemy handles the ORM layer with explicit query optimization for analytical workloads.
            </p>
            <p className="leading-relaxed">
              ML pipelines run asynchronously using background workers. Signals are computed and stored, not computed on-demand. This separation means the API always responds instantly even when pipelines are running heavy workloads.
            </p>
          </div>
        </section>

        {/* Technical Challenges */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Technical Challenges</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-white mb-2">Latency at scale</h3>
              <p className="text-slate-400">
                Market feeds fire hundreds of messages per second. Early attempts queued everything, causing backpressure. Solution: separate ingestion from analysis. Ingestion is write-only and fast. Analysis is async and can lag slightly without breaking the system. Redis pub/sub decouples producers from consumers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Correctness over speed</h3>
              <p className="text-slate-400">
                Trading signals need to be reproducible. We can't have race conditions on shared state. PostgreSQL handles the single source of truth. All workers read from there and write back. No eventually-consistent fantasy—signals are atomic or they don't get written.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Handling backfill</h3>
              <p className="text-slate-400">
                Historical data needs to be processed to train models. But live feeds can't wait for backfill. We run backfill in a separate worker pool with different resource limits. Priority queue ensures live data always gets processed first.
              </p>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Key Features</h2>
          <ul className="space-y-3">
            <li className="flex gap-3 text-slate-300">
              <span className="text-cyan-400 shrink-0">▸</span>
              <span><strong>Real-time WebSocket API</strong> — Clients receive signal updates as they're generated, not polled.</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-cyan-400 shrink-0">▸</span>
              <span><strong>Explainable signals</strong> — Each signal includes the factors that contributed. Users understand why the model fired, not just that it did.</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-cyan-400 shrink-0">▸</span>
              <span><strong>Paper trading</strong> — Test strategies without risking capital. Full replay of historical data with realistic slippage.</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-cyan-400 shrink-0">▸</span>
              <span><strong>Wallet intelligence</strong> — Track on-chain activity, detect large transfers, flag unusual patterns.</span>
            </li>
          </ul>
        </section>

        {/* Engineering Decisions */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Engineering Decisions</h2>
          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="font-semibold text-white mb-2">Async/await over threading</h3>
              <p className="text-slate-400">
                FastAPI's async model keeps the event loop unblocked. Database queries, API calls, and WebSocket operations yield when they'd block. Threads were tempting for CPU-bound work, but context switching overhead wasn't worth it for this workload. Workers handle ML pipelines instead.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Redis for caching, not as primary store</h3>
              <p className="text-slate-400">
                Redis is fast but not persistent. PostgreSQL is the source of truth. Redis sits in front to absorb repeated reads (price history, signal metadata). If Redis goes down, the system slows but doesn't break. Rebuilding cache is cheaper than data loss.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Background workers for heavy compute</h3>
              <p className="text-slate-400">
                ML pipeline runs outside the request path. Signals are precomputed and stored. The API just returns cached results. Tradeoff: signals lag by up to 30 seconds. Acceptable because the whole point is to detect trends, not tick-level trades.
              </p>
            </div>
          </div>
        </section>

        {/* Results */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Results</h2>
          <ul className="space-y-3">
            <li className="flex gap-3 text-slate-300">
              <span className="text-cyan-400 shrink-0">▸</span>
              <span>P95 API latency: <strong>45ms</strong> for signal queries, <strong>120ms</strong> for full wallet analysis</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-cyan-400 shrink-0">▸</span>
              <span>Ingests <strong>500+ price updates per second</strong> without dropping messages</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-cyan-400 shrink-0">▸</span>
              <span>Serves paper trading replays at <strong>100x speed</strong> without data loss</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-cyan-400 shrink-0">▸</span>
              <span>Deployed on Docker on a single AWS EC2 instance; scales horizontally when needed</span>
            </li>
          </ul>
        </section>

        {/* Links */}
        <div className="pt-8 border-t border-white/10 flex gap-4">
          <a
            href="https://github.com/bgade06"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-cyan-400 px-6 py-2.5 text-sm font-bold text-black hover:bg-cyan-300 transition-colors"
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
