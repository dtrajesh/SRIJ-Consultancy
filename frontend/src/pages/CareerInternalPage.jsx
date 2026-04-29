import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getInternalJobs, submitTalentProfile } from "../services/api";

const initialState = {
  target_job_title: "",
  full_name: "",
  email: "",
  phone: "",
  current_location: "",
  current_company: "",
  years_of_experience: "",
  linkedin_url: "",
  portfolio_url: "",
  employment_preference: "Full-Time",
  preferred_work_mode: "",
  notice_period: "",
  work_authorization: "",
  primary_skills: "",
  professional_summary: ""
};

function RoleIcon({ title }) {
  const sharedProps = {
    viewBox: "0 0 24 24",
    "aria-hidden": "true"
  };

  if (title === "Technical Recruiter") {
    return (
      <svg {...sharedProps}>
        <circle cx="10" cy="8" r="4" />
        <path d="M4 20c.6-3.7 2.6-6 6-6s5.4 2.3 6 6" />
        <path d="m16 11 2 2 4-5" />
      </svg>
    );
  }

  if (title === "Account Manager") {
    return (
      <svg {...sharedProps}>
        <path d="M4 20V8l8-4 8 4v12" />
        <path d="M8 20v-6h8v6" />
        <path d="M9 10h6" />
      </svg>
    );
  }

  if (title === "Sales Executive") {
    return (
      <svg {...sharedProps}>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="m7 15 4-4 3 3 5-7" />
        <path d="M16 7h3v3" />
      </svg>
    );
  }

  if (title === "HR Coordinator") {
    return (
      <svg {...sharedProps}>
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M9 8h6" />
        <path d="M9 12h6" />
        <path d="M9 16h4" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
      <path d="M12 12 4 7" />
      <path d="m12 12 8-5" />
      <path d="M12 12v9" />
    </svg>
  );
}

export default function CareerInternalPage() {
  const [searchParams] = useSearchParams();
  const requestedRole = searchParams.get("role") || "";
  const formRef = useRef(null);
  const [internalOpenings, setInternalOpenings] = useState([]);
  const [openingsStatus, setOpeningsStatus] = useState({
    type: "loading",
    message: "Loading internal openings..."
  });
  const [selectedRole, setSelectedRole] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    ...initialState,
    target_job_title: "Internal Careers"
  });
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });

  const selectedOpening = useMemo(
    () => internalOpenings.find((opening) => opening.title === selectedRole),
    [internalOpenings, selectedRole]
  );

  useEffect(() => {
    async function loadInternalJobs() {
      try {
        const response = await getInternalJobs();
        setInternalOpenings(response);
        const requestedOpening = response.find((opening) => opening.title === requestedRole);
        if (requestedOpening) {
          setSelectedRole(requestedOpening.title);
          setShowForm(true);
          setForm((current) => ({
            ...current,
            target_job_title: requestedOpening.title
          }));
        }
        setOpeningsStatus({ type: "success", message: "" });
      } catch (error) {
        setOpeningsStatus({
          type: "error",
          message: error.message || "Unable to load internal openings."
        });
      }
    }

    loadInternalJobs();
  }, []);

  function openForm(roleTitle) {
    setSelectedRole(roleTitle);
    setShowForm(true);
    setStatus({ type: "", message: "" });
    setForm((current) => ({
      ...current,
      target_job_title: roleTitle
    }));

    window.requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleFileChange(event) {
    setResume(event.target.files?.[0] || null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!resume) {
      setStatus({ type: "error", message: "Please upload your resume." });
      return;
    }

    const formData = new FormData();
    formData.append("submission_type", "internal_career");
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("resume", resume);

    setStatus({ type: "loading", message: "Submitting your resume..." });

    try {
      const response = await submitTalentProfile(formData);
      setStatus({ type: "success", message: response.message });
      setForm({
        ...initialState,
        target_job_title: selectedRole || "Internal Careers"
      });
      setResume(null);
      event.target.reset();
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Unable to submit your resume." });
    }
  }

  return (
    <div className="careers-internal-page">
      <section className="section page-intro careers-internal-hero">
        <div className="container careers-internal-hero-grid">
          <div>
            <span className="eyebrow">Internal Careers</span>
            <h1>Open Positions at Trinexora</h1>
            <p className="lead-text">
              Explore internal roles across recruiting, account management, sales, HR,
              and operations. Choose a role and submit your resume directly to our team.
            </p>
          </div>
          <Link className="button button-secondary" to="/careers">
            Back to Careers
          </Link>
        </div>
      </section>

      <section className="section careers-section">
        <div className="container">
          <div className="careers-opening-header">
            <h2>Current Internal Openings</h2>
          </div>

          {openingsStatus.type === "loading" ? (
            <p className="form-status loading">{openingsStatus.message}</p>
          ) : null}
          {openingsStatus.type === "error" ? (
            <p className="form-status error">{openingsStatus.message}</p>
          ) : null}

          {openingsStatus.type === "success" && internalOpenings.length === 0 ? (
            <div className="empty-state careers-empty-state">
              <h3>No internal openings posted</h3>
            </div>
          ) : null}

          {internalOpenings.length > 0 ? (
            <div className="internal-openings-grid">
              {internalOpenings.map((opening) => (
                <article key={opening.id} className="internal-opening-card">
                  <span className="internal-opening-icon">
                    <RoleIcon title={opening.title} />
                  </span>
                  <div>
                    <h3>{opening.title}</h3>
                    <p>{opening.summary}</p>
                  </div>
                  <div className="career-opening-tags">
                    <span>{opening.department}</span>
                    <span>{opening.location}</span>
                    <span>{opening.employment_type}</span>
                  </div>
                  <p className="internal-opening-requirements">{opening.requirements}</p>
                  <button
                    className="button button-primary button-small"
                    type="button"
                    onClick={() => openForm(opening.title)}
                  >
                    Submit Resume
                  </button>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {showForm ? (
        <section className="section careers-section internal-apply-section" ref={formRef}>
          <div className="container contact-layout careers-talent-layout">
            <div className="careers-talent-copy">
              <span className="eyebrow">Submit Resume</span>
              <h1>{selectedOpening?.title || selectedRole || "Internal Careers"}</h1>
              <p className="lead-text">
                Complete the required details and upload your resume. Your submission
                will be saved for the recruiting team to review.
              </p>
            </div>

            <form className="form-card careers-talent-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  Role Applied For
                  <input name="target_job_title" value={form.target_job_title} onChange={handleChange} required />
                </label>
                <label>
                  Full Name
                  <input name="full_name" value={form.full_name} onChange={handleChange} required />
                </label>
                <label>
                  Email
                  <input name="email" type="email" value={form.email} onChange={handleChange} required />
                </label>
                <label>
                  Phone
                  <input name="phone" value={form.phone} onChange={handleChange} required />
                </label>
                <label>
                  Current Location
                  <input name="current_location" value={form.current_location} onChange={handleChange} required />
                </label>
                <label>
                  Current Company
                  <input name="current_company" value={form.current_company} onChange={handleChange} />
                </label>
                <label>
                  Years of Experience
                  <input
                    name="years_of_experience"
                    value={form.years_of_experience}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Preferred Work Mode
                  <select name="preferred_work_mode" value={form.preferred_work_mode} onChange={handleChange} required>
                    <option value="">Select one</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                    <option value="Open to All">Open to All</option>
                  </select>
                </label>
                <label>
                  Notice Period
                  <input
                    name="notice_period"
                    value={form.notice_period}
                    onChange={handleChange}
                    placeholder="Immediate / 15 days / 30 days"
                  />
                </label>
                <label>
                  Work Authorization
                  <input name="work_authorization" value={form.work_authorization} onChange={handleChange} required />
                </label>
                <label>
                  LinkedIn URL
                  <input name="linkedin_url" value={form.linkedin_url} onChange={handleChange} />
                </label>
                <label>
                  Portfolio / Website URL
                  <input name="portfolio_url" value={form.portfolio_url} onChange={handleChange} />
                </label>
              </div>

              <label>
                Primary Skills
                <textarea name="primary_skills" rows="4" value={form.primary_skills} onChange={handleChange} required />
              </label>

              <label>
                Professional Summary
                <textarea
                  name="professional_summary"
                  rows="5"
                  value={form.professional_summary}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Upload Resume
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
              </label>

              <button className="button button-primary" type="submit">
                Submit Resume
              </button>

              {status.message ? (
                <p className={`form-status ${status.type}`}>{status.message}</p>
              ) : null}
            </form>
          </div>
        </section>
      ) : null}
    </div>
  );
}
