import GetStartedForm from "../components/GetStartedForm";
import SectionHeader from "../components/SectionHeader";

export default function GetStartedPage() {
  return (
    <section className="section page-intro get-started-page">
      <div className="container contact-layout">
        <div className="get-started-copy">
          <SectionHeader
            eyebrow="Get Started"
            title="Start Your IT Transformation With Trinexora"
            text="Tell us your goals — we'll design the right engagement model for your timeline and team. Whether you need staffing, managed delivery, or consulting — we'll guide you to the best fit."
          />

          <div className="highlight-panel compact">
            <h3>Typical outcomes</h3>
            <ul>
              <li>Shortlist of matching consultants</li>
              <li>Delivery approach and team recommendation</li>
              <li>Global expertise. Local accountability.</li>
              <li>24-Hour Response Guarantee</li>
              <li>Next-step consultation with our team</li>
            </ul>
            <div className="get-started-contact">
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
        </div>

        <GetStartedForm />
      </div>
    </section>
  );
}
