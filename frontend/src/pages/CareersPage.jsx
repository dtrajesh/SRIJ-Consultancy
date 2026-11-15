import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../usePageMeta";
import CareerBenefitIcon from "../components/CareerBenefitIcon";
import heroImage from "../assets/careers-hero-background.png";
import { getPublicJobs } from "../services/api";

const benefits = [
  { icon: "guidance", title: "Grow Your Career", text: "Continuous learning and clear growth opportunities." },
  { icon: "support", title: "Collaborative Culture", text: "Work with supportive, talented teammates." },
  { icon: "match", title: "Work-Life Balance", text: "Flexible policies that respect your time." },
  { icon: "briefcase", title: "Make an Impact", text: "Contribute to meaningful and real-world work." },
  { icon: "feedback", title: "People-First", text: "An inclusive, diverse, and respectful workplace." }
];

export default function CareersPage() {
  usePageMeta({ title: "Careers at Trinexora", path: "/careers", description: "Build your career with Trinexora. Explore current openings or join our talent network." });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getPublicJobs().then(data => { if (active) setJobs(data); })
      .catch(() => { if (active) setError("We couldn’t load current openings. Please try again."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [reload]);
  return (
    <div className="career-refresh">
      <section className="career-refresh-hero">
        <img src={heroImage} alt="Colleagues collaborating at work" />
        <div className="container career-refresh-hero-copy">
          <h1>Careers at Trinexora</h1>
          <p>Build your career, solve meaningful problems,<br className="career-desktop-break" /> and grow with a talented team.</p>
          <Link className="button career-purple-button" to="/careers/talent-profile?type=join_talent_network">Join Talent</Link>
        </div>
      </section>
      <section className="container career-refresh-panels">
        <section className="career-openings-panel" aria-labelledby="current-openings-title">
          <div className="career-openings-heading"><CareerBenefitIcon type="briefcase" /><h2 id="current-openings-title">Current Openings</h2></div>
          {loading && <p role="status">Loading current openings…</p>}
          {!loading && error && <div role="alert"><p>{error}</p><button className="button button-secondary" onClick={() => setReload(value => value + 1)}>Try again</button></div>}
          {!loading && !error && jobs.length === 0 && <div className="career-no-openings"><h3>Currently, there are no open positions.</h3><p>If there are openings, you’ll find the list here.</p></div>}
          {!loading && !error && jobs.length > 0 && <div className="career-current-list">{jobs.map(job => (
            <article className="career-current-job" key={job.id}>
              <span className="career-job-id">Job ID: {job.id}</span><h3>{job.title}</h3>
              <dl className="career-listing-details">
                <div><dt>Skills Required</dt><dd>{job.requirements}</dd></div>
                <div><dt>Location</dt><dd>{job.location}</dd></div>
                <div><dt>Job Type</dt><dd>{job.employment_type}</dd></div>
              </dl>
              <Link className="button career-purple-button" to={`/careers/${job.id}/apply`}>Apply Now</Link>
            </article>
          ))}</div>}
        </section>
        <section className="career-benefits-panel" aria-labelledby="career-benefits-title">
          <h2 id="career-benefits-title">Why Employees Choose Us</h2><div className="career-title-rule" />
          <div className="career-refresh-benefits">{benefits.map((benefit, index) => (
            <article key={benefit.title} className={`career-refresh-benefit career-benefit-${index}`}>
              <CareerBenefitIcon type={benefit.icon} /><h3>{benefit.title}</h3><p>{benefit.text}</p>
            </article>
          ))}</div>
        </section>
      </section>
      <section className="container career-followup" aria-labelledby="career-followup-title">
        <div className="career-resume-banner">
          <div>
            <h2 id="career-followup-title">Didn’t Find the Right Opportunity?</h2>
            <p>Upload your resume and our recruiters will reach out when a matching opportunity becomes available.</p>
          </div>
          <div>
            <div className="career-resume-actions">
              <Link className="button button-primary" to="/careers/talent-profile?type=submit_resume">Upload Resume</Link>
              <Link className="button button-primary" to="/careers/talent-profile?type=join_talent_network">Join Talent Network</Link>
            </div>
            <p className="career-resume-privacy">We use your details only to consider you for suitable roles. See our <Link to="/privacy-policy">Privacy Policy</Link>.</p>
          </div>
        </div>
      </section>
      <section className="container career-internal-entry" aria-labelledby="career-internal-title">
        <div>
          <span className="eyebrow">Internal Careers</span>
          <h2 id="career-internal-title">Join Our Team at Trinexora</h2>
          <p>Explore opportunities in recruiting, account management, sales, HR, and operations.</p>
        </div>
        <Link className="button career-purple-button" to="/careers/internal">View Internal Openings</Link>
      </section>
    </div>
  );
}
