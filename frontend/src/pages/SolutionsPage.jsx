import { usePageMeta } from "../usePageMeta";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { solutions } from "../data/solutions";


export default function SolutionsPage() {
  usePageMeta({
    title: "Solutions | Trinexora",
    description: "Practical ways Trinexora can help with performance testing, test automation, CI/CD and contract hiring.",
    path: "/solutions"
  });

  return (
    <section className="section page-intro accelerators-page solutions-page">
      <div className="container">
        <div className="accelerators-hero">
          <SectionHeader as="h1"
            title="Explore Delivery Approaches"
            titleAccent="For Your Project Needs"
            text="Explore ways we can help with delivery workflows, testing and automation. These are potential engagement areas; scope and suitability depend on your requirements."
          />
        </div>
        <div className="accelerators-heading">
          <h2>Where We Can Help</h2>
          <p>Practical ways we can start, based on your requirements.</p>
        </div>
        <div className="accelerator-grid">
          {solutions.map((solution, index) => (
            <article key={solution.id} className="accelerator-card">
              <div className="accelerator-card-header">
                <h3>{index + 1}. {solution.title}</h3>
              </div>
              <div className="accelerator-copy-block">
                <strong>The challenge</strong>
                <p>{solution.challenge}</p>
              </div>
              <div className="accelerator-copy-block">
                <strong>Example engagement</strong>
                <p>{solution.example}</p>
              </div>
              {solution.tools.length > 0 && (
                <div className="accelerator-detail">
                  <strong>Typical tools</strong>
                  <div className="accelerator-tags">
                    {solution.tools.map((tool) => <span key={tool}>{tool}</span>)}
                  </div>
                </div>
              )}
              <div className="accelerator-value">
                <strong>What we can help with</strong>
                <ul className="solutions-help">
                  {solution.help.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <Link className="accelerator-link" to={`/get-started?type=${solution.engagementType}`}>
                Discuss this
              </Link>
            </article>
          ))}
        </div>
        <div className="accelerators-cta">
          <div>
            <h3>Not sure where to start?</h3>
            <p>Tell us what you're trying to achieve and we'll suggest a practical first step.</p>
          </div>
          <Link className="button button-primary" to="/get-started">Share Your Requirement</Link>
        </div>
      </div>
    </section>
  );
}
