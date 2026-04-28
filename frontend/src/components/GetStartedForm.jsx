import { useState } from "react";
import { submitConsultation } from "../services/api";

const initialState = {
  name: "",
  email: "",
  company: "",
  need_type: "Staff Augmentation",
  timeline: "",
  team_size: "",
  goals: ""
};

export default function GetStartedForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: "", message: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "loading", message: "Saving your request..." });

    try {
      const response = await submitConsultation(form);
      setStatus({ type: "success", message: response.message });
      setForm(initialState);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again."
      });
    }
  }

  return (
    <form className="form-card get-started-form" onSubmit={handleSubmit}>
      <div className="get-started-form-header">
        <h2>Get in Touch With Our Experts</h2>
        <p>Partner with us to tackle your IT challenges and drive success.</p>
      </div>

      <div className="form-grid">
        <label>
          Full Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Carter"
            required
          />
        </label>
        <label>
          Work Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
          />
        </label>
        <label>
          Company
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Acme Corporation"
            required
          />
        </label>
        <label>
          Engagement Type
          <select name="need_type" value={form.need_type} onChange={handleChange}>
            <option>Staff Augmentation</option>
            <option>Managed Project</option>
            <option>Support Services</option>
            <option>Consulting Engagement</option>
          </select>
        </label>
        <label>
          Timeline
          <input
            name="timeline"
            placeholder="2-4 weeks"
            value={form.timeline}
            onChange={handleChange}
          />
        </label>
        <label>
          Team Size
          <input
            name="team_size"
            placeholder="3 engineers + 1 QA"
            value={form.team_size}
            onChange={handleChange}
          />
        </label>
      </div>

      <label>
        Goals
        <textarea
          name="goals"
          rows="5"
          value={form.goals}
          onChange={handleChange}
          placeholder="Tell us what you need, current pain points, and expected outcomes..."
          required
        />
      </label>

      <p className="get-started-form-note">Your information is confidential and secure.</p>

      <button className="button button-primary" type="submit">
        Request Consultation
      </button>

      {status.message ? (
        <p className={`form-status ${status.type}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
