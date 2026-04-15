import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { industries } from "../data/siteContent";

const industryDetails = [
  "HIPAA-conscious delivery for healthcare technology and operations support.",
  "Reliable modernization and reporting delivery for financial workflows.",
  "Platform scaling, testing, and support for retail and ecommerce growth.",
  "Systems integration, QA, and maintenance for manufacturing environments.",
  "Operational support and rollout planning for telecom service teams.",
  "Visibility, automation, and engineering support for logistics platforms."
];

export default function IndustriesPage() {
  return (
    <section className="section page-intro">
      <div className="container">
        <SectionHeader
          eyebrow="Industry Focus"
          title="Delivery teams that understand the pressure of domain-specific work"
          text="We support clients operating in environments where speed matters but mistakes are expensive."
        />

        <div className="card-grid three-up">
          {industries.map((industry, index) => (
            <article key={industry} className="content-card">
              <h3>{industry}</h3>
              <p>{industryDetails[index]}</p>
            </article>
          ))}
        </div>

        <div className="cta-inline">
          <p>Looking for industry-specific staffing or managed delivery?</p>
          <Link className="button button-primary" to="/contact">
            Start the Conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
