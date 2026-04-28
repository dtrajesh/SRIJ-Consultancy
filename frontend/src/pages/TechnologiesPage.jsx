import { Link } from "react-router-dom";
import technologyHeroBackground from "../assets/technology-hero-background.png";

const technologyAreas = [
  {
    icon: "💻",
    title: "Software Engineering",
    description:
      "Modern application development for enterprise, SaaS, and digital platforms.",
    skills: [
      "Java",
      "Spring Boot",
      ".NET",
      "Python",
      "Node.js",
      "Django",
      "Flask",
      "REST APIs",
      "Microservices"
    ]
  },
  {
    icon: "🎨",
    title: "Frontend & Experience Engineering",
    description:
      "Responsive, fast, user-friendly interfaces for web and enterprise apps.",
    skills: [
      "React",
      "Angular",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "UI Optimization"
    ]
  },
  {
    icon: "☁️",
    title: "Cloud & DevOps",
    description:
      "Accelerate releases with scalable infrastructure and automation.",
    skills: [
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Terraform",
      "Monitoring",
      "Infrastructure Automation"
    ]
  },
  {
    icon: "🤖",
    title: "AI, GenAI & Data Science",
    description:
      "Build intelligent workflows, automation, and data-driven products.",
    skills: [
      "Generative AI",
      "LLM Integrations",
      "Prompt Engineering",
      "Machine Learning",
      "Predictive Analytics",
      "AI Automation"
    ]
  },
  {
    icon: "📊",
    title: "Data Engineering & Analytics",
    description:
      "Reliable data platforms for reporting, pipelines, and business insights.",
    skills: [
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
    icon: "🛡️",
    title: "Cybersecurity",
    description: "Secure applications, cloud systems, and delivery operations.",
    skills: [
      "Application Security",
      "IAM",
      "Secure SDLC",
      "Vulnerability Support",
      "Compliance Readiness",
      "Monitoring"
    ]
  },
  {
    icon: "🧪",
    title: "QA & Performance Engineering",
    description:
      "Quality at scale with automation, API testing, and performance assurance.",
    skills: [
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
    icon: "🏢",
    title: "Enterprise Applications",
    description:
      "Support, modernization, and integration of business-critical platforms.",
    skills: [
      "SAP",
      "Oracle Apps",
      "Salesforce",
      "ServiceNow",
      "ERP Support",
      "Production Stability",
      "Modernization"
    ]
  }
];

export default function TechnologiesPage() {
  return (
    <section className="section page-intro technologies-page">
      <div className="container">
        <div className="technologies-hero">
          <div className="technologies-hero-copy">
            <h1>
              <span className="technologies-title-main">Technology Expertise</span>
              <span className="technologies-title-accent">That Powers Modern Delivery</span>
            </h1>
            <p>
              We provide specialized talent and delivery teams across modern
              engineering, cloud, data, AI, QA, and enterprise platforms—helping
              organizations scale faster with the right technology capabilities.
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
                <span className="technology-card-icon" aria-hidden="true">
                  {area.icon}
                </span>
                <h3>{area.title}</h3>
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
            <span>Need Experts in a Specific Technology Stack?</span>
            <p>
              Whether you need one specialist or a full delivery team, we help you
              scale with pre-vetted technical talent.
            </p>
          </div>
          <Link className="button button-primary" to="/contact">
            Talk to Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}
