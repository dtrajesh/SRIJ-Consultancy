import { usePageMeta } from "../usePageMeta";
import ServiceIcon from "../components/ServiceIcon";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { services } from "../data/siteContent";

const talentAcquisitionTitles = new Set([
  "Hiring Consultation",
  "Niche & Specialist Hiring",
  "Talent Sourcing"
]);

const teamDeliveryTitles = new Set([
  "Dedicated Project Teams",
  "Cloud & Digital Transformation Talent Pods",
  "Managed Recruitment Services (RPO Model)"
]);

const flexibleHiringTitles = new Set([
  "Contract-to-Hire Solutions",
  "Urgent Requirements"
]);

const talentAcquisitionTitleLabels = {
  "Niche & Specialist Hiring": "Niche & Specialist Hiring"
};

const teamDeliveryTitleLabels = {
  "Cloud & Digital Transformation Talent Pods": "Cloud, DevOps & Data Support",
  "Managed Recruitment Services (RPO Model)": "Recruitment Support"
};

const technologyDeliveryServices = [
  {
    title: "Project-Based Delivery",
    description: "Scope, build, test and deliver a technology project against agreed requirements.",
    deliverables: ["Discovery, scope and delivery milestones", "Build, testing and handover", "Fixed-price or time-and-material options, agreed up front"]
  },
  {
    title: "QA & Performance Testing Services",
    description: "Dedicated testing support to assess software quality and application behaviour under load.",
    deliverables: ["Functional, regression and API testing", "Test automation for agreed scenarios", "Load and performance testing with findings and recommendations"]
  },
  {
    title: "Application Support",
    description: "Maintain and enhance your applications during agreed support hours.",
    deliverables: ["Issue investigation and maintenance", "Scoped enhancements and release support", "Support hours, priorities and response expectations agreed in advance"]
  }
];

export default function ServicesPage() {
  usePageMeta({
    title: "IT Staffing & Technology Services | Trinexora",
    path: "/services",
    description: "Contract and permanent IT hiring, software development, and QA and performance testing for companies across India."
  });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activePreviewTitle, setActivePreviewTitle] = useState(null);
  const hoverLockUntilRef = useRef(0);

  const handlePreviewOpen = (event) => {
    const trigger = event.currentTarget;
    const previewTitle = trigger.dataset.previewTitle;
    const now = Date.now();

    if (activePreviewTitle && activePreviewTitle !== previewTitle && now < hoverLockUntilRef.current) {
      return;
    }

    setIsPreviewOpen(true);
    setActivePreviewTitle(previewTitle);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const preview = trigger.querySelector(".service-preview-card");
        if (!preview) {
          return;
        }
        if (trigger.dataset.previewPosition?.startsWith("up")) {
          preview.classList.remove("service-preview-card-flip");
          return;
        }

        const previewBounds = preview.getBoundingClientRect();
        const viewportBottom = window.innerHeight - 48;
        const viewportRight = window.innerWidth - 24;
        const headerHeight = document.querySelector(".site-header")?.offsetHeight ?? 0;
        const desiredTop = headerHeight + 96;

        if (previewBounds.right > viewportRight) {
          preview.classList.add("service-preview-card-flip");
        } else {
          preview.classList.remove("service-preview-card-flip");
        }

        if (previewBounds.bottom > viewportBottom) {
          hoverLockUntilRef.current = Date.now() + 900;
          const overflow = previewBounds.bottom - viewportBottom + 32;
          const maxScrollBeforeTopGetsTooHigh = Math.max(previewBounds.top - desiredTop, 0);
          window.scrollBy({
            top: Math.min(overflow, maxScrollBeforeTopGetsTooHigh || overflow),
            behavior: "smooth"
          });
        } else if (previewBounds.top < desiredTop) {
          hoverLockUntilRef.current = Date.now() + 900;
          window.scrollBy({
            top: previewBounds.top - desiredTop,
            behavior: "smooth"
          });
        }
      });
    });
  };

  const handlePreviewBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      hoverLockUntilRef.current = 0;
      setIsPreviewOpen(false);
      setActivePreviewTitle(null);
    }
  };

  const handlePreviewLeave = (event) => {
    if (Date.now() < hoverLockUntilRef.current) {
      return;
    }

    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsPreviewOpen(false);
      setActivePreviewTitle(null);
    }
  };

  const talentAcquisitionModels = services.filter((service) =>
    talentAcquisitionTitles.has(service.title)
  );
  const teamDeliveryModels = services.filter((service) => teamDeliveryTitles.has(service.title));
  const flexibleHiringModels = services.filter((service) =>
    flexibleHiringTitles.has(service.title)
  );
  const deliveryServices = services.filter(
    (service) =>
      !talentAcquisitionTitles.has(service.title) &&
      !teamDeliveryTitles.has(service.title) &&
      !flexibleHiringTitles.has(service.title)
  );

  const renderServiceCard = (service, options = {}) => {
    const title = options.title || service.tileTitle || service.title;
    const cardDescription = service.tileDescription || service.description;
    const cardDeliverables = service.tileDeliverables || service.deliverables;
    const cardDeliverablesLabel = service.tileDeliverablesLabel || service.deliverablesLabel || "What we deliver:";
    const cardOutcome = service.tileOutcome || service.outcome;
    const previewTitle = service.previewTitle || title;
    const previewSubtitle = service.previewSubtitle;
    const previewDescription = service.previewDescription || service.description;
    const previewDeliverables = service.previewDeliverables || service.deliverables || [previewDescription];
    const previewDeliverablesLabel =
      service.previewDeliverablesLabel || service.deliverablesLabel || "What we deliver:";
    const previewIdealFor = service.previewIdealFor;
    const previewIdealForLabel = service.previewIdealForLabel || "Ideal For";
    const previewOutcomes = service.previewOutcomes || (service.outcome ? [service.outcome] : []);
    const previewOutcomeLabel = service.previewOutcomeLabel || service.outcomeLabel || "Outcome";

    return (
      <article
        key={service.title}
        className={`content-card service-detail-card${options.isModel ? " talent-model-card" : ""}`}
      >
        <div className="service-detail-card-header">
          <ServiceIcon title={title} />
          <h3>{title}</h3>
        </div>
        <p>{cardDescription}</p>
        {cardDeliverables && (
          <div className="service-deliverables">
            <strong>{cardDeliverablesLabel}</strong>
            <ul className={service.tileDeliverables ? "service-check-list" : undefined}>
              {cardDeliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {cardOutcome && (
          <p className="service-outcome">
            <span className="service-outcome-icon" aria-hidden="true">👉</span>
            <span className="service-outcome-copy"><strong>Outcome:</strong> {cardOutcome}</span>
          </p>
        )}
        <div
          className={`service-preview-trigger${
            activePreviewTitle === service.title ? " service-preview-trigger-open" : ""
          }`}
          data-preview-title={service.title}
          data-preview-position={service.title === "Hiring Consultation" ? "up" : "up-low"}
          onMouseEnter={handlePreviewOpen}
          onMouseLeave={handlePreviewLeave}
          onFocus={handlePreviewOpen}
          onBlur={handlePreviewBlur}
        >
          <Link to="/get-started">Explore Solution →</Link>
          <div
            className={`service-preview-card${
              service.previewLayout === "vertical" ? " service-preview-card-vertical" : ""
            }`}
            aria-hidden="true"
          >
            <div className="service-preview-window">
              <span className="service-preview-close">×</span>
              <h4>{previewTitle}</h4>
              {previewSubtitle && <p className="service-preview-subtitle">{previewSubtitle}</p>}
              <p className="service-preview-summary">{previewDescription}</p>
              <div className="service-preview-grid">
                <div className="service-preview-panel">
                  <strong>{previewDeliverablesLabel}</strong>
                  <ul>
                    {previewDeliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                {previewIdealFor && (
                  <div className="service-preview-panel">
                    <strong>{previewIdealForLabel}</strong>
                    <ul>
                      {previewIdealFor.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="service-preview-panel">
                  <strong>{previewOutcomeLabel}</strong>
                  {previewOutcomes.length > 1 ? (
                    <ul className="service-preview-outcomes">
                      {previewOutcomes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{previewOutcomes[0] || "A focused solution aligned to your hiring and delivery goals."}</p>
                  )}
                </div>
              </div>
              {!service.previewHideBenefits && (
                <div className="service-preview-benefits">
                  <strong>Key Benefits</strong>
                  {(service.deliverables || []).slice(0, 3).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                  {service.deliverablesLabel && <span>Global reach</span>}
                </div>
              )}
              <div className="service-preview-actions">
                <Link to="/contact">{service.previewPrimaryCta || "View Talent Pool"}</Link>
                <Link to="/get-started">{service.previewSecondaryCta || "Request a Consultant →"}</Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section className={`section page-intro${isPreviewOpen ? " services-preview-open" : ""}`}>
      <div className="container">
        <SectionHeader as="h1"
          className="services-page-header"
          title="Staffing and Delivery Models"
          titleAccent="That Fit Your Needs"
          text="Hire individual specialists, build a dedicated team, or have us deliver a project. Choose the model that suits your timeline and budget."
        />

        <div className="service-models-section">
          <h2>Talent Acquisition Models</h2>
          <div className="card-grid three-up talent-model-grid">
            {talentAcquisitionModels.map((service) =>
              renderServiceCard(service, {
                isModel: true,
                title: talentAcquisitionTitleLabels[service.title] || service.title
              })
            )}
          </div>
        </div>

        <div className="service-models-section">
          <h2>Team-Based Delivery Models</h2>
          <div className="card-grid three-up talent-model-grid">
            {teamDeliveryModels.map((service) =>
              renderServiceCard(service, {
                isModel: true,
                title: teamDeliveryTitleLabels[service.title] || service.title
              })
            )}
          </div>
        </div>

        <div className="service-models-section">
          <h2>Flexible Hiring Models</h2>
          <div className="card-grid flexible-hiring-grid talent-model-grid">
            {flexibleHiringModels.map((service) =>
              renderServiceCard(service, {
                isModel: true
              })
            )}
          </div>
        </div>

        <div className="card-grid">
          {deliveryServices.map((service) => renderServiceCard(service))}
        </div>

        <section className="service-models-section" aria-labelledby="technology-delivery-title">
          <h2 id="technology-delivery-title">Technology Delivery</h2>
          <div className="card-grid three-up talent-model-grid">
            {technologyDeliveryServices.map((service) => (
              <article className="content-card service-detail-card talent-model-card" key={service.title}>
                <div className="service-detail-card-header"><ServiceIcon title={service.title} /><h3>{service.title}</h3></div>
                <p>{service.description}</p>
                <div className="service-deliverables">
                  <strong>What we deliver:</strong>
                  <ul className="service-check-list">{service.deliverables.map(item => <li key={item}>✔ {item}</li>)}</ul>
                </div>
                <Link to="/get-started">Explore Solution →</Link>
              </article>
            ))}
          </div>
        </section>

        <div className="cta-inline services-cta-inline">
          <div>
            <h3>Not sure which model fits?</h3>
            <p>
              Tell us your requirement and we’ll recommend the right approach, with no obligation.
            </p>
          </div>
          <Link className="button button-primary" to="/get-started">
            Talk to Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}
