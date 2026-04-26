import ContactForm from "../components/ContactForm";
import SectionHeader from "../components/SectionHeader";

export default function ContactPage() {
  return (
    <section className="section page-intro contact-page">
      <div className="container contact-layout">
        <div className="contact-copy">
          <SectionHeader
            title="Get in Touch With Our Experts"
            text="Reach out to partner with Trinexora to tackle your IT challenges and accelerate your business success."
          />

          <div className="contact-info">
            <p>
              <span aria-hidden="true">✉</span>
              hello@trinexora.com
            </p>
            <p>
              <span aria-hidden="true">☏</span>
              +1 (555) 240-9810
            </p>
            <p>
              <span className="contact-pin-icon" aria-hidden="true"></span>
              Serving clients across the United States
            </p>
          </div>

          <div className="contact-benefits">
            <p>
              <span aria-hidden="true">✓</span>
              Get expert guidance for your IT initiatives
            </p>
            <p>
              <span aria-hidden="true">✓</span>
              Scale faster with reusable delivery assets
            </p>
            <p>
              <span aria-hidden="true">✓</span>
              Access top tech talent & cutting-edge solutions
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
