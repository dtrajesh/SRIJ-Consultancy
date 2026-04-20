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

        <div className="card-grid">
          {services.map((service) => (
            <article key={service.title} className="content-card service-detail-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link to="/get-started">Explore Solution →</Link>
            </article>
          ))}
        </div>

        <div className="cta-inline services-cta-inline">
          <div>
            <h3>Selecting the right engagement model is critical to project success.</h3>
            <p>
              We provide expert consultation to align your delivery strategy with your
              business goals, timelines, and budget expectations.
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
