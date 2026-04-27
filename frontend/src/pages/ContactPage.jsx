import ContactForm from "../components/ContactForm";
import SectionHeader from "../components/SectionHeader";

export default function ContactPage() {
  return (
    <section className="section page-intro contact-page">
      <div className="container contact-layout">
        <div className="contact-copy">
          <SectionHeader title="Why Companies Choose Trinexora" />
          <div className="contact-benefits">
            <p>
              <span aria-hidden="true">✓</span>
              Fast access to pre-vetted IT talent
            </p>
            <p>
              <span aria-hidden="true">✓</span>
              Proven delivery frameworks & accelerators
            </p>
            <p>
              <span aria-hidden="true">✓</span>
              Global expertise. Local accountability.
            </p>
            <p>
              <span aria-hidden="true">✓</span>
              24-Hour Response Guarantee
            </p>
            <p>
              <span aria-hidden="true">✓</span>
              Zero-Risk Engagement Model
            </p>
          </div>

          <div className="contact-info">
            <p>
              <span aria-hidden="true">✉</span>
              sales@trinexora.com
            </p>
            <p>
              <span aria-hidden="true">☏</span>
              6824070099
            </p>
            <p>
              <span className="contact-pin-icon" aria-hidden="true"></span>
              Serving clients across the globe with scalable technology solutions
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
