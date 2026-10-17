import CaseStudy from "../case-study";

export default function SolanaProject() {
  return <CaseStudy data={{
    index: "01", category: "Real-time systems", title: "Solana Intelligence Engine",
    lede: "A real-time analytics pipeline that turns a high-volume blockchain event stream into queryable market intelligence.",
    stack: "Python · FastAPI · PostgreSQL · Geyser · WebSockets · Docker",
    metrics: [{ value: "180K+", label: "events processed daily" }, { value: "4,500+", label: "tokens and pools" }, { value: "350", label: "events per second at peak" }, { value: "120ms", label: "p95 ingestion latency" }],
    challenge: "Blockchain data arrives continuously, at uneven volume, and in formats that are not immediately useful to an analyst or strategy. The system needed to ingest that stream, normalize it consistently, preserve it durably, and keep downstream reads fast as volume grew.",
    ownership: ["Designed the ingestion and normalization path around FastAPI and PostgreSQL.", "Implemented Geyser and WebSocket subscriptions for live event delivery.", "Measured and improved p95 ingestion performance under peak throughput.", "Containerized the service for repeatable local and production environments."],
    flow: [{ title: "Subscribe", detail: "Geyser and WebSocket connections receive live chain activity." }, { title: "Normalize", detail: "FastAPI workers validate and translate events into a consistent model." }, { title: "Persist", detail: "PostgreSQL stores structured token, pool, and event data." }, { title: "Analyze", detail: "Downstream consumers query current and historical market activity." }],
    decisions: [{ title: "Durability before novelty", detail: "PostgreSQL provides a reliable system of record and flexible analytical querying instead of relying only on transient in-memory state." }, { title: "Asynchronous ingestion", detail: "Async I/O keeps the service responsive while many event subscriptions and writes are active at once." }, { title: "Measure the critical path", detail: "Optimization focused on p95 ingestion latency—the path that determines whether real-time data remains useful." }],
    outcome: "The final pipeline processes more than 180,000 events per day across 4,500+ tokens and pools, sustains 350 events per second at peak, and reduced p95 ingestion latency by 60%—from 300ms to 120ms.",
    next: { title: "The Pickle Nest", href: "/projects/pickle-nest" },
  }} />;
}
