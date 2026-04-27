import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import leadershipHeadshot from "../assets/leadership-headshot.png";
import trinexoraLogo from "../assets/trinexora-logo-transparent.png";
import accessTopTalentIcon from "../assets/what-you-gain/access-top-talent.png";
import fasterTeamScalingIcon from "../assets/what-you-gain/faster-team-scaling.png";
import flexibleWorkforceIcon from "../assets/what-you-gain/flexible-workforce.png";
import improvedDeliveryIcon from "../assets/what-you-gain/improved-delivery.png";
import reducedHiringEffortIcon from "../assets/what-you-gain/reduced-hiring-effort.png";
import reliablePartnershipIcon from "../assets/what-you-gain/reliable-partnership.png";
import joinTeamBanner from "../assets/join-team-banner.png";

function CoreValueIcon({ type }) {
  const commonProps = {
    className: "core-value-svg",
    viewBox: "0 0 96 96",
    role: "img",
    "aria-hidden": "true"
  };

  if (type === "target") {
    return (
      <svg {...commonProps}>
        <circle cx="48" cy="48" r="10" />
        <path d="M48 10v22M48 64v22M10 48h22M64 48h22" />
        <path d="M21 37a30 30 0 0 1 16-16M59 21a30 30 0 0 1 16 16M75 59a30 30 0 0 1-16 16M37 75a30 30 0 0 1-16-16" />
        <path d="M31 48h8M57 48h8M48 31v8M48 57v8" />
      </svg>
    );
  }

  if (type === "handshake") {
    return (
      <svg {...commonProps}>
        <path d="M18 23l18 8-10 24-18-8z" />
        <path d="M78 23l-18 8 10 24 18-8z" />
        <path d="M32 40l11-8 10 1 12 11" />
        <path d="M30 51l9 8c3 3 8 3 11 0l17-16" />
        <path d="M39 59l7 6M46 57l8 7M53 53l8 7" />
        <path d="M41 33l-8 8M63 33l8 9" />
      </svg>
    );
  }

  if (type === "speed") {
    return (
      <svg {...commonProps}>
        <path className="core-value-fill" d="M51 8 27 50h19l-8 38 32-48H50z" />
        <path d="M13 37h19M8 48h18M18 59h12" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg {...commonProps}>
        <path d="M48 12 78 23v24c0 20-13 33-30 41-17-8-30-21-30-41V23z" />
        <path d="M34 49l10 10 20-22" />
      </svg>
    );
  }

  if (type === "compass") {
    return (
      <svg {...commonProps}>
        <circle cx="48" cy="48" r="29" />
        <path d="M48 9v11M48 76v11M9 48h11M76 48h11" />
        <path d="M60 30 52 58 24 66l20-20z" />
        <circle cx="48" cy="48" r="5" />
        <path d="M28 28l6 6M68 28l-6 6M68 68l-6-6M28 68l6-6" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path className="core-value-fill" d="M61 10c-14 3-25 12-32 26l-14 1 12 11-5 18 18-6 12 12 1-15c14-7 23-18 26-32 2-8-1-16-1-16s-8-1-17 1z" />
      <circle className="core-value-cutout" cx="61" cy="29" r="7" />
      <path d="M28 61 13 76l5-20M42 75l-18 8 15-15" />
      <path d="M27 48 14 49M47 68l-1 14" />
    </svg>
  );
}

function WhyChooseIcon({ type }) {
  const commonProps = {
    className: "why-choose-icon-svg",
    viewBox: "0 0 96 96",
    role: "img",
    "aria-hidden": "true"
  };

  if (type === "talent") {
    return (
      <svg {...commonProps}>
        <circle cx="32" cy="29" r="7" />
        <circle cx="64" cy="29" r="7" />
        <circle cx="48" cy="40" r="9" />
        <path d="M19 59v-7c0-9 7-15 16-15M77 59v-7c0-9-7-15-16-15" />
        <path d="M29 64v-7c0-10 8-17 19-17s19 7 19 17v7" />
        <circle className="why-choose-fill" cx="61" cy="64" r="15" />
        <path className="why-choose-check" d="M53 64l6 6 11-13" />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg {...commonProps}>
        <path d="M16 38h24M10 48h24M18 58h22" />
        <circle cx="58" cy="48" r="29" />
        <path d="M58 30v19l13 10" />
      </svg>
    );
  }

  if (type === "puzzle") {
    return (
      <svg {...commonProps}>
        <path d="M24 25h22v12c0 3 3 5 6 3 3-2 6-2 9 0s3 7 0 9-6 2-9 0c-3-2-6 0-6 3v19H24V50h10c3 0 5-3 3-6-2-3-2-6 0-9s7-3 9 0c2 3 0 6 0 6" />
        <path d="M46 25h26v22M46 71h26V49" />
      </svg>
    );
  }

  if (type === "chip") {
    return (
      <svg {...commonProps}>
        <rect x="25" y="25" width="46" height="46" rx="4" />
        <path d="M36 48l8-8M36 48l8 8M60 40l-8 16" />
        <path d="M18 33h7M18 43h7M18 53h7M18 63h7M71 33h7M71 43h7M71 53h7M71 63h7M33 18v7M43 18v7M53 18v7M63 18v7M33 71v7M43 71v7M53 71v7M63 71v7" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg {...commonProps}>
        <path d="M48 14 74 24v21c0 19-11 31-26 38-15-7-26-19-26-38V24z" />
        <path d="M36 48l9 9 17-19" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <circle cx="45" cy="52" r="26" />
      <circle cx="45" cy="52" r="14" />
      <circle className="why-choose-fill" cx="45" cy="52" r="5" />
      <path d="M51 46 75 22M67 24l10-4-4 10M69 32l9-3" />
    </svg>
  );
}

function GainIcon({ type }) {
  const commonProps = {
    className: "gain-icon-svg",
    viewBox: "0 0 120 86",
    role: "img",
    "aria-hidden": "true"
  };

  if (type === "talent") {
    return (
      <svg {...commonProps}>
        <path className="gain-cloud" d="M15 54h90c6 0 10-4 10-9s-4-9-10-9h-5c-2-10-11-18-22-18-8 0-15 4-19 10-3-3-8-5-13-5-10 0-18 7-19 17h-8c-6 0-11 4-11 10 0 2 3 4 7 4z" />
        <path className="gain-gold" d="M55 11c8 0 13 6 13 14s-5 17-13 17-13-9-13-17 5-14 13-14z" />
        <path className="gain-gold-dark" d="M35 72c3-18 11-29 20-29s17 11 20 29z" />
        <rect className="gain-navy" x="65" y="46" width="31" height="20" rx="2" />
        <circle className="gain-muted" cx="79" cy="56" r="3" />
        <path className="gain-teal" d="M24 51h13v13H24zM31 44v27M19 57h23M86 26h11v11H86zM92 20v23M80 31h23" />
      </svg>
    );
  }

  if (type === "scale") {
    return (
      <svg {...commonProps}>
        <path className="gain-cloud" d="M15 59h92c5 0 9-4 9-9s-4-9-9-9h-10c-3-12-14-20-27-20-9 0-17 4-22 11-4-4-9-6-15-6-11 0-20 8-21 19h-1c-5 0-9 3-9 7s5 7 13 7z" />
        <circle className="gain-blue" cx="45" cy="42" r="9" />
        <circle className="gain-teal-fill" cx="62" cy="35" r="11" />
        <circle className="gain-blue" cx="82" cy="39" r="10" />
        <path className="gain-blue" d="M31 64c2-13 7-19 14-19s12 6 14 19zM70 64c2-13 7-19 14-19s12 6 14 19z" />
        <path className="gain-teal-fill" d="M45 66c2-18 8-27 17-27s15 9 17 27z" />
        <path className="gain-gold-stroke" d="M36 23c21-3 38-10 54-21" />
        <path className="gain-gold-fill" d="M91 2l-5 15 17-10z" />
      </svg>
    );
  }

  if (type === "effort") {
    return (
      <svg {...commonProps}>
        <path className="gain-cloud" d="M17 58h90c6 0 10-4 10-9s-4-9-10-9h-5c-3-13-14-22-28-22-9 0-17 4-22 11-4-4-9-6-15-6-11 0-20 8-21 19h-1c-5 0-9 3-9 7s4 9 11 9z" />
        <path className="gain-paper" d="M55 7h26l13 13v42H55z" />
        <path className="gain-muted-stroke" d="M81 7v14h13M64 29h19M64 39h24M64 49h18" />
        <rect className="gain-blue-light" x="38" y="32" width="20" height="19" rx="2" />
        <path className="gain-blue-stroke" d="M43 41l4 4 8-9" />
        <circle className="gain-teal-fill" cx="90" cy="48" r="16" />
        <path className="gain-white-stroke" d="M81 48l7 7 15-18" />
      </svg>
    );
  }

  if (type === "flexible") {
    return (
      <svg {...commonProps}>
        <path className="gain-cloud" d="M19 58h86c6 0 10-4 10-9s-4-9-10-9h-8c-3-11-13-19-25-19-8 0-16 4-20 10-4-4-9-6-15-6-10 0-18 7-20 17h-3c-5 0-9 3-9 8s5 8 14 8z" />
        <circle className="gain-teal-fill" cx="57" cy="22" r="11" />
        <circle className="gain-teal-fill" cx="83" cy="26" r="9" />
        <path className="gain-teal-fill" d="M39 58c2-18 8-27 18-27s16 9 18 27zM75 58c1-12 5-18 11-18s10 6 12 18z" />
        <rect className="gain-navy" x="24" y="46" width="28" height="17" rx="2" />
        <rect className="gain-navy" x="74" y="46" width="28" height="17" rx="2" />
        <circle className="gain-muted" cx="38" cy="55" r="2.4" />
        <circle className="gain-muted" cx="88" cy="55" r="2.4" />
      </svg>
    );
  }

  if (type === "delivery") {
    return (
      <svg {...commonProps}>
        <path className="gain-cloud" d="M17 58h88c7 0 11-4 11-9s-4-9-11-9h-7c-3-12-14-20-27-20-8 0-16 4-21 10-4-3-9-5-14-5-10 0-18 7-20 17h-1c-6 0-10 3-10 8s5 8 12 8z" />
        <path className="gain-paper" d="M48 16h35v46H48z" />
        <path className="gain-gold-stroke" d="M58 16v-6h15v6" />
        <path className="gain-blue-stroke" d="M57 29h15v12H57zM57 47h15v12H57zM61 35l3 3 6-7M61 53l3 3 6-7" />
        <circle className="gain-gold-fill" cx="88" cy="55" r="15" />
        <path className="gain-white-stroke" d="M80 54l6 6 13-17" />
        <path className="gain-muted-stroke" d="M29 42h17M25 50h21M31 58h15" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path className="gain-blue-fill" d="M17 22h33v28H17zM70 22h33v28H70z" />
      <path className="gain-blue" d="M50 33c8 4 14 4 22 0l-7 19c-5 3-11 3-16 0z" />
      <path className="gain-white-stroke" d="M30 50l14 13M89 50L75 63M44 63l10 9M75 63l-10 9" />
      <path className="gain-blue-stroke" d="M46 36c5-6 10-9 17-3 4 3 9 3 14 1" />
      <path className="gain-teal" d="M43 55l7-9 16 13" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="section about-section page-intro" id="overview">
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

          <aside className="hero-card about-snapshot-card">
            <p>Delivery Excellence Snapshot</p>
            <ul>
              <li><span className="hero-marker hero-marker-check">✓</span>Access to highly qualified consultants with domain expertise</li>
              <li><span className="hero-marker hero-marker-spark">⚡</span>Rapid onboarding with minimal ramp-up time</li>
              <li><span className="hero-marker hero-marker-scale">👥</span>Scalable teams for product, cloud, and QA delivery</li>
              <li><span className="hero-marker hero-marker-secure">🔒</span>Proven frameworks for reliable and secure operations</li>
              <li><span className="hero-marker hero-marker-track">📈</span>Transparent communication and progress tracking</li>
              <li><span className="hero-marker hero-marker-support">🤝</span>Dedicated account management and delivery oversight</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section about-section who-we-are-section" id="who-we-are">
        <div className="container who-we-are-grid">
          <div className="who-we-are-heading">
            <h2>Who We Are?</h2>
          </div>

          <div className="who-we-are-copy">
            <p>
              At Trinexora IT Services, we stand at the intersection of talent,
              technology, and business transformation empowering organizations to scale
              faster with the right people at the right time. We are not just a
              staffing provider; we are strategic workforce partners committed to
              solving complex hiring challenges with precision, speed, and insight.
            </p>

            <p>
              Our expertise lies in delivering highly skilled, pre-vetted professionals
              across software engineering, quality assurance, cloud, data, and product
              delivery ensuring our clients can execute critical initiatives without
              compromise. Whether it is rapid team augmentation, niche skill hiring, or
              building dedicated offshore capabilities, we bring a solution-oriented
              approach tailored to your business goals.
            </p>

            <p>
              What sets us apart is our intelligent talent curation model, a
              structured, quality-driven process backed by deep domain expertise and
              rigorous screening standards. This enables us to consistently deliver
              candidates who are not only technically proficient but also aligned with
              your culture, timelines, and delivery expectations.
            </p>

            <p>
              Our growth is fueled by trust and results. Organizations rely on us for
              our agility, transparency, and commitment to outcomes, reflected in
              long-term partnerships and repeat engagements. We believe that great
              businesses are built by great people, and our mission is to connect you
              with talent that drives measurable impact.
            </p>

            <p>
              At our core, we remain technology-agnostic and client-focused, ensuring
              unbiased recommendations and flexible engagement models that optimize
              cost, scalability, and performance. From startups to enterprises, we
              enable teams to adapt, innovate, and thrive in an ever-evolving digital
              landscape.
            </p>

            <p>
              Innovation continues to shape our journey. By leveraging data-driven
              insights and modern recruitment technologies, we continuously refine how
              talent is sourced, assessed, and deployed, bringing intelligence and
              efficiency into every hiring decision.
            </p>

            <p>
              With Trinexora IT Services, you gain more than a vendor, you gain a
              dependable partner dedicated to building high performing teams and
              delivering sustainable business success.
            </p>
          </div>
        </div>
      </section>

      <section className="section about-section section-muted mission-vision-tiles-section" id="mission-vision">
        <div className="container card-grid three-up mission-vision-tiles">
          <article className="content-card">
            <span className="eyebrow">Our Mission</span>
            <h3>Deliver dependable technology capability with speed and clarity</h3>
            <p>
              Our mission is to bridge the gap between ambition and execution by delivering
              the right talent at the right time. At Trinexora IT Services, we help
              businesses scale confidently by providing high-quality, vetted professionals
              who accelerate delivery, reduce risk, and create measurable impact.
            </p>
          </article>

          <article className="content-card">
            <span className="eyebrow">Our Vision</span>
            <h3>Become a trusted long-term partner for modern technology growth</h3>
            <p>
              Our vision is to redefine workforce solutions by becoming the preferred
              global partner for delivering niche, high-impact talent that accelerates
              innovation, strengthens delivery capabilities, and drives sustainable
              business growth.
            </p>
          </article>

          <article className="content-card">
            <span className="eyebrow">Our Approach</span>
            <h3>Flexible support across staffing, delivery, and transformation</h3>
            <p>
              We adapt to your delivery needs whether you need a single expert, a dedicated
              team, or end-to-end project ownership. Every engagement is structured for
              speed, transparency, and outcome-focused delivery with continuous
              collaboration.
            </p>
          </article>
        </div>
      </section>

      <section className="section about-section core-values-section" id="core-values">
        <div className="container core-values-wrap">
          <div className="core-values-header">
            <h2>Our Core Values</h2>
            <p>
              At Trinexora IT Services, our values define how we work, how we
              engage, and how we deliver impact for our clients and talent.
            </p>
          </div>

          <div className="core-values-grid">
            <article className="core-value-card">
              <CoreValueIcon type="target" />
              <h3>Precision Talent</h3>
              <p>Delivering top-tier professionals with exact skills and expertise.</p>
            </article>

            <article className="core-value-card">
              <CoreValueIcon type="handshake" />
              <h3>Client-First Thinking</h3>
              <p>Aligning with your goals to ensure impactful outcomes.</p>
            </article>

            <article className="core-value-card">
              <CoreValueIcon type="speed" />
              <h3>Speed &amp; Agility</h3>
              <p>Responding swiftly with quality, scalable solutions.</p>
            </article>

            <article className="core-value-card">
              <CoreValueIcon type="shield" />
              <h3>Trust &amp; Transparency</h3>
              <p>Building relationships on honesty and clarity.</p>
            </article>

            <article className="core-value-card">
              <CoreValueIcon type="compass" />
              <h3>Ownership Mindset</h3>
              <p>Taking responsibility and driving success.</p>
            </article>

            <article className="core-value-card">
              <CoreValueIcon type="rocket" />
              <h3>Continuous Evolution</h3>
              <p>Innovating and adapting to the future of work.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section about-section leadership-section" id="leadership">
        <div className="container">
          <div className="leadership-intro">
            <h2>Board of Directors, Leadership Team &amp; Advisory Board</h2>
            <div className="leadership-copy">
              <p>
                Trinexora is guided by a strong leadership team comprising experienced
                professionals from the IT staffing, talent solutions, and technology
                consulting space. With deep industry expertise across engineering,
                cloud, data, QA, and digital transformation domains, our leaders bring
                a practical, execution-focused approach to workforce and delivery
                solutions.
              </p>
              <p>
                Collectively, they combine decades of experience in building
                high-performing teams, scaling technology talent delivery, and
                partnering with global clients to meet evolving business and hiring
                needs.
              </p>
            </div>
          </div>

          <div className="leadership-grid">
            <article className="leader-card">
              <img className="leader-avatar" src={leadershipHeadshot} alt="Janaki" />
              <h3>Janaki</h3>
              <span className="leader-position">Director &amp; Investor</span>
              <div className="leader-socials" aria-label="Leadership profile links">
                <a href="https://www.linkedin.com" aria-label="LinkedIn profile">in</a>
                <a href="https://x.com" aria-label="X profile">X</a>
              </div>
            </article>

            <article className="leader-card">
              <img className="leader-avatar" src={leadershipHeadshot} alt="ASHOK" />
              <h3>ASHOK</h3>
              <span className="leader-position">Founding Partner &amp; CEO</span>
              <div className="leader-socials" aria-label="Leadership profile links">
                <a href="https://www.linkedin.com" aria-label="LinkedIn profile">in</a>
                <a href="https://x.com" aria-label="X profile">X</a>
              </div>
            </article>

            <article className="leader-card">
              <img className="leader-avatar" src={leadershipHeadshot} alt="BABU" />
              <h3>BABU</h3>
              <span className="leader-position">Advisor</span>
              <div className="leader-socials" aria-label="Leadership profile links">
                <a href="https://www.linkedin.com" aria-label="LinkedIn profile">in</a>
                <a href="https://x.com" aria-label="X profile">X</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section about-section why-choose-section" id="why-choose-us">
        <div className="container why-choose-wrap">
          <div className="why-choose-header">
            <span>Why Choose Us</span>
            <h2>
              Why To Choose <strong>Trinexora?</strong>
            </h2>
            <p>
              We deliver the right talent, at the right time, to help you build
              high-performing teams and drive business success.
            </p>
          </div>

          <div className="why-choose-grid">
            <article className="why-choose-card">
              <WhyChooseIcon type="talent" />
              <h3>Pre-Vetted, High-Quality Talent</h3>
              <p>
                We provide thoroughly screened IT professionals across technologies
                and domains, ensuring the right fit from day one.
              </p>
            </article>

            <article className="why-choose-card">
              <WhyChooseIcon type="clock" />
              <h3>Fast &amp; Efficient Hiring</h3>
              <p>
                Our streamlined sourcing and delivery process helps you reduce
                hiring time and scale teams quickly.
              </p>
            </article>

            <article className="why-choose-card">
              <WhyChooseIcon type="puzzle" />
              <h3>Flexible Engagement Models</h3>
              <p>
                Whether you need individual consultants, dedicated teams, or
                project-based support, we adapt to your business needs.
              </p>
            </article>

            <article className="why-choose-card">
              <WhyChooseIcon type="chip" />
              <h3>Domain Expertise Across Technologies</h3>
              <p>
                Our talent network covers modern technology stacks including cloud,
                DevOps, data, QA, automation, and enterprise applications.
              </p>
            </article>

            <article className="why-choose-card">
              <WhyChooseIcon type="shield" />
              <h3>Transparent &amp; Reliable Process</h3>
              <p>
                We maintain clear communication, honest timelines, and complete
                visibility throughout the engagement lifecycle.
              </p>
            </article>

            <article className="why-choose-card">
              <WhyChooseIcon type="target" />
              <h3>Focus on Long-Term Success</h3>
              <p>
                We do not just fill roles. We ensure the talent aligns with your
                business goals, team culture, and long-term delivery success.
              </p>
            </article>
          </div>

          <div className="why-choose-banner">
            <img
              className="why-choose-banner-logo"
              src={trinexoraLogo}
              alt="Trinexora IT Staffing, IT Solutions, IT Expansion"
            />
            <p>
              At Trinexora, we connect great talent with great opportunities to
              build stronger teams and create lasting impact.
            </p>
          </div>
        </div>
      </section>

      <section className="section about-section what-you-gain-section" id="what-you-gain">
        <div className="container what-you-gain-wrap">
          <div className="what-you-gain-header" data-scroll-anchor>
            <h2>What You Gain</h2>
            <p>Outcomes that help you build faster, smarter teams</p>
          </div>

          <div className="what-you-gain-grid">
            <article className="gain-card">
              <img className="gain-card-image" src={accessTopTalentIcon} alt="" aria-hidden="true" />
              <h3>Access to Top IT Talent</h3>
              <p>
                Get immediate access to pre-vetted professionals across engineering,
                cloud, data, QA, and digital domains.
              </p>
            </article>

            <article className="gain-card">
              <img className="gain-card-image" src={fasterTeamScalingIcon} alt="" aria-hidden="true" />
              <h3>Faster Team Scaling</h3>
              <p>
                Quickly scale your teams up or down based on project needs without
                long hiring cycles.
              </p>
            </article>

            <article className="gain-card">
              <img className="gain-card-image" src={reducedHiringEffortIcon} alt="" aria-hidden="true" />
              <h3>Reduced Hiring Effort</h3>
              <p>
                We handle sourcing, screening, and shortlisting so your internal
                teams can focus on core business priorities.
              </p>
            </article>

            <article className="gain-card">
              <img className="gain-card-image" src={flexibleWorkforceIcon} alt="" aria-hidden="true" />
              <h3>Flexible Workforce Solutions</h3>
              <p>
                Choose from staffing, dedicated teams, or project-based engagement
                models that fit your needs.
              </p>
            </article>

            <article className="gain-card">
              <img className="gain-card-image" src={improvedDeliveryIcon} alt="" aria-hidden="true" />
              <h3>Improved Delivery Efficiency</h3>
              <p>
                Work with skilled professionals who integrate quickly and contribute
                to faster execution.
              </p>
            </article>

            <article className="gain-card">
              <img className="gain-card-image" src={reliablePartnershipIcon} alt="" aria-hidden="true" />
              <h3>Reliable Partnership</h3>
              <p>
                Gain a long-term talent partner focused on consistency,
                transparency, and measurable outcomes.
              </p>
            </article>
          </div>

          <div className="gain-ribbon">
            Build stronger teams. Deliver faster. Scale with confidence.
          </div>
        </div>
      </section>

      <section className="section about-section careers-cta-section" id="join-team">
        <div className="container careers-cta-grid">
          <div className="careers-cta-copy" data-scroll-anchor>
            <h2>
              Grow <span>With Us</span>
            </h2>
            <p>
              At Trinexora, we connect talent with meaningful opportunities in
              modern technology environments. Work on high-impact projects, gain
              hands-on experience, and grow your expertise across multiple domains.
            </p>
            <Link className="button button-primary careers-cta-button" to="/careers">
              Apply Now
            </Link>
          </div>

          <img
            className="careers-team-banner"
            src={joinTeamBanner}
            alt="Trinexora team collaboration and career opportunities"
          />
        </div>
      </section>
    </>
  );
}
