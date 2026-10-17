import Link from "next/link";

export type CaseStudyData = {
  index: string; category: string; title: string; lede: string; stack: string;
  metrics: { value: string; label: string }[]; challenge: string; ownership: string[];
  flow: { title: string; detail: string }[]; decisions: { title: string; detail: string }[];
  outcome: string; live?: string; next?: { title: string; href: string };
};

function Arrow() { return <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M11 6l4 4-4 4" /></svg>; }

export default function CaseStudy({ data }: { data: CaseStudyData }) {
  return <main className="case-page">
    <header className="case-nav shell"><Link className="wordmark" href="/" aria-label="Back to home">BG<span>.</span></Link><Link href="/#work">← All work</Link></header>
    <article>
      <section className="case-hero shell">
        <p className="eyebrow">{data.index} / {data.category}</p><h1>{data.title}</h1><p className="case-lede">{data.lede}</p>
        <div className="case-meta"><span>Role</span><strong>Engineer &amp; builder</strong><span>Stack</span><strong>{data.stack}</strong></div>
        {data.live ? <a className="button button-primary" href={data.live} target="_blank" rel="noreferrer">Visit live product <Arrow /></a> : null}
      </section>
      <section className="case-metrics shell" aria-label="Project outcomes">{data.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</section>
      <section className="case-block shell case-two-col"><div><p className="eyebrow">The challenge</p><h2>What needed to work.</h2></div><div className="case-copy"><p>{data.challenge}</p><h3>My ownership</h3><ul>{data.ownership.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
      <section className="case-dark"><div className="shell"><p className="eyebrow">System architecture</p><h2>From input to outcome.</h2><div className="case-flow">{data.flow.map((step, index) => <div key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.detail}</p></div>)}</div></div></section>
      <section className="case-block shell"><div className="section-heading"><p className="eyebrow">Engineering decisions</p><h2>Tradeoffs, made explicit.</h2></div><div className="decision-grid">{data.decisions.map((decision, index) => <div key={decision.title}><span>0{index + 1}</span><h3>{decision.title}</h3><p>{decision.detail}</p></div>)}</div></section>
      <section className="case-outcome shell"><p className="eyebrow">Outcome</p><blockquote>{data.outcome}</blockquote></section>
    </article>
    <footer className="case-next">{data.next ? <Link className="shell" href={data.next.href}><span>Next case study</span><strong>{data.next.title}</strong><Arrow /></Link> : <Link className="shell" href="/#work"><span>Return</span><strong>Selected work</strong><Arrow /></Link>}</footer>
  </main>;
}
