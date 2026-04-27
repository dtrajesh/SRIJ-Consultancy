import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { products, testimonials } from "../data/siteContent";
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

const trustStripItems = [
  {
    icon: "globe",
    title: "Global Delivery Model",
    text: "Across 20+ Countries"
  },
  {
    icon: "expert",
    title: "Pre-vetted Experts",
    text: "Top 1% Tech Talent"
  },
  {
    icon: "teams",
    title: "Scalable Teams",
    text: "On Demand"
  },
  {
    icon: "support",
    title: "24/7 Support",
    text: "Follow-the-sun Model"
  },
  {
    icon: "shield",
    title: "Secure & Compliant",
    text: "ISO 27001 Certified"
  }
];

function TrustStripIcon({ type }) {
  const commonProps = {
    className: "trust-strip-svg",
    viewBox: "0 0 48 48",
    role: "img",
    "aria-hidden": "true"
  };

  if (type === "globe") {
    return (
      <svg {...commonProps}>
        <circle cx="24" cy="24" r="17" />
        <path d="M7 24h34M24 7c5 5 8 11 8 17s-3 12-8 17M24 7c-5 5-8 11-8 17s3 12 8 17" />
        <path d="M11 15h26M11 33h26" />
      </svg>
    );
  }

  if (type === "expert") {
    return (
      <svg {...commonProps}>
        <circle cx="24" cy="15" r="6" />
        <path d="M13 37v-4c0-7 5-12 11-12s11 5 11 12v4" />
        <path d="M18 37h12M35 17l3 3 6-8" />
      </svg>
    );
  }

  if (type === "teams") {
    return (
      <svg {...commonProps}>
        <circle cx="24" cy="13" r="5" />
        <circle cx="13" cy="23" r="4" />
        <circle cx="35" cy="23" r="4" />
        <path d="M16 39v-4c0-5 3-9 8-9s8 4 8 9v4M5 39v-3c0-4 3-7 8-7M43 39v-3c0-4-3-7-8-7" />
      </svg>
    );
  }

  if (type === "support") {
    return (
      <svg {...commonProps}>
        <circle cx="24" cy="25" r="14" />
        <path d="M24 11V6M18 6h12M24 25l7-6M13 12l-4-4M35 12l4-4" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M24 6 38 12v12c0 10-6 16-14 19-8-3-14-9-14-19V12z" />
      <path d="M17 25l5 5 10-12" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid hero-grid-copy-only">
          <div className="hero-copy">
            <span className="eyebrow">
              Build. Scale. Deliver.
            </span>
            <h1>
              Build, Scale &amp; Deliver
              <br />
              Technology Faster
            </h1>
            <p>
              End-to-end IT services and talent solutions that help enterprises accelerate
              innovation, reduce risk, and achieve measurable business outcomes.
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
        </div>
      </section>

      <section className="stats-band">
        <div className="container trust-strip-grid">
          {trustStripItems.map((item) => (
            <article key={item.title} className="trust-strip-item">
              <span className="trust-strip-icon" aria-hidden="true">
                <TrustStripIcon type={item.icon} />
              </span>
              <div>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section home-section home-services-section">
        <div className="container">
          <div className="home-services-label">
            <span className="how-it-works-line" />
            <h2>What We Do</h2>
            <span className="how-it-works-line" />
          </div>
          <SectionHeader
            className="home-services-header"
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

      <section className="section home-section section-muted">
        <div className="container">
          <div className="home-section-label">
            <span className="how-it-works-line" />
            <h2>Accelerators</h2>
            <span className="how-it-works-line" />
          </div>
          <SectionHeader
            className="home-products-header"
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
          <div className="home-section-label">
            <span className="how-it-works-line" />
            <h2>Client Feedback</h2>
            <span className="how-it-works-line" />
          </div>
          <SectionHeader
            className="home-testimonials-header"
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
