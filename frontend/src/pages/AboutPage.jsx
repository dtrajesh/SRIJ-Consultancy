import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";

export default function AboutPage() {
  return (
    <>
      <section className="section page-intro">
        <div className="container about-grid">
          <div>
            <SectionHeader
              eyebrow="About Us"
              title="A consultancy built around responsiveness, accountability, and long-term client trust"
              text="Trinexora partners with businesses that need technical capability without the hiring delay or delivery uncertainty."
            />

            <div className="content-copy">
              <p>
                We combine staffing support with managed execution so clients can choose the
                model that best fits their constraints. Our approach favors clear ownership,
                fast communication, and practical delivery planning.
              </p>
              <p>
                Across cloud, data, QA, support, and application delivery, we focus on
                helping clients build momentum without compromising reliability.
              </p>
            </div>
          </div>

          <aside className="highlight-panel">
            <h3>Why clients choose Trinexora</h3>
            <ul>
              <li>Fast consultant onboarding and team ramp-up</li>
              <li>Clear engagement structure and reporting cadence</li>
              <li>Technical breadth across delivery and support functions</li>
              <li>Flexible support from staffing through managed execution</li>
            </ul>
            <Link className="button button-primary" to="/get-started">
              Request a Consultation
            </Link>
          </aside>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container card-grid three-up">
          <article className="content-card">
            <span className="eyebrow">Mission</span>
            <h3>Deliver dependable technology capability with speed and clarity</h3>
            <p>
              Our mission is to help clients solve delivery, staffing, and transformation
              challenges through accountable teams, practical execution, and outcomes that
              create measurable business momentum.
            </p>
          </article>

          <article className="content-card">
            <span className="eyebrow">Vision</span>
            <h3>Become a trusted long-term partner for modern technology growth</h3>
            <p>
              Our vision is to build Trinexora into a go-to consulting and delivery partner
              for organizations scaling across AI, data, cloud, applications, and managed
              operations.
            </p>
          </article>

          <article className="content-card">
            <span className="eyebrow">Approach</span>
            <h3>Flexible support across staffing, delivery, and transformation</h3>
            <p>
              We work with clients through the model that fits best, from individual talent
              placement to managed project execution, while keeping communication direct,
              transparent, and execution-focused.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
