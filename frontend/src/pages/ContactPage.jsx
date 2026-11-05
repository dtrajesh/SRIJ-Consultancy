import { siteConfig } from "../config/siteConfig";
import { usePageMeta } from "../usePageMeta";
import { Link } from "react-router-dom";
import ContactIcon from "../components/ContactIcon";
import ContactForm from "../components/ContactForm";
import SectionHeader from "../components/SectionHeader";

export default function ContactPage() {
  usePageMeta({
    title: "Contact Trinexora | Hyderabad",
    path: "/contact",
    description: `Tell us about your hiring or project requirement. Call ${siteConfig.phone} or email ${siteConfig.email}.`
  });
  return (
    <section className="section page-intro contact-page">
      <div className="container contact-layout">
        <div className="contact-copy">
          <SectionHeader as="h1" title="Why Companies Choose" titleAccent="Trinexora" />
          <div className="contact-benefits">
            <p>
              <span aria-hidden="true">✓</span>
              Access to screened IT professionals
            </p>
            <p>
              <span aria-hidden="true">✓</span>
              A clear, structured hiring process.
            </p>
            <p>
              <span aria-hidden="true">✓</span>
              Local expertise. Direct accountability.
            </p>
            <p>
              <span aria-hidden="true">✓</span>
              We respond to every enquiry within one business day.
            </p>
            <p>
              <span aria-hidden="true">✓</span>
              Replacement support as per agreement.
            </p>
            <p>
              <span aria-hidden="true">✓</span>
              Hiring, project delivery and testing support from one team.
            </p>
          </div>

          <div className="contact-info">
            <p>
              <ContactIcon type="email" />
              <a href="mailto:sales@trinexora.com">sales@trinexora.com</a>
            </p>
            <p>
              <ContactIcon type="phone" />
              <a href="tel:+918522857333">+91-8522857333</a>
            </p>
            <p>
              <ContactIcon type="location" />
              Hyderabad-based. Serving clients across India.
            </p>
            <p>
              <ContactIcon type="hours" />
              Mon–Sat, 9:30 AM–6:30 PM IST
            </p>
            <p>
              <ContactIcon type="chat" />
              <a href="https://wa.me/918522857333" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
            </p>
            <p className="contact-careers-link"><Link to="/careers">Looking for a job? Visit Careers →</Link></p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
