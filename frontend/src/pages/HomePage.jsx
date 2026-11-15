import { siteConfig } from "../config/siteConfig";
import { usePageMeta } from "../usePageMeta";
import ProcessGraph from "../components/ProcessGraph";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { products } from "../data/siteContent";
import headerSymbol from "../assets/trinexora-logo-symbol-source.png";

const homeServices = [
  {
    title: "Bring Your Product to Life",
    description: "Have an idea or a project to move forward? Our delivery team helps you turn business needs into software that’s ready to use.",
    href: "/services#software-delivery",
    cta: "Build with Us",
    icon: "build"
  },
  {
    title: "Add the Expertise You Need",
    description: "Strengthen your team with technology professionals who fit your skills, timeline and working model.",
    href: "/services#it-staffing",
    cta: "Find Your Talent",
    icon: "talent"
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
            <h2>How We Help Your Business</h2>
            <span className="how-it-works-line" />
          </div>
          <div className="home-overview-layout">
            <div className="home-overview-intro">
              <span className="home-overview-eyebrow">Your Next Step Starts Here</span>
              <h2>Move Your Business Forward.</h2>
              <p>Great technology starts with the right people and a clear plan. We bring both, helping you build what’s next and grow the team behind it.</p>
              <Link className="button button-primary" to="/services">Discover Our Services →</Link>
            </div>
            <div className="home-overview-options">
              {homeServices.map(service => (
                <article className="home-overview-option" key={service.title}>
                  <span className="home-overview-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      {service.icon === "build" ? <><rect x="3" y="4" width="18" height="15" rx="2" /><path d="M3 9h18m-12 3-3 2 3 2m6-4 3 2-3 2M7 7h.01M10 7h.01" /></> : <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2m1-15a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4v2" /></>}
                    </svg>
                  </span>
                  <div><h3>{service.title}</h3><p>{service.description}</p><Link to={service.href}>{service.cta} <span aria-hidden="true">→</span></Link></div>
                </article>
              ))}
            </div>
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

          <ProcessGraph />

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
          <Link className="button button-primary" to="/get-started">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
