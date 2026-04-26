import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { products, stats, testimonials } from "../data/siteContent";
import requirementDiscoveryImage from "../assets/how-it-works/requirement-discovery.jpeg";
import curatedTalentDeliveryImage from "../assets/how-it-works/curated-talent-delivery.jpeg";
import selectionAlignmentImage from "../assets/how-it-works/selection-alignment.jpeg";
import executionScalingImage from "../assets/how-it-works/execution-scaling.jpeg";

const homeServices = [
  {
    icon: "👥",
    title: "IT Staffing & Augmentation",
    description:
      "Access pre-vetted, highly skilled professionals across engineering, QA, cloud, and data ready to contribute from day one."
  },
  {
    icon: "🚀",
    title: "Project Outsourcing",
    description:
      "End-to-end ownership of software delivery with dedicated teams managing planning, execution, and continuous improvement."
  },
  {
    icon: "☁️",
    title: "Cloud & Data Engineering",
    description:
      "Design scalable cloud architectures, enable seamless migrations, and build modern data pipelines for real-time insights."
  },
  {
    icon: "🤖",
    title: "AI & Data Solutions",
    description:
      "Leverage AI, machine learning, and advanced analytics to automate workflows and unlock data-driven decision making."
  },
  {
    icon: "🛡️",
    title: "Cybersecurity & Performance",
    description:
      "Strengthen application security, ensure compliance, and optimize performance with proactive monitoring and testing."
  },
  {
    icon: "⚙️",
    title: "Application Support & Maintenance",
    description:
      "Ensure system stability with 24/7 support, incident management, and continuous enhancements."
  },
  {
    icon: "🔄",
    title: "QA & Test Automation",
    description:
      "Improve product quality with robust manual and automated testing strategies that reduce release risk."
  },
  {
    icon: "📊",
    title: "Digital Transformation Consulting",
    description:
      "Align technology with business strategy through process optimization, modernization, and scalable delivery models."
  }
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              Your Strategic Partner for AI, Data, and Scalable Technology Delivery
            </span>
            <h1>
              Build high-performing teams.
              <br />
              Deliver outcomes at scale.
            </h1>
            <p>
              From staff augmentation to end-to-end project delivery, we help you reduce
              time-to-market, optimize costs, and ensure consistent execution across your
              technology landscape.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/get-started">
                Schedule a Consultation
              </Link>
              <Link className="button button-secondary" to="/services">
                Explore Our Services
              </Link>
            </div>
          </div>

          <div className="hero-card">
            <p>Delivery Excellence Snapshot</p>
            <ul>
              <li><span className="hero-marker hero-marker-check">✓</span>Access to highly qualified consultants with domain expertise</li>
              <li><span className="hero-marker hero-marker-spark">⚡</span>Rapid onboarding with minimal ramp-up time</li>
              <li><span className="hero-marker hero-marker-scale">👥</span>Scalable teams for product, cloud, and QA delivery</li>
              <li><span className="hero-marker hero-marker-secure">🔒</span>Proven frameworks for reliable and secure operations</li>
              <li><span className="hero-marker hero-marker-track">📈</span>Transparent communication and progress tracking</li>
              <li><span className="hero-marker hero-marker-support">🤝</span>Dedicated account management and delivery oversight</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="stats-band">
        <div className="container">
          <div className="stats-grid">
            {stats.map((item) => (
              <article key={item.label} className="stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
          <p className="stats-caption">
            Trusted by startups, scaling enterprises, and global organizations for dependable technology delivery.
          </p>
        </div>
      </section>

      <section className="section home-section how-it-works-section">
        <div className="container">
          <div className="how-it-works-header">
            <span className="how-it-works-line" />
            <h2>How It Works</h2>
            <span className="how-it-works-line" />
          </div>

          <div className="how-it-works-grid">
            <article className="how-step-card">
              <div className="how-step-icon">
                <img src={curatedTalentDeliveryImage} alt="Requirement discovery" />
              </div>
              <h3>Requirement Discovery</h3>
              <p>
                Engage with our team to define objectives, technical scope, and
                delivery expectations.
              </p>
            </article>

            <article className="how-step-card">
              <div className="how-step-icon">
                <img src={requirementDiscoveryImage} alt="Curated talent delivery" />
              </div>
              <h3>Curated Talent Delivery</h3>
              <p>
                Receive a curated pool of highly skilled, pre-vetted professionals
                aligned to your needs.
              </p>
            </article>

            <article className="how-step-card">
              <div className="how-step-icon">
                <img src={executionScalingImage} alt="Selection and alignment" />
              </div>
              <h3>Selection &amp; Alignment</h3>
              <p>
                Assess candidates efficiently and align the right talent with your
                project goals.
              </p>
            </article>

            <article className="how-step-card">
              <div className="how-step-icon">
                <img src={selectionAlignmentImage} alt="Execution and scaling" />
              </div>
              <h3>Execution &amp; Scaling</h3>
              <p>
                Drive outcomes faster with scalable teams and ongoing delivery
                support.
              </p>
            </article>
          </div>

          <p className="how-it-works-caption">
            <strong>No lengthy hiring cycles. No administrative overhead.</strong>
          </p>
        </div>
      </section>

      <section className="section home-section home-services-section">
        <div className="container">
          <SectionHeader
            className="home-services-header"
            eyebrow="Services"
            title="End-to-End IT Services Built for Scale, Speed, and Reliability"
            text="From rapid talent augmentation to full-scale project delivery, we help organizations accelerate innovation, reduce operational risk, and achieve measurable business outcomes."
          />
          <div className="card-grid three-up home-services-grid">
            {homeServices.map((service) => (
              <article key={service.title} className="content-card home-service-card">
                <div className="home-service-card-header">
                  <span className="home-service-icon" aria-hidden="true">
                    {service.icon}
                  </span>
                  <h3>{service.title}</h3>
                </div>
                <p>{service.description}</p>
                <Link to="/services">Explore Solution →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-section section-muted">
        <div className="container">
          <SectionHeader
            className="home-products-header"
            eyebrow="Accelerators"
            title="Accelerators built to speed delivery and reduce execution risk"
            text="Our productized accelerators help teams move faster across QA, cloud migration, DevOps, performance testing, and data analytics."
          />
          <div className="product-list home-product-list">
            {products.map((product, index) => {
              const highlights = product.useCase
                .replace(/^Highlights:\s*/i, "")
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);

              return (
                <article key={product.title} className="product-list-item">
                  <div className="product-list-summary">
                    <span className="product-list-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{product.title}</h3>
                    <span className="product-list-hint">Hover to view details</span>
                  </div>

                  <div className="product-list-details">
                    <p>{product.description}</p>
                    <div className="product-list-highlights">
                      {highlights.map((highlight) => (
                        <span key={highlight} className="product-highlight-chip">
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <Link to="/products">Explore accelerators</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section home-section">
        <div className="container">
          <SectionHeader
            className="home-testimonials-header"
            eyebrow="Client Feedback"
            title="Trusted by leaders to deliver fast, reliable outcomes."
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

      <section className="section home-section cta-section">
        <div className="container cta-panel">
          <div>
            <span className="eyebrow">Get Started</span>
            <h2>Scale your team faster. Deliver with confidence</h2>
            <p>
              Tell us your requirement—we’ll align the right talent and delivery
              model to meet your goals.
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
