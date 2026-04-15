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
  const [job, setJob] = useState(null);
  const [form, setForm] = useState(initialState);
  const [resume, setResume] = useState(null);
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

    if (!resume) {
      setStatus({ type: "error", message: "Please upload your resume." });
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("resume", resume);

    setStatus({ type: "loading", message: "Submitting your application..." });

    try {
      const response = await applyToJob(jobId, formData);
      setStatus({ type: "success", message: response.message });
      setForm(initialState);
      setResume(null);
      event.target.reset();
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Unable to submit application." });
    }
  }

  if (loading) {
    return (
      <section className="section page-intro">
        <div className="container">
          <p className="form-status loading">Loading job details...</p>
        </div>
      </section>
    );
  }

  if (!job) {
    return (
      <section className="section page-intro">
        <div className="container">
          <p className="form-status error">{status.message || "Job not found."}</p>
          <Link className="button button-secondary" to="/careers">
            Back to Careers
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section page-intro">
      <div className="container contact-layout">
        <div>
          <span className="eyebrow">Apply Now</span>
          <h1>{job.title}</h1>
          <div className="job-meta">
            <span>{job.department}</span>
            <span>{job.location}</span>
            <span>{job.employment_type}</span>
          </div>
          <p className="lead-text">{job.summary}</p>

          <div className="highlight-panel compact">
            <h3>Responsibilities</h3>
            <p>{job.responsibilities}</p>
            <h3>Requirements</h3>
            <p>{job.requirements}</p>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Full Name
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                required
              />
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
            Upload Resume
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
          </label>

          <button className="button button-primary" type="submit">
            Submit Application
          </button>

          {status.message ? (
            <p className={`form-status ${status.type}`}>{status.message}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
