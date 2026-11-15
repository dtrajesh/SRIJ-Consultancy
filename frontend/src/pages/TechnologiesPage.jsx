import { Link } from "react-router-dom";
import { usePageMeta } from "../usePageMeta";

const expertiseAreas = [
  { id: "cloud", title: "Cloud", description: "Whether you’re building a new application or moving existing systems to the cloud, we help you plan, deploy and manage infrastructure that fits your business.", skills: ["AWS", "Microsoft Azure", "Google Cloud", "Cloud migration", "Monitoring"], logos: [["amazonwebservices", "AWS"], ["googlecloud", "Google Cloud"], ["azure", "Microsoft Azure"]] },
  { id: "devops", title: "DevOps", description: "Connect development and operations with automated builds, repeatable deployments and clear release processes. Our teams support continuous delivery and reliable infrastructure.", skills: ["CI/CD", "Containers", "Infrastructure as code", "Release automation"], logos: [["git", "Git"], ["docker", "Docker"], ["jenkins", "Jenkins"], ["kubernetes", "Kubernetes"]] },
  { id: "enterprise-applications", title: "Enterprise Applications & ERP", description: "Strengthen your enterprise platforms with professionals who understand implementation, integration, upgrades and ongoing support across business systems.", skills: ["SAP", "Oracle Apps", "Salesforce", "ServiceNow", "ERP integration"], logos: [["oracle", "Oracle"], ["salesforce", "Salesforce"]] },
  { id: "software-engineering", title: "Software Engineering", description: "Build and enhance business applications with engineers experienced in backend services, APIs and modern web interfaces. Work with individual specialists or a dedicated delivery team.", skills: ["Java & Spring Boot", ".NET", "Python", "React", "REST APIs", "Microservices"], logos: [["java", "Java"], ["dotnetcore", ".NET"], ["python", "Python"], ["react", "React"]] },
  { id: "qa-performance", title: "QA & Performance Engineering", description: "Make quality part of every release through functional testing, API validation, test automation and performance engineering aligned with your application requirements.", skills: ["Selenium", "Playwright", "Cypress", "JMeter", "API testing", "Performance testing"], logos: [["selenium", "Selenium"], ["playwright", "Playwright"]] },
  { id: "data-engineering", title: "Data Engineering & Analytics", description: "Bring data together through dependable pipelines, well-designed databases and reporting that helps your team understand and use business information.", skills: ["SQL", "ETL pipelines", "Data warehousing", "Power BI", "Tableau"], logos: [["postgresql", "PostgreSQL"], ["python", "Python"], ["apache", "Apache"]] },
  { id: "ai-genai", title: "AI & GenAI Solutions", description: "Explore practical uses for machine learning and generative AI, from integrating language models into applications to developing predictive analytics workflows.", skills: ["Machine learning", "Generative AI", "LLM integration", "Predictive analytics"], logos: [["tensorflow", "TensorFlow"], ["pytorch", "PyTorch"], ["python", "Python"]] },
  { id: "application-support", title: "Application Support & Security", description: "Keep applications maintained and help teams address issues, access requirements and secure development practices within an agreed support scope.", skills: ["Application maintenance", "Incident investigation", "IAM", "Secure SDLC", "Security testing"], logos: [["java", "Java"], ["python", "Python"], ["dotnetcore", ".NET"]] }
];

export default function TechnologiesPage() {
  usePageMeta({ title: "Our Expertise | Trinexora", path: "/our-expertise", description: "Explore Trinexora’s expertise across cloud, DevOps, enterprise applications, software engineering, QA, data and AI." });
  return (
    <div className="expertise-page">
      <header className="container expertise-intro"><span>Technology Skills. Business Focus.</span><h1>Our Expertise</h1><p>We bring together technology professionals and delivery capabilities across cloud, engineering, enterprise systems, data and AI to help you build, modernize and support your business applications.</p></header>
      {expertiseAreas.map((area, index) => <section className={`expertise-band${index % 2 ? " expertise-band-reverse" : ""}`} key={area.title} id={area.id} aria-labelledby={`expertise-title-${index}`}>
        <div className="container expertise-band-inner">
          <div className="expertise-brand-grid" aria-label={`${area.title} technologies`}>{area.logos.map(([file, name]) => <figure key={file}><img src={`/images/expertise/${file}.svg`} alt="" loading="lazy" /><figcaption>{name}</figcaption></figure>)}</div>
          <div className="expertise-band-copy"><h2 id={`expertise-title-${index}`}>{area.title}</h2><p>{area.description}</p><ul aria-label={`${area.title} skills`}>{area.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div>
        </div>
      </section>)}
      <section className="container expertise-enquiry"><div><h2>Find the Expertise Your Business Needs</h2><p>Tell us about your technology stack, project or hiring requirements.</p></div><Link className="button button-primary" to="/get-started">Share Your Requirement →</Link></section>
    </div>
  );
}
