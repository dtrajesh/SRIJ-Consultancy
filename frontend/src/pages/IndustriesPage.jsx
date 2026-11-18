import { usePageMeta } from "../usePageMeta";
import IndustryIcon from "../components/IndustryIcon";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";

const industries = [
  {
    "icon": "banking",
    "name": "Banking, Financial Services & Insurance",
    "description": "IT staffing and software delivery for banking, payments and insurance applications, with a focus on reliable integrations, data processing and application support."
  },
  {
    "icon": "retail",
    "name": "Retail & E-commerce",
    "description": "Engineering, cloud and quality assurance support for online stores, order management and retail platforms, from product discovery through checkout and fulfilment."
  },
  {
    "icon": "healthcare",
    "name": "Healthcare",
    "description": "Software development, data integration and application support for healthcare platforms, aligned with your requirements for handling sensitive patient and operational information."
  },
  {
    "icon": "telecom",
    "name": "Telecommunications",
    "description": "Software, DevOps and application support for telecommunications providers, helping teams develop and maintain customer portals, service platforms and connected systems."
  },
  {
    "icon": "manufacturing",
    "name": "Manufacturing & Supply Chain",
    "description": "ERP, integration and data specialists who help connect production, inventory, procurement and logistics systems across manufacturing and supply chain operations."
  },
  {
    "icon": "software",
    "name": "IT & Software",
    "description": "Software engineers, QA specialists, cloud professionals and data teams for product companies and IT firms, through individual staffing or end-to-end project delivery."
  }
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
            text="We help businesses hire technology professionals and deliver software projects tailored to their industry, systems and operational needs."
          />
        </div>

        <div className="industries-section-heading">
          <h2>IT Expertise for Your Industry</h2>
          <p>Specialist talent and software delivery aligned with your sector.</p>
        </div>

        <div className="industries-grid">
          {industries.map((industry) => (
            <article key={industry.name} className={`industry-card industry-${industry.icon}`}>
              <IndustryIcon type={industry.icon} />
              <h3>{industry.name}</h3>
              <p>{industry.description}</p>
            </article>
          ))}
        </div>


        <div className="industries-cta">
          <div>
            <span>Need Technology Talent or Delivery Support?</span>
            <p>
              Share your industry, technology stack and business goals. We’ll help
              you choose the right staffing or software delivery model.
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
