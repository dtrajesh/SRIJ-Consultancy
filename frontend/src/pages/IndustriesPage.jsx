import { usePageMeta } from "../usePageMeta";
import IndustryIcon from "../components/IndustryIcon";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";

const industries = [
  {
    "icon": "banking",
    "name": "Banking, Financial Services & Insurance",
    "description": "Engineers, data specialists and application support teams who help banking, payments and insurance platforms run securely, reliably and at the speed customers expect."
  },
  {
    "icon": "retail",
    "name": "Retail & E-commerce",
    "description": "Full-stack developers, cloud engineers and testers who keep online stores fast, stable and ready for peak shopping periods, from product pages through to checkout."
  },
  {
    "icon": "healthcare",
    "name": "Healthcare",
    "description": "Software, data and integration professionals who build and support healthcare applications, handling sensitive patient and operational information with the care it requires."
  },
  {
    "icon": "telecom",
    "name": "Telecom",
    "description": "Software engineers, DevOps and support specialists for telecom systems and customer platforms that need dependable performance across large numbers of users and connected services."
  },
  {
    "icon": "manufacturing",
    "name": "Manufacturing & Supply Chain",
    "description": "SAP, ERP and supply chain systems professionals who help manufacturing and logistics teams keep production, inventory and deliveries connected and running smoothly."
  },
  {
    "icon": "software",
    "name": "IT & Software",
    "description": "Developers, DevOps, cloud and data engineers for product companies and technology services firms, available as individual hires or as dedicated teams for your projects."
  }
];

const clientReasons = [
  "Recruiters and engineers who understand your domain",
  "Quick access to screened specialists",
  "Onsite, hybrid and remote hiring options",
  "Strong QA, automation, and performance engineering expertise",
  "Confidential handling of your requirements and candidate data",
  "Clear scope and regular updates"
];

export default function IndustriesPage() {
  usePageMeta({
    title: "Industries We Serve | Trinexora",
    path: "/industries",
    description: "Hiring and technology delivery support for businesses across industries, from our base in Hyderabad."
  });
  return (
    <section className="section page-intro industries-page">
      <div className="container">
        <div className="industries-hero">
          <SectionHeader as="h1"
            title="Technology Talent and Delivery"
            titleAccent="for Your Industry"
            text="We help companies across key sectors hire skilled professionals and deliver technology projects, with teams who understand your domain."
          />
        </div>

        <div className="industries-section-heading">
          <h2>Industry Expertise That Delivers Business Impact</h2>
          <p>Industries we serve</p>
        </div>

        <div className="industries-grid">
          {industries.map((industry) => (
            <article key={industry.name} className="industry-card">
              <IndustryIcon type={industry.icon} />
              <h3>{industry.name}</h3>
              <p>{industry.description}</p>
            </article>
          ))}
        </div>

        <section className="industries-why">
          <div>
            <h2>Why Clients Choose Us</h2>
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
          <Link className="button button-primary" to="/get-started">
            Share Your Requirement
          </Link>
        </div>
      </div>
    </section>
  );
}
