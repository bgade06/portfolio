import CaseStudy from "../case-study";

export default function PickleNestProject() {
  return <CaseStudy data={{
    index: "02", category: "Geospatial product", title: "The Pickle Nest",
    lede: "A nationwide discovery and booking platform that makes fragmented pickleball venue data fast, searchable, and useful.",
    stack: "Next.js · TypeScript · PostgreSQL · Prisma · Google Places API", live: "https://www.thepicklenest.com",
    metrics: [{ value: "14.5K+", label: "venues across 50 states" }, { value: "49", label: "REST API endpoints" }, { value: "110+", label: "active users" }, { value: "210ms", label: "p95 geo-search latency" }],
    challenge: "Venue information was spread across inconsistent third-party listings, and raw place data contained duplicates and gaps. The product needed a dependable ingestion process, a relational model for community and booking workflows, and location search fast enough to feel immediate.",
    ownership: ["Architected 49 REST endpoints and 22 PostgreSQL models.", "Built the Google Places ingestion and nationwide seeding workflows.", "Implemented geospatial discovery, booking, and authenticated community features.", "Optimized query paths and duplicate detection as the venue index grew."],
    flow: [{ title: "Discover", detail: "Google Places provides candidate venue records across target regions." }, { title: "Clean", detail: "The ingestion layer validates fields and removes duplicate listings." }, { title: "Index", detail: "PostgreSQL and Prisma model venues, users, games, and bookings." }, { title: "Match", detail: "Geospatial search returns relevant nearby venues and activity." }],
    decisions: [{ title: "Relational domain model", detail: "PostgreSQL fits connected entities such as users, venues, courts, games, bookings, and messages while preserving integrity." }, { title: "Deduplicate during ingestion", detail: "Resolving duplicates before records reach the product keeps search results clean and prevents conflicting venue identities." }, { title: "Optimize for nearby intent", detail: "Indexes and query changes focused on the primary user story: quickly finding relevant places near a location." }],
    outcome: "The platform indexes more than 14,500 venues in all 50 states, supports 110+ active users, and handles 2,500 daily API requests. Geo-search optimization reduced p95 latency 78%, while ingestion changes eliminated 98% of duplicate listings.",
    next: { title: "Success Society", href: "/projects/success-society" },
  }} />;
}
