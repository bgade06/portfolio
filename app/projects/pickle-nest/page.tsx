export default function PickleNestProject() {
  return (
    <>
      <div className="mb-12">
        <a href="/" className="text-cyan-400 hover:text-cyan-300 text-sm font-mono mb-4 inline-block">
          ← Back
        </a>
        <h1 className="text-4xl font-black tracking-tight mb-2">The Pickle Nest</h1>
        <p className="text-slate-400">Backend for location-based game discovery</p>
      </div>

      <div className="space-y-12">
        {/* Problem */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Problem</h2>
          <p className="text-slate-300 leading-relaxed">
            Players want to find nearby games without scrolling through dozens of listings. They want to know who's playing, confirm skill levels, and match with compatible players. The backend needs to support flexible search (location, skill, availability), handle complex player profiles, and keep queries fast even with thousands of concurrent queries.
          </p>
        </section>

        {/* Architecture */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Architecture</h2>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              The backend exposes 49 REST APIs across different domains: games (create, list, join), players (profiles, ratings, availability), matchmaking, and messaging. Each API is versioned and independently deployable.
            </p>
            <p className="leading-relaxed">
              PostgreSQL stores 22 related models: users, player profiles, games, join requests, ratings, messages, etc. The schema uses normalized design to avoid data duplication. Geospatial queries use PostGIS extension for "find games near me" queries.
            </p>
            <p className="leading-relaxed">
              Prisma ORM provides type safety for the application layer. Redis caches frequently accessed data: user profiles, recent games, leaderboards. Cache invalidation follows a simple pattern—when you update a user, invalidate their cached profile. No complex TTLs.
            </p>
            <p className="leading-relaxed">
              Real-time matching is a separate concern. When a player becomes available, the system notifies other nearby players asynchronously. No blocking operations in the request path.
            </p>
          </div>
        </section>

        {/* Technical Challenges */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Technical Challenges</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-white mb-2">Geospatial queries at scale</h3>
              <p className="text-slate-400">
                A naive "distance from user" query requires calculating distance to every game. PostGIS indexes make this practical. We use GIST indexes on geometry columns. Queries for "games within 10km" now run in milliseconds. Without indexes, the same query could take seconds.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Concurrent updates to player ratings</h3>
              <p className="text-slate-400">
                After a game, multiple players rate each other. Early attempts used in-memory counters, risking race conditions. Solution: use database transactions and row-level locking. PostgreSQL ensures only one update per row at a time. Slightly slower, but correctness first.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">N+1 queries in the API</h3>
              <p className="text-slate-400">
                Fetching a list of games requires loading each game's creator, each player's rating, and related messages. Easy to accidentally load separately for each row. We use Prisma's `include` to batch load related data. A single query with joins replaces N+1 separate queries.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Real-time player matching without polling</h3>
              <p className="text-slate-400">
                Players shouldn't need to refresh to see nearby games. We use WebSocket subscriptions for location-based events. When a player posts availability, subscribed clients get notified. Uses significantly less bandwidth than polling.
              </p>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Key Features</h2>
          <ul className="space-y-3">
            <li className="flex gap-3 text-slate-300">
              <span className="text-emerald-400 shrink-0">▸</span>
              <span><strong>Geospatial search</strong> — Find games within a radius, sorted by distance. No artificial regions or grids.</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-emerald-400 shrink-0">▸</span>
              <span><strong>Player ratings and profiles</strong> — Transparent skill levels and player preferences. Historical match data informs matching.</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-emerald-400 shrink-0">▸</span>
              <span><strong>Smart matchmaking</strong> — Suggest players with compatible skill levels and schedules, not random matches.</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-emerald-400 shrink-0">▸</span>
              <span><strong>Real-time updates</strong> — Player availability changes propagate to interested clients without polling.</span>
            </li>
          </ul>
        </section>

        {/* Engineering Decisions */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Engineering Decisions</h2>
          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="font-semibold text-white mb-2">REST API over GraphQL</h3>
              <p className="text-slate-400">
                GraphQL seemed tempting for flexibility, but REST kept things simple. 49 endpoints, each with a clear purpose. No query overfetching problems. Caching is straightforward with REST. Each endpoint is cacheable by its URL.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Prisma ORM for type safety</h3>
              <p className="text-slate-400">
                22 models means lots of places to make mistakes with raw SQL. Prisma generates types from the schema. TypeScript catches mistakes at compile time. Tradeoff: complex queries are harder to optimize. For simpler queries, Prisma handles it well.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Simple cache invalidation strategy</h3>
              <p className="text-slate-400">
                Cache everything that's read frequently. Invalidate when the source changes. No TTLs or complex expiry logic. If you update a game, clear its cache entry. If a player joins, invalidate nearby games' caches. Simple and prevents stale data.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Normalized schema, selective denormalization</h3>
              <p className="text-slate-400">
                The schema is normalized to avoid duplication. But we cache computed values (average ratings, player counts) in Redis. Tradeoff between data consistency and query speed. PostgreSQL is the source of truth; cache is regenerated on updates.
              </p>
            </div>
          </div>
        </section>

        {/* Results */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-white">Results</h2>
          <ul className="space-y-3">
            <li className="flex gap-3 text-slate-300">
              <span className="text-emerald-400 shrink-0">▸</span>
              <span><strong>49 production APIs</strong> serving all major features</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-emerald-400 shrink-0">▸</span>
              <span><strong>22 database models</strong> with complex relationships, fully normalized</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-emerald-400 shrink-0">▸</span>
              <span>Geospatial queries return in <strong>sub-200ms</strong> even with thousands of games</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-emerald-400 shrink-0">▸</span>
              <span>Cache hit rate of <strong>70%</strong> for player profiles and recent games</span>
            </li>
            <li className="flex gap-3 text-slate-300">
              <span className="text-emerald-400 shrink-0">▸</span>
              <span>Deployed and serving real users at <strong>thepicklenest.com</strong></span>
            </li>
          </ul>
        </section>

        {/* Links */}
        <div className="pt-8 border-t border-white/10 flex gap-4">
          <a
            href="https://thepicklenest.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-emerald-400 px-6 py-2.5 text-sm font-bold text-black hover:bg-emerald-300 transition-colors"
          >
            View Live →
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
