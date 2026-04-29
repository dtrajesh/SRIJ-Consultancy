import { useState } from "react";
import { createAdminJob } from "../services/api";

const initialState = {
  job_category: "public",
  title: "",
  department: "",
  location: "",
  employment_type: "Full-time",
  summary: "",
  responsibilities: "",
  requirements: ""
};

export default function AdminJobForm({ onJobCreated }) {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: "", message: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setStatus({ type: "error", message: "Admin session expired. Please log in again." });
      return;
    }

    setStatus({ type: "loading", message: "Posting job..." });

    try {
      const response = await createAdminJob(token, form);
      setStatus({ type: "success", message: response.message });
      setForm(initialState);
      onJobCreated(response.job);
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Unable to create job opening." });
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Opening Type
          <select name="job_category" value={form.job_category} onChange={handleChange}>
            <option value="public">Public Careers</option>
            <option value="internal">Internal Careers</option>
          </select>
        </label>
        <label>
          Job Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Department
          <input name="department" value={form.department} onChange={handleChange} required />
        </label>
        <label>
          Location
          <input name="location" value={form.location} onChange={handleChange} required />
        </label>
        <label>
          Employment Type
          <select name="employment_type" value={form.employment_type} onChange={handleChange}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Remote</option>
            <option>Hybrid</option>
          </select>
        </label>
      </div>

      <label>
        Summary
        <textarea name="summary" rows="4" value={form.summary} onChange={handleChange} required />
      </label>

      <label>
        Responsibilities
        <textarea
          name="responsibilities"
          rows="5"
          value={form.responsibilities}
          onChange={handleChange}
          placeholder="List key responsibilities for the role."
          required
        />
      </label>

      <label>
        Requirements
        <textarea
          name="requirements"
          rows="5"
          value={form.requirements}
          onChange={handleChange}
          placeholder="List must-have skills and experience."
          required
        />
      </label>

      <button className="button button-primary" type="submit">
        Post Job
      </button>

      {status.message ? (
        <p className={`form-status ${status.type}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
