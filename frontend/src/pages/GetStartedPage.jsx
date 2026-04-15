import GetStartedForm from "../components/GetStartedForm";
import SectionHeader from "../components/SectionHeader";

export default function GetStartedPage() {
  return (
    <section className="section page-intro">
      <div className="container contact-layout">
        <div>
          <SectionHeader
            eyebrow="Get Started"
            title="Plan the right engagement for your timeline and team"
            text="Tell us if you need staffing, a managed delivery team, support services, or consulting. We'll recommend a practical next step."
          />

          <div className="highlight-panel compact">
            <h3>Typical outcomes</h3>
            <ul>
              <li>Shortlist of matching consultants</li>
              <li>Delivery approach and team recommendation</li>
              <li>Estimated onboarding timeline</li>
              <li>Next-step consultation with our team</li>
            </ul>
          </div>
        </div>

        <GetStartedForm />
      </div>
    </section>
  );
}
