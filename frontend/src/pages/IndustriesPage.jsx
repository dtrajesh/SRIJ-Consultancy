import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";

const industries = [
  {
    icon: "🏦",
    name: "Banking & Financial Services",
    description:
      "Secure digital transformation, core banking modernization, payments platforms, fraud systems, QA, and regulatory reporting support."
  },
  {
    icon: "🏥",
    name: "Healthcare",
    description:
      "HIPAA-conscious delivery for healthcare platforms, provider systems, patient engagement tools, and operational support."
  },
  {
    icon: "📡",
    name: "Telecom",
    description:
      "OSS/BSS modernization, rollout planning, network support systems, customer experience platforms, and service assurance."
  },
  {
    icon: "🛒",
    name: "Retail & E-commerce",
    description:
      "Scalable commerce platforms, POS integrations, performance testing, digital storefronts, and omnichannel customer experiences."
  },
  {
    icon: "🏭",
    name: "Manufacturing",
    description:
      "ERP integrations, plant systems modernization, supply chain visibility, automation, QA, and enterprise support services."
  },
  {
    icon: "🛡️",
    name: "Insurance",
    description:
      "Policy administration systems, claims platforms, underwriting workflows, customer portals, and compliance-driven testing."
  },
  {
    icon: "💊",
    name: "Pharma & Life Sciences",
    description:
      "Validated systems support, clinical platforms, compliance solutions, R&D applications, data integrity, and regulated delivery."
  },
  {
    icon: "⚡",
    name: "Energy & Utilities",
    description:
      "Smart grid systems, billing platforms, asset management, field operations tools, analytics, and modernization programs."
  },
  {
    icon: "🚚",
    name: "Logistics & Supply Chain",
    description:
      "Warehouse systems, transportation platforms, automation, visibility tools, forecasting, and operational resilience."
  },
  {
    icon: "💻",
    name: "IT & Software",
    description:
      "Product engineering, cloud transformation, DevOps, QA automation, application modernization, and managed delivery teams."
  }
];

const clientReasons = [
  "Industry-aligned delivery teams",
  "Fast access to specialized talent",
  "Scalable onsite / offshore / hybrid models",
  "Strong QA, automation, and performance engineering expertise",
  "Secure and compliance-conscious execution",
  "Reliable delivery with measurable outcomes"
];

export default function IndustriesPage() {
  return (
    <section className="section page-intro industries-page">
      <div className="container">
        <div className="industries-hero">
          <SectionHeader
            eyebrow="Industry Focus"
            title="Trusted Delivery Teams for High-Stakes, Industry-Specific Operations"
            text="We partner with organizations where speed, precision, compliance, and scalability are mission-critical. Our domain-aligned teams bring industry expertise, technology excellence, and execution discipline to every engagement."
          />
        </div>

        <div className="industries-section-heading">
          <h3>Industry Expertise That Drives Results</h3>
          <p>Industries We Serve</p>
        </div>

        <div className="industries-grid">
          {industries.map((industry) => (
            <article key={industry.name} className="industry-card">
              <span className="industry-card-icon" aria-hidden="true">
                {industry.icon}
              </span>
              <h3>{industry.name}</h3>
              <p>{industry.description}</p>
            </article>
          ))}
        </div>

        <section className="industries-why">
          <div>
            <span className="industries-why-kicker">Why Clients Choose Us</span>
            <h3>Built for regulated, high-velocity delivery environments</h3>
          </div>
          <ul>
            {clientReasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </section>

        <div className="industries-cta">
          <div>
            <span>Need Specialized Talent for Your Industry?</span>
            <p>
              From strategic staffing to managed delivery, we help businesses scale
              with domain-ready professionals.
            </p>
          </div>
          <Link className="button button-primary" to="/contact">
            Start the Conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
