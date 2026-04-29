import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/careers-hero-background.png";
import { getPublicJobs } from "../services/api";

const reasonsToChoose = [
  {
    icon: "🚀",
    title: "Premium Opportunities",
    text: "Access top clients and exciting projects across enterprise and digital transformation teams."
  },
  {
    icon: "💼",
    title: "Contract & Full-Time Roles",
    text: "Flexible options that fit your career goals, availability, and preferred working model."
  },
  {
    icon: "🌐",
    title: "Remote & Hybrid Jobs",
    text: "Opportunities across the U.S. with onsite, hybrid, and remote roles."
  },
  {
    icon: "⚡",
    title: "Quick Placements",
    text: "Faster turnaround and recruiter feedback so you can move quickly."
  },
  {
    icon: "🤝",
    title: "Dedicated Recruiter Support",
    text: "One-on-one guidance through screening, interviews, offers, and onboarding."
  },
  {
    icon: "📈",
    title: "Career Growth",
    text: "Build your skills and grow with opportunities aligned to long-term career progress."
  }
];

const hiringSteps = [
  {
    step: "1",
    title: "Submit Resume",
    text: "Share your updated resume with us so we can match you to open roles."
  },
  {
    step: "2",
    title: "Recruiter Connect",
    text: "We understand your skills, goals, and preferred role expectations."
  },
  {
    step: "3",
    title: "Client Interview",
    text: "Interview with our client teams for the role that best fits your profile."
  },
  {
    step: "4",
    title: "Offer & Onboarding",
    text: "Receive your offer and start your next opportunity with confidence."
  }
];

const candidateTestimonials = [
  {
    quote:
      "Trinexora helped me secure a remote role within two weeks. Great team and smooth process.",
    name: "Sandeep R.",
    role: "DevOps Engineer"
  },
  {
    quote:
      "Very transparent recruiters and quality opportunities. Highly recommended for technology professionals.",
    name: "Priya M.",
    role: "QA Lead"
  },
  {
    quote:
      "Excellent support throughout the hiring process. They truly care about candidates and fit.",
    name: "Karthik P.",
    role: "Data Engineer"
  }
];

const internalRoles = [
  { title: "Technical Recruiter", icon: "recruiter" },
  { title: "Account Manager", icon: "account" },
  { title: "Sales Executive", icon: "sales" },
  { title: "HR Coordinator", icon: "hr" },
  { title: "Operations Specialist", icon: "operations" }
];

function InternalRoleIcon({ type }) {
  if (type === "recruiter") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10" cy="8" r="4" />
        <path d="M4 20c.6-3.7 2.6-6 6-6s5.4 2.3 6 6" />
        <path d="m16 11 2 2 4-5" />
      </svg>
    );
  }

  if (type === "account") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 20V8l8-4 8 4v12" />
        <path d="M8 20v-6h8v6" />
        <path d="M9 10h6" />
      </svg>
    );
  }

  if (type === "sales") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="m7 15 4-4 3 3 5-7" />
        <path d="M16 7h3v3" />
      </svg>
    );
  }

  if (type === "hr") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M9 8h6" />
        <path d="M9 12h6" />
        <path d="M9 16h4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
      <path d="M12 12 4 7" />
      <path d="m12 12 8-5" />
      <path d="M12 12v9" />
    </svg>
  );
}

function getJobBadgeColor(index) {
  const palette = [
    "career-job-badge-amber",
    "career-job-badge-violet",
    "career-job-badge-green",
    "career-job-badge-blue",
    "career-job-badge-rose"
  ];
  return palette[index % palette.length];
}

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [jobTypeFilter, setJobTypeFilter] = useState("All Types");

  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await getPublicJobs();
        setJobs(response);
      } catch (loadError) {
        setError(loadError.message || "Unable to load careers page.");
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  const locations = useMemo(() => {
    const values = [...new Set(jobs.map((job) => job.location).filter(Boolean))];
    return ["All Locations", ...values];
  }, [jobs]);

  const employmentTypes = useMemo(() => {
    const values = [...new Set(jobs.map((job) => job.employment_type).filter(Boolean))];
    return ["All Types", ...values];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchTerm.trim() === "" ||
        [job.title, job.department, job.summary, job.location]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesLocation =
        locationFilter === "All Locations" || job.location === locationFilter;

      const matchesType =
        jobTypeFilter === "All Types" || job.employment_type === jobTypeFilter;

      return matchesSearch && matchesLocation && matchesType;
    });
  }, [jobs, searchTerm, locationFilter, jobTypeFilter]);

  return (
    <div className="careers-page">
      <section className="careers-hero">
        <div className="container careers-hero-grid">
          <div className="careers-hero-copy">
            <span className="eyebrow careers-eyebrow">Careers</span>
            <h1>Launch Your Next Career Move with Trinexora</h1>
            <p>
              Connecting skilled IT professionals with high-impact opportunities across
              leading enterprises, startups, and digital transformation programs.
            </p>
            <div className="careers-hero-actions">
              <a className="button button-primary" href="#open-opportunities">
                View Open Jobs
              </a>
              <Link
                className="button button-secondary careers-outline-button"
                to="/careers/talent-profile?type=submit_resume&jobTitle=General%20Application"
              >
                Submit Resume
              </Link>
              <Link
                className="button button-secondary careers-outline-button"
                to="/careers/talent-profile?type=join_talent_network&jobTitle=Talent%20Network"
              >
                Join Talent Network
              </Link>
            </div>
          </div>

          <div className="careers-hero-visual">
            <img src={heroImage} alt="Trinexora careers" />
          </div>
        </div>
      </section>

      <section className="section careers-section">
        <div className="container">
          <div className="careers-section-heading centered">
            <h2>Why Candidates Choose Trinexora</h2>
          </div>
          <div className="careers-benefits-grid">
            {reasonsToChoose.map((item) => (
              <article key={item.title} className="careers-benefit-card">
                <span className="careers-benefit-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section careers-section" id="open-opportunities">
        <div className="container">
          <div className="careers-opening-header">
            <h2>Open Opportunities</h2>
            <Link to="/contact">View All Jobs →</Link>
          </div>

          <div className="careers-filter-bar">
            <input
              type="text"
              placeholder="Search by job title or skill"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <select
              value={locationFilter}
              onChange={(event) => setLocationFilter(event.target.value)}
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <select
              value={jobTypeFilter}
              onChange={(event) => setJobTypeFilter(event.target.value)}
            >
              {employmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {loading ? <p className="form-status loading">Loading openings...</p> : null}
          {error ? <p className="form-status error">{error}</p> : null}

          {!loading && !error && filteredJobs.length === 0 ? (
            <div className="empty-state careers-empty-state">
              <h3>No openings right now</h3>
              <p>
                There are currently no active job openings matching your search. Please
                check back later or submit your resume to stay on our radar.
              </p>
            </div>
          ) : null}

          {filteredJobs.length > 0 ? (
            <div className="careers-jobs-grid">
              {filteredJobs.map((job, index) => (
                <article key={job.id} className="career-opening-card">
                  <span className={`career-opening-icon ${getJobBadgeColor(index)}`}>
                    {job.department?.slice(0, 2).toUpperCase() || "IT"}
                  </span>
                  <h3>{job.title}</h3>
                  <p>{job.location}</p>
                  <div className="career-opening-tags">
                    <span>{job.employment_type}</span>
                    <span>{job.department}</span>
                  </div>
                  <p className="career-opening-summary">{job.summary}</p>
                  <Link className="button button-secondary button-small" to={`/careers/${job.id}/apply`}>
                    Apply Now
                  </Link>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="section careers-section">
        <div className="container careers-process-testimonials">
          <div className="careers-process-panel">
            <h2>Our Hiring Process</h2>
            <div className="careers-process-steps">
              {hiringSteps.map((step) => (
                <article key={step.step} className="careers-process-step">
                  <span className="careers-process-number">{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="careers-testimonials-panel">
            <h2>What Our Candidates Say</h2>
            <div className="careers-testimonials-grid">
              {candidateTestimonials.map((item) => (
                <article key={item.name} className="careers-testimonial-card">
                  <span className="careers-stars">★★★★★</span>
                  <p>"{item.quote}"</p>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section careers-section careers-band-section">
        <div className="container careers-band">
          <div>
            <h2>Didn’t Find the Right Opportunity?</h2>
            <p>
              Upload your resume and our recruiters will reach out when a matching
              opportunity becomes available.
            </p>
          </div>
          <div className="careers-band-actions">
            <Link
              className="button button-secondary"
              to="/careers/talent-profile?type=submit_resume&jobTitle=General%20Application"
            >
              Upload Resume
            </Link>
            <Link
              className="button button-primary"
              to="/careers/talent-profile?type=join_talent_network&jobTitle=Talent%20Network"
            >
              Join Talent Network
            </Link>
          </div>
        </div>
      </section>

      <section className="section careers-section careers-internal-section">
        <div className="container careers-internal-grid">
          <div className="careers-internal-copy">
            <h2>Join Our Internal Team</h2>
            <p>
              Explore exciting career opportunities within Trinexora and grow with our
              recruitment and delivery teams.
            </p>
            <Link className="button button-primary" to="/careers/internal">
              View Internal Careers
            </Link>
          </div>

          <div className="careers-internal-cards">
            {internalRoles.map((role) => (
              <article key={role.title} className="careers-internal-card">
                <span className="careers-internal-icon" aria-hidden="true">
                  <InternalRoleIcon type={role.icon} />
                </span>
                <h3>{role.title}</h3>
                <Link to="/careers/internal">
                  View Openings {"->"}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
