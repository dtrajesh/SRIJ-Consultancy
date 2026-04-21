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
          {services.map((service, index) => (
            <article key={service.title} className="content-card service-detail-card">
              <div className="service-detail-card-header">
                <span className="home-service-icon" aria-hidden="true">
                  {service.icon}
                </span>
                <h3>{service.title}</h3>
              </div>
              <p>{service.description}</p>
              {index === 0 ? (
                <div className="service-preview-trigger">
                  <Link to="/get-started">Explore Solution →</Link>
                  <div className="service-preview-card" aria-hidden="true">
                    <div className="service-preview-window">
                      <span className="service-preview-close">×</span>
                      <h4>Talent Solutions Overview</h4>
                      <div className="service-preview-grid">
                        <div className="service-preview-panel">
                          <strong>💼 Our Services</strong>
                          <ul>
                            <li>IT Staff Augmentation</li>
                            <li>Dedicated Development Teams</li>
                            <li>Contract &amp; Contract-to-Hire</li>
                            <li>Project-Based Delivery</li>
                          </ul>
                        </div>
                        <div className="service-preview-panel">
                          <strong>🏗 Talent Areas</strong>
                          <ul>
                            <li>Software Engineering</li>
                            <li>QA &amp; Automation</li>
                            <li>Cloud &amp; DevOps</li>
                            <li>Data Engineering</li>
                          </ul>
                        </div>
                      </div>
                      <div className="service-preview-benefits">
                        <strong>✅ Key Benefits</strong>
                        <span>Pre-vetted professionals</span>
                        <span>48-72 hour onboarding</span>
                        <span>Scalable teams</span>
                      </div>
                      <div className="service-preview-actions">
                        <span>View Talent Pool</span>
                        <span>Request a Consultant →</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/get-started">Explore Solution →</Link>
              )}
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
