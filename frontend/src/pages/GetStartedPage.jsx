import { usePageMeta } from "../usePageMeta";
import ContactIcon from "../components/ContactIcon";
import GetStartedForm from "../components/GetStartedForm";
import SectionHeader from "../components/SectionHeader";

export default function GetStartedPage() {
  usePageMeta({
    title: "Get Started | Trinexora",
    path: "/get-started",
    description: "Share your hiring or project requirement and we will suggest the right way to work together."
  });
  return (
    <section className="section page-intro get-started-page">
      <div className="container contact-layout">
        <div className="get-started-copy">
          <SectionHeader as="h1"
            className="get-started-hero-header"
            title="Start Your Project With"
            titleAccent="Trinexora"
            text="Tell us what you need: hiring, a development project, or testing support. We’ll suggest the right way to work together and reply within one business day."
          />

          <div className="highlight-panel compact">
            <h2>What happens next</h2>
            <ul>
              <li>Shortlist of matching candidates</li>
              <li>Delivery approach and team recommendation</li>
              <li>Clear scope, timeline and cost estimate</li>
              <li>We respond to every enquiry within one business day.</li>
              <li>A short call to confirm your requirements</li>
            </ul>
            <div className="get-started-contact">
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
            </div>
          </div>
        </div>

        <GetStartedForm />
      </div>
    </section>
  );
}
