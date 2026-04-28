import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";

const accelerators = [
  {
    icon: "☁️",
    title: "1. Cloud Migration Accelerator",
    problem:
      "Enterprises running on legacy data centers are struggling with cost and scalability.",
    implementation:
      "Migrate a monolithic banking application from on-prem to AWS/Azure using phased modernization.",
    approach: [
      "Automated workload discovery & dependency mapping",
      "Containerization using Docker/Kubernetes",
      "CI/CD-based migration pipeline",
      "Database replication using AWS DMS / Azure Migrate"
    ],
    outcomes: [
      "Reduced infra cost by 30-50%",
      "Zero/minimal downtime migration",
      "Scalable cloud-native architecture"
    ]
  },
  {
    icon: "⚙️",
    title: "2. DevOps Delivery Accelerator",
    problem:
      "Release cycles are slow due to manual deployments and inconsistent environments.",
    implementation:
      "Automate deployment pipeline for a multi-tier enterprise web application.",
    approach: [
      "Git-based CI/CD pipelines",
      "Infrastructure as Code with Terraform/Ansible",
      "Automated rollback strategies",
      "Environment parity across dev/test/prod"
    ],
    outcomes: [
      "70% faster release cycles",
      "Reduced deployment failures",
      "Standardized delivery process"
    ]
  },
  {
    icon: "🧪",
    title: "3. QA Automation Accelerator",
    problem:
      "Manual regression testing delays releases in Agile/DevOps environments.",
    implementation:
      "Automate regression suite for a retail eCommerce platform.",
    approach: [
      "Selenium/Cypress + API automation framework",
      "Reusable test libraries",
      "CI/CD integration for nightly runs",
      "Smart reporting dashboard"
    ],
    outcomes: [
      "80% reduction in manual testing effort",
      "Faster regression cycles",
      "Higher defect detection before production"
    ]
  },
  {
    icon: "📊",
    title: "4. Data Engineering Accelerator",
    problem:
      "Companies struggle with siloed data across ERP, CRM, and cloud apps.",
    implementation:
      "Build a unified data warehouse for a healthcare provider.",
    approach: [
      "ETL pipelines using Spark / Databricks",
      "Data lake on AWS S3 / Azure Data Lake",
      "Schema standardization layer",
      "Real-time ingestion via Kafka"
    ],
    outcomes: [
      "Single source of truth",
      "Faster reporting & analytics",
      "Improved operational decision-making"
    ]
  },
  {
    icon: "🤖",
    title: "5. AI Enablement Accelerator",
    problem:
      "Enterprises want AI but lack integration and real business use cases.",
    implementation:
      "Deploy an AI-powered support chatbot for IT service desk automation.",
    approach: [
      "LLM integration with OpenAI / Azure OpenAI",
      "Knowledge base ingestion",
      "NLP-based intent classification",
      "Integration with ServiceNow/Jira"
    ],
    outcomes: [
      "40-60% reduction in support tickets",
      "Faster resolution time",
      "24/7 self-service support"
    ]
  },
  {
    icon: "🔐",
    title: "6. Cybersecurity Compliance Accelerator",
    problem:
      "Frequent audit failures due to non-compliant systems and manual tracking.",
    implementation:
      "Automate compliance reporting for a financial services application.",
    approach: [
      "Continuous vulnerability scanning",
      "Automated compliance dashboards",
      "Policy-as-code enforcement",
      "Audit trail generation"
    ],
    outcomes: [
      "Audit-ready systems",
      "Reduced compliance overhead",
      "Early risk detection"
    ]
  },
  {
    icon: "🎨",
    title: "7. Digital Experience Accelerator",
    problem:
      "Inconsistent UI/UX across enterprise web and mobile apps.",
    implementation:
      "Create a unified design system for a multi-brand retail organization.",
    approach: [
      "Component library with React / Angular design system",
      "Reusable UI patterns",
      "Accessibility compliance",
      "Centralized design tokens"
    ],
    outcomes: [
      "Faster UI development",
      "Consistent brand experience",
      "Reduced design-to-dev gap"
    ]
  },
  {
    icon: "🔗",
    title: "8. Enterprise Integration Accelerator",
    problem:
      "Disconnected systems between ERP, CRM, HRMS, and third-party APIs.",
    implementation:
      "Integrate SAP, Salesforce, and internal HR systems for employee lifecycle automation.",
    approach: [
      "API gateway-based integration",
      "Middleware with MuleSoft / Boomi patterns",
      "Event-driven architecture",
      "Secure data transformation layer"
    ],
    outcomes: [
      "Real-time system synchronization",
      "Reduced manual data entry",
      "Faster business workflows"
    ]
  },
  {
    icon: "📡",
    title: "9. Observability & Monitoring Accelerator",
    problem:
      "Teams detect production issues too late due to lack of unified monitoring.",
    implementation:
      "Implement observability for a microservices-based fintech platform.",
    approach: [
      "Centralized logging with ELK stack",
      "Metrics monitoring with Prometheus/Grafana",
      "Distributed tracing with OpenTelemetry",
      "Alerting & anomaly detection"
    ],
    outcomes: [
      "Faster incident detection",
      "Full system visibility",
      "Proactive issue resolution"
    ]
  },
  {
    icon: "🧾",
    title: "10. ITSM Automation Accelerator",
    problem:
      "Service desks are overloaded with manual ticket handling and slow SLA resolution.",
    implementation:
      "Automate ITSM workflows for a global enterprise support organization using ServiceNow.",
    approach: [
      "Automated ticket routing using AI/ML",
      "Self-healing scripts for common issues",
      "SLA-based escalation automation",
      "Chatbot-driven ticket creation"
    ],
    outcomes: [
      "Faster ticket resolution",
      "Reduced support load",
      "Improved SLA compliance"
    ]
  }
];

export default function ProductsPage() {
  return (
    <section className="section page-intro accelerators-page">
      <div className="container">
        <div className="accelerators-hero">
          <SectionHeader
            title="Proven Solutions"
            titleAccent="That Help Clients Move Faster"
            text="Beyond staffing and consulting, Trinexora offers reusable delivery accelerators designed to reduce setup time, improve quality, and speed execution across transformation programs."
          />
        </div>

        <div className="accelerators-heading">
          <h3>Our Accelerators</h3>
          <p>Reusable delivery assets for faster execution</p>
        </div>

        <div className="accelerator-grid">
          {accelerators.map((accelerator) => (
            <article key={accelerator.title} className="accelerator-card">
              <div className="accelerator-card-header">
                <span className="accelerator-icon" aria-hidden="true">
                  {accelerator.icon}
                </span>
                <h3>{accelerator.title}</h3>
              </div>
              <div className="accelerator-copy-block">
                <strong>🏢 Industry Problem</strong>
                <p>{accelerator.problem}</p>
              </div>

              <div className="accelerator-copy-block">
                <strong>🔧 Implementation Idea</strong>
                <p>{accelerator.implementation}</p>
              </div>

              <div className="accelerator-detail">
                <strong>🧩 Solution Approach</strong>
                <div className="accelerator-tags">
                  {accelerator.approach.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="accelerator-value">
                <strong>🎯 Outcome</strong>
                <div className="accelerator-outcomes">
                  {accelerator.outcomes.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <Link className="accelerator-link" to="/contact">
                Talk to Our Experts
              </Link>
            </article>
          ))}
        </div>

        <div className="accelerators-cta">
          <div>
            <span>Need Faster Delivery Without Reinventing Everything?</span>
            <p>
              Leverage Trinexora accelerators to speed execution, reduce cost,
              and improve outcomes.
            </p>
          </div>
          <Link className="button button-primary" to="/contact">
            Talk to Our Experts
          </Link>
        </div>
      </div>
    </section>
  );
}
