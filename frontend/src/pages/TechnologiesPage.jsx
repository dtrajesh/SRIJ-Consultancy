import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { technologies } from "../data/siteContent";

export default function TechnologiesPage() {
  return (
    <section className="section page-intro">
      <div className="container">
        <SectionHeader
          eyebrow="Technologies"
          title="Technology support across delivery, support, and modernization"
          text="We support clients across GenAI, data science, cybersecurity, data engineering, performance engineering, and Java or Python-based application delivery."
        />

        <div className="card-grid tech-grid">
          {technologies.map((group) => (
            <article key={group.category} className="content-card">
              <h3>{group.category}</h3>
              <div className="tag-grid">
                {group.items.map((item) => (
                  <span key={item} className="industry-tag">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="cta-inline">
          <p>Need support for a specific stack or platform?</p>
          <Link className="button button-primary" to="/contact">
            Talk to Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}
