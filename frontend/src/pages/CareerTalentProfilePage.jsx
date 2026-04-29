import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { submitTalentProfile } from "../services/api";

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
  employment_preference: "",
  preferred_work_mode: "",
  notice_period: "",
  work_authorization: "",
  primary_skills: "",
  professional_summary: ""
};

function getPageContent(type) {
  if (type === "join_talent_network") {
    return {
      eyebrow: "Join Talent Network",
      heading: "Stay on our radar for upcoming opportunities",
      intro:
        "Share your background, preferred role, and updated resume so our recruiters can reach out when the right opportunity opens up.",
      buttonLabel: "Join Talent Network",
      defaultJobTitle: "Talent Network"
    };
  }

  return {
    eyebrow: "Submit Resume",
    heading: "Share your resume with the Trinexora recruiting team",
    intro:
      "Submit your latest profile for current and upcoming roles across staffing, project delivery, cloud, data, QA, and digital transformation programs.",
    buttonLabel: "Submit Resume",
    defaultJobTitle: "General Application"
  };
}

export default function CareerTalentProfilePage() {
  const [searchParams] = useSearchParams();
  const submissionType = searchParams.get("type") === "join_talent_network"
    ? "join_talent_network"
    : "submit_resume";
  const content = useMemo(() => getPageContent(submissionType), [submissionType]);
  const jobTitleParam = searchParams.get("jobTitle") || content.defaultJobTitle;

  const [form, setForm] = useState({
    ...initialState,
    target_job_title: jobTitleParam
  });
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });

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
    formData.append("submission_type", submissionType);
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("resume", resume);

    setStatus({ type: "loading", message: "Submitting your profile..." });

    try {
      const response = await submitTalentProfile(formData);
      setStatus({ type: "success", message: response.message });
      setForm({
        ...initialState,
        target_job_title: content.defaultJobTitle
      });
      setResume(null);
      event.target.reset();
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Unable to submit your profile." });
    }
  }

  return (
    <section className="section page-intro careers-talent-page">
      <div className="container contact-layout careers-talent-layout">
        <div className="careers-talent-copy">
          <span className="eyebrow">{content.eyebrow}</span>
          <h1>{content.heading}</h1>
          <p className="lead-text">{content.intro}</p>

          <div className="highlight-panel compact">
            <h3>What to include</h3>
            <p>
              Add the role title you are targeting, your experience summary, primary skills,
              preferred work model, notice period, and resume so our recruiting team can
              review your profile quickly.
            </p>
            <h3>Accepted resume formats</h3>
            <p>PDF, DOC, and DOCX files are supported for candidate submissions.</p>
          </div>

          <Link className="button button-secondary" to="/careers">
            Back to Careers
          </Link>
        </div>

        <form className="form-card careers-talent-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Job Title / Role Applied For
              <input
                name="target_job_title"
                value={form.target_job_title}
                onChange={handleChange}
                required
              />
            </label>
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
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Phone
              <input name="phone" value={form.phone} onChange={handleChange} required />
            </label>
            <label>
              Current Location
              <input
                name="current_location"
                value={form.current_location}
                onChange={handleChange}
                required
              />
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
                required
              />
            </label>
            <label>
              Employment Preference
              <select
                name="employment_preference"
                value={form.employment_preference}
                onChange={handleChange}
                required
              >
                <option value="">Select one</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Contract">Contract</option>
                <option value="Contract to Hire">Contract to Hire</option>
                <option value="Open to Both">Open to Both</option>
              </select>
            </label>
            <label>
              Preferred Work Mode
              <select
                name="preferred_work_mode"
                value={form.preferred_work_mode}
                onChange={handleChange}
                required
              >
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
              <input
                name="work_authorization"
                value={form.work_authorization}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              LinkedIn URL
              <input
                name="linkedin_url"
                value={form.linkedin_url}
                onChange={handleChange}
              />
            </label>
            <label>
              Portfolio / GitHub URL
              <input
                name="portfolio_url"
                value={form.portfolio_url}
                onChange={handleChange}
              />
            </label>
          </div>

          <label>
            Primary Skills
            <textarea
              name="primary_skills"
              rows="4"
              value={form.primary_skills}
              onChange={handleChange}
              placeholder="Example: Java, Spring Boot, AWS, Selenium, SQL"
              required
            />
          </label>

          <label>
            Professional Summary
            <textarea
              name="professional_summary"
              rows="5"
              value={form.professional_summary}
              onChange={handleChange}
              placeholder="Tell us about your relevant project work, industry exposure, and the kind of opportunities you are targeting."
              required
            />
          </label>

          <label>
            Upload Resume
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
          </label>

          <button className="button button-primary" type="submit">
            {content.buttonLabel}
          </button>

          {status.message ? (
            <p className={`form-status ${status.type}`}>{status.message}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
