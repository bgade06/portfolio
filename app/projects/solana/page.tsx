export default function SolanaProject() {
  return (
    <>
      <div className="mb-12">
        <a href="/" className="text-sky-400 hover:text-sky-300 text-sm font-mono mb-4 inline-block">
          ← Back
        </a>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">Solana Market Intelligence Platform</h1>
        <p className="text-slate-400 text-sm md:text-base">A case study in real-time data ingestion and stream processing</p>
      </div>

      <div className="space-y-12">
        {/* Problem */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">The Problem</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              Crypto markets move at millisecond scale. Traders need intelligence about price movements and wallet activity <em>as it happens</em>, not after the fact. The system had to ingest market data from multiple exchanges, run statistical analysis, and surface actionable signals with sub-100ms latency.
            </p>
            <p className="leading-relaxed text-sm text-slate-400">
              The hard part wasn't the algorithms—it was the infrastructure. Naive approaches would either drop data during load spikes, introduce unacceptable latency, or fail under concurrent traffic. I needed to design a system that could handle hundreds of messages per second without losing data or introducing lag.
            </p>
          </div>
        </section>

        {/* Architecture */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">Architecture & Design</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              The architecture separates concerns into three layers: <strong>ingestion</strong> (receive and store data), <strong>processing</strong> (compute signals), and <strong>serving</strong> (query results).
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm space-y-3">
              <div>
                <p className="font-semibold text-white mb-1">Ingestion Layer</p>
                <p className="text-slate-400">FastAPI + async/await handles WebSocket feeds from multiple exchanges. Each message is written to PostgreSQL immediately (idempotent writes). Nothing is buffered in memory—this prevents backpressure and data loss if the process crashes.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Processing Layer</p>
                <p className="text-slate-400">Background workers (not in the request path) read from PostgreSQL, compute signals using historical data, and write results back. This is separated so signal computation latency doesn't affect API response time.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Serving Layer</p>
                <p className="text-slate-400">FastAPI serves precomputed signals from PostgreSQL with Redis caching for hot data. Clients connect via WebSocket to receive real-time updates as signals are computed.</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm mt-4">
              PostgreSQL is the source of truth. Redis is a read-through cache and pub/sub broker. This design prioritizes correctness over speed—if Redis goes down, everything still works.
            </p>
          </div>
        </section>

        {/* Technical Decisions */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">Technical Decisions & Tradeoffs</h2>
          <div className="space-y-5">
            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-semibold text-white mb-2">Async/await over threading</h3>
              <p className="text-slate-300 mb-2">
                I chose FastAPI's async model over threading for concurrency.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Why:</strong> Market data ingestion is I/O-bound (network, database). Async/await keeps the event loop unblocked—when a query waits on the database, the loop handles other connections. Threads would be overkill and add context-switching overhead.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong>Tradeoff:</strong> CPU-bound work (signal computation) can't run on the event loop without blocking everything. Solution: background workers handle ML pipelines separately. Slightly more complex, but correct separation of concerns.
              </p>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-semibold text-white mb-2">PostgreSQL as source of truth, not Redis</h3>
              <p className="text-slate-300 mb-2">
                Redis is fast but not persistent. I made PostgreSQL the canonical store.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Why:</strong> Trading signals must never be lost. PostgreSQL guarantees durability. Redis sits in front as a cache and pub/sub broker. If Redis dies, queries get slower (cache miss), but data isn't lost.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong>Tradeoff:</strong> More write latency (PostgreSQL is slower than Redis). Acceptable because ingestion already separates from serving—writes don't block API responses.
              </p>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-semibold text-white mb-2">Precompute signals, don't compute on-demand</h3>
              <p className="text-slate-300 mb-2">
                Signals are computed by background workers and stored, not calculated when clients request them.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Why:</strong> Signal computation is heavy (requires historical data and ML models). Doing it on-demand would introduce unpredictable latency. Precomputation means API responses are fast and consistent.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong>Tradeoff:</strong> Signals lag by up to 30 seconds. Acceptable because the goal is trend detection, not tick-level trading. Clients prefer stale correct signals over fresh incorrect ones.
              </p>
            </div>

            <div className="border-l-2 border-cyan-400/30 pl-4">
              <h3 className="font-semibold text-white mb-2">Idempotent writes for data ingestion</h3>
              <p className="text-slate-300 mb-2">
                Every market update is written with a unique key (exchange + timestamp). Duplicate messages are silently dropped.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Why:</strong> Network can retry messages. Without idempotency, you get duplicates. With it, retries are safe—the same message written twice has the same effect as once.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong>Tradeoff:</strong> Requires a unique constraint and potential for constraint violations. Handled gracefully (ignored). Small price for correctness.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges Encountered */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">Challenges & Solutions</h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-white mb-2">Backpressure during market spikes</h3>
              <p className="text-slate-400 mb-2 text-sm">
                Early version queued all incoming messages in memory. During high-volume market events, the queue would grow unbounded, causing memory exhaustion and dropped connections.
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Solution:</strong> Write to PostgreSQL immediately (blocking only on I/O, not buffering). If PostgreSQL can't keep up, new connections fail gracefully rather than hanging. Adds Redis pub/sub layer to decouple ingestion from processing. Ingestion stays fast even if workers lag.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Race conditions in signal computation</h3>
              <p className="text-slate-400 mb-2 text-sm">
                Multiple workers computing signals concurrently could read stale data or write conflicting updates, leading to duplicate or missing signals.
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Solution:</strong> Use database transactions with row-level locking. Each worker claims a batch of unprocessed events (SELECT FOR UPDATE), computes signals, writes results atomically. No two workers process the same event.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Historical data backfill blocking live ingestion</h3>
              <p className="text-slate-400 mb-2 text-sm">
                When backfilling historical data to train models, database writes would lag. Live market data would queue up and get dropped.
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Solution:</strong> Separate worker pools with different resource limits. Backfill workers run on a resource-constrained pool (low CPU, low priority). Live data goes to a high-priority pool. PostgreSQL connection pooling ensures live queries never starve.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Query performance degradation under load</h3>
              <p className="text-slate-400 mb-2 text-sm">
                As the dataset grew (millions of price updates), queries for historical data became slow, increasing API latency unpredictably.
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Solution:</strong> Explicit query optimization (indexes on (exchange, timestamp), (user_id, signal_type)). Pre-aggregate hourly data in a separate table. Cache hot queries in Redis with 30-second TTL. Monitoring with PostgreSQL's EXPLAIN ANALYZE to catch performance regressions early.
              </p>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">Performance & Outcomes</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-cyan-400">45ms</div>
                <div className="text-sm text-slate-400 mt-1">P95 API latency</div>
                <div className="text-xs text-slate-500 mt-2">Signal queries complete within milliseconds, suitable for real-time trading decisions.</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-cyan-400">500+</div>
                <div className="text-sm text-slate-400 mt-1">Events per second</div>
                <div className="text-xs text-slate-500 mt-2">Ingestion layer sustains high market velocity without backpressure or message loss.</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-cyan-400">100x</div>
                <div className="text-sm text-slate-400 mt-1">Replay speed</div>
                <div className="text-xs text-slate-500 mt-2">Historical backtesting completes in seconds, enabling rapid strategy iteration.</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-cyan-400">0</div>
                <div className="text-sm text-slate-400 mt-1">Data loss incidents</div>
                <div className="text-xs text-slate-500 mt-2">Idempotent writes + PostgreSQL durability ensures no trades are missed.</div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-sm text-slate-300">
                <strong>What this demonstrates:</strong> The system successfully handles production throughput while maintaining latency guarantees. The architecture prioritizes correctness (no data loss) over raw speed, which is the right tradeoff for financial data. The separation of ingestion, processing, and serving allows independent scaling and prevents cascading failures.
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
