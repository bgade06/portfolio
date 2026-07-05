export default function PickleNestProject() {
  return (
    <>
      <div className="mb-12">
        <a href="/" className="text-sky-400 hover:text-sky-300 text-sm font-mono mb-4 inline-block">
          ← Back
        </a>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">The Pickle Nest</h1>
        <p className="text-slate-400 text-sm md:text-base">A case study in geospatial search and complex schema design</p>
      </div>

      <div className="space-y-12">
        {/* Problem */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">The Problem</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              Pickleball players need to find nearby games quickly. The naive solution—show all games sorted by distance—doesn't scale. With hundreds of games and complex filters (skill level, player preferences, availability), queries become slow. A player opening the app shouldn't wait 2 seconds for results.
            </p>
            <p className="leading-relaxed">
              The backend needs to support: geospatial search (find games within 10km), filtering by player skill, real-time availability status, player ratings from previous games, and complex matching logic. Simple pagination won't work—users need results in milliseconds.
            </p>
            <p className="text-sm text-slate-400">
              Additional constraint: player ratings and historical match data inform matchmaking. This means joins across multiple tables—games, players, ratings, match history. Bad schema design would make these queries prohibitively slow.
            </p>
          </div>
        </section>

        {/* Architecture */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">Schema & Architecture</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              I built the schema around normalized design: 22 distinct models, each focused on a single concern. Players, games, ratings, match results, and availability tracking are separate entities with explicit foreign keys.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm space-y-3">
              <div>
                <p className="font-semibold text-white mb-1">Why normalized?</p>
                <p className="text-slate-400">Avoids data duplication. When a player's rating changes, it updates once. No stale ratings scattered across game records. Tradeoff: more joins. But controlled joins are better than data inconsistency.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Geospatial indexing</p>
                <p className="text-slate-400">Used PostgreSQL's PostGIS extension with GIST indexes on geometry columns. "Find games within 10km" becomes a spatial query, not a full table scan. Critical for performance at scale.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Strategic denormalization</p>
                <p className="text-slate-400">Cache computed values (average player rating, player count per game) in Redis. Source of truth is PostgreSQL. Cache is regenerated on updates. Tradeoff: eventual consistency in the cache, but strong consistency in the source.</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm mt-4">
              The API layer (Prisma ORM) provides type safety. Complex queries use explicit joins and SELECT statements, not lazy loading. Every query is intentional.
            </p>
          </div>
        </section>

        {/* Technical Decisions */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">Technical Decisions & Tradeoffs</h2>
          <div className="space-y-5">
            <div className="border-l-2 border-emerald-400/30 pl-4">
              <h3 className="font-semibold text-white mb-2">REST API over GraphQL</h3>
              <p className="text-slate-300 mb-2">
                49 REST endpoints, each with a single responsibility.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Why:</strong> GraphQL feels powerful for flexibility, but REST kept things predictable. Each endpoint is cacheable by URL. Clients know exactly what they're getting. Easier to version and deprecate.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong>Tradeoff:</strong> More endpoints to maintain. But with good naming conventions and clear semantics, it's simpler than debugging GraphQL N+1 problems.
              </p>
            </div>

            <div className="border-l-2 border-emerald-400/30 pl-4">
              <h3 className="font-semibold text-white mb-2">Prisma ORM for type safety</h3>
              <p className="text-slate-300 mb-2">
                TypeScript-first ORM that generates types from the schema.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Why:</strong> 22 models is a lot. Raw SQL mistakes are easy. Prisma catches them at compile time. Type checking prevents entire classes of bugs.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong>Tradeoff:</strong> Complex queries are harder to optimize. For simple CRUD, Prisma is perfect. For analytical queries over multiple joins, raw SQL with prepared statements might be necessary.
              </p>
            </div>

            <div className="border-l-2 border-emerald-400/30 pl-4">
              <h3 className="font-semibold text-white mb-2">Simple cache invalidation strategy</h3>
              <p className="text-slate-300 mb-2">
                Cache everything that's read frequently. Invalidate when source changes.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Why:</strong> No TTLs or complex expiry logic. When a game is created, clear nearby-games cache. When a player joins, invalidate that game's cache. Prevents stale data.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong>Tradeoff:</strong> More cache operations (clears), but guarantee of freshness. Better than hoping a TTL will catch your update.
              </p>
            </div>

            <div className="border-l-2 border-emerald-400/30 pl-4">
              <h3 className="font-semibold text-white mb-2">Batch loading to prevent N+1 queries</h3>
              <p className="text-slate-300 mb-2">
                When fetching games, also fetch creator details, player ratings, and related messages in one query using JOINs.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Why:</strong> Naively loading a game list would query the database 1 + N times (1 for games, N for player details). Batch loading makes it 1 query total. Massive performance difference.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong>Tradeoff:</strong> Requires upfront planning of what to load. Can't lazily load things later. Worth it for predictable performance.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white">Challenges & Solutions</h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-white mb-2">Geospatial queries on large datasets</h3>
              <p className="text-slate-400 mb-2 text-sm">
                Early version had GIST index but poor query plans. "Find games within 10km" was still taking 500ms for large cities.
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Solution:</strong> Used EXPLAIN ANALYZE to see the query plan. The issue: PostGIS index wasn't being used. Fixed with explicit index hints and query rewrites. Also partitioned games by region to limit index size.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Concurrent rating updates causing inconsistency</h3>
              <p className="text-slate-400 mb-2 text-sm">
                After a game, multiple players update ratings. Concurrent updates could overwrite each other or cause lost updates.
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Solution:</strong> Database transactions with row-level locking. Each rating update uses SELECT FOR UPDATE to claim the row, then updates it atomically. No two updates race.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Cache invalidation cascades</h3>
              <p className="text-slate-400 mb-2 text-sm">
                One update could trigger invalidation of dozens of cache entries (nearby games, player profiles, leaderboards, etc.), creating a storm of cache clears.
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Solution:</strong> Batch cache invalidations. Instead of clearing immediately, queue them and flush every 5 seconds. Prevents cache thrashing during concurrent updates.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Schema migrations without downtime</h3>
              <p className="text-slate-400 mb-2 text-sm">
                Adding a new column to a frequently-read table could lock it for seconds, causing timeouts for users.
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Solution:</strong> Expand-contract pattern. First, deploy code that ignores the new column. Then add the column with a default value (non-blocking). Finally, backfill existing rows. Last, deploy code that uses the column. Each step is independent.
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
                <div className="text-2xl font-bold text-emerald-400">49</div>
                <div className="text-sm text-slate-400 mt-1">Production APIs</div>
                <div className="text-xs text-slate-500 mt-2">Each endpoint focused, cacheable, and independently deployable.</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-400">22</div>
                <div className="text-sm text-slate-400 mt-1">Database Models</div>
                <div className="text-xs text-slate-500 mt-2">Normalized schema prevents data duplication and inconsistency.</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-400">&lt;200ms</div>
                <div className="text-sm text-slate-400 mt-1">Geospatial queries</div>
                <div className="text-xs text-slate-500 mt-2">With PostGIS indexing and batch loading, even complex queries complete instantly.</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-400">70%</div>
                <div className="text-sm text-slate-400 mt-1">Cache hit rate</div>
                <div className="text-xs text-slate-500 mt-2">Player profiles and recent games are served from Redis most of the time.</div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-sm text-slate-300">
                <strong>What this demonstrates:</strong> A well-designed schema and strategic use of caching make complex queries fast. The normalized design ensures data consistency. The separation of cache from source of truth prevents data loss. The result is a system that scales from 100 games to 100,000 without architectural changes.
              </p>
            </div>
          </div>
        </section>

        {/* Links */}
        <div className="pt-8 border-t border-white/10 flex gap-4">
          <a
            href="https://thepicklenest.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-emerald-400 px-6 py-2.5 text-sm font-semibold text-black hover:bg-emerald-300 transition-colors"
          >
            View Live →
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
