import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { industries, products, services, stats, technologies, testimonials } from "../data/siteContent";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">IT staffing and delivery partner</span>
            <h1>Build teams fast. Deliver projects with confidence.</h1>
            <p>
              We help organizations scale with vetted consultants, accountable delivery
              teams, and reliable support for modern digital platforms.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/get-started">
                Book a Consultation
              </Link>
              <Link className="button button-secondary" to="/services">
                View Services
              </Link>
            </div>
          </div>

          <div className="hero-card">
            <p>Delivery Snapshot</p>
            <ul>
              <li>Staff augmentation for critical technical roles</li>
              <li>Managed teams for product, cloud, and QA delivery</li>
              <li>Support frameworks for stable production operations</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="stats-band">
        <div className="container stats-grid">
          {stats.map((item) => (
            <article key={item.label} className="stat-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Services"
            title="Practical solutions for growing delivery teams"
            text="From project ownership to expert staffing, we align services to the pace and scale your business needs."
          />
          <div className="card-grid three-up">
            {services.map((service) => (
              <article key={service.title} className="content-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to="/get-started">Discuss this service</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeader
            eyebrow="Industries"
            title="Built for regulated, high-growth, and service-driven businesses"
            text="Our teams adapt to domain complexity while keeping delivery clear, measurable, and client-centered."
          />
          <div className="tag-grid">
            {industries.map((industry) => (
              <span key={industry} className="industry-tag">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Technologies"
            title="Support for GenAI, data, cybersecurity, performance, and enterprise applications"
            text="We align consultants and delivery teams to the platforms and disciplines your business already relies on, from Java and Python applications to AI-enabled delivery."
          />
          <div className="card-grid three-up">
            {technologies.slice(0, 3).map((group) => (
              <article key={group.category} className="content-card">
                <h3>{group.category}</h3>
                <p>{group.items.slice(0, 4).join(", ")}</p>
                <Link to="/technologies">View full technology support</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeader
            eyebrow="Products"
            title="Solution accelerators that make delivery easier to start"
            text="Our reusable frameworks and solution packages help clients move faster without starting from zero."
          />
          <div className="card-grid">
            {products.slice(0, 2).map((product) => (
              <article key={product.title} className="content-card product-card">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <Link to="/products">Explore products</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Client Feedback"
            title="Trusted to move quickly and stay accountable"
          />
          <div className="card-grid three-up">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="content-card testimonial-card">
                <p>"{testimonial.quote}"</p>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.company}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-panel">
          <div>
            <span className="eyebrow">Get Started</span>
            <h2>Ready to scale your team or outsource your next project?</h2>
            <p>
              Let's shape the right engagement model for your timeline, budget, and
              delivery goals.
            </p>
          </div>
          <Link className="button button-primary" to="/contact">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
