import ContactForm from "../components/ContactForm";
import SectionHeader from "../components/SectionHeader";

export default function ContactPage() {
  return (
    <section className="section page-intro">
      <div className="container contact-layout">
        <div>
          <SectionHeader
            eyebrow="Contact"
            title="Tell us what you're trying to build, fix, or scale"
            text="Share your hiring needs, delivery goals, or support requirements and our team will follow up."
          />

          <div className="contact-info">
            <p>Email: hello@srijtalent.com</p>
            <p>Phone: +1 (555) 240-9810</p>
            <p>Location: Serving clients across the United States</p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
