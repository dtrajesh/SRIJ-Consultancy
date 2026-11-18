import { usePageMeta } from "../usePageMeta";
import ConsentCheckbox, { CANDIDATE_CONSENT_TEXT, useConsent } from "../components/ConsentCheckbox";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { applyToJob, getPublicJob } from "../services/api";

const initialState = {
  full_name: "",
  email: "",
  phone: "",
  current_company: "",
  years_of_experience: "",
  linkedin_url: "",
  cover_letter: ""
};

export default function CareerApplyPage() {
  const { jobId } = useParams();
  usePageMeta({
    title: "Job Application | Trinexora",
    description: "Apply for an IT role with Trinexora and share your experience and resume.",
    path: `/careers/${jobId}/apply`
  });
  const [job, setJob] = useState(null);
  const [form, setForm] = useState(initialState);
  const [resume, setResume] = useState(null);
  const { consentProps, validateConsent, resetConsent, getConsentData } = useConsent(CANDIDATE_CONSENT_TEXT);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    async function loadJob() {
      try {
        const response = await getPublicJob(jobId);
        setJob(response);
      } catch (error) {
        setStatus({ type: "error", message: error.message || "Unable to load this job." });
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, [jobId]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleFileChange(event) {
    setResume(event.target.files?.[0] || null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status.type === "loading") return;
    if (!validateConsent(event.currentTarget)) return;

    if (!resume) {
      setStatus({ type: "error", message: "Please upload your resume." });
      return;
    }

    if (resume.size > 10 * 1024 * 1024) {
      setStatus({ type: "error", message: "Resume must be 10 MB or smaller." });
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("resume", resume);
    Object.entries(getConsentData()).forEach(([key, value]) => {
      formData.append(key, value);
    });

    setStatus({ type: "loading", message: "Submitting your application..." });

    try {
      const response = await applyToJob(jobId, formData);
      setStatus({ type: "success", message: response.message });
      setForm(initialState);
      setResume(null);
      resetConsent();
      event.target.reset();
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Unable to submit application." });
    }
  }

  if (loading) {
    return (
      <section className="section page-intro">
        <div className="container">
          <h1>Job application</h1>
          <p className="form-status loading" role="status">Loading job details...</p>
        </div>
      </section>
    );
  }

  if (!job) {
    return (
      <section className="section page-intro">
        <div className="container">
          <h1>Job application</h1>
          <p className="form-status error" role="alert">{status.message || "Job not found."}</p>
          <Link className="button button-secondary" to="/careers">
            Back to Careers
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section page-intro">
      <div className="container career-application-layout">
        <div>
          <Link to="/careers">← Back to Careers</Link>
          <p className="career-job-id">Job ID: {job.id}</p>
          <h1>{job.title}</h1>
          <div className="job-meta">
            <span>{job.department}</span>
            <span>{job.location}</span>
            <span>{job.employment_type}</span>
          </div>
          <h2>Job Description</h2>
          <p className="lead-text">{job.summary}</p>

          <div className="highlight-panel compact career-job-description">
            <h3>Responsibilities</h3>
            <p>{job.responsibilities}</p>
            <h3>Requirements</h3>
            <p>{job.requirements}</p>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit} noValidate>
          <h2>Apply for this role</h2>
          <p>Job ID: {job.id} · {job.title}</p>
          <p className="required-fields-note"><span className="required-marker" aria-hidden="true">*</span> indicates a required field.</p>
          <div className="form-grid">
            <label>
              <span>Full Name <span className="required-marker" aria-hidden="true">*</span></span>
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              <span>Email <span className="required-marker" aria-hidden="true">*</span></span>
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              <span>Phone <span className="required-marker" aria-hidden="true">*</span></span>
              <input name="phone" value={form.phone} onChange={handleChange} required />
            </label>
            <label>
              Current Company
              <input
                name="current_company"
                value={form.current_company}
                onChange={handleChange}
              />
            </label>
            <label>
              Years of Experience
              <input
                name="years_of_experience"
                value={form.years_of_experience}
                onChange={handleChange}
              />
            </label>
            <label>
              LinkedIn URL
              <input name="linkedin_url" value={form.linkedin_url} onChange={handleChange} />
            </label>
          </div>

          <label>
            Cover Letter
            <textarea
              name="cover_letter"
              rows="5"
              value={form.cover_letter}
              onChange={handleChange}
            />
          </label>

          <label>
            <span>Upload Resume <span className="required-marker" aria-hidden="true">*</span></span>
            <small>PDF, DOC or DOCX, up to 10 MB.</small>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
          </label>

          <ConsentCheckbox {...consentProps} />

          <button className="button button-primary" type="submit" disabled={status.type === "loading"}>
            Submit Application
          </button>

          {status.message ? (
            <p role={status.type === "error" ? "alert" : "status"} aria-live="polite" className={`form-status ${status.type}`}>{status.message}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
