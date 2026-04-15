import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { services } from "../data/siteContent";

export default function ServicesPage() {
  return (
    <section className="section page-intro">
      <div className="container">
        <SectionHeader
          eyebrow="What We Do"
          title="Services designed for speed, stability, and delivery ownership"
          text="Whether you need an individual specialist or a full managed pod, Trinexora offers flexible engagement options backed by transparent communication."
        />

        <div className="stack-grid">
          {services.map((service) => (
            <article key={service.title} className="feature-panel">
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <div className="feature-meta">
                <span>Flexible engagement</span>
                <span>Fast onboarding</span>
                <span>Delivery reporting</span>
              </div>
            </article>
          ))}
        </div>

        <div className="cta-inline">
          <p>Need help selecting the right model for your project?</p>
          <Link className="button button-primary" to="/get-started">
            Talk to Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}
