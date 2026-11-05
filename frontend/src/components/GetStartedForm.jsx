import ConsentCheckbox, { ENQUIRY_CONSENT_TEXT, useConsent } from "./ConsentCheckbox";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { submitConsultation } from "../services/api";

const initialState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  need_type: "",
  timeline: "",
  team_size: "",
  goals: ""
};

export default function GetStartedForm() {
  const [searchParams] = useSearchParams();
  const requestedType = searchParams.get("type");
  const suggestedEngagement = requestedType === "testing" ? "Testing & QA"
    : requestedType === "hiring" ? "Contract Hiring" : "";
  const [form, setForm] = useState(() => ({ ...initialState, need_type: suggestedEngagement }));

  useEffect(() => {
    if (suggestedEngagement) {
      setForm((current) => ({ ...current, need_type: suggestedEngagement }));
    }
  }, [suggestedEngagement]);
  const { consentProps, validateConsent, resetConsent, getConsentData } = useConsent(ENQUIRY_CONSENT_TEXT);
  const [status, setStatus] = useState({ type: "", message: "" });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateConsent(event.currentTarget)) return;
    setStatus({ type: "loading", message: "Saving your request..." });

    try {
      const response = await submitConsultation({ ...form, ...getConsentData() });
      setStatus({ type: "success", message: response.message });
      setForm(initialState);
      resetConsent();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again."
      });
    }
  }

  return (
    <form className="form-card get-started-form" onSubmit={handleSubmit} noValidate>
      <div className="get-started-form-header">
        <h2>Tell Us About Your Requirement</h2>
        <p>Share a few details so we can respond with the right next step.</p>
      </div>

      <div className="form-grid">
        <label>
          Name (required)
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </label>
        <label>
          Email (required)
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email address"
            required
          />
        </label>
        <label>
          Company (optional)
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Your company"
          />
        </label>
        <label>
          Phone (optional)
          <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Your phone number" />
        </label>
        <label>
          Engagement Type
          <select name="need_type" value={form.need_type} onChange={handleChange} required>
            <option value="" disabled>Select one</option>
            <option>Contract Hiring</option>
            <option>Permanent Hiring</option>
            <option>Project / Product Development</option>
            <option>Testing &amp; QA</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label>
          Timeline
          <select name="timeline" value={form.timeline} onChange={handleChange}>
            <option value="">Select a timeline</option>
            <option>Immediate</option>
            <option>Within 2 weeks</option>
            <option>1 month</option>
            <option>Just exploring</option>
          </select>
        </label>
        <label>
          Team size / No. of positions
          <input
            name="team_size"
            placeholder="Number of people or positions"
            value={form.team_size}
            onChange={handleChange}
          />
        </label>
      </div>

      <label>
        Requirement details (required)
        <textarea
          name="goals"
          rows="5"
          value={form.goals}
          onChange={handleChange}
          placeholder="Roles or skills needed, project scope, tech stack, location."
          required
        />
      </label>

      <ConsentCheckbox {...consentProps} />

      <button className="button button-primary" type="submit">
        Send Requirement
      </button>

      {status.message ? (
        <p role={status.type === "error" ? "alert" : "status"} aria-live="polite" className={`form-status ${status.type}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
