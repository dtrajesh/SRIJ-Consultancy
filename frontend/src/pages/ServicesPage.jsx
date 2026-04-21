import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { services } from "../data/siteContent";

export default function ServicesPage() {
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

  return (
    <section className={`section page-intro${isPreviewOpen ? " services-preview-open" : ""}`}>
      <div className="container">
        <SectionHeader
          className="services-page-header"
          eyebrow="What We Do"
          title="Services built for speed, reliability, and accountable delivery"
          text="We provide flexible engagement models from individual specialists to fully managed teams ensuring seamless execution, transparent communication, and measurable outcomes."
        />

        <div className="card-grid">
          {services.map((service) => (
            <article key={service.title} className="content-card service-detail-card">
              <div className="service-detail-card-header">
                <span className="home-service-icon" aria-hidden="true">
                  {service.icon}
                </span>
                <h3>{service.title}</h3>
              </div>
              <p>{service.description}</p>
              {service.deliverables && (
                <div className="service-deliverables">
                  <strong>{service.deliverablesLabel || "What we deliver:"}</strong>
                  <ul>
                    {service.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {service.outcome && (
                <p className="service-outcome">
                  <span aria-hidden="true">👉</span> {service.outcomeLabel || "Outcome"}: {service.outcome}
                </p>
              )}
              <div
                className={`service-preview-trigger${
                  activePreviewTitle === service.title ? " service-preview-trigger-open" : ""
                }`}
                data-preview-title={service.title}
                data-preview-position={
                  service.title === "Talent Advisory & Workforce Strategy"
                    ? "up"
                    : "up-low"
                }
                onMouseEnter={handlePreviewOpen}
                onMouseLeave={handlePreviewLeave}
                onFocus={handlePreviewOpen}
                onBlur={handlePreviewBlur}
              >
                <Link to="/get-started">Explore Solution →</Link>
                <div className="service-preview-card" aria-hidden="true">
                  <div className="service-preview-window">
                    <span className="service-preview-close">×</span>
                    <h4>{service.title}</h4>
                    <p className="service-preview-summary">{service.description}</p>
                    <div className="service-preview-grid">
                      <div className="service-preview-panel">
                        <strong>{service.deliverablesLabel || "What we deliver:"}</strong>
                        <ul>
                          {(service.deliverables || [service.description]).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="service-preview-panel">
                        <strong>{service.outcomeLabel || "Outcome"}</strong>
                        <p>{service.outcome || "A focused solution aligned to your hiring and delivery goals."}</p>
                      </div>
                    </div>
                    <div className="service-preview-benefits">
                      <strong>✅ Key Benefits</strong>
                      {(service.deliverables || []).slice(0, 3).map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                      {service.deliverablesLabel && <span>Global reach</span>}
                    </div>
                    <div className="service-preview-actions">
                      <Link to="/careers">View Talent Pool</Link>
                      <Link to="/get-started">Request a Consultant →</Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="cta-inline services-cta-inline">
          <div>
            <h3>Selecting the right engagement model is critical to project success.</h3>
            <p>
              We provide expert consultation to align your delivery strategy with your
              business goals, timelines, and budget expectations.
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
