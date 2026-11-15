import { Link } from "react-router-dom";
import { usePageMeta } from "../usePageMeta";
import deliveryImage from "../assets/home-hero-team-background.png";
import staffingImage from "../assets/careers-hero-background.png";

const models = [
  {
    number: "01",
    id: "software-delivery",
    title: "End-to-End Software Development & Delivery",
    description: "We take ownership of the complete software development lifecycle, delivering solutions from initial discovery to production deployment and ongoing support.",
    listTitle: "What we handle:",
    items: ["Business requirements and technical discovery", "Architecture and solution design", "Software development and integration", "Quality engineering and automation testing", "DevOps, CI/CD and deployment", "Production support and maintenance"],
    image: deliveryImage,
    alt: "Technology team coordinating software delivery",
    cta: "Discuss a Project",
    to: "/get-started"
  },
  {
    number: "02",
    id: "it-staffing",
    title: "IT Staffing & Resource Augmentation",
    description: "We help organizations access skilled technology professionals to strengthen existing teams, accelerate projects and meet changing workforce demands.",
    listTitle: "What we provide:",
    items: ["Contract staffing", "Permanent recruitment", "Contract-to-hire resources", "On-demand technical specialists", "Dedicated development teams", "Short-term and long-term resource support"],
    image: staffingImage,
    alt: "Professionals collaborating on technology projects",
    cta: "Request Talent",
    to: "/get-started"
  }
];

const expertise = [
  { target: "software-engineering", name: "Software Engineering", icon: "code", detail: "Java, .NET, React, Python, Flask & Django" },
  { target: "qa-performance", name: "QA & Test Automation", icon: "check", detail: "Selenium, Playwright & JMeter" },
  { target: "cloud", name: "Cloud & DevOps", icon: "cloud", detail: "Deploy & scale" },
  { target: "data-engineering", name: "Data Engineering", icon: "data", detail: "Databricks, Apache Spark & SQL" },
  { target: "ai-genai", name: "AI & GenAI Solutions", icon: "spark", detail: "LangChain, LangGraph & machine learning" },
  { target: "application-support", name: "Application Support", icon: "support", detail: "Maintain & optimize" }
];

function ExpertiseIcon({ type }) {
  const paths = {
    code: <><path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18" /></>,
    check: <><path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Z" /><path d="m8 12 3 3 5-6" /></>,
    cloud: <><path d="M6 19a5 5 0 0 1-1-10 7 7 0 0 1 13-2 6 6 0 0 1 0 12H6Z" /><path d="m9 13 3-3 3 3m-3-3v7" /></>,
    data: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" /></>,
    spark: <><path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" /></>,
    support: <><path d="M4 14v-2a8 8 0 0 1 16 0v2M4 12H2v7h4v-7H4Zm16 0h2v7h-4v-7h2Zm0 7c0 3-4 3-8 3" /></>
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}

export default function ServicesPage() {
  usePageMeta({ title: "What We Offer | IT Staffing & Software Delivery | Trinexora", path: "/services", description: "Flexible engagement models for end-to-end software development, IT staffing, resource augmentation, and technology delivery." });
  return (
    <div className="engagement-page">
      <section className="engagement-hero">
        <div className="container engagement-hero-grid">
          <div>
            <span className="engagement-eyebrow">Flexible Engagement Models</span>
            <h1>Staffing & Delivery Models <span>That Fit Your Needs</span></h1>
            <p>From complete software delivery to specialized IT talent, we provide flexible engagement models that help businesses build, scale and deliver technology solutions.</p>
            <div className="engagement-actions">
              <a className="button button-primary" href="#engagement-models">Explore What We Offer <span aria-hidden="true">→</span></a>
              <Link className="engagement-secondary-link" to="/get-started">Talk to Our Team <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <div className="engagement-hero-art" aria-hidden="true">
            <div className="engagement-orbit" />
            <span className="engagement-art-label">YOUR GOALS. OUR EXPERTISE.</span>
            <div className="engagement-art-card"><span>01 / DELIVERY</span><strong>From vision<br />to production.</strong><div className="engagement-art-track"><i /><i /><i /><i /></div></div>
            <div className="engagement-art-card engagement-art-card-two"><span>02 / STAFFING</span><strong>The right talent.<br />At the right time.</strong><div className="engagement-art-people"><i /><i /><i /><span>+</span></div></div>
            <span className="engagement-art-bottom">ONE TECHNOLOGY PARTNER</span>
          </div>
        </div>
      </section>
      <section className="container engagement-models" id="engagement-models" aria-labelledby="engagement-models-title">
        <div className="engagement-section-heading"><span className="engagement-eyebrow">How We Work</span><h2 id="engagement-models-title">Two Models. One Technology Partner.</h2><p>Whether you need a complete delivery partner or skilled professionals, we adapt to your business requirements.</p></div>
        <div className="engagement-model-grid">{models.map(model => (
          <article className="engagement-model-card" id={model.id} key={model.number}>
            <div className="engagement-model-image"><img src={model.image} alt={model.alt} loading="lazy" /><span>Model {model.number}</span></div>
            <div className="engagement-model-content"><h3>{model.title}</h3><p>{model.description}</p><h4>{model.listTitle}</h4><ul>{model.items.map(item => <li key={item}>{item}</li>)}</ul><Link className="engagement-model-cta" to={model.to}>{model.cta} <span aria-hidden="true">→</span></Link></div>
          </article>
        ))}</div>
      </section>
      <section className="engagement-expertise" aria-labelledby="engagement-expertise-title"><div className="container"><div className="engagement-section-heading"><span className="engagement-eyebrow">Built on Technical Depth</span><h2 id="engagement-expertise-title">Technology Expertise</h2></div><div className="engagement-expertise-grid">{expertise.map(item => <Link className="engagement-expertise-card" key={item.name} to={`/our-expertise#${item.target}`}><ExpertiseIcon type={item.icon} /><h3>{item.name}</h3><p>{item.detail}</p></Link>)}</div></div></section>
      <section className="container engagement-contact"><div><span className="engagement-eyebrow">Let’s Get Started</span><h2>Let’s Build Something Together</h2><p>Tell us about your project or staffing requirements. Let’s find the right engagement model for your business.</p></div><Link className="button button-primary" to="/get-started">Contact Our Team <span aria-hidden="true">→</span></Link></section>
    </div>
  );
}
