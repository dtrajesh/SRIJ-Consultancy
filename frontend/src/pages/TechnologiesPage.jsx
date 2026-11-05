import { usePageMeta } from "../usePageMeta";
import TechnologyIcon from "../components/TechnologyIcon";
import { Link } from "react-router-dom";
import technologyHeroBackground from "../assets/technology-hero-background.png";

const technologyAreas = [
  {
    "icon": "🧪",
    "title": "QA & Performance Engineering",
    "description": "Test automation, API testing and performance engineering that help teams release with confidence.",
    "skills": [
      "Selenium",
      "Playwright",
      "Cypress",
      "JMeter",
      "LoadRunner",
      "API Testing",
      "Automation Frameworks",
      "Performance Testing"
    ]
  },
  {
    "icon": "🏢",
    "title": "Enterprise Applications",
    "description": "SAP and enterprise platform professionals for support, integration and upgrade projects.",
    "skills": [
      "SAP",
      "Oracle Apps",
      "Salesforce",
      "ServiceNow",
      "ERP Support",
      "Integration",
      "Upgrades"
    ]
  },
  {
    "icon": "💻",
    "title": "Software Engineering",
    "description": "Developers for enterprise, SaaS and web applications, from single hires to project teams.",
    "skills": [
      "Java",
      "Spring Boot",
      ".NET",
      "Python",
      "Node.js",
      "REST APIs",
      "Microservices"
    ]
  },
  {
    "icon": "🎨",
    "title": "Frontend Engineering",
    "description": "Frontend engineers who build responsive, user-friendly interfaces for web and enterprise applications.",
    "skills": [
      "React",
      "Angular",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3"
    ]
  },
  {
    "icon": "☁️",
    "title": "Cloud & DevOps",
    "description": "Cloud and DevOps engineers for infrastructure setup, release automation and monitoring.",
    "skills": [
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Terraform",
      "Monitoring"
    ]
  },
  {
    "icon": "📊",
    "title": "Data Engineering & Analytics",
    "description": "Data engineers and analysts for pipelines, reporting and business intelligence dashboards.",
    "skills": [
      "SQL Server",
      "PostgreSQL",
      "MySQL",
      "ETL Pipelines",
      "Data Warehousing",
      "Power BI",
      "Tableau"
    ]
  },
  {
    "icon": "🤖",
    "title": "AI & Machine Learning",
    "description": "Professionals for machine learning, analytics and generative AI use cases.",
    "skills": [
      "Machine Learning",
      "Generative AI",
      "LLM Integration",
      "Predictive Analytics"
    ]
  },
  {
    "icon": "🛡️",
    "title": "Cybersecurity",
    "description": "Security professionals for application security, access management and secure development.",
    "skills": [
      "Application Security",
      "IAM",
      "Secure SDLC",
      "Security Testing"
    ]
  }
];

export default function TechnologiesPage() {
  usePageMeta({
    title: "Technologies We Work With | Trinexora",
    path: "/technologies",
    description: "The programming languages, cloud platforms, testing tools and enterprise systems our team hires for and works with."
  });
  return (
    <section className="section page-intro technologies-page">
      <div className="container">
        <div className="technologies-hero">
          <div className="technologies-hero-copy">
            <h1>
              <span className="technologies-title-main">Technology Skills</span>
              <span className="technologies-title-accent">We Hire For and Deliver</span>
            </h1>
            <p>
              Find specialists across engineering, cloud, data, QA and enterprise
              platforms. Hire one expert, build a team, or have us deliver your project.
            </p>
          </div>

          <div className="technologies-hero-visual">
            <img
              src={technologyHeroBackground}
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="technology-card-grid">
          {technologyAreas.map((area) => (
            <article key={area.title} className="technology-card">
              <div className="technology-card-header">
                <TechnologyIcon title={area.title} />
                <h2>{area.title}</h2>
              </div>
              <p>{area.description}</p>
              <div className="technology-skills" aria-label={`${area.title} skills`}>
                {area.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="technology-cta">
          <div>
            <span>Need experts in a specific technology stack?</span>
            <p>
              Tell us the skills and experience you need, whether it’s one specialist
              or a full team, and we’ll share screened profiles.
            </p>
          </div>
          <Link className="button button-primary" to="/contact">
            Share Your Requirement
          </Link>
        </div>
      </div>
    </section>
  );
}
