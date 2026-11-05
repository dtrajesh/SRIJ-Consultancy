import { siteConfig } from "../config/siteConfig";
import { usePageMeta } from "../usePageMeta";
import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { products } from "../data/siteContent";
import requirementDiscoveryImage from "../assets/how-it-works/requirement-discovery.jpeg";
import curatedTalentDeliveryImage from "../assets/how-it-works/curated-talent-delivery.jpeg";
import selectionAlignmentImage from "../assets/how-it-works/selection-alignment.jpeg";
import executionScalingImage from "../assets/how-it-works/execution-scaling.jpeg";
import headerSymbol from "../assets/trinexora-logo-symbol-source.png";

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
    title: "Based in Hyderabad",
    text: "Serving clients across India"
  },
  {
    icon: "expert",
    title: "Pre-vetted Experts",
    text: "Screened before submission"
  },
  {
    icon: "teams",
    title: "Flexible Hiring",
    text: "Contract, contract-to-hire, permanent"
  },
  {
    icon: "support",
    title: "Quick Response",
    text: "Reply within one business day"
  },
  {
    icon: "shield",
    title: "Confidential Process",
    text: "Your data and profiles stay private"
  }
];

function TrustStripIcon({ type }) {
  const paths = {
    globe: <><path d="M20 10a8 8 0 0 1 8 8c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 8-8Z" /><circle cx="20" cy="18" r="2.5" /></>,
    expert: <><circle cx="17" cy="14" r="5" /><path d="M7 31v-3a10 10 0 0 1 20 0v3M27 15l3 3 5-6" /></>,
    teams: <><rect x="7" y="14" width="26" height="18" rx="3" /><path d="M15 14v-3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3M7 21a31 31 0 0 0 26 0M18 23h4" /></>,
    support: <><path d="M30 21V10a3 3 0 0 0-3-3H10a3 3 0 0 0-3 3v21l7-6h6" /><circle cx="28" cy="28" r="8" /><path d="M28 23v5l3 2M13 13h11M13 18h7" /></>,
    shield: <><rect x="9" y="18" width="22" height="16" rx="3" /><path d="M14 18v-6a6 6 0 0 1 12 0v6M20 25v3" /><circle cx="20" cy="24" r="1" /></>
  };
  return <svg className="trust-strip-svg" viewBox="0 0 40 40" aria-hidden="true">{paths[type]}</svg>;
}

export default function HomePage() {
  usePageMeta({
    title: "Trinexora | IT Staffing & Technology Solutions in Hyderabad",
    path: "/",
    description: "IT staffing and technology solutions from Hyderabad. We help companies hire skilled professionals and build and deliver technology projects."
  });
  const [processTrack, setProcessTrack] = useState("hiring");

  function handleTrackKey(event) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? "hiring" : event.key === "End" ? "project" : processTrack === "hiring" ? "project" : "hiring";
    setProcessTrack(next);
    document.getElementById(`process-tab-${next}`)?.focus();
  }

  return (
    <>
      <section className="hero">
        <div className="container hero-grid home-hero-grid">
          <div className="hero-copy">
            <h1>
              <span className="home-title-main">IT Staffing &amp;</span>
              <span className="home-title-accent">Technology Solutions</span>
            </h1>
            <p>
              Hire skilled technology professionals, or have us build and deliver
              your project. One partner for talent and delivery.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/get-started">
                Share Your Requirement
              </Link>
              <Link className="button button-primary" to="/services">
                Explore Services
              </Link>
              <Link className="button button-primary" to="/careers">
                Find a Job
              </Link>
            </div>
          </div>
          <div className="home-hero-logo-wrap" aria-label="Trinexora, IT Staffing, IT Solutions, IT Delivery">
            <img className="home-hero-brand-symbol" src={headerSymbol} alt="" aria-hidden="true" />
            <span className="home-hero-brand-copy">
              <span className="home-hero-brand-name" aria-hidden="true">
                <span className="home-hero-brand-name-blue">TR<span className="home-hero-brand-accent-letter">I</span></span>NEXORA
              </span>
              <span className="home-hero-brand-tagline">IT Staffing | IT Solutions | IT Delivery</span>
            </span>
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

          <div className="process-tabs" role="tablist" aria-label="Choose a process" onKeyDown={handleTrackKey}>
            <button id="process-tab-hiring" type="button" role="tab" aria-selected={processTrack === "hiring"} aria-controls="process-panel-hiring" tabIndex={processTrack === "hiring" ? 0 : -1} onClick={() => setProcessTrack("hiring")}>Hiring talent</button>
            <button id="process-tab-project" type="button" role="tab" aria-selected={processTrack === "project"} aria-controls="process-panel-project" tabIndex={processTrack === "project" ? 0 : -1} onClick={() => setProcessTrack("project")}>Building a project</button>
          </div>

          <div role="tabpanel" id="process-panel-hiring" aria-labelledby="process-tab-hiring" hidden={processTrack !== "hiring"} tabIndex={0}>
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

          </div>
          <div role="tabpanel" id="process-panel-project" aria-labelledby="process-tab-project" hidden={processTrack !== "project"} tabIndex={0}>
            <div className="how-it-works-grid project-process-grid">
              {[
                { title: "Discover and scope", text: "Understand your goals, users and requirements, and agree what the project will cover.", icon: <><rect x="11" y="10" width="29" height="37" rx="4" /><path d="M19 20h13M19 28h9" /><circle cx="40" cy="39" r="9" /><path d="m47 46 7 7" /></> },
                { title: "Plan and estimate", text: "Define milestones, responsibilities, timelines and costs before work begins.", icon: <><rect x="10" y="13" width="44" height="39" rx="5" /><path d="M10 25h44M22 8v10M42 8v10M20 34h7M36 34h7M20 43h7M36 43h7" /></> },
                { title: "Build and test", text: "Build the agreed solution, test it against requirements, and review progress with you.", icon: <><rect x="7" y="10" width="50" height="39" rx="5" /><path d="M7 21h50M25 29l-7 6 7 6M39 29l7 6-7 6M36 26l-8 18M24 55h16" /></> },
                { title: "Deliver and support", text: "Coordinate the release, hand over documentation, and provide support within the agreed scope.", icon: <><path d="m32 7 20 10v27L32 55 12 44V17Z M12 17l20 11 20-11M32 28v27M22 12l20 11" /><path d="m22 36 7 7 13-13" /></> }
              ].map((step, index) => <article className="how-step-card" key={step.title}>
                <div className="project-step-icon" aria-hidden="true"><svg viewBox="0 0 64 64">{step.icon}</svg><span>{index + 1}</span></div>
                <h3>{step.title}</h3><p>{step.text}</p>
              </article>)}
            </div>
          </div>

          <p className="how-it-works-caption">
            <strong>A clear process, whether you’re hiring or building.</strong>
          </p>
        </div>
      </section>

      {siteConfig.showSolutions && (
      <section className="section home-section section-muted">
        <div className="container">
          <div className="home-section-label">
            <span className="how-it-works-line" />
            <h2>Solutions</h2>
            <span className="how-it-works-line" />
          </div>
          <SectionHeader
            className="home-products-header"
            title="Accelerators in development"
            text="Reusable frameworks and templates are in development, starting with QA automation and performance testing. These assets are not yet available."
          />
          <div className="product-list home-product-list">
            {products.slice(0, 2).map((product, index) => {
              const highlights = product.highlights;

              return (
                <article key={product.title} className="product-list-item">
                  <div className="product-list-summary">
                    <span className="product-list-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{product.title}</h3>
                    <span className="accelerator-status">{product.status}</span>
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
                    <Link to="/solutions">Solutions</Link>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="accelerator-roadmap-link"><Link to="/solutions">Solutions</Link></p>
        </div>
      </section>
      )}

      <section className="section home-section" aria-labelledby="working-together-title">
        <div className="container">
          <div className="home-section-label">
            <span className="how-it-works-line" />
            <h2 id="working-together-title">How We Work With You</h2>
            <span className="how-it-works-line" />
          </div>
          <div className="card-grid three-up">
            <article className="content-card">
              <h3>Clear communication</h3>
              <p>A single point of contact and replies within one business day.</p>
            </article>
            <article className="content-card">
              <h3>Quality first</h3>
              <p>Only profiles and deliverables that match your requirement.</p>
            </article>
            <article className="content-card">
              <h3>Accountable delivery</h3>
              <p>Defined scope, regular updates, and support after go-live.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section home-section cta-section">
        <div className="container cta-panel">
          <div>
            <span className="eyebrow">Get Started</span>
            <h2>Tell us what you need: a hire or a project</h2>
            <p>
              Share your requirement and we’ll respond within one business day.
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
