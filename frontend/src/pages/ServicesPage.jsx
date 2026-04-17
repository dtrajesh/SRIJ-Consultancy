import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { services } from "../data/siteContent";

export default function ServicesPage() {
  return (
    <section className="section page-intro">
      <div className="container">
        <SectionHeader
          className="services-page-header"
          eyebrow="What We Do"
          title="Services built for speed, reliability, and accountable delivery"
          text="We provide flexible engagement models from individual specialists to fully managed teams ensuring seamless execution, transparent communication, and measurable outcomes."
        />

        <div className="stack-grid">
          {services.map((service) => (
            <article key={service.title} className="feature-panel">
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="cta-inline services-cta-inline">
          <div>
            <h3>Not sure which engagement model fits your needs?</h3>
            <p>
              Get expert guidance on choosing the right approach for your timeline,
              budget, and delivery goals.
            </p>
          </div>
          <Link className="button button-primary" to="/get-started">
            Talk to Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}
