import CaseStudy from "../case-study";

export default function SuccessSocietyProject() {
  return <CaseStudy data={{
    index: "03", category: "Revenue-generating SaaS", title: "Success Society",
    lede: "A full-stack membership platform and AI lead engine connecting recurring revenue to workflows that save operators time.",
    stack: "Next.js · TypeScript · Supabase · Stripe · AI", live: "https://www.successsociety.co",
    metrics: [{ value: "160", label: "active paying members" }, { value: "$2.4K", label: "monthly recurring revenue" }, { value: "4,200+", label: "businesses discovered monthly" }, { value: "14 hrs", label: "manual work saved weekly" }],
    challenge: "The product needed to support membership, billing, authentication, and role-specific workflows while also delivering an automated acquisition engine. That meant coordinating customer state and third-party services without losing sight of the business result.",
    ownership: ["Built subscription billing, authentication, and role-based dashboards.", "Developed the AI pipeline for business discovery and qualification.", "Automated personalized outreach at a weekly operating cadence.", "Connected product behavior to measurable membership and revenue outcomes."],
    flow: [{ title: "Discover", detail: "The AI pipeline identifies businesses matching qualification criteria." }, { title: "Qualify", detail: "Automated enrichment and scoring prioritize relevant prospects." }, { title: "Reach out", detail: "Personalized campaigns turn qualified data into repeatable outreach." }, { title: "Operate", detail: "Supabase and Stripe support authenticated membership and billing." }],
    decisions: [{ title: "Managed product primitives", detail: "Supabase and Stripe reduce custom operational surface area for authentication, data, and subscriptions." }, { title: "Automate a complete workflow", detail: "The lead system covers discovery through outreach instead of stopping at an isolated AI-generated list." }, { title: "Measure product value", detail: "Membership, recurring revenue, businesses discovered, and hours saved connect engineering work to concrete outcomes." }],
    outcome: "The platform supports 160 active paying members and generates $2,400 in monthly recurring revenue. Its AI pipeline discovers more than 4,200 businesses monthly, sends 450 personalized emails weekly, and removes 14 hours of manual work each week.",
    next: { title: "Solana Intelligence Engine", href: "/projects/solana" },
  }} />;
}
